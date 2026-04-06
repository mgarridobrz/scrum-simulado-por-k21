
-- View pública sem email
CREATE VIEW public.game_attempts_public
WITH (security_invoker = on) AS
SELECT id, name, category, question_count, correct_answers,
       total_time_ms, penalty_time_ms, final_score_ms, 
       questions_data, language, created_at, theme_id, updated_at
FROM public.game_attempts;

-- Substituir política SELECT aberta por uma restritiva na tabela base
DROP POLICY IF EXISTS "Anyone can view game attempts" ON public.game_attempts;

-- Negar SELECT direto na tabela (forçar uso da view)
CREATE POLICY "No direct select on game_attempts"
  ON public.game_attempts FOR SELECT
  USING (false);

-- Garantir INSERT público
DROP POLICY IF EXISTS "Anyone can insert game attempts" ON public.game_attempts;
CREATE POLICY "Anyone can insert game attempts"
  ON public.game_attempts FOR INSERT
  WITH CHECK (true);
