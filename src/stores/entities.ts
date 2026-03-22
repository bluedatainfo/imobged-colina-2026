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
  const [{ data: ownersData }, { data: tenantsData }] = await Promise.all([
    supabase.from('owners').select('*').order('created_at', { ascending: false }),
    supabase.from('tenants').select('*').order('created_at', { ascending: false }),
  ])

  state.owners = ownersData
    ? ownersData.map((o) => ({
        id: o.id,
        code: o.code,
        fullName: o.full_name,
        cpf: o.cpf || '',
        rg: o.rg || '',
        fullAddress: o.full_address || '',
        createdAt: o.created_at,
        updatedAt: o.updated_at,
      }))
    : []

  state.tenants = tenantsData
    ? tenantsData.map((t) => ({
        id: t.id,
        code: t.code,
        fullName: t.full_name,
        cpf: t.cpf || '',
        rg: t.rg || '',
        fullAddress: t.full_address || '',
        createdAt: t.created_at,
        updatedAt: t.updated_at,
      }))
    : []

  emit()
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
  addOwner: async (
    owner: Omit<EntityModel, 'id' | 'createdAt' | 'updatedAt' | 'code'> & { code?: string },
  ) => {
    let newCode = owner.code
    if (!newCode) {
      const { data } = await supabase.from('owners').select('code')
      let max = 0
      data?.forEach((d) => {
        if (d.code && d.code.startsWith('prop')) {
          const num = parseInt(d.code.substring(4), 10)
          if (!isNaN(num) && num > max) max = num
        }
      })
      newCode = `prop${(max + 1).toString().padStart(3, '0')}`
    }

    const { data, error } = await supabase
      .from('owners')
      .insert({
        code: newCode,
        full_name: owner.fullName,
        cpf: owner.cpf,
        rg: owner.rg,
        full_address: owner.fullAddress,
      })
      .select('*')
      .single()

    if (error) throw error

    if (data) {
      const newOwner: EntityModel = {
        id: data.id,
        code: data.code,
        fullName: data.full_name,
        cpf: data.cpf || '',
        rg: data.rg || '',
        fullAddress: data.full_address || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
      state = { ...state, owners: [newOwner, ...state.owners] }
      emit()
    }
  },
  updateOwner: async (id: string, owner: Partial<EntityModel>) => {
    const payload: any = { updated_at: new Date().toISOString() }
    if (owner.code) payload.code = owner.code
    if (owner.fullName) payload.full_name = owner.fullName
    if (owner.cpf !== undefined) payload.cpf = owner.cpf
    if (owner.rg !== undefined) payload.rg = owner.rg
    if (owner.fullAddress !== undefined) payload.full_address = owner.fullAddress

    const { error } = await supabase.from('owners').update(payload).eq('id', id)
    if (error) throw error

    state = {
      ...state,
      owners: state.owners.map((o) =>
        o.id === id ? { ...o, ...owner, updatedAt: payload.updated_at } : o,
      ),
    }
    emit()
  },
  deleteOwner: async (id: string) => {
    const { error } = await supabase.from('owners').delete().eq('id', id)
    if (error) throw error

    state = { ...state, owners: state.owners.filter((o) => o.id !== id) }
    emit()
  },
  addTenant: async (
    tenant: Omit<EntityModel, 'id' | 'createdAt' | 'updatedAt' | 'code'> & { code?: string },
  ) => {
    let newCode = tenant.code
    if (!newCode) {
      const { data } = await supabase.from('tenants').select('code')
      let max = 0
      data?.forEach((d) => {
        if (d.code && d.code.startsWith('inq')) {
          const num = parseInt(d.code.substring(3), 10)
          if (!isNaN(num) && num > max) max = num
        }
      })
      newCode = `inq${(max + 1).toString().padStart(3, '0')}`
    }

    const { data, error } = await supabase
      .from('tenants')
      .insert({
        code: newCode,
        full_name: tenant.fullName,
        cpf: tenant.cpf,
        rg: tenant.rg,
        full_address: tenant.fullAddress,
      })
      .select('*')
      .single()

    if (error) throw error

    if (data) {
      const newTenant: EntityModel = {
        id: data.id,
        code: data.code,
        fullName: data.full_name,
        cpf: data.cpf || '',
        rg: data.rg || '',
        fullAddress: data.full_address || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
      state = { ...state, tenants: [newTenant, ...state.tenants] }
      emit()
    }
  },
  updateTenant: async (id: string, tenant: Partial<EntityModel>) => {
    const payload: any = { updated_at: new Date().toISOString() }
    if (tenant.code) payload.code = tenant.code
    if (tenant.fullName) payload.full_name = tenant.fullName
    if (tenant.cpf !== undefined) payload.cpf = tenant.cpf
    if (tenant.rg !== undefined) payload.rg = tenant.rg
    if (tenant.fullAddress !== undefined) payload.full_address = tenant.fullAddress

    const { error } = await supabase.from('tenants').update(payload).eq('id', id)
    if (error) throw error

    state = {
      ...state,
      tenants: state.tenants.map((t) =>
        t.id === id ? { ...t, ...tenant, updatedAt: payload.updated_at } : t,
      ),
    }
    emit()
  },
  deleteTenant: async (id: string) => {
    const { error } = await supabase.from('tenants').delete().eq('id', id)
    if (error) throw error

    state = { ...state, tenants: state.tenants.filter((t) => t.id !== id) }
    emit()
  },
}

export default function useEntitiesStore() {
  return useSyncExternalStore(entitiesStore.subscribe, entitiesStore.getState)
}
