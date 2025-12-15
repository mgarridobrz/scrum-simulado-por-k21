-- Insert 5 new questions for K212025 theme (IDs 91-95)
INSERT INTO quiz_questions (id, theme_id, question, question_en, options, options_en, correct_answer, explanation, explanation_en, category_id)
SELECT 
  91,
  qt.id,
  'Para o Product Owner, qual dessas opções mostra mais domínio sobre Métricas?',
  'Para o Product Owner, qual dessas opções mostra mais domínio sobre Métricas?',
  '[{"id": "a", "text": "Poderíamos experimentar a pesquisa NPS pra ver como melhoramos"}, {"id": "b", "text": "Poderíamos fazer pesquisa NPS e ver se ela é uma boa métrica"}, {"id": "c", "text": "Poderíamos usar pesquisa NPS pra medir a taxa de retenção"}, {"id": "d", "text": "Poderíamos usar pesquisa NPS pra medir a satisfação do cliente"}]'::jsonb,
  '[{"id": "a", "text": "Poderíamos experimentar a pesquisa NPS pra ver como melhoramos"}, {"id": "b", "text": "Poderíamos fazer pesquisa NPS e ver se ela é uma boa métrica"}, {"id": "c", "text": "Poderíamos usar pesquisa NPS pra medir a taxa de retenção"}, {"id": "d", "text": "Poderíamos usar pesquisa NPS pra medir a satisfação do cliente"}]'::jsonb,
  'd',
  'NPS (Net Promoter Score) é uma métrica específica para medir satisfação do cliente, não retenção.',
  'NPS (Net Promoter Score) é uma métrica específica para medir satisfação do cliente, não retenção.',
  NULL
FROM quiz_themes qt WHERE qt.slug = 'k212025';

INSERT INTO quiz_questions (id, theme_id, question, question_en, options, options_en, correct_answer, explanation, explanation_en, category_id)
SELECT 
  92,
  qt.id,
  'Para os devs da K21, qual dessas opções é uma disfunção do TI e Business?',
  'Para os devs da K21, qual dessas opções é uma disfunção do TI e Business?',
  '[{"id": "a", "text": "TI e Business funcionam como um só time"}, {"id": "b", "text": "Negócio manda, TI obedece"}, {"id": "c", "text": "TI e Business colaboram nas decisões de produto"}, {"id": "d", "text": "TI participa das discussões estratégicas com o negócio"}]'::jsonb,
  '[{"id": "a", "text": "TI e Business funcionam como um só time"}, {"id": "b", "text": "Negócio manda, TI obedece"}, {"id": "c", "text": "TI e Business colaboram nas decisões de produto"}, {"id": "d", "text": "TI participa das discussões estratégicas com o negócio"}]'::jsonb,
  'b',
  'A disfunção ocorre quando há uma relação de comando e controle entre negócio e TI, em vez de colaboração.',
  'A disfunção ocorre quando há uma relação de comando e controle entre negócio e TI, em vez de colaboração.',
  NULL
FROM quiz_themes qt WHERE qt.slug = 'k212025';

INSERT INTO quiz_questions (id, theme_id, question, question_en, options, options_en, correct_answer, explanation, explanation_en, category_id)
SELECT 
  93,
  qt.id,
  'Para os devs, o que significa Medir pra quê?',
  'Para os devs, o que significa Medir pra quê?',
  '[{"id": "a", "text": "Medir tudo que for possível para ter dados"}, {"id": "b", "text": "Medir para controlar a produtividade do time"}, {"id": "c", "text": "Ter clareza do objetivo antes de definir a métrica"}, {"id": "d", "text": "Usar métricas padrão de mercado"}]'::jsonb,
  '[{"id": "a", "text": "Medir tudo que for possível para ter dados"}, {"id": "b", "text": "Medir para controlar a produtividade do time"}, {"id": "c", "text": "Ter clareza do objetivo antes de definir a métrica"}, {"id": "d", "text": "Usar métricas padrão de mercado"}]'::jsonb,
  'c',
  'Métricas devem ser definidas com propósito claro, não apenas por medir.',
  'Métricas devem ser definidas com propósito claro, não apenas por medir.',
  NULL
FROM quiz_themes qt WHERE qt.slug = 'k212025';

INSERT INTO quiz_questions (id, theme_id, question, question_en, options, options_en, correct_answer, explanation, explanation_en, category_id)
SELECT 
  94,
  qt.id,
  'Para os SMs da K21, qual característica NÃO pertence ao Framework Scrum?',
  'Para os SMs da K21, qual característica NÃO pertence ao Framework Scrum?',
  '[{"id": "a", "text": "Sprint Planning"}, {"id": "b", "text": "Daily Scrum"}, {"id": "c", "text": "Sprint Review"}, {"id": "d", "text": "Reunião de Status Report"}]'::jsonb,
  '[{"id": "a", "text": "Sprint Planning"}, {"id": "b", "text": "Daily Scrum"}, {"id": "c", "text": "Sprint Review"}, {"id": "d", "text": "Reunião de Status Report"}]'::jsonb,
  'd',
  'Reunião de Status Report não faz parte do Scrum. O Scrum usa eventos específicos como Planning, Daily, Review e Retrospective.',
  'Reunião de Status Report não faz parte do Scrum. O Scrum usa eventos específicos como Planning, Daily, Review e Retrospective.',
  NULL
FROM quiz_themes qt WHERE qt.slug = 'k212025';

INSERT INTO quiz_questions (id, theme_id, question, question_en, options, options_en, correct_answer, explanation, explanation_en, category_id)
SELECT 
  95,
  qt.id,
  'Para os devs, quando é a hora certa de finalizar uma Sprint?',
  'Para os devs, quando é a hora certa de finalizar uma Sprint?',
  '[{"id": "a", "text": "Quando todo o trabalho planejado for concluído"}, {"id": "b", "text": "Quando o Product Owner decidir"}, {"id": "c", "text": "Quando o timebox da Sprint acabar"}, {"id": "d", "text": "Quando o time sentir que está pronto"}]'::jsonb,
  '[{"id": "a", "text": "Quando todo o trabalho planejado for concluído"}, {"id": "b", "text": "Quando o Product Owner decidir"}, {"id": "c", "text": "Quando o timebox da Sprint acabar"}, {"id": "d", "text": "Quando o time sentir que está pronto"}]'::jsonb,
  'c',
  'A Sprint termina quando seu timebox expira, independentemente do trabalho ter sido concluído ou não.',
  'A Sprint termina quando seu timebox expira, independentemente do trabalho ter sido concluído ou não.',
  NULL
FROM quiz_themes qt WHERE qt.slug = 'k212025';