
-- Add missing English translation fields to quiz_questions table
ALTER TABLE quiz_questions 
ADD COLUMN question_en TEXT,
ADD COLUMN options_en JSONB,
ADD COLUMN explanation_en TEXT;

-- Add language column to quiz_attempts table
ALTER TABLE quiz_attempts 
ADD COLUMN language TEXT DEFAULT 'pt';

-- Set default language for existing attempts
UPDATE quiz_attempts 
SET language = 'pt' 
WHERE language IS NULL;
