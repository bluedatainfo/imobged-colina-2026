import { useSyncExternalStore } from 'react'

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

let state: State = {
  tasks: [
    {
      id: 'KEY-001',
      contractId: 'CTR-001',
      propertyId: '101',
      tenantName: 'João Pedro',
      propertyAddress: 'Rua Flores, 123',
      type: 'Delivery',
      status: 'Pending',
    },
  ],
}

let listeners: Array<() => void> = []
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
  },
  updateTaskStatus: (id: string, status: KeyTaskStatus) => {
    state = {
      ...state,
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    }
    emit()
  },
}

export default function useKeysStore() {
  return useSyncExternalStore(keysStore.subscribe, keysStore.getState)
}
