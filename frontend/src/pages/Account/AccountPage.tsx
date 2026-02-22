import { useEffect, useState } from 'react';
import type { UserData } from './Account.types';
import { Link } from 'react-router-dom';
import styles from './AccountPage.module.css';

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

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

  if (!user) return <section className={styles.page}><p className={styles.loading}>Загрузка профиля...</p></section>;

  const roleName = user.role.name.toLowerCase();
  const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');
  const isAdmin = roleName.includes('администратор') || roleName.includes('admin');
  const isManager = roleName.includes('менеджер') || roleName.includes('manager');

  const quickLinks = isTeacher
    ? [
        { label: 'Календарь', path: '/calendar' },
        { label: 'Мои ученики', path: '/my-students' },
        { label: 'Аналитика', path: '/analytics' },
      ]
    : [
        { label: 'Клиенты', path: '/clients' },
        { label: 'Календарь', path: '/calendar' },
        { label: 'Аналитика', path: '/analytics' },
        ...(isAdmin || isManager ? [{ label: 'Отработки', path: '/makeups' }] : []),
      ];

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.avatar}>{user.first_name[0]}{user.second_name[0]}</div>
        <div className={styles.heroMain}>
          <p className={styles.kicker}>Личный кабинет</p>
          <h1>{user.second_name} {user.first_name} {user.patronymic ?? ''}</h1>
          <div className={styles.badges}>
            <span className={styles.badge}>{user.role.name}</span>
            <span className={`${styles.badge} ${user.is_accepted ? styles.badgeSuccess : styles.badgePending}`}>
              {user.is_accepted ? 'Доступ подтвержден' : 'Ожидает подтверждения'}
            </span>
          </div>
        </div>
      </header>

      <div className={styles.grid}>
        <article className={styles.card}>
          <h2>Контакты и профиль</h2>
          <div className={styles.field}>
            <span>Email</span>
            <strong>{user.email}</strong>
            <a href={`mailto:${user.email}`} className={styles.inlineLink}>Написать</a>
          </div>
          <div className={styles.field}>
            <span>Телефон</span>
            <strong>{user.phone ?? 'не указан'}</strong>
            {user.phone ? <a href={`tel:${user.phone}`} className={styles.inlineLink}>Позвонить</a> : null}
          </div>
          <div className={styles.field}>
            <span>Ставка (в час)</span>
            <strong>{user.income_per_hour}</strong>
          </div>
        </article>

        <article className={styles.card}>
          <h2>Информация об аккаунте</h2>
          <div className={styles.field}>
            <span>ID пользователя</span>
            <strong>#{user.id}</strong>
          </div>
          <div className={styles.field}>
            <span>Дата регистрации</span>
            <strong>{formatDate(user.created_at)}</strong>
          </div>
          <div className={styles.field}>
            <span>Роль в системе</span>
            <strong>{user.role.name}</strong>
          </div>
        </article>
      </div>

      <section className={styles.shortcuts}>
        <h2>Быстрые действия</h2>
        <div className={styles.shortcutGrid}>
          {quickLinks.map((item) => (
            <Link key={item.path} to={item.path} className={styles.shortcutLink}>
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
};
