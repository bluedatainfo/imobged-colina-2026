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
      id:
        o.idprop?.toString() ||
        o.id?.toString() ||
        o.codigo?.toString() ||
        Math.random().toString(),
      code: o.idprop?.toString() || o.id?.toString() || o.code || o.codigo || 'ERP-P',
      fullName: o.nome || o.full_name || o.fullName || 'Proprietário Desconhecido',
      cpf: o.cpf || o.documento || '',
      rg: o.rg?.trim() || '',
      fullAddress: o.endereco
        ? `${o.endereco}${o.numero ? ', ' + o.numero : ''}${o.complemento ? ' - ' + o.complemento : ''} - ${o.bairro || ''} - ${o.cidade || ''}/${o.uf || ''}`
        : o.full_address || '',
      createdAt: o.dtinc || o.created_at || new Date().toISOString(),
      updatedAt: o.dtalt || o.updated_at || new Date().toISOString(),
    }))

    state.tenants = tData.map((t: any) => ({
      id: t.id?.toString() || t.codigo?.toString() || Math.random().toString(),
      code: t.id?.toString() || t.code || t.codigo || 'ERP-L',
      fullName: t.nome || t.full_name || t.fullName || 'Locatário Desconhecido',
      cpf: t.cpf || t.documento || '',
      rg: t.rg?.trim() || '',
      fullAddress: t.endereco
        ? `${t.endereco}${t.numero ? ', ' + t.numero : ''}${t.complemento ? ' - ' + t.complemento : ''} - ${t.bairro || ''} - ${t.cidade || ''}/${t.uf || ''}`
        : t.full_address || '',
      createdAt: t.dtinclusao || t.created_at || new Date().toISOString(),
      updatedAt: t.dtalteracao || t.updated_at || new Date().toISOString(),
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
