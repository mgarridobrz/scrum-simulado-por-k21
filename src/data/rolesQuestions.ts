
import { QuestionWithCategory } from "./types";

export const rolesQuestions: QuestionWithCategory[] = [
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
    id: 11,
    category: 'roles',
    question: "Qual é o tamanho ideal de uma equipe Scrum?",
    options: [
      { id: "d", text: "10-15 pessoas" },
      { id: "a", text: "3-9 pessoas" },
      { id: "b", text: "5-7 pessoas" },
      { id: "c", text: "7-11 pessoas" }
    ],
    correctAnswer: "a",
    explanation: "De acordo com o Guia do Scrum, uma equipe Scrum típica tem 10 ou menos pessoas. Como regra geral, pequenas equipes comunicam-se melhor e são mais produtivas. Se as equipes Scrum ficarem muito grandes, elas devem considerar a reorganização em múltiplas equipes Scrum."
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
    id: 22,
    category: 'roles',
    question: "Qual é a principal responsabilidade dos Desenvolvedores no Scrum?",
    options: [
      { id: "a", text: "Seguir as instruções do Scrum Master" },
      { id: "b", text: "Criar um plano para a Sprint" },
      { id: "d", text: "Criar um incremento valioso e útil a cada Sprint" },
      { id: "c", text: "Gerenciar o Product Backlog" }
    ],
    correctAnswer: "d",
    explanation: "Os Desenvolvedores estão comprometidos em criar qualquer aspecto de um incremento utilizável a cada Sprint, aderindo à sua Definição de Pronto."
  },
  {
    id: 25,
    category: 'roles',
    question: "Quem é responsável por promover e apoiar o Scrum dentro da organização?",
    options: [
      { id: "d", text: "O Scrum Master" },
      { id: "a", text: "Os gerentes seniores" },
      { id: "b", text: "O Product Owner" },
      { id: "c", text: "Os Desenvolvedores" }
    ],
    correctAnswer: "d",
    explanation: "O Scrum Master é responsável pela eficácia do Time Scrum. Eles fazem isso ajudando todos a entender a teoria, prática, regras e valores do Scrum. O Scrum Master ajuda aqueles fora do Time Scrum a entender quais de suas interações com o Time Scrum são úteis e quais não são."
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
    id: 32,
    category: 'roles',
    question: "Qual afirmação sobre o Product Owner é correta?",
    options: [
      { id: "a", text: "O Product Owner pode delegar a responsabilidade pelo Product Backlog para a equipe de desenvolvimento" },
      { id: "c", text: "O Product Owner é uma pessoa, não um comitê" },
      { id: "b", text: "O Product Owner pode ser um comitê de pessoas" },
      { id: "d", text: "O Product Owner deve ter experiência técnica para avaliar as soluções implementadas" }
    ],
    correctAnswer: "c",
    explanation: "O Product Owner é uma pessoa, não um comitê. O Product Owner pode representar as necessidades de muitos stakeholders no Product Backlog. Aqueles que desejam alterar o Product Backlog podem fazê-lo tentando convencer o Product Owner."
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
    id: 51,
    category: 'roles',
    question: "Qual é o papel do Product Owner em relação aos stakeholders?",
    options: [
      { id: "a", text: "Seguir todas as instruções dos stakeholders" },
      { id: "c", text: "Representar os interesses dos stakeholders no Product Backlog" },
      { id: "b", text: "Isolar a equipe das solicitações dos stakeholders" },
      { id: "d", text: "Delegar decisões do produto aos stakeholders" }
    ],
    correctAnswer: "c",
    explanation: "O Product Owner representa os interesses dos stakeholders no Product Backlog. Ele é responsável por maximizar o valor do produto, o que requer entender e equilibrar as necessidades de diversos stakeholders, mas mantendo a autoridade final sobre o Product Backlog."
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
    id: 59,
    category: 'roles',
    question: "Como os Desenvolvedores devem responder a uma solicitação de mudança de escopo durante a Sprint?",
    options: [
      { id: "d", text: "Implementar mudanças se tiverem capacidade extra" },
      { id: "a", text: "Sempre rejeitar qualquer mudança durante a Sprint" },
      { id: "b", text: "Aceitar todas as solicitações para satisfazer os stakeholders" },
      { id: "c", text: "Direcionar a solicitação ao Product Owner para negociação" }
    ],
    correctAnswer: "c",
    explanation: "Os Desenvolvedores devem direcionar solicitações de mudança de escopo ao Product Owner, que é responsável por gerenciar o Product Backlog. O Product Owner pode então negociar a mudança, possivelmente removendo outros itens de igual tamanho para manter o foco na Meta da Sprint, ou adicionando a solicitação ao Product Backlog para Sprints futuras."
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
    id: 67,
    category: 'roles',
    question: "Qual é a responsabilidade do Time Scrum em relação à Definição de Pronto?",
    options: [
      { id: "d", text: "Deixar cada Desenvolvedor definir seu próprio critério de Pronto" },
      { id: "a", text: "Seguir a Definição de Pronto estabelecida pela organização" },
      { id: "b", text: "Permitir que o Product Owner defina o que é Pronto" },
      { id: "c", text: "Criar e respeitar sua própria Definição de Pronto se a organização não tiver uma" }
    ],
    correctAnswer: "c",
    explanation: "Se a organização não tiver uma Definição de Pronto estabelecida, o Time Scrum deve criar sua própria Definição de Pronto apropriada para o produto. Os Desenvolvedores devem seguir a Definição de Pronto, e se houver múltiplos Times Scrum trabalhando no mesmo produto, eles devem definir e seguir a mesma definição."
  },
  {
    id: 71,
    category: 'roles',
    question: "O que significa dizer que o Product Owner é 'uma pessoa, não um comitê'?",
    options: [
      { id: "d", text: "O Product Owner não pode representar os desejos de stakeholders" },
      { id: "a", text: "O Product Owner nunca deve consultar outras pessoas" },
      { id: "b", text: "Uma única pessoa deve ter a autoridade final sobre o Product Backlog" },
      { id: "c", text: "O Product Owner não deve fazer parte de um comitê de produto" }
    ],
    correctAnswer: "b",
    explanation: "Dizer que o Product Owner é 'uma pessoa, não um comitê' significa que uma única pessoa deve ter a autoridade final sobre o Product Backlog. Embora o Product Owner possa representar os desejos de muitos stakeholders e delegar o trabalho a outros, ele continua sendo o único responsável pelo valor do produto e pelas decisões do Product Backlog."
  },
  {
    id: 75,
    category: 'roles',
    question: "Qual é o papel do Scrum Master em relação à remoção de impedimentos?",
    options: [
      { id: "a", text: "Resolver pessoalmente todos os impedimentos da equipe" },
      { id: "d", text: "Ajudar a remover impedimentos quando os Desenvolvedores não conseguem" },
      { id: "b", text: "Apenas documentar impedimentos para futura resolução" },
      { id: "c", text: "Treinar a equipe para resolver seus próprios impedimentos" }
    ],
    correctAnswer: "d",
    explanation: "O Scrum Master ajuda a remover impedimentos quando os Desenvolvedores não conseguem resolvê-los sozinhos. Um bom Scrum Master não resolve todos os problemas pessoalmente, mas capacita a equipe a resolver muitos de seus próprios impedimentos, intervindo quando os obstáculos estão além da influência ou capacidade dos Desenvolvedores."
  }
];
