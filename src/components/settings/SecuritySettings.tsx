import { useState, useMemo } from 'react'
import { Shield, Search, Lock, MonitorSmartphone, Network } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore } from '@/stores/main'

export default function SecuritySettings() {
  const { toast } = useToast()
  const store = useMainStore()
  const [formData, setFormData] = useState(store.security)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSave = () => {
    mainStore.updateSecuritySettings(formData)
    toast({
      title: 'Políticas de Segurança Salvas',
      description: 'As configurações de acesso condicional foram atualizadas.',
    })
  }

  const filteredLogs = useMemo(() => {
    return store.auditLogs
      .filter((log) => {
        const term = searchTerm.toLowerCase()
        return (
          (log.userEmail || '').toLowerCase().includes(term) ||
          log.action.toLowerCase().includes(term) ||
          log.user.toLowerCase().includes(term)
        )
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [store.auditLogs, searchTerm])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" /> Políticas de Acesso Condicional
          </CardTitle>
          <CardDescription>
            Defina regras específicas para restringir o acesso à plataforma e garantir a segurança
            corporativa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 border rounded-lg p-4 bg-muted/20">
            <div className="flex flex-col space-y-1">
              <Label className="flex items-center gap-2 text-base">
                <Lock className="w-4 h-4" /> Restringir Acesso ao Domínio Corporativo
              </Label>
              <span className="text-sm text-muted-foreground">
                Somente usuários com e-mail do domínio autorizado podem autenticar.
              </span>
            </div>
            <Switch
              checked={formData.restrictDomain}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, restrictDomain: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-2 border rounded-lg p-4 bg-muted/20">
            <div className="flex flex-col space-y-1">
              <Label className="flex items-center gap-2 text-base">
                <MonitorSmartphone className="w-4 h-4" /> Exigir Dispositivo Gerenciado
              </Label>
              <span className="text-sm text-muted-foreground">
                Bloqueia o acesso de dispositivos não reconhecidos pelo MDM da empresa.
              </span>
            </div>
            <Switch
              checked={formData.requireManagedDevice}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, requireManagedDevice: checked }))
              }
            />
          </div>

          <div className="space-y-3 border rounded-lg p-4 bg-muted/20">
            <Label className="flex items-center gap-2 text-base">
              <Network className="w-4 h-4" /> Faixas de IP Permitidas
            </Label>
            <p className="text-sm text-muted-foreground">
              Especifique as redes permitidas. Deixe em branco para permitir conexões de qualquer
              endereço IP, útil para acesso corporativo estrito e proteção da rede.
            </p>
            <Input
              placeholder="Ex: 192.168.1.0/24, 10.0.0.0/8"
              value={formData.allowedIps}
              onChange={(e) => setFormData((prev) => ({ ...prev, allowedIps: e.target.value }))}
              className="max-w-xl bg-background"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Salvar Políticas</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" /> Logs de Auditoria de Acesso
          </CardTitle>
          <CardDescription>
            Histórico detalhado de logins, alterações e ações realizadas no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Pesquisar por email, nome ou ação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação Realizada</TableHead>
                  <TableHead>Endereço IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{log.user}</span>
                        <span className="text-xs text-muted-foreground">
                          {log.userEmail || '-'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell className="text-muted-foreground font-mono text-sm">
                      {log.ipAddress || 'Desconhecido'}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredLogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Nenhum log de auditoria encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
