import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as ArrowLeft } from "./arrow-left-Dd8rqD3N.js";
import { t as Button } from "./button-iQJzuPvV.js";
import { t as supabase } from "./client-C4nUQiBY.js";
import { i as useMainStore, r as mainStore } from "./main-7B_Nvovk.js";
import "./users-Bbju60At.js";
import "./keys-D7Gl_VCN.js";
import "./entities-1AjQ7EHU.js";
import { K as Settings, X as LoaderCircle, g as useAuth, gt as useNavigate, j as Input } from "./index-BzA6GMeO.js";
import { t as Card } from "./card-BhS_F8IN.js";
import { t as Label } from "./label-CTlYsXe6.js";
//#region src/pages/Login.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { loginM365, user, isExchanging } = useAuth();
	const navigate = useNavigate();
	const { toast } = useToast();
	const { sharepoint } = useMainStore();
	(0, import_react.useEffect)(() => {
		if (user) navigate("/", { replace: true });
	}, [user, navigate]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [isFetchingConfig, setIsFetchingConfig] = (0, import_react.useState)(true);
	const [setupMode, setSetupMode] = (0, import_react.useState)(false);
	const [setupDomain, setSetupDomain] = (0, import_react.useState)("");
	const [setupClientId, setSetupClientId] = (0, import_react.useState)("");
	const [setupTenantId, setSetupTenantId] = (0, import_react.useState)("");
	const [step, setStep] = (0, import_react.useState)(1);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const fetchConfig = async () => {
			setIsFetchingConfig(true);
			try {
				const { data } = await supabase.from("app_settings").select("client_id, tenant_id, default_domain").order("updated_at", { ascending: false }).limit(1).maybeSingle();
				if (data?.client_id && data?.tenant_id) {
					mainStore.hydrateSharePointSettings({
						clientId: data.client_id,
						tenantId: data.tenant_id,
						primaryDomain: data.default_domain || ""
					});
					if (data.default_domain) setEmail(`admin@${data.default_domain}`);
					setSetupMode(false);
				} else setSetupMode(true);
			} catch (err) {
				console.error("Failed to fetch config", err);
			} finally {
				setIsFetchingConfig(false);
			}
		};
		if (!isExchanging) fetchConfig();
		else setIsFetchingConfig(false);
	}, [isExchanging]);
	const handleSaveSetup = async () => {
		setIsLoading(true);
		try {
			const { error: authErr } = await supabase.auth.signInWithPassword({
				email: "system@imobiliaria.local",
				password: "SystemPassword123!"
			});
			if (authErr) throw new Error("Falha ao autenticar para salvar configurações.");
			const { data: existing } = await supabase.from("app_settings").select("id").order("updated_at", { ascending: false }).limit(1).maybeSingle();
			const payload = {
				client_id: setupClientId.trim(),
				tenant_id: setupTenantId.trim(),
				default_domain: setupDomain.trim(),
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			if (existing) await supabase.from("app_settings").update(payload).eq("id", existing.id);
			else await supabase.from("app_settings").insert(payload);
			mainStore.hydrateSharePointSettings({
				clientId: setupClientId.trim(),
				tenantId: setupTenantId.trim(),
				primaryDomain: setupDomain.trim()
			});
			await supabase.auth.signOut();
			toast({
				title: "Configuração Salva",
				description: "Integração M365 configurada com sucesso."
			});
			setSetupMode(false);
			setEmail(`admin@${setupDomain.trim()}`);
		} catch (err) {
			toast({
				variant: "destructive",
				title: "Erro",
				description: err.message || "Falha ao salvar configuração."
			});
		} finally {
			setIsLoading(false);
		}
	};
	const handleNext = async () => {
		if (!email.trim()) return;
		setIsLoading(true);
		try {
			let hasM365 = !!(sharepoint.clientId && sharepoint.tenantId);
			if (!hasM365) {
				const { data } = await supabase.from("app_settings").select("client_id, tenant_id").order("updated_at", { ascending: false }).limit(1).maybeSingle();
				if (data?.client_id && data?.tenant_id) {
					hasM365 = true;
					mainStore.hydrateSharePointSettings({
						clientId: data.client_id,
						tenantId: data.tenant_id
					});
				}
			}
			if (hasM365) await loginM365(email);
			else {
				setIsLoading(false);
				setStep(2);
			}
		} catch (err) {
			setIsLoading(false);
			toast({
				variant: "destructive",
				title: "Acesso Negado",
				description: err.message || "Falha ao iniciar autenticação M365."
			});
		}
	};
	const handleLoginSubmit = async () => {
		if (!email || !password) return;
		setIsLoading(true);
		try {
			await loginM365(email, password);
			toast({
				title: "Sessão Iniciada",
				description: "Identidade verificada com sucesso."
			});
			navigate("/");
		} catch (err) {
			toast({
				variant: "destructive",
				title: "Acesso Negado",
				description: err.message || "Falha ao validar credenciais no tenant atual."
			});
			setStep(1);
			setPassword("");
		} finally {
			setIsLoading(false);
		}
	};
	if (isExchanging) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Login.tsx:197:7",
		"data-prohibitions": "[]",
		className: "min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 relative overflow-hidden font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Login.tsx:198:9",
				"data-prohibitions": "[]",
				className: "absolute inset-0 z-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Login.tsx:199:9",
				"data-prohibitions": "[]",
				className: "w-full max-w-[440px] shadow-2xl border-0 p-8 sm:p-10 rounded-lg relative z-10 bg-white flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						"data-uid": "src/pages/Login.tsx:200:11",
						"data-prohibitions": "[editContent]",
						className: "w-10 h-10 animate-spin text-[#0067b8] mb-6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/Login.tsx:201:11",
						"data-prohibitions": "[]",
						className: "text-xl font-semibold text-gray-900 mb-2",
						children: "Autenticando..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Login.tsx:202:11",
						"data-prohibitions": "[]",
						className: "text-sm text-gray-600",
						children: "Conectando de forma segura ao Microsoft Entra ID."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Login.tsx:204:9",
				"data-prohibitions": "[]",
				className: "absolute bottom-4 right-4 text-xs text-gray-400 font-medium",
				children: "Secured by Microsoft Entra"
			})
		]
	});
	if (isFetchingConfig) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Login.tsx:213:7",
		"data-prohibitions": "[]",
		className: "min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 relative overflow-hidden font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/Login.tsx:214:9",
			"data-prohibitions": "[]",
			className: "absolute inset-0 z-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/Login.tsx:215:9",
			"data-prohibitions": "[]",
			className: "w-full max-w-[440px] shadow-2xl border-0 p-8 sm:p-10 rounded-lg relative z-10 bg-white flex flex-col items-center text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/pages/Login.tsx:216:11",
					"data-prohibitions": "[editContent]",
					className: "w-10 h-10 animate-spin text-[#0067b8] mb-6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/Login.tsx:217:11",
					"data-prohibitions": "[]",
					className: "text-xl font-semibold text-gray-900 mb-2",
					children: "Carregando configurações..."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Login.tsx:218:11",
					"data-prohibitions": "[]",
					className: "text-sm text-gray-600",
					children: "Verificando ambiente Microsoft 365."
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Login.tsx:225:5",
		"data-prohibitions": "[editContent]",
		className: "min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 relative overflow-hidden font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Login.tsx:226:7",
				"data-prohibitions": "[]",
				className: "absolute inset-0 z-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Login.tsx:228:7",
				"data-prohibitions": "[editContent]",
				className: "w-full max-w-[440px] shadow-2xl border-0 p-8 sm:p-10 rounded-lg relative z-10 bg-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Login.tsx:229:9",
					"data-prohibitions": "[editContent]",
					className: "mb-8 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							"data-uid": "src/pages/Login.tsx:230:11",
							"data-prohibitions": "[]",
							className: "h-6 w-auto shrink-0",
							viewBox: "0 0 21 21",
							xmlns: "http://www.w3.org/2000/svg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									"data-uid": "src/pages/Login.tsx:235:13",
									"data-prohibitions": "[editContent]",
									fill: "#f25022",
									d: "M1 1h9v9H1z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									"data-uid": "src/pages/Login.tsx:236:13",
									"data-prohibitions": "[editContent]",
									fill: "#00a4ef",
									d: "M1 11h9v9H1z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									"data-uid": "src/pages/Login.tsx:237:13",
									"data-prohibitions": "[editContent]",
									fill: "#7fba00",
									d: "M11 1h9v9h-9z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									"data-uid": "src/pages/Login.tsx:238:13",
									"data-prohibitions": "[editContent]",
									fill: "#ffb900",
									d: "M11 11h9v9h-9z"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/Login.tsx:240:11",
							"data-prohibitions": "[]",
							className: "text-xl font-semibold text-gray-400",
							children: "|"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/Login.tsx:241:11",
							"data-prohibitions": "[editContent]",
							className: "text-lg font-semibold text-gray-700 tracking-tight",
							children: sharepoint.tenantName || "Microsoft 365"
						})
					]
				}), setupMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Login.tsx:247:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Login.tsx:248:13",
							"data-prohibitions": "[]",
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-uid": "src/pages/Login.tsx:249:15",
								"data-prohibitions": "[]",
								className: "text-xl font-semibold text-gray-900 mb-1",
								children: "Configuração Inicial"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Login.tsx:250:15",
								"data-prohibitions": "[]",
								className: "text-sm text-gray-600",
								children: "O sistema requer os dados do Azure AD para continuar o login M365."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Login.tsx:254:13",
							"data-prohibitions": "[]",
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Login.tsx:255:15",
									"data-prohibitions": "[]",
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Login.tsx:256:17",
										"data-prohibitions": "[]",
										className: "text-xs text-gray-600",
										children: "Domínio Primário"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Login.tsx:257:17",
										"data-prohibitions": "[editContent]",
										placeholder: "ex: company.onmicrosoft.com",
										value: setupDomain,
										onChange: (e) => setSetupDomain(e.target.value),
										className: "h-10 rounded-md border-gray-300"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Login.tsx:264:15",
									"data-prohibitions": "[]",
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Login.tsx:265:17",
										"data-prohibitions": "[]",
										className: "text-xs text-gray-600",
										children: "Client ID (Application ID)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Login.tsx:266:17",
										"data-prohibitions": "[editContent]",
										placeholder: "00000000-0000-0000-0000-000000000000",
										value: setupClientId,
										onChange: (e) => setSetupClientId(e.target.value),
										className: "h-10 rounded-md border-gray-300 font-mono text-sm"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Login.tsx:273:15",
									"data-prohibitions": "[]",
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Login.tsx:274:17",
										"data-prohibitions": "[]",
										className: "text-xs text-gray-600",
										children: "Tenant ID (Directory ID)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Login.tsx:275:17",
										"data-prohibitions": "[editContent]",
										placeholder: "00000000-0000-0000-0000-000000000000",
										value: setupTenantId,
										onChange: (e) => setSetupTenantId(e.target.value),
										className: "h-10 rounded-md border-gray-300 font-mono text-sm"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Login.tsx:283:13",
							"data-prohibitions": "[editContent]",
							className: "pt-4 flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Login.tsx:284:15",
								"data-prohibitions": "[editContent]",
								onClick: handleSaveSetup,
								disabled: isLoading || !setupDomain || !setupClientId || !setupTenantId,
								className: "w-full bg-[#0067b8] hover:bg-[#005da6] text-white h-10 font-medium rounded-none",
								children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/Login.tsx:290:19",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 animate-spin mr-2"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {
									"data-uid": "src/pages/Login.tsx:292:19",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), "Salvar e Continuar"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Login.tsx:296:15",
								"data-prohibitions": "[]",
								variant: "ghost",
								onClick: () => setSetupMode(false),
								className: "w-full text-xs text-gray-500 hover:text-gray-900",
								children: "Continuar com login local (Demo)"
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Login.tsx:307:13",
						"data-prohibitions": "[editContent]",
						className: "text-2xl font-semibold text-gray-900 mb-1",
						children: step === 1 ? "Sign in" : "Enter password"
					}),
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Login.tsx:312:15",
						"data-prohibitions": "[]",
						className: "text-sm text-gray-600 mb-6",
						children: "to continue to ImobGED System"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Login.tsx:314:15",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-2 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-uid": "src/pages/Login.tsx:315:17",
							"data-prohibitions": "[]",
							onClick: () => setStep(1),
							className: "text-gray-500 hover:text-gray-800 transition-colors bg-gray-100 rounded-full p-1",
							title: "Change user",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								"data-uid": "src/pages/Login.tsx:320:19",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/Login.tsx:322:17",
							"data-prohibitions": "[editContent]",
							className: "text-sm font-medium text-gray-800 truncate",
							children: email
						})]
					}),
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Login.tsx:327:15",
						"data-prohibitions": "[editContent]",
						className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Login.tsx:328:17",
							"data-prohibitions": "[editContent]",
							type: "email",
							placeholder: "Email, phone, or Skype",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && handleNext(),
							className: "h-10 border-gray-300 focus-visible:ring-blue-600 rounded-none border-t-0 border-l-0 border-r-0 border-b-[1px] bg-transparent px-0 focus-visible:ring-0 focus-visible:border-b-[2px] focus-visible:border-blue-600 text-[15px] shadow-none",
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Login.tsx:337:17",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Login.tsx:338:19",
								"data-prohibitions": "[]",
								className: "text-[13px] text-blue-600 hover:underline cursor-pointer font-medium",
								children: "Can't access your account?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Login.tsx:341:19",
								"data-prohibitions": "[editContent]",
								onClick: handleNext,
								disabled: !email.trim() || isLoading,
								className: "bg-[#0067b8] hover:bg-[#005da6] text-white rounded-none px-8 h-[34px] font-medium transition-colors",
								children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/Login.tsx:346:34",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 animate-spin"
								}) : "Next"
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Login.tsx:351:15",
						"data-prohibitions": "[editContent]",
						className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Login.tsx:352:17",
							"data-prohibitions": "[editContent]",
							type: "password",
							placeholder: "Password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && handleLoginSubmit(),
							className: "h-10 border-gray-300 focus-visible:ring-blue-600 rounded-none border-t-0 border-l-0 border-r-0 border-b-[1px] bg-transparent px-0 focus-visible:ring-0 focus-visible:border-b-[2px] focus-visible:border-blue-600 text-[15px] shadow-none",
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Login.tsx:361:17",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Login.tsx:362:19",
								"data-prohibitions": "[]",
								className: "text-[13px] text-blue-600 hover:underline cursor-pointer font-medium",
								children: "Forgot my password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Login.tsx:365:19",
								"data-prohibitions": "[editContent]",
								onClick: handleLoginSubmit,
								disabled: !password || isLoading,
								className: "bg-[#0067b8] hover:bg-[#005da6] text-white rounded-none px-8 h-[34px] min-w-[100px] font-medium transition-colors",
								children: isLoading ? "Signing in..." : "Sign in"
							})]
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Login.tsx:379:7",
				"data-prohibitions": "[]",
				className: "absolute bottom-4 right-4 text-xs text-gray-400 font-medium",
				children: "Secured by Microsoft Entra"
			})
		]
	});
}
//#endregion
export { Login as default };

//# sourceMappingURL=Login-CpCVAo1S.js.map