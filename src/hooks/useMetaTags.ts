
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface MetaTagsConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonical?: string;
  structuredData?: object;
}

const defaultMetaTags = {
  pt: {
    title: 'Simulado CSM por K21 Brasil - Teste seus conhecimentos em Scrum',
    description: 'Simulado gratuito para certificação Certified ScrumMaster® (CSM) oferecido pela K21 Brasil. Teste seus conhecimentos em Scrum com questões atualizadas.',
    keywords: 'CSM, Certified ScrumMaster, Scrum, Agile, K21, simulado, certificação, teste',
    ogImage: '/lovable-uploads/2342063e-9561-46ff-ae6a-e4a0316e24a1.png'
  },
  en: {
    title: 'CSM Practice Test by K21 Brazil - Test your Scrum knowledge',
    description: 'Free practice test for Certified ScrumMaster® (CSM) certification offered by K21 Brazil. Test your Scrum knowledge with updated questions.',
    keywords: 'CSM, Certified ScrumMaster, Scrum, Agile, K21, practice test, certification, quiz',
    ogImage: '/lovable-uploads/2342063e-9561-46ff-ae6a-e4a0316e24a1.png'
  }
};

const getPageMetaTags = (pathname: string, language: 'pt' | 'en'): MetaTagsConfig => {
  const isEnglish = language === 'en';
  const baseUrl = window.location.origin;
  
  // Remove /us prefix for canonical URL generation
  const cleanPath = pathname.replace('/us', '');
  
  switch (cleanPath) {
    case '/':
      return {
        title: defaultMetaTags[language].title,
        description: defaultMetaTags[language].description,
        keywords: defaultMetaTags[language].keywords,
        ogTitle: defaultMetaTags[language].title,
        ogDescription: defaultMetaTags[language].description,
        ogImage: defaultMetaTags[language].ogImage,
        twitterTitle: defaultMetaTags[language].title,
        twitterDescription: defaultMetaTags[language].description,
        canonical: isEnglish ? `${baseUrl}/us` : baseUrl,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "K21 Brasil",
          "description": isEnglish 
            ? "Leading Agile and Scrum training organization in Brazil"
            : "Organização líder em treinamentos Agile e Scrum no Brasil",
          "url": baseUrl,
          "logo": `${baseUrl}/lovable-uploads/2342063e-9561-46ff-ae6a-e4a0316e24a1.png`,
          "sameAs": [
            "https://br.k21.global",
            "https://www.linkedin.com/company/k21-global"
          ]
        }
      };
      
    case '/ranking':
      return {
        title: isEnglish 
          ? 'Global CSM Quiz Ranking - K21 Brasil'
          : 'Ranking Global do Simulado CSM - K21 Brasil',
        description: isEnglish
          ? 'See how you rank among CSM quiz participants worldwide. Compare your Scrum knowledge with other professionals.'
          : 'Veja como você se posiciona entre participantes do simulado CSM no mundo. Compare seu conhecimento em Scrum com outros profissionais.',
        keywords: isEnglish
          ? 'CSM ranking, Scrum leaderboard, certification ranking, K21'
          : 'ranking CSM, classificação Scrum, ranking certificação, K21',
        canonical: isEnglish ? `${baseUrl}/us/ranking` : `${baseUrl}/ranking`
      };
      
    default:
      return {
        title: defaultMetaTags[language].title,
        description: defaultMetaTags[language].description,
        canonical: isEnglish ? `${baseUrl}/us${cleanPath}` : `${baseUrl}${cleanPath}`
      };
  }
};

export const useMetaTags = () => {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const metaTags = getPageMetaTags(location.pathname, language);
    
    // Update title
    document.title = metaTags.title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // Update basic meta tags
    updateMetaTag('description', metaTags.description);
    if (metaTags.keywords) {
      updateMetaTag('keywords', metaTags.keywords);
    }
    updateMetaTag('author', 'K21 Brasil');
    
    // Update Open Graph tags
    updateMetaTag('og:title', metaTags.ogTitle || metaTags.title, true);
    updateMetaTag('og:description', metaTags.ogDescription || metaTags.description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', window.location.href, true);
    if (metaTags.ogImage) {
      updateMetaTag('og:image', `${window.location.origin}${metaTags.ogImage}`, true);
    }
    
    // Update Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', metaTags.twitterTitle || metaTags.title);
    updateMetaTag('twitter:description', metaTags.twitterDescription || metaTags.description);
    if (metaTags.ogImage) {
      updateMetaTag('twitter:image', `${window.location.origin}${metaTags.ogImage}`);
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', metaTags.canonical || window.location.href);
    
    // Update structured data
    if (metaTags.structuredData) {
      let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(metaTags.structuredData);
    }
    
  }, [location.pathname, language]);
};
