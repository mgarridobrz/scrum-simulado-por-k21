
-- Step 1: Remove all existing English translations from all quiz questions

UPDATE quiz_questions
SET
  question_en = NULL,
  explanation_en = NULL,
  options_en = NULL;
