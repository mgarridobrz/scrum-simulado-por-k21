-- Update the restricted access password to 120703
-- First, deactivate any existing tokens
UPDATE public.restricted_access_tokens 
SET is_active = false 
WHERE is_active = true;

-- Insert the new password hash for "120703"
INSERT INTO public.restricted_access_tokens (token_hash, is_active, expires_at)
VALUES (
  encode(sha256('120703'::bytea), 'hex'),
  true,
  NULL
)
ON CONFLICT (token_hash) 
DO UPDATE SET 
  is_active = true,
  expires_at = NULL;