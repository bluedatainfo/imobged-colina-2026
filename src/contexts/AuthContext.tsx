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
  isExchanging: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

function generateRandomString(length: number) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  let result = ''
  const values = new Uint32Array(length)
  crypto.getRandomValues(values)
  for (let i = 0; i < length; i++) {
    result += charset[values[i] % charset.length]
  }
  return result
}

async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [isExchanging, setIsExchanging] = useState(false)

  // Derive current user dynamically so role changes reflect immediately
  const { users } = usersStore.getState()
  const user = currentUserId ? users.find((u) => u.id === currentUserId) || null : null

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erro de Autenticação',
        description:
          errorDescription ||
          'Não foi possível conectar ao Microsoft 365. Verifique as permissões do Azure App.',
      })
      window.history.replaceState({}, document.title, window.location.pathname)
      return
    }

    if (code) {
      setIsExchanging(true)
      window.history.replaceState({}, document.title, window.location.pathname)

      const { sharepoint } = mainStore.getState()
      const { clientId, tenantId } = sharepoint
      const codeVerifier = sessionStorage.getItem('pkce_code_verifier')

      if (!clientId || !tenantId || !codeVerifier) {
        setIsExchanging(false)
        toast({
          variant: 'destructive',
          title: 'Sessão Incompleta ou Expirada',
          description:
            'A sessão de login expirou ou as configurações de Client/Tenant ID estão ausentes. Por favor, inicie o login novamente.',
        })
        return
      }

      const redirectUri = window.location.origin + '/login'
      const tokenParams = new URLSearchParams()
      tokenParams.append('client_id', clientId)
      tokenParams.append(
        'scope',
        'openid profile email User.Read Files.ReadWrite.All Sites.Read.All offline_access',
      )
      tokenParams.append('code', code)
      tokenParams.append('redirect_uri', redirectUri)
      tokenParams.append('grant_type', 'authorization_code')
      tokenParams.append('code_verifier', codeVerifier)

      fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: tokenParams.toString(),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errData = await res.json().catch(() => null)
            console.error('Token Exchange Error:', errData)
            throw new Error(
              errData?.error_description ||
                errData?.error ||
                'Falha ao obter token de acesso do Microsoft Entra ID.',
            )
          }
          return res.json()
        })
        .then((tokenData) => {
          const token = tokenData.access_token
          sessionStorage.setItem('m365_token', token)
          sessionStorage.removeItem('pkce_code_verifier')

          return fetch('https://graph.microsoft.com/v1.0/me', {
            headers: { Authorization: `Bearer ${token}` },
          }).then(async (res) => {
            if (!res.ok) {
              const errData = await res.json().catch(() => null)
              console.error('Graph API Error:', errData)
              throw new Error(errData?.error?.message || 'Erro de permissão na Graph API.')
            }
            return res.json().then((data) => ({ data, token }))
          })
        })
        .then(async ({ data, token }) => {
          let photoUrl = `https://img.usecurling.com/ppl/thumbnail?seed=${Math.floor(
            Math.random() * 100,
          )}`
          try {
            const pRes = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
              headers: { Authorization: `Bearer ${token}` },
            })
            if (pRes.ok) {
              const blob = await pRes.blob()
              photoUrl = URL.createObjectURL(blob)
            }
          } catch (e) {
            // Ignore photo fetch errors
          }

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
        .catch((e) => {
          toast({
            variant: 'destructive',
            title: 'Erro de Integração',
            description:
              e.message || 'Não foi possível completar a autenticação com o Microsoft 365.',
          })
        })
        .finally(() => {
          setIsExchanging(false)
        })
    }
  }, [])

  const loginM365 = async (email: string, password?: string) => {
    const { sharepoint } = mainStore.getState()
    const { clientId, tenantId } = sharepoint

    if (clientId && tenantId) {
      const codeVerifier = generateRandomString(64)
      sessionStorage.setItem('pkce_code_verifier', codeVerifier)
      const codeChallenge = await generateCodeChallenge(codeVerifier)

      const redirectUri = encodeURIComponent(window.location.origin + '/login')
      const scope = encodeURIComponent(
        'openid profile email User.Read Files.ReadWrite.All Sites.Read.All offline_access',
      )

      const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=S256&login_hint=${encodeURIComponent(
        email,
      )}`

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
    sessionStorage.removeItem('pkce_code_verifier')
    setCurrentUserId(null)
  }

  const switchUser = (id: string) => {
    setCurrentUserId(id)
  }

  return (
    <AuthContext.Provider value={{ user, loginM365, logout, switchUser, isExchanging }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
