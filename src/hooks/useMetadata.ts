
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MetadataConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

export const useMetadata = (config: MetadataConfig) => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = config.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty?: boolean) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update basic meta tags
    updateMetaTag('description', config.description);
    updateMetaTag('author', 'K21 Brasil');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Update Open Graph tags
    updateMetaTag('og:title', config.title, true);
    updateMetaTag('og:description', config.description, true);
    updateMetaTag('og:type', config.type || 'website', true);
    updateMetaTag('og:image', config.image || '/lovable-uploads/2342063e-9561-46ff-ae6a-e4a0316e24a1.png', true);
    updateMetaTag('og:url', config.url || window.location.href, true);
    updateMetaTag('og:locale', language === 'en' ? 'en_US' : 'pt_BR', true);
    updateMetaTag('og:site_name', 'K21 Brasil - Simulado CSM', true);

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@k21br');
    updateMetaTag('twitter:title', config.title);
    updateMetaTag('twitter:description', config.description);
    updateMetaTag('twitter:image', config.image || '/lovable-uploads/2342063e-9561-46ff-ae6a-e4a0316e24a1.png');

    // Update language attribute
    document.documentElement.lang = language === 'en' ? 'en-US' : 'pt-BR';

    // Add structured data
    const addStructuredData = () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": language === 'en' ? "CSM Certification Quiz by K21 Brasil" : "Simulado CSM por K21 Brasil",
        "description": config.description,
        "url": window.location.href,
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web Browser",
        "provider": {
          "@type": "Organization",
          "name": "K21 Brasil",
          "url": "https://k21.global"
        },
        "about": {
          "@type": "Thing",
          "name": "Scrum Master Certification",
          "description": language === 'en' 
            ? "Certified ScrumMaster (CSM) certification preparation" 
            : "Preparação para certificação Certified ScrumMaster (CSM)"
        },
        "inLanguage": language === 'en' ? "en-US" : "pt-BR"
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    };

    addStructuredData();
  }, [config, language]);
};
