import { useState, useEffect } from 'react'
import { UsersRound, Search, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import useEntitiesStore, { entitiesStore, EntityModel, initEntitiesStore } from '@/stores/entities'

export default function Entities() {
  const { owners, tenants } = useEntitiesStore()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState<'owners' | 'tenants'>('owners')
  const [search, setSearch] = useState('')
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    setIsFetching(true)
    initEntitiesStore().finally(() => setIsFetching(false))
  }, [])

  const currentList = activeTab === 'owners' ? owners : tenants
  const filteredList = currentList.filter(
    (e) =>
      e.fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.code.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <UsersRound className="w-8 h-8 text-primary" />
            Entidades Integradas
          </h1>
          <p className="text-muted-foreground">
            Consulta de Proprietários e Locatários integrados com o ERP Local (Modo Leitura).
          </p>
        </div>
        <Button variant="outline" className="gap-2" disabled>
          <ExternalLink className="w-4 h-4" /> Gerido no ERP
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Tabs
              value={activeTab}
              onValueChange={(v: any) => setActiveTab(v)}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full sm:w-auto grid-cols-2">
                <TabsTrigger value="owners">Proprietários</TabsTrigger>
                <TabsTrigger value="tenants">Locatários</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou código..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código (ID)</TableHead>
                <TableHead>Nome Completo</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead className="text-right">Origem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono font-medium">{item.code}</TableCell>
                  <TableCell className="font-medium">{item.fullName}</TableCell>
                  <TableCell>{item.cpf || '-'}</TableCell>
                  <TableCell className="truncate max-w-[200px]" title={item.fullAddress}>
                    {item.fullAddress || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-[10px] font-medium text-secondary-foreground ring-1 ring-inset ring-secondary-foreground/10">
                      ERP Local
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              {filteredList.length === 0 && isFetching && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Buscando registros...
                  </TableCell>
                </TableRow>
              )}
              {filteredList.length === 0 && !isFetching && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
