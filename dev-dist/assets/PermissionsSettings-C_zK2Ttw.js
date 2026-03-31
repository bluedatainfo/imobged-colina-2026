import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { c as composeEventHandlers, n as Primitive, s as createContextScope, t as useControllableState } from "./dist-eDAgkTen.js";
import { n as useComposedRefs } from "./dist-CaOfgRRz.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-DfXDXNfA.js";
import { n as Presence } from "./dist-sgnhZ4Tf.js";
import { o as Check } from "./dist-BKqeEvXI.js";
import { n as createLucideIcon, t as cn } from "./utils-BNj1jY-i.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Bhi7Xfj7.js";
import { t as CircleAlert } from "./circle-alert-tq6C5WFm.js";
import { t as CircleCheck } from "./circle-check-wj6pmJkc.js";
import { t as CloudUpload } from "./cloud-upload-Dec2qn3q.js";
import { t as RefreshCw } from "./refresh-cw-QaQDb9vQ.js";
import { t as Shield } from "./shield-lpJmVGrK.js";
import { t as Trash2 } from "./trash-2-5ycRoo00.js";
import { t as useSize } from "./dist-vqNX7V-C2.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import "./client-CX_7U15l.js";
import { i as useMainStore, r as mainStore } from "./main-D9Du5SIX.js";
import { n as useUsersStore, r as usersStore } from "./users-BeN6ShO_.js";
import { A as Input, B as User, d as Avatar, f as AvatarFallback, p as AvatarImage, q as Plus } from "./index-pvFUi-63.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CcQxuH73.js";
import { t as Label } from "./label-DczgnaR7.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C8VQf44z.js";
import { t as usePrevious } from "./dist-DyET0LuT.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-KrPFNtiv.js";
import { n as ScrollBar, t as ScrollArea } from "./scroll-area-Cw8cMjbc.js";
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
//#region src/components/settings/UserManagement.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var availableRoles$2 = [
	"Admin",
	"Diretor",
	"Gerente",
	"Gestor de Contrato",
	"Vistoriador",
	"Jurídico",
	"Financeiro",
	"Corretor"
];
function UserManagement() {
	const { users } = useUsersStore();
	const { sharepoint: { primaryDomain, clientId, tenantId } } = useMainStore();
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
			description: `Perfil alterado para ${newRole}.`
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
		setLocalEmailPart(user.email.split("@")[0]);
		setFormData({
			name: user.name,
			role: user.role
		});
		setDialogOpen(true);
	};
	const handleSave = () => {
		if (!formData.name || !localEmailPart || !primaryDomain) return toast({
			variant: "destructive",
			title: "Erro",
			description: "Preencha todos os campos."
		});
		const fullEmail = `${localEmailPart}@${primaryDomain}`;
		if (editId) {
			usersStore.updateUser(editId, {
				...formData,
				email: fullEmail
			});
			toast({
				title: "Atualizado",
				description: "Usuário salvo com sucesso."
			});
		} else {
			usersStore.addUser({
				...formData,
				email: fullEmail
			});
			toast({
				title: "Adicionado",
				description: "Novo usuário criado."
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
			if (!response.ok) throw new Error("Falha ao buscar usuários da Graph API.");
			const validUsers = ((await response.json()).value || []).filter((u) => (u.mail || u.userPrincipalName || "").toLowerCase().endsWith(`@${primaryDomain.toLowerCase()}`)).map((u) => ({
				id: u.id,
				name: u.displayName || "Usuário M365",
				email: (u.mail || u.userPrincipalName).toLowerCase(),
				role: "Vistoriador",
				avatar: ""
			}));
			usersStore.syncUsers(validUsers);
			toast({
				title: "Sincronização Concluída",
				description: `${validUsers.length} usuários importados.`
			});
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro de Sincronização",
				description: e.message
			});
		} finally {
			setIsSyncing(false);
		}
		else setTimeout(() => {
			setIsSyncing(false);
			toast({
				title: "Sincronização Simulada",
				description: "Cadastre credenciais para uso real."
			});
		}, 1e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/settings/UserManagement.tsx:156:7",
		"data-prohibitions": "[editContent]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/components/settings/UserManagement.tsx:157:9",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col sm:flex-row justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/settings/UserManagement.tsx:158:11",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					"data-uid": "src/components/settings/UserManagement.tsx:159:13",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
						"data-uid": "src/components/settings/UserManagement.tsx:160:15",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-primary"
					}), " Contas e Acessos M365"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
					"data-uid": "src/components/settings/UserManagement.tsx:162:13",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col gap-1 mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/settings/UserManagement.tsx:163:15",
						"data-prohibitions": "[]",
						children: "Gerencie emails corporativos permitidos."
					}), primaryDomain ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-uid": "src/components/settings/UserManagement.tsx:165:17",
						"data-prohibitions": "[editContent]",
						className: "inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"data-uid": "src/components/settings/UserManagement.tsx:166:19",
								"data-prohibitions": "[editContent]",
								className: "w-3 h-3 mr-1"
							}),
							" @",
							primaryDomain
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-uid": "src/components/settings/UserManagement.tsx:169:17",
						"data-prohibitions": "[]",
						className: "inline-flex items-center text-xs font-medium text-destructive bg-destructive/10 border border-destructive/20 px-2 py-1 rounded w-fit",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
							"data-uid": "src/components/settings/UserManagement.tsx:170:19",
							"data-prohibitions": "[editContent]",
							className: "w-3 h-3 mr-1"
						}), " Domínio não configurado"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/settings/UserManagement.tsx:175:11",
				"data-prohibitions": "[editContent]",
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/components/settings/UserManagement.tsx:176:13",
					"data-prohibitions": "[editContent]",
					variant: "outline",
					onClick: handleSyncM365,
					disabled: !primaryDomain || isSyncing,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							"data-uid": "src/components/settings/UserManagement.tsx:181:15",
							"data-prohibitions": "[editContent]",
							className: `w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`
						}),
						" ",
						"Sincronizar"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/components/settings/UserManagement.tsx:184:13",
					"data-prohibitions": "[]",
					onClick: handleOpenNew,
					disabled: !primaryDomain,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/components/settings/UserManagement.tsx:185:15",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4 mr-2"
					}), " Novo"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/components/settings/UserManagement.tsx:189:9",
			"data-prohibitions": "[editContent]",
			className: "p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/components/settings/UserManagement.tsx:190:11",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/components/settings/UserManagement.tsx:191:13",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/settings/UserManagement.tsx:192:15",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/settings/UserManagement.tsx:193:17",
								"data-prohibitions": "[]",
								children: "Usuário"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/settings/UserManagement.tsx:194:17",
								"data-prohibitions": "[]",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/settings/UserManagement.tsx:195:17",
								"data-prohibitions": "[]",
								children: "Perfil"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/settings/UserManagement.tsx:196:17",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Ações"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
					"data-uid": "src/components/settings/UserManagement.tsx:199:13",
					"data-prohibitions": "[editContent]",
					children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/settings/UserManagement.tsx:201:17",
						"data-prohibitions": "[editContent]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/settings/UserManagement.tsx:202:19",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/settings/UserManagement.tsx:203:21",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											"data-uid": "src/components/settings/UserManagement.tsx:204:23",
											"data-prohibitions": "[]",
											className: "h-8 w-8",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
												"data-uid": "src/components/settings/UserManagement.tsx:205:25",
												"data-prohibitions": "[editContent]",
												src: u.avatar
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
												"data-uid": "src/components/settings/UserManagement.tsx:206:25",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
													"data-uid": "src/components/settings/UserManagement.tsx:207:27",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4"
												})
											})]
										}),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/settings/UserManagement.tsx:210:23",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: u.name
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/settings/UserManagement.tsx:213:19",
								"data-prohibitions": "[editContent]",
								children: u.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/settings/UserManagement.tsx:214:19",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/components/settings/UserManagement.tsx:215:21",
									"data-prohibitions": "[editContent]",
									value: u.role,
									onValueChange: (v) => handleRoleChange(u.id, v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
										"data-uid": "src/components/settings/UserManagement.tsx:216:23",
										"data-prohibitions": "[]",
										className: "w-[180px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCog, {
											"data-uid": "src/components/settings/UserManagement.tsx:217:25",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/components/settings/UserManagement.tsx:218:25",
											"data-prohibitions": "[editContent]"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
										"data-uid": "src/components/settings/UserManagement.tsx:220:23",
										"data-prohibitions": "[editContent]",
										children: availableRoles$2.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/settings/UserManagement.tsx:222:27",
											"data-prohibitions": "[editContent]",
											value: r,
											children: r
										}, r))
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								"data-uid": "src/components/settings/UserManagement.tsx:229:19",
								"data-prohibitions": "[]",
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/components/settings/UserManagement.tsx:230:21",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									onClick: () => handleOpenEdit(u),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
										"data-uid": "src/components/settings/UserManagement.tsx:231:23",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 text-muted-foreground"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/components/settings/UserManagement.tsx:233:21",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									onClick: () => usersStore.removeUser(u.id),
									className: "text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										"data-uid": "src/components/settings/UserManagement.tsx:239:23",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									})
								})]
							})
						]
					}, u.id))
				})]
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/settings/UserManagement.tsx:248:7",
		"data-prohibitions": "[editContent]",
		open: dialogOpen,
		onOpenChange: setDialogOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/settings/UserManagement.tsx:249:9",
			"data-prohibitions": "[editContent]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					"data-uid": "src/components/settings/UserManagement.tsx:250:11",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/components/settings/UserManagement.tsx:251:13",
						"data-prohibitions": "[editContent]",
						children: editId ? "Editar" : "Novo Usuário"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/settings/UserManagement.tsx:253:11",
					"data-prohibitions": "[editContent]",
					className: "grid gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/UserManagement.tsx:254:13",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/settings/UserManagement.tsx:255:15",
								"data-prohibitions": "[]",
								children: "Nome"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/settings/UserManagement.tsx:256:15",
								"data-prohibitions": "[editContent]",
								value: formData.name,
								onChange: (e) => setFormData({
									...formData,
									name: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/UserManagement.tsx:261:13",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/settings/UserManagement.tsx:262:15",
								"data-prohibitions": "[]",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/UserManagement.tsx:263:15",
								"data-prohibitions": "[editContent]",
								className: "flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/components/settings/UserManagement.tsx:264:17",
									"data-prohibitions": "[editContent]",
									className: "rounded-r-none",
									value: localEmailPart,
									onChange: (e) => setLocalEmailPart(e.target.value.trim())
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/settings/UserManagement.tsx:269:17",
									"data-prohibitions": "[editContent]",
									className: "inline-flex items-center px-3 border border-l-0 rounded-r-md bg-muted text-sm",
									children: ["@", primaryDomain]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/UserManagement.tsx:274:13",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/settings/UserManagement.tsx:275:15",
								"data-prohibitions": "[]",
								children: "Perfil"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/settings/UserManagement.tsx:276:15",
								"data-prohibitions": "[editContent]",
								value: formData.role,
								onValueChange: (v) => setFormData({
									...formData,
									role: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/settings/UserManagement.tsx:280:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/settings/UserManagement.tsx:281:19",
										"data-prohibitions": "[editContent]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/components/settings/UserManagement.tsx:283:17",
									"data-prohibitions": "[editContent]",
									children: availableRoles$2.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/settings/UserManagement.tsx:285:21",
										"data-prohibitions": "[editContent]",
										value: r,
										children: r
									}, r))
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/settings/UserManagement.tsx:293:11",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/settings/UserManagement.tsx:294:13",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => setDialogOpen(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/settings/UserManagement.tsx:297:13",
						"data-prohibitions": "[]",
						onClick: handleSave,
						children: "Salvar"
					})]
				})
			]
		})
	})] });
}
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/@radix-ui+react-checkbox@1.3.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_a9bfe74df417688e01ae6068318bf0dd/node_modules/@radix-ui/react-checkbox/dist/index.mjs
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
	const { __scopeCheckbox, checked: checkedProp, children, defaultChecked, disabled, form, name, onCheckedChange, required, value = "on", internal_do_not_use_render } = props;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: CHECKBOX_NAME
	});
	const [control, setControl] = import_react.useState(null);
	const [bubbleInput, setBubbleInput] = import_react.useState(null);
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = control ? !!form || !!control.closest("form") : true;
	const context = {
		checked,
		disabled,
		setChecked,
		control,
		setControl,
		name,
		form,
		value,
		hasConsumerStoppedPropagationRef,
		required,
		defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
		isFormControl,
		bubbleInput,
		setBubbleInput
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProviderImpl, {
		scope: __scopeCheckbox,
		...context,
		children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
	});
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = import_react.forwardRef(({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
	const { control, value, disabled, checked, required, setControl, setChecked, hasConsumerStoppedPropagationRef, isFormControl, bubbleInput } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
	const composedRefs = useComposedRefs(forwardedRef, setControl);
	const initialCheckedStateRef = import_react.useRef(checked);
	import_react.useEffect(() => {
		const form = control?.form;
		if (form) {
			const reset = () => setChecked(initialCheckedStateRef.current);
			form.addEventListener("reset", reset);
			return () => form.removeEventListener("reset", reset);
		}
	}, [control, setChecked]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": isIndeterminate(checked) ? "mixed" : checked,
		"aria-required": required,
		"data-state": getState(checked),
		"data-disabled": disabled ? "" : void 0,
		disabled,
		value,
		...checkboxProps,
		ref: composedRefs,
		onKeyDown: composeEventHandlers(onKeyDown, (event) => {
			if (event.key === "Enter") event.preventDefault();
		}),
		onClick: composeEventHandlers(onClick, (event) => {
			setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
			if (bubbleInput && isFormControl) {
				hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
				if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
			}
		})
	});
});
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCheckbox, name, checked, defaultChecked, required, disabled, value, onCheckedChange, form, ...checkboxProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProvider, {
		__scopeCheckbox,
		checked,
		defaultChecked,
		disabled,
		required,
		onCheckedChange,
		name,
		form,
		value,
		internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxTrigger, {
			...checkboxProps,
			ref: forwardedRef,
			__scopeCheckbox
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxBubbleInput, { __scopeCheckbox })] })
	});
});
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
	const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isIndeterminate(context.checked) || context.checked === true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			"data-state": getState(context.checked),
			"data-disabled": context.disabled ? "" : void 0,
			...indicatorProps,
			ref: forwardedRef,
			style: {
				pointerEvents: "none",
				...props.style
			}
		})
	});
});
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = import_react.forwardRef(({ __scopeCheckbox, ...props }, forwardedRef) => {
	const { control, hasConsumerStoppedPropagationRef, checked, defaultChecked, required, disabled, name, value, form, bubbleInput, setBubbleInput } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
	const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = bubbleInput;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		const bubbles = !hasConsumerStoppedPropagationRef.current;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			input.indeterminate = isIndeterminate(checked);
			setChecked.call(input, isIndeterminate(checked) ? false : checked);
			input.dispatchEvent(event);
		}
	}, [
		bubbleInput,
		prevChecked,
		checked,
		hasConsumerStoppedPropagationRef
	]);
	const defaultCheckedRef = import_react.useRef(isIndeterminate(checked) ? false : checked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
		type: "checkbox",
		"aria-hidden": true,
		defaultChecked: defaultChecked ?? defaultCheckedRef.current,
		required,
		disabled,
		name,
		value,
		form,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
});
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
	return typeof value === "function";
}
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
//#endregion
//#region src/components/ui/checkbox.tsx
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	"data-uid": "src/components/ui/checkbox.tsx:12:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		"data-uid": "src/components/ui/checkbox.tsx:20:5",
		"data-prohibitions": "[editContent]",
		className: cn("flex items-center justify-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			"data-uid": "src/components/ui/checkbox.tsx:21:7",
			"data-prohibitions": "[editContent]",
			className: "h-4 w-4"
		})
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
//#endregion
//#region src/components/settings/RbacMatrix.tsx
var MENU_ITEMS = [
	{
		path: "/",
		label: "Dashboard"
	},
	{
		path: "/entities",
		label: "Entidades"
	},
	{
		path: "/documents",
		label: "Documentos"
	},
	{
		path: "/document-alerts",
		label: "Alertas GED"
	},
	{
		path: "/sync-monitor",
		label: "Monitor Sinc."
	},
	{
		path: "/manager-approval",
		label: "Análise Ger."
	},
	{
		path: "/inspections",
		label: "Vistorias"
	},
	{
		path: "/keys",
		label: "Chaves"
	},
	{
		path: "/contracts",
		label: "Contratos"
	},
	{
		path: "/templates",
		label: "Modelos"
	},
	{
		path: "/properties",
		label: "Imóveis"
	},
	{
		path: "/maintenance",
		label: "Manutenção"
	},
	{
		path: "/renewals",
		label: "Renovações"
	},
	{
		path: "/legal",
		label: "Jurídico"
	},
	{
		path: "/settings",
		label: "Configurações"
	},
	{
		path: "/profile",
		label: "Perfil"
	}
];
var availableRoles$1 = [
	"Admin",
	"Diretor",
	"Gerente",
	"Gestor de Contrato",
	"Vistoriador",
	"Jurídico",
	"Financeiro",
	"Corretor"
];
function RbacMatrix() {
	const { settings } = useMainStore();
	const toggleRbac = (role, path, checked) => {
		const currentRbac = { ...settings.rbac };
		let rolePaths = currentRbac[role] ? [...currentRbac[role]] : [];
		if (rolePaths.includes("all")) {
			if (checked) return;
			rolePaths = MENU_ITEMS.map((m) => m.path).filter((p) => p !== path);
		} else if (checked) {
			rolePaths.push(path);
			if (MENU_ITEMS.every((m) => rolePaths.includes(m.path))) rolePaths = ["all"];
		} else rolePaths = rolePaths.filter((p) => p !== path);
		currentRbac[role] = rolePaths;
		mainStore.updateSettings({ rbac: currentRbac });
	};
	const toggleAllRbac = (role, checked) => {
		const currentRbac = { ...settings.rbac };
		currentRbac[role] = checked ? ["all"] : [];
		mainStore.updateSettings({ rbac: currentRbac });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/settings/RbacMatrix.tsx:76:5",
		"data-prohibitions": "[editContent]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/components/settings/RbacMatrix.tsx:77:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				"data-uid": "src/components/settings/RbacMatrix.tsx:78:9",
				"data-prohibitions": "[]",
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
					"data-uid": "src/components/settings/RbacMatrix.tsx:79:11",
					"data-prohibitions": "[editContent]",
					className: "w-5 h-5 text-primary"
				}), " Matriz de Permissões (RBAC)"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
				"data-uid": "src/components/settings/RbacMatrix.tsx:81:9",
				"data-prohibitions": "[]",
				children: "Controle o acesso aos menus do sistema para cada perfil de usuário."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/components/settings/RbacMatrix.tsx:85:7",
			"data-prohibitions": "[editContent]",
			className: "p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
				"data-uid": "src/components/settings/RbacMatrix.tsx:86:9",
				"data-prohibitions": "[editContent]",
				className: "w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/components/settings/RbacMatrix.tsx:87:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/components/settings/RbacMatrix.tsx:88:13",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/settings/RbacMatrix.tsx:89:15",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/settings/RbacMatrix.tsx:90:17",
								"data-prohibitions": "[]",
								className: "min-w-[160px] sticky left-0 bg-background z-10",
								children: "Módulo / Menu"
							}), availableRoles$1.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/settings/RbacMatrix.tsx:94:19",
								"data-prohibitions": "[editContent]",
								className: "text-center min-w-[120px]",
								children: role
							}, role))]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
						"data-uid": "src/components/settings/RbacMatrix.tsx:100:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/settings/RbacMatrix.tsx:101:15",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/settings/RbacMatrix.tsx:102:17",
								"data-prohibitions": "[]",
								className: "font-semibold sticky left-0 bg-muted/30 z-10",
								children: "Acesso Total"
							}), availableRoles$1.map((role) => {
								const isAll = settings.rbac?.[role]?.includes("all");
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/RbacMatrix.tsx:108:21",
									"data-prohibitions": "[]",
									className: "text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										"data-uid": "src/components/settings/RbacMatrix.tsx:109:23",
										"data-prohibitions": "[editContent]",
										checked: isAll,
										disabled: role === "Admin",
										onCheckedChange: (c) => toggleAllRbac(role, c)
									})
								}, role);
							})]
						}), MENU_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/settings/RbacMatrix.tsx:119:17",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/settings/RbacMatrix.tsx:120:19",
								"data-prohibitions": "[editContent]",
								className: "sticky left-0 bg-background z-10",
								children: item.label
							}), availableRoles$1.map((role) => {
								const paths = settings.rbac?.[role] || [];
								const isChecked = paths.includes("all") || paths.includes(item.path);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/RbacMatrix.tsx:125:23",
									"data-prohibitions": "[]",
									className: "text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										"data-uid": "src/components/settings/RbacMatrix.tsx:126:25",
										"data-prohibitions": "[editContent]",
										checked: isChecked,
										disabled: role === "Admin" || paths.includes("all"),
										onCheckedChange: (c) => toggleRbac(role, item.path, c)
									})
								}, role);
							})]
						}, item.path))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
					"data-uid": "src/components/settings/RbacMatrix.tsx:138:11",
					"data-prohibitions": "[editContent]",
					orientation: "horizontal"
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/settings/IntegrationPermissions.tsx
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
function IntegrationPermissions() {
	const { settings } = useMainStore();
	const { toast } = useToast();
	const toggleSpIntegrationRole = (role, checked) => {
		let newRoles = [...settings.spIntegrationRoles || []];
		if (checked) {
			if (!newRoles.includes(role)) newRoles.push(role);
		} else newRoles = newRoles.filter((r) => r !== role);
		mainStore.updateSettings({ spIntegrationRoles: newRoles });
		toast({
			title: "Permissões Atualizadas",
			description: `Acesso do perfil ${role} modificado.`
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/settings/IntegrationPermissions.tsx:37:5",
		"data-prohibitions": "[editContent]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/components/settings/IntegrationPermissions.tsx:38:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				"data-uid": "src/components/settings/IntegrationPermissions.tsx:39:9",
				"data-prohibitions": "[]",
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
					"data-uid": "src/components/settings/IntegrationPermissions.tsx:40:11",
					"data-prohibitions": "[editContent]",
					className: "w-5 h-5 text-primary"
				}), " Permissões de Integração SharePoint"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
				"data-uid": "src/components/settings/IntegrationPermissions.tsx:42:9",
				"data-prohibitions": "[]",
				children: "Defina quais perfis podem realizar uploads e sincronizar dados com o ambiente M365."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/components/settings/IntegrationPermissions.tsx:46:7",
			"data-prohibitions": "[editContent]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/settings/IntegrationPermissions.tsx:47:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
				children: availableRoles.map((role) => {
					const isChecked = settings.spIntegrationRoles?.includes(role) ?? false;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/settings/IntegrationPermissions.tsx:51:15",
						"data-prohibitions": "[editContent]",
						className: "flex items-center space-x-2 border p-3 rounded-lg bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							"data-uid": "src/components/settings/IntegrationPermissions.tsx:52:17",
							"data-prohibitions": "[editContent]",
							id: `sp-role-${role}`,
							checked: isChecked,
							onCheckedChange: (c) => toggleSpIntegrationRole(role, c)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/components/settings/IntegrationPermissions.tsx:57:17",
							"data-prohibitions": "[editContent]",
							htmlFor: `sp-role-${role}`,
							className: "text-sm font-medium leading-none cursor-pointer",
							children: role
						})]
					}, role);
				})
			})
		})]
	});
}
//#endregion
//#region src/components/settings/PermissionsSettings.tsx
function PermissionsSettings() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/settings/PermissionsSettings.tsx:7:5",
		"data-prohibitions": "[]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserManagement, {
				"data-uid": "src/components/settings/PermissionsSettings.tsx:8:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RbacMatrix, {
				"data-uid": "src/components/settings/PermissionsSettings.tsx:9:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrationPermissions, {
				"data-uid": "src/components/settings/PermissionsSettings.tsx:10:7",
				"data-prohibitions": "[editContent]"
			})
		]
	});
}
//#endregion
export { PermissionsSettings as default };

//# sourceMappingURL=PermissionsSettings-C_zK2Ttw.js.map