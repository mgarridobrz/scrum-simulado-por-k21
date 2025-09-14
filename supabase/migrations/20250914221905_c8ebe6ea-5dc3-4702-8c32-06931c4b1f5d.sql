-- Create backup table for game attempts
CREATE TABLE public.game_attempts_backup (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  original_id uuid NOT NULL,
  name text NOT NULL,
  email text,
  category text NOT NULL,
  question_count integer NOT NULL,
  correct_answers integer NOT NULL DEFAULT 0,
  total_time_ms bigint NOT NULL,
  penalty_time_ms bigint NOT NULL DEFAULT 0,
  final_score_ms bigint NOT NULL,
  questions_data jsonb NOT NULL,
  language text NOT NULL DEFAULT 'pt'::text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  backed_up_at timestamp with time zone NOT NULL DEFAULT now(),
  backed_up_by uuid
);

-- Enable RLS
ALTER TABLE public.game_attempts_backup ENABLE ROW LEVEL SECURITY;

-- Create policies for backup table (only admins can manage)
CREATE POLICY "System admins can manage game attempts backup" 
ON public.game_attempts_backup 
FOR ALL 
USING (true);

-- Create function to move all game attempts to backup
CREATE OR REPLACE FUNCTION public.backup_all_game_attempts(backup_user_id uuid DEFAULT auth.uid())
RETURNS TABLE(moved_count integer, error_message text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  moved_records integer := 0;
BEGIN
  -- Insert all game attempts into backup table
  INSERT INTO public.game_attempts_backup (
    original_id, name, email, category, question_count, correct_answers,
    total_time_ms, penalty_time_ms, final_score_ms, questions_data,
    language, created_at, updated_at, backed_up_by
  )
  SELECT 
    id, name, email, category, question_count, correct_answers,
    total_time_ms, penalty_time_ms, final_score_ms, questions_data,
    language, created_at, updated_at, backup_user_id
  FROM public.game_attempts;
  
  GET DIAGNOSTICS moved_records = ROW_COUNT;
  
  -- Delete all records from original table
  DELETE FROM public.game_attempts;
  
  RETURN QUERY SELECT moved_records, NULL::text;
  
EXCEPTION WHEN OTHERS THEN
  RETURN QUERY SELECT 0, SQLERRM;
END;
$$;

-- Create function to restore all game attempts from backup
CREATE OR REPLACE FUNCTION public.restore_all_game_attempts()
RETURNS TABLE(restored_count integer, error_message text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  restored_records integer := 0;
BEGIN
  -- Insert all backup records back into game attempts
  INSERT INTO public.game_attempts (
    id, name, email, category, question_count, correct_answers,
    total_time_ms, penalty_time_ms, final_score_ms, questions_data,
    language, created_at, updated_at
  )
  SELECT 
    original_id, name, email, category, question_count, correct_answers,
    total_time_ms, penalty_time_ms, final_score_ms, questions_data,
    language, created_at, updated_at
  FROM public.game_attempts_backup
  ORDER BY backed_up_at;
  
  GET DIAGNOSTICS restored_records = ROW_COUNT;
  
  -- Clear backup table
  DELETE FROM public.game_attempts_backup;
  
  RETURN QUERY SELECT restored_records, NULL::text;
  
EXCEPTION WHEN OTHERS THEN
  RETURN QUERY SELECT 0, SQLERRM;
END;
$$;