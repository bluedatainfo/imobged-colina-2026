import { useState, useEffect } from 'react'
import { UsersRound, Search, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import { formatCpf } from '@/lib/utils'
import useEntitiesStore, {
  entitiesStore,
  EntityModel,
  GuaranteeModel,
  initEntitiesStore,
} from '@/stores/entities'

type TabValue = 'owners' | 'tenants' | 'guarantees'

export default function Entities() {
  const { owners, tenants, guarantees, guaranteesError } = useEntitiesStore()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState<TabValue>('owners')
  const [search, setSearch] = useState('')
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    setIsFetching(true)
    initEntitiesStore().finally(() => setIsFetching(false))
  }, [])

  const currentList: EntityModel[] = activeTab === 'owners' ? owners : tenants
  const filteredList = currentList.filter(
    (e) =>
      e.fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.code.toLowerCase().includes(search.toLowerCase()),
  )

  const filteredGuarantees = guarantees.filter(
    (g) =>
      g.nome.toLowerCase().includes(search.toLowerCase()) ||
      g.cpf.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <UsersRound className="w-8 h-8 text-primary" />
          Entidades Integradas
        </h1>
        <p className="text-muted-foreground">
          Consulta de Proprietários, Locatários e Garantias integrados com o ERP Local (Modo
          Leitura).
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as TabValue)}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full sm:w-auto grid-cols-3">
                <TabsTrigger value="owners">Proprietários</TabsTrigger>
                <TabsTrigger value="tenants">Locatários</TabsTrigger>
                <TabsTrigger value="guarantees">Garantias</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder={
                  activeTab === 'guarantees'
                    ? 'Buscar por nome ou CPF...'
                    : 'Buscar por nome ou código...'
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
            <TabsContent value="owners" className="mt-0">
              <EntityTable list={filteredList} isFetching={isFetching} />
            </TabsContent>
            <TabsContent value="tenants" className="mt-0">
              <EntityTable list={filteredList} isFetching={isFetching} />
            </TabsContent>
            <TabsContent value="guarantees" className="mt-0">
              {guaranteesError ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="w-10 h-10 text-destructive mb-3" />
                  <p className="text-muted-foreground font-medium">
                    Não foi possível carregar os dados de garantias.
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Verifique a conexão com o ERP local e tente novamente.
                  </p>
                </div>
              ) : (
                <div className="rounded-md border bg-card overflow-hidden">
                  <div
                    style={{ direction: 'rtl' }}
                    className="overflow-y-auto overflow-x-auto max-h-[60vh] scrollbar-thin"
                  >
                    <Table style={{ direction: 'ltr' }} className="w-full min-w-[900px]">
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Nome</TableHead>
                          <TableHead>CPF</TableHead>
                          <TableHead>Pessoa (F/J)</TableHead>
                          <TableHead>Celular</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Endereço</TableHead>
                          <TableHead>Telefone</TableHead>
                          <TableHead className="text-center">Ativo (S/N)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGuarantees.map((g) => (
                          <TableRow key={g.id}>
                            <TableCell className="font-mono font-medium">{g.id}</TableCell>
                            <TableCell className="font-medium">{g.nome}</TableCell>
                            <TableCell>{g.cpf ? formatCpf(g.cpf) : '-'}</TableCell>
                            <TableCell>{g.pessoa || '-'}</TableCell>
                            <TableCell>{g.celular || '-'}</TableCell>
                            <TableCell className="truncate max-w-[180px]" title={g.email}>
                              {g.email || '-'}
                            </TableCell>
                            <TableCell className="truncate max-w-[200px]" title={g.endereco}>
                              {g.endereco || '-'}
                            </TableCell>
                            <TableCell>{g.telefone || '-'}</TableCell>
                            <TableCell className="text-center">
                              <span
                                className={
                                  g.ativo === 'S'
                                    ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-[10px] font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
                                    : 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-[10px] font-medium text-red-700 ring-1 ring-inset ring-red-600/20'
                                }
                              >
                                {g.ativo || '-'}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredGuarantees.length === 0 && isFetching && (
                          <TableRow>
                            <TableCell
                              colSpan={9}
                              className="text-center py-8 text-muted-foreground"
                            >
                              Buscando registros...
                            </TableCell>
                          </TableRow>
                        )}
                        {filteredGuarantees.length === 0 && !isFetching && (
                          <TableRow>
                            <TableCell
                              colSpan={9}
                              className="text-center py-8 text-muted-foreground"
                            >
                              Nenhum registro encontrado.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function EntityTable({ list, isFetching }: { list: EntityModel[]; isFetching: boolean }) {
  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <div
        style={{ direction: 'rtl' }}
        className="overflow-y-auto overflow-x-auto max-h-[60vh] scrollbar-thin"
      >
        <Table style={{ direction: 'ltr' }} className="w-full min-w-[750px]">
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
            {list.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono font-medium">{item.code}</TableCell>
                <TableCell className="font-medium">{item.fullName}</TableCell>
                <TableCell>{item.cpf ? formatCpf(item.cpf) : '-'}</TableCell>
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
            {list.length === 0 && isFetching && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Buscando registros...
                </TableCell>
              </TableRow>
            )}
            {list.length === 0 && !isFetching && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
