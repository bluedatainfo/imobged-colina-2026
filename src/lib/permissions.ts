export type Role = 'Admin' | 'Gerente' | 'Vistoriador' | 'Jurídico' | 'Financeiro'

export const ROUTE_ACCESS: Record<string, Role[]> = {
  '/': ['Admin', 'Gerente', 'Vistoriador', 'Jurídico', 'Financeiro'],
  '/manager-approval': ['Admin', 'Gerente'],
  '/contracts': ['Admin', 'Gerente', 'Jurídico'],
  '/documents': ['Admin', 'Gerente', 'Jurídico', 'Financeiro'],
  '/properties': ['Admin', 'Gerente', 'Vistoriador', 'Jurídico', 'Financeiro'],
  '/inspections': ['Admin', 'Gerente', 'Vistoriador'],
  '/legal': ['Admin', 'Gerente', 'Jurídico'],
  '/renewals': ['Admin', 'Gerente', 'Financeiro'],
  '/keys': ['Admin', 'Gerente', 'Vistoriador'],
  '/settings': ['Admin'],
}

export const checkAccess = (path: string, role?: Role) => {
  if (!role) return false
  const allowed = ROUTE_ACCESS[path]
  if (!allowed) return true
  return allowed.includes(role)
}
