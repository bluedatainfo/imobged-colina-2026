import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { HelpCircle, Clock, FileText, List, FolderSync, BellRing, Wrench, Info } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import useHelpStore, { helpStore } from '@/stores/help'

export function ContextualHelp() {
  const { isOpen } = useHelpStore()
  const location = useLocation()

  // Global F1 Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault() // Prevent browser's default help behavior
        helpStore.toggle()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Context-Aware Content Engine
  const helpContent = useMemo(() => {
    const path = location.pathname

    if (path === '/') {
      return {
        title: 'Painel de Controle',
        description:
          'Bem-vindo ao seu dashboard principal. Aqui você tem uma visão geral da operação.',
        sections: [
          {
            icon: Clock,
            title: 'Indicadores de SLA',
            content:
              'Monitore violações de SLA em propriedades que estão na fase de "Análise Gerencial". O alerta destaca processos que ultrapassaram as horas configuradas.',
          },
          {
            icon: FileText,
            title: 'Status de Contratos',
            content:
              'Visualize um resumo rápido do volume de contratos ativos, aguardando assinatura (DocuSign) ou pendentes de renovação.',
          },
          {
            icon: List,
            title: 'Trilha de Auditoria',
            content:
              'Acompanhe as ações recentes dos usuários, como aprovações, edições e uploads para as bibliotecas do SharePoint integradas.',
          },
        ],
      }
    }

    if (path === '/documents') {
      return {
        title: 'Central de Documentos e Alertas',
        description:
          'Guia para gerenciar o acervo digital, monitorar vencimentos e entender a integração com o SharePoint.',
        sections: [
          {
            icon: BellRing,
            title: 'Monitoramento de Vencimentos',
            content:
              'Acompanhe e filtre os alertas de documentos com base na sua criticidade: Verde (Status Regular), Amarelo (Atenção/Vencendo em breve) e Vermelho (Documento Expirado ou Inválido).',
          },
          {
            icon: FolderSync,
            title: 'Integração SharePoint',
            content:
              'A integração com o SharePoint sincroniza automaticamente os metadados extraídos dos documentos enviados (via upload manual ou OCR) para as bibliotecas correspondentes no Microsoft 365.',
          },
          {
            icon: FileText,
            title: 'Gestão de Status',
            content:
              'Utilize os filtros e visualizadores nativos para verificar a situação de aprovação e coleta de assinaturas dos seus arquivos, mantendo a conformidade da documentação.',
          },
        ],
      }
    }

    if (path.match(/^\/properties\/[^/]+\/dossier$/)) {
      return {
        title: 'Dossiê Digital do Imóvel',
        description: 'Central consolidada de todas as informações e documentos do imóvel.',
        sections: [
          {
            icon: FolderSync,
            title: 'Pastas e SharePoint (GED)',
            content:
              'Na aba "Cofre de Documentos (GED)", navegue pelos arquivos físicos sincronizados com o Microsoft 365, organizados por categorias e setores.',
          },
          {
            icon: BellRing,
            title: 'Alertas de Vencimento',
            content:
              'O sistema extrai as datas de validade dos metadados. Um aviso no topo alertará sobre documentos "Expirados" ou "Vencendo em breve".',
          },
          {
            icon: Wrench,
            title: 'Relatórios de Manutenção',
            content:
              'Histórico completo de chamados de reparo gerados por vistorias de entrada ou acionamentos manuais, incluindo fotos e laudos.',
          },
        ],
      }
    }

    return {
      title: 'Ajuda Contextual',
      description: 'Você está em uma tela genérica do sistema.',
      sections: [
        {
          icon: Info,
          title: 'Navegação Padrão',
          content:
            'Navegue para o Painel Inicial ou abra o Dossiê de um imóvel para visualizar instruções detalhadas e manuais específicos dessas rotas.',
        },
      ],
    }
  }, [location.pathname])

  return (
    <Sheet open={isOpen} onOpenChange={helpStore.setOpen}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col gap-6">
        <SheetHeader className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="h-5 w-5 text-primary" />
            <SheetTitle>{helpContent.title}</SheetTitle>
          </div>
          <SheetDescription>{helpContent.description}</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <div className="space-y-6">
            {helpContent.sections.map((section, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-lg shrink-0 h-fit">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{section.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
