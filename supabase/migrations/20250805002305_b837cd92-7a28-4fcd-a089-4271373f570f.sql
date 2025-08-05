-- Quiz Question Rebalancing Script
-- This script rebalances the distribution of correct answers (A, B, C, D) 
-- across all quiz questions without changing the content of the answers.

-- Create a backup table first
CREATE TABLE IF NOT EXISTS quiz_questions_backup AS 
SELECT * FROM quiz_questions WHERE 1=0; -- Create structure only

-- Function to analyze current distribution
CREATE OR REPLACE FUNCTION analyze_quiz_distribution()
RETURNS TABLE(
  category text,
  correct_a bigint,
  correct_b bigint, 
  correct_c bigint,
  correct_d bigint,
  total_questions bigint
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT 
    qq.category::text,
    COUNT(*) FILTER (WHERE qq.correct_answer = 'a') as correct_a,
    COUNT(*) FILTER (WHERE qq.correct_answer = 'b') as correct_b,
    COUNT(*) FILTER (WHERE qq.correct_answer = 'c') as correct_c,
    COUNT(*) FILTER (WHERE qq.correct_answer = 'd') as correct_d,
    COUNT(*) as total_questions
  FROM quiz_questions qq
  GROUP BY qq.category
  UNION ALL
  SELECT 
    'TOTAL'::text,
    COUNT(*) FILTER (WHERE qq.correct_answer = 'a') as correct_a,
    COUNT(*) FILTER (WHERE qq.correct_answer = 'b') as correct_b,
    COUNT(*) FILTER (WHERE qq.correct_answer = 'c') as correct_c,
    COUNT(*) FILTER (WHERE qq.correct_answer = 'd') as correct_d,
    COUNT(*) as total_questions
  FROM quiz_questions qq;
END;
$$;

-- Function to create backup before rebalancing
CREATE OR REPLACE FUNCTION backup_quiz_questions()
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  -- Clear existing backup
  DELETE FROM quiz_questions_backup;
  
  -- Create new backup
  INSERT INTO quiz_questions_backup 
  SELECT * FROM quiz_questions;
  
  RAISE NOTICE 'Backup created with % questions', (SELECT COUNT(*) FROM quiz_questions_backup);
END;
$$;

-- Function to restore from backup
CREATE OR REPLACE FUNCTION restore_quiz_questions_from_backup()
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  -- Clear current data
  DELETE FROM quiz_questions;
  
  -- Restore from backup
  INSERT INTO quiz_questions 
  SELECT * FROM quiz_questions_backup;
  
  RAISE NOTICE 'Restored % questions from backup', (SELECT COUNT(*) FROM quiz_questions);
END;
$$;

-- Main rebalancing function
CREATE OR REPLACE FUNCTION rebalance_quiz_answers()
RETURNS TABLE(
  category text,
  questions_processed integer,
  changes_made integer
) LANGUAGE plpgsql AS $$
DECLARE
  question_record RECORD;
  target_counts RECORD;
  current_counts RECORD;
  new_options jsonb;
  new_correct_answer text;
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
  option_a jsonb;
  option_b jsonb;
  option_c jsonb;
  option_d jsonb;
BEGIN
  -- Create backup before starting
  PERFORM backup_quiz_questions();
  
  -- Process each category
  FOR current_category IN 
    SELECT DISTINCT qq.category FROM quiz_questions qq ORDER BY qq.category
  LOOP
    -- Get question count for this category
    SELECT COUNT(*) INTO questions_in_category 
    FROM quiz_questions 
    WHERE category = current_category;
    
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
      WHERE category = current_category 
      ORDER BY id
    LOOP
      processed_count := processed_count + 1;
      should_change := false;
      new_letter := question_record.correct_answer;
      
      -- Determine if we need to change this question's correct answer
      CASE question_record.correct_answer
        WHEN 'a' THEN
          IF cat_a_count >= cat_a_target THEN
            -- Too many A's, try to assign B, C, or D
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
            -- Too many B's, try to assign A, C, or D
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
            -- Too many C's, try to assign A, B, or D
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
            -- Too many D's, try to assign A, B, or C
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
      
      -- If we need to change, rearrange the options
      IF should_change THEN
        -- Extract current options
        option_a := question_record.options->0;
        option_b := question_record.options->1;
        option_c := question_record.options->2;
        option_d := question_record.options->3;
        
        -- Find which option contains the correct answer content
        DECLARE
          correct_option_content jsonb;
        BEGIN
          CASE question_record.correct_answer
            WHEN 'a' THEN correct_option_content := option_a;
            WHEN 'b' THEN correct_option_content := option_b;
            WHEN 'c' THEN correct_option_content := option_c;
            WHEN 'd' THEN correct_option_content := option_d;
          END CASE;
          
          -- Create new options array with correct answer in new position
          CASE new_letter
            WHEN 'a' THEN
              new_options := jsonb_build_array(
                correct_option_content,
                CASE WHEN question_record.correct_answer = 'b' THEN option_a ELSE option_b END,
                CASE WHEN question_record.correct_answer = 'c' THEN option_a ELSE option_c END,
                CASE WHEN question_record.correct_answer = 'd' THEN option_a ELSE option_d END
              );
            WHEN 'b' THEN
              new_options := jsonb_build_array(
                CASE WHEN question_record.correct_answer = 'a' THEN option_b ELSE option_a END,
                correct_option_content,
                CASE WHEN question_record.correct_answer = 'c' THEN option_b ELSE option_c END,
                CASE WHEN question_record.correct_answer = 'd' THEN option_b ELSE option_d END
              );
            WHEN 'c' THEN
              new_options := jsonb_build_array(
                CASE WHEN question_record.correct_answer = 'a' THEN option_c ELSE option_a END,
                CASE WHEN question_record.correct_answer = 'b' THEN option_c ELSE option_b END,
                correct_option_content,
                CASE WHEN question_record.correct_answer = 'd' THEN option_c ELSE option_d END
              );
            WHEN 'd' THEN
              new_options := jsonb_build_array(
                CASE WHEN question_record.correct_answer = 'a' THEN option_d ELSE option_a END,
                CASE WHEN question_record.correct_answer = 'b' THEN option_d ELSE option_b END,
                CASE WHEN question_record.correct_answer = 'c' THEN option_d ELSE option_c END,
                correct_option_content
              );
          END CASE;
        END;
        
        -- Update the question
        UPDATE quiz_questions 
        SET 
          options = new_options,
          correct_answer = new_letter,
          updated_at = now()
        WHERE id = question_record.id;
        
        changes_count := changes_count + 1;
        
        RAISE NOTICE 'Question %: Changed correct answer from % to %', 
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
  
  RAISE NOTICE 'Rebalancing completed. Use analyze_quiz_distribution() to verify results.';
END;
$$;