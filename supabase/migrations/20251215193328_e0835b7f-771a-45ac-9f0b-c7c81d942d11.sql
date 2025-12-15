-- Allow NULL category_id for themes without categories
ALTER TABLE quiz_questions ALTER COLUMN category_id DROP NOT NULL;