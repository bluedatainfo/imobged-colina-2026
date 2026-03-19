-- This migration updates the app_settings table to include default RBAC configuration if not present
UPDATE public.app_settings
SET role_settings = jsonb_set(
  COALESCE(role_settings, '{}'::jsonb),
  '{rbac}',
  '{"Admin": ["all"], "Diretor": ["all"], "Gerente": ["/", "/entities", "/documents", "/document-alerts", "/sync-monitor", "/manager-approval", "/inspections", "/keys", "/contracts", "/properties", "/maintenance", "/renewals", "/legal", "/profile"], "Vistoriador": ["/", "/properties", "/inspections", "/keys", "/profile"], "Jurídico": ["/", "/documents", "/document-alerts", "/contracts", "/properties", "/legal", "/profile"], "Financeiro": ["/", "/entities", "/documents", "/document-alerts", "/properties", "/renewals", "/maintenance", "/profile"], "Gestor de Contrato": ["/", "/manager-approval", "/contracts", "/documents", "/document-alerts", "/properties", "/inspections", "/renewals", "/keys", "/entities", "/profile"], "Corretor": ["/", "/properties", "/profile"]}'::jsonb
)
WHERE role_settings->'rbac' IS NULL;
