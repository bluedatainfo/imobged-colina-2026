import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as ExternalLink } from "./external-link-BNMSOXbU.js";
import { t as Button } from "./button-DZFv31v6.js";
import "./client-DbPPqM1c.js";
import { n as useEntitiesStore, t as initEntitiesStore } from "./entities-pTkigeh5.js";
import { V as UsersRound, j as Input, q as Search } from "./index-BCUUWpkN.js";
import { a as CardHeader, n as CardContent, t as Card } from "./card-DZXI3GJ_.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-D_NqDEL3.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BIyMlC6-.js";
//#region src/pages/Entities.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Entities() {
	const { owners, tenants } = useEntitiesStore();
	const { toast } = useToast();
	const [activeTab, setActiveTab] = (0, import_react.useState)("owners");
	const [search, setSearch] = (0, import_react.useState)("");
	const [isFetching, setIsFetching] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		setIsFetching(true);
		initEntitiesStore().finally(() => setIsFetching(false));
	}, []);
	const filteredList = (activeTab === "owners" ? owners : tenants).filter((e) => e.fullName.toLowerCase().includes(search.toLowerCase()) || e.code.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Entities.tsx:47:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 max-w-6xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Entities.tsx:48:7",
			"data-prohibitions": "[]",
			className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Entities.tsx:49:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					"data-uid": "src/pages/Entities.tsx:50:11",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {
						"data-uid": "src/pages/Entities.tsx:51:13",
						"data-prohibitions": "[editContent]",
						className: "w-8 h-8 text-primary"
					}), "Entidades Integradas"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Entities.tsx:54:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Consulta de Proprietários e Locatários integrados com o ERP Local (Modo Leitura)."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/pages/Entities.tsx:58:9",
				"data-prohibitions": "[]",
				variant: "outline",
				className: "gap-2",
				disabled: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
					"data-uid": "src/pages/Entities.tsx:59:11",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4"
				}), " Gerido no ERP"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/Entities.tsx:63:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				"data-uid": "src/pages/Entities.tsx:64:9",
				"data-prohibitions": "[]",
				className: "pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Entities.tsx:65:11",
					"data-prohibitions": "[]",
					className: "flex flex-col sm:flex-row items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						"data-uid": "src/pages/Entities.tsx:66:13",
						"data-prohibitions": "[]",
						value: activeTab,
						onValueChange: (v) => setActiveTab(v),
						className: "w-full sm:w-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							"data-uid": "src/pages/Entities.tsx:71:15",
							"data-prohibitions": "[]",
							className: "grid w-full sm:w-auto grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/Entities.tsx:72:17",
								"data-prohibitions": "[]",
								value: "owners",
								children: "Proprietários"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/Entities.tsx:73:17",
								"data-prohibitions": "[]",
								value: "tenants",
								children: "Locatários"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Entities.tsx:76:13",
						"data-prohibitions": "[]",
						className: "relative w-full sm:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-uid": "src/pages/Entities.tsx:77:15",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 absolute left-3 top-3 text-muted-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Entities.tsx:78:15",
							"data-prohibitions": "[editContent]",
							placeholder: "Buscar por nome ou código...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "pl-9"
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/pages/Entities.tsx:87:9",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/Entities.tsx:88:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/Entities.tsx:89:13",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/Entities.tsx:90:15",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Entities.tsx:91:17",
									"data-prohibitions": "[]",
									children: "Código (ID)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Entities.tsx:92:17",
									"data-prohibitions": "[]",
									children: "Nome Completo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Entities.tsx:93:17",
									"data-prohibitions": "[]",
									children: "CPF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Entities.tsx:94:17",
									"data-prohibitions": "[]",
									children: "Endereço"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Entities.tsx:95:17",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Origem"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
						"data-uid": "src/pages/Entities.tsx:98:13",
						"data-prohibitions": "[editContent]",
						children: [
							filteredList.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Entities.tsx:100:17",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Entities.tsx:101:19",
										"data-prohibitions": "[editContent]",
										className: "font-mono font-medium",
										children: item.code
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Entities.tsx:102:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: item.fullName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Entities.tsx:103:19",
										"data-prohibitions": "[editContent]",
										children: item.cpf || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Entities.tsx:104:19",
										"data-prohibitions": "[editContent]",
										className: "truncate max-w-[200px]",
										title: item.fullAddress,
										children: item.fullAddress || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Entities.tsx:107:19",
										"data-prohibitions": "[]",
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Entities.tsx:108:21",
											"data-prohibitions": "[]",
											className: "inline-flex items-center rounded-md bg-secondary px-2 py-1 text-[10px] font-medium text-secondary-foreground ring-1 ring-inset ring-secondary-foreground/10",
											children: "ERP Local"
										})
									})
								]
							}, item.id)),
							filteredList.length === 0 && isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/Entities.tsx:115:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/Entities.tsx:116:19",
									"data-prohibitions": "[]",
									colSpan: 5,
									className: "text-center py-8 text-muted-foreground",
									children: "Buscando registros..."
								})
							}),
							filteredList.length === 0 && !isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/Entities.tsx:122:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/Entities.tsx:123:19",
									"data-prohibitions": "[]",
									colSpan: 5,
									className: "text-center py-8 text-muted-foreground",
									children: "Nenhum registro encontrado."
								})
							})
						]
					})]
				})
			})]
		})]
	});
}
//#endregion
export { Entities as default };

//# sourceMappingURL=Entities-B84BYg26.js.map