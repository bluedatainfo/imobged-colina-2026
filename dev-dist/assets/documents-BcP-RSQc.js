import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as supabase } from "./client-CRWdr5I6.js";
//#region src/stores/documents.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var state = { documents: [] };
var listeners = [];
var initDocumentsStore = async () => {
	const { data } = await supabase.from("property_documents").select("*").order("created_at", { ascending: false });
	if (data && data.length > 0) state.documents = data.map((d) => ({
		id: d.id,
		propertyId: d.property_id,
		name: d.name,
		category: d.category,
		entityCode: d.entity_code || void 0,
		entityName: d.entity_name || void 0,
		filePath: d.file_path || void 0,
		createdAt: d.created_at,
		uploadDate: d.created_at
	}));
	emit();
};
var emit = () => listeners.forEach((l) => l());
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
	},
	addDocument: async (doc) => {
		const { data, error } = await supabase.from("property_documents").insert({
			property_id: doc.propertyId,
			name: doc.name,
			category: doc.category,
			entity_code: doc.entityCode,
			entity_name: doc.entityName,
			file_path: doc.filePath
		}).select("*").single();
		if (error) {
			console.error("Failed to add document", error);
			return;
		}
		if (data) {
			const newDoc = {
				id: data.id,
				propertyId: data.property_id,
				name: data.name,
				category: data.category,
				entityCode: data.entity_code || void 0,
				entityName: data.entity_name || void 0,
				filePath: data.file_path || void 0,
				createdAt: data.created_at,
				uploadDate: data.created_at
			};
			state = {
				...state,
				documents: [newDoc, ...state.documents]
			};
			emit();
		}
	}
};
function useDocumentsStore() {
	return (0, import_react.useSyncExternalStore)(documentsStore.subscribe, documentsStore.getState);
}
//#endregion
export { useDocumentsStore as i, getDocumentStatus as n, initDocumentsStore as r, documentsStore as t };

//# sourceMappingURL=documents-BcP-RSQc.js.map