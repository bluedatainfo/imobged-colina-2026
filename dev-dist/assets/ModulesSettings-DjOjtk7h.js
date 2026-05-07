import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as Save } from "./save-Cp-1wfwi.js";
import { t as Button } from "./button-DZFv31v6.js";
import "./client-DbPPqM1c.js";
import { m as useModulesStore } from "./index-BCUUWpkN.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DZXI3GJ_.js";
import { t as Label } from "./label-CZKY3LJi.js";
import { t as Switch } from "./switch-DqIG4dFb.js";
var LayoutGrid = createLucideIcon("layout-grid", [
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "3",
		rx: "1",
		key: "1g98yp"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "3",
		rx: "1",
		key: "6d4xhi"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "14",
		rx: "1",
		key: "nxv5o0"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "14",
		rx: "1",
		key: "1bb6yr"
	}]
]);
//#endregion
//#region src/components/settings/ModulesSettings.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var moduleLabels = {
	entities: "Entidades (Prop. / Loc.)",
	properties: "Imóveis",
	templates: "Gestão de Modelos",
	contracts: "Ciclo de Contratos",
	manager_approval: "Análise da Gerencia",
	documents: "Documentos GED",
	inspections: "Vistorias",
	keys: "Controle de Chaves",
	document_alerts: "Alertas GED",
	sync_monitor: "Monitor de Sincronização",
	maintenance: "Manutenção",
	renewals: "Renovações",
	legal: "Jurídico",
	sales: "Vendas",
	financial: "Financeiro"
};
function ModulesSettings() {
	const { toast } = useToast();
	const store = useModulesStore();
	const [formData, setFormData] = (0, import_react.useState)(store.modules);
	(0, import_react.useEffect)(() => {
		setFormData(store.modules);
	}, [store.modules]);
	const handleToggle = (key, checked) => {
		setFormData((prev) => ({
			...prev,
			[key]: checked
		}));
	};
	const handleSave = async () => {
		await store.updateModules(formData);
		toast({
			title: "Módulos Atualizados",
			description: "As configurações de visibilidade dos módulos foram salvas com sucesso."
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/settings/ModulesSettings.tsx:57:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/components/settings/ModulesSettings.tsx:58:7",
			"data-prohibitions": "[editContent]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/components/settings/ModulesSettings.tsx:59:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/components/settings/ModulesSettings.tsx:60:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, {
							"data-uid": "src/components/settings/ModulesSettings.tsx:61:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Gestão de Módulos"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/components/settings/ModulesSettings.tsx:63:11",
						"data-prohibitions": "[]",
						children: "Ative ou desative os módulos do sistema. Módulos desativados serão ocultados do menu principal para todos os usuários."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/components/settings/ModulesSettings.tsx:68:9",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/settings/ModulesSettings.tsx:69:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
						children: Object.keys(moduleLabels).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/ModulesSettings.tsx:71:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center space-x-2 border p-4 rounded-lg bg-card shadow-sm justify-between hover:bg-muted/50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/settings/ModulesSettings.tsx:75:17",
								"data-prohibitions": "[editContent]",
								htmlFor: `module-${key}`,
								className: "flex-1 cursor-pointer font-medium select-none",
								children: moduleLabels[key]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								"data-uid": "src/components/settings/ModulesSettings.tsx:81:17",
								"data-prohibitions": "[editContent]",
								id: `module-${key}`,
								checked: formData[key],
								onCheckedChange: (checked) => handleToggle(key, checked)
							})]
						}, key))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
					"data-uid": "src/components/settings/ModulesSettings.tsx:90:9",
					"data-prohibitions": "[]",
					className: "bg-muted/50 py-4 flex justify-end rounded-b-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/settings/ModulesSettings.tsx:91:11",
						"data-prohibitions": "[]",
						onClick: handleSave,
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
							"data-uid": "src/components/settings/ModulesSettings.tsx:92:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						}), " Salvar Alterações"]
					})
				})
			]
		})
	});
}
//#endregion
export { ModulesSettings as default };

//# sourceMappingURL=ModulesSettings-DjOjtk7h.js.map