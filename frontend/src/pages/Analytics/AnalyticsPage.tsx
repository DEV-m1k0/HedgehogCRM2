import { useEffect, useMemo, useState } from 'react';
import { dealsApi, tasksApi } from '../../api/crm';
import type { Deal, Task } from '../../types/crm.types';
import styles from '../shared/PageLayout.module.css';

export const AnalyticsPage = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    Promise.all([dealsApi.list(), tasksApi.list()])
      .then(([dealsRes, tasksRes]) => {
        setDeals(dealsRes.data);
        setTasks(tasksRes.data);
      })
      .catch(console.error);
  }, []);

  const totalRevenue = useMemo(() => deals.reduce((sum, deal) => sum + deal.amount, 0), [deals]);
  const closedTasks = useMemo(() => tasks.filter((task) => task.status === 'done').length, [tasks]);

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Аналитика</h1>
      <div className={styles.grid}>
        <article className={styles.card}><h3>Сумма сделок</h3><p>{totalRevenue}</p></article>
        <article className={styles.card}><h3>Всего сделок</h3><p>{deals.length}</p></article>
        <article className={styles.card}><h3>Всего задач</h3><p>{tasks.length}</p></article>
        <article className={styles.card}><h3>Закрыто задач</h3><p>{closedTasks}</p></article>
      </div>
    </section>
  );
};
