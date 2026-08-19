import { supabase } from '@/lib/supabase/client'

/**
 * Seletor de Operador.
 *
 * Um "operador" é um nome humano (ex.: "Ana", "Bruno") associado a uma conta
 * M365. Quando uma conta tem operadores cadastrados, o sistema exige a escolha
 * de qual operador está usando o sistema logo após o login; a escolha fica em
 * `sessionStorage.currentOperator` e é gravada na coluna `operator` das
 * tabelas rastreadas (property_documents, pre_registrations, app_audit_logs).
 *
 * Contas sem operadores cadastrados seguem o fluxo normal — nenhum selo é
 * exibido no header e nenhum operador é gravado (NULL).
 *
 * A lista de operadores de cada conta é armazenada em `app_settings` (na
 * primeira linha, a mais recente) dentro do JSONB `module_settings`, sob a
 * chave `operators_{email}` (ex.: `operators_atendimento@imobiliariacolina.com.br`),
 * com valor sendo um JSON array de strings: `["Ana", "Bruno", "Carla"]`.
 */

const OPERATOR_STORAGE_KEY = 'currentOperator'

/** Lê o operador atual escolhido nesta sessão (ou null). */
export function getCurrentOperator(): string | null {
  try {
    return sessionStorage.getItem(OPERATOR_STORAGE_KEY)
  } catch {
    return null
  }
}

/** Define o operador atual desta sessão (usado ao escolher no modal/header). */
export function setCurrentOperator(name: string | null): void {
  try {
    if (name) {
      sessionStorage.setItem(OPERATOR_STORAGE_KEY, name)
    } else {
      sessionStorage.removeItem(OPERATOR_STORAGE_KEY)
    }
    // Avisa componentes (ex.: selo do header) que o operador mudou.
    window.dispatchEvent(new Event('operator:change'))
  } catch {
    // sessionStorage pode estar indisponível (modo privado); ignora silenciosamente.
  }
}

/** Limpa o operador atual (chamado no logout). */
export function clearCurrentOperator(): void {
  setCurrentOperator(null)
}

/**
 * Retorna o valor a ser gravado na coluna `operator`:
 * o operador atual da sessão, se existir; caso contrário null.
 * (A especificação permite, como fallback, gravar o email do usuário M365,
 * mas para evitar misturar semânticas entre contas com/sem operadores, optamos
 * por gravar NULL quando não há operador — contas sem operadores continuam
 * com comportamento idêntico ao anterior.)
 */
export function resolveOperatorForPersistence(): string | null {
  return getCurrentOperator()
}

/** Obtém a settings row mais recente do app_settings (ou null). */
async function getSettingsRow(): Promise<{
  id: string
  module_settings: Record<string, unknown> | null
} | null> {
  const { data, error } = await supabase
    .from('app_settings')
    .select('id, module_settings')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('Failed to load app_settings for operators', error)
    return null
  }
  return data as { id: string; module_settings: Record<string, unknown> | null } | null
}

/**
 * Retorna a lista de operadores cadastrados para a conta (email) informada.
 * Retorna [] quando a conta não tem operadores cadastrados.
 */
export async function getOperatorsForEmail(email: string): Promise<string[]> {
  if (!email) return []
  const row = await getSettingsRow()
  if (!row) return []
  const moduleSettings = (row.module_settings as Record<string, unknown>) || {}
  const key = operatorsKey(email)
  const value = moduleSettings[key]
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === 'string' && v.trim().length > 0)
  }
  return []
}

/** Chave de armazenamento do array de operadores para um email. */
export function operatorsKey(email: string): string {
  return `operators_${email.trim().toLowerCase()}`
}

/**
 * Substitui a lista de operadores de uma conta. Persiste em
 * `app_settings.module_settings.operators_{email}` preservando as demais
 * chaves existentes.
 */
export async function saveOperatorsForEmail(email: string, operators: string[]): Promise<boolean> {
  if (!email) return false
  const row = await getSettingsRow()
  if (!row) return false

  const moduleSettings: Record<string, unknown> = {
    ...((row.module_settings as Record<string, unknown>) || {} || {}),
  }
  // Normaliza: strings únicas, sem vazias, sem duplicatas (preservando ordem).
  const normalized = normalizeOperatorList(operators)
  if (normalized.length > 0) {
    moduleSettings[operatorsKey(email)] = normalized
  } else {
    delete moduleSettings[operatorsKey(email)]
  }

  const { error } = await supabase
    .from('app_settings')
    .update({ module_settings: moduleSettings, updated_at: new Date().toISOString() })
    .eq('id', row.id)

  if (error) {
    console.error('Failed to save operators for', email, error)
    return false
  }
  return true
}

/** Remove duplicatas/vazias preservando a ordem de inserção. */
export function normalizeOperatorList(operators: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const raw of operators) {
    const name = (typeof raw === 'string' ? raw : String(raw ?? '')).trim()
    if (!name) continue
    const key = name.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(name)
  }
  return out
}

/**
 * Hook-like listener: permite que componentes (ex.: selo do header) reajam a
 * mudanças do operador atual sem depender de contexto React.
 */
export function subscribeOperatorChanges(cb: () => void): () => void {
  const handler = () => cb()
  window.addEventListener('operator:change', handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener('operator:change', handler)
    window.removeEventListener('storage', handler)
  }
}
