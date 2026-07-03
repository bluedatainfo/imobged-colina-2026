-- Add default creator_email to module_settings in app_settings
UPDATE public.app_settings
SET module_settings = COALESCE(module_settings, '{}'::jsonb) || jsonb_build_object('creator_email', 'administracao@imobiliariacolina.com.br')
WHERE NOT COALESCE(module_settings, '{}'::jsonb) ? 'creator_email';
