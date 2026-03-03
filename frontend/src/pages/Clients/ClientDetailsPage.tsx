import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const { clientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleBack = () => {
    if (window.history.length > 1 && location.key !== 'default') {
      navigate(-1);
      return;
    }
    navigate(backPath);
  };

  if (error) {
    if (isTeacher && error.toLowerCase().includes('доступ')) {
      return <Navigate to="/my-students" replace />;
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
          {isTeacher && (
            <Link to={`/my-students/${client.id}/edit`} className={styles.primaryBtn}>
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
      </div>
    </section>
  );
};
