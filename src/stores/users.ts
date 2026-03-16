import { useSyncExternalStore } from 'react'
import { Role } from '@/lib/permissions'
import { supabase } from '@/lib/supabase'

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

let state: State = { users: [] }
let listeners: Array<() => void> = []

export const initUsersStore = async () => {
  const data = await supabase.get('app_users')
  state = { users: Array.isArray(data) && data.length > 0 ? data : [] }
  emit()
}

const emit = () => {
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
    supabase.patch('app_users', id, { role })
  },
  addUser: (user: Omit<SystemUser, 'id' | 'avatar'> & { id?: string; avatar?: string }) => {
    const newUser: SystemUser = {
      ...user,
      id: user.id || `usr-${Math.random().toString(36).substring(2, 9)}`,
      avatar: user.avatar || '',
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
      supabase.patch('app_users', updatedUsers[existingIndex].id, updatedUsers[existingIndex])
      return updatedUsers[existingIndex]
    }

    state = { ...state, users: [...state.users, newUser] }
    emit()
    supabase.upsert('app_users', newUser)
    return newUser
  },
  updateUser: (id: string, data: Partial<SystemUser>) => {
    state = {
      ...state,
      users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
    }
    emit()
    supabase.patch('app_users', id, data)
  },
  removeUser: (id: string) => {
    state = {
      ...state,
      users: state.users.filter((u) => u.id !== id),
    }
    emit()
    supabase.delete('app_users', id)
  },
  enforceDomain: (domain: string) => {
    if (!domain) {
      const toRemove = [...state.users]
      state = { ...state, users: [] }
      emit()
      toRemove.forEach((u) => supabase.delete('app_users', u.id))
    } else {
      const toKeep = state.users.filter((u) =>
        u.email.toLowerCase().endsWith(`@${domain.toLowerCase()}`),
      )
      const toRemove = state.users.filter(
        (u) => !u.email.toLowerCase().endsWith(`@${domain.toLowerCase()}`),
      )
      state = { ...state, users: toKeep }
      emit()
      toRemove.forEach((u) => supabase.delete('app_users', u.id))
    }
  },
  syncUsers: (fetchedUsers: SystemUser[]) => {
    const currentUsersMap = new Map(state.users.map((u) => [u.email.toLowerCase(), u]))
    const mergedUsers = fetchedUsers.map((fu) => {
      const existing = currentUsersMap.get(fu.email.toLowerCase())
      if (existing) {
        return { ...fu, role: existing.role, avatar: existing.avatar || fu.avatar }
      }
      return fu
    })

    state = { ...state, users: mergedUsers }
    emit()
    mergedUsers.forEach((u) => supabase.upsert('app_users', u))
  },
}

export default function useUsersStore() {
  return useSyncExternalStore(usersStore.subscribe, usersStore.getState)
}
