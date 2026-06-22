CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION public.search_owners_unified(search_term text)
RETURNS TABLE (
  id text,
  code text,
  full_name text,
  source text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id::text, 
    o.code, 
    o.full_name, 
    'Novo'::text AS source
  FROM public.owners o
  WHERE unaccent(o.full_name) ILIKE unaccent('%' || search_term || '%')
     OR unaccent(o.code) ILIKE unaccent('%' || search_term || '%')
     
  UNION ALL
  
  SELECT 
    p.id::text, 
    p.code, 
    p.full_name, 
    'Candidato'::text AS source
  FROM public.pre_registrations p
  WHERE p.category = 'PF' 
    AND (unaccent(p.full_name) ILIKE unaccent('%' || search_term || '%')
         OR unaccent(p.code) ILIKE unaccent('%' || search_term || '%'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
