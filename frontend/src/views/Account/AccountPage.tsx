'use client';

import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from 'react';
import type { UserData } from './Account.types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faVk, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { metaApi } from '@/lib/api/crm';
import { resolveApiUrl } from '@/lib/api/client';
import { useNotifications } from '@/components/feedback/Notifications';
import AvatarCropModal from './AvatarCropModal';
import styles from './AccountPage.module.css';

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

export const AccountPage = () => {
  const { notify } = useNotifications();
  const [user, setUser] = useState<UserData | null>(null);
  const [saving, setSaving] = useState(false);
  const [avatarSaving, setAvatarSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditClosing, setIsEditClosing] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarSrcForCrop, setAvatarSrcForCrop] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [form, setForm] = useState({
    email: '',
    first_name: '',
    second_name: '',
    patronymic: '',
    phone: '',
    vk_contact: '',
    telegram_contact: '',
    whatsapp_contact: '',
    max_contact: '',
  });

  const normalizeVkLink = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    const clean = trimmed.replace(/^@/, '').replace(/^vk\.com\//i, '');
    return `https://vk.com/${clean}`;
  };

  const normalizeTelegramLink = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    const clean = trimmed.replace(/^@/, '').replace(/^t\.me\//i, '');
    return `https://t.me/${clean}`;
  };

  const normalizeWhatsappLink = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    const digits = trimmed.replace(/\D/g, '');
    return digits ? `https://wa.me/${digits}` : '';
  };

  const normalizeMaxLink = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    const clean = trimmed.replace(/^@/, '');
    return `https://max.ru/${clean}`;
  };

  const setFormFromUser = (value: UserData) => {
    setForm({
      email: value.email ?? '',
      first_name: value.first_name ?? '',
      second_name: value.second_name ?? '',
      patronymic: value.patronymic ?? '',
      phone: value.phone ?? '',
      vk_contact: value.vk_contact ?? '',
      telegram_contact: value.telegram_contact ?? '',
      whatsapp_contact: value.whatsapp_contact ?? '',
      max_contact: value.max_contact ?? '',
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      window.location.href = '/login';
      return;
    }

    const parsed = JSON.parse(stored) as UserData;
    setUser(parsed);
    setFormFromUser(parsed);

    metaApi.me()
      .then((res) => {
        setUser(res.data);
        setFormFromUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      })
      .catch(() => {
        notify('error', 'Ошибка', 'Не удалось загрузить актуальные данные аккаунта.');
      });

    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  if (!user) return <section className={styles.page}><p className={styles.loading}>Загрузка профиля...</p></section>;

  const roleName = user.role.name.toLowerCase();
  const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');
  const isAdmin = roleName.includes('администратор') || roleName.includes('admin');
  const isManager = roleName.includes('менеджер') || roleName.includes('manager');
  const previewFirstName = form.first_name || user.first_name;
  const previewSecondName = form.second_name || user.second_name;
  const previewPatronymic = form.patronymic || user.patronymic || '';
  const fullName = `${previewSecondName} ${previewFirstName} ${previewPatronymic}`.trim();
  const initials = `${(previewFirstName[0] ?? '')}${(previewSecondName[0] ?? '')}`.toUpperCase();
  const avatarImage = resolveApiUrl(user.avatar_url);
  const profileParts = [form.email || user.email, form.phone || user.phone, form.patronymic || user.patronymic];
  const profileCompleteness = Math.round((profileParts.filter(Boolean).length / profileParts.length) * 100);

  const quickLinks = isTeacher
    ? [
        { label: 'Календарь', path: '/calendar', hint: 'Расписание и занятия' },
        { label: 'Мои ученики', path: '/my-students', hint: 'Список и карточки учеников' },
        { label: 'Аналитика', path: '/analytics', hint: 'Показатели по занятиям' },
      ]
    : [
        { label: 'Клиенты', path: '/clients', hint: 'Карточки и контакты' },
        { label: 'Календарь', path: '/calendar', hint: 'Планирование занятий' },
        { label: 'Аналитика', path: '/analytics', hint: 'Отчеты и метрики' },
        ...(isAdmin || isManager ? [{ label: 'Отработки', path: '/makeups', hint: 'Назначение и контроль' }] : []),
      ];

  const socialProfiles = [
    {
      id: 'vk',
      label: 'ВКонтакте',
      href: normalizeVkLink(user.vk_contact ?? ''),
      short: user.vk_contact?.trim() || 'Не указан',
      helper: 'Профиль или короткое имя',
      className: styles.socialVk,
    },
    {
      id: 'telegram',
      label: 'Telegram',
      href: normalizeTelegramLink(user.telegram_contact ?? ''),
      short: user.telegram_contact?.trim() || 'Не указан',
      helper: 'Ссылка или @username',
      className: styles.socialTelegram,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: normalizeWhatsappLink(user.whatsapp_contact ?? ''),
      short: user.whatsapp_contact?.trim() || 'Не указан',
      helper: 'Телефон или ссылка',
      className: styles.socialWhatsapp,
    },
    {
      id: 'max',
      label: 'MAX',
      href: normalizeMaxLink(user.max_contact ?? ''),
      short: user.max_contact?.trim() || 'Не указан',
      helper: 'Профиль MAX',
      className: styles.socialMax,
    },
  ];
  const socialIconById: Record<string, ReactNode> = {
    vk: <FontAwesomeIcon icon={faVk} />,
    telegram: <FontAwesomeIcon icon={faTelegram} />,
    whatsapp: <FontAwesomeIcon icon={faWhatsapp} />,
    max: <img src="/brands/max.ico" alt="" loading="lazy" />,
  };

  const hasProfileChanges = (
    form.email.trim() !== (user.email ?? '').trim()
    || form.first_name.trim() !== (user.first_name ?? '').trim()
    || form.second_name.trim() !== (user.second_name ?? '').trim()
    || form.patronymic.trim() !== (user.patronymic ?? '').trim()
    || form.phone.trim() !== (user.phone ?? '').trim()
    || form.vk_contact.trim() !== (user.vk_contact ?? '').trim()
    || form.telegram_contact.trim() !== (user.telegram_contact ?? '').trim()
    || form.whatsapp_contact.trim() !== (user.whatsapp_contact ?? '').trim()
    || form.max_contact.trim() !== (user.max_contact ?? '').trim()
  );

  const closeEditPanel = () => {
    if (!isEditMode) return;
    setIsEditClosing(true);
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsEditMode(false);
      setIsEditClosing(false);
      closeTimerRef.current = null;
    }, 190);
  };

  const handleSaveContacts = async () => {
    try {
      setSaving(true);
      const payload = {
        email: form.email.trim() || null,
        first_name: form.first_name.trim() || null,
        second_name: form.second_name.trim() || null,
        patronymic: form.patronymic.trim() || null,
        phone: form.phone.trim() || null,
        vk_contact: form.vk_contact.trim() || null,
        telegram_contact: form.telegram_contact.trim() || null,
        whatsapp_contact: form.whatsapp_contact.trim() || null,
        max_contact: form.max_contact.trim() || null,
      };
      const res = await metaApi.updateMe(payload);
      setUser(res.data);
      setFormFromUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('user-updated'));
      notify('success', 'Сохранено', 'Профиль и контакты обновлены.');
      closeEditPanel();
    } catch {
      notify('error', 'Ошибка', 'Не удалось сохранить контакты.');
    } finally {
      setSaving(false);
    }
  };

  const handleStartEdit = () => {
    if (!user) return;
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsEditClosing(false);
    setFormFromUser(user);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    if (!user) return;
    setFormFromUser(user);
    closeEditPanel();
  };

  const handleAvatarFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      notify('error', 'Ошибка', 'Выберите файл изображения.');
      event.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      notify('error', 'Ошибка', 'Размер файла не должен превышать 5 МБ.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarSrcForCrop(String(reader.result ?? ''));
      setIsAvatarModalOpen(true);
    };
    reader.onerror = () => {
      notify('error', 'Ошибка', 'Не удалось прочитать файл.');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleAvatarSave = async (croppedFile: File) => {
    try {
      setAvatarSaving(true);
      const res = await metaApi.uploadMyAvatar(croppedFile);
      setUser(res.data);
      setFormFromUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('user-updated'));
      setIsAvatarModalOpen(false);
      setAvatarSrcForCrop(null);
      notify('success', 'Сохранено', 'Аватарка обновлена.');
    } catch {
      notify('error', 'Ошибка', 'Не удалось загрузить аватарку.');
    } finally {
      setAvatarSaving(false);
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            {avatarImage ? (
              <img src={avatarImage} alt="Аватар пользователя" />
            ) : initials}
          </div>
          <button
            type="button"
            className={styles.avatarEditButton}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Изменить аватар"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m12 20 3-3m0 0 3-3m-3 3H5" />
              <path d="m19 10-1.5-1.5a2.1 2.1 0 0 0-3 0L8 15v3h3l6.5-6.5a2.1 2.1 0 0 0 0-3Z" />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            className={styles.hiddenFileInput}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleAvatarFileSelect}
          />
        </div>
        <div className={styles.heroMain}>
          <p className={styles.kicker}>Личный кабинет</p>
          <h1>{fullName}</h1>
          <p className={styles.heroSub}>Управляйте профилем и переходите в рабочие разделы из одной страницы.</p>
          <div className={styles.badges}>
            <span className={styles.badge}>{user.role.name}</span>
            <span className={`${styles.badge} ${user.is_accepted ? styles.badgeSuccess : styles.badgePending}`}>
              {user.is_accepted ? 'Доступ подтвержден' : 'Ожидает подтверждения'}
            </span>
          </div>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span>Профиль</span>
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
          <span>Дата регистрации</span>
          <strong>{formatDate(user.created_at)}</strong>
        </article>
        <article className={styles.overviewCard}>
          <span>Статус</span>
          <strong>{user.is_accepted ? 'Активный' : 'Ожидает подтверждения'}</strong>
        </article>
        <article className={styles.overviewCard}>
          <span>Роль</span>
          <strong>{user.role.name}</strong>
        </article>
      </section>

      {isEditMode ? (
        <section className={`${styles.card} ${styles.editPanel} ${isEditClosing ? styles.editPanelClosing : ''}`}>
          <div className={styles.cardHead}>
            <h2>Редактирование профиля</h2>
          </div>
          <p className={styles.editHint}>Заполните основные данные и каналы связи, затем сохраните изменения.</p>
          <div className={styles.profileEditorGrid}>
            <label className={`${styles.inputWrap} ${styles.inputWrapFull}`}>
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="name@example.com"
              />
            </label>
            <label className={`${styles.inputWrap} ${styles.inputWrapFull}`}>
              <span>Телефон</span>
              <input
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+7..."
              />
            </label>
            <label className={styles.inputWrap}>
              <span>Имя</span>
              <input
                value={form.first_name}
                onChange={(e) => setForm((prev) => ({ ...prev, first_name: e.target.value }))}
                placeholder="Введите имя"
              />
            </label>
            <label className={styles.inputWrap}>
              <span>Фамилия</span>
              <input
                value={form.second_name}
                onChange={(e) => setForm((prev) => ({ ...prev, second_name: e.target.value }))}
                placeholder="Введите фамилию"
              />
            </label>
            <label className={styles.inputWrap}>
              <span>Отчество</span>
              <input
                value={form.patronymic}
                onChange={(e) => setForm((prev) => ({ ...prev, patronymic: e.target.value }))}
                placeholder="Введите отчество"
              />
            </label>
          </div>

          <div className={styles.socialEditor}>
            <h3>Контакты для связи</h3>
            <div className={styles.socialEditorGrid}>
              <label className={styles.inputWrap}>
                <span>ВК</span>
                <input
                  value={form.vk_contact}
                  onChange={(e) => setForm((prev) => ({ ...prev, vk_contact: e.target.value }))}
                  placeholder="https://vk.com/username или username"
                />
              </label>
              <label className={styles.inputWrap}>
                <span>Telegram</span>
                <input
                  value={form.telegram_contact}
                  onChange={(e) => setForm((prev) => ({ ...prev, telegram_contact: e.target.value }))}
                  placeholder="https://t.me/username или @username"
                />
              </label>
              <label className={styles.inputWrap}>
                <span>WhatsApp</span>
                <input
                  value={form.whatsapp_contact}
                  onChange={(e) => setForm((prev) => ({ ...prev, whatsapp_contact: e.target.value }))}
                  placeholder="+79991234567 или wa.me/79991234567"
                />
              </label>
              <label className={styles.inputWrap}>
                <span>MAX</span>
                <input
                  value={form.max_contact}
                  onChange={(e) => setForm((prev) => ({ ...prev, max_contact: e.target.value }))}
                  placeholder="https://max.ru/username или username"
                />
              </label>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} disabled={saving} onClick={handleCancelEdit}>
              Отмена
            </button>
            <button type="button" className={styles.saveButton} disabled={saving || !hasProfileChanges} onClick={handleSaveContacts}>
              {saving ? 'Сохранение...' : 'Сохранить профиль'}
            </button>
          </div>
        </section>
      ) : null}

      <div className={styles.gridMain}>
        <article className={styles.card}>
          <div className={styles.cardHead}>
            <h2>Профиль и контакты</h2>
            <button type="button" className={styles.editButton} onClick={handleStartEdit} aria-label="Редактировать профиль">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
              Редактировать
            </button>
          </div>
          <div className={styles.profileReadOnly}>
            <div className={styles.fieldInline}><span>Email</span><strong>{user.email}</strong></div>
            <div className={styles.fieldInline}><span>Телефон</span><strong>{user.phone ?? 'не указан'}</strong></div>
            <div className={styles.fieldInline}><span>Имя</span><strong>{user.first_name}</strong></div>
            <div className={styles.fieldInline}><span>Фамилия</span><strong>{user.second_name}</strong></div>
            <div className={styles.fieldInline}><span>Отчество</span><strong>{user.patronymic ?? 'не указано'}</strong></div>
            <div className={styles.fieldInline}><span>Ставка</span><strong>{user.income_per_hour} / час</strong></div>
          </div>
        </article>

        <article className={styles.card}>
          <h2>Параметры аккаунта</h2>
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
          <div className={styles.socialProfiles}>
            <h3>Связаться через соцсети</h3>
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
                    aria-label={`Открыть ${profile.label}`}
                  >
                    <span className={styles.socialIconBadge}>{socialIconById[profile.id]}</span>
                  </a>
                ) : (
                  <button
                    key={profile.id}
                    type="button"
                    className={`${styles.socialIconLink} ${styles.socialIconLinkDisabled} ${profile.className}`}
                    disabled
                    title={`${profile.label}: не указано`}
                    aria-label={`${profile.label} не указан`}
                  >
                    <span className={styles.socialIconBadge}>{socialIconById[profile.id]}</span>
                  </button>
                )
              ))}
            </div>
            <p className={styles.socialIconsHint}>Наведите на иконку, чтобы увидеть подпись.</p>
          </div>
        </article>
      </div>

      <section className={styles.shortcuts}>
        <div className={styles.shortcutsHead}>
          <h2>Быстрые разделы</h2>
          <p>Откройте нужный рабочий раздел в один клик.</p>
        </div>
        <div className={styles.shortcutGrid}>
          {quickLinks.map((item) => (
            <Link key={item.path} href={item.path} className={styles.shortcutLink}>
              <strong>{item.label}</strong>
              <span>{item.hint}</span>
            </Link>
          ))}
        </div>
      </section>

      {isAvatarModalOpen && avatarSrcForCrop ? (
        <AvatarCropModal
          imageSrc={avatarSrcForCrop}
          isSaving={avatarSaving}
          onCancel={() => {
            if (avatarSaving) return;
            setIsAvatarModalOpen(false);
            setAvatarSrcForCrop(null);
          }}
          onSave={handleAvatarSave}
        />
      ) : null}
    </section>
  );
};
