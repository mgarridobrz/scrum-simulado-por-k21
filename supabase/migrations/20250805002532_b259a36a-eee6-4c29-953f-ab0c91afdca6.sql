-- Ensure backup table exists and fix permissions
DROP TABLE IF EXISTS quiz_questions_backup;
CREATE TABLE quiz_questions_backup AS 
SELECT * FROM quiz_questions WHERE FALSE; -- Create structure only

-- Enable RLS on backup table
ALTER TABLE quiz_questions_backup ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users (since this is a backup table)
CREATE POLICY "Allow all operations on quiz_questions_backup" ON quiz_questions_backup
FOR ALL USING (true) WITH CHECK (true);