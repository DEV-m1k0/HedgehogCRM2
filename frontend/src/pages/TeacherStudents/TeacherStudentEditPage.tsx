import { useEffect, useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { clientsApi } from '../../api/crm';
import { useNotifications } from '../../components/feedback/Notifications';
import type { Client, User } from '../../types/crm.types';
import styles from './TeacherStudentEditPage.module.css';

const getCurrentUser = (): User | null => {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

export const TeacherStudentEditPage = () => {
  const { notify } = useNotifications();
  const navigate = useNavigate();
  const { clientId } = useParams();

  const currentUser = getCurrentUser();
  const roleName = currentUser?.role?.name?.toLowerCase() ?? '';
  const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    first_name: '',
    second_name: '',
    patronymic: '',
    parent_full_name: '',
    parent_phone: '',
    parent_email: '',
    tags: '',
  });

  useEffect(() => {
    if (!clientId) return;
    clientsApi.get(Number(clientId))
      .then((response) => {
        const student: Client = response.data;
        setForm({
          first_name: student.first_name,
          second_name: student.second_name,
          patronymic: student.patronymic ?? '',
          parent_full_name: student.parent_full_name ?? '',
          parent_phone: student.parent_phone ?? '',
          parent_email: student.parent_email ?? '',
          tags: student.tags ?? '',
        });
      })
      .catch(() => notify('error', 'Ошибка', 'Не удалось загрузить данные ученика.'))
      .finally(() => setLoading(false));
  }, [clientId]);

  if (!isTeacher) return <Navigate to="/" replace />;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!clientId) return;
    if (!window.confirm('Сохранить изменения ученика?')) return;

    try {
      await clientsApi.update(Number(clientId), form);
      notify('success', 'Сохранено', 'Данные ученика обновлены.', { href: `/clients/${clientId}` });
      navigate(`/clients/${clientId}`);
    } catch {
      notify('error', 'Ошибка', 'Не удалось обновить ученика.');
    }
  };

  const archiveStudent = async () => {
    if (!clientId) return;
    if (!window.confirm('Архивировать ученика?')) return;
    try {
      await clientsApi.remove(Number(clientId));
      notify('info', 'Ученик архивирован', 'Ученик убран из активного списка.', { href: '/archive' });
      navigate('/my-students');
    } catch {
      notify('error', 'Ошибка', 'Не удалось архивировать ученика.');
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Редактирование ученика</h1>
          <p>Изменение данных ученика и контактов родителя.</p>
        </div>
        <Link to={`/clients/${clientId ?? ''}`} className={styles.back}>Назад к карточке</Link>
      </header>

      {loading ? (
        <p className={styles.loading}>Загрузка...</p>
      ) : (
        <form className={styles.form} onSubmit={submit}>
          <section className={styles.section}>
            <h2>Данные ученика</h2>
            <div className={styles.fieldsGrid}>
              <label className={styles.field}>
                <span>Фамилия</span>
                <input className={styles.input} value={form.second_name} onChange={(e) => setForm((p) => ({ ...p, second_name: e.target.value }))} placeholder="Иванов" required />
              </label>
              <label className={styles.field}>
                <span>Имя</span>
                <input className={styles.input} value={form.first_name} onChange={(e) => setForm((p) => ({ ...p, first_name: e.target.value }))} placeholder="Иван" required />
              </label>
              <label className={styles.field}>
                <span>Отчество</span>
                <input className={styles.input} value={form.patronymic} onChange={(e) => setForm((p) => ({ ...p, patronymic: e.target.value }))} placeholder="Иванович" />
              </label>
              <label className={styles.field}>
                <span>Теги</span>
                <input className={styles.input} value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} placeholder="python, web-дизайн" />
              </label>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Контакты родителя</h2>
            <div className={styles.fieldsGrid}>
              <label className={styles.field}>
                <span>ФИО родителя</span>
                <input className={styles.input} value={form.parent_full_name} onChange={(e) => setForm((p) => ({ ...p, parent_full_name: e.target.value }))} placeholder="Петрова Ольга Сергеевна" />
              </label>
              <label className={styles.field}>
                <span>Телефон</span>
                <input className={styles.input} value={form.parent_phone} onChange={(e) => setForm((p) => ({ ...p, parent_phone: e.target.value }))} placeholder="+7..." />
              </label>
              <label className={styles.field}>
                <span>Email</span>
                <input className={styles.input} type="email" value={form.parent_email} onChange={(e) => setForm((p) => ({ ...p, parent_email: e.target.value }))} placeholder="parent@example.com" />
              </label>
            </div>
          </section>

          <section className={styles.dangerZone}>
            <h3>Опасная зона</h3>
            <p>Архивация уберет ученика из активных списков. Восстановление возможно через архив.</p>
            <button type="button" className={styles.danger} onClick={archiveStudent}>Архивировать ученика</button>
          </section>

          <div className={styles.actions}>
            <Link to={`/clients/${clientId ?? ''}`} className={styles.secondary}>Отмена</Link>
            <button type="submit" className={styles.primary}>Сохранить изменения</button>
          </div>
        </form>
      )}
    </section>
  );
};
