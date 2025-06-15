
-- Remove the last 3 records from users PTBR and PTBR 02
DELETE FROM quiz_attempts 
WHERE id IN (
  SELECT id FROM quiz_attempts 
  WHERE name IN ('PTBR', 'PTBR 02')
  ORDER BY created_at DESC 
  LIMIT 3
);
