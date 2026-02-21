import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { clientsApi } from '../../api/crm';
import type { Client, StudentAttendanceStats, StudentMakeup, User } from '../../types/crm.types';
import styles from './ClientDetailsPage.module.css';

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

export const ClientDetailsPage = () => {
  const { clientId } = useParams();
  const currentUser = getCurrentUser();
  const roleName = currentUser?.role?.name?.toLowerCase() ?? '';
  const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');

  const [client, setClient] = useState<Client | null>(null);
  const [stats, setStats] = useState<StudentAttendanceStats | null>(null);
  const [makeups, setMakeups] = useState<StudentMakeup[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  if (error) {
    if (isTeacher && error.toLowerCase().includes('доступ')) {
      return <Navigate to="/my-students" replace />;
    }
    return <section className={styles.page}><p className={styles.error}>{error}</p></section>;
  }

  if (!client) {
    return <section className={styles.page}>Загрузка...</section>;
  }

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.kicker}>Карточка ученика</p>
          <h1>{client.second_name} {client.first_name}</h1>
          <p className={styles.subtle}>{client.patronymic ?? 'Без отчества'} • Дата рождения: {prettyDate(client.date_of_birth)}</p>
        </div>
        <div className={styles.heroActions}>
          <Link to={backPath} className={styles.ghostBtn}>Назад</Link>
          {isTeacher && (
            <Link to={`/my-students/${client.id}/edit`} className={styles.primaryBtn}>
              Редактировать
            </Link>
          )}
        </div>
      </header>

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
          </div>
          <div className={styles.field}>
            <span>Email</span>
            <strong>{client.parent_email ?? 'не указан'}</strong>
          </div>
        </article>

        <article className={styles.card}>
          <h2>Дополнительная информация</h2>
          <div className={styles.field}>
            <span>Теги</span>
            <strong>{client.tags ?? 'нет тегов'}</strong>
          </div>
          <div className={styles.field}>
            <span>ID ученика</span>
            <strong>#{client.id}</strong>
          </div>
          <div className={styles.field}>
            <span>Создан</span>
            <strong>{new Date(client.created_at).toLocaleString()}</strong>
          </div>
        </article>

        <article className={styles.card}>
          <h2>Статистика посещаемости</h2>
          {!stats ? (
            <p className={styles.subtle}>Статистика пока недоступна.</p>
          ) : (
            <>
              <div className={styles.field}><span>Всего занятий</span><strong>{stats.total_lessons}</strong></div>
              <div className={styles.field}><span>Посещено</span><strong>{stats.present_count}</strong></div>
              <div className={styles.field}><span>Опозданий</span><strong>{stats.late_count}</strong></div>
              <div className={styles.field}><span>Пропусков</span><strong>{stats.absent_count}</strong></div>
              <div className={styles.field}><span>Процент посещаемости</span><strong>{stats.attendance_rate}%</strong></div>
              <div className={styles.field}><span>Накоплено хечхогов</span><strong>{stats.total_hedgehogs}</strong></div>
              <div className={styles.field}><span>Среднее хечхогов/занятие</span><strong>{stats.average_hedgehogs}</strong></div>
              <div className={styles.field}><span>Назначено отработок</span><strong>{stats.makeups_scheduled}</strong></div>
              <div className={styles.field}><span>Проведено отработок</span><strong>{stats.makeups_completed}</strong></div>
            </>
          )}
        </article>

        <article className={styles.card}>
          <h2>Отработки по пропускам</h2>
          {makeups.length === 0 ? (
            <p className={styles.subtle}>Пропусков с отработками пока нет.</p>
          ) : (
            <div className={styles.makeupList}>
              {makeups.map((item) => (
                <div key={item.attendance_id} className={styles.makeupRow}>
                  <strong>{new Date(item.lesson_start_at).toLocaleDateString()} • {item.lesson_topic}</strong>
                  <span>Статус отработки: {item.makeup_completed ? 'Проведена' : item.makeup_lesson_at ? 'Назначена' : 'Не назначена'}</span>
                  <span>{item.makeup_lesson_at ? `Дата: ${new Date(item.makeup_lesson_at).toLocaleString()}` : 'Дата не назначена'}</span>
                  {item.makeup_comment ? <span>Комментарий: {item.makeup_comment}</span> : null}
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
};
