import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-DkCeJfWl.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as ArrowRight } from "./arrow-right-5lAqrHp-.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dr_YUbOM.js";
import { t as MapPin } from "./map-pin-B_CYy_Qa.js";
import { t as Button } from "./button-DI75GKXN.js";
import "./client-CRWdr5I6.js";
import { i as useMainStore, r as mainStore } from "./main-DQzAZJLS.js";
import { r as useEntitiesStore } from "./entities-Qco6HT1V.js";
import { $ as House, A as Input, B as User, G as Search, Y as LoaderCircle, lt as Building, pt as Link, q as Plus, t as Badge } from "./index-BZX_b4ly.js";
import { n as CardContent, t as Card } from "./card-D7vpVfHv.js";
import { t as Label } from "./label-jqTESdUS.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-Dd0wZbMU.js";
import { n as ScrollBar, t as ScrollArea } from "./scroll-area-DHVxAd6N.js";
var DollarSign = createLucideIcon("dollar-sign", [["line", {
	x1: "12",
	x2: "12",
	y1: "2",
	y2: "22",
	key: "7eqyqh"
}], ["path", {
	d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
	key: "1b0p4s"
}]]);
var Sparkles = createLucideIcon("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
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
	const [title, setTitle] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("Apartamento");
	const [rentValue, setRentValue] = (0, import_react.useState)("");
	const [ownerId, setOwnerId] = (0, import_react.useState)("");
	const [aiLoading, setAiLoading] = (0, import_react.useState)(false);
	const [aiJustification, setAiJustification] = (0, import_react.useState)("");
	const handleAISuggestion = () => {
		if (!address || !type) {
			toast({
				variant: "destructive",
				title: "Dados Insuficientes",
				description: "Preencha o endereço e o tipo do imóvel para a IA sugerir um valor."
			});
			return;
		}
		setAiLoading(true);
		setAiJustification("");
		setTimeout(() => {
			setAiLoading(false);
			setRentValue([
				"Sala",
				"Salão",
				"Ponto Comercial"
			].includes(type) ? "4500" : "2800");
			setAiJustification(`Valor calculado cruzando dados dos Sites "Vendas" e "Locação". Média de ${[
				"Sala",
				"Salão",
				"Ponto Comercial"
			].includes(type) ? "12" : "24"} imóveis recentes na região do endereço informado.`);
			toast({
				title: "Sugestão de Preço Concluída",
				description: "A IA do SharePoint analisou o histórico de contratos."
			});
		}, 2e3);
	};
	const handleSave = () => {
		if (!title || !address || !rentValue || !ownerId) return;
		mainStore.addProperty({
			title,
			address,
			type,
			rentValue: Number(rentValue),
			ownerId
		});
		mainStore.addAuditLog({
			propertyId: "NOVO",
			action: "Nova Captação Registrada",
			user: "Equipe de Captação",
			details: "Imóvel criado no estágio Pendente/Rascunho."
		});
		toast({
			title: "Captação Registrada",
			description: "O imóvel foi adicionado com sucesso à fila com o novo padrão de ID."
		});
		setTitle("");
		setAddress("");
		setType("Apartamento");
		setRentValue("");
		setOwnerId("");
		setAiJustification("");
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/NewPropertyDialog.tsx:99:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/NewPropertyDialog.tsx:100:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[500px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/NewPropertyDialog.tsx:101:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/NewPropertyDialog.tsx:102:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
							"data-uid": "src/components/NewPropertyDialog.tsx:103:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Nova Captação"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/NewPropertyDialog.tsx:105:11",
						"data-prohibitions": "[]",
						children: "Insira os dados do novo imóvel. O ID será gerado automaticamente com base no tipo. Use a Inteligência Artificial para estimar o valor ideal do aluguel."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/NewPropertyDialog.tsx:111:9",
					"data-prohibitions": "[editContent]",
					className: "grid gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:112:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/NewPropertyDialog.tsx:113:13",
								"data-prohibitions": "[]",
								children: "Título / Referência"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/NewPropertyDialog.tsx:114:13",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: Apartamento Vista Mar",
								value: title,
								onChange: (e) => setTitle(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:121:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/NewPropertyDialog.tsx:122:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									"data-uid": "src/components/NewPropertyDialog.tsx:123:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Proprietário (Entidade)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/NewPropertyDialog.tsx:125:13",
								"data-prohibitions": "[editContent]",
								value: ownerId,
								onValueChange: setOwnerId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/NewPropertyDialog.tsx:126:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/NewPropertyDialog.tsx:127:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Vincular ao proprietário..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/components/NewPropertyDialog.tsx:129:15",
									"data-prohibitions": "[editContent]",
									children: owners.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/NewPropertyDialog.tsx:131:19",
										"data-prohibitions": "[]",
										value: "_empty",
										disabled: true,
										children: "Nenhum proprietário cadastrado"
									}) : owners.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										"data-uid": "src/components/NewPropertyDialog.tsx:136:21",
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:145:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/NewPropertyDialog.tsx:146:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									"data-uid": "src/components/NewPropertyDialog.tsx:147:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Endereço Completo"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/NewPropertyDialog.tsx:149:13",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: Av. Atlântica, 1000 - Apto 502",
								value: address,
								onChange: (e) => setAddress(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:156:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/NewPropertyDialog.tsx:157:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
									"data-uid": "src/components/NewPropertyDialog.tsx:158:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Tipo do Imóvel"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/NewPropertyDialog.tsx:160:13",
								"data-prohibitions": "[]",
								value: type,
								onValueChange: setType,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/NewPropertyDialog.tsx:161:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/NewPropertyDialog.tsx:162:17",
										"data-prohibitions": "[editContent]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/NewPropertyDialog.tsx:164:15",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:165:17",
											"data-prohibitions": "[]",
											value: "Apartamento",
											children: "Apartamento"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:166:17",
											"data-prohibitions": "[]",
											value: "Casa",
											children: "Casa"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:167:17",
											"data-prohibitions": "[]",
											value: "Sala",
											children: "Sala"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:168:17",
											"data-prohibitions": "[]",
											value: "Salão",
											children: "Salão"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:169:17",
											"data-prohibitions": "[]",
											value: "Garagem",
											children: "Garagem"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:170:17",
											"data-prohibitions": "[]",
											value: "Ponto Comercial",
											children: "Ponto Comercial"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:171:17",
											"data-prohibitions": "[]",
											value: "Prédio",
											children: "Prédio"
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:176:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2 p-4 bg-muted/30 rounded-lg border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/components/NewPropertyDialog.tsx:177:13",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
										"data-uid": "src/components/NewPropertyDialog.tsx:178:15",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 text-primary"
									}), " Valor do Aluguel (R$)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/NewPropertyDialog.tsx:180:13",
									"data-prohibitions": "[editContent]",
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/NewPropertyDialog.tsx:181:15",
										"data-prohibitions": "[editContent]",
										type: "number",
										placeholder: "Ex: 3500",
										value: rentValue,
										onChange: (e) => setRentValue(e.target.value),
										className: "flex-1 font-mono text-lg"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/components/NewPropertyDialog.tsx:188:15",
										"data-prohibitions": "[editContent]",
										variant: "secondary",
										onClick: handleAISuggestion,
										disabled: aiLoading,
										className: "shrink-0 gap-2 font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 border border-purple-200",
										children: [aiLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/NewPropertyDialog.tsx:195:19",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 animate-spin"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
											"data-uid": "src/components/NewPropertyDialog.tsx:197:19",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										}), "Sugerir via IA"]
									})]
								}),
								aiJustification && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/NewPropertyDialog.tsx:203:15",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-purple-800 bg-purple-50 p-2 rounded mt-2 animate-fade-in",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/components/NewPropertyDialog.tsx:204:17",
											"data-prohibitions": "[]",
											children: "Justificativa IA:"
										}),
										" ",
										aiJustification
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/NewPropertyDialog.tsx:210:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/NewPropertyDialog.tsx:211:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: onClose,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/NewPropertyDialog.tsx:214:11",
						"data-prohibitions": "[]",
						onClick: handleSave,
						disabled: !title || !address || !rentValue || !ownerId,
						children: "Salvar Imóvel"
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
	const filtered = properties.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));
	const grouped = STATUS_COLUMNS.map((status) => ({
		status,
		items: filtered.filter((p) => p.status === status)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Properties.tsx:39:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 flex flex-col h-[calc(100vh-8rem)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:40:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Properties.tsx:41:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Properties.tsx:42:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Gestão de Imóveis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Properties.tsx:43:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Catálogo e status do portfólio da imobiliária."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Properties.tsx:45:9",
					"data-prohibitions": "[]",
					onClick: () => setIsNewOpen(true),
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/Properties.tsx:46:11",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), " Nova Captação"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:50:7",
				"data-prohibitions": "[]",
				className: "flex items-center gap-2 max-w-md shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					"data-uid": "src/pages/Properties.tsx:51:9",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 text-muted-foreground absolute ml-3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/pages/Properties.tsx:52:9",
					"data-prohibitions": "[editContent]",
					placeholder: "Buscar imóvel por nome, endereço ou ID...",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "pl-9"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
				"data-uid": "src/pages/Properties.tsx:60:7",
				"data-prohibitions": "[editContent]",
				className: "flex-1 -mx-4 px-4 sm:mx-0 sm:px-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Properties.tsx:61:9",
					"data-prohibitions": "[editContent]",
					className: "flex w-max space-x-4 h-full pb-4",
					children: grouped.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Properties.tsx:63:13",
						"data-prohibitions": "[editContent]",
						className: "w-[320px] shrink-0 flex flex-col bg-muted/40 rounded-xl border border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Properties.tsx:67:15",
							"data-prohibitions": "[editContent]",
							className: "p-3 border-b border-border/50 bg-muted/20 flex items-center justify-between rounded-t-xl sticky top-0 z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/Properties.tsx:68:17",
								"data-prohibitions": "[editContent]",
								className: "font-semibold text-sm text-foreground/80",
								children: col.status
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/Properties.tsx:69:17",
								"data-prohibitions": "[editContent]",
								variant: "secondary",
								className: "text-xs",
								children: col.items.length
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Properties.tsx:73:15",
							"data-prohibitions": "[editContent]",
							className: "p-3 space-y-3 flex-1 overflow-y-auto",
							children: [col.items.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/Properties.tsx:75:19",
								"data-prohibitions": "[editContent]",
								className: "overflow-hidden flex flex-col transition-shadow hover:shadow-md whitespace-normal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/Properties.tsx:79:21",
									"data-prohibitions": "[]",
									className: "aspect-video w-full bg-muted relative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										"data-uid": "src/pages/Properties.tsx:80:23",
										"data-prohibitions": "[editContent]",
										src: property.image,
										alt: property.title,
										className: "w-full h-full object-cover"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/Properties.tsx:86:21",
									"data-prohibitions": "[editContent]",
									className: "p-4 flex flex-col flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											"data-uid": "src/pages/Properties.tsx:87:23",
											"data-prohibitions": "[editContent]",
											className: "font-semibold text-base line-clamp-1 mb-1",
											title: property.title,
											children: property.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Properties.tsx:93:23",
											"data-prohibitions": "[editContent]",
											className: "flex items-start gap-1.5 text-xs text-muted-foreground mb-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												"data-uid": "src/pages/Properties.tsx:94:25",
												"data-prohibitions": "[editContent]",
												className: "w-3.5 h-3.5 shrink-0 mt-0.5"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Properties.tsx:95:25",
												"data-prohibitions": "[editContent]",
												className: "line-clamp-2",
												children: property.address
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Properties.tsx:97:23",
											"data-prohibitions": "[editContent]",
											className: "mt-auto pt-3 border-t flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Properties.tsx:98:25",
												"data-prohibitions": "[editContent]",
												className: "text-[10px] font-medium text-muted-foreground bg-muted px-2 py-1 rounded",
												children: property.id
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/pages/Properties.tsx:101:25",
												"data-prohibitions": "[]",
												variant: "ghost",
												size: "sm",
												asChild: true,
												className: "h-8 gap-1 text-primary text-xs px-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													"data-uid": "src/pages/Properties.tsx:107:27",
													"data-prohibitions": "[]",
													to: `/properties/${property.id}/dossier`,
													children: ["Ver Dossiê ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
														"data-uid": "src/pages/Properties.tsx:108:40",
														"data-prohibitions": "[editContent]",
														className: "w-3 h-3"
													})]
												})
											})]
										})
									]
								})]
							}, property.id)), col.items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Properties.tsx:116:19",
								"data-prohibitions": "[]",
								className: "py-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-border/60 rounded-lg bg-background/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
									"data-uid": "src/pages/Properties.tsx:117:21",
									"data-prohibitions": "[editContent]",
									className: "w-8 h-8 mb-2 text-muted-foreground/30"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Properties.tsx:118:21",
									"data-prohibitions": "[]",
									className: "text-xs text-muted-foreground",
									children: "Vazio nesta etapa"
								})]
							})]
						})]
					}, col.status))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
					"data-uid": "src/pages/Properties.tsx:125:9",
					"data-prohibitions": "[editContent]",
					orientation: "horizontal"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewPropertyDialog, {
				"data-uid": "src/pages/Properties.tsx:128:7",
				"data-prohibitions": "[editContent]",
				open: isNewOpen,
				onClose: () => setIsNewOpen(false)
			})
		]
	});
}
//#endregion
export { Properties as default };

//# sourceMappingURL=Properties-Ba_hDlcY.js.map