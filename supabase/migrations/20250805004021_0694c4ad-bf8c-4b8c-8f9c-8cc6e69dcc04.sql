-- Versão COMPLETAMENTE corrigida do script de rebalanceamento
CREATE OR REPLACE FUNCTION rebalance_quiz_answers()
RETURNS TABLE(
  category text,
  questions_processed integer,
  changes_made integer
) LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  question_record RECORD;
  new_options jsonb;
  questions_in_category integer;
  changes_count integer := 0;
  processed_count integer := 0;
  current_category text := '';
  cat_a_count integer := 0;
  cat_b_count integer := 0;
  cat_c_count integer := 0;
  cat_d_count integer := 0;
  cat_a_target integer;
  cat_b_target integer;
  cat_c_target integer;
  cat_d_target integer;
  should_change boolean := false;
  target_letter text;
  correct_answer_content jsonb;
  all_options jsonb[];
  final_options jsonb[];
  i integer;
BEGIN
  -- Create backup before starting
  PERFORM backup_quiz_questions();
  
  -- Process each category
  FOR current_category IN 
    SELECT DISTINCT qq.category_id FROM quiz_questions qq ORDER BY qq.category_id
  LOOP
    -- Get question count for this category
    SELECT COUNT(*) INTO questions_in_category 
    FROM quiz_questions 
    WHERE category_id = current_category;
    
    -- Calculate target distribution for this category
    cat_a_target := questions_in_category / 4;
    cat_b_target := questions_in_category / 4;
    cat_c_target := questions_in_category / 4;
    cat_d_target := questions_in_category - (cat_a_target + cat_b_target + cat_c_target);
    
    -- Reset counters for this category
    cat_a_count := 0;
    cat_b_count := 0;
    cat_c_count := 0;
    cat_d_count := 0;
    processed_count := 0;
    changes_count := 0;
    
    RAISE NOTICE 'Processing category: % (% questions, targets: A=%, B=%, C=%, D=%)', 
      current_category, questions_in_category, cat_a_target, cat_b_target, cat_c_target, cat_d_target;
    
    -- Process questions in this category
    FOR question_record IN 
      SELECT * FROM quiz_questions 
      WHERE category_id = current_category 
      ORDER BY id
    LOOP
      processed_count := processed_count + 1;
      should_change := false;
      target_letter := question_record.correct_answer;
      
      -- Determine if we need to change this question's correct answer position
      CASE question_record.correct_answer
        WHEN 'a' THEN
          IF cat_a_count >= cat_a_target THEN
            IF cat_b_count < cat_b_target THEN
              target_letter := 'b';
              should_change := true;
            ELSIF cat_c_count < cat_c_target THEN
              target_letter := 'c';
              should_change := true;
            ELSIF cat_d_count < cat_d_target THEN
              target_letter := 'd';
              should_change := true;
            END IF;
          END IF;
        WHEN 'b' THEN
          IF cat_b_count >= cat_b_target THEN
            IF cat_a_count < cat_a_target THEN
              target_letter := 'a';
              should_change := true;
            ELSIF cat_c_count < cat_c_target THEN
              target_letter := 'c';
              should_change := true;
            ELSIF cat_d_count < cat_d_target THEN
              target_letter := 'd';
              should_change := true;
            END IF;
          END IF;
        WHEN 'c' THEN
          IF cat_c_count >= cat_c_target THEN
            IF cat_a_count < cat_a_target THEN
              target_letter := 'a';
              should_change := true;
            ELSIF cat_b_count < cat_b_target THEN
              target_letter := 'b';
              should_change := true;
            ELSIF cat_d_count < cat_d_target THEN
              target_letter := 'd';
              should_change := true;
            END IF;
          END IF;
        WHEN 'd' THEN
          IF cat_d_count >= cat_d_target THEN
            IF cat_a_count < cat_a_target THEN
              target_letter := 'a';
              should_change := true;
            ELSIF cat_b_count < cat_b_target THEN
              target_letter := 'b';
              should_change := true;
            ELSIF cat_c_count < cat_c_target THEN
              target_letter := 'c';
              should_change := true;
            END IF;
          END IF;
      END CASE;
      
      -- If we need to change, rearrange the options
      IF should_change THEN
        -- Extract the content of the CURRENTLY CORRECT answer (this MUST be preserved!)
        CASE question_record.correct_answer
          WHEN 'a' THEN correct_answer_content := question_record.options->0;
          WHEN 'b' THEN correct_answer_content := question_record.options->1;
          WHEN 'c' THEN correct_answer_content := question_record.options->2;
          WHEN 'd' THEN correct_answer_content := question_record.options->3;
        END CASE;
        
        -- Get all 4 options as an array
        all_options := ARRAY[
          question_record.options->0,
          question_record.options->1,
          question_record.options->2,
          question_record.options->3
        ];
        
        -- Initialize the final options array with nulls
        final_options := ARRAY[NULL, NULL, NULL, NULL]::jsonb[];
        
        -- Place the correct answer content in the target position
        CASE target_letter
          WHEN 'a' THEN final_options[1] := correct_answer_content;
          WHEN 'b' THEN final_options[2] := correct_answer_content;
          WHEN 'c' THEN final_options[3] := correct_answer_content;
          WHEN 'd' THEN final_options[4] := correct_answer_content;
        END CASE;
        
        -- Fill the remaining positions with the other options (excluding the correct answer content)
        i := 1;
        FOR j IN 1..4 LOOP
          -- Skip if this position already has the correct answer
          IF final_options[j] IS NOT NULL THEN
            CONTINUE;
          END IF;
          
          -- Find the next option that is NOT the correct answer content
          WHILE i <= 4 AND all_options[i] = correct_answer_content LOOP
            i := i + 1;
          END LOOP;
          
          -- If we found a valid option, place it
          IF i <= 4 THEN
            final_options[j] := all_options[i];
            i := i + 1;
          END IF;
        END LOOP;
        
        -- Build the final options jsonb array
        new_options := jsonb_build_array(
          final_options[1],
          final_options[2], 
          final_options[3],
          final_options[4]
        );
        
        -- Update the question with the new arrangement
        UPDATE quiz_questions 
        SET 
          options = new_options,
          correct_answer = target_letter,
          updated_at = now()
        WHERE id = question_record.id;
        
        changes_count := changes_count + 1;
        
        RAISE NOTICE 'Question %: Moved correct answer content from position % to position % (content: %)', 
          question_record.id, question_record.correct_answer, target_letter, 
          (correct_answer_content->>'text')::text;
      END IF;
      
      -- Update counters based on final correct answer position
      CASE COALESCE(target_letter, question_record.correct_answer)
        WHEN 'a' THEN cat_a_count := cat_a_count + 1;
        WHEN 'b' THEN cat_b_count := cat_b_count + 1;
        WHEN 'c' THEN cat_c_count := cat_c_count + 1;
        WHEN 'd' THEN cat_d_count := cat_d_count + 1;
      END CASE;
    END LOOP;
    
    -- Return results for this category
    RETURN QUERY SELECT 
      current_category::text,
      processed_count::integer,
      changes_count::integer;
      
    RAISE NOTICE 'Category % completed: A=%, B=%, C=%, D=% (% changes made)', 
      current_category, cat_a_count, cat_b_count, cat_c_count, cat_d_count, changes_count;
      
  END LOOP;
  
  RAISE NOTICE 'Rebalancing completed. The correct answer CONTENT has been preserved and only MOVED to different positions.';
END;
$$;