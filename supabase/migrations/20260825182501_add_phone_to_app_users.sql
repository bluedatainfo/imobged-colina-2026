-- Migration to add phone column to app_users table
ALTER TABLE public.app_users
ADD COLUMN IF NOT EXISTS phone TEXT;
