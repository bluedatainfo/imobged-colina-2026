import { a as __toESM, n as require_react } from "./jsx-runtime-CvuQPfAM.js";
//#region src/stores/contracts.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var state = { contracts: [
	{
		id: "CTR-001",
		propertyId: "101",
		tenantName: "João Pedro",
		template: "Apartamento Padrão (Caução)",
		status: "Ativo",
		documentName: "Contrato_Joao_Pedro.docx",
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		expirationDate: new Date(Date.now() + 600 * 60 * 60 * 1e3).toISOString(),
		docusignStatus: "Signed"
	},
	{
		id: "CTR-002",
		propertyId: "103",
		tenantName: "Maria Souza",
		template: "Residencial (Fiador - Alto Padrão)",
		status: "Aguardando Assinatura",
		documentName: "Minuta_Maria_Souza.docx",
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3).toISOString(),
		docusignStatus: null,
		isCritical: true,
		managerApproval: false
	},
	{
		id: "CTR-003",
		propertyId: "104",
		tenantName: "Carlos Silva",
		template: "Comercial Padrão",
		status: "Ativo",
		documentName: "Contrato_Carlos_Silva.docx",
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		expirationDate: new Date(Date.now() + 7200 * 60 * 1e3).toISOString(),
		docusignStatus: "Signed"
	}
] };
var listeners = [];
var emit = () => listeners.forEach((l) => l());
var contractsStore = {
	getState: () => state,
	subscribe: (l) => {
		listeners.push(l);
		return () => {
			listeners = listeners.filter((fn) => fn !== l);
		};
	},
	addContract: (c) => {
		const newContract = {
			...c,
			id: `CTR-${Math.floor(Math.random() * 1e3).toString().padStart(3, "0")}`,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3).toISOString()
		};
		state = {
			...state,
			contracts: [newContract, ...state.contracts]
		};
		emit();
	},
	updateStatus: (id, status) => {
		state = {
			...state,
			contracts: state.contracts.map((c) => c.id === id ? {
				...c,
				status,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			} : c)
		};
		emit();
	},
	updateDocuSignStatus: (id, docusignStatus) => {
		state = {
			...state,
			contracts: state.contracts.map((c) => c.id === id ? {
				...c,
				docusignStatus,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			} : c)
		};
		emit();
	},
	approveCriticalContract: (id) => {
		state = {
			...state,
			contracts: state.contracts.map((c) => c.id === id ? {
				...c,
				managerApproval: true,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			} : c)
		};
		emit();
	},
	extendExpiration: (id, days) => {
		state = {
			...state,
			contracts: state.contracts.map((c) => {
				if (c.id === id) {
					const newDate = c.expirationDate ? new Date(c.expirationDate) : /* @__PURE__ */ new Date();
					newDate.setDate(newDate.getDate() + days);
					return {
						...c,
						expirationDate: newDate.toISOString(),
						updatedAt: (/* @__PURE__ */ new Date()).toISOString()
					};
				}
				return c;
			})
		};
		emit();
	}
};
function useContractsStore() {
	return (0, import_react.useSyncExternalStore)(contractsStore.subscribe, contractsStore.getState);
}
//#endregion
export { useContractsStore as n, contractsStore as t };

//# sourceMappingURL=contracts-C13xwu10.js.map