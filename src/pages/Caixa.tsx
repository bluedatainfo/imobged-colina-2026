import React, { useState } from 'react'
import {
  Wallet,
  FileSpreadsheet,
  FolderCheck,
  RefreshCw,
  ExternalLink,
  Send,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  Copy,
  MessageSquare,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import useEntitiesStore from '@/stores/entities'
import { fetchWithAuth } from '@/lib/m365'
import { OneDriveFolderPicker, OneDriveFolder } from '@/components/OneDriveFolderPicker'
import {
  extractTextFromPdfBlob,
  parseItauBoletoText,
  cleanCpf,
  formatPhoneForWhatsApp,
} from '@/lib/boletoParser'
import { buildWhatsAppLink, exportToCsv } from '@/lib/whatsappAndExcel'

export interface ProcessedBoletoRow {
  id: string
  fileName: string
  name: string
  cpf: string
  dueDate: string
  amount: string
  phone: string
  tenantFound: boolean
  pdfLink: string
  whatsappLink: string
  rawText?: string
}

export default function Caixa() {
  const { toast } = useToast()
  const { tenants, guarantees } = useEntitiesStore()

  const [selectedFolder, setSelectedFolder] = useState<OneDriveFolder | null>(null)
  const [loading, setLoading] = useState(false)
  const [processedRows, setProcessedRows] = useState<ProcessedBoletoRow[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  // Batch process PDFs in selected folder
  const processFolderPdfFiles = async (folder: OneDriveFolder) => {
    setLoading(true)
    setProcessedRows([])

    try {
      // Fetch files inside the folder using Graph API
      let listUrl = ''
      if (folder.siteId && folder.driveId) {
        listUrl = `https://graph.microsoft.com/v1.0/sites/${folder.siteId}/drives/${folder.driveId}/items/${folder.id}/children`
      } else {
        listUrl = `https://graph.microsoft.com/v1.0/me/drive/items/${folder.id}/children`
      }

      const res = await fetchWithAuth(listUrl)
      if (!res.ok) {
        throw new Error('Não foi possível carregar os arquivos da pasta do OneDrive.')
      }

      const data = await res.json()
      const pdfFiles = (data.value || []).filter(
        (item: any) => !item.folder && item.name && item.name.toLowerCase().endsWith('.pdf'),
      )

      if (pdfFiles.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Nenhum PDF encontrado',
          description: 'A pasta selecionada não possui arquivos de boleto (.pdf).',
        })
        setLoading(false)
        return
      }

      toast({
        title: 'Iniciando Processamento em Lote',
        description: `Encontrados ${pdfFiles.length} arquivo(s) PDF para extração e cruzamento.`,
      })

      const rows: ProcessedBoletoRow[] = []

      for (const pdfFile of pdfFiles) {
        let fileBlob: Blob | null = null
        try {
          let downloadUrl = ''
          if (folder.siteId && folder.driveId) {
            downloadUrl = `https://graph.microsoft.com/v1.0/sites/${folder.siteId}/drives/${folder.driveId}/items/${pdfFile.id}/content`
          } else {
            downloadUrl = `https://graph.microsoft.com/v1.0/me/drive/items/${pdfFile.id}/content`
          }

          const fileRes = await fetchWithAuth(downloadUrl)
          if (fileRes.ok) {
            fileBlob = await fileRes.blob()
          }
        } catch (err) {
          console.warn(`Falha ao baixar arquivo ${pdfFile.name}:`, err)
        }

        let rawText = ''
        if (fileBlob) {
          rawText = await extractTextFromPdfBlob(fileBlob)
        }

        // Parse Itaú Boleto text
        const parsed = parseItauBoletoText(rawText, pdfFile.name)

        // PDF Link on OneDrive
        const pdfLink = pdfFile.webUrl || '#'

        // Cross-reference with Local ERP Tenants by CPF or Name
        let matchedPhone = ''
        let tenantFound = false

        const cleanParsedCpf = parsed.cpf.replace(/\D/g, '')

        // 1. Search in local ERP Tenants store
        let tenantMatch = tenants.find((t) => {
          const tCpf = (t.cpf || '').replace(/\D/g, '')
          if (cleanParsedCpf && tCpf && cleanParsedCpf === tCpf) return true
          if (
            parsed.name &&
            parsed.name !== 'NÃO IDENTIFICADO' &&
            t.fullName.toLowerCase().includes(parsed.name.toLowerCase())
          ) {
            return true
          }
          return false
        })

        if (tenantMatch) {
          tenantFound = true
          // ERP tenant address or info
          matchedPhone = (tenantMatch as any).celular || (tenantMatch as any).telefone || ''
        }

        // 2. Search in guarantees/ERP fallback if phone not in tenant object
        if (!matchedPhone && cleanParsedCpf) {
          const guaranteeMatch = guarantees.find((g) => g.cpf.replace(/\D/g, '') === cleanParsedCpf)
          if (guaranteeMatch) {
            matchedPhone = guaranteeMatch.celular || guaranteeMatch.telefone || ''
            tenantFound = true
          }
        }

        // 3. Fallback search via direct API fetch if store empty or missing
        if (!matchedPhone) {
          try {
            const erpRes = await fetch('http://192.168.10.225:9000/locatarios').catch(() => null)
            if (erpRes && erpRes.ok) {
              const erpList = await erpRes.json()
              const foundErp = erpList.find((item: any) => {
                const iCpf = (item.cpf || item.documento || '').replace(/\D/g, '')
                if (cleanParsedCpf && iCpf && cleanParsedCpf === iCpf) return true
                if (
                  parsed.name &&
                  parsed.name !== 'NÃO IDENTIFICADO' &&
                  item.nome &&
                  item.nome.toLowerCase().includes(parsed.name.toLowerCase())
                ) {
                  return true
                }
                return false
              })
              if (foundErp) {
                matchedPhone = foundErp.celular || foundErp.telefone || ''
                tenantFound = true
              }
            }
          } catch (e) {
            console.warn('ERP direct fetch error:', e)
          }
        }

        // Generate WhatsApp link
        const whatsappLink = buildWhatsAppLink(
          matchedPhone,
          parsed.name,
          parsed.dueDate,
          parsed.amount,
          pdfLink,
        )

        rows.push({
          id: pdfFile.id,
          fileName: pdfFile.name,
          name: parsed.name,
          cpf: parsed.cpf,
          dueDate: parsed.dueDate,
          amount: parsed.amount,
          phone: matchedPhone || 'NÃO ENCONTRADO',
          tenantFound,
          pdfLink,
          whatsappLink,
          rawText,
        })
      }

      setProcessedRows(rows)

      toast({
        title: 'Processamento Concluído!',
        description: `Sucesso! ${rows.length} boleto(s) processado(s) com dados cruzados.`,
      })
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Erro no Processamento',
        description: e.message || 'Falha ao ler os PDFs do OneDrive.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFolderSelected = (folder: OneDriveFolder) => {
    setSelectedFolder(folder)
    processFolderPdfFiles(folder)
  }

  const handleExportExcel = () => {
    if (processedRows.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Sem dados para exportar',
        description: 'Selecione e processe uma pasta com boletos antes de exportar.',
      })
      return
    }

    const dateStr = new Date().toISOString().slice(0, 10)
    exportToCsv(`Links_Boletos_${selectedFolder?.name || 'Caixa'}_${dateStr}.csv`, processedRows)

    toast({
      title: 'Planilha Exportada',
      description: 'O arquivo Excel (CSV UTF-8) foi gerado e baixado com sucesso.',
    })
  }

  const filteredRows = processedRows.filter((r) => {
    const term = searchTerm.toLowerCase()
    return (
      r.name.toLowerCase().includes(term) ||
      r.cpf.includes(term) ||
      r.fileName.toLowerCase().includes(term) ||
      r.phone.includes(term)
    )
  })

  const handlePhoneChange = (id: string, newPhone: string) => {
    setProcessedRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id !== id) return row

        const clean = newPhone.trim()
        const isFound = Boolean(
          clean &&
          clean.toUpperCase() !== 'NÃO ENCONTRADO' &&
          clean.toUpperCase() !== 'NÃO ENCONTRADOS',
        )

        const newWhatsappLink = buildWhatsAppLink(
          newPhone,
          row.name,
          row.dueDate,
          row.amount,
          row.pdfLink,
        )

        return {
          ...row,
          phone: newPhone,
          tenantFound: isFound,
          whatsappLink: newWhatsappLink,
        }
      }),
    )
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copiado!',
      description: `${label} copiado para a área de transferência.`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Wallet className="h-7 w-7 text-primary" /> Caixa - Gerador de Link de Boletos
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Selecione uma pasta do OneDrive, extraia dados dos boletos Itaú em lote e gere links
            organizados para WhatsApp e Excel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {processedRows.length > 0 && (
            <Button
              onClick={handleExportExcel}
              className="gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              <FileSpreadsheet className="w-4 h-4" /> Exportar para Excel
            </Button>
          )}

          <OneDriveFolderPicker onSelectFolder={handleFolderSelected} />
        </div>
      </div>

      {/* Selected Folder Status Banner */}
      {selectedFolder && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <FolderCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Pasta Selecionada: {selectedFolder.name}
                </p>
                <p className="text-xs text-muted-foreground">{selectedFolder.path}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => processFolderPdfFiles(selectedFolder)}
              disabled={loading}
              className="gap-2 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Reprocessar Pasta
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Main Results Table Card */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Boletos Processados
              {processedRows.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {processedRows.length} boleto(s)
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Dados extraídos diretamente dos boletos e cruzados com o cadastro de locatários ERP.
            </CardDescription>
          </div>

          {processedRows.length > 0 && (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, CPF ou arquivo..."
                className="pl-8 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm font-medium">
                Extraindo texto dos PDFs e consultando o cadastro do ERP...
              </p>
              <p className="text-xs text-muted-foreground">Por favor, aguarde alguns instantes.</p>
            </div>
          ) : processedRows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-lg p-6">
              <Wallet className="w-12 h-12 text-muted-foreground/40 mb-3" />
              <h3 className="text-base font-semibold">Nenhuma pasta ou arquivo processado</h3>
              <p className="text-xs text-muted-foreground max-w-md mt-1 mb-4">
                Clique no botão de seleção para escolher a pasta do OneDrive Business contendo os
                arquivos em PDF dos boletos Itaú.
              </p>
              <OneDriveFolderPicker
                onSelectFolder={handleFolderSelected}
                buttonText="Selecionar Pasta do OneDrive"
              />
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Inquilino / Nome</TableHead>
                      <TableHead>CPF/CNPJ</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Valor (R$)</TableHead>
                      <TableHead>Celular (ERP)</TableHead>
                      <TableHead className="text-center">Link PDF (OneDrive)</TableHead>
                      <TableHead className="text-center">Ações WhatsApp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Nenhum boleto encontrado com os termos pesquisados.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRows.map((row) => (
                        <TableRow key={row.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span className="text-sm">{row.name}</span>
                              <span
                                className="text-xs text-muted-foreground font-mono truncate max-w-[200px]"
                                title={row.fileName}
                              >
                                {row.fileName}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell className="text-xs font-mono">{row.cpf}</TableCell>

                          <TableCell className="text-xs font-medium">
                            <Badge variant="outline" className="bg-background">
                              {row.dueDate}
                            </Badge>
                          </TableCell>

                          <TableCell className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                            R$ {row.amount}
                          </TableCell>

                          <TableCell className="w-[220px]">
                            <div className="flex items-center gap-1.5">
                              {row.tenantFound ||
                              (row.phone &&
                                row.phone.toUpperCase() !== 'NÃO ENCONTRADO' &&
                                row.phone.toUpperCase() !== 'NÃO ENCONTRADOS') ? (
                                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                              ) : (
                                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                              )}
                              <Input
                                value={row.phone}
                                onChange={(e) => handlePhoneChange(row.id, e.target.value)}
                                placeholder="Celular do locatário"
                                className="h-8 text-xs font-medium"
                              />
                            </div>
                          </TableCell>

                          <TableCell className="text-center">
                            {row.pdfLink && row.pdfLink !== '#' ? (
                              <a
                                href={row.pdfLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                              >
                                Abrir PDF <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                          </TableCell>

                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              {row.whatsappLink ? (
                                <a
                                  href={row.whatsappLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-2.5 py-1.5 rounded-md font-medium transition-colors"
                                >
                                  <Send className="w-3 h-3" /> Enviar WhatsApp
                                </a>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled
                                  className="h-7 text-xs text-muted-foreground"
                                >
                                  <MessageSquare className="w-3 h-3 mr-1" /> Sem Tel
                                </Button>
                              )}

                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                title="Copiar Link do Boleto"
                                onClick={() => copyToClipboard(row.pdfLink, 'Link do Boleto')}
                              >
                                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
