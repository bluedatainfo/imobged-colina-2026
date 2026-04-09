import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as Save } from "./save-5x68BQlH.js";
import { t as Button } from "./button-DI75GKXN.js";
import { t as supabase } from "./client-BWrqzmk9.js";
import { X as LoaderCircle, j as Input, tt as FolderSync } from "./index-BAbjaTFl.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-C664G4yu.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-Bnv9ycWF.js";
//#region src/components/settings/SharePointMapping.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var docTypeLabels = {
	CONTRACT_ACTIVE: "Contrato Ativo",
	CONTRACT_TERMINATED: "Contrato Encerrado",
	INSPECTION_MOVE_IN: "Vistoria de Entrada",
	INSPECTION_MOVE_OUT: "Vistoria de Saída",
	OWNER_DOCUMENT: "Doc Proprietário",
	TENANT_DOCUMENT: "Doc Inquilino",
	GUARANTEE_DOCUMENT: "Documentos de Garantia"
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
		"data-uid": "src/components/settings/SharePointMapping.tsx:80:5",
		"data-prohibitions": "[editContent]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/components/settings/SharePointMapping.tsx:81:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				"data-uid": "src/components/settings/SharePointMapping.tsx:82:9",
				"data-prohibitions": "[]",
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderSync, {
					"data-uid": "src/components/settings/SharePointMapping.tsx:83:11",
					"data-prohibitions": "[editContent]",
					className: "w-5 h-5 text-primary"
				}), " Motor de Mapeamento de Documentos"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
				"data-uid": "src/components/settings/SharePointMapping.tsx:85:9",
				"data-prohibitions": "[]",
				children: "Configure o Site, Biblioteca e Caminho Base (Base Path) para cada tipo de documento. O sistema organizará as pastas seguindo a hierarquia: [Caminho Base]/[Imóvel] ou [Caminho Base]/[Imóvel]/Locacao/[Locação] na nuvem M365."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/components/settings/SharePointMapping.tsx:91:7",
			"data-prohibitions": "[editContent]",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/settings/SharePointMapping.tsx:93:11",
				"data-prohibitions": "[]",
				className: "flex justify-center py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/components/settings/SharePointMapping.tsx:94:13",
					"data-prohibitions": "[editContent]",
					className: "w-6 h-6 animate-spin text-primary"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/settings/SharePointMapping.tsx:97:11",
				"data-prohibitions": "[editContent]",
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/components/settings/SharePointMapping.tsx:98:13",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/components/settings/SharePointMapping.tsx:99:15",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/settings/SharePointMapping.tsx:100:17",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:101:19",
									"data-prohibitions": "[]",
									children: "Tipo de Documento"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:102:19",
									"data-prohibitions": "[]",
									children: "Site M365 (Path)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:103:19",
									"data-prohibitions": "[]",
									children: "Biblioteca (Drive)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:104:19",
									"data-prohibitions": "[]",
									children: "Caminho Raiz"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:105:19",
									"data-prohibitions": "[]",
									className: "w-[100px]"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						"data-uid": "src/components/settings/SharePointMapping.tsx:108:15",
						"data-prohibitions": "[editContent]",
						children: configs.map((config) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/settings/SharePointMapping.tsx:110:19",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:111:21",
									"data-prohibitions": "[editContent]",
									className: "font-medium whitespace-nowrap",
									children: docTypeLabels[config.document_type] || config.document_type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:114:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/SharePointMapping.tsx:115:23",
										"data-prohibitions": "[editContent]",
										value: config.site_name,
										onChange: (e) => handleChange(config.id, "site_name", e.target.value),
										placeholder: "Ex: locacao ou /sites/locacao"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:121:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/SharePointMapping.tsx:122:23",
										"data-prohibitions": "[editContent]",
										value: config.library_name,
										onChange: (e) => handleChange(config.id, "library_name", e.target.value),
										placeholder: "Ex: Documentos Compartilhados"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:128:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/SharePointMapping.tsx:129:23",
										"data-prohibitions": "[editContent]",
										value: config.base_path,
										onChange: (e) => handleChange(config.id, "base_path", e.target.value),
										placeholder: "Ex: Proprietarios"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/SharePointMapping.tsx:135:21",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/components/settings/SharePointMapping.tsx:136:23",
										"data-prohibitions": "[editContent]",
										size: "sm",
										onClick: () => handleSave(config),
										disabled: saving === config.id,
										children: saving === config.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/settings/SharePointMapping.tsx:142:27",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 animate-spin"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
											"data-uid": "src/components/settings/SharePointMapping.tsx:144:27",
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

//# sourceMappingURL=SharePointMapping-dxMt-9zI.js.map