import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { clientsApi } from '../../api/crm';
import type { Client } from '../../types/crm.types';
import styles from '../shared/PageLayout.module.css';
import { useNotifications } from '../../components/feedback/Notifications';

export const ClientsPage = () => {
  const { notify } = useNotifications();
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    first_name: '',
    second_name: '',
    patronymic: '',
    parent_full_name: '',
    parent_phone: '',
    parent_email: '',
  });

  const load = async () => {
    const response = await clientsApi.list();
    setClients(response.data);
  };

  useEffect(() => {
    load().catch((e) => setError(e?.response?.data?.detail ?? 'Не удалось загрузить клиентов'));
  }, []);

  const createClient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!window.confirm('Создать нового клиента?')) {
      return;
    }

    try {
      const response = await clientsApi.create(form);
      setForm({ first_name: '', second_name: '', patronymic: '', parent_full_name: '', parent_phone: '', parent_email: '' });
      await load();
      notify('success', 'Клиент создан', 'Новый клиент успешно добавлен в систему.', { href: `/clients/${response.data.id}` });
    } catch (e: any) {
      setError(e?.response?.data?.detail ?? 'Ошибка создания клиента');
      notify('error', 'Ошибка', 'Не удалось создать клиента.');
    }
  };

  const removeClient = async (id: number) => {
    if (!window.confirm('Архивировать этого клиента?')) {
      return;
    }
    try {
      await clientsApi.remove(id);
      await load();
      notify('info', 'Клиент архивирован', 'Клиент скрыт из активного списка и может быть восстановлен.', { href: '/archive' });
    } catch {
      notify('error', 'Ошибка', 'Не удалось архивировать клиента.');
    }
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Клиенты</h1>
      {error ? <p className={styles.error}>{error}</p> : null}

      <form className={styles.form} onSubmit={createClient}>
        <input className={styles.input} placeholder="Фамилия" value={form.second_name} onChange={(e) => setForm({ ...form, second_name: e.target.value })} required />
        <input className={styles.input} placeholder="Имя" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} required />
        <input className={styles.input} placeholder="Отчество" value={form.patronymic} onChange={(e) => setForm({ ...form, patronymic: e.target.value })} />
        <input className={styles.input} placeholder="ФИО родителя" value={form.parent_full_name} onChange={(e) => setForm({ ...form, parent_full_name: e.target.value })} />
        <input className={styles.input} placeholder="Телефон родителя" value={form.parent_phone} onChange={(e) => setForm({ ...form, parent_phone: e.target.value })} />
        <input className={styles.input} placeholder="Email родителя" value={form.parent_email} onChange={(e) => setForm({ ...form, parent_email: e.target.value })} />
        <button className={styles.button} type="submit">Добавить клиента</button>
      </form>

      <div className={styles.grid}>
        {clients.map((client) => (
          <article className={styles.card} key={client.id}>
            <div className={styles.row}>
              <strong>{client.second_name} {client.first_name}</strong>
              <button className={styles.buttonSecondary} onClick={() => removeClient(client.id)}>Удалить</button>
            </div>
            <p className={styles.muted}>Родитель: {client.parent_full_name ?? 'не указан'}</p>
            <p className={styles.muted}>Контакт: {client.parent_phone ?? '-'} / {client.parent_email ?? '-'}</p>
            <Link className={styles.muted} to={`/clients/${client.id}`}>Открыть карточку ученика</Link>
          </article>
        ))}
      </div>
    </section>
  );
};
