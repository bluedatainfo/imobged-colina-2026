import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as Shield } from "./shield-Aycy84e5.js";
import { t as Button } from "./button-iQJzuPvV.js";
import "./client-C4nUQiBY.js";
import { i as useMainStore, r as mainStore } from "./main-7B_Nvovk.js";
import { j as Input, q as Search } from "./index-DTPUTGFw.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-BhS_F8IN.js";
import { t as Label } from "./label-CTlYsXe6.js";
import { t as Switch } from "./switch-D-owz7ay.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DxxBVlIY.js";
var Lock = createLucideIcon("lock", [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2",
	key: "1w4ew1"
}], ["path", {
	d: "M7 11V7a5 5 0 0 1 10 0v4",
	key: "fwvmzm"
}]]);
var MonitorSmartphone = createLucideIcon("monitor-smartphone", [
	["path", {
		d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8",
		key: "10dyio"
	}],
	["path", {
		d: "M10 19v-3.96 3.15",
		key: "1irgej"
	}],
	["path", {
		d: "M7 19h5",
		key: "qswx4l"
	}],
	["rect", {
		width: "6",
		height: "10",
		x: "16",
		y: "12",
		rx: "2",
		key: "1egngj"
	}]
]);
var Network = createLucideIcon("network", [
	["rect", {
		x: "16",
		y: "16",
		width: "6",
		height: "6",
		rx: "1",
		key: "4q2zg0"
	}],
	["rect", {
		x: "2",
		y: "16",
		width: "6",
		height: "6",
		rx: "1",
		key: "8cvhb9"
	}],
	["rect", {
		x: "9",
		y: "2",
		width: "6",
		height: "6",
		rx: "1",
		key: "1egb70"
	}],
	["path", {
		d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",
		key: "1jsf9p"
	}],
	["path", {
		d: "M12 12V8",
		key: "2874zd"
	}]
]);
//#endregion
//#region src/components/settings/SecuritySettings.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function SecuritySettings() {
	const { toast } = useToast();
	const store = useMainStore();
	const [formData, setFormData] = (0, import_react.useState)(store.security);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const handleSave = () => {
		mainStore.updateSecuritySettings(formData);
		toast({
			title: "Políticas de Segurança Salvas",
			description: "As configurações de acesso condicional foram atualizadas."
		});
	};
	const filteredLogs = (0, import_react.useMemo)(() => {
		return store.auditLogs.filter((log) => {
			const term = searchTerm.toLowerCase();
			return (log.userEmail || "").toLowerCase().includes(term) || log.action.toLowerCase().includes(term) || log.user.toLowerCase().includes(term);
		}).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
	}, [store.auditLogs, searchTerm]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/settings/SecuritySettings.tsx:47:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/components/settings/SecuritySettings.tsx:48:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				"data-uid": "src/components/settings/SecuritySettings.tsx:49:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					"data-uid": "src/components/settings/SecuritySettings.tsx:50:11",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
						"data-uid": "src/components/settings/SecuritySettings.tsx:51:13",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-primary"
					}), " Políticas de Acesso Condicional"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					"data-uid": "src/components/settings/SecuritySettings.tsx:53:11",
					"data-prohibitions": "[]",
					children: "Defina regras específicas para restringir o acesso à plataforma e garantir a segurança corporativa."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				"data-uid": "src/components/settings/SecuritySettings.tsx:58:9",
				"data-prohibitions": "[]",
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/settings/SecuritySettings.tsx:59:11",
						"data-prohibitions": "[]",
						className: "flex items-center justify-between space-x-2 border rounded-lg p-4 bg-muted/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/SecuritySettings.tsx:60:13",
							"data-prohibitions": "[]",
							className: "flex flex-col space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/settings/SecuritySettings.tsx:61:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									"data-uid": "src/components/settings/SecuritySettings.tsx:62:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								}), " Restringir Acesso ao Domínio Corporativo"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/settings/SecuritySettings.tsx:64:15",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Somente usuários com e-mail do domínio autorizado podem autenticar."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							"data-uid": "src/components/settings/SecuritySettings.tsx:68:13",
							"data-prohibitions": "[editContent]",
							checked: formData.restrictDomain,
							onCheckedChange: (checked) => setFormData((prev) => ({
								...prev,
								restrictDomain: checked
							}))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/settings/SecuritySettings.tsx:76:11",
						"data-prohibitions": "[]",
						className: "flex items-center justify-between space-x-2 border rounded-lg p-4 bg-muted/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/SecuritySettings.tsx:77:13",
							"data-prohibitions": "[]",
							className: "flex flex-col space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/settings/SecuritySettings.tsx:78:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorSmartphone, {
									"data-uid": "src/components/settings/SecuritySettings.tsx:79:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								}), " Exigir Dispositivo Gerenciado"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/settings/SecuritySettings.tsx:81:15",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Bloqueia o acesso de dispositivos não reconhecidos pelo MDM da empresa."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							"data-uid": "src/components/settings/SecuritySettings.tsx:85:13",
							"data-prohibitions": "[editContent]",
							checked: formData.requireManagedDevice,
							onCheckedChange: (checked) => setFormData((prev) => ({
								...prev,
								requireManagedDevice: checked
							}))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/settings/SecuritySettings.tsx:93:11",
						"data-prohibitions": "[]",
						className: "space-y-3 border rounded-lg p-4 bg-muted/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/settings/SecuritySettings.tsx:94:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, {
									"data-uid": "src/components/settings/SecuritySettings.tsx:95:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								}), " Faixas de IP Permitidas"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/settings/SecuritySettings.tsx:97:13",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Especifique as redes permitidas. Deixe em branco para permitir conexões de qualquer endereço IP, útil para acesso corporativo estrito e proteção da rede."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/settings/SecuritySettings.tsx:101:13",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: 192.168.1.0/24, 10.0.0.0/8",
								value: formData.allowedIps,
								onChange: (e) => setFormData((prev) => ({
									...prev,
									allowedIps: e.target.value
								})),
								className: "max-w-xl bg-background"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/settings/SecuritySettings.tsx:109:11",
						"data-prohibitions": "[]",
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/settings/SecuritySettings.tsx:110:13",
							"data-prohibitions": "[]",
							onClick: handleSave,
							children: "Salvar Políticas"
						})
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/components/settings/SecuritySettings.tsx:115:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				"data-uid": "src/components/settings/SecuritySettings.tsx:116:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					"data-uid": "src/components/settings/SecuritySettings.tsx:117:11",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						"data-uid": "src/components/settings/SecuritySettings.tsx:118:13",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-primary"
					}), " Logs de Auditoria de Acesso"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					"data-uid": "src/components/settings/SecuritySettings.tsx:120:11",
					"data-prohibitions": "[]",
					children: "Histórico detalhado de logins, alterações e ações realizadas no sistema."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				"data-uid": "src/components/settings/SecuritySettings.tsx:124:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/settings/SecuritySettings.tsx:125:11",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-uid": "src/components/settings/SecuritySettings.tsx:126:13",
						"data-prohibitions": "[editContent]",
						placeholder: "Pesquisar por email, nome ou ação...",
						value: searchTerm,
						onChange: (e) => setSearchTerm(e.target.value),
						className: "max-w-md"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/settings/SecuritySettings.tsx:134:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-md border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/components/settings/SecuritySettings.tsx:135:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/components/settings/SecuritySettings.tsx:136:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/components/settings/SecuritySettings.tsx:137:17",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/settings/SecuritySettings.tsx:138:19",
										"data-prohibitions": "[]",
										children: "Data/Hora"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/settings/SecuritySettings.tsx:139:19",
										"data-prohibitions": "[]",
										children: "Usuário"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/settings/SecuritySettings.tsx:140:19",
										"data-prohibitions": "[]",
										children: "Ação Realizada"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/settings/SecuritySettings.tsx:141:19",
										"data-prohibitions": "[]",
										children: "Endereço IP"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/components/settings/SecuritySettings.tsx:144:15",
							"data-prohibitions": "[editContent]",
							children: [filteredLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/components/settings/SecuritySettings.tsx:146:19",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/settings/SecuritySettings.tsx:147:21",
										"data-prohibitions": "[editContent]",
										className: "whitespace-nowrap",
										children: new Date(log.timestamp).toLocaleString()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/settings/SecuritySettings.tsx:150:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/settings/SecuritySettings.tsx:151:23",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/settings/SecuritySettings.tsx:152:25",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: log.user
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/settings/SecuritySettings.tsx:153:25",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground",
												children: log.userEmail || "-"
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/settings/SecuritySettings.tsx:158:21",
										"data-prohibitions": "[editContent]",
										children: log.action
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/settings/SecuritySettings.tsx:159:21",
										"data-prohibitions": "[editContent]",
										className: "text-muted-foreground font-mono text-sm",
										children: log.ipAddress || "Desconhecido"
									})
								]
							}, log.id)), filteredLogs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/components/settings/SecuritySettings.tsx:165:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/settings/SecuritySettings.tsx:166:21",
									"data-prohibitions": "[]",
									colSpan: 4,
									className: "text-center py-8 text-muted-foreground",
									children: "Nenhum log de auditoria encontrado."
								})
							})]
						})]
					})
				})]
			})]
		})]
	});
}
//#endregion
export { SecuritySettings as default };

//# sourceMappingURL=SecuritySettings-uY5L3y9a.js.map