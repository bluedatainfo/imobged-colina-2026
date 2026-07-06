-- Set specific default file name for Pessoa Física to avoid fallback issues
UPDATE public.app_settings
SET module_settings = jsonb_set(
    COALESCE(module_settings, '{}'::jsonb),
    '{forms_online}',
    COALESCE(module_settings->'forms_online', '{}'::jsonb) || jsonb_build_object(
        'pf_file_name', 'FICHA CADASTRAL DE LOCATÁRIOS(PESSOA FÍSICA).xlsx',
        'pf_sheet_name', 'Sheet1'
    )
);
