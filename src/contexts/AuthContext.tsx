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
        if (!sharepoint.tenantId || !sharepoint.tenantId.trim()) {
          reject(new Error('Acesso negado. Tenant ID não configurado nas definições do sistema.'))
          return
        }

        const isValidTenantId = (id: string) => {
          return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
            id,
          )
        }

        if (!isValidTenantId(sharepoint.tenantId.trim())) {
          reject(
            new Error(
              `Acesso negado. O Tenant configurado no sistema (${sharepoint.tenantId}) é inválido.`,
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
              `Acesso negado. Usuário não encontrado no Tenant (${sharepoint.tenantId}) autorizado.`,
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
