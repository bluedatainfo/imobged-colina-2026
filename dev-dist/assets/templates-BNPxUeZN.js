import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as supabase } from "./client-CRWdr5I6.js";
//#region src/stores/templates.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var state = { templates: [] };
var listeners = [];
var initTemplatesStore = async () => {
	const { data } = await supabase.from("document_templates").select("*").order("name");
	if (data && data.length > 0) {
		state.templates = data.map((t) => ({
			id: t.id,
			name: t.name,
			category: t.category,
			propertyType: t.property_type,
			guaranteeType: t.guarantee_type,
			content: t.content || "",
			createdAt: t.created_at,
			updatedAt: t.updated_at
		}));
		emit();
	}
};
var emit = () => listeners.forEach((l) => l());
var templatesStore = {
	getState: () => state,
	subscribe: (l) => {
		listeners.push(l);
		return () => {
			listeners = listeners.filter((fn) => fn !== l);
		};
	},
	addTemplate: async (t) => {
		const { data } = await supabase.from("document_templates").insert({
			name: t.name,
			category: t.category,
			property_type: t.propertyType,
			guarantee_type: t.guaranteeType,
			content: t.content
		}).select("*").single();
		if (data) {
			const newTemplate = {
				id: data.id,
				name: data.name,
				category: data.category,
				propertyType: data.property_type,
				guaranteeType: data.guarantee_type,
				content: data.content || "",
				createdAt: data.created_at,
				updatedAt: data.updated_at
			};
			state = {
				...state,
				templates: [...state.templates, newTemplate]
			};
			emit();
		}
	},
	updateTemplate: async (id, t) => {
		const updateData = { updated_at: (/* @__PURE__ */ new Date()).toISOString() };
		if (t.name !== void 0) updateData.name = t.name;
		if (t.category !== void 0) updateData.category = t.category;
		if (t.propertyType !== void 0) updateData.property_type = t.propertyType;
		if (t.guaranteeType !== void 0) updateData.guarantee_type = t.guaranteeType;
		if (t.content !== void 0) updateData.content = t.content;
		const { data } = await supabase.from("document_templates").update(updateData).eq("id", id).select("*").single();
		if (data) {
			state = {
				...state,
				templates: state.templates.map((existing) => existing.id === id ? {
					...existing,
					name: data.name,
					category: data.category,
					propertyType: data.property_type,
					guaranteeType: data.guarantee_type,
					content: data.content || "",
					updatedAt: data.updated_at
				} : existing)
			};
			emit();
		}
	},
	deleteTemplate: async (id) => {
		await supabase.from("document_templates").delete().eq("id", id);
		state = {
			...state,
			templates: state.templates.filter((t) => t.id !== id)
		};
		emit();
	}
};
function useTemplatesStore() {
	return (0, import_react.useSyncExternalStore)(templatesStore.subscribe, templatesStore.getState);
}
//#endregion
export { templatesStore as n, useTemplatesStore as r, initTemplatesStore as t };

//# sourceMappingURL=templates-BNPxUeZN.js.map