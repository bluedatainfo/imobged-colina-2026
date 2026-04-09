import { useState, useEffect } from 'react'
import { Building, Search, Loader2, User, MapPin } from 'lucide-react'
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface ERPProperty {
  id: number | string
  tipo?: string
  endereco?: string
  numero?: string
  complemento?: string
  bairro?: string
  cep?: string
  cidade?: string
  uf?: string
  proprietario?: string
  nomeProprietario?: string
  proprietario_nome?: string
  cliente?: string
  proprietarios?: {
    nome: string
    participacao: number
  }[]
  servicos?: {
    descricao: string
    numero: string
  }[]
  [key: string]: any
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

export default function Properties() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<ERPProperty[]>([])

  const [results, setResults] = useState<ERPProperty[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const { toast } = useToast()

  const getOwnerName = (property: ERPProperty) => {
    if (!property) return 'Não informado'
    if (property.proprietario) return property.proprietario
    if (property.nomeProprietario) return property.nomeProprietario
    if (property.proprietario_nome) return property.proprietario_nome
    if (property.cliente) return property.cliente
    if (
      property.proprietarios &&
      Array.isArray(property.proprietarios) &&
      property.proprietarios.length > 0
    ) {
      return property.proprietarios[0].nome
    }
    return 'Proprietário não informado'
  }

  const getAddress = (property: ERPProperty) => {
    if (!property) return 'Endereço não informado'
    const parts = []
    if (property.endereco) parts.push(property.endereco)
    if (property.numero) parts.push(property.numero)
    if (property.bairro) parts.push(property.bairro)
    if (property.cidade) parts.push(property.cidade)
    if (property.uf) parts.push(property.uf)
    return parts.length > 0 ? parts.join(', ') : 'Endereço não informado'
  }

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setOptions([])
      return
    }

    let isMounted = true
    const fetchOptions = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(debouncedSearch)}`,
        )
        if (!res.ok) throw new Error('Erro na comunicação com o servidor local')
        const data = await res.json()

        if (isMounted) {
          const dataArray = Array.isArray(data) ? data : [data]
          setOptions(dataArray.filter((item) => item && item.id))
        }
      } catch (err) {
        console.error(err)
        if (isMounted) {
          setOptions([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchOptions()
    return () => {
      isMounted = false
    }
  }, [debouncedSearch])

  const handleManualSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!search.trim()) return

    setLoading(true)
    setHasSearched(true)
    setOpen(false)

    try {
      const res = await fetch(
        `http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(search)}`,
      )
      if (!res.ok) throw new Error('Erro na comunicação com o servidor local')
      const data = await res.json()

      const dataArray = Array.isArray(data) ? data : [data]
      setResults(dataArray.filter((item) => item && item.id))
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
            Pesquise pelo nome do proprietário para localizar e visualizar informações detalhadas do
            imóvel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full max-w-2xl">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="flex-1 justify-between h-12 text-base font-normal bg-background w-full"
                >
                  <span className={cn('truncate', !search && 'text-muted-foreground')}>
                    {search || 'Selecione ou busque o imóvel no servidor...'}
                  </span>
                  {loading && !open ? (
                    <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
                  ) : (
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Digite o nome do proprietário (ex: MARAM)..."
                    value={search}
                    onValueChange={setSearch}
                  />
                  <CommandList>
                    <CommandEmpty className="py-6 text-center text-sm">
                      {loading ? (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Buscando no servidor local...</span>
                        </div>
                      ) : debouncedSearch.trim().length > 0 ? (
                        'Nenhum imóvel encontrado.'
                      ) : (
                        'Digite para começar a buscar.'
                      )}
                    </CommandEmpty>
                    <CommandGroup>
                      {options.map((property) => (
                        <CommandItem
                          key={property.id}
                          value={String(property.id)}
                          onSelect={() => {
                            setSearch(getOwnerName(property))
                            setResults([property])
                            setHasSearched(true)
                            setOpen(false)
                          }}
                          className="flex flex-col items-start py-3 px-4 gap-1.5 cursor-pointer border-b border-border/40 last:border-0"
                        >
                          <div className="flex items-center gap-2 w-full">
                            <Badge
                              variant="secondary"
                              className="shrink-0 rounded-sm px-1.5 font-medium"
                            >
                              #{property.id}
                            </Badge>
                            <span className="font-semibold text-sm truncate text-foreground">
                              {getOwnerName(property)}
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground gap-1.5 w-full">
                            <MapPin className="w-3.5 h-3.5 shrink-0 opacity-70" />
                            <span className="truncate">{getAddress(property)}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Button
              onClick={handleManualSearch}
              disabled={loading || !search.trim()}
              className="h-12 px-6 w-full sm:w-auto"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Buscar'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {hasSearched && !loading && results.length === 0 && (
        <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-border/60 rounded-xl bg-background/50 animate-in fade-in zoom-in duration-300">
          <Building className="w-12 h-12 mb-4 text-muted-foreground/30" />
          <h3 className="text-lg font-medium text-foreground">Nenhum imóvel encontrado</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Não encontramos nenhum imóvel vinculado à pesquisa no servidor local.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                      <Badge variant="outline" className="font-normal bg-background">
                        {property.tipo || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {property.endereco || 'Endereço não informado'}
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
                        <span className="text-sm">{property.bairro || '-'}</span>
                        <span className="text-xs text-muted-foreground">
                          {property.cidade || '-'} {property.uf ? `/ ${property.uf}` : ''}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span
                          className="text-sm line-clamp-1 max-w-[200px] font-medium"
                          title={getOwnerName(property)}
                        >
                          {getOwnerName(property)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {property.servicos &&
                        Array.isArray(property.servicos) &&
                        property.servicos.length > 0 ? (
                          property.servicos.map((serv, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
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
