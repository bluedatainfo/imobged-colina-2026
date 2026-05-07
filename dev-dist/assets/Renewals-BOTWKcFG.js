import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as RefreshCw } from "./refresh-cw-CO_X9Exu.js";
import { t as TriangleAlert } from "./triangle-alert-DdmQS07j.js";
import { t as Button } from "./button-DZFv31v6.js";
import "./client-DbPPqM1c.js";
import { i as useMainStore, r as mainStore } from "./main-DA0wiXaK.js";
import { i as contractsStore, n as keysStore, o as useContractsStore } from "./keys-DkDcgPTP.js";
import { lt as CalendarClock, t as Badge } from "./index-B544J2Nu.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DZXI3GJ_.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-D_NqDEL3.js";
var CircleX = createLucideIcon("circle-x", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]);
//#endregion
//#region src/pages/Renewals.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Renewals() {
	const { contracts } = useContractsStore();
	const { properties } = useMainStore();
	const { toast } = useToast();
	const expiringContracts = (0, import_react.useMemo)(() => {
		return contracts.filter((c) => c.status === "Ativo" || c.status === "Aguardando Renovação").map((c) => {
			const daysLeft = c.expirationDate ? Math.ceil((new Date(c.expirationDate).getTime() - Date.now()) / (1e3 * 60 * 60 * 24)) : 999;
			return {
				...c,
				daysLeft
			};
		}).filter((c) => c.daysLeft <= 90).sort((a, b) => a.daysLeft - b.daysLeft);
	}, [contracts]);
	const handleRenew = (id) => {
		contractsStore.extendExpiration(id, 365);
		contractsStore.updateStatus(id, "Ativo");
		toast({
			title: "Renovação Iniciada",
			description: "Contrato estendido e marcado como ativo."
		});
	};
	const handleTerminate = (contract) => {
		contractsStore.updateStatus(contract.id, "Rescisão em Andamento");
		mainStore.updatePropertyStatus(contract.propertyId, "Vistoria");
		const property = properties.find((p) => p.id === contract.propertyId);
		keysStore.addTask({
			contractId: contract.id,
			propertyId: contract.propertyId,
			tenantName: contract.tenantName,
			propertyAddress: property?.address || "Endereço Desconhecido",
			type: "Return"
		});
		mainStore.addAuditLog({
			propertyId: contract.propertyId,
			action: "Processo de Desocupação Iniciado",
			user: "Gestor",
			details: "Vistoria de saída e devolução de chaves agendadas."
		});
		toast({
			title: "Desocupação Iniciada",
			description: "Workflow de encerramento disparado. Verifique a vistoria e chaves."
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Renewals.tsx:70:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Renewals.tsx:71:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/Renewals.tsx:72:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight",
					children: "Dashboard de Renovações"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Renewals.tsx:73:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Monitore contratos a vencer nos próximos 30, 60 ou 90 dias e gerencie renovações ou desocupações."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Renewals.tsx:79:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Renewals.tsx:80:9",
					"data-prohibitions": "[editContent]",
					className: "bg-red-50/50 border-red-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Renewals.tsx:81:11",
						"data-prohibitions": "[editContent]",
						className: "p-5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Renewals.tsx:82:13",
							"data-prohibitions": "[]",
							className: "bg-red-100 p-3 rounded-full shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
								"data-uid": "src/pages/Renewals.tsx:83:15",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-6 text-red-600"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Renewals.tsx:85:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Renewals.tsx:86:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-red-800",
								children: "Vencendo em 30 dias"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Renewals.tsx:87:15",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-red-900",
								children: expiringContracts.filter((c) => c.daysLeft <= 30).length
							})]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Renewals.tsx:93:9",
					"data-prohibitions": "[editContent]",
					className: "bg-amber-50/50 border-amber-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Renewals.tsx:94:11",
						"data-prohibitions": "[editContent]",
						className: "p-5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Renewals.tsx:95:13",
							"data-prohibitions": "[]",
							className: "bg-amber-100 p-3 rounded-full shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {
								"data-uid": "src/pages/Renewals.tsx:96:15",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-6 text-amber-600"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Renewals.tsx:98:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Renewals.tsx:99:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-amber-800",
								children: "Vencendo em 60 dias"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Renewals.tsx:100:15",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-amber-900",
								children: expiringContracts.filter((c) => c.daysLeft > 30 && c.daysLeft <= 60).length
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Renewals.tsx:108:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/Renewals.tsx:109:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/Renewals.tsx:110:11",
						"data-prohibitions": "[]",
						children: "Contratos Próximos do Vencimento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/Renewals.tsx:111:11",
						"data-prohibitions": "[]",
						children: "Tome ações rápidas para garantir a receita ou liberar o imóvel."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/Renewals.tsx:115:9",
					"data-prohibitions": "[editContent]",
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/Renewals.tsx:116:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/Renewals.tsx:117:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Renewals.tsx:118:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Renewals.tsx:119:17",
										"data-prohibitions": "[]",
										children: "Contrato"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Renewals.tsx:120:17",
										"data-prohibitions": "[]",
										children: "Inquilino"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Renewals.tsx:121:17",
										"data-prohibitions": "[]",
										children: "Vencimento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Renewals.tsx:122:17",
										"data-prohibitions": "[]",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Renewals.tsx:123:17",
										"data-prohibitions": "[]",
										className: "text-right",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/pages/Renewals.tsx:126:13",
							"data-prohibitions": "[editContent]",
							children: [expiringContracts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Renewals.tsx:128:17",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Renewals.tsx:129:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: c.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Renewals.tsx:130:19",
										"data-prohibitions": "[editContent]",
										children: c.tenantName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Renewals.tsx:131:19",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Renewals.tsx:132:21",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Renewals.tsx:133:23",
												"data-prohibitions": "[editContent]",
												children: new Date(c.expirationDate).toLocaleDateString("pt-BR")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/pages/Renewals.tsx:134:23",
												"data-prohibitions": "[editContent]",
												variant: c.daysLeft <= 30 ? "destructive" : "secondary",
												children: [c.daysLeft, " dias"]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Renewals.tsx:139:19",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/Renewals.tsx:140:21",
											"data-prohibitions": "[editContent]",
											variant: "outline",
											children: c.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										"data-uid": "src/pages/Renewals.tsx:142:19",
										"data-prohibitions": "[]",
										className: "text-right space-x-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/Renewals.tsx:143:21",
											"data-prohibitions": "[]",
											size: "sm",
											variant: "outline",
											className: "text-emerald-600 hover:text-emerald-700",
											onClick: () => handleRenew(c.id),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
												"data-uid": "src/pages/Renewals.tsx:149:23",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 mr-1"
											}), " Renovar"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/Renewals.tsx:151:21",
											"data-prohibitions": "[]",
											size: "sm",
											variant: "outline",
											className: "text-red-600 hover:text-red-700",
											onClick: () => handleTerminate(c),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
												"data-uid": "src/pages/Renewals.tsx:157:23",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 mr-1"
											}), " Desocupar"]
										})]
									})
								]
							}, c.id)), expiringContracts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/Renewals.tsx:163:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/Renewals.tsx:164:19",
									"data-prohibitions": "[]",
									colSpan: 5,
									className: "text-center py-8 text-muted-foreground",
									children: "Nenhum contrato vencendo nos próximos 90 dias."
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
export { Renewals as default };

//# sourceMappingURL=Renewals-BOTWKcFG.js.map