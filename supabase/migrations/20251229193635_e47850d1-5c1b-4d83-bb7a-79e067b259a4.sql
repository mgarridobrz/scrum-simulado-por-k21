
UPDATE quiz_questions
SET 
  question = 'Qual jogador detém o recorde de mais assistências em uma única edição da Copa do Mundo?',
  question_en = 'Which player holds the record for most assists in a single World Cup edition?',
  options = '[{"id": "a", "text": "Diego Maradona (1986)"}, {"id": "b", "text": "Pelé (1970)"}, {"id": "c", "text": "Lionel Messi (2022)"}, {"id": "d", "text": "Zinedine Zidane (2006)"}]'::jsonb,
  options_en = '[{"id": "a", "text": "Diego Maradona (1986)"}, {"id": "b", "text": "Pelé (1970)"}, {"id": "c", "text": "Lionel Messi (2022)"}, {"id": "d", "text": "Zinedine Zidane (2006)"}]'::jsonb,
  correct_answer = 'c',
  explanation = 'Lionel Messi fez 8 assistências na Copa de 2022, superando o recorde anterior.',
  explanation_en = 'Lionel Messi made 8 assists in the 2022 World Cup, breaking the previous record.'
WHERE id = 152;
