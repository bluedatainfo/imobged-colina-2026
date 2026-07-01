CREATE SEQUENCE IF NOT EXISTS public.owners_pro_code_seq START 1;

CREATE OR REPLACE FUNCTION public.generate_owner_pro_code()
RETURNS TEXT AS $$
BEGIN
  RETURN 'PRO' || LPAD(nextval('public.owners_pro_code_seq')::text, 6, '0');
END;
$$ LANGUAGE plpgsql;
