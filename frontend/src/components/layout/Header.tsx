// components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Bell, Search, User, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import styles from './styles/Header.module.css';
import type { UserType } from '../../types/User.types';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  isMobileMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleSidebar, 
  isSidebarCollapsed,
  isMobileMenuOpen = false
}) => {
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

  return (
    <header className={`${styles.header} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.leftSection}>
        <button 
          className={styles.sidebarToggle}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isMobile ? (
            isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />
          ) : (
            isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />
          )}
        </button>
        
        <div className={styles.search}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search..." 
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.iconButton}>
          <Bell size={20} />
          <span className={styles.badge}>3</span>
        </button>
        
        <div className={styles.userMenu}>
          <div className={styles.avatar}>
            <User size={24} />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.second_name} {user.first_name}</span>
            <span className={styles.userRole}>{user.role.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;