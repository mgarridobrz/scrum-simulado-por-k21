-- Rebalance correct answer distribution in quiz_questions table
-- Current distribution: A=6.25%, B=45%, C=40%, D=8.75%
-- Target distribution: A=25%, B=25%, C=25%, D=25% (20 questions each)

-- Create a temporary function to rebalance answers
CREATE OR REPLACE FUNCTION rebalance_quiz_correct_answers()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  question_record RECORD;
  target_a_count INTEGER := 20;
  target_b_count INTEGER := 20;
  target_c_count INTEGER := 20;
  target_d_count INTEGER := 20;
  current_a_count INTEGER := 0;
  current_b_count INTEGER := 0;
  current_c_count INTEGER := 0;
  current_d_count INTEGER := 0;
  new_options JSONB;
  target_letter TEXT;
  original_correct_text TEXT;
  target_position_text TEXT;
BEGIN
  -- Get current counts
  SELECT 
    COUNT(*) FILTER (WHERE correct_answer = 'a') as a_count,
    COUNT(*) FILTER (WHERE correct_answer = 'b') as b_count,
    COUNT(*) FILTER (WHERE correct_answer = 'c') as c_count,
    COUNT(*) FILTER (WHERE correct_answer = 'd') as d_count
  INTO current_a_count, current_b_count, current_c_count, current_d_count
  FROM quiz_questions;
  
  RAISE NOTICE 'Current distribution: a=%, b=%, c=%, d=%', current_a_count, current_b_count, current_c_count, current_d_count;
  
  -- Reset counters for redistribution
  current_a_count := 0;
  current_b_count := 0;
  current_c_count := 0;
  current_d_count := 0;
  
  -- Iterate through all questions and reassign correct answers
  FOR question_record IN 
    SELECT id, options, correct_answer
    FROM quiz_questions
    ORDER BY id
  LOOP
    -- Determine target letter based on current counts
    IF current_a_count < target_a_count THEN
      target_letter := 'a';
      current_a_count := current_a_count + 1;
    ELSIF current_b_count < target_b_count THEN
      target_letter := 'b';
      current_b_count := current_b_count + 1;
    ELSIF current_c_count < target_c_count THEN
      target_letter := 'c';
      current_c_count := current_c_count + 1;
    ELSE
      target_letter := 'd';
      current_d_count := current_d_count + 1;
    END IF;
    
    -- Skip if already correct
    IF question_record.correct_answer = target_letter THEN
      CONTINUE;
    END IF;
    
    -- Get the text content for current correct answer and target position
    SELECT option_data->>'text' INTO original_correct_text
    FROM jsonb_array_elements(question_record.options) as option_data
    WHERE option_data->>'id' = question_record.correct_answer;
    
    SELECT option_data->>'text' INTO target_position_text
    FROM jsonb_array_elements(question_record.options) as option_data
    WHERE option_data->>'id' = target_letter;
    
    -- Perform the swap: exchange the text content between correct answer and target position
    SELECT jsonb_agg(
      CASE 
        WHEN option_data->>'id' = question_record.correct_answer THEN
          jsonb_build_object(
            'id', option_data->>'id',
            'text', target_position_text
          )
        WHEN option_data->>'id' = target_letter THEN
          jsonb_build_object(
            'id', option_data->>'id',
            'text', original_correct_text
          )
        ELSE option_data
      END
      ORDER BY option_data->>'id'
    ) INTO new_options
    FROM jsonb_array_elements(question_record.options) as option_data;
    
    -- Update the question with new options and correct answer
    UPDATE quiz_questions 
    SET 
      options = new_options,
      correct_answer = target_letter,
      updated_at = now()
    WHERE id = question_record.id;
    
    RAISE NOTICE 'Question % reassigned from % to %', question_record.id, question_record.correct_answer, target_letter;
  END LOOP;
  
  -- Verify final distribution
  SELECT 
    COUNT(*) FILTER (WHERE correct_answer = 'a') as final_a,
    COUNT(*) FILTER (WHERE correct_answer = 'b') as final_b,
    COUNT(*) FILTER (WHERE correct_answer = 'c') as final_c,
    COUNT(*) FILTER (WHERE correct_answer = 'd') as final_d
  INTO current_a_count, current_b_count, current_c_count, current_d_count
  FROM quiz_questions;
  
  RAISE NOTICE 'Final distribution: a=%, b=%, c=%, d=%', current_a_count, current_b_count, current_c_count, current_d_count;
END;
$$;

-- Execute the rebalancing
SELECT rebalance_quiz_correct_answers();

-- Drop the temporary function
DROP FUNCTION rebalance_quiz_correct_answers();