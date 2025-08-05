-- Script CORRETO: trocar apenas o CONTEÚDO das opções, mantendo IDs fixos
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
  target_position text;
  correct_answer_text text;
  option_texts text[];
  temp_text text;
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
      target_position := question_record.correct_answer;
      
      -- Determine if we need to change this question's correct answer position
      CASE question_record.correct_answer
        WHEN 'a' THEN
          IF cat_a_count >= cat_a_target THEN
            IF cat_b_count < cat_b_target THEN
              target_position := 'b';
              should_change := true;
            ELSIF cat_c_count < cat_c_target THEN
              target_position := 'c';
              should_change := true;
            ELSIF cat_d_count < cat_d_target THEN
              target_position := 'd';
              should_change := true;
            END IF;
          END IF;
        WHEN 'b' THEN
          IF cat_b_count >= cat_b_target THEN
            IF cat_a_count < cat_a_target THEN
              target_position := 'a';
              should_change := true;
            ELSIF cat_c_count < cat_c_target THEN
              target_position := 'c';
              should_change := true;
            ELSIF cat_d_count < cat_d_target THEN
              target_position := 'd';
              should_change := true;
            END IF;
          END IF;
        WHEN 'c' THEN
          IF cat_c_count >= cat_c_target THEN
            IF cat_a_count < cat_a_target THEN
              target_position := 'a';
              should_change := true;
            ELSIF cat_b_count < cat_b_target THEN
              target_position := 'b';
              should_change := true;
            ELSIF cat_d_count < cat_d_target THEN
              target_position := 'd';
              should_change := true;
            END IF;
          END IF;
        WHEN 'd' THEN
          IF cat_d_count >= cat_d_target THEN
            IF cat_a_count < cat_a_target THEN
              target_position := 'a';
              should_change := true;
            ELSIF cat_b_count < cat_b_target THEN
              target_position := 'b';
              should_change := true;
            ELSIF cat_c_count < cat_c_target THEN
              target_position := 'c';
              should_change := true;
            END IF;
          END IF;
      END CASE;
      
      -- If we need to change, swap the TEXT content only
      IF should_change THEN
        -- Extract the TEXT of the current correct answer
        CASE question_record.correct_answer
          WHEN 'a' THEN correct_answer_text := question_record.options->0->>'text';
          WHEN 'b' THEN correct_answer_text := question_record.options->1->>'text';
          WHEN 'c' THEN correct_answer_text := question_record.options->2->>'text';
          WHEN 'd' THEN correct_answer_text := question_record.options->3->>'text';
        END CASE;
        
        -- Extract all option texts
        option_texts := ARRAY[
          question_record.options->0->>'text',
          question_record.options->1->>'text',
          question_record.options->2->>'text',
          question_record.options->3->>'text'
        ];
        
        -- Swap the correct answer text to the target position
        CASE target_position
          WHEN 'a' THEN
            temp_text := option_texts[1];
            option_texts[1] := correct_answer_text;
            -- Put the displaced text in the original position
            CASE question_record.correct_answer
              WHEN 'b' THEN option_texts[2] := temp_text;
              WHEN 'c' THEN option_texts[3] := temp_text;
              WHEN 'd' THEN option_texts[4] := temp_text;
            END CASE;
          WHEN 'b' THEN
            temp_text := option_texts[2];
            option_texts[2] := correct_answer_text;
            CASE question_record.correct_answer
              WHEN 'a' THEN option_texts[1] := temp_text;
              WHEN 'c' THEN option_texts[3] := temp_text;
              WHEN 'd' THEN option_texts[4] := temp_text;
            END CASE;
          WHEN 'c' THEN
            temp_text := option_texts[3];
            option_texts[3] := correct_answer_text;
            CASE question_record.correct_answer
              WHEN 'a' THEN option_texts[1] := temp_text;
              WHEN 'b' THEN option_texts[2] := temp_text;
              WHEN 'd' THEN option_texts[4] := temp_text;
            END CASE;
          WHEN 'd' THEN
            temp_text := option_texts[4];
            option_texts[4] := correct_answer_text;
            CASE question_record.correct_answer
              WHEN 'a' THEN option_texts[1] := temp_text;
              WHEN 'b' THEN option_texts[2] := temp_text;
              WHEN 'c' THEN option_texts[3] := temp_text;
            END CASE;
        END CASE;
        
        -- Build new options with FIXED IDs but swapped texts
        new_options := jsonb_build_array(
          jsonb_build_object('id', 'a', 'text', option_texts[1]),
          jsonb_build_object('id', 'b', 'text', option_texts[2]),
          jsonb_build_object('id', 'c', 'text', option_texts[3]),
          jsonb_build_object('id', 'd', 'text', option_texts[4])
        );
        
        -- Update the question
        UPDATE quiz_questions 
        SET 
          options = new_options,
          correct_answer = target_position,
          updated_at = now()
        WHERE id = question_record.id;
        
        changes_count := changes_count + 1;
        
        RAISE NOTICE 'Question %: Moved correct answer text from position % to position %', 
          question_record.id, question_record.correct_answer, target_position;
      END IF;
      
      -- Update counters based on final correct answer position
      CASE COALESCE(target_position, question_record.correct_answer)
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
  
  RAISE NOTICE 'Rebalancing completed. Option IDs remain fixed, only TEXT content was swapped.';
END;
$$;