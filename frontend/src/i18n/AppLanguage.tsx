'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type AppLanguage = 'ru' | 'en';

interface AppLanguageContextValue {
  language: AppLanguage;
  setLanguage: (value: AppLanguage) => void;
}

const STORAGE_KEY = 'app_language';

const AppLanguageContext = createContext<AppLanguageContextValue | null>(null);

const getInitialLanguage = (): AppLanguage => {
  if (typeof window === 'undefined') return 'ru';
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === 'en') return 'en';
  return 'ru';
};

export const AppLanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<AppLanguage>(() => getInitialLanguage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    window.dispatchEvent(new Event('app-language-updated'));
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return (
    <AppLanguageContext.Provider value={value}>
      {children}
    </AppLanguageContext.Provider>
  );
};

export const useAppLanguage = () => {
  const context = useContext(AppLanguageContext);
  if (!context) {
    throw new Error('useAppLanguage must be used inside AppLanguageProvider');
  }
  return context;
};

