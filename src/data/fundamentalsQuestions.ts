
import { QuestionWithCategory } from "./types";

export const fundamentalsQuestions: QuestionWithCategory[] = [
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
  }
];
