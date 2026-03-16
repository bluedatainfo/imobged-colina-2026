import { createContext, useContext, useState, ReactNode } from 'react'
import { SystemUser, usersStore } from '@/stores/users'

type AuthContextType = {
  user: SystemUser | null
  loginM365: () => Promise<void>
  logout: () => void
  switchUser: (id: string) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  // Derive current user dynamically so role changes reflect immediately
  const { users } = usersStore.getState()
  const user = currentUserId ? users.find((u) => u.id === currentUserId) || null : null

  const loginM365 = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCurrentUserId('usr-1') // Default to Admin for demo
        resolve()
      }, 800)
    })
  }

  const logout = () => {
    setCurrentUserId(null)
  }

  const switchUser = (id: string) => {
    setCurrentUserId(id)
  }

  return (
    <AuthContext.Provider value={{ user, loginM365, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
