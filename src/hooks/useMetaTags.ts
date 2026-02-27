
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
  lang?: string;
}

const getBaseUrl = () => {
  const isCustomDomain = window.location.hostname === 'csmpracticeexam.com';
  return isCustomDomain ? 'https://csmpracticeexam.com' : 'https://simulado-csm.k21.global';
};

const getOgImageUrl = () => {
  return `${getBaseUrl()}/lovable-uploads/2342063e-9561-46ff-ae6a-e4a0316e24a1.png`;
};

const getFaqSchema = (language: 'pt' | 'en') => {
  if (language === 'pt') {
    return {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O que é a certificação CSM?",
          "acceptedAnswer": { "@type": "Answer", "text": "A certificação CSM (Certified ScrumMaster) é oferecida pela Scrum Alliance e valida o conhecimento do profissional sobre o framework Scrum e o papel do Scrum Master." }
        },
        {
          "@type": "Question",
          "name": "Quantas questões tem a prova CSM?",
          "acceptedAnswer": { "@type": "Answer", "text": "A prova oficial da Scrum Alliance possui 50 questões de múltipla escolha, com 60 minutos para completar. É necessário acertar 74% (37 questões) para ser aprovado." }
        },
        {
          "@type": "Question",
          "name": "O simulado CSM da K21 é gratuito?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sim, o simulado é 100% gratuito. Você pode fazer quantas tentativas quiser, com banco de 80 questões selecionadas aleatoriamente." }
        },
        {
          "@type": "Question",
          "name": "Como é o formato da prova CSM?",
          "acceptedAnswer": { "@type": "Answer", "text": "A prova CSM é online, com 50 questões de múltipla escolha, duração de 60 minutos e nota mínima de 74% para aprovação." }
        },
        {
          "@type": "Question",
          "name": "Este simulado substitui a prova oficial?",
          "acceptedAnswer": { "@type": "Answer", "text": "Não. Este simulado é uma ferramenta de preparação. Para obter a certificação CSM é necessário participar de um curso oficial credenciado pela Scrum Alliance." }
        },
        {
          "@type": "Question",
          "name": "Quantas questões tem o simulado da K21?",
          "acceptedAnswer": { "@type": "Answer", "text": "O banco de dados possui 80 questões. Você pode escolher simulados de 10, 25 ou 50 questões, selecionadas aleatoriamente com balanço entre categorias." }
        }
      ]
    };
  }
  return {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the CSM certification?",
        "acceptedAnswer": { "@type": "Answer", "text": "The CSM (Certified ScrumMaster) certification is offered by Scrum Alliance and validates a professional's knowledge of the Scrum framework and the Scrum Master role." }
      },
      {
        "@type": "Question",
        "name": "How many questions does the CSM exam have?",
        "acceptedAnswer": { "@type": "Answer", "text": "The official Scrum Alliance exam has 50 multiple-choice questions with 60 minutes to complete. You need to score 74% (37 questions) to pass." }
      },
      {
        "@type": "Question",
        "name": "Is the K21 CSM practice exam free?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, the practice exam is 100% free. You can take as many attempts as you want, with a bank of 80 randomly selected questions." }
      },
      {
        "@type": "Question",
        "name": "What is the CSM exam format?",
        "acceptedAnswer": { "@type": "Answer", "text": "The CSM exam is online, with 50 multiple-choice questions, 60 minutes duration and a minimum score of 74% to pass." }
      },
      {
        "@type": "Question",
        "name": "Does this practice exam replace the official exam?",
        "acceptedAnswer": { "@type": "Answer", "text": "No. This is a preparation tool. To obtain CSM certification you need to attend an official Scrum Alliance accredited course." }
      },
      {
        "@type": "Question",
        "name": "How many questions does the K21 practice exam have?",
        "acceptedAnswer": { "@type": "Answer", "text": "The question bank has 80 questions. You can choose quizzes of 10, 25 or 50 questions, randomly selected with balance across categories." }
      }
    ]
  };
};

const getOrganizationSchema = (baseUrl: string, language: 'pt' | 'en') => ({
  "@type": "Organization",
  "name": "K21 Brasil",
  "url": "https://br.k21.global",
  "logo": `${baseUrl}/lovable-uploads/2342063e-9561-46ff-ae6a-e4a0316e24a1.png`,
  "description": language === 'en'
    ? "Leading Agile and Scrum training organization in Brazil"
    : "Organização líder em treinamentos Agile e Scrum no Brasil",
  "sameAs": [
    "https://br.k21.global",
    "https://www.linkedin.com/company/k21-global",
    "https://www.instagram.com/k21global",
    "https://www.youtube.com/@K21Global"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-21-3825-8624",
    "contactType": "customer service",
    "availableLanguage": ["Portuguese", "English"]
  }
});

const getWebSiteSchema = (baseUrl: string, language: 'pt' | 'en') => ({
  "@type": "WebSite",
  "name": language === 'en' ? "CSM Practice Exam by K21" : "Simulado CSM por K21",
  "url": baseUrl,
  "inLanguage": language === 'en' ? 'en' : 'pt-BR',
  "publisher": { "@type": "Organization", "name": "K21 Brasil" }
});

const getPageMetaTags = (pathname: string, language: 'pt' | 'en'): MetaTagsConfig => {
  const isEnglish = language === 'en';
  const isCustomDomain = window.location.hostname === 'csmpracticeexam.com';
  const baseUrl = getBaseUrl();
  const ogImage = getOgImageUrl();
  const cleanPath = pathname.replace('/us', '');

  const orgSchema = getOrganizationSchema(baseUrl, language);
  const webSchema = getWebSiteSchema(baseUrl, language);
  const faqSchema = getFaqSchema(language);

  switch (cleanPath) {
    case '/':
    case '':
      return {
        title: isEnglish ? 'Free CSM Practice Exam | K21 Brazil' : 'Simulado CSM Gratuito | K21 Brasil',
        description: isEnglish
          ? 'Free CSM certification practice test by K21. 80 Scrum questions with detailed explanations. Prepare for Scrum Alliance exam.'
          : 'Simulado gratuito para certificação CSM da Scrum Alliance. 80 questões com explicações detalhadas. Prepare-se com a K21.',
        keywords: isEnglish
          ? 'CSM, Certified ScrumMaster, Scrum, Agile, K21, practice test, certification, quiz, free'
          : 'CSM, Certified ScrumMaster, Scrum, Agile, K21, simulado, certificação, teste, gratuito',
        ogTitle: isEnglish ? 'Free CSM Practice Exam | K21 Brazil' : 'Simulado CSM Gratuito | K21 Brasil',
        ogDescription: isEnglish
          ? 'Free CSM certification practice test by K21. 80 Scrum questions with detailed explanations.'
          : 'Simulado gratuito para certificação CSM da Scrum Alliance. 80 questões com explicações detalhadas.',
        ogImage,
        twitterTitle: isEnglish ? 'Free CSM Practice Exam | K21 Brazil' : 'Simulado CSM Gratuito | K21 Brasil',
        twitterDescription: isEnglish
          ? 'Free CSM certification practice test by K21. 80 Scrum questions with detailed explanations.'
          : 'Simulado gratuito para certificação CSM da Scrum Alliance. 80 questões com explicações detalhadas.',
        canonical: isCustomDomain ? baseUrl : (isEnglish ? `${baseUrl}/us` : baseUrl),
        lang: isEnglish ? 'en' : 'pt-BR',
        structuredData: {
          "@context": "https://schema.org",
          "@graph": [orgSchema, webSchema, faqSchema]
        }
      };

    case '/ranking':
      return {
        title: isEnglish ? 'CSM Quiz Ranking | K21 Brazil' : 'Ranking Simulado CSM | K21 Brasil',
        description: isEnglish
          ? 'Global ranking of CSM practice exam participants. Compare your Scrum knowledge with professionals worldwide.'
          : 'Ranking global dos participantes do simulado CSM. Compare seu conhecimento em Scrum com profissionais do mundo todo.',
        keywords: isEnglish
          ? 'CSM ranking, Scrum leaderboard, certification ranking, K21'
          : 'ranking CSM, classificação Scrum, ranking certificação, K21',
        ogTitle: isEnglish ? 'CSM Quiz Ranking | K21 Brazil' : 'Ranking Simulado CSM | K21 Brasil',
        ogDescription: isEnglish
          ? 'Global ranking of CSM practice exam participants. Compare your Scrum knowledge.'
          : 'Ranking global dos participantes do simulado CSM. Compare seu conhecimento em Scrum.',
        ogImage,
        twitterTitle: isEnglish ? 'CSM Quiz Ranking | K21 Brazil' : 'Ranking Simulado CSM | K21 Brasil',
        twitterDescription: isEnglish
          ? 'Global ranking of CSM practice exam participants.'
          : 'Ranking global dos participantes do simulado CSM.',
        canonical: isCustomDomain ? `${baseUrl}/ranking` : (isEnglish ? `${baseUrl}/us/ranking` : `${baseUrl}/ranking`),
        lang: isEnglish ? 'en' : 'pt-BR',
        structuredData: {
          "@context": "https://schema.org",
          "@graph": [
            orgSchema,
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": isCustomDomain ? baseUrl : (isEnglish ? `${baseUrl}/us` : baseUrl) },
                { "@type": "ListItem", "position": 2, "name": "Ranking", "item": isCustomDomain ? `${baseUrl}/ranking` : (isEnglish ? `${baseUrl}/us/ranking` : `${baseUrl}/ranking`) }
              ]
            }
          ]
        }
      };

    case '/game':
      return {
        title: isEnglish ? 'CSM Speed Game | K21 Brazil' : 'Jogo Rápido CSM | K21 Brasil',
        description: isEnglish
          ? 'Test your Scrum knowledge against the clock! CSM speed game mode with timer and global ranking.'
          : 'Teste seu conhecimento em Scrum contra o relógio! Modo jogo rápido CSM com timer e ranking global.',
        keywords: isEnglish
          ? 'CSM game, Scrum quiz game, speed test, K21'
          : 'jogo CSM, quiz Scrum, teste rápido, K21',
        ogTitle: isEnglish ? 'CSM Speed Game | K21 Brazil' : 'Jogo Rápido CSM | K21 Brasil',
        ogDescription: isEnglish
          ? 'Test your Scrum knowledge against the clock!'
          : 'Teste seu conhecimento em Scrum contra o relógio!',
        ogImage,
        canonical: isCustomDomain ? `${baseUrl}/game` : (isEnglish ? `${baseUrl}/us/game` : `${baseUrl}/game`),
        lang: isEnglish ? 'en' : 'pt-BR',
        structuredData: {
          "@context": "https://schema.org",
          "@graph": [
            orgSchema,
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": isCustomDomain ? baseUrl : (isEnglish ? `${baseUrl}/us` : baseUrl) },
                { "@type": "ListItem", "position": 2, "name": isEnglish ? "Speed Game" : "Jogo Rápido", "item": isCustomDomain ? `${baseUrl}/game` : (isEnglish ? `${baseUrl}/us/game` : `${baseUrl}/game`) }
              ]
            }
          ]
        }
      };

    case '/game/ranking':
      return {
        title: isEnglish ? 'Game Ranking | K21 Brazil' : 'Ranking do Jogo | K21 Brasil',
        description: isEnglish
          ? 'Speed game ranking. See the fastest Scrum experts in the CSM challenge.'
          : 'Ranking do jogo rápido. Veja os experts em Scrum mais rápidos no desafio CSM.',
        ogTitle: isEnglish ? 'Game Ranking | K21 Brazil' : 'Ranking do Jogo | K21 Brasil',
        ogDescription: isEnglish
          ? 'Speed game ranking. See the fastest Scrum experts.'
          : 'Ranking do jogo rápido. Veja os experts mais rápidos.',
        ogImage,
        canonical: isCustomDomain ? `${baseUrl}/game/ranking` : (isEnglish ? `${baseUrl}/us/game/ranking` : `${baseUrl}/game/ranking`),
        lang: isEnglish ? 'en' : 'pt-BR',
        structuredData: {
          "@context": "https://schema.org",
          "@graph": [
            orgSchema,
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": isCustomDomain ? baseUrl : (isEnglish ? `${baseUrl}/us` : baseUrl) },
                { "@type": "ListItem", "position": 2, "name": isEnglish ? "Speed Game" : "Jogo Rápido", "item": isCustomDomain ? `${baseUrl}/game` : (isEnglish ? `${baseUrl}/us/game` : `${baseUrl}/game`) },
                { "@type": "ListItem", "position": 3, "name": "Ranking", "item": isCustomDomain ? `${baseUrl}/game/ranking` : (isEnglish ? `${baseUrl}/us/game/ranking` : `${baseUrl}/game/ranking`) }
              ]
            }
          ]
        }
      };

    default:
      return {
        title: isEnglish ? 'Free CSM Practice Exam | K21 Brazil' : 'Simulado CSM Gratuito | K21 Brasil',
        description: isEnglish
          ? 'Free CSM certification practice test by K21. 80 Scrum questions with detailed explanations.'
          : 'Simulado gratuito para certificação CSM da Scrum Alliance. 80 questões com explicações detalhadas.',
        ogImage,
        canonical: isCustomDomain ? `${baseUrl}${cleanPath}` : (isEnglish ? `${baseUrl}/us${cleanPath}` : `${baseUrl}${cleanPath}`),
        lang: isEnglish ? 'en' : 'pt-BR'
      };
  }
};

export const useMetaTags = () => {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const metaTags = getPageMetaTags(location.pathname, language);
    
    if (metaTags.lang) {
      document.documentElement.lang = metaTags.lang;
    }
    
    document.title = metaTags.title;
    
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
    
    // Basic meta tags
    updateMetaTag('title', metaTags.title);
    updateMetaTag('description', metaTags.description);
    if (metaTags.keywords) {
      updateMetaTag('keywords', metaTags.keywords);
    }
    updateMetaTag('author', 'K21 Brasil');
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1');
    updateMetaTag('language', language === 'en' ? 'English' : 'Portuguese');
    
    // Open Graph tags
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', metaTags.canonical || window.location.href, true);
    updateMetaTag('og:title', metaTags.ogTitle || metaTags.title, true);
    updateMetaTag('og:description', metaTags.ogDescription || metaTags.description, true);
    updateMetaTag('og:site_name', 'K21 Brasil', true);
    updateMetaTag('og:locale', language === 'en' ? 'en_US' : 'pt_BR', true);
    if (metaTags.ogImage) {
      updateMetaTag('og:image', metaTags.ogImage, true);
      updateMetaTag('og:image:width', '1200', true);
      updateMetaTag('og:image:height', '630', true);
      updateMetaTag('og:image:type', 'image/png', true);
    }
    
    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', metaTags.canonical || window.location.href);
    updateMetaTag('twitter:title', metaTags.twitterTitle || metaTags.title);
    updateMetaTag('twitter:description', metaTags.twitterDescription || metaTags.description);
    if (metaTags.ogImage) {
      updateMetaTag('twitter:image', metaTags.ogImage);
    }
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', metaTags.canonical || window.location.href);
    
    // Structured data
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

// Export FAQ data for use in visible FAQ component
export const getFaqData = (language: 'pt' | 'en') => {
  const schema = getFaqSchema(language);
  return schema.mainEntity.map((q: any) => ({
    question: q.name,
    answer: q.acceptedAnswer.text
  }));
};
