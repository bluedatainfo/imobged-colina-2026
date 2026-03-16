import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CvuQPfAM.js";
import "./react-dom-cDMCl7Pc.js";
import { n as useToast } from "./use-toast-cNG4ZhbD.js";
import "./es2015-TBGmAnyn.js";
import { n as createLucideIcon } from "./utils-Di8JFY1h.js";
import { t as Button } from "./button-ChEhZCqG.js";
import { t as ArrowRight } from "./arrow-right-BAhSN7kI.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Ri7J9_pf.js";
import { t as CircleCheckBig } from "./circle-check-big-Bbf5hPXF.js";
import { t as Eye } from "./eye-GRPlF7C1.js";
import { t as DocumentViewer } from "./DocumentViewer-BlUOKjAN.js";
import { t as ShieldCheck } from "./shield-check-DqITVXmc.js";
import { i as useMainStore, r as mainStore } from "./main-DCsFzFjp.js";
import "./users-CkyIZfv8.js";
import { B as PenTool, J as FilePlus, N as Users, V as LoaderCircle, Y as FilePenLine, a as DropdownMenuLabel, h as useAuth, i as DropdownMenuItem, k as Input, n as DropdownMenu, o as DropdownMenuSeparator, q as FileText, r as DropdownMenuContent, s as DropdownMenuTrigger, t as Badge, z as Plus } from "./index-D7voao9e.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-D7FMgv39.js";
import { t as Label } from "./label-DWr-owgv.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DkS38AD4.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CmG3Ygnc.js";
import { n as useContractsStore, t as contractsStore } from "./contracts-5WJu1Yy8.js";
import { t as m365Service } from "./m365-CUwPoPXW.js";
import { t as keysStore } from "./keys-Bwx-z21I.js";
var Archive = createLucideIcon("archive", [
	["rect", {
		width: "20",
		height: "5",
		x: "2",
		y: "3",
		rx: "1",
		key: "1wp1u1"
	}],
	["path", {
		d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
		key: "1s80jp"
	}],
	["path", {
		d: "M10 12h4",
		key: "a56b0p"
	}]
]);
var EllipsisVertical = createLucideIcon("ellipsis-vertical", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "12",
		cy: "5",
		r: "1",
		key: "gxeob9"
	}],
	["circle", {
		cx: "12",
		cy: "19",
		r: "1",
		key: "lyex9k"
	}]
]);
var FilePen = createLucideIcon("file-pen", [
	["path", {
		d: "M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34",
		key: "o6klzx"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z",
		key: "zhnas1"
	}]
]);
var MessageCircle = createLucideIcon("message-circle", [["path", {
	d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	key: "1sd12s"
}]]);
var Target = createLucideIcon("target", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "6",
		key: "1vlfrh"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}]
]);
//#endregion
//#region src/components/ContractWizard.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var TEMPLATES = [
	"Apartamento Padrão (Caução)",
	"Apartamento (Seguro Fiança)",
	"Comercial (Fiador)",
	"Residencial (Fiador)"
];
function ContractWizard({ open, onClose }) {
	const store = useMainStore();
	const [template, setTemplate] = (0, import_react.useState)("");
	const [propertyId, setPropertyId] = (0, import_react.useState)("");
	const [tenantName, setTenantName] = (0, import_react.useState)("");
	const handleCreate = () => {
		if (!template || !propertyId || !tenantName) return;
		const docName = `Rascunho_${tenantName.replace(/\s+/g, "_")}_${propertyId}.docx`;
		contractsStore.addContract({
			propertyId,
			tenantName,
			template,
			status: "Rascunho",
			documentName: docName
		});
		m365Service.sendTeamsMessage(store.sharepoint.teamsWebhookUrl, `Novo Rascunho Criado: ${template} para o imóvel ID ${propertyId}. Inquilino: ${tenantName}.`);
		mainStore.addAuditLog({
			propertyId,
			action: "Minuta Gerada via Wizard (SharePoint Templates)",
			user: "Equipe de Contratos"
		});
		setTemplate("");
		setPropertyId("");
		setTenantName("");
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/ContractWizard.tsx:67:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/ContractWizard.tsx:68:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[500px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/ContractWizard.tsx:69:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/ContractWizard.tsx:70:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus, {
							"data-uid": "src/components/ContractWizard.tsx:71:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Novo Contrato (Wizard)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/ContractWizard.tsx:73:11",
						"data-prohibitions": "[]",
						children: "Selecione o modelo hospedado no SharePoint para gerar um rascunho dinâmico (DOCX)."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/ContractWizard.tsx:77:9",
					"data-prohibitions": "[editContent]",
					className: "grid gap-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ContractWizard.tsx:78:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/ContractWizard.tsx:79:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
									"data-uid": "src/components/ContractWizard.tsx:80:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Imóvel Referência"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/ContractWizard.tsx:82:13",
								"data-prohibitions": "[editContent]",
								value: propertyId,
								onValueChange: setPropertyId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/ContractWizard.tsx:83:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/ContractWizard.tsx:84:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione o imóvel..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/components/ContractWizard.tsx:86:15",
									"data-prohibitions": "[editContent]",
									children: store.properties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										"data-uid": "src/components/ContractWizard.tsx:88:19",
										"data-prohibitions": "[editContent]",
										value: p.id,
										children: [
											"ID: ",
											p.id,
											" - ",
											p.title
										]
									}, p.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ContractWizard.tsx:95:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/ContractWizard.tsx:96:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus, {
									"data-uid": "src/components/ContractWizard.tsx:97:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Modelo de Documento (Template)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/ContractWizard.tsx:99:13",
								"data-prohibitions": "[editContent]",
								value: template,
								onValueChange: setTemplate,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/ContractWizard.tsx:100:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/ContractWizard.tsx:101:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione um template da biblioteca..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/components/ContractWizard.tsx:103:15",
									"data-prohibitions": "[editContent]",
									children: TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/ContractWizard.tsx:105:19",
										"data-prohibitions": "[editContent]",
										value: t,
										children: t
									}, t))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ContractWizard.tsx:112:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/ContractWizard.tsx:113:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									"data-uid": "src/components/ContractWizard.tsx:114:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Nome do Locatário Principal"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/ContractWizard.tsx:116:13",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: Carlos Eduardo da Silva",
								value: tenantName,
								onChange: (e) => setTenantName(e.target.value)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/ContractWizard.tsx:123:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/ContractWizard.tsx:124:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: onClose,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/ContractWizard.tsx:127:11",
						"data-prohibitions": "[]",
						onClick: handleCreate,
						disabled: !template || !propertyId || !tenantName,
						children: "Gerar Rascunho"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/DocuSignDialog.tsx
function DocuSignDialog({ contract, onClose }) {
	const { toast } = useToast();
	const { user } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		if (contract) setStep(contract.docusignStatus === "Sent" ? 2 : 1);
	}, [contract]);
	if (!contract) return null;
	const handleSend = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			contractsStore.updateDocuSignStatus(contract.id, "Sent");
			setStep(2);
			toast({
				title: "Enviado para DocuSign",
				description: "Envelope criado e disparado para o e-mail do inquilino."
			});
		}, 1500);
	};
	const handleWhatsAppSend = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			mainStore.addAuditLog({
				propertyId: contract.propertyId,
				action: "Link de Assinatura enviado via WhatsApp API",
				user: user?.name || "Sistema",
				details: `Disparado para ${contract.tenantName} às ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`
			});
			toast({
				title: "WhatsApp Enviado",
				description: "Link seguro de assinatura encaminhado com sucesso para o cliente."
			});
			if (step === 1) {
				contractsStore.updateDocuSignStatus(contract.id, "Sent");
				setStep(2);
			}
		}, 1200);
	};
	const handleSimulateSign = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			contractsStore.updateDocuSignStatus(contract.id, "Signed");
			contractsStore.updateStatus(contract.id, "Ativo");
			const property = mainStore.getState().properties.find((p) => p.id === contract.propertyId);
			keysStore.addTask({
				contractId: contract.id,
				propertyId: contract.propertyId,
				tenantName: contract.tenantName,
				propertyAddress: property?.address || "Endereço Indisponível",
				type: "Delivery"
			});
			mainStore.addAuditLog({
				propertyId: contract.propertyId,
				action: "Contrato Assinado via DocuSign",
				user: "Integração",
				details: "Status atualizado para Ativo. Termo de Entrega de Chaves gerado."
			});
			toast({
				title: "Assinatura Concluída",
				description: "Contrato ativo. Documento salvo no SharePoint e tarefa de chaves criada."
			});
			onClose();
		}, 1500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/DocuSignDialog.tsx:104:5",
		"data-prohibitions": "[editContent]",
		open: !!contract,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/DocuSignDialog.tsx:105:7",
			"data-prohibitions": "[editContent]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/DocuSignDialog.tsx:106:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/DocuSignDialog.tsx:107:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, {
							"data-uid": "src/components/DocuSignDialog.tsx:108:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-blue-600"
						}), " Integração DocuSign API"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/DocuSignDialog.tsx:110:11",
						"data-prohibitions": "[]",
						children: "Envie a minuta para assinatura digital por E-mail ou WhatsApp."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocuSignDialog.tsx:115:9",
					"data-prohibitions": "[editContent]",
					className: "py-6 flex flex-col items-center justify-center text-center space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/DocuSignDialog.tsx:116:11",
						"data-prohibitions": "[editContent]",
						className: "bg-blue-50 p-4 rounded-full",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"data-uid": "src/components/DocuSignDialog.tsx:118:15",
							"data-prohibitions": "[editContent]",
							className: "w-10 h-10 text-blue-600 animate-spin"
						}) : step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, {
							"data-uid": "src/components/DocuSignDialog.tsx:120:15",
							"data-prohibitions": "[editContent]",
							className: "w-10 h-10 text-blue-600"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
							"data-uid": "src/components/DocuSignDialog.tsx:122:15",
							"data-prohibitions": "[editContent]",
							className: "w-10 h-10 text-emerald-600"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/DocuSignDialog.tsx:126:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							"data-uid": "src/components/DocuSignDialog.tsx:127:13",
							"data-prohibitions": "[editContent]",
							className: "font-semibold",
							children: contract.documentName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-uid": "src/components/DocuSignDialog.tsx:128:13",
							"data-prohibitions": "[editContent]",
							className: "text-sm text-muted-foreground mt-1",
							children: ["Inquilino: ", contract.tenantName]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/DocuSignDialog.tsx:132:9",
					"data-prohibitions": "[editContent]",
					className: "flex-col sm:flex-row gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/DocuSignDialog.tsx:133:11",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: onClose,
							disabled: loading,
							className: "w-full sm:w-auto",
							children: "Cancelar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/DocuSignDialog.tsx:142:11",
							"data-prohibitions": "[]",
							onClick: handleWhatsAppSend,
							disabled: loading,
							className: "w-full sm:w-auto bg-green-600 hover:bg-green-700",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
								"data-uid": "src/components/DocuSignDialog.tsx:147:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), "Enviar via WhatsApp"]
						}),
						step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/DocuSignDialog.tsx:152:13",
							"data-prohibitions": "[]",
							onClick: handleSend,
							disabled: loading,
							className: "w-full sm:w-auto bg-blue-600 hover:bg-blue-700",
							children: "Disparar Envelope"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/DocuSignDialog.tsx:160:13",
							"data-prohibitions": "[]",
							onClick: handleSimulateSign,
							disabled: loading,
							className: "w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700",
							children: "Simular Assinatura"
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region src/pages/Contracts.tsx
var statusColors = {
	Rascunho: "bg-gray-100 text-gray-800 border-gray-200",
	"Em Análise": "bg-amber-100 text-amber-800 border-amber-200",
	"Aprovado para Ajuste": "bg-blue-100 text-blue-800 border-blue-200",
	Finalizado: "bg-indigo-100 text-indigo-800 border-indigo-200",
	"Aguardando Assinatura": "bg-purple-100 text-purple-800 border-purple-200",
	Ativo: "bg-emerald-100 text-emerald-800 border-emerald-200",
	"Aguardando Renovação": "bg-orange-100 text-orange-800 border-orange-200",
	"Rescisão em Andamento": "bg-red-100 text-red-800 border-red-200",
	Rescindido: "bg-gray-200 text-gray-700 border-gray-300"
};
var getNextActions = (status) => {
	switch (status) {
		case "Rascunho": return ["Em Análise"];
		case "Em Análise": return ["Aprovado para Ajuste"];
		case "Aprovado para Ajuste": return ["Finalizado"];
		case "Finalizado": return ["Aguardando Assinatura"];
		case "Aguardando Assinatura": return ["Ativo"];
		case "Ativo": return ["Aguardando Renovação"];
		default: return [];
	}
};
function Contracts() {
	const { contracts } = useContractsStore();
	const { user } = useAuth();
	const { toast } = useToast();
	const mainSettings = useMainStore().sharepoint;
	const [wizardOpen, setWizardOpen] = (0, import_react.useState)(false);
	const [viewDoc, setViewDoc] = (0, import_react.useState)(null);
	const [docusignContract, setDocusignContract] = (0, import_react.useState)(null);
	const handleStatusChange = (contract, newStatus) => {
		contractsStore.updateStatus(contract.id, newStatus);
		mainStore.addAuditLog({
			propertyId: contract.propertyId,
			action: `Workflow do Contrato avançou para: ${newStatus}`,
			user: user?.name || "Sistema"
		});
		m365Service.sendTeamsMessage(mainSettings.teamsWebhookUrl, `Atualização de Contrato (${contract.id}): Mudou para "${newStatus}". Inquilino: ${contract.tenantName}`);
		if (newStatus === "Ativo") m365Service.moveDocument(contract.documentName, mainSettings.libraries.archive);
	};
	const handleCollaborativeEdit = (contract) => {
		setViewDoc(contract.documentName);
	};
	const handleApproveCritical = (contract) => {
		contractsStore.approveCriticalContract(contract.id);
		mainStore.addAuditLog({
			propertyId: contract.propertyId,
			action: "Aprovação Crítica de Contrato (Multi-level)",
			user: user?.name || "Sistema",
			details: "Aprovado pelo Jurídico/Gerência. Liberado para DocuSign."
		});
		toast({
			title: "Aprovação Registrada",
			description: "Contrato liberado para coleta de assinaturas."
		});
	};
	const handleWhatsAppSend = (contract) => {
		mainStore.addAuditLog({
			propertyId: contract.propertyId,
			action: "Link de Assinatura enviado via WhatsApp API",
			user: user?.name || "Sistema",
			details: `Enviado manualmente para ${contract.tenantName} às ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`
		});
		toast({
			title: "WhatsApp Enviado",
			description: `Link DocuSign enviado para ${contract.tenantName}.`
		});
		contractsStore.updateDocuSignStatus(contract.id, "Sent");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Contracts.tsx:136:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Contracts.tsx:137:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Contracts.tsx:138:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Contracts.tsx:139:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Gestão de Contratos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Contracts.tsx:140:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Acompanhe o workflow e assine digitalmente via DocuSign."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Contracts.tsx:144:9",
					"data-prohibitions": "[]",
					onClick: () => setWizardOpen(true),
					className: "shrink-0 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/Contracts.tsx:145:11",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), " Novo Contrato"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Contracts.tsx:149:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/Contracts.tsx:150:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/pages/Contracts.tsx:151:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/pages/Contracts.tsx:152:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Acervo de Contratos em Andamento"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/Contracts.tsx:154:11",
						"data-prohibitions": "[]",
						children: "Painel integrado à lista de Controle de Processos do SharePoint."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/Contracts.tsx:158:9",
					"data-prohibitions": "[editContent]",
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/Contracts.tsx:159:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/Contracts.tsx:160:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Contracts.tsx:161:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Contracts.tsx:162:17",
										"data-prohibitions": "[]",
										children: "ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Contracts.tsx:163:17",
										"data-prohibitions": "[]",
										children: "Documento / Template"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Contracts.tsx:164:17",
										"data-prohibitions": "[]",
										children: "Inquilino"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Contracts.tsx:165:17",
										"data-prohibitions": "[]",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Contracts.tsx:166:17",
										"data-prohibitions": "[]",
										children: "Assinatura"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Contracts.tsx:167:17",
										"data-prohibitions": "[]",
										className: "text-right",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
							"data-uid": "src/pages/Contracts.tsx:170:13",
							"data-prohibitions": "[editContent]",
							children: contracts.map((contract) => {
								const needsApproval = contract.isCritical && !contract.managerApproval;
								const canApprove = [
									"Admin",
									"Gerente",
									"Jurídico",
									"Gestor de Contrato"
								].includes(user?.role || "");
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									"data-uid": "src/pages/Contracts.tsx:178:19",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Contracts.tsx:179:21",
											"data-prohibitions": "[editContent]",
											className: "font-mono text-xs",
											children: contract.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
											"data-uid": "src/pages/Contracts.tsx:180:21",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Contracts.tsx:181:23",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
														"data-uid": "src/pages/Contracts.tsx:182:25",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4 text-primary"
													}),
													" ",
													contract.documentName,
													contract.isCritical && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/Contracts.tsx:184:27",
														"data-prohibitions": "[]",
														variant: "destructive",
														className: "ml-2 py-0 h-5",
														children: "Crítico"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Contracts.tsx:189:23",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground mt-1",
												children: ["Modelo: ", contract.template]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Contracts.tsx:193:21",
											"data-prohibitions": "[editContent]",
											children: contract.tenantName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Contracts.tsx:194:21",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Contracts.tsx:195:23",
												"data-prohibitions": "[editContent]",
												variant: "outline",
												className: `shadow-sm ${statusColors[contract.status]}`,
												children: contract.status
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
											"data-uid": "src/pages/Contracts.tsx:202:21",
											"data-prohibitions": "[editContent]",
											children: [
												contract.docusignStatus === "Signed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/pages/Contracts.tsx:204:25",
													"data-prohibitions": "[]",
													variant: "outline",
													className: "border-emerald-500 text-emerald-600 bg-emerald-50",
													children: "Assinado"
												}),
												contract.docusignStatus === "Sent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/pages/Contracts.tsx:212:25",
													"data-prohibitions": "[]",
													variant: "outline",
													className: "border-blue-500 text-blue-600 bg-blue-50",
													children: "Enviado"
												}),
												!contract.docusignStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Contracts.tsx:220:25",
													"data-prohibitions": "[]",
													className: "text-xs text-muted-foreground",
													children: "-"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Contracts.tsx:223:21",
											"data-prohibitions": "[editContent]",
											className: "text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
												"data-uid": "src/pages/Contracts.tsx:224:23",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
													"data-uid": "src/pages/Contracts.tsx:225:25",
													"data-prohibitions": "[]",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/Contracts.tsx:226:27",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, {
															"data-uid": "src/pages/Contracts.tsx:227:29",
															"data-prohibitions": "[editContent]",
															className: "w-4 h-4"
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
													"data-uid": "src/pages/Contracts.tsx:230:25",
													"data-prohibitions": "[editContent]",
													align: "end",
													className: "w-64",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
															"data-uid": "src/pages/Contracts.tsx:231:27",
															"data-prohibitions": "[]",
															children: "Ações do Documento"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:232:27",
															"data-prohibitions": "[]",
															onClick: () => setViewDoc(contract.documentName),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
																"data-uid": "src/pages/Contracts.tsx:233:29",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2"
															}), " Pré-visualizar (Nativo)"]
														}),
														needsApproval && canApprove && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:237:29",
															"data-prohibitions": "[]",
															onClick: () => handleApproveCritical(contract),
															className: "text-emerald-600 font-medium",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
																"data-uid": "src/pages/Contracts.tsx:241:31",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2"
															}), " Aprovar Emissão"]
														}),
														contract.status === "Aprovado para Ajuste" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:246:29",
															"data-prohibitions": "[]",
															onClick: () => handleCollaborativeEdit(contract),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, {
																"data-uid": "src/pages/Contracts.tsx:247:31",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2"
															}), " Editar no Word Online"]
														}),
														(contract.status === "Aguardando Assinatura" || contract.status === "Finalizado") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:254:31",
															"data-prohibitions": "[editContent]",
															onClick: () => setDocusignContract(contract),
															disabled: needsApproval,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, {
																"data-uid": "src/pages/Contracts.tsx:258:33",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2 text-blue-600"
															}), needsApproval ? "DocuSign Bloqueado" : "Enviar para DocuSign"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:261:31",
															"data-prohibitions": "[]",
															onClick: () => handleWhatsAppSend(contract),
															disabled: needsApproval,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
																"data-uid": "src/pages/Contracts.tsx:265:33",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2 text-green-600"
															}), "Enviar Link via WhatsApp"]
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {
															"data-uid": "src/pages/Contracts.tsx:271:27",
															"data-prohibitions": "[editContent]"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
															"data-uid": "src/pages/Contracts.tsx:272:27",
															"data-prohibitions": "[]",
															children: "Avançar Workflow"
														}),
														getNextActions(contract.status).map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:274:29",
															"data-prohibitions": "[editContent]",
															onClick: () => handleStatusChange(contract, action),
															children: [
																action === "Ativo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, {
																	"data-uid": "src/pages/Contracts.tsx:279:33",
																	"data-prohibitions": "[editContent]",
																	className: "w-4 h-4 mr-2 text-emerald-600"
																}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
																	"data-uid": "src/pages/Contracts.tsx:281:33",
																	"data-prohibitions": "[editContent]",
																	className: "w-4 h-4 mr-2"
																}),
																"Avançar p/ ",
																action
															]
														}, action))
													]
												})]
											})
										})
									]
								}, contract.id);
							})
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContractWizard, {
				"data-uid": "src/pages/Contracts.tsx:297:7",
				"data-prohibitions": "[editContent]",
				open: wizardOpen,
				onClose: () => setWizardOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewer, {
				"data-uid": "src/pages/Contracts.tsx:298:7",
				"data-prohibitions": "[editContent]",
				open: !!viewDoc,
				onClose: () => setViewDoc(null),
				docName: viewDoc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocuSignDialog, {
				"data-uid": "src/pages/Contracts.tsx:299:7",
				"data-prohibitions": "[editContent]",
				contract: docusignContract,
				onClose: () => setDocusignContract(null)
			})
		]
	});
}
//#endregion
export { Contracts as default };

//# sourceMappingURL=Contracts-Dk9OTQW8.js.map