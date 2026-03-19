DO $$ 
BEGIN
  -- Insert the new types if they don't exist
  INSERT INTO public.sharepoint_configs (document_type, site_name, library_name, base_path) 
  VALUES 
    ('CONTRACT_ACTIVE', 'locacao', 'Contratos Ativos', 'Contratos'),
    ('CONTRACT_TERMINATED', 'locacao', 'Arquivo Morto', 'Contratos/Encerrados'),
    ('INSPECTION_MOVE_IN', 'locacao', 'Vistorias', 'Entrada'),
    ('INSPECTION_MOVE_OUT', 'locacao', 'Vistorias', 'Saida'),
    ('OWNER_DOCUMENT', 'captacao', 'Doc Proprietarios', 'Documentos'),
    ('TENANT_DOCUMENT', 'locacao', 'Doc Inquilinos', 'Documentos')
  ON CONFLICT (document_type) DO NOTHING;

  -- Remove the old types if they are no longer needed
  DELETE FROM public.sharepoint_configs WHERE document_type IN (
    'active_contract', 'closed_contract', 'entry_inspection', 'exit_inspection', 'owner_doc', 'tenant_doc'
  );
END $$;
