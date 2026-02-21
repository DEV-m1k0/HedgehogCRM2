import { useEffect, useState, type FormEvent } from 'react';
import { tasksApi } from '../../api/crm';
import type { Task } from '../../types/crm.types';
import styles from '../shared/PageLayout.module.css';

export const TasksPage = () => {
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
    await tasksApi.create({ title, priority: 'medium' });
    setTitle('');
    await load();
  };

  const toggleStatus = async (task: Task) => {
    const next = task.status === 'done' ? 'open' : 'done';
    await tasksApi.patch(task.id, { status: next });
    await load();
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
          <article className={styles.card} key={task.id}>
            <div className={styles.row}>
              <strong>{task.title}</strong>
              <button className={styles.buttonSecondary} onClick={() => toggleStatus(task)}>
                {task.status === 'done' ? 'Открыть' : 'Закрыть'}
              </button>
            </div>
            <p className={styles.muted}>Статус: {task.status}</p>
            <p className={styles.muted}>Приоритет: {task.priority}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
