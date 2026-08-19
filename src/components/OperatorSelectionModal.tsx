import { useEffect, useState } from 'react'
import { UserCircle2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { getCurrentOperator, setCurrentOperator, getOperatorsForEmail } from '@/lib/operator'

interface OperatorSelectionModalProps {
  /** Email da conta M365 recém-autenticada. */
  email: string | undefined
  /** Disparado quando o operador foi escolhido (ou quando não há modal a exibir). */
  onResolved: () => void
}

/**
 * Modal obrigatório de seleção de operador, exibido APENAS quando a conta
 * recém-logada tem operadores cadastrados e ainda não há operador escolhido
 * nesta sessão. Não pode ser fechado sem escolher — só há os botões com os
 * nomes dos operadores.
 */
export function OperatorSelectionModal({ email, onResolved }: OperatorSelectionModalProps) {
  const [operators, setOperators] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      if (!email) {
        setOperators([])
        setLoading(false)
        return
      }
      const list = await getOperatorsForEmail(email)
      if (!active) return
      setOperators(list)
      setLoading(false)
    }
    load()
    return () => {
      active = false
    }
  }, [email])

  // Sem operadores → não exibe modal; avisa que pode seguir fluxo normal.
  const shouldShow = !loading && operators.length > 0 && !getCurrentOperator()

  useEffect(() => {
    if (loading) return
    if (!shouldShow) {
      onResolved()
    }
  }, [loading, shouldShow, onResolved])

  const handlePick = (name: string) => {
    setCurrentOperator(name)
    onResolved()
  }

  return (
    <Dialog open={shouldShow} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader className="items-center text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <UserCircle2 className="h-7 w-7 text-primary" />
          </div>
          <DialogTitle>Quem está usando o sistema?</DialogTitle>
          <DialogDescription>
            Esta conta possui mais de um operador. Selecione o seu nome para continuar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          {operators.map((name) => (
            <Button
              key={name}
              variant="outline"
              className="w-full justify-center h-11"
              onClick={() => handlePick(name)}
            >
              {name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
