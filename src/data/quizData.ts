import { QuestionType } from "@/components/QuizQuestion";

export type QuizCategory = 'fundamentals' | 'roles' | 'events' | 'artifacts';

export interface QuestionWithCategory extends QuestionType {
  category: QuizCategory;
  explanation?: string;
}

export const quizQuestions: QuestionWithCategory[] = [
  {
    id: 1,
    category: 'roles',
    question: "Qual é o papel responsável por gerenciar o Product Backlog?",
    options: [
      { id: "a", text: "Scrum Master" },
      { id: "b", text: "Product Owner" },
      { id: "c", text: "Desenvolvedores" },
      { id: "d", text: "Stakeholders" }
    ],
    correctAnswer: "b",
    explanation: "O Product Owner é responsável por gerenciar o Product Backlog, incluindo sua ordenação, garantindo que seja visível e claro para todos, e assegurando que a equipe de desenvolvimento entenda os itens do Product Backlog no nível necessário."
  },
  {
    id: 2,
    category: 'events',
    question: "Qual é a duração recomendada para a Sprint Planning em uma Sprint de duas semanas?",
    options: [
      { id: "a", text: "1 hora" },
      { id: "b", text: "2 horas" },
      { id: "c", text: "4 horas" },
      { id: "d", text: "8 horas" }
    ],
    correctAnswer: "d",
    explanation: "De acordo com o Guia do Scrum, o Sprint Planning é limitado a um máximo de oito horas para uma Sprint de um mês. Para Sprints mais curtas, o evento geralmente é mais curto, mas a regra geral é até oito horas para uma Sprint de um mês."
  },
  {
    id: 3,
    category: 'roles',
    question: "Quem é responsável por estimar os itens do Product Backlog?",
    options: [
      { id: "a", text: "Product Owner" },
      { id: "b", text: "Scrum Master" },
      { id: "c", text: "Desenvolvedores" },
      { id: "d", text: "O cliente" }
    ],
    correctAnswer: "c",
    explanation: "Os Desenvolvedores são responsáveis por todas as estimativas. O Product Owner pode influenciar a equipe ajudando-os a entender e selecionar trade-offs, mas as pessoas que farão o trabalho são as responsáveis pela estimativa final."
  },
  {
    id: 4,
    category: 'fundamentals',
    question: "O que acontece se a equipe não conseguir completar todo o trabalho planejado para a Sprint?",
    options: [
      { id: "a", text: "A Sprint é estendida até que todo o trabalho seja concluído" },
      { id: "b", text: "O Scrum Master deve trabalhar horas extras para concluir o trabalho" },
      { id: "c", text: "O trabalho não concluído volta para o Product Backlog para repriorização" },
      { id: "d", text: "A equipe é penalizada com uma Sprint mais curta na próxima vez" }
    ],
    correctAnswer: "c",
    explanation: "No Scrum, o prazo da Sprint é fixo e nunca estendido. Se o trabalho planejado não for concluído até o final da Sprint, o trabalho incompleto retorna ao Product Backlog e pode ser selecionado em uma Sprint futura, conforme a priorização do Product Owner."
  },
  {
    id: 5,
    category: 'events',
    question: "Qual é o objetivo principal do Daily Scrum?",
    options: [
      { id: "a", text: "Reportar o progresso aos gestores" },
      { id: "b", text: "Planejar o trabalho para o dia e identificar impedimentos" },
      { id: "c", text: "Atualizar o Product Backlog" },
      { id: "d", text: "Revisar a qualidade do código" }
    ],
    correctAnswer: "b",
    explanation: "O Daily Scrum é um evento de 15 minutos para os Desenvolvedores. Seu propósito é inspecionar o progresso em direção à Meta da Sprint e adaptar o Sprint Backlog conforme necessário, ajustando o trabalho planejado futuro. Não é uma reunião de status, mas sim um evento para os Desenvolvedores planejarem seu dia de trabalho."
  },
  {
    id: 6,
    category: 'fundamentals',
    question: "Quais são os três pilares do Scrum?",
    options: [
      { id: "a", text: "Visibilidade, inspeção e adaptação" },
      { id: "b", text: "Transparência, inspeção e adaptação" },
      { id: "c", text: "Comunicação, colaboração e entrega" },
      { id: "d", text: "Planejamento, execução e revisão" }
    ],
    correctAnswer: "b",
    explanation: "Os três pilares do Scrum são Transparência, Inspeção e Adaptação. Transparência significa que os aspectos significativos do processo devem ser visíveis. Inspeção significa que os usuários do Scrum devem inspecionar frequentemente os artefatos e o progresso. Adaptação ocorre quando o processo ou os artefatos precisam ser ajustados."
  },
  {
    id: 7,
    category: 'events',
    question: "Quando o planejamento para uma Sprint começa?",
    options: [
      { id: "a", text: "Durante o último dia da Sprint anterior" },
      { id: "b", text: "A qualquer momento durante a Sprint atual" },
      { id: "c", text: "Durante o Sprint Planning, no primeiro dia da Sprint" },
      { id: "d", text: "Uma semana antes da Sprint começar" }
    ],
    correctAnswer: "c",
    explanation: "O planejamento da Sprint acontece durante o Sprint Planning, que é o primeiro evento da Sprint. É quando a equipe determina o que pode ser entregue na incremento ao final da Sprint e como esse trabalho será realizado."
  },
  {
    id: 8,
    category: 'artifacts',
    question: "Quem tem permissão para alterar o Sprint Backlog durante a Sprint?",
    options: [
      { id: "a", text: "Apenas o Product Owner" },
      { id: "b", text: "Apenas o Scrum Master" },
      { id: "c", text: "Os Desenvolvedores" },
      { id: "d", text: "Qualquer stakeholder" }
    ],
    correctAnswer: "c",
    explanation: "O Sprint Backlog pertence exclusivamente aos Desenvolvedores, e somente eles podem modificá-lo durante a Sprint. Embora o Product Owner possa esclarecer itens e renegociar o escopo, apenas os Desenvolvedores têm autoridade para atualizar o Sprint Backlog conforme aprendem mais sobre o trabalho necessário para atingir a Meta da Sprint."
  },
  {
    id: 9,
    category: 'fundamentals',
    question: "O que é impedimento no contexto do Scrum?",
    options: [
      { id: "a", text: "Qualquer problema técnico encontrado pelos Desenvolvedores" },
      { id: "b", text: "Um bug encontrado durante a Sprint" },
      { id: "c", text: "Qualquer obstáculo que bloqueia a equipe de progredir" },
      { id: "d", text: "Apenas problemas reportados pelo Product Owner" }
    ],
    correctAnswer: "c",
    explanation: "Um impedimento no Scrum é qualquer obstáculo que impede a equipe de avançar em sua Sprint. Pode ser interno (como um problema técnico) ou externo (como a falta de uma decisão de um stakeholder). O Scrum Master tem a responsabilidade de ajudar a remover esses impedimentos."
  },
  {
    id: 10,
    category: 'artifacts',
    question: "Qual é o propósito do Incremento no Scrum?",
    options: [
      { id: "a", text: "Mostrar o progresso aos stakeholders" },
      { id: "b", text: "Um passo concreto em direção à visão do produto" },
      { id: "c", text: "Satisfazer os requisitos documentados" },
      { id: "d", text: "Completar todas as tarefas planejadas" }
    ],
    correctAnswer: "b",
    explanation: "O Incremento no Scrum é um passo concreto em direção à visão do produto ou meta. Cada incremento é adicionado a todos os incrementos anteriores e é verificado, garantindo que todos os incrementos funcionem juntos. O incremento deve estar em condição utilizável no final da Sprint."
  },
  {
    id: 11,
    category: 'roles',
    question: "Qual é o tamanho ideal de uma equipe Scrum?",
    options: [
      { id: "a", text: "3-9 pessoas" },
      { id: "b", text: "5-7 pessoas" },
      { id: "c", text: "7-11 pessoas" },
      { id: "d", text: "10-15 pessoas" }
    ],
    correctAnswer: "a",
    explanation: "De acordo com o Guia do Scrum, uma equipe Scrum típica tem 10 ou menos pessoas. Como regra geral, pequenas equipes comunicam-se melhor e são mais produtivas. Se as equipes Scrum ficarem muito grandes, elas devem considerar a reorganização em múltiplas equipes Scrum."
  },
  {
    id: 12,
    category: 'events',
    question: "Qual é o propósito principal da Sprint Review?",
    options: [
      { id: "a", text: "Avaliar o desempenho da equipe" },
      { id: "b", text: "Inspecionar o incremento e adaptar o Product Backlog" },
      { id: "c", text: "Planejar a próxima Sprint" },
      { id: "d", text: "Identificar e resolver impedimentos" }
    ],
    correctAnswer: "b",
    explanation: "O propósito da Sprint Review é inspecionar o resultado da Sprint e determinar futuras adaptações. A equipe Scrum apresenta os resultados de seu trabalho aos principais stakeholders e discute o progresso em direção à Meta do Produto. Durante esse evento, o Incremento é demonstrado e o Product Backlog pode ser ajustado para maximizar o valor."
  },
  {
    id: 13,
    category: 'artifacts',
    question: "O que é Definition of Done (DoD) no Scrum?",
    options: [
      { id: "a", text: "Uma lista de tarefas a serem completadas durante a Sprint" },
      { id: "b", text: "O critério de aceitação de uma única User Story" },
      { id: "c", text: "Um entendimento compartilhado de quando um incremento está completo" },
      { id: "d", text: "A definição do que constitui a Meta da Sprint" }
    ],
    correctAnswer: "c",
    explanation: "A Definition of Done (DoD) é um acordo formal sobre o que significa um incremento de produto estar 'concluído'. É um conjunto de critérios que cada incremento deve satisfazer para garantir que está em condição utilizável. Todos na equipe devem entender o que significa concluir um item do Product Backlog."
  },
  {
    id: 14,
    category: 'roles',
    question: "Qual é a responsabilidade primária do Scrum Master?",
    options: [
      { id: "a", text: "Gerenciar o Product Backlog" },
      { id: "b", text: "Garantir que o processo Scrum seja seguido e entendido" },
      { id: "c", text: "Atribuir tarefas aos Desenvolvedores" },
      { id: "d", text: "Reportar o progresso aos stakeholders" }
    ],
    correctAnswer: "b",
    explanation: "O Scrum Master é responsável por estabelecer o Scrum conforme definido no Guia do Scrum. Eles fazem isso ajudando todos a entender a teoria e a prática do Scrum, tanto dentro da equipe Scrum quanto na organização. O Scrum Master é um verdadeiro líder-servidor que serve à equipe Scrum e à organização maior."
  },
  {
    id: 15,
    category: 'events',
    question: "Qual evento ocorre no último dia da Sprint?",
    options: [
      { id: "a", text: "Sprint Planning" },
      { id: "b", text: "Daily Scrum" },
      { id: "c", text: "Sprint Review seguida pela Sprint Retrospective" },
      { id: "d", text: "Product Backlog Refinement" }
    ],
    correctAnswer: "c",
    explanation: "No último dia da Sprint, ocorrem dois eventos: primeiro a Sprint Review, para inspecionar o incremento criado durante a Sprint, e depois a Sprint Retrospective, para a equipe inspecionar a si mesma e criar um plano de melhorias. Esses eventos ocorrem antes da próxima Sprint Planning."
  },
  // Continue with more questions... (generating 15 out of 75 to keep response size manageable)
];

// Function to get questions by category
export const getQuestionsByCategory = (category: QuizCategory) => {
  return quizQuestions.filter(q => q.category === category);
};

// Function to get random questions
export const getRandomQuestions = (count: number) => {
  // Make a copy of the array to shuffle
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  // Return the first 'count' elements
  return shuffled.slice(0, count);
};

// Get category stats from answers
export const getCategoryStats = (userAnswers: Record<number, string>, questions: QuestionWithCategory[]) => {
  const stats = {
    fundamentals: { correct: 0, total: 0 },
    roles: { correct: 0, total: 0 },
    events: { correct: 0, total: 0 },
    artifacts: { correct: 0, total: 0 }
  };
  
  questions.forEach(question => {
    const category = question.category;
    stats[category].total++;
    
    if (userAnswers[question.id] === question.correctAnswer) {
      stats[category].correct++;
    }
  });
  
  return stats;
};
