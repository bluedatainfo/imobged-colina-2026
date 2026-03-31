import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as CircleAlert } from "./circle-alert-tq6C5WFm.js";
import { t as CircleCheck } from "./circle-check-wj6pmJkc.js";
import "./client-CX_7U15l.js";
import { i as useMainStore } from "./main-BTmGmLbt.js";
import { ot as Clock, pt as Activity, t as Badge } from "./index-Dn8ua1hW.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CcQxuH73.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CV-6f29o.js";
//#region src/pages/SyncMonitor.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function SyncMonitor() {
	const { auditLogs } = useMainStore();
	const syncLogs = (0, import_react.useMemo)(() => {
		return auditLogs.filter((log) => log.action.includes("SHAREPOINT_UPLOAD"));
	}, [auditLogs]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/SyncMonitor.tsx:23:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 max-w-6xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/SyncMonitor.tsx:24:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				"data-uid": "src/pages/SyncMonitor.tsx:25:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
					"data-uid": "src/pages/SyncMonitor.tsx:26:11",
					"data-prohibitions": "[editContent]",
					className: "w-8 h-8 text-primary"
				}), "Monitor de Sincronização M365"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/SyncMonitor.tsx:29:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "Acompanhe em tempo real o status dos uploads e integrações de documentos no SharePoint."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/SyncMonitor.tsx:34:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				"data-uid": "src/pages/SyncMonitor.tsx:35:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					"data-uid": "src/pages/SyncMonitor.tsx:36:11",
					"data-prohibitions": "[]",
					children: "Histórico de Transações"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					"data-uid": "src/pages/SyncMonitor.tsx:37:11",
					"data-prohibitions": "[]",
					children: "Logs recentes de comunicação com a Graph API."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/pages/SyncMonitor.tsx:39:9",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/SyncMonitor.tsx:40:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-md border overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/SyncMonitor.tsx:41:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/SyncMonitor.tsx:42:15",
							"data-prohibitions": "[]",
							className: "bg-muted/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/SyncMonitor.tsx:43:17",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SyncMonitor.tsx:44:19",
										"data-prohibitions": "[]",
										className: "w-[180px]",
										children: "Data / Hora"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SyncMonitor.tsx:45:19",
										"data-prohibitions": "[]",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SyncMonitor.tsx:46:19",
										"data-prohibitions": "[]",
										children: "Usuário"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/SyncMonitor.tsx:47:19",
										"data-prohibitions": "[]",
										children: "Detalhes da Operação"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/pages/SyncMonitor.tsx:50:15",
							"data-prohibitions": "[editContent]",
							children: [syncLogs.map((log) => {
								const isError = log.action === "SHAREPOINT_UPLOAD_ERROR";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									"data-uid": "src/pages/SyncMonitor.tsx:54:21",
									"data-prohibitions": "[editContent]",
									className: "group hover:bg-muted/50 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
											"data-uid": "src/pages/SyncMonitor.tsx:55:23",
											"data-prohibitions": "[editContent]",
											className: "text-sm font-medium flex items-center gap-2 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
												"data-uid": "src/pages/SyncMonitor.tsx:56:25",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 shrink-0"
											}), new Date(log.timestamp).toLocaleString()]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/SyncMonitor.tsx:59:23",
											"data-prohibitions": "[editContent]",
											children: isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/pages/SyncMonitor.tsx:61:27",
												"data-prohibitions": "[]",
												variant: "destructive",
												className: "flex w-fit items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
													"data-uid": "src/pages/SyncMonitor.tsx:62:29",
													"data-prohibitions": "[editContent]",
													className: "w-3 h-3"
												}), " Falha"]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/pages/SyncMonitor.tsx:65:27",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "text-emerald-600 border-emerald-200 bg-emerald-50 flex w-fit items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
													"data-uid": "src/pages/SyncMonitor.tsx:69:29",
													"data-prohibitions": "[editContent]",
													className: "w-3 h-3"
												}), " Sucesso"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/SyncMonitor.tsx:73:23",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: log.user
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/SyncMonitor.tsx:74:23",
											"data-prohibitions": "[editContent]",
											className: "text-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/SyncMonitor.tsx:75:25",
												"data-prohibitions": "[editContent]",
												className: isError ? "text-destructive" : "",
												children: log.details
											})
										})
									]
								}, log.id);
							}), syncLogs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/SyncMonitor.tsx:81:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/pages/SyncMonitor.tsx:82:21",
									"data-prohibitions": "[]",
									colSpan: 4,
									className: "text-center py-12 text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
										"data-uid": "src/pages/SyncMonitor.tsx:83:23",
										"data-prohibitions": "[editContent]",
										className: "w-12 h-12 mx-auto mb-3 opacity-20"
									}), "Nenhum registro de sincronização encontrado."]
								})
							})]
						})]
					})
				})
			})]
		})]
	});
}
//#endregion
export { SyncMonitor as default };

//# sourceMappingURL=SyncMonitor-Ce5xgeMN.js.map