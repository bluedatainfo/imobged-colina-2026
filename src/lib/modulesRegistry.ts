/**
 * Registro centralizado de módulos — fonte única da verdade para todos os
 * módulos do sistema acessíveis via menu/rota.
 *
 * Qualquer novo módulo deve ser adicionado AQUI. Os seguintes consumidores
 * já derivam sua lista a partir deste registro:
 *  - `src/components/settings/RbacMatrix.tsx` (Matriz de Permissões)
 *  - `src/components/AppSidebar.tsx` (navegação / validação de visibilidade)
 *  - `src/App.tsx` (rotas protegidas)
 *
 * Assim, nenhum módulo pode ser cadastrado no menu sem passar pela validação
 * de permissões (RBAC) em `/settings`. Os labels e paths são exatamente os
 * mesmos já utilizados pelo sistema.
 */
export interface ModuleEntry {
  path: string
  label: string
}

export const ALL_MODULES: ModuleEntry[] = [
  { path: '/', label: 'Dashboard' },
  { path: '/candidates', label: 'Candidatos' },
  { path: '/ongoing-contracts', label: 'Contratos em Andamento' },
  { path: '/entities', label: 'Entidades' },
  { path: '/documents', label: 'Documentos' },
  { path: '/additional-documents', label: 'Documentos Adicionais' },
  { path: '/sent-documents', label: 'Documentos Enviados' },
  { path: '/document-alerts', label: 'Alertas GED' },
  { path: '/sync-monitor', label: 'Monitor Sinc.' },
  { path: '/manager-approval', label: 'Análise Ger.' },
  { path: '/inspections', label: 'Vistorias' },
  { path: '/keys', label: 'Chaves' },
  { path: '/contracts', label: 'Contratos' },
  { path: '/templates', label: 'Modelos' },
  { path: '/properties', label: 'Imóveis' },
  { path: '/maintenance', label: 'Manutenção' },
  { path: '/renewals', label: 'Renovações' },
  { path: '/legal', label: 'Jurídico' },
  { path: '/sales', label: 'Vendas' },
  { path: '/financial', label: 'Financeiro' },
  { path: '/caixa', label: 'Caixa (Boletos)' },
  { path: '/settings', label: 'Configurações' },
  { path: '/profile', label: 'Perfil' },
]

/** Conjunto de paths protegidos, derivado do registro. */
export const PROTECTED_PATHS: string[] = ALL_MODULES.map((m) => m.path)

/** Verifica se um path corresponde a um módulo registrado. */
export const isRegisteredModule = (path: string): boolean => PROTECTED_PATHS.includes(path)
