-- Add menu_order column to app_settings table
ALTER TABLE public.app_settings ADD COLUMN IF NOT EXISTS menu_order JSONB DEFAULT '{}'::jsonb;
