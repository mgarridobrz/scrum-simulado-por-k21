
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
  {
    id: 16,
    category: 'fundamentals',
    question: "O que é empirismo no Scrum?",
    options: [
      { id: "a", text: "Uma forma de rastrear a velocidade" },
      { id: "b", text: "Uma abordagem baseada em observação, inspeção e adaptação" },
      { id: "c", text: "Um método para estimar story points" },
      { id: "d", text: "Uma técnica para refinamento do Backlog" }
    ],
    correctAnswer: "b",
    explanation: "O empirismo afirma que o conhecimento vem da experiência e da tomada de decisões com base no que é observado. O Scrum emprega uma abordagem iterativa e incremental para otimizar a previsibilidade e controlar o risco."
  },
  {
    id: 17,
    category: 'fundamentals',
    question: "Qual é o tamanho recomendado para um Time Scrum?",
    options: [
      { id: "a", text: "3-9 pessoas incluindo Scrum Master e Product Owner" },
      { id: "b", text: "5-11 pessoas excluindo Scrum Master e Product Owner" },
      { id: "c", text: "10-15 pessoas no total" },
      { id: "d", text: "Não há um tamanho fixo obrigatório" }
    ],
    correctAnswer: "a",
    explanation: "Os Times Scrum são tipicamente compostos por 10 ou menos pessoas. Em geral, equipes menores se comunicam melhor e são mais produtivas."
  },
  {
    id: 18,
    category: 'events',
    question: "O que acontece se um objetivo da Sprint se tornar obsoleto?",
    options: [
      { id: "a", text: "A Sprint continua, mas com objetivos modificados" },
      { id: "b", text: "A Sprint pode ser cancelada pelo Product Owner" },
      { id: "c", text: "A equipe deve completar a Sprint conforme planejado" },
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
    id: 20,
    category: 'artifacts',
    question: "Quem é responsável por garantir que os itens do Product Backlog sejam transparentes?",
    options: [
      { id: "a", text: "O Scrum Master" },
      { id: "b", text: "O Time de Desenvolvimento" },
      { id: "c", text: "O Product Owner" },
      { id: "d", text: "Todo o Time Scrum" }
    ],
    correctAnswer: "c",
    explanation: "O Product Owner é responsável pelo Product Backlog, incluindo seu conteúdo, disponibilidade e transparência."
  },
  {
    id: 21,
    category: 'artifacts',
    question: "Qual é o principal propósito do objetivo da Sprint?",
    options: [
      { id: "a", text: "Medir a velocidade da equipe" },
      { id: "b", text: "Proporcionar flexibilidade na implementação do trabalho" },
      { id: "c", text: "Rastrear o desempenho individual" },
      { id: "d", text: "Satisfazer os requisitos dos stakeholders" }
    ],
    correctAnswer: "b",
    explanation: "O objetivo da Sprint cria coerência e foco, incentivando o Time Scrum a trabalhar junto em vez de em iniciativas separadas."
  },
  {
    id: 22,
    category: 'roles',
    question: "Qual é a principal responsabilidade dos Desenvolvedores no Scrum?",
    options: [
      { id: "a", text: "Seguir as instruções do Scrum Master" },
      { id: "b", text: "Criar um plano para a Sprint" },
      { id: "c", text: "Gerenciar o Product Backlog" },
      { id: "d", text: "Criar um incremento valioso e útil a cada Sprint" }
    ],
    correctAnswer: "d",
    explanation: "Os Desenvolvedores estão comprometidos em criar qualquer aspecto de um incremento utilizável a cada Sprint, aderindo à sua Definição de Pronto."
  },
  {
    id: 23,
    category: 'fundamentals',
    question: "Quais são os valores do Scrum?",
    options: [
      { id: "a", text: "Transparência, Inspeção, Adaptação" },
      { id: "b", text: "Comprometimento, Foco, Abertura, Respeito e Coragem" },
      { id: "c", text: "Comunicação, Colaboração, Visibilidade" },
      { id: "d", text: "Agilidade, Eficiência, Qualidade, Inovação" }
    ],
    correctAnswer: "b",
    explanation: "Os cinco valores do Scrum são: Comprometimento, Foco, Abertura, Respeito e Coragem. Esses valores dão direção ao Time Scrum com relação ao seu trabalho, ações e comportamentos."
  },
  {
    id: 24,
    category: 'events',
    question: "Qual é o propósito da Sprint Retrospective?",
    options: [
      { id: "a", text: "Planejar o trabalho para a próxima Sprint" },
      { id: "b", text: "Avaliar o incremento produzido na Sprint" },
      { id: "c", text: "Inspecionar o Time Scrum e criar melhorias para a próxima Sprint" },
      { id: "d", text: "Revisar e ajustar o Product Backlog" }
    ],
    correctAnswer: "c",
    explanation: "O propósito da Sprint Retrospective é planejar maneiras de aumentar a qualidade e a eficácia. O Time Scrum inspeciona como foi a última Sprint em relação a pessoas, relacionamentos, processos e ferramentas."
  },
  {
    id: 25,
    category: 'roles',
    question: "Quem é responsável por promover e apoiar o Scrum dentro da organização?",
    options: [
      { id: "a", text: "Os gerentes seniores" },
      { id: "b", text: "O Product Owner" },
      { id: "c", text: "Os Desenvolvedores" },
      { id: "d", text: "O Scrum Master" }
    ],
    correctAnswer: "d",
    explanation: "O Scrum Master é responsável pela eficácia do Time Scrum. Eles fazem isso ajudando todos a entender a teoria, prática, regras e valores do Scrum. O Scrum Master ajuda aqueles fora do Time Scrum a entender quais de suas interações com o Time Scrum são úteis e quais não são."
  },
  {
    id: 26,
    category: 'artifacts',
    question: "O que é o Sprint Backlog?",
    options: [
      { id: "a", text: "Uma lista de todas as tarefas que a equipe precisa fazer ao longo do projeto" },
      { id: "b", text: "A meta da Sprint, os itens do Product Backlog selecionados e um plano para entregar o incremento" },
      { id: "c", text: "Uma lista de impedimentos identificados pelo Scrum Master" },
      { id: "d", text: "A lista de defeitos encontrados durante a Sprint" }
    ],
    correctAnswer: "b",
    explanation: "O Sprint Backlog é composto pela meta da Sprint (por que), o conjunto de itens do Product Backlog selecionados para a Sprint (o que), bem como um plano para entregar o incremento (como)."
  },
  {
    id: 27,
    category: 'fundamentals',
    question: "Qual afirmação sobre o Scrum é correta?",
    options: [
      { id: "a", text: "O Scrum é um processo ou técnica para construir produtos" },
      { id: "b", text: "O Scrum é um framework completo com todas as ferramentas necessárias para gerenciamento de projetos" },
      { id: "c", text: "O Scrum é um framework dentro do qual você pode empregar vários processos e técnicas" },
      { id: "d", text: "O Scrum é uma metodologia que aumenta a produtividade da equipe" }
    ],
    correctAnswer: "c",
    explanation: "O Scrum é um framework leve que ajuda pessoas, times e organizações a gerar valor por meio de soluções adaptativas para problemas complexos. Ele não prescreve técnicas específicas, mas permite que os times escolham as práticas que melhor se adequam ao seu contexto."
  },
  {
    id: 28,
    category: 'roles',
    question: "Quem pode remover itens do Sprint Backlog durante uma Sprint?",
    options: [
      { id: "a", text: "Apenas o Product Owner" },
      { id: "b", text: "Apenas o Scrum Master" },
      { id: "c", text: "Apenas os Desenvolvedores" },
      { id: "d", text: "Qualquer membro do Time Scrum" }
    ],
    correctAnswer: "c",
    explanation: "O Sprint Backlog é um plano feito por e para os Desenvolvedores. É uma imagem altamente visível, em tempo real, do trabalho que os Desenvolvedores planejam realizar durante a Sprint para atingir a meta da Sprint. Consequentemente, o Sprint Backlog é atualizado ao longo da Sprint conforme mais é aprendido."
  },
  {
    id: 29,
    category: 'events',
    question: "Qual é o principal objetivo da Sprint Planning?",
    options: [
      { id: "a", text: "Atribuir tarefas aos membros da equipe" },
      { id: "b", text: "Iniciar o trabalho da Sprint" },
      { id: "c", text: "Estabelecer o que pode ser entregue na Sprint e como o trabalho será realizado" },
      { id: "d", text: "Priorizar o Product Backlog" }
    ],
    correctAnswer: "c",
    explanation: "O Sprint Planning inicia a Sprint ao definir o trabalho a ser realizado. O plano resultante é criado pelo trabalho colaborativo de todo o Time Scrum. O Product Owner garante que os participantes estejam preparados para discutir os itens mais importantes do Product Backlog e como eles se relacionam com a meta do produto."
  },
  {
    id: 30,
    category: 'fundamentals',
    question: "Por que o Scrum é considerado 'leve'?",
    options: [
      { id: "a", text: "Porque é fácil de aprender" },
      { id: "b", text: "Porque tem poucas regras e papéis" },
      { id: "c", text: "Porque não exige documentação" },
      { id: "d", text: "Porque é apenas para projetos pequenos" }
    ],
    correctAnswer: "b",
    explanation: "O Scrum é intencionalmente leve. Ele define apenas as partes necessárias para implementar a teoria Scrum. O framework Scrum é minimalista, não contendo nada que não seja absolutamente necessário para realizar seu propósito."
  },
  {
    id: 31,
    category: 'artifacts',
    question: "O que é o 'Incremento' no Scrum?",
    options: [
      { id: "a", text: "A soma de todos os itens do Product Backlog completados durante a Sprint" },
      { id: "b", text: "Um passo concreto em direção à meta do Produto" },
      { id: "c", text: "O aumento na velocidade da equipe de uma Sprint para outra" },
      { id: "d", text: "Uma nova versão do software com mais funcionalidades" }
    ],
    correctAnswer: "b",
    explanation: "Um Incremento é um passo concreto em direção à meta do Produto. Cada Incremento é adicionado a todos os Incrementos anteriores e verificado minuciosamente, garantindo que todos os Incrementos funcionem juntos. Para fornecer valor, o Incremento deve ser utilizável."
  },
  {
    id: 32,
    category: 'roles',
    question: "Qual afirmação sobre o Product Owner é correta?",
    options: [
      { id: "a", text: "O Product Owner pode delegar a responsabilidade pelo Product Backlog para a equipe de desenvolvimento" },
      { id: "b", text: "O Product Owner pode ser um comitê de pessoas" },
      { id: "c", text: "O Product Owner é uma pessoa, não um comitê" },
      { id: "d", text: "O Product Owner deve ter experiência técnica para avaliar as soluções implementadas" }
    ],
    correctAnswer: "c",
    explanation: "O Product Owner é uma pessoa, não um comitê. O Product Owner pode representar as necessidades de muitos stakeholders no Product Backlog. Aqueles que desejam alterar o Product Backlog podem fazê-lo tentando convencer o Product Owner."
  },
  {
    id: 33,
    category: 'events',
    question: "Qual declaração sobre a duração da Sprint é correta?",
    options: [
      { id: "a", text: "Sprints podem ter duração variável, dependendo da complexidade do trabalho" },
      { id: "b", text: "Sprints devem ter duração de duas semanas" },
      { id: "c", text: "Sprints mais curtas podem ser usadas para gerar mais feedback e limitar risco" },
      { id: "d", text: "A duração da Sprint deve aumentar à medida que o projeto avança" }
    ],
    correctAnswer: "c",
    explanation: "Sprints mais curtas podem ser usadas para gerar mais feedback e limitar o risco de custo e esforço a um menor período de tempo. Cada Sprint pode ser considerado um projeto curto. Sprints são limitadas a um mês."
  },
  {
    id: 34,
    category: 'fundamentals',
    question: "O que acontece quando uma Sprint termina?",
    options: [
      { id: "a", text: "O Time Scrum recebe uma nova atribuição de trabalho" },
      { id: "b", text: "Uma nova Sprint começa imediatamente depois" },
      { id: "c", text: "O Time Scrum tem um período de descanso antes da próxima Sprint" },
      { id: "d", text: "O Scrum Master avalia o desempenho da equipe" }
    ],
    correctAnswer: "b",
    explanation: "Uma nova Sprint começa imediatamente após a conclusão da Sprint anterior. As Sprints são contínuas; apenas o conteúdo e o foco podem mudar de uma Sprint para outra com base no resultado da Sprint Review e no contexto atualizado do trabalho."
  },
  {
    id: 35,
    category: 'artifacts',
    question: "Qual é o propósito do Product Backlog?",
    options: [
      { id: "a", text: "Listar todas as tarefas que o time de desenvolvimento deve realizar" },
      { id: "b", text: "Documentar os requisitos técnicos do produto" },
      { id: "c", text: "Servir como a única fonte de requisitos para qualquer mudança a ser feita no produto" },
      { id: "d", text: "Rastrear o progresso da Sprint atual" }
    ],
    correctAnswer: "c",
    explanation: "O Product Backlog é uma lista ordenada e emergente do que é necessário para melhorar o produto. É a única fonte de trabalho realizado pelo Time Scrum. Os itens de Product Backlog que podem ser realizados pelo Time Scrum dentro de uma Sprint são considerados preparados para seleção em um evento de Sprint Planning."
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
    id: 37,
    category: 'roles',
    question: "Como o Scrum Master serve à organização?",
    options: [
      { id: "a", text: "Atuando como um gerente de projetos tradicional" },
      { id: "b", text: "Liderando e treinando a organização em sua adoção do Scrum" },
      { id: "c", text: "Reportando o progresso aos executivos" },
      { id: "d", text: "Garantindo que o Scrum seja implementado conforme as diretrizes da empresa" }
    ],
    correctAnswer: "b",
    explanation: "O Scrum Master serve à organização de várias maneiras, incluindo: liderando e treinando a organização em sua adoção do Scrum; planejando implementações Scrum; ajudando funcionários e stakeholders a entender e aplicar uma abordagem empírica para trabalho complexo; e removendo barreiras entre stakeholders e Times Scrum."
  },
  {
    id: 38,
    category: 'fundamentals',
    question: "Qual declaração sobre a transparência no Scrum é verdadeira?",
    options: [
      { id: "a", text: "A transparência é responsabilidade exclusiva do Scrum Master" },
      { id: "b", text: "A transparência apenas se aplica ao progresso técnico do trabalho" },
      { id: "c", text: "A transparência exige que o processo e o trabalho sejam visíveis para quem realiza e recebe o trabalho" },
      { id: "d", text: "A transparência significa que todas as informações estão disponíveis para qualquer pessoa na organização" }
    ],
    correctAnswer: "c",
    explanation: "O processo e o trabalho emergente devem ser visíveis tanto para quem realiza o trabalho quanto para aqueles que recebem o trabalho. No Scrum, decisões importantes são baseadas no estado percebido de seus três artefatos formais. Artefatos com baixa transparência podem levar a decisões que diminuem o valor e aumentam o risco."
  },
  {
    id: 39,
    category: 'artifacts',
    question: "O que é a Definition of Done (Definição de Pronto)?",
    options: [
      { id: "a", text: "Um checklist específico para cada item do Product Backlog" },
      { id: "b", text: "Uma descrição formal do estado do Incremento quando ele atende às medidas de qualidade exigidas para o produto" },
      { id: "c", text: "A lista de critérios de aceitação definidos pelo Product Owner" },
      { id: "d", text: "O conjunto de tarefas que compõem um item do Sprint Backlog" }
    ],
    correctAnswer: "b",
    explanation: "A Definição de Pronto é uma descrição formal do estado do Incremento quando ele atende às medidas de qualidade exigidas para o produto. No momento em que um item do Product Backlog atende à Definição de Pronto, um Incremento nasce."
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
    id: 41,
    category: 'fundamentals',
    question: "Como o trabalho é dividido em um Time Scrum?",
    options: [
      { id: "a", text: "Por especialidade técnica ou área de conhecimento" },
      { id: "b", text: "Pelo Scrum Master, em colaboração com os gerentes funcionais" },
      { id: "c", text: "Não existem títulos para os Desenvolvedores, independentemente do trabalho realizado" },
      { id: "d", text: "Pelo Product Owner, com base nas prioridades" }
    ],
    correctAnswer: "c",
    explanation: "Dentro de um Time Scrum, não existem sub-times ou hierarquias. É uma unidade coesa de profissionais focados em um objetivo de cada vez: a meta do Produto. Times Scrum são multifuncionais, o que significa que os membros têm todas as habilidades necessárias para criar valor a cada Sprint."
  },
  {
    id: 42,
    category: 'roles',
    question: "O que acontece se o Product Owner e os Desenvolvedores discordarem sobre a prioridade dos itens do Product Backlog?",
    options: [
      { id: "a", text: "O Scrum Master decide a prioridade final" },
      { id: "b", text: "A decisão é levada aos stakeholders para resolução" },
      { id: "c", text: "A decisão do Product Owner prevalece" },
      { id: "d", text: "A equipe de desenvolvimento tem a palavra final" }
    ],
    correctAnswer: "c",
    explanation: "No Scrum, o Product Owner é o único responsável por gerenciar o Product Backlog, incluindo seu conteúdo e ordenação. A decisão final sobre prioridades é dele, embora ele possa considerar o feedback dos Desenvolvedores e stakeholders."
  },
  {
    id: 43,
    category: 'events',
    question: "Quanto tempo deve durar o Sprint Planning para uma Sprint de duas semanas?",
    options: [
      { id: "a", text: "Não mais que 4 horas" },
      { id: "b", text: "Exatamente 4 horas" },
      { id: "c", text: "Não mais que 8 horas" },
      { id: "d", text: "O tempo que for necessário" }
    ],
    correctAnswer: "a",
    explanation: "O Sprint Planning é limitado a um máximo de oito horas para uma Sprint de um mês. Para Sprints mais curtas, como de duas semanas, o evento geralmente é mais curto, geralmente não mais que 4 horas."
  },
  {
    id: 44,
    category: 'fundamentals',
    question: "O que significa autogerenciamento no Scrum?",
    options: [
      { id: "a", text: "Cada membro da equipe decide individualmente o que trabalhar" },
      { id: "b", text: "A equipe decide internamente quem faz o quê, quando e como" },
      { id: "c", text: "O Scrum Master gerencia as tarefas para a equipe" },
      { id: "d", text: "Os desenvolvedores trabalham sem supervisão" }
    ],
    correctAnswer: "b",
    explanation: "Times Scrum são autogerenciados, escolhendo quem faz o quê, quando e como. Eles são unidades coesas onde os membros se responsabilizam coletivamente e decidem internamente como atingir seus objetivos."
  },
  {
    id: 45,
    category: 'artifacts',
    question: "Quem deve participar do Product Backlog Refinement?",
    options: [
      { id: "a", text: "Apenas o Product Owner" },
      { id: "b", text: "Apenas os Desenvolvedores" },
      { id: "c", text: "O Time Scrum" },
      { id: "d", text: "O Product Owner e os stakeholders" }
    ],
    correctAnswer: "c",
    explanation: "O Product Backlog Refinement é uma atividade colaborativa onde o Time Scrum (Product Owner, Scrum Master e Desenvolvedores) analisa, estima e detalha itens do Product Backlog. Embora o Product Owner seja o responsável final pelo backlog, o refinamento é uma atividade de todo o Time Scrum."
  },
  {
    id: 46,
    category: 'roles',
    question: "Qual é o limite máximo recomendado de membros para um Time Scrum?",
    options: [
      { id: "a", text: "7 membros" },
      { id: "b", text: "9 membros" },
      { id: "c", text: "10 membros" },
      { id: "d", text: "12 membros" }
    ],
    correctAnswer: "c",
    explanation: "De acordo com o Guia do Scrum, os Times Scrum são tipicamente compostos por 10 ou menos pessoas. Times menores geralmente se comunicam melhor e são mais produtivos."
  },
  {
    id: 47,
    category: 'events',
    question: "O que acontece durante o Sprint Review?",
    options: [
      { id: "a", text: "A equipe planeja a próxima Sprint" },
      { id: "b", text: "O Time Scrum apresenta os resultados do trabalho para os stakeholders" },
      { id: "c", text: "A equipe discute como melhorar seus processos" },
      { id: "d", text: "O Product Owner atualiza o Product Backlog sozinho" }
    ],
    correctAnswer: "b",
    explanation: "Durante o Sprint Review, o Time Scrum apresenta os resultados do seu trabalho para os stakeholders e discute o progresso em direção à Meta do Produto. Este é um momento para inspecionar o incremento e adaptar o Product Backlog, se necessário."
  },
  {
    id: 48,
    category: 'artifacts',
    question: "Quem é responsável por monitorar o progresso em direção à Meta da Sprint?",
    options: [
      { id: "a", text: "O Product Owner exclusivamente" },
      { id: "b", text: "O Scrum Master exclusivamente" },
      { id: "c", text: "Os Desenvolvedores exclusivamente" },
      { id: "d", text: "Todo o Time Scrum" }
    ],
    correctAnswer: "d",
    explanation: "Todo o Time Scrum é responsável por monitorar o progresso em direção à Meta da Sprint durante a Sprint. Os Desenvolvedores acompanham diariamente o trabalho restante, o Product Owner acompanha o progresso em relação ao valor de negócio, e o Scrum Master ajuda todos a entenderem o progresso."
  },
  {
    id: 49,
    category: 'fundamentals',
    question: "Qual é uma das principais vantagens da estrutura timeboxed do Scrum?",
    options: [
      { id: "a", text: "Permite adicionar mais trabalho quando a equipe termina mais cedo" },
      { id: "b", text: "Reduz a complexidade limitando o tempo e quantidade de trabalho" },
      { id: "c", text: "Elimina a necessidade de planejamento detalhado" },
      { id: "d", text: "Garante que todo o trabalho planejado seja concluído" }
    ],
    correctAnswer: "b",
    explanation: "A estrutura timeboxed do Scrum (Sprints de duração fixa e eventos com tempos máximos definidos) reduz a complexidade limitando a quantidade de trabalho em andamento e o tempo dedicado a cada parte do processo, minimizando desperdícios e focando no que é essencial."
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
    id: 51,
    category: 'roles',
    question: "Qual é o papel do Product Owner em relação aos stakeholders?",
    options: [
      { id: "a", text: "Seguir todas as instruções dos stakeholders" },
      { id: "b", text: "Isolar a equipe das solicitações dos stakeholders" },
      { id: "c", text: "Representar os interesses dos stakeholders no Product Backlog" },
      { id: "d", text: "Delegar decisões do produto aos stakeholders" }
    ],
    correctAnswer: "c",
    explanation: "O Product Owner representa os interesses dos stakeholders no Product Backlog. Ele é responsável por maximizar o valor do produto, o que requer entender e equilibrar as necessidades de diversos stakeholders, mas mantendo a autoridade final sobre o Product Backlog."
  },
  {
    id: 52,
    category: 'artifacts',
    question: "Como o conceito de 'transparência' se aplica aos artefatos do Scrum?",
    options: [
      { id: "a", text: "Todos os artefatos devem ser visíveis apenas para o Time Scrum" },
      { id: "b", text: "Os artefatos devem ser compreensíveis e baseados em padrões compartilhados" },
      { id: "c", text: "Apenas o Product Backlog precisa ser transparente" },
      { id: "d", text: "A transparência significa documentar detalhadamente todos os artefatos" }
    ],
    correctAnswer: "b",
    explanation: "No Scrum, a transparência dos artefatos significa que eles devem ser compreensíveis por todos e baseados em padrões compartilhados. Todos os observadores devem ter um entendimento comum do que está sendo visto, como a Definição de Pronto para o Incremento."
  },
  {
    id: 53,
    category: 'fundamentals',
    question: "O que significa dizer que o Scrum é 'simples de entender, difícil de dominar'?",
    options: [
      { id: "a", text: "Seu framework é minimalista, mas sua implementação eficaz exige prática" },
      { id: "b", text: "É mais fácil aprender do que outras metodologias ágeis" },
      { id: "c", text: "É simples para iniciantes, mas muito complexo para profissionais" },
      { id: "d", text: "O Guia do Scrum é curto, mas a certificação é difícil" }
    ],
    correctAnswer: "a",
    explanation: "O Scrum é 'simples de entender' porque seu framework tem poucas regras, papéis e artefatos. Porém, é 'difícil de dominar' porque sua implementação eficaz requer prática, adaptação cultural e compreensão profunda dos princípios empíricos em que se baseia."
  },
  {
    id: 54,
    category: 'events',
    question: "O que deve acontecer se uma equipe consistentemente não consegue completar o trabalho planejado dentro da Sprint?",
    options: [
      { id: "a", text: "Aumentar a duração da Sprint" },
      { id: "b", text: "Adicionar mais pessoas à equipe" },
      { id: "c", text: "Reavaliar a capacidade da equipe no planejamento" },
      { id: "d", text: "Permitir que o trabalho continue na próxima Sprint" }
    ],
    correctAnswer: "c",
    explanation: "Se uma equipe consistentemente não consegue completar o trabalho planejado, isto é um sinal de que precisa reavaliar sua capacidade durante o Sprint Planning. As estimativas devem melhorar com o tempo, à medida que a equipe aprende sobre sua velocidade real."
  },
  {
    id: 55,
    category: 'roles',
    question: "O que o Scrum Master NÃO deve fazer?",
    options: [
      { id: "a", text: "Facilitar eventos Scrum" },
      { id: "b", text: "Remover impedimentos" },
      { id: "c", text: "Atribuir tarefas aos Desenvolvedores" },
      { id: "d", text: "Coaching em práticas Scrum" }
    ],
    correctAnswer: "c",
    explanation: "O Scrum Master não deve atribuir tarefas aos Desenvolvedores, pois isso viola o princípio de autogerenciamento. Os Desenvolvedores decidem como transformar itens do Product Backlog em Incrementos e gerenciam seu próprio trabalho, não recebendo tarefas atribuídas pelo Scrum Master ou qualquer outra pessoa."
  },
  {
    id: 56,
    category: 'artifacts',
    question: "Qual é o papel dos 'compromissos' em relação aos artefatos Scrum?",
    options: [
      { id: "a", text: "São promessas que o Time Scrum faz aos stakeholders" },
      { id: "b", text: "Aumentam a transparência e fornecem foco para medir o progresso" },
      { id: "c", text: "São requisitos contratuais para a entrega do produto" },
      { id: "d", text: "Definem penalidades para metas não atingidas" }
    ],
    correctAnswer: "b",
    explanation: "Cada artefato do Scrum contém um 'compromisso' que aumenta sua transparência e fornece um foco para medir o progresso: o Product Backlog tem a Meta do Produto, o Sprint Backlog tem a Meta da Sprint, e o Incremento tem a Definição de Pronto."
  },
  {
    id: 57,
    category: 'fundamentals',
    question: "Qual é a base filosófica do Scrum?",
    options: [
      { id: "a", text: "Planejamento e previsibilidade" },
      { id: "b", text: "Empirismo e pensamento Lean" },
      { id: "c", text: "Eficiência e minimização de custos" },
      { id: "d", text: "Documentação e processos" }
    ],
    correctAnswer: "b",
    explanation: "O Scrum é fundamentado no empirismo (conhecimento vem da experiência e decisões baseadas na observação) e no pensamento Lean (foco na redução de desperdícios e maximização de valor). Juntos, esses princípios enfatizam adaptabilidade, observação e melhoria contínua."
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
    id: 59,
    category: 'roles',
    question: "Como os Desenvolvedores devem responder a uma solicitação de mudança de escopo durante a Sprint?",
    options: [
      { id: "a", text: "Sempre rejeitar qualquer mudança durante a Sprint" },
      { id: "b", text: "Aceitar todas as solicitações para satisfazer os stakeholders" },
      { id: "c", text: "Direcionar a solicitação ao Product Owner para negociação" },
      { id: "d", text: "Implementar mudanças se tiverem capacidade extra" }
    ],
    correctAnswer: "c",
    explanation: "Os Desenvolvedores devem direcionar solicitações de mudança de escopo ao Product Owner, que é responsável por gerenciar o Product Backlog. O Product Owner pode então negociar a mudança, possivelmente removendo outros itens de igual tamanho para manter o foco na Meta da Sprint, ou adicionando a solicitação ao Product Backlog para Sprints futuras."
  },
  {
    id: 60,
    category: 'artifacts',
    question: "Por que os itens do Product Backlog devem ser ordenados?",
    options: [
      { id: "a", text: "Para facilitar a documentação do produto" },
      { id: "b", text: "Para otimizar o valor e maximizar a eficiência no trabalho" },
      { id: "c", text: "Porque o Scrum exige que tudo seja priorizado" },
      { id: "d", text: "Para agradar aos stakeholders" }
    ],
    correctAnswer: "b",
    explanation: "Os itens do Product Backlog são ordenados para otimizar o valor entregue e maximizar a eficiência do trabalho do Time Scrum. Os itens mais importantes, valiosos, urgentes ou com maior risco geralmente ficam no topo, garantindo que o trabalho mais valioso seja feito primeiro."
  },
  {
    id: 61,
    category: 'fundamentals',
    question: "Qual é a diferença entre 'inspeção' e 'adaptação' no Scrum?",
    options: [
      { id: "a", text: "Inspeção é feita pelo Scrum Master, adaptação pelos Desenvolvedores" },
      { id: "b", text: "Inspeção ocorre nos eventos, adaptação apenas após a Sprint" },
      { id: "c", text: "Inspeção é observar o progresso, adaptação é ajustar baseado nessa observação" },
      { id: "d", text: "Inspeção é testar o produto, adaptação é corrigir bugs" }
    ],
    correctAnswer: "c",
    explanation: "Inspeção no Scrum refere-se a examinar regularmente artefatos e progresso para detectar variações indesejáveis. Adaptação é o processo de ajustar o processo ou os artefatos quando a inspeção determina que algo está fora dos limites aceitáveis e o resultado seria inaceitável."
  },
  {
    id: 62,
    category: 'events',
    question: "Qual afirmação sobre o cancelamento de uma Sprint é correta?",
    options: [
      { id: "a", text: "Uma Sprint nunca deve ser cancelada" },
      { id: "b", text: "Qualquer stakeholder pode cancelar uma Sprint" },
      { id: "c", text: "Apenas o Product Owner pode cancelar uma Sprint" },
      { id: "d", text: "O Time Scrum deve votar para cancelar uma Sprint" }
    ],
    correctAnswer: "c",
    explanation: "Apenas o Product Owner tem a autoridade para cancelar uma Sprint. Isto pode ocorrer se a Meta da Sprint se tornar obsoleta, o que pode acontecer devido a mudanças nas condições de negócio, tecnologia ou mercado."
  },
  {
    id: 63,
    category: 'roles',
    question: "Como o Scrum Master apoia os Desenvolvedores?",
    options: [
      { id: "a", text: "Garantindo que completem todas as tarefas atribuídas" },
      { id: "b", text: "Coaching em autogerenciamento e cross-funcionalidade" },
      { id: "c", text: "Reportando o desempenho aos gerentes" },
      { id: "d", text: "Fornecendo soluções técnicas para problemas" }
    ],
    correctAnswer: "b",
    explanation: "O Scrum Master apoia os Desenvolvedores fazendo coaching em autogerenciamento e cross-funcionalidade, ajudando-os a criar produtos de alto valor, removendo impedimentos, facilitando eventos Scrum quando solicitado ou necessário, e ajudando-os a focar na Meta da Sprint."
  },
  {
    id: 64,
    category: 'artifacts',
    question: "Qual é o propósito da Meta do Produto?",
    options: [
      { id: "a", text: "Definir exatamente como o produto final será" },
      { id: "b", text: "Especificar todos os requisitos do produto" },
      { id: "c", text: "Comunicar o objetivo que o produto busca alcançar" },
      { id: "d", text: "Servir como contrato entre o Time Scrum e stakeholders" }
    ],
    correctAnswer: "c",
    explanation: "A Meta do Produto descreve o estado futuro do produto e serve como alvo para o Time Scrum planejar. Ela comunica o objetivo maior que o produto busca alcançar, criando coerência e foco. Está contida no Product Backlog, e o progresso em direção a ela pode ser medido através do Product Backlog."
  },
  {
    id: 65,
    category: 'fundamentals',
    question: "Qual é a relação entre 'Done' (Pronto) e 'valor' no Scrum?",
    options: [
      { id: "a", text: "São conceitos independentes" },
      { id: "b", text: "Um incremento só tem valor quando atende à Definição de Pronto" },
      { id: "c", text: "Valor é determinado pelo Product Owner, Pronto pelos Desenvolvedores" },
      { id: "d", text: "Pronto é mais importante que valor" }
    ],
    correctAnswer: "b",
    explanation: "No Scrum, um incremento só tem valor quando atende à Definição de Pronto. Se um incremento não atender à Definição de Pronto, ele não pode ser liberado nem mesmo apresentado na Sprint Review, o que significa que não gera valor. A transparência, inspeção e adaptação dependem de incrementos 'Prontos'."
  },
  {
    id: 66,
    category: 'events',
    question: "Qual é o objetivo principal da Sprint Retrospective?",
    options: [
      { id: "a", text: "Revisar o incremento do produto" },
      { id: "b", text: "Planejar melhorias na qualidade e eficácia" },
      { id: "c", text: "Atualizar o Product Backlog" },
      { id: "d", text: "Avaliar o desempenho individual dos membros" }
    ],
    correctAnswer: "b",
    explanation: "O objetivo da Sprint Retrospective é planejar maneiras de aumentar a qualidade e a eficácia. O Time Scrum inspeciona como foi a última Sprint em relação a indivíduos, interações, processos, ferramentas e sua Definição de Pronto, identificando melhorias para implementar na próxima Sprint."
  },
  {
    id: 67,
    category: 'roles',
    question: "Qual é a responsabilidade do Time Scrum em relação à Definição de Pronto?",
    options: [
      { id: "a", text: "Seguir a Definição de Pronto estabelecida pela organização" },
      { id: "b", text: "Permitir que o Product Owner defina o que é Pronto" },
      { id: "c", text: "Criar e respeitar sua própria Definição de Pronto se a organização não tiver uma" },
      { id: "d", text: "Deixar cada Desenvolvedor definir seu próprio critério de Pronto" }
    ],
    correctAnswer: "c",
    explanation: "Se a organização não tiver uma Definição de Pronto estabelecida, o Time Scrum deve criar sua própria Definição de Pronto apropriada para o produto. Os Desenvolvedores devem seguir a Definição de Pronto, e se houver múltiplos Times Scrum trabalhando no mesmo produto, eles devem definir e seguir a mesma definição."
  },
  {
    id: 68,
    category: 'artifacts',
    question: "O que acontece com o Sprint Backlog durante a Sprint?",
    options: [
      { id: "a", text: "Permanece fixo do início ao fim da Sprint" },
      { id: "b", text: "Pode ser expandido, mas nunca reduzido" },
      { id: "c", text: "É atualizado conforme os Desenvolvedores aprendem mais" },
      { id: "d", text: "Só pode ser alterado pelo Product Owner" }
    ],
    correctAnswer: "c",
    explanation: "O Sprint Backlog é atualizado ao longo da Sprint conforme os Desenvolvedores aprendem mais sobre o trabalho necessário para atingir a Meta da Sprint. Quando novo trabalho é necessário, os Desenvolvedores o adicionam ao Sprint Backlog, e o trabalho é atualizado ou removido à medida que é executado."
  },
  {
    id: 69,
    category: 'fundamentals',
    question: "Qual é o propósito do autogerenciamento no Scrum?",
    options: [
      { id: "a", text: "Reduzir a necessidade de gerentes" },
      { id: "b", text: "Permitir que cada pessoa trabalhe como preferir" },
      { id: "c", text: "Aumentar a criatividade, produtividade e capacidade de resolver problemas complexos" },
      { id: "d", text: "Eliminar a responsabilidade da liderança organizacional" }
    ],
    correctAnswer: "c",
    explanation: "O autogerenciamento no Scrum visa aumentar a criatividade, produtividade e a capacidade dos profissionais de resolver problemas complexos. Times autogerenciados decidem quem faz o quê, quando e como, o que melhora seu engajamento, responsabilidade e eficácia."
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
    id: 71,
    category: 'roles',
    question: "O que significa dizer que o Product Owner é 'uma pessoa, não um comitê'?",
    options: [
      { id: "a", text: "O Product Owner nunca deve consultar outras pessoas" },
      { id: "b", text: "Uma única pessoa deve ter a autoridade final sobre o Product Backlog" },
      { id: "c", text: "O Product Owner não deve fazer parte de um comitê de produto" },
      { id: "d", text: "O Product Owner não pode representar os desejos de stakeholders" }
    ],
    correctAnswer: "b",
    explanation: "Dizer que o Product Owner é 'uma pessoa, não um comitê' significa que uma única pessoa deve ter a autoridade final sobre o Product Backlog. Embora o Product Owner possa representar os desejos de muitos stakeholders e delegar o trabalho a outros, ele continua sendo o único responsável pelo valor do produto e pelas decisões do Product Backlog."
  },
  {
    id: 72,
    category: 'artifacts',
    question: "Qual característica deve ter um item do Product Backlog para ser selecionado para o Sprint Planning?",
    options: [
      { id: "a", text: "Ser aprovado por todos os stakeholders" },
      { id: "b", text: "Ter uma estimativa de story points" },
      { id: "c", text: "Ser considerado 'Pronto para Seleção'" },
      { id: "d", text: "Ter especificações técnicas detalhadas" }
    ],
    correctAnswer: "c",
    explanation: "Para ser selecionado durante o Sprint Planning, um item do Product Backlog deve ser considerado 'Pronto para Seleção' (Ready), ou seja, suficientemente refinado para que os Desenvolvedores possam completá-lo dentro de uma Sprint. Itens com maior ordenação no Product Backlog geralmente são mais claros e detalhados."
  },
  {
    id: 73,
    category: 'fundamentals',
    question: "Como o Scrum trata a previsibilidade em projetos complexos?",
    options: [
      { id: "a", text: "Exige planejamento detalhado antes da execução" },
      { id: "b", text: "Usa abordagem empírica para maximizar previsibilidade e controlar riscos" },
      { id: "c", text: "Elimina a necessidade de previsibilidade em favor da adaptabilidade" },
      { id: "d", text: "Deixa toda previsibilidade a cargo do Product Owner" }
    ],
    correctAnswer: "b",
    explanation: "O Scrum usa uma abordagem empírica para maximizar a previsibilidade e controlar riscos. Ele reconhece que em trabalhos complexos, o que acontecerá no futuro é incerto. Em vez de planejar detalhadamente com antecedência, o Scrum usa ciclos curtos de inspeção e adaptação para otimizar a previsibilidade dentro desses limites."
  },
  {
    id: 74,
    category: 'events',
    question: "O que diferencia a Sprint Retrospective de outros eventos Scrum?",
    options: [
      { id: "a", text: "É o único evento onde os stakeholders estão presentes" },
      { id: "b", text: "É focada no processo e pessoas, não no produto" },
      { id: "c", text: "É o único evento que o Scrum Master conduz" },
      { id: "d", text: "É o único evento opcional no Scrum" }
    ],
    correctAnswer: "b",
    explanation: "A Sprint Retrospective diferencia-se por ser focada no processo e nas pessoas, não no produto. Enquanto outros eventos (como Sprint Planning, Daily Scrum e Sprint Review) concentram-se no produto e no trabalho, a Retrospective examina como o Time Scrum trabalhou junto, suas interações, ferramentas e processos."
  },
  {
    id: 75,
    category: 'roles',
    question: "Qual é o papel do Scrum Master em relação à remoção de impedimentos?",
    options: [
      { id: "a", text: "Resolver pessoalmente todos os impedimentos da equipe" },
      { id: "b", text: "Apenas documentar impedimentos para futura resolução" },
      { id: "c", text: "Treinar a equipe para resolver seus próprios impedimentos" },
      { id: "d", text: "Ajudar a remover impedimentos quando os Desenvolvedores não conseguem" }
    ],
    correctAnswer: "d",
    explanation: "O Scrum Master ajuda a remover impedimentos quando os Desenvolvedores não conseguem resolvê-los sozinhos. Um bom Scrum Master não resolve todos os problemas pessoalmente, mas capacita a equipe a resolver muitos de seus próprios impedimentos, intervindo quando os obstáculos estão além da influência ou capacidade dos Desenvolvedores."
  }
];

// Function to get a specified number of random questions from the question pool
export function getRandomQuestions(count: number): QuestionWithCategory[] {
  if (count >= quizQuestions.length) {
    return [...quizQuestions]; // Return all questions if count is greater than available questions
  }
  
  // Create a copy of the original array to avoid modifying it
  const questionsCopy = [...quizQuestions];
  
  // Shuffle the array using Fisher-Yates algorithm
  for (let i = questionsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questionsCopy[i], questionsCopy[j]] = [questionsCopy[j], questionsCopy[i]];
  }
  
  // Return the first 'count' questions
  return questionsCopy.slice(0, count);
}

// Function to calculate category-based statistics
export function getCategoryStats(
  userAnswers: Record<number, string>,
  questions: QuestionWithCategory[]
): Record<string, { correct: number; total: number }> {
  const stats: Record<string, { correct: number; total: number }> = {};
  
  // Initialize stats for each category
  questions.forEach(question => {
    if (!stats[question.category]) {
      stats[question.category] = { correct: 0, total: 0 };
    }
    
    stats[question.category].total += 1;
    
    // Check if the answer is correct
    if (userAnswers[question.id] === question.correctAnswer) {
      stats[question.category].correct += 1;
    }
  });
  
  return stats;
}
