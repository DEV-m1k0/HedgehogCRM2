import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { clientsApi } from '../../api/crm';
import { useNotifications } from '../../components/feedback/Notifications';
import type { TeacherGroupStudents, User } from '../../types/crm.types';
import styles from './TeacherStudentsPage.module.css';

const getCurrentUser = (): User | null => {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

export const TeacherStudentsPage = () => {
  const { notify } = useNotifications();
  const currentUser = getCurrentUser();
  const roleName = currentUser?.role?.name?.toLowerCase() ?? '';
  const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');

  const [groups, setGroups] = useState<TeacherGroupStudents[]>([]);
  const [query, setQuery] = useState('');

  const load = async () => {
    const response = await clientsApi.myStudentsGrouped();
    setGroups(response.data);
  };

  useEffect(() => {
    load().catch(() => notify('error', 'Ошибка', 'Не удалось загрузить учеников преподавателя.'));
  }, []);

  const filteredGroups = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return groups;
    return groups
      .map((group) => ({
        ...group,
        students: group.students.filter((student) => {
          const fullName = `${student.second_name} ${student.first_name} ${student.patronymic ?? ''}`.toLowerCase();
          const parent = `${student.parent_full_name ?? ''} ${student.parent_phone ?? ''} ${student.parent_email ?? ''}`.toLowerCase();
          return fullName.includes(term) || parent.includes(term);
        }),
      }))
      .filter((group) => group.students.length > 0);
  }, [groups, query]);

  if (!isTeacher) return <Navigate to="/" replace />;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Мои ученики</h1>
          <p>Список учеников сгруппирован по вашим учебным группам.</p>
        </div>
      </header>

      <input
        className={styles.search}
        placeholder="Поиск: ФИО, родитель, телефон, email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filteredGroups.length === 0 ? (
        <p className={styles.empty}>Ничего не найдено.</p>
      ) : (
        <div className={styles.groupList}>
          {filteredGroups.map((group) => (
            <article key={group.group_id} className={styles.groupCard}>
              <div className={styles.groupHead}>
                <h2>{group.group_name}</h2>
                <span>{group.course_name ?? 'Без курса'}</span>
              </div>

              <div className={styles.studentsGrid}>
                {group.students.map((student) => (
                  <div className={styles.studentCard} key={student.id}>
                    <strong>{student.second_name} {student.first_name} {student.patronymic ?? ''}</strong>
                    <p>Родитель: {student.parent_full_name ?? 'не указан'}</p>
                    <p>Контакт: {student.parent_phone ?? '-'} / {student.parent_email ?? '-'}</p>
                    <div className={styles.actions}>
                      <Link to={`/clients/${student.id}`} className={styles.linkBtn}>Открыть карточку</Link>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
