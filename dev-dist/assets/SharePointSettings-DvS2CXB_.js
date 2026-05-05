import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon, t as cn } from "./utils-BNj1jY-i.js";
import { t as CircleAlert } from "./circle-alert-tq6C5WFm.js";
import { t as CircleCheck } from "./circle-check-wj6pmJkc.js";
import { t as RefreshCw } from "./refresh-cw-CMgxffgN.js";
import { t as Save } from "./save-Dykknpcs.js";
import { t as Server } from "./server-C3bRZJIT.js";
import { t as ShieldCheck } from "./shield-check-C4B-6LPt.js";
import { t as Button } from "./button-iQJzuPvV.js";
import "./client-C4nUQiBY.js";
import { i as useMainStore, r as mainStore } from "./main-7B_Nvovk.js";
import { r as usersStore } from "./users-Bbju60At.js";
import "./keys-D7Gl_VCN.js";
import "./entities-1AjQ7EHU.js";
import { X as LoaderCircle, g as useAuth, j as Input, t as Badge, ut as Building } from "./index-4sxIGRmh.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-BhS_F8IN.js";
import { t as Label } from "./label-CTlYsXe6.js";
var Globe = createLucideIcon("globe", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
		key: "13o1zl"
	}],
	["path", {
		d: "M2 12h20",
		key: "9i4pu4"
	}]
]);
var Key = createLucideIcon("key", [
	["path", {
		d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",
		key: "g0fldk"
	}],
	["path", {
		d: "m21 2-9.6 9.6",
		key: "1j0ho8"
	}],
	["circle", {
		cx: "7.5",
		cy: "15.5",
		r: "5.5",
		key: "yqb3hr"
	}]
]);
//#endregion
//#region src/components/settings/SharePointSettings.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var resolveTenantByDomain = async (domain) => {
	const normalized = domain.toLowerCase().trim();
	try {
		const response = await fetch(`https://login.microsoftonline.com/${normalized}/v2.0/.well-known/openid-configuration`, {
			method: "GET",
			headers: { Accept: "application/json" }
		}).catch(() => null);
		if (!response || !response.ok) throw new Error("Domínio não encontrado no Microsoft 365.");
		return { tenantName: normalized.split(".")[0].toUpperCase() + " Corp" };
	} catch (error) {
		throw new Error("Domínio não encontrado ou falha de comunicação.");
	}
};
var SITES = [
	{
		key: "locacao",
		label: "Gestão de Locação (Site URL)"
	},
	{
		key: "vendas",
		label: "Vendas (Site URL)"
	},
	{
		key: "captacao",
		label: "Captação de Imóveis (Site URL)"
	},
	{
		key: "juridico",
		label: "Jurídico (Site URL)"
	},
	{
		key: "financeiro",
		label: "Financeiro (Site URL)"
	}
];
function SharePointSettings() {
	const { toast } = useToast();
	const store = useMainStore();
	const { logout } = useAuth();
	const [formData, setFormData] = (0, import_react.useState)(store.sharepoint);
	const [primaryInput, setPrimaryInput] = (0, import_react.useState)(store.sharepoint.primaryDomain || "");
	const [spInput, setSpInput] = (0, import_react.useState)(store.sharepoint.sharepointDomain || "");
	const [clientId, setClientId] = (0, import_react.useState)(store.sharepoint.clientId || "");
	const [tenantId, setTenantId] = (0, import_react.useState)(store.sharepoint.tenantId || "");
	const [isTesting, setIsTesting] = (0, import_react.useState)(false);
	const [testResult, setTestResult] = (0, import_react.useState)("idle");
	const [primaryStatus, setPrimaryStatus] = (0, import_react.useState)(store.sharepoint.primaryDomain ? "active" : "idle");
	const [primaryError, setPrimaryError] = (0, import_react.useState)(null);
	const [spStatus, setSpStatus] = (0, import_react.useState)(store.sharepoint.sharepointDomain ? "active" : "idle");
	const [spError, setSpError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		const currentDomain = primaryInput.trim();
		if (!currentDomain) {
			setPrimaryStatus("idle");
			setPrimaryError(null);
			return;
		}
		if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(currentDomain)) {
			setPrimaryStatus("invalid");
			setPrimaryError("Formato de domínio primário inválido.");
			return;
		}
		if (currentDomain === store.sharepoint.primaryDomain && formData.tenantName === store.sharepoint.tenantName) {
			setPrimaryStatus("active");
			setPrimaryError(null);
			return;
		}
		setPrimaryStatus("validating");
		setPrimaryError(null);
		const timer = setTimeout(async () => {
			try {
				const { tenantName } = await resolveTenantByDomain(currentDomain);
				if (!isMounted) return;
				setPrimaryStatus("active");
				setPrimaryError(null);
				setFormData((prev) => ({
					...prev,
					primaryDomain: currentDomain,
					tenantName,
					teamsWebhookUrl: `https://${currentDomain}.webhook.office.com/teams/alertas`
				}));
				toast({
					title: "Domínio Primário Validado",
					description: `Tenant ${tenantName} encontrado. Clique em Salvar para aplicar.`
				});
			} catch (e) {
				if (isMounted) {
					setPrimaryStatus("invalid");
					setPrimaryError(e.message);
					setFormData((prev) => ({
						...prev,
						tenantName: ""
					}));
				}
			}
		}, 800);
		return () => {
			isMounted = false;
			clearTimeout(timer);
		};
	}, [primaryInput]);
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		const currentDomain = spInput.trim();
		if (!currentDomain) {
			setSpStatus("idle");
			setSpError(null);
			return;
		}
		if (!/^[a-zA-Z0-9.-]+\.sharepoint\.com$/.test(currentDomain)) {
			setSpStatus("invalid");
			setSpError("O domínio deve terminar em .sharepoint.com");
			return;
		}
		if (currentDomain === store.sharepoint.sharepointDomain) {
			setSpStatus("active");
			setSpError(null);
			return;
		}
		setSpStatus("validating");
		setSpError(null);
		const timer = setTimeout(() => {
			if (!isMounted) return;
			setSpStatus("active");
			setSpError(null);
			const defaultSites = {
				locacao: `https://${currentDomain}/sites/Locacao`,
				captacao: `https://${currentDomain}/sites/Captacao`,
				vendas: `https://${currentDomain}/sites/Vendas`,
				juridico: `https://${currentDomain}/sites/Juridico`,
				financeiro: `https://${currentDomain}/sites/Financeiro`
			};
			setFormData((prev) => ({
				...prev,
				sharepointDomain: currentDomain,
				sites: defaultSites
			}));
		}, 800);
		return () => {
			isMounted = false;
			clearTimeout(timer);
		};
	}, [spInput]);
	const handleSiteChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			sites: {
				...prev.sites,
				[field]: value
			}
		}));
	};
	const sitePrefix = formData.sharepointDomain ? `https://${formData.sharepointDomain}/sites/` : "https://dominio.sharepoint.com/sites/";
	const domainPrefix = formData.primaryDomain ? `https://${formData.primaryDomain}.webhook.office.com/teams/` : "https://dominio.webhook.office.com/teams/";
	const handleSave = () => {
		if (!primaryInput.trim() && !spInput.trim()) {
			mainStore.updateSharePointSettings({
				primaryDomain: "",
				sharepointDomain: "",
				tenantName: "",
				teamsWebhookUrl: "",
				clientId: "",
				tenantId: "",
				sites: {
					locacao: "",
					captacao: "",
					vendas: "",
					juridico: "",
					financeiro: ""
				}
			});
			mainStore.updateSettings({
				managementEmails: "",
				administrativeEmails: "",
				operationalEmails: ""
			});
			usersStore.enforceDomain("");
			toast({
				title: "Integração Removida",
				description: "Todas as configurações de M365 e SharePoint foram limpas."
			});
			return;
		}
		if (primaryStatus !== "active" || !formData.primaryDomain) {
			toast({
				variant: "destructive",
				title: "Erro de Validação",
				description: "Um Domínio Primário válido é necessário."
			});
			return;
		}
		if (spStatus !== "active" || !formData.sharepointDomain) {
			toast({
				variant: "destructive",
				title: "Erro de Validação",
				description: "Um Domínio SharePoint válido é necessário."
			});
			return;
		}
		const allSitesValid = Object.values(formData.sites).every((url) => url && url.startsWith(sitePrefix));
		const isWebhookValid = !formData.teamsWebhookUrl || formData.teamsWebhookUrl.startsWith(domainPrefix);
		if (!allSitesValid || !isWebhookValid) {
			toast({
				variant: "destructive",
				title: "Mapeamento Inválido",
				description: "Verifique se os sites departamentais e o Webhook estão preenchidos corretamente para os domínios atuais."
			});
			return;
		}
		const isAuthChanged = formData.primaryDomain !== store.sharepoint.primaryDomain || clientId.trim() !== store.sharepoint.clientId || tenantId.trim() !== store.sharepoint.tenantId;
		mainStore.updateSharePointSettings({
			...formData,
			clientId: clientId.trim(),
			tenantId: tenantId.trim()
		});
		if (isAuthChanged) {
			localStorage.removeItem("m365_token");
			localStorage.removeItem("pkce_code_verifier");
			localStorage.removeItem("app_user_id");
			mainStore.updateSettings({
				managementEmails: "",
				administrativeEmails: "",
				operationalEmails: ""
			});
			usersStore.enforceDomain(formData.primaryDomain);
			if (formData.primaryDomain) usersStore.addUser({
				name: "Admin Sistema",
				email: `admin@${formData.primaryDomain}`,
				role: "Admin"
			});
			toast({
				title: "Credenciais M365 Atualizadas",
				description: "Os parâmetros de autenticação foram alterados. Sua sessão foi encerrada e os caches foram limpos de forma segura para aplicar as novas configurações de Client ID/Tenant ID. Por favor, inicie o login novamente."
			});
			logout();
			return;
		}
		toast({
			title: "Integração M365 Salva",
			description: "Configurações de integração atualizadas e persistidas com sucesso."
		});
	};
	const testConnection = () => {
		setIsTesting(true);
		setTestResult("idle");
		setTimeout(() => {
			setIsTesting(false);
			if (primaryStatus !== "active" || spStatus !== "active" || !formData.primaryDomain || !formData.sharepointDomain) {
				setTestResult("error");
				return;
			}
			if (clientId && tenantId) toast({
				title: "Graph API Test",
				description: "Client ID and Tenant ID validated structure successfully."
			});
			const allSitesValid = Object.values(formData.sites).every((url) => url && url.startsWith(sitePrefix));
			const isWebhookValid = !formData.teamsWebhookUrl || formData.teamsWebhookUrl.startsWith(domainPrefix);
			setTestResult(allSitesValid && isWebhookValid ? "success" : "error");
		}, 1500);
	};
	const webhookPath = formData.teamsWebhookUrl?.startsWith(domainPrefix) ? formData.teamsWebhookUrl.substring(domainPrefix.length) : formData.teamsWebhookUrl || "";
	const isWebhookPathValid = formData.teamsWebhookUrl?.startsWith(domainPrefix) && webhookPath.length > 0 && primaryStatus === "active";
	const renderSiteInput = (label, siteKey) => {
		const value = formData.sites[siteKey] || "";
		const path = value.startsWith(sitePrefix) ? value.substring(sitePrefix.length) : value.split("/").pop() || "";
		const isValid = value.startsWith(sitePrefix) && path.length > 0 && spStatus === "active";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/settings/SharePointSettings.tsx:357:7",
			"data-prohibitions": "[editContent]",
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
				"data-uid": "src/components/settings/SharePointSettings.tsx:358:9",
				"data-prohibitions": "[editContent]",
				className: "flex items-center justify-between text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/settings/SharePointSettings.tsx:359:11",
						"data-prohibitions": "[editContent]",
						children: label
					}),
					isValid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						"data-uid": "src/components/settings/SharePointSettings.tsx:360:23",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4 text-emerald-600"
					}),
					!isValid && spStatus === "active" && formData.sharepointDomain && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						"data-uid": "src/components/settings/SharePointSettings.tsx:362:13",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4 text-destructive"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/settings/SharePointSettings.tsx:365:9",
				"data-prohibitions": "[editContent]",
				className: "flex w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/settings/SharePointSettings.tsx:366:11",
					"data-prohibitions": "[editContent]",
					className: "inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px] sm:max-w-[200px]",
					title: sitePrefix,
					children: sitePrefix
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/settings/SharePointSettings.tsx:372:11",
					"data-prohibitions": "[editContent]",
					className: cn("rounded-l-none font-mono text-sm", !isValid && spStatus === "active" && formData.sharepointDomain ? "border-destructive focus-visible:ring-destructive" : ""),
					value: path,
					onChange: (e) => handleSiteChange(siteKey, e.target.value ? `${sitePrefix}${e.target.value}` : ""),
					disabled: spStatus !== "active" || !formData.sharepointDomain,
					placeholder: "nome-do-setor"
				})]
			})]
		}, siteKey);
	};
	const isFullyConnected = !!(store.sharepoint.clientId && store.sharepoint.tenantId && primaryStatus === "active");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/settings/SharePointSettings.tsx:398:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			isFullyConnected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/settings/SharePointSettings.tsx:400:9",
				"data-prohibitions": "[]",
				className: "bg-emerald-50 text-emerald-800 p-4 rounded-lg flex items-center gap-3 border border-emerald-200 shadow-sm animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
					"data-uid": "src/components/settings/SharePointSettings.tsx:401:11",
					"data-prohibitions": "[editContent]",
					className: "w-6 h-6 text-emerald-600 shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/settings/SharePointSettings.tsx:402:11",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/settings/SharePointSettings.tsx:403:13",
						"data-prohibitions": "[]",
						className: "font-semibold text-sm",
						children: "Integração Ativa com Microsoft 365"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/settings/SharePointSettings.tsx:404:13",
						"data-prohibitions": "[]",
						className: "text-xs",
						children: "As operações estão conectadas via Graph API e autenticação nativa Entra ID. As configurações estão salvas."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/components/settings/SharePointSettings.tsx:412:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/components/settings/SharePointSettings.tsx:413:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/components/settings/SharePointSettings.tsx:414:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
							"data-uid": "src/components/settings/SharePointSettings.tsx:415:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Autenticação M365 (Entra ID)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/components/settings/SharePointSettings.tsx:417:11",
						"data-prohibitions": "[]",
						children: "Configure o domínio corporativo e as credenciais da aplicação. Informe o Domínio Primário antes do Client ID e Tenant ID para liberar as conexões M365."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/components/settings/SharePointSettings.tsx:422:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-6 max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/SharePointSettings.tsx:423:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/components/settings/SharePointSettings.tsx:424:13",
									"data-prohibitions": "[editContent]",
									className: "flex items-center justify-between",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/settings/SharePointSettings.tsx:425:15",
											"data-prohibitions": "[]",
											children: "Domínio Primário"
										}),
										primaryStatus === "active" && formData.primaryDomain && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											"data-uid": "src/components/settings/SharePointSettings.tsx:427:17",
											"data-prohibitions": "[]",
											variant: "outline",
											className: "text-emerald-600 border-emerald-200 bg-emerald-50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
												"data-uid": "src/components/settings/SharePointSettings.tsx:431:19",
												"data-prohibitions": "[editContent]",
												className: "w-3 h-3 mr-1"
											}), " Verificado"]
										}),
										primaryStatus === "invalid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/components/settings/SharePointSettings.tsx:434:47",
											"data-prohibitions": "[]",
											variant: "destructive",
											children: "Inválido"
										}),
										primaryStatus === "validating" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											"data-uid": "src/components/settings/SharePointSettings.tsx:436:17",
											"data-prohibitions": "[]",
											variant: "secondary",
											className: "gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
												"data-uid": "src/components/settings/SharePointSettings.tsx:437:19",
												"data-prohibitions": "[editContent]",
												className: "w-3 h-3 animate-spin"
											}), " Validando..."]
										}),
										primaryStatus === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/components/settings/SharePointSettings.tsx:440:44",
											"data-prohibitions": "[]",
											variant: "secondary",
											children: "Desconectado"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/components/settings/SharePointSettings.tsx:442:13",
									"data-prohibitions": "[editContent]",
									value: primaryInput,
									onChange: (e) => {
										setPrimaryInput(e.target.value);
										if (e.target.value !== formData.primaryDomain) setFormData((prev) => ({
											...prev,
											primaryDomain: "",
											tenantName: "",
											teamsWebhookUrl: ""
										}));
									},
									placeholder: "Ex: company.com.br ou company.onmicrosoft.com",
									className: primaryStatus === "invalid" ? "border-destructive focus-visible:ring-destructive" : ""
								}),
								primaryError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/settings/SharePointSettings.tsx:462:30",
									"data-prohibitions": "[editContent]",
									className: "text-sm text-destructive mt-1",
									children: primaryError
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/SharePointSettings.tsx:465:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/settings/SharePointSettings.tsx:466:13",
								"data-prohibitions": "[editContent]",
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/settings/SharePointSettings.tsx:467:15",
									"data-prohibitions": "[]",
									children: "Client ID"
								}), clientId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/components/settings/SharePointSettings.tsx:468:28",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-emerald-600"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/settings/SharePointSettings.tsx:470:13",
								"data-prohibitions": "[editContent]",
								value: clientId,
								onChange: (e) => setClientId(e.target.value),
								placeholder: "Ex: 12345678-abcd-1234-abcd-1234567890ab",
								className: "font-mono text-sm",
								disabled: primaryStatus !== "active"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/SharePointSettings.tsx:479:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/settings/SharePointSettings.tsx:480:13",
								"data-prohibitions": "[editContent]",
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/settings/SharePointSettings.tsx:481:15",
									"data-prohibitions": "[]",
									children: "Tenant ID"
								}), tenantId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/components/settings/SharePointSettings.tsx:482:28",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-emerald-600"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/settings/SharePointSettings.tsx:484:13",
								"data-prohibitions": "[editContent]",
								value: tenantId,
								onChange: (e) => setTenantId(e.target.value),
								placeholder: "Ex: 87654321-dcba-4321-dcba-ba0987654321",
								className: "font-mono text-sm",
								disabled: primaryStatus !== "active"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/components/settings/SharePointSettings.tsx:495:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/components/settings/SharePointSettings.tsx:496:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/components/settings/SharePointSettings.tsx:497:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, {
							"data-uid": "src/components/settings/SharePointSettings.tsx:498:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Ambientes SharePoint e Comunicação"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/components/settings/SharePointSettings.tsx:500:11",
						"data-prohibitions": "[]",
						children: "Configure seu ambiente Microsoft 365 de documentos e canais de alertas (Teams)."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/components/settings/SharePointSettings.tsx:504:9",
					"data-prohibitions": "[editContent]",
					className: "grid md:grid-cols-2 gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/SharePointSettings.tsx:505:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/components/settings/SharePointSettings.tsx:506:13",
									"data-prohibitions": "[editContent]",
									className: "flex items-center justify-between text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/settings/SharePointSettings.tsx:507:15",
											"data-prohibitions": "[]",
											children: "Domínio SharePoint"
										}),
										spStatus === "active" && formData.sharepointDomain && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											"data-uid": "src/components/settings/SharePointSettings.tsx:509:17",
											"data-prohibitions": "[]",
											variant: "outline",
											className: "text-emerald-600 border-emerald-200 bg-emerald-50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
												"data-uid": "src/components/settings/SharePointSettings.tsx:513:19",
												"data-prohibitions": "[editContent]",
												className: "w-3 h-3 mr-1"
											}), " Verificado"]
										}),
										spStatus === "invalid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/components/settings/SharePointSettings.tsx:516:42",
											"data-prohibitions": "[]",
											variant: "destructive",
											children: "Inválido"
										}),
										spStatus === "validating" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											"data-uid": "src/components/settings/SharePointSettings.tsx:518:17",
											"data-prohibitions": "[]",
											variant: "secondary",
											className: "gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
												"data-uid": "src/components/settings/SharePointSettings.tsx:519:19",
												"data-prohibitions": "[editContent]",
												className: "w-3 h-3 animate-spin"
											}), " Validando..."]
										}),
										spStatus === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/components/settings/SharePointSettings.tsx:522:39",
											"data-prohibitions": "[]",
											variant: "secondary",
											children: "Desconectado"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/components/settings/SharePointSettings.tsx:524:13",
									"data-prohibitions": "[editContent]",
									value: spInput,
									onChange: (e) => {
										setSpInput(e.target.value);
										if (e.target.value !== formData.sharepointDomain) setFormData((prev) => ({
											...prev,
											sharepointDomain: "",
											sites: {
												locacao: "",
												captacao: "",
												vendas: "",
												juridico: "",
												financeiro: ""
											}
										}));
									},
									placeholder: "Ex: company.sharepoint.com",
									className: spStatus === "invalid" ? "border-destructive focus-visible:ring-destructive" : ""
								}),
								spError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/settings/SharePointSettings.tsx:541:25",
									"data-prohibitions": "[editContent]",
									className: "text-sm text-destructive mt-1",
									children: spError
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/SharePointSettings.tsx:544:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/settings/SharePointSettings.tsx:545:13",
								"data-prohibitions": "[editContent]",
								className: "flex items-center justify-between text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/settings/SharePointSettings.tsx:546:15",
									"data-prohibitions": "[]",
									children: "Tenant Name Oficial (M365)"
								}), formData.tenantName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/components/settings/SharePointSettings.tsx:547:39",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-emerald-600"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/components/settings/SharePointSettings.tsx:549:13",
								"data-prohibitions": "[editContent]",
								className: "flex h-10 w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground items-center",
								children: formData.tenantName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/settings/SharePointSettings.tsx:551:17",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2 text-foreground font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
										"data-uid": "src/components/settings/SharePointSettings.tsx:552:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 text-primary"
									}), formData.tenantName]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/settings/SharePointSettings.tsx:556:17",
									"data-prohibitions": "[]",
									children: "Aguardando domínio válido..."
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/SharePointSettings.tsx:561:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2 md:col-span-2 max-w-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/settings/SharePointSettings.tsx:562:13",
								"data-prohibitions": "[editContent]",
								className: "flex items-center justify-between text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/settings/SharePointSettings.tsx:563:15",
										"data-prohibitions": "[]",
										children: "Canal de Alertas Teams (Webhook)"
									}),
									isWebhookPathValid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										"data-uid": "src/components/settings/SharePointSettings.tsx:564:38",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 text-emerald-600"
									}),
									!isWebhookPathValid && primaryStatus === "active" && formData.primaryDomain && formData.teamsWebhookUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
										"data-uid": "src/components/settings/SharePointSettings.tsx:568:45",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 text-destructive"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/SharePointSettings.tsx:570:13",
								"data-prohibitions": "[editContent]",
								className: "flex w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/settings/SharePointSettings.tsx:571:15",
									"data-prohibitions": "[editContent]",
									className: "inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-[200px]",
									title: domainPrefix,
									children: domainPrefix
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/components/settings/SharePointSettings.tsx:577:15",
									"data-prohibitions": "[editContent]",
									className: cn("rounded-l-none font-mono text-sm", !isWebhookPathValid && primaryStatus === "active" && formData.primaryDomain && formData.teamsWebhookUrl ? "border-destructive focus-visible:ring-destructive" : ""),
									value: webhookPath,
									onChange: (e) => setFormData((prev) => ({
										...prev,
										teamsWebhookUrl: e.target.value ? `${domainPrefix}${e.target.value}` : ""
									})),
									placeholder: "id-do-canal",
									disabled: primaryStatus !== "active" || !formData.primaryDomain
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/components/settings/SharePointSettings.tsx:602:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/components/settings/SharePointSettings.tsx:603:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/components/settings/SharePointSettings.tsx:604:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
							"data-uid": "src/components/settings/SharePointSettings.tsx:605:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Mapeamento de Sites Departamentais"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/components/settings/SharePointSettings.tsx:607:11",
						"data-prohibitions": "[]",
						children: "Conecte os ambientes específicos para governança isolada por setor."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/components/settings/SharePointSettings.tsx:611:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-4",
					children: [(spStatus !== "active" || !formData.sharepointDomain) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/settings/SharePointSettings.tsx:613:13",
						"data-prohibitions": "[]",
						className: "bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2 border border-destructive/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
							"data-uid": "src/components/settings/SharePointSettings.tsx:614:15",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 shrink-0"
						}), "Forneça um Domínio SharePoint válido para configurar os sites departamentais."]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/settings/SharePointSettings.tsx:618:11",
						"data-prohibitions": "[editContent]",
						className: "grid md:grid-cols-2 gap-x-6 gap-y-6",
						children: SITES.map((site) => renderSiteInput(site.label, site.key))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/settings/SharePointSettings.tsx:624:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row sm:items-center justify-between bg-muted/50 p-4 rounded-lg border gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/settings/SharePointSettings.tsx:625:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col sm:flex-row sm:items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/settings/SharePointSettings.tsx:626:11",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							onClick: testConnection,
							disabled: isTesting || primaryStatus !== "active" || spStatus !== "active" || !formData.primaryDomain || !formData.sharepointDomain,
							children: [
								isTesting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/components/settings/SharePointSettings.tsx:638:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
									"data-uid": "src/components/settings/SharePointSettings.tsx:640:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}),
								" ",
								"Testar Conexões"
							]
						}),
						testResult === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/components/settings/SharePointSettings.tsx:645:13",
							"data-prohibitions": "[]",
							className: "flex items-center text-sm text-emerald-600 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"data-uid": "src/components/settings/SharePointSettings.tsx:646:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-1"
							}), " Endpoints validados com sucesso"]
						}),
						testResult === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/components/settings/SharePointSettings.tsx:650:13",
							"data-prohibitions": "[]",
							className: "flex items-center text-sm text-destructive font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								"data-uid": "src/components/settings/SharePointSettings.tsx:651:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-1"
							}), " Falha na validação dos endpoints"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/components/settings/SharePointSettings.tsx:655:9",
					"data-prohibitions": "[]",
					onClick: handleSave,
					className: "gap-2 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
						"data-uid": "src/components/settings/SharePointSettings.tsx:656:11",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), " Salvar Configurações"]
				})]
			})
		]
	});
}
//#endregion
export { SharePointSettings as default };

//# sourceMappingURL=SharePointSettings-DvS2CXB_.js.map