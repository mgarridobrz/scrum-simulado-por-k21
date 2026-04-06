
-- 1. game_attempts: remover política INSERT duplicada
DROP POLICY IF EXISTS "Anyone can create game attempts" ON public.game_attempts;

-- 2. game_attempts_backup: restringir acesso
DROP POLICY IF EXISTS "System admins can manage game attempts backup" ON public.game_attempts_backup;
CREATE POLICY "No public access to game_attempts_backup"
  ON public.game_attempts_backup FOR ALL USING (false);

-- 3. quiz_questions: remover INSERT/UPDATE público
DROP POLICY IF EXISTS "Public can insert quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Public can update quiz questions" ON public.quiz_questions;

-- 4. quiz_questions_backup: bloquear acesso público
DROP POLICY IF EXISTS "Allow all operations on quiz_questions_backup" ON public.quiz_questions_backup;
CREATE POLICY "No public access to quiz_questions_backup"
  ON public.quiz_questions_backup FOR ALL USING (false);

-- 5. quiz_categories: remover INSERT público
DROP POLICY IF EXISTS "Public can insert quiz categories" ON public.quiz_categories;
