

## Plano: Proteger emails na tabela game_attempts

### Problema
A política RLS `Anyone can view game attempts` (USING: true) expõe emails dos jogadores publicamente.

### Solução
Criar uma view pública que exclui a coluna `email` e redirecionar o código para usar essa view nas consultas de leitura. Manter INSERT direto na tabela base (que já precisa do email).

### Alterações

#### 1. Migration SQL
```sql
-- View pública sem email
CREATE VIEW public.game_attempts_public
WITH (security_invoker = on) AS
SELECT id, name, category, question_count, correct_answers,
       total_time_ms, penalty_time_ms, final_score_ms, 
       questions_data, language, created_at, theme_id
FROM public.game_attempts;

-- Substituir política SELECT aberta por uma restritiva na tabela base
DROP POLICY IF EXISTS "Anyone can view game attempts" ON public.game_attempts;

-- Negar SELECT direto na tabela (forçar uso da view)
CREATE POLICY "No direct select on game_attempts"
  ON public.game_attempts FOR SELECT
  USING (false);

-- Manter INSERT público (já existente ou recriar)
CREATE POLICY "Anyone can insert game attempts"
  ON public.game_attempts FOR INSERT
  WITH CHECK (true);
```

#### 2. Atualizar `src/utils/gameTracking.ts`
- `getGameRanking()`: trocar `.from('game_attempts')` por `.from('game_attempts_public')`
- `getGameStats()`: trocar `.from('game_attempts')` por `.from('game_attempts_public')`
- `saveGameAttempt()`: manter `.from('game_attempts')` (INSERT precisa da tabela base)

#### 3. Atualizar `src/hooks/useGameStats.ts`
- Trocar `.from('game_attempts')` por `.from('game_attempts_public')`
- Remover referência a `a.email` na linha 74 (uniquePlayers) — usar `a.name` como fallback

#### 4. Atualizar `src/components/PublicStatsCounter.tsx`
- Sem mudanças necessárias (já usa `getGameStats()`)

### Resultado
- Emails ficam protegidos: nunca expostos via SELECT público
- Ranking, stats e leaderboard continuam funcionando normalmente
- INSERT continua salvando o email na tabela base

