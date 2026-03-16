import { useSyncExternalStore } from 'react'
import { Role } from '@/lib/permissions'

export type SystemUser = {
  id: string
  name: string
  email: string
  role: Role
  avatar: string
}

type State = {
  users: SystemUser[]
}

let state: State = {
  users: [
    {
      id: 'usr-1',
      name: 'Ana Silva',
      email: 'ana.silva@imobged.com',
      role: 'Admin',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
    },
    {
      id: 'usr-2',
      name: 'Carlos Santos',
      email: 'carlos.santos@imobged.com',
      role: 'Vistoriador',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
    },
    {
      id: 'usr-3',
      name: 'Mariana Costa',
      email: 'mariana.costa@imobged.com',
      role: 'Jurídico',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=7',
    },
    {
      id: 'usr-4',
      name: 'Roberto Alves',
      email: 'roberto.alves@imobged.com',
      role: 'Gerente',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=9',
    },
  ],
}

let listeners: Array<() => void> = []
const emit = () => listeners.forEach((l) => l())

export const usersStore = {
  getState: () => state,
  subscribe: (l: () => void) => {
    listeners.push(l)
    return () => {
      listeners = listeners.filter((fn) => fn !== l)
    }
  },
  updateUserRole: (id: string, role: Role) => {
    state = {
      ...state,
      users: state.users.map((u) => (u.id === id ? { ...u, role } : u)),
    }
    emit()
  },
}

export default function useUsersStore() {
  return useSyncExternalStore(usersStore.subscribe, usersStore.getState)
}
