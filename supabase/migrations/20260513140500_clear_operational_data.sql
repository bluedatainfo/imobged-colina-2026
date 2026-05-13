DO $$
BEGIN
  -- Limpeza das tabelas operacionais do banco para início em produção.
  -- A ordem de deleção respeita as chaves estrangeiras.
  
  DELETE FROM public.maintenance;
  DELETE FROM public.key_control;
  DELETE FROM public.inspections;
  DELETE FROM public.property_documents;
  DELETE FROM public.contracts;
  DELETE FROM public.app_audit_logs;
  DELETE FROM public.properties;
  DELETE FROM public.owners;
  DELETE FROM public.tenants;
  DELETE FROM public.pre_registrations;
  
  -- app_users, app_settings, sharepoint_configs e document_templates foram mantidas 
  -- para preservar configurações, acessos e templates.
END $$;
