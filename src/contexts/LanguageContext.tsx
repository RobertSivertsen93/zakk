
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get the saved language from localStorage or use 'en' as default
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('preferred-language') as Language) || 'en'
  );

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`No translation found for key: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Re-export types for convenience
export type { Language };
