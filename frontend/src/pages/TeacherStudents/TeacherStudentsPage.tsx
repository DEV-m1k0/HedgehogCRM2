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
  const [selectedGroupId, setSelectedGroupId] = useState<number | 'all'>('all');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const response = await clientsApi.myStudentsGrouped();
    setGroups(response.data);
  };

  useEffect(() => {
    load()
      .catch(() => notify('error', 'Ошибка', 'Не удалось загрузить учеников преподавателя.'))
      .finally(() => setLoading(false));
  }, []);

  const groupOptions = useMemo(
    () => groups.map((group) => ({ id: group.group_id, name: group.group_name })),
    [groups],
  );

  const totalStudents = useMemo(
    () => groups.reduce((sum, group) => sum + group.students.length, 0),
    [groups],
  );

  const filteredGroups = useMemo(() => {
    const term = query.trim().toLowerCase();
    const baseGroups = selectedGroupId === 'all'
      ? groups
      : groups.filter((group) => group.group_id === selectedGroupId);

    if (!term) return baseGroups;
    return baseGroups
      .map((group) => ({
        ...group,
        students: group.students.filter((student) => {
          const fullName = `${student.second_name} ${student.first_name} ${student.patronymic ?? ''}`.toLowerCase();
          const parent = `${student.parent_full_name ?? ''} ${student.parent_phone ?? ''} ${student.parent_email ?? ''}`.toLowerCase();
          return fullName.includes(term) || parent.includes(term);
        }),
      }))
      .filter((group) => group.students.length > 0);
  }, [groups, query, selectedGroupId]);

  const filteredStudentsCount = useMemo(
    () => filteredGroups.reduce((sum, group) => sum + group.students.length, 0),
    [filteredGroups],
  );

  if (!isTeacher) return <Navigate to="/" replace />;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Мои ученики</h1>
          <p>Список учеников сгруппирован по вашим учебным группам, с быстрым доступом к карточкам.</p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <article className={styles.statCard}>
          <span>Групп</span>
          <strong>{groups.length}</strong>
        </article>
        <article className={styles.statCard}>
          <span>Всего учеников</span>
          <strong>{totalStudents}</strong>
        </article>
        <article className={styles.statCard}>
          <span>По текущему фильтру</span>
          <strong>{filteredStudentsCount}</strong>
        </article>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchWrap}>
          <label htmlFor="students-search">Поиск</label>
          <input
            id="students-search"
            className={styles.search}
            placeholder="ФИО, родитель, телефон, email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className={styles.groupFilterWrap}>
          <label htmlFor="students-group-filter">Группа</label>
          <select
            id="students-group-filter"
            className={styles.groupFilter}
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          >
            <option value="all">Все группы</option>
            {groupOptions.map((group) => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className={styles.empty}>Загрузка учеников...</p>
      ) : filteredGroups.length === 0 ? (
        <p className={styles.empty}>Ничего не найдено.</p>
      ) : (
        <div className={styles.groupList}>
          {filteredGroups.map((group) => (
            <article key={group.group_id} className={styles.groupCard}>
              <div className={styles.groupHead}>
                <div>
                  <h2>{group.group_name}</h2>
                  <span>{group.course_name ?? 'Без курса'}</span>
                </div>
                <div className={styles.groupMeta}>{group.students.length} учеников</div>
              </div>

              <div className={styles.studentsGrid}>
                {group.students.map((student) => (
                  <article className={styles.studentCard} key={student.id}>
                    <strong className={styles.studentName}>{student.second_name} {student.first_name} {student.patronymic ?? ''}</strong>
                    <p><span>Родитель:</span> {student.parent_full_name ?? 'не указан'}</p>
                    <p><span>Контакт:</span> {student.parent_phone ?? '-'} / {student.parent_email ?? '-'}</p>
                    <div className={styles.actions}>
                      <Link to={`/clients/${student.id}`} className={styles.linkBtn}>Открыть карточку</Link>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
