import { createContext, useContext, useState, ReactNode } from 'react'
import { SystemUser, usersStore } from '@/stores/users'
import { mainStore } from '@/stores/main'

type AuthContextType = {
  user: SystemUser | null
  loginM365: (email: string, password?: string) => Promise<void>
  logout: () => void
  switchUser: (id: string) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  // Derive current user dynamically so role changes reflect immediately
  const { users } = usersStore.getState()
  const user = currentUserId ? users.find((u) => u.id === currentUserId) || null : null

  const loginM365 = async (email: string, password?: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const { sharepoint } = mainStore.getState()
        const domain = sharepoint.primaryDomain?.trim().toLowerCase()

        if (!domain) {
          reject(
            new Error('Acesso negado. Domínio Primário não configurado nas definições do sistema.'),
          )
          return
        }

        const emailParts = email.split('@')
        const emailDomain = emailParts.length > 1 ? emailParts[1].toLowerCase() : ''

        if (emailDomain !== domain) {
          reject(
            new Error(
              `Acesso negado. O e-mail fornecido não pertence ao domínio autorizado (${sharepoint.primaryDomain}).`,
            ),
          )
          return
        }

        const { users } = usersStore.getState()
        const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

        if (foundUser) {
          setCurrentUserId(foundUser.id)
          resolve()
        } else {
          reject(
            new Error(
              `Acesso negado. Usuário não encontrado no domínio (${sharepoint.primaryDomain}) autorizado.`,
            ),
          )
        }
      }, 1200)
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
