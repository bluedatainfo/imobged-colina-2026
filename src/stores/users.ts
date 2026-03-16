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

const STORAGE_KEY = '@imobged/users_v1'

const loadState = (): State => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.warn('Failed to load users from localStorage', e)
  }
  return { users: [] }
}

let state: State = loadState()
let listeners: Array<() => void> = []

const emit = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Failed to persist users state', e)
  }
  listeners.forEach((l) => l())
}

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
  addUser: (user: Omit<SystemUser, 'id' | 'avatar'> & { id?: string; avatar?: string }) => {
    const newUser: SystemUser = {
      ...user,
      id: user.id || `usr-${Math.random().toString(36).substring(2, 9)}`,
      avatar:
        user.avatar ||
        `https://img.usecurling.com/ppl/thumbnail?seed=${Math.floor(Math.random() * 100)}`,
    }

    const existingIndex = state.users.findIndex(
      (u) => u.email.toLowerCase() === newUser.email.toLowerCase(),
    )

    if (existingIndex >= 0) {
      const updatedUsers = [...state.users]
      updatedUsers[existingIndex] = {
        ...updatedUsers[existingIndex],
        ...newUser,
        role: updatedUsers[existingIndex].role,
      }
      state = { ...state, users: updatedUsers }
      emit()
      return updatedUsers[existingIndex]
    }

    state = { ...state, users: [...state.users, newUser] }
    emit()
    return newUser
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
        users: state.users.filter((u) =>
          u.email.toLowerCase().endsWith(`@${domain.toLowerCase()}`),
        ),
      }
    }
    emit()
  },
  syncUsers: (fetchedUsers: SystemUser[]) => {
    const currentUsersMap = new Map(state.users.map((u) => [u.email.toLowerCase(), u]))
    const mergedUsers = fetchedUsers.map((fu) => {
      const existing = currentUsersMap.get(fu.email.toLowerCase())
      if (existing) {
        return { ...fu, role: existing.role }
      }
      return fu
    })

    state = { ...state, users: mergedUsers }
    emit()
  },
}

export default function useUsersStore() {
  return useSyncExternalStore(usersStore.subscribe, usersStore.getState)
}
