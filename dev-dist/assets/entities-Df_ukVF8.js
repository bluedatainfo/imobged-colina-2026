import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as supabase } from "./client-BWrqzmk9.js";
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
			id: o.idprop?.toString() || o.id?.toString() || o.codigo?.toString() || Math.random().toString(),
			code: o.idprop?.toString() || o.id?.toString() || o.code || o.codigo || "ERP-P",
			fullName: o.nome || o.full_name || o.fullName || "Proprietário Desconhecido",
			cpf: o.cpf || o.documento || "",
			rg: o.rg?.trim() || "",
			fullAddress: o.endereco ? `${o.endereco}${o.numero ? ", " + o.numero : ""}${o.complemento ? " - " + o.complemento : ""} - ${o.bairro || ""} - ${o.cidade || ""}/${o.uf || ""}` : o.full_address || "",
			createdAt: o.dtinc || o.created_at || (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: o.dtalt || o.updated_at || (/* @__PURE__ */ new Date()).toISOString()
		}));
		state.tenants = tData.map((t) => ({
			id: t.id?.toString() || t.codigo?.toString() || Math.random().toString(),
			code: t.id?.toString() || t.code || t.codigo || "ERP-L",
			fullName: t.nome || t.full_name || t.fullName || "Locatário Desconhecido",
			cpf: t.cpf || t.documento || "",
			rg: t.rg?.trim() || "",
			fullAddress: t.endereco ? `${t.endereco}${t.numero ? ", " + t.numero : ""}${t.complemento ? " - " + t.complemento : ""} - ${t.bairro || ""} - ${t.cidade || ""}/${t.uf || ""}` : t.full_address || "",
			createdAt: t.dtinclusao || t.created_at || (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: t.dtalteracao || t.updated_at || (/* @__PURE__ */ new Date()).toISOString()
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

//# sourceMappingURL=entities-Df_ukVF8.js.map