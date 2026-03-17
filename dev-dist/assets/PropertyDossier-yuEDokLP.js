import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CvuQPfAM.js";
import "./react-dom-cDMCl7Pc.js";
import { n as useToast } from "./use-toast-cNG4ZhbD.js";
import { t as cn } from "./utils-Di8JFY1h.js";
import { i as cva, t as Button } from "./button-ChEhZCqG.js";
import { t as ArrowLeft } from "./arrow-left-BVQskZSO.js";
import { t as Building2 } from "./building-2-iFJZP_7W.js";
import { t as Download } from "./download-CTBeqf-X.js";
import { t as FolderArchive } from "./folder-archive-DR0JwSl8.js";
import { t as TriangleAlert } from "./triangle-alert-D_p9iPS7.js";
import { i as useMainStore } from "./main--VuJdRjK.js";
import { X as Clock, it as useParams, q as FileText, rt as useNavigate, t as Badge } from "./index-CZK7Ip52.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-D7FMgv39.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DkS38AD4.js";
import { n as useContractsStore } from "./contracts-5WJu1Yy8.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Df3ShXAF.js";
import { n as useDocumentsStore, t as getDocumentStatus } from "./documents-CCjjNFeo.js";
//#region src/components/ui/alert.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var alertVariants = cva("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", {
	variants: { variant: {
		default: "bg-background text-foreground",
		destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
	} },
	defaultVariants: { variant: "default" }
});
var Alert = import_react.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert.tsx:27:3",
	"data-prohibitions": "[editContent]",
	ref,
	role: "alert",
	className: cn(alertVariants({ variant }), className),
	...props
}));
Alert.displayName = "Alert";
var AlertTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
	"data-uid": "src/components/ui/alert.tsx:33:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("mb-1 font-medium leading-none tracking-tight", className),
	...props
}));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert.tsx:46:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm [&_p]:leading-relaxed", className),
	...props
}));
AlertDescription.displayName = "AlertDescription";
//#endregion
//#region src/pages/PropertyDossier.tsx
var pastContracts = [{
	id: "CTR-2021-001",
	tenant: "Empresa Fictícia SA",
	period: "01/01/2021 - 31/12/2022"
}, {
	id: "CTR-2018-045",
	tenant: "Roberto Carlos",
	period: "15/03/2018 - 10/12/2020"
}];
function PropertyDossier() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { properties, maintenanceTickets } = useMainStore();
	const { contracts } = useContractsStore();
	const { documents } = useDocumentsStore();
	const { toast } = useToast();
	const property = properties.find((p) => p.id === id);
	const activeContract = contracts.find((c) => c.propertyId === id && ["Ativo", "Aguardando Renovação"].includes(c.status));
	const propertyTickets = maintenanceTickets.filter((t) => t.propertyId === id);
	const propertyDocs = documents.filter((d) => d.propertyId === id);
	const alertingDocs = propertyDocs.filter((d) => {
		const status = getDocumentStatus(d.expirationDate);
		return status === "Expirado" || status === "Vencendo em breve";
	});
	if (!property) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/PropertyDossier.tsx:59:7",
		"data-prohibitions": "[]",
		className: "p-8 text-center text-muted-foreground",
		children: "Imóvel não encontrado na base de dados."
	});
	const handleDownload = (doc) => {
		toast({
			title: "Acessando SharePoint",
			description: `Iniciando download seguro de ${doc}...`
		});
	};
	const getStatusBadge = (status) => {
		switch (status) {
			case "Regular": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/PropertyDossier.tsx:71:16",
				"data-prohibitions": "[editContent]",
				className: "bg-emerald-500 hover:bg-emerald-600",
				children: status
			});
			case "Vencendo em breve": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/PropertyDossier.tsx:73:16",
				"data-prohibitions": "[editContent]",
				className: "bg-amber-500 hover:bg-amber-600",
				children: status
			});
			case "Expirado": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/PropertyDossier.tsx:75:16",
				"data-prohibitions": "[editContent]",
				variant: "destructive",
				children: status
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/pages/PropertyDossier.tsx:77:16",
				"data-prohibitions": "[]",
				className: "text-xs text-muted-foreground",
				children: "-"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/PropertyDossier.tsx:82:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 max-w-6xl mx-auto animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/PropertyDossier.tsx:83:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/PropertyDossier.tsx:84:9",
					"data-prohibitions": "[editContent]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/PropertyDossier.tsx:85:11",
							"data-prohibitions": "[]",
							variant: "ghost",
							onClick: () => navigate(-1),
							className: "-ml-4 mb-2 text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								"data-uid": "src/pages/PropertyDossier.tsx:90:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Voltar para Imóveis"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							"data-uid": "src/pages/PropertyDossier.tsx:92:11",
							"data-prohibitions": "[editContent]",
							className: "text-3xl font-bold flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderArchive, {
									"data-uid": "src/pages/PropertyDossier.tsx:93:13",
									"data-prohibitions": "[editContent]",
									className: "text-primary w-8 h-8"
								}),
								" Dossiê Digital: ",
								property.title
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/PropertyDossier.tsx:95:11",
							"data-prohibitions": "[editContent]",
							className: "text-muted-foreground mt-1",
							children: property.address
						})
					]
				})
			}),
			alertingDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				"data-uid": "src/pages/PropertyDossier.tsx:100:9",
				"data-prohibitions": "[editContent]",
				variant: "destructive",
				className: "border-red-500/50 bg-red-50 text-red-900",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						"data-uid": "src/pages/PropertyDossier.tsx:101:11",
						"data-prohibitions": "[editContent]",
						className: "h-5 w-5 text-red-600"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
						"data-uid": "src/pages/PropertyDossier.tsx:102:11",
						"data-prohibitions": "[]",
						className: "text-red-800 font-bold",
						children: "Atenção: Validade de Documentos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
						"data-uid": "src/pages/PropertyDossier.tsx:105:11",
						"data-prohibitions": "[editContent]",
						children: [
							"Este dossiê possui ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								"data-uid": "src/pages/PropertyDossier.tsx:106:32",
								"data-prohibitions": "[editContent]",
								children: [alertingDocs.length, " documento(s)"]
							}),
							" com vencimento próximo ou já expirados. Acesse a aba \"Cofre de Documentos (GED)\" para regularizar."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/PropertyDossier.tsx:112:7",
				"data-prohibitions": "[editContent]",
				defaultValue: "overview",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/PropertyDossier.tsx:113:9",
						"data-prohibitions": "[editContent]",
						className: "bg-muted/50 border flex flex-wrap h-auto mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/PropertyDossier.tsx:114:11",
								"data-prohibitions": "[]",
								value: "overview",
								children: "Visão Geral"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								"data-uid": "src/pages/PropertyDossier.tsx:115:11",
								"data-prohibitions": "[editContent]",
								value: "ged",
								children: ["Cofre de Documentos (GED)", alertingDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/PropertyDossier.tsx:118:15",
									"data-prohibitions": "[editContent]",
									className: "ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] text-white",
									children: alertingDocs.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/PropertyDossier.tsx:123:11",
								"data-prohibitions": "[]",
								value: "contracts",
								children: "Linha do Tempo de Contratos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/PropertyDossier.tsx:124:11",
								"data-prohibitions": "[]",
								value: "maintenance",
								children: "Relatórios de Manutenção"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/PropertyDossier.tsx:127:9",
						"data-prohibitions": "[editContent]",
						value: "overview",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/PropertyDossier.tsx:128:11",
							"data-prohibitions": "[editContent]",
							className: "grid md:grid-cols-2 gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/PropertyDossier.tsx:129:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/PropertyDossier.tsx:130:15",
									"data-prohibitions": "[]",
									className: "pb-3 border-b mb-3 bg-muted/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/PropertyDossier.tsx:131:17",
										"data-prohibitions": "[]",
										className: "text-lg",
										children: "Informações Cadastrais"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/PropertyDossier.tsx:133:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/PropertyDossier.tsx:134:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/PropertyDossier.tsx:135:19",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "Código Único (ID)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/PropertyDossier.tsx:136:19",
												"data-prohibitions": "[editContent]",
												className: "font-mono font-medium",
												children: property.id
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/PropertyDossier.tsx:138:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/PropertyDossier.tsx:139:19",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "Status Atual do Processo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/PropertyDossier.tsx:140:19",
												"data-prohibitions": "[editContent]",
												className: "mt-1",
												children: property.status
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/PropertyDossier.tsx:142:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/PropertyDossier.tsx:143:19",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "Tipo de Imóvel"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/PropertyDossier.tsx:144:19",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: property.type
											})]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/PropertyDossier.tsx:149:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/PropertyDossier.tsx:150:15",
									"data-prohibitions": "[]",
									className: "pb-3 border-b mb-3 bg-primary/5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/PropertyDossier.tsx:151:17",
										"data-prohibitions": "[]",
										className: "text-lg text-primary",
										children: "Situação Contratual Vigente"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/PropertyDossier.tsx:153:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/PropertyDossier.tsx:154:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/PropertyDossier.tsx:155:19",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "Inquilino Atual"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/PropertyDossier.tsx:156:19",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: activeContract?.tenantName || property.tenant || "Desocupado / Em Processo"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/PropertyDossier.tsx:160:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/PropertyDossier.tsx:161:19",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "Vencimento do Contrato"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/PropertyDossier.tsx:162:19",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: activeContract?.expirationDate ? new Date(activeContract.expirationDate).toLocaleDateString("pt-BR") : "Não aplicável"
											})]
										}),
										activeContract && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/PropertyDossier.tsx:169:19",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/PropertyDossier.tsx:170:21",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "ID do Contrato"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/PropertyDossier.tsx:171:21",
												"data-prohibitions": "[editContent]",
												className: "font-mono text-sm",
												children: activeContract.id
											})]
										})
									]
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/PropertyDossier.tsx:179:9",
						"data-prohibitions": "[editContent]",
						value: "ged",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/PropertyDossier.tsx:180:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/PropertyDossier.tsx:181:13",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									"data-uid": "src/pages/PropertyDossier.tsx:182:15",
									"data-prohibitions": "[]",
									children: "Arquivos Sincronizados - SharePoint"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									"data-uid": "src/pages/PropertyDossier.tsx:183:15",
									"data-prohibitions": "[]",
									children: "Acesse os documentos classificados por pastas setoriais e monitore validades extraídas dos metadados."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/PropertyDossier.tsx:188:13",
								"data-prohibitions": "[editContent]",
								className: "p-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
									"data-uid": "src/pages/PropertyDossier.tsx:189:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										"data-uid": "src/pages/PropertyDossier.tsx:190:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/PropertyDossier.tsx:191:19",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/PropertyDossier.tsx:192:21",
													"data-prohibitions": "[]",
													children: "Arquivo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/PropertyDossier.tsx:193:21",
													"data-prohibitions": "[]",
													children: "Categoria / Pasta"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/PropertyDossier.tsx:194:21",
													"data-prohibitions": "[]",
													children: "Vencimento"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/PropertyDossier.tsx:195:21",
													"data-prohibitions": "[]",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/PropertyDossier.tsx:196:21",
													"data-prohibitions": "[]",
													className: "text-right",
													children: "Ação"
												})
											]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
										"data-uid": "src/pages/PropertyDossier.tsx:199:17",
										"data-prohibitions": "[editContent]",
										children: [propertyDocs.map((d) => {
											const status = getDocumentStatus(d.expirationDate);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
												"data-uid": "src/pages/PropertyDossier.tsx:203:23",
												"data-prohibitions": "[editContent]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/PropertyDossier.tsx:204:25",
														"data-prohibitions": "[editContent]",
														className: "font-medium",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/PropertyDossier.tsx:205:27",
															"data-prohibitions": "[editContent]",
															className: "flex items-center gap-2",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
																	"data-uid": "src/pages/PropertyDossier.tsx:206:29",
																	"data-prohibitions": "[editContent]",
																	className: "w-4 h-4 text-blue-500"
																}),
																" ",
																d.name
															]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/PropertyDossier.tsx:209:25",
														"data-prohibitions": "[editContent]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															"data-uid": "src/pages/PropertyDossier.tsx:210:27",
															"data-prohibitions": "[editContent]",
															variant: "outline",
															children: d.category
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/PropertyDossier.tsx:212:25",
														"data-prohibitions": "[editContent]",
														className: "text-muted-foreground",
														children: d.expirationDate ? new Date(d.expirationDate).toLocaleDateString("pt-BR") : "-"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/PropertyDossier.tsx:217:25",
														"data-prohibitions": "[editContent]",
														children: getStatusBadge(status)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/PropertyDossier.tsx:218:25",
														"data-prohibitions": "[]",
														className: "text-right",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															"data-uid": "src/pages/PropertyDossier.tsx:219:27",
															"data-prohibitions": "[]",
															size: "sm",
															variant: "ghost",
															onClick: () => handleDownload(d.name),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
																"data-uid": "src/pages/PropertyDossier.tsx:220:29",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4"
															})
														})
													})
												]
											}, d.id);
										}), propertyDocs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
											"data-uid": "src/pages/PropertyDossier.tsx:227:21",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/PropertyDossier.tsx:228:23",
												"data-prohibitions": "[]",
												colSpan: 5,
												className: "text-center py-8 text-muted-foreground",
												children: "Nenhum documento sincronizado no SharePoint para este imóvel."
											})
										})]
									})]
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/PropertyDossier.tsx:239:9",
						"data-prohibitions": "[editContent]",
						value: "contracts",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/PropertyDossier.tsx:240:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.25rem] before:h-full before:w-0.5 before:bg-border pt-4 ml-2",
							children: [activeContract && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/PropertyDossier.tsx:242:15",
								"data-prohibitions": "[editContent]",
								className: "relative flex items-start gap-6 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/PropertyDossier.tsx:243:17",
									"data-prohibitions": "[]",
									className: "flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white z-10 shrink-0 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
										"data-uid": "src/pages/PropertyDossier.tsx:244:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/PropertyDossier.tsx:246:17",
									"data-prohibitions": "[editContent]",
									className: "flex-1 border-primary/50 bg-primary/5 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
										"data-uid": "src/pages/PropertyDossier.tsx:247:19",
										"data-prohibitions": "[editContent]",
										className: "p-4 sm:p-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
											"data-uid": "src/pages/PropertyDossier.tsx:248:21",
											"data-prohibitions": "[editContent]",
											className: "text-lg",
											children: ["Contrato Vigente: ", activeContract.tenantName]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
											"data-uid": "src/pages/PropertyDossier.tsx:251:21",
											"data-prohibitions": "[editContent]",
											children: [
												"Status: ",
												activeContract.status,
												" | ID: ",
												activeContract.id
											]
										})]
									})
								})]
							}), pastContracts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/PropertyDossier.tsx:259:15",
								"data-prohibitions": "[editContent]",
								className: "relative flex items-start gap-6 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/PropertyDossier.tsx:260:17",
									"data-prohibitions": "[]",
									className: "flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted text-muted-foreground z-10 shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
										"data-uid": "src/pages/PropertyDossier.tsx:261:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/PropertyDossier.tsx:263:17",
									"data-prohibitions": "[editContent]",
									className: "flex-1 opacity-80 hover:opacity-100 transition-opacity",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
										"data-uid": "src/pages/PropertyDossier.tsx:264:19",
										"data-prohibitions": "[editContent]",
										className: "p-4 sm:p-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
											"data-uid": "src/pages/PropertyDossier.tsx:265:21",
											"data-prohibitions": "[editContent]",
											className: "text-lg",
											children: ["Inquilino Anterior: ", c.tenant]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
											"data-uid": "src/pages/PropertyDossier.tsx:266:21",
											"data-prohibitions": "[editContent]",
											children: [
												"Período: ",
												c.period,
												" | ID Histórico: ",
												c.id
											]
										})]
									})
								})]
							}, c.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/PropertyDossier.tsx:276:9",
						"data-prohibitions": "[editContent]",
						value: "maintenance",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/PropertyDossier.tsx:277:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-4 md:grid-cols-2",
							children: [propertyTickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/PropertyDossier.tsx:279:15",
								"data-prohibitions": "[editContent]",
								className: "shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/PropertyDossier.tsx:280:17",
									"data-prohibitions": "[editContent]",
									className: "p-4 pb-2 border-b bg-muted/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/PropertyDossier.tsx:281:19",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between items-start mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/PropertyDossier.tsx:282:21",
											"data-prohibitions": "[editContent]",
											variant: t.status === "Concluído" ? "default" : "secondary",
											className: t.status === "Concluído" ? "bg-emerald-500" : "",
											children: t.status
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/PropertyDossier.tsx:288:21",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground",
											children: new Date(t.createdAt).toLocaleDateString("pt-BR")
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
										"data-uid": "src/pages/PropertyDossier.tsx:292:19",
										"data-prohibitions": "[editContent]",
										className: "text-base",
										children: [t.item, " - Relatório de Reparo"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/PropertyDossier.tsx:294:17",
									"data-prohibitions": "[editContent]",
									className: "p-4 pt-4 space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/PropertyDossier.tsx:295:19",
										"data-prohibitions": "[editContent]",
										className: "bg-destructive/5 border border-destructive/20 p-3 rounded text-sm text-destructive-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/pages/PropertyDossier.tsx:296:21",
												"data-prohibitions": "[]",
												className: "block mb-1",
												children: "Nota da Vistoria (Danificado):"
											}),
											" ",
											t.notes
										]
									}), t.photo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/PropertyDossier.tsx:299:21",
										"data-prohibitions": "[]",
										className: "w-full h-40 rounded-md overflow-hidden bg-muted relative border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											"data-uid": "src/pages/PropertyDossier.tsx:300:23",
											"data-prohibitions": "[editContent]",
											src: t.photo,
											className: "w-full h-full object-cover",
											alt: "Evidência Fotográfica"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/PropertyDossier.tsx:305:23",
											"data-prohibitions": "[]",
											className: "absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm",
											children: "Foto Evidência"
										})]
									})]
								})]
							}, t.id)), propertyTickets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/PropertyDossier.tsx:314:15",
								"data-prohibitions": "[]",
								className: "col-span-full p-12 text-center text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {
									"data-uid": "src/pages/PropertyDossier.tsx:315:17",
									"data-prohibitions": "[editContent]",
									className: "w-10 h-10 mx-auto mb-3 opacity-20"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/PropertyDossier.tsx:316:17",
									"data-prohibitions": "[]",
									children: "Nenhum relatório de manutenção registrado no histórico deste imóvel."
								})]
							})]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { PropertyDossier as default };

//# sourceMappingURL=PropertyDossier-yuEDokLP.js.map