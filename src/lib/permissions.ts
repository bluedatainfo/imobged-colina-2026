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

export const checkAccess = (path: string, role?: Role) => {
  if (!role) return false
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

  return false
}
