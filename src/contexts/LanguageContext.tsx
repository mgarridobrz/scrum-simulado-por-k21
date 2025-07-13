
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    // Check URL for language preference on initial load
    const path = location.pathname;
    const isCustomDomain = window.location.hostname === 'csmpracticeexam.com';
    
    if (path.startsWith('/us') || isCustomDomain) {
      setLanguageState('en');
    } else {
      setLanguageState('pt');
    }
  }, [location.pathname]);

  const setLanguage = (lang: Language) => {
    const isCustomDomain = window.location.hostname === 'csmpracticeexam.com';
    
    // For custom domain, always force English
    if (isCustomDomain && lang === 'pt') {
      return; // Don't allow switching to Portuguese on custom domain
    }
    
    setLanguageState(lang);
    
    // Update URL based on language
    const currentPath = location.pathname;
    let newPath = currentPath;
    
    if (lang === 'en') {
      // Add /us prefix if not already there
      if (!currentPath.startsWith('/us')) {
        newPath = '/us' + (currentPath === '/' ? '' : currentPath);
      }
    } else {
      // Remove /us prefix if present (only for main domain)
      if (currentPath.startsWith('/us') && !isCustomDomain) {
        newPath = currentPath.replace('/us', '') || '/';
      }
    }
    
    if (newPath !== currentPath) {
      navigate(newPath, { replace: true });
    }
  };

  const isEnglish = language === 'en';
  const isPortuguese = language === 'pt';

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        isEnglish, 
        isPortuguese 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
