import React, { useEffect, useRef, useState } from 'react';
import { Bell, Search, User, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Header.module.css';
import type { UserType } from '../../types/User.types';
import { useNotifications } from '../feedback/Notifications';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  isMobileMenuOpen?: boolean;
}

const emptyUser: UserType = {
  id: 0,
  email: '',
  first_name: '',
  second_name: '',
  patronymic: null,
  income_per_hour: 0,
  phone: null,
  is_accepted: false,
  created_at: new Date().toISOString(),
  role: { id: 0, name: '' },
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarCollapsed, isMobileMenuOpen = false }) => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isMobile, setIsMobile] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [user, setUser] = useState<UserType>(emptyUser);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!isNotificationsOpen) {
        return;
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isNotificationsOpen]);

  return (
    <header className={`${styles.header} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.leftSection}>
        <button className={styles.sidebarToggle} onClick={toggleSidebar} aria-label="Toggle sidebar">
          {isMobile ? (isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />) : isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <div className={styles.search}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search..." className={styles.searchInput} />
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.notificationsWrap} ref={notificationsRef}>
          <button
            className={styles.iconButton}
            onClick={() => {
              const nextOpen = !isNotificationsOpen;
              setIsNotificationsOpen(nextOpen);
              if (nextOpen) {
                markAllAsRead();
              }
            }}
            aria-label="Открыть уведомления"
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>}
          </button>

          {isNotificationsOpen && (
            <div className={styles.notificationsPanel}>
              <div className={styles.notificationsHeader}>
                <strong>Уведомления</strong>
                <button type="button" className={styles.linkButton} onClick={markAllAsRead}>
                  Прочитать все
                </button>
              </div>

              <div className={styles.notificationsList}>
                {notifications.length === 0 ? (
                  <p className={styles.notificationsEmpty}>Пока уведомлений нет</p>
                ) : (
                  notifications.slice(0, 50).map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      className={`${styles.notificationItem} ${!item.read ? styles.unread : ''}`}
                      onClick={() => {
                        markAsRead(item.id);
                        if (item.href) {
                          navigate(item.href);
                          setIsNotificationsOpen(false);
                        }
                      }}
                    >
                      <div className={styles.notificationTop}>
                        <span className={styles.notificationTitle}>{item.title}</span>
                        <span className={styles.notificationTime}>
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <span className={styles.notificationText}>{item.message}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.userMenu}
          onClick={() => navigate('/account')}
          aria-label="Открыть профиль"
        >
          <div className={styles.avatar}>
            <User size={24} />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.second_name} {user.first_name}</span>
            <span className={styles.userRole}>{user.role.name}</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
