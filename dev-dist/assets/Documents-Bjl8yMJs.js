import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-Chw5iMW0.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as Building2 } from "./building-2-BtLCLCIM.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BnRniNmY.js";
import { t as GedUpload } from "./GedUpload-D8VvpMGx.js";
import { t as CloudUpload } from "./cloud-upload-Dec2qn3q.js";
import { t as Eye } from "./eye-CCVRbhpy.js";
import { t as DocumentViewer } from "./DocumentViewer-CIIaHQBG.js";
import { t as Printer } from "./printer-CWhfCFj_.js";
import { t as Button } from "./button-iQJzuPvV.js";
import "./client-C4nUQiBY.js";
import { i as useMainStore, r as mainStore } from "./main-7B_Nvovk.js";
import "./users-Bbju60At.js";
import "./keys-D7Gl_VCN.js";
import "./entities-1AjQ7EHU.js";
import { g as useAuth, j as Input, q as Search, t as Badge, tt as FolderSync, y as useDocumentsStore } from "./index-BzA6GMeO.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-BhS_F8IN.js";
import { t as Label } from "./label-CTlYsXe6.js";
import "./switch-D-owz7ay.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DxxBVlIY.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-7DCIncS9.js";
import { n as m365Service } from "./m365-C6nMyI-x.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-vlb5Iif8.js";
import "./textarea-HLykTTqE.js";
import "./command-C9sM5wqF.js";
import "./popover-DxeLz4x4.js";
var File = createLucideIcon("file", [["path", {
	d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	key: "1oefj6"
}], ["path", {
	d: "M14 2v5a1 1 0 0 0 1 1h5",
	key: "wfsgrz"
}]]);
//#endregion
//#region src/components/OCRReviewDialog.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function OCRReviewDialog({ open, onClose, onConfirm, initialData, contextSite }) {
	const { libraries } = useMainStore().sharepoint;
	const [formData, setFormData] = (0, import_react.useState)(initialData || {});
	const [library, setLibrary] = (0, import_react.useState)(libraries.tenantDocs);
	(0, import_react.useEffect)(() => {
		if (initialData) setFormData(initialData);
	}, [initialData]);
	(0, import_react.useEffect)(() => {
		if (open) setLibrary(libraries.tenantDocs);
	}, [open, libraries.tenantDocs]);
	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/OCRReviewDialog.tsx:60:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/OCRReviewDialog.tsx:61:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[425px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/OCRReviewDialog.tsx:62:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/OCRReviewDialog.tsx:63:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-between",
						children: ["Revisão OCR", contextSite && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							"data-uid": "src/components/OCRReviewDialog.tsx:65:29",
							"data-prohibitions": "[editContent]",
							variant: "secondary",
							children: contextSite
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/OCRReviewDialog.tsx:67:11",
						"data-prohibitions": "[]",
						children: "Verifique os dados extraídos do documento antes de salvar no site selecionado."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/OCRReviewDialog.tsx:71:9",
					"data-prohibitions": "[editContent]",
					className: "grid gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/OCRReviewDialog.tsx:72:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/OCRReviewDialog.tsx:73:13",
								"data-prohibitions": "[]",
								children: "Biblioteca de Destino"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/OCRReviewDialog.tsx:74:13",
								"data-prohibitions": "[editContent]",
								value: library,
								onValueChange: setLibrary,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/OCRReviewDialog.tsx:75:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/OCRReviewDialog.tsx:76:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione a biblioteca"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/OCRReviewDialog.tsx:78:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/OCRReviewDialog.tsx:79:17",
											"data-prohibitions": "[editContent]",
											value: libraries.contracts,
											children: libraries.contracts
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/OCRReviewDialog.tsx:80:17",
											"data-prohibitions": "[editContent]",
											value: libraries.ownerDocs,
											children: libraries.ownerDocs
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/OCRReviewDialog.tsx:81:17",
											"data-prohibitions": "[editContent]",
											value: libraries.tenantDocs,
											children: libraries.tenantDocs
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/OCRReviewDialog.tsx:82:17",
											"data-prohibitions": "[]",
											value: "Anexos de Processo",
											children: "Anexos de Processo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/OCRReviewDialog.tsx:83:17",
											"data-prohibitions": "[]",
											value: "Comprovantes",
											children: "Comprovantes Financeiros"
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/OCRReviewDialog.tsx:87:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/OCRReviewDialog.tsx:88:13",
								"data-prohibitions": "[]",
								htmlFor: "name",
								children: "Nome / Razão Social"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/OCRReviewDialog.tsx:89:13",
								"data-prohibitions": "[editContent]",
								id: "name",
								value: formData.name || "",
								onChange: (e) => handleChange("name", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/OCRReviewDialog.tsx:95:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/OCRReviewDialog.tsx:96:13",
								"data-prohibitions": "[]",
								htmlFor: "documentId",
								children: "CPF / CNPJ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/OCRReviewDialog.tsx:97:13",
								"data-prohibitions": "[editContent]",
								id: "documentId",
								value: formData.documentId || "",
								onChange: (e) => handleChange("documentId", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/OCRReviewDialog.tsx:103:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/OCRReviewDialog.tsx:104:13",
								"data-prohibitions": "[]",
								htmlFor: "address",
								children: "Endereço Extraído"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/OCRReviewDialog.tsx:105:13",
								"data-prohibitions": "[editContent]",
								id: "address",
								value: formData.address || "",
								onChange: (e) => handleChange("address", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/OCRReviewDialog.tsx:111:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/OCRReviewDialog.tsx:112:13",
								"data-prohibitions": "[]",
								htmlFor: "value",
								children: "Valor Base (R$)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/OCRReviewDialog.tsx:113:13",
								"data-prohibitions": "[editContent]",
								id: "value",
								value: formData.value || "",
								onChange: (e) => handleChange("value", e.target.value)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/OCRReviewDialog.tsx:120:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/OCRReviewDialog.tsx:121:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: onClose,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/OCRReviewDialog.tsx:124:11",
						"data-prohibitions": "[]",
						onClick: () => onConfirm(formData, library),
						children: "Sincronizar e Salvar"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/pages/Documents.tsx
var siteNames = {
	locacao: "Gestão de Locação",
	captacao: "Captação (Leads)",
	vendas: "Vendas",
	juridico: "Jurídico",
	financeiro: "Financeiro"
};
var Documents = () => {
	const { toast } = useToast();
	const { user } = useAuth();
	const store = useMainStore();
	const [ocrData, setOcrData] = (0, import_react.useState)(null);
	const [viewDoc, setViewDoc] = (0, import_react.useState)(null);
	const [selectedSite, setSelectedSite] = (0, import_react.useState)("locacao");
	const { documents } = useDocumentsStore();
	const handleOcrConfirm = async (data, library) => {
		setOcrData(null);
		const propertyId = data.propertyId || "GERAL";
		mainStore.addAuditLog({
			propertyId,
			action: `Upload via OCR para SharePoint [${siteNames[selectedSite]}]: ${library}`,
			user: user?.name || "Sistema"
		});
		try {
			await m365Service.saveToLibrary(library, data.name || "Documento_Digitalizado.pdf", data.file || new Blob(["Conteúdo processado via OCR"], { type: "application/pdf" }), selectedSite);
			await m365Service.syncToList(store.sharepoint.lists.processControl, JSON.stringify(data));
			toast({
				title: "Ação Processada",
				description: `Requisição encaminhada para o site ${siteNames[selectedSite]}.`
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Erro no Envio",
				description: error.message || "Falha ao sincronizar com o SharePoint."
			});
		}
	};
	const siteDocuments = documents.filter((d) => !d.category || d.category.toLowerCase().includes(selectedSite.toLowerCase()) || selectedSite === "locacao").map((d) => ({
		id: d.id,
		name: d.name,
		type: d.category || "Geral",
		status: "Processado",
		filePath: d.filePath
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Documents.tsx:106:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 h-full flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Documents.tsx:107:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Documents.tsx:108:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Documents.tsx:109:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Central de Documentos (GED)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Documents.tsx:110:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Gerencie o acervo digital e navegue pelos Team Sites da imobiliária."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Documents.tsx:114:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-uid": "src/pages/Documents.tsx:115:11",
						"data-prohibitions": "[]",
						className: "text-sm font-medium text-muted-foreground flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
							"data-uid": "src/pages/Documents.tsx:116:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						}), " Contexto (Site):"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/pages/Documents.tsx:118:11",
						"data-prohibitions": "[editContent]",
						value: selectedSite,
						onValueChange: (val) => setSelectedSite(val),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/pages/Documents.tsx:119:13",
							"data-prohibitions": "[]",
							className: "w-[220px] bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/pages/Documents.tsx:120:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Selecione o Site"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
							"data-uid": "src/pages/Documents.tsx:122:13",
							"data-prohibitions": "[editContent]",
							children: Object.entries(siteNames).map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/pages/Documents.tsx:124:17",
								"data-prohibitions": "[editContent]",
								value: key,
								children: label
							}, key))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/Documents.tsx:133:7",
				"data-prohibitions": "[editContent]",
				defaultValue: "scan",
				className: "flex-1 flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/Documents.tsx:134:9",
						"data-prohibitions": "[editContent]",
						className: "w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							"data-uid": "src/pages/Documents.tsx:135:11",
							"data-prohibitions": "[]",
							value: "scan",
							className: "rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
								"data-uid": "src/pages/Documents.tsx:139:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Digitalização & Upload"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							"data-uid": "src/pages/Documents.tsx:141:11",
							"data-prohibitions": "[editContent]",
							value: "library",
							className: "rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderSync, {
									"data-uid": "src/pages/Documents.tsx:145:13",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}),
								" Biblioteca: ",
								siteNames[selectedSite]
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/Documents.tsx:149:9",
						"data-prohibitions": "[]",
						value: "scan",
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Documents.tsx:150:11",
							"data-prohibitions": "[]",
							className: "grid md:grid-cols-2 gap-6 h-full min-h-[400px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/Documents.tsx:151:13",
								"data-prohibitions": "[]",
								className: "border-primary/20 shadow-sm flex flex-col h-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/Documents.tsx:152:15",
									"data-prohibitions": "[]",
									className: "bg-muted/50 border-b pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Documents.tsx:153:17",
										"data-prohibitions": "[]",
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
											"data-uid": "src/pages/Documents.tsx:154:19",
											"data-prohibitions": "[editContent]",
											className: "h-5 w-5 text-primary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
											"data-uid": "src/pages/Documents.tsx:155:19",
											"data-prohibitions": "[]",
											className: "text-lg",
											children: "Digitalização Direta (Epson)"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
										"data-uid": "src/pages/Documents.tsx:157:17",
										"data-prohibitions": "[]",
										children: "Capture documentos físicos do scanner e indexe automaticamente."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/Documents.tsx:161:15",
									"data-prohibitions": "[]",
									className: "pt-6 flex-1 flex flex-col",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GedUpload, {
										"data-uid": "src/pages/Documents.tsx:162:17",
										"data-prohibitions": "[editContent]",
										mode: "scanner"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/Documents.tsx:166:13",
								"data-prohibitions": "[]",
								className: "border-primary/20 shadow-sm flex flex-col h-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/Documents.tsx:167:15",
									"data-prohibitions": "[]",
									className: "bg-muted/50 border-b pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Documents.tsx:168:17",
										"data-prohibitions": "[]",
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
											"data-uid": "src/pages/Documents.tsx:169:19",
											"data-prohibitions": "[editContent]",
											className: "h-5 w-5 text-primary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
											"data-uid": "src/pages/Documents.tsx:170:19",
											"data-prohibitions": "[]",
											className: "text-lg",
											children: "Upload Estruturado (Arquivo)"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
										"data-uid": "src/pages/Documents.tsx:172:17",
										"data-prohibitions": "[]",
										children: "Envie arquivos locais diretamente para a estrutura taxônomica."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/Documents.tsx:176:15",
									"data-prohibitions": "[]",
									className: "pt-6 flex-1 flex flex-col",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GedUpload, {
										"data-uid": "src/pages/Documents.tsx:177:17",
										"data-prohibitions": "[editContent]",
										mode: "file"
									})
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/Documents.tsx:183:9",
						"data-prohibitions": "[editContent]",
						value: "library",
						className: "flex-1 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Documents.tsx:184:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Documents.tsx:185:13",
								"data-prohibitions": "[]",
								className: "relative w-full max-w-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									"data-uid": "src/pages/Documents.tsx:186:15",
									"data-prohibitions": "[editContent]",
									className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/Documents.tsx:187:15",
									"data-prohibitions": "[editContent]",
									placeholder: `Buscar em ${siteNames[selectedSite]}...`,
									className: "pl-8"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Documents.tsx:189:13",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground hidden md:block",
								children: ["GED Integrado: ", store.sharepoint.sharepointDomain || "Não configurado"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/Documents.tsx:193:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/Documents.tsx:194:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									"data-uid": "src/pages/Documents.tsx:195:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/Documents.tsx:196:17",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Documents.tsx:197:19",
												"data-prohibitions": "[]",
												children: "Documento"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Documents.tsx:198:19",
												"data-prohibitions": "[]",
												children: "Tipo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Documents.tsx:199:19",
												"data-prohibitions": "[]",
												children: "Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Documents.tsx:200:19",
												"data-prohibitions": "[]",
												className: "text-right",
												children: "Ações"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
									"data-uid": "src/pages/Documents.tsx:203:15",
									"data-prohibitions": "[editContent]",
									children: siteDocuments.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/Documents.tsx:205:19",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
												"data-uid": "src/pages/Documents.tsx:206:21",
												"data-prohibitions": "[editContent]",
												className: "font-medium flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, {
														"data-uid": "src/pages/Documents.tsx:207:23",
														"data-prohibitions": "[editContent]",
														className: "h-4 w-4 text-primary"
													}),
													" ",
													doc.name
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Documents.tsx:209:21",
												"data-prohibitions": "[editContent]",
												children: doc.type
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Documents.tsx:210:21",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/pages/Documents.tsx:211:23",
													"data-prohibitions": "[editContent]",
													variant: "outline",
													children: doc.status
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Documents.tsx:213:21",
												"data-prohibitions": "[]",
												className: "text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													"data-uid": "src/pages/Documents.tsx:214:23",
													"data-prohibitions": "[]",
													size: "sm",
													variant: "ghost",
													onClick: () => setViewDoc(doc.id),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
														"data-uid": "src/pages/Documents.tsx:215:25",
														"data-prohibitions": "[editContent]",
														className: "h-4 w-4 mr-2"
													}), " Visualizar"]
												})
											})
										]
									}, doc.id))
								})]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OCRReviewDialog, {
				"data-uid": "src/pages/Documents.tsx:226:7",
				"data-prohibitions": "[editContent]",
				open: !!ocrData,
				onClose: () => setOcrData(null),
				onConfirm: handleOcrConfirm,
				initialData: ocrData,
				contextSite: siteNames[selectedSite]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewer, {
				"data-uid": "src/pages/Documents.tsx:233:7",
				"data-prohibitions": "[editContent]",
				open: !!viewDoc,
				onClose: () => setViewDoc(null),
				viewItem: viewDoc ? {
					type: "document",
					id: viewDoc
				} : void 0
			})
		]
	});
};
//#endregion
export { Documents as default };

//# sourceMappingURL=Documents-Bjl8yMJs.js.map