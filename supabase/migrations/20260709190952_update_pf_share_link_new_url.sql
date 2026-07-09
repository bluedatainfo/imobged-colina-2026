-- Update the SharePoint share link for Pessoa Física (PF) in forms_online config
-- Sets the new corrected URL for the PF Excel file
-- Idempotent: safe to run multiple times, always sets the correct value
UPDATE public.app_settings
SET module_settings = jsonb_set(
    COALESCE(module_settings, '{}'::jsonb),
    '{forms_online}',
    COALESCE(COALESCE(module_settings, '{}'::jsonb)->'forms_online', '{}'::jsonb) || jsonb_build_object(
        'pf_share_link', 'https://ismailabdo-my.sharepoint.com/:x:/g/personal/administracao_imobiliariacolina_com_br/IQBNKTCco7MNQ52u0sOI-ypSAZObr3fn7lVuv_RbWiZ94Dg?e=HPD0RS'
    )
),
updated_at = NOW();
