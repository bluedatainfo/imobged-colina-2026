-- Create sequences for each category
CREATE SEQUENCE IF NOT EXISTS public.pre_registrations_pf_code_seq START 1;
CREATE SEQUENCE IF NOT EXISTS public.pre_registrations_pj_code_seq START 1;
CREATE SEQUENCE IF NOT EXISTS public.pre_registrations_fiador_code_seq START 1;

-- Update the function to use category-specific sequences and prefixes
CREATE OR REPLACE FUNCTION public.set_pre_registrations_code()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.code IS NULL THEN
    IF NEW.category = 'PJ' THEN
      NEW.code := 'InJ' || LPAD(nextval('public.pre_registrations_pj_code_seq')::text, 5, '0');
    ELSIF NEW.category = 'Fiador' THEN
      NEW.code := 'Fia' || LPAD(nextval('public.pre_registrations_fiador_code_seq')::text, 5, '0');
    ELSE
      -- Default to PF
      NEW.code := 'InF' || LPAD(nextval('public.pre_registrations_pf_code_seq')::text, 5, '0');
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;
