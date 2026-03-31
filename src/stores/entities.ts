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
}

type State = {
  owners: EntityModel[]
  tenants: EntityModel[]
}

let state: State = { owners: [], tenants: [] }
let listeners: Array<() => void> = []

export const initEntitiesStore = async () => {
  try {
    // Attempt to fetch from local ERP as requested
    const [ownersRes, tenantsRes] = await Promise.all([
      fetch('http://192.168.10.225:9000/proprietarios').catch(() => null),
      fetch('http://192.168.10.225:9000/locatarios').catch(() => null),
    ])

    let oData: any[] = []
    let tData: any[] = []

    if (ownersRes && ownersRes.ok) {
      oData = await ownersRes.json()
    } else {
      // Fallback if ERP is unreachable (preview mode)
      const { data } = await supabase
        .from('owners')
        .select('*')
        .order('created_at', { ascending: false })
      oData = data || []
    }

    if (tenantsRes && tenantsRes.ok) {
      tData = await tenantsRes.json()
    } else {
      // Fallback
      const { data } = await supabase
        .from('tenants')
        .select('*')
        .order('created_at', { ascending: false })
      tData = data || []
    }

    state.owners = oData.map((o: any) => ({
      id: o.id || o.codigo || Math.random().toString(),
      code: o.code || o.codigo || 'ERP-P',
      fullName: o.full_name || o.nome || o.fullName || 'Proprietário Desconhecido',
      cpf: o.cpf || o.documento || '',
      rg: o.rg || '',
      fullAddress: o.full_address || o.endereco || '',
      createdAt: o.created_at || new Date().toISOString(),
      updatedAt: o.updated_at || new Date().toISOString(),
    }))

    state.tenants = tData.map((t: any) => ({
      id: t.id || t.codigo || Math.random().toString(),
      code: t.code || t.codigo || 'ERP-L',
      fullName: t.full_name || t.nome || t.fullName || 'Locatário Desconhecido',
      cpf: t.cpf || t.documento || '',
      rg: t.rg || '',
      fullAddress: t.full_address || t.endereco || '',
      createdAt: t.created_at || new Date().toISOString(),
      updatedAt: t.updated_at || new Date().toISOString(),
    }))

    emit()
  } catch (err) {
    console.error('Failed to sync entities with local ERP', err)
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
