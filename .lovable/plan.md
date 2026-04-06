

## Plano: Proteger emails na tabela quiz_attempts

### Problema
A política `Public can view quiz attempts` (USING: true) expõe emails dos participantes publicamente.

### Solução
Mesma abordagem usada para `game_attempts`: criar uma view pública sem a coluna `email` e redirecionar as consultas de leitura.

### Migration SQL

```sql
-- 1. Criar view pública sem email
CREATE OR REPLACE VIEW public.quiz_attempts_public
WITH (security_barrier = true)
AS SELECT
  id, name, score, quiz_size, questions_data,
  completion_time_seconds, language, theme_id, created_at
FROM public.quiz_attempts;

-- 2. Remover política SELECT pública da tabela base
DROP POLICY IF EXISTS "Public can view quiz attempts" ON public.quiz_attempts;

-- 3. Criar política SELECT restrita a authenticated na tabela base
CREATE POLICY "Authenticated can view quiz attempts"
  ON public.quiz_attempts FOR SELECT TO authenticated
  USING (true);

-- 4. Conceder SELECT público na view
GRANT SELECT ON public.quiz_attempts_public TO anon, authenticated;
```

### Alterações de Código

**4 arquivos** precisam trocar `.from('quiz_attempts')` por `.from('quiz_attempts_public')` nas consultas de **leitura**:

1. **`src/utils/quizTracking.ts`** — todas as funções de SELECT (ranking, stats, getQuizStats, etc.) usam `quiz_attempts_public`. INSERT continua em `quiz_attempts`.
2. **`src/components/ScoreEvolutionChart.tsx`** — SELECT usa `quiz_attempts_public`.
3. **`src/components/question-validation/AssessmentTrendsChart.tsx`** — SELECT usa `quiz_attempts_public`.
4. **`src/components/question-validation/GlobalStatsCounter.tsx`** — verificar se usa quiz_attempts e ajustar.

A função de **INSERT** (`saveQuizAttempt`) continua usando `quiz_attempts` diretamente — isso é intencional, pois o email precisa ser salvo na tabela base.

A função de duplicate check (`saveQuizAttempt` linhas 227-236) também usa SELECT em `quiz_attempts` — esta deve ser mantida na tabela base pois precisa verificar por `name` e é chamada imediatamente antes do INSERT (o usuário acabou de informar seus dados).

### Resultado
- Emails nunca expostos via SELECT público
- Ranking e métricas continuam funcionando normalmente
- INSERT continua salvando email na tabela base

