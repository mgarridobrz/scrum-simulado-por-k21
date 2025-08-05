-- Limpar tabela de backup e copiar questões corretas
DELETE FROM quiz_questions_backup;

-- Copiar todas as questões da tabela original para o backup
INSERT INTO quiz_questions_backup 
SELECT * FROM quiz_questions;