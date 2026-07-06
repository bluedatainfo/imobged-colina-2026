-- Update the SharePoint share link for Pessoa Física (PF) in forms_online config
-- Replaces the old URL (ending in ...ZfmbnW1eYpXf12tbKU4t0) with the new URL
-- Idempotent: safe to run multiple times, always sets the correct value
UPDATE public.app_settings
SET module_settings = jsonb_set(
    COALESCE(module_settings, '{}'::jsonb),
    '{forms_online}',
    COALESCE(COALESCE(module_settings, '{}'::jsonb)->'forms_online', '{}'::jsonb) || jsonb_build_object(
        'pf_share_link', 'https://ismailabdo-my.sharepoint.com/:x:/g/personal/administracao_imobiliariacolina_com_br/IQAhJ40nkv8qT4sJgvSRuZewAYYEMOitJr9sSH_bhworDdk?e=DD0wnm'
    )
),
updated_at = NOW();
