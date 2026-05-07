const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/m365-Clb_brBb.js","assets/react-CaAsmmmw.js","assets/client-DbPPqM1c.js","assets/tslib.es6-D9c-_25L.js","assets/use-toast-DzvQdsOw.js","assets/m365-us8Kly3F.js","assets/main-33glPbE7.js","assets/preload-helper-t9NyTnoX.js"])))=>i.map(i=>d[i]);
import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as __vitePreload } from "./preload-helper-t9NyTnoX.js";
import { t as supabase } from "./client-DbPPqM1c.js";
//#region src/stores/contracts.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var state$1 = { contracts: [] };
var listeners$1 = [];
var initContractsStore = async () => {
	const { data } = await supabase.from("contracts").select("*");
	if (data && data.length > 0) state$1.contracts = data.map((c) => ({
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
		managerApproval: c.manager_approval || false,
		reviewNotes: c.review_notes || void 0,
		content: c.content || void 0
	}));
	else if (localStorage.getItem("app_user_id")) {
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
		state$1.contracts = defaultContracts;
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
			manager_approval: c.managerApproval,
			content: c.content
		});
	}
	emit$1();
};
var emit$1 = () => listeners$1.forEach((l) => l());
var contractsStore = {
	getState: () => state$1,
	subscribe: (l) => {
		listeners$1.push(l);
		return () => {
			listeners$1 = listeners$1.filter((fn) => fn !== l);
		};
	},
	addContract: (c) => {
		const newContract = {
			...c,
			id: `CTR-${Math.floor(Math.random() * 1e3).toString().padStart(3, "0")}`,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3).toISOString()
		};
		state$1 = {
			...state$1,
			contracts: [newContract, ...state$1.contracts]
		};
		emit$1();
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
			manager_approval: newContract.managerApproval,
			content: newContract.content
		}).then();
	},
	updateContract: async (id, updates) => {
		const updatedStr = (/* @__PURE__ */ new Date()).toISOString();
		const dbUpdates = { updated_at: updatedStr };
		if (updates.tenantName !== void 0) dbUpdates.tenant_name = updates.tenantName;
		if (updates.documentName !== void 0) dbUpdates.document_name = updates.documentName;
		if (updates.status !== void 0) dbUpdates.status = updates.status;
		if (updates.reviewNotes !== void 0) dbUpdates.review_notes = updates.reviewNotes === "" ? null : updates.reviewNotes;
		if (updates.content !== void 0) dbUpdates.content = updates.content;
		state$1 = {
			...state$1,
			contracts: state$1.contracts.map((c) => c.id === id ? {
				...c,
				...updates,
				updatedAt: updatedStr
			} : c)
		};
		emit$1();
		if (Object.keys(dbUpdates).length > 1) await supabase.from("contracts").update(dbUpdates).eq("id", id);
	},
	updateStatus: (id, status) => {
		const updatedStr = (/* @__PURE__ */ new Date()).toISOString();
		state$1 = {
			...state$1,
			contracts: state$1.contracts.map((c) => c.id === id ? {
				...c,
				status,
				updatedAt: updatedStr
			} : c)
		};
		emit$1();
		supabase.from("contracts").update({
			status,
			updated_at: updatedStr
		}).eq("id", id).then();
		if (status === "Ativo") {
			const contract = state$1.contracts.find((c) => c.id === id);
			__vitePreload(async () => {
				const { m365Service } = await import("./m365-Clb_brBb.js");
				return { m365Service };
			}, __vite__mapDeps([0,1,2,3,4,5,6,7])).then(({ m365Service }) => {
				if (contract) m365Service.saveToLibrary("Contratos Ativos", contract.documentName, "File Data", "locacao");
			});
		}
	},
	updateDocuSignStatus: (id, docusignStatus) => {
		const updatedStr = (/* @__PURE__ */ new Date()).toISOString();
		state$1 = {
			...state$1,
			contracts: state$1.contracts.map((c) => c.id === id ? {
				...c,
				docusignStatus,
				updatedAt: updatedStr
			} : c)
		};
		emit$1();
		supabase.from("contracts").update({
			docusign_status: docusignStatus,
			updated_at: updatedStr
		}).eq("id", id).then();
	},
	approveCriticalContract: (id) => {
		const updatedStr = (/* @__PURE__ */ new Date()).toISOString();
		state$1 = {
			...state$1,
			contracts: state$1.contracts.map((c) => c.id === id ? {
				...c,
				managerApproval: true,
				updatedAt: updatedStr
			} : c)
		};
		emit$1();
		supabase.from("contracts").update({
			manager_approval: true,
			updated_at: updatedStr
		}).eq("id", id).then();
	},
	updateReviewNotes: (id, notes) => {
		const updatedStr = (/* @__PURE__ */ new Date()).toISOString();
		state$1 = {
			...state$1,
			contracts: state$1.contracts.map((c) => c.id === id ? {
				...c,
				reviewNotes: notes,
				updatedAt: updatedStr
			} : c)
		};
		emit$1();
		supabase.from("contracts").update({
			review_notes: notes === "" ? null : notes,
			updated_at: updatedStr
		}).eq("id", id).then();
	}
};
function useContractsStore() {
	return (0, import_react.useSyncExternalStore)(contractsStore.subscribe, contractsStore.getState);
}
//#endregion
//#region src/stores/keys.ts
var state = { tasks: [] };
var listeners = [];
var initKeysStore = async () => {
	const { data } = await supabase.from("key_control").select("*");
	if (data && data.length > 0) state.tasks = data.map((t) => ({
		id: t.id,
		contractId: t.contract_id || "",
		propertyId: t.property_id || "",
		tenantName: t.tenant_name || "",
		propertyAddress: t.property_address || "",
		type: t.type,
		status: t.status
	}));
	else if (localStorage.getItem("app_user_id")) {
		const defaultTasks = [{
			id: "KEY-001",
			contractId: "CTR-001",
			propertyId: "101",
			tenantName: "João Pedro",
			propertyAddress: "Rua Flores, 123",
			type: "Delivery",
			status: "Pending"
		}];
		state.tasks = defaultTasks;
		for (const t of defaultTasks) await supabase.from("key_control").insert({
			id: t.id,
			contract_id: t.contractId,
			property_id: t.propertyId,
			tenant_name: t.tenantName,
			property_address: t.propertyAddress,
			type: t.type,
			status: t.status
		});
	}
	emit();
};
var emit = () => listeners.forEach((l) => l());
var keysStore = {
	getState: () => state,
	subscribe: (l) => {
		listeners.push(l);
		return () => {
			listeners = listeners.filter((fn) => fn !== l);
		};
	},
	addTask: (task) => {
		const newTask = {
			...task,
			id: `KEY-${Math.floor(Math.random() * 1e3).toString().padStart(3, "0")}`,
			status: "Pending"
		};
		state = {
			...state,
			tasks: [newTask, ...state.tasks]
		};
		emit();
		supabase.from("key_control").insert({
			id: newTask.id,
			contract_id: newTask.contractId,
			property_id: newTask.propertyId,
			tenant_name: newTask.tenantName,
			property_address: newTask.propertyAddress,
			type: newTask.type,
			status: newTask.status
		}).then();
	},
	updateTaskStatus: (id, status) => {
		state = {
			...state,
			tasks: state.tasks.map((t) => t.id === id ? {
				...t,
				status
			} : t)
		};
		emit();
		supabase.from("key_control").update({
			status,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id).then();
	}
};
function useKeysStore() {
	return (0, import_react.useSyncExternalStore)(keysStore.subscribe, keysStore.getState);
}
//#endregion
export { initContractsStore as a, contractsStore as i, keysStore as n, useContractsStore as o, useKeysStore as r, initKeysStore as t };

//# sourceMappingURL=keys-NJeQ6eTJ.js.map