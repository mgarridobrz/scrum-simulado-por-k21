-- Rebalance correct answer distribution to achieve ~25% for each option (A, B, C, D)
-- Current distribution: A=6.25%, B=45%, C=40%, D=8.75%
-- Target distribution: A=25%, B=25%, C=25%, D=25%

-- Create a temporary function to rebalance answers
CREATE OR REPLACE FUNCTION rebalance_correct_answers()
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
  original_correct_option JSONB;
  target_letter TEXT;
BEGIN
  -- Get current counts
  SELECT 
    COUNT(*) FILTER (WHERE correct_answer = 'A') as a_count,
    COUNT(*) FILTER (WHERE correct_answer = 'B') as b_count,
    COUNT(*) FILTER (WHERE correct_answer = 'C') as c_count,
    COUNT(*) FILTER (WHERE correct_answer = 'D') as d_count
  INTO current_a_count, current_b_count, current_c_count, current_d_count
  FROM questions;
  
  RAISE NOTICE 'Current distribution: A=%, B=%, C=%, D=%', current_a_count, current_b_count, current_c_count, current_d_count;
  
  -- Reset counters for redistribution
  current_a_count := 0;
  current_b_count := 0;
  current_c_count := 0;
  current_d_count := 0;
  
  -- Iterate through all questions and reassign correct answers
  FOR question_record IN 
    SELECT id, options, correct_answer
    FROM questions
    ORDER BY id
  LOOP
    -- Determine target letter based on current counts
    IF current_a_count < target_a_count THEN
      target_letter := 'A';
      current_a_count := current_a_count + 1;
    ELSIF current_b_count < target_b_count THEN
      target_letter := 'B';
      current_b_count := current_b_count + 1;
    ELSIF current_c_count < target_c_count THEN
      target_letter := 'C';
      current_c_count := current_c_count + 1;
    ELSE
      target_letter := 'D';
      current_d_count := current_d_count + 1;
    END IF;
    
    -- Skip if already correct
    IF question_record.correct_answer = target_letter THEN
      CONTINUE;
    END IF;
    
    -- Find the original correct option content
    SELECT option_data INTO original_correct_option
    FROM jsonb_array_elements(question_record.options) as option_data
    WHERE option_data->>'id' = question_record.correct_answer;
    
    -- Create new options array with correct answer moved to target position
    new_options := '[]'::jsonb;
    
    -- Add all options except the original correct one
    SELECT jsonb_agg(
      CASE 
        WHEN option_data->>'id' = target_letter THEN 
          jsonb_set(original_correct_option, '{id}', to_jsonb(target_letter))
        WHEN option_data->>'id' = question_record.correct_answer THEN
          jsonb_set(option_data, '{id}', to_jsonb(target_letter))
        ELSE option_data
      END
    ) INTO new_options
    FROM jsonb_array_elements(question_record.options) as option_data;
    
    -- If target position was empty, we need to swap
    IF NOT EXISTS (
      SELECT 1 FROM jsonb_array_elements(question_record.options) as option_data
      WHERE option_data->>'id' = target_letter
    ) THEN
      -- This shouldn't happen with A,B,C,D options, but handle gracefully
      CONTINUE;
    END IF;
    
    -- Perform the swap: move content from current correct answer to target position
    -- and move target position content to current correct answer position
    WITH option_swap AS (
      SELECT 
        CASE 
          WHEN option_data->>'id' = question_record.correct_answer THEN
            jsonb_build_object(
              'id', target_letter,
              'text', option_data->>'text'
            )
          WHEN option_data->>'id' = target_letter THEN
            jsonb_build_object(
              'id', question_record.correct_answer,
              'text', option_data->>'text'
            )
          ELSE option_data
        END as swapped_option
      FROM jsonb_array_elements(question_record.options) as option_data
    )
    SELECT jsonb_agg(swapped_option ORDER BY swapped_option->>'id') INTO new_options
    FROM option_swap;
    
    -- Update the question with new options and correct answer
    UPDATE questions 
    SET 
      options = new_options,
      correct_answer = target_letter,
      updated_at = now()
    WHERE id = question_record.id;
    
    RAISE NOTICE 'Question % reassigned from % to %', question_record.id, question_record.correct_answer, target_letter;
  END LOOP;
  
  -- Verify final distribution
  SELECT 
    COUNT(*) FILTER (WHERE correct_answer = 'A') as final_a,
    COUNT(*) FILTER (WHERE correct_answer = 'B') as final_b,
    COUNT(*) FILTER (WHERE correct_answer = 'C') as final_c,
    COUNT(*) FILTER (WHERE correct_answer = 'D') as final_d
  INTO current_a_count, current_b_count, current_c_count, current_d_count
  FROM questions;
  
  RAISE NOTICE 'Final distribution: A=%, B=%, C=%, D=%', current_a_count, current_b_count, current_c_count, current_d_count;
END;
$$;

-- Execute the rebalancing
SELECT rebalance_correct_answers();

-- Drop the temporary function
DROP FUNCTION rebalance_correct_answers();