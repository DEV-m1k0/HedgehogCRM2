import { useEffect, useState, type FormEvent } from 'react';
import { tasksApi } from '../../api/crm';
import type { Task } from '../../types/crm.types';
import styles from '../shared/PageLayout.module.css';
import { useNotifications } from '../../components/feedback/Notifications';

export const TasksPage = () => {
  const { notify } = useNotifications();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  const load = async () => {
    const response = await tasksApi.list();
    setTasks(response.data);
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const createTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!window.confirm('Создать задачу?')) {
      return;
    }
    try {
      const response = await tasksApi.create({ title, priority: 'medium' });
      setTitle('');
      await load();
      notify('success', 'Задача создана', 'Новая задача добавлена.', { href: `/tasks#task-${response.data.id}` });
    } catch {
      notify('error', 'Ошибка', 'Не удалось создать задачу.');
    }
  };

  const toggleStatus = async (task: Task) => {
    const next = task.status === 'done' ? 'open' : 'done';
    if (!window.confirm('Изменить статус задачи?')) {
      return;
    }
    try {
      await tasksApi.patch(task.id, { status: next });
      await load();
      notify('info', 'Статус обновлен', 'Статус задачи успешно изменен.', { href: `/tasks#task-${task.id}` });
    } catch {
      notify('error', 'Ошибка', 'Не удалось обновить статус задачи.');
    }
  };

  const archiveTask = async (taskId: number) => {
    if (!window.confirm('Архивировать задачу?')) {
      return;
    }
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
      <h1 className={styles.title}>Задачи</h1>

      <form className={styles.form} onSubmit={createTask}>
        <input className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название задачи" required />
        <button className={styles.button} type="submit">Добавить задачу</button>
      </form>

      <div className={styles.grid}>
        {tasks.map((task) => (
          <article className={styles.card} key={task.id} id={`task-${task.id}`}>
            <div className={styles.row}>
              <strong>{task.title}</strong>
              <div className={styles.row}>
                <button className={styles.buttonSecondary} onClick={() => toggleStatus(task)}>
                  {task.status === 'done' ? 'Открыть' : 'Закрыть'}
                </button>
                <button className={styles.buttonSecondary} onClick={() => archiveTask(task.id)}>
                  Архив
                </button>
              </div>
            </div>
            <p className={styles.muted}>Статус: {task.status}</p>
            <p className={styles.muted}>Приоритет: {task.priority}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
