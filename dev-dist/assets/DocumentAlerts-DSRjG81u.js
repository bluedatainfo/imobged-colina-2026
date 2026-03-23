import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as ArrowRight } from "./arrow-right-5lAqrHp-.js";
import { t as Button } from "./button-DI75GKXN.js";
import "./client-CRWdr5I6.js";
import { i as useMainStore } from "./main-fLnrbiCL.js";
import { at as useNavigate, r as Badge, tt as BellRing } from "./index-7j-GQ-ZV.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-C664G4yu.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-7Oxb06M7.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-D3HL4T3P.js";
var CalendarX2 = createLucideIcon("calendar-x-2", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["path", {
		d: "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8",
		key: "3spt84"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}],
	["path", {
		d: "m17 22 5-5",
		key: "1k6ppv"
	}],
	["path", {
		d: "m17 17 5 5",
		key: "p7ous7"
	}]
]);
var FileExclamationPoint = createLucideIcon("file-exclamation-point", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
//#endregion
//#region src/stores/documents.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var today = /* @__PURE__ */ new Date();
var addDays = (days) => new Date(today.getTime() + days * 24 * 60 * 60 * 1e3).toISOString();
var state = { documents: [
	{
		id: "d1",
		propertyId: "101",
		name: "Matricula_Atualizada_Imovel.pdf",
		category: "Documentos do Proprietário",
		uploadDate: addDays(-100),
		expirationDate: addDays(45)
	},
	{
		id: "d2",
		propertyId: "101",
		name: "RG_CPF_Proprietario.pdf",
		category: "Documentos do Proprietário",
		uploadDate: addDays(-100)
	},
	{
		id: "d3",
		propertyId: "101",
		name: "CNH_Inquilino_Joao.pdf",
		category: "Documentos do Inquilino",
		uploadDate: addDays(-365),
		expirationDate: addDays(-5)
	},
	{
		id: "d4",
		propertyId: "101",
		name: "Apolice_Seguro_Fianca.pdf",
		category: "Garantias",
		uploadDate: addDays(-300),
		expirationDate: addDays(15)
	},
	{
		id: "d5",
		propertyId: "103",
		name: "Procuracao_Publica.pdf",
		category: "Documentos Legais",
		uploadDate: addDays(-150),
		expirationDate: addDays(-12)
	},
	{
		id: "d6",
		propertyId: "103",
		name: "Comprovante_Renda.pdf",
		category: "Documentos do Inquilino",
		uploadDate: addDays(-150)
	},
	{
		id: "d7",
		propertyId: "104",
		name: "Alvara_Bombeiros.pdf",
		category: "Documentos Comerciais",
		uploadDate: addDays(-350),
		expirationDate: addDays(20)
	},
	{
		id: "d8",
		propertyId: "104",
		name: "Contrato_Social_Empresa.pdf",
		category: "Documentos do Inquilino",
		uploadDate: addDays(-350)
	}
] };
var listeners = [];
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
	}
};
function useDocumentsStore() {
	return (0, import_react.useSyncExternalStore)(documentsStore.subscribe, documentsStore.getState);
}
//#endregion
//#region src/pages/DocumentAlerts.tsx
var import_jsx_runtime = require_jsx_runtime();
function DocumentAlerts() {
	const navigate = useNavigate();
	const { documents } = useDocumentsStore();
	const { properties } = useMainStore();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const alerts = (0, import_react.useMemo)(() => {
		return documents.map((doc) => {
			const status = getDocumentStatus(doc.expirationDate);
			const property = properties.find((p) => p.id === doc.propertyId);
			return {
				...doc,
				status,
				property
			};
		}).filter((doc) => doc.status === "Expirado" || doc.status === "Vencendo em breve").sort((a, b) => {
			if (!a.expirationDate) return 1;
			if (!b.expirationDate) return -1;
			return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
		});
	}, [documents, properties]);
	const filteredAlerts = (0, import_react.useMemo)(() => {
		if (filter === "expired") return alerts.filter((a) => a.status === "Expirado");
		if (filter === "expiring") return alerts.filter((a) => a.status === "Vencendo em breve");
		return alerts;
	}, [alerts, filter]);
	const getStatusBadge = (status) => {
		if (status === "Vencendo em breve") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			"data-uid": "src/pages/DocumentAlerts.tsx:50:9",
			"data-prohibitions": "[]",
			className: "bg-amber-500 hover:bg-amber-600 text-white border-transparent",
			children: "Vencendo em breve"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			"data-uid": "src/pages/DocumentAlerts.tsx:55:12",
			"data-prohibitions": "[]",
			variant: "destructive",
			children: "Expirado"
		});
	};
	const expiredCount = alerts.filter((a) => a.status === "Expirado").length;
	const expiringCount = alerts.filter((a) => a.status === "Vencendo em breve").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/DocumentAlerts.tsx:62:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/DocumentAlerts.tsx:63:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/DocumentAlerts.tsx:64:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						"data-uid": "src/pages/DocumentAlerts.tsx:65:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, {
							"data-uid": "src/pages/DocumentAlerts.tsx:66:13",
							"data-prohibitions": "[editContent]",
							className: "w-8 h-8 text-primary"
						}), " Alertas de Documentos"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/DocumentAlerts.tsx:68:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground mt-1",
						children: "Central de notificações para documentos expirados ou com vencimento próximo integrados via SharePoint."
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/DocumentAlerts.tsx:75:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/DocumentAlerts.tsx:76:9",
					"data-prohibitions": "[editContent]",
					className: "bg-red-50/50 border-red-100 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/DocumentAlerts.tsx:77:11",
						"data-prohibitions": "[editContent]",
						className: "p-5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/DocumentAlerts.tsx:78:13",
							"data-prohibitions": "[]",
							className: "bg-red-100 p-3 rounded-full shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarX2, {
								"data-uid": "src/pages/DocumentAlerts.tsx:79:15",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-6 text-red-600"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/DocumentAlerts.tsx:81:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/DocumentAlerts.tsx:82:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-red-800",
								children: "Documentos Expirados"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/DocumentAlerts.tsx:83:15",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-red-900 mt-1",
								children: [expiredCount, " Pendências"]
							})]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/DocumentAlerts.tsx:87:9",
					"data-prohibitions": "[editContent]",
					className: "bg-amber-50/50 border-amber-100 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/DocumentAlerts.tsx:88:11",
						"data-prohibitions": "[editContent]",
						className: "p-5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/DocumentAlerts.tsx:89:13",
							"data-prohibitions": "[]",
							className: "bg-amber-100 p-3 rounded-full shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, {
								"data-uid": "src/pages/DocumentAlerts.tsx:90:15",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-6 text-amber-600"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/DocumentAlerts.tsx:92:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/DocumentAlerts.tsx:93:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-amber-800",
								children: "Vencendo em até 30 dias"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/DocumentAlerts.tsx:94:15",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-amber-900 mt-1",
								children: [expiringCount, " Documentos"]
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/DocumentAlerts.tsx:100:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/DocumentAlerts.tsx:101:9",
					"data-prohibitions": "[editContent]",
					className: "pb-3 border-b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/DocumentAlerts.tsx:102:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/DocumentAlerts.tsx:103:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/DocumentAlerts.tsx:104:15",
								"data-prohibitions": "[]",
								children: "Lista de Acompanhamento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/DocumentAlerts.tsx:105:15",
								"data-prohibitions": "[]",
								children: "Ações necessárias para regularizar a documentação dos imóveis."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
							"data-uid": "src/pages/DocumentAlerts.tsx:109:13",
							"data-prohibitions": "[editContent]",
							value: filter,
							onValueChange: (val) => setFilter(val),
							className: "w-full sm:w-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								"data-uid": "src/pages/DocumentAlerts.tsx:114:15",
								"data-prohibitions": "[editContent]",
								className: "grid w-full grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										"data-uid": "src/pages/DocumentAlerts.tsx:115:17",
										"data-prohibitions": "[editContent]",
										value: "all",
										children: [
											"Todos (",
											alerts.length,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										"data-uid": "src/pages/DocumentAlerts.tsx:116:17",
										"data-prohibitions": "[]",
										value: "expired",
										className: "text-red-600 data-[state=active]:text-red-700",
										children: "Expirados"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										"data-uid": "src/pages/DocumentAlerts.tsx:122:17",
										"data-prohibitions": "[]",
										value: "expiring",
										className: "text-amber-600 data-[state=active]:text-amber-700",
										children: "Próximos"
									})
								]
							})
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/DocumentAlerts.tsx:132:9",
					"data-prohibitions": "[editContent]",
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/DocumentAlerts.tsx:133:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/DocumentAlerts.tsx:134:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/DocumentAlerts.tsx:135:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/DocumentAlerts.tsx:136:17",
										"data-prohibitions": "[]",
										children: "Documento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/DocumentAlerts.tsx:137:17",
										"data-prohibitions": "[]",
										children: "Imóvel Relacionado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/DocumentAlerts.tsx:138:17",
										"data-prohibitions": "[]",
										children: "Vencimento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/DocumentAlerts.tsx:139:17",
										"data-prohibitions": "[]",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/DocumentAlerts.tsx:140:17",
										"data-prohibitions": "[]",
										className: "text-right",
										children: "Ação"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/pages/DocumentAlerts.tsx:143:13",
							"data-prohibitions": "[editContent]",
							children: [filteredAlerts.map((alert) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/DocumentAlerts.tsx:145:17",
								"data-prohibitions": "[editContent]",
								className: "hover:bg-muted/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										"data-uid": "src/pages/DocumentAlerts.tsx:146:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/DocumentAlerts.tsx:147:21",
											"data-prohibitions": "[editContent]",
											className: "font-medium text-sm",
											children: alert.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/DocumentAlerts.tsx:148:21",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground",
											children: alert.category
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/DocumentAlerts.tsx:150:19",
										"data-prohibitions": "[editContent]",
										children: alert.property ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/DocumentAlerts.tsx:152:23",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/DocumentAlerts.tsx:153:25",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm",
												children: alert.property.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/DocumentAlerts.tsx:154:25",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground",
												children: alert.property.address
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/DocumentAlerts.tsx:157:23",
											"data-prohibitions": "[]",
											className: "text-muted-foreground",
											children: "Referência não encontrada"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/DocumentAlerts.tsx:160:19",
										"data-prohibitions": "[editContent]",
										className: "whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/DocumentAlerts.tsx:161:21",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: alert.expirationDate ? new Date(alert.expirationDate).toLocaleDateString("pt-BR") : "-"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/DocumentAlerts.tsx:167:19",
										"data-prohibitions": "[editContent]",
										children: getStatusBadge(alert.status)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/DocumentAlerts.tsx:168:19",
										"data-prohibitions": "[]",
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/DocumentAlerts.tsx:169:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "sm",
											onClick: () => navigate(`/properties/${alert.propertyId}/dossier`),
											className: "text-primary hover:text-primary hover:bg-primary/10",
											children: ["Ir para Dossiê ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
												"data-uid": "src/pages/DocumentAlerts.tsx:175:38",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 ml-2"
											})]
										})
									})
								]
							}, alert.id)), filteredAlerts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/DocumentAlerts.tsx:181:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/pages/DocumentAlerts.tsx:182:19",
									"data-prohibitions": "[]",
									colSpan: 5,
									className: "h-32 text-center text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, {
										"data-uid": "src/pages/DocumentAlerts.tsx:183:21",
										"data-prohibitions": "[editContent]",
										className: "w-8 h-8 mx-auto mb-2 opacity-20"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/DocumentAlerts.tsx:184:21",
										"data-prohibitions": "[]",
										children: "Nenhum alerta de documento com este filtro."
									})]
								})
							})]
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { DocumentAlerts as default };

//# sourceMappingURL=DocumentAlerts-DSRjG81u.js.map