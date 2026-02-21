import { useEffect, useState } from 'react';
import type { UserData } from './Account.types';
import styles from '../shared/PageLayout.module.css';

export const AccountPage = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      window.location.href = '/login';
      return;
    }

    setUser(JSON.parse(stored));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Аккаунт</h1>
      <p className={styles.muted}>Email: {user.email}</p>
      <p className={styles.muted}>ФИО: {user.second_name} {user.first_name} {user.patronymic ?? ''}</p>
      <p className={styles.muted}>Роль: {user.role.name}</p>
      <p className={styles.muted}>Статус доступа: {user.is_accepted ? 'Подтверждён' : 'Ожидает подтверждения'}</p>
    </section>
  );
};
