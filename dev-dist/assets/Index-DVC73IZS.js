import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as ArrowRight } from "./arrow-right-5lAqrHp-.js";
import { t as RefreshCw } from "./refresh-cw-QaQDb9vQ.js";
import { t as ShieldAlert } from "./shield-alert-DyybQ1jE.js";
import "./client-CX_7U15l.js";
import { i as useMainStore, n as isSlaBreached } from "./main-qhkLLA72.js";
import "./users-BeN6ShO_.js";
import { o as useContractsStore } from "./keys-DF2DstdC.js";
import { n as useEntitiesStore } from "./entities-CnJZXM2l.js";
import { A as Input, B as User, G as Search, K as Scale, U as TrendingUp, X as List, h as useAuth, ht as useNavigate, it as FilePenLine, lt as Building, m as checkAccess, nt as FileText, pt as Link, t as Badge } from "./index-DOglaGbk.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CcQxuH73.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C8VQf44z.js";
import { a as BarChart, c as CartesianGrid, d as Cell, i as PieChart, l as Bar, n as ChartTooltip, o as YAxis, r as ChartTooltipContent, s as XAxis, t as ChartContainer, u as Pie } from "./chart-CcPk7jp1.js";
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
		"data-uid": "src/pages/Index.tsx:107:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Index.tsx:108:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Index.tsx:109:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Index.tsx:110:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Painel de Controle"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Index.tsx:111:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Visão geral da sua operação digital e integrações ERP/Microsoft 365."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Index.tsx:116:9",
					"data-prohibitions": "[editContent]",
					className: "relative w-full md:w-96",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-uid": "src/pages/Index.tsx:117:11",
							"data-prohibitions": "[editContent]",
							className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Index.tsx:118:11",
							"data-prohibitions": "[editContent]",
							placeholder: "Busca global de imóveis, proprietários...",
							className: "pl-9 bg-background/50 backdrop-blur-sm",
							value: globalSearch,
							onChange: (e) => setGlobalSearch(e.target.value)
						}),
						searchResults.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Index.tsx:125:13",
							"data-prohibitions": "[editContent]",
							className: "absolute top-12 left-0 right-0 bg-background border rounded-md shadow-lg z-50 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:126:15",
								"data-prohibitions": "[]",
								className: "p-2 bg-muted/30 text-xs font-medium text-muted-foreground border-b",
								children: "Resultados da Integração ERP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								"data-uid": "src/pages/Index.tsx:129:15",
								"data-prohibitions": "[editContent]",
								className: "max-h-80 overflow-y-auto",
								children: searchResults.map((res, i) => {
									const Icon = res.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-uid": "src/pages/Index.tsx:133:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											"data-uid": "src/pages/Index.tsx:134:23",
											"data-prohibitions": "[editContent]",
											to: res.url,
											className: "flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors border-b last:border-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													"data-uid": "src/pages/Index.tsx:138:25",
													"data-prohibitions": "[]",
													className: "mt-0.5 bg-primary/10 p-1.5 rounded-md",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
														"data-uid": "src/pages/Index.tsx:139:27",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4 text-primary"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/Index.tsx:141:25",
													"data-prohibitions": "[editContent]",
													className: "flex-1 overflow-hidden",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/Index.tsx:142:27",
														"data-prohibitions": "[editContent]",
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/Index.tsx:143:29",
															"data-prohibitions": "[editContent]",
															className: "font-medium text-sm truncate",
															children: res.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															"data-uid": "src/pages/Index.tsx:144:29",
															"data-prohibitions": "[editContent]",
															variant: "secondary",
															className: "text-[10px] h-4 px-1",
															children: res.type
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														"data-uid": "src/pages/Index.tsx:148:27",
														"data-prohibitions": "[editContent]",
														className: "text-xs text-muted-foreground truncate",
														children: res.desc
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
													"data-uid": "src/pages/Index.tsx:150:25",
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
				"data-uid": "src/pages/Index.tsx:161:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:162:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:163:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:164:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Contratos Ativos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								"data-uid": "src/pages/Index.tsx:165:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-emerald-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:167:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:168:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-emerald-600",
								children: activeContracts
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:172:9",
						"data-prohibitions": "[editContent]",
						className: awaitingRenewal > 0 ? "border-orange-200 bg-orange-50/50" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:173:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:174:13",
								"data-prohibitions": "[editContent]",
								className: `text-sm font-medium ${awaitingRenewal > 0 ? "text-orange-700" : ""}`,
								children: "Renovações Pendentes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								"data-uid": "src/pages/Index.tsx:179:13",
								"data-prohibitions": "[editContent]",
								className: `h-4 w-4 ${awaitingRenewal > 0 ? "text-orange-600" : "text-muted-foreground"}`
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:183:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:184:13",
								"data-prohibitions": "[editContent]",
								className: `text-2xl font-bold ${awaitingRenewal > 0 ? "text-orange-700" : ""}`,
								children: awaitingRenewal
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:190:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:191:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:192:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Em Assinatura"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileStack, {
								"data-uid": "src/pages/Index.tsx:193:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-purple-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:195:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:196:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-purple-600",
								children: awaitingSignature
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:200:9",
						"data-prohibitions": "[editContent]",
						className: slaBreachedCount > 0 ? "border-destructive/50 bg-destructive/5" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:201:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:202:13",
								"data-prohibitions": "[editContent]",
								className: `text-sm font-medium ${slaBreachedCount > 0 ? "text-destructive" : ""}`,
								children: "SLA Violado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
								"data-uid": "src/pages/Index.tsx:207:13",
								"data-prohibitions": "[editContent]",
								className: `h-4 w-4 ${slaBreachedCount > 0 ? "text-destructive" : "text-muted-foreground"}`
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:211:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Index.tsx:212:13",
								"data-prohibitions": "[editContent]",
								className: `text-2xl font-bold ${slaBreachedCount > 0 ? "text-destructive" : ""}`,
								children: slaBreachedCount
							})
						})]
					})
				]
			}),
			canSeeDashboard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceDashboard, {
				"data-uid": "src/pages/Index.tsx:219:27",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Index.tsx:221:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Index.tsx:222:9",
					"data-prohibitions": "[editContent]",
					className: "lg:col-span-4 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Index.tsx:223:11",
						"data-prohibitions": "[editContent]",
						className: "grid gap-4 md:grid-cols-2",
						children: [checkAccess("/contracts", user?.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/Index.tsx:225:15",
							"data-prohibitions": "[]",
							className: "hover:border-primary/50 cursor-pointer transition-colors",
							onClick: () => navigate("/contracts"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/Index.tsx:229:17",
								"data-prohibitions": "[]",
								className: "pb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, {
										"data-uid": "src/pages/Index.tsx:230:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-8 text-primary mb-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/Index.tsx:231:19",
										"data-prohibitions": "[]",
										children: "Ciclo de Contratos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
										"data-uid": "src/pages/Index.tsx:232:19",
										"data-prohibitions": "[]",
										children: "Gerar minutas via templates e acompanhar workflow."
									})
								]
							})
						}), checkAccess("/inspections", user?.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/Index.tsx:239:15",
							"data-prohibitions": "[]",
							className: "hover:border-primary/50 cursor-pointer transition-colors",
							onClick: () => navigate("/inspections"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/Index.tsx:243:17",
								"data-prohibitions": "[]",
								className: "pb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										"data-uid": "src/pages/Index.tsx:244:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-8 text-primary mb-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/Index.tsx:245:19",
										"data-prohibitions": "[]",
										children: "Iniciar Vistoria"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
										"data-uid": "src/pages/Index.tsx:246:19",
										"data-prohibitions": "[]",
										children: "Preencher checklist inteligente offline/online."
									})
								]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Index.tsx:252:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/Index.tsx:253:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/Index.tsx:254:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
									"data-uid": "src/pages/Index.tsx:255:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-primary"
								}), " Trilha de Auditoria"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Index.tsx:258:13",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/Index.tsx:259:15",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									"data-uid": "src/pages/Index.tsx:260:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/Index.tsx:261:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Index.tsx:262:21",
												"data-prohibitions": "[]",
												children: "Ref ID"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Index.tsx:263:21",
												"data-prohibitions": "[]",
												children: "Ação Realizada"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Index.tsx:264:21",
												"data-prohibitions": "[]",
												children: "Usuário"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Index.tsx:265:21",
												"data-prohibitions": "[]",
												className: "text-right",
												children: "Hora"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
									"data-uid": "src/pages/Index.tsx:268:17",
									"data-prohibitions": "[editContent]",
									children: [recentLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/Index.tsx:270:21",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Index.tsx:271:23",
												"data-prohibitions": "[editContent]",
												className: "font-mono text-xs",
												children: log.propertyId
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Index.tsx:272:23",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm",
												children: log.action
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Index.tsx:273:23",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-muted-foreground",
												children: log.user
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Index.tsx:274:23",
												"data-prohibitions": "[editContent]",
												className: "text-right text-xs text-muted-foreground",
												children: new Date(log.timestamp).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit"
												})
											})
										]
									}, log.id)), recentLogs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
										"data-uid": "src/pages/Index.tsx:283:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Index.tsx:284:23",
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
					"data-uid": "src/pages/Index.tsx:296:11",
					"data-prohibitions": "[]",
					className: "lg:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardChart, {
						"data-uid": "src/pages/Index.tsx:297:13",
						"data-prohibitions": "[editContent]"
					})
				})]
			})
		]
	});
};
//#endregion
export { Index as default };

//# sourceMappingURL=Index-DVC73IZS.js.map