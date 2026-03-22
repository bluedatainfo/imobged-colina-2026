import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-DfXDXNfA.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-x2HId7Er.js";
import { t as CircleCheckBig } from "./circle-check-big-DITXNSMM.js";
import { t as Download } from "./download-D-jl9O1D.js";
import { t as TriangleAlert } from "./triangle-alert-DPaxT5CC.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import "./client-CX_7U15l.js";
import { i as useMainStore, r as mainStore } from "./main-ChpUIa7R.js";
import "./users-1CY0fc8C.js";
import "./contracts-CPPQCr9C.js";
import "./keys-Bmg8vg07.js";
import "./entities-DMoSoCc8.js";
import { K as FileText, Y as Clock, _ as useAuth, a as DropdownMenuContent, i as DropdownMenu, k as Wrench, l as DropdownMenuTrigger, o as DropdownMenuItem, r as Badge, tt as Activity } from "./index-DoYm8snK.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-D7vpVfHv.js";
import { m365Service } from "./m365-D1HEl067.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CTyWlqSb.js";
import { a as BarChart, c as CartesianGrid, d as Cell, i as PieChart, l as Bar, n as ChartTooltip, o as YAxis, r as ChartTooltipContent, s as XAxis, t as ChartContainer, u as Pie } from "./chart-Ds6RRg8P.js";
var Table = createLucideIcon("table", [
	["path", {
		d: "M12 3v18",
		key: "108xh3"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M3 9h18",
		key: "1pudct"
	}],
	["path", {
		d: "M3 15h18",
		key: "5xshup"
	}]
]);
//#endregion
//#region src/components/MaintenanceAnalytics.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function MaintenanceAnalytics() {
	const { maintenanceTickets, properties } = useMainStore();
	const { user } = useAuth();
	const canExport = user?.role === "Admin" || user?.role === "Gerente";
	const [dateRange, setDateRange] = (0, import_react.useState)("all");
	const [regionFilter, setRegionFilter] = (0, import_react.useState)("all");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const getRegion = (address) => address?.match(/(?:Rua|Av\.|Rodovia)\s+([^,]+)/)?.[1].split(" ")[0] || "Outros";
	const regions = (0, import_react.useMemo)(() => Array.from(new Set(properties.map((p) => getRegion(p.address)))), [properties]);
	const filtered = (0, import_react.useMemo)(() => maintenanceTickets.filter((t) => {
		if (dateRange !== "all" && new Date(t.createdAt) < /* @__PURE__ */ new Date(Date.now() - parseInt(dateRange) * 864e5)) return false;
		if (statusFilter !== "all" && t.status !== statusFilter) return false;
		if (regionFilter !== "all" && getRegion(properties.find((p) => p.id === t.propertyId)?.address) !== regionFilter) return false;
		return true;
	}), [
		maintenanceTickets,
		properties,
		dateRange,
		statusFilter,
		regionFilter
	]);
	const { active, mostCommon, avg, byItem, byType, byRegion } = (0, import_react.useMemo)(() => {
		const active = filtered.filter((t) => t.status !== "Concluído").length;
		const itemCounts = filtered.reduce((acc, t) => ({
			...acc,
			[t.item]: (acc[t.item] || 0) + 1
		}), {});
		const mostCommon = Object.keys(itemCounts).sort((a, b) => itemCounts[b] - itemCounts[a])[0] || "N/A";
		const types = {};
		const regs = {};
		filtered.forEach((t) => {
			const p = properties.find((x) => x.id === t.propertyId);
			if (p) {
				types[p.type] = (types[p.type] || 0) + 1;
				const r = getRegion(p.address);
				regs[r] = (regs[r] || 0) + 1;
			}
		});
		return {
			active,
			mostCommon,
			avg: Math.max(1, Math.round(filtered.filter((t) => t.status === "Concluído").length / 3)),
			byItem: Object.entries(itemCounts).map(([name, value], i) => ({
				name,
				value,
				fill: `hsl(var(--chart-${i % 5 + 1}))`
			})),
			byType: Object.entries(types).map(([name, value], i) => ({
				name,
				value,
				fill: `hsl(var(--chart-${i === 0 ? 2 : 4}))`
			})),
			byRegion: Object.entries(regs).map(([name, value], i) => ({
				name,
				value,
				fill: `hsl(var(--chart-${i % 3 + 1}))`
			}))
		};
	}, [filtered, properties]);
	const exportCSV = () => {
		const headers = [
			"Call ID",
			"Property Name",
			"Region",
			"Damage Category",
			"Status",
			"Creation Date"
		];
		const rows = filtered.map((t) => {
			const p = properties.find((x) => x.id === t.propertyId);
			return [
				t.id,
				`"${p?.title || "N/A"}"`,
				`"${getRegion(p?.address)}"`,
				`"${t.item}"`,
				`"${t.status}"`,
				new Date(t.createdAt).toLocaleDateString("pt-BR")
			].join(",");
		});
		const blob = new Blob(["﻿" + [headers.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = `manutencao_export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
		link.click();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/MaintenanceAnalytics.tsx:137:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
				"data-uid": "src/components/MaintenanceAnalytics.tsx:138:7",
				"data-prohibitions": "[editContent]",
				children: `@media print { body * { visibility: hidden; } #print-area, #print-area * { visibility: visible; } #print-area { position: absolute; left: 0; top: 0; width: 100%; } .no-print { display: none !important; } }`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/MaintenanceAnalytics.tsx:140:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-between gap-4 bg-muted/30 p-4 rounded-lg border no-print",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/MaintenanceAnalytics.tsx:141:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/components/MaintenanceAnalytics.tsx:142:11",
							"data-prohibitions": "[]",
							value: dateRange,
							onValueChange: setDateRange,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:143:13",
								"data-prohibitions": "[]",
								className: "w-[140px] bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:144:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Período"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:146:13",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:147:15",
										"data-prohibitions": "[]",
										value: "all",
										children: "Todo o Período"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:148:15",
										"data-prohibitions": "[]",
										value: "30",
										children: "Últimos 30 Dias"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:149:15",
										"data-prohibitions": "[]",
										value: "60",
										children: "Últimos 60 Dias"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/components/MaintenanceAnalytics.tsx:152:11",
							"data-prohibitions": "[]",
							value: statusFilter,
							onValueChange: setStatusFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:153:13",
								"data-prohibitions": "[]",
								className: "w-[140px] bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:154:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Status"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:156:13",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:157:15",
										"data-prohibitions": "[]",
										value: "all",
										children: "Todos os Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:158:15",
										"data-prohibitions": "[]",
										value: "Pendente",
										children: "Pendente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:159:15",
										"data-prohibitions": "[]",
										value: "Em Andamento",
										children: "Em Andamento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:160:15",
										"data-prohibitions": "[]",
										value: "Concluído",
										children: "Concluído"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/components/MaintenanceAnalytics.tsx:163:11",
							"data-prohibitions": "[editContent]",
							value: regionFilter,
							onValueChange: setRegionFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:164:13",
								"data-prohibitions": "[]",
								className: "w-[140px] bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:165:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Região"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:167:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:168:15",
									"data-prohibitions": "[]",
									value: "all",
									children: "Todas Regiões"
								}), regions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:170:17",
									"data-prohibitions": "[editContent]",
									value: r,
									children: r
								}, r))]
							})]
						})
					]
				}), canExport && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
					"data-uid": "src/components/MaintenanceAnalytics.tsx:178:11",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						"data-uid": "src/components/MaintenanceAnalytics.tsx:179:13",
						"data-prohibitions": "[]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/MaintenanceAnalytics.tsx:180:15",
							"data-prohibitions": "[]",
							variant: "outline",
							className: "bg-background",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:181:17",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4"
							}), " Exportar"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						"data-uid": "src/components/MaintenanceAnalytics.tsx:184:13",
						"data-prohibitions": "[]",
						align: "end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-uid": "src/components/MaintenanceAnalytics.tsx:185:15",
							"data-prohibitions": "[]",
							onClick: () => window.print(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:186:17",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4"
							}), " Relatório PDF"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-uid": "src/components/MaintenanceAnalytics.tsx:188:15",
							"data-prohibitions": "[]",
							onClick: exportCSV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:189:17",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4"
							}), " Planilha (CSV)"]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/MaintenanceAnalytics.tsx:196:7",
				"data-prohibitions": "[editContent]",
				id: "print-area",
				className: "space-y-6 bg-background",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/MaintenanceAnalytics.tsx:197:9",
						"data-prohibitions": "[editContent]",
						className: "hidden print:block mb-6 pb-4 border-b",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:198:11",
								"data-prohibitions": "[]",
								className: "text-3xl font-bold tracking-tight",
								children: "ImobGED"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:199:11",
								"data-prohibitions": "[]",
								className: "text-xl text-muted-foreground mt-1",
								children: "Relatório de BI de Manutenção"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:200:11",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground mt-4",
								children: [
									"Gerado em: ",
									(/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR"),
									" | Filtros:",
									" ",
									dateRange === "all" ? "Todo período" : `${dateRange} dias`,
									" - ",
									statusFilter,
									" -",
									" ",
									regionFilter
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/MaintenanceAnalytics.tsx:207:9",
						"data-prohibitions": "[editContent]",
						className: "grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:208:11",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:209:13",
									"data-prohibitions": "[editContent]",
									className: "p-6 flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:210:15",
										"data-prohibitions": "[]",
										className: "bg-amber-100 p-3 rounded-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:211:17",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-6 text-amber-600"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:213:15",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:214:17",
											"data-prohibitions": "[]",
											className: "text-sm font-medium text-muted-foreground",
											children: "Chamados Ativos"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:215:17",
											"data-prohibitions": "[editContent]",
											className: "text-3xl font-bold",
											children: active
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:219:11",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:220:13",
									"data-prohibitions": "[editContent]",
									className: "p-6 flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:221:15",
										"data-prohibitions": "[]",
										className: "bg-destructive/10 p-3 rounded-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:222:17",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-6 text-destructive"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:224:15",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:225:17",
											"data-prohibitions": "[]",
											className: "text-sm font-medium text-muted-foreground",
											children: "Danos mais Comuns"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:226:17",
											"data-prohibitions": "[editContent]",
											className: "text-2xl font-bold",
											children: mostCommon
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:230:11",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:231:13",
									"data-prohibitions": "[editContent]",
									className: "p-6 flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:232:15",
										"data-prohibitions": "[]",
										className: "bg-primary/10 p-3 rounded-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:233:17",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-6 text-primary"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:235:15",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:236:17",
											"data-prohibitions": "[]",
											className: "text-sm font-medium text-muted-foreground",
											children: "Média Mensal"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:237:17",
											"data-prohibitions": "[editContent]",
											className: "text-3xl font-bold",
											children: avg
										})]
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/MaintenanceAnalytics.tsx:243:9",
						"data-prohibitions": "[editContent]",
						className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:244:11",
								"data-prohibitions": "[]",
								className: "lg:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:245:13",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:246:15",
										"data-prohibitions": "[]",
										children: "Danos Frequentes"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:248:13",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:249:15",
										"data-prohibitions": "[]",
										config: {},
										className: "h-[250px] w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:250:17",
											"data-prohibitions": "[]",
											data: byItem,
											margin: {
												top: 20,
												right: 0,
												left: -20,
												bottom: 0
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:251:19",
													"data-prohibitions": "[editContent]",
													vertical: false,
													strokeDasharray: "3 3"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:252:19",
													"data-prohibitions": "[editContent]",
													dataKey: "name",
													tickLine: false,
													axisLine: false,
													tickMargin: 10
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:253:19",
													"data-prohibitions": "[editContent]",
													tickLine: false,
													axisLine: false,
													tickMargin: 10
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:254:19",
													"data-prohibitions": "[editContent]",
													cursor: false,
													content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
														"data-uid": "src/components/MaintenanceAnalytics.tsx:254:57",
														"data-prohibitions": "[editContent]",
														hideLabel: true
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:255:19",
													"data-prohibitions": "[editContent]",
													dataKey: "value",
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:260:11",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:261:13",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:262:15",
										"data-prohibitions": "[]",
										children: "Por Tipo"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:264:13",
									"data-prohibitions": "[editContent]",
									className: "flex justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:265:15",
										"data-prohibitions": "[editContent]",
										config: {},
										className: "aspect-square h-[250px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:266:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
												"data-uid": "src/components/MaintenanceAnalytics.tsx:267:19",
												"data-prohibitions": "[editContent]",
												cursor: false,
												content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:267:57",
													"data-prohibitions": "[editContent]",
													hideLabel: true
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
												"data-uid": "src/components/MaintenanceAnalytics.tsx:268:19",
												"data-prohibitions": "[editContent]",
												data: byType,
												dataKey: "value",
												nameKey: "name",
												innerRadius: 60,
												outerRadius: 80,
												strokeWidth: 2,
												stroke: "hsl(var(--background))",
												children: byType.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:278:23",
													"data-prohibitions": "[editContent]",
													fill: e.fill
												}, i))
											})]
										})
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:285:11",
								"data-prohibitions": "[]",
								className: "lg:col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:286:13",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:287:15",
										"data-prohibitions": "[]",
										children: "Por Região"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:289:13",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:290:15",
										"data-prohibitions": "[]",
										config: {},
										className: "h-[200px] w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:291:17",
											"data-prohibitions": "[]",
											data: byRegion,
											layout: "vertical",
											margin: {
												top: 0,
												right: 0,
												left: 20,
												bottom: 0
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:296:19",
													"data-prohibitions": "[editContent]",
													horizontal: false,
													strokeDasharray: "3 3"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:297:19",
													"data-prohibitions": "[editContent]",
													type: "number",
													tickLine: false,
													axisLine: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:298:19",
													"data-prohibitions": "[editContent]",
													type: "category",
													dataKey: "name",
													tickLine: false,
													axisLine: false,
													tickMargin: 10
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:305:19",
													"data-prohibitions": "[editContent]",
													cursor: false,
													content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
														"data-uid": "src/components/MaintenanceAnalytics.tsx:305:57",
														"data-prohibitions": "[editContent]",
														hideLabel: true
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:306:19",
													"data-prohibitions": "[editContent]",
													dataKey: "value",
													radius: [
														0,
														4,
														4,
														0
													],
													barSize: 32
												})
											]
										})
									})
								})]
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/Maintenance.tsx
function Maintenance() {
	const { maintenanceTickets } = useMainStore();
	const { user } = useAuth();
	const { toast } = useToast();
	const canViewAnalytics = user?.role === "Admin" || user?.role === "Gerente";
	const handleStatusChange = (id, newStatus) => {
		mainStore.updateMaintenanceStatus(id, newStatus);
		toast({
			title: "Status Atualizado",
			description: `O ticket foi movido para "${newStatus}".`
		});
		m365Service.syncToList("Tickets de Manutenção", `Ticket ${id} atualizado para ${newStatus}`);
	};
	const TicketView = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/Maintenance.tsx:29:5",
		"data-prohibitions": "[editContent]",
		className: "grid gap-4 md:grid-cols-3",
		children: [
			"Pendente",
			"Em Andamento",
			"Concluído"
		].map((status) => {
			const tickets = maintenanceTickets.filter((t) => t.status === status);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Maintenance.tsx:33:11",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					"data-uid": "src/pages/Maintenance.tsx:34:13",
					"data-prohibitions": "[editContent]",
					className: "font-semibold flex items-center gap-2",
					children: [
						status === "Pendente" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
							"data-uid": "src/pages/Maintenance.tsx:35:41",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-red-500"
						}),
						status === "Em Andamento" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							"data-uid": "src/pages/Maintenance.tsx:36:45",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-amber-500"
						}),
						status === "Concluído" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
							"data-uid": "src/pages/Maintenance.tsx:37:42",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-emerald-500"
						}),
						status,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							"data-uid": "src/pages/Maintenance.tsx:38:24",
							"data-prohibitions": "[editContent]",
							variant: "secondary",
							children: tickets.length
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Maintenance.tsx:41:13",
					"data-prohibitions": "[editContent]",
					className: "space-y-3",
					children: [tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Maintenance.tsx:43:17",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Maintenance.tsx:44:19",
							"data-prohibitions": "[editContent]",
							className: "p-4 pb-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Maintenance.tsx:45:21",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-uid": "src/pages/Maintenance.tsx:46:23",
										"data-prohibitions": "[editContent]",
										variant: "outline",
										className: "text-xs font-mono",
										children: t.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Maintenance.tsx:49:23",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground",
										children: new Date(t.createdAt).toLocaleDateString("pt-BR")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									"data-uid": "src/pages/Maintenance.tsx:53:21",
									"data-prohibitions": "[editContent]",
									className: "text-base mt-2",
									children: t.item
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									"data-uid": "src/pages/Maintenance.tsx:54:21",
									"data-prohibitions": "[editContent]",
									className: "line-clamp-1",
									children: t.address
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/Maintenance.tsx:56:19",
							"data-prohibitions": "[editContent]",
							className: "p-4 pt-0 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Maintenance.tsx:57:21",
									"data-prohibitions": "[editContent]",
									className: "text-sm bg-muted/50 p-3 rounded border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/Maintenance.tsx:58:23",
										"data-prohibitions": "[]",
										className: "font-medium text-xs text-muted-foreground mb-1",
										children: "Observações do Vistoriador:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/Maintenance.tsx:61:23",
										"data-prohibitions": "[editContent]",
										children: t.notes
									})]
								}),
								t.photo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Maintenance.tsx:65:23",
									"data-prohibitions": "[]",
									className: "w-full h-32 rounded-md overflow-hidden bg-muted relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										"data-uid": "src/pages/Maintenance.tsx:66:25",
										"data-prohibitions": "[editContent]",
										src: t.photo,
										alt: "Evidência",
										className: "w-full h-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/Maintenance.tsx:67:25",
										"data-prohibitions": "[]",
										className: "absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded",
										children: "Foto da Vistoria"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Maintenance.tsx:73:21",
									"data-prohibitions": "[editContent]",
									className: "flex gap-2 pt-2",
									children: [status === "Pendente" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/Maintenance.tsx:75:25",
										"data-prohibitions": "[]",
										size: "sm",
										className: "w-full",
										onClick: () => handleStatusChange(t.id, "Em Andamento"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {
											"data-uid": "src/pages/Maintenance.tsx:80:27",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}), " Iniciar Reparo"]
									}), status === "Em Andamento" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/Maintenance.tsx:84:25",
										"data-prohibitions": "[]",
										size: "sm",
										variant: "default",
										className: "w-full bg-emerald-600 hover:bg-emerald-700",
										onClick: () => handleStatusChange(t.id, "Concluído"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
											"data-uid": "src/pages/Maintenance.tsx:90:27",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}), " Concluir Reparo"]
									})]
								})
							]
						})]
					}, t.id)), tickets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Maintenance.tsx:98:17",
						"data-prohibitions": "[editContent]",
						className: "p-6 border-2 border-dashed rounded-lg text-center text-muted-foreground text-sm",
						children: [
							"Nenhum ticket ",
							status.toLowerCase(),
							"."
						]
					})]
				})]
			}, status);
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Maintenance.tsx:110:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Maintenance.tsx:111:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/Maintenance.tsx:112:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight",
				children: "Dashboard de Manutenção"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/Maintenance.tsx:113:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "Gerencie alertas de reparos gerados automaticamente pelas vistorias de campo e analise os indicadores."
			})]
		}), canViewAnalytics ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			"data-uid": "src/pages/Maintenance.tsx:120:9",
			"data-prohibitions": "[]",
			defaultValue: "tickets",
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					"data-uid": "src/pages/Maintenance.tsx:121:11",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/Maintenance.tsx:122:13",
						"data-prohibitions": "[]",
						value: "tickets",
						children: "Gestão de Chamados"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/Maintenance.tsx:123:13",
						"data-prohibitions": "[]",
						value: "analytics",
						children: "BI & Analytics"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Maintenance.tsx:125:11",
					"data-prohibitions": "[]",
					value: "tickets",
					className: "mt-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketView, {
						"data-uid": "src/pages/Maintenance.tsx:126:13",
						"data-prohibitions": "[editContent]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Maintenance.tsx:128:11",
					"data-prohibitions": "[]",
					value: "analytics",
					className: "mt-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaintenanceAnalytics, {
						"data-uid": "src/pages/Maintenance.tsx:129:13",
						"data-prohibitions": "[editContent]"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketView, {
			"data-uid": "src/pages/Maintenance.tsx:133:9",
			"data-prohibitions": "[editContent]"
		})]
	});
}
//#endregion
export { Maintenance as default };

//# sourceMappingURL=Maintenance-Drc6jc2A.js.map