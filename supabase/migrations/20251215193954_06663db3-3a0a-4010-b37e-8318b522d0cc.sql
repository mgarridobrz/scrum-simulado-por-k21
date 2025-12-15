-- Fix options format for k212025 questions (convert string arrays to object arrays)
UPDATE quiz_questions SET 
  options = '[{"id":"0","text":"Allan"},{"id":"1","text":"Avelino"},{"id":"2","text":"Fernanda Magalhães"},{"id":"3","text":"Murilo"}]'::jsonb,
  options_en = '[{"id":"0","text":"Allan"},{"id":"1","text":"Avelino"},{"id":"2","text":"Fernanda Magalhães"},{"id":"3","text":"Murilo"}]'::jsonb
WHERE id = 81;

UPDATE quiz_questions SET 
  options = '[{"id":"0","text":"Na praia de Copacabana"},{"id":"1","text":"Em um laboratório da PUC - Rio"},{"id":"2","text":"Na praça de alimentação do shopping Leblon"},{"id":"3","text":"Na batata de Marechal"}]'::jsonb,
  options_en = '[{"id":"0","text":"Na praia de Copacabana"},{"id":"1","text":"Em um laboratório da PUC - Rio"},{"id":"2","text":"Na praça de alimentação do shopping Leblon"},{"id":"3","text":"Na batata de Marechal"}]'::jsonb
WHERE id = 82;

UPDATE quiz_questions SET 
  options = '[{"id":"0","text":"10"},{"id":"1","text":"11"},{"id":"2","text":"12"},{"id":"3","text":"13"}]'::jsonb,
  options_en = '[{"id":"0","text":"10"},{"id":"1","text":"11"},{"id":"2","text":"12"},{"id":"3","text":"13"}]'::jsonb
WHERE id = 83;

UPDATE quiz_questions SET 
  options = '[{"id":"0","text":"Janeiro de 2024"},{"id":"1","text":"Setembro de 2023"},{"id":"2","text":"Fevereiro de 2023"},{"id":"3","text":"Março de 2025"}]'::jsonb,
  options_en = '[{"id":"0","text":"Janeiro de 2024"},{"id":"1","text":"Setembro de 2023"},{"id":"2","text":"Fevereiro de 2023"},{"id":"3","text":"Março de 2025"}]'::jsonb
WHERE id = 84;

UPDATE quiz_questions SET 
  options = '[{"id":"0","text":"Garrido"},{"id":"1","text":"Fernanda Magalhães"},{"id":"2","text":"Rafinha"},{"id":"3","text":"Raphael Chewie"}]'::jsonb,
  options_en = '[{"id":"0","text":"Garrido"},{"id":"1","text":"Fernanda Magalhães"},{"id":"2","text":"Rafinha"},{"id":"3","text":"Raphael Chewie"}]'::jsonb
WHERE id = 85;

UPDATE quiz_questions SET 
  options = '[{"id":"0","text":"Guga"},{"id":"1","text":"Fernanda Magalhães"},{"id":"2","text":"Garrido"},{"id":"3","text":"Dani Prevot"}]'::jsonb,
  options_en = '[{"id":"0","text":"Guga"},{"id":"1","text":"Fernanda Magalhães"},{"id":"2","text":"Garrido"},{"id":"3","text":"Dani Prevot"}]'::jsonb
WHERE id = 86;

UPDATE quiz_questions SET 
  options = '[{"id":"0","text":"Lucas"},{"id":"1","text":"Isac"},{"id":"2","text":"Natasha"},{"id":"3","text":"Fernanda Morelli"}]'::jsonb,
  options_en = '[{"id":"0","text":"Lucas"},{"id":"1","text":"Isac"},{"id":"2","text":"Natasha"},{"id":"3","text":"Fernanda Morelli"}]'::jsonb
WHERE id = 87;

UPDATE quiz_questions SET 
  options = '[{"id":"0","text":"Dani Prevot e Raphael Chewie"},{"id":"1","text":"Rafinha e Samira"},{"id":"2","text":"Paulo Cassin e Fê Morelli"},{"id":"3","text":"Renan e Natasha"}]'::jsonb,
  options_en = '[{"id":"0","text":"Dani Prevot e Raphael Chewie"},{"id":"1","text":"Rafinha e Samira"},{"id":"2","text":"Paulo Cassin e Fê Morelli"},{"id":"3","text":"Renan e Natasha"}]'::jsonb
WHERE id = 88;

UPDATE quiz_questions SET 
  options = '[{"id":"0","text":"Toledo"},{"id":"1","text":"Avelino"},{"id":"2","text":"Raphael Chewie"},{"id":"3","text":"Garrido"}]'::jsonb,
  options_en = '[{"id":"0","text":"Toledo"},{"id":"1","text":"Avelino"},{"id":"2","text":"Raphael Chewie"},{"id":"3","text":"Garrido"}]'::jsonb
WHERE id = 89;

UPDATE quiz_questions SET 
  options = '[{"id":"0","text":"Cerca de 30 mil"},{"id":"1","text":"Entre 15 e 20 mil alunos"},{"id":"2","text":"Mais de 50 mil alunos"},{"id":"3","text":"7 pessoas"}]'::jsonb,
  options_en = '[{"id":"0","text":"Cerca de 30 mil"},{"id":"1","text":"Entre 15 e 20 mil alunos"},{"id":"2","text":"Mais de 50 mil alunos"},{"id":"3","text":"7 pessoas"}]'::jsonb
WHERE id = 90;