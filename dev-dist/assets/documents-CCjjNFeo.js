import { a as __toESM, n as require_react } from "./jsx-runtime-CvuQPfAM.js";
//#region src/stores/documents.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var today = /* @__PURE__ */ new Date();
var addDays = (days) => new Date(today.getTime() + days * 24 * 60 * 60 * 1e3).toISOString();
var state = { documents: [
	{
		id: "d1",
		propertyId: "101",
		name: "Matricula_Atualizada_Imovel.pdf",
		category: "Documentos do Proprietário",
		uploadDate: addDays(-100),
		expirationDate: addDays(45)
	},
	{
		id: "d2",
		propertyId: "101",
		name: "RG_CPF_Proprietario.pdf",
		category: "Documentos do Proprietário",
		uploadDate: addDays(-100)
	},
	{
		id: "d3",
		propertyId: "101",
		name: "CNH_Inquilino_Joao.pdf",
		category: "Documentos do Inquilino",
		uploadDate: addDays(-365),
		expirationDate: addDays(-5)
	},
	{
		id: "d4",
		propertyId: "101",
		name: "Apolice_Seguro_Fianca.pdf",
		category: "Garantias",
		uploadDate: addDays(-300),
		expirationDate: addDays(15)
	},
	{
		id: "d5",
		propertyId: "103",
		name: "Procuracao_Publica.pdf",
		category: "Documentos Legais",
		uploadDate: addDays(-150),
		expirationDate: addDays(-12)
	},
	{
		id: "d6",
		propertyId: "103",
		name: "Comprovante_Renda.pdf",
		category: "Documentos do Inquilino",
		uploadDate: addDays(-150)
	},
	{
		id: "d7",
		propertyId: "104",
		name: "Alvara_Bombeiros.pdf",
		category: "Documentos Comerciais",
		uploadDate: addDays(-350),
		expirationDate: addDays(20)
	},
	{
		id: "d8",
		propertyId: "104",
		name: "Contrato_Social_Empresa.pdf",
		category: "Documentos do Inquilino",
		uploadDate: addDays(-350)
	}
] };
var listeners = [];
var getDocumentStatus = (expirationDate) => {
	if (!expirationDate) return "Sem Vencimento";
	const now = /* @__PURE__ */ new Date();
	const exp = new Date(expirationDate);
	now.setHours(0, 0, 0, 0);
	exp.setHours(0, 0, 0, 0);
	const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24));
	if (diffDays < 0) return "Expirado";
	if (diffDays <= 30) return "Vencendo em breve";
	return "Regular";
};
var documentsStore = {
	getState: () => state,
	subscribe: (l) => {
		listeners.push(l);
		return () => {
			listeners = listeners.filter((fn) => fn !== l);
		};
	}
};
function useDocumentsStore() {
	return (0, import_react.useSyncExternalStore)(documentsStore.subscribe, documentsStore.getState);
}
//#endregion
export { useDocumentsStore as n, getDocumentStatus as t };

//# sourceMappingURL=documents-CCjjNFeo.js.map