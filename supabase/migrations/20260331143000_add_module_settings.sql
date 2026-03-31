-- Add module_settings column to app_settings if it doesn't exist
ALTER TABLE public.app_settings ADD COLUMN IF NOT EXISTS module_settings JSONB DEFAULT '{}'::jsonb;
