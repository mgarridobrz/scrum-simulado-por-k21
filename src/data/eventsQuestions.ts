
import { QuestionWithCategory } from "./types";

export const eventsQuestions: QuestionWithCategory[] = [
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
    id: 7,
    category: 'events',
    question: "Quando o planejamento para uma Sprint começa?",
    options: [
      { id: "a", text: "Durante o último dia da Sprint anterior" },
      { id: "c", text: "Durante o Sprint Planning, no primeiro dia da Sprint" },
      { id: "b", text: "A qualquer momento durante a Sprint atual" },
      { id: "d", text: "Uma semana antes da Sprint começar" }
    ],
    correctAnswer: "c",
    explanation: "O planejamento da Sprint acontece durante o Sprint Planning, que é o primeiro evento da Sprint. É quando a equipe determina o que pode ser entregue na incremento ao final da Sprint e como esse trabalho será realizado."
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
    id: 15,
    category: 'events',
    question: "Qual evento ocorre no último dia da Sprint?",
    options: [
      { id: "a", text: "Sprint Planning" },
      { id: "d", text: "Product Backlog Refinement" },
      { id: "b", text: "Daily Scrum" },
      { id: "c", text: "Sprint Review seguida pela Sprint Retrospective" }
    ],
    correctAnswer: "c",
    explanation: "No último dia da Sprint, ocorrem dois eventos: primeiro a Sprint Review, para inspecionar o incremento criado durante a Sprint, e depois a Sprint Retrospective, para a equipe inspecionar a si mesma e criar um plano de melhorias. Esses eventos ocorrem antes da próxima Sprint Planning."
  },
  {
    id: 18,
    category: 'events',
    question: "O que acontece se um objetivo da Sprint se tornar obsoleto?",
    options: [
      { id: "c", text: "A equipe deve completar a Sprint conforme planejado" },
      { id: "a", text: "A Sprint continua, mas com objetivos modificados" },
      { id: "b", text: "A Sprint pode ser cancelada pelo Product Owner" },
      { id: "d", text: "O Scrum Master estende a Sprint" }
    ],
    correctAnswer: "b",
    explanation: "Uma Sprint pode ser cancelada se o objetivo da Sprint se tornar obsoleto. Apenas o Product Owner tem a autoridade para cancelar a Sprint."
  },
  {
    id: 19,
    category: 'events',
    question: "Como a Daily Scrum deve ser conduzida?",
    options: [
      { id: "a", text: "Seguindo um roteiro estrito de três perguntas" },
      { id: "b", text: "Da forma que funcionar melhor para o Time de Desenvolvimento" },
      { id: "c", text: "Com todos os stakeholders presentes" },
      { id: "d", text: "Apenas quando o Scrum Master estiver disponível" }
    ],
    correctAnswer: "b",
    explanation: "Os Desenvolvedores podem selecionar qualquer estrutura e técnicas que desejarem, desde que sua Daily Scrum se concentre no progresso em direção ao objetivo da Sprint e produza um plano de ação para o próximo dia de trabalho."
  },
  {
    id: 24,
    category: 'events',
    question: "Qual é o propósito da Sprint Retrospective?",
    options: [
      { id: "a", text: "Planejar o trabalho para a próxima Sprint" },
      { id: "c", text: "Inspecionar o Time Scrum e criar melhorias para a próxima Sprint" },
      { id: "b", text: "Avaliar o incremento produzido na Sprint" },
      { id: "d", text: "Revisar e ajustar o Product Backlog" }
    ],
    correctAnswer: "c",
    explanation: "O propósito da Sprint Retrospective é planejar maneiras de aumentar a qualidade e a eficácia. O Time Scrum inspeciona como foi a última Sprint em relação a pessoas, relacionamentos, processos e ferramentas."
  },
  {
    id: 29,
    category: 'events',
    question: "Qual é o principal objetivo da Sprint Planning?",
    options: [
      { id: "c", text: "Estabelecer o que pode ser entregue na Sprint e como o trabalho será realizado" },
      { id: "a", text: "Atribuir tarefas aos membros da equipe" },
      { id: "b", text: "Iniciar o trabalho da Sprint" },
      { id: "d", text: "Priorizar o Product Backlog" }
    ],
    correctAnswer: "c",
    explanation: "O Sprint Planning inicia a Sprint ao definir o trabalho a ser realizado. O plano resultante é criado pelo trabalho colaborativo de todo o Time Scrum. O Product Owner garante que os participantes estejam preparados para discutir os itens mais importantes do Product Backlog e como eles se relacionam com a meta do produto."
  },
  {
    id: 33,
    category: 'events',
    question: "Qual declaração sobre a duração da Sprint é correta?",
    options: [
      { id: "a", text: "Sprints podem ter duração variável, dependendo da complexidade do trabalho" },
      { id: "d", text: "A duração da Sprint deve aumentar à medida que o projeto avança" },
      { id: "b", text: "Sprints devem ter duração de duas semanas" },
      { id: "c", text: "Sprints mais curtas podem ser usadas para gerar mais feedback e limitar risco" }
    ],
    correctAnswer: "c",
    explanation: "Sprints mais curtas podem ser usadas para gerar mais feedback e limitar o risco de custo e esforço a um menor período de tempo. Cada Sprint pode ser considerado um projeto curto. Sprints são limitadas a um mês."
  },
  {
    id: 36,
    category: 'events',
    question: "Quem deve participar da Daily Scrum?",
    options: [
      { id: "a", text: "Desenvolvedores, Scrum Master e Product Owner" },
      { id: "b", text: "Apenas os Desenvolvedores" },
      { id: "c", text: "Todo o Time Scrum e stakeholders relevantes" },
      { id: "d", text: "Qualquer pessoa interessada no projeto" }
    ],
    correctAnswer: "b",
    explanation: "A Daily Scrum é um evento de 15 minutos para os Desenvolvedores do Time Scrum. Se o Product Owner ou o Scrum Master estiverem trabalhando ativamente nos itens do Sprint Backlog, eles participam como Desenvolvedores."
  },
  {
    id: 40,
    category: 'events',
    question: "Qual é a duração máxima recomendada para a Sprint Retrospective?",
    options: [
      { id: "a", text: "1 hora para uma Sprint de uma semana" },
      { id: "b", text: "2 horas para uma Sprint de duas semanas" },
      { id: "c", text: "3 horas para uma Sprint de três semanas" },
      { id: "d", text: "4 horas para uma Sprint de um mês" }
    ],
    correctAnswer: "d",
    explanation: "A Sprint Retrospective conclui a Sprint. É limitada a um máximo de três horas para uma Sprint de um mês. Para Sprints mais curtas, o evento geralmente é mais curto."
  },
  {
    id: 43,
    category: 'events',
    question: "Quanto tempo deve durar o Sprint Planning para uma Sprint de duas semanas?",
    options: [
      { id: "a", text: "Não mais que 4 horas" },
      { id: "c", text: "Não mais que 8 horas" },
      { id: "b", text: "Exatamente 4 horas" },
      { id: "d", text: "O tempo que for necessário" }
    ],
    correctAnswer: "a",
    explanation: "O Sprint Planning é limitado a um máximo de oito horas para uma Sprint de um mês. Para Sprints mais curtas, como de duas semanas, o evento geralmente é mais curto, geralmente não mais que 4 horas."
  },
  {
    id: 47,
    category: 'events',
    question: "O que acontece durante o Sprint Review?",
    options: [
      { id: "d", text: "O Product Owner atualiza o Product Backlog sozinho" },
      { id: "a", text: "A equipe planeja a próxima Sprint" },
      { id: "b", text: "O Time Scrum apresenta os resultados do trabalho para os stakeholders" },
      { id: "c", text: "A equipe discute como melhorar seus processos" }
    ],
    correctAnswer: "b",
    explanation: "Durante o Sprint Review, o Time Scrum apresenta os resultados do seu trabalho para os stakeholders e discute o progresso em direção à Meta do Produto. Este é um momento para inspecionar o incremento e adaptar o Product Backlog, se necessário."
  },
  {
    id: 50,
    category: 'events',
    question: "Quanto tempo deve durar a Daily Scrum?",
    options: [
      { id: "a", text: "15 minutos ou menos" },
      { id: "b", text: "30 minutos" },
      { id: "c", text: "O tempo necessário para que todos falem" },
      { id: "d", text: "1 hora" }
    ],
    correctAnswer: "a",
    explanation: "A Daily Scrum é limitada a 15 minutos. Este timebox é estabelecido para garantir que a reunião seja concisa e focada no objetivo de criar um plano para as próximas 24 horas."
  },
  {
    id: 54,
    category: 'events',
    question: "O que deve acontecer se uma equipe consistentemente não consegue completar o trabalho planejado dentro da Sprint?",
    options: [
      { id: "a", text: "Aumentar a duração da Sprint" },
      { id: "c", text: "Reavaliar a capacidade da equipe no planejamento" },
      { id: "b", text: "Adicionar mais pessoas à equipe" },
      { id: "d", text: "Permitir que o trabalho continue na próxima Sprint" }
    ],
    correctAnswer: "c",
    explanation: "Se uma equipe consistentemente não consegue completar o trabalho planejado, isto é um sinal de que precisa reavaliar sua capacidade durante o Sprint Planning. As estimativas devem melhorar com o tempo, à medida que a equipe aprende sobre sua velocidade real."
  },
  {
    id: 58,
    category: 'events',
    question: "Qual é o propósito do Sprint Planning em relação ao Sprint Backlog?",
    options: [
      { id: "a", text: "Criar uma lista completa e detalhada de todas as tarefas" },
      { id: "b", text: "Selecionar itens do Product Backlog e criar um plano para entregá-los" },
      { id: "c", text: "Atribuir itens específicos a desenvolvedores específicos" },
      { id: "d", text: "Estimar com precisão quanto tempo cada tarefa levará" }
    ],
    correctAnswer: "b",
    explanation: "O propósito do Sprint Planning em relação ao Sprint Backlog é selecionar quais itens do Product Backlog serão trabalhados durante a Sprint e criar um plano inicial para entregá-los. O Sprint Backlog é composto pela Meta da Sprint, os itens selecionados e o plano de entrega."
  },
  {
    id: 62,
    category: 'events',
    question: "Qual afirmação sobre o cancelamento de uma Sprint é correta?",
    options: [
      { id: "a", text: "Uma Sprint nunca deve ser cancelada" },
      { id: "c", text: "Apenas o Product Owner pode cancelar uma Sprint" },
      { id: "b", text: "Qualquer stakeholder pode cancelar uma Sprint" },
      { id: "d", text: "O Time Scrum deve votar para cancelar uma Sprint" }
    ],
    correctAnswer: "c",
    explanation: "Apenas o Product Owner tem a autoridade para cancelar uma Sprint. Isto pode ocorrer se a Meta da Sprint se tornar obsoleta, o que pode acontecer devido a mudanças nas condições de negócio, tecnologia ou mercado."
  },
  {
    id: 66,
    category: 'events',
    question: "Qual é o objetivo principal da Sprint Retrospective?",
    options: [
      { id: "d", text: "Avaliar o desempenho individual dos membros" },
      { id: "a", text: "Revisar o incremento do produto" },
      { id: "b", text: "Planejar melhorias na qualidade e eficácia" },
      { id: "c", text: "Atualizar o Product Backlog" }
    ],
    correctAnswer: "b",
    explanation: "O objetivo da Sprint Retrospective é planejar maneiras de aumentar a qualidade e a eficácia. O Time Scrum inspeciona como foi a última Sprint em relação a indivíduos, interações, processos, ferramentas e sua Definição de Pronto, identificando melhorias para implementar na próxima Sprint."
  },
  {
    id: 70,
    category: 'events',
    question: "O que NÃO deve ocorrer durante a Daily Scrum?",
    options: [
      { id: "a", text: "Planejamento detalhado para o dia" },
      { id: "b", text: "Discussões técnicas prolongadas sobre implementações" },
      { id: "c", text: "Identificação de impedimentos" },
      { id: "d", text: "Adaptar o Sprint Backlog" }
    ],
    correctAnswer: "b",
    explanation: "Discussões técnicas prolongadas sobre implementações não devem ocorrer durante a Daily Scrum. Esses detalhes técnicos devem ser discutidos em reuniões separadas. A Daily Scrum deve ser focada e concisa, servindo para inspecionar o progresso e criar um plano para as próximas 24 horas."
  },
  {
    id: 74,
    category: 'events',
    question: "O que diferencia a Sprint Retrospective de outros eventos Scrum?",
    options: [
      { id: "d", text: "É o único evento opcional no Scrum" },
      { id: "a", text: "É o único evento onde os stakeholders estão presentes" },
      { id: "b", text: "É focada no processo e pessoas, não no produto" },
      { id: "c", text: "É o único evento que o Scrum Master conduz" }
    ],
    correctAnswer: "b",
    explanation: "A Sprint Retrospective diferencia-se por ser focada no processo e nas pessoas, não no produto. Enquanto outros eventos (como Sprint Planning, Daily Scrum e Sprint Review) concentram-se no produto e no trabalho, a Retrospective examina como o Time Scrum trabalhou junto, suas interações, ferramentas e processos."
  }
];
