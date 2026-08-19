-- Adiciona a coluna `operator` (TEXT, nullable) às tabelas que precisam
-- rastrear qual operador humano realizou uma ação. O operador é definido
-- em tempo de execução no cliente (sessionStorage.currentOperator) e enviado
-- apenas em operações de INSERT/UPDATE relevantes — contas sem operadores
-- cadastrados continuam gravando NULL, mantendo o comportamento anterior.
-- As colunas são nullable para não quebrar inserts existentes que não
-- preveem o campo.

ALTER TABLE public.property_documents
  ADD COLUMN IF NOT EXISTS operator TEXT;

ALTER TABLE public.pre_registrations
  ADD COLUMN IF NOT EXISTS operator TEXT;

ALTER TABLE public.app_audit_logs
  ADD COLUMN IF NOT EXISTS operator TEXT;

COMMENT ON COLUMN public.property_documents.operator IS
  'Operador humano (sessionStorage.currentOperator) que adicionou/atualizou o documento. NULL quando a conta não usa seleção de operador.';
COMMENT ON COLUMN public.pre_registrations.operator IS
  'Operador humano (sessionStorage.currentOperator) que cadastrou/analisou o interessado ou registrou/resolveu pendência. NULL quando a conta não usa seleção de operador.';
COMMENT ON COLUMN public.app_audit_logs.operator IS
  'Operador humano (sessionStorage.currentOperator) que originou a ação de auditoria. NULL quando a conta não usa seleção de operador.';
