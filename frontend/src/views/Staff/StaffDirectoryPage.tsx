'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faVk, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { metaApi } from '@/lib/api/crm';
import { resolveApiUrl } from '@/lib/api/client';
import { useNotifications } from '@/components/feedback/Notifications';
import { useAppLanguage } from '@/i18n/AppLanguage';
import type { User } from '@/types/crm.types';
import styles from './StaffDirectoryPage.module.css';

const getRoleBucket = (roleName: string): 'teachers' | 'managers' | 'admins' | 'other' => {
  const raw = roleName.toLowerCase();
  if (raw.includes('преподаватель') || raw.includes('teacher')) return 'teachers';
  if (raw.includes('менеджер') || raw.includes('manager')) return 'managers';
  if (raw.includes('администратор') || raw.includes('admin')) return 'admins';
  return 'other';
};

export const StaffDirectoryPage = () => {
  const { notify } = useNotifications();
  const { language } = useAppLanguage();
  const isEn = language === 'en';
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [layout, setLayout] = useState<'grid' | 'list'>(() => {
    const saved = localStorage.getItem('staff-layout');
    return saved === 'list' ? 'list' : 'grid';
  });

  useEffect(() => {
    localStorage.setItem('staff-layout', layout);
  }, [layout]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await metaApi.users();
        const filtered = response.data.filter((user) => {
          const bucket = getRoleBucket(user.role.name);
          return bucket === 'teachers' || bucket === 'managers' || bucket === 'admins';
        });
        setUsers(filtered);
      } catch {
        notify('error', isEn ? 'Error' : 'Ошибка', isEn ? 'Failed to load staff list.' : 'Не удалось загрузить список сотрудников.');
      } finally {
        setLoading(false);
      }
    };
    load().catch(() => {
      // no-op
    });
  }, [isEn, notify]);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter((user) => {
      const fullName = `${user.second_name} ${user.first_name} ${user.patronymic ?? ''}`.toLowerCase();
      return fullName.includes(term)
        || user.email.toLowerCase().includes(term)
        || (user.phone ?? '').toLowerCase().includes(term)
        || user.role.name.toLowerCase().includes(term);
    });
  }, [search, users]);

  const grouped = useMemo(() => {
    const result: Record<'teachers' | 'managers' | 'admins', User[]> = {
      teachers: [],
      managers: [],
      admins: [],
    };
    filteredUsers.forEach((user) => {
      const bucket = getRoleBucket(user.role.name);
      if (bucket !== 'other') {
        result[bucket].push(user);
      }
    });
    return result;
  }, [filteredUsers]);

  const sections: Array<{ key: 'teachers' | 'managers' | 'admins'; title: string }> = [
    { key: 'teachers', title: isEn ? 'Teachers' : 'Преподаватели' },
    { key: 'managers', title: isEn ? 'Managers' : 'Менеджеры' },
    { key: 'admins', title: isEn ? 'Administrators' : 'Администраторы' },
  ];

  const socialIconById: Record<string, ReactNode> = {
    vk: <FontAwesomeIcon icon={faVk} />,
    telegram: <FontAwesomeIcon icon={faTelegram} />,
    whatsapp: <FontAwesomeIcon icon={faWhatsapp} />,
    max: <img src="/brands/max.ico" alt="" loading="lazy" />,
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>{isEn ? 'Staff Directory' : 'Сотрудники системы'}</h1>
        <p>{isEn ? 'Full directory of teachers, managers and administrators.' : 'Полная информация о преподавателях, менеджерах и администраторах.'}</p>
      </header>

      <div className={styles.toolbar}>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={isEn ? 'Search by name, email, phone, role...' : 'Поиск по ФИО, email, телефону, роли...'}
        />
        <div className={styles.toolbarMeta}>
          <span className={styles.count}>
            {isEn ? `Total: ${filteredUsers.length}` : `Всего: ${filteredUsers.length}`}
          </span>
          <div className={styles.layoutSwitch} role="tablist" aria-label={isEn ? 'Staff layout' : 'Вид отображения'}>
            <button
              type="button"
              className={`${styles.layoutButton} ${layout === 'grid' ? styles.layoutButtonActive : ''}`}
              onClick={() => setLayout('grid')}
              role="tab"
              aria-selected={layout === 'grid'}
              title={isEn ? 'Grid view' : 'Сетка'}
            >
              {isEn ? 'Grid' : 'Сетка'}
            </button>
            <button
              type="button"
              className={`${styles.layoutButton} ${layout === 'list' ? styles.layoutButtonActive : ''}`}
              onClick={() => setLayout('list')}
              role="tab"
              aria-selected={layout === 'list'}
              title={isEn ? 'List view' : 'Список'}
            >
              {isEn ? 'List' : 'Список'}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p className={styles.state}>{isEn ? 'Loading staff...' : 'Загрузка сотрудников...'}</p>
      ) : (
        <div className={styles.sections}>
          {sections.map((section) => (
            <article key={section.key} className={styles.section}>
              <div className={styles.sectionHead}>
                <h2>{section.title}</h2>
                <span>{grouped[section.key].length}</span>
              </div>
              {grouped[section.key].length === 0 ? (
                <p className={styles.empty}>{isEn ? 'No employees in this section.' : 'В этом разделе нет сотрудников.'}</p>
              ) : (
                <div
                  className={`${styles.grid} ${layout === 'list' ? styles.gridList : ''}`}
                >
                  {grouped[section.key].map((user) => {
                    const avatar = resolveApiUrl(user.avatar_url);
                    const initials = `${user.first_name?.[0] ?? ''}${user.second_name?.[0] ?? ''}`.toUpperCase();
                    return (
                      <article
                        key={user.id}
                        className={`${styles.card} ${layout === 'list' ? styles.cardList : ''}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => router.push(`/staff/${user.id}`)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            router.push(`/staff/${user.id}`);
                          }
                        }}
                      >
                        <div className={styles.cardTop}>
                          <div className={styles.avatar}>
                            {avatar ? <img src={avatar} alt="" /> : <span>{initials || 'U'}</span>}
                          </div>
                          <div>
                            <h3>{user.second_name} {user.first_name} {user.patronymic ?? ''}</h3>
                            <p>{user.role.name}</p>
                          </div>
                        </div>

                        <dl className={styles.meta}>
                          <div>
                            <dt>Email</dt>
                            <dd>{user.email}</dd>
                          </div>
                          <div>
                            <dt>{isEn ? 'Phone' : 'Телефон'}</dt>
                            <dd>{user.phone ?? (isEn ? 'Not specified' : 'Не указан')}</dd>
                          </div>
                        </dl>

                        <div className={styles.contacts}>
                          {user.telegram_contact ? (
                            <a
                              onClick={(e) => e.stopPropagation()}
                              href={user.telegram_contact.startsWith('http') ? user.telegram_contact : `https://t.me/${user.telegram_contact.replace(/^@/, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className={`${styles.socialIconLink} ${styles.socialTelegram}`}
                              aria-label="Telegram"
                              title="Telegram"
                            >
                              <span className={styles.socialIconBadge}>{socialIconById.telegram}</span>
                            </a>
                          ) : null}
                          {user.vk_contact ? (
                            <a
                              onClick={(e) => e.stopPropagation()}
                              href={user.vk_contact.startsWith('http') ? user.vk_contact : `https://vk.com/${user.vk_contact.replace(/^@/, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className={`${styles.socialIconLink} ${styles.socialVk}`}
                              aria-label="VK"
                              title="VK"
                            >
                              <span className={styles.socialIconBadge}>{socialIconById.vk}</span>
                            </a>
                          ) : null}
                          {user.whatsapp_contact ? (
                            <a
                              onClick={(e) => e.stopPropagation()}
                              href={user.whatsapp_contact.startsWith('http') ? user.whatsapp_contact : `https://wa.me/${user.whatsapp_contact.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className={`${styles.socialIconLink} ${styles.socialWhatsapp}`}
                              aria-label="WhatsApp"
                              title="WhatsApp"
                            >
                              <span className={styles.socialIconBadge}>{socialIconById.whatsapp}</span>
                            </a>
                          ) : null}
                          {user.max_contact ? (
                            <a
                              onClick={(e) => e.stopPropagation()}
                              href={user.max_contact.startsWith('http') ? user.max_contact : `https://max.ru/${user.max_contact.replace(/^@/, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className={`${styles.socialIconLink} ${styles.socialMax}`}
                              aria-label="MAX"
                              title="MAX"
                            >
                              <span className={styles.socialIconBadge}>{socialIconById.max}</span>
                            </a>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
