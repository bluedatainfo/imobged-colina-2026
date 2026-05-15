import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-BcW3sjWS.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import "./select-2PYY5iOA.js";
import { t as GedUpload } from "./GedUpload-CQvov1Qe.js";
import "./button-DZFv31v6.js";
import "./client-DbPPqM1c.js";
import "./main-q-0oPKZw.js";
import "./users-DQmtGtfO.js";
import "./keys-BxY60ceF.js";
import "./entities-pTkigeh5.js";
import { X as LoaderCircle, rt as FileText } from "./index-BITzAUZi.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DZXI3GJ_.js";
import "./label-CZKY3LJi.js";
import "./switch-DqIG4dFb.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BEewcIWh.js";
import { n as m365Service } from "./m365-CBkwAIgl.js";
import "./command-DJqqkrQu.js";
import "./popover-DBAp1M0a.js";
var FileSpreadsheet = createLucideIcon("file-spreadsheet", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M8 13h2",
		key: "yr2amv"
	}],
	["path", {
		d: "M14 13h2",
		key: "un5t4a"
	}],
	["path", {
		d: "M8 17h2",
		key: "2yhykz"
	}],
	["path", {
		d: "M14 17h2",
		key: "10kma7"
	}]
]);
//#endregion
//#region src/pages/AdditionalDocuments.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AdditionalDocuments() {
	const [templates, setTemplates] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedTemplate, setSelectedTemplate] = (0, import_react.useState)(null);
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				let spTemplates = await m365Service.listTemplates();
				if (!spTemplates || spTemplates.length === 0) spTemplates = [
					{
						id: "1",
						name: "CONTRATO PRESTAÇÃO SERVIÇO.docx",
						type: "word",
						webUrl: "#"
					},
					{
						id: "2",
						name: "CHECKLIST.xlsx",
						type: "excel",
						webUrl: "#"
					},
					{
						id: "3",
						name: "TERMO DE VISTORIA.docx",
						type: "word",
						webUrl: "#"
					}
				];
				setTemplates(spTemplates);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	const handleOpenDialog = (template) => {
		setSelectedTemplate(template);
		setDialogOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/AdditionalDocuments.tsx:51:5",
		"data-prohibitions": "[editContent]",
		className: "flex-1 space-y-4 p-4 md:p-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/AdditionalDocuments.tsx:52:7",
				"data-prohibitions": "[]",
				className: "flex items-center justify-between space-y-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/AdditionalDocuments.tsx:53:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-primary",
					children: "Documentos Adicionais"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/AdditionalDocuments.tsx:56:7",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "Selecione um modelo do SharePoint para gerar uma cópia na pasta correta e preencher via Office Online."
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/AdditionalDocuments.tsx:62:9",
				"data-prohibitions": "[]",
				className: "flex items-center justify-center h-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/pages/AdditionalDocuments.tsx:63:11",
					"data-prohibitions": "[editContent]",
					className: "h-8 w-8 animate-spin text-primary"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/AdditionalDocuments.tsx:66:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4",
				children: templates.map((template) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/AdditionalDocuments.tsx:68:13",
					"data-prohibitions": "[editContent]",
					className: "cursor-pointer hover:border-primary transition-colors",
					onClick: () => handleOpenDialog(template),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/AdditionalDocuments.tsx:73:15",
						"data-prohibitions": "[editContent]",
						className: "flex flex-row items-center justify-between pb-2 space-y-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:74:17",
							"data-prohibitions": "[editContent]",
							className: "text-sm font-medium line-clamp-2",
							title: template.name,
							children: template.name
						}), template.name.toLowerCase().endsWith("xlsx") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:78:19",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 text-green-600 shrink-0"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:80:19",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 text-blue-600 shrink-0"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/AdditionalDocuments.tsx:83:15",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:84:17",
							"data-prohibitions": "[]",
							children: "Clique para gerar e preencher este documento."
						})
					})]
				}, template.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/AdditionalDocuments.tsx:91:7",
				"data-prohibitions": "[editContent]",
				open: dialogOpen,
				onOpenChange: setDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/AdditionalDocuments.tsx:92:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-[550px] max-h-[90vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
						"data-uid": "src/pages/AdditionalDocuments.tsx:93:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:94:13",
							"data-prohibitions": "[]",
							children: "Gerar Documento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:95:13",
							"data-prohibitions": "[editContent]",
							children: [
								"Modelo selecionado:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/AdditionalDocuments.tsx:97:15",
									"data-prohibitions": "[editContent]",
									className: "font-semibold text-primary",
									children: selectedTemplate?.name
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/AdditionalDocuments.tsx:101:11",
						"data-prohibitions": "[]",
						className: "py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GedUpload, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:102:13",
							"data-prohibitions": "[editContent]",
							mode: "template",
							template: selectedTemplate,
							onSuccess: () => setDialogOpen(false)
						})
					})]
				})
			})
		]
	});
}
//#endregion
export { AdditionalDocuments as default };

//# sourceMappingURL=AdditionalDocuments-DTvXwxq2.js.map