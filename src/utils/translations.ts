
import { Language } from '@/contexts/LanguageContext';

export const translations = {
  pt: {
    // Quiz Results
    quizResults: 'Resultados do Simulado',
    approved: 'Aprovado',
    notApproved: 'Não Aprovado',
    minimumToPass: 'Mínimo para aprovação',
    completionTime: 'Tempo de conclusão',
    performanceByCategory: 'Desempenho por Categoria',
    showAllQuestions: 'Mostrar Todas as Questões',
    hideQuestions: 'Ocultar Questões',
    questionDetails: 'Detalhes das Questões',
    question: 'Questão',
    correct: 'Correta',
    incorrect: 'Incorreta',
    backToStart: 'Voltar para Início',
    downloadResults: 'Baixar Resultados (PDF)',
    
    // Quiz Questions
    previous: 'Anterior',
    next: 'Próxima',
    finish: 'Finalizar',
    correctExplanation: 'Correto! Explicação:',
    incorrectExplanation: 'Incorreto! Explicação:',
    noExplanation: 'Não há explicação disponível para esta questão.',
    continue: 'Continuar',
    
    // Loading and Error States
    loadingQuestions: 'Carregando questões...',
    errorLoadingQuestions: 'Erro ao carregar questões. Tente novamente.',
    
    // Quiz Progress
    of: 'de',
    questionsCount: 'questões',
    
    // Common
    loading: 'Carregando...',
    error: 'Erro',
    tryAgain: 'Tente novamente',
    category: 'Categoria'
  },
  en: {
    // Quiz Results
    quizResults: 'Quiz Results',
    approved: 'Passed',
    notApproved: 'Not Passed',
    minimumToPass: 'Minimum to pass',
    completionTime: 'Completion time',
    performanceByCategory: 'Performance by Category',
    showAllQuestions: 'Show All Questions',
    hideQuestions: 'Hide Questions',
    questionDetails: 'Question Details',
    question: 'Question',
    correct: 'Correct',
    incorrect: 'Incorrect',
    backToStart: 'Back to Start',
    downloadResults: 'Download Results (PDF)',
    
    // Quiz Questions
    previous: 'Previous',
    next: 'Next',
    finish: 'Finish',
    correctExplanation: 'Correct! Explanation:',
    incorrectExplanation: 'Incorrect! Explanation:',
    noExplanation: 'No explanation available for this question.',
    continue: 'Continue',
    
    // Loading and Error States
    loadingQuestions: 'Loading questions...',
    errorLoadingQuestions: 'Error loading questions. Please try again.',
    
    // Quiz Progress
    of: 'of',
    questionsCount: 'questions',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    tryAgain: 'Please try again',
    category: 'Category'
  }
};

export const getTranslation = (language: Language, key: keyof typeof translations.pt): string => {
  return translations[language][key] || translations.pt[key];
};
