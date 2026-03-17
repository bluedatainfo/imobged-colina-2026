-- Set default role for new users
ALTER TABLE public.app_users ALTER COLUMN role SET DEFAULT 'Vistoriador';

-- Ensure RLS is enabled and accessible for authenticated users
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_audit_logs ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'app_users' AND policyname = 'authenticated_all_app_users'
  ) THEN
    CREATE POLICY "authenticated_all_app_users" ON public.app_users FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'app_settings' AND policyname = 'authenticated_all_app_settings'
  ) THEN
    CREATE POLICY "authenticated_all_app_settings" ON public.app_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'app_audit_logs' AND policyname = 'authenticated_all_app_audit_logs'
  ) THEN
    CREATE POLICY "authenticated_all_app_audit_logs" ON public.app_audit_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;
