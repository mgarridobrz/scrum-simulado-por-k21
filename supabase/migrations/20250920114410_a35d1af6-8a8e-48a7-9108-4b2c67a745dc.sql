-- Fix the restore_all_game_attempts function to include WHERE clause
CREATE OR REPLACE FUNCTION public.restore_all_game_attempts()
RETURNS TABLE(restored_count integer, error_message text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
  WHERE true -- Add WHERE clause to select all records
  ORDER BY backed_up_at;
  
  GET DIAGNOSTICS restored_records = ROW_COUNT;
  
  -- Clear backup table with WHERE clause
  DELETE FROM public.game_attempts_backup WHERE true;
  
  RETURN QUERY SELECT restored_records, NULL::text;
  
EXCEPTION WHEN OTHERS THEN
  RETURN QUERY SELECT 0, SQLERRM;
END;
$function$;