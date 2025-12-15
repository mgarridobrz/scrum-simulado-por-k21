-- First delete the wrong questions (91-95)
DELETE FROM quiz_questions WHERE id IN (91, 92, 93, 94, 95) AND theme_id = (SELECT id FROM quiz_themes WHERE slug = 'k212025');

-- Now insert the CORRECT questions from the CSV
INSERT INTO quiz_questions (id, theme_id, question, question_en, options, options_en, correct_answer, explanation, explanation_en, category_id)
SELECT 
  91,
  qt.id,
  'Sou apaixonada por viagens e novas experiências, inclusive já atuei profissionalmente com negócio relacionado à isso. Quem sou eu?',
  'Sou apaixonada por viagens e novas experiências, inclusive já atuei profissionalmente com negócio relacionado à isso. Quem sou eu?',
  '[{"id": "a", "text": "Iohanna"}, {"id": "b", "text": "Dani Sitko"}, {"id": "c", "text": "Carol"}, {"id": "d", "text": "Camila Boni"}]'::jsonb,
  '[{"id": "a", "text": "Iohanna"}, {"id": "b", "text": "Dani Sitko"}, {"id": "c", "text": "Carol"}, {"id": "d", "text": "Camila Boni"}]'::jsonb,
  'd',
  'Camila Boni é apaixonada por viagens e já atuou profissionalmente nessa área.',
  'Camila Boni é apaixonada por viagens e já atuou profissionalmente nessa área.',
  NULL
FROM quiz_themes qt WHERE qt.slug = 'k212025';

INSERT INTO quiz_questions (id, theme_id, question, question_en, options, options_en, correct_answer, explanation, explanation_en, category_id)
SELECT 
  92,
  qt.id,
  'Qual dessas pessoas não tem tatuagem?',
  'Qual dessas pessoas não tem tatuagem?',
  '[{"id": "a", "text": "Samira"}, {"id": "b", "text": "Erica Zagotto"}, {"id": "c", "text": "Camila Dique"}, {"id": "d", "text": "Natasha"}]'::jsonb,
  '[{"id": "a", "text": "Samira"}, {"id": "b", "text": "Erica Zagotto"}, {"id": "c", "text": "Camila Dique"}, {"id": "d", "text": "Natasha"}]'::jsonb,
  'b',
  'Erica Zagotto não tem tatuagem.',
  'Erica Zagotto não tem tatuagem.',
  NULL
FROM quiz_themes qt WHERE qt.slug = 'k212025';

INSERT INTO quiz_questions (id, theme_id, question, question_en, options, options_en, correct_answer, explanation, explanation_en, category_id)
SELECT 
  93,
  qt.id,
  'Atualmente, temos pessoas espalhadas em quantas cidades?',
  'Atualmente, temos pessoas espalhadas em quantas cidades?',
  '[{"id": "a", "text": "Menos de 10"}, {"id": "b", "text": "14"}, {"id": "c", "text": "19"}, {"id": "d", "text": "26"}]'::jsonb,
  '[{"id": "a", "text": "Menos de 10"}, {"id": "b", "text": "14"}, {"id": "c", "text": "19"}, {"id": "d", "text": "26"}]'::jsonb,
  'c',
  'A K21 tem pessoas espalhadas em 19 cidades.',
  'A K21 tem pessoas espalhadas em 19 cidades.',
  NULL
FROM quiz_themes qt WHERE qt.slug = 'k212025';

INSERT INTO quiz_questions (id, theme_id, question, question_en, options, options_en, correct_answer, explanation, explanation_en, category_id)
SELECT 
  94,
  qt.id,
  'Alguém entre nós já ilustrou quadrinhos internacionais. Quem é essa pessoa?',
  'Alguém entre nós já ilustrou quadrinhos internacionais. Quem é essa pessoa?',
  '[{"id": "a", "text": "CFC"}, {"id": "b", "text": "Raphael Chewie"}, {"id": "c", "text": "Allan"}, {"id": "d", "text": "LC"}]'::jsonb,
  '[{"id": "a", "text": "CFC"}, {"id": "b", "text": "Raphael Chewie"}, {"id": "c", "text": "Allan"}, {"id": "d", "text": "LC"}]'::jsonb,
  'd',
  'LC já ilustrou quadrinhos internacionais.',
  'LC já ilustrou quadrinhos internacionais.',
  NULL
FROM quiz_themes qt WHERE qt.slug = 'k212025';

INSERT INTO quiz_questions (id, theme_id, question, question_en, options, options_en, correct_answer, explanation, explanation_en, category_id)
SELECT 
  95,
  qt.id,
  'Ao longo do ano moro em duas cidades diferentes, uma em Minas e outra na Bahia. Quem sou eu?',
  'Ao longo do ano moro em duas cidades diferentes, uma em Minas e outra na Bahia. Quem sou eu?',
  '[{"id": "a", "text": "Ricardo"}, {"id": "b", "text": "Daniel"}, {"id": "c", "text": "Danilo Maia"}, {"id": "d", "text": "Andrea"}]'::jsonb,
  '[{"id": "a", "text": "Ricardo"}, {"id": "b", "text": "Daniel"}, {"id": "c", "text": "Danilo Maia"}, {"id": "d", "text": "Andrea"}]'::jsonb,
  'c',
  'Danilo Maia mora em duas cidades diferentes ao longo do ano, uma em Minas e outra na Bahia.',
  'Danilo Maia mora em duas cidades diferentes ao longo do ano, uma em Minas e outra na Bahia.',
  NULL
FROM quiz_themes qt WHERE qt.slug = 'k212025';