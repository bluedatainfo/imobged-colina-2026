-- This migration ensures the cpf column exists on the owners table,
-- to support collecting the owner's CPF during the new property registration.
ALTER TABLE public.owners ADD COLUMN IF NOT EXISTS cpf text;
