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
      email: 'ana.silva@imobged.onmicrosoft.com',
      role: 'Admin',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
    },
    {
      id: 'usr-2',
      name: 'Carlos Santos',
      email: 'carlos.santos@imobged.onmicrosoft.com',
      role: 'Vistoriador',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
    },
    {
      id: 'usr-3',
      name: 'Mariana Costa',
      email: 'mariana.costa@imobged.onmicrosoft.com',
      role: 'Jurídico',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=7',
    },
    {
      id: 'usr-4',
      name: 'Roberto Alves',
      email: 'roberto.alves@imobged.onmicrosoft.com',
      role: 'Gerente',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=9',
    },
    {
      id: 'usr-5',
      name: 'Paulo Vieira',
      email: 'paulo.vieira@imobged.onmicrosoft.com',
      role: 'Diretor',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=15',
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
  addUser: (user: Omit<SystemUser, 'id' | 'avatar'>) => {
    const newUser: SystemUser = {
      ...user,
      id: `usr-${Math.random().toString(36).substring(2, 9)}`,
      avatar: `https://img.usecurling.com/ppl/thumbnail?seed=${Math.floor(Math.random() * 100)}`,
    }
    state = { ...state, users: [...state.users, newUser] }
    emit()
  },
  updateUser: (id: string, data: Partial<SystemUser>) => {
    state = {
      ...state,
      users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
    }
    emit()
  },
  removeUser: (id: string) => {
    state = {
      ...state,
      users: state.users.filter((u) => u.id !== id),
    }
    emit()
  },
  enforceDomain: (domain: string) => {
    if (!domain) {
      state = { ...state, users: [] }
    } else {
      state = {
        ...state,
        users: state.users.filter((u) => u.email.endsWith(`@${domain}`)),
      }
    }
    emit()
  },
}

export default function useUsersStore() {
  return useSyncExternalStore(usersStore.subscribe, usersStore.getState)
}
