import { a as __toESM, n as require_react } from "./jsx-runtime-CvuQPfAM.js";
//#region src/stores/keys.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var state = { tasks: [{
	id: "KEY-001",
	contractId: "CTR-001",
	propertyId: "101",
	tenantName: "João Pedro",
	propertyAddress: "Rua Flores, 123",
	type: "Delivery",
	status: "Pending"
}] };
var listeners = [];
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
	}
};
function useKeysStore() {
	return (0, import_react.useSyncExternalStore)(keysStore.subscribe, keysStore.getState);
}
//#endregion
export { useKeysStore as n, keysStore as t };

//# sourceMappingURL=keys-CdIRjP_Q.js.map