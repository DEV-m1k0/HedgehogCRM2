// components/layout/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Users, FolderKanban, FileText, 
  BarChart3, Settings, Calendar, Mail,
  ChevronDown, LogOut, X
} from 'lucide-react';
import styles from './styles/Sidebar.module.css';
import type { MenuItem } from '../../types/layout.types';
import type { UserType } from '../../types/User.types';

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  isMobileOpen,
  onCloseMobile 
}) => {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<UserType>({
    id: 0,
    email: '',
    first_name: '',
    second_name: '',
    patronymic: null,
    income_per_hour: 0,
    phone: null,
    is_accepted: false,
    created_at: new Date(),
    role: {
      id: 0,
      name: "Преподаватель"
    }
  });

  useEffect(() => {
    const fetchStoredUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    fetchStoredUser();
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
    setOpenSubmenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleLinkClick = () => {
    // На мобильных устройствах закрываем сайдбар при клике на ссылку
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { id: 'clients', label: 'Clients', icon: <Users size={20} />, path: '/clients' },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={20} />, path: '/projects' },
    { id: 'tasks', label: 'Tasks', icon: <FileText size={20} />, path: '/tasks' },
    { id: 'calendar', label: 'Календарь', icon: <Calendar size={20} />, path: '/calendar' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, path: '/analytics' },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: <Mail size={20} />, 
      path: '/messages',
      submenu: [
        { id: 'inbox', label: 'Inbox', icon: <Mail size={16} />, path: '/messages/inbox' },
        { id: 'sent', label: 'Sent', icon: <FileText size={16} />, path: '/messages/sent' },
        { id: 'drafts', label: 'Drafts', icon: <FolderKanban size={16} />, path: '/messages/drafts' },
      ] 
    },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <>
      {/* Overlay для мобильных */}
      {isMobile && isMobileOpen && (
        <div 
          className={styles.overlay}
          onClick={onCloseMobile}
        />
      )}
      
      <aside className={`
        ${styles.sidebar} 
        ${isCollapsed ? styles.collapsed : ''}
        ${isMobileOpen ? styles.open : ''}
      `}>
        {/* Кнопка закрытия для мобильных */}
        {isMobile && (
          <button 
            className={styles.mobileCloseButton}
            onClick={onCloseMobile}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        )}
        
        <div className={styles.logo}>
          {!isCollapsed ? (
            <h2>HedgehogCRM</h2>
          ) : (
            <div className={styles.logoCollapsed}>CRM</div>
          )}
        </div>
        
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            {menuItems.map((item) => (
              <li 
                key={item.id} 
                className={styles.menuItem}
                data-tooltip={isCollapsed ? item.label : undefined}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `${styles.menuLink} ${isActive ? styles.active : ''}`
                  }
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
                          style={{
                            transform: openSubmenus[item.id] ? 'rotate(180deg)' : 'none'
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
                
                {/* Подменю */}
                {!isCollapsed && item.submenu && openSubmenus[item.id] && (
                  <ul className={styles.submenu}>
                    {item.submenu.map((subItem) => (
                      <li key={subItem.id}>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) => 
                            `${styles.submenuLink} ${isActive ? styles.active : ''}`
                          }
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
        
        {/* Дополнительные кнопки и пользователь */}
        {!isCollapsed && (
          <div className={styles.sidebarFooter}>
            <div className={styles.userCard}>
              <div className={styles.userAvatar}>
                <Users size={20} />
              </div>
              <div>
                <p className={styles.userName}>{user.second_name} {user.first_name}</p>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
            </div>
            
            <div className={styles.actionButtons}>
              <button 
                className={styles.logOutButton}
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span className={styles.label}>Logout</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Версия для свернутого состояния */}
        {isCollapsed && (
          <div className={styles.sidebarFooter}>
            <button 
              className={styles.logOutButton}
              onClick={handleLogout}
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;