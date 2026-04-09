import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-IQxnG6u7.js";
import { t as ExternalLink } from "./external-link-DaNlYeYS.js";
import { t as DocumentViewer } from "./DocumentViewer-3LF7cX08.js";
import { t as RefreshCw } from "./refresh-cw-QaQDb9vQ.js";
import { t as Button } from "./button-DI75GKXN.js";
import { t as supabase } from "./client-BWrqzmk9.js";
import "./main-MCjtWH0Q.js";
import "./users-GrHHYR3T.js";
import "./keys-DwzNq5O0.js";
import "./entities-Df_ukVF8.js";
import { X as LoaderCircle, j as Input, q as Search, rt as FileText, t as Badge } from "./index-cg6NgqpM.js";
import { a as CardHeader, n as CardContent, t as Card } from "./card-C664G4yu.js";
import "./label-p96YWrk6.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-Bnv9ycWF.js";
import "./dialog-BFR_NiAd.js";
import { n as m365Service } from "./m365-DB4yadv4.js";
import { n as format, t as ptBR } from "./pt-BR-n9UHVg-b.js";
import "./textarea-DxYDYLCb.js";
//#region src/pages/SentDocuments.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function SentDocuments() {
	const [documents, setDocuments] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [viewDoc, setViewDoc] = (0, import_react.useState)(null);
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		fetchDocuments();
	}, []);
	const fetchDocuments = async () => {
		try {
			setLoading(true);
			const { data, error } = await supabase.from("property_documents").select(`
          *,
          properties ( title )
        `).order("created_at", { ascending: false });
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
	const filteredDocs = documents.filter((doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.category.toLowerCase().includes(searchTerm.toLowerCase()) || (doc.properties?.title || "").toLowerCase().includes(searchTerm.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/SentDocuments.tsx:89:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 h-full flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/SentDocuments.tsx:90:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/SentDocuments.tsx:91:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/SentDocuments.tsx:92:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Documentos Enviados ao SharePoint"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/SentDocuments.tsx:93:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Histórico e visualização de todos os arquivos enviados para as bibliotecas do M365."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/SentDocuments.tsx:97:9",
					"data-prohibitions": "[editContent]",
					variant: "outline",
					onClick: fetchDocuments,
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						"data-uid": "src/pages/SentDocuments.tsx:98:11",
						"data-prohibitions": "[editContent]",
						className: `w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`
					}), "Atualizar"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/SentDocuments.tsx:103:7",
				"data-prohibitions": "[editContent]",
				className: "flex-1 flex flex-col min-h-[500px] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/SentDocuments.tsx:104:9",
					"data-prohibitions": "[editContent]",
					className: "pb-4 border-b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/SentDocuments.tsx:105:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/SentDocuments.tsx:106:13",
							"data-prohibitions": "[]",
							className: "relative w-full max-w-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"data-uid": "src/pages/SentDocuments.tsx:107:15",
								"data-prohibitions": "[editContent]",
								className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/SentDocuments.tsx:108:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar por nome, categoria ou imóvel...",
								className: "pl-8 bg-background",
								value: searchTerm,
								onChange: (e) => setSearchTerm(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							"data-uid": "src/pages/SentDocuments.tsx:115:13",
							"data-prohibitions": "[editContent]",
							variant: "secondary",
							className: "hidden md:flex text-sm py-1",
							children: [filteredDocs.length, " documentos"]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/SentDocuments.tsx:120:9",
					"data-prohibitions": "[editContent]",
					className: "flex-1 p-0 overflow-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/SentDocuments.tsx:121:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/SentDocuments.tsx:122:13",
							"data-prohibitions": "[]",
							className: "bg-muted/50 sticky top-0 z-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/SentDocuments.tsx:123:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SentDocuments.tsx:124:17",
										"data-prohibitions": "[]",
										className: "pl-6",
										children: "Arquivo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SentDocuments.tsx:125:17",
										"data-prohibitions": "[]",
										children: "Imóvel"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SentDocuments.tsx:126:17",
										"data-prohibitions": "[]",
										children: "Categoria"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SentDocuments.tsx:127:17",
										"data-prohibitions": "[]",
										children: "Data de Envio"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SentDocuments.tsx:128:17",
										"data-prohibitions": "[]",
										className: "text-right pr-6",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
							"data-uid": "src/pages/SentDocuments.tsx:131:13",
							"data-prohibitions": "[editContent]",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/SentDocuments.tsx:133:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/SentDocuments.tsx:134:19",
									"data-prohibitions": "[]",
									colSpan: 5,
									className: "h-32 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										"data-uid": "src/pages/SentDocuments.tsx:135:21",
										"data-prohibitions": "[editContent]",
										className: "h-6 w-6 animate-spin mx-auto text-primary"
									})
								})
							}) : filteredDocs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/SentDocuments.tsx:139:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/SentDocuments.tsx:140:19",
									"data-prohibitions": "[]",
									colSpan: 5,
									className: "h-32 text-center text-muted-foreground",
									children: "Nenhum documento encontrado."
								})
							}) : filteredDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/SentDocuments.tsx:146:19",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/SentDocuments.tsx:147:21",
										"data-prohibitions": "[editContent]",
										className: "font-medium pl-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/SentDocuments.tsx:148:23",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
												"data-uid": "src/pages/SentDocuments.tsx:149:25",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4 text-blue-600 shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/SentDocuments.tsx:150:25",
												"data-prohibitions": "[editContent]",
												className: "truncate max-w-[200px] sm:max-w-[300px]",
												title: doc.name,
												children: doc.name
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/SentDocuments.tsx:155:21",
										"data-prohibitions": "[editContent]",
										className: "truncate max-w-[150px] sm:max-w-[200px]",
										title: doc.properties?.title,
										children: doc.properties?.title || "N/A"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/SentDocuments.tsx:161:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/SentDocuments.tsx:162:23",
											"data-prohibitions": "[editContent]",
											variant: "outline",
											className: "bg-background",
											children: doc.category
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/SentDocuments.tsx:166:21",
										"data-prohibitions": "[editContent]",
										className: "text-muted-foreground whitespace-nowrap",
										children: format(new Date(doc.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/SentDocuments.tsx:169:21",
										"data-prohibitions": "[]",
										className: "text-right pr-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/SentDocuments.tsx:170:23",
											"data-prohibitions": "[]",
											size: "sm",
											variant: "ghost",
											onClick: () => handleView(doc),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
												"data-uid": "src/pages/SentDocuments.tsx:171:25",
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
				"data-uid": "src/pages/SentDocuments.tsx:182:7",
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

//# sourceMappingURL=SentDocuments-DDdiZS2N.js.map