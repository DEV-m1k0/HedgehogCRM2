import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import './Notifications.css';

export type NotifyType = 'success' | 'error' | 'info';

export interface NotificationItem {
  id: number;
  type: NotifyType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  href?: string;
}

interface NotificationsContextValue {
  notify: (type: NotifyType, title: string, message: string, options?: { href?: string }) => void;
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [toastIds, setToastIds] = useState<number[]>([]);

  const notify = useCallback((type: NotifyType, title: string, message: string, options?: { href?: string }) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setNotifications((prev) => [
      {
        id,
        type,
        title,
        message,
        createdAt: new Date().toISOString(),
        read: false,
        href: options?.href,
      },
      ...prev,
    ]);
    setToastIds((prev) => [id, ...prev]);

    setTimeout(() => {
      setToastIds((prev) => prev.filter((toastId) => toastId !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToastIds((prev) => prev.filter((toastId) => toastId !== id));
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  }, []);

  const dismissAllToasts = useCallback(() => {
    setToastIds([]);
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  }, []);

  const markAsRead = useCallback((id: number) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  }, []);

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);
  const toastItems = useMemo(
    () => toastIds.map((id) => notifications.find((item) => item.id === id)).filter(Boolean) as NotificationItem[],
    [toastIds, notifications],
  );

  const value = useMemo(
    () => ({ notify, notifications, unreadCount, markAsRead, markAllAsRead }),
    [notify, notifications, unreadCount, markAsRead, markAllAsRead],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
      {toastItems.length > 0 && (
        <div className="notifications" role="status" aria-live="polite">
          <div className="notifications-actions">
            <button type="button" className="notifications-hide-all" onClick={dismissAllToasts}>
              Скрыть все
            </button>
          </div>
          {toastItems.map((item) => (
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
      )}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used inside NotificationsProvider');
  }
  return context;
};
