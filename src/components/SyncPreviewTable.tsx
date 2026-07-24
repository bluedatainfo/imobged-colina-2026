import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Loader2, AlertCircle } from 'lucide-react'
import { formatExcelDateTime, formatExcelDate, getExcelTimestamp } from '@/lib/date-utils'

interface SyncPreviewTableProps {
  data: any[] | null
  loading: boolean
  error: string | null
  onRetry: () => void
}

const DATE_ONLY_KEYWORDS = [
  'nascimento',
  'birth',
  'validade',
  'emissão',
  'emissao',
  'expedição',
  'expedicao',
  'vencimento',
  'data de',
]
const DATETIME_KEYWORDS = [
  'hora',
  'time',
  'início',
  'inicio',
  'start',
  'conclusão',
  'conclusao',
  'fim',
  'end',
]
const ADDRESS_KEYWORDS = [
  'endereço',
  'endereco',
  'address',
  'logradouro',
  'rua',
  'avenida',
  'av ',
  'bairro',
  'cidade',
  'estado',
  'cep',
  'complemento',
  'número',
  'numero',
  'apartamento',
  'ap ',
  'bloco',
  'torre',
]

function isAddressField(key: string): boolean {
  const lower = key.toLowerCase().trim()
  return ADDRESS_KEYWORDS.some((kw) => lower.includes(kw))
}

function isDateOnlyField(key: string): boolean {
  const lower = key.toLowerCase()
  return (
    DATE_ONLY_KEYWORDS.some((kw) => lower.includes(kw)) &&
    !DATETIME_KEYWORDS.some((kw) => lower.includes(kw)) &&
    !isAddressField(key)
  )
}

function isDateTimeField(key: string): boolean {
  const lower = key.toLowerCase()
  return DATETIME_KEYWORDS.some((kw) => lower.includes(kw)) && !isAddressField(key)
}

function formatPreviewValue(key: string, value: unknown): string {
  if (value === null || value === undefined || value === '') return '-'

  if (isAddressField(key)) {
    return String(value)
  }

  if (isDateTimeField(key)) {
    return formatExcelDateTime(value)
  }

  if (isDateOnlyField(key)) {
    return formatExcelDate(value)
  }

  return String(value)
}

export function SyncPreviewTable({ data, loading, error, onRetry }: SyncPreviewTableProps) {
  if (loading) {
    return (
      <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-3 bg-gray-50 rounded-md">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-gray-500">
          Criando sessão e buscando dados via Microsoft Graph API...
        </p>
        <p className="text-xs text-gray-400">Isso garante a leitura dos dados mais recentes.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-3 bg-red-50 rounded-md p-6 text-center">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <p className="text-sm text-red-700 max-w-md">{error}</p>
        <p className="text-xs text-gray-500">
          Certifique-se de estar autenticado no Microsoft 365 nas Configurações do sistema.
        </p>
        <Button onClick={onRetry} variant="outline" size="sm" className="mt-2 gap-2">
          Tentar novamente
        </Button>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-2 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-500">Nenhum dado encontrado na planilha.</p>
      </div>
    )
  }

  const headers = Object.keys(data[0])

  const sortKey = headers.find(
    (h) =>
      isDateTimeField(h) ||
      h.toLowerCase().includes('hora de início') ||
      h.toLowerCase().includes('hora de inicio'),
  )

  const sortedData = sortKey
    ? [...data].sort((a, b) => getExcelTimestamp(a[sortKey]) - getExcelTimestamp(b[sortKey]))
    : data

  return (
    <div className="w-full">
      <p className="text-sm text-gray-500 mb-3">
        {sortedData.length} registro(s) encontrado(s) na planilha. Feche esta janela para visualizar
        os dados normalizados na lista principal.
        {sortKey && (
          <span className="block text-xs mt-1">Ordenado por "{sortKey}" (crescente).</span>
        )}
      </p>
      <div className="border rounded-md bg-white">
        <div className="h-[50vh] overflow-auto w-full relative [direction:rtl]">
          <table className="w-full caption-bottom text-sm [direction:ltr]">
            <TableHeader className="sticky top-0 z-20 bg-gray-50 shadow-[0_1px_0_0_#e5e7eb]">
              <TableRow>
                <TableHead className="whitespace-nowrap w-12 font-semibold">#</TableHead>
                {headers.map((header) => (
                  <TableHead key={header} className="whitespace-nowrap font-semibold">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row, idx) => (
                <TableRow key={idx} className="hover:bg-gray-50/50">
                  <TableCell className="text-gray-400 text-xs whitespace-nowrap">
                    {idx + 1}
                  </TableCell>
                  {headers.map((header) => {
                    const val = row[header]
                    return (
                      <TableCell key={header} className="whitespace-nowrap text-sm">
                        {formatPreviewValue(header, val)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </table>
        </div>
      </div>
    </div>
  )
}
