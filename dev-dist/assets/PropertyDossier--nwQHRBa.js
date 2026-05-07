import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-BcW3sjWS.js";
import { t as ArrowLeft } from "./arrow-left-Dd8rqD3N.js";
import { t as DocumentViewer } from "./DocumentViewer-CWqnb--_.js";
import { t as MapPin } from "./map-pin-BuAm7Ujq.js";
import { t as Button } from "./button-DZFv31v6.js";
import "./client-DbPPqM1c.js";
import { i as useMainStore } from "./main-DA0wiXaK.js";
import "./users-JyPvLL0D.js";
import { o as useContractsStore } from "./keys-DkDcgPTP.js";
import "./entities-pTkigeh5.js";
import { _t as useParams, mt as Link, rt as FileText, st as ClipboardCheck, t as Badge, ut as Building } from "./index--6YWV7Bs.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DZXI3GJ_.js";
import "./label-CZKY3LJi.js";
import "./dialog-4VTztVvk.js";
import "./m365-CdBCqFdo.js";
import "./textarea-D3lWDJFw.js";
//#region src/pages/PropertyDossier.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function PropertyDossier() {
	const { id } = useParams();
	const { properties, inspectionsData, sharepoint } = useMainStore();
	const { contracts } = useContractsStore();
	const [viewDoc, setViewDoc] = (0, import_react.useState)(null);
	const property = properties.find((p) => p.id === id);
	const propertyContracts = contracts.filter((c) => c.propertyId === id);
	const inspection = id ? inspectionsData[id] : null;
	if (!property) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/PropertyDossier.tsx:23:7",
		"data-prohibitions": "[]",
		className: "flex flex-col items-center justify-center py-20 space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			"data-uid": "src/pages/PropertyDossier.tsx:24:9",
			"data-prohibitions": "[]",
			className: "text-2xl font-bold",
			children: "Imóvel não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-uid": "src/pages/PropertyDossier.tsx:25:9",
			"data-prohibitions": "[]",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				"data-uid": "src/pages/PropertyDossier.tsx:26:11",
				"data-prohibitions": "[]",
				to: "/properties",
				children: "Voltar para Imóveis"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/PropertyDossier.tsx:33:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 max-w-5xl mx-auto animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/PropertyDossier.tsx:34:7",
				"data-prohibitions": "[editContent]",
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/PropertyDossier.tsx:35:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "icon",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-uid": "src/pages/PropertyDossier.tsx:36:11",
						"data-prohibitions": "[]",
						to: "/properties",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							"data-uid": "src/pages/PropertyDossier.tsx:37:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/PropertyDossier.tsx:40:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/PropertyDossier.tsx:41:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							"data-uid": "src/pages/PropertyDossier.tsx:42:13",
							"data-prohibitions": "[editContent]",
							className: "text-3xl font-bold tracking-tight",
							children: property.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							"data-uid": "src/pages/PropertyDossier.tsx:43:13",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							className: "bg-primary/5",
							children: property.status
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/PropertyDossier.tsx:47:11",
						"data-prohibitions": "[editContent]",
						className: "text-muted-foreground flex items-center gap-1 mt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								"data-uid": "src/pages/PropertyDossier.tsx:48:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}),
							" ",
							property.address
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/PropertyDossier.tsx:53:7",
				"data-prohibitions": "[editContent]",
				className: "grid md:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/PropertyDossier.tsx:54:9",
					"data-prohibitions": "[editContent]",
					className: "md:col-span-1 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/PropertyDossier.tsx:55:11",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/PropertyDossier.tsx:56:13",
							"data-prohibitions": "[editContent]",
							className: "p-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								"data-uid": "src/pages/PropertyDossier.tsx:57:15",
								"data-prohibitions": "[editContent]",
								src: property.image,
								alt: property.title,
								className: "w-full aspect-square object-cover rounded-t-lg"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/PropertyDossier.tsx:62:15",
								"data-prohibitions": "[editContent]",
								className: "p-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/PropertyDossier.tsx:63:17",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between items-center text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/PropertyDossier.tsx:64:19",
											"data-prohibitions": "[]",
											className: "text-muted-foreground",
											children: "ID do Sistema:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/PropertyDossier.tsx:65:19",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: property.id
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/PropertyDossier.tsx:67:17",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between items-center text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/PropertyDossier.tsx:68:19",
											"data-prohibitions": "[]",
											className: "text-muted-foreground",
											children: "Tipo:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/PropertyDossier.tsx:69:19",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: property.type
										})]
									}),
									property.tenant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/PropertyDossier.tsx:72:19",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between items-center text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/PropertyDossier.tsx:73:21",
											"data-prohibitions": "[]",
											className: "text-muted-foreground",
											children: "Locatário:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/PropertyDossier.tsx:74:21",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: property.tenant
										})]
									}),
									property.rentValue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/PropertyDossier.tsx:78:19",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between items-center text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/PropertyDossier.tsx:79:21",
											"data-prohibitions": "[]",
											className: "text-muted-foreground",
											children: "Valor (Locação):"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/PropertyDossier.tsx:80:21",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: new Intl.NumberFormat("pt-BR", {
												style: "currency",
												currency: "BRL"
											}).format(property.rentValue)
										})]
									})
								]
							})]
						})
					}), inspection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/PropertyDossier.tsx:93:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/PropertyDossier.tsx:94:15",
							"data-prohibitions": "[]",
							className: "pb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/PropertyDossier.tsx:95:17",
								"data-prohibitions": "[]",
								className: "text-lg flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, {
									"data-uid": "src/pages/PropertyDossier.tsx:96:19",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 text-primary"
								}), " Dados de Vistoria"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/PropertyDossier.tsx:99:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/PropertyDossier.tsx:100:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/PropertyDossier.tsx:101:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground block text-xs",
									children: "Paredes e Pintura:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/PropertyDossier.tsx:102:19",
									"data-prohibitions": "[editContent]",
									className: "font-medium",
									children: inspection.wallCondition
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/PropertyDossier.tsx:104:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/PropertyDossier.tsx:105:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground block text-xs",
									children: "Móveis e Estrutura:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/PropertyDossier.tsx:106:19",
									"data-prohibitions": "[editContent]",
									className: "font-medium",
									children: inspection.furnitureNotes
								})]
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/PropertyDossier.tsx:113:9",
					"data-prohibitions": "[editContent]",
					className: "md:col-span-2 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/PropertyDossier.tsx:114:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/PropertyDossier.tsx:115:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/PropertyDossier.tsx:116:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
									"data-uid": "src/pages/PropertyDossier.tsx:117:17",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 text-primary"
								}), " Documentos no SharePoint"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
								"data-uid": "src/pages/PropertyDossier.tsx:119:15",
								"data-prohibitions": "[editContent]",
								children: [
									"Arquivos sincronizados na biblioteca corporativa (",
									sharepoint.primaryDomain || "Não configurado",
									")"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/PropertyDossier.tsx:124:13",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/PropertyDossier.tsx:125:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-3",
								children: [propertyContracts.map((contract) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/PropertyDossier.tsx:127:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/PropertyDossier.tsx:131:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/PropertyDossier.tsx:132:23",
											"data-prohibitions": "[]",
											className: "bg-primary/10 p-2 rounded-md shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
												"data-uid": "src/pages/PropertyDossier.tsx:133:25",
												"data-prohibitions": "[editContent]",
												className: "w-5 h-5 text-primary"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/PropertyDossier.tsx:135:23",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/PropertyDossier.tsx:136:25",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm line-clamp-1",
												children: contract.documentName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/PropertyDossier.tsx:137:25",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-2 text-xs text-muted-foreground mt-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/pages/PropertyDossier.tsx:138:27",
													"data-prohibitions": "[editContent]",
													variant: "secondary",
													className: "text-[10px] px-1.5 py-0",
													children: contract.status
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/PropertyDossier.tsx:141:27",
													"data-prohibitions": "[editContent]",
													children: ["Modificado em ", new Date(contract.updatedAt).toLocaleDateString("pt-BR")]
												})]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/PropertyDossier.tsx:147:21",
										"data-prohibitions": "[]",
										variant: "outline",
										size: "sm",
										onClick: () => setViewDoc(contract.documentName),
										children: "Abrir"
									})]
								}, contract.id)), propertyContracts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/PropertyDossier.tsx:157:19",
									"data-prohibitions": "[]",
									className: "text-center py-6 text-muted-foreground border border-dashed rounded-lg",
									children: "Nenhum contrato ou documento vinculado a este dossiê."
								})]
							})
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewer, {
				"data-uid": "src/pages/PropertyDossier.tsx:167:7",
				"data-prohibitions": "[editContent]",
				open: !!viewDoc,
				onClose: () => setViewDoc(null),
				docName: viewDoc
			})
		]
	});
}
//#endregion
export { PropertyDossier as default };

//# sourceMappingURL=PropertyDossier--nwQHRBa.js.map