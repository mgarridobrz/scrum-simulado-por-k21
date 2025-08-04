-- Create game_attempts table for the new SGRIO game
CREATE TABLE public.game_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  category TEXT NOT NULL,
  question_count INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  total_time_ms BIGINT NOT NULL,
  penalty_time_ms BIGINT NOT NULL DEFAULT 0,
  final_score_ms BIGINT NOT NULL,
  questions_data JSONB NOT NULL,
  language TEXT NOT NULL DEFAULT 'pt',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.game_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can create game attempts" 
ON public.game_attempts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view game attempts" 
ON public.game_attempts 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_game_attempts_updated_at
BEFORE UPDATE ON public.game_attempts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_game_attempts_category ON public.game_attempts(category);
CREATE INDEX idx_game_attempts_question_count ON public.game_attempts(question_count);
CREATE INDEX idx_game_attempts_final_score ON public.game_attempts(final_score_ms);
CREATE INDEX idx_game_attempts_created_at ON public.game_attempts(created_at);
CREATE INDEX idx_game_attempts_language ON public.game_attempts(language);