import { createContext, useContext, useState, ReactNode } from 'react'
import { SystemUser, usersStore } from '@/stores/users'
import { mainStore } from '@/stores/main'
import { Role } from '@/lib/permissions'

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

        // Domain-Specific Auth Routing Validation
        if (emailDomain !== domain) {
          reject(
            new Error(
              `Acesso negado. O e-mail fornecido não pertence ao tenant autorizado (@${domain}).`,
            ),
          )
          return
        }

        const { users } = usersStore.getState()
        let foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

        if (!foundUser) {
          // Simulate Microsoft 365 Entra ID JIT (Just-In-Time) Provisioning
          // Retrieve the user's real profile information (mocked) and create them
          const nameParts = emailParts[0].split('.')
          const name = nameParts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')

          foundUser = usersStore.addUser({
            name,
            email: email.toLowerCase(),
            role: 'Vistoriador' as Role, // Default role for newly synced users
          })
        }

        if (foundUser) {
          setCurrentUserId(foundUser.id)
          resolve()
        } else {
          reject(new Error('Erro ao sincronizar perfil do usuário com o Microsoft Entra ID.'))
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
