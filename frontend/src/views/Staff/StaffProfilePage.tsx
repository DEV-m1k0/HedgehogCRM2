'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faVk, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { metaApi } from '@/lib/api/crm';
import { resolveApiUrl } from '@/lib/api/client';
import { useNotifications } from '@/components/feedback/Notifications';
import { useAppLanguage } from '@/i18n/AppLanguage';
import type { User } from '@/types/crm.types';
import styles from './StaffProfilePage.module.css';
const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

export const StaffProfilePage = () => {
  const { userId } = useParams();
  const router = useRouter();
  const { notify } = useNotifications();
  const { language } = useAppLanguage();
  const isEn = language === 'en';
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const targetId = Number(userId);
    if (!Number.isInteger(targetId) || targetId <= 0) {
      router.replace('/staff');
      return;
    }
    const load = async () => {
      try {
        setLoading(true);
        const response = await metaApi.users();
        const found = response.data.find((item) => item.id === targetId) ?? null;
        if (!found) {
          notify('error', isEn ? 'Not found' : 'Не найдено', isEn ? 'Employee not found.' : 'Сотрудник не найден.');
          router.replace('/staff');
          return;
        }
        setUser(found);
      } catch {
        notify('error', isEn ? 'Error' : 'Ошибка', isEn ? 'Failed to load employee profile.' : 'Не удалось загрузить профиль сотрудника.');
      } finally {
        setLoading(false);
      }
    };
    load().catch(() => {
      // no-op
    });
  }, [isEn, router, notify, userId]);

  const avatar = useMemo(() => resolveApiUrl(user?.avatar_url), [user?.avatar_url]);
  const initials = `${user?.first_name?.[0] ?? ''}${user?.second_name?.[0] ?? ''}`.toUpperCase();
  const fullName = `${user?.second_name ?? ''} ${user?.first_name ?? ''} ${user?.patronymic ?? ''}`.trim();
  const profileParts = [user?.email, user?.phone, user?.patronymic];
  const profileCompleteness = Math.round((profileParts.filter(Boolean).length / profileParts.length) * 100);
  const socialProfiles = [
    {
      id: 'vk',
      label: 'VK',
      href: user?.vk_contact ? (user.vk_contact.startsWith('http') ? user.vk_contact : `https://vk.com/${user.vk_contact.replace(/^@/, '')}`) : '',
      short: user?.vk_contact?.trim() || (isEn ? 'Not specified' : 'Не указан'),
      className: styles.socialVk,
    },
    {
      id: 'telegram',
      label: 'Telegram',
      href: user?.telegram_contact ? (user.telegram_contact.startsWith('http') ? user.telegram_contact : `https://t.me/${user.telegram_contact.replace(/^@/, '')}`) : '',
      short: user?.telegram_contact?.trim() || (isEn ? 'Not specified' : 'Не указан'),
      className: styles.socialTelegram,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: user?.whatsapp_contact ? (user.whatsapp_contact.startsWith('http') ? user.whatsapp_contact : `https://wa.me/${user.whatsapp_contact.replace(/\D/g, '')}`) : '',
      short: user?.whatsapp_contact?.trim() || (isEn ? 'Not specified' : 'Не указан'),
      className: styles.socialWhatsapp,
    },
    {
      id: 'max',
      label: 'MAX',
      href: user?.max_contact ? (user.max_contact.startsWith('http') ? user.max_contact : `https://max.ru/${user.max_contact.replace(/^@/, '')}`) : '',
      short: user?.max_contact?.trim() || (isEn ? 'Not specified' : 'Не указан'),
      className: styles.socialMax,
    },
  ];
  const socialIconById: Record<string, ReactNode> = {
    vk: <FontAwesomeIcon icon={faVk} />,
    telegram: <FontAwesomeIcon icon={faTelegram} />,
    whatsapp: <FontAwesomeIcon icon={faWhatsapp} />,
    max: <img src="/brands/max.ico" alt="" loading="lazy" />,
  };

  if (loading) {
    return <section className={styles.page}><p className={styles.state}>{isEn ? 'Loading profile...' : 'Загрузка профиля...'}</p></section>;
  }

  if (!user) {
    return <section className={styles.page}><p className={styles.state}>{isEn ? 'Employee not found.' : 'Сотрудник не найден.'}</p></section>;
  }

  return (
    <section className={styles.page}>
      <Link href="/staff" className={styles.backLink}>{isEn ? '← Back to team' : '← Назад к команде'}</Link>

      <header className={styles.header}>
        <div className={styles.avatar}>
          {avatar ? <img src={avatar} alt="" /> : <span>{initials || 'U'}</span>}
        </div>
        <div className={styles.headerInfo}>
          <h1>{fullName}</h1>
          <p>{user.role.name}</p>
          <div className={styles.badges}>
            <span className={styles.badge}>{user.role.name}</span>
            <span className={`${styles.badge} ${user.is_accepted ? styles.active : styles.pending}`}>
              {user.is_accepted ? (isEn ? 'Active account' : 'Активный аккаунт') : (isEn ? 'Pending confirmation' : 'Ожидает подтверждения')}
            </span>
          </div>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span>{isEn ? 'Profile' : 'Профиль'}</span>
            <strong>{profileCompleteness}%</strong>
          </div>
          <div className={styles.stat}>
            <span>ID</span>
            <strong>#{user.id}</strong>
          </div>
        </div>
      </header>

      <section className={styles.overview}>
        <article className={styles.overviewCard}>
          <span>{isEn ? 'Registration date' : 'Дата регистрации'}</span>
          <strong>{formatDate(user.created_at)}</strong>
        </article>
        <article className={styles.overviewCard}>
          <span>{isEn ? 'Status' : 'Статус'}</span>
          <strong>{user.is_accepted ? (isEn ? 'Active' : 'Активный') : (isEn ? 'Pending' : 'Ожидает подтверждения')}</strong>
        </article>
        <article className={styles.overviewCard}>
          <span>{isEn ? 'Role' : 'Роль'}</span>
          <strong>{user.role.name}</strong>
        </article>
      </section>

      <div className={styles.gridMain}>
        <article className={styles.card}>
          <h2>{isEn ? 'Profile and contacts' : 'Профиль и контакты'}</h2>
          <div className={styles.profileReadOnly}>
            <div className={styles.fieldInline}><span>Email</span><strong>{user.email}</strong></div>
            <div className={styles.fieldInline}><span>{isEn ? 'Phone' : 'Телефон'}</span><strong>{user.phone ?? (isEn ? 'Not specified' : 'Не указан')}</strong></div>
            <div className={styles.fieldInline}><span>{isEn ? 'First name' : 'Имя'}</span><strong>{user.first_name}</strong></div>
            <div className={styles.fieldInline}><span>{isEn ? 'Last name' : 'Фамилия'}</span><strong>{user.second_name}</strong></div>
            <div className={styles.fieldInline}><span>{isEn ? 'Middle name' : 'Отчество'}</span><strong>{user.patronymic ?? (isEn ? 'Not specified' : 'Не указано')}</strong></div>
          </div>
        </article>

        <article className={styles.card}>
          <h2>{isEn ? 'Account parameters' : 'Параметры аккаунта'}</h2>
          <div className={styles.field}><span>ID</span><strong>#{user.id}</strong></div>
          <div className={styles.field}><span>{isEn ? 'Created at' : 'Дата регистрации'}</span><strong>{formatDate(user.created_at)}</strong></div>
          <div className={styles.field}><span>{isEn ? 'Role in system' : 'Роль в системе'}</span><strong>{user.role.name}</strong></div>
          <div className={styles.socialProfiles}>
            <h3>{isEn ? 'Social contacts' : 'Связаться через соцсети'}</h3>
            <div className={styles.socialIconsGrid}>
              {socialProfiles.map((profile) => (
                profile.href ? (
                  <a
                    key={profile.id}
                    href={profile.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.socialIconLink} ${profile.className}`}
                    title={`${profile.label}: ${profile.short}`}
                    aria-label={`${isEn ? 'Open' : 'Открыть'} ${profile.label}`}
                  >
                    <span className={styles.socialIconBadge}>{socialIconById[profile.id]}</span>
                  </a>
                ) : (
                  <button
                    key={profile.id}
                    type="button"
                    className={`${styles.socialIconLink} ${styles.socialIconLinkDisabled} ${profile.className}`}
                    disabled
                    title={`${profile.label}: ${isEn ? 'not set' : 'не указан'}`}
                    aria-label={`${profile.label} ${isEn ? 'not set' : 'не указан'}`}
                  >
                    <span className={styles.socialIconBadge}>{socialIconById[profile.id]}</span>
                  </button>
                )
              ))}
            </div>
            <p className={styles.socialIconsHint}>{isEn ? 'Hover an icon to see details.' : 'Наведите на иконку, чтобы увидеть подпись.'}</p>
          </div>
        </article>
      </div>
    </section>
  );
};
