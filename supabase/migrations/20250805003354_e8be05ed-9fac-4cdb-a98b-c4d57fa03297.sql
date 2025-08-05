-- Primeiro, restaurar o backup
SELECT restore_quiz_questions_from_backup();

-- Criar uma versão completamente corrigida do rebalanceamento
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
  new_letter text;
  correct_content jsonb;
  option_a jsonb;
  option_b jsonb;
  option_c jsonb;
  option_d jsonb;
  wrong_options jsonb[];
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
      new_letter := question_record.correct_answer;
      
      -- Determine if we need to change this question's correct answer
      CASE question_record.correct_answer
        WHEN 'a' THEN
          IF cat_a_count >= cat_a_target THEN
            IF cat_b_count < cat_b_target THEN
              new_letter := 'b';
              should_change := true;
            ELSIF cat_c_count < cat_c_target THEN
              new_letter := 'c';
              should_change := true;
            ELSIF cat_d_count < cat_d_target THEN
              new_letter := 'd';
              should_change := true;
            END IF;
          END IF;
        WHEN 'b' THEN
          IF cat_b_count >= cat_b_target THEN
            IF cat_a_count < cat_a_target THEN
              new_letter := 'a';
              should_change := true;
            ELSIF cat_c_count < cat_c_target THEN
              new_letter := 'c';
              should_change := true;
            ELSIF cat_d_count < cat_d_target THEN
              new_letter := 'd';
              should_change := true;
            END IF;
          END IF;
        WHEN 'c' THEN
          IF cat_c_count >= cat_c_target THEN
            IF cat_a_count < cat_a_target THEN
              new_letter := 'a';
              should_change := true;
            ELSIF cat_b_count < cat_b_target THEN
              new_letter := 'b';
              should_change := true;
            ELSIF cat_d_count < cat_d_target THEN
              new_letter := 'd';
              should_change := true;
            END IF;
          END IF;
        WHEN 'd' THEN
          IF cat_d_count >= cat_d_target THEN
            IF cat_a_count < cat_a_target THEN
              new_letter := 'a';
              should_change := true;
            ELSIF cat_b_count < cat_b_target THEN
              new_letter := 'b';
              should_change := true;
            ELSIF cat_c_count < cat_c_target THEN
              new_letter := 'c';
              should_change := true;
            END IF;
          END IF;
      END CASE;
      
      -- If we need to change, rearrange the options correctly
      IF should_change THEN
        -- Extract current options
        option_a := question_record.options->0;
        option_b := question_record.options->1;
        option_c := question_record.options->2;
        option_d := question_record.options->3;
        
        -- Get the correct answer content (this must be preserved!)
        CASE question_record.correct_answer
          WHEN 'a' THEN correct_content := option_a;
          WHEN 'b' THEN correct_content := option_b;
          WHEN 'c' THEN correct_content := option_c;
          WHEN 'd' THEN correct_content := option_d;
        END CASE;
        
        -- Get the wrong options (everything except the correct one)
        wrong_options := ARRAY[]::jsonb[];
        CASE question_record.correct_answer
          WHEN 'a' THEN wrong_options := ARRAY[option_b, option_c, option_d];
          WHEN 'b' THEN wrong_options := ARRAY[option_a, option_c, option_d];
          WHEN 'c' THEN wrong_options := ARRAY[option_a, option_b, option_d];
          WHEN 'd' THEN wrong_options := ARRAY[option_a, option_b, option_c];
        END CASE;
        
        -- Build new options array with correct content in the target position
        CASE new_letter
          WHEN 'a' THEN
            new_options := jsonb_build_array(
              correct_content,  -- Correct answer goes to position A
              wrong_options[1], -- First wrong option
              wrong_options[2], -- Second wrong option  
              wrong_options[3]  -- Third wrong option
            );
          WHEN 'b' THEN
            new_options := jsonb_build_array(
              wrong_options[1], -- First wrong option
              correct_content,  -- Correct answer goes to position B
              wrong_options[2], -- Second wrong option
              wrong_options[3]  -- Third wrong option
            );
          WHEN 'c' THEN
            new_options := jsonb_build_array(
              wrong_options[1], -- First wrong option
              wrong_options[2], -- Second wrong option
              correct_content,  -- Correct answer goes to position C
              wrong_options[3]  -- Third wrong option
            );
          WHEN 'd' THEN
            new_options := jsonb_build_array(
              wrong_options[1], -- First wrong option
              wrong_options[2], -- Second wrong option
              wrong_options[3], -- Third wrong option
              correct_content   -- Correct answer goes to position D
            );
        END CASE;
        
        -- Update the question with new options and correct answer position
        UPDATE quiz_questions 
        SET 
          options = new_options,
          correct_answer = new_letter,
          updated_at = now()
        WHERE id = question_record.id;
        
        changes_count := changes_count + 1;
        
        RAISE NOTICE 'Question %: Moved correct answer from % to % (content preserved)', 
          question_record.id, question_record.correct_answer, new_letter;
      END IF;
      
      -- Update counters based on final correct answer
      CASE COALESCE(new_letter, question_record.correct_answer)
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
  
  RAISE NOTICE 'Rebalancing completed successfully. The correct answer content has been preserved in all cases.';
END;
$$;