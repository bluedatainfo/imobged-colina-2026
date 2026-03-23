import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-_uYFM_aW.js";
import { t as Check } from "./check-Lt8-yx3r.js";
import { t as ChevronLeft } from "./chevron-left-C_47hM4I.js";
import { t as CircleAlert } from "./circle-alert-Mtb3G8En.js";
import { t as Eye } from "./eye-BfGiJr9u.js";
import { t as DocumentViewer } from "./DocumentViewer-CSkuRnhN.js";
import { t as Button } from "./button-iQJzuPvV.js";
import "./client-SeHzFSrX.js";
import { i as useMainStore, n as isSlaBreached, r as mainStore } from "./main-LV7LsMoz.js";
import "./users-CrEjXMir.js";
import { r as useContractsStore } from "./contracts-CcvrMNUm.js";
import "./keys-CrRENort.js";
import "./entities-DmZS4Guz.js";
import { $ as FileText, F as Users, L as User, M as X, Q as FolderOpen, R as UserCheck, h as useAuth, nt as Clock, t as Badge, tt as FilePenLine, v as useDocumentsStore } from "./index-CuT-JHtK.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-BhS_F8IN.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-Ddi0Ulld.js";
import { m365Service } from "./m365-5JgseaLI.js";
import { t as Textarea } from "./textarea-BLGdy_zu.js";
//#region src/pages/ManagerApproval.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var DocItem = ({ name, onClick }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-uid": "src/pages/ManagerApproval.tsx:37:3",
	"data-prohibitions": "[editContent]",
	className: "flex items-center gap-3 p-3 border rounded-lg bg-background hover:bg-accent transition-colors group cursor-pointer shadow-sm",
	onClick,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:41:5",
			"data-prohibitions": "[]",
			className: "p-2 rounded-md bg-blue-100/50 text-blue-700",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
				"data-uid": "src/pages/ManagerApproval.tsx:42:7",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/pages/ManagerApproval.tsx:44:5",
			"data-prohibitions": "[editContent]",
			className: "text-sm font-medium flex-1 truncate",
			title: name,
			children: name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-uid": "src/pages/ManagerApproval.tsx:47:5",
			"data-prohibitions": "[]",
			variant: "ghost",
			size: "icon",
			className: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
				"data-uid": "src/pages/ManagerApproval.tsx:52:7",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4 text-muted-foreground"
			})
		})
	]
});
var ManagerApproval = () => {
	const { toast } = useToast();
	const { user } = useAuth();
	const store = useMainStore();
	const { documents } = useDocumentsStore();
	const { contracts } = useContractsStore();
	const approvals = store.properties.filter((p) => p.status === "Análise Gerencial");
	const [selectedHub, setSelectedHub] = (0, import_react.useState)(null);
	const [viewingDoc, setViewingDoc] = (0, import_react.useState)(null);
	const [rejectId, setRejectId] = (0, import_react.useState)(null);
	const [rejectReason, setRejectReason] = (0, import_react.useState)("");
	const ownerDocs = selectedHub ? documents.filter((d) => d.propertyId === selectedHub.id && d.category === "OWNER_DOCUMENT") : [];
	const tenantDocs = selectedHub ? documents.filter((d) => d.propertyId === selectedHub.id && d.category === "TENANT_DOCUMENT") : [];
	const uploadedContracts = selectedHub ? documents.filter((d) => d.propertyId === selectedHub.id && d.category.startsWith("CONTRACT_")) : [];
	const systemContracts = selectedHub ? contracts.filter((c) => c.propertyId === selectedHub.id && c.status !== "Rescindido") : [];
	const handleApprove = (id) => {
		mainStore.updatePropertyStatus(id, "Vistoria");
		mainStore.addAuditLog({
			propertyId: id,
			action: "Aprovação Gerencial (Hub)",
			user: user?.name || "Sistema",
			details: "Documentação validada no Hub SharePoint. Handoff para vistoria."
		});
		m365Service.syncToList("Audit Log", `Aprovação do Imóvel ID: ${id} por ${user?.name}`);
		m365Service.sendEmail(`${store.settings.administrativeEmails}, ${store.settings.operationalEmails}`, `Documentação Aprovada - Imóvel ID: ${id}`, "A gerência aprovou a documentação. Próximo passo: Vistoria.");
		toast({
			title: "Dossiê Aprovado",
			description: "O imóvel foi movido para a etapa de Vistoria com sucesso."
		});
		setSelectedHub(null);
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
			toast({
				title: "Dossiê Rejeitado",
				description: "A análise foi reprovada e devolvida para correção."
			});
		}
		setRejectId(null);
		setRejectReason("");
		setSelectedHub(null);
	};
	if (selectedHub) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/ManagerApproval.tsx:146:7",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:147:9",
				"data-prohibitions": "[editContent]",
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/ManagerApproval.tsx:148:11",
					"data-prohibitions": "[]",
					variant: "outline",
					size: "icon",
					onClick: () => setSelectedHub(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						"data-uid": "src/pages/ManagerApproval.tsx:149:13",
						"data-prohibitions": "[editContent]",
						className: "h-5 w-5"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/ManagerApproval.tsx:151:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/ManagerApproval.tsx:152:13",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Hub de Validação"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/ManagerApproval.tsx:153:13",
						"data-prohibitions": "[editContent]",
						className: "text-muted-foreground",
						children: [
							"Analisando dossiê do imóvel: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								"data-uid": "src/pages/ManagerApproval.tsx:154:44",
								"data-prohibitions": "[editContent]",
								children: selectedHub.title
							}),
							" (ID:",
							" ",
							selectedHub.id,
							")"
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:160:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/ManagerApproval.tsx:162:11",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:163:13",
							"data-prohibitions": "[]",
							className: "bg-muted/30 pb-4 border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:164:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									"data-uid": "src/pages/ManagerApproval.tsx:165:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-primary"
								}), " Proprietário"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:167:15",
								"data-prohibitions": "[]",
								children: "Documentos de posse e identificação"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:169:13",
							"data-prohibitions": "[editContent]",
							className: "p-4 space-y-3",
							children: ownerDocs.length > 0 ? ownerDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:172:19",
								"data-prohibitions": "[editContent]",
								name: doc.name,
								onClick: () => setViewingDoc(doc.name)
							}, doc.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:175:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground italic text-center p-4",
								children: "Nenhum documento de proprietário vinculado."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/ManagerApproval.tsx:183:11",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:184:13",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/30 pb-4 border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:185:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									"data-uid": "src/pages/ManagerApproval.tsx:186:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-primary"
								}), " Inquilino"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:188:15",
								"data-prohibitions": "[editContent]",
								children: [
									"Comprovação do locatário (",
									selectedHub.tenant || "Não informado",
									")"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:192:13",
							"data-prohibitions": "[editContent]",
							className: "p-4 space-y-3",
							children: tenantDocs.length > 0 ? tenantDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:195:19",
								"data-prohibitions": "[editContent]",
								name: doc.name,
								onClick: () => setViewingDoc(doc.name)
							}, doc.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:198:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground italic text-center p-4",
								children: "Nenhum documento de inquilino vinculado."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/ManagerApproval.tsx:206:11",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm border-blue-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:207:13",
							"data-prohibitions": "[]",
							className: "bg-blue-50/50 pb-4 border-b border-blue-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:208:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-lg text-blue-900",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, {
									"data-uid": "src/pages/ManagerApproval.tsx:209:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-blue-600"
								}), " Contrato"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:211:15",
								"data-prohibitions": "[]",
								children: "Minuta gerada ou contrato importado"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:213:13",
							"data-prohibitions": "[editContent]",
							className: "p-4 space-y-3",
							children: systemContracts.length > 0 || uploadedContracts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [systemContracts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:217:21",
								"data-prohibitions": "[editContent]",
								name: c.documentName,
								onClick: () => setViewingDoc(c.documentName)
							}, c.id)), uploadedContracts.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:224:21",
								"data-prohibitions": "[editContent]",
								name: doc.name,
								onClick: () => setViewingDoc(doc.name)
							}, doc.id))] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:228:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground italic text-center p-4",
								children: "Nenhum contrato vinculado a este imóvel."
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:236:9",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/ManagerApproval.tsx:237:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => setSelectedHub(null),
						children: "Voltar para Lista"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/ManagerApproval.tsx:240:11",
						"data-prohibitions": "[]",
						variant: "destructive",
						onClick: () => setRejectId(selectedHub.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							"data-uid": "src/pages/ManagerApproval.tsx:241:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 mr-2"
						}), " Rejeitar Documentação"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/ManagerApproval.tsx:243:11",
						"data-prohibitions": "[]",
						className: "bg-emerald-600 hover:bg-emerald-700 text-white",
						onClick: () => handleApprove(selectedHub.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							"data-uid": "src/pages/ManagerApproval.tsx:247:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 mr-2"
						}), " Aprovar e Enviar p/ Vistoria"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewer, {
				"data-uid": "src/pages/ManagerApproval.tsx:251:9",
				"data-prohibitions": "[editContent]",
				open: !!viewingDoc,
				onClose: () => setViewingDoc(null),
				docName: viewingDoc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/ManagerApproval.tsx:257:9",
				"data-prohibitions": "[]",
				open: !!rejectId,
				onOpenChange: (val) => !val && setRejectId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/ManagerApproval.tsx:258:11",
					"data-prohibitions": "[]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:259:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:260:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/pages/ManagerApproval.tsx:261:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-destructive"
								}), " Rejeitar Documentação"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:263:15",
								"data-prohibitions": "[]",
								children: "Informe o motivo da rejeição. Um e-mail será enviado automaticamente para a equipe administrativa e o Dossiê será devolvido."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/ManagerApproval.tsx:268:13",
							"data-prohibitions": "[]",
							className: "py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-uid": "src/pages/ManagerApproval.tsx:269:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: Faltou enviar o verso do RG ou o comprovante está ilegível...",
								value: rejectReason,
								onChange: (e) => setRejectReason(e.target.value),
								className: "min-h-[100px]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/ManagerApproval.tsx:276:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/ManagerApproval.tsx:277:15",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setRejectId(null),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/ManagerApproval.tsx:280:15",
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/ManagerApproval.tsx:291:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:292:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/ManagerApproval.tsx:293:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight",
				children: "Análise do Gerente"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/ManagerApproval.tsx:294:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "Abra o Hub de Validação para conferir a documentação completa de proprietários e inquilinos antes da vistoria."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:300:7",
			"data-prohibitions": "[editContent]",
			className: "grid gap-4",
			children: [approvals.map((item) => {
				const breached = isSlaBreached(item.slaStart, store.settings.slaHours);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/ManagerApproval.tsx:304:13",
					"data-prohibitions": "[editContent]",
					className: `flex flex-col md:flex-row gap-4 p-5 items-center md:items-start ${breached ? "border-destructive bg-destructive/5" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/ManagerApproval.tsx:310:15",
						"data-prohibitions": "[editContent]",
						className: "flex-1 space-y-4 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/ManagerApproval.tsx:311:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:312:19",
								"data-prohibitions": "[editContent]",
								className: `p-3 rounded-xl shrink-0 ${breached ? "bg-destructive/20" : "bg-primary/10"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {
									"data-uid": "src/pages/ManagerApproval.tsx:317:21",
									"data-prohibitions": "[editContent]",
									className: `h-6 w-6 ${breached ? "text-destructive" : "text-primary"}`
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:321:19",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/ManagerApproval.tsx:322:21",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-lg",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/ManagerApproval.tsx:323:21",
										"data-prohibitions": "[editContent]",
										className: "text-sm text-muted-foreground mt-0.5",
										children: [
											"ID: ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/ManagerApproval.tsx:324:27",
												"data-prohibitions": "[editContent]",
												className: "font-mono bg-muted px-1 py-0.5 rounded",
												children: item.id
											}),
											" ",
											"• Locatário: ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/pages/ManagerApproval.tsx:325:36",
												"data-prohibitions": "[editContent]",
												children: item.tenant || "Aguardando"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/ManagerApproval.tsx:327:21",
										"data-prohibitions": "[editContent]",
										className: "flex gap-2 pt-3 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/ManagerApproval.tsx:328:23",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "border-amber-500 text-amber-600 bg-amber-50",
												children: "Análise Gerencial"
											}),
											breached && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/pages/ManagerApproval.tsx:335:25",
												"data-prohibitions": "[editContent]",
												variant: "destructive",
												className: "animate-pulse",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
														"data-uid": "src/pages/ManagerApproval.tsx:336:27",
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
												"data-uid": "src/pages/ManagerApproval.tsx:341:25",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground flex items-center mt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
													"data-uid": "src/pages/ManagerApproval.tsx:342:27",
													"data-prohibitions": "[editContent]",
													className: "w-3 h-3 mr-1"
												}), " SLA Em Dia"]
											})
										]
									})
								]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/ManagerApproval.tsx:350:15",
						"data-prohibitions": "[]",
						className: "flex flex-col gap-2 w-full md:w-56 shrink-0 mt-4 md:mt-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/ManagerApproval.tsx:351:17",
							"data-prohibitions": "[]",
							size: "lg",
							className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm",
							onClick: () => setSelectedHub(item),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
								"data-uid": "src/pages/ManagerApproval.tsx:356:19",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 mr-2"
							}), " Analisar Dossiê"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/ManagerApproval.tsx:358:17",
							"data-prohibitions": "[]",
							className: "text-xs text-center text-muted-foreground px-2",
							children: "Acesse os documentos reais vinculados"
						})]
					})]
				}, item.id);
			}), approvals.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/ManagerApproval.tsx:367:11",
				"data-prohibitions": "[]",
				className: "p-12 text-center text-muted-foreground flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						"data-uid": "src/pages/ManagerApproval.tsx:368:13",
						"data-prohibitions": "[editContent]",
						className: "h-12 w-12 mb-4 text-emerald-500 opacity-50"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/ManagerApproval.tsx:369:13",
						"data-prohibitions": "[]",
						className: "text-lg font-medium text-foreground",
						children: "Todas as análises concluídas!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/ManagerApproval.tsx:370:13",
						"data-prohibitions": "[]",
						children: "Não há documentação pendente para aprovação no momento."
					})
				]
			})]
		})]
	});
};
//#endregion
export { ManagerApproval as default };

//# sourceMappingURL=ManagerApproval-pQ4yWbd8.js.map