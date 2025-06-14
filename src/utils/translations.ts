
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
  | 'accessRestrictedArea'
  | 'shareInstagram'
  | 'talkToK21'
  | 'shareText'
  | 'shareShort'
  | 'shareLinkedIn'
  | 'shareTwitter'
  | 'usefulLinks'
  | 'k21Site'
  | 'scrumGuide'
  | 'courses'
  | 'content'
  | 'of'
  | 'correctExplanation'
  | 'incorrectExplanation'
  | 'noExplanation'
  | 'continue'
  | 'quizResults'
  | 'questionsCount'
  | 'approved'
  | 'notApproved'
  | 'minimumToPass'
  | 'performanceByCategory'
  | 'hideQuestions'
  | 'showAllQuestions'
  | 'questionDetails'
  | 'backToStart'
  | 'downloadResults'
  | 'quickQuiz'
  | 'approxTime'
  | 'intermediateQuiz'
  | 'completeQuiz'
  | 'selectQuestionCount'
  | 'start'
  | 'nameMinLength'
  | 'invalidEmail'
  | 'participantInfo'
  | 'fullName'
  | 'enterName'
  | 'emailPlaceholder'
  | 'startQuizWith'
  | 'totalQuizzes'
  | 'questionsAnswered'
  | 'averageLast50'
  | 'backToHome';

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
    accessRestrictedArea: 'Acessar Área Restrita',
    shareInstagram: 'Compartilhar no Instagram',
    talkToK21: 'Falar com K21',
    shareText: 'Compartilhar',
    shareShort: 'Compartilhar',
    shareLinkedIn: 'Compartilhar no LinkedIn',
    shareTwitter: 'Compartilhar no Twitter',
    usefulLinks: 'Links Úteis',
    k21Site: 'Site da K21',
    scrumGuide: 'Guia do Scrum',
    courses: 'Cursos',
    content: 'Conteúdo',
    of: 'de',
    correctExplanation: 'Resposta Correta',
    incorrectExplanation: 'Resposta Incorreta',
    noExplanation: 'Sem explicação disponível',
    continue: 'Continuar',
    quizResults: 'Resultados do Simulado',
    questionsCount: 'questões',
    approved: 'Aprovado',
    notApproved: 'Não Aprovado',
    minimumToPass: 'Mínimo para aprovar',
    performanceByCategory: 'Desempenho por Categoria',
    hideQuestions: 'Ocultar Questões',
    showAllQuestions: 'Mostrar Todas as Questões',
    questionDetails: 'Detalhes das Questões',
    backToStart: 'Voltar ao Início',
    downloadResults: 'Baixar Resultados',
    quickQuiz: 'Simulado Rápido',
    approxTime: 'Tempo aproximado',
    intermediateQuiz: 'Simulado Intermediário',
    completeQuiz: 'Simulado Completo',
    selectQuestionCount: 'Selecione a quantidade de questões',
    start: 'Iniciar',
    nameMinLength: 'Nome deve ter pelo menos 2 caracteres',
    invalidEmail: 'Email inválido',
    participantInfo: 'Informações do Participante',
    fullName: 'Nome Completo',
    enterName: 'Digite seu nome',
    emailPlaceholder: 'Digite seu email (opcional)',
    startQuizWith: 'Iniciar simulado com',
    totalQuizzes: 'Total de Simulados',
    questionsAnswered: 'Questões Respondidas',
    averageLast50: 'Média Últimos 50',
    backToHome: 'Voltar ao Início'
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
    accessRestrictedArea: 'Access Restricted Area',
    shareInstagram: 'Share on Instagram',
    talkToK21: 'Talk to K21',
    shareText: 'Share',
    shareShort: 'Share',
    shareLinkedIn: 'Share on LinkedIn',
    shareTwitter: 'Share on Twitter',
    usefulLinks: 'Useful Links',
    k21Site: 'K21 Website',
    scrumGuide: 'Scrum Guide',
    courses: 'Courses',
    content: 'Content',
    of: 'of',
    correctExplanation: 'Correct Answer',
    incorrectExplanation: 'Incorrect Answer',
    noExplanation: 'No explanation available',
    continue: 'Continue',
    quizResults: 'Quiz Results',
    questionsCount: 'questions',
    approved: 'Approved',
    notApproved: 'Not Approved',
    minimumToPass: 'Minimum to pass',
    performanceByCategory: 'Performance by Category',
    hideQuestions: 'Hide Questions',
    showAllQuestions: 'Show All Questions',
    questionDetails: 'Question Details',
    backToStart: 'Back to Start',
    downloadResults: 'Download Results',
    quickQuiz: 'Quick Quiz',
    approxTime: 'Approximate time',
    intermediateQuiz: 'Intermediate Quiz',
    completeQuiz: 'Complete Quiz',
    selectQuestionCount: 'Select number of questions',
    start: 'Start',
    nameMinLength: 'Name must be at least 2 characters',
    invalidEmail: 'Invalid email',
    participantInfo: 'Participant Information',
    fullName: 'Full Name',
    enterName: 'Enter your name',
    emailPlaceholder: 'Enter your email (optional)',
    startQuizWith: 'Start quiz with',
    totalQuizzes: 'Total Quizzes',
    questionsAnswered: 'Questions Answered',
    averageLast50: 'Average Last 50',
    backToHome: 'Back to Home'
  }
};

export function getTranslation(language: 'pt' | 'en', key: TranslationKey): string {
  return translations[language][key] || translations.pt[key];
}
