export type Role =
  | 'Admin'
  | 'Gerente'
  | 'Vistoriador'
  | 'Jurídico'
  | 'Financeiro'
  | 'Gestor de Contrato'

export const ROUTE_ACCESS: Record<string, Role[]> = {
  '/': ['Admin', 'Gerente', 'Vistoriador', 'Jurídico', 'Financeiro', 'Gestor de Contrato'],
  '/manager-approval': ['Admin', 'Gerente', 'Gestor de Contrato'],
  '/contracts': ['Admin', 'Gerente', 'Jurídico', 'Gestor de Contrato'],
  '/documents': ['Admin', 'Gerente', 'Jurídico', 'Financeiro', 'Gestor de Contrato'],
  '/properties': [
    'Admin',
    'Gerente',
    'Vistoriador',
    'Jurídico',
    'Financeiro',
    'Gestor de Contrato',
  ],
  '/inspections': ['Admin', 'Gerente', 'Vistoriador', 'Gestor de Contrato'],
  '/legal': ['Admin', 'Gerente', 'Jurídico'],
  '/renewals': ['Admin', 'Gerente', 'Financeiro', 'Gestor de Contrato'],
  '/keys': ['Admin', 'Gerente', 'Vistoriador', 'Gestor de Contrato'],
  '/maintenance': ['Admin', 'Gerente', 'Financeiro'],
  '/settings': ['Admin'],
}

export const checkAccess = (path: string, role?: Role) => {
  if (!role) return false
  const allowed = ROUTE_ACCESS[path]
  if (!allowed) return true
  return allowed.includes(role)
}
