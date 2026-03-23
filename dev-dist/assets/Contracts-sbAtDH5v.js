import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-_uYFM_aW.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as ArrowRight } from "./arrow-right-5lAqrHp-.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DBl3fXHr.js";
import { t as GedUpload } from "./GedUpload-B1PS-vzg.js";
import { t as CircleCheckBig } from "./circle-check-big-BFYmH0_6.js";
import { t as CloudUpload } from "./cloud-upload-BcnZQn0H.js";
import { t as Eye } from "./eye-BfGiJr9u.js";
import { t as DocumentViewer } from "./DocumentViewer-CL-GuG4q.js";
import { t as ShieldCheck } from "./shield-check-gbtKh5sC.js";
import { t as Button } from "./button-iQJzuPvV.js";
import "./client-SeHzFSrX.js";
import { i as useMainStore, r as mainStore } from "./main-B-eCdBtB.js";
import "./users-ycT8QHOP.js";
import { r as useContractsStore, t as contractsStore } from "./contracts-CjdGvlJa.js";
import { n as keysStore } from "./keys-CrRENort.js";
import { r as useEntitiesStore } from "./entities-DmZS4Guz.js";
import { $ as FileText, A as Input, F as Users, G as PenTool, K as LoaderCircle, L as User, W as Plus, X as House, a as DropdownMenuLabel, et as FilePlus, h as useAuth, i as DropdownMenuItem, n as DropdownMenu, o as DropdownMenuSeparator, r as DropdownMenuContent, s as DropdownMenuTrigger, t as Badge, tt as FilePenLine, x as useTemplatesStore } from "./index-DsVrPQAv.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-BhS_F8IN.js";
import { t as Label } from "./label-CTlYsXe6.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CV-6f29o.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BPtzSH_T.js";
import "./switch-RIpJ_1NS.js";
import { m365Service } from "./m365-B9aAw1uc.js";
import "./popover-2sXSpjlE.js";
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
function ContractWizard({ open, onClose }) {
	const store = useMainStore();
	const { templates } = useTemplatesStore();
	const { owners, tenants } = useEntitiesStore();
	const [purpose, setPurpose] = (0, import_react.useState)("tenant_contract");
	const [propertyId, setPropertyId] = (0, import_react.useState)("");
	const [guaranteeType, setGuaranteeType] = (0, import_react.useState)("N/A");
	const [templateName, setTemplateName] = (0, import_react.useState)("");
	const [tenantId, setTenantId] = (0, import_react.useState)("");
	const selectedProperty = (0, import_react.useMemo)(() => {
		return store.properties.find((p) => p.id === propertyId);
	}, [propertyId, store.properties]);
	const propertyOwner = (0, import_react.useMemo)(() => {
		return owners.find((o) => o.id === selectedProperty?.ownerId);
	}, [selectedProperty, owners]);
	const filteredTemplates = (0, import_react.useMemo)(() => {
		return templates.filter((t) => {
			if (t.category !== purpose) return false;
			if (purpose === "tenant_contract" && selectedProperty) {
				const typeMatches = t.propertyType === "Todos" || t.propertyType === selectedProperty.type;
				const guaranteeMatches = guaranteeType === "N/A" || t.guaranteeType === guaranteeType;
				return typeMatches && guaranteeMatches;
			}
			return true;
		});
	}, [
		templates,
		purpose,
		selectedProperty,
		guaranteeType
	]);
	const handleCreate = () => {
		const isTenant = purpose === "tenant_contract";
		const finalTenantName = isTenant ? tenants.find((t) => t.id === tenantId)?.fullName || "" : propertyOwner?.fullName || "";
		if (!templateName || !propertyId || !finalTenantName) return;
		const docName = `Rascunho_${finalTenantName.replace(/\s+/g, "_")}_${propertyId}.docx`;
		contractsStore.addContract({
			propertyId,
			tenantName: finalTenantName,
			template: templateName,
			status: "Rascunho",
			documentName: docName
		});
		mainStore.updateProperty(propertyId, {
			status: "Análise Gerencial",
			tenant: isTenant ? finalTenantName : void 0
		});
		m365Service.sendTeamsMessage(store.sharepoint.teamsWebhookUrl, `Novo Rascunho Criado: ${templateName} para o imóvel ID ${propertyId}. Relacionado a: ${finalTenantName}.`);
		mainStore.addAuditLog({
			propertyId,
			action: "Minuta Gerada via Wizard (SharePoint Templates)",
			user: "Equipe de Contratos",
			details: `Categoria: ${isTenant ? "Locação" : "Onboarding Proprietário"} - Enviado para Análise Gerencial.`
		});
		setPurpose("tenant_contract");
		setTemplateName("");
		setPropertyId("");
		setGuaranteeType("N/A");
		setTenantId("");
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/ContractWizard.tsx:103:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/ContractWizard.tsx:104:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[500px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/ContractWizard.tsx:105:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/ContractWizard.tsx:106:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus, {
							"data-uid": "src/components/ContractWizard.tsx:107:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Novo Contrato Inteligente"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/ContractWizard.tsx:109:11",
						"data-prohibitions": "[]",
						children: "O sistema vinculará os proprietários automaticamente."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/ContractWizard.tsx:113:9",
					"data-prohibitions": "[editContent]",
					className: "grid gap-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ContractWizard.tsx:114:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/ContractWizard.tsx:115:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
									"data-uid": "src/components/ContractWizard.tsx:116:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Imóvel Referência"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/ContractWizard.tsx:118:13",
								"data-prohibitions": "[editContent]",
								value: propertyId,
								onValueChange: setPropertyId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/ContractWizard.tsx:119:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/ContractWizard.tsx:120:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione o imóvel..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/components/ContractWizard.tsx:122:15",
									"data-prohibitions": "[editContent]",
									children: store.properties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										"data-uid": "src/components/ContractWizard.tsx:124:19",
										"data-prohibitions": "[editContent]",
										value: p.id,
										children: [
											"ID: ",
											p.id,
											" - ",
											p.title,
											" (",
											p.type,
											")"
										]
									}, p.id))
								})]
							})]
						}),
						selectedProperty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ContractWizard.tsx:133:13",
							"data-prohibitions": "[]",
							className: "grid gap-2 animate-fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/ContractWizard.tsx:134:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									"data-uid": "src/components/ContractWizard.tsx:135:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Proprietário Vinculado"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/ContractWizard.tsx:137:15",
								"data-prohibitions": "[editContent]",
								value: propertyOwner ? `${propertyOwner.fullName} (${propertyOwner.code})` : "Não vinculado / Indisponível",
								readOnly: true,
								className: "bg-muted font-medium text-foreground/80"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ContractWizard.tsx:149:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/ContractWizard.tsx:150:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
									"data-uid": "src/components/ContractWizard.tsx:151:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Finalidade do Documento"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/ContractWizard.tsx:153:13",
								"data-prohibitions": "[]",
								value: purpose,
								onValueChange: (v) => {
									setPurpose(v);
									setTemplateName("");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/ContractWizard.tsx:160:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/ContractWizard.tsx:161:17",
										"data-prohibitions": "[editContent]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/ContractWizard.tsx:163:15",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/ContractWizard.tsx:164:17",
										"data-prohibitions": "[]",
										value: "tenant_contract",
										children: "Contrato de Locação (Inquilino)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/ContractWizard.tsx:165:17",
										"data-prohibitions": "[]",
										value: "owner_onboarding",
										children: "Documentos Iniciais (Proprietário)"
									})]
								})]
							})]
						}),
						purpose === "tenant_contract" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ContractWizard.tsx:172:15",
							"data-prohibitions": "[]",
							className: "grid gap-2 animate-fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/ContractWizard.tsx:173:17",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									"data-uid": "src/components/ContractWizard.tsx:174:19",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Tipo de Garantia"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/ContractWizard.tsx:176:17",
								"data-prohibitions": "[]",
								value: guaranteeType,
								onValueChange: (v) => {
									setGuaranteeType(v);
									setTemplateName("");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/ContractWizard.tsx:183:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/ContractWizard.tsx:184:21",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione a garantia..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/ContractWizard.tsx:186:19",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ContractWizard.tsx:187:21",
											"data-prohibitions": "[]",
											value: "N/A",
											children: "Não se aplica / Todas"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ContractWizard.tsx:188:21",
											"data-prohibitions": "[]",
											value: "Caução",
											children: "Caução"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ContractWizard.tsx:189:21",
											"data-prohibitions": "[]",
											value: "Fiador",
											children: "Fiador"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ContractWizard.tsx:190:21",
											"data-prohibitions": "[]",
											value: "Seguro Fiança",
											children: "Seguro Fiança"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ContractWizard.tsx:191:21",
											"data-prohibitions": "[]",
											value: "Título de Capitalização",
											children: "Título de Capitalização"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ContractWizard.tsx:192:21",
											"data-prohibitions": "[]",
											value: "Averbação",
											children: "Averbação"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ContractWizard.tsx:193:21",
											"data-prohibitions": "[]",
											value: "Sem Garantia",
											children: "Sem Garantia"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ContractWizard.tsx:194:21",
											"data-prohibitions": "[]",
											value: "Troca de Locatário",
											children: "Troca de Locatário"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/ContractWizard.tsx:195:21",
											"data-prohibitions": "[]",
											value: "Garantia",
											children: "Garantia"
										})
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ContractWizard.tsx:200:15",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2 animate-fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/ContractWizard.tsx:201:17",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									"data-uid": "src/components/ContractWizard.tsx:202:19",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Locatário (Inquilino)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/ContractWizard.tsx:204:17",
								"data-prohibitions": "[editContent]",
								value: tenantId,
								onValueChange: setTenantId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/ContractWizard.tsx:205:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/ContractWizard.tsx:206:21",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione o inquilino..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/ContractWizard.tsx:208:19",
									"data-prohibitions": "[editContent]",
									children: [tenants.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										"data-uid": "src/components/ContractWizard.tsx:210:23",
										"data-prohibitions": "[editContent]",
										value: t.id,
										children: [
											t.fullName,
											" (",
											t.code,
											")"
										]
									}, t.id)), tenants.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/ContractWizard.tsx:215:23",
										"data-prohibitions": "[]",
										value: "_empty",
										disabled: true,
										children: "Nenhum inquilino cadastrado"
									})]
								})]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ContractWizard.tsx:225:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/ContractWizard.tsx:226:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus, {
									"data-uid": "src/components/ContractWizard.tsx:227:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Modelo de Documento (Sugerido)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/ContractWizard.tsx:229:13",
								"data-prohibitions": "[editContent]",
								value: templateName,
								onValueChange: setTemplateName,
								disabled: !propertyId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/ContractWizard.tsx:230:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/ContractWizard.tsx:231:17",
										"data-prohibitions": "[editContent]",
										placeholder: !propertyId ? "Selecione o imóvel primeiro" : "Selecione um template filtrado..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/components/ContractWizard.tsx:239:15",
									"data-prohibitions": "[editContent]",
									children: filteredTemplates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/ContractWizard.tsx:241:19",
										"data-prohibitions": "[]",
										value: "_empty",
										disabled: true,
										children: "Nenhum modelo encontrado para esta combinação"
									}) : filteredTemplates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/ContractWizard.tsx:246:21",
										"data-prohibitions": "[editContent]",
										value: t.name,
										children: t.name
									}, t.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/ContractWizard.tsx:255:11",
							"data-prohibitions": "[]",
							className: "flex items-start gap-3 rounded-lg border p-3 shadow-sm mt-2 bg-blue-50/50 border-blue-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
								"data-uid": "src/components/ContractWizard.tsx:256:13",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-blue-600 shrink-0 mt-0.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/ContractWizard.tsx:257:13",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/ContractWizard.tsx:258:15",
									"data-prohibitions": "[]",
									className: "text-sm font-medium text-blue-900",
									children: "Análise Gerencial Obrigatória"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/ContractWizard.tsx:259:15",
									"data-prohibitions": "[]",
									className: "text-xs text-blue-700 leading-relaxed",
									children: "Este contrato e o imóvel vinculado serão encaminhados automaticamente ao Hub de Validação para aprovação da gerência."
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/ContractWizard.tsx:266:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/ContractWizard.tsx:267:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: onClose,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/ContractWizard.tsx:270:11",
						"data-prohibitions": "[]",
						onClick: handleCreate,
						disabled: !templateName || !propertyId || purpose === "tenant_contract" && !tenantId || purpose === "owner_onboarding" && !propertyOwner,
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
	const [uploadContract, setUploadContract] = (0, import_react.useState)(null);
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
		"data-uid": "src/pages/Contracts.tsx:140:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Contracts.tsx:141:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Contracts.tsx:142:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Contracts.tsx:143:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Gestão de Contratos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Contracts.tsx:144:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Acompanhe o workflow e assine digitalmente via DocuSign."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Contracts.tsx:148:9",
					"data-prohibitions": "[]",
					onClick: () => setWizardOpen(true),
					className: "shrink-0 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/Contracts.tsx:149:11",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), " Novo Contrato"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Contracts.tsx:153:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/Contracts.tsx:154:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/pages/Contracts.tsx:155:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/pages/Contracts.tsx:156:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Acervo de Contratos em Andamento"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/Contracts.tsx:158:11",
						"data-prohibitions": "[]",
						children: "Painel integrado à lista de Controle de Processos do SharePoint."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/Contracts.tsx:162:9",
					"data-prohibitions": "[editContent]",
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/Contracts.tsx:163:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/Contracts.tsx:164:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Contracts.tsx:165:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Contracts.tsx:166:17",
										"data-prohibitions": "[]",
										children: "ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Contracts.tsx:167:17",
										"data-prohibitions": "[]",
										children: "Documento / Template"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Contracts.tsx:168:17",
										"data-prohibitions": "[]",
										children: "Inquilino"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Contracts.tsx:169:17",
										"data-prohibitions": "[]",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Contracts.tsx:170:17",
										"data-prohibitions": "[]",
										children: "Assinatura"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Contracts.tsx:171:17",
										"data-prohibitions": "[]",
										className: "text-right",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
							"data-uid": "src/pages/Contracts.tsx:174:13",
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
									"data-uid": "src/pages/Contracts.tsx:182:19",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Contracts.tsx:183:21",
											"data-prohibitions": "[editContent]",
											className: "font-mono text-xs",
											children: contract.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
											"data-uid": "src/pages/Contracts.tsx:184:21",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Contracts.tsx:185:23",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
														"data-uid": "src/pages/Contracts.tsx:186:25",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4 text-primary"
													}),
													" ",
													contract.documentName,
													contract.isCritical && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/Contracts.tsx:188:27",
														"data-prohibitions": "[]",
														variant: "destructive",
														className: "ml-2 py-0 h-5",
														children: "Crítico"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Contracts.tsx:193:23",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground mt-1",
												children: ["Modelo: ", contract.template]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Contracts.tsx:197:21",
											"data-prohibitions": "[editContent]",
											children: contract.tenantName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Contracts.tsx:198:21",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Contracts.tsx:199:23",
												"data-prohibitions": "[editContent]",
												variant: "outline",
												className: `shadow-sm ${statusColors[contract.status]}`,
												children: contract.status
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
											"data-uid": "src/pages/Contracts.tsx:206:21",
											"data-prohibitions": "[editContent]",
											children: [
												contract.docusignStatus === "Signed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/pages/Contracts.tsx:208:25",
													"data-prohibitions": "[]",
													variant: "outline",
													className: "border-emerald-500 text-emerald-600 bg-emerald-50",
													children: "Assinado"
												}),
												contract.docusignStatus === "Sent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/pages/Contracts.tsx:216:25",
													"data-prohibitions": "[]",
													variant: "outline",
													className: "border-blue-500 text-blue-600 bg-blue-50",
													children: "Enviado"
												}),
												!contract.docusignStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Contracts.tsx:224:25",
													"data-prohibitions": "[]",
													className: "text-xs text-muted-foreground",
													children: "-"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Contracts.tsx:227:21",
											"data-prohibitions": "[editContent]",
											className: "text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
												"data-uid": "src/pages/Contracts.tsx:228:23",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
													"data-uid": "src/pages/Contracts.tsx:229:25",
													"data-prohibitions": "[]",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/Contracts.tsx:230:27",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, {
															"data-uid": "src/pages/Contracts.tsx:231:29",
															"data-prohibitions": "[editContent]",
															className: "w-4 h-4"
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
													"data-uid": "src/pages/Contracts.tsx:234:25",
													"data-prohibitions": "[editContent]",
													align: "end",
													className: "w-64",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
															"data-uid": "src/pages/Contracts.tsx:235:27",
															"data-prohibitions": "[]",
															children: "Ações do Documento"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:236:27",
															"data-prohibitions": "[]",
															onClick: () => setViewDoc(contract.documentName),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
																"data-uid": "src/pages/Contracts.tsx:237:29",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2"
															}), " Pré-visualizar (Nativo)"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:240:27",
															"data-prohibitions": "[]",
															onClick: () => setUploadContract(contract),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
																"data-uid": "src/pages/Contracts.tsx:241:29",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2"
															}), " Upload Anexo (GED)"]
														}),
														needsApproval && canApprove && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:245:29",
															"data-prohibitions": "[]",
															onClick: () => handleApproveCritical(contract),
															className: "text-emerald-600 font-medium",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
																"data-uid": "src/pages/Contracts.tsx:249:31",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2"
															}), " Aprovar Emissão"]
														}),
														contract.status === "Aprovado para Ajuste" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:254:29",
															"data-prohibitions": "[]",
															onClick: () => handleCollaborativeEdit(contract),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, {
																"data-uid": "src/pages/Contracts.tsx:255:31",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2"
															}), " Editar no Word Online"]
														}),
														(contract.status === "Aguardando Assinatura" || contract.status === "Finalizado") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:262:31",
															"data-prohibitions": "[editContent]",
															onClick: () => setDocusignContract(contract),
															disabled: needsApproval,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, {
																"data-uid": "src/pages/Contracts.tsx:266:33",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2 text-blue-600"
															}), needsApproval ? "DocuSign Bloqueado" : "Enviar para DocuSign"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:269:31",
															"data-prohibitions": "[]",
															onClick: () => handleWhatsAppSend(contract),
															disabled: needsApproval,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
																"data-uid": "src/pages/Contracts.tsx:273:33",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2 text-green-600"
															}), "Enviar Link via WhatsApp"]
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {
															"data-uid": "src/pages/Contracts.tsx:279:27",
															"data-prohibitions": "[editContent]"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
															"data-uid": "src/pages/Contracts.tsx:280:27",
															"data-prohibitions": "[]",
															children: "Avançar Workflow"
														}),
														getNextActions(contract.status).map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															"data-uid": "src/pages/Contracts.tsx:282:29",
															"data-prohibitions": "[editContent]",
															onClick: () => handleStatusChange(contract, action),
															children: [
																action === "Ativo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, {
																	"data-uid": "src/pages/Contracts.tsx:287:33",
																	"data-prohibitions": "[editContent]",
																	className: "w-4 h-4 mr-2 text-emerald-600"
																}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
																	"data-uid": "src/pages/Contracts.tsx:289:33",
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
				"data-uid": "src/pages/Contracts.tsx:305:7",
				"data-prohibitions": "[editContent]",
				open: wizardOpen,
				onClose: () => setWizardOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewer, {
				"data-uid": "src/pages/Contracts.tsx:306:7",
				"data-prohibitions": "[editContent]",
				open: !!viewDoc,
				onClose: () => setViewDoc(null),
				docName: viewDoc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocuSignDialog, {
				"data-uid": "src/pages/Contracts.tsx:307:7",
				"data-prohibitions": "[editContent]",
				contract: docusignContract,
				onClose: () => setDocusignContract(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Contracts.tsx:309:7",
				"data-prohibitions": "[editContent]",
				open: !!uploadContract,
				onOpenChange: (val) => !val && setUploadContract(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Contracts.tsx:310:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						"data-uid": "src/pages/Contracts.tsx:311:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/pages/Contracts.tsx:312:13",
							"data-prohibitions": "[]",
							children: "Upload de Documento Estruturado"
						})
					}), uploadContract && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/Contracts.tsx:315:13",
						"data-prohibitions": "[]",
						className: "py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GedUpload, {
							"data-uid": "src/pages/Contracts.tsx:316:15",
							"data-prohibitions": "[editContent]",
							preselectedPropertyId: uploadContract.propertyId,
							preselectedType: uploadContract.status === "Ativo" ? "CONTRACT_ACTIVE" : "CONTRACT_TERMINATED",
							onSuccess: () => setUploadContract(null)
						})
					})]
				})
			})
		]
	});
}
//#endregion
export { Contracts as default };

//# sourceMappingURL=Contracts-sbAtDH5v.js.map