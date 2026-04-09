DO $$
BEGIN
  INSERT INTO public.sharepoint_configs (document_type, site_name, library_name, base_path)
  VALUES ('GUARANTEE_DOCUMENT', 'locacao', 'Documentos Compartilhados', 'Garantias')
  ON CONFLICT (document_type) DO NOTHING;
END $$;
