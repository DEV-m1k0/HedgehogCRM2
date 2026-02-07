// components/layout/Header.tsx
import React from 'react';
import { Bell, Search, User, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import styles from './styles/Header.module.css';

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
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
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
            <span className={styles.userName}>John Doe</span>
            <span className={styles.userRole}>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;