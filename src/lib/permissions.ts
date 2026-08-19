import { mainStore } from '@/stores/main'

export type Role =
  | 'Admin'
  | 'Diretor'
  | 'Gerente'
  | 'Vistoriador'
  | 'Jurídico'
  | 'Financeiro'
  | 'Gestor de Contrato'
  | 'Corretor'
  | 'Caixa'

// Caminhos considerados "áreas comuns" — sempre acessíveis a qualquer usuário
// autenticado. Servem como rede de segurança caso o RBAC do banco esteja vazio,
// incompleto ou ausente, evitando o bloqueio total logo após o login.
const COMMON_PATHS = ['/', '/profile']

export const checkAccess = (path: string, role?: Role) => {
  if (!role) {
    // Sem role definida, libera apenas as áreas comuns para não bloquear o
    // usuário autenticado em um estado intermediário de carregamento.
    return COMMON_PATHS.includes(path)
  }
  if (role === 'Admin') return true

  const state = mainStore.getState()
  const rbac = state.settings?.rbac

  if (rbac && rbac[role]) {
    const allowedPaths = rbac[role]
    if (allowedPaths.includes('all')) return true

    if (allowedPaths.includes(path)) return true

    if (path.startsWith('/properties/') && allowedPaths.includes('/properties')) {
      return true
    }

    return false
  }

  // Fallback: configuração de RBAC ausente, vazia ou incompleta para o perfil.
  // Em vez de negar tudo, permite as áreas comuns (página inicial, perfil).
  return COMMON_PATHS.includes(path)
}

/**
 * Retorna a primeira rota permitida para o perfil informado, de acordo com o
 * RBAC configurado (em `app_settings.role_settings.rbac` ou o padrão do store).
 *
 * Comportamento:
 *  - Se o perfil tiver `"all"` na lista (ex.: Admin, Diretor), retorna `"/"`
 *    (Dashboard).
 *  - Caso contrário, retorna a primeira rota da lista do perfil
 *    (ex.: `["/caixa", "/sent-documents"]` → `"/caixa"`).
 *  - Se não houver RBAC definido para o perfil ou a lista estiver vazia,
 *    retorna `"/"` como fallback.
 *
 * Usada no redirecionamento pós-login para que perfis sem acesso ao Dashboard
 * (ex.: "Gestor de Contrato" com `["/ongoing-contracts", ...]` ou "Caixa" com
 * `["/caixa", ...]`) caiam direto na sua primeira rota permitida, em vez de
 * sempre ir para `/` e bater no `checkAccess('/')`.
 */
export function getFirstAllowedPath(role: string): string {
  const state = mainStore.getState()
  const rbac = state.settings?.rbac

  if (rbac && rbac[role] && Array.isArray(rbac[role]) && rbac[role].length > 0) {
    const allowedPaths = rbac[role]
    if (allowedPaths.includes('all')) return '/'
    return allowedPaths[0]
  }

  // Fallback: sem RBAC ou lista vazia para o perfil.
  return '/'
}
