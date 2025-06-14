
export type TranslationKey = 
  | 'certificationQuiz'
  | 'certifiedScrumMaster'
  | 'quizDescription'
  | 'realisticQuiz'
  | 'realisticQuizDesc'
  | 'detailedResults'
  | 'detailedResultsDesc'
  | 'updatedContent'
  | 'updatedContentDesc'
  | 'detailedExplanations'
  | 'detailedExplanationsDesc'
  | 'startQuiz'
  | 'additionalInfo'
  | 'loadingQuestions'
  | 'errorLoadingQuestions'
  | 'selectQuizSize'
  | 'questions'
  | 'enterInfo'
  | 'name'
  | 'email'
  | 'emailOptional'
  | 'startQuizButton'
  | 'question'
  | 'next'
  | 'previous'
  | 'finish'
  | 'score'
  | 'correct'
  | 'incorrect'
  | 'explanation'
  | 'yourAnswer'
  | 'correctAnswer'
  | 'congratulations'
  | 'tryAgain'
  | 'completionTime'
  | 'downloadPDF'
  | 'restartQuiz'
  | 'viewRanking'
  | 'ranking'
  | 'position'
  | 'player'
  | 'time'
  | 'minutes'
  | 'seconds'
  | 'quizSizeFilter'
  | 'languageFilter'
  | 'all'
  | 'portuguese'
  | 'english'
  | 'minute'
  | 'second'
  | 'restrictedArea'
  | 'accessRestrictedArea';

const translations = {
  pt: {
    certificationQuiz: 'Simulado de Certificação',
    certifiedScrumMaster: 'Certified Scrum Master',
    quizDescription: 'Teste seus conhecimentos com questões baseadas no exame oficial da Scrum Alliance.',
    realisticQuiz: 'Simulado Realista',
    realisticQuizDesc: 'Questões baseadas no exame oficial',
    detailedResults: 'Resultados Detalhados',
    detailedResultsDesc: 'Análise completa do seu desempenho',
    updatedContent: 'Conteúdo Atualizado',
    updatedContentDesc: 'Baseado no Scrum Guide mais recente',
    detailedExplanations: 'Explicações Detalhadas',
    detailedExplanationsDesc: 'Entenda o porquê de cada resposta',
    startQuiz: 'Iniciar Simulado',
    additionalInfo: 'Mais informações sobre Scrum em',
    loadingQuestions: 'Carregando questões...',
    errorLoadingQuestions: 'Erro ao carregar questões. Tente novamente.',
    selectQuizSize: 'Selecione o tamanho do simulado',
    questions: 'questões',
    enterInfo: 'Digite suas informações',
    name: 'Nome',
    email: 'Email',
    emailOptional: 'Email (opcional)',
    startQuizButton: 'Iniciar Simulado',
    question: 'Questão',
    next: 'Próxima',
    previous: 'Anterior',
    finish: 'Finalizar',
    score: 'Pontuação',
    correct: 'Corretas',
    incorrect: 'Incorretas',
    explanation: 'Explicação',
    yourAnswer: 'Sua resposta',
    correctAnswer: 'Resposta correta',
    congratulations: 'Parabéns!',
    tryAgain: 'Continue estudando!',
    completionTime: 'Tempo de conclusão',
    downloadPDF: 'Baixar PDF',
    restartQuiz: 'Novo Simulado',
    viewRanking: 'Ver Ranking',
    ranking: 'Ranking',
    position: 'Posição',
    player: 'Participante',
    time: 'Tempo',
    minutes: 'minutos',
    seconds: 'segundos',
    quizSizeFilter: 'Tamanho do simulado',
    languageFilter: 'Idioma',
    all: 'Todos',
    portuguese: 'Português',
    english: 'Inglês',
    minute: 'minuto',
    second: 'segundo',
    restrictedArea: 'Área Restrita',
    accessRestrictedArea: 'Acessar Área Restrita'
  },
  en: {
    certificationQuiz: 'Certification Quiz',
    certifiedScrumMaster: 'Certified Scrum Master',
    quizDescription: 'Test your knowledge with questions based on the official Scrum Alliance exam.',
    realisticQuiz: 'Realistic Quiz',
    realisticQuizDesc: 'Questions based on the official exam',
    detailedResults: 'Detailed Results',
    detailedResultsDesc: 'Complete analysis of your performance',
    updatedContent: 'Updated Content',
    updatedContentDesc: 'Based on the latest Scrum Guide',
    detailedExplanations: 'Detailed Explanations',
    detailedExplanationsDesc: 'Understand the why behind each answer',
    startQuiz: 'Start Quiz',
    additionalInfo: 'More information about Scrum at',
    loadingQuestions: 'Loading questions...',
    errorLoadingQuestions: 'Error loading questions. Please try again.',
    selectQuizSize: 'Select quiz size',
    questions: 'questions',
    enterInfo: 'Enter your information',
    name: 'Name',
    email: 'Email',
    emailOptional: 'Email (optional)',
    startQuizButton: 'Start Quiz',
    question: 'Question',
    next: 'Next',
    previous: 'Previous',
    finish: 'Finish',
    score: 'Score',
    correct: 'Correct',
    incorrect: 'Incorrect',
    explanation: 'Explanation',
    yourAnswer: 'Your answer',
    correctAnswer: 'Correct answer',
    congratulations: 'Congratulations!',
    tryAgain: 'Keep studying!',
    completionTime: 'Completion time',
    downloadPDF: 'Download PDF',
    restartQuiz: 'New Quiz',
    viewRanking: 'View Ranking',
    ranking: 'Ranking',
    position: 'Position',
    player: 'Player',
    time: 'Time',
    minutes: 'minutes',
    seconds: 'seconds',
    quizSizeFilter: 'Quiz size',
    languageFilter: 'Language',
    all: 'All',
    portuguese: 'Portuguese',
    english: 'English',
    minute: 'minute',
    second: 'second',
    restrictedArea: 'Restricted Area',
    accessRestrictedArea: 'Access Restricted Area'
  }
};

export function getTranslation(language: 'pt' | 'en', key: TranslationKey): string {
  return translations[language][key] || translations.pt[key];
}
