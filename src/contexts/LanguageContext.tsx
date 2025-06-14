
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isEnglish: boolean;
  isPortuguese: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    // Check URL for language preference
    const path = window.location.pathname;
    if (path.startsWith('/us')) {
      setLanguage('en');
    } else {
      setLanguage('pt');
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    
    // Update URL based on language
    const currentPath = window.location.pathname;
    let newPath = currentPath;
    
    if (lang === 'en') {
      // Add /us prefix if not already there
      if (!currentPath.startsWith('/us')) {
        newPath = '/us' + (currentPath === '/' ? '' : currentPath);
      }
    } else {
      // Remove /us prefix if present
      if (currentPath.startsWith('/us')) {
        newPath = currentPath.replace('/us', '') || '/';
      }
    }
    
    if (newPath !== currentPath) {
      window.history.pushState({}, '', newPath);
    }
  };

  const isEnglish = language === 'en';
  const isPortuguese = language === 'pt';

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage, 
        isEnglish, 
        isPortuguese 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
