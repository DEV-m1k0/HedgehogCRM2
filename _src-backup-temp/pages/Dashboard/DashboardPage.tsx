import { useEffect, useState } from 'react';
import styles from '../shared/PageLayout.module.css';
import { clientsApi, coursesApi, dealsApi, scheduleApi, tasksApi } from '../../api/crm';
import type { User } from '../../types/crm.types';

interface Stats {
  clients: number;
  courses: number;
  deals: number;
  tasks: number;
  lessons: number;
}

export const DashboardPage = () => {
  const [stats, setStats] = useState<Stats>({ clients: 0, courses: 0, deals: 0, tasks: 0, lessons: 0 });

  useEffect(() => {
    const currentUser = (() => {
      const raw = localStorage.getItem('user');
      if (!raw) return null;
      try {
        return JSON.parse(raw) as User;
      } catch {
        return null;
      }
    })();
    const roleName = currentUser?.role?.name?.toLowerCase() ?? '';
    const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');

    const load = async () => {
      const [clients, courses, deals, tasks, lessons] = await Promise.allSettled([
        isTeacher ? clientsApi.myStudents() : clientsApi.list(),
        coursesApi.list(),
        dealsApi.list(),
        tasksApi.list(),
        scheduleApi.lessons(),
      ]);

      setStats({
        clients: clients.status === 'fulfilled' ? clients.value.data.length : 0,
        courses: courses.status === 'fulfilled' ? courses.value.data.length : 0,
        deals: deals.status === 'fulfilled' ? deals.value.data.length : 0,
        tasks: tasks.status === 'fulfilled' ? tasks.value.data.length : 0,
        lessons: lessons.status === 'fulfilled' ? lessons.value.data.length : 0,
      });
    };

    load().catch(console.error);
  }, []);

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.grid}>
        <article className={styles.card}><h3>Клиенты</h3><p>{stats.clients}</p></article>
        <article className={styles.card}><h3>Курсы</h3><p>{stats.courses}</p></article>
        <article className={styles.card}><h3>Сделки</h3><p>{stats.deals}</p></article>
        <article className={styles.card}><h3>Задачи</h3><p>{stats.tasks}</p></article>
        <article className={styles.card}><h3>Занятия</h3><p>{stats.lessons}</p></article>
      </div>
    </section>
  );
};
