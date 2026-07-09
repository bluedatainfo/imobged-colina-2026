-- Ensure unique index on pre_registrations.code for upsert operations from Forms Online sync
CREATE UNIQUE INDEX IF NOT EXISTS pre_registrations_code_idx ON public.pre_registrations (code);
