import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-_uYFM_aW.js";
import { t as Pencil } from "./pencil-DXHokH0j.js";
import { t as Trash2 } from "./trash-2-Df75lnGo.js";
import { t as Button } from "./button-iQJzuPvV.js";
import "./client-SeHzFSrX.js";
import { n as initEntitiesStore, r as useEntitiesStore, t as entitiesStore } from "./entities-DmZS4Guz.js";
import { A as Input, H as Search, I as UsersRound, W as Plus } from "./index-DsVrPQAv.js";
import { a as CardHeader, n as CardContent, t as Card } from "./card-BhS_F8IN.js";
import { t as Label } from "./label-CTlYsXe6.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CV-6f29o.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-BPtzSH_T.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-Bu2SyGvZ.js";
//#region src/pages/Entities.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Entities() {
	const { owners, tenants } = useEntitiesStore();
	const { toast } = useToast();
	const [activeTab, setActiveTab] = (0, import_react.useState)("owners");
	const [search, setSearch] = (0, import_react.useState)("");
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [isFetching, setIsFetching] = (0, import_react.useState)(true);
	const [formData, setFormData] = (0, import_react.useState)({
		code: "",
		fullName: "",
		cpf: "",
		rg: "",
		fullAddress: ""
	});
	(0, import_react.useEffect)(() => {
		setIsFetching(true);
		initEntitiesStore().finally(() => setIsFetching(false));
	}, []);
	const filteredList = (activeTab === "owners" ? owners : tenants).filter((e) => e.fullName.toLowerCase().includes(search.toLowerCase()) || e.code.toLowerCase().includes(search.toLowerCase()));
	const handleOpenNew = () => {
		setEditingId(null);
		setFormData({
			code: "",
			fullName: "",
			cpf: "",
			rg: "",
			fullAddress: ""
		});
		setDialogOpen(true);
	};
	const handleOpenEdit = (entity) => {
		setEditingId(entity.id);
		setFormData({
			code: entity.code,
			fullName: entity.fullName,
			cpf: entity.cpf,
			rg: entity.rg,
			fullAddress: entity.fullAddress
		});
		setDialogOpen(true);
	};
	const handleDelete = async (id) => {
		try {
			if (activeTab === "owners") await entitiesStore.deleteOwner(id);
			else await entitiesStore.deleteTenant(id);
			toast({
				title: "Entidade removida",
				description: "O registro foi apagado com sucesso."
			});
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro",
				description: e.message
			});
		}
	};
	const handleSave = async () => {
		if (!formData.fullName) {
			toast({
				variant: "destructive",
				title: "Atenção",
				description: "Nome Completo é obrigatório."
			});
			return;
		}
		try {
			if (editingId) {
				if (activeTab === "owners") await entitiesStore.updateOwner(editingId, formData);
				else await entitiesStore.updateTenant(editingId, formData);
				toast({
					title: "Atualizado",
					description: "Registro atualizado com sucesso."
				});
			} else {
				const payload = {
					...formData,
					code: void 0
				};
				if (activeTab === "owners") await entitiesStore.addOwner(payload);
				else await entitiesStore.addTenant(payload);
				toast({
					title: "Adicionado",
					description: "Novo registro criado."
				});
			}
			setDialogOpen(false);
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro ao salvar",
				description: e.message || "Verifique se o código já está em uso."
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Entities.tsx:125:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 max-w-6xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Entities.tsx:126:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Entities.tsx:127:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						"data-uid": "src/pages/Entities.tsx:128:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {
							"data-uid": "src/pages/Entities.tsx:129:13",
							"data-prohibitions": "[editContent]",
							className: "w-8 h-8 text-primary"
						}), "Gestão de Entidades"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Entities.tsx:132:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Cadastro de Proprietários e Inquilinos e seus códigos de identificação para GED."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Entities.tsx:136:9",
					"data-prohibitions": "[]",
					onClick: handleOpenNew,
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/Entities.tsx:137:11",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), " Novo Registro"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Entities.tsx:141:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/Entities.tsx:142:9",
					"data-prohibitions": "[]",
					className: "pb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Entities.tsx:143:11",
						"data-prohibitions": "[]",
						className: "flex flex-col sm:flex-row items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
							"data-uid": "src/pages/Entities.tsx:144:13",
							"data-prohibitions": "[]",
							value: activeTab,
							onValueChange: (v) => setActiveTab(v),
							className: "w-full sm:w-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								"data-uid": "src/pages/Entities.tsx:149:15",
								"data-prohibitions": "[]",
								className: "grid w-full sm:w-auto grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/Entities.tsx:150:17",
									"data-prohibitions": "[]",
									value: "owners",
									children: "Proprietários"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/Entities.tsx:151:17",
									"data-prohibitions": "[]",
									value: "tenants",
									children: "Inquilinos"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Entities.tsx:154:13",
							"data-prohibitions": "[]",
							className: "relative w-full sm:w-72",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"data-uid": "src/pages/Entities.tsx:155:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 absolute left-3 top-3 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/Entities.tsx:156:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar por nome ou código...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "pl-9"
							})]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/Entities.tsx:165:9",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/Entities.tsx:166:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/Entities.tsx:167:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Entities.tsx:168:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Entities.tsx:169:17",
										"data-prohibitions": "[]",
										children: "Código (ID)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Entities.tsx:170:17",
										"data-prohibitions": "[]",
										children: "Nome Completo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Entities.tsx:171:17",
										"data-prohibitions": "[]",
										children: "CPF"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Entities.tsx:172:17",
										"data-prohibitions": "[]",
										children: "Endereço"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Entities.tsx:173:17",
										"data-prohibitions": "[]",
										className: "text-right",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/pages/Entities.tsx:176:13",
							"data-prohibitions": "[editContent]",
							children: [
								filteredList.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									"data-uid": "src/pages/Entities.tsx:178:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Entities.tsx:179:19",
											"data-prohibitions": "[editContent]",
											className: "font-mono font-medium",
											children: item.code
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Entities.tsx:180:19",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: item.fullName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Entities.tsx:181:19",
											"data-prohibitions": "[editContent]",
											children: item.cpf || "-"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Entities.tsx:182:19",
											"data-prohibitions": "[editContent]",
											className: "truncate max-w-[200px]",
											title: item.fullAddress,
											children: item.fullAddress || "-"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
											"data-uid": "src/pages/Entities.tsx:185:19",
											"data-prohibitions": "[]",
											className: "text-right space-x-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/pages/Entities.tsx:186:21",
												"data-prohibitions": "[]",
												variant: "ghost",
												size: "icon",
												onClick: () => handleOpenEdit(item),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
													"data-uid": "src/pages/Entities.tsx:187:23",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 text-muted-foreground"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/pages/Entities.tsx:189:21",
												"data-prohibitions": "[]",
												variant: "ghost",
												size: "icon",
												onClick: () => handleDelete(item.id),
												className: "text-destructive hover:text-destructive hover:bg-destructive/10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
													"data-uid": "src/pages/Entities.tsx:195:23",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4"
												})
											})]
										})
									]
								}, item.id)),
								filteredList.length === 0 && isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
									"data-uid": "src/pages/Entities.tsx:201:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Entities.tsx:202:19",
										"data-prohibitions": "[]",
										colSpan: 5,
										className: "text-center py-8 text-muted-foreground",
										children: "Buscando registros..."
									})
								}),
								filteredList.length === 0 && !isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
									"data-uid": "src/pages/Entities.tsx:208:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Entities.tsx:209:19",
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Entities.tsx:219:7",
				"data-prohibitions": "[editContent]",
				open: dialogOpen,
				onOpenChange: setDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Entities.tsx:220:9",
					"data-prohibitions": "[editContent]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/Entities.tsx:221:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/Entities.tsx:222:13",
								"data-prohibitions": "[editContent]",
								children: [
									editingId ? "Editar" : "Novo",
									" ",
									activeTab === "owners" ? "Proprietário" : "Inquilino"
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Entities.tsx:227:11",
							"data-prohibitions": "[]",
							className: "grid gap-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Entities.tsx:228:13",
									"data-prohibitions": "[]",
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Entities.tsx:229:15",
										"data-prohibitions": "[]",
										children: "Código de Identificação Único"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Entities.tsx:230:15",
										"data-prohibitions": "[editContent]",
										value: editingId ? formData.code : "Gerado automaticamente",
										disabled: true,
										className: "font-mono bg-muted"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Entities.tsx:236:13",
									"data-prohibitions": "[]",
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Entities.tsx:237:15",
										"data-prohibitions": "[]",
										children: "Nome Completo *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Entities.tsx:238:15",
										"data-prohibitions": "[editContent]",
										value: formData.fullName,
										onChange: (e) => setFormData({
											...formData,
											fullName: e.target.value
										}),
										placeholder: "Ex: João da Silva"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Entities.tsx:244:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Entities.tsx:245:15",
										"data-prohibitions": "[]",
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Entities.tsx:246:17",
											"data-prohibitions": "[]",
											children: "CPF"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/pages/Entities.tsx:247:17",
											"data-prohibitions": "[editContent]",
											value: formData.cpf,
											onChange: (e) => setFormData({
												...formData,
												cpf: e.target.value
											}),
											placeholder: "000.000.000-00"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Entities.tsx:253:15",
										"data-prohibitions": "[]",
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Entities.tsx:254:17",
											"data-prohibitions": "[]",
											children: "RG"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/pages/Entities.tsx:255:17",
											"data-prohibitions": "[editContent]",
											value: formData.rg,
											onChange: (e) => setFormData({
												...formData,
												rg: e.target.value
											})
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Entities.tsx:261:13",
									"data-prohibitions": "[]",
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Entities.tsx:262:15",
										"data-prohibitions": "[]",
										children: "Endereço Completo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Entities.tsx:263:15",
										"data-prohibitions": "[editContent]",
										value: formData.fullAddress,
										onChange: (e) => setFormData({
											...formData,
											fullAddress: e.target.value
										}),
										placeholder: "Rua, Número, Bairro, Cidade - UF"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/Entities.tsx:270:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Entities.tsx:271:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setDialogOpen(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Entities.tsx:274:13",
								"data-prohibitions": "[]",
								onClick: handleSave,
								children: "Salvar Registro"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Entities as default };

//# sourceMappingURL=Entities-CajvbOI4.js.map