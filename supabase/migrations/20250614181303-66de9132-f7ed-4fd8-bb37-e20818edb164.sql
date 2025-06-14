
-- Add English translation columns to quiz_questions table
ALTER TABLE quiz_questions 
ADD COLUMN question_en TEXT,
ADD COLUMN explanation_en TEXT,
ADD COLUMN options_en JSONB;

-- Add language column to quiz_attempts table
ALTER TABLE quiz_attempts 
ADD COLUMN language TEXT NOT NULL DEFAULT 'pt';

-- Update existing attempts to have Portuguese as default language
UPDATE quiz_attempts SET language = 'pt' WHERE language IS NULL;
