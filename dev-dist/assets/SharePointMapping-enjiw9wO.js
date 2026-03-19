import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as Button } from "./button-D8gTpw3z.js";
import { t as Save } from "./save-BMPnHQn1.js";
import { t as supabase } from "./client-BdUtiDva.js";
import { H as FolderSync, L as LoaderCircle, w as Input } from "./index-DBdzfxpM.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-D2TYra1C.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DOI-_lWo.js";
//#region src/components/settings/SharePointMapping.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var docTypeLabels = {
	CONTRACT_ACTIVE: "Contrato Ativo",
	CONTRACT_TERMINATED: "Contrato Encerrado",
	INSPECTION_MOVE_IN: "Vistoria de Entrada",
	INSPECTION_MOVE_OUT: "Vistoria de Saída",
	OWNER_DOCUMENT: "Doc Proprietário",
	TENANT_DOCUMENT: "Doc Inquilino"
};
function SharePointMapping() {
	const { toast } = useToast();
	const [configs, setConfigs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		fetchConfigs();
	}, []);
	const fetchConfigs = async () => {
		setLoading(true);
		const { data } = await supabase.from("sharepoint_configs").select("*").order("document_type");
		if (data) setConfigs(data);
		setLoading(false);
	};
	const handleSave = async (config) => {
		setSaving(config.id);
		const { error } = await supabase.from("sharepoint_configs").update({
			site_name: config.site_name,
			library_name: config.library_name,
			base_path: config.base_path,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", config.id);
		setSaving(null);
		if (error) toast({
			variant: "destructive",
			title: "Erro ao salvar",
			description: error.message
		});
		else toast({
			title: "Configuração atualizada",
			description: "Mapeamento de pastas salvo com sucesso."
		});
	};
	const handleChange = (id, field, value) => {
		setConfigs((prev) => prev.map((c) => c.id === id ? {
			...c,
			[field]: value
		} : c));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/settings/SharePointMapping.tsx:79:5",
		"data-prohibitions": "[editContent]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/components/settings/SharePointMapping.tsx:80:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				"data-uid": "src/components/settings/SharePointMapping.tsx:81:9",
				"data-prohibitions": "[]",
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderSync, {
					"data-uid": "src/components/settings/SharePointMapping.tsx:82:11",
					"data-prohibitions": "[editContent]",
					className: "w-5 h-5 text-primary"
				}), " Motor de Mapeamento de Documentos"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
				"data-uid": "src/components/settings/SharePointMapping.tsx:84:9",
				"data-prohibitions": "[]",
				children: "Configure o Site, Biblioteca e Caminho Base (Base Path) para cada tipo de documento. O sistema criará as pastas [Ano]/[Mês]/[Imóvel]/[Categoria] automaticamente na nuvem M365."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/components/settings/SharePointMapping.tsx:89:7",
			"data-prohibitions": "[editContent]",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/settings/SharePointMapping.tsx:91:11",
				"data-prohibitions": "[]",
				className: "flex justify-center py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/components/settings/SharePointMapping.tsx:92:13",
					"data-prohibitions": "[editContent]",
					className: "w-6 h-6 animate-spin text-primary"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/settings/SharePointMapping.tsx:95:11",
				"data-prohibitions": "[editContent]",
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/components/settings/SharePointMapping.tsx:96:13",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/components/settings/SharePointMapping.tsx:97:15",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/settings/SharePointMapping.tsx:98:17",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:99:19",
									"data-prohibitions": "[]",
									children: "Tipo de Documento"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:100:19",
									"data-prohibitions": "[]",
									children: "Site M365 (Path)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:101:19",
									"data-prohibitions": "[]",
									children: "Biblioteca (Drive)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:102:19",
									"data-prohibitions": "[]",
									children: "Caminho Raiz"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:103:19",
									"data-prohibitions": "[]",
									className: "w-[100px]"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						"data-uid": "src/components/settings/SharePointMapping.tsx:106:15",
						"data-prohibitions": "[editContent]",
						children: configs.map((config) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/settings/SharePointMapping.tsx:108:19",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:109:21",
									"data-prohibitions": "[editContent]",
									className: "font-medium whitespace-nowrap",
									children: docTypeLabels[config.document_type] || config.document_type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:112:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/SharePointMapping.tsx:113:23",
										"data-prohibitions": "[editContent]",
										value: config.site_name,
										onChange: (e) => handleChange(config.id, "site_name", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:118:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/SharePointMapping.tsx:119:23",
										"data-prohibitions": "[editContent]",
										value: config.library_name,
										onChange: (e) => handleChange(config.id, "library_name", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:124:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/SharePointMapping.tsx:125:23",
										"data-prohibitions": "[editContent]",
										value: config.base_path,
										onChange: (e) => handleChange(config.id, "base_path", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:130:21",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/components/settings/SharePointMapping.tsx:131:23",
										"data-prohibitions": "[editContent]",
										size: "sm",
										onClick: () => handleSave(config),
										disabled: saving === config.id,
										children: saving === config.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/settings/SharePointMapping.tsx:137:27",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 animate-spin"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
											"data-uid": "src/components/settings/SharePointMapping.tsx:139:27",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										})
									})
								})
							]
						}, config.id))
					})]
				})
			})
		})]
	});
}
//#endregion
export { SharePointMapping as default };

//# sourceMappingURL=SharePointMapping-enjiw9wO.js.map