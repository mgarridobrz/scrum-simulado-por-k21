
-- Recriar a view sem security_invoker (default = security_definer behavior)
DROP VIEW IF EXISTS public.game_attempts_public;

CREATE VIEW public.game_attempts_public
WITH (security_barrier = true) AS
SELECT id, name, category, question_count, correct_answers,
       total_time_ms, penalty_time_ms, final_score_ms, 
       questions_data, language, created_at, theme_id, updated_at
FROM public.game_attempts;
