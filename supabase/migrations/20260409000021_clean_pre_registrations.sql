-- Limpeza de dados mockados da tabela pre_registrations para testes oficiais
DO $$
BEGIN
  DELETE FROM public.pre_registrations;
END $$;
