import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { archiveApi } from '../../api/crm';
import { useNotifications } from '../../components/feedback/Notifications';
import { useConfirmDialog } from '../../components/feedback/ConfirmDialog';
import type { ArchiveEntity, ArchiveItem, ArchiveSortBy, ArchiveSortDir } from '../../types/crm.types';
import styles from './ArchivePage.module.css';

const ENTITY_OPTIONS: Array<{ value: ArchiveEntity | 'all'; label: string }> = [
  { value: 'all', label: 'Все' },
  { value: 'clients', label: 'Клиенты' },
  { value: 'lessons', label: 'Занятия' },
  { value: 'deals', label: 'Сделки' },
  { value: 'tasks', label: 'Задачи' },
  { value: 'courses', label: 'Курсы' },
  { value: 'groups', label: 'Группы' },
];

const ENTITY_LABEL: Record<ArchiveEntity, string> = {
  clients: 'Клиент',
  lessons: 'Занятие',
  deals: 'Сделка',
  tasks: 'Задача',
  courses: 'Курс',
  groups: 'Группа',
};

export const ArchivePage = () => {
  const { notify } = useNotifications();
  const { confirm } = useConfirmDialog();
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [query, setQuery] = useState('');
  const [entity, setEntity] = useState<ArchiveEntity | 'all'>('all');
  const [archivedFrom, setArchivedFrom] = useState('');
  const [archivedTo, setArchivedTo] = useState('');
  const [sortBy, setSortBy] = useState<ArchiveSortBy>('archived_at');
  const [sortDir, setSortDir] = useState<ArchiveSortDir>('desc');
  const [loading, setLoading] = useState(false);

  const load = async (overrides?: {
    entity?: ArchiveEntity | 'all';
    q?: string;
    archivedFrom?: string;
    archivedTo?: string;
    sortBy?: ArchiveSortBy;
    sortDir?: ArchiveSortDir;
  }) => {
    setLoading(true);
    const effectiveEntity = overrides?.entity ?? entity;
    const effectiveQuery = overrides?.q ?? query;
    const effectiveArchivedFrom = overrides?.archivedFrom ?? archivedFrom;
    const effectiveArchivedTo = overrides?.archivedTo ?? archivedTo;
    const effectiveSortBy = overrides?.sortBy ?? sortBy;
    const effectiveSortDir = overrides?.sortDir ?? sortDir;
    try {
      const response = await archiveApi.list({
        entity: effectiveEntity,
        q: effectiveQuery || undefined,
        archived_from: effectiveArchivedFrom ? new Date(`${effectiveArchivedFrom}T00:00:00`).toISOString() : undefined,
        archived_to: effectiveArchivedTo ? new Date(`${effectiveArchivedTo}T23:59:59`).toISOString() : undefined,
        sort_by: effectiveSortBy,
        sort_dir: effectiveSortDir,
      });
      setItems(response.data);
    } catch {
      notify('error', 'Ошибка архива', 'Не удалось загрузить архивные элементы.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load().catch(console.error);
  }, [entity, sortBy, sortDir]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      load().catch(console.error);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [query, archivedFrom, archivedTo]);

  const filteredCount = useMemo(() => items.length, [items]);

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Архив удаленных элементов</h1>
          <p>Поиск, фильтрация и восстановление удаленных данных</p>
        </div>
        <button type="button" className={styles.refreshBtn} onClick={() => load()}>
          Обновить
        </button>
      </div>

      <div className={styles.filters}>
        <input
          className={styles.input}
          placeholder="Поиск по названию или описанию"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select className={styles.select} value={entity} onChange={(e) => setEntity(e.target.value as ArchiveEntity | 'all')}>
          {ENTITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <input
          className={styles.input}
          type="date"
          value={archivedFrom}
          onChange={(e) => setArchivedFrom(e.target.value)}
          title="Дата архивирования: от"
        />

        <input
          className={styles.input}
          type="date"
          value={archivedTo}
          onChange={(e) => setArchivedTo(e.target.value)}
          title="Дата архивирования: до"
        />

        <select className={styles.select} value={sortBy} onChange={(e) => setSortBy(e.target.value as ArchiveSortBy)}>
          <option value="archived_at">Сортировка: дата</option>
          <option value="title">Сортировка: название</option>
          <option value="entity">Сортировка: тип</option>
        </select>

        <select className={styles.select} value={sortDir} onChange={(e) => setSortDir(e.target.value as ArchiveSortDir)}>
          <option value="desc">Сначала новые</option>
          <option value="asc">Сначала старые</option>
        </select>

      </div>

      <p className={styles.count}>Найдено: {filteredCount}</p>

      {loading ? (
        <p className={styles.empty}>Загрузка...</p>
      ) : items.length === 0 ? (
        <p className={styles.empty}>В архиве ничего не найдено.</p>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <article className={styles.item} key={`${item.entity}-${item.entity_id}`}>
              <div>
                <span className={styles.entityBadge}>{ENTITY_LABEL[item.entity]}</span>
                <h3>{item.title}</h3>
                <p>{item.subtitle ?? 'Без дополнительного описания'}</p>
                <small>Архивировано: {new Date(item.archived_at).toLocaleString()}</small>
              </div>

              <div className={styles.actions}>
                <Link to={`/archive/${item.entity}/${item.entity_id}`} className={styles.linkBtn}>Открыть</Link>
                <button
                  type="button"
                  className={styles.restoreBtn}
                  onClick={async () => {
                    if (!(await confirm({
                      title: 'Восстановление',
                      message: 'Восстановить элемент из архива?',
                      confirmText: 'Восстановить',
                    }))) return;
                    try {
                      await archiveApi.restore(item.entity, item.entity_id);
                      notify('success', 'Восстановлено', 'Элемент успешно восстановлен.', { href: '/archive' });
                      await load();
                    } catch {
                      notify('error', 'Ошибка', 'Не удалось восстановить элемент.');
                    }
                  }}
                >
                  Восстановить
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
