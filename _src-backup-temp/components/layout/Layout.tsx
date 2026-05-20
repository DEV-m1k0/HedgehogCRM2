// components/layout/Layout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './styles/Layout.module.css';

const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Рассчитываем ширину сайдбара в зависимости от состояния
  const sidebarWidth = sidebarCollapsed ? 80 : 280;

  return (
    <div 
      className={styles.layout}
      style={{
        '--sidebar-width': `${sidebarWidth}px`
      } as React.CSSProperties}
    >
      <Header 
        toggleSidebar={toggleSidebar}
        isSidebarCollapsed={sidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className={styles.container}>
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={closeMobileMenu}
        />
        <main className={`
          ${styles.main} 
          ${sidebarCollapsed ? styles.mainExpanded : ''}
          ${isMobileMenuOpen ? styles.menuOpen : ''}
        `}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;