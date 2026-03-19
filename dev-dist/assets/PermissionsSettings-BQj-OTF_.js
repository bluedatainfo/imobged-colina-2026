import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { c as composeEventHandlers, n as Primitive, s as createContextScope, t as useControllableState } from "./dist-eDAgkTen.js";
import { n as useComposedRefs } from "./dist-CaOfgRRz.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-DfXDXNfA.js";
import { n as Presence } from "./dist-sgnhZ4Tf.js";
import { n as createLucideIcon, t as cn } from "./utils-BNj1jY-i.js";
import { t as Check } from "./check-Lt8-yx3r.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DY7CHZKJ.js";
import { t as CircleAlert } from "./circle-alert-_O5Lo3cp.js";
import { t as CircleCheck } from "./circle-check-rq1QdBQ_.js";
import { t as CloudUpload } from "./cloud-upload-BTeCl0_P.js";
import { t as Pencil } from "./pencil-7OST9Y8W.js";
import { t as RefreshCw } from "./refresh-cw-Dc9dLNp0.js";
import { t as Shield } from "./shield-lpJmVGrK.js";
import { t as Trash2 } from "./trash-2-5ycRoo00.js";
import { t as useSize } from "./dist-vqNX7V-C2.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import "./client-CX_7U15l.js";
import { i as useMainStore, r as mainStore } from "./main-B7dr_xNS.js";
import { n as useUsersStore, r as usersStore } from "./users-1CY0fc8C.js";
import { B as LoaderCircle, E as Input, M as User, R as Plus, h as AvatarImage, m as AvatarFallback, p as Avatar } from "./index-DUtgM6U2.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CcQxuH73.js";
import { t as Label } from "./label-DczgnaR7.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C8VQf44z.js";
import { t as usePrevious } from "./dist-DyET0LuT.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DgUft94H.js";
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
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/@radix-ui+react-checkbox@1.3.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_a9bfe74df417688e01ae6068318bf0dd/node_modules/@radix-ui/react-checkbox/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
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
//#region src/components/settings/PermissionsSettings.tsx
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
	const store = useMainStore();
	const { primaryDomain, clientId, tenantId } = store.sharepoint;
	const { settings } = store;
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
	const toggleSpIntegrationRole = (role, checked) => {
		let newRoles = [...settings.spIntegrationRoles || []];
		if (checked) {
			if (!newRoles.includes(role)) newRoles.push(role);
		} else newRoles = newRoles.filter((r) => r !== role);
		mainStore.updateSettings({ spIntegrationRoles: newRoles });
		toast({
			title: "Permissões de Integração Atualizadas",
			description: `O acesso do perfil ${role} ao SharePoint foi modificado.`
		});
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
		"data-uid": "src/components/settings/PermissionsSettings.tsx:233:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/components/settings/PermissionsSettings.tsx:234:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/components/settings/PermissionsSettings.tsx:235:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:236:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:237:13",
							"data-prohibitions": "[]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:238:15",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-primary"
							}), " Contas e Acessos M365"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:240:13",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-1 mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:241:15",
								"data-prohibitions": "[]",
								children: "Gerencie quais emails corporativos têm permissão para acessar a plataforma."
							}), primaryDomain ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:245:17",
								"data-prohibitions": "[editContent]",
								className: "inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit mt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:246:19",
										"data-prohibitions": "[editContent]",
										className: "w-3 h-3 mr-1"
									}),
									" Permissões restritas ao domínio vinculado: @",
									primaryDomain
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:250:17",
								"data-prohibitions": "[]",
								className: "inline-flex items-center text-xs font-medium text-destructive bg-destructive/10 border border-destructive/20 px-2 py-1 rounded w-fit mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:251:19",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1"
								}), " Configure o Domínio Primário para gerenciar acessos"]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:257:11",
						"data-prohibitions": "[editContent]",
						className: "flex gap-2 w-full sm:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:258:13",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							onClick: handleSyncM365,
							disabled: !primaryDomain || isSyncing,
							className: "gap-2 flex-1 sm:flex-none",
							children: [isSyncing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:265:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 animate-spin"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:267:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), "Sincronizar M365"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:271:13",
							"data-prohibitions": "[]",
							onClick: handleOpenNew,
							className: "gap-2 flex-1 sm:flex-none",
							disabled: !primaryDomain,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:276:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), " Novo"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/components/settings/PermissionsSettings.tsx:280:9",
					"data-prohibitions": "[editContent]",
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:281:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:282:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:283:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:284:17",
										"data-prohibitions": "[]",
										children: "Usuário"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:285:17",
										"data-prohibitions": "[]",
										children: "Email M365 Autorizado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:286:17",
										"data-prohibitions": "[]",
										children: "Perfil de Acesso"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:287:17",
										"data-prohibitions": "[]",
										className: "text-right",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:290:13",
							"data-prohibitions": "[editContent]",
							children: [users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:292:17",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:293:19",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:294:21",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:295:23",
												"data-prohibitions": "[]",
												className: "h-8 w-8",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
													"data-uid": "src/components/settings/PermissionsSettings.tsx:296:25",
													"data-prohibitions": "[editContent]",
													src: user.avatar,
													className: "object-cover"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
													"data-uid": "src/components/settings/PermissionsSettings.tsx:297:25",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
														"data-uid": "src/components/settings/PermissionsSettings.tsx:298:27",
														"data-prohibitions": "[editContent]",
														className: "h-4 w-4 text-muted-foreground"
													})
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:301:23",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: user.name
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:304:19",
										"data-prohibitions": "[editContent]",
										className: "text-muted-foreground",
										children: user.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:305:19",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:306:21",
											"data-prohibitions": "[editContent]",
											value: user.role,
											onValueChange: (val) => handleRoleChange(user.id, val),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:310:23",
												"data-prohibitions": "[]",
												className: "w-[180px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCog, {
													"data-uid": "src/components/settings/PermissionsSettings.tsx:311:25",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 mr-2 text-muted-foreground"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/components/settings/PermissionsSettings.tsx:312:25",
													"data-prohibitions": "[editContent]"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:314:23",
												"data-prohibitions": "[editContent]",
												children: availableRoles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/settings/PermissionsSettings.tsx:316:27",
													"data-prohibitions": "[editContent]",
													value: role,
													children: role
												}, role))
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:323:19",
										"data-prohibitions": "[]",
										className: "text-right space-x-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:324:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											onClick: () => handleOpenEdit(user),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:325:23",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:327:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											onClick: () => handleRemove(user.id),
											className: "text-destructive hover:text-destructive hover:bg-destructive/10",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:333:23",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4"
											})
										})]
									})
								]
							}, user.id)), users.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:339:17",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:340:19",
									"data-prohibitions": "[editContent]",
									colSpan: 4,
									className: "text-center py-6 text-muted-foreground",
									children: primaryDomain ? "Nenhum usuário encontrado. Sincronize com o M365 ou adicione manualmente." : "Cadastre o Domínio Primário na Integração SharePoint para gerenciar acessos."
								})
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/components/settings/PermissionsSettings.tsx:352:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/components/settings/PermissionsSettings.tsx:353:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:354:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:355:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Permissões de Integração SharePoint"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:357:11",
						"data-prohibitions": "[]",
						children: "Defina quais perfis podem realizar uploads e sincronizar dados com o ambiente M365."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/components/settings/PermissionsSettings.tsx:361:9",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/settings/PermissionsSettings.tsx:362:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
						children: availableRoles.map((role) => {
							const isChecked = settings.spIntegrationRoles?.includes(role) ?? false;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:366:17",
								"data-prohibitions": "[editContent]",
								className: "flex items-center space-x-2 border p-3 rounded-lg bg-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:370:19",
									"data-prohibitions": "[editContent]",
									id: `sp-role-${role}`,
									checked: isChecked,
									onCheckedChange: (c) => toggleSpIntegrationRole(role, c)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:375:19",
									"data-prohibitions": "[editContent]",
									htmlFor: `sp-role-${role}`,
									className: "text-sm font-medium leading-none cursor-pointer",
									children: role
								})]
							}, role);
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/components/settings/PermissionsSettings.tsx:388:7",
				"data-prohibitions": "[editContent]",
				open: dialogOpen,
				onOpenChange: setDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/components/settings/PermissionsSettings.tsx:389:9",
					"data-prohibitions": "[editContent]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:390:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:391:13",
								"data-prohibitions": "[editContent]",
								children: editId ? "Editar Usuário M365" : "Autorizar Novo Usuário"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:392:13",
								"data-prohibitions": "[]",
								children: "Apenas contas pertencentes ao domínio oficial da organização podem ser cadastradas."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/PermissionsSettings.tsx:396:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:397:13",
									"data-prohibitions": "[]",
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:398:15",
										"data-prohibitions": "[]",
										children: "Nome Completo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:399:15",
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
									"data-uid": "src/components/settings/PermissionsSettings.tsx:405:13",
									"data-prohibitions": "[editContent]",
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:406:15",
										"data-prohibitions": "[]",
										children: "Identificação (Email)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:407:15",
										"data-prohibitions": "[editContent]",
										className: "flex",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:408:17",
											"data-prohibitions": "[editContent]",
											className: "rounded-r-none focus-visible:z-10",
											value: localEmailPart,
											onChange: (e) => setLocalEmailPart(e.target.value.replace(/@.*/, "").trim()),
											placeholder: "joao.silva"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:414:17",
											"data-prohibitions": "[editContent]",
											className: "inline-flex items-center px-3 border border-l-0 border-input rounded-r-md bg-muted text-muted-foreground text-sm font-medium",
											children: ["@", primaryDomain]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/settings/PermissionsSettings.tsx:419:13",
									"data-prohibitions": "[editContent]",
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:420:15",
										"data-prohibitions": "[]",
										children: "Perfil de Acesso Inicial"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/components/settings/PermissionsSettings.tsx:421:15",
										"data-prohibitions": "[editContent]",
										value: formData.role,
										onValueChange: (val) => setFormData({
											...formData,
											role: val
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:425:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:426:19",
												"data-prohibitions": "[editContent]"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
											"data-uid": "src/components/settings/PermissionsSettings.tsx:428:17",
											"data-prohibitions": "[editContent]",
											children: availableRoles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/components/settings/PermissionsSettings.tsx:430:21",
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
							"data-uid": "src/components/settings/PermissionsSettings.tsx:438:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:439:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setDialogOpen(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/settings/PermissionsSettings.tsx:442:13",
								"data-prohibitions": "[]",
								onClick: handleSave,
								children: "Salvar Usuário"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { PermissionsSettings as default };

//# sourceMappingURL=PermissionsSettings-BQj-OTF_.js.map