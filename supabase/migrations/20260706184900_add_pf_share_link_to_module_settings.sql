-- Add pf_share_link to forms_online config in module_settings
-- This stores the direct SharePoint sharing link for the Pessoa Física Excel file
UPDATE public.app_settings
SET module_settings = jsonb_set(
    COALESCE(module_settings, '{}'::jsonb),
    '{forms_online}',
    COALESCE(module_settings->'forms_online', '{}'::jsonb) || jsonb_build_object(
        'pf_share_link', 'https://ismailabdo-my.sharepoint.com/:x:/g/personal/administracao_imobiliariacolina_com_br/IQAhJ40nkv8qT4sJgvSRuZewAZZfmbnW1eYpXf12tbKU4t0'
    )
)
WHERE NOT COALESCE(COALESCE(module_settings, '{}'::jsonb)->'forms_online', '{}'::jsonb) ? 'pf_share_link';
