import { useSyncExternalStore } from 'react'
import { Role } from '@/lib/permissions'
import { supabase } from '@/lib/supabase/client'

export type SystemUser = {
  id: string
  name: string
  email: string
  role: Role
  avatar: string
  phone?: string
}

type State = {
  users: SystemUser[]
}

let state: State = { users: [] }
let listeners: Array<() => void> = []

export const initUsersStore = async () => {
  const { data } = await supabase.from('app_users').select('*')

  if (data && data.length > 0) {
    state.users = data.map((u) => ({
      id: u.id,
      name: u.name || '',
      email: u.email || '',
      role: (u.role as Role) || 'Vistoriador',
      avatar: u.avatar || '',
      phone: u.phone || '',
    }))
  }
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
  syncUsers: async (fetchedUsers: SystemUser[]) => {
    const updatedUsers = [...state.users]
    const dbPayload: any[] = []

    for (const user of fetchedUsers) {
      const existingIndex = updatedUsers.findIndex(
        (u) => u.email.toLowerCase() === user.email.toLowerCase(),
      )

      if (existingIndex >= 0) {
        updatedUsers[existingIndex] = {
          ...updatedUsers[existingIndex],
          name: user.name,
          avatar: user.avatar || updatedUsers[existingIndex].avatar,
          phone: user.phone !== undefined ? user.phone : updatedUsers[existingIndex].phone,
        }
        dbPayload.push({
          id: updatedUsers[existingIndex].id,
          name: updatedUsers[existingIndex].name,
          email: updatedUsers[existingIndex].email,
          role: updatedUsers[existingIndex].role,
          avatar: updatedUsers[existingIndex].avatar,
          phone: updatedUsers[existingIndex].phone || null,
        })
      } else {
        updatedUsers.push(user)
        dbPayload.push({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phone: user.phone || null,
        })
      }
    }

    state = { ...state, users: updatedUsers }
    emit()

    if (dbPayload.length > 0) {
      await supabase.from('app_users').upsert(dbPayload)
    }
  },
  updateUserRole: (id: string, role: Role) => {
    state = {
      ...state,
      users: state.users.map((u) => (u.id === id ? { ...u, role } : u)),
    }
    emit()
    supabase.from('app_users').update({ role }).eq('id', id).then()
  },
  addUser: (
    user: Omit<SystemUser, 'id' | 'avatar'> & { id?: string; avatar?: string; phone?: string },
  ) => {
    const newUser: SystemUser = {
      ...user,
      id: user.id || `usr-${Math.random().toString(36).substring(2, 9)}`,
      avatar: user.avatar || '',
      phone: user.phone || '',
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
      supabase
        .from('app_users')
        .update({
          name: updatedUsers[existingIndex].name,
          avatar: updatedUsers[existingIndex].avatar,
        })
        .eq('id', updatedUsers[existingIndex].id)
        .then()
      return updatedUsers[existingIndex]
    }

    state = { ...state, users: [...state.users, newUser] }
    emit()
    supabase
      .from('app_users')
      .upsert({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
        phone: newUser.phone || null,
      })
      .then()
    return newUser
  },
  updateUser: (id: string, data: Partial<SystemUser>) => {
    state = {
      ...state,
      users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
    }
    emit()
    supabase.from('app_users').update(data).eq('id', id).then()
  },
  removeUser: (id: string) => {
    state = {
      ...state,
      users: state.users.filter((u) => u.id !== id),
    }
    emit()
    supabase.from('app_users').delete().eq('id', id).then()
  },
  enforceDomain: (domain: string) => {
    if (!domain) {
      const toRemove = [...state.users]
      state = { ...state, users: [] }
      emit()
      toRemove.forEach((u) => supabase.from('app_users').delete().eq('id', u.id).then())
    } else {
      const toKeep = state.users.filter((u) =>
        u.email.toLowerCase().endsWith(`@${domain.toLowerCase()}`),
      )
      const toRemove = state.users.filter(
        (u) => !u.email.toLowerCase().endsWith(`@${domain.toLowerCase()}`),
      )
      state = { ...state, users: toKeep }
      emit()
      toRemove.forEach((u) => supabase.from('app_users').delete().eq('id', u.id).then())
    }
  },
}

export default function useUsersStore() {
  return useSyncExternalStore(usersStore.subscribe, usersStore.getState)
}
