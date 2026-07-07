-- Add PJ and Fiador share links to forms_online config in module_settings
-- Also ensures the bluedata auth user exists (idempotent)
-- Idempotent: safe to run multiple times

-- Ensure auth seed user exists
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'bluedata@bluedatainfo.com.br') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'bluedata@bluedatainfo.com.br',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Blue Data"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL, '', '', ''
    );
  END IF;
END $$;

-- Update forms_online config with PJ and Fiador share links
UPDATE public.app_settings
SET module_settings = jsonb_set(
    COALESCE(module_settings, '{}'::jsonb),
    '{forms_online}',
    COALESCE(module_settings->'forms_online', '{}'::jsonb) || jsonb_build_object(
        'pj_share_link', 'https://ismailabdo-my.sharepoint.com/:x:/g/personal/administracao_imobiliariacolina_com_br/IQAT9UmgoolmQ4EcIbJiV8x8AQd1xq1BJnnZtCjl_X0WsPQ?email=atendimento%40imobiliariacolina.com.br&e=FMmWZV',
        'pj_sheet_name', 'Sheet1',
        'fiador_share_link', 'https://ismailabdo-my.sharepoint.com/:x:/g/personal/administracao_imobiliariacolina_com_br/IQCKRicBpceqQ54zWsxSxfLmAddiVsgLQ8lRCM9JS9mJqPw?email=atendimento%40imobiliariacolina.com.br&e=SAfM0J',
        'fiador_sheet_name', 'Sheet1'
    )
),
updated_at = NOW();
