import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-DfXDXNfA.js";
import { t as Check } from "./check-Lt8-yx3r.js";
import { t as CircleAlert } from "./circle-alert-_O5Lo3cp.js";
import { t as Eye } from "./eye-B-yh8g_5.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import "./client-CX_7U15l.js";
import { i as useMainStore, n as isSlaBreached, r as mainStore } from "./main-CDM8pvrG.js";
import "./users-1CY0fc8C.js";
import "./contracts-Q43gzz8R.js";
import "./keys-Bmg8vg07.js";
import "./entities-BXUVsb-X.js";
import { E as X, W as FileText, h as useAuth, j as UserCheck, q as Clock, t as Badge } from "./index-ay9UfVKq.js";
import { t as Card } from "./card-D7vpVfHv.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DlDCuRBt.js";
import { m365Service } from "./m365-D0hXXs97.js";
import { t as Textarea } from "./textarea-ubyAgm7C.js";
//#region src/pages/ManagerApproval.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var ManagerApproval = () => {
	const { toast } = useToast();
	const { user } = useAuth();
	const store = useMainStore();
	const approvals = store.properties.filter((p) => p.status === "Análise Gerencial");
	const [rejectId, setRejectId] = (0, import_react.useState)(null);
	const [rejectReason, setRejectReason] = (0, import_react.useState)("");
	const handleApprove = (id) => {
		mainStore.updatePropertyStatus(id, "Vistoria");
		mainStore.addAuditLog({
			propertyId: id,
			action: "Aprovação Gerencial",
			user: user?.name || "Sistema",
			details: "Documentação validada no SharePoint. Handoff para vistoria."
		});
		m365Service.syncToList("Audit Log", `Aprovação do Imóvel ID: ${id} por ${user?.name}`);
		m365Service.sendEmail(`${store.settings.administrativeEmails}, ${store.settings.operationalEmails}`, `Documentação Aprovada - Imóvel ID: ${id}`, "A gerência aprovou a documentação. Próximo passo: Vistoria.");
	};
	const handleRejectConfirm = () => {
		if (!rejectReason.trim()) {
			toast({
				variant: "destructive",
				title: "Motivo obrigatório",
				description: "Informe o motivo da rejeição."
			});
			return;
		}
		if (rejectId) {
			mainStore.updatePropertyStatus(rejectId, "Pendente/Rascunho");
			mainStore.addAuditLog({
				propertyId: rejectId,
				action: "Documentação Rejeitada",
				user: user?.name || "Sistema",
				details: `Motivo: ${rejectReason}`
			});
			m365Service.syncToList("Audit Log", `Rejeição do Imóvel ID: ${rejectId} por ${user?.name}`);
			m365Service.sendEmail(`${store.settings.administrativeEmails}, ${store.settings.managementEmails}`, `Documentação Rejeitada - Imóvel ID: ${rejectId}`, `Motivo: ${rejectReason}. Por favor, corrija as informações no SharePoint e reenvie.`);
		}
		setRejectId(null);
		setRejectReason("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/ManagerApproval.tsx:78:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:79:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/ManagerApproval.tsx:80:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight",
					children: "Análise do Gerente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/ManagerApproval.tsx:81:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Aprove a documentação de novos inquilinos para liberar a Vistoria de Entrada. Fique atento aos prazos SLA."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:87:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4",
				children: [approvals.map((item) => {
					const breached = isSlaBreached(item.slaStart, store.settings.slaHours);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/ManagerApproval.tsx:91:13",
						"data-prohibitions": "[editContent]",
						className: `flex flex-col xl:flex-row gap-4 p-4 items-start ${breached ? "border-destructive bg-destructive/5" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/ManagerApproval.tsx:95:15",
							"data-prohibitions": "[editContent]",
							className: "flex-1 space-y-4 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:96:17",
								"data-prohibitions": "[editContent]",
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/ManagerApproval.tsx:97:19",
									"data-prohibitions": "[editContent]",
									className: `p-2.5 rounded-full shrink-0 ${breached ? "bg-destructive/20" : "bg-primary/10"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {
										"data-uid": "src/pages/ManagerApproval.tsx:100:21",
										"data-prohibitions": "[editContent]",
										className: `h-5 w-5 ${breached ? "text-destructive" : "text-primary"}`
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/ManagerApproval.tsx:104:19",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											"data-uid": "src/pages/ManagerApproval.tsx:105:21",
											"data-prohibitions": "[editContent]",
											className: "font-semibold text-lg",
											children: [
												item.title,
												" (ID: ",
												item.id,
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/ManagerApproval.tsx:108:21",
											"data-prohibitions": "[editContent]",
											className: "text-sm text-muted-foreground",
											children: ["Locatário: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/pages/ManagerApproval.tsx:109:34",
												"data-prohibitions": "[editContent]",
												children: item.tenant
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/ManagerApproval.tsx:111:21",
											"data-prohibitions": "[editContent]",
											className: "flex gap-2 pt-2 flex-wrap",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/pages/ManagerApproval.tsx:112:23",
													"data-prohibitions": "[]",
													variant: "outline",
													className: "border-amber-500 text-amber-600 bg-amber-50",
													children: "Análise Gerencial"
												}),
												breached && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
													"data-uid": "src/pages/ManagerApproval.tsx:119:25",
													"data-prohibitions": "[editContent]",
													variant: "destructive",
													className: "animate-pulse",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
															"data-uid": "src/pages/ManagerApproval.tsx:120:27",
															"data-prohibitions": "[editContent]",
															className: "w-3 h-3 mr-1"
														}),
														" SLA Violado (>",
														" ",
														store.settings.slaHours,
														"h)"
													]
												}),
												item.slaStart && !breached && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/ManagerApproval.tsx:125:25",
													"data-prohibitions": "[]",
													className: "text-xs text-muted-foreground flex items-center mt-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
														"data-uid": "src/pages/ManagerApproval.tsx:126:27",
														"data-prohibitions": "[editContent]",
														className: "w-3 h-3 mr-1"
													}), " SLA Em Dia"]
												})
											]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:133:17",
								"data-prohibitions": "[]",
								className: "pl-11 grid grid-cols-1 sm:grid-cols-2 gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/ManagerApproval.tsx:134:19",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2 p-2 border rounded-md bg-background text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
											"data-uid": "src/pages/ManagerApproval.tsx:135:21",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4 text-muted-foreground"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/ManagerApproval.tsx:136:21",
											"data-prohibitions": "[]",
											className: "truncate flex-1",
											children: "Documentos_Unificados.pdf"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/ManagerApproval.tsx:137:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											className: "h-6 w-6 shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
												"data-uid": "src/pages/ManagerApproval.tsx:138:23",
												"data-prohibitions": "[editContent]",
												className: "h-3 w-3"
											})
										})
									]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/ManagerApproval.tsx:144:15",
							"data-prohibitions": "[]",
							className: "flex xl:flex-col gap-2 w-full xl:w-48 xl:border-l xl:pl-4 xl:border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/ManagerApproval.tsx:145:17",
								"data-prohibitions": "[]",
								className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white",
								onClick: () => handleApprove(item.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									"data-uid": "src/pages/ManagerApproval.tsx:149:19",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4 mr-2"
								}), " Aprovar Doc."]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/ManagerApproval.tsx:151:17",
								"data-prohibitions": "[]",
								variant: "destructive",
								className: "w-full",
								onClick: () => setRejectId(item.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									"data-uid": "src/pages/ManagerApproval.tsx:156:19",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4 mr-2"
								}), " Rejeitar Doc."]
							})]
						})]
					}, item.id);
				}), approvals.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/ManagerApproval.tsx:164:11",
					"data-prohibitions": "[]",
					className: "p-12 text-center text-muted-foreground flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							"data-uid": "src/pages/ManagerApproval.tsx:165:13",
							"data-prohibitions": "[editContent]",
							className: "h-12 w-12 mb-4 text-emerald-500 opacity-50"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/ManagerApproval.tsx:166:13",
							"data-prohibitions": "[]",
							className: "text-lg font-medium text-foreground",
							children: "Todas as análises concluídas!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/ManagerApproval.tsx:167:13",
							"data-prohibitions": "[]",
							children: "Não há documentação pendente para aprovação no momento."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/ManagerApproval.tsx:172:7",
				"data-prohibitions": "[]",
				open: !!rejectId,
				onOpenChange: (val) => !val && setRejectId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/ManagerApproval.tsx:173:9",
					"data-prohibitions": "[]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:174:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:175:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/pages/ManagerApproval.tsx:176:15",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-destructive"
								}), " Rejeitar Documentação"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:178:13",
								"data-prohibitions": "[]",
								children: "Informe o motivo da rejeição. Um e-mail será enviado automaticamente para a equipe administrativa."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/ManagerApproval.tsx:183:11",
							"data-prohibitions": "[]",
							className: "py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-uid": "src/pages/ManagerApproval.tsx:184:13",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: Faltou enviar o verso do RG ou o comprovante está ilegível...",
								value: rejectReason,
								onChange: (e) => setRejectReason(e.target.value),
								className: "min-h-[100px]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/ManagerApproval.tsx:191:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/ManagerApproval.tsx:192:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setRejectId(null),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/ManagerApproval.tsx:195:13",
								"data-prohibitions": "[]",
								variant: "destructive",
								onClick: handleRejectConfirm,
								children: "Confirmar Rejeição"
							})]
						})
					]
				})
			})
		]
	});
};
//#endregion
export { ManagerApproval as default };

//# sourceMappingURL=ManagerApproval-SRNzpG_E.js.map