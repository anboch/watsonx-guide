-- Create confidentiality level enum
CREATE TYPE public.confidentiality_level AS ENUM ('public', 'internal', 'confidential', 'restricted');

-- Create auth audit logs table
CREATE TABLE public.auth_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  email TEXT,
  ip_address TEXT,
  user_agent TEXT,
  success BOOLEAN NOT NULL,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on auth_logs
ALTER TABLE public.auth_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view auth logs
CREATE POLICY "Admins can view auth logs"
  ON public.auth_logs
  FOR SELECT
  USING (false); -- Will update this when we add admin roles

-- Create rate limit tracking table for chatbot
CREATE TABLE public.chat_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier TEXT NOT NULL, -- IP or user_id
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_identifier)
);

-- Enable RLS
ALTER TABLE public.chat_rate_limits ENABLE ROW LEVEL SECURITY;

-- Users can only see their own rate limit data
CREATE POLICY "Users can view own rate limits"
  ON public.chat_rate_limits
  FOR SELECT
  USING (user_identifier = auth.uid()::text);

-- Function to clean up old rate limit entries (older than 1 hour)
CREATE OR REPLACE FUNCTION clean_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.chat_rate_limits
  WHERE window_start < NOW() - INTERVAL '1 hour';
END;
$$;

-- Create index for faster lookups
CREATE INDEX idx_auth_logs_user_id ON public.auth_logs(user_id);
CREATE INDEX idx_auth_logs_created_at ON public.auth_logs(created_at);
CREATE INDEX idx_chat_rate_limits_identifier ON public.chat_rate_limits(user_identifier);
CREATE INDEX idx_chat_rate_limits_window ON public.chat_rate_limits(window_start);