
CREATE OR REPLACE VIEW public.quiz_attempts_public
WITH (security_barrier = true)
AS SELECT
  id, name, score, quiz_size, questions_data,
  completion_time_seconds, language, theme_id, created_at
FROM public.quiz_attempts;

DROP POLICY IF EXISTS "Public can view quiz attempts" ON public.quiz_attempts;

CREATE POLICY "Authenticated can view quiz attempts"
  ON public.quiz_attempts FOR SELECT TO authenticated
  USING (true);

GRANT SELECT ON public.quiz_attempts_public TO anon, authenticated;
