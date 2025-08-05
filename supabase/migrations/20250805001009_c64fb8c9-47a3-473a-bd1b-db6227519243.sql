-- REVERTER TODAS AS ALTERAÇÕES - Restaurando distribuição original
-- Esta migração desfaz as mudanças incorretas nas respostas corretas

-- ARTIFACTS: Voltar todas para 'D' (estado original)
UPDATE quiz_questions 
SET correct_answer = 'd'
WHERE category_id = 'artifacts';

-- DYSFUNCTIONS: Voltar todas para 'A' (estado original)  
UPDATE quiz_questions 
SET correct_answer = 'a'
WHERE category_id = 'dysfunctions';

-- EVENTS: Precisamos restaurar a distribuição original (18 'C' e 3 'D')
-- Primeiro, colocar todas como 'C'
UPDATE quiz_questions 
SET correct_answer = 'c'
WHERE category_id = 'events';

-- Depois, alterar apenas 3 para 'D' (as últimas por ID)
UPDATE quiz_questions 
SET correct_answer = 'd'
WHERE category_id = 'events' 
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'events'
  ORDER BY id DESC
  LIMIT 3
);

-- FUNDAMENTALS: Voltar para 14 'A' e 4 'B' (estado original)
-- Primeiro, colocar todas como 'A'
UPDATE quiz_questions 
SET correct_answer = 'a'
WHERE category_id = 'fundamentals';

-- Depois, alterar apenas 4 para 'B' (as últimas por ID)
UPDATE quiz_questions 
SET correct_answer = 'b'
WHERE category_id = 'fundamentals' 
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'fundamentals'
  ORDER BY id DESC
  LIMIT 4
);

-- ROLES: Voltar para 16 'B' e 2 'C' (estado original)
-- Primeiro, colocar todas como 'B'
UPDATE quiz_questions 
SET correct_answer = 'b'
WHERE category_id = 'roles';

-- Depois, alterar apenas 2 para 'C' (as últimas por ID)
UPDATE quiz_questions 
SET correct_answer = 'c'
WHERE category_id = 'roles' 
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'roles'
  ORDER BY id DESC
  LIMIT 2
);