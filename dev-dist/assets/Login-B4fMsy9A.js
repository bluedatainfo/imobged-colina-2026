import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CvuQPfAM.js";
import { n as useToast } from "./use-toast-cNG4ZhbD.js";
import { t as Button } from "./button-ChEhZCqG.js";
import { t as ArrowLeft } from "./arrow-left-BVQskZSO.js";
import { i as useMainStore, r as mainStore } from "./main-BrkNkJx4.js";
import "./users-BLwmIR9t.js";
import "./contracts-BH_czXI9.js";
import "./keys-YFLQVpI3.js";
import { V as LoaderCircle, h as useAuth, k as Input, rt as useNavigate } from "./index-C2gvVcrs.js";
import { t as Card } from "./card-BwW9Ii_l.js";
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
	(0, import_react.useEffect)(() => {
		mainStore.reloadCoreConfig();
	}, []);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(1);
	const [email, setEmail] = (0, import_react.useState)(sharepoint.primaryDomain ? `admin@${sharepoint.primaryDomain}` : "");
	(0, import_react.useEffect)(() => {
		if (!email && sharepoint.primaryDomain) setEmail(`admin@${sharepoint.primaryDomain}`);
	}, [sharepoint.primaryDomain, email]);
	const handleNext = async () => {
		if (!email.trim()) return;
		if (sharepoint.clientId && sharepoint.tenantId) {
			setIsLoading(true);
			try {
				await loginM365(email);
			} catch (err) {
				setIsLoading(false);
			}
		} else setStep(2);
	};
	const handleLoginSubmit = async () => {
		if (!email || !password) return;
		setIsLoading(true);
		try {
			await loginM365(email, password);
			toast({
				title: "Sessão Iniciada",
				description: "Identidade verificada via Microsoft Entra ID."
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
	const [password, setPassword] = (0, import_react.useState)("");
	if (isExchanging) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Login.tsx:82:7",
		"data-prohibitions": "[]",
		className: "min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 relative overflow-hidden font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Login.tsx:83:9",
				"data-prohibitions": "[]",
				className: "absolute inset-0 z-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Login.tsx:84:9",
				"data-prohibitions": "[]",
				className: "w-full max-w-[440px] shadow-2xl border-0 p-8 sm:p-10 rounded-lg relative z-10 bg-white flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						"data-uid": "src/pages/Login.tsx:85:11",
						"data-prohibitions": "[editContent]",
						className: "w-10 h-10 animate-spin text-[#0067b8] mb-6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/Login.tsx:86:11",
						"data-prohibitions": "[]",
						className: "text-xl font-semibold text-gray-900 mb-2",
						children: "Autenticando..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Login.tsx:87:11",
						"data-prohibitions": "[]",
						className: "text-sm text-gray-600",
						children: "Conectando de forma segura ao Microsoft Entra ID."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Login.tsx:89:9",
				"data-prohibitions": "[]",
				className: "absolute bottom-4 right-4 text-xs text-gray-400 font-medium",
				children: "Secured by Microsoft Entra"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Login.tsx:97:5",
		"data-prohibitions": "[editContent]",
		className: "min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 relative overflow-hidden font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Login.tsx:98:7",
				"data-prohibitions": "[]",
				className: "absolute inset-0 z-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Login.tsx:100:7",
				"data-prohibitions": "[editContent]",
				className: "w-full max-w-[440px] shadow-2xl border-0 p-8 sm:p-10 rounded-lg relative z-10 bg-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Login.tsx:101:9",
						"data-prohibitions": "[editContent]",
						className: "mb-8 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								"data-uid": "src/pages/Login.tsx:102:11",
								"data-prohibitions": "[]",
								className: "h-6 w-auto shrink-0",
								viewBox: "0 0 21 21",
								xmlns: "http://www.w3.org/2000/svg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										"data-uid": "src/pages/Login.tsx:107:13",
										"data-prohibitions": "[editContent]",
										fill: "#f25022",
										d: "M1 1h9v9H1z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										"data-uid": "src/pages/Login.tsx:108:13",
										"data-prohibitions": "[editContent]",
										fill: "#00a4ef",
										d: "M1 11h9v9H1z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										"data-uid": "src/pages/Login.tsx:109:13",
										"data-prohibitions": "[editContent]",
										fill: "#7fba00",
										d: "M11 1h9v9h-9z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										"data-uid": "src/pages/Login.tsx:110:13",
										"data-prohibitions": "[editContent]",
										fill: "#ffb900",
										d: "M11 11h9v9h-9z"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Login.tsx:112:11",
								"data-prohibitions": "[]",
								className: "text-xl font-semibold text-gray-400",
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Login.tsx:113:11",
								"data-prohibitions": "[editContent]",
								className: "text-lg font-semibold text-gray-700 tracking-tight",
								children: sharepoint.tenantName || "Microsoft 365"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Login.tsx:118:9",
						"data-prohibitions": "[editContent]",
						className: "text-2xl font-semibold text-gray-900 mb-1",
						children: step === 1 ? "Sign in" : "Enter password"
					}),
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Login.tsx:123:11",
						"data-prohibitions": "[]",
						className: "text-sm text-gray-600 mb-6",
						children: "to continue to ImobGED System"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Login.tsx:125:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-2 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-uid": "src/pages/Login.tsx:126:13",
							"data-prohibitions": "[]",
							onClick: () => setStep(1),
							className: "text-gray-500 hover:text-gray-800 transition-colors bg-gray-100 rounded-full p-1",
							title: "Change user",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								"data-uid": "src/pages/Login.tsx:131:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/Login.tsx:133:13",
							"data-prohibitions": "[editContent]",
							className: "text-sm font-medium text-gray-800 truncate",
							children: email
						})]
					}),
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Login.tsx:138:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Login.tsx:139:13",
							"data-prohibitions": "[editContent]",
							type: "email",
							placeholder: "Email, phone, or Skype",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && handleNext(),
							className: "h-10 border-gray-300 focus-visible:ring-blue-600 rounded-none border-t-0 border-l-0 border-r-0 border-b-[1px] bg-transparent px-0 focus-visible:ring-0 focus-visible:border-b-[2px] focus-visible:border-blue-600 text-[15px] shadow-none",
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Login.tsx:148:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Login.tsx:149:15",
								"data-prohibitions": "[]",
								className: "text-[13px] text-blue-600 hover:underline cursor-pointer font-medium",
								children: "Can't access your account?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Login.tsx:152:15",
								"data-prohibitions": "[editContent]",
								onClick: handleNext,
								disabled: !email.trim() || isLoading,
								className: "bg-[#0067b8] hover:bg-[#005da6] text-white rounded-none px-8 h-[34px] font-medium transition-colors",
								children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/Login.tsx:157:30",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 animate-spin"
								}) : "Next"
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Login.tsx:162:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Login.tsx:163:13",
							"data-prohibitions": "[editContent]",
							type: "password",
							placeholder: "Password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && handleLoginSubmit(),
							className: "h-10 border-gray-300 focus-visible:ring-blue-600 rounded-none border-t-0 border-l-0 border-r-0 border-b-[1px] bg-transparent px-0 focus-visible:ring-0 focus-visible:border-b-[2px] focus-visible:border-blue-600 text-[15px] shadow-none",
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Login.tsx:172:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Login.tsx:173:15",
								"data-prohibitions": "[]",
								className: "text-[13px] text-blue-600 hover:underline cursor-pointer font-medium",
								children: "Forgot my password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Login.tsx:176:15",
								"data-prohibitions": "[editContent]",
								onClick: handleLoginSubmit,
								disabled: !password || isLoading,
								className: "bg-[#0067b8] hover:bg-[#005da6] text-white rounded-none px-8 h-[34px] min-w-[100px] font-medium transition-colors",
								children: isLoading ? "Signing in..." : "Sign in"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Login.tsx:188:7",
				"data-prohibitions": "[]",
				className: "absolute bottom-4 right-4 text-xs text-gray-400 font-medium",
				children: "Secured by Microsoft Entra"
			})
		]
	});
}
//#endregion
export { Login as default };

//# sourceMappingURL=Login-B4fMsy9A.js.map