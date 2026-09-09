-- Adiciona campos de auditoria de edicao para pre_registrations
ALTER TABLE public.pre_registrations
  ADD COLUMN IF NOT EXISTS edited_by TEXT NULL,
  ADD COLUMN IF NOT EXISTS edited_at TIMESTAMPTZ NULL;
