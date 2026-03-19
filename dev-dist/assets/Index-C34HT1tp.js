import "./react-CaAsmmmw.js";
import "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as RefreshCw } from "./refresh-cw-Dc9dLNp0.js";
import { t as ShieldAlert } from "./shield-alert-DyybQ1jE.js";
import "./client-CX_7U15l.js";
import { i as useMainStore, n as isSlaBreached } from "./main-CDM8pvrG.js";
import "./users-1CY0fc8C.js";
import { r as useContractsStore } from "./contracts-Q43gzz8R.js";
import "./keys-Bmg8vg07.js";
import "./entities-Bn_N6hmM.js";
import { F as Scale, K as FilePenLine, P as Search, W as FileText, Z as Building, h as useAuth, m as checkAccess, nt as useNavigate, z as List } from "./index-CNoZBNSr.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-D7vpVfHv.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-IpQ5I8o7.js";
import { a as BarChart, c as CartesianGrid, d as Cell, i as PieChart, l as Bar, n as ChartTooltip, o as YAxis, r as ChartTooltipContent, s as XAxis, t as ChartContainer, u as Pie } from "./chart-Ds6RRg8P.js";
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
var TrendingUp = createLucideIcon("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]);
//#endregion
//#region src/components/DashboardChart.tsx
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
var chartConfig$1 = {
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
				config: chartConfig$1,
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
//#region src/components/PerformanceDashboard.tsx
var timeData = [
	{
		month: "Jan",
		captacao: 15,
		locacao: 25
	},
	{
		month: "Fev",
		captacao: 12,
		locacao: 20
	},
	{
		month: "Mar",
		captacao: 18,
		locacao: 22
	},
	{
		month: "Abr",
		captacao: 10,
		locacao: 15
	},
	{
		month: "Mai",
		captacao: 8,
		locacao: 12
	},
	{
		month: "Jun",
		captacao: 9,
		locacao: 10
	}
];
var chartConfig = {
	captacao: {
		label: "Tempo Médio (Captação)",
		color: "hsl(var(--primary))"
	},
	locacao: {
		label: "Tempo Médio (Locação)",
		color: "hsl(var(--chart-2))"
	}
};
function PerformanceDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/PerformanceDashboard.tsx:22:5",
		"data-prohibitions": "[]",
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/PerformanceDashboard.tsx:23:7",
			"data-prohibitions": "[]",
			className: "grid gap-4 md:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/components/PerformanceDashboard.tsx:24:9",
					"data-prohibitions": "[]",
					className: "bg-blue-50/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/components/PerformanceDashboard.tsx:25:11",
						"data-prohibitions": "[]",
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceDashboard.tsx:26:13",
							"data-prohibitions": "[]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"data-uid": "src/components/PerformanceDashboard.tsx:27:15",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5 text-blue-600"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceDashboard.tsx:28:15",
								"data-prohibitions": "[]",
								className: "text-xl font-bold text-blue-900",
								children: "45"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/PerformanceDashboard.tsx:30:13",
							"data-prohibitions": "[]",
							className: "text-xs text-blue-800 mt-2 font-medium",
							children: "Captação (Leads)"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/components/PerformanceDashboard.tsx:33:9",
					"data-prohibitions": "[]",
					className: "bg-emerald-50/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/components/PerformanceDashboard.tsx:34:11",
						"data-prohibitions": "[]",
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceDashboard.tsx:35:13",
							"data-prohibitions": "[]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
								"data-uid": "src/components/PerformanceDashboard.tsx:36:15",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5 text-emerald-600"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceDashboard.tsx:37:15",
								"data-prohibitions": "[]",
								className: "text-xl font-bold text-emerald-900",
								children: "12"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/PerformanceDashboard.tsx:39:13",
							"data-prohibitions": "[]",
							className: "text-xs text-emerald-800 mt-2 font-medium",
							children: "Vendas (Concluídas)"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/components/PerformanceDashboard.tsx:42:9",
					"data-prohibitions": "[]",
					className: "bg-indigo-50/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/components/PerformanceDashboard.tsx:43:11",
						"data-prohibitions": "[]",
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceDashboard.tsx:44:13",
							"data-prohibitions": "[]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
								"data-uid": "src/components/PerformanceDashboard.tsx:45:15",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5 text-indigo-600"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceDashboard.tsx:46:15",
								"data-prohibitions": "[]",
								className: "text-xl font-bold text-indigo-900",
								children: "320"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/PerformanceDashboard.tsx:48:13",
							"data-prohibitions": "[]",
							className: "text-xs text-indigo-800 mt-2 font-medium",
							children: "Gestão de Locação"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/components/PerformanceDashboard.tsx:51:9",
					"data-prohibitions": "[]",
					className: "bg-amber-50/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/components/PerformanceDashboard.tsx:52:11",
						"data-prohibitions": "[]",
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceDashboard.tsx:53:13",
							"data-prohibitions": "[]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, {
								"data-uid": "src/components/PerformanceDashboard.tsx:54:15",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5 text-amber-600"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceDashboard.tsx:55:15",
								"data-prohibitions": "[]",
								className: "text-xl font-bold text-amber-900",
								children: "8"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/PerformanceDashboard.tsx:57:13",
							"data-prohibitions": "[]",
							className: "text-xs text-amber-800 mt-2 font-medium",
							children: "Casos Jurídicos"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/components/PerformanceDashboard.tsx:60:9",
					"data-prohibitions": "[]",
					className: "bg-rose-50/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/components/PerformanceDashboard.tsx:61:11",
						"data-prohibitions": "[]",
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceDashboard.tsx:62:13",
							"data-prohibitions": "[]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								"data-uid": "src/components/PerformanceDashboard.tsx:63:15",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5 text-rose-600"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceDashboard.tsx:64:15",
								"data-prohibitions": "[]",
								className: "text-xl font-bold text-rose-900",
								children: "R$ 1.2M"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/PerformanceDashboard.tsx:66:13",
							"data-prohibitions": "[]",
							className: "text-xs text-rose-800 mt-2 font-medium",
							children: "Financeiro (Receita)"
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/components/PerformanceDashboard.tsx:71:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				"data-uid": "src/components/PerformanceDashboard.tsx:72:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					"data-uid": "src/components/PerformanceDashboard.tsx:73:11",
					"data-prohibitions": "[]",
					children: "Eficiência Operacional (Em Dias)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					"data-uid": "src/components/PerformanceDashboard.tsx:74:11",
					"data-prohibitions": "[]",
					children: "Comparativo do tempo médio entre a captação do imóvel e a assinatura do contrato de locação."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/components/PerformanceDashboard.tsx:79:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
					"data-uid": "src/components/PerformanceDashboard.tsx:80:11",
					"data-prohibitions": "[]",
					config: chartConfig,
					className: "max-h-[300px] w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						"data-uid": "src/components/PerformanceDashboard.tsx:81:13",
						"data-prohibitions": "[]",
						accessibilityLayer: true,
						data: timeData,
						margin: {
							top: 20,
							right: 0,
							left: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								"data-uid": "src/components/PerformanceDashboard.tsx:82:15",
								"data-prohibitions": "[editContent]",
								vertical: false,
								strokeDasharray: "3 3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								"data-uid": "src/components/PerformanceDashboard.tsx:83:15",
								"data-prohibitions": "[editContent]",
								dataKey: "month",
								tickLine: false,
								tickMargin: 10,
								axisLine: false,
								tickFormatter: (value) => value.slice(0, 3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								"data-uid": "src/components/PerformanceDashboard.tsx:90:15",
								"data-prohibitions": "[editContent]",
								tickLine: false,
								axisLine: false,
								tickMargin: 10
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
								"data-uid": "src/components/PerformanceDashboard.tsx:91:15",
								"data-prohibitions": "[editContent]",
								cursor: false,
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
									"data-uid": "src/components/PerformanceDashboard.tsx:91:53",
									"data-prohibitions": "[editContent]"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								"data-uid": "src/components/PerformanceDashboard.tsx:92:15",
								"data-prohibitions": "[editContent]",
								dataKey: "captacao",
								fill: "var(--color-captacao)",
								radius: [
									4,
									4,
									0,
									0
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								"data-uid": "src/components/PerformanceDashboard.tsx:93:15",
								"data-prohibitions": "[editContent]",
								dataKey: "locacao",
								fill: "var(--color-locacao)",
								radius: [
									4,
									4,
									0,
									0
								]
							})
						]
					})
				})
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
	const { user } = useAuth();
	const slaBreachedCount = store.properties.filter((p) => p.status === "Análise Gerencial").filter((p) => isSlaBreached(p.slaStart, store.settings.slaHours)).length;
	const activeContracts = contracts.filter((c) => c.status === "Ativo").length;
	const awaitingSignature = contracts.filter((c) => c.status === "Aguardando Assinatura").length;
	const awaitingRenewal = contracts.filter((c) => c.status === "Aguardando Renovação").length;
	const recentLogs = store.auditLogs.slice(0, 5);
	const canSeeDashboard = checkAccess("/settings", user?.role) || user?.role === "Gerente";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Index.tsx:48:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Index.tsx:49:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/Index.tsx:50:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight",
					children: "Painel de Controle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Index.tsx:51:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Visão geral da sua operação digital, contratos e integrações com o Microsoft 365."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Index.tsx:56:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:57:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:58:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:59:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Contratos Ativos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								"data-uid": "src/pages/Index.tsx:60:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-emerald-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:62:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:63:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-emerald-600",
								children: activeContracts
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:67:9",
						"data-prohibitions": "[editContent]",
						className: awaitingRenewal > 0 ? "border-orange-200 bg-orange-50/50" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:68:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:69:13",
								"data-prohibitions": "[editContent]",
								className: `text-sm font-medium ${awaitingRenewal > 0 ? "text-orange-700" : ""}`,
								children: "Renovações Pendentes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								"data-uid": "src/pages/Index.tsx:74:13",
								"data-prohibitions": "[editContent]",
								className: `h-4 w-4 ${awaitingRenewal > 0 ? "text-orange-600" : "text-muted-foreground"}`
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:78:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:79:13",
								"data-prohibitions": "[editContent]",
								className: `text-2xl font-bold ${awaitingRenewal > 0 ? "text-orange-700" : ""}`,
								children: awaitingRenewal
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:85:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:86:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:87:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Em Assinatura"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileStack, {
								"data-uid": "src/pages/Index.tsx:88:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-purple-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:90:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:91:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-purple-600",
								children: awaitingSignature
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:95:9",
						"data-prohibitions": "[editContent]",
						className: slaBreachedCount > 0 ? "border-destructive/50 bg-destructive/5" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:96:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:97:13",
								"data-prohibitions": "[editContent]",
								className: `text-sm font-medium ${slaBreachedCount > 0 ? "text-destructive" : ""}`,
								children: "SLA Violado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
								"data-uid": "src/pages/Index.tsx:102:13",
								"data-prohibitions": "[editContent]",
								className: `h-4 w-4 ${slaBreachedCount > 0 ? "text-destructive" : "text-muted-foreground"}`
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:106:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:107:13",
								"data-prohibitions": "[editContent]",
								className: `text-2xl font-bold ${slaBreachedCount > 0 ? "text-destructive" : ""}`,
								children: slaBreachedCount
							})
						})]
					})
				]
			}),
			canSeeDashboard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceDashboard, {
				"data-uid": "src/pages/Index.tsx:114:27",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Index.tsx:116:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Index.tsx:117:9",
					"data-prohibitions": "[editContent]",
					className: "lg:col-span-4 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Index.tsx:118:11",
						"data-prohibitions": "[editContent]",
						className: "grid gap-4 md:grid-cols-2",
						children: [checkAccess("/contracts", user?.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/Index.tsx:120:15",
							"data-prohibitions": "[]",
							className: "hover:border-primary/50 cursor-pointer transition-colors",
							onClick: () => navigate("/contracts"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/Index.tsx:124:17",
								"data-prohibitions": "[]",
								className: "pb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, {
										"data-uid": "src/pages/Index.tsx:125:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-8 text-primary mb-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/Index.tsx:126:19",
										"data-prohibitions": "[]",
										children: "Ciclo de Contratos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
										"data-uid": "src/pages/Index.tsx:127:19",
										"data-prohibitions": "[]",
										children: "Gerar minutas via templates e acompanhar workflow."
									})
								]
							})
						}), checkAccess("/inspections", user?.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/Index.tsx:134:15",
							"data-prohibitions": "[]",
							className: "hover:border-primary/50 cursor-pointer transition-colors",
							onClick: () => navigate("/inspections"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/Index.tsx:138:17",
								"data-prohibitions": "[]",
								className: "pb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										"data-uid": "src/pages/Index.tsx:139:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-8 text-primary mb-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/Index.tsx:140:19",
										"data-prohibitions": "[]",
										children: "Iniciar Vistoria"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
										"data-uid": "src/pages/Index.tsx:141:19",
										"data-prohibitions": "[]",
										children: "Preencher checklist inteligente offline/online."
									})
								]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:147:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:148:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:149:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
									"data-uid": "src/pages/Index.tsx:150:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-primary"
								}), " Trilha de Auditoria"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:153:13",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/Index.tsx:154:15",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									"data-uid": "src/pages/Index.tsx:155:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/Index.tsx:156:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Index.tsx:157:21",
												"data-prohibitions": "[]",
												children: "Ref ID"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Index.tsx:158:21",
												"data-prohibitions": "[]",
												children: "Ação Realizada"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Index.tsx:159:21",
												"data-prohibitions": "[]",
												children: "Usuário"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Index.tsx:160:21",
												"data-prohibitions": "[]",
												className: "text-right",
												children: "Hora"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
									"data-uid": "src/pages/Index.tsx:163:17",
									"data-prohibitions": "[editContent]",
									children: [recentLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/Index.tsx:165:21",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Index.tsx:166:23",
												"data-prohibitions": "[editContent]",
												className: "font-mono text-xs",
												children: log.propertyId
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Index.tsx:167:23",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm",
												children: log.action
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Index.tsx:168:23",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-muted-foreground",
												children: log.user
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Index.tsx:169:23",
												"data-prohibitions": "[editContent]",
												className: "text-right text-xs text-muted-foreground",
												children: new Date(log.timestamp).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit"
												})
											})
										]
									}, log.id)), recentLogs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
										"data-uid": "src/pages/Index.tsx:178:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Index.tsx:179:23",
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
					"data-uid": "src/pages/Index.tsx:191:11",
					"data-prohibitions": "[]",
					className: "lg:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardChart, {
						"data-uid": "src/pages/Index.tsx:192:13",
						"data-prohibitions": "[editContent]"
					})
				})]
			})
		]
	});
};
//#endregion
export { Index as default };

//# sourceMappingURL=Index-C34HT1tp.js.map