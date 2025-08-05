CREATE OR REPLACE FUNCTION public.rebalance_quiz_answers()
RETURNS TABLE(category text, questions_processed integer, changes_made integer)
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  question_record RECORD;
  new_options jsonb;
  new_options_en jsonb;
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
  correct_answer_text_en text;
  option_texts text[];
  option_texts_en text[];
  temp_text text;
  temp_text_en text;
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
      
      -- Get the text of the current correct answer for both languages
      correct_answer_text := question_record.options->(question_record.correct_answer)->>'text';
      correct_answer_text_en := question_record.options_en->(question_record.correct_answer)->>'text';
      
      -- If we need to change position
      IF should_change THEN
        changes_count := changes_count + 1;
        
        -- Extract all option texts as arrays
        option_texts := ARRAY[
          question_record.options->'a'->>'text',
          question_record.options->'b'->>'text',
          question_record.options->'c'->>'text',
          question_record.options->'d'->>'text'
        ];
        
        option_texts_en := ARRAY[
          question_record.options_en->'a'->>'text',
          question_record.options_en->'b'->>'text',
          question_record.options_en->'c'->>'text',
          question_record.options_en->'d'->>'text'
        ];
        
        -- Get the text that will be swapped with the target position
        temp_text := question_record.options->(target_position)->>'text';
        temp_text_en := question_record.options_en->(target_position)->>'text';
        
        -- Update the arrays (swap the texts)
        CASE question_record.correct_answer
          WHEN 'a' THEN
            option_texts[1] := temp_text;
            option_texts_en[1] := temp_text_en;
          WHEN 'b' THEN
            option_texts[2] := temp_text;
            option_texts_en[2] := temp_text_en;
          WHEN 'c' THEN
            option_texts[3] := temp_text;
            option_texts_en[3] := temp_text_en;
          WHEN 'd' THEN
            option_texts[4] := temp_text;
            option_texts_en[4] := temp_text_en;
        END CASE;
        
        CASE target_position
          WHEN 'a' THEN
            option_texts[1] := correct_answer_text;
            option_texts_en[1] := correct_answer_text_en;
          WHEN 'b' THEN
            option_texts[2] := correct_answer_text;
            option_texts_en[2] := correct_answer_text_en;
          WHEN 'c' THEN
            option_texts[3] := correct_answer_text;
            option_texts_en[3] := correct_answer_text_en;
          WHEN 'd' THEN
            option_texts[4] := correct_answer_text;
            option_texts_en[4] := correct_answer_text_en;
        END CASE;
        
        -- Build new options JSONB with the swapped texts
        new_options := jsonb_build_object(
          'a', jsonb_build_object('id', 'a', 'text', option_texts[1]),
          'b', jsonb_build_object('id', 'b', 'text', option_texts[2]),
          'c', jsonb_build_object('id', 'c', 'text', option_texts[3]),
          'd', jsonb_build_object('id', 'd', 'text', option_texts[4])
        );
        
        new_options_en := jsonb_build_object(
          'a', jsonb_build_object('id', 'a', 'text', option_texts_en[1]),
          'b', jsonb_build_object('id', 'b', 'text', option_texts_en[2]),
          'c', jsonb_build_object('id', 'c', 'text', option_texts_en[3]),
          'd', jsonb_build_object('id', 'd', 'text', option_texts_en[4])
        );
        
        -- Update the question
        UPDATE quiz_questions 
        SET 
          correct_answer = target_position,
          options = new_options,
          options_en = new_options_en,
          updated_at = now()
        WHERE id = question_record.id;
        
        RAISE NOTICE 'Question %: moved correct answer from % to % (% -> %)', 
          question_record.id, question_record.correct_answer, target_position, 
          correct_answer_text, temp_text;
      END IF;
      
      -- Update the count for the target position
      CASE target_position
        WHEN 'a' THEN cat_a_count := cat_a_count + 1;
        WHEN 'b' THEN cat_b_count := cat_b_count + 1;
        WHEN 'c' THEN cat_c_count := cat_c_count + 1;
        WHEN 'd' THEN cat_d_count := cat_d_count + 1;
      END CASE;
    END LOOP;
    
    RAISE NOTICE 'Category % completed: processed %, changed %. Final counts: A=%, B=%, C=%, D=%', 
      current_category, processed_count, changes_count, cat_a_count, cat_b_count, cat_c_count, cat_d_count;
    
    -- Return the results for this category
    RETURN QUERY SELECT current_category, processed_count, changes_count;
  END LOOP;
  
  RAISE NOTICE 'Rebalancing completed successfully!';
END;
$function$;

-- Execute the rebalancing function
SELECT * FROM public.rebalance_quiz_answers();