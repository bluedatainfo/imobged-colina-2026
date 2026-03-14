export const mockActivity = [
  {
    id: 1,
    user: 'Ana Silva',
    action: 'Aprovou Documentação Gerencial - Apt 402',
    time: '10 min atrás',
    status: 'Vistoria Pendente',
  },
  {
    id: 2,
    user: 'Carlos Santos',
    action: 'Enviou Vistoria de Entrada - Casa Jardim',
    time: '1 hora atrás',
    status: 'Concluído',
  },
  {
    id: 3,
    user: 'Sistema Automático',
    action: 'Handoff de Fluxo: Contrato para Assinatura',
    time: '2 horas atrás',
    status: 'Em Assinatura',
  },
  {
    id: 4,
    user: 'Mariana Costa',
    action: 'Abriu chamado jurídico: Atraso de Aluguel',
    time: 'Ontem',
    status: 'Registrado',
  },
]

export const mockProperties = [
  {
    id: '101',
    title: 'Apartamento Centro',
    address: 'Rua das Flores, 123 - Apto 402',
    type: 'Residencial',
    status: 'Análise Gerencial',
    image: 'https://img.usecurling.com/p/400/300?q=apartment',
  },
  {
    id: '102',
    title: 'Sala Comercial',
    address: 'Av. Paulista, 1000 - Sala 50',
    type: 'Comercial',
    status: 'Vistoria Pendente',
    image: 'https://img.usecurling.com/p/400/300?q=office',
  },
  {
    id: '103',
    title: 'Casa Jardim',
    address: 'Rua dos Ipês, 45',
    type: 'Residencial',
    status: 'Confecção de Contrato',
    image: 'https://img.usecurling.com/p/400/300?q=house',
  },
  {
    id: '104',
    title: 'Cobertura Vista Mar',
    address: 'Av. Atlântica, 500',
    type: 'Residencial',
    status: 'Em Assinatura',
    image: 'https://img.usecurling.com/p/400/300?q=penthouse',
  },
]

export const mockDocuments = [
  {
    id: 'DOC-001',
    name: 'Contrato_Locacao_Apt402.pdf',
    property: '101',
    type: 'Contrato',
    date: '12/10/2023',
    status: 'Aprovado',
    signatureStatus: 'Assinado',
  },
  {
    id: 'DOC-002',
    name: 'RG_Locatario_Joao.pdf',
    property: '101',
    type: 'Identificação',
    date: '12/10/2023',
    status: 'Aprovado',
    signatureStatus: 'N/A',
  },
  {
    id: 'DOC-005',
    name: 'Matricula_Atualizada_Sala50.pdf',
    property: '102',
    type: 'Legal',
    date: '20/11/2023',
    status: 'Faltando Assinatura',
    signatureStatus: 'Pendente',
  },
]

export const mockInspections = [
  {
    id: 'VIS-991',
    property: 'Apartamento Centro',
    type: 'Entrada',
    inspector: 'Carlos Santos',
    date: '10/10/2023',
    status: 'Concluída',
  },
  {
    id: 'VIS-992',
    property: 'Sala Comercial',
    type: 'Entrada',
    inspector: 'Ana Silva',
    date: 'Hoje',
    status: 'Em Andamento',
  },
  {
    id: 'VIS-993',
    property: 'Galpão Industrial',
    type: 'Rotina',
    inspector: 'Carlos Santos',
    date: 'Amanhã',
    status: 'Agendada',
  },
]

export const mockManagerApprovals = [
  {
    id: 'MA-001',
    property: 'Apartamento Centro (ID: 101)',
    tenant: 'João Pedro da Silva',
    docs: ['RG_Frente.jpg', 'RG_Verso.jpg', 'Comprovante_Renda.pdf'],
    date: 'Hoje, 09:30',
    priority: 'Alta',
  },
  {
    id: 'MA-002',
    property: 'Casa Vila Nova (ID: 205)',
    tenant: 'Empresa Alpha Ltda (CNPJ)',
    docs: ['Contrato_Social.pdf', 'Balancete.pdf'],
    date: 'Ontem, 16:45',
    priority: 'Normal',
  },
]

export const mockLegalCases = [
  {
    id: 'LEG-001',
    tenant: 'Maria Souza',
    property: 'Casa Jardim (ID: 103)',
    issue: 'Inadimplência > 60 dias (Ação de Despejo)',
    status: 'Notificação Enviada',
    priority: 'Alta',
  },
  {
    id: 'LEG-002',
    tenant: 'Comercial Silva',
    property: 'Loja Térreo (ID: 042)',
    issue: 'Disputa de Danos Estruturais pós-vistoria',
    status: 'Em Acordo',
    priority: 'Média',
  },
  {
    id: 'LEG-003',
    tenant: 'Carlos Eduardo',
    property: 'Apt 101 Bloco B (ID: 211)',
    issue: 'Reclamação de Vizinhança / Quebra de Regras Condomínio',
    status: 'Análise Inicial',
    priority: 'Baixa',
  },
]
