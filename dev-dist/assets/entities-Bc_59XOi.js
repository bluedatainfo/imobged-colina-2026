import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as supabase } from "./client-CX_7U15l.js";
//#region src/stores/entities.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var state = {
	owners: [],
	tenants: []
};
var listeners = [];
var initEntitiesStore = async () => {
	try {
		const [ownersRes, tenantsRes] = await Promise.all([fetch("http://192.168.10.225:9000/proprietarios").catch(() => null), fetch("http://192.168.10.225:9000/locatarios").catch(() => null)]);
		let oData = [];
		let tData = [];
		if (ownersRes && ownersRes.ok) oData = await ownersRes.json();
		else {
			const { data } = await supabase.from("owners").select("*").order("created_at", { ascending: false });
			oData = data || [];
		}
		if (tenantsRes && tenantsRes.ok) tData = await tenantsRes.json();
		else {
			const { data } = await supabase.from("tenants").select("*").order("created_at", { ascending: false });
			tData = data || [];
		}
		state.owners = oData.map((o) => ({
			id: o.id || o.codigo || Math.random().toString(),
			code: o.code || o.codigo || "ERP-P",
			fullName: o.full_name || o.nome || o.fullName || "Proprietário Desconhecido",
			cpf: o.cpf || o.documento || "",
			rg: o.rg || "",
			fullAddress: o.full_address || o.endereco || "",
			createdAt: o.created_at || (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: o.updated_at || (/* @__PURE__ */ new Date()).toISOString()
		}));
		state.tenants = tData.map((t) => ({
			id: t.id || t.codigo || Math.random().toString(),
			code: t.code || t.codigo || "ERP-L",
			fullName: t.full_name || t.nome || t.fullName || "Locatário Desconhecido",
			cpf: t.cpf || t.documento || "",
			rg: t.rg || "",
			fullAddress: t.full_address || t.endereco || "",
			createdAt: t.created_at || (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: t.updated_at || (/* @__PURE__ */ new Date()).toISOString()
		}));
		emit();
	} catch (err) {
		console.error("Failed to sync entities with local ERP", err);
	}
};
var emit = () => listeners.forEach((l) => l());
var entitiesStore = {
	getState: () => state,
	subscribe: (l) => {
		listeners.push(l);
		return () => {
			listeners = listeners.filter((fn) => fn !== l);
		};
	},
	addOwner: async () => {
		throw new Error("Cadastro bloqueado. Gerido no ERP local.");
	},
	updateOwner: async () => {
		throw new Error("Edição bloqueada. Gerida no ERP local.");
	},
	deleteOwner: async () => {
		throw new Error("Exclusão bloqueada. Gerida no ERP local.");
	},
	addTenant: async () => {
		throw new Error("Cadastro bloqueado. Gerido no ERP local.");
	},
	updateTenant: async () => {
		throw new Error("Edição bloqueada. Gerida no ERP local.");
	},
	deleteTenant: async () => {
		throw new Error("Exclusão bloqueada. Gerida no ERP local.");
	}
};
function useEntitiesStore() {
	return (0, import_react.useSyncExternalStore)(entitiesStore.subscribe, entitiesStore.getState);
}
//#endregion
export { useEntitiesStore as n, initEntitiesStore as t };

//# sourceMappingURL=entities-Bc_59XOi.js.map