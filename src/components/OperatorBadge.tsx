import { useEffect, useState } from 'react'
import { UserCircle2, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/AuthContext'
import {
  getCurrentOperator,
  setCurrentOperator,
  getOperatorsForEmail,
  subscribeOperatorChanges,
} from '@/lib/operator'

/**
 * Selo "Operador: [Nome]" exibido no header da aplicação.
 *
 * - Visível APENAS quando `sessionStorage.currentOperator` existe.
 * - Ao clicar, abre um dropdown com os demais operadores da conta; escolher
 *   outro nome atualiza o operador atual e fecha o dropdown.
 * - Não aparece para contas sem operadores cadastrados (por construção, pois
 *   o operador atual só passa a existir depois da seleção pós-login, que só
 *   ocorre para contas com operadores).
 */
export function OperatorBadge() {
  const { user } = useAuth()
  const [current, setCurrent] = useState<string | null>(getCurrentOperator())
  const [operators, setOperators] = useState<string[]>([])

  useEffect(() => {
    const load = async () => {
      if (user?.email) {
        setOperators(await getOperatorsForEmail(user.email))
      } else {
        setOperators([])
      }
      setCurrent(getCurrentOperator())
    }
    load()
    return subscribeOperatorChanges(load)
  }, [user?.email])

  if (!current) return null

  const others = operators.filter((o) => o !== current)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
          title="Trocar de operador"
        >
          <UserCircle2 className="h-3.5 w-3.5" />
          <span className="max-w-[140px] truncate">Operador: {current}</span>
        </button>
      </DropdownMenuTrigger>
      {(others.length > 0 || operators.length > 0) && (
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Trocar de operador
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {operators.length === 0 ? (
            <DropdownMenuItem disabled className="text-muted-foreground">
              Nenhum outro operador
            </DropdownMenuItem>
          ) : (
            operators.map((name) => {
              const isActive = name === current
              return (
                <DropdownMenuItem
                  key={name}
                  onClick={() => {
                    setCurrentOperator(name)
                  }}
                  className={`cursor-pointer justify-between ${isActive ? 'bg-accent' : ''}`}
                >
                  <span className="truncate">{name}</span>
                  {isActive && <Check className="h-3.5 w-3.5 text-primary" />}
                </DropdownMenuItem>
              )
            })
          )}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}
