-- FASE 1: RESTAURAÇÃO SEGURA DO BACKUP
-- Primeiro, vamos restaurar as questões do backup para garantir estrutura correta

-- Limpar dados atuais (que podem ter estrutura inconsistente)
DELETE FROM quiz_questions;

-- Restaurar do backup (que tem a estrutura correta)
INSERT INTO quiz_questions 
SELECT * FROM quiz_questions_backup;

-- Verificar a restauração
SELECT 
  'Restoration completed' as status,
  COUNT(*) as total_questions,
  COUNT(DISTINCT category_id) as categories,
  COUNT(*) FILTER (WHERE jsonb_typeof(options) = 'array') as array_options,
  COUNT(*) FILTER (WHERE jsonb_typeof(options) = 'object') as object_options,
  COUNT(*) FILTER (WHERE jsonb_typeof(options_en) = 'array') as array_options_en,
  COUNT(*) FILTER (WHERE jsonb_typeof(options_en) = 'object') as object_options_en
FROM quiz_questions;

-- FASE 2: NOVO ALGORITMO DE REBALANCEAMENTO CORRETO
-- Criar função que preserva a estrutura e apenas reordena o conteúdo

CREATE OR REPLACE FUNCTION public.safe_rebalance_quiz_answers()
RETURNS TABLE(category text, questions_processed integer, changes_made integer, validation_results jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  question_record RECORD;
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
  target_answer_text text;
  target_answer_text_en text;
  new_options jsonb;
  new_options_en jsonb;
  temp_options jsonb;
  temp_options_en jsonb;
  validation_result jsonb;
BEGIN
  -- Validação inicial da estrutura
  IF EXISTS (
    SELECT 1 FROM quiz_questions 
    WHERE jsonb_typeof(options) != 'array' OR jsonb_typeof(options_en) != 'array'
  ) THEN
    RAISE EXCEPTION 'Database structure validation failed: options must be arrays';
  END IF;
  
  -- Criar backup antes de começar
  PERFORM backup_quiz_questions();
  
  -- Processar cada categoria
  FOR current_category IN 
    SELECT DISTINCT qq.category_id FROM quiz_questions qq ORDER BY qq.category_id
  LOOP
    -- Contagem de questões na categoria
    SELECT COUNT(*) INTO questions_in_category 
    FROM quiz_questions 
    WHERE category_id = current_category;
    
    -- Calcular distribuição alvo para esta categoria
    cat_a_target := questions_in_category / 4;
    cat_b_target := questions_in_category / 4;
    cat_c_target := questions_in_category / 4;
    cat_d_target := questions_in_category - (cat_a_target + cat_b_target + cat_c_target);
    
    -- Resetar contadores para esta categoria
    cat_a_count := 0;
    cat_b_count := 0;
    cat_c_count := 0;
    cat_d_count := 0;
    processed_count := 0;
    changes_count := 0;
    
    RAISE NOTICE 'Processing category: % (% questions, targets: A=%, B=%, C=%, D=%)', 
      current_category, questions_in_category, cat_a_target, cat_b_target, cat_c_target, cat_d_target;
    
    -- Processar questões desta categoria
    FOR question_record IN 
      SELECT * FROM quiz_questions 
      WHERE category_id = current_category 
      ORDER BY id
    LOOP
      processed_count := processed_count + 1;
      should_change := false;
      target_position := question_record.correct_answer;
      
      -- Determinar se precisamos mudar a posição da resposta correta
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
      
      -- Se precisamos mudar a posição
      IF should_change THEN
        changes_count := changes_count + 1;
        
        -- Obter texto da resposta correta atual
        correct_answer_text := question_record.options->((ascii(question_record.correct_answer) - 97))::text->>'text';
        correct_answer_text_en := question_record.options_en->((ascii(question_record.correct_answer) - 97))::text->>'text';
        
        -- Obter texto da posição alvo
        target_answer_text := question_record.options->((ascii(target_position) - 97))::text->>'text';
        target_answer_text_en := question_record.options_en->((ascii(target_position) - 97))::text->>'text';
        
        -- Fazer cópia das opções atuais
        temp_options := question_record.options;
        temp_options_en := question_record.options_en;
        
        -- Trocar os textos nas posições (português)
        temp_options := jsonb_set(
          temp_options, 
          ARRAY[(ascii(question_record.correct_answer) - 97)::text, 'text'], 
          to_jsonb(target_answer_text)
        );
        temp_options := jsonb_set(
          temp_options, 
          ARRAY[(ascii(target_position) - 97)::text, 'text'], 
          to_jsonb(correct_answer_text)
        );
        
        -- Trocar os textos nas posições (inglês)
        temp_options_en := jsonb_set(
          temp_options_en, 
          ARRAY[(ascii(question_record.correct_answer) - 97)::text, 'text'], 
          to_jsonb(target_answer_text_en)
        );
        temp_options_en := jsonb_set(
          temp_options_en, 
          ARRAY[(ascii(target_position) - 97)::text, 'text'], 
          to_jsonb(correct_answer_text_en)
        );
        
        -- Atualizar a questão
        UPDATE quiz_questions 
        SET 
          correct_answer = target_position,
          options = temp_options,
          options_en = temp_options_en,
          updated_at = now()
        WHERE id = question_record.id;
        
        RAISE NOTICE 'Question %: moved correct answer from % to % (swapped texts)', 
          question_record.id, question_record.correct_answer, target_position;
      END IF;
      
      -- Atualizar contagem para a posição alvo
      CASE target_position
        WHEN 'a' THEN cat_a_count := cat_a_count + 1;
        WHEN 'b' THEN cat_b_count := cat_b_count + 1;
        WHEN 'c' THEN cat_c_count := cat_c_count + 1;
        WHEN 'd' THEN cat_d_count := cat_d_count + 1;
      END CASE;
    END LOOP;
    
    -- Validações pós-categoria
    validation_result := jsonb_build_object(
      'final_distribution', jsonb_build_object(
        'a', cat_a_count,
        'b', cat_b_count,
        'c', cat_c_count,
        'd', cat_d_count
      ),
      'structure_preserved', NOT EXISTS (
        SELECT 1 FROM quiz_questions 
        WHERE category_id = current_category 
        AND (jsonb_typeof(options) != 'array' OR jsonb_typeof(options_en) != 'array')
      )
    );
    
    RAISE NOTICE 'Category % completed: processed %, changed %. Final counts: A=%, B=%, C=%, D=%', 
      current_category, processed_count, changes_count, cat_a_count, cat_b_count, cat_c_count, cat_d_count;
    
    -- Retornar resultados desta categoria
    RETURN QUERY SELECT current_category, processed_count, changes_count, validation_result;
  END LOOP;
  
  RAISE NOTICE 'Safe rebalancing completed successfully!';
END;
$function$;

-- FASE 3: EXECUTAR O REBALANCEAMENTO SEGURO
SELECT * FROM public.safe_rebalance_quiz_answers();