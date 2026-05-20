import { useMemo, useState } from 'react';
import { api } from '../../api/client';
import { useNotifications } from '../../components/feedback/Notifications';
import type { User } from '../../types/crm.types';
import { useAppLanguage } from '../../i18n/AppLanguage';
import {
  DEFAULT_TEACHER_SETTINGS,
  loadTeacherSettings,
  saveTeacherSettings,
  type TeacherSettings,
} from '../../utils/teacherSettings';
import styles from './SettingsPage.module.css';

type TabId = 'calendar' | 'events' | 'notifications' | 'service';

export const SettingsPage = () => {
  const { notify } = useNotifications();
  const { language, setLanguage } = useAppLanguage();
  const isEn = language === 'en';
  const user = useMemo(() => {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }, []);
  const roleName = user?.role?.name?.toLowerCase() ?? '';
  const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');

  const [settings, setSettings] = useState<TeacherSettings>(() => loadTeacherSettings(user));
  const [activeTab, setActiveTab] = useState<TabId>('calendar');

  const handleSave = () => {
    if (!user || !isTeacher) return;
    saveTeacherSettings(user, settings);
    notify('success', isEn ? 'Saved' : 'Сохранено', isEn ? 'Teacher settings applied.' : 'Настройки преподавателя применены.');
  };

  const handleReset = () => {
    setSettings(DEFAULT_TEACHER_SETTINGS);
    if (user && isTeacher) {
      saveTeacherSettings(user, DEFAULT_TEACHER_SETTINGS);
      notify('info', isEn ? 'Reset' : 'Сброшено', isEn ? 'Settings reset to default values.' : 'Настройки возвращены к значениям по умолчанию.');
    }
  };

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: 'calendar', label: isEn ? 'Calendar' : 'Календарь' },
    { id: 'events', label: isEn ? 'Events' : 'События' },
    { id: 'notifications', label: isEn ? 'Notifications' : 'Уведомления' },
  ];

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>{isEn ? 'Settings' : 'Настройки'}</h1>
        <p>{isEn ? 'Customize the interface for your workflow.' : 'Настраивайте интерфейс под свой рабочий процесс.'}</p>
      </header>

      <article className={styles.card}>
        <h2>{isEn ? 'Language' : 'Язык'}</h2>
        <div className={styles.grid}>
          <label className={styles.field}>
            <span>{isEn ? 'Interface language' : 'Язык интерфейса'}</span>
            <select value={language} onChange={(e) => setLanguage(e.target.value as 'ru' | 'en')}>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>
      </article>

      {isTeacher ? (
        <div className={styles.layout}>
          <aside className={styles.floatingNav}>
            <p className={styles.navTitle}>{isEn ? 'Sections' : 'Разделы'}</p>
            <div className={styles.navList}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`${styles.navItem} ${activeTab === tab.id ? styles.navItemActive : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                  </button>
                ))}
            </div>
          </aside>

          <div className={styles.content}>
            {activeTab === 'calendar' ? (
              <article className={styles.card}>
                <h2>{isEn ? 'Teacher Calendar' : 'Календарь преподавателя'}</h2>
                <div className={styles.grid}>
                  <label className={styles.field}>
                    <span>{isEn ? 'Desktop calendar view' : 'Вид календаря (ПК)'}</span>
                    <select
                      value={settings.desktopView}
                      onChange={(e) => setSettings((prev) => ({ ...prev, desktopView: e.target.value as TeacherSettings['desktopView'] }))}
                    >
                      <option value="dayGridMonth">{isEn ? 'Month' : 'Месяц'}</option>
                      <option value="timeGridWeek">{isEn ? 'Week' : 'Неделя'}</option>
                      <option value="listWeek">{isEn ? 'List' : 'Список'}</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>{isEn ? 'Mobile calendar view' : 'Вид календаря (мобильный)'}</span>
                    <select
                      value={settings.mobileView}
                      onChange={(e) => setSettings((prev) => ({ ...prev, mobileView: e.target.value as TeacherSettings['mobileView'] }))}
                    >
                      <option value="timeGridDay">{isEn ? 'Day' : 'День'}</option>
                      <option value="timeGridWeek">{isEn ? 'Week' : 'Неделя'}</option>
                      <option value="listWeek">{isEn ? 'List' : 'Список'}</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>{isEn ? 'Time format' : 'Формат времени'}</span>
                    <select
                      value={settings.timeFormat}
                      onChange={(e) => setSettings((prev) => ({ ...prev, timeFormat: e.target.value as TeacherSettings['timeFormat'] }))}
                    >
                      <option value="24h">{isEn ? '24-hour' : '24 часа'}</option>
                      <option value="12h">{isEn ? 'AM/PM (12-hour)' : 'AM/PM (12 часов)'}</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>{isEn ? 'First day of week' : 'Первый день недели'}</span>
                    <select
                      value={settings.firstDay}
                      onChange={(e) => setSettings((prev) => ({ ...prev, firstDay: Number(e.target.value) as 0 | 1 }))}
                    >
                      <option value={1}>{isEn ? 'Monday' : 'Понедельник'}</option>
                      <option value={0}>{isEn ? 'Sunday' : 'Воскресенье'}</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>{isEn ? 'Slot duration' : 'Шаг сетки времени'}</span>
                    <select
                      value={settings.slotDuration}
                      onChange={(e) => setSettings((prev) => ({ ...prev, slotDuration: e.target.value as TeacherSettings['slotDuration'] }))}
                    >
                      <option value="00:15:00">{isEn ? '15 min' : '15 минут'}</option>
                      <option value="00:30:00">{isEn ? '30 min' : '30 минут'}</option>
                      <option value="01:00:00">{isEn ? '60 min' : '60 минут'}</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>{isEn ? 'Drag snap duration' : 'Шаг привязки при перетаскивании'}</span>
                    <select
                      value={settings.snapDuration}
                      onChange={(e) => setSettings((prev) => ({ ...prev, snapDuration: e.target.value as TeacherSettings['snapDuration'] }))}
                    >
                      <option value="00:05:00">{isEn ? '5 min' : '5 минут'}</option>
                      <option value="00:10:00">{isEn ? '10 min' : '10 минут'}</option>
                      <option value="00:15:00">{isEn ? '15 min' : '15 минут'}</option>
                      <option value="00:30:00">{isEn ? '30 min' : '30 минут'}</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>{isEn ? 'Day start time' : 'Начало рабочего диапазона'}</span>
                    <select
                      value={settings.dayStartTime}
                      onChange={(e) => setSettings((prev) => ({ ...prev, dayStartTime: e.target.value }))}
                    >
                      <option value="06:00:00">06:00</option>
                      <option value="07:00:00">07:00</option>
                      <option value="08:00:00">08:00</option>
                      <option value="09:00:00">09:00</option>
                      <option value="10:00:00">10:00</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>{isEn ? 'Day end time' : 'Конец рабочего диапазона'}</span>
                    <select
                      value={settings.dayEndTime}
                      onChange={(e) => setSettings((prev) => ({ ...prev, dayEndTime: e.target.value }))}
                    >
                      <option value="20:00:00">20:00</option>
                      <option value="21:00:00">21:00</option>
                      <option value="22:00:00">22:00</option>
                      <option value="23:00:00">23:00</option>
                      <option value="24:00:00">24:00</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>{isEn ? 'Initial scroll time' : 'Стартовая прокрутка по времени'}</span>
                    <select
                      value={settings.initialScrollTime}
                      onChange={(e) => setSettings((prev) => ({ ...prev, initialScrollTime: e.target.value }))}
                    >
                      <option value="06:00:00">06:00</option>
                      <option value="07:00:00">07:00</option>
                      <option value="08:00:00">08:00</option>
                      <option value="09:00:00">09:00</option>
                      <option value="10:00:00">10:00</option>
                      <option value="12:00:00">12:00</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>{isEn ? 'Max events in month cell' : 'Макс. событий в ячейке месяца'}</span>
                    <select
                      value={settings.monthEventRows}
                      onChange={(e) => setSettings((prev) => ({ ...prev, monthEventRows: Number(e.target.value) as TeacherSettings['monthEventRows'] }))}
                    >
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </select>
                  </label>
                </div>
                <div className={styles.toggles}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.showNowIndicator}
                      onChange={(e) => setSettings((prev) => ({ ...prev, showNowIndicator: e.target.checked }))}
                    />
                    <span>{isEn ? 'Show current time indicator' : 'Показывать индикатор текущего времени'}</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.showWeekends}
                      onChange={(e) => setSettings((prev) => ({ ...prev, showWeekends: e.target.checked }))}
                    />
                    <span>{isEn ? 'Show weekends' : 'Показывать выходные в календаре'}</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.showLegend}
                      onChange={(e) => setSettings((prev) => ({ ...prev, showLegend: e.target.checked }))}
                    />
                    <span>{isEn ? 'Show course legend' : 'Показывать легенду курсов'}</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.denseEvents}
                      onChange={(e) => setSettings((prev) => ({ ...prev, denseEvents: e.target.checked }))}
                    />
                    <span>{isEn ? 'Compact events mode' : 'Компактный режим событий'}</span>
                  </label>
                </div>
              </article>
            ) : null}

            {activeTab === 'events' ? (
              <article className={styles.card}>
                <h2>{isEn ? 'Event display' : 'Отображение событий'}</h2>
                <div className={styles.grid}>
                  <label className={styles.field}>
                    <span>{isEn ? 'Event title mode' : 'Заголовок события'}</span>
                    <select
                      value={settings.eventTitleMode}
                      onChange={(e) => setSettings((prev) => ({ ...prev, eventTitleMode: e.target.value as TeacherSettings['eventTitleMode'] }))}
                    >
                      <option value="full">{isEn ? 'Full (course + topic)' : 'Полный (курс + тема)'}</option>
                      <option value="short">{isEn ? 'Short (topic only)' : 'Короткий (только тема)'}</option>
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span>{isEn ? 'Title lines' : 'Строк в заголовке события'}</span>
                    <select
                      value={settings.eventTitleLines}
                      onChange={(e) => setSettings((prev) => ({ ...prev, eventTitleLines: Number(e.target.value) as TeacherSettings['eventTitleLines'] }))}
                    >
                      <option value={1}>{isEn ? '1 line' : '1 строка'}</option>
                      <option value={2}>{isEn ? '2 lines' : '2 строки'}</option>
                      <option value={3}>{isEn ? '3 lines' : '3 строки'}</option>
                    </select>
                  </label>
                </div>
                <div className={styles.toggles}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.showCourseInTitle}
                      onChange={(e) => setSettings((prev) => ({ ...prev, showCourseInTitle: e.target.checked }))}
                    />
                    <span>{isEn ? 'Show course name in title' : 'Показывать название курса в заголовке'}</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.showEventTime}
                      onChange={(e) => setSettings((prev) => ({ ...prev, showEventTime: e.target.checked }))}
                    />
                    <span>{isEn ? 'Show time inside event card' : 'Показывать время внутри карточки события'}</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.showCancelledLessons}
                      onChange={(e) => setSettings((prev) => ({ ...prev, showCancelledLessons: e.target.checked }))}
                    />
                    <span>{isEn ? 'Show cancelled lessons' : 'Показывать отмененные занятия'}</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.showEventTypeBadges}
                      onChange={(e) => setSettings((prev) => ({ ...prev, showEventTypeBadges: e.target.checked }))}
                    />
                    <span>{isEn ? 'Show lesson type badges' : 'Показывать бейджи типа занятия (Гр./Инд./Отр.)'}</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.showEventStatusBadges}
                      onChange={(e) => setSettings((prev) => ({ ...prev, showEventStatusBadges: e.target.checked }))}
                    />
                    <span>{isEn ? 'Show lesson status badges' : 'Показывать статус занятия (Проведено/Отменено)'}</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.showRecurringBadge}
                      onChange={(e) => setSettings((prev) => ({ ...prev, showRecurringBadge: e.target.checked }))}
                    />
                    <span>{isEn ? 'Show recurring badge' : 'Показывать бейдж повтора для регулярных занятий'}</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.dimConductedEvents}
                      onChange={(e) => setSettings((prev) => ({ ...prev, dimConductedEvents: e.target.checked }))}
                    />
                    <span>{isEn ? 'Dim conducted lessons' : 'Делать проведенные занятия менее контрастными'}</span>
                  </label>
                </div>
              </article>
            ) : null}

            {activeTab === 'notifications' ? (
              <article className={styles.card}>
                <h2>{isEn ? 'Notifications' : 'Уведомления'}</h2>
                <div className={styles.grid}>
                  <label className={styles.field}>
                    <span>{isEn ? 'Toast duration' : 'Длительность тостов'}</span>
                    <select
                      value={settings.toastDurationMs}
                      onChange={(e) => setSettings((prev) => ({ ...prev, toastDurationMs: Number(e.target.value) as TeacherSettings['toastDurationMs'] }))}
                    >
                      <option value={4000}>{isEn ? '4 sec' : '4 сек'}</option>
                      <option value={6000}>{isEn ? '6 sec' : '6 сек'}</option>
                      <option value={8000}>{isEn ? '8 sec' : '8 сек'}</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>{isEn ? 'Max visible toasts' : 'Макс. число тостов на экране'}</span>
                    <select
                      value={settings.maxVisibleToasts}
                      onChange={(e) => setSettings((prev) => ({ ...prev, maxVisibleToasts: Number(e.target.value) as TeacherSettings['maxVisibleToasts'] }))}
                    >
                      <option value={3}>3</option>
                      <option value={5}>5</option>
                      <option value={8}>8</option>
                    </select>
                  </label>
                </div>

                <div className={styles.toggles}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.autoMarkNotificationsRead}
                      onChange={(e) => setSettings((prev) => ({ ...prev, autoMarkNotificationsRead: e.target.checked }))}
                    />
                    <span>{isEn ? 'Auto-mark notifications as read when opening bell panel' : 'Автоматически помечать уведомления как прочитанные при открытии колокольчика'}</span>
                  </label>
                </div>
              </article>
            ) : null}

            {activeTab === 'service' ? (
              <article className={styles.card}>
                <h2>{isEn ? 'Service & diagnostics' : 'Сервис и диагностика'}</h2>
                <p className={styles.muted}>API URL: {api.defaults.baseURL}</p>
                <p className={styles.muted}>{isEn ? 'User is stored in localStorage (`user`).' : 'Пользователь хранится в localStorage (`user`).'}</p>
              </article>
            ) : null}

            <div className={styles.actions}>
              <button type="button" className={styles.secondary} onClick={handleReset}>{isEn ? 'Reset' : 'Сбросить'}</button>
              <button type="button" className={styles.primary} onClick={handleSave}>{isEn ? 'Save settings' : 'Сохранить настройки'}</button>
            </div>
          </div>
        </div>
      ) : (
        <article className={styles.card}>
          <h2>{isEn ? 'No teacher settings' : 'Нет настроек преподавателя'}</h2>
          <p>{isEn ? 'Your account does not have teacher settings. If you think this is a mistake, please contact support.' : 'У вашей учетной записи нет настроек преподавателя. Если вы считаете, что это ошибка, пожалуйста, свяжитесь с поддержкой.'}</p>
        </article>
      )}
    </section>
  );
};
