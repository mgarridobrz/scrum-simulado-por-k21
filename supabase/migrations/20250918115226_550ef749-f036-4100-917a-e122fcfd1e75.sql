-- Fix the backup_all_game_attempts function to include WHERE clause
CREATE OR REPLACE FUNCTION public.backup_all_game_attempts(backup_user_id uuid DEFAULT auth.uid())
RETURNS TABLE(moved_count integer, error_message text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
  FROM public.game_attempts
  WHERE true; -- Add WHERE clause to select all records
  
  GET DIAGNOSTICS moved_records = ROW_COUNT;
  
  -- Delete all records from original table with WHERE clause
  DELETE FROM public.game_attempts WHERE true;
  
  RETURN QUERY SELECT moved_records, NULL::text;
  
EXCEPTION WHEN OTHERS THEN
  RETURN QUERY SELECT 0, SQLERRM;
END;
$function$;