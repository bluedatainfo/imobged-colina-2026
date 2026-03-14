export const mockActivity = [
  {
    id: 1,
    user: 'Ana Silva',
    action: 'Digitalizou Contrato de Locação',
    time: '10 min atrás',
    status: 'Sincronizado',
  },
  {
    id: 2,
    user: 'Carlos Santos',
    action: 'Enviou Vistoria - Apt 402',
    time: '1 hora atrás',
    status: 'Pendente',
  },
  {
    id: 3,
    user: 'Sistema OCR',
    action: 'Metadados extraídos (RG Locatário)',
    time: '2 horas atrás',
    status: 'Concluído',
  },
  {
    id: 4,
    user: 'Mariana Costa',
    action: 'Aprovou Documento Jurídico',
    time: 'Ontem',
    status: 'Aprovado',
  },
]

export const mockProperties = [
  {
    id: '101',
    title: 'Apartamento Centro',
    address: 'Rua das Flores, 123 - Apto 402',
    type: 'Residencial',
    status: 'Alugado',
    image: 'https://img.usecurling.com/p/400/300?q=apartment',
  },
  {
    id: '102',
    title: 'Sala Comercial',
    address: 'Av. Paulista, 1000 - Sala 50',
    type: 'Comercial',
    status: 'Disponível',
    image: 'https://img.usecurling.com/p/400/300?q=office',
  },
  {
    id: '103',
    title: 'Casa Jardim',
    address: 'Rua dos Ipês, 45',
    type: 'Residencial',
    status: 'Em Manutenção',
    image: 'https://img.usecurling.com/p/400/300?q=house',
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
    id: 'DOC-003',
    name: 'Vistoria_Entrada_CasaJardim.pdf',
    property: '103',
    type: 'Vistoria',
    date: '15/10/2023',
    status: 'Em Revisão',
    signatureStatus: 'N/A',
  },
  {
    id: 'DOC-004',
    name: 'Comprovante_Pagamento_Out.pdf',
    property: '101',
    type: 'Recibo',
    date: '05/11/2023',
    status: 'Sincronizado',
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
    property: 'Casa Jardim',
    type: 'Saída',
    inspector: 'Ana Silva',
    date: 'Hoje',
    status: 'Em Andamento',
  },
  {
    id: 'VIS-993',
    property: 'Sala Comercial',
    type: 'Rotina',
    inspector: 'Carlos Santos',
    date: 'Amanhã',
    status: 'Agendada',
  },
]

export const mockReviewQueue = [
  {
    id: 'REV-01',
    docName: 'Contrato_Renovacao_Apt10.pdf',
    submittedBy: 'Corretor João',
    date: 'Hoje, 09:30',
    priority: 'Alta',
  },
  {
    id: 'REV-02',
    docName: 'Fiador_Comprovantes_Renda.zip',
    submittedBy: 'Recepção',
    date: 'Ontem, 16:45',
    priority: 'Média',
  },
  {
    id: 'REV-03',
    docName: 'Distrato_Locacao_Casa3.pdf',
    submittedBy: 'Ana Silva',
    date: 'Ontem, 14:20',
    priority: 'Alta',
  },
]
