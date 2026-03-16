import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CvuQPfAM.js";
import "./react-dom-cDMCl7Pc.js";
import { n as useToast } from "./use-toast-cNG4ZhbD.js";
import "./es2015-TBGmAnyn.js";
import { n as createLucideIcon } from "./utils-Di8JFY1h.js";
import { t as Button } from "./button-ChEhZCqG.js";
import { t as Building2 } from "./building-2-iFJZP_7W.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Ri7J9_pf.js";
import { t as CircleCheck } from "./circle-check-Dw62k5Pj.js";
import { t as CloudUpload } from "./cloud-upload-BG7g5G-I.js";
import { t as Eye } from "./eye-GRPlF7C1.js";
import { t as DocumentViewer } from "./DocumentViewer-BlUOKjAN.js";
import { i as useMainStore, r as mainStore } from "./main-DCsFzFjp.js";
import "./users-CkyIZfv8.js";
import { G as FolderSync, L as Search, V as LoaderCircle, h as useAuth, k as Input, q as FileText, t as Badge } from "./index-D7voao9e.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-D7FMgv39.js";
import { t as Label } from "./label-DWr-owgv.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DkS38AD4.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CmG3Ygnc.js";
import { t as Switch } from "./switch-C83RbEiP.js";
import { t as m365Service } from "./m365-CUwPoPXW.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CLUNDdbO.js";
import { t as mockDocuments } from "./data-HFuHBsDK.js";
var File = createLucideIcon("file", [["path", {
	d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	key: "1oefj6"
}], ["path", {
	d: "M14 2v5a1 1 0 0 0 1 1h5",
	key: "wfsgrz"
}]]);
var Printer = createLucideIcon("printer", [
	["path", {
		d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
		key: "143wyd"
	}],
	["path", {
		d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",
		key: "1itne7"
	}],
	["rect", {
		x: "6",
		y: "14",
		width: "12",
		height: "8",
		rx: "1",
		key: "1ue0tg"
	}]
]);
//#endregion
//#region src/components/ScannerPanel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ScannerPanel({ onScan }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/ScannerPanel.tsx:27:5",
		"data-prohibitions": "[]",
		className: "border-primary/20 shadow-sm flex flex-col h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				"data-uid": "src/components/ScannerPanel.tsx:28:7",
				"data-prohibitions": "[]",
				className: "bg-muted/50 border-b pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/ScannerPanel.tsx:29:9",
					"data-prohibitions": "[]",
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/ScannerPanel.tsx:30:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
							"data-uid": "src/components/ScannerPanel.tsx:31:13",
							"data-prohibitions": "[editContent]",
							className: "h-5 w-5 text-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/components/ScannerPanel.tsx:32:13",
							"data-prohibitions": "[]",
							className: "text-lg",
							children: "Protocolo Epson ES-580W"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/ScannerPanel.tsx:34:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-1 text-sm text-emerald-600 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
							"data-uid": "src/components/ScannerPanel.tsx:35:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4"
						}), "Pronto"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					"data-uid": "src/components/ScannerPanel.tsx:39:9",
					"data-prohibitions": "[]",
					children: "Configurações para digitalização em lote e Motor OCR."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				"data-uid": "src/components/ScannerPanel.tsx:41:7",
				"data-prohibitions": "[]",
				className: "space-y-6 pt-6 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/ScannerPanel.tsx:42:9",
						"data-prohibitions": "[]",
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ScannerPanel.tsx:43:11",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/ScannerPanel.tsx:44:13",
								"data-prohibitions": "[]",
								children: "Resolução (DPI)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/ScannerPanel.tsx:45:13",
								"data-prohibitions": "[]",
								defaultValue: "300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/ScannerPanel.tsx:46:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/ScannerPanel.tsx:47:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione DPI"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/ScannerPanel.tsx:49:15",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ScannerPanel.tsx:50:17",
											"data-prohibitions": "[]",
											value: "200",
											children: "200 DPI (Rápido)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ScannerPanel.tsx:51:17",
											"data-prohibitions": "[]",
											value: "300",
											children: "300 DPI (Recomendado)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ScannerPanel.tsx:52:17",
											"data-prohibitions": "[]",
											value: "600",
											children: "600 DPI (Alta Qualidade)"
										})
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ScannerPanel.tsx:56:11",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/ScannerPanel.tsx:57:13",
								"data-prohibitions": "[]",
								children: "Modo de Cor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/ScannerPanel.tsx:58:13",
								"data-prohibitions": "[]",
								defaultValue: "color",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/ScannerPanel.tsx:59:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/ScannerPanel.tsx:60:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione a cor"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/ScannerPanel.tsx:62:15",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ScannerPanel.tsx:63:17",
											"data-prohibitions": "[]",
											value: "color",
											children: "Cores Automáticas"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ScannerPanel.tsx:64:17",
											"data-prohibitions": "[]",
											value: "gray",
											children: "Tons de Cinza"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ScannerPanel.tsx:65:17",
											"data-prohibitions": "[]",
											value: "bw",
											children: "Preto e Branco"
										})
									]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/ScannerPanel.tsx:71:9",
						"data-prohibitions": "[]",
						className: "flex items-center justify-between rounded-lg border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ScannerPanel.tsx:72:11",
							"data-prohibitions": "[]",
							className: "space-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/ScannerPanel.tsx:73:13",
								"data-prohibitions": "[]",
								className: "text-base",
								children: "Digitalização Duplex"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/ScannerPanel.tsx:74:13",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Escanear frente e verso automaticamente."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							"data-uid": "src/components/ScannerPanel.tsx:78:11",
							"data-prohibitions": "[editContent]",
							defaultChecked: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/ScannerPanel.tsx:81:9",
						"data-prohibitions": "[]",
						className: "flex items-center justify-between rounded-lg border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ScannerPanel.tsx:82:11",
							"data-prohibitions": "[]",
							className: "space-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/ScannerPanel.tsx:83:13",
								"data-prohibitions": "[]",
								className: "text-base",
								children: "Reconhecimento OCR"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/ScannerPanel.tsx:84:13",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Extrair metadados para preenchimento."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							"data-uid": "src/components/ScannerPanel.tsx:86:11",
							"data-prohibitions": "[editContent]",
							defaultChecked: true
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
				"data-uid": "src/components/ScannerPanel.tsx:89:7",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/components/ScannerPanel.tsx:90:9",
					"data-prohibitions": "[]",
					className: "w-full h-12 text-lg gap-2",
					onClick: onScan,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
						"data-uid": "src/components/ScannerPanel.tsx:91:11",
						"data-prohibitions": "[editContent]",
						className: "h-5 w-5"
					}), "Iniciar Digitalização & OCR"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/OCRReviewDialog.tsx
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
	const [ocrLoading, setOcrLoading] = (0, import_react.useState)(false);
	const [ocrData, setOcrData] = (0, import_react.useState)(null);
	const [viewDoc, setViewDoc] = (0, import_react.useState)(null);
	const [selectedSite, setSelectedSite] = (0, import_react.useState)("locacao");
	const handleFileUpload = () => {
		setOcrLoading(true);
		setTimeout(() => {
			setOcrLoading(false);
			setOcrData({
				name: "Carlos Eduardo",
				documentId: "123.456.789-00",
				address: "Av. Atlântica, 500",
				value: "4.500,00"
			});
		}, 2e3);
	};
	const handleOcrConfirm = (data, library) => {
		setOcrData(null);
		mainStore.addAuditLog({
			propertyId: "104",
			action: `Upload via OCR para SharePoint [${siteNames[selectedSite]}]: ${library}`,
			user: user?.name || "Sistema"
		});
		m365Service.saveToLibrary(library, `${data.name || "Doc"}_Digitalizado.pdf`, "File Data Mock", selectedSite);
		m365Service.syncToList(store.sharepoint.lists.processControl, JSON.stringify(data));
		toast({
			title: "Ação Processada",
			description: `Requisição encaminhada para o site ${siteNames[selectedSite]}.`
		});
	};
	const siteDocuments = mockDocuments.map((d, i) => ({
		...d,
		name: selectedSite === "juridico" ? `Processo_Legal_0${i + 1}.pdf` : selectedSite === "vendas" ? `Proposta_Venda_${i + 1}.pdf` : selectedSite === "captacao" ? `Lead_Captacao_${i + 1}.pdf` : selectedSite === "financeiro" ? `Comprovante_Pagamento_${i + 1}.pdf` : d.name,
		type: selectedSite === "juridico" ? "Ação Judicial" : selectedSite === "financeiro" ? "Fiscal/Recibo" : d.type
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Documents.tsx:105:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 h-full flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Documents.tsx:106:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Documents.tsx:107:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Documents.tsx:108:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Central de Documentos (GED)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Documents.tsx:109:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Gerencie o acervo digital e navegue pelos Team Sites da imobiliária."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Documents.tsx:113:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-uid": "src/pages/Documents.tsx:114:11",
						"data-prohibitions": "[]",
						className: "text-sm font-medium text-muted-foreground flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
							"data-uid": "src/pages/Documents.tsx:115:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						}), " Contexto (Site):"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/pages/Documents.tsx:117:11",
						"data-prohibitions": "[editContent]",
						value: selectedSite,
						onValueChange: (val) => setSelectedSite(val),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/pages/Documents.tsx:118:13",
							"data-prohibitions": "[]",
							className: "w-[220px] bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/pages/Documents.tsx:119:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Selecione o Site"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
							"data-uid": "src/pages/Documents.tsx:121:13",
							"data-prohibitions": "[editContent]",
							children: Object.entries(siteNames).map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/pages/Documents.tsx:123:17",
								"data-prohibitions": "[editContent]",
								value: key,
								children: label
							}, key))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/Documents.tsx:132:7",
				"data-prohibitions": "[editContent]",
				defaultValue: "library",
				className: "flex-1 flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/Documents.tsx:133:9",
						"data-prohibitions": "[editContent]",
						className: "w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							"data-uid": "src/pages/Documents.tsx:134:11",
							"data-prohibitions": "[editContent]",
							value: "library",
							className: "rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderSync, {
									"data-uid": "src/pages/Documents.tsx:138:13",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}),
								" Biblioteca: ",
								siteNames[selectedSite]
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							"data-uid": "src/pages/Documents.tsx:140:11",
							"data-prohibitions": "[]",
							value: "scan",
							className: "rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
								"data-uid": "src/pages/Documents.tsx:144:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Digitalização & OCR"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/Documents.tsx:148:9",
						"data-prohibitions": "[editContent]",
						value: "library",
						className: "flex-1 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Documents.tsx:149:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Documents.tsx:150:13",
								"data-prohibitions": "[]",
								className: "relative w-full max-w-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									"data-uid": "src/pages/Documents.tsx:151:15",
									"data-prohibitions": "[editContent]",
									className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/Documents.tsx:152:15",
									"data-prohibitions": "[editContent]",
									placeholder: `Buscar em ${siteNames[selectedSite]}...`,
									className: "pl-8"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Documents.tsx:154:13",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground hidden md:block",
								children: ["URL: ", store.sharepoint.sites[selectedSite]]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/Documents.tsx:158:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/Documents.tsx:159:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									"data-uid": "src/pages/Documents.tsx:160:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/Documents.tsx:161:17",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Documents.tsx:162:19",
												"data-prohibitions": "[]",
												children: "Documento"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Documents.tsx:163:19",
												"data-prohibitions": "[]",
												children: "Tipo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Documents.tsx:164:19",
												"data-prohibitions": "[]",
												children: "Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Documents.tsx:165:19",
												"data-prohibitions": "[]",
												className: "text-right",
												children: "Ações"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
									"data-uid": "src/pages/Documents.tsx:168:15",
									"data-prohibitions": "[editContent]",
									children: siteDocuments.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/Documents.tsx:170:19",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
												"data-uid": "src/pages/Documents.tsx:171:21",
												"data-prohibitions": "[editContent]",
												className: "font-medium flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, {
														"data-uid": "src/pages/Documents.tsx:172:23",
														"data-prohibitions": "[editContent]",
														className: "h-4 w-4 text-primary"
													}),
													" ",
													doc.name
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Documents.tsx:174:21",
												"data-prohibitions": "[editContent]",
												children: doc.type
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Documents.tsx:175:21",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/pages/Documents.tsx:176:23",
													"data-prohibitions": "[editContent]",
													variant: "outline",
													children: doc.status
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Documents.tsx:178:21",
												"data-prohibitions": "[]",
												className: "text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													"data-uid": "src/pages/Documents.tsx:179:23",
													"data-prohibitions": "[]",
													size: "sm",
													variant: "ghost",
													onClick: () => setViewDoc(doc.name),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
														"data-uid": "src/pages/Documents.tsx:180:25",
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/Documents.tsx:190:9",
						"data-prohibitions": "[editContent]",
						value: "scan",
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Documents.tsx:191:11",
							"data-prohibitions": "[editContent]",
							className: "grid md:grid-cols-2 gap-6 h-full min-h-[400px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScannerPanel, {
								"data-uid": "src/pages/Documents.tsx:192:13",
								"data-prohibitions": "[editContent]",
								onScan: handleFileUpload
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/pages/Documents.tsx:193:13",
								"data-prohibitions": "[editContent]",
								className: "border-dashed border-2 flex flex-col items-center justify-center p-10 cursor-pointer hover:bg-muted/50 transition-colors",
								onClick: handleFileUpload,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/Documents.tsx:197:15",
									"data-prohibitions": "[editContent]",
									className: "text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Documents.tsx:198:17",
											"data-prohibitions": "[editContent]",
											className: "mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4",
											children: ocrLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
												"data-uid": "src/pages/Documents.tsx:200:21",
												"data-prohibitions": "[editContent]",
												className: "h-8 w-8 animate-spin"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
												"data-uid": "src/pages/Documents.tsx:202:21",
												"data-prohibitions": "[editContent]",
												className: "h-8 w-8 text-primary"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
											"data-uid": "src/pages/Documents.tsx:205:17",
											"data-prohibitions": "[editContent]",
											children: ocrLoading ? "Processando..." : "Upload Manual"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
											"data-uid": "src/pages/Documents.tsx:206:17",
											"data-prohibitions": "[editContent]",
											children: [
												"Arraste arquivos para extração OCR e envio direto para",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													"data-uid": "src/pages/Documents.tsx:208:19",
													"data-prohibitions": "[editContent]",
													children: siteNames[selectedSite]
												}),
												"."
											]
										})
									]
								})
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OCRReviewDialog, {
				"data-uid": "src/pages/Documents.tsx:216:7",
				"data-prohibitions": "[editContent]",
				open: !!ocrData,
				onClose: () => setOcrData(null),
				onConfirm: handleOcrConfirm,
				initialData: ocrData,
				contextSite: siteNames[selectedSite]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewer, {
				"data-uid": "src/pages/Documents.tsx:223:7",
				"data-prohibitions": "[editContent]",
				open: !!viewDoc,
				onClose: () => setViewDoc(null),
				docName: viewDoc
			})
		]
	});
};
//#endregion
export { Documents as default };

//# sourceMappingURL=Documents-imHWXDrd.js.map