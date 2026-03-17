const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/m365-Dzyxasvv.js","assets/react-CaAsmmmw.js","assets/main-Bn31ZT2M.js","assets/preload-helper-t9NyTnoX.js","assets/use-toast-DzvQdsOw.js"])))=>i.map(i=>d[i]);
import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as __vitePreload } from "./preload-helper-t9NyTnoX.js";
import { a as supabase } from "./main-Bn31ZT2M.js";
//#region src/stores/contracts.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var state = { contracts: [] };
var listeners = [];
var initContractsStore = async () => {
	const { data } = await supabase.from("contracts").select("*");
	if (data && data.length > 0) state.contracts = data.map((c) => ({
		id: c.id,
		propertyId: c.property_id || "",
		tenantName: c.tenant_name || "",
		template: c.template || "",
		status: c.status,
		documentName: c.document_name || "",
		updatedAt: c.updated_at || (/* @__PURE__ */ new Date()).toISOString(),
		expirationDate: c.expiration_date || void 0,
		docusignStatus: c.docusign_status,
		isCritical: c.is_critical || false,
		managerApproval: c.manager_approval || false
	}));
	else if (sessionStorage.getItem("app_user_id")) {
		const defaultContracts = [{
			id: "CTR-001",
			propertyId: "101",
			tenantName: "João Pedro",
			template: "Apartamento Padrão (Caução)",
			status: "Ativo",
			documentName: "Contrato_Joao_Pedro.docx",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			expirationDate: new Date(Date.now() + 600 * 60 * 60 * 1e3).toISOString(),
			docusignStatus: "Signed"
		}, {
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
		}];
		state.contracts = defaultContracts;
		for (const c of defaultContracts) await supabase.from("contracts").insert({
			id: c.id,
			property_id: c.propertyId,
			tenant_name: c.tenantName,
			template: c.template,
			status: c.status,
			document_name: c.documentName,
			updated_at: c.updatedAt,
			expiration_date: c.expirationDate,
			docusign_status: c.docusignStatus,
			is_critical: c.isCritical,
			manager_approval: c.managerApproval
		});
	}
	emit();
};
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
		supabase.from("contracts").insert({
			id: newContract.id,
			property_id: newContract.propertyId,
			tenant_name: newContract.tenantName,
			template: newContract.template,
			status: newContract.status,
			document_name: newContract.documentName,
			updated_at: newContract.updatedAt,
			expiration_date: newContract.expirationDate,
			docusign_status: newContract.docusignStatus,
			is_critical: newContract.isCritical,
			manager_approval: newContract.managerApproval
		}).then();
	},
	updateStatus: (id, status) => {
		const updatedStr = (/* @__PURE__ */ new Date()).toISOString();
		state = {
			...state,
			contracts: state.contracts.map((c) => c.id === id ? {
				...c,
				status,
				updatedAt: updatedStr
			} : c)
		};
		emit();
		supabase.from("contracts").update({
			status,
			updated_at: updatedStr
		}).eq("id", id).then();
		if (status === "Ativo") {
			const contract = state.contracts.find((c) => c.id === id);
			__vitePreload(async () => {
				const { m365Service } = await import("./m365-Dzyxasvv.js");
				return { m365Service };
			}, __vite__mapDeps([0,1,2,3,4])).then(({ m365Service }) => {
				if (contract) m365Service.saveToLibrary("Contratos Ativos", contract.documentName, "File Data", "locacao");
			});
		}
	},
	updateDocuSignStatus: (id, docusignStatus) => {
		const updatedStr = (/* @__PURE__ */ new Date()).toISOString();
		state = {
			...state,
			contracts: state.contracts.map((c) => c.id === id ? {
				...c,
				docusignStatus,
				updatedAt: updatedStr
			} : c)
		};
		emit();
		supabase.from("contracts").update({
			docusign_status: docusignStatus,
			updated_at: updatedStr
		}).eq("id", id).then();
	},
	approveCriticalContract: (id) => {
		const updatedStr = (/* @__PURE__ */ new Date()).toISOString();
		state = {
			...state,
			contracts: state.contracts.map((c) => c.id === id ? {
				...c,
				managerApproval: true,
				updatedAt: updatedStr
			} : c)
		};
		emit();
		supabase.from("contracts").update({
			manager_approval: true,
			updated_at: updatedStr
		}).eq("id", id).then();
	},
	extendExpiration: (id, days) => {
		state = {
			...state,
			contracts: state.contracts.map((c) => {
				if (c.id === id) {
					const newDate = c.expirationDate ? new Date(c.expirationDate) : /* @__PURE__ */ new Date();
					newDate.setDate(newDate.getDate() + days);
					const newExp = newDate.toISOString();
					const newUpd = (/* @__PURE__ */ new Date()).toISOString();
					supabase.from("contracts").update({
						expiration_date: newExp,
						updated_at: newUpd
					}).eq("id", id).then();
					return {
						...c,
						expirationDate: newExp,
						updatedAt: newUpd
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
export { initContractsStore as n, useContractsStore as r, contractsStore as t };

//# sourceMappingURL=contracts-Y4vXWwtt.js.map