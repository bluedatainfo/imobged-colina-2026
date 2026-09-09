-- Migration: permitir inserção anônima em pre_registrations para formulários públicos nativos
-- Sem permissão de SELECT para anon (apenas authenticated pode ler os dados)

DROP POLICY IF EXISTS "anon_insert_pre_registrations" ON public.pre_registrations;
CREATE POLICY "anon_insert_pre_registrations" ON public.pre_registrations
  FOR INSERT TO anon WITH CHECK (true);
