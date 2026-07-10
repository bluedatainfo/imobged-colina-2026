-- Update the PF share link to remove the ?e=HPD0RS query parameter
-- This ensures the exact URL is used as specified in the configuration
UPDATE public.app_settings
SET module_settings = jsonb_set(
    COALESCE(module_settings, '{}'::jsonb),
    '{forms_online}',
    COALESCE(COALESCE(module_settings, '{}'::jsonb)->'forms_online', '{}'::jsonb) || jsonb_build_object(
        'pf_share_link', 'https://ismailabdo-my.sharepoint.com/:x:/g/personal/administracao_imobiliariacolina_com_br/IQBNKTCco7MNQ52u0sOI-ypSAZObr3fn7lVuv_RbWiZ94Dg'
    )
),
updated_at = NOW();
