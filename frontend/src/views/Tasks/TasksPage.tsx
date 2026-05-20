'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { tasksApi } from '@/lib/api/crm';
import type { Task, User } from '@/types/crm.types';
import styles from './TasksPage.module.css';
import { useNotifications } from '@/components/feedback/Notifications';
import { useConfirmDialog } from '@/components/feedback/ConfirmDialog';

const STATUS_OPTIONS: Array<{ value: Task['status']; label: string }> = [
  { value: 'open', label: 'Новая' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'done', label: 'Готово' },
];

const PRIORITY_OPTIONS: Array<{ value: Task['priority']; label: string }> = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
];
const PRIORITY_WEIGHT: Record<Task['priority'], number> = {
  high: 3,
  medium: 2,
  low: 1,
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

const statusLabel = (status: Task['status']) => STATUS_OPTIONS.find((item) => item.value === status)?.label ?? status;
const priorityLabel = (priority: Task['priority']) => PRIORITY_OPTIONS.find((item) => item.value === priority)?.label ?? priority;

const prettyDateTime = (value: string | null): string => {
  if (!value) return 'не задан';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('ru-RU');
};

const toInputDateTime = (value: string | null): string => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const TasksPage = () => {
  const { notify } = useNotifications();
  const { confirm } = useConfirmDialog();
  const currentUser = getCurrentUser();
  const roleRaw = typeof currentUser?.role === 'string' ? currentUser.role : currentUser?.role?.name ?? '';
  const roleName = roleRaw.toLowerCase();
  const isManager = roleName.includes('менеджер') || roleName.includes('manager');

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null);

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [mineOnly, setMineOnly] = useState(isManager);

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    status: 'open' as Task['status'],
    deadline: '',
  });

  const load = async () => {
    setLoading(true);
    try {
      const response = await tasksApi.list();
      setTasks(response.data);
      setError('');
    } catch (e: any) {
      setError(e?.response?.data?.detail ?? 'Не удалось загрузить задачи');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const scopedTasks = useMemo(() => {
    if (!mineOnly || !currentUser?.id) return tasks;
    return tasks.filter((task) => task.assignee_id === currentUser.id || task.creator_id === currentUser.id);
  }, [tasks, mineOnly, currentUser?.id]);

  const filteredTasks = useMemo(() => {
    const term = query.trim().toLowerCase();
    return scopedTasks.filter((task) => {
      if (statusFilter && task.status !== statusFilter) return false;
      if (priorityFilter && task.priority !== priorityFilter) return false;
      if (!term) return true;
      return (
        String(task.id).includes(term) ||
        task.title.toLowerCase().includes(term) ||
        (task.description ?? '').toLowerCase().includes(term)
      );
    });
  }, [scopedTasks, query, statusFilter, priorityFilter]);

  const groupedTasks = useMemo(
    () =>
      STATUS_OPTIONS.map((status) => ({
        ...status,
        tasks: filteredTasks
          .filter((task) => task.status === status.value)
          .sort((a, b) => {
            const byPriority = PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
            if (byPriority !== 0) return byPriority;
            const aDeadline = a.deadline ? new Date(a.deadline).getTime() : Number.POSITIVE_INFINITY;
            const bDeadline = b.deadline ? new Date(b.deadline).getTime() : Number.POSITIVE_INFINITY;
            if (aDeadline !== bDeadline) return aDeadline - bDeadline;
            return b.id - a.id;
          }),
      })),
    [filteredTasks],
  );

  const stats = useMemo(() => {
    const now = Date.now();
    const overdue = filteredTasks.filter((task) => task.status !== 'done' && task.deadline && new Date(task.deadline).getTime() < now).length;
    return {
      total: filteredTasks.length,
      open: filteredTasks.filter((task) => task.status === 'open').length,
      inProgress: filteredTasks.filter((task) => task.status === 'in_progress').length,
      done: filteredTasks.filter((task) => task.status === 'done').length,
      overdue,
    };
  }, [filteredTasks]);

  const createTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    if (!(await confirm({
      title: 'Создание задачи',
      message: 'Создать задачу?',
      confirmText: 'Создать',
    }))) return;

    try {
      setSubmitting(true);
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        priority: form.priority,
        deadline: form.deadline ? new Date(form.deadline).toISOString() : undefined,
        assignee_id: currentUser?.id,
        creator_id: currentUser?.id,
      };
      const response = await tasksApi.create(payload);
      if (form.status !== 'open') {
        await tasksApi.patch(response.data.id, { status: form.status });
      }
      setForm({ title: '', description: '', priority: 'medium', status: 'open', deadline: '' });
      setShowCreateForm(false);
      await load();
      notify('success', 'Задача создана', 'Новая задача добавлена.', { href: `/tasks#task-${response.data.id}` });
    } catch {
      notify('error', 'Ошибка', 'Не удалось создать задачу.');
    } finally {
      setSubmitting(false);
    }
  };

  const patchTask = async (task: Task, payload: Partial<Pick<Task, 'status' | 'priority' | 'deadline'>>, confirmText: string) => {
    if (!(await confirm({
      title: 'Подтверждение изменения',
      message: confirmText,
      confirmText: 'Подтвердить',
    }))) return;
    try {
      setUpdatingTaskId(task.id);
      await tasksApi.patch(task.id, payload);
      await load();
      notify('info', 'Задача обновлена', 'Изменения сохранены.', { href: `/tasks#task-${task.id}` });
    } catch {
      notify('error', 'Ошибка', 'Не удалось обновить задачу.');
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const moveNext = async (task: Task) => {
    const nextStatus: Task['status'] =
      task.status === 'open' ? 'in_progress' : task.status === 'in_progress' ? 'done' : 'open';
    await patchTask(task, { status: nextStatus }, `Перевести задачу в статус "${statusLabel(nextStatus)}"?`);
  };

  const archiveTask = async (taskId: number) => {
    if (!(await confirm({
      title: 'Архивация задачи',
      message: 'Архивировать задачу?',
      confirmText: 'Архивировать',
      variant: 'danger',
    }))) return;
    try {
      await tasksApi.remove(taskId);
      await load();
      notify('info', 'Задача архивирована', 'Задача перенесена в архив.', { href: '/archive' });
    } catch {
      notify('error', 'Ошибка', 'Не удалось архивировать задачу.');
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Задачи</h1>
          <p>{isManager ? 'Планирование и контроль ваших задач по клиентам и сделкам.' : 'Рабочие задачи команды.'}</p>
        </div>
        <button className={styles.primaryBtn} type="button" onClick={() => setShowCreateForm((prev) => !prev)}>
          {showCreateForm ? 'Скрыть форму' : 'Новая задача'}
        </button>
      </header>

      <div className={styles.statsGrid}>
        <article className={styles.statCard}><span>Всего</span><strong>{stats.total}</strong></article>
        <article className={styles.statCard}><span>Новые</span><strong>{stats.open}</strong></article>
        <article className={styles.statCard}><span>В работе</span><strong>{stats.inProgress}</strong></article>
        <article className={styles.statCard}><span>Готово</span><strong>{stats.done}</strong></article>
        <article className={styles.statCard}><span>Просрочено</span><strong>{stats.overdue}</strong></article>
      </div>

      <div className={`${styles.toolbar} ${isManager ? styles.toolbarManager : ''}`}>
        <input
          className={styles.search}
          placeholder="Поиск: ID, название, описание"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className={styles.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Все статусы</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <select className={styles.select} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">Все приоритеты</option>
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {!isManager ? (
          <label className={styles.toggle}>
            <input type="checkbox" checked={mineOnly} onChange={(e) => setMineOnly(e.target.checked)} />
            Только мои
          </label>
        ) : null}
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      {showCreateForm ? (
        <form className={styles.form} onSubmit={createTask}>
          <h2>Создание задачи</h2>
          <div className={styles.formGrid}>
            <label>
              Название
              <input
                className={styles.input}
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Позвонить родителю, уточнить оплату..."
                required
              />
            </label>
            <label>
              Приоритет
              <select
                className={styles.select}
                value={form.priority}
                onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value as Task['priority'] }))}
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
            <label>
              Статус
              <select
                className={styles.select}
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as Task['status'] }))}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
            <label>
              Дедлайн
              <input
                className={styles.input}
                type="datetime-local"
                value={form.deadline}
                onChange={(e) => setForm((prev) => ({ ...prev, deadline: e.target.value }))}
              />
            </label>
            <label className={styles.fullWidth}>
              Комментарий
              <textarea
                className={styles.textarea}
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Детали задачи"
                rows={3}
              />
            </label>
          </div>
          <div className={styles.formActions}>
            <button type="button" className={styles.secondaryBtn} onClick={() => setShowCreateForm(false)}>Отмена</button>
            <button className={styles.primaryBtn} type="submit" disabled={submitting}>{submitting ? 'Сохранение...' : 'Создать задачу'}</button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <p className={styles.empty}>Загрузка задач...</p>
      ) : (
        <div className={styles.board}>
          {groupedTasks.map((group) => (
            <section className={styles.column} key={group.value}>
              <header className={styles.columnHead}>
                <h3>{group.label}</h3>
                <span>{group.tasks.length}</span>
              </header>
              {group.tasks.length === 0 ? (
                <p className={styles.columnEmpty}>Нет задач</p>
              ) : (
                <div className={styles.columnTasks}>
                  {group.tasks.map((task) => {
                    const isOverdue = task.status !== 'done' && Boolean(task.deadline) && new Date(task.deadline!).getTime() < Date.now();
                    return (
                      <article className={styles.card} key={task.id} id={`task-${task.id}`}>
                        <div className={styles.cardHead}>
                          <strong>{task.title}</strong>
                          <span className={`${styles.badge} ${styles[`badge-${task.priority}`]}`}>{priorityLabel(task.priority)}</span>
                        </div>
                        <p className={styles.cardMeta}>ID #{task.id} • {statusLabel(task.status)}</p>
                        {task.description ? <p className={styles.description}>{task.description}</p> : null}
                        <p className={`${styles.cardMeta} ${isOverdue ? styles.overdue : ''}`}>Дедлайн: {prettyDateTime(task.deadline)}</p>

                        <div className={styles.controls}>
                          <label>
                            Статус
                            <select
                              className={styles.select}
                              value={task.status}
                              disabled={updatingTaskId === task.id}
                              onChange={(e) => {
                                const next = e.target.value as Task['status'];
                                if (next === task.status) return;
                                patchTask(task, { status: next }, `Сменить статус на "${statusLabel(next)}"?`).catch(console.error);
                              }}
                            >
                              {STATUS_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                              ))}
                            </select>
                          </label>
                          <label>
                            Приоритет
                            <select
                              className={styles.select}
                              value={task.priority}
                              disabled={updatingTaskId === task.id}
                              onChange={(e) => {
                                const next = e.target.value as Task['priority'];
                                if (next === task.priority) return;
                                patchTask(task, { priority: next }, `Сменить приоритет на "${priorityLabel(next)}"?`).catch(console.error);
                              }}
                            >
                              {PRIORITY_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                              ))}
                            </select>
                          </label>
                          <label>
                            Дедлайн
                            <input
                              className={styles.input}
                              type="datetime-local"
                              value={toInputDateTime(task.deadline)}
                              disabled={updatingTaskId === task.id}
                              onChange={(e) => {
                                const value = e.target.value;
                                patchTask(
                                  task,
                                  { deadline: value ? new Date(value).toISOString() : null },
                                  value ? 'Обновить дедлайн задачи?' : 'Убрать дедлайн задачи?',
                                ).catch(console.error);
                              }}
                            />
                          </label>
                        </div>

                        <div className={styles.actions}>
                          <button className={styles.secondaryBtn} type="button" onClick={() => moveNext(task)} disabled={updatingTaskId === task.id}>
                            Следующий статус
                          </button>
                          <button className={styles.dangerBtn} type="button" onClick={() => archiveTask(task.id)} disabled={updatingTaskId === task.id}>
                            Архивировать
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          ))}
        </div>
      )}

      {!loading && filteredTasks.length === 0 ? (
        <p className={styles.empty}>По текущим фильтрам задачи не найдены.</p>
      ) : null}
    </section>
  );
};
