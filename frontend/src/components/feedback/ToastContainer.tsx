'use client';

import { useNotificationsStore } from '@/lib/stores/notifications-store';
import './Notifications.css';

export function ToastContainer() {
  const toastIds = useNotificationsStore((s) => s.toastIds);
  const notifications = useNotificationsStore((s) => s.notifications);
  const dismissToast = useNotificationsStore((s) => s.dismissToast);
  const dismissAllToasts = useNotificationsStore((s) => s.dismissAllToasts);

  const toastItems = toastIds
    .map((id) => notifications.find((item) => item.id === id))
    .filter(Boolean);

  if (toastItems.length === 0) return null;

  return (
    <div className="notifications" role="status" aria-live="polite">
      <div className="notifications-actions">
        <button type="button" className="notifications-hide-all" onClick={dismissAllToasts}>
          Скрыть все
        </button>
      </div>
      {toastItems.map((item) => item && (
        <article key={item.id} className={`notification notification--${item.type}`}>
          <button
            type="button"
            className="notification-close"
            onClick={() => dismissToast(item.id)}
            aria-label="Скрыть уведомление"
          >
            ×
          </button>
          <p className="notification-title">{item.title}</p>
          <p className="notification-text">{item.message}</p>
        </article>
      ))}
    </div>
  );
}
