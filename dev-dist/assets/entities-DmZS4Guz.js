import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as supabase } from "./client-SeHzFSrX.js";
//#region src/stores/entities.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var state = {
	owners: [],
	tenants: []
};
var listeners = [];
var initEntitiesStore = async () => {
	const [{ data: ownersData }, { data: tenantsData }] = await Promise.all([supabase.from("owners").select("*").order("created_at", { ascending: false }), supabase.from("tenants").select("*").order("created_at", { ascending: false })]);
	state.owners = ownersData ? ownersData.map((o) => ({
		id: o.id,
		code: o.code,
		fullName: o.full_name,
		cpf: o.cpf || "",
		rg: o.rg || "",
		fullAddress: o.full_address || "",
		createdAt: o.created_at,
		updatedAt: o.updated_at
	})) : [];
	state.tenants = tenantsData ? tenantsData.map((t) => ({
		id: t.id,
		code: t.code,
		fullName: t.full_name,
		cpf: t.cpf || "",
		rg: t.rg || "",
		fullAddress: t.full_address || "",
		createdAt: t.created_at,
		updatedAt: t.updated_at
	})) : [];
	emit();
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
	addOwner: async (owner) => {
		let newCode = owner.code;
		if (!newCode) {
			const { data } = await supabase.from("owners").select("code");
			let max = 0;
			data?.forEach((d) => {
				if (d.code) {
					const upperCode = d.code.toUpperCase();
					if (upperCode.startsWith("PROP")) {
						const num = parseInt(upperCode.substring(4), 10);
						if (!isNaN(num) && num > max) max = num;
					}
				}
			});
			newCode = `PROP${(max + 1).toString().padStart(6, "0")}`;
		}
		const { data, error } = await supabase.from("owners").insert({
			code: newCode,
			full_name: owner.fullName,
			cpf: owner.cpf,
			rg: owner.rg,
			full_address: owner.fullAddress
		}).select("*").single();
		if (error) throw error;
		if (data) {
			const newOwner = {
				id: data.id,
				code: data.code,
				fullName: data.full_name,
				cpf: data.cpf || "",
				rg: data.rg || "",
				fullAddress: data.full_address || "",
				createdAt: data.created_at,
				updatedAt: data.updated_at
			};
			state = {
				...state,
				owners: [newOwner, ...state.owners]
			};
			emit();
		}
	},
	updateOwner: async (id, owner) => {
		const payload = { updated_at: (/* @__PURE__ */ new Date()).toISOString() };
		if (owner.code) payload.code = owner.code;
		if (owner.fullName) payload.full_name = owner.fullName;
		if (owner.cpf !== void 0) payload.cpf = owner.cpf;
		if (owner.rg !== void 0) payload.rg = owner.rg;
		if (owner.fullAddress !== void 0) payload.full_address = owner.fullAddress;
		const { error } = await supabase.from("owners").update(payload).eq("id", id);
		if (error) throw error;
		state = {
			...state,
			owners: state.owners.map((o) => o.id === id ? {
				...o,
				...owner,
				updatedAt: payload.updated_at
			} : o)
		};
		emit();
	},
	deleteOwner: async (id) => {
		const { error } = await supabase.from("owners").delete().eq("id", id);
		if (error) throw error;
		state = {
			...state,
			owners: state.owners.filter((o) => o.id !== id)
		};
		emit();
	},
	addTenant: async (tenant) => {
		let newCode = tenant.code;
		if (!newCode) {
			const { data } = await supabase.from("tenants").select("code");
			let max = 0;
			data?.forEach((d) => {
				if (d.code) {
					const upperCode = d.code.toUpperCase();
					if (upperCode.startsWith("INQ")) {
						const num = parseInt(upperCode.substring(3), 10);
						if (!isNaN(num) && num > max) max = num;
					}
				}
			});
			newCode = `INQ${(max + 1).toString().padStart(6, "0")}`;
		}
		const { data, error } = await supabase.from("tenants").insert({
			code: newCode,
			full_name: tenant.fullName,
			cpf: tenant.cpf,
			rg: tenant.rg,
			full_address: tenant.fullAddress
		}).select("*").single();
		if (error) throw error;
		if (data) {
			const newTenant = {
				id: data.id,
				code: data.code,
				fullName: data.full_name,
				cpf: data.cpf || "",
				rg: data.rg || "",
				fullAddress: data.full_address || "",
				createdAt: data.created_at,
				updatedAt: data.updated_at
			};
			state = {
				...state,
				tenants: [newTenant, ...state.tenants]
			};
			emit();
		}
	},
	updateTenant: async (id, tenant) => {
		const payload = { updated_at: (/* @__PURE__ */ new Date()).toISOString() };
		if (tenant.code) payload.code = tenant.code;
		if (tenant.fullName) payload.full_name = tenant.fullName;
		if (tenant.cpf !== void 0) payload.cpf = tenant.cpf;
		if (tenant.rg !== void 0) payload.rg = tenant.rg;
		if (tenant.fullAddress !== void 0) payload.full_address = tenant.fullAddress;
		const { error } = await supabase.from("tenants").update(payload).eq("id", id);
		if (error) throw error;
		state = {
			...state,
			tenants: state.tenants.map((t) => t.id === id ? {
				...t,
				...tenant,
				updatedAt: payload.updated_at
			} : t)
		};
		emit();
	},
	deleteTenant: async (id) => {
		const { error } = await supabase.from("tenants").delete().eq("id", id);
		if (error) throw error;
		state = {
			...state,
			tenants: state.tenants.filter((t) => t.id !== id)
		};
		emit();
	}
};
function useEntitiesStore() {
	return (0, import_react.useSyncExternalStore)(entitiesStore.subscribe, entitiesStore.getState);
}
//#endregion
export { initEntitiesStore as n, useEntitiesStore as r, entitiesStore as t };

//# sourceMappingURL=entities-DmZS4Guz.js.map