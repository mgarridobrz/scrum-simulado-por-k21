-- Fix options IDs to use letters (a,b,c,d) instead of numbers and update correct_answer accordingly

UPDATE quiz_questions SET 
  options = '[{"id":"a","text":"Allan"},{"id":"b","text":"Avelino"},{"id":"c","text":"Fernanda Magalhães"},{"id":"d","text":"Murilo"}]'::jsonb,
  options_en = '[{"id":"a","text":"Allan"},{"id":"b","text":"Avelino"},{"id":"c","text":"Fernanda Magalhães"},{"id":"d","text":"Murilo"}]'::jsonb,
  correct_answer = 'a'
WHERE id = 81;

UPDATE quiz_questions SET 
  options = '[{"id":"a","text":"Na praia de Copacabana"},{"id":"b","text":"Em um laboratório da PUC - Rio"},{"id":"c","text":"Na praça de alimentação do shopping Leblon"},{"id":"d","text":"Na batata de Marechal"}]'::jsonb,
  options_en = '[{"id":"a","text":"Na praia de Copacabana"},{"id":"b","text":"Em um laboratório da PUC - Rio"},{"id":"c","text":"Na praça de alimentação do shopping Leblon"},{"id":"d","text":"Na batata de Marechal"}]'::jsonb,
  correct_answer = 'b'
WHERE id = 82;

UPDATE quiz_questions SET 
  options = '[{"id":"a","text":"10"},{"id":"b","text":"11"},{"id":"c","text":"12"},{"id":"d","text":"13"}]'::jsonb,
  options_en = '[{"id":"a","text":"10"},{"id":"b","text":"11"},{"id":"c","text":"12"},{"id":"d","text":"13"}]'::jsonb,
  correct_answer = 'c'
WHERE id = 83;

UPDATE quiz_questions SET 
  options = '[{"id":"a","text":"Janeiro de 2024"},{"id":"b","text":"Setembro de 2023"},{"id":"c","text":"Fevereiro de 2023"},{"id":"d","text":"Março de 2025"}]'::jsonb,
  options_en = '[{"id":"a","text":"Janeiro de 2024"},{"id":"b","text":"Setembro de 2023"},{"id":"c","text":"Fevereiro de 2023"},{"id":"d","text":"Março de 2025"}]'::jsonb,
  correct_answer = 'a'
WHERE id = 84;

UPDATE quiz_questions SET 
  options = '[{"id":"a","text":"Garrido"},{"id":"b","text":"Fernanda Magalhães"},{"id":"c","text":"Rafinha"},{"id":"d","text":"Raphael Chewie"}]'::jsonb,
  options_en = '[{"id":"a","text":"Garrido"},{"id":"b","text":"Fernanda Magalhães"},{"id":"c","text":"Rafinha"},{"id":"d","text":"Raphael Chewie"}]'::jsonb,
  correct_answer = 'd'
WHERE id = 85;

UPDATE quiz_questions SET 
  options = '[{"id":"a","text":"Guga"},{"id":"b","text":"Fernanda Magalhães"},{"id":"c","text":"Garrido"},{"id":"d","text":"Dani Prevot"}]'::jsonb,
  options_en = '[{"id":"a","text":"Guga"},{"id":"b","text":"Fernanda Magalhães"},{"id":"c","text":"Garrido"},{"id":"d","text":"Dani Prevot"}]'::jsonb,
  correct_answer = 'c'
WHERE id = 86;

UPDATE quiz_questions SET 
  options = '[{"id":"a","text":"Lucas"},{"id":"b","text":"Isac"},{"id":"c","text":"Natasha"},{"id":"d","text":"Fernanda Morelli"}]'::jsonb,
  options_en = '[{"id":"a","text":"Lucas"},{"id":"b","text":"Isac"},{"id":"c","text":"Natasha"},{"id":"d","text":"Fernanda Morelli"}]'::jsonb,
  correct_answer = 'b'
WHERE id = 87;

UPDATE quiz_questions SET 
  options = '[{"id":"a","text":"Dani Prevot e Raphael Chewie"},{"id":"b","text":"Rafinha e Samira"},{"id":"c","text":"Paulo Cassin e Fê Morelli"},{"id":"d","text":"Renan e Natasha"}]'::jsonb,
  options_en = '[{"id":"a","text":"Dani Prevot e Raphael Chewie"},{"id":"b","text":"Rafinha e Samira"},{"id":"c","text":"Paulo Cassin e Fê Morelli"},{"id":"d","text":"Renan e Natasha"}]'::jsonb,
  correct_answer = 'c'
WHERE id = 88;

UPDATE quiz_questions SET 
  options = '[{"id":"a","text":"Toledo"},{"id":"b","text":"Avelino"},{"id":"c","text":"Raphael Chewie"},{"id":"d","text":"Garrido"}]'::jsonb,
  options_en = '[{"id":"a","text":"Toledo"},{"id":"b","text":"Avelino"},{"id":"c","text":"Raphael Chewie"},{"id":"d","text":"Garrido"}]'::jsonb,
  correct_answer = 'a'
WHERE id = 89;

UPDATE quiz_questions SET 
  options = '[{"id":"a","text":"Cerca de 30 mil"},{"id":"b","text":"Entre 15 e 20 mil alunos"},{"id":"c","text":"Mais de 50 mil alunos"},{"id":"d","text":"7 pessoas"}]'::jsonb,
  options_en = '[{"id":"a","text":"Cerca de 30 mil"},{"id":"b","text":"Entre 15 e 20 mil alunos"},{"id":"c","text":"Mais de 50 mil alunos"},{"id":"d","text":"7 pessoas"}]'::jsonb,
  correct_answer = 'c'
WHERE id = 90;