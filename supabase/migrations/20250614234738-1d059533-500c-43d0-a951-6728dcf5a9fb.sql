
-- Primeiro, vamos verificar se podemos restaurar as tentativas que foram removidas incorretamente
-- Como não temos backup, vamos ajustar a lógica para aceitar tentativas sem completion_time_seconds

-- Remover a restrição que excluía tentativas sem completion_time_seconds
-- (Isso já foi feito na migração anterior, então vamos garantir que as consultas incluam essas tentativas)

-- Vamos adicionar um comentário para documentar que tentativas sem completion_time_seconds são válidas
COMMENT ON COLUMN quiz_attempts.completion_time_seconds IS 'Tempo de conclusão em segundos. NULL é permitido para tentativas válidas sem tempo registrado.';
