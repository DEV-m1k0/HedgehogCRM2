import { api } from '../../api/client';
import styles from '../shared/PageLayout.module.css';

export const SettingsPage = () => {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Настройки</h1>
      <p className={styles.muted}>API URL: {api.defaults.baseURL}</p>
      <p className={styles.muted}>Пользователь хранится в localStorage (`user`).</p>
    </section>
  );
};
