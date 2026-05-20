'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { metaApi, scheduleApi } from '@/lib/api/crm';
import { useNotifications } from '@/components/feedback/Notifications';
import { useConfirmDialog } from '@/components/feedback/ConfirmDialog';
import type { MakeupItem, User } from '@/types/crm.types';
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

type ListTab = 'unassigned' | 'assigned' | 'all';

const toDateTimeLocal = (iso: string | null): string => {
  if (!iso) return '';
  const date = new Date(iso);
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
};

const localInputToApiDateTime = (value: string): string => `${value}:00`;

const toLocalDateTimeString = (iso: string | null): string => {
  if (!iso) return 'не назначена';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString('ru-RU');
};

const isAssigned = (item: MakeupItem) => Boolean(item.makeup_lesson_at && item.makeup_teacher_id);

export const MakeupsPage = () => {
  const { notify } = useNotifications();
  const { confirm } = useConfirmDialog();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUser = getCurrentUser();
  const roleRaw = typeof currentUser?.role === 'string' ? currentUser.role : currentUser?.role?.name ?? '';
  const roleName = roleRaw.toLowerCase();
  const allowed = roleName.includes('менеджер') || roleName.includes('manager') || roleName.includes('администратор') || roleName.includes('admin');

  const [loading, setLoading] = useState(true);
  const [includeCompleted, setIncludeCompleted] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedTeacherFilter, setSelectedTeacherFilter] = useState<number | 'all'>(() => {
    const teacherId = searchParams.get('teacherId');
    const parsed = teacherId ? Number(teacherId) : NaN;
    return Number.isInteger(parsed) && parsed > 0 ? parsed : 'all';
  });
  const [selectedTab, setSelectedTab] = useState<ListTab>(() => {
    const tab = searchParams.get('tab');
    return tab === 'assigned' || tab === 'all' || tab === 'unassigned' ? tab : 'unassigned';
  });
  const [items, setItems] = useState<MakeupItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});
  const [savingIds, setSavingIds] = useState<Record<number, boolean>>({});
  const focusMakeupGroupId = useMemo(() => {
    const raw = searchParams.get('makeupGroupId');
    const parsed = raw ? Number(raw) : NaN;
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  }, [searchParams]);
  const focusMakeupAt = searchParams.get('makeupAt');

  useEffect(() => {
    const teacherId = searchParams.get('teacherId');
    const parsedTeacherId = teacherId ? Number(teacherId) : NaN;
    setSelectedTeacherFilter(Number.isInteger(parsedTeacherId) && parsedTeacherId > 0 ? parsedTeacherId : 'all');

    const tab = searchParams.get('tab');
    if (tab === 'assigned' || tab === 'all' || tab === 'unassigned') {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  const teacherOptions = useMemo(
    () => users.filter((user) => user.role.name.toLowerCase().includes('преподаватель') || user.role.name.toLowerCase().includes('teacher')),
    [users],
  );

  const teacherMap = useMemo(
    () => new Map(teacherOptions.map((teacher) => [teacher.id, `${teacher.second_name} ${teacher.first_name}`])),
    [teacherOptions],
  );

  const load = async () => {
    setLoading(true);
    try {
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
    } catch {
      notify('error', 'Ошибка', 'Не удалось загрузить отработки.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load().catch(console.error);
  }, [includeCompleted]);

  const filteredItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items
      .filter((item) => {
        if (selectedTeacherFilter !== 'all') {
          const draftTeacher = drafts[item.attendance_id]?.makeup_teacher_id ?? item.makeup_teacher_id;
          if (draftTeacher !== selectedTeacherFilter) {
            return false;
          }
        }
        if (focusMakeupGroupId) {
          if ((item as MakeupItem & { makeup_group_id?: number | null }).makeup_group_id !== focusMakeupGroupId) {
            return false;
          }
        } else if (focusMakeupAt) {
          if (item.makeup_lesson_at !== focusMakeupAt) {
            return false;
          }
        }
        if (!term) {
          return true;
        }
        const haystack = `${item.client_full_name} ${item.group_name} ${item.lesson_topic}`.toLowerCase();
        return haystack.includes(term);
      })
      .sort((a, b) => new Date(a.lesson_start_at).getTime() - new Date(b.lesson_start_at).getTime());
  }, [items, query, selectedTeacherFilter, drafts, focusMakeupGroupId, focusMakeupAt]);

  const unassignedItems = useMemo(
    () => filteredItems.filter((item) => !isAssigned(item)),
    [filteredItems],
  );

  const assignedItems = useMemo(
    () => filteredItems.filter((item) => isAssigned(item)),
    [filteredItems],
  );

  const visibleItems = useMemo(() => {
    if (selectedTab === 'unassigned') return unassignedItems;
    if (selectedTab === 'assigned') return assignedItems;
    return filteredItems;
  }, [selectedTab, unassignedItems, assignedItems, filteredItems]);

  const stats = useMemo(() => {
    const completed = filteredItems.filter((item) => drafts[item.attendance_id]?.makeup_completed ?? item.makeup_completed).length;
    return {
      total: filteredItems.length,
      unassigned: unassignedItems.length,
      assigned: assignedItems.length,
      completed,
    };
  }, [filteredItems, unassignedItems, assignedItems, drafts]);

  const handleSave = async (item: MakeupItem) => {
    const draft = drafts[item.attendance_id];
    if (!draft?.makeup_lesson_at || !draft?.makeup_teacher_id) {
      notify('error', 'Проверьте форму', 'Укажите дату и преподавателя отработки.');
      return;
    }

    if (!(await confirm({
      title: 'Сохранение отработки',
      message: 'Сохранить изменения по отработке?',
      confirmText: 'Сохранить',
    }))) {
      return;
    }

    try {
      setSavingIds((prev) => ({ ...prev, [item.attendance_id]: true }));
      await scheduleApi.assignMakeup(item.attendance_id, {
        makeup_lesson_at: localInputToApiDateTime(draft.makeup_lesson_at),
        makeup_teacher_id: draft.makeup_teacher_id,
        makeup_comment: draft.makeup_comment || null,
        makeup_completed: draft.makeup_completed,
      });
      notify('success', 'Сохранено', isAssigned(item) ? 'Данные отработки обновлены.' : 'Отработка назначена.');
      await load();
    } catch (error: any) {
      notify('error', 'Ошибка', error?.response?.data?.detail ?? 'Не удалось сохранить отработку.');
    } finally {
      setSavingIds((prev) => ({ ...prev, [item.attendance_id]: false }));
    }
  };

  useEffect(() => {
    if (!allowed) {
      router.replace('/');
    }
  }, [allowed, router]);

  if (!allowed) return null;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Отработки</h1>
          <p>Назначение и контроль отработок по пропущенным занятиям.</p>
        </div>
        <label className={styles.toggle}>
          <input type="checkbox" checked={includeCompleted} onChange={(e) => setIncludeCompleted(e.target.checked)} />
          Показывать завершенные
        </label>
      </header>

      <div className={styles.statsGrid}>
        <article className={styles.statCard}><span>Всего пропусков</span><strong>{stats.total}</strong></article>
        <article className={styles.statCard}><span>Не назначено</span><strong>{stats.unassigned}</strong></article>
        <article className={styles.statCard}><span>Назначено</span><strong>{stats.assigned}</strong></article>
        <article className={styles.statCard}><span>Завершено</span><strong>{stats.completed}</strong></article>
      </div>

      <div className={styles.toolbar}>
        <input
          className={styles.search}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск: ученик, группа, тема пропуска"
        />
        <select
          className={styles.select}
          value={selectedTeacherFilter}
          onChange={(e) => setSelectedTeacherFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
        >
          <option value="all">Все преподаватели отработки</option>
          {teacherOptions.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.second_name} {teacher.first_name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.tabs}>
        <button type="button" className={selectedTab === 'unassigned' ? styles.tabActive : styles.tab} onClick={() => setSelectedTab('unassigned')}>
          Не назначено ({unassignedItems.length})
        </button>
        <button type="button" className={selectedTab === 'assigned' ? styles.tabActive : styles.tab} onClick={() => setSelectedTab('assigned')}>
          Назначено ({assignedItems.length})
        </button>
        <button type="button" className={selectedTab === 'all' ? styles.tabActive : styles.tab} onClick={() => setSelectedTab('all')}>
          Все ({filteredItems.length})
        </button>
      </div>

      {loading ? (
        <p className={styles.empty}>Загрузка отработок...</p>
      ) : visibleItems.length === 0 ? (
        <p className={styles.empty}>По текущим фильтрам пропуски не найдены.</p>
      ) : (
        <div className={styles.list}>
          {visibleItems.map((item) => {
            const draft = drafts[item.attendance_id] ?? {
              makeup_lesson_at: '',
              makeup_teacher_id: null,
              makeup_comment: '',
              makeup_completed: false,
            };
            const assigned = Boolean(draft.makeup_lesson_at && draft.makeup_teacher_id);
            const teacherName = draft.makeup_teacher_id ? teacherMap.get(draft.makeup_teacher_id) ?? `ID ${draft.makeup_teacher_id}` : 'Не назначен';
            const saving = Boolean(savingIds[item.attendance_id]);

            return (
              <article className={styles.card} key={item.attendance_id}>
                <div className={styles.cardHead}>
                  <div>
                    <h3>{item.client_full_name}</h3>
                    <p>{item.group_name} • {item.lesson_topic}</p>
                    <small>Пропуск: {toLocalDateTimeString(item.lesson_start_at)}</small>
                  </div>
                  <div className={styles.cardHeadActions}>
                    <span className={`${styles.badge} ${assigned ? styles.badgeAssigned : styles.badgeUnassigned}`}>
                      {assigned ? 'Назначена' : 'Не назначена'}
                    </span>
                    {draft.makeup_completed ? <span className={`${styles.badge} ${styles.badgeDone}`}>Проведена</span> : null}
                    <Link href={`/clients/${item.client_id}`} className={styles.linkBtn}>Карточка ученика</Link>
                  </div>
                </div>

                <div className={styles.metaRow}>
                  <span>Текущий преподаватель: <strong>{teacherName}</strong></span>
                  <span>Дата отработки: <strong>{draft.makeup_lesson_at ? toLocalDateTimeString(localInputToApiDateTime(draft.makeup_lesson_at)) : 'не назначена'}</strong></span>
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

                  <label className={styles.commentField}>
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
                  <button type="button" onClick={() => handleSave(item)} disabled={saving}>
                    {saving ? 'Сохранение...' : assigned ? 'Обновить отработку' : 'Назначить отработку'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
