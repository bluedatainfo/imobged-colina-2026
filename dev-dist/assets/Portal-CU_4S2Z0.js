import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-IQxnG6u7.js";
import { t as Download } from "./download-DNswiS8o.js";
import { t as DocumentViewer } from "./DocumentViewer-xFKE1vfl.js";
import { t as Server } from "./server-CqTfU6J5.js";
import { t as Button } from "./button-DI75GKXN.js";
import "./client-BWrqzmk9.js";
import { i as useMainStore } from "./main-MCjtWH0Q.js";
import "./users-GrHHYR3T.js";
import { o as useContractsStore } from "./keys-DwzNq5O0.js";
import "./entities-Df_ukVF8.js";
import { H as User, et as House, rt as FileText, t as Badge } from "./index-T3Qv2Vio.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-C664G4yu.js";
import "./label-p96YWrk6.js";
import "./dialog-9nuP9XS0.js";
import "./m365-DB4yadv4.js";
import "./textarea-DxYDYLCb.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-ozwtOsot.js";
//#region src/pages/Portal.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Portal() {
	const { agencyProfile, properties } = useMainStore();
	const { contracts } = useContractsStore();
	const [viewDoc, setViewDoc] = (0, import_react.useState)(null);
	const tenantContracts = contracts.filter((c) => c.status === "Ativo" || c.status === "Aguardando Renovação");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Portal.tsx:22:5",
		"data-prohibitions": "[editContent]",
		className: "min-h-screen bg-muted/20 flex flex-col font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				"data-uid": "src/pages/Portal.tsx:24:7",
				"data-prohibitions": "[editContent]",
				className: "h-20 shadow-md flex items-center px-4 md:px-8 text-white sticky top-0 z-10",
				style: { backgroundColor: agencyProfile.primaryColor },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Portal.tsx:28:9",
					"data-prohibitions": "[editContent]",
					className: "max-w-6xl mx-auto w-full flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Portal.tsx:29:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-4",
						children: [agencyProfile.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							"data-uid": "src/pages/Portal.tsx:31:15",
							"data-prohibitions": "[editContent]",
							src: agencyProfile.logo,
							alt: "Logo",
							className: "h-10 bg-white/10 p-1 rounded backdrop-blur-sm"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Portal.tsx:37:15",
							"data-prohibitions": "[]",
							className: "h-10 w-10 bg-white/20 rounded flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
								"data-uid": "src/pages/Portal.tsx:38:17",
								"data-prohibitions": "[editContent]",
								className: "w-6 h-6 text-white"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Portal.tsx:41:13",
							"data-prohibitions": "[editContent]",
							className: "hidden sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								"data-uid": "src/pages/Portal.tsx:42:15",
								"data-prohibitions": "[editContent]",
								className: "font-bold text-xl leading-tight",
								children: agencyProfile.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Portal.tsx:43:15",
								"data-prohibitions": "[]",
								className: "text-xs text-white/80 font-medium tracking-wide uppercase",
								children: "Portal de Relacionamento"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Portal.tsx:48:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Portal.tsx:49:13",
							"data-prohibitions": "[]",
							className: "text-right hidden md:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Portal.tsx:50:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Bem-vindo(a), Cliente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Portal.tsx:51:15",
								"data-prohibitions": "[]",
								className: "text-xs text-white/70",
								children: "Acesso Seguro"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Portal.tsx:53:13",
							"data-prohibitions": "[]",
							className: "h-10 w-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
								"data-uid": "src/pages/Portal.tsx:54:15",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5"
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				"data-uid": "src/pages/Portal.tsx:60:7",
				"data-prohibitions": "[editContent]",
				className: "flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 animate-fade-in-up",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					"data-uid": "src/pages/Portal.tsx:61:9",
					"data-prohibitions": "[editContent]",
					defaultValue: "tenant",
					className: "space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							"data-uid": "src/pages/Portal.tsx:62:11",
							"data-prohibitions": "[]",
							className: "bg-background border shadow-sm h-14 p-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/Portal.tsx:63:13",
								"data-prohibitions": "[]",
								value: "tenant",
								className: "h-full px-6 text-base data-[state=active]:bg-muted",
								children: "Sou Inquilino"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/Portal.tsx:69:13",
								"data-prohibitions": "[]",
								value: "owner",
								className: "h-full px-6 text-base data-[state=active]:bg-muted",
								children: "Sou Proprietário"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							"data-uid": "src/pages/Portal.tsx:77:11",
							"data-prohibitions": "[editContent]",
							value: "tenant",
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Portal.tsx:78:13",
								"data-prohibitions": "[]",
								className: "mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									"data-uid": "src/pages/Portal.tsx:79:15",
									"data-prohibitions": "[]",
									className: "text-2xl font-bold",
									children: "Meus Contratos de Locação"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/Portal.tsx:80:15",
									"data-prohibitions": "[]",
									className: "text-muted-foreground",
									children: "Acesse seus documentos e via assinada digitalmente."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Portal.tsx:85:13",
								"data-prohibitions": "[editContent]",
								className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
								children: [tenantContracts.map((contract) => {
									const property = properties.find((p) => p.id === contract.propertyId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										"data-uid": "src/pages/Portal.tsx:89:19",
										"data-prohibitions": "[editContent]",
										className: "hover:shadow-md transition-shadow",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
											"data-uid": "src/pages/Portal.tsx:90:21",
											"data-prohibitions": "[editContent]",
											className: "pb-3 border-b bg-muted/10",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/Portal.tsx:91:23",
													"data-prohibitions": "[editContent]",
													className: "flex justify-between items-start",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/Portal.tsx:92:25",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: "bg-background border-primary text-primary",
														style: {
															color: agencyProfile.primaryColor,
															borderColor: agencyProfile.primaryColor
														},
														children: contract.status
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
														"data-uid": "src/pages/Portal.tsx:102:25",
														"data-prohibitions": "[editContent]",
														className: "h-5 w-5 text-muted-foreground opacity-50"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
													"data-uid": "src/pages/Portal.tsx:104:23",
													"data-prohibitions": "[editContent]",
													className: "mt-4 text-lg line-clamp-1",
													children: property?.title || "Imóvel"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
													"data-uid": "src/pages/Portal.tsx:107:23",
													"data-prohibitions": "[editContent]",
													className: "line-clamp-1",
													children: property?.address
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
											"data-uid": "src/pages/Portal.tsx:111:21",
											"data-prohibitions": "[editContent]",
											className: "pt-4 space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Portal.tsx:112:23",
												"data-prohibitions": "[editContent]",
												className: "text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													"data-uid": "src/pages/Portal.tsx:113:25",
													"data-prohibitions": "[editContent]",
													className: "text-muted-foreground",
													children: [
														"ID Contrato:",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/Portal.tsx:115:27",
															"data-prohibitions": "[editContent]",
															className: "font-mono text-foreground",
															children: contract.id
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													"data-uid": "src/pages/Portal.tsx:117:25",
													"data-prohibitions": "[editContent]",
													className: "text-muted-foreground",
													children: [
														"Inquilino Titular:",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/Portal.tsx:119:27",
															"data-prohibitions": "[editContent]",
															className: "font-medium text-foreground",
															children: contract.tenantName
														})
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												"data-uid": "src/pages/Portal.tsx:122:23",
												"data-prohibitions": "[]",
												className: "w-full text-white hover:opacity-90 transition-opacity",
												style: { backgroundColor: agencyProfile.primaryColor },
												onClick: () => setViewDoc(contract.documentName),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
													"data-uid": "src/pages/Portal.tsx:127:25",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 mr-2"
												}), " Baixar PDF Assinado"]
											})]
										})]
									}, contract.id);
								}), tenantContracts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/Portal.tsx:134:17",
									"data-prohibitions": "[]",
									className: "col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg bg-background",
									children: "Nenhum contrato ativo encontrado no seu perfil."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							"data-uid": "src/pages/Portal.tsx:141:11",
							"data-prohibitions": "[editContent]",
							value: "owner",
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Portal.tsx:142:13",
								"data-prohibitions": "[]",
								className: "mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									"data-uid": "src/pages/Portal.tsx:143:15",
									"data-prohibitions": "[]",
									className: "text-2xl font-bold",
									children: "Meus Imóveis"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/Portal.tsx:144:15",
									"data-prohibitions": "[]",
									className: "text-muted-foreground",
									children: "Transparência total: veja o status do seu patrimônio nos setores da imobiliária."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Portal.tsx:149:13",
								"data-prohibitions": "[editContent]",
								className: "space-y-4",
								children: properties.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/Portal.tsx:151:17",
									"data-prohibitions": "[editContent]",
									className: "overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Portal.tsx:152:19",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col md:flex-row",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Portal.tsx:153:21",
											"data-prohibitions": "[editContent]",
											className: "md:w-64 h-48 md:h-auto shrink-0 relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												"data-uid": "src/pages/Portal.tsx:154:23",
												"data-prohibitions": "[editContent]",
												src: property.image,
												alt: "Imóvel",
												className: "w-full h-full object-cover"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/Portal.tsx:159:23",
												"data-prohibitions": "[editContent]",
												className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/Portal.tsx:160:25",
													"data-prohibitions": "[editContent]",
													className: "text-white",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														"data-uid": "src/pages/Portal.tsx:161:27",
														"data-prohibitions": "[editContent]",
														className: "font-bold text-lg line-clamp-1",
														children: property.title
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														"data-uid": "src/pages/Portal.tsx:162:27",
														"data-prohibitions": "[editContent]",
														className: "text-xs opacity-90",
														children: property.type
													})]
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Portal.tsx:166:21",
											"data-prohibitions": "[editContent]",
											className: "flex-1 p-6 flex flex-col justify-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Portal.tsx:167:23",
												"data-prohibitions": "[]",
												className: "flex items-center gap-2 text-sm text-muted-foreground mb-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, {
													"data-uid": "src/pages/Portal.tsx:168:25",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4"
												}), "Status de Processamento por Setor (SharePoint)"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Portal.tsx:172:23",
												"data-prohibitions": "[editContent]",
												className: "grid grid-cols-2 md:grid-cols-4 gap-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/Portal.tsx:173:25",
														"data-prohibitions": "[]",
														className: "bg-muted p-3 rounded-md text-center",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															"data-uid": "src/pages/Portal.tsx:174:27",
															"data-prohibitions": "[]",
															className: "text-xs text-muted-foreground uppercase tracking-wider mb-1",
															children: "Captação"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															"data-uid": "src/pages/Portal.tsx:177:27",
															"data-prohibitions": "[]",
															variant: "outline",
															className: "bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]",
															children: "Concluído"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/Portal.tsx:184:25",
														"data-prohibitions": "[editContent]",
														className: "bg-muted p-3 rounded-md text-center",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															"data-uid": "src/pages/Portal.tsx:185:27",
															"data-prohibitions": "[]",
															className: "text-xs text-muted-foreground uppercase tracking-wider mb-1",
															children: "Vendas/Locação"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															"data-uid": "src/pages/Portal.tsx:188:27",
															"data-prohibitions": "[editContent]",
															variant: "outline",
															className: "bg-blue-50 text-blue-700 border-blue-200 text-[10px] whitespace-nowrap",
															children: property.status === "Disponível para Locação" ? "Anunciado" : "Em Processo"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/Portal.tsx:197:25",
														"data-prohibitions": "[]",
														className: "bg-muted p-3 rounded-md text-center",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															"data-uid": "src/pages/Portal.tsx:198:27",
															"data-prohibitions": "[]",
															className: "text-xs text-muted-foreground uppercase tracking-wider mb-1",
															children: "Jurídico"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															"data-uid": "src/pages/Portal.tsx:201:27",
															"data-prohibitions": "[]",
															variant: "outline",
															className: "bg-gray-100 text-gray-600 border-gray-200 text-[10px]",
															children: "Sem Pendência"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/Portal.tsx:208:25",
														"data-prohibitions": "[]",
														className: "bg-muted p-3 rounded-md text-center",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															"data-uid": "src/pages/Portal.tsx:209:27",
															"data-prohibitions": "[]",
															className: "text-xs text-muted-foreground uppercase tracking-wider mb-1",
															children: "Financeiro"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															"data-uid": "src/pages/Portal.tsx:212:27",
															"data-prohibitions": "[]",
															variant: "outline",
															className: "bg-gray-100 text-gray-600 border-gray-200 text-[10px]",
															children: "Em Dia"
														})]
													})
												]
											})]
										})]
									})
								}, property.id))
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				"data-uid": "src/pages/Portal.tsx:229:7",
				"data-prohibitions": "[editContent]",
				className: "py-6 text-center text-sm text-muted-foreground border-t bg-background mt-12",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					agencyProfile.name,
					". Portal do Cliente Powered by ImobGED."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewer, {
				"data-uid": "src/pages/Portal.tsx:234:7",
				"data-prohibitions": "[editContent]",
				open: !!viewDoc,
				onClose: () => setViewDoc(null),
				docName: viewDoc
			})
		]
	});
}
//#endregion
export { Portal as default };

//# sourceMappingURL=Portal-CU_4S2Z0.js.map