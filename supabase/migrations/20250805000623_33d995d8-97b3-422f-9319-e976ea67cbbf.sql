-- Ajustes finais no rebalanceamento

-- DYSFUNCTIONS (6): ajustar para 2-1-2-1
UPDATE quiz_questions 
SET correct_answer = 'c'
WHERE category_id = 'dysfunctions' 
AND correct_answer = 'a'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'dysfunctions' 
  AND correct_answer = 'a'
  ORDER BY id OFFSET 2
  LIMIT 1
);

UPDATE quiz_questions 
SET correct_answer = 'd'
WHERE category_id = 'dysfunctions' 
AND correct_answer = 'a'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'dysfunctions' 
  AND correct_answer = 'a'
  ORDER BY id OFFSET 3
  LIMIT 1
);

-- FUNDAMENTALS (18): ajustar para 4-5-4-5
UPDATE quiz_questions 
SET correct_answer = 'd'
WHERE category_id = 'fundamentals' 
AND correct_answer = 'a'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'fundamentals' 
  AND correct_answer = 'a'
  ORDER BY id OFFSET 4
  LIMIT 5
);

-- ROLES (18): ajustar para 4-5-4-5
UPDATE quiz_questions 
SET correct_answer = 'd'
WHERE category_id = 'roles' 
AND correct_answer = 'b'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'roles' 
  AND correct_answer = 'b'
  ORDER BY id 
  LIMIT 1
);