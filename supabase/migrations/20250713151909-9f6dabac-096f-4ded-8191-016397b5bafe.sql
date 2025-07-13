-- Create a secure authentication table for restricted areas
CREATE TABLE public.restricted_access_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.restricted_access_tokens ENABLE ROW LEVEL SECURITY;

-- Create policy that only allows system functions to access
CREATE POLICY "System can manage tokens" ON public.restricted_access_tokens
FOR ALL USING (false); -- No direct access via RLS

-- Insert a secure token hash for the validation area
-- This uses SHA-256 hash of "CSM2024!Secure" as a more secure password
INSERT INTO public.restricted_access_tokens (token_hash, description)
VALUES (
  encode(sha256('CSM2024!Secure'::bytea), 'hex'),
  'Question validation area access token'
);

-- Function to validate access tokens
CREATE OR REPLACE FUNCTION public.validate_restricted_access(input_password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  input_hash TEXT;
  token_exists BOOLEAN := FALSE;
BEGIN
  -- Generate hash of input password
  input_hash := encode(sha256(input_password::bytea), 'hex');
  
  -- Check if hash exists and is active
  SELECT EXISTS (
    SELECT 1 FROM public.restricted_access_tokens 
    WHERE token_hash = input_hash 
    AND is_active = true 
    AND (expires_at IS NULL OR expires_at > now())
  ) INTO token_exists;
  
  RETURN token_exists;
END;
$$;