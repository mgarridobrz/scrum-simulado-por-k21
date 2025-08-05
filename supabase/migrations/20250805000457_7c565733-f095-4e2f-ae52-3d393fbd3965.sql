-- Rebalanceamento das respostas corretas por categoria
-- Objetivo: distribuir equilibradamente A, B, C, D dentro de cada categoria

-- ARTIFACTS (17 questões) - Atualmente todas são 'D'
-- Target: 4-4-4-5 (A-B-C-D)
-- Mudando algumas questões de D para A, B, C

UPDATE quiz_questions 
SET correct_answer = 'a'
WHERE category_id = 'artifacts' 
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'artifacts' 
  ORDER BY id 
  LIMIT 4
);

UPDATE quiz_questions 
SET correct_answer = 'b'
WHERE category_id = 'artifacts' 
AND correct_answer = 'd'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'artifacts' 
  AND correct_answer = 'd'
  ORDER BY id 
  LIMIT 4
);

UPDATE quiz_questions 
SET correct_answer = 'c'
WHERE category_id = 'artifacts' 
AND correct_answer = 'd'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'artifacts' 
  AND correct_answer = 'd'
  ORDER BY id 
  LIMIT 4
);

-- DYSFUNCTIONS (6 questões) - Atualmente todas são 'A'
-- Target: 2-2-1-1 (A-B-C-D)
-- Mantendo 2 como A, mudando 4 para B, C, D

UPDATE quiz_questions 
SET correct_answer = 'b'
WHERE category_id = 'dysfunctions' 
AND correct_answer = 'a'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'dysfunctions' 
  AND correct_answer = 'a'
  ORDER BY id OFFSET 2
  LIMIT 2
);

UPDATE quiz_questions 
SET correct_answer = 'c'
WHERE category_id = 'dysfunctions' 
AND correct_answer = 'a'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'dysfunctions' 
  AND correct_answer = 'a'
  ORDER BY id OFFSET 4
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
  ORDER BY id OFFSET 5
  LIMIT 1
);

-- EVENTS (21 questões) - Atualmente 18 'C' e 3 'D'
-- Target: 5-5-5-6 (A-B-C-D)
-- Mudando algumas de C para A e B, ajustando D

UPDATE quiz_questions 
SET correct_answer = 'a'
WHERE category_id = 'events' 
AND correct_answer = 'c'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'events' 
  AND correct_answer = 'c'
  ORDER BY id 
  LIMIT 5
);

UPDATE quiz_questions 
SET correct_answer = 'b'
WHERE category_id = 'events' 
AND correct_answer = 'c'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'events' 
  AND correct_answer = 'c'
  ORDER BY id 
  LIMIT 5
);

UPDATE quiz_questions 
SET correct_answer = 'd'
WHERE category_id = 'events' 
AND correct_answer = 'c'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'events' 
  AND correct_answer = 'c'
  ORDER BY id 
  LIMIT 3
);

-- FUNDAMENTALS (18 questões) - Atualmente 14 'A' e 4 'B'
-- Target: 4-5-4-5 (A-B-C-D)
-- Mantendo 4 A, aumentando B para 5, criando C e D

UPDATE quiz_questions 
SET correct_answer = 'b'
WHERE category_id = 'fundamentals' 
AND correct_answer = 'a'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'fundamentals' 
  AND correct_answer = 'a'
  ORDER BY id OFFSET 4
  LIMIT 1
);

UPDATE quiz_questions 
SET correct_answer = 'c'
WHERE category_id = 'fundamentals' 
AND correct_answer = 'a'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'fundamentals' 
  AND correct_answer = 'a'
  ORDER BY id OFFSET 5
  LIMIT 4
);

UPDATE quiz_questions 
SET correct_answer = 'd'
WHERE category_id = 'fundamentals' 
AND correct_answer = 'a'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'fundamentals' 
  AND correct_answer = 'a'
  ORDER BY id OFFSET 9
  LIMIT 5
);

-- ROLES (18 questões) - Atualmente 16 'B' e 2 'C'
-- Target: 4-5-4-5 (A-B-C-D)
-- Mudando B para A, C, D e ajustando distribuição

UPDATE quiz_questions 
SET correct_answer = 'a'
WHERE category_id = 'roles' 
AND correct_answer = 'b'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'roles' 
  AND correct_answer = 'b'
  ORDER BY id 
  LIMIT 4
);

UPDATE quiz_questions 
SET correct_answer = 'c'
WHERE category_id = 'roles' 
AND correct_answer = 'b'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'roles' 
  AND correct_answer = 'b'
  ORDER BY id OFFSET 4
  LIMIT 2
);

UPDATE quiz_questions 
SET correct_answer = 'd'
WHERE category_id = 'roles' 
AND correct_answer = 'b'
AND id IN (
  SELECT id FROM quiz_questions 
  WHERE category_id = 'roles' 
  AND correct_answer = 'b'
  ORDER BY id OFFSET 6
  LIMIT 5
);