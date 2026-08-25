-- Migration to add rejection_notes column to pre_registrations table
ALTER TABLE public.pre_registrations
ADD COLUMN IF NOT EXISTS rejection_notes TEXT;
