-- Migration: 20260821010000_add_approval_notes.sql
-- Description: Add approval_notes column to pre_registrations table

ALTER TABLE public.pre_registrations ADD COLUMN IF NOT EXISTS approval_notes TEXT;
