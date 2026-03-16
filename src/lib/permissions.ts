export type Role =
  | 'Admin'
  | 'Diretor'
  | 'Gerente'
  | 'Vistoriador'
  | 'Jurídico'
  | 'Financeiro'
  | 'Gestor de Contrato'

export const ROUTE_ACCESS: Record<string, Role[]> = {
  '/': [
    'Admin',
    'Diretor',
    'Gerente',
    'Vistoriador',
    'Jurídico',
    'Financeiro',
    'Gestor de Contrato',
  ],
  '/manager-approval': ['Admin', 'Diretor', 'Gerente', 'Gestor de Contrato'],
  '/contracts': ['Admin', 'Diretor', 'Gerente', 'Jurídico', 'Gestor de Contrato'],
  '/documents': ['Admin', 'Diretor', 'Gerente', 'Jurídico', 'Financeiro', 'Gestor de Contrato'],
  '/properties': [
    'Admin',
    'Diretor',
    'Gerente',
    'Vistoriador',
    'Jurídico',
    'Financeiro',
    'Gestor de Contrato',
  ],
  '/inspections': ['Admin', 'Diretor', 'Gerente', 'Vistoriador', 'Gestor de Contrato'],
  '/legal': ['Admin', 'Diretor', 'Gerente', 'Jurídico'],
  '/renewals': ['Admin', 'Diretor', 'Gerente', 'Financeiro', 'Gestor de Contrato'],
  '/keys': ['Admin', 'Diretor', 'Gerente', 'Vistoriador', 'Gestor de Contrato'],
  '/maintenance': ['Admin', 'Diretor', 'Gerente', 'Financeiro'],
  '/settings': ['Admin', 'Diretor'],
  '/properties/dossier': ['Admin', 'Diretor'],
}

export const checkAccess = (path: string, role?: Role) => {
  if (!role) return false
  const allowed = ROUTE_ACCESS[path]
  if (allowed) return allowed.includes(role)

  if (path.startsWith('/properties/') && path.endsWith('/dossier')) {
    const dossierAllowed = ROUTE_ACCESS['/properties/dossier']
    return dossierAllowed ? dossierAllowed.includes(role) : true
  }

  return true
}
