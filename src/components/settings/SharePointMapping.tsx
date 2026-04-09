import { useState, useEffect } from 'react'
import { Save, Loader2, FolderSync } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'

type SharepointConfig = {
  id: string
  document_type: string
  site_name: string
  library_name: string
  base_path: string
}

const docTypeLabels: Record<string, string> = {
  CONTRACT_ACTIVE: 'Contrato Ativo',
  CONTRACT_TERMINATED: 'Contrato Encerrado',
  INSPECTION_MOVE_IN: 'Vistoria de Entrada',
  INSPECTION_MOVE_OUT: 'Vistoria de Saída',
  OWNER_DOCUMENT: 'Doc Proprietário',
  TENANT_DOCUMENT: 'Doc Inquilino',
  GUARANTEE_DOCUMENT: 'Documentos de Garantia',
}

export default function SharePointMapping() {
  const { toast } = useToast()
  const [configs, setConfigs] = useState<SharepointConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    fetchConfigs()
  }, [])

  const fetchConfigs = async () => {
    setLoading(true)
    const { data } = await supabase.from('sharepoint_configs').select('*').order('document_type')
    if (data) setConfigs(data)
    setLoading(false)
  }

  const handleSave = async (config: SharepointConfig) => {
    setSaving(config.id)
    const { error } = await supabase
      .from('sharepoint_configs')
      .update({
        site_name: config.site_name,
        library_name: config.library_name,
        base_path: config.base_path,
        updated_at: new Date().toISOString(),
      })
      .eq('id', config.id)

    setSaving(null)
    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao salvar', description: error.message })
    } else {
      toast({
        title: 'Configuração atualizada',
        description: 'Mapeamento de pastas salvo com sucesso.',
      })
    }
  }

  const handleChange = (id: string, field: keyof SharepointConfig, value: string) => {
    setConfigs((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderSync className="w-5 h-5 text-primary" /> Motor de Mapeamento de Documentos
        </CardTitle>
        <CardDescription>
          Configure o Site, Biblioteca e Caminho Base (Base Path) para cada tipo de documento. O
          sistema organizará as pastas seguindo a hierarquia: [Caminho Base]/[Imóvel] ou [Caminho
          Base]/[Imóvel]/Locacao/[Locação] na nuvem M365.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo de Documento</TableHead>
                  <TableHead>Site M365 (Path)</TableHead>
                  <TableHead>Biblioteca (Drive)</TableHead>
                  <TableHead>Caminho Raiz</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {configs.map((config) => (
                  <TableRow key={config.id}>
                    <TableCell className="font-medium whitespace-nowrap">
                      {docTypeLabels[config.document_type] || config.document_type}
                    </TableCell>
                    <TableCell>
                      <Input
                        value={config.site_name}
                        onChange={(e) => handleChange(config.id, 'site_name', e.target.value)}
                        placeholder="Ex: locacao ou /sites/locacao"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={config.library_name}
                        onChange={(e) => handleChange(config.id, 'library_name', e.target.value)}
                        placeholder="Ex: Documentos Compartilhados"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={config.base_path}
                        onChange={(e) => handleChange(config.id, 'base_path', e.target.value)}
                        placeholder="Ex: Proprietarios"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleSave(config)}
                        disabled={saving === config.id}
                      >
                        {saving === config.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
