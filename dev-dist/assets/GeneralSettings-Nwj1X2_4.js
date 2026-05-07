import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as CircleAlert } from "./circle-alert-tq6C5WFm.js";
import { t as Printer } from "./printer-QyxaPkO_.js";
import { t as Save } from "./save-Cp-1wfwi.js";
import { t as Button } from "./button-DZFv31v6.js";
import "./client-DbPPqM1c.js";
import { i as useMainStore, r as mainStore } from "./main-DA0wiXaK.js";
import { B as Users, j as Input, ot as Clock } from "./index-DB_eakkI.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DZXI3GJ_.js";
import { t as Label } from "./label-CZKY3LJi.js";
var Mail = createLucideIcon("mail", [["path", {
	d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
	key: "132q7q"
}], ["rect", {
	x: "2",
	y: "4",
	width: "20",
	height: "16",
	rx: "2",
	key: "izxlao"
}]]);
//#endregion
//#region src/components/settings/GeneralSettings.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function GeneralSettings() {
	const { toast } = useToast();
	const store = useMainStore();
	const primaryDomain = store.sharepoint.primaryDomain;
	const [formData, setFormData] = (0, import_react.useState)(store.settings);
	(0, import_react.useEffect)(() => {
		setFormData(store.settings);
	}, [store.settings]);
	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}));
	};
	const getLocalPart = (email) => {
		if (!email) return "";
		return email.split("@")[0];
	};
	const handleEmailChange = (field, val) => {
		const cleanVal = val.replace(/@.*/, "").trim();
		handleChange(field, cleanVal && primaryDomain ? `${cleanVal}@${primaryDomain}` : "");
	};
	const handleSave = () => {
		if (!primaryDomain) {
			toast({
				variant: "destructive",
				title: "Erro de Configuração",
				description: "Um Domínio Primário válido é necessário para salvar configurações de e-mail."
			});
			return;
		}
		mainStore.updateSettings(formData);
		toast({
			title: "Configurações Gerais Salvas",
			description: "Papéis, contas M365 e regras de SLA atualizados com sucesso."
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/settings/GeneralSettings.tsx:61:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/components/settings/GeneralSettings.tsx:62:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/components/settings/GeneralSettings.tsx:63:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/components/settings/GeneralSettings.tsx:64:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
							"data-uid": "src/components/settings/GeneralSettings.tsx:65:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Equipes M365 (Papéis e Notificações)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/components/settings/GeneralSettings.tsx:67:11",
						"data-prohibitions": "[]",
						children: "Atribua contas do Microsoft 365 para as funções que receberão e-mails automatizados. Apenas endereços do domínio validado são permitidos."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/components/settings/GeneralSettings.tsx:72:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-4",
					children: [
						!primaryDomain && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/GeneralSettings.tsx:74:13",
							"data-prohibitions": "[]",
							className: "bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2 border border-destructive/20 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								"data-uid": "src/components/settings/GeneralSettings.tsx:75:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 shrink-0"
							}), "Forneça um Domínio Primário válido na aba Integração SharePoint para configurar contas."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/GeneralSettings.tsx:80:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/settings/GeneralSettings.tsx:81:13",
								"data-prohibitions": "[]",
								children: "Conta M365 (Gerência)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/GeneralSettings.tsx:82:13",
								"data-prohibitions": "[editContent]",
								className: "flex gap-2 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									"data-uid": "src/components/settings/GeneralSettings.tsx:83:15",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 text-muted-foreground shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/settings/GeneralSettings.tsx:84:15",
									"data-prohibitions": "[editContent]",
									className: "flex w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/GeneralSettings.tsx:85:17",
										"data-prohibitions": "[editContent]",
										className: "rounded-r-none focus-visible:z-10",
										value: getLocalPart(formData.managementEmails),
										placeholder: "gerencia",
										onChange: (e) => handleEmailChange("managementEmails", e.target.value),
										disabled: !primaryDomain
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/components/settings/GeneralSettings.tsx:92:17",
										"data-prohibitions": "[editContent]",
										className: "inline-flex items-center px-3 border border-l-0 border-input rounded-r-md bg-muted text-muted-foreground text-sm",
										children: ["@", primaryDomain || "dominio.com"]
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/GeneralSettings.tsx:98:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/settings/GeneralSettings.tsx:99:13",
								"data-prohibitions": "[]",
								children: "Conta M365 (Administrativo)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/GeneralSettings.tsx:100:13",
								"data-prohibitions": "[editContent]",
								className: "flex gap-2 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									"data-uid": "src/components/settings/GeneralSettings.tsx:101:15",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 text-muted-foreground shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/settings/GeneralSettings.tsx:102:15",
									"data-prohibitions": "[editContent]",
									className: "flex w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/GeneralSettings.tsx:103:17",
										"data-prohibitions": "[editContent]",
										className: "rounded-r-none focus-visible:z-10",
										value: getLocalPart(formData.administrativeEmails),
										placeholder: "admin",
										onChange: (e) => handleEmailChange("administrativeEmails", e.target.value),
										disabled: !primaryDomain
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/components/settings/GeneralSettings.tsx:110:17",
										"data-prohibitions": "[editContent]",
										className: "inline-flex items-center px-3 border border-l-0 border-input rounded-r-md bg-muted text-muted-foreground text-sm",
										children: ["@", primaryDomain || "dominio.com"]
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/GeneralSettings.tsx:116:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/settings/GeneralSettings.tsx:117:13",
								"data-prohibitions": "[]",
								children: "Conta M365 (Operacional / Vistorias)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/GeneralSettings.tsx:118:13",
								"data-prohibitions": "[editContent]",
								className: "flex gap-2 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									"data-uid": "src/components/settings/GeneralSettings.tsx:119:15",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 text-muted-foreground shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/settings/GeneralSettings.tsx:120:15",
									"data-prohibitions": "[editContent]",
									className: "flex w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/GeneralSettings.tsx:121:17",
										"data-prohibitions": "[editContent]",
										className: "rounded-r-none focus-visible:z-10",
										value: getLocalPart(formData.operationalEmails),
										placeholder: "operacao",
										onChange: (e) => handleEmailChange("operationalEmails", e.target.value),
										disabled: !primaryDomain
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/components/settings/GeneralSettings.tsx:128:17",
										"data-prohibitions": "[editContent]",
										className: "inline-flex items-center px-3 border border-l-0 border-input rounded-r-md bg-muted text-muted-foreground text-sm",
										children: ["@", primaryDomain || "dominio.com"]
									})]
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/components/settings/GeneralSettings.tsx:137:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/components/settings/GeneralSettings.tsx:138:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/components/settings/GeneralSettings.tsx:139:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							"data-uid": "src/components/settings/GeneralSettings.tsx:140:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Monitoramento SLA"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/components/settings/GeneralSettings.tsx:142:11",
						"data-prohibitions": "[]",
						children: "Configure o tempo máximo permitido para a etapa de \"Análise Gerencial\"."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/components/settings/GeneralSettings.tsx:146:9",
					"data-prohibitions": "[]",
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/settings/GeneralSettings.tsx:147:11",
						"data-prohibitions": "[]",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/components/settings/GeneralSettings.tsx:148:13",
							"data-prohibitions": "[]",
							children: "Limite SLA (em horas)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/GeneralSettings.tsx:149:13",
							"data-prohibitions": "[]",
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								"data-uid": "src/components/settings/GeneralSettings.tsx:150:15",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/settings/GeneralSettings.tsx:151:15",
								"data-prohibitions": "[editContent]",
								type: "number",
								min: "1",
								value: formData.slaHours,
								onChange: (e) => handleChange("slaHours", parseInt(e.target.value) || 24),
								className: "w-32"
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/components/settings/GeneralSettings.tsx:163:7",
				"data-prohibitions": "[]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/components/settings/GeneralSettings.tsx:164:9",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							"data-uid": "src/components/settings/GeneralSettings.tsx:165:11",
							"data-prohibitions": "[]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
								"data-uid": "src/components/settings/GeneralSettings.tsx:166:13",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-primary"
							}), " Hardware & Dispositivos"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							"data-uid": "src/components/settings/GeneralSettings.tsx:168:11",
							"data-prohibitions": "[]",
							children: "Configure equipamentos locais integrados à rede da imobiliária."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/components/settings/GeneralSettings.tsx:172:9",
						"data-prohibitions": "[]",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/GeneralSettings.tsx:173:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/settings/GeneralSettings.tsx:174:13",
									"data-prohibitions": "[]",
									children: "Scanner Local (Epson ES-580W)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/settings/GeneralSettings.tsx:175:13",
									"data-prohibitions": "[]",
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
										"data-uid": "src/components/settings/GeneralSettings.tsx:176:15",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5 text-muted-foreground shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/GeneralSettings.tsx:177:15",
										"data-prohibitions": "[editContent]",
										placeholder: "Ex: 192.168.0.150",
										value: formData.scannerIp || "",
										onChange: (e) => handleChange("scannerIp", e.target.value),
										className: "w-full md:w-64"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/settings/GeneralSettings.tsx:184:13",
									"data-prohibitions": "[]",
									className: "text-xs text-muted-foreground",
									children: "Endereço IP para conexão direta com o scanner na aba de Digitalização do GED."
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
						"data-uid": "src/components/settings/GeneralSettings.tsx:189:9",
						"data-prohibitions": "[]",
						className: "bg-muted/50 py-4 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/settings/GeneralSettings.tsx:190:11",
							"data-prohibitions": "[]",
							onClick: handleSave,
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
								"data-uid": "src/components/settings/GeneralSettings.tsx:191:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), " Salvar Configurações Gerais"]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { GeneralSettings as default };

//# sourceMappingURL=GeneralSettings-Nwj1X2_4.js.map