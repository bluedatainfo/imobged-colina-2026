import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-BcW3sjWS.js";
import { t as CircleCheckBig } from "./circle-check-big-ZvHRawjc.js";
import { t as Eye } from "./eye-BfGiJr9u.js";
import { t as DocumentViewer } from "./DocumentViewer-DYJrbzYT.js";
import { t as Button } from "./button-DZFv31v6.js";
import "./client-DbPPqM1c.js";
import { r as mainStore } from "./main-DA0wiXaK.js";
import "./users-JyPvLL0D.js";
import { i as contractsStore, n as keysStore, r as useKeysStore } from "./keys-DkDcgPTP.js";
import "./entities-pTkigeh5.js";
import { $ as KeyRound, at as FilePenLine, et as House, j as Input, q as Search, t as Badge } from "./index-CzeD5xgV.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DZXI3GJ_.js";
import "./label-CZKY3LJi.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-D_NqDEL3.js";
import "./dialog-D3m8nwox.js";
import "./m365-CdBCqFdo.js";
import "./textarea-D3lWDJFw.js";
//#region src/pages/KeysControl.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function KeysControl() {
	const { tasks } = useKeysStore();
	const { toast } = useToast();
	const [search, setSearch] = (0, import_react.useState)("");
	const [viewTerm, setViewTerm] = (0, import_react.useState)(null);
	const filteredTasks = tasks.filter((t) => t.tenantName.toLowerCase().includes(search.toLowerCase()) || t.propertyAddress.toLowerCase().includes(search.toLowerCase()));
	const handleSignTerm = (task) => {
		keysStore.updateTaskStatus(task.id, "Signed");
		if (task.type === "Return") {
			mainStore.updatePropertyStatus(task.propertyId, "Disponível para Locação");
			contractsStore.updateStatus(task.contractId, "Rescindido");
			mainStore.addAuditLog({
				propertyId: task.propertyId,
				action: "Imóvel Disponibilizado",
				user: "Controle de Chaves",
				details: "Chaves devolvidas e contrato rescindido."
			});
			toast({
				title: "Chaves Devolvidas",
				description: "Imóvel agora está Disponível para Locação."
			});
		} else toast({
			title: "Chaves Entregues",
			description: "Termo assinado e arquivado no SharePoint."
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/KeysControl.tsx:56:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/KeysControl.tsx:57:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/KeysControl.tsx:58:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight",
					children: "Controle de Chaves"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/KeysControl.tsx:59:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Gestão de entrega e devolução de chaves, com geração de termos digitais."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/KeysControl.tsx:64:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/KeysControl.tsx:65:9",
					"data-prohibitions": "[]",
					className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/KeysControl.tsx:66:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							"data-uid": "src/pages/KeysControl.tsx:67:13",
							"data-prohibitions": "[]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
								"data-uid": "src/pages/KeysControl.tsx:68:15",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-primary"
							}), " Fila de Chaves"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							"data-uid": "src/pages/KeysControl.tsx:70:13",
							"data-prohibitions": "[]",
							children: "Termos pendentes para assinatura (Entrega ou Devolução)."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/KeysControl.tsx:74:11",
						"data-prohibitions": "[]",
						className: "relative w-full sm:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-uid": "src/pages/KeysControl.tsx:75:13",
							"data-prohibitions": "[editContent]",
							className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/KeysControl.tsx:76:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Buscar inquilino ou endereço...",
							className: "pl-8",
							value: search,
							onChange: (e) => setSearch(e.target.value)
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/KeysControl.tsx:84:9",
					"data-prohibitions": "[editContent]",
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/KeysControl.tsx:85:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/KeysControl.tsx:86:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/KeysControl.tsx:87:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/KeysControl.tsx:88:17",
										"data-prohibitions": "[]",
										children: "Protocolo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/KeysControl.tsx:89:17",
										"data-prohibitions": "[]",
										children: "Imóvel"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/KeysControl.tsx:90:17",
										"data-prohibitions": "[]",
										children: "Inquilino"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/KeysControl.tsx:91:17",
										"data-prohibitions": "[]",
										children: "Tipo de Movimento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/KeysControl.tsx:92:17",
										"data-prohibitions": "[]",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/KeysControl.tsx:93:17",
										"data-prohibitions": "[]",
										className: "text-right",
										children: "Ação"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/pages/KeysControl.tsx:96:13",
							"data-prohibitions": "[editContent]",
							children: [filteredTasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/KeysControl.tsx:98:17",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/KeysControl.tsx:99:19",
										"data-prohibitions": "[editContent]",
										className: "font-mono text-xs",
										children: t.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/KeysControl.tsx:100:19",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/KeysControl.tsx:101:21",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2 font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
												"data-uid": "src/pages/KeysControl.tsx:102:23",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											}), t.propertyAddress]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/KeysControl.tsx:106:19",
										"data-prohibitions": "[editContent]",
										children: t.tenantName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/KeysControl.tsx:107:19",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/KeysControl.tsx:108:21",
											"data-prohibitions": "[editContent]",
											variant: t.type === "Delivery" ? "default" : "destructive",
											className: "bg-opacity-10 text-current border-none",
											children: t.type === "Delivery" ? "Entrega de Chaves" : "Devolução de Chaves"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/KeysControl.tsx:115:19",
										"data-prohibitions": "[editContent]",
										children: t.status === "Signed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/KeysControl.tsx:117:23",
											"data-prohibitions": "[]",
											className: "flex items-center text-sm text-emerald-600",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
												"data-uid": "src/pages/KeysControl.tsx:118:25",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 mr-1"
											}), " Assinado"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/KeysControl.tsx:121:23",
											"data-prohibitions": "[]",
											className: "text-sm text-amber-600",
											children: "Pendente"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										"data-uid": "src/pages/KeysControl.tsx:124:19",
										"data-prohibitions": "[editContent]",
										className: "text-right space-x-2",
										children: [t.status === "Signed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/KeysControl.tsx:126:23",
											"data-prohibitions": "[]",
											size: "sm",
											variant: "ghost",
											onClick: () => setViewTerm(`Termo_${t.id}.pdf`),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
												"data-uid": "src/pages/KeysControl.tsx:131:25",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 mr-1"
											}), " Ver Termo"]
										}), t.status === "Pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/KeysControl.tsx:135:23",
											"data-prohibitions": "[]",
											size: "sm",
											onClick: () => handleSignTerm(t),
											className: "gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, {
												"data-uid": "src/pages/KeysControl.tsx:136:25",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4"
											}), " Assinar"]
										})]
									})
								]
							}, t.id)), filteredTasks.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/KeysControl.tsx:143:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/KeysControl.tsx:144:19",
									"data-prohibitions": "[]",
									colSpan: 6,
									className: "text-center py-8 text-muted-foreground",
									children: "Nenhuma tarefa de chaves encontrada."
								})
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewer, {
				"data-uid": "src/pages/KeysControl.tsx:154:7",
				"data-prohibitions": "[editContent]",
				open: !!viewTerm,
				onClose: () => setViewTerm(null),
				docName: viewTerm,
				isTerm: true
			})
		]
	});
}
//#endregion
export { KeysControl as default };

//# sourceMappingURL=KeysControl-D9ZCvtmH.js.map