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
