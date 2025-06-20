
import { TranslationKey, getTranslation } from './translations';

export interface MetadataContent {
  title: string;
  description: string;
  keywords: string;
}

export const getPageMetadata = (
  page: 'home' | 'ranking' | 'validation',
  language: 'pt' | 'en'
): MetadataContent => {
  const baseTitle = language === 'en' 
    ? 'CSM Certification Quiz by K21 Brasil'
    : 'Simulado CSM por K21 Brasil';

  const metadata = {
    home: {
      pt: {
        title: 'Simulado CSM por K21 Brasil - Certified ScrumMaster',
        description: 'Teste gratuito para certificação Certified ScrumMaster (CSM). Simulado realista com questões baseadas no exame oficial da Scrum Alliance. Prepare-se com a K21 Brasil.',
        keywords: 'CSM, Certified ScrumMaster, Scrum, simulado, certificação, K21, Brasil, agile, exame'
      },
      en: {
        title: 'CSM Certification Quiz by K21 Brasil - Certified ScrumMaster',
        description: 'Free Certified ScrumMaster (CSM) certification quiz. Realistic practice test with questions based on the official Scrum Alliance exam. Prepare with K21 Brasil.',
        keywords: 'CSM, Certified ScrumMaster, Scrum, quiz, certification, K21, Brasil, agile, exam'
      }
    },
    ranking: {
      pt: {
        title: 'Ranking do Simulado CSM - K21 Brasil',
        description: 'Veja o ranking dos melhores participantes no simulado CSM da K21 Brasil. Compare seu desempenho e veja quem são os top performers.',
        keywords: 'ranking, CSM, simulado, classificação, K21, Brasil, melhores resultados'
      },
      en: {
        title: 'CSM Quiz Ranking - K21 Brasil',
        description: 'See the ranking of top performers in K21 Brasil\'s CSM quiz. Compare your performance and see who the top performers are.',
        keywords: 'ranking, CSM, quiz, leaderboard, K21, Brasil, top performers'
      }
    },
    validation: {
      pt: {
        title: 'Validação de Questões CSM - Área Restrita - K21 Brasil',
        description: 'Área restrita para validação e gerenciamento de questões do simulado CSM da K21 Brasil.',
        keywords: 'validação, questões, CSM, área restrita, administração, K21'
      },
      en: {
        title: 'CSM Question Validation - Restricted Area - K21 Brasil',
        description: 'Restricted area for validation and management of CSM quiz questions by K21 Brasil.',
        keywords: 'validation, questions, CSM, restricted area, administration, K21'
      }
    }
  };

  return metadata[page][language];
};
