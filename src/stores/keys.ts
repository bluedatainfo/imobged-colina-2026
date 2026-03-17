import { useSyncExternalStore } from 'react'
import { supabase } from '@/lib/supabase/client'

export type KeyTaskType = 'Delivery' | 'Return'
export type KeyTaskStatus = 'Pending' | 'Signed'

export type KeyTask = {
  id: string
  contractId: string
  propertyId: string
  tenantName: string
  propertyAddress: string
  type: KeyTaskType
  status: KeyTaskStatus
}

type State = {
  tasks: KeyTask[]
}

let state: State = { tasks: [] }
let listeners: Array<() => void> = []

export const initKeysStore = async () => {
  const { data } = await supabase.from('key_control').select('*')

  if (data && data.length > 0) {
    state.tasks = data.map((t) => ({
      id: t.id,
      contractId: t.contract_id || '',
      propertyId: t.property_id || '',
      tenantName: t.tenant_name || '',
      propertyAddress: t.property_address || '',
      type: t.type as KeyTaskType,
      status: t.status as KeyTaskStatus,
    }))
  } else if (sessionStorage.getItem('app_user_id')) {
    const defaultTasks: KeyTask[] = [
      {
        id: 'KEY-001',
        contractId: 'CTR-001',
        propertyId: '101',
        tenantName: 'João Pedro',
        propertyAddress: 'Rua Flores, 123',
        type: 'Delivery',
        status: 'Pending',
      },
    ]
    state.tasks = defaultTasks
    for (const t of defaultTasks) {
      await supabase.from('key_control').insert({
        id: t.id,
        contract_id: t.contractId,
        property_id: t.propertyId,
        tenant_name: t.tenantName,
        property_address: t.propertyAddress,
        type: t.type,
        status: t.status,
      })
    }
  }
  emit()
}

const emit = () => listeners.forEach((l) => l())

export const keysStore = {
  getState: () => state,
  subscribe: (l: () => void) => {
    listeners.push(l)
    return () => {
      listeners = listeners.filter((fn) => fn !== l)
    }
  },
  addTask: (task: Omit<KeyTask, 'id' | 'status'>) => {
    const newTask: KeyTask = {
      ...task,
      id: `KEY-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')}`,
      status: 'Pending',
    }
    state = { ...state, tasks: [newTask, ...state.tasks] }
    emit()
    supabase
      .from('key_control')
      .insert({
        id: newTask.id,
        contract_id: newTask.contractId,
        property_id: newTask.propertyId,
        tenant_name: newTask.tenantName,
        property_address: newTask.propertyAddress,
        type: newTask.type,
        status: newTask.status,
      })
      .then()
  },
  updateTaskStatus: (id: string, status: KeyTaskStatus) => {
    state = {
      ...state,
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    }
    emit()
    supabase
      .from('key_control')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .then()
  },
}

export default function useKeysStore() {
  return useSyncExternalStore(keysStore.subscribe, keysStore.getState)
}
