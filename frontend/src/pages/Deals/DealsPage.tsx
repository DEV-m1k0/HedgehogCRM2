import { useEffect, useState, type FormEvent } from 'react';
import { clientsApi, dealsApi, metaApi } from '../../api/crm';
import type { Client, Deal, User } from '../../types/crm.types';
import styles from '../shared/PageLayout.module.css';

const STAGES = ['Первичный контакт', 'Пробный урок', 'Выбор курса', 'Оформление договора', 'Оплата', 'Учеба'];

export const DealsPage = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ client_id: '', manager_id: '', amount: 0 });

  const load = async () => {
    const [dealsRes, clientsRes, usersRes] = await Promise.all([dealsApi.list(), clientsApi.list(), metaApi.users()]);
    setDeals(dealsRes.data);
    setClients(clientsRes.data);
    setUsers(usersRes.data);
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const createDeal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.client_id) {
      return;
    }

    await dealsApi.create({
      client_id: Number(form.client_id),
      manager_id: form.manager_id ? Number(form.manager_id) : undefined,
      amount: Number(form.amount),
      stage: STAGES[0],
    });
    setForm({ client_id: '', manager_id: '', amount: 0 });
    await load();
  };

  const moveStage = async (deal: Deal) => {
    const currentIndex = STAGES.findIndex((stage) => stage === deal.stage);
    const nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, STAGES.length - 1);
    await dealsApi.patch(deal.id, { stage: STAGES[nextIndex] });
    await load();
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Сделки</h1>

      <form className={styles.form} onSubmit={createDeal}>
        <select className={styles.select} value={form.client_id} onChange={(e) => setForm({ ...form, client_id: e.target.value })} required>
          <option value="">Клиент</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>{client.second_name} {client.first_name}</option>
          ))}
        </select>

        <select className={styles.select} value={form.manager_id} onChange={(e) => setForm({ ...form, manager_id: e.target.value })}>
          <option value="">Менеджер</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.second_name} {user.first_name}</option>
          ))}
        </select>

        <input className={styles.input} type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} placeholder="Сумма" min={0} />
        <button className={styles.button} type="submit">Создать сделку</button>
      </form>

      <div className={styles.grid}>
        {deals.map((deal) => (
          <article className={styles.card} key={deal.id}>
            <div className={styles.row}>
              <strong>Сделка #{deal.id}</strong>
              <button className={styles.buttonSecondary} onClick={() => moveStage(deal)}>Следующий этап</button>
            </div>
            <p className={styles.muted}>Клиент ID: {deal.client_id}</p>
            <p className={styles.muted}>Этап: {deal.stage}</p>
            <p className={styles.muted}>Сумма: {deal.amount}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
