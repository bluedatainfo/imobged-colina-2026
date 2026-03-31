import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-DfXDXNfA.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as ArrowRight } from "./arrow-right-5lAqrHp-.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Bhi7Xfj7.js";
import { t as ExternalLink } from "./external-link-DaNlYeYS.js";
import { t as MapPin } from "./map-pin-B_CYy_Qa.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import "./client-CX_7U15l.js";
import { i as useMainStore, r as mainStore } from "./main-qhkLLA72.js";
import { n as useEntitiesStore } from "./entities-CnJZXM2l.js";
import { $ as House, A as Input, G as Search, Y as LoaderCircle, lt as Building, pt as Link, q as Plus, t as Badge } from "./index-DOglaGbk.js";
import { n as CardContent, t as Card } from "./card-CcQxuH73.js";
import { t as Label } from "./label-DczgnaR7.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DCC-5-Kh.js";
import { n as ScrollBar, t as ScrollArea } from "./scroll-area-Cw8cMjbc.js";
var CloudDownload = createLucideIcon("cloud-download", [
	["path", {
		d: "M12 13v8l-4-4",
		key: "1f5nwf"
	}],
	["path", {
		d: "m12 21 4-4",
		key: "1lfcce"
	}],
	["path", {
		d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284",
		key: "ui1hmy"
	}]
]);
var Tag = createLucideIcon("tag", [["path", {
	d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
	key: "vktsd0"
}], ["circle", {
	cx: "7.5",
	cy: "7.5",
	r: ".5",
	fill: "currentColor",
	key: "kqv944"
}]]);
//#endregion
//#region src/components/NewPropertyDialog.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function NewPropertyDialog({ open, onClose }) {
	const { toast } = useToast();
	const { owners } = useEntitiesStore();
	const [ownerId, setOwnerId] = (0, import_react.useState)("");
	const [loadingProps, setLoadingProps] = (0, import_react.useState)(false);
	const [erpProperties, setErpProperties] = (0, import_react.useState)([]);
	const [selectedProp, setSelectedProp] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!ownerId) {
			setErpProperties([]);
			return;
		}
		const owner = owners.find((o) => o.id === ownerId);
		if (!owner) return;
		let isMounted = true;
		setLoadingProps(true);
		fetch(`http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(owner.fullName)}`).then((res) => res.ok ? res.json() : []).then((data) => {
			if (isMounted) if (!data || data.length === 0) setErpProperties([{
				id: "ERP-" + Math.floor(Math.random() * 1e3),
				title: "Imóvel Exemplo ERP",
				address: owner.fullAddress || "Endereço ERP",
				type: "Apartamento",
				rentValue: 2500
			}]);
			else setErpProperties(data);
		}).catch(() => {
			if (isMounted) setErpProperties([{
				id: "ERP-" + Math.floor(Math.random() * 1e3),
				title: "Imóvel Integrado (Simulado)",
				address: "Endereço Mockado do ERP",
				type: "Casa",
				rentValue: 3e3
			}]);
		}).finally(() => {
			if (isMounted) setLoadingProps(false);
		});
		return () => {
			isMounted = false;
		};
	}, [ownerId, owners]);
	const handleSave = () => {
		const propToImport = erpProperties.find((p) => p.id === selectedProp);
		if (!propToImport || !ownerId) return;
		mainStore.addProperty({
			title: propToImport.title || propToImport.nome || "Imóvel ERP",
			address: propToImport.address || propToImport.endereco || "Endereço ERP",
			type: propToImport.type || propToImport.tipo || "Apartamento",
			rentValue: Number(propToImport.rentValue || propToImport.valor || 0),
			ownerId
		});
		mainStore.addAuditLog({
			propertyId: "NOVO",
			action: "Imóvel Importado do ERP",
			user: "Integração Sistema Local",
			details: "Imóvel importado para o GED no estágio Pendente/Rascunho."
		});
		toast({
			title: "Imóvel Importado",
			description: "O imóvel foi vinculado ao GED com sucesso."
		});
		setOwnerId("");
		setSelectedProp("");
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/NewPropertyDialog.tsx:118:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/NewPropertyDialog.tsx:119:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[500px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/NewPropertyDialog.tsx:120:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/NewPropertyDialog.tsx:121:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudDownload, {
							"data-uid": "src/components/NewPropertyDialog.tsx:122:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Importar Imóvel (ERP Local)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/NewPropertyDialog.tsx:124:11",
						"data-prohibitions": "[]",
						children: "Selecione o proprietário para listar os imóveis cadastrados no sistema interno da imobiliária."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/NewPropertyDialog.tsx:130:9",
					"data-prohibitions": "[editContent]",
					className: "grid gap-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/NewPropertyDialog.tsx:131:11",
						"data-prohibitions": "[editContent]",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							"data-uid": "src/components/NewPropertyDialog.tsx:132:13",
							"data-prohibitions": "[]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"data-uid": "src/components/NewPropertyDialog.tsx:133:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-muted-foreground"
							}), " 1. Buscar Proprietário"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/components/NewPropertyDialog.tsx:135:13",
							"data-prohibitions": "[editContent]",
							value: ownerId,
							onValueChange: (val) => {
								setOwnerId(val);
								setSelectedProp("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/components/NewPropertyDialog.tsx:142:15",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/components/NewPropertyDialog.tsx:143:17",
									"data-prohibitions": "[editContent]",
									placeholder: "Selecione na lista do ERP..."
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
								"data-uid": "src/components/NewPropertyDialog.tsx:145:15",
								"data-prohibitions": "[editContent]",
								children: owners.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/components/NewPropertyDialog.tsx:147:19",
									"data-prohibitions": "[]",
									value: "_empty",
									disabled: true,
									children: "Nenhum proprietário sincronizado"
								}) : owners.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									"data-uid": "src/components/NewPropertyDialog.tsx:152:21",
									"data-prohibitions": "[editContent]",
									value: o.id,
									children: [
										o.fullName,
										" (",
										o.code,
										")"
									]
								}, o.id))
							})]
						})]
					}), ownerId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/NewPropertyDialog.tsx:162:13",
						"data-prohibitions": "[editContent]",
						className: "grid gap-2 animate-in fade-in slide-in-from-top-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							"data-uid": "src/components/NewPropertyDialog.tsx:163:15",
							"data-prohibitions": "[]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
								"data-uid": "src/components/NewPropertyDialog.tsx:164:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-muted-foreground"
							}), " 2. Imóveis Localizados no ERP"]
						}), loadingProps ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:168:17",
							"data-prohibitions": "[]",
							className: "flex items-center justify-center p-6 border rounded-lg bg-muted/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/components/NewPropertyDialog.tsx:169:19",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 animate-spin text-primary mr-2"
							}), " Consultando 192.168.10.225..."]
						}) : erpProperties.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:173:17",
							"data-prohibitions": "[editContent]",
							className: "space-y-2 max-h-[200px] overflow-y-auto pr-2",
							children: erpProperties.map((prop) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/components/NewPropertyDialog.tsx:175:21",
								"data-prohibitions": "[editContent]",
								className: `p-3 cursor-pointer transition-colors border-2 ${selectedProp === prop.id ? "border-primary bg-primary/5" : "hover:bg-muted"}`,
								onClick: () => setSelectedProp(prop.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/NewPropertyDialog.tsx:180:23",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/NewPropertyDialog.tsx:181:25",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/NewPropertyDialog.tsx:182:27",
											"data-prohibitions": "[editContent]",
											className: "font-semibold text-sm",
											children: prop.title || prop.nome || "Imóvel ERP"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/components/NewPropertyDialog.tsx:185:27",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground flex items-center gap-1 mt-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
													"data-uid": "src/components/NewPropertyDialog.tsx:186:29",
													"data-prohibitions": "[editContent]",
													className: "w-3 h-3"
												}),
												" ",
												prop.address || prop.endereco || "-"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
										"data-uid": "src/components/NewPropertyDialog.tsx:189:25",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 text-muted-foreground"
									})]
								})
							}, prop.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:195:17",
							"data-prohibitions": "[]",
							className: "p-4 border rounded-lg bg-muted/20 text-center text-sm text-muted-foreground",
							children: "Nenhum imóvel localizado para este proprietário."
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/NewPropertyDialog.tsx:203:9",
					"data-prohibitions": "[]",
					className: "flex items-center justify-between sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/NewPropertyDialog.tsx:204:11",
						"data-prohibitions": "[]",
						className: "text-xs text-muted-foreground flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							"data-uid": "src/components/NewPropertyDialog.tsx:205:13",
							"data-prohibitions": "[editContent]",
							className: "w-3 h-3"
						}), " 192.168.10.225:9000"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/NewPropertyDialog.tsx:207:11",
						"data-prohibitions": "[]",
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/NewPropertyDialog.tsx:208:13",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: onClose,
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/NewPropertyDialog.tsx:211:13",
							"data-prohibitions": "[]",
							onClick: handleSave,
							disabled: !selectedProp,
							children: "Importar ao GED"
						})]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/pages/Properties.tsx
var STATUS_COLUMNS = [
	"Pendente/Rascunho",
	"Análise Gerencial",
	"Vistoria",
	"Confecção de Contrato",
	"Assinatura",
	"Disponível para Locação"
];
function Properties() {
	const { properties } = useMainStore();
	const [search, setSearch] = (0, import_react.useState)("");
	const [isNewOpen, setIsNewOpen] = (0, import_react.useState)(false);
	const filtered = properties.filter((p) => {
		const s = search.toLowerCase();
		const matchBasic = p.title.toLowerCase().includes(s) || p.address.toLowerCase().includes(s) || p.id.toLowerCase().includes(s);
		const matchOwner = p.erpData?.proprietarios?.some((op) => op.nome?.toLowerCase().includes(s));
		const matchServ = p.erpData?.servicos?.some((sv) => sv.descricao?.toLowerCase().includes(s) || sv.numero?.toLowerCase().includes(s));
		return matchBasic || matchOwner || matchServ;
	});
	const grouped = STATUS_COLUMNS.map((status) => ({
		status,
		items: filtered.filter((p) => p.status === status)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Properties.tsx:47:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 flex flex-col h-[calc(100vh-8rem)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:48:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Properties.tsx:49:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Properties.tsx:50:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Gestão de Imóveis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Properties.tsx:51:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Catálogo e status do portfólio da imobiliária."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Properties.tsx:53:9",
					"data-prohibitions": "[]",
					onClick: () => setIsNewOpen(true),
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/Properties.tsx:54:11",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), " Importar do ERP"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:58:7",
				"data-prohibitions": "[]",
				className: "flex items-center gap-2 max-w-md shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					"data-uid": "src/pages/Properties.tsx:59:9",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 text-muted-foreground absolute ml-3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/pages/Properties.tsx:60:9",
					"data-prohibitions": "[editContent]",
					placeholder: "Buscar imóvel por nome, endereço ou ID...",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "pl-9"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
				"data-uid": "src/pages/Properties.tsx:68:7",
				"data-prohibitions": "[editContent]",
				className: "flex-1 -mx-4 px-4 sm:mx-0 sm:px-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Properties.tsx:69:9",
					"data-prohibitions": "[editContent]",
					className: "flex w-max space-x-4 h-full pb-4",
					children: grouped.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Properties.tsx:71:13",
						"data-prohibitions": "[editContent]",
						className: "w-[320px] shrink-0 flex flex-col bg-muted/40 rounded-xl border border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Properties.tsx:75:15",
							"data-prohibitions": "[editContent]",
							className: "p-3 border-b border-border/50 bg-muted/20 flex items-center justify-between rounded-t-xl sticky top-0 z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/Properties.tsx:76:17",
								"data-prohibitions": "[editContent]",
								className: "font-semibold text-sm text-foreground/80",
								children: col.status
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/Properties.tsx:77:17",
								"data-prohibitions": "[editContent]",
								variant: "secondary",
								className: "text-xs",
								children: col.items.length
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Properties.tsx:81:15",
							"data-prohibitions": "[editContent]",
							className: "p-3 space-y-3 flex-1 overflow-y-auto",
							children: [col.items.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/Properties.tsx:83:19",
								"data-prohibitions": "[editContent]",
								className: "overflow-hidden flex flex-col transition-shadow hover:shadow-md whitespace-normal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/Properties.tsx:87:21",
									"data-prohibitions": "[]",
									className: "aspect-video w-full bg-muted relative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										"data-uid": "src/pages/Properties.tsx:88:23",
										"data-prohibitions": "[editContent]",
										src: property.image,
										alt: property.title,
										className: "w-full h-full object-cover"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/Properties.tsx:94:21",
									"data-prohibitions": "[editContent]",
									className: "p-4 flex flex-col flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											"data-uid": "src/pages/Properties.tsx:95:23",
											"data-prohibitions": "[editContent]",
											className: "font-semibold text-base line-clamp-1 mb-1",
											title: property.title,
											children: property.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Properties.tsx:101:23",
											"data-prohibitions": "[editContent]",
											className: "flex items-start gap-1.5 text-xs text-muted-foreground mb-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												"data-uid": "src/pages/Properties.tsx:102:25",
												"data-prohibitions": "[editContent]",
												className: "w-3.5 h-3.5 shrink-0 mt-0.5"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Properties.tsx:103:25",
												"data-prohibitions": "[editContent]",
												className: "line-clamp-2",
												children: property.address
											})]
										}),
										property.erpData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Properties.tsx:107:25",
											"data-prohibitions": "[editContent]",
											className: "space-y-2 mb-4 border-t pt-2 mt-2",
											children: [property.erpData.proprietarios && property.erpData.proprietarios.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Properties.tsx:110:31",
												"data-prohibitions": "[editContent]",
												className: "text-[11px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Properties.tsx:111:33",
													"data-prohibitions": "[]",
													className: "font-semibold text-foreground",
													children: "Proprietários:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
													"data-uid": "src/pages/Properties.tsx:114:33",
													"data-prohibitions": "[editContent]",
													className: "list-disc pl-3 text-muted-foreground mt-0.5",
													children: property.erpData.proprietarios.map((prop, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														"data-uid": "src/pages/Properties.tsx:116:37",
														"data-prohibitions": "[editContent]",
														className: "truncate",
														children: [
															prop.nome,
															" (",
															prop.participacao,
															"%)"
														]
													}, i))
												})]
											}), property.erpData.servicos && property.erpData.servicos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Properties.tsx:124:29",
												"data-prohibitions": "[editContent]",
												className: "text-[11px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Properties.tsx:125:31",
													"data-prohibitions": "[]",
													className: "font-semibold text-foreground",
													children: "Serviços Vinculados:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													"data-uid": "src/pages/Properties.tsx:128:31",
													"data-prohibitions": "[editContent]",
													className: "flex flex-wrap gap-1 mt-1",
													children: property.erpData.servicos.map((serv, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/Properties.tsx:130:35",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: "text-[9px] h-4 px-1 py-0",
														children: serv.descricao
													}, i))
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Properties.tsx:144:23",
											"data-prohibitions": "[editContent]",
											className: "mt-auto pt-3 border-t flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Properties.tsx:145:25",
												"data-prohibitions": "[editContent]",
												className: "text-[10px] font-medium text-muted-foreground bg-muted px-2 py-1 rounded",
												children: property.id
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/pages/Properties.tsx:148:25",
												"data-prohibitions": "[]",
												variant: "ghost",
												size: "sm",
												asChild: true,
												className: "h-8 gap-1 text-primary text-xs px-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													"data-uid": "src/pages/Properties.tsx:154:27",
													"data-prohibitions": "[]",
													to: `/properties/${property.id}/dossier`,
													children: ["Ver Dossiê ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
														"data-uid": "src/pages/Properties.tsx:155:40",
														"data-prohibitions": "[editContent]",
														className: "w-3 h-3"
													})]
												})
											})]
										})
									]
								})]
							}, property.id)), col.items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Properties.tsx:163:19",
								"data-prohibitions": "[]",
								className: "py-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-border/60 rounded-lg bg-background/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
									"data-uid": "src/pages/Properties.tsx:164:21",
									"data-prohibitions": "[editContent]",
									className: "w-8 h-8 mb-2 text-muted-foreground/30"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Properties.tsx:165:21",
									"data-prohibitions": "[]",
									className: "text-xs text-muted-foreground",
									children: "Vazio nesta etapa"
								})]
							})]
						})]
					}, col.status))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
					"data-uid": "src/pages/Properties.tsx:172:9",
					"data-prohibitions": "[editContent]",
					orientation: "horizontal"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewPropertyDialog, {
				"data-uid": "src/pages/Properties.tsx:175:7",
				"data-prohibitions": "[editContent]",
				open: isNewOpen,
				onClose: () => setIsNewOpen(false)
			})
		]
	});
}
//#endregion
export { Properties as default };

//# sourceMappingURL=Properties-Dnr6zkS0.js.map