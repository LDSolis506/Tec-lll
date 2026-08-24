import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { es } from './es';
import { en } from './en';

type Translations = typeof es;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('aie_language');
    return (saved === 'en' || saved === 'es') ? saved : 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('aie_language', lang);
  };

  const t = (key: keyof Translations, params?: Record<string, string | number>): string => {
    const dict = language === 'en' ? en : es;
    let translation = dict[key] || es[key] || key;

    if (params) {
      Object.entries(params).forEach(([pKey, pVal]) => {
        translation = translation.replace(new RegExp(`{{\\s*${pKey}\\s*}}`, 'g'), String(pVal));
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
