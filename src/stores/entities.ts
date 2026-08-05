import { useSyncExternalStore } from 'react'
import { supabase } from '@/lib/supabase/client'

export type EntityModel = {
  id: string
  code: string
  fullName: string
  cpf: string
  rg: string
  fullAddress: string
  createdAt: string
  updatedAt: string
  source?: string
}

export type GuaranteeModel = {
  id: string
  nome: string
  cpf: string
  pessoa: string
  celular: string
  email: string
  endereco: string
  telefone: string
  ativo: string
}

type State = {
  owners: EntityModel[]
  tenants: EntityModel[]
  guarantees: GuaranteeModel[]
  guaranteesError: boolean
}

let state: State = { owners: [], tenants: [], guarantees: [], guaranteesError: false }
let listeners: Array<() => void> = []

export const initEntitiesStore = async () => {
  try {
    const [ownersRes, tenantsRes, guaranteesRes] = await Promise.all([
      fetch('http://192.168.10.225:9000/proprietarios').catch(() => null),
      fetch('http://192.168.10.225:9000/locatarios').catch(() => null),
      fetch('http://192.168.10.225:9000/garantias').catch(() => null),
    ])

    let erpOwners: any[] = []
    let erpTenants: any[] = []
    let erpGuarantees: any[] = []

    if (ownersRes && ownersRes.ok) {
      erpOwners = await ownersRes.json()
    }
    if (tenantsRes && tenantsRes.ok) {
      erpTenants = await tenantsRes.json()
    }
    if (guaranteesRes && guaranteesRes.ok) {
      erpGuarantees = await guaranteesRes.json()
    }

    const { data: dbOwners } = await supabase
      .from('owners')
      .select('*')
      .order('created_at', { ascending: false })

    const { data: dbTenants } = await supabase
      .from('tenants')
      .select('*')
      .order('created_at', { ascending: false })

    const mapOwner = (o: any, source: string) => ({
      id:
        o.idprop?.toString() ||
        o.id?.toString() ||
        o.codigo?.toString() ||
        Math.random().toString(),
      code: o.idprop?.toString() || o.code || o.id?.toString() || o.codigo || 'ERP-P',
      fullName: o.nome || o.full_name || o.fullName || 'Proprietário Desconhecido',
      cpf: o.cpf || o.documento || '',
      rg: o.rg?.trim() || '',
      fullAddress: o.endereco
        ? `${o.endereco}${o.numero ? ', ' + o.numero : ''}${o.complemento ? ' - ' + o.complemento : ''} - ${o.bairro || ''} - ${o.cidade || ''}/${o.uf || ''}`
        : o.full_address || '',
      createdAt: o.dtinc || o.created_at || new Date().toISOString(),
      updatedAt: o.dtalt || o.updated_at || new Date().toISOString(),
      source,
    })

    const mapTenant = (t: any, source: string) => ({
      id: t.id?.toString() || t.codigo?.toString() || Math.random().toString(),
      code: t.code || t.id?.toString() || t.codigo || 'ERP-L',
      fullName: t.nome || t.full_name || t.fullName || 'Locatário Desconhecido',
      cpf: t.cpf || t.documento || '',
      rg: t.rg?.trim() || '',
      fullAddress: t.endereco
        ? `${t.endereco}${t.numero ? ', ' + t.numero : ''}${t.complemento ? ' - ' + t.complemento : ''} - ${t.bairro || ''} - ${t.cidade || ''}/${t.uf || ''}`
        : t.full_address || '',
      createdAt: t.dtinclusao || t.created_at || new Date().toISOString(),
      updatedAt: t.dtalteracao || t.updated_at || new Date().toISOString(),
      source,
    })

    const mapGuarantee = (g: any): GuaranteeModel => {
      const enderecoParts = [g.endereco, g.numero, g.complemento, g.bairro, g.cidade, g.uf].filter(
        Boolean,
      )
      const endereco =
        enderecoParts.length > 0
          ? `${g.endereco || ''}${g.numero ? ', ' + g.numero : ''}${g.complemento ? ' - ' + g.complemento : ''} - ${g.bairro || ''} - ${g.cidade || ''}/${g.uf || ''}`.trim()
          : ''

      return {
        id: g.id?.toString() || '',
        nome: g.nome || '',
        cpf: g.cpf || '',
        pessoa: g.pessoa || '',
        celular: g.celular || '',
        email: g.email || '',
        endereco,
        telefone: g.telefone || '',
        ativo: g.ativo || '',
      }
    }

    state.owners = [
      ...erpOwners.map((o) => mapOwner(o, 'ERP')),
      ...(dbOwners || []).map((o) => mapOwner(o, 'Novo')),
    ]

    state.tenants = [
      ...erpTenants.map((t) => mapTenant(t, 'ERP')),
      ...(dbTenants || []).map((t) => mapTenant(t, 'Novo')),
    ]

    state.guarantees = erpGuarantees.map(mapGuarantee)
    state.guaranteesError = !guaranteesRes || !guaranteesRes.ok

    emit()
  } catch (err) {
    console.error('Failed to sync entities with local ERP', err)
    state.guaranteesError = true
    emit()
  }
}

const emit = () => listeners.forEach((l) => l())

export const entitiesStore = {
  getState: () => state,
  subscribe: (l: () => void) => {
    listeners.push(l)
    return () => {
      listeners = listeners.filter((fn) => fn !== l)
    }
  },
  addOwner: async () => {
    throw new Error('Cadastro bloqueado. Gerido no ERP local.')
  },
  updateOwner: async () => {
    throw new Error('Edição bloqueada. Gerida no ERP local.')
  },
  deleteOwner: async () => {
    throw new Error('Exclusão bloqueada. Gerida no ERP local.')
  },
  addTenant: async () => {
    throw new Error('Cadastro bloqueado. Gerido no ERP local.')
  },
  updateTenant: async () => {
    throw new Error('Edição bloqueada. Gerida no ERP local.')
  },
  deleteTenant: async () => {
    throw new Error('Exclusão bloqueada. Gerida no ERP local.')
  },
}

export default function useEntitiesStore() {
  return useSyncExternalStore(entitiesStore.subscribe, entitiesStore.getState)
}
