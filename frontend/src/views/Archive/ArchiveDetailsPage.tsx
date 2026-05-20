'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { archiveApi } from '@/lib/api/crm';
import { useNotifications } from '@/components/feedback/Notifications';
import { useConfirmDialog } from '@/components/feedback/ConfirmDialog';
import type { ArchiveEntity } from '@/types/crm.types';
import styles from './ArchivePage.module.css';

const ALLOWED: ArchiveEntity[] = ['clients', 'courses', 'groups', 'lessons', 'deals', 'tasks'];
const ACTIVE_ROUTE_MAP: Record<ArchiveEntity, (id: number) => string> = {
  clients: (id) => `/clients/${id}`,
  lessons: (id) => `/calendar/${id}/edit`,
  deals: (id) => `/deals#deal-${id}`,
  tasks: (id) => `/tasks#task-${id}`,
  courses: () => '/courses',
  groups: () => '/groups',
};

export const ArchiveDetailsPage = () => {
  const { notify } = useNotifications();
  const { confirm } = useConfirmDialog();
  const router = useRouter();
  const { entity, entityId } = useParams();
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (!entity || !entityId || !ALLOWED.includes(entity as ArchiveEntity)) {
      return;
    }

    archiveApi.get(entity as ArchiveEntity, Number(entityId))
      .then((response) => setData(response.data))
      .catch(() => notify('error', 'Ошибка', 'Не удалось загрузить архивный элемент.'));
  }, [entity, entityId]);

  if (!entity || !entityId) {
    return <section className={styles.page}>Некорректные параметры.</section>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Архивный элемент</h1>
          <p>{entity} #{entityId}</p>
        </div>
        <div className={styles.actions}>
          <Link href="/archive" className={styles.linkBtn}>Назад в архив</Link>
          {ALLOWED.includes(entity as ArchiveEntity) && (
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
                  const entityName = entity as ArchiveEntity;
                  const id = Number(entityId);
                  await archiveApi.restore(entityName, id);
                  notify('success', 'Восстановлено', 'Элемент восстановлен и снова доступен в системе.', {
                    href: ACTIVE_ROUTE_MAP[entityName](id),
                  });
                  router.push(ACTIVE_ROUTE_MAP[entityName](id));
                } catch {
                  notify('error', 'Ошибка', 'Не удалось восстановить элемент.');
                }
              }}
            >
              Восстановить и открыть
            </button>
          )}
        </div>
      </div>

      {!data ? (
        <p className={styles.empty}>Загрузка...</p>
      ) : (
        <div className={styles.detailsCard}>
          {Object.entries(data).map(([key, value]) => (
            <div className={styles.detailRow} key={key}>
              <strong>{key}</strong>
              <span>{value === null ? 'null' : String(value)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
