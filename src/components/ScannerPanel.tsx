import { Printer, Settings2, FileText, CheckCircle2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'

export function ScannerPanel() {
  const { toast } = useToast()

  const handleScan = () => {
    toast({
      title: 'Scanner Epson ES-580W Conectado',
      description: 'Iniciando digitalização em lote. Preparando motor OCR...',
    })
  }

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="bg-muted/50 border-b pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Printer className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Protocolo Epson ES-580W</CardTitle>
          </div>
          <div className="flex items-center gap-1 text-sm text-emerald-600 font-medium">
            <CheckCircle2 className="h-4 w-4" />
            Pronto
          </div>
        </div>
        <CardDescription>
          Configurações para digitalização em lote de alta velocidade.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Resolução (DPI)</Label>
            <Select defaultValue="300">
              <SelectTrigger>
                <SelectValue placeholder="Selecione DPI" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="200">200 DPI (Rápido)</SelectItem>
                <SelectItem value="300">300 DPI (Recomendado)</SelectItem>
                <SelectItem value="600">600 DPI (Alta Qualidade)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Modo de Cor</Label>
            <Select defaultValue="color">
              <SelectTrigger>
                <SelectValue placeholder="Selecione a cor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="color">Cores Automáticas</SelectItem>
                <SelectItem value="gray">Tons de Cinza</SelectItem>
                <SelectItem value="bw">Preto e Branco</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">Digitalização Duplex</Label>
            <p className="text-sm text-muted-foreground">
              Escanear frente e verso automaticamente.
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">Reconhecimento OCR</Label>
            <p className="text-sm text-muted-foreground">Extrair metadados para o SharePoint.</p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full h-12 text-lg gap-2" onClick={handleScan}>
          <FileText className="h-5 w-5" />
          Iniciar Digitalização em Lote
        </Button>
      </CardFooter>
    </Card>
  )
}
