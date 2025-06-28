
-- Create RLS policies for quiz_questions table
-- Allow public SELECT access (no authentication required for reading questions)
CREATE POLICY "Public can view quiz questions" 
ON public.quiz_questions 
FOR SELECT 
USING (true);

-- Allow public INSERT access (for potential future use)
CREATE POLICY "Public can insert quiz questions" 
ON public.quiz_questions 
FOR INSERT 
WITH CHECK (true);

-- Allow public UPDATE access (for question validation functionality)
CREATE POLICY "Public can update quiz questions" 
ON public.quiz_questions 
FOR UPDATE 
USING (true);

-- Create RLS policies for quiz_attempts table
-- Allow public SELECT access (for viewing attempt statistics)
CREATE POLICY "Public can view quiz attempts" 
ON public.quiz_attempts 
FOR SELECT 
USING (true);

-- Allow public INSERT access (for submitting quiz attempts)
CREATE POLICY "Public can insert quiz attempts" 
ON public.quiz_attempts 
FOR INSERT 
WITH CHECK (true);

-- Create RLS policies for quiz_categories table
-- Allow public SELECT access (for viewing categories)
CREATE POLICY "Public can view quiz categories" 
ON public.quiz_categories 
FOR SELECT 
USING (true);

-- Allow public INSERT access (for potential future use)
CREATE POLICY "Public can insert quiz categories" 
ON public.quiz_categories 
FOR INSERT 
WITH CHECK (true);
