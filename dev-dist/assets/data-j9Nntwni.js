//#region src/lib/data.ts
var mockDocuments = [
	{
		id: "DOC-001",
		name: "Contrato_Locacao_Apt402.pdf",
		property: "101",
		type: "Contrato",
		date: "12/10/2023",
		status: "Aprovado",
		signatureStatus: "Assinado"
	},
	{
		id: "DOC-002",
		name: "RG_Locatario_Joao.pdf",
		property: "101",
		type: "Identificação",
		date: "12/10/2023",
		status: "Aprovado",
		signatureStatus: "N/A"
	},
	{
		id: "DOC-005",
		name: "Matricula_Atualizada_Sala50.pdf",
		property: "102",
		type: "Legal",
		date: "20/11/2023",
		status: "Faltando Assinatura",
		signatureStatus: "Pendente"
	}
];
var mockLegalCases = [
	{
		id: "LEG-001",
		tenant: "Maria Souza",
		property: "Casa Jardim (ID: 103)",
		issue: "Inadimplência > 60 dias (Ação de Despejo)",
		status: "Notificação Enviada",
		priority: "Alta"
	},
	{
		id: "LEG-002",
		tenant: "Comercial Silva",
		property: "Loja Térreo (ID: 042)",
		issue: "Disputa de Danos Estruturais pós-vistoria",
		status: "Em Acordo",
		priority: "Média"
	},
	{
		id: "LEG-003",
		tenant: "Carlos Eduardo",
		property: "Apt 101 Bloco B (ID: 211)",
		issue: "Reclamação de Vizinhança / Quebra de Regras Condomínio",
		status: "Análise Inicial",
		priority: "Baixa"
	}
];
//#endregion
export { mockLegalCases as n, mockDocuments as t };

//# sourceMappingURL=data-j9Nntwni.js.map