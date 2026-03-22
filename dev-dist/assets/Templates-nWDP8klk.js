import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-DfXDXNfA.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-x2HId7Er.js";
import { t as Shield } from "./shield-lpJmVGrK.js";
import { t as Trash2 } from "./trash-2-5ycRoo00.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import "./client-CX_7U15l.js";
import "./main-ChpUIa7R.js";
import "./users-1CY0fc8C.js";
import "./contracts-CPPQCr9C.js";
import "./keys-Bmg8vg07.js";
import "./entities-DMoSoCc8.js";
import { E as Input, K as FileText, R as Plus, _ as useAuth, n as useTemplatesStore, r as Badge, t as templatesStore } from "./index-DoYm8snK.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-D7vpVfHv.js";
import { t as Label } from "./label-BcCGeFuD.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-IpQ5I8o7.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DkTZX2ji.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CTyWlqSb.js";
import { t as Textarea } from "./textarea-ubyAgm7C.js";
var BookOpen = createLucideIcon("book-open", [["path", {
	d: "M12 7v14",
	key: "1akyts"
}], ["path", {
	d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	key: "ruj8y"
}]]);
var SquarePen = createLucideIcon("square-pen", [["path", {
	d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
	key: "1m0v6g"
}], ["path", {
	d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
	key: "ohrbg2"
}]]);
//#endregion
//#region src/pages/Templates.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Templates() {
	const { templates } = useTemplatesStore();
	const { user } = useAuth();
	const { toast } = useToast();
	const [activeTab, setActiveTab] = (0, import_react.useState)("tenant_contract");
	const [editingTemplate, setEditingTemplate] = (0, import_react.useState)(null);
	const [isNewOpen, setIsNewOpen] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({});
	const canEdit = [
		"Admin",
		"Jurídico",
		"Gerente"
	].includes(user?.role || "");
	const handleSave = async () => {
		if (!formData.name || !formData.category) return;
		try {
			if (editingTemplate) {
				await templatesStore.updateTemplate(editingTemplate.id, formData);
				toast({
					title: "Modelo Atualizado",
					description: "Alterações salvas com sucesso."
				});
			} else {
				await templatesStore.addTemplate({
					name: formData.name,
					category: formData.category,
					propertyType: formData.propertyType || "Todos",
					guaranteeType: formData.guaranteeType || "N/A",
					content: formData.content || ""
				});
				toast({
					title: "Modelo Criado",
					description: "Novo documento adicionado à biblioteca."
				});
			}
			setEditingTemplate(null);
			setIsNewOpen(false);
			setFormData({});
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro ao salvar",
				description: e.message
			});
		}
	};
	const handleDelete = async (id) => {
		if (confirm("Tem certeza que deseja remover este modelo?")) {
			await templatesStore.deleteTemplate(id);
			toast({
				title: "Removido",
				description: "O modelo foi deletado."
			});
		}
	};
	const openEdit = (t) => {
		setEditingTemplate(t);
		setFormData(t);
		setIsNewOpen(true);
	};
	const openNew = () => {
		setEditingTemplate(null);
		setFormData({
			category: activeTab,
			propertyType: "Todos",
			guaranteeType: "N/A",
			content: ""
		});
		setIsNewOpen(true);
	};
	const renderTable = (category) => {
		const filtered = templates.filter((t) => t.category === category);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			"data-uid": "src/pages/Templates.tsx:103:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
				"data-uid": "src/pages/Templates.tsx:104:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					"data-uid": "src/pages/Templates.tsx:105:11",
					"data-prohibitions": "[]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/pages/Templates.tsx:106:13",
							"data-prohibitions": "[]",
							children: "Nome do Modelo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/pages/Templates.tsx:107:13",
							"data-prohibitions": "[]",
							children: "Tipo Imóvel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/pages/Templates.tsx:108:13",
							"data-prohibitions": "[]",
							children: "Garantia"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/pages/Templates.tsx:109:13",
							"data-prohibitions": "[]",
							className: "text-right",
							children: "Ações"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
				"data-uid": "src/pages/Templates.tsx:112:9",
				"data-prohibitions": "[editContent]",
				children: [filtered.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					"data-uid": "src/pages/Templates.tsx:114:13",
					"data-prohibitions": "[editContent]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							"data-uid": "src/pages/Templates.tsx:115:15",
							"data-prohibitions": "[editContent]",
							className: "font-medium flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									"data-uid": "src/pages/Templates.tsx:116:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-primary"
								}),
								" ",
								t.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/pages/Templates.tsx:118:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/Templates.tsx:119:17",
								"data-prohibitions": "[editContent]",
								variant: "outline",
								children: t.propertyType
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/pages/Templates.tsx:121:15",
							"data-prohibitions": "[editContent]",
							children: t.guaranteeType !== "N/A" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/Templates.tsx:123:19",
								"data-prohibitions": "[editContent]",
								variant: "secondary",
								children: t.guaranteeType
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Templates.tsx:125:19",
								"data-prohibitions": "[]",
								className: "text-muted-foreground text-sm",
								children: "-"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							"data-uid": "src/pages/Templates.tsx:128:15",
							"data-prohibitions": "[editContent]",
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Templates.tsx:129:17",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "icon",
								onClick: () => openEdit(t),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
									"data-uid": "src/pages/Templates.tsx:130:19",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								})
							}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Templates.tsx:133:19",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "icon",
								onClick: () => handleDelete(t.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									"data-uid": "src/pages/Templates.tsx:134:21",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-destructive"
								})
							})]
						})
					]
				}, t.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					"data-uid": "src/pages/Templates.tsx:141:13",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						"data-uid": "src/pages/Templates.tsx:142:15",
						"data-prohibitions": "[]",
						colSpan: 4,
						className: "text-center py-8 text-muted-foreground",
						children: "Nenhum modelo cadastrado nesta categoria."
					})
				})]
			})]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Templates.tsx:153:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Templates.tsx:154:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Templates.tsx:155:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Templates.tsx:156:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Gestão de Modelos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Templates.tsx:157:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Gerencie os templates de contratos para inquilinos e documentos iniciais de proprietários."
					})]
				}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Templates.tsx:163:11",
					"data-prohibitions": "[]",
					onClick: openNew,
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/Templates.tsx:164:13",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), " Novo Modelo"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Templates.tsx:169:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/Templates.tsx:170:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/pages/Templates.tsx:171:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
							"data-uid": "src/pages/Templates.tsx:172:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Biblioteca de Documentos"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/Templates.tsx:174:11",
						"data-prohibitions": "[]",
						children: "Contratos categorizados dinamicamente. Acesso de edição restrito (Gerente, Admin, Jurídico)."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/Templates.tsx:179:9",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						"data-uid": "src/pages/Templates.tsx:180:11",
						"data-prohibitions": "[editContent]",
						value: activeTab,
						onValueChange: setActiveTab,
						className: "w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								"data-uid": "src/pages/Templates.tsx:181:13",
								"data-prohibitions": "[]",
								className: "mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/Templates.tsx:182:15",
									"data-prohibitions": "[]",
									value: "tenant_contract",
									children: "Contratos de Locação (Inquilinos)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/Templates.tsx:183:15",
									"data-prohibitions": "[]",
									value: "owner_onboarding",
									children: "Documentos Iniciais (Proprietários)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/pages/Templates.tsx:187:13",
								"data-prohibitions": "[editContent]",
								value: "tenant_contract",
								className: "border rounded-md",
								children: renderTable("tenant_contract")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/pages/Templates.tsx:190:13",
								"data-prohibitions": "[editContent]",
								value: "owner_onboarding",
								className: "border rounded-md",
								children: renderTable("owner_onboarding")
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Templates.tsx:197:7",
				"data-prohibitions": "[editContent]",
				open: isNewOpen,
				onOpenChange: (val) => !val && setIsNewOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Templates.tsx:198:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-[700px] h-[80vh] flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/Templates.tsx:199:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/Templates.tsx:200:13",
								"data-prohibitions": "[editContent]",
								children: editingTemplate ? "Editar Modelo" : "Novo Modelo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/Templates.tsx:201:13",
								"data-prohibitions": "[]",
								children: "Ajuste as propriedades do modelo para que o sistema possa filtrá-lo corretamente."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Templates.tsx:206:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-4 py-4 flex-1 overflow-y-auto pr-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Templates.tsx:207:13",
									"data-prohibitions": "[]",
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Templates.tsx:208:15",
										"data-prohibitions": "[]",
										children: "Nome do Modelo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Templates.tsx:209:15",
										"data-prohibitions": "[editContent]",
										value: formData.name || "",
										onChange: (e) => setFormData({
											...formData,
											name: e.target.value
										}),
										disabled: !canEdit,
										placeholder: "Ex: Contrato Comercial Padrão"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Templates.tsx:216:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Templates.tsx:217:15",
										"data-prohibitions": "[]",
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Templates.tsx:218:17",
											"data-prohibitions": "[]",
											children: "Categoria"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/Templates.tsx:219:17",
											"data-prohibitions": "[]",
											value: formData.category,
											onValueChange: (val) => setFormData({
												...formData,
												category: val
											}),
											disabled: !canEdit,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/pages/Templates.tsx:224:19",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/Templates.tsx:225:21",
													"data-prohibitions": "[editContent]"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
												"data-uid": "src/pages/Templates.tsx:227:19",
												"data-prohibitions": "[]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Templates.tsx:228:21",
													"data-prohibitions": "[]",
													value: "tenant_contract",
													children: "Locação (Inquilino)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Templates.tsx:229:21",
													"data-prohibitions": "[]",
													value: "owner_onboarding",
													children: "Onboarding (Proprietário)"
												})]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Templates.tsx:233:15",
										"data-prohibitions": "[]",
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Templates.tsx:234:17",
											"data-prohibitions": "[]",
											children: "Tipo de Imóvel Relacionado"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/Templates.tsx:235:17",
											"data-prohibitions": "[]",
											value: formData.propertyType || "Todos",
											onValueChange: (val) => setFormData({
												...formData,
												propertyType: val
											}),
											disabled: !canEdit,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/pages/Templates.tsx:240:19",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/Templates.tsx:241:21",
													"data-prohibitions": "[editContent]"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
												"data-uid": "src/pages/Templates.tsx:243:19",
												"data-prohibitions": "[]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Templates.tsx:244:21",
														"data-prohibitions": "[]",
														value: "Todos",
														children: "Todos"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Templates.tsx:245:21",
														"data-prohibitions": "[]",
														value: "Apartamento",
														children: "Apartamento"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Templates.tsx:246:21",
														"data-prohibitions": "[]",
														value: "Residencial",
														children: "Residencial"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Templates.tsx:247:21",
														"data-prohibitions": "[]",
														value: "Comercial",
														children: "Comercial"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Templates.tsx:248:21",
														"data-prohibitions": "[]",
														value: "Industrial",
														children: "Industrial"
													})
												]
											})]
										})]
									})]
								}),
								formData.category === "tenant_contract" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Templates.tsx:255:15",
									"data-prohibitions": "[]",
									className: "grid gap-2 animate-fade-in",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Templates.tsx:256:17",
										"data-prohibitions": "[]",
										children: "Tipo de Garantia Exigida"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/Templates.tsx:257:17",
										"data-prohibitions": "[]",
										value: formData.guaranteeType || "N/A",
										onValueChange: (val) => setFormData({
											...formData,
											guaranteeType: val
										}),
										disabled: !canEdit,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/Templates.tsx:262:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/Templates.tsx:263:21",
												"data-prohibitions": "[editContent]"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/Templates.tsx:265:19",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Templates.tsx:266:21",
													"data-prohibitions": "[]",
													value: "N/A",
													children: "Não se aplica / Todas"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Templates.tsx:267:21",
													"data-prohibitions": "[]",
													value: "Caução",
													children: "Caução"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Templates.tsx:268:21",
													"data-prohibitions": "[]",
													value: "Fiador",
													children: "Fiador"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Templates.tsx:269:21",
													"data-prohibitions": "[]",
													value: "Seguro Fiança",
													children: "Seguro Fiança"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Templates.tsx:270:21",
													"data-prohibitions": "[]",
													value: "Título de Capitalização",
													children: "Título de Capitalização"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Templates.tsx:276:13",
									"data-prohibitions": "[]",
									className: "grid gap-2 flex-1 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										"data-uid": "src/pages/Templates.tsx:277:15",
										"data-prohibitions": "[]",
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
											"data-uid": "src/pages/Templates.tsx:278:17",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 text-muted-foreground"
										}), " Cláusulas / Conteúdo Base"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										"data-uid": "src/pages/Templates.tsx:280:15",
										"data-prohibitions": "[editContent]",
										className: "flex-1 min-h-[200px] font-mono text-sm resize-none",
										value: formData.content || "",
										onChange: (e) => setFormData({
											...formData,
											content: e.target.value
										}),
										disabled: !canEdit,
										placeholder: "Insira as cláusulas do contrato aqui..."
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/Templates.tsx:290:11",
							"data-prohibitions": "[editContent]",
							className: "mt-auto pt-4 border-t",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Templates.tsx:291:13",
								"data-prohibitions": "[editContent]",
								variant: "outline",
								onClick: () => setIsNewOpen(false),
								children: canEdit ? "Cancelar" : "Fechar"
							}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Templates.tsx:295:15",
								"data-prohibitions": "[]",
								onClick: handleSave,
								disabled: !formData.name,
								children: "Salvar Modelo"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Templates as default };

//# sourceMappingURL=Templates-nWDP8klk.js.map