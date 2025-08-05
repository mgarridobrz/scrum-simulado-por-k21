-- Investigar o problema no backup
SELECT 
  id, 
  question_pt,
  category_id,
  options IS NULL as options_null,
  options_en IS NULL as options_en_null,
  correct_answer
FROM quiz_questions_backup 
WHERE options IS NULL OR options_en IS NULL
ORDER BY id;