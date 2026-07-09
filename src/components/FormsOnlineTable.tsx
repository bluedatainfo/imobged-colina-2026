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
import { Loader2, RefreshCw, AlertCircle, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import { formatExcelDate, formatExcelDateTime } from '@/lib/date-utils'

export type SortColumn = 'nome' | 'datetime'
export type SortDirection = 'asc' | 'desc'

interface FormsOnlineTableProps {
  data: any[]
  loading: boolean
  error: string | null
  activeTab: string
  sortColumn: SortColumn
  sortDirection: SortDirection
  onToggleSort: (column: SortColumn) => void
  onRetry: () => void
}

function renderSortIcon(column: SortColumn, sortCol: SortColumn, sortDir: SortDirection) {
  if (sortCol !== column) return <ArrowUpDown className="ml-1 inline h-3.5 w-3.5 text-gray-400" />
  return sortDir === 'asc' ? (
    <ArrowUp className="ml-1 inline h-3.5 w-3.5 text-primary" />
  ) : (
    <ArrowDown className="ml-1 inline h-3.5 w-3.5 text-primary" />
  )
}

function formatFieldValue(key: string, value: any): string {
  if (value === null || value === undefined) return '-'
  const lk = key.toLowerCase()
  if (
    lk === 'hora de início' ||
    lk === 'hora de inicio' ||
    lk === 'hora de conclusão' ||
    lk === 'hora de conclusao'
  )
    return formatExcelDateTime(value)
  if (lk.includes('nascimento')) return formatExcelDate(value)
  return String(value)
}

export function FormsOnlineTable({
  data,
  loading,
  error,
  activeTab,
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
              <TableRow key={idx}>
                <TableCell className="font-medium">
                  {activeTab === 'pj'
                    ? row['Razão Social'] || row['Razao Social'] || 'N/A'
                    : row['Nome1'] || row.Nome || row.Name || 'N/A'}
                </TableCell>
                <TableCell>
                  {formatExcelDateTime(
                    row['Hora de início'] || row['Start time'] || row.Data || row.Date || '',
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      (row.Status || row.status || '').toLowerCase() === 'aprovado'
                        ? 'bg-green-100 text-green-800'
                        : (row.Status || row.status || '').toLowerCase() === 'reprovado'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {row.Status || row.status || 'Recebido'}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-1">
                        {Object.entries(selectedRow || {}).map(([key, value]) => {
                          if (key.startsWith('@odata') || key.startsWith('ItemInternalId'))
                            return null
                          if (typeof value === 'object' && value !== null) return null
                          return (
                            <div key={key} className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">{key}</p>
                              <p className="text-sm text-gray-900 break-words">
                                {formatFieldValue(key, value)}
                              </p>
                            </div>
                          )
                        })}
                      </div>
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
