DO $$ 
BEGIN
  INSERT INTO public.owners (code, full_name, cpf, rg, full_address)
  VALUES
      ('PROP-001', 'Carlos Mendes', '123.456.789-00', '12.345.678-9', 'Av. Paulista, 1000 - São Paulo, SP'),
      ('PROP-002', 'Fernanda Lima', '987.654.321-11', '98.765.432-1', 'Rua Augusta, 500 - São Paulo, SP')
  ON CONFLICT (code) DO NOTHING;

  INSERT INTO public.tenants (code, full_name, cpf, rg, full_address)
  VALUES
      ('INQ-001', 'João Pedro', '111.222.333-44', '11.222.333-4', 'Av. Brigadeiro Faria Lima, 200 - São Paulo, SP'),
      ('INQ-002', 'Maria Souza', '555.666.777-88', '55.666.777-8', 'Rua da Consolação, 300 - São Paulo, SP')
  ON CONFLICT (code) DO NOTHING;
END $$;
