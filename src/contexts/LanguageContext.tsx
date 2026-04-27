'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/data/translations';

export type Locale = 'es' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('es');

  function t(path: string): string {
    const keys = path.split('.');
    let val: any = translations[locale];
    for (const k of keys) {
      val = val?.[k];
    }
    return typeof val === 'string' ? val : path;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

