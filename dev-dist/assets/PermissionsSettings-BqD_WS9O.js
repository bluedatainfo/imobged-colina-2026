import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CvuQPfAM.js";
import "./react-dom-cDMCl7Pc.js";
import { n as useToast } from "./use-toast-cNG4ZhbD.js";
import "./es2015-TBGmAnyn.js";
import { n as createLucideIcon } from "./utils-Di8JFY1h.js";
import { t as Button } from "./button-ChEhZCqG.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Ri7J9_pf.js";
import { t as CircleAlert } from "./circle-alert-C8tsZoG_.js";
import { t as CircleCheck } from "./circle-check-Dw62k5Pj.js";
import { t as RefreshCw } from "./refresh-cw-CANleLd3.js";
import { t as Shield } from "./shield-B6XcFj_a.js";
import { t as Trash2 } from "./trash-2-CAO729-f.js";
import { r as useMainStore } from "./main-DQ3RjoTV.js";
import { n as usersStore, t as useUsersStore } from "./users-Cp07DAsf.js";
import { P as User, V as LoaderCircle, d as Avatar, f as AvatarFallback, k as Input, p as AvatarImage, z as Plus } from "./index-RZlT6dSN.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-D7FMgv39.js";
import { t as Label } from "./label-DWr-owgv.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DkS38AD4.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DA91Jjj6.js";
var Pencil = createLucideIcon("pencil", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}], ["path", {
	d: "m15 5 4 4",
	key: "1mk7zo"
}]]);
var UserCog = createLucideIcon("user-cog", [
	["path", {
		d: "M10 15H6a4 4 0 0 0-4 4v2",
		key: "1nfge6"
	}],
	["path", {
		d: "m14.305 16.53.923-.382",
		key: "1itpsq"
	}],
	["path", {
		d: "m15.228 13.852-.923-.383",
		key: "eplpkm"
	}],
	["path", {
		d: "m16.852 12.228-.383-.923",
		key: "13v3q0"
	}],
	["path", {
		d: "m16.852 17.772-.383.924",
		key: "1i8mnm"
	}],
	["path", {
		d: "m19.148 12.228.383-.923",
		key: "1q8j1v"
	}],
	["path", {
		d: "m19.53 18.696-.382-.924",
		key: "vk1qj3"
	}],
	["path", {
		d: "m20.772 13.852.924-.383",
		key: "n880s0"
	}],
	["path", {
		d: "m20.772 16.148.924.383",
		key: "1g6xey"
	}],
	["circle", {
		cx: "18",
		cy: "15",
		r: "3",
		key: "gjjjvw"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]);
//#endregion
//#region src/components/settings/PermissionsSettings.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var availableRoles = [
	"Admin",
	"Diretor",
	"Gerente",
	"Gestor de Contrato",
	"Vistoriador",
	"Jurídico",
	"Financeiro",
	"Corretor"
];
function PermissionsSettings() {
	const { users } = useUsersStore();
	const { primaryDomain, clientId, tenantId } = useMainStore().sharepoint;
	const { toast } = useToast();
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [isSyncing, setIsSyncing] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		role: "Vistoriador"
	});
	const [localEmailPart, setLocalEmailPart] = (0, import_react.useState)("");
	const handleRoleChange = (userId, newRole) => {
		usersStore.updateUserRole(userId, newRole);
		toast({
			title: "Permissões Atualizadas",
			description: `O perfil de acesso foi alterado para ${newRole}.`
		});
	};
	const handleOpenNew = () => {
		setEditId(null);
		setLocalEmailPart("");
		setFormData({
			name: "",
			role: "Vistoriador"
		});
		setDialogOpen(true);
	};
	const handleOpenEdit = (user) => {
		setEditId(user.id);
		const [local] = user.email.split("@");
		setLocalEmailPart(local);
		setFormData({
			name: user.name,
			role: user.role
		});
		setDialogOpen(true);
	};
	const handleRemove = (id) => {
		usersStore.removeUser(id);
		toast({
			title: "Usuário Removido",
			description: "Acesso revogado com sucesso."
		});
	};
	const handleSave = () => {
		if (!formData.name || !localEmailPart || !primaryDomain) {
			toast({
				variant: "destructive",
				title: "Erro",
				description: "Preencha todos os campos."
			});
			return;
		}
		const fullEmail = `${localEmailPart}@${primaryDomain}`;
		if (editId) {
			usersStore.updateUser(editId, {
				...formData,
				email: fullEmail
			});
			toast({
				title: "Usuário Atualizado",
				description: "Dados salvos com sucesso."
			});
		} else {
			usersStore.addUser({
				...formData,
				email: fullEmail
			});
			toast({
				title: "Usuário Adicionado",
				description: "Novo acesso concedido à organização."
			});
		}
		setDialogOpen(false);
	};
	const handleSyncM365 = async () => {
		if (!primaryDomain) return;
		setIsSyncing(true);
		const token = sessionStorage.getItem("m365_token");
		if (token && clientId && tenantId) try {
			const response = await fetch("https://graph.microsoft.com/v1.0/users?$select=id,displayName,mail,userPrincipalName", { headers: { Authorization: `Bearer ${token}` } });
			if (!response.ok) {
				const err = await response.json().catch(() => null);
				throw new Error(err?.error?.message || "Falha ao buscar usuários da Graph API. Verifique as permissões de leitura (User.ReadBasic.All).");
			}
			const validUsers = ((await response.json()).value || []).filter((u) => {
				return (u.mail || u.userPrincipalName || "").toLowerCase().endsWith(`@${primaryDomain.toLowerCase()}`);
			}).map((u) => ({
				id: u.id,
				name: u.displayName || "Usuário M365",
				email: (u.mail || u.userPrincipalName).toLowerCase(),
				role: "Vistoriador",
				avatar: ""
			}));
			usersStore.syncUsers(validUsers);
			toast({
				title: "Sincronização Entra ID Concluída",
				description: `${validUsers.length} usuários importados e validados do M365.`
			});
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro de Sincronização M365",
				description: e.message
			});
		} finally {
			setIsSyncing(false);
		}
		else setTimeout(() => {
			const mockFetched = [
				{
					id: "usr-1",
					name: "Admin Sistema",
					email: `admin@${primaryDomain}`,
					role: "Admin",
					avatar: ""
				},
				{
					id: "usr-2",
					name: "Ismail Abdo",
					email: `ismail@${primaryDomain}`,
					role: "Diretor",
					avatar: ""
				},
				{
					id: "usr-3",
					name: "Mariana Costa",
					email: `mariana.costa@${primaryDomain}`,
					role: "Jurídico",
					avatar: ""
				},
				{
					id: "usr-4",
					name: "Roberto Alves",
					email: `roberto.alves@${primaryDomain}`,
					role: "Gerente",
					avatar: ""
				}
			];
			usersStore.syncUsers(mockFetched);
			setIsSyncing(false);
			toast({
				title: "Sincronização Simulada Concluída",
				description: `Usuários sincronizados para o domínio @${primaryDomain}. Cadastre credenciais reais na aba Integração para obter usuários online.`
			});
		}, 1500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/settings/PermissionsSettings.tsx:213:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/components/settings/PermissionsSettings.tsx:214:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				"data-uid": "src/components/settings/PermissionsSettings.tsx:215:9",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/settings/PermissionsSettings.tsx:216:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:217:13",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:218:15",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Contas e Acessos M365"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:220:13",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col gap-1 mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:221:15",
							"data-prohibitions": "[]",
							children: "Gerencie quais emails corporativos têm permissão para acessar a plataforma."
						}), primaryDomain ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:225:17",
							"data-prohibitions": "[editContent]",
							className: "inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit mt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:226:19",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1"
								}),
								" Permissões restritas ao domínio vinculado: @",
								primaryDomain
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:230:17",
							"data-prohibitions": "[]",
							className: "inline-flex items-center text-xs font-medium text-destructive bg-destructive/10 border border-destructive/20 px-2 py-1 rounded w-fit mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:231:19",
								"data-prohibitions": "[editContent]",
								className: "w-3 h-3 mr-1"
							}), " Configure o Domínio Primário para gerenciar acessos"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/settings/PermissionsSettings.tsx:237:11",
					"data-prohibitions": "[editContent]",
					className: "flex gap-2 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:238:13",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						onClick: handleSyncM365,
						disabled: !primaryDomain || isSyncing,
						className: "gap-2 flex-1 sm:flex-none",
						children: [isSyncing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:245:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 animate-spin"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:247:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						}), "Sincronizar M365"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:251:13",
						"data-prohibitions": "[]",
						onClick: handleOpenNew,
						className: "gap-2 flex-1 sm:flex-none",
						disabled: !primaryDomain,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:256:15",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						}), " Novo"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/components/settings/PermissionsSettings.tsx:260:9",
				"data-prohibitions": "[editContent]",
				className: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/components/settings/PermissionsSettings.tsx:261:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:262:13",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:263:15",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:264:17",
									"data-prohibitions": "[]",
									children: "Usuário"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:265:17",
									"data-prohibitions": "[]",
									children: "Email M365 Autorizado"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:266:17",
									"data-prohibitions": "[]",
									children: "Perfil de Acesso"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:267:17",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Ações"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:270:13",
						"data-prohibitions": "[editContent]",
						children: [users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:272:17",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:273:19",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:274:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:275:23",
											"data-prohibitions": "[]",
											className: "h-8 w-8",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:276:25",
												"data-prohibitions": "[editContent]",
												src: user.avatar,
												className: "object-cover"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:277:25",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
													"data-uid": "src/components/settings/PermissionsSettings.tsx:278:27",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4 text-muted-foreground"
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:281:23",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: user.name
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:284:19",
									"data-prohibitions": "[editContent]",
									className: "text-muted-foreground",
									children: user.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:285:19",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:286:21",
										"data-prohibitions": "[editContent]",
										value: user.role,
										onValueChange: (val) => handleRoleChange(user.id, val),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:290:23",
											"data-prohibitions": "[]",
											className: "w-[180px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCog, {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:291:25",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 mr-2 text-muted-foreground"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:292:25",
												"data-prohibitions": "[editContent]"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:294:23",
											"data-prohibitions": "[editContent]",
											children: availableRoles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:296:27",
												"data-prohibitions": "[editContent]",
												value: role,
												children: role
											}, role))
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:303:19",
									"data-prohibitions": "[]",
									className: "text-right space-x-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:304:21",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										onClick: () => handleOpenEdit(user),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:305:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 text-muted-foreground"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:307:21",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										onClick: () => handleRemove(user.id),
										className: "text-destructive hover:text-destructive hover:bg-destructive/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:313:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										})
									})]
								})
							]
						}, user.id)), users.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:319:17",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:320:19",
								"data-prohibitions": "[editContent]",
								colSpan: 4,
								className: "text-center py-6 text-muted-foreground",
								children: primaryDomain ? "Nenhum usuário encontrado. Sincronize com o M365 ou adicione manualmente." : "Cadastre o Domínio Primário na Integração SharePoint para gerenciar acessos."
							})
						})]
					})]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			"data-uid": "src/components/settings/PermissionsSettings.tsx:332:7",
			"data-prohibitions": "[editContent]",
			open: dialogOpen,
			onOpenChange: setDialogOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				"data-uid": "src/components/settings/PermissionsSettings.tsx:333:9",
				"data-prohibitions": "[editContent]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:334:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:335:13",
							"data-prohibitions": "[editContent]",
							children: editId ? "Editar Usuário M365" : "Autorizar Novo Usuário"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:336:13",
							"data-prohibitions": "[]",
							children: "Apenas contas pertencentes ao domínio oficial da organização podem ser cadastradas."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:340:11",
						"data-prohibitions": "[editContent]",
						className: "grid gap-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:341:13",
								"data-prohibitions": "[]",
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:342:15",
									"data-prohibitions": "[]",
									children: "Nome Completo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:343:15",
									"data-prohibitions": "[editContent]",
									value: formData.name,
									onChange: (e) => setFormData({
										...formData,
										name: e.target.value
									}),
									placeholder: "Ex: João Silva"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:349:13",
								"data-prohibitions": "[editContent]",
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:350:15",
									"data-prohibitions": "[]",
									children: "Identificação (Email)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:351:15",
									"data-prohibitions": "[editContent]",
									className: "flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:352:17",
										"data-prohibitions": "[editContent]",
										className: "rounded-r-none focus-visible:z-10",
										value: localEmailPart,
										onChange: (e) => setLocalEmailPart(e.target.value.replace(/@.*/, "").trim()),
										placeholder: "joao.silva"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:358:17",
										"data-prohibitions": "[editContent]",
										className: "inline-flex items-center px-3 border border-l-0 border-input rounded-r-md bg-muted text-muted-foreground text-sm font-medium",
										children: ["@", primaryDomain]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:363:13",
								"data-prohibitions": "[editContent]",
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:364:15",
									"data-prohibitions": "[]",
									children: "Perfil de Acesso Inicial"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:365:15",
									"data-prohibitions": "[editContent]",
									value: formData.role,
									onValueChange: (val) => setFormData({
										...formData,
										role: val
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:369:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:370:19",
											"data-prohibitions": "[editContent]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:372:17",
										"data-prohibitions": "[editContent]",
										children: availableRoles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:374:21",
											"data-prohibitions": "[editContent]",
											value: role,
											children: role
										}, role))
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:382:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:383:13",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: () => setDialogOpen(false),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:386:13",
							"data-prohibitions": "[]",
							onClick: handleSave,
							children: "Salvar Usuário"
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { PermissionsSettings as default };

//# sourceMappingURL=PermissionsSettings-BqD_WS9O.js.map