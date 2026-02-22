import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { clientsApi } from '../../api/crm';
import type { Client } from '../../types/crm.types';
import styles from './ClientsPage.module.css';
import { useNotifications } from '../../components/feedback/Notifications';

export const ClientsPage = () => {
  const { notify } = useNotifications();
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [query, setQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({
    first_name: '',
    second_name: '',
    patronymic: '',
    parent_full_name: '',
    parent_phone: '',
    parent_email: '',
    tags: '',
  });

  const load = async () => {
    setLoading(true);
    const response = await clientsApi.list();
    setClients(response.data);
    setLoading(false);
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
      setSubmitting(true);
      const response = await clientsApi.create(form);
      setForm({ first_name: '', second_name: '', patronymic: '', parent_full_name: '', parent_phone: '', parent_email: '', tags: '' });
      await load();
      setShowCreateForm(false);
      notify('success', 'Клиент создан', 'Новый клиент успешно добавлен в систему.', { href: `/clients/${response.data.id}` });
    } catch (e: any) {
      setError(e?.response?.data?.detail ?? 'Ошибка создания клиента');
      notify('error', 'Ошибка', 'Не удалось создать клиента.');
    } finally {
      setSubmitting(false);
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

  const filteredClients = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return clients;
    }
    return clients.filter((client) => {
      const fullName = `${client.second_name} ${client.first_name} ${client.patronymic ?? ''}`.toLowerCase();
      const parent = `${client.parent_full_name ?? ''} ${client.parent_phone ?? ''} ${client.parent_email ?? ''}`.toLowerCase();
      const tags = `${client.tags ?? ''}`.toLowerCase();
      return fullName.includes(term) || parent.includes(term) || tags.includes(term);
    });
  }, [clients, query]);

  const stats = useMemo(() => {
    const withPhone = clients.filter((client) => Boolean(client.parent_phone)).length;
    const withEmail = clients.filter((client) => Boolean(client.parent_email)).length;
    const withTags = clients.filter((client) => Boolean(client.tags?.trim())).length;
    return { withPhone, withEmail, withTags };
  }, [clients]);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Клиенты</h1>
          <p>Управление базой учеников и контактами родителей.</p>
        </div>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => setShowCreateForm((prev) => !prev)}
        >
          {showCreateForm ? 'Скрыть форму' : 'Новый клиент'}
        </button>
      </header>

      <div className={styles.statsGrid}>
        <article className={styles.statCard}><span>Всего клиентов</span><strong>{clients.length}</strong></article>
        <article className={styles.statCard}><span>Есть телефон родителя</span><strong>{stats.withPhone}</strong></article>
        <article className={styles.statCard}><span>Есть email родителя</span><strong>{stats.withEmail}</strong></article>
        <article className={styles.statCard}><span>С тегами</span><strong>{stats.withTags}</strong></article>
      </div>

      <div className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="Поиск: ФИО, родитель, телефон, email, тег"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className={styles.resultCount}>Найдено: {filteredClients.length}</span>
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      {showCreateForm && (
        <form className={styles.form} onSubmit={createClient}>
          <h2>Добавление нового клиента</h2>
          <div className={styles.formGrid}>
            <label>
              Фамилия
              <input className={styles.input} placeholder="Иванов" value={form.second_name} onChange={(e) => setForm({ ...form, second_name: e.target.value })} required />
            </label>
            <label>
              Имя
              <input className={styles.input} placeholder="Иван" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} required />
            </label>
            <label>
              Отчество
              <input className={styles.input} placeholder="Иванович" value={form.patronymic} onChange={(e) => setForm({ ...form, patronymic: e.target.value })} />
            </label>
            <label>
              ФИО родителя
              <input className={styles.input} placeholder="Петрова Ольга Сергеевна" value={form.parent_full_name} onChange={(e) => setForm({ ...form, parent_full_name: e.target.value })} />
            </label>
            <label>
              Телефон родителя
              <input className={styles.input} placeholder="+7..." value={form.parent_phone} onChange={(e) => setForm({ ...form, parent_phone: e.target.value })} />
            </label>
            <label>
              Email родителя
              <input className={styles.input} placeholder="parent@example.com" value={form.parent_email} onChange={(e) => setForm({ ...form, parent_email: e.target.value })} />
            </label>
            <label className={styles.fullWidth}>
              Теги
              <input className={styles.input} placeholder="python, web-дизайн" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </label>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.secondaryBtn} onClick={() => setShowCreateForm(false)}>Отмена</button>
            <button className={styles.primaryBtn} type="submit" disabled={submitting}>{submitting ? 'Сохранение...' : 'Добавить клиента'}</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className={styles.empty}>Загрузка клиентов...</p>
      ) : filteredClients.length === 0 ? (
        <p className={styles.empty}>Ничего не найдено по текущему запросу.</p>
      ) : (
        <div className={styles.grid}>
          {filteredClients.map((client) => (
            <article className={styles.card} key={client.id}>
              <div className={styles.cardHead}>
                <strong>{client.second_name} {client.first_name} {client.patronymic ?? ''}</strong>
                <span className={styles.clientId}>#{client.id}</span>
              </div>
              <p className={styles.muted}><span>Родитель:</span> {client.parent_full_name ?? 'не указан'}</p>
              <p className={styles.muted}><span>Телефон:</span> {client.parent_phone ?? '-'}</p>
              <p className={styles.muted}><span>Email:</span> {client.parent_email ?? '-'}</p>
              <p className={styles.muted}><span>Теги:</span> {client.tags ?? '—'}</p>

              <div className={styles.cardActions}>
                <Link className={styles.linkBtn} to={`/clients/${client.id}`}>Открыть карточку</Link>
                <button className={styles.secondaryBtn} onClick={() => removeClient(client.id)}>Архивировать</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
