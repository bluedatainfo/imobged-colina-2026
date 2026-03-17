import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { a as supabase } from "./main-Bn31ZT2M.js";
//#region src/stores/keys.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
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
	else if (sessionStorage.getItem("app_user_id")) {
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
export { keysStore as n, useKeysStore as r, initKeysStore as t };

//# sourceMappingURL=keys-D__J_sbp.js.map