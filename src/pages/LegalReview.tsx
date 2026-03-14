import { Check, X, Eye, FileWarning } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockReviewQueue } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'

const LegalReview = () => {
  const { toast } = useToast()

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    toast({
      title: action === 'approve' ? 'Documento Aprovado' : 'Documento Rejeitado',
      description: `Ação registrada para o documento ID: ${id}. Sincronizando com M365...`,
      variant: action === 'reject' ? 'destructive' : 'default',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fila de Análise Jurídica</h1>
        <p className="text-muted-foreground">
          Revise e aprove documentos contratuais antes do arquivamento definitivo.
        </p>
      </div>

      <div className="grid gap-4">
        {mockReviewQueue.map((item) => (
          <Card
            key={item.id}
            className="flex flex-col md:flex-row items-center justify-between p-4 gap-4"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-amber-100 p-3 rounded-full shrink-0">
                <FileWarning className="h-6 w-6 text-amber-600" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg leading-none">{item.docName}</h3>
                <p className="text-sm text-muted-foreground">
                  Enviado por <strong>{item.submittedBy}</strong> • {item.date}
                </p>
                <div className="flex gap-2 pt-2">
                  <Badge variant="outline" className="border-amber-500 text-amber-600">
                    Aguardando Análise
                  </Badge>
                  {item.priority === 'Alta' && <Badge variant="destructive">Prioridade Alta</Badge>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 md:flex-none"
                onClick={() => toast({ title: 'Visualizador aberto' })}
              >
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleAction(item.id, 'reject')}
                title="Rejeitar"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                size="icon"
                onClick={() => handleAction(item.id, 'approve')}
                title="Aprovar"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}

        {mockReviewQueue.length === 0 && (
          <Card className="p-12 text-center text-muted-foreground">
            <Check className="h-12 w-12 mx-auto mb-4 text-emerald-500 opacity-50" />
            <p>A fila está vazia. Ótimo trabalho!</p>
          </Card>
        )}
      </div>
    </div>
  )
}

export default LegalReview
