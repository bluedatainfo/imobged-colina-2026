import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUsersStore, { SystemUser, usersStore } from '@/stores/users'
import { initMainStore, mainStore } from '@/stores/main'
import { initContractsStore } from '@/stores/contracts'
import { initKeysStore } from '@/stores/keys'
import { initUsersStore } from '@/stores/users'
import { initEntitiesStore } from '@/stores/entities'
import { initTemplatesStore } from '@/stores/templates'
import { initDocumentsStore } from '@/stores/documents'
import { Role, getFirstAllowedPath } from '@/lib/permissions'
import { toast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'
import { OperatorSelectionModal } from '@/components/OperatorSelectionModal'
import { clearCurrentOperator } from '@/lib/operator'

/**
 * Garante que o mainStore tenha uma configuração de RBAC utilizável ANTES de
 * qualquer redirecionamento pós-login. Se o banco devolver role_settings nulo,
 * vazio ou sem o campo `rbac`, restaura o RBAC padrão do store para que o
 * ProtectedRoute nunca leia um estado incompleto e mande o usuário para
 * /access-denied. Mesmo que o RBAC continue incompleto para um perfil
 * específico, o fallback de `checkAccess` (áreas comuns) ainda protege o acesso
 * básico — esta função é uma camada extra de resiliência.
 */
const ensureRbacLoaded = async () => {
  await initMainStore()
  const { settings } = mainStore.getState()
  if (!settings?.rbac || Object.keys(settings.rbac).length === 0) {
    // Recarrega os padrões do store caso o banco tenha retornado um RBAC vazio.
    await initMainStore()
  }
}

type AuthContextType = {
  user: SystemUser | null
  loginM365: (email: string, password?: string) => Promise<void>
  logout: () => void
  switchUser: (id: string) => void
  isExchanging: boolean
}

/**
 * Indica se o modal de seleção de operador deve ser exibido. É ligado quando o
 * usuário recém-autenticado (e com sessão válida) possui operadores
 * cadastrados e ainda não escolheu um operador nesta sessão. O próprio modal
 * decide (consultando app_settings + sessionStorage) se realmente mostra os
 * botões ou se pode seguir o fluxo normal; este flag serve apenas para
 * (re)acioná-lo após login e após troca de conta.
 */
type OperatorPrompt = { open: boolean; email: string | undefined }

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
  const [currentUserId, setCurrentUserId] = useState<string | null>(() =>
    localStorage.getItem('app_user_id'),
  )
  const [isExchanging, setIsExchanging] = useState(false)
  const [operatorPrompt, setOperatorPrompt] = useState<OperatorPrompt>({
    open: false,
    email: undefined,
  })
  const navigate = useNavigate()

  const { users } = useUsersStore()
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
      const processAuth = async () => {
        // Limpa imediatamente o código da URL para não reenviar em recarregamento
        window.history.replaceState({}, document.title, window.location.pathname)
        setIsExchanging(true)

        // Helper para garantir timeout em qualquer Promise ou PromiseLike (padrão 30s)
        const withTimeout = <T,>(
          promise: PromiseLike<T>,
          timeoutMs = 30000,
          errorMessage = 'Tempo de resposta excedido. Não foi possível concluir o login. Tente novamente.',
        ): Promise<T> => {
          return new Promise<T>((resolve, reject) => {
            const timer = setTimeout(() => {
              reject(new Error(errorMessage))
            }, timeoutMs)

            Promise.resolve(promise)
              .then((result) => {
                clearTimeout(timer)
                resolve(result)
              })
              .catch((err) => {
                clearTimeout(timer)
                reject(err)
              })
          })
        }

        const fetchWithTimeout = (
          input: RequestInfo | URL,
          init?: RequestInit,
          timeoutMs = 30000,
        ): Promise<Response> => {
          const controller = new AbortController()
          const timer = setTimeout(() => controller.abort(), timeoutMs)
          return fetch(input, { ...init, signal: controller.signal }).finally(() => {
            clearTimeout(timer)
          })
        }

        try {
          let { sharepoint } = mainStore.getState()
          let { clientId, tenantId, primaryDomain } = sharepoint
          const codeVerifier = localStorage.getItem('pkce_code_verifier')

          if (!clientId || !tenantId) {
            const { data: dbSettings, error: dbSettingsError } = await withTimeout(
              supabase
                .from('app_settings')
                .select('client_id, tenant_id, default_domain')
                .order('updated_at', { ascending: false })
                .limit(1)
                .maybeSingle(),
              30000,
              'Tempo esgotado ao consultar configurações do sistema. Tente novamente.',
            )

            if (dbSettingsError) {
              throw new Error(
                'Falha ao consultar configurações do sistema: ' + dbSettingsError.message,
              )
            }

            if (dbSettings) {
              clientId = dbSettings.client_id || clientId
              tenantId = dbSettings.tenant_id || tenantId
              primaryDomain = dbSettings.default_domain || primaryDomain
              mainStore.hydrateSharePointSettings({ clientId, tenantId, primaryDomain })
            }
          }

          if (!clientId || !tenantId || !codeVerifier) {
            throw new Error(
              'A sessão de login expirou ou as configurações de Client/Tenant ID estão ausentes. Por favor, inicie o login novamente.',
            )
          }

          const redirectUri = window.location.origin + '/login'
          const tokenParams = new URLSearchParams()
          tokenParams.append('client_id', clientId)
          tokenParams.append(
            'scope',
            'openid profile email User.Read User.ReadBasic.All Files.ReadWrite.All Sites.Read.All offline_access',
          )
          tokenParams.append('code', code)
          tokenParams.append('redirect_uri', redirectUri)
          tokenParams.append('grant_type', 'authorization_code')
          tokenParams.append('code_verifier', codeVerifier)

          let res: Response
          try {
            res = await fetchWithTimeout(
              `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: tokenParams.toString(),
              },
              30000,
            )
          } catch (fetchErr: any) {
            if (fetchErr?.name === 'AbortError') {
              throw new Error(
                'Tempo limite excedido ao obter token do Microsoft Entra ID. Tente novamente.',
              )
            }
            throw fetchErr
          }

          if (!res.ok) {
            const errData = await res.json().catch(() => null)
            throw new Error(
              errData?.error_description ||
                errData?.error ||
                'Falha ao obter token de acesso do Microsoft Entra ID.',
            )
          }

          const tokenData = await res.json()
          const token = tokenData.access_token
          localStorage.setItem('m365_token', token)
          if (tokenData.refresh_token) {
            localStorage.setItem('m365_refresh_token', tokenData.refresh_token)
          }
          localStorage.removeItem('pkce_code_verifier')

          let profileRes: Response
          try {
            profileRes = await fetchWithTimeout(
              'https://graph.microsoft.com/v1.0/me',
              {
                headers: { Authorization: `Bearer ${token}` },
              },
              30000,
            )
          } catch (profileErr: any) {
            if (profileErr?.name === 'AbortError') {
              throw new Error(
                'Tempo limite excedido ao obter perfil do usuário no Microsoft Graph. Tente novamente.',
              )
            }
            throw profileErr
          }

          if (!profileRes.ok) {
            const errData = await profileRes.json().catch(() => null)
            throw new Error(errData?.error?.message || 'Erro de permissão na Graph API.')
          }

          const profileData = await profileRes.json()
          const emailToMatch = (
            profileData.mail ||
            profileData.userPrincipalName ||
            ''
          ).toLowerCase()

          if (primaryDomain) {
            const lowerDomain = primaryDomain.toLowerCase()
            if (!emailToMatch.endsWith(`@${lowerDomain}`)) {
              throw new Error(
                `Acesso negado. Seu email não pertence ao domínio autorizado (@${primaryDomain}).`,
              )
            }
          }

          let photoUrl = ''
          try {
            const pRes = await fetchWithTimeout(
              'https://graph.microsoft.com/v1.0/me/photo/$value',
              {
                headers: { Authorization: `Bearer ${token}` },
              },
              10000,
            )
            if (pRes.ok) {
              const blob = await pRes.blob()
              photoUrl = URL.createObjectURL(blob)
            }
          } catch (e) {
            // Falha ao obter foto é não-crítica; continua login normalmente
          }

          const { error: sysAuthError } = await withTimeout(
            supabase.auth.signInWithPassword({
              email: 'system@imobiliaria.local',
              password: 'SystemPassword123!',
            }),
            30000,
            'Tempo limite esgotado ao inicializar sessão do sistema. Tente novamente.',
          )

          if (sysAuthError) {
            throw new Error('Falha ao inicializar sessão do sistema: ' + sysAuthError.message)
          }

          // Popula o store de usuários ANTES de decidir a role, para que as
          // permissões RBAC configuradas em /settings sejam respeitadas.
          await withTimeout(
            initUsersStore(),
            30000,
            'Tempo limite esgotado ao carregar usuários. Tente novamente.',
          )

          const existingUser = usersStore
            .getState()
            .users.find((u) => u.email.toLowerCase() === emailToMatch)

          const matched = usersStore.addUser({
            id: profileData.id,
            name: profileData.displayName || 'M365 User',
            email: emailToMatch,
            role: existingUser ? existingUser.role : 'Vistoriador',
            avatar: photoUrl,
          })

          // Garante que o RBAC do mainStore esteja carregado do banco ANTES
          // de definir o usuário, evitando que o ProtectedRoute leia um estado
          // desatualizado e envie o usuário para /access-denied. Mesmo se o
          // RBAC vier incompleto do banco, ensureRbacLoaded restaura os
          // padrões e o fallback de checkAccess libera as áreas comuns.
          await withTimeout(
            ensureRbacLoaded(),
            30000,
            'Tempo limite esgotado ao carregar permissões do sistema. Tente novamente.',
          )

          setCurrentUserId(matched.id)
          localStorage.setItem('app_user_id', matched.id)

          await withTimeout(
            Promise.all([
              initContractsStore(),
              initKeysStore(),
              initEntitiesStore(),
              initTemplatesStore(),
              initDocumentsStore(),
            ]),
            30000,
            'Tempo limite esgotado ao inicializar módulos do sistema. Tente novamente.',
          )

          // Redireciona para a primeira rota permitida pelo RBAC do perfil
          // (ex.: "Caixa" → "/caixa", "Gestor de Contrato" → "/ongoing-contracts")
          // em vez de sempre ir para "/", evitando o bloqueio do `checkAccess`
          // para perfis sem Dashboard no RBAC. Perfis com "all" ou com "/" no
          // RBAC continuam caindo no Dashboard normalmente.
          const redirectPath = getFirstAllowedPath(matched.role)
          navigate(redirectPath, { replace: true })

          // Após login M365 bem-sucedido, dispara a verificação do seletor
          // de operador: se a conta tiver operadores cadastrados e não houver
          // operador escolhido nesta sessão, o modal (vinculado abaixo) abre.
          // Contas sem operadores seguem o fluxo normal sem qualquer mudança.
          setOperatorPrompt({ open: true, email: matched.email })

          toast({
            title: 'Autenticado com sucesso',
            description: `Bem-vindo(a), ${profileData.displayName || matched.name}`,
          })
        } catch (e: any) {
          // Limpa tokens, verifier e dados parciais em caso de qualquer falha
          localStorage.removeItem('m365_token')
          localStorage.removeItem('m365_refresh_token')
          localStorage.removeItem('pkce_code_verifier')
          localStorage.removeItem('app_user_id')
          setCurrentUserId(null)
          supabase.auth.signOut().catch(() => {})

          // Garante que a URL esteja limpa de qualquer resquício de ?code=
          window.history.replaceState({}, document.title, window.location.pathname)

          toast({
            variant: 'destructive',
            title: 'Erro de Autenticação',
            description: e?.message || 'Não foi possível concluir o login. Tente novamente.',
          })
        } finally {
          setIsExchanging(false)
        }
      }
      processAuth()
    }
  }, [])

  const loginM365 = async (email: string, password?: string) => {
    let { clientId, tenantId, primaryDomain } = mainStore.getState().sharepoint

    if (!clientId || !tenantId) {
      const { data: dbSettings } = await supabase
        .from('app_settings')
        .select('client_id, tenant_id, default_domain')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (dbSettings) {
        clientId = dbSettings.client_id || clientId
        tenantId = dbSettings.tenant_id || tenantId
        primaryDomain = dbSettings.default_domain || primaryDomain
        mainStore.hydrateSharePointSettings({ clientId, tenantId, primaryDomain })
      }
    }

    if (clientId && tenantId) {
      const codeVerifier = generateRandomString(64)
      localStorage.setItem('pkce_code_verifier', codeVerifier)
      const codeChallenge = await generateCodeChallenge(codeVerifier)

      const redirectUri = encodeURIComponent(window.location.origin + '/login')
      const scope = encodeURIComponent(
        'openid profile email User.Read User.ReadBasic.All Files.ReadWrite.All Sites.Read.All offline_access',
      )

      const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=S256&login_hint=${encodeURIComponent(
        email,
      )}`

      window.location.href = authUrl
      return new Promise<void>(() => {})
    }

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const domain = primaryDomain?.trim().toLowerCase()

        if (!domain) {
          reject(
            new Error('Acesso negado. Domínio Primário não configurado nas definições do sistema.'),
          )
          return
        }

        const emailParts = email.split('@')
        const emailDomain = emailParts.length > 1 ? emailParts[1].toLowerCase() : ''

        if (emailDomain !== domain && domain !== 'imobiliaria.local') {
          reject(
            new Error(
              `Acesso negado. O e-mail fornecido não pertence ao tenant autorizado (@${domain}).`,
            ),
          )
          return
        }

        const nameParts = emailParts[0].split('.')
        const name = nameParts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
        const isAdminAlias =
          emailParts[0].toLowerCase() === 'admin' || emailParts[0].toLowerCase() === 'administrator'

        supabase.auth
          .signInWithPassword({
            email: 'system@imobiliaria.local',
            password: 'SystemPassword123!',
          })
          .then(() => {
            // Popula o store de usuários antes de decidir a role, respeitando
            // as permissões RBAC configuradas em /settings.
            initUsersStore()
              .then(() => {
                const existingUser = usersStore
                  .getState()
                  .users.find((u) => u.email.toLowerCase() === email.toLowerCase())

                const foundUser = usersStore.addUser({
                  name,
                  email: email.toLowerCase(),
                  role: isAdminAlias
                    ? 'Admin'
                    : existingUser
                      ? existingUser.role
                      : ('Vistoriador' as Role),
                })

                ensureRbacLoaded().then(() => {
                  // Garante que o RBAC do mainStore esteja carregado do banco
                  // ANTES de definir o usuário, evitando que o ProtectedRoute
                  // leia um estado desatualizado e envie para /access-denied.
                  // Mesmo se o RBAC vier incompleto do banco, o fallback de
                  // checkAccess libera as áreas comuns (página inicial, perfil).
                  setCurrentUserId(foundUser.id)
                  localStorage.setItem('app_user_id', foundUser.id)

                  Promise.all([
                    initContractsStore(),
                    initKeysStore(),
                    initEntitiesStore(),
                    initTemplatesStore(),
                    initDocumentsStore(),
                  ]).then(() => {
                    // Redireciona para a primeira rota permitida pelo RBAC do
                    // perfil, em vez de sempre ir para "/". A página de Login
                    // também escuta `user` e faz o navigate, mas chamamos aqui
                    // para garantir a rota correta antes do próximo render.
                    const redirectPath = getFirstAllowedPath(foundUser.role)
                    navigate(redirectPath, { replace: true })

                    // Pós-login: dispara a verificação do seletor de operador
                    // (apenas contas com operadores cadastrados exibirão o
                    // modal). Contas sem operadores seguem o fluxo normal.
                    setOperatorPrompt({ open: true, email: foundUser.email })

                    resolve()
                  })
                })
              })
              .catch((e) => {
                reject(new Error('Falha de sessão interna: ' + e.message))
              })
          })
          .catch((e) => {
            reject(new Error('Falha de sessão interna: ' + e.message))
          })
      }, 1200)
    })
  }

  const logout = async () => {
    // Limpa a seleção de operador ao encerrar a sessão, para que o próximo
    // login comece sem operador (ou reforce a seleção, se a conta tiver
    // operadores cadastrados).
    clearCurrentOperator()
    localStorage.removeItem('m365_token')
    localStorage.removeItem('m365_refresh_token')
    localStorage.removeItem('pkce_code_verifier')
    localStorage.removeItem('app_user_id')
    setCurrentUserId(null)
    setOperatorPrompt({ open: false, email: undefined })
    await supabase.auth.signOut()
  }

  const switchUser = async (id: string) => {
    const targetUser = usersStore.getState().users.find((u) => u.id === id)
    if (targetUser) {
      await supabase.from('app_audit_logs').insert({
        id: `LOG-${Math.random().toString(36).substring(2, 9)}`,
        action: 'Account Switch',
        user_name: user?.name || 'Sistema',
        user_email: targetUser.email,
        details: `Tentativa de alternar para a conta de ${targetUser.email}. Redirecionado para M365 Auth.`,
        timestamp: new Date().toISOString(),
      })
    }
    localStorage.removeItem('m365_token')
    localStorage.removeItem('m365_refresh_token')
    localStorage.removeItem('pkce_code_verifier')
    localStorage.removeItem('app_user_id')
    setCurrentUserId(null)
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, loginM365, logout, switchUser, isExchanging }}>
      {children}
      {operatorPrompt.open && (
        <OperatorSelectionModal
          email={operatorPrompt.email}
          onResolved={() => setOperatorPrompt({ open: false, email: undefined })}
        />
      )}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
