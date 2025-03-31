
import { QuestionWithCategory } from "./types";

export const artifactsQuestions: QuestionWithCategory[] = [
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
    id: 13,
    category: 'artifacts',
    question: "O que é Definition of Done (DoD) no Scrum?",
    options: [
      { id: "d", text: "A definição do que constitui a Meta da Sprint" },
      { id: "a", text: "Uma lista de tarefas a serem completadas durante a Sprint" },
      { id: "b", text: "O critério de aceitação de uma única User Story" },
      { id: "c", text: "Um entendimento compartilhado de quando um incremento está completo" }
    ],
    correctAnswer: "c",
    explanation: "A Definition of Done (DoD) é um acordo formal sobre o que significa um incremento de produto estar 'concluído'. É um conjunto de critérios que cada incremento deve satisfazer para garantir que está em condição utilizável. Todos na equipe devem entender o que significa concluir um item do Product Backlog."
  },
  {
    id: 20,
    category: 'artifacts',
    question: "Quem é responsável por garantir que os itens do Product Backlog sejam transparentes?",
    options: [
      { id: "a", text: "O Scrum Master" },
      { id: "c", text: "O Product Owner" },
      { id: "b", text: "O Time de Desenvolvimento" },
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
    id: 26,
    category: 'artifacts',
    question: "O que é o Sprint Backlog?",
    options: [
      { id: "c", text: "Uma lista de impedimentos identificados pelo Scrum Master" },
      { id: "a", text: "Uma lista de todas as tarefas que a equipe precisa fazer ao longo do projeto" },
      { id: "b", text: "A meta da Sprint, os itens do Product Backlog selecionados e um plano para entregar o incremento" },
      { id: "d", text: "A lista de defeitos encontrados durante a Sprint" }
    ],
    correctAnswer: "b",
    explanation: "O Sprint Backlog é composto pela meta da Sprint (por que), o conjunto de itens do Product Backlog selecionados para a Sprint (o que), bem como um plano para entregar o incremento (como)."
  },
  {
    id: 31,
    category: 'artifacts',
    question: "O que é o 'Incremento' no Scrum?",
    options: [
      { id: "c", text: "O aumento na velocidade da equipe de uma Sprint para outra" },
      { id: "a", text: "A soma de todos os itens do Product Backlog completados durante a Sprint" },
      { id: "b", text: "Um passo concreto em direção à meta do Produto" },
      { id: "d", text: "Uma nova versão do software com mais funcionalidades" }
    ],
    correctAnswer: "b",
    explanation: "Um Incremento é um passo concreto em direção à meta do Produto. Cada Incremento é adicionado a todos os Incrementos anteriores e verificado minuciosamente, garantindo que todos os Incrementos funcionem juntos. Para fornecer valor, o Incremento deve ser utilizável."
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
    id: 45,
    category: 'artifacts',
    question: "Quem deve participar do Product Backlog Refinement?",
    options: [
      { id: "d", text: "O Product Owner e os stakeholders" },
      { id: "a", text: "Apenas o Product Owner" },
      { id: "b", text: "Apenas os Desenvolvedores" },
      { id: "c", text: "O Time Scrum" }
    ],
    correctAnswer: "c",
    explanation: "O Product Backlog Refinement é uma atividade colaborativa onde o Time Scrum (Product Owner, Scrum Master e Desenvolvedores) analisa, estima e detalha itens do Product Backlog. Embora o Product Owner seja o responsável final pelo backlog, o refinamento é uma atividade de todo o Time Scrum."
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
    id: 56,
    category: 'artifacts',
    question: "Qual é o papel dos 'compromissos' em relação aos artefatos Scrum?",
    options: [
      { id: "c", text: "São requisitos contratuais para a entrega do produto" },
      { id: "a", text: "São promessas que o Time Scrum faz aos stakeholders" },
      { id: "b", text: "Aumentam a transparência e fornecem foco para medir o progresso" },
      { id: "d", text: "Definem penalidades para metas não atingidas" }
    ],
    correctAnswer: "b",
    explanation: "Cada artefato do Scrum contém um 'compromisso' que aumenta sua transparência e fornece um foco para medir o progresso: o Product Backlog tem a Meta do Produto, o Sprint Backlog tem a Meta da Sprint, e o Incremento tem a Definição de Pronto."
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
    id: 64,
    category: 'artifacts',
    question: "Qual é o propósito da Meta do Produto?",
    options: [
      { id: "a", text: "Definir exatamente como o produto final será" },
      { id: "c", text: "Comunicar o objetivo que o produto busca alcançar" },
      { id: "b", text: "Especificar todos os requisitos do produto" },
      { id: "d", text: "Servir como contrato entre o Time Scrum e stakeholders" }
    ],
    correctAnswer: "c",
    explanation: "A Meta do Produto descreve o estado futuro do produto e serve como alvo para o Time Scrum planejar. Ela comunica o objetivo maior que o produto busca alcançar, criando coerência e foco. Está contida no Product Backlog, e o progresso em direção a ela pode ser medido através do Product Backlog."
  },
  {
    id: 68,
    category: 'artifacts',
    question: "O que acontece com o Sprint Backlog durante a Sprint?",
    options: [
      { id: "a", text: "Permanece fixo do início ao fim da Sprint" },
      { id: "d", text: "Só pode ser alterado pelo Product Owner" },
      { id: "b", text: "Pode ser expandido, mas nunca reduzido" },
      { id: "c", text: "É atualizado conforme os Desenvolvedores aprendem mais" }
    ],
    correctAnswer: "c",
    explanation: "O Sprint Backlog é atualizado ao longo da Sprint conforme os Desenvolvedores aprendem mais sobre o trabalho necessário para atingir a Meta da Sprint. Quando novo trabalho é necessário, os Desenvolvedores o adicionam ao Sprint Backlog, e o trabalho é atualizado ou removido à medida que é executado."
  },
  {
    id: 72,
    category: 'artifacts',
    question: "Qual característica deve ter um item do Product Backlog para ser selecionado para o Sprint Planning?",
    options: [
      { id: "d", text: "Ter especificações técnicas detalhadas" },
      { id: "a", text: "Ser aprovado por todos os stakeholders" },
      { id: "b", text: "Ter uma estimativa de story points" },
      { id: "c", text: "Ser considerado 'Pronto para Seleção'" }
    ],
    correctAnswer: "c",
    explanation: "Para ser selecionado durante o Sprint Planning, um item do Product Backlog deve ser considerado 'Pronto para Seleção' (Ready), ou seja, suficientemente refinado para que os Desenvolvedores possam completá-lo dentro de uma Sprint. Itens com maior ordenação no Product Backlog geralmente são mais claros e detalhados."
  }
];
