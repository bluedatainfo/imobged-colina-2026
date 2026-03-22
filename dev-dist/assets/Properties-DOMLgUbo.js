import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as ArrowRight } from "./arrow-right-5lAqrHp-.js";
import { t as MapPin } from "./map-pin-C0wVYbXY.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import "./client-CX_7U15l.js";
import { i as useMainStore } from "./main-CDM8pvrG.js";
import { I as Plus, P as Search, Z as Building, et as Link, t as Badge, w as Input } from "./index-BzAjjcvZ.js";
import { n as CardContent, t as Card } from "./card-D7vpVfHv.js";
//#region src/pages/Properties.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Properties() {
	const { properties } = useMainStore();
	const [search, setSearch] = (0, import_react.useState)("");
	const filtered = properties.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Properties.tsx:21:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:22:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Properties.tsx:23:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Properties.tsx:24:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Gestão de Imóveis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Properties.tsx:25:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Catálogo e status do portfólio da imobiliária."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Properties.tsx:27:9",
					"data-prohibitions": "[]",
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/Properties.tsx:28:11",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), " Nova Captação"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:32:7",
				"data-prohibitions": "[]",
				className: "flex items-center gap-2 max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					"data-uid": "src/pages/Properties.tsx:33:9",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 text-muted-foreground absolute ml-3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/pages/Properties.tsx:34:9",
					"data-prohibitions": "[editContent]",
					placeholder: "Buscar imóvel por nome ou endereço...",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "pl-9"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:42:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: [filtered.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/Properties.tsx:44:11",
					"data-prohibitions": "[editContent]",
					className: "overflow-hidden flex flex-col transition-shadow hover:shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Properties.tsx:48:13",
						"data-prohibitions": "[editContent]",
						className: "aspect-video w-full bg-muted relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							"data-uid": "src/pages/Properties.tsx:49:15",
							"data-prohibitions": "[editContent]",
							src: property.image,
							alt: property.title,
							className: "w-full h-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Properties.tsx:54:15",
							"data-prohibitions": "[editContent]",
							className: "absolute top-2 right-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/Properties.tsx:55:17",
								"data-prohibitions": "[editContent]",
								variant: "secondary",
								className: "shadow-sm backdrop-blur-md bg-background/80",
								children: property.status
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Properties.tsx:60:13",
						"data-prohibitions": "[editContent]",
						className: "p-4 flex flex-col flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/Properties.tsx:61:15",
								"data-prohibitions": "[editContent]",
								className: "font-semibold text-lg line-clamp-1 mb-1",
								children: property.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Properties.tsx:62:15",
								"data-prohibitions": "[editContent]",
								className: "flex items-start gap-1.5 text-sm text-muted-foreground mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									"data-uid": "src/pages/Properties.tsx:63:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 shrink-0 mt-0.5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Properties.tsx:64:17",
									"data-prohibitions": "[editContent]",
									className: "line-clamp-2",
									children: property.address
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Properties.tsx:66:15",
								"data-prohibitions": "[editContent]",
								className: "mt-auto pt-4 border-t flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/Properties.tsx:67:17",
									"data-prohibitions": "[editContent]",
									className: "text-xs font-medium text-muted-foreground",
									children: ["ID: ", property.id]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/Properties.tsx:68:17",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "sm",
									asChild: true,
									className: "gap-1 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										"data-uid": "src/pages/Properties.tsx:69:19",
										"data-prohibitions": "[]",
										to: `/properties/${property.id}/dossier`,
										children: ["Ver Dossiê ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
											"data-uid": "src/pages/Properties.tsx:70:32",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										})]
									})
								})]
							})
						]
					})]
				}, property.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Properties.tsx:78:11",
					"data-prohibitions": "[]",
					className: "col-span-full py-12 text-center text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
						"data-uid": "src/pages/Properties.tsx:79:13",
						"data-prohibitions": "[editContent]",
						className: "w-12 h-12 mx-auto mb-3 opacity-20"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Properties.tsx:80:13",
						"data-prohibitions": "[]",
						children: "Nenhum imóvel encontrado."
					})]
				})]
			})
		]
	});
}
//#endregion
export { Properties as default };

//# sourceMappingURL=Properties-DOMLgUbo.js.map