import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-DfXDXNfA.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as ArrowRight } from "./arrow-right-5lAqrHp-.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-x2HId7Er.js";
import { t as MapPin } from "./map-pin-C0wVYbXY.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import "./client-CX_7U15l.js";
import { i as useMainStore, r as mainStore } from "./main-ChpUIa7R.js";
import { $ as Building, B as LoaderCircle, E as Input, I as Search, R as Plus, W as House, nt as Link, r as Badge } from "./index-DoYm8snK.js";
import { n as CardContent, t as Card } from "./card-D7vpVfHv.js";
import { t as Label } from "./label-BcCGeFuD.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DkTZX2ji.js";
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
	const [title, setTitle] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("Residencial");
	const [rentValue, setRentValue] = (0, import_react.useState)("");
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
			setRentValue(type === "Comercial" ? "4500" : "2800");
			setAiJustification(`Valor calculado cruzando dados dos Sites "Vendas" e "Locação". Média de ${type === "Comercial" ? "12" : "24"} imóveis recentes na região do endereço informado.`);
			toast({
				title: "Sugestão de Preço Concluída",
				description: "A IA do SharePoint analisou o histórico de contratos."
			});
		}, 2e3);
	};
	const handleSave = () => {
		if (!title || !address || !rentValue) return;
		mainStore.addProperty({
			title,
			address,
			type,
			rentValue: Number(rentValue)
		});
		mainStore.addAuditLog({
			propertyId: "NOVO",
			action: "Nova Captação Registrada",
			user: "Equipe de Captação",
			details: "Imóvel criado no estágio Pendente/Rascunho."
		});
		toast({
			title: "Captação Registrada",
			description: "O imóvel foi adicionado com sucesso à fila."
		});
		setTitle("");
		setAddress("");
		setType("Residencial");
		setRentValue("");
		setAiJustification("");
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/NewPropertyDialog.tsx:94:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/NewPropertyDialog.tsx:95:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[500px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/NewPropertyDialog.tsx:96:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/NewPropertyDialog.tsx:97:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
							"data-uid": "src/components/NewPropertyDialog.tsx:98:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Nova Captação"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/NewPropertyDialog.tsx:100:11",
						"data-prohibitions": "[]",
						children: "Insira os dados do novo imóvel. Use a Inteligência Artificial para estimar o valor ideal do aluguel."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/NewPropertyDialog.tsx:106:9",
					"data-prohibitions": "[editContent]",
					className: "grid gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:107:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/NewPropertyDialog.tsx:108:13",
								"data-prohibitions": "[]",
								children: "Título / Referência"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/NewPropertyDialog.tsx:109:13",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: Apartamento Vista Mar",
								value: title,
								onChange: (e) => setTitle(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:116:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/NewPropertyDialog.tsx:117:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									"data-uid": "src/components/NewPropertyDialog.tsx:118:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Endereço Completo"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/NewPropertyDialog.tsx:120:13",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: Av. Atlântica, 1000 - Apto 502",
								value: address,
								onChange: (e) => setAddress(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:127:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/NewPropertyDialog.tsx:128:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
									"data-uid": "src/components/NewPropertyDialog.tsx:129:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Tipo do Imóvel"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/NewPropertyDialog.tsx:131:13",
								"data-prohibitions": "[]",
								value: type,
								onValueChange: setType,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/NewPropertyDialog.tsx:132:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/NewPropertyDialog.tsx:133:17",
										"data-prohibitions": "[editContent]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/NewPropertyDialog.tsx:135:15",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:136:17",
											"data-prohibitions": "[]",
											value: "Residencial",
											children: "Residencial"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:137:17",
											"data-prohibitions": "[]",
											value: "Comercial",
											children: "Comercial"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:138:17",
											"data-prohibitions": "[]",
											value: "Industrial",
											children: "Industrial"
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:143:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2 p-4 bg-muted/30 rounded-lg border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/components/NewPropertyDialog.tsx:144:13",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
										"data-uid": "src/components/NewPropertyDialog.tsx:145:15",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 text-primary"
									}), " Valor do Aluguel (R$)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/NewPropertyDialog.tsx:147:13",
									"data-prohibitions": "[editContent]",
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/NewPropertyDialog.tsx:148:15",
										"data-prohibitions": "[editContent]",
										type: "number",
										placeholder: "Ex: 3500",
										value: rentValue,
										onChange: (e) => setRentValue(e.target.value),
										className: "flex-1 font-mono text-lg"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/components/NewPropertyDialog.tsx:155:15",
										"data-prohibitions": "[editContent]",
										variant: "secondary",
										onClick: handleAISuggestion,
										disabled: aiLoading,
										className: "shrink-0 gap-2 font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 border border-purple-200",
										children: [aiLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/NewPropertyDialog.tsx:162:19",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 animate-spin"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
											"data-uid": "src/components/NewPropertyDialog.tsx:164:19",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										}), "Sugerir via IA"]
									})]
								}),
								aiJustification && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/NewPropertyDialog.tsx:170:15",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-purple-800 bg-purple-50 p-2 rounded mt-2 animate-fade-in",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/components/NewPropertyDialog.tsx:171:17",
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
					"data-uid": "src/components/NewPropertyDialog.tsx:177:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/NewPropertyDialog.tsx:178:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: onClose,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/NewPropertyDialog.tsx:181:11",
						"data-prohibitions": "[]",
						onClick: handleSave,
						disabled: !title || !address || !rentValue,
						children: "Salvar Imóvel"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/pages/Properties.tsx
function Properties() {
	const { properties } = useMainStore();
	const [search, setSearch] = (0, import_react.useState)("");
	const [isNewOpen, setIsNewOpen] = (0, import_react.useState)(false);
	const filtered = properties.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Properties.tsx:23:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:24:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Properties.tsx:25:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Properties.tsx:26:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Gestão de Imóveis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Properties.tsx:27:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Catálogo e status do portfólio da imobiliária."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Properties.tsx:29:9",
					"data-prohibitions": "[]",
					onClick: () => setIsNewOpen(true),
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/Properties.tsx:30:11",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), " Nova Captação"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:34:7",
				"data-prohibitions": "[]",
				className: "flex items-center gap-2 max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					"data-uid": "src/pages/Properties.tsx:35:9",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 text-muted-foreground absolute ml-3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/pages/Properties.tsx:36:9",
					"data-prohibitions": "[editContent]",
					placeholder: "Buscar imóvel por nome ou endereço...",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "pl-9"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:44:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: [filtered.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/Properties.tsx:46:11",
					"data-prohibitions": "[editContent]",
					className: "overflow-hidden flex flex-col transition-shadow hover:shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Properties.tsx:50:13",
						"data-prohibitions": "[editContent]",
						className: "aspect-video w-full bg-muted relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							"data-uid": "src/pages/Properties.tsx:51:15",
							"data-prohibitions": "[editContent]",
							src: property.image,
							alt: property.title,
							className: "w-full h-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Properties.tsx:56:15",
							"data-prohibitions": "[editContent]",
							className: "absolute top-2 right-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/Properties.tsx:57:17",
								"data-prohibitions": "[editContent]",
								variant: "secondary",
								className: "shadow-sm backdrop-blur-md bg-background/80",
								children: property.status
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Properties.tsx:62:13",
						"data-prohibitions": "[editContent]",
						className: "p-4 flex flex-col flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/Properties.tsx:63:15",
								"data-prohibitions": "[editContent]",
								className: "font-semibold text-lg line-clamp-1 mb-1",
								children: property.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Properties.tsx:64:15",
								"data-prohibitions": "[editContent]",
								className: "flex items-start gap-1.5 text-sm text-muted-foreground mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									"data-uid": "src/pages/Properties.tsx:65:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 shrink-0 mt-0.5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Properties.tsx:66:17",
									"data-prohibitions": "[editContent]",
									className: "line-clamp-2",
									children: property.address
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Properties.tsx:68:15",
								"data-prohibitions": "[editContent]",
								className: "mt-auto pt-4 border-t flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/Properties.tsx:69:17",
									"data-prohibitions": "[editContent]",
									className: "text-xs font-medium text-muted-foreground",
									children: ["ID: ", property.id]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/Properties.tsx:70:17",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "sm",
									asChild: true,
									className: "gap-1 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										"data-uid": "src/pages/Properties.tsx:71:19",
										"data-prohibitions": "[]",
										to: `/properties/${property.id}/dossier`,
										children: ["Ver Dossiê ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
											"data-uid": "src/pages/Properties.tsx:72:32",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										})]
									})
								})]
							})
						]
					})]
				}, property.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Properties.tsx:80:11",
					"data-prohibitions": "[]",
					className: "col-span-full py-12 text-center text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
						"data-uid": "src/pages/Properties.tsx:81:13",
						"data-prohibitions": "[editContent]",
						className: "w-12 h-12 mx-auto mb-3 opacity-20"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Properties.tsx:82:13",
						"data-prohibitions": "[]",
						children: "Nenhum imóvel encontrado."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewPropertyDialog, {
				"data-uid": "src/pages/Properties.tsx:87:7",
				"data-prohibitions": "[editContent]",
				open: isNewOpen,
				onClose: () => setIsNewOpen(false)
			})
		]
	});
}
//#endregion
export { Properties as default };

//# sourceMappingURL=Properties-Bq493JIS.js.map