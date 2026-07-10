import { useState } from 'react'
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
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Loader2,
  RefreshCw,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ExternalLink,
} from 'lucide-react'

export type SortColumn = 'nome' | 'datetime'
export type SortDirection = 'asc' | 'desc'

interface FormsOnlineTableProps {
  data: any[]
  loading: boolean
  error: string | null
  sortColumn: SortColumn
  sortDirection: SortDirection
  onToggleSort: (column: SortColumn) => void
  onRetry: () => void
}

const FIELD_LABELS: Record<string, string> = {
  code: 'Código',
  full_name: 'Nome',
  cpf: 'CPF',
  cnpj: 'CNPJ',
  email: 'E-mail',
  phone: 'Telefone',
  address: 'Endereço',
  status: 'Status',
  category: 'Categoria',
  created_at: 'Data de Envio',
  documents_link: 'Link dos Documentos',
}

const PRIMARY_FIELDS = Object.keys(FIELD_LABELS)

function renderSortIcon(column: SortColumn, sortCol: SortColumn, sortDir: SortDirection) {
  if (sortCol !== column) return <ArrowUpDown className="ml-1 inline h-3.5 w-3.5 text-gray-400" />
  return sortDir === 'asc' ? (
    <ArrowUp className="ml-1 inline h-3.5 w-3.5 text-primary" />
  ) : (
    <ArrowDown className="ml-1 inline h-3.5 w-3.5 text-primary" />
  )
}

function getStatusBadgeClass(status: string): string {
  const s = (status || '').toLowerCase()
  if (s === 'aprovado') return 'bg-green-100 text-green-800'
  if (s === 'reprovado' || s === 'rejeitado') return 'bg-red-100 text-red-800'
  return 'bg-blue-100 text-blue-800'
}

function renderFormDetails(row: any) {
  const formData =
    row.form_data && typeof row.form_data === 'object'
      ? (row.form_data as Record<string, unknown>)
      : {}
  const formDataKeys = Object.keys(formData).filter((k) => !PRIMARY_FIELDS.includes(k))

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-1">
        {PRIMARY_FIELDS.map((key) => {
          const value = row[key]
          if (value === null || value === undefined || value === '') return null
          const label = FIELD_LABELS[key] || key
          const displayValue = String(value)
          return (
            <div key={key} className="space-y-1">
              <p className="text-sm font-medium text-gray-500">{label}</p>
              {key === 'documents_link' && value ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline break-words inline-flex items-center gap-1"
                >
                  Abrir link <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <p className="text-sm text-gray-900 break-words">{displayValue}</p>
              )}
            </div>
          )
        })}
      </div>
      {formDataKeys.length > 0 && (
        <div className="border-t mt-4 pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">Dados do Formulário</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
            {formDataKeys.map((key) => {
              const value = formData[key]
              if (value === null || value === undefined || value === '') return null
              return (
                <div key={key} className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">{key}</p>
                  <p className="text-sm text-gray-900 break-words">{String(value)}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export function FormsOnlineTable({
  data,
  loading,
  error,
  sortColumn,
  sortDirection,
  onToggleSort,
  onRetry,
}: FormsOnlineTableProps) {
  const [selectedRow, setSelectedRow] = useState<any | null>(null)

  if (loading) {
    return (
      <div className="bg-white border rounded-md shadow-sm flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white border rounded-md shadow-sm flex flex-col items-center justify-center h-64 px-6 text-center">
        <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
        <p className="text-sm font-medium text-gray-700 max-w-md">{error}</p>
        <Button onClick={onRetry} variant="outline" size="sm" className="mt-4 gap-2">
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-md shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <button
                type="button"
                onClick={() => onToggleSort('nome')}
                className="inline-flex items-center font-medium hover:text-primary transition-colors"
              >
                Nome
                {renderSortIcon('nome', sortColumn, sortDirection)}
              </button>
            </TableHead>
            <TableHead>
              <button
                type="button"
                onClick={() => onToggleSort('datetime')}
                className="inline-flex items-center font-medium hover:text-primary transition-colors"
              >
                Data/Hora de Início
                {renderSortIcon('datetime', sortColumn, sortDirection)}
              </button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center h-24 text-gray-500">
                Nenhum registro encontrado.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => (
              <TableRow key={row.id || idx}>
                <TableCell className="font-medium">{row.full_name || 'N/A'}</TableCell>
                <TableCell>{row.created_at || '-'}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(row.status || '')}`}
                  >
                    {row.status || 'Novo'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedRow(row)}>
                        Ver Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Detalhes do Formulário</DialogTitle>
                      </DialogHeader>
                      {selectedRow && renderFormDetails(selectedRow)}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
