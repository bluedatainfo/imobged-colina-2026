import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as ArrowRight } from "./arrow-right-5lAqrHp-.js";
import { t as RefreshCw } from "./refresh-cw-CO_X9Exu.js";
import { t as ShieldAlert } from "./shield-alert-DesnHnNH.js";
import "./client-DbPPqM1c.js";
import { i as useMainStore, n as isSlaBreached } from "./main-DA0wiXaK.js";
import "./users-JyPvLL0D.js";
import { o as useContractsStore } from "./keys-DkDcgPTP.js";
import { n as useEntitiesStore } from "./entities-pTkigeh5.js";
import { H as User, Z as List, at as FilePenLine, g as useAuth, gt as useNavigate, h as checkAccess, j as Input, mt as Link, q as Search, rt as FileText, t as Badge, ut as Building } from "./index-6I5rqLuQ.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DZXI3GJ_.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-D_NqDEL3.js";
import { S as Cell, g as Pie, i as PieChart, n as ChartTooltip, r as ChartTooltipContent, t as ChartContainer } from "./chart-Db9abAw3.js";
var FileStack = createLucideIcon("file-stack", [
	["path", {
		d: "M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1",
		key: "likhh7"
	}],
	["path", {
		d: "M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1",
		key: "17ky3x"
	}],
	["path", {
		d: "M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z",
		key: "1hyeo0"
	}]
]);
//#endregion
//#region src/components/DashboardChart.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var chartData = [
	{
		name: "Ativos",
		value: 320,
		fill: "var(--color-active)"
	},
	{
		name: "Em Andamento",
		value: 85,
		fill: "var(--color-progress)"
	},
	{
		name: "Assinatura",
		value: 45,
		fill: "var(--color-signature)"
	},
	{
		name: "Renovação",
		value: 25,
		fill: "var(--color-renewal)"
	}
];
var chartConfig = {
	active: {
		label: "Ativos",
		color: "hsl(var(--chart-2))"
	},
	progress: {
		label: "Em Andamento",
		color: "hsl(var(--chart-1))"
	},
	signature: {
		label: "Assinatura",
		color: "hsl(var(--chart-3))"
	},
	renewal: {
		label: "Renovação",
		color: "hsl(var(--chart-4))"
	}
};
function DashboardChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/DashboardChart.tsx:21:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/components/DashboardChart.tsx:22:7",
			"data-prohibitions": "[]",
			className: "items-center pb-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				"data-uid": "src/components/DashboardChart.tsx:23:9",
				"data-prohibitions": "[]",
				children: "Distribuição de Contratos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
				"data-uid": "src/components/DashboardChart.tsx:24:9",
				"data-prohibitions": "[]",
				children: "Volume de contratos no SharePoint por estágio"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			"data-uid": "src/components/DashboardChart.tsx:26:7",
			"data-prohibitions": "[editContent]",
			className: "flex-1 pb-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
				"data-uid": "src/components/DashboardChart.tsx:27:9",
				"data-prohibitions": "[editContent]",
				config: chartConfig,
				className: "mx-auto aspect-square max-h-[280px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, {
					"data-uid": "src/components/DashboardChart.tsx:28:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
						"data-uid": "src/components/DashboardChart.tsx:29:13",
						"data-prohibitions": "[editContent]",
						cursor: false,
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
							"data-uid": "src/components/DashboardChart.tsx:29:51",
							"data-prohibitions": "[editContent]",
							hideLabel: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
						"data-uid": "src/components/DashboardChart.tsx:30:13",
						"data-prohibitions": "[editContent]",
						data: chartData,
						dataKey: "value",
						nameKey: "name",
						innerRadius: 60,
						outerRadius: 80,
						strokeWidth: 2,
						stroke: "hsl(var(--background))",
						children: chartData.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
							"data-uid": "src/components/DashboardChart.tsx:40:17",
							"data-prohibitions": "[editContent]",
							fill: entry.fill
						}, `cell-${index}`))
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/DashboardChart.tsx:45:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-2 gap-2 mt-4 text-sm text-center mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DashboardChart.tsx:46:11",
					"data-prohibitions": "[editContent]",
					className: "bg-emerald-50 text-emerald-700 p-2 rounded-md font-medium border border-emerald-100",
					children: [chartData[0].value, " Ativos"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DashboardChart.tsx:49:11",
					"data-prohibitions": "[editContent]",
					className: "bg-blue-50 text-blue-700 p-2 rounded-md font-medium border border-blue-100",
					children: [chartData[1].value, " Workflow"]
				})]
			})]
		})]
	});
}
//#endregion
//#region src/pages/Index.tsx
var Index = () => {
	const navigate = useNavigate();
	const store = useMainStore();
	const { contracts } = useContractsStore();
	const { owners, tenants } = useEntitiesStore();
	const { user } = useAuth();
	const [globalSearch, setGlobalSearch] = (0, import_react.useState)("");
	const slaBreachedCount = store.properties.filter((p) => p.status === "Análise Gerencial").filter((p) => isSlaBreached(p.slaStart, store.settings.slaHours)).length;
	const activeContracts = contracts.filter((c) => c.status === "Ativo").length;
	const awaitingSignature = contracts.filter((c) => c.status === "Aguardando Assinatura").length;
	const awaitingRenewal = contracts.filter((c) => c.status === "Aguardando Renovação").length;
	const recentLogs = store.auditLogs.slice(0, 5);
	const canSeeDashboard = checkAccess("/settings", user?.role) || user?.role === "Gerente";
	const searchResults = globalSearch.length > 2 ? [
		...store.properties.filter((p) => p.title.toLowerCase().includes(globalSearch.toLowerCase()) || p.address.toLowerCase().includes(globalSearch.toLowerCase()) || p.id.toLowerCase().includes(globalSearch.toLowerCase())).map((p) => ({
			id: p.id,
			type: "Imóvel",
			name: p.title,
			desc: p.address,
			url: `/properties/${p.id}/dossier`,
			icon: Building
		})),
		...owners.filter((o) => o.fullName.toLowerCase().includes(globalSearch.toLowerCase()) || o.cpf.includes(globalSearch)).map((o) => ({
			id: o.id,
			type: "Proprietário",
			name: o.fullName,
			desc: `CPF: ${o.cpf || "N/A"}`,
			url: `/entities`,
			icon: User
		})),
		...tenants.filter((t) => t.fullName.toLowerCase().includes(globalSearch.toLowerCase()) || t.cpf.includes(globalSearch)).map((t) => ({
			id: t.id,
			type: "Locatário",
			name: t.fullName,
			desc: `CPF: ${t.cpf || "N/A"}`,
			url: `/entities`,
			icon: User
		}))
	].slice(0, 6) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Index.tsx:106:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Index.tsx:107:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Index.tsx:108:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Index.tsx:109:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Painel de Controle"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Index.tsx:110:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Visão geral da sua operação digital e integrações ERP/Microsoft 365."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Index.tsx:115:9",
					"data-prohibitions": "[editContent]",
					className: "relative w-full md:w-96",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-uid": "src/pages/Index.tsx:116:11",
							"data-prohibitions": "[editContent]",
							className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Index.tsx:117:11",
							"data-prohibitions": "[editContent]",
							placeholder: "Busca global de imóveis, proprietários...",
							className: "pl-9 bg-background/50 backdrop-blur-sm",
							value: globalSearch,
							onChange: (e) => setGlobalSearch(e.target.value)
						}),
						searchResults.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Index.tsx:124:13",
							"data-prohibitions": "[editContent]",
							className: "absolute top-12 left-0 right-0 bg-background border rounded-md shadow-lg z-50 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:125:15",
								"data-prohibitions": "[]",
								className: "p-2 bg-muted/30 text-xs font-medium text-muted-foreground border-b",
								children: "Resultados da Integração ERP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								"data-uid": "src/pages/Index.tsx:128:15",
								"data-prohibitions": "[editContent]",
								className: "max-h-80 overflow-y-auto",
								children: searchResults.map((res, i) => {
									const Icon = res.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-uid": "src/pages/Index.tsx:132:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											"data-uid": "src/pages/Index.tsx:133:23",
											"data-prohibitions": "[editContent]",
											to: res.url,
											className: "flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors border-b last:border-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													"data-uid": "src/pages/Index.tsx:137:25",
													"data-prohibitions": "[]",
													className: "mt-0.5 bg-primary/10 p-1.5 rounded-md",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
														"data-uid": "src/pages/Index.tsx:138:27",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4 text-primary"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/Index.tsx:140:25",
													"data-prohibitions": "[editContent]",
													className: "flex-1 overflow-hidden",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/Index.tsx:141:27",
														"data-prohibitions": "[editContent]",
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/Index.tsx:142:29",
															"data-prohibitions": "[editContent]",
															className: "font-medium text-sm truncate",
															children: res.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															"data-uid": "src/pages/Index.tsx:143:29",
															"data-prohibitions": "[editContent]",
															variant: "secondary",
															className: "text-[10px] h-4 px-1",
															children: res.type
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														"data-uid": "src/pages/Index.tsx:147:27",
														"data-prohibitions": "[editContent]",
														className: "text-xs text-muted-foreground truncate",
														children: res.desc
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
													"data-uid": "src/pages/Index.tsx:149:25",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 text-muted-foreground self-center"
												})
											]
										})
									}, `${res.id}-${i}`);
								})
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Index.tsx:160:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:161:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:162:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:163:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Contratos Ativos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								"data-uid": "src/pages/Index.tsx:164:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-emerald-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:166:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:167:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-emerald-600",
								children: activeContracts
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:171:9",
						"data-prohibitions": "[editContent]",
						className: awaitingRenewal > 0 ? "border-orange-200 bg-orange-50/50" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:172:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:173:13",
								"data-prohibitions": "[editContent]",
								className: `text-sm font-medium ${awaitingRenewal > 0 ? "text-orange-700" : ""}`,
								children: "Renovações Pendentes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								"data-uid": "src/pages/Index.tsx:178:13",
								"data-prohibitions": "[editContent]",
								className: `h-4 w-4 ${awaitingRenewal > 0 ? "text-orange-600" : "text-muted-foreground"}`
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:182:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:183:13",
								"data-prohibitions": "[editContent]",
								className: `text-2xl font-bold ${awaitingRenewal > 0 ? "text-orange-700" : ""}`,
								children: awaitingRenewal
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:189:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:190:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:191:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Em Assinatura"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileStack, {
								"data-uid": "src/pages/Index.tsx:192:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-purple-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:194:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:195:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-purple-600",
								children: awaitingSignature
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:199:9",
						"data-prohibitions": "[editContent]",
						className: slaBreachedCount > 0 ? "border-destructive/50 bg-destructive/5" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:200:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:201:13",
								"data-prohibitions": "[editContent]",
								className: `text-sm font-medium ${slaBreachedCount > 0 ? "text-destructive" : ""}`,
								children: "SLA Violado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
								"data-uid": "src/pages/Index.tsx:206:13",
								"data-prohibitions": "[editContent]",
								className: `h-4 w-4 ${slaBreachedCount > 0 ? "text-destructive" : "text-muted-foreground"}`
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:210:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:211:13",
								"data-prohibitions": "[editContent]",
								className: `text-2xl font-bold ${slaBreachedCount > 0 ? "text-destructive" : ""}`,
								children: slaBreachedCount
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Index.tsx:218:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Index.tsx:219:9",
					"data-prohibitions": "[editContent]",
					className: "lg:col-span-4 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Index.tsx:220:11",
						"data-prohibitions": "[editContent]",
						className: "grid gap-4 md:grid-cols-2",
						children: [checkAccess("/contracts", user?.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/Index.tsx:222:15",
							"data-prohibitions": "[]",
							className: "hover:border-primary/50 cursor-pointer transition-colors",
							onClick: () => navigate("/contracts"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/Index.tsx:226:17",
								"data-prohibitions": "[]",
								className: "pb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, {
										"data-uid": "src/pages/Index.tsx:227:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-8 text-primary mb-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/Index.tsx:228:19",
										"data-prohibitions": "[]",
										children: "Ciclo de Contratos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
										"data-uid": "src/pages/Index.tsx:229:19",
										"data-prohibitions": "[]",
										children: "Gerar minutas via templates e acompanhar workflow."
									})
								]
							})
						}), checkAccess("/inspections", user?.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/Index.tsx:236:15",
							"data-prohibitions": "[]",
							className: "hover:border-primary/50 cursor-pointer transition-colors",
							onClick: () => navigate("/inspections"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/Index.tsx:240:17",
								"data-prohibitions": "[]",
								className: "pb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										"data-uid": "src/pages/Index.tsx:241:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-8 text-primary mb-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/Index.tsx:242:19",
										"data-prohibitions": "[]",
										children: "Iniciar Vistoria"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
										"data-uid": "src/pages/Index.tsx:243:19",
										"data-prohibitions": "[]",
										children: "Preencher checklist inteligente offline/online."
									})
								]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:249:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:250:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:251:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
									"data-uid": "src/pages/Index.tsx:252:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-primary"
								}), " Trilha de Auditoria"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:255:13",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/Index.tsx:256:15",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									"data-uid": "src/pages/Index.tsx:257:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/Index.tsx:258:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Index.tsx:259:21",
												"data-prohibitions": "[]",
												children: "Ref ID"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Index.tsx:260:21",
												"data-prohibitions": "[]",
												children: "Ação Realizada"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Index.tsx:261:21",
												"data-prohibitions": "[]",
												children: "Usuário"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Index.tsx:262:21",
												"data-prohibitions": "[]",
												className: "text-right",
												children: "Hora"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
									"data-uid": "src/pages/Index.tsx:265:17",
									"data-prohibitions": "[editContent]",
									children: [recentLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/Index.tsx:267:21",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Index.tsx:268:23",
												"data-prohibitions": "[editContent]",
												className: "font-mono text-xs",
												children: log.propertyId
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Index.tsx:269:23",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm",
												children: log.action
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Index.tsx:270:23",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-muted-foreground",
												children: log.user
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Index.tsx:271:23",
												"data-prohibitions": "[editContent]",
												className: "text-right text-xs text-muted-foreground",
												children: new Date(log.timestamp).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit"
												})
											})
										]
									}, log.id)), recentLogs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
										"data-uid": "src/pages/Index.tsx:280:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Index.tsx:281:23",
											"data-prohibitions": "[]",
											colSpan: 4,
											className: "text-center text-muted-foreground",
											children: "Nenhuma atividade recente."
										})
									})]
								})]
							})
						})]
					})]
				}), canSeeDashboard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Index.tsx:293:11",
					"data-prohibitions": "[]",
					className: "lg:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardChart, {
						"data-uid": "src/pages/Index.tsx:294:13",
						"data-prohibitions": "[editContent]"
					})
				})]
			})
		]
	});
};
//#endregion
export { Index as default };

//# sourceMappingURL=Index-Caa9xeUc.js.map