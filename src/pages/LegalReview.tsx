import { Gavel, FileWarning, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockLegalCases } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'

const LegalReview = () => {
  const { toast } = useToast()

  const handleAction = (id: string) => {
    toast({
      title: 'Pasta Jurídica Acessada',
      description: `Redirecionando para a Lista de Casos no SharePoint Online (Caso: ${id}).`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assuntos Jurídicos</h1>
        <p className="text-muted-foreground">
          Gestão de disputas, ações de despejo e problemas legais com inquilinos.
        </p>
      </div>

      <div className="grid gap-4">
        {mockLegalCases.map((item) => (
          <Card key={item.id} className="p-5 flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-destructive/10 p-3 rounded-full shrink-0">
              <Gavel className="h-6 w-6 text-destructive" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-xl">{item.issue}</h3>
                <Badge
                  variant={item.priority === 'Alta' ? 'destructive' : 'secondary'}
                  className="shrink-0"
                >
                  Prioridade: {item.priority}
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm pt-2">
                <div>
                  <p className="text-muted-foreground mb-1">Inquilino / Parte</p>
                  <p className="font-medium">{item.tenant}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Imóvel Referência</p>
                  <p className="font-medium">{item.property}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Status do Processo</p>
                  <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5">
                    {item.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">ID do Caso</p>
                  <p className="font-mono text-muted-foreground">{item.id}</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto md:border-l md:pl-6 flex flex-col justify-center shrink-0 h-full gap-2">
              <Button onClick={() => handleAction(item.id)} className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Acessar Autos
              </Button>
              <Button variant="outline" className="w-full">
                Atualizar Status
              </Button>
            </div>
          </Card>
        ))}

        {mockLegalCases.length === 0 && (
          <Card className="p-12 text-center text-muted-foreground">
            <Gavel className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p>Nenhuma pendência jurídica registrada. Ótimo trabalho!</p>
          </Card>
        )}
      </div>
    </div>
  )
}

export default LegalReview
