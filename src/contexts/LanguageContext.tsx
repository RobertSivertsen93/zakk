
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define our supported languages
export type Language = 'en' | 'fo';

// Define translations interface
export interface Translations {
  [key: string]: {
    en: string;
    fo: string;
  };
}

// Define our base translations
export const translations: Translations = {
  // Navigation
  logout: {
    en: 'Logout',
    fo: 'Útrita',
  },
  // Extract page
  uploadPdf: {
    en: 'Upload PDF',
    fo: 'Send PDF',
  },
  backToUpload: {
    en: 'Back to Upload',
    fo: 'Aftur til at senda',
  },
  invoice: {
    en: 'Invoice',
    fo: 'Faktura',
  },
  lineItems: {
    en: 'Line Items',
    fo: 'Linjupostar',
  },
  export: {
    en: 'Export',
    fo: 'Útflyt',
  },
  continue: {
    en: 'Continue',
    fo: 'Hald fram',
  },
};

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
