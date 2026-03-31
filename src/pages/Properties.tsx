import { useState } from 'react'
import { Building, Search, Loader2, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'

interface ERPProperty {
  id: number
  tipo: string
  endereco: string
  numero: string
  complemento: string
  bairro: string
  cep: string
  cidade: string
  uf: string
  proprietarios?: {
    nome: string
    participacao: number
  }[]
  servicos?: {
    descricao: string
    numero: string
  }[]
}

export default function Properties() {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ERPProperty[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const { toast } = useToast()

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!search.trim()) return

    setLoading(true)
    setHasSearched(true)

    try {
      const res = await fetch(
        `http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(search)}`,
      )
      if (!res.ok) throw new Error('Erro na comunicação com o servidor local')
      const data = await res.json()

      const dataArray = Array.isArray(data) ? data : [data]
      setResults(dataArray)
    } catch (err) {
      console.error(err)
      toast({
        title: 'Erro na busca',
        description:
          'Não foi possível buscar os imóveis. Verifique a conexão com o servidor local (192.168.10.225) e as políticas de CORS.',
        variant: 'destructive',
      })
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Imóveis</h1>
        <p className="text-muted-foreground">
          Consulta em tempo real de imóveis integrados ao servidor local.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Imóveis</CardTitle>
          <CardDescription>
            Pesquise pelo nome do proprietário para listar os imóveis vinculados a ele.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Ex: MARAM, ANTONIO SALOMAO..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit" disabled={loading || !search.trim()}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Buscando...
                </>
              ) : (
                'Buscar'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {hasSearched && !loading && results.length === 0 && (
        <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-border/60 rounded-xl bg-background/50">
          <Building className="w-12 h-12 mb-4 text-muted-foreground/30" />
          <h3 className="text-lg font-medium text-foreground">Nenhum imóvel encontrado</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Não encontramos nenhum imóvel vinculado à pesquisa "{search}" no servidor local.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <Card>
          <div className="rounded-md border border-border/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Bairro / Cidade</TableHead>
                  <TableHead>Proprietário Principal</TableHead>
                  <TableHead>Serviços</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((property) => (
                  <TableRow key={property.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium text-xs">#{property.id}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {property.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {property.endereco}
                          {property.numero ? `, ${property.numero}` : ''}
                        </span>
                        {property.complemento && (
                          <span className="text-xs text-muted-foreground">
                            {property.complemento}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{property.bairro}</span>
                        <span className="text-xs text-muted-foreground">
                          {property.cidade} / {property.uf}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {property.proprietarios && property.proprietarios.length > 0 ? (
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <span
                            className="text-sm line-clamp-1 max-w-[200px]"
                            title={property.proprietarios[0].nome}
                          >
                            {property.proprietarios[0].nome}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Não informado</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {property.servicos && property.servicos.length > 0 ? (
                          property.servicos.map((serv, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-[10px] px-1.5 py-0 h-5"
                            >
                              {serv.descricao}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  )
}
