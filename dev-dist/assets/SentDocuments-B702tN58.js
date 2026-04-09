import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-IQxnG6u7.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DnMFfPiL.js";
import { t as ExternalLink } from "./external-link-DaNlYeYS.js";
import { t as DocumentViewer } from "./DocumentViewer-pG3VP4H7.js";
import { t as RefreshCw } from "./refresh-cw-QaQDb9vQ.js";
import { t as Button } from "./button-DI75GKXN.js";
import { t as supabase } from "./client-BWrqzmk9.js";
import "./main-MCjtWH0Q.js";
import "./users-GrHHYR3T.js";
import "./keys-DwzNq5O0.js";
import "./entities-Df_ukVF8.js";
import { X as LoaderCircle, j as Input, q as Search, rt as FileText, t as Badge } from "./index-BRm_rq8y.js";
import { a as CardHeader, n as CardContent, t as Card } from "./card-C664G4yu.js";
import "./label-p96YWrk6.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-Bnv9ycWF.js";
import "./dialog-nefYq8dO.js";
import { n as m365Service } from "./m365-DB4yadv4.js";
import { n as format, t as ptBR } from "./pt-BR-n9UHVg-b.js";
import "./textarea-DxYDYLCb.js";
//#region src/pages/SentDocuments.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var DOCUMENT_TYPES = {
	OWNER_DOCUMENT: "Documento de Proprietário",
	TENANT_DOCUMENT: "Documento de Locatário",
	GUARANTEE_DOCUMENT: "Documentos de Garantia",
	CONTRACT_ACTIVE: "Contrato Ativo (Importar Legado)",
	CONTRACT_TERMINATED: "Contrato Encerrado",
	INSPECTION_MOVE_IN: "Vistoria de Entrada",
	INSPECTION_MOVE_OUT: "Vistoria de Saída"
};
function SentDocuments() {
	const [documents, setDocuments] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	const [selectedProperty, setSelectedProperty] = (0, import_react.useState)("all");
	const [viewDoc, setViewDoc] = (0, import_react.useState)(null);
	const { toast } = useToast();
	const uniqueCategories = (0, import_react.useMemo)(() => {
		const categories = new Set(documents.map((doc) => doc.category).filter(Boolean));
		return Array.from(categories);
	}, [documents]);
	const uniqueProperties = (0, import_react.useMemo)(() => {
		const properties = new Set(documents.map((doc) => doc.properties?.title).filter(Boolean));
		return Array.from(properties);
	}, [documents]);
	(0, import_react.useEffect)(() => {
		fetchDocuments();
	}, []);
	const fetchDocuments = async () => {
		try {
			setLoading(true);
			const { data, error } = await supabase.from("property_documents").select(`
          *,
          properties ( title )
        `).not("file_path", "is", null).neq("file_path", "").order("created_at", { ascending: false });
			if (error) throw error;
			setDocuments(data || []);
		} catch (error) {
			console.error("Error fetching documents:", error);
			toast({
				variant: "destructive",
				title: "Erro ao carregar documentos",
				description: error.message
			});
		} finally {
			setLoading(false);
		}
	};
	const handleView = async (doc) => {
		try {
			toast({
				title: "Buscando documento...",
				description: "Conectando ao SharePoint para gerar o link de visualização."
			});
			const url = await m365Service.getFilePreviewUrl(doc.file_path || doc.name, doc.category);
			if (url) window.open(url, "_blank");
			else throw new Error("URL de visualização indisponível");
		} catch (error) {
			toast({
				variant: "destructive",
				title: "SharePoint não acessível",
				description: "Abrindo visualizador interno. " + error.message
			});
			setViewDoc(doc.name);
		}
	};
	const filteredDocs = documents.filter((doc) => {
		const categoryLabel = DOCUMENT_TYPES[doc.category] || doc.category;
		const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) || (doc.properties?.title || "").toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
		const matchesProperty = selectedProperty === "all" || doc.properties?.title === selectedProperty;
		return matchesSearch && matchesCategory && matchesProperty;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/SentDocuments.tsx:127:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 h-full flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/SentDocuments.tsx:128:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/SentDocuments.tsx:129:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/SentDocuments.tsx:130:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Documentos Enviados ao SharePoint"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/SentDocuments.tsx:131:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Histórico e visualização de todos os arquivos enviados para as bibliotecas do M365."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/SentDocuments.tsx:135:9",
					"data-prohibitions": "[editContent]",
					variant: "outline",
					onClick: fetchDocuments,
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						"data-uid": "src/pages/SentDocuments.tsx:136:11",
						"data-prohibitions": "[editContent]",
						className: `w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`
					}), "Atualizar"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/SentDocuments.tsx:141:7",
				"data-prohibitions": "[editContent]",
				className: "flex-1 flex flex-col min-h-[500px] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/SentDocuments.tsx:142:9",
					"data-prohibitions": "[editContent]",
					className: "pb-4 border-b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/SentDocuments.tsx:143:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/SentDocuments.tsx:144:13",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/SentDocuments.tsx:145:15",
									"data-prohibitions": "[]",
									className: "relative w-full sm:w-64",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										"data-uid": "src/pages/SentDocuments.tsx:146:17",
										"data-prohibitions": "[editContent]",
										className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/SentDocuments.tsx:147:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Buscar documento...",
										className: "pl-8 bg-background",
										value: searchTerm,
										onChange: (e) => setSearchTerm(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/SentDocuments.tsx:154:15",
									"data-prohibitions": "[editContent]",
									value: selectedCategory,
									onValueChange: setSelectedCategory,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/SentDocuments.tsx:155:17",
										"data-prohibitions": "[]",
										className: "w-full sm:w-48 bg-background",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/SentDocuments.tsx:156:19",
											"data-prohibitions": "[editContent]",
											placeholder: "Categoria"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/SentDocuments.tsx:158:17",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/SentDocuments.tsx:159:19",
											"data-prohibitions": "[]",
											value: "all",
											children: "Todas Categorias"
										}), uniqueCategories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/SentDocuments.tsx:161:21",
											"data-prohibitions": "[editContent]",
											value: cat,
											children: DOCUMENT_TYPES[cat] || cat
										}, cat))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/SentDocuments.tsx:167:15",
									"data-prohibitions": "[editContent]",
									value: selectedProperty,
									onValueChange: setSelectedProperty,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/SentDocuments.tsx:168:17",
										"data-prohibitions": "[]",
										className: "w-full sm:w-48 bg-background",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/SentDocuments.tsx:169:19",
											"data-prohibitions": "[editContent]",
											placeholder: "Imóvel"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/SentDocuments.tsx:171:17",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/SentDocuments.tsx:172:19",
											"data-prohibitions": "[]",
											value: "all",
											children: "Todos Imóveis"
										}), uniqueProperties.map((prop) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/SentDocuments.tsx:174:21",
											"data-prohibitions": "[editContent]",
											value: prop,
											children: prop
										}, prop))]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							"data-uid": "src/pages/SentDocuments.tsx:181:13",
							"data-prohibitions": "[editContent]",
							variant: "secondary",
							className: "hidden lg:flex text-sm py-1 whitespace-nowrap",
							children: [filteredDocs.length, " documentos"]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/SentDocuments.tsx:186:9",
					"data-prohibitions": "[editContent]",
					className: "flex-1 p-0 overflow-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/SentDocuments.tsx:187:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/SentDocuments.tsx:188:13",
							"data-prohibitions": "[]",
							className: "bg-muted/50 sticky top-0 z-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/SentDocuments.tsx:189:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SentDocuments.tsx:190:17",
										"data-prohibitions": "[]",
										className: "pl-6",
										children: "Arquivo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SentDocuments.tsx:191:17",
										"data-prohibitions": "[]",
										children: "Imóvel"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SentDocuments.tsx:192:17",
										"data-prohibitions": "[]",
										children: "Categoria"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SentDocuments.tsx:193:17",
										"data-prohibitions": "[]",
										children: "Data de Envio"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SentDocuments.tsx:194:17",
										"data-prohibitions": "[]",
										className: "text-right pr-6",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
							"data-uid": "src/pages/SentDocuments.tsx:197:13",
							"data-prohibitions": "[editContent]",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/SentDocuments.tsx:199:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/SentDocuments.tsx:200:19",
									"data-prohibitions": "[]",
									colSpan: 5,
									className: "h-32 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										"data-uid": "src/pages/SentDocuments.tsx:201:21",
										"data-prohibitions": "[editContent]",
										className: "h-6 w-6 animate-spin mx-auto text-primary"
									})
								})
							}) : filteredDocs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/SentDocuments.tsx:205:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/SentDocuments.tsx:206:19",
									"data-prohibitions": "[]",
									colSpan: 5,
									className: "h-32 text-center text-muted-foreground",
									children: "Nenhum documento encontrado."
								})
							}) : filteredDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/SentDocuments.tsx:212:19",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/SentDocuments.tsx:213:21",
										"data-prohibitions": "[editContent]",
										className: "font-medium pl-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/SentDocuments.tsx:214:23",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
												"data-uid": "src/pages/SentDocuments.tsx:215:25",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4 text-blue-600 shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/SentDocuments.tsx:216:25",
												"data-prohibitions": "[editContent]",
												className: "truncate max-w-[200px] sm:max-w-[300px]",
												title: doc.name,
												children: doc.name
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/SentDocuments.tsx:221:21",
										"data-prohibitions": "[editContent]",
										className: "truncate max-w-[150px] sm:max-w-[200px]",
										title: doc.properties?.title,
										children: doc.properties?.title || "N/A"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/SentDocuments.tsx:227:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/SentDocuments.tsx:228:23",
											"data-prohibitions": "[editContent]",
											variant: "outline",
											className: "bg-background",
											children: DOCUMENT_TYPES[doc.category] || doc.category
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/SentDocuments.tsx:232:21",
										"data-prohibitions": "[editContent]",
										className: "text-muted-foreground whitespace-nowrap",
										children: format(new Date(doc.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/SentDocuments.tsx:235:21",
										"data-prohibitions": "[]",
										className: "text-right pr-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/SentDocuments.tsx:236:23",
											"data-prohibitions": "[]",
											size: "sm",
											variant: "ghost",
											onClick: () => handleView(doc),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
												"data-uid": "src/pages/SentDocuments.tsx:237:25",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewer, {
				"data-uid": "src/pages/SentDocuments.tsx:248:7",
				"data-prohibitions": "[editContent]",
				open: !!viewDoc,
				onClose: () => setViewDoc(null),
				docName: viewDoc
			})
		]
	});
}
//#endregion
export { SentDocuments as default };

//# sourceMappingURL=SentDocuments-B702tN58.js.map