
-- Create a DELETE policy for the quiz_attempts table
-- This allows DELETE operations on quiz attempts (no authentication required for this admin feature)
CREATE POLICY "Allow delete quiz attempts" ON quiz_attempts FOR DELETE USING (true);
