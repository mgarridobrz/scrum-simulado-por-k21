
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
    category: 'Categoria',
    
    // Header
    talkToK21: 'Fale com a K21',
    shareText: 'Curtiu o simulado? Então compartilhe!',
    shareShort: 'Compartilhe!',
    shareLinkedIn: 'Compartilhar no LinkedIn',
    shareTwitter: 'Compartilhar no Twitter',
    shareInstagram: 'Compartilhar no Instagram',
    usefulLinks: 'Links Úteis',
    k21Site: 'Site K21',
    scrumGuide: 'Scrum Guide',
    courses: 'Cursos',
    content: 'Conteúdos',
    ranking: 'Ranking',
    
    // Start Screen
    certificationQuiz: 'Simulado de Certificação',
    certifiedScrumMaster: 'Certified ScrumMaster®',
    quizDescription: 'Prepare-se para sua certificação CSM com este simulado oferecido pela K21 Brasil.',
    realisticQuiz: 'Simulado Realista',
    realisticQuizDesc: 'Questões no estilo do exame oficial',
    detailedResults: 'Resultado Detalhado',
    detailedResultsDesc: 'Veja o que você acertou e onde precisa melhorar',
    updatedContent: 'Conteúdo Atualizado',
    updatedContentDesc: 'Baseado nas diretrizes mais recentes da Scrum Alliance',
    detailedExplanations: 'Explicações Detalhadas',
    detailedExplanationsDesc: 'Entenda o porquê de cada resposta correta',
    startQuiz: 'Iniciar Simulado',
    additionalInfo: 'Para informações adicionais, visite',
    
    // Quiz Size Selector
    selectQuestionCount: 'Selecione o número de questões',
    quickQuiz: 'Simulado rápido',
    intermediateQuiz: 'Simulado intermediário',
    completeQuiz: 'Simulado completo',
    approxTime: 'Aprox.',
    minutes: 'minutos',
    start: 'Iniciar',
    
    // User Info Form
    participantInfo: 'Informações do Participante',
    fullName: 'Nome completo',
    enterName: 'Digite seu nome',
    email: 'Email',
    emailPlaceholder: 'seu@email.com',
    startQuizWith: 'Iniciar Simulado com',
    questions: 'Questões',
    
    // Form Validation
    nameMinLength: 'Nome deve ter pelo menos 2 caracteres',
    invalidEmail: 'Email inválido'
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
    category: 'Category',
    
    // Header
    talkToK21: 'Talk to K21',
    shareText: 'Liked the quiz? Share it!',
    shareShort: 'Share!',
    shareLinkedIn: 'Share on LinkedIn',
    shareTwitter: 'Share on Twitter',
    shareInstagram: 'Share on Instagram',
    usefulLinks: 'Useful Links',
    k21Site: 'K21 Site',
    scrumGuide: 'Scrum Guide',
    courses: 'Courses',
    content: 'Content',
    ranking: 'Ranking',
    
    // Start Screen
    certificationQuiz: 'Certification Quiz',
    certifiedScrumMaster: 'Certified ScrumMaster®',
    quizDescription: 'Prepare for your CSM certification with this quiz offered by K21 Brasil.',
    realisticQuiz: 'Realistic Quiz',
    realisticQuizDesc: 'Questions in the style of the official exam',
    detailedResults: 'Detailed Results',
    detailedResultsDesc: 'See what you got right and where you need to improve',
    updatedContent: 'Updated Content',
    updatedContentDesc: 'Based on the latest Scrum Alliance guidelines',
    detailedExplanations: 'Detailed Explanations',
    detailedExplanationsDesc: 'Understand why each answer is correct',
    startQuiz: 'Start Quiz',
    additionalInfo: 'For additional information, visit',
    
    // Quiz Size Selector
    selectQuestionCount: 'Select the number of questions',
    quickQuiz: 'Quick quiz',
    intermediateQuiz: 'Intermediate quiz',
    completeQuiz: 'Complete quiz',
    approxTime: 'Approx.',
    minutes: 'minutes',
    start: 'Start',
    
    // User Info Form
    participantInfo: 'Participant Information',
    fullName: 'Full name',
    enterName: 'Enter your name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    startQuizWith: 'Start Quiz with',
    questions: 'Questions',
    
    // Form Validation
    nameMinLength: 'Name must be at least 2 characters',
    invalidEmail: 'Invalid email'
  }
};

export const getTranslation = (language: Language, key: keyof typeof translations.pt): string => {
  return translations[language][key] || translations.pt[key];
};
