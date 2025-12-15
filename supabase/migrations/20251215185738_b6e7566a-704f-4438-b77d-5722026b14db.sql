-- Create quiz_themes table
CREATE TABLE public.quiz_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  subtitle TEXT, -- configurable subtitle like "questões baseadas no exame oficial..."
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_themes ENABLE ROW LEVEL SECURITY;

-- Public can read active themes
CREATE POLICY "Public can view active themes" 
ON public.quiz_themes 
FOR SELECT 
USING (is_active = true);

-- Insert default CSM theme
INSERT INTO public.quiz_themes (slug, name, description, subtitle)
VALUES ('csm', 'CSM - Certified ScrumMaster', 'Simulado para certificação CSM', 'Questões baseadas no exame oficial da Scrum Alliance para certificação CSM.');

-- Add theme_id to quiz_questions
ALTER TABLE public.quiz_questions 
ADD COLUMN theme_id UUID REFERENCES public.quiz_themes(id);

-- Update existing questions to CSM theme
UPDATE public.quiz_questions 
SET theme_id = (SELECT id FROM public.quiz_themes WHERE slug = 'csm');

-- Make theme_id NOT NULL after migration
ALTER TABLE public.quiz_questions 
ALTER COLUMN theme_id SET NOT NULL;

-- Add theme_id to quiz_attempts
ALTER TABLE public.quiz_attempts 
ADD COLUMN theme_id UUID REFERENCES public.quiz_themes(id);

-- Update existing attempts to CSM theme
UPDATE public.quiz_attempts 
SET theme_id = (SELECT id FROM public.quiz_themes WHERE slug = 'csm');

-- Make theme_id NOT NULL after migration
ALTER TABLE public.quiz_attempts 
ALTER COLUMN theme_id SET NOT NULL;

-- Add theme_id to game_attempts as well
ALTER TABLE public.game_attempts 
ADD COLUMN theme_id UUID REFERENCES public.quiz_themes(id);

-- Update existing game attempts to CSM theme
UPDATE public.game_attempts 
SET theme_id = (SELECT id FROM public.quiz_themes WHERE slug = 'csm');

-- Make theme_id NOT NULL after migration  
ALTER TABLE public.game_attempts 
ALTER COLUMN theme_id SET NOT NULL;

-- Create index for faster queries
CREATE INDEX idx_quiz_questions_theme ON public.quiz_questions(theme_id);
CREATE INDEX idx_quiz_attempts_theme ON public.quiz_attempts(theme_id);
CREATE INDEX idx_game_attempts_theme ON public.game_attempts(theme_id);

-- Create K212025 theme for the end of year event
INSERT INTO public.quiz_themes (slug, name, description, subtitle)
VALUES ('k212025', 'K21 2025', 'Simulado de fim de ano K21', 'Teste seus conhecimentos sobre a K21!');

-- Create trigger for updated_at
CREATE TRIGGER update_quiz_themes_updated_at
BEFORE UPDATE ON public.quiz_themes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();