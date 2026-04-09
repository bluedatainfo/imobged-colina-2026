INSERT INTO public.sharepoint_configs (document_type, site_name, library_name, base_path)
VALUES ('LEASES', 'locacao', 'Documentos Compartilhados', 'Imoveis')
ON CONFLICT (document_type) DO NOTHING;
