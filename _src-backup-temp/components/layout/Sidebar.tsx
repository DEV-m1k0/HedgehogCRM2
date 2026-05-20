import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Home,
  LogOut,
  Mail,
  Settings,
  UserCircle2,
  Users,
  X,
  FolderKanban,
  FileText,
  ArchiveRestore,
  Shield,
} from 'lucide-react';
import styles from './styles/Sidebar.module.css';
import type { MenuItem } from '../../types/layout.types';
import type { UserType } from '../../types/User.types';
import { authApi } from '../../api/crm';
import { useAppLanguage } from '../../i18n/AppLanguage';

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile?: () => void;
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

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, isMobileOpen, onCloseMobile }) => {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<UserType>(emptyUser);
  const navigate = useNavigate();
  const { language } = useAppLanguage();
  const isEn = language === 'en';

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

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore transport errors on logout
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
  };

  const handleLinkClick = () => {
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  const roleName = user.role?.name?.toLowerCase() ?? '';
  const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');
  const isAdmin = roleName.includes('администратор') || roleName.includes('admin');
  const isManager = roleName.includes('менеджер') || roleName.includes('manager');

  const menuItems: MenuItem[] = useMemo(() => {
    if (isTeacher) {
      return [
        { id: 'calendar', label: isEn ? 'Calendar' : 'Календарь', icon: <Calendar size={20} />, path: '/calendar' },
        { id: 'my-students', label: isEn ? 'My Students' : 'Мои ученики', icon: <Users size={20} />, path: '/my-students' },
        { id: 'staff', label: isEn ? 'Team' : 'Команда', icon: <UserCircle2 size={20} />, path: '/staff' },
        { id: 'analytics', label: isEn ? 'Analytics' : 'Аналитика', icon: <BarChart3 size={20} />, path: '/analytics' },
        { id: 'settings', label: isEn ? 'Settings' : 'Настройки', icon: <Settings size={20} />, path: '/settings' },
      ];
    }

    if (isManager) {
      return [
        { id: 'clients', label: isEn ? 'Clients' : 'Клиенты', icon: <Users size={20} />, path: '/clients' },
        { id: 'deals', label: isEn ? 'Deals' : 'Сделки', icon: <FolderKanban size={20} />, path: '/deals' },
        { id: 'tasks', label: isEn ? 'Tasks' : 'Задачи', icon: <FileText size={20} />, path: '/tasks' },
        { id: 'calendar', label: isEn ? 'Calendar' : 'Календарь', icon: <Calendar size={20} />, path: '/calendar' },
        { id: 'analytics', label: isEn ? 'Analytics' : 'Аналитика', icon: <BarChart3 size={20} />, path: '/analytics' },
        { id: 'archive', label: isEn ? 'Archive' : 'Архив', icon: <ArchiveRestore size={20} />, path: '/archive' },
        { id: 'account', label: isEn ? 'Profile' : 'Профиль', icon: <UserCircle2 size={20} />, path: '/account' },
        { id: 'settings', label: isEn ? 'Settings' : 'Настройки', icon: <Settings size={20} />, path: '/settings' },
      ];
    }

    return [
      { id: 'dashboard', label: isEn ? 'Dashboard' : 'Дашборд', icon: <Home size={20} />, path: '/' },
      { id: 'clients', label: isEn ? 'Clients' : 'Клиенты', icon: <Users size={20} />, path: '/clients' },
      { id: 'deals', label: isEn ? 'Deals' : 'Сделки', icon: <FolderKanban size={20} />, path: '/deals' },
      { id: 'tasks', label: isEn ? 'Tasks' : 'Задачи', icon: <FileText size={20} />, path: '/tasks' },
      { id: 'calendar', label: isEn ? 'Calendar' : 'Календарь', icon: <Calendar size={20} />, path: '/calendar' },
      { id: 'analytics', label: isEn ? 'Analytics' : 'Аналитика', icon: <BarChart3 size={20} />, path: '/analytics' },
      { id: 'archive', label: isEn ? 'Archive' : 'Архив', icon: <ArchiveRestore size={20} />, path: '/archive' },
      ...(isAdmin ? [{ id: 'admin-activity', label: isEn ? 'Admin Activity' : 'Активность админа', icon: <Shield size={20} />, path: '/admin/activity' }] : []),
      {
        id: 'messages',
        label: isEn ? 'Messages' : 'Сообщения',
        icon: <Mail size={20} />,
        path: '/messages/inbox',
        submenu: [
          { id: 'inbox', label: isEn ? 'Inbox' : 'Входящие', icon: <Mail size={16} />, path: '/messages/inbox' },
          { id: 'sent', label: isEn ? 'Sent' : 'Отправленные', icon: <Mail size={16} />, path: '/messages/sent' },
          { id: 'drafts', label: isEn ? 'Drafts' : 'Черновики', icon: <Mail size={16} />, path: '/messages/drafts' },
        ],
      },
      { id: 'account', label: isEn ? 'Profile' : 'Профиль', icon: <UserCircle2 size={20} />, path: '/account' },
      { id: 'settings', label: isEn ? 'Settings' : 'Настройки', icon: <Settings size={20} />, path: '/settings' },
    ];
  }, [isTeacher, isAdmin, isManager, isEn]);

  return (
    <>
      {isMobile && isMobileOpen && <div className={styles.overlay} onClick={onCloseMobile} />}

      <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isMobileOpen ? styles.open : ''}`}>
        {isMobile && (
          <button className={styles.mobileCloseButton} onClick={onCloseMobile} aria-label={isEn ? 'Close menu' : 'Закрыть меню'}>
            <X size={24} />
          </button>
        )}

        <div className={styles.logo}>{!isCollapsed ? <h2>HedgehogCRM</h2> : <div className={styles.logoCollapsed}>CRM</div>}</div>

        <nav className={styles.nav}>
          <ul className={styles.menu}>
            {menuItems.map((item) => (
              <li key={item.id} className={styles.menuItem} data-tooltip={isCollapsed ? item.label : undefined}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
                  onClick={(e) => {
                    handleLinkClick();
                    if (item.submenu && !isCollapsed) {
                      e.preventDefault();
                      toggleSubmenu(item.id);
                    }
                  }}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className={styles.label}>{item.label}</span>
                      {item.submenu && (
                        <ChevronDown
                          size={16}
                          className={styles.chevron}
                          style={{ transform: openSubmenus[item.id] ? 'rotate(180deg)' : 'none' }}
                        />
                      )}
                    </>
                  )}
                </NavLink>

                {!isCollapsed && item.submenu && openSubmenus[item.id] && (
                  <ul className={styles.submenu}>
                    {item.submenu.map((subItem) => (
                      <li key={subItem.id}>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) => `${styles.submenuLink} ${isActive ? styles.active : ''}`}
                          onClick={handleLinkClick}
                        >
                          {subItem.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {!isCollapsed && (
          <div className={styles.sidebarFooter}>
            <button
              type="button"
              className={styles.userCard}
              onClick={() => {
                navigate('/account');
                handleLinkClick();
              }}
            >
              <div className={styles.userAvatar}>
                <Users size={20} />
              </div>
              <div>
                <p className={styles.userName}>{user.second_name} {user.first_name}</p>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
            </button>

            <div className={styles.actionButtons}>
              <button className={styles.logOutButton} onClick={handleLogout}>
                <LogOut size={18} />
                <span className={styles.label}>{isEn ? 'Log out' : 'Выйти'}</span>
              </button>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className={styles.sidebarFooter}>
            <button className={styles.logOutButton} onClick={handleLogout}>
              <LogOut size={20} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
