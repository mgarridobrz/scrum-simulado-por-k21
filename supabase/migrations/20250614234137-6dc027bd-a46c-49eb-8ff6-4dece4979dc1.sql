
-- 1. Corrigir scores incorretos (assumindo que scores < 10 são percentuais salvos como valores absolutos)
UPDATE quiz_attempts 
SET score = score * 10 
WHERE score < 10 AND score > 0;

-- 2. Remover tentativas duplicadas, mantendo apenas a mais recente de cada grupo
WITH duplicates AS (
  SELECT 
    id,
    name,
    score,
    completion_time_seconds,
    created_at,
    ROW_NUMBER() OVER (
      PARTITION BY name, score, completion_time_seconds 
      ORDER BY created_at DESC
    ) as rn
  FROM quiz_attempts
  WHERE completion_time_seconds IS NOT NULL
)
DELETE FROM quiz_attempts 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- 3. Remover tentativas sem tempo de conclusão (dados incompletos)
DELETE FROM quiz_attempts 
WHERE completion_time_seconds IS NULL;

-- 4. Adicionar índices para melhorar performance das consultas
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_name_score_time 
ON quiz_attempts(name, score, completion_time_seconds);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created_at 
ON quiz_attempts(created_at);
