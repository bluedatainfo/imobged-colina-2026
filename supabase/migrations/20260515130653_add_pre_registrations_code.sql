ALTER TABLE public.pre_registrations ADD COLUMN IF NOT EXISTS code TEXT;

CREATE SEQUENCE IF NOT EXISTS pre_registrations_code_seq START 1;

CREATE OR REPLACE FUNCTION public.set_pre_registrations_code()
RETURNS trigger AS $function$
BEGIN
  IF NEW.code IS NULL THEN
    NEW.code := 'IN' || LPAD(nextval('pre_registrations_code_seq')::text, 5, '0');
  END IF;
  RETURN NEW;
END;
$function$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_pre_registrations_code ON public.pre_registrations;
CREATE TRIGGER trg_pre_registrations_code
  BEFORE INSERT ON public.pre_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.set_pre_registrations_code();

-- Generate code for any existing rows
DO $do$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN SELECT id FROM public.pre_registrations WHERE code IS NULL
  LOOP
    UPDATE public.pre_registrations 
    SET code = 'IN' || LPAD(nextval('pre_registrations_code_seq')::text, 5, '0')
    WHERE id = rec.id;
  END LOOP;
END;
$do$;

-- Safe check to ensure we can make the column NOT NULL
DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.pre_registrations WHERE code IS NULL) THEN
    ALTER TABLE public.pre_registrations ALTER COLUMN code SET NOT NULL;
  END IF;
END;
$do$;

CREATE UNIQUE INDEX IF NOT EXISTS pre_registrations_code_idx ON public.pre_registrations (code);
