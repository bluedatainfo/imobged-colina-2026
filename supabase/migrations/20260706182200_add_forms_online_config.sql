-- Add forms_online configuration to module_settings in app_settings
UPDATE public.app_settings
SET module_settings = COALESCE(module_settings, '{}'::jsonb) || jsonb_build_object(
  'forms_online', COALESCE(COALESCE(module_settings, '{}'::jsonb)->'forms_online', '{}'::jsonb) || jsonb_build_object(
    'pf_sheet_name', 'Sheet1'
  )
)
WHERE NOT COALESCE(COALESCE(module_settings, '{}'::jsonb)->'forms_online', '{}'::jsonb) ? 'pf_sheet_name';
