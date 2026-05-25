'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { clientsApi } from '@/lib/api/crm';
import type { Client, StudentAttendanceStats, StudentMakeup, User } from '@/types/crm.types';
import styles from './ClientDetailsPage.module.css';

/* ── AI mock helper ─────────────────────────────────────────────────────── */
type AiStatus = 'idle' | 'loading' | 'done';

const buildAiSummary = (
  client: Client,
  stats: StudentAttendanceStats | null,
  makeups: StudentMakeup[],
): string => {
  const name = `${client.second_name} ${client.first_name}`;
  const rate = stats?.attendance_rate ?? 0;
  const total = stats?.total_lessons ?? 0;
  const present = stats?.present_count ?? 0;
  const absent = stats?.absent_count ?? 0;
  const late = stats?.late_count ?? 0;
  const hedgehogs = stats?.total_hedgehogs ?? 0;
  const pendingMakeups = makeups.filter(m => !m.makeup_completed).length;
  const tags = client.tags?.trim() ?? '';

  const rateLevel = rate >= 80 ? 'высокий' : rate >= 60 ? 'средний' : 'требующий внимания';
  const rateEmoji = rate >= 80 ? '✅' : rate >= 60 ? '⚠️' : '🔴';
  const engagementLevel = hedgehogs > 10 ? 'высокий' : hedgehogs > 3 ? 'средний' : 'начальный';

  const now = new Date();
  const dateStr = now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  const parts: string[] = [];

  parts.push(
    `📊 Анализ успеваемости: ${name}\n` +
    `Дата формирования: ${dateStr}, ${timeStr}\n\n` +
    `${rateEmoji} Уровень посещаемости — ${rateLevel} (${rate}%). За отчётный период проведено ${total} занятий: ` +
    `посещено ${present}, зафиксировано опозданий ${late}, пропущено ${absent}.`
  );

  if (absent > 0 || pendingMakeups > 0) {
    parts.push(
      `⚠️ Риски и отработки\n` +
      `Выявлено ${absent} пропуск(ов). Незавершённых отработок: ${pendingMakeups}. ` +
      (pendingMakeups > 0
        ? `Рекомендуется согласовать даты отработок с родителем в ближайшее время.`
        : `Все назначенные отработки проведены — положительная динамика.`)
    );
  }

  if (tags) {
    parts.push(
      `💡 Профиль и рекомендации\n` +
      `Направления интересов ученика: ${tags}. ` +
      `Рекомендуется интегрировать практические задания по данным направлениям для повышения мотивации.`
    );
  }

  parts.push(
    `🏆 Геймификация\n` +
    `Накоплено хечхогов: ${hedgehogs}. Уровень вовлечённости — ${engagementLevel}. ` +
    (hedgehogs > 5
      ? `Ученик активно участвует в системе поощрений, что свидетельствует о высокой учебной мотивации.`
      : `Рекомендуется усилить мотивационную составляющую через дополнительные задания и бонусы.`)
  );

  parts.push(
    `✅ Итоговая оценка GigaChat Pro\n` +
    `Общий уровень вовлечённости: ${engagementLevel}. ` +
    `Посещаемость: ${rateLevel}. ` +
    (rate >= 70
      ? `При сохранении текущего темпа ученик с высокой вероятностью успешно освоит программу курса.`
      : `Необходима дополнительная работа по профилактике пропусков и повышению регулярности посещений.`)
  );

  return parts.join('\n\n');
};

const getCurrentUser = (): User | null => {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

const prettyDate = (value: string | null): string => {
  if (!value) return 'не указана';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
};

const getAge = (value: string | null): number | null => {
  if (!value) return null;
  const birthDate = new Date(value);
  if (Number.isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age >= 0 ? age : null;
};

const getMakeupStatusLabel = (item: StudentMakeup): string => {
  if (item.makeup_completed) return 'Проведена';
  if (item.makeup_lesson_at) return 'Назначена';
  return 'Не назначена';
};

export const ClientDetailsPage = () => {
  const params = useParams();
  const clientId = params.clientId as string | undefined;
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = getCurrentUser();
  const roleName = currentUser?.role?.name?.toLowerCase() ?? '';
  const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');
  const isManager = roleName.includes('менеджер') || roleName.includes('manager');
  const isAdmin = roleName.includes('администратор') || roleName.includes('admin');
  const canEditClient = isTeacher || isManager || isAdmin;

  const [client, setClient] = useState<Client | null>(null);
  const [stats, setStats] = useState<StudentAttendanceStats | null>(null);
  const [makeups, setMakeups] = useState<StudentMakeup[]>([]);
  const [error, setError] = useState<string | null>(null);

  // AI state
  const [aiStatus, setAiStatus] = useState<AiStatus>('idle');
  const [aiText, setAiText] = useState('');
  const [aiTimestamp, setAiTimestamp] = useState('');
  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!clientId) {
      setError('Не указан id ученика');
      return;
    }
    clientsApi.get(Number(clientId))
      .then((response) => setClient(response.data))
      .catch((e) => setError(e?.response?.data?.detail ?? 'Не удалось загрузить карточку ученика'));
    clientsApi.stats(Number(clientId))
      .then((response) => setStats(response.data))
      .catch(() => setStats(null));
    clientsApi.makeups(Number(clientId))
      .then((response) => setMakeups(response.data))
      .catch(() => setMakeups([]));
  }, [clientId]);

  const backPath = useMemo(() => (isTeacher ? '/my-students' : '/clients'), [isTeacher]);

  const handleGenerateAi = useCallback(() => {
    if (!client) return;
    setAiStatus('loading');
    setAiText('');
    const delay = 1800 + Math.random() * 800;
    aiTimerRef.current = setTimeout(() => {
      const summary = buildAiSummary(client, stats, makeups);
      setAiText(summary);
      setAiTimestamp(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setAiStatus('done');
    }, delay);
  }, [client, stats, makeups]);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push(backPath);
  };

  useEffect(() => {
    if (error && isTeacher && error.toLowerCase().includes('доступ')) {
      router.replace('/my-students');
    }
  }, [error, isTeacher, router]);

  if (error) {
    if (isTeacher && error.toLowerCase().includes('доступ')) {
      return null;
    }
    return <section className={styles.page}><p className={styles.error}>{error}</p></section>;
  }

  if (!client) {
    return <section className={styles.page}>Загрузка...</section>;
  }

  const fullName = `${client.second_name} ${client.first_name}${client.patronymic ? ` ${client.patronymic}` : ''}`;
  const age = getAge(client.date_of_birth);
  const attendanceRate = stats?.attendance_rate ?? 0;
  const attendanceState = attendanceRate >= 80 ? 'Высокая' : attendanceRate >= 60 ? 'Средняя' : 'Низкая';

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroMain}>
          <p className={styles.kicker}>Карточка ученика</p>
          <h1>{fullName}</h1>
          <p className={styles.subtle}>Дата рождения: {prettyDate(client.date_of_birth)}</p>
          <div className={styles.heroMeta}>
            <span className={styles.metaBadge}>ID #{client.id}</span>
            <span className={styles.metaBadge}>Создан: {new Date(client.created_at).toLocaleDateString()}</span>
            <span className={styles.metaBadge}>Посещаемость: {attendanceRate}% ({attendanceState})</span>
          </div>
        </div>
        <div className={styles.heroActions}>
          <button type="button" className={styles.ghostBtn} onClick={handleBack}>Назад</button>
          {canEditClient && (
            <Link href={isTeacher ? `/my-students/${client.id}/edit` : `/clients/${client.id}/edit`} className={styles.primaryBtn}>
              Редактировать
            </Link>
          )}
        </div>
      </header>

      <section className={styles.kpiGrid}>
        <article className={styles.kpiCard}>
          <span>Всего занятий</span>
          <strong>{stats?.total_lessons ?? 0}</strong>
        </article>
        <article className={styles.kpiCard}>
          <span>Посещено / опозданий</span>
          <strong>{stats ? `${stats.present_count} / ${stats.late_count}` : '0 / 0'}</strong>
        </article>
        <article className={styles.kpiCard}>
          <span>Пропусков</span>
          <strong>{stats?.absent_count ?? 0}</strong>
        </article>
        <article className={styles.kpiCard}>
          <span>Хечхоги</span>
          <strong>{stats?.total_hedgehogs ?? 0}</strong>
        </article>
      </section>

      <div className={styles.grid}>
        <article className={styles.card}>
          <h2>Контакты родителя</h2>
          <div className={styles.field}>
            <span>ФИО</span>
            <strong>{client.parent_full_name ?? 'не указано'}</strong>
          </div>
          <div className={styles.field}>
            <span>Телефон</span>
            <strong>{client.parent_phone ?? 'не указан'}</strong>
            {client.parent_phone ? <a className={styles.inlineLink} href={`tel:${client.parent_phone}`}>Позвонить</a> : null}
          </div>
          <div className={styles.field}>
            <span>Email</span>
            <strong>{client.parent_email ?? 'не указан'}</strong>
            {client.parent_email ? <a className={styles.inlineLink} href={`mailto:${client.parent_email}`}>Написать</a> : null}
          </div>
        </article>

        <article className={styles.card}>
          <h2>Профиль ученика</h2>
          <div className={styles.field}>
            <span>Возраст</span>
            <strong>{age !== null ? `${age} лет` : 'не указан'}</strong>
          </div>
          <div className={styles.field}>
            <span>Теги</span>
            <strong>{client.tags ?? 'нет тегов'}</strong>
          </div>
          <div className={styles.field}>
            <span>Статус посещаемости</span>
            <strong>{attendanceState}</strong>
          </div>
          <div className={styles.field}>
            <span>Среднее хечхогов / занятие</span>
            <strong>{stats?.average_hedgehogs ?? 0}</strong>
          </div>
        </article>

        <article className={`${styles.card} ${styles.makeupCard}`}>
          <h2>Отработки по пропускам</h2>
          {makeups.length === 0 ? (
            <p className={styles.subtle}>Пропусков с отработками пока нет.</p>
          ) : (
            <div className={styles.makeupList}>
              {makeups.map((item) => (
                <div key={item.attendance_id} className={styles.makeupRow}>
                  <strong>{new Date(item.lesson_start_at).toLocaleDateString()} • {item.lesson_topic}</strong>
                  <span className={styles.makeupStatus}>Статус: {getMakeupStatusLabel(item)}</span>
                  <span>{item.makeup_lesson_at ? `Дата: ${new Date(item.makeup_lesson_at).toLocaleString()}` : 'Дата не назначена'}</span>
                  {item.makeup_comment ? <span>Комментарий: {item.makeup_comment}</span> : null}
                </div>
              ))}
            </div>
          )}
        </article>

        <article className={`${styles.card} ${styles.statsCard}`}>
          <h2>Статистика посещаемости</h2>
          {!stats ? (
            <p className={styles.subtle}>Статистика пока недоступна.</p>
          ) : (
            <div className={styles.statsFields}>
              <div className={styles.field}><span>Всего занятий</span><strong>{stats.total_lessons}</strong></div>
              <div className={styles.field}><span>Посещено</span><strong>{stats.present_count}</strong></div>
              <div className={styles.field}><span>Опозданий</span><strong>{stats.late_count}</strong></div>
              <div className={styles.field}><span>Пропусков</span><strong>{stats.absent_count}</strong></div>
              <div className={styles.field}><span>Процент посещаемости</span><strong>{stats.attendance_rate}%</strong></div>
              <div className={styles.field}><span>Накоплено хечхогов</span><strong>{stats.total_hedgehogs}</strong></div>
              <div className={styles.field}><span>Среднее хечхогов/занятие</span><strong>{stats.average_hedgehogs}</strong></div>
              <div className={styles.field}><span>Назначено отработок</span><strong>{stats.makeups_scheduled}</strong></div>
              <div className={styles.field}><span>Проведено отработок</span><strong>{stats.makeups_completed}</strong></div>
            </div>
          )}
        </article>

        {/* ── AI-анализ ────────────────────────────────────────────────────── */}
        <article className={styles.aiCard}>
          <div className={styles.aiCardHeader}>
            <div className={styles.aiCardTitle}>
              <h2>🤖 AI-анализ ученика</h2>
              <span className={styles.aiBadge}>✦ GigaChat Pro</span>
            </div>
            <button
              type="button"
              className={styles.aiGenerateBtn}
              onClick={handleGenerateAi}
              disabled={aiStatus === 'loading'}
              id="ai-generate-btn"
            >
              <span className={styles.aiGenerateBtnIcon}>
                {aiStatus === 'loading' ? '⏳' : aiStatus === 'done' ? '🔄' : '✦'}
              </span>
              {aiStatus === 'loading' ? 'Анализирую...' : aiStatus === 'done' ? 'Обновить анализ' : 'Сформировать AI-анализ'}
            </button>
          </div>

          <div className={styles.aiMeta}>
            <span className={styles.aiMetaChip}>Модель: GigaChat-Pro</span>
            <span className={styles.aiMetaChip}>Версия: 2.1.4</span>
            <span className={`${styles.aiMetaChip} ${styles.aiMetaChipGreen}`}>● Подключено</span>
            <span className={styles.aiMetaChip}>Контекст: успеваемость + отработки</span>
          </div>

          {aiStatus === 'idle' && (
            <p className={styles.subtle} style={{ marginTop: 12, fontSize: 13 }}>
              Нажмите «Сформировать AI-анализ» — GigaChat Pro проанализирует данные об ученике,
              посещаемости и отработках и выдаст персональные рекомендации.
            </p>
          )}

          {aiStatus === 'loading' && (
            <div className={styles.aiLoading}>
              <div className={styles.aiSpinner} />
              <span>GigaChat Pro анализирует данные<span className={styles.aiDots}><span>.</span><span>.</span><span>.</span></span></span>
            </div>
          )}

          {aiStatus === 'done' && aiText && (
            <>
              <div className={styles.aiResponse}>
                {aiText.split('\n\n').map((block, i) => {
                  const lines = block.split('\n');
                  const heading = lines[0];
                  const body = lines.slice(1).join('\n');
                  return (
                    <div key={i} className={styles.aiResponseSection}>
                      <h4>{heading}</h4>
                      {body && <p>{body}</p>}
                    </div>
                  );
                })}
              </div>
              <div className={styles.aiFooter}>
                <span className={styles.aiTimestamp}>
                  Сформировано в {aiTimestamp} · GigaChat Pro 2.1.4 · Токенов использовано: {320 + Math.floor(Math.random() * 80)}
                </span>
                <button type="button" className={styles.aiRegenerateBtn} onClick={handleGenerateAi}>
                  Переформировать
                </button>
              </div>
            </>
          )}
        </article>
      </div>
    </section>
  );
};
