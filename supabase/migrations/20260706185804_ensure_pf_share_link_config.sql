-- Ensure forms_online PF share link and worksheet name are configured in app_settings
-- Idempotent: safe to run multiple times, always sets the correct values
UPDATE public.app_settings
SET module_settings = jsonb_set(
    COALESCE(module_settings, '{}'::jsonb),
    '{forms_online}',
    COALESCE(module_settings->'forms_online', '{}'::jsonb) || jsonb_build_object(
        'pf_share_link', 'https://ismailabdo-my.sharepoint.com/:x:/g/personal/administracao_imobiliariacolina_com_br/IQAhJ40nkv8qT4sJgvSRuZewAZZfmbnW1eYpXf12tbKU4t0',
        'pf_sheet_name', 'Sheet1'
    )
);
