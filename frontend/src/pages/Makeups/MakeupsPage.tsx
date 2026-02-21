import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { metaApi, scheduleApi } from '../../api/crm';
import { useNotifications } from '../../components/feedback/Notifications';
import type { MakeupItem, User } from '../../types/crm.types';
import styles from './MakeupsPage.module.css';

const getCurrentUser = (): User | null => {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

interface Draft {
  makeup_lesson_at: string;
  makeup_teacher_id: number | null;
  makeup_comment: string;
  makeup_completed: boolean;
}

const toDateTimeLocal = (iso: string | null): string => {
  if (!iso) return '';
  const date = new Date(iso);
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
};

const localInputToApiDateTime = (value: string): string => `${value}:00`;

export const MakeupsPage = () => {
  const { notify } = useNotifications();
  const currentUser = getCurrentUser();
  const roleName = currentUser?.role?.name?.toLowerCase() ?? '';
  const allowed = roleName.includes('менеджер') || roleName.includes('manager') || roleName.includes('администратор') || roleName.includes('admin');

  const [includeCompleted, setIncludeCompleted] = useState(false);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<MakeupItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});

  const teacherOptions = useMemo(
    () => users.filter((user) => user.role.name.toLowerCase().includes('преподаватель') || user.role.name.toLowerCase().includes('teacher')),
    [users],
  );

  const filteredItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) => {
      const haystack = `${item.client_full_name} ${item.group_name} ${item.lesson_topic}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [items, query]);

  const unassignedItems = useMemo(
    () => filteredItems.filter((item) => !item.makeup_lesson_at || !item.makeup_teacher_id),
    [filteredItems],
  );

  const assignedItems = useMemo(
    () => filteredItems.filter((item) => item.makeup_lesson_at && item.makeup_teacher_id),
    [filteredItems],
  );

  const load = async () => {
    const [makeupsRes, usersRes] = await Promise.all([
      scheduleApi.listMakeups(includeCompleted),
      metaApi.users(),
    ]);
    setItems(makeupsRes.data);
    setUsers(usersRes.data);
    const nextDrafts: Record<number, Draft> = {};
    for (const item of makeupsRes.data) {
      nextDrafts[item.attendance_id] = {
        makeup_lesson_at: toDateTimeLocal(item.makeup_lesson_at),
        makeup_teacher_id: item.makeup_teacher_id,
        makeup_comment: item.makeup_comment ?? '',
        makeup_completed: item.makeup_completed,
      };
    }
    setDrafts(nextDrafts);
  };

  useEffect(() => {
    load().catch(() => notify('error', 'Ошибка', 'Не удалось загрузить отработки.'));
  }, [includeCompleted]);

  if (!allowed) return <Navigate to="/" replace />;

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Назначение отработок</h1>
          <p>Назначение доступно только для пропусков, выставленных преподавателем.</p>
        </div>
        <label className={styles.toggle}>
          <input type="checkbox" checked={includeCompleted} onChange={(e) => setIncludeCompleted(e.target.checked)} />
          Показать завершенные
        </label>
      </div>

      <input
        className={styles.search}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск: ученик, группа, тема занятия"
      />

      <div className={styles.sections}>
        <section>
          <div className={styles.sectionHead}>
            <h2>Не назначена отработка</h2>
            <span>{unassignedItems.length}</span>
          </div>
          {unassignedItems.length === 0 ? (
            <p className={styles.empty}>Нет пропусков без назначенной отработки.</p>
          ) : (
            <div className={styles.list}>
              {unassignedItems.map((item) => {
                  const draft = drafts[item.attendance_id] ?? {
                    makeup_lesson_at: '',
                    makeup_teacher_id: null,
                    makeup_comment: '',
                    makeup_completed: false,
                  };
                  return (
                    <article className={styles.card} key={item.attendance_id}>
                      <div className={styles.cardTop}>
                        <div>
                          <h3>{item.client_full_name}</h3>
                          <p>{item.group_name} • {item.lesson_topic}</p>
                          <small>Пропущенное занятие: {new Date(item.lesson_start_at).toLocaleString()}</small>
                        </div>
                        <Link to={`/clients/${item.client_id}`} className={styles.linkBtn}>Карточка ученика</Link>
                      </div>

                      <div className={styles.formGrid}>
                        <label>
                          Дата отработки
                          <input
                            type="datetime-local"
                            value={draft.makeup_lesson_at}
                            onChange={(e) => setDrafts((prev) => ({ ...prev, [item.attendance_id]: { ...draft, makeup_lesson_at: e.target.value } }))}
                          />
                        </label>

                        <label>
                          Преподаватель
                          <select
                            value={draft.makeup_teacher_id ?? ''}
                            onChange={(e) => setDrafts((prev) => ({
                              ...prev,
                              [item.attendance_id]: { ...draft, makeup_teacher_id: e.target.value ? Number(e.target.value) : null },
                            }))}
                          >
                            <option value="">Выберите преподавателя</option>
                            {teacherOptions.map((teacher) => (
                              <option key={teacher.id} value={teacher.id}>
                                {teacher.second_name} {teacher.first_name}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label>
                          Комментарий
                          <input
                            type="text"
                            value={draft.makeup_comment}
                            onChange={(e) => setDrafts((prev) => ({ ...prev, [item.attendance_id]: { ...draft, makeup_comment: e.target.value } }))}
                            placeholder="Уточнения по отработке"
                          />
                        </label>

                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={draft.makeup_completed}
                            onChange={(e) => setDrafts((prev) => ({ ...prev, [item.attendance_id]: { ...draft, makeup_completed: e.target.checked } }))}
                          />
                          Отработка проведена
                        </label>
                      </div>

                      <div className={styles.actions}>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!draft.makeup_lesson_at || !draft.makeup_teacher_id) {
                              notify('error', 'Проверьте форму', 'Укажите дату и преподавателя отработки.');
                              return;
                            }
                            try {
                              await scheduleApi.assignMakeup(item.attendance_id, {
                                makeup_lesson_at: localInputToApiDateTime(draft.makeup_lesson_at),
                                makeup_teacher_id: draft.makeup_teacher_id,
                                makeup_comment: draft.makeup_comment || null,
                                makeup_completed: draft.makeup_completed,
                              });
                              notify('success', 'Сохранено', 'Отработка назначена.');
                              await load();
                            } catch (error: any) {
                              notify('error', 'Ошибка', error?.response?.data?.detail ?? 'Не удалось назначить отработку.');
                            }
                          }}
                        >
                          Сохранить отработку
                        </button>
                      </div>
                    </article>
                  );
                })}
            </div>
          )}
        </section>

        <section>
          <div className={styles.sectionHead}>
            <h2>Отработка назначена</h2>
            <span>{assignedItems.length}</span>
          </div>
          {assignedItems.length === 0 ? (
            <p className={styles.empty}>Нет пропусков с назначенной отработкой.</p>
          ) : (
            <div className={styles.list}>
              {assignedItems.map((item) => {
                  const draft = drafts[item.attendance_id] ?? {
                    makeup_lesson_at: '',
                    makeup_teacher_id: null,
                    makeup_comment: '',
                    makeup_completed: false,
                  };
                  return (
                    <article className={styles.card} key={item.attendance_id}>
                      <div className={styles.cardTop}>
                        <div>
                          <h3>{item.client_full_name}</h3>
                          <p>{item.group_name} • {item.lesson_topic}</p>
                          <small>Пропущенное занятие: {new Date(item.lesson_start_at).toLocaleString()}</small>
                        </div>
                        <Link to={`/clients/${item.client_id}`} className={styles.linkBtn}>Карточка ученика</Link>
                      </div>

                      <div className={styles.formGrid}>
                        <label>
                          Дата отработки
                          <input
                            type="datetime-local"
                            value={draft.makeup_lesson_at}
                            onChange={(e) => setDrafts((prev) => ({ ...prev, [item.attendance_id]: { ...draft, makeup_lesson_at: e.target.value } }))}
                          />
                        </label>

                        <label>
                          Преподаватель
                          <select
                            value={draft.makeup_teacher_id ?? ''}
                            onChange={(e) => setDrafts((prev) => ({
                              ...prev,
                              [item.attendance_id]: { ...draft, makeup_teacher_id: e.target.value ? Number(e.target.value) : null },
                            }))}
                          >
                            <option value="">Выберите преподавателя</option>
                            {teacherOptions.map((teacher) => (
                              <option key={teacher.id} value={teacher.id}>
                                {teacher.second_name} {teacher.first_name}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label>
                          Комментарий
                          <input
                            type="text"
                            value={draft.makeup_comment}
                            onChange={(e) => setDrafts((prev) => ({ ...prev, [item.attendance_id]: { ...draft, makeup_comment: e.target.value } }))}
                            placeholder="Уточнения по отработке"
                          />
                        </label>

                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={draft.makeup_completed}
                            onChange={(e) => setDrafts((prev) => ({ ...prev, [item.attendance_id]: { ...draft, makeup_completed: e.target.checked } }))}
                          />
                          Отработка проведена
                        </label>
                      </div>

                      <div className={styles.actions}>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!draft.makeup_lesson_at || !draft.makeup_teacher_id) {
                              notify('error', 'Проверьте форму', 'Укажите дату и преподавателя отработки.');
                              return;
                            }
                            try {
                              await scheduleApi.assignMakeup(item.attendance_id, {
                                makeup_lesson_at: localInputToApiDateTime(draft.makeup_lesson_at),
                                makeup_teacher_id: draft.makeup_teacher_id,
                                makeup_comment: draft.makeup_comment || null,
                                makeup_completed: draft.makeup_completed,
                              });
                              notify('success', 'Сохранено', 'Данные отработки обновлены.');
                              await load();
                            } catch (error: any) {
                              notify('error', 'Ошибка', error?.response?.data?.detail ?? 'Не удалось обновить отработку.');
                            }
                          }}
                        >
                          Обновить отработку
                        </button>
                      </div>
                    </article>
                  );
                })}
            </div>
          )}
        </section>
      </div>
    </section>
  );
};
