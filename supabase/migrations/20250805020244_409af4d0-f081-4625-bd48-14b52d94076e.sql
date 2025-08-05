-- Script melhorado para rebalanceamento de questões do quiz
-- Implementa estratégia global com distribuição equilibrada

CREATE OR REPLACE FUNCTION public.improved_rebalance_quiz_answers()
RETURNS TABLE(category text, questions_processed integer, changes_made integer, distribution_summary jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  question_record RECORD;
  category_record RECORD;
  total_questions integer;
  global_targets jsonb;
  category_progress jsonb := '{}';
  questions_changed integer := 0;
  questions_processed integer := 0;
  current_category text := '';
  
  -- Contadores globais para distribuição
  global_a_count integer := 0;
  global_b_count integer := 0;
  global_c_count integer := 0;
  global_d_count integer := 0;
  
  -- Alvos globais
  target_a integer;
  target_b integer;
  target_c integer;
  target_d integer;
  
  -- Variáveis para processamento
  new_position text;
  should_change boolean;
  correct_answer_text text;
  correct_answer_text_en text;
  option_texts text[];
  option_texts_en text[];
  new_options jsonb;
  new_options_en jsonb;
  temp_text text;
  temp_text_en text;
  
  -- Array de posições para seleção balanceada
  available_positions text[] := ARRAY['a', 'b', 'c', 'd'];
  position_weights integer[] := ARRAY[0, 0, 0, 0]; -- Peso baseado na necessidade
  selected_position_index integer;
  
BEGIN
  -- Criar backup antes de iniciar
  PERFORM backup_quiz_questions();
  
  -- Calcular total de questões e alvos globais
  SELECT COUNT(*) INTO total_questions FROM quiz_questions;
  
  target_a := total_questions / 4;
  target_b := total_questions / 4;
  target_c := total_questions / 4;
  target_d := total_questions - (target_a + target_b + target_c);
  
  global_targets := jsonb_build_object(
    'target_a', target_a,
    'target_b', target_b,
    'target_c', target_c,
    'target_d', target_d
  );
  
  RAISE NOTICE 'Iniciando rebalanceamento global. Total: % questões, Alvos: A=%, B=%, C=%, D=%', 
    total_questions, target_a, target_b, target_c, target_d;
  
  -- Primeira passada: embaralhar questões para processamento aleatório
  -- Processar questões em ordem aleatória para melhor distribuição
  FOR question_record IN 
    SELECT * FROM quiz_questions 
    ORDER BY RANDOM()
  LOOP
    questions_processed := questions_processed + 1;
    should_change := false;
    new_position := question_record.correct_answer;
    
    -- Validar integridade dos dados
    IF question_record.options IS NULL OR jsonb_array_length(question_record.options) != 4 THEN
      RAISE WARNING 'Questão ID % tem dados inválidos (options), pulando...', question_record.id;
      CONTINUE;
    END IF;
    
    IF question_record.options_en IS NULL OR jsonb_array_length(question_record.options_en) != 4 THEN
      RAISE WARNING 'Questão ID % tem dados inválidos (options_en), pulando...', question_record.id;
      CONTINUE;
    END IF;
    
    -- Calcular pesos para cada posição baseado na necessidade atual
    position_weights[1] := GREATEST(0, target_a - global_a_count); -- 'a'
    position_weights[2] := GREATEST(0, target_b - global_b_count); -- 'b'
    position_weights[3] := GREATEST(0, target_c - global_c_count); -- 'c'
    position_weights[4] := GREATEST(0, target_d - global_d_count); -- 'd'
    
    -- Verificar se precisa mudar posição atual
    CASE question_record.correct_answer
      WHEN 'a' THEN
        IF global_a_count >= target_a AND (position_weights[2] > 0 OR position_weights[3] > 0 OR position_weights[4] > 0) THEN
          should_change := true;
        END IF;
      WHEN 'b' THEN
        IF global_b_count >= target_b AND (position_weights[1] > 0 OR position_weights[3] > 0 OR position_weights[4] > 0) THEN
          should_change := true;
        END IF;
      WHEN 'c' THEN
        IF global_c_count >= target_c AND (position_weights[1] > 0 OR position_weights[2] > 0 OR position_weights[4] > 0) THEN
          should_change := true;
        END IF;
      WHEN 'd' THEN
        IF global_d_count >= target_d AND (position_weights[1] > 0 OR position_weights[2] > 0 OR position_weights[3] > 0) THEN
          should_change := true;
        END IF;
    END CASE;
    
    -- Se precisa mudar, selecionar melhor posição disponível
    IF should_change THEN
      -- Encontrar posição com maior peso (maior necessidade)
      selected_position_index := 1;
      FOR i IN 2..4 LOOP
        IF position_weights[i] > position_weights[selected_position_index] THEN
          selected_position_index := i;
        END IF;
      END LOOP;
      
      -- Se há posições com necessidade, usar a de maior peso
      IF position_weights[selected_position_index] > 0 THEN
        new_position := available_positions[selected_position_index];
        
        -- Extrair textos das opções atuais
        option_texts := ARRAY[
          question_record.options->0->>'text',
          question_record.options->1->>'text',
          question_record.options->2->>'text',
          question_record.options->3->>'text'
        ];
        
        option_texts_en := ARRAY[
          question_record.options_en->0->>'text',
          question_record.options_en->1->>'text',
          question_record.options_en->2->>'text',
          question_record.options_en->3->>'text'
        ];
        
        -- Identificar resposta correta atual
        CASE question_record.correct_answer
          WHEN 'a' THEN 
            correct_answer_text := option_texts[1];
            correct_answer_text_en := option_texts_en[1];
          WHEN 'b' THEN 
            correct_answer_text := option_texts[2];
            correct_answer_text_en := option_texts_en[2];
          WHEN 'c' THEN 
            correct_answer_text := option_texts[3];
            correct_answer_text_en := option_texts_en[3];
          WHEN 'd' THEN 
            correct_answer_text := option_texts[4];
            correct_answer_text_en := option_texts_en[4];
        END CASE;
        
        -- Mover resposta correta para nova posição
        CASE new_position
          WHEN 'a' THEN
            -- Trocar posição atual com 'a'
            temp_text := option_texts[1];
            temp_text_en := option_texts_en[1];
            option_texts[1] := correct_answer_text;
            option_texts_en[1] := correct_answer_text_en;
            
            CASE question_record.correct_answer
              WHEN 'b' THEN option_texts[2] := temp_text; option_texts_en[2] := temp_text_en;
              WHEN 'c' THEN option_texts[3] := temp_text; option_texts_en[3] := temp_text_en;
              WHEN 'd' THEN option_texts[4] := temp_text; option_texts_en[4] := temp_text_en;
            END CASE;
            
          WHEN 'b' THEN
            temp_text := option_texts[2];
            temp_text_en := option_texts_en[2];
            option_texts[2] := correct_answer_text;
            option_texts_en[2] := correct_answer_text_en;
            
            CASE question_record.correct_answer
              WHEN 'a' THEN option_texts[1] := temp_text; option_texts_en[1] := temp_text_en;
              WHEN 'c' THEN option_texts[3] := temp_text; option_texts_en[3] := temp_text_en;
              WHEN 'd' THEN option_texts[4] := temp_text; option_texts_en[4] := temp_text_en;
            END CASE;
            
          WHEN 'c' THEN
            temp_text := option_texts[3];
            temp_text_en := option_texts_en[3];
            option_texts[3] := correct_answer_text;
            option_texts_en[3] := correct_answer_text_en;
            
            CASE question_record.correct_answer
              WHEN 'a' THEN option_texts[1] := temp_text; option_texts_en[1] := temp_text_en;
              WHEN 'b' THEN option_texts[2] := temp_text; option_texts_en[2] := temp_text_en;
              WHEN 'd' THEN option_texts[4] := temp_text; option_texts_en[4] := temp_text_en;
            END CASE;
            
          WHEN 'd' THEN
            temp_text := option_texts[4];
            temp_text_en := option_texts_en[4];
            option_texts[4] := correct_answer_text;
            option_texts_en[4] := correct_answer_text_en;
            
            CASE question_record.correct_answer
              WHEN 'a' THEN option_texts[1] := temp_text; option_texts_en[1] := temp_text_en;
              WHEN 'b' THEN option_texts[2] := temp_text; option_texts_en[2] := temp_text_en;
              WHEN 'c' THEN option_texts[3] := temp_text; option_texts_en[3] := temp_text_en;
            END CASE;
        END CASE;
        
        -- Reconstruir JSONs das opções
        new_options := jsonb_build_array(
          jsonb_build_object('id', 'a', 'text', option_texts[1]),
          jsonb_build_object('id', 'b', 'text', option_texts[2]),
          jsonb_build_object('id', 'c', 'text', option_texts[3]),
          jsonb_build_object('id', 'd', 'text', option_texts[4])
        );
        
        new_options_en := jsonb_build_array(
          jsonb_build_object('id', 'a', 'text', option_texts_en[1]),
          jsonb_build_object('id', 'b', 'text', option_texts_en[2]),
          jsonb_build_object('id', 'c', 'text', option_texts_en[3]),
          jsonb_build_object('id', 'd', 'text', option_texts_en[4])
        );
        
        -- Atualizar questão
        UPDATE quiz_questions 
        SET 
          correct_answer = new_position,
          options = new_options,
          options_en = new_options_en,
          updated_at = now()
        WHERE id = question_record.id;
        
        questions_changed := questions_changed + 1;
        
        RAISE NOTICE 'Questão ID % (categoria %): % -> % (necessidade: A=%, B=%, C=%, D=%)', 
          question_record.id, question_record.category_id, 
          question_record.correct_answer, new_position,
          position_weights[1], position_weights[2], position_weights[3], position_weights[4];
      ELSE
        -- Não há posições com necessidade, manter atual
        new_position := question_record.correct_answer;
      END IF;
    END IF;
    
    -- Atualizar contadores globais
    CASE new_position
      WHEN 'a' THEN global_a_count := global_a_count + 1;
      WHEN 'b' THEN global_b_count := global_b_count + 1;
      WHEN 'c' THEN global_c_count := global_c_count + 1;
      WHEN 'd' THEN global_d_count := global_d_count + 1;
    END CASE;
    
  END LOOP;
  
  -- Processar estatísticas por categoria para o retorno
  FOR category_record IN 
    SELECT 
      category_id,
      COUNT(*) as total_in_category,
      COUNT(*) FILTER (WHERE correct_answer = 'a') as cat_a,
      COUNT(*) FILTER (WHERE correct_answer = 'b') as cat_b,
      COUNT(*) FILTER (WHERE correct_answer = 'c') as cat_c,
      COUNT(*) FILTER (WHERE correct_answer = 'd') as cat_d
    FROM quiz_questions 
    GROUP BY category_id 
    ORDER BY category_id
  LOOP
    category_progress := category_progress || jsonb_build_object(
      category_record.category_id, jsonb_build_object(
        'total', category_record.total_in_category,
        'a_count', category_record.cat_a,
        'b_count', category_record.cat_b,
        'c_count', category_record.cat_c,
        'd_count', category_record.cat_d
      )
    );
    
    RETURN QUERY SELECT 
      category_record.category_id::text,
      category_record.total_in_category::integer,
      CASE 
        WHEN current_category = category_record.category_id THEN questions_changed
        ELSE 0
      END::integer,
      jsonb_build_object(
        'distribution', jsonb_build_object(
          'a', category_record.cat_a,
          'b', category_record.cat_b,
          'c', category_record.cat_c,
          'd', category_record.cat_d
        ),
        'targets', jsonb_build_object(
          'a', category_record.total_in_category / 4,
          'b', category_record.total_in_category / 4,
          'c', category_record.total_in_category / 4,
          'd', category_record.total_in_category - (category_record.total_in_category / 4 * 3)
        )
      );
  END LOOP;
  
  -- Adicionar sumário global
  RETURN QUERY SELECT 
    'GLOBAL_SUMMARY'::text,
    total_questions,
    questions_changed,
    jsonb_build_object(
      'final_distribution', jsonb_build_object(
        'a', global_a_count,
        'b', global_b_count,
        'c', global_c_count,
        'd', global_d_count
      ),
      'targets', global_targets,
      'questions_processed', questions_processed,
      'questions_changed', questions_changed,
      'success_rate', ROUND((questions_changed::numeric / questions_processed::numeric) * 100, 2)
    );
    
  RAISE NOTICE 'Rebalanceamento concluído. Processadas: %, Alteradas: %, Distribuição final: A=%, B=%, C=%, D=%', 
    questions_processed, questions_changed, global_a_count, global_b_count, global_c_count, global_d_count;
END;
$function$;