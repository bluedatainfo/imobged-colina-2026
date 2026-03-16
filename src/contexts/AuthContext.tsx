import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { SystemUser, usersStore } from '@/stores/users'
import { mainStore } from '@/stores/main'
import { Role } from '@/lib/permissions'
import { toast } from '@/hooks/use-toast'

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

  useEffect(() => {
    const hash = window.location.hash
    if (hash.includes('access_token=')) {
      const params = new URLSearchParams(hash.substring(1))
      const token = params.get('access_token')
      const error = params.get('error')

      window.location.hash = ''

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Erro de Autenticação',
          description:
            'Unable to connect to Microsoft 365. Please verify your Client/Tenant ID and Azure App permissions.',
        })
        return
      }

      if (token) {
        sessionStorage.setItem('m365_token', token)
        fetch('https://graph.microsoft.com/v1.0/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            if (!res.ok) throw new Error('API Error')
            return res.json()
          })
          .then(async (data) => {
            let photoUrl = `https://img.usecurling.com/ppl/thumbnail?seed=${Math.floor(Math.random() * 100)}`
            try {
              const pRes = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
                headers: { Authorization: `Bearer ${token}` },
              })
              if (pRes.ok) {
                const blob = await pRes.blob()
                photoUrl = URL.createObjectURL(blob)
              }
            } catch (e) {}

            const currentUsers = usersStore.getState().users
            const emailToMatch = (data.mail || data.userPrincipalName || '').toLowerCase()
            let matched = currentUsers.find((u) => u.email.toLowerCase() === emailToMatch)

            if (!matched) {
              matched = usersStore.addUser({
                name: data.displayName || 'M365 User',
                email: emailToMatch || 'user@domain.com',
                role: 'Admin',
              })
            }

            usersStore.updateUser(matched.id, {
              avatar: photoUrl,
              name: data.displayName || matched.name,
            })
            setCurrentUserId(matched.id)

            toast({
              title: 'Autenticado com sucesso',
              description: `Bem-vindo(a), ${data.displayName || matched.name}`,
            })
          })
          .catch(() => {
            toast({
              variant: 'destructive',
              title: 'Erro no Microsoft 365',
              description:
                'Unable to connect to Microsoft 365. Please verify your Client/Tenant ID and Azure App permissions.',
            })
          })
      }
    }
  }, [])

  const loginM365 = async (email: string, password?: string) => {
    const { sharepoint } = mainStore.getState()
    const { clientId, tenantId } = sharepoint

    if (clientId && tenantId) {
      const redirectUri = encodeURIComponent(window.location.origin + '/login')
      const scope = encodeURIComponent(
        'openid profile email User.Read Files.ReadWrite.All Sites.Read.All',
      )
      const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}&nonce=12345&login_hint=${encodeURIComponent(email)}`
      window.location.href = authUrl
      return new Promise<void>(() => {}) // Stalls until redirect
    }

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
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
              `Acesso negado. O e-mail fornecido não pertence ao tenant autorizado (@${domain}).`,
            ),
          )
          return
        }

        const { users } = usersStore.getState()
        let foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

        if (!foundUser) {
          const nameParts = emailParts[0].split('.')
          const name = nameParts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')

          foundUser = usersStore.addUser({
            name,
            email: email.toLowerCase(),
            role: 'Vistoriador' as Role,
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
    sessionStorage.removeItem('m365_token')
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
