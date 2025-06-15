
-- Insert questions 41-60 with both Portuguese and English translations

-- Question 41
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(41, 'O que significa dizer que o Product Owner é "uma pessoa, não um comitê"?', 'roles', '[
    {"id":"a","text":"O Product Owner nunca deve consultar ninguém"},
    {"id":"b","text":"Uma única pessoa deve ter autoridade final sobre o Product Backlog"},
    {"id":"c","text":"O Product Owner não deve fazer parte de um comitê de produto"},
    {"id":"d","text":"O Product Owner não pode representar desejos dos stakeholders"}
]', 'b', 'Dizer que o Product Owner é uma pessoa significa que um único indivíduo é responsável pelo valor do produto e pelas decisões do Product Backlog.', 'What does it mean to say that the Product Owner is "one person, not a committee"?', '[
    {"id":"a","text":"The Product Owner must never consult anyone else"},
    {"id":"b","text":"A single person must have final authority over the Product Backlog"},
    {"id":"c","text":"The Product Owner should not be part of a product committee"},
    {"id":"d","text":"The Product Owner cannot represent stakeholder wishes"}
]', 'Saying the Product Owner is one person means a single individual is accountable for product value and Product Backlog decisions.');

-- Question 42
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(42, 'Qual é o papel do Scrum Master em relação à remoção de impedimentos?', 'roles', '[
    {"id":"a","text":"Resolver pessoalmente todos os impedimentos da equipe"},
    {"id":"b","text":"Apenas documentar impedimentos para resolução futura"},
    {"id":"c","text":"Ignorar impedimentos"},
    {"id":"d","text":"Ensinar a equipe a remover seus próprios impedimentos"}
]', 'd', 'O Scrum Master ajuda a remover impedimentos que os Developers não conseguem resolver e ensina a equipe a lidar com impedimentos sempre que possível.', 'What is the Scrum Master''s role regarding impediment removal?', '[
    {"id":"a","text":"Personally resolve all team impediments"},
    {"id":"b","text":"Only document impediments for future resolution"},
    {"id":"c","text":"Ignore impediments"},
    {"id":"d","text":"Coach the team to remove their own impediments"}
]', 'The Scrum Master helps remove impediments that Developers cannot resolve and coaches the team to handle impediments themselves whenever possible.');

-- Question 43
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(43, 'Qual é a duração recomendada para o Sprint Planning em um Sprint de duas semanas?', 'events', '[
    {"id":"a","text":"1 hora"},
    {"id":"b","text":"2 horas"},
    {"id":"c","text":"8 horas"},
    {"id":"d","text":"4 horas"}
]', 'd', 'Segundo o Scrum Guide, o Sprint Planning tem duração máxima de oito horas para um Sprint de um mês; portanto, até quatro horas é recomendado para um Sprint de duas semanas.', 'What is the recommended length for Sprint Planning for a two-week Sprint?', '[
    {"id":"a","text":"1 hour"},
    {"id":"b","text":"2 hours"},
    {"id":"c","text":"8 hours"},
    {"id":"d","text":"4 hours"}
]', 'According to the Scrum Guide, Sprint Planning is time-boxed to a maximum of eight hours for a one-month Sprint; therefore, up to four hours is recommended for a two-week Sprint.');

-- Question 44
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(44, 'Qual é o principal propósito da Daily Scrum?', 'events', '[
    {"id":"a","text":"Relatar progresso aos gerentes"},
    {"id":"b","text":"Aumentar a colaboração entre os membros da equipe"},
    {"id":"c","text":"Atualizar o Product Backlog"},
    {"id":"d","text":"Revisar a qualidade do código"}
]', 'b', 'A Daily Scrum é um evento de 15 minutos para os Developers inspecionarem o progresso em direção ao Sprint Goal e ajustarem seu plano para as próximas 24 horas, promovendo colaboração.', 'What is the main purpose of the Daily Scrum?', '[
    {"id":"a","text":"Report progress to managers"},
    {"id":"b","text":"Increase collaboration among team members"},
    {"id":"c","text":"Update the Product Backlog"},
    {"id":"d","text":"Review code quality"}
]', 'The Daily Scrum is a 15-minute event for Developers to inspect progress toward the Sprint Goal and adjust their plan for the next 24 hours, promoting collaboration.');

-- Question 45
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(45, 'Quando começa o planejamento de um Sprint?', 'events', '[
    {"id":"a","text":"Durante o último dia do Sprint anterior"},
    {"id":"b","text":"A qualquer momento durante o Sprint atual"},
    {"id":"c","text":"Durante o Sprint Planning no primeiro dia do Sprint"},
    {"id":"d","text":"Uma semana antes do Sprint começar"}
]', 'c', 'O planejamento do Sprint acontece durante o evento Sprint Planning no início do Sprint, onde o Scrum Team responde o que pode ser entregue e como o trabalho será realizado.', 'When does planning for a Sprint begin?', '[
    {"id":"a","text":"During the last day of the previous Sprint"},
    {"id":"b","text":"At any time during the current Sprint"},
    {"id":"c","text":"During Sprint Planning on the first day of the Sprint"},
    {"id":"d","text":"One week before the Sprint starts"}
]', 'Sprint planning happens during the Sprint Planning event at the start of the Sprint, where the Scrum Team answers what can be delivered and how the work will be achieved.');

-- Question 46
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(46, 'Qual é o propósito principal da Sprint Review?', 'events', '[
    {"id":"a","text":"Avaliar o desempenho da equipe"},
    {"id":"b","text":"Inspecionar o Increment e adaptar o Product Backlog"},
    {"id":"c","text":"Planejar o próximo Sprint"},
    {"id":"d","text":"Identificar e resolver impedimentos"}
]', 'b', 'A Sprint Review é realizada para inspecionar o resultado do Sprint e determinar adaptações futuras. Com base no feedback, o Product Backlog pode ser ajustado para maximizar valor.', 'What is the primary purpose of the Sprint Review?', '[
    {"id":"a","text":"Evaluate team performance"},
    {"id":"b","text":"Inspect the Increment and adapt the Product Backlog"},
    {"id":"c","text":"Plan the next Sprint"},
    {"id":"d","text":"Identify and resolve impediments"}
]', 'The Sprint Review is held to inspect the outcome of the Sprint and determine future adaptations. Based on feedback, the Product Backlog may be adjusted to maximize value.');

-- Question 47
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(47, 'Qual(is) evento(s) ocorre(m) no último dia do Sprint?', 'events', '[
    {"id":"a","text":"Sprint Planning"},
    {"id":"b","text":"Daily Scrum"},
    {"id":"c","text":"A Daily Scrum, Sprint Review, seguida da Sprint Retrospective"},
    {"id":"d","text":"Product Backlog Refinement"}
]', 'c', 'No último dia do Sprint, três eventos ocorrem: a Daily Scrum final, a Sprint Review e a Sprint Retrospective, todos antes do próximo Sprint Planning.', 'Which event(s) occur on the last day of the Sprint?', '[
    {"id":"a","text":"Sprint Planning"},
    {"id":"b","text":"Daily Scrum"},
    {"id":"c","text":"The Daily Scrum, Sprint Review, followed by the Sprint Retrospective"},
    {"id":"d","text":"Product Backlog Refinement"}
]', 'On the last day of the Sprint, three events occur: the final Daily Scrum, the Sprint Review, and the Sprint Retrospective, all before the next Sprint Planning.');

-- Question 48
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(48, 'O que acontece se um Sprint Goal se tornar obsoleto?', 'events', '[
    {"id":"a","text":"O Sprint continua mas com objetivos modificados"},
    {"id":"b","text":"O Sprint pode ser cancelado pelo Product Owner"},
    {"id":"c","text":"A equipe deve completar o Sprint conforme planejado"},
    {"id":"d","text":"O Scrum Master estende o Sprint"}
]', 'b', 'Um Sprint pode ser cancelado se o Sprint Goal se tornar obsoleto. Apenas o Product Owner tem autoridade para cancelar o Sprint.', 'What happens if a Sprint Goal becomes obsolete?', '[
    {"id":"a","text":"The Sprint continues but with modified goals"},
    {"id":"b","text":"The Sprint may be cancelled by the Product Owner"},
    {"id":"c","text":"The team must complete the Sprint as planned"},
    {"id":"d","text":"The Scrum Master extends the Sprint"}
]', 'A Sprint can be cancelled if the Sprint Goal becomes obsolete. Only the Product Owner has authority to cancel the Sprint.');

-- Question 49
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(49, 'Como deve ser conduzida a Daily Scrum?', 'events', '[
    {"id":"a","text":"Seguindo rigorosamente o formato de três perguntas"},
    {"id":"b","text":"Da forma que funcionar melhor para o Development Team"},
    {"id":"c","text":"Com todos os stakeholders presentes"},
    {"id":"d","text":"Apenas quando o Scrum Master estiver disponível"}
]', 'b', 'Os Developers podem escolher qualquer estrutura ou técnicas que preferirem, desde que a Daily Scrum foque no progresso em direção ao Sprint Goal e crie um plano para o próximo dia de trabalho.', 'How should the Daily Scrum be conducted?', '[
    {"id":"a","text":"By following the strict three-question format"},
    {"id":"b","text":"In whatever way works best for the Development Team"},
    {"id":"c","text":"With all stakeholders present"},
    {"id":"d","text":"Only when the Scrum Master is available"}
]', 'Developers may choose any structure or techniques they prefer, as long as the Daily Scrum focuses on progress toward the Sprint Goal and creates a plan for the next work day.');

-- Question 50
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(50, 'Qual é o propósito da Sprint Retrospective?', 'events', '[
    {"id":"a","text":"Planejar o trabalho para o próximo Sprint"},
    {"id":"b","text":"Avaliar o Increment produzido no Sprint"},
    {"id":"c","text":"Inspecionar o Scrum Team e criar melhorias para o próximo Sprint"},
    {"id":"d","text":"Revisar e ajustar o Product Backlog"}
]', 'c', 'A Sprint Retrospective planeja formas de aumentar a qualidade e efetividade inspecionando como foi o último Sprint em relação a pessoas, relacionamentos, processo e ferramentas.', 'What is the purpose of the Sprint Retrospective?', '[
    {"id":"a","text":"Plan the work for the next Sprint"},
    {"id":"b","text":"Evaluate the Increment produced in the Sprint"},
    {"id":"c","text":"Inspect the Scrum Team and create improvements for the next Sprint"},
    {"id":"d","text":"Review and adjust the Product Backlog"}
]', 'The Sprint Retrospective plans ways to increase quality and effectiveness by inspecting how the last Sprint went regarding people, relationships, process, and tools.');

-- Question 51
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(51, 'Qual é o objetivo principal do Sprint Planning?', 'events', '[
    {"id":"a","text":"Atribuir tarefas aos membros da equipe"},
    {"id":"b","text":"Dar início ao trabalho do Sprint"},
    {"id":"c","text":"Estabelecer o que pode ser entregue no Sprint e como o trabalho será feito"},
    {"id":"d","text":"Priorizar o Product Backlog"}
]', 'c', 'O Sprint Planning inicia o Sprint definindo o trabalho a ser realizado e criando o Sprint Backlog em torno de um Sprint Goal coerente.', 'What is the main objective of Sprint Planning?', '[
    {"id":"a","text":"Assign tasks to team members"},
    {"id":"b","text":"Kick off the Sprint work"},
    {"id":"c","text":"Establish what can be delivered in the Sprint and how the work will be done"},
    {"id":"d","text":"Prioritize the Product Backlog"}
]', 'Sprint Planning starts the Sprint by defining the work to be performed and creating the Sprint Backlog around a coherent Sprint Goal.');

-- Question 52
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(52, 'Qual afirmação sobre a duração do Sprint está correta?', 'events', '[
    {"id":"a","text":"A duração do Sprint pode variar dependendo da complexidade do trabalho"},
    {"id":"b","text":"Sprints devem durar duas semanas"},
    {"id":"c","text":"Sprints mais curtos podem ser usados para gerar mais feedback e limitar riscos"},
    {"id":"d","text":"A duração do Sprint deve aumentar conforme o projeto progride"}
]', 'c', 'Sprints mais curtos podem ser utilizados para gerar mais ciclos de aprendizado e reduzir riscos. Todos os Sprints são limitados a um mês calendário ou menos.', 'Which statement about Sprint length is correct?', '[
    {"id":"a","text":"Sprint length can vary depending on the complexity of the work"},
    {"id":"b","text":"Sprints must last two weeks"},
    {"id":"c","text":"Shorter Sprints can be used to generate more feedback and limit risk"},
    {"id":"d","text":"Sprint length should increase as the project progresses"}
]', 'Shorter Sprints can be used to generate more learning cycles and reduce risk. All Sprints are limited to one calendar month or less.');

-- Question 53
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(53, 'Quem deve participar da Daily Scrum?', 'events', '[
    {"id":"a","text":"Developers, Scrum Master e Product Owner"},
    {"id":"b","text":"Apenas os Developers"},
    {"id":"c","text":"Todo o Scrum Team e stakeholders relevantes"},
    {"id":"d","text":"Qualquer pessoa interessada no projeto"}
]', 'b', 'A Daily Scrum é um evento de 15 minutos para os Developers. Se o Scrum Master ou Product Owner estiverem trabalhando ativamente em itens do Sprint Backlog, eles participam como Developers.', 'Who should attend the Daily Scrum?', '[
    {"id":"a","text":"Developers, Scrum Master, and Product Owner"},
    {"id":"b","text":"Only the Developers"},
    {"id":"c","text":"The entire Scrum Team and relevant stakeholders"},
    {"id":"d","text":"Anyone interested in the project"}
]', 'The Daily Scrum is a 15-minute event for Developers. If the Scrum Master or Product Owner are actively working on Sprint Backlog items, they participate as Developers.');

-- Question 54
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(54, 'Qual é a duração máxima recomendada para a Sprint Retrospective?', 'events', '[
    {"id":"a","text":"1 hora para um Sprint de uma semana"},
    {"id":"b","text":"2 horas para um Sprint de duas semanas"},
    {"id":"c","text":"3 horas para um Sprint de três semanas"},
    {"id":"d","text":"3 horas para um Sprint de um mês"}
]', 'd', 'A Sprint Retrospective tem duração máxima de três horas para um Sprint de um mês. Para Sprints mais curtos, o evento é geralmente mais breve.', 'What is the maximum recommended length for the Sprint Retrospective?', '[
    {"id":"a","text":"1 hour for a one-week Sprint"},
    {"id":"b","text":"2 hours for a two-week Sprint"},
    {"id":"c","text":"3 hours for a three-week Sprint"},
    {"id":"d","text":"3 hours for a one-month Sprint"}
]', 'The Sprint Retrospective is time-boxed to a maximum of three hours for a one-month Sprint. For shorter Sprints, the event is usually shorter.');

-- Question 55
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(55, 'Quanto tempo deve durar o Sprint Planning para um Sprint de uma semana?', 'events', '[
    {"id":"a","text":"Máximo de 2 horas"},
    {"id":"b","text":"Exatamente 4 horas"},
    {"id":"c","text":"Máximo de 8 horas"},
    {"id":"d","text":"O tempo que for necessário"}
]', 'a', 'O Sprint Planning é limitado a um máximo de oito horas para um Sprint de um mês. Para um Sprint de uma semana, geralmente não passa de duas horas.', 'How long should Sprint Planning last for a one-week Sprint?', '[
    {"id":"a","text":"No more than 2 hours"},
    {"id":"b","text":"Exactly 4 hours"},
    {"id":"c","text":"No more than 8 hours"},
    {"id":"d","text":"As long as necessary"}
]', 'Sprint Planning is limited to a maximum of eight hours for a one-month Sprint. For a one-week Sprint it is generally no more than two hours.');

-- Question 56
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(56, 'O que acontece durante a Sprint Review?', 'events', '[
    {"id":"a","text":"A equipe planeja o próximo Sprint"},
    {"id":"b","text":"O Scrum Team fornece visibilidade aos stakeholders sobre o que está Done e coleta feedback"},
    {"id":"c","text":"A equipe discute como melhorar seus processos"},
    {"id":"d","text":"O Product Owner atualiza o Product Backlog sozinho"}
]', 'b', 'Durante a Sprint Review, o Scrum Team apresenta o Increment e se envolve com stakeholders para inspecioná-lo e adaptar o Product Backlog conforme necessário.', 'What happens during the Sprint Review?', '[
    {"id":"a","text":"The team plans the next Sprint"},
    {"id":"b","text":"The Scrum Team provides visibility to stakeholders about what is Done and gathers feedback"},
    {"id":"c","text":"The team discusses how to improve their processes"},
    {"id":"d","text":"The Product Owner updates the Product Backlog alone"}
]', 'During the Sprint Review, the Scrum Team presents the Increment and engages with stakeholders to inspect it and adapt the Product Backlog as needed.');

-- Question 57
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(57, 'Quanto tempo deve durar a Daily Scrum?', 'events', '[
    {"id":"a","text":"15 minutos ou menos"},
    {"id":"b","text":"30 minutos"},
    {"id":"c","text":"O tempo necessário para todos falarem"},
    {"id":"d","text":"1 hora"}
]', 'a', 'A Daily Scrum tem duração fixa de 15 minutos, mantendo o evento focado na criação de um plano para as próximas 24 horas.', 'How long should the Daily Scrum last?', '[
    {"id":"a","text":"15 minutes or less"},
    {"id":"b","text":"30 minutes"},
    {"id":"c","text":"As long as necessary for everyone to speak"},
    {"id":"d","text":"1 hour"}
]', 'The Daily Scrum is time-boxed to 15 minutes, keeping the event focused on creating a plan for the next 24 hours.');

-- Question 58
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(58, 'O que deve acontecer se uma equipe consistentemente não consegue completar o trabalho planejado para o Sprint?', 'events', '[
    {"id":"a","text":"Aumentar a duração do Sprint"},
    {"id":"b","text":"Adicionar mais pessoas à equipe"},
    {"id":"c","text":"Reavaliar a capacidade da equipe durante o planejamento"},
    {"id":"d","text":"Permitir que o trabalho continue no próximo Sprint"}
]', 'c', 'Se a equipe consistentemente não completa o trabalho planejado, ela deve ajustar sua previsão no Sprint Planning baseada em sua capacidade e velocidade reais.', 'What should happen if a team consistently cannot complete the work planned for the Sprint?', '[
    {"id":"a","text":"Increase the Sprint length"},
    {"id":"b","text":"Add more people to the team"},
    {"id":"c","text":"Re-evaluate team capacity during planning"},
    {"id":"d","text":"Allow the work to continue in the next Sprint"}
]', 'If the team consistently does not complete planned work, they should adjust their forecast in Sprint Planning based on their actual capacity and velocity.');

-- Question 59
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(59, 'Qual é o propósito do Sprint Planning em relação ao Sprint Backlog?', 'events', '[
    {"id":"a","text":"Criar uma lista completa e detalhada de todas as tarefas"},
    {"id":"b","text":"Selecionar itens do Product Backlog e criar um plano para entregá-los"},
    {"id":"c","text":"Atribuir itens específicos a developers específicos"},
    {"id":"d","text":"Estimar precisamente quanto tempo cada tarefa levará"}
]', 'b', 'O Sprint Backlog consiste no Sprint Goal, nos itens selecionados do Product Backlog e num plano para entregá-los; o Sprint Planning cria este backlog.', 'What is the purpose of Sprint Planning with respect to the Sprint Backlog?', '[
    {"id":"a","text":"Create a complete and detailed list of all tasks"},
    {"id":"b","text":"Select Product Backlog items and create a plan to deliver them"},
    {"id":"c","text":"Assign specific items to specific developers"},
    {"id":"d","text":"Precisely estimate how long each task will take"}
]', 'The Sprint Backlog consists of the Sprint Goal, the selected Product Backlog items, and a plan for delivering them; Sprint Planning creates this backlog.');

-- Question 60
INSERT INTO quiz_questions (id, question, category_id, options, correct_answer, explanation, question_en, options_en, explanation_en) VALUES 
(60, 'Qual afirmação sobre cancelar um Sprint está correta?', 'events', '[
    {"id":"a","text":"Um Sprint nunca deve ser cancelado"},
    {"id":"b","text":"Qualquer stakeholder pode cancelar um Sprint"},
    {"id":"c","text":"Apenas o Product Owner pode cancelar um Sprint"},
    {"id":"d","text":"O Scrum Team deve votar para cancelar um Sprint"}
]', 'c', 'Apenas o Product Owner tem autoridade para cancelar um Sprint, frequentemente devido a mudanças nas condições de negócio, tecnologia ou mercado.', 'Which statement about cancelling a Sprint is correct?', '[
    {"id":"a","text":"A Sprint should never be cancelled"},
    {"id":"b","text":"Any stakeholder can cancel a Sprint"},
    {"id":"c","text":"Only the Product Owner can cancel a Sprint"},
    {"id":"d","text":"The Scrum Team must vote to cancel a Sprint"}
]', 'Only the Product Owner has authority to cancel a Sprint, often due to changes in business conditions, technology, or market.');
