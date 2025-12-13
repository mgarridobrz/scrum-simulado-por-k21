-- Drop the restrictive admin-only policy
DROP POLICY IF EXISTS "Only admins can view quiz attempts" ON public.quiz_attempts;

-- Recreate public read policy for statistics
CREATE POLICY "Public can view quiz attempts" 
ON public.quiz_attempts 
FOR SELECT 
USING (true);