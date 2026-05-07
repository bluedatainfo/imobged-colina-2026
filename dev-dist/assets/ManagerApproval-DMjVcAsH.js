import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-BcW3sjWS.js";
import { t as Check } from "./check-Be7w2MjK.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as ChevronLeft } from "./chevron-left-BfhUcXaT.js";
import { t as CircleAlert } from "./circle-alert-tq6C5WFm.js";
import { t as Eye } from "./eye-BfGiJr9u.js";
import { n as MessageSquare, t as DocumentViewer } from "./DocumentViewer-Dan8J6Xq.js";
import { t as Button } from "./button-DZFv31v6.js";
import { t as supabase } from "./client-DbPPqM1c.js";
import { i as useMainStore, n as isSlaBreached, r as mainStore } from "./main-DA0wiXaK.js";
import "./users-JyPvLL0D.js";
import { i as contractsStore, o as useContractsStore } from "./keys-DkDcgPTP.js";
import { n as useEntitiesStore } from "./entities-pTkigeh5.js";
import { B as Users, F as TooltipTrigger, H as User, L as X, N as Tooltip, P as TooltipContent, U as UserCheck, X as LoaderCircle, _ as documentsStore, at as FilePenLine, g as useAuth, nt as FolderOpen, ot as Clock, rt as FileText, t as Badge, y as useDocumentsStore } from "./index-6I5rqLuQ.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DZXI3GJ_.js";
import "./label-CZKY3LJi.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DUvqWbey.js";
import { n as m365Service } from "./m365-CdBCqFdo.js";
import { t as Textarea } from "./textarea-WI23Z4mv.js";
var ArrowLeftRight = createLucideIcon("arrow-left-right", [
	["path", {
		d: "M8 3 4 7l4 4",
		key: "9rb6wj"
	}],
	["path", {
		d: "M4 7h16",
		key: "6tx8e3"
	}],
	["path", {
		d: "m16 21 4-4-4-4",
		key: "siv7j2"
	}],
	["path", {
		d: "M20 17H4",
		key: "h6l3hr"
	}]
]);
var FolderSearch = createLucideIcon("folder-search", [
	["path", {
		d: "M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1",
		key: "1bw5m7"
	}],
	["path", {
		d: "m21 21-1.9-1.9",
		key: "1g2n9r"
	}],
	["circle", {
		cx: "17",
		cy: "17",
		r: "3",
		key: "18b49y"
	}]
]);
//#endregion
//#region src/pages/ManagerApproval.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var DocItem = ({ name, badge, hasNotes, onClick }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-uid": "src/pages/ManagerApproval.tsx:54:3",
	"data-prohibitions": "[editContent]",
	className: "flex items-center gap-3 p-3 border rounded-lg bg-background hover:bg-accent transition-colors group cursor-pointer shadow-sm relative overflow-hidden",
	onClick,
	children: [
		hasNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:58:18",
			"data-prohibitions": "[]",
			className: "absolute top-0 left-0 w-1 h-full bg-amber-500"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:59:5",
			"data-prohibitions": "[editContent]",
			className: `p-2 rounded-md ${hasNotes ? "bg-amber-100 text-amber-700" : "bg-blue-100/50 text-blue-700"}`,
			children: hasNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
				"data-uid": "src/pages/ManagerApproval.tsx:64:19",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
				"data-uid": "src/pages/ManagerApproval.tsx:64:59",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:66:5",
			"data-prohibitions": "[editContent]",
			className: "flex-1 flex flex-col min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/pages/ManagerApproval.tsx:67:7",
				"data-prohibitions": "[editContent]",
				className: "text-sm font-medium truncate",
				title: name,
				children: name
			}), badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/pages/ManagerApproval.tsx:71:9",
				"data-prohibitions": "[editContent]",
				className: "text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5",
				children: badge
			})]
		}),
		hasNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
			"data-uid": "src/pages/ManagerApproval.tsx:77:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
				"data-uid": "src/pages/ManagerApproval.tsx:78:9",
				"data-prohibitions": "[]",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					"data-uid": "src/pages/ManagerApproval.tsx:79:11",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 text-amber-500 mr-2 shrink-0"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
				"data-uid": "src/pages/ManagerApproval.tsx:81:9",
				"data-prohibitions": "[]",
				children: "Documento possui notas de revisão pendentes"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-uid": "src/pages/ManagerApproval.tsx:84:5",
			"data-prohibitions": "[]",
			variant: "ghost",
			size: "icon",
			className: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
				"data-uid": "src/pages/ManagerApproval.tsx:89:7",
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
	const { owners, tenants } = useEntitiesStore();
	const approvals = store.properties.filter((p) => p.status === "Análise Gerencial");
	const [selectedHub, setSelectedHub] = (0, import_react.useState)(null);
	const [viewingItem, setViewingItem] = (0, import_react.useState)(null);
	const [rejectId, setRejectId] = (0, import_react.useState)(null);
	const [rejectReason, setRejectReason] = (0, import_react.useState)("");
	const [spFiles, setSpFiles] = (0, import_react.useState)([]);
	const [scanningSp, setScanningSp] = (0, import_react.useState)(false);
	const [spOwnerDocs, setSpOwnerDocs] = (0, import_react.useState)(null);
	const [spTenantDocs, setSpTenantDocs] = (0, import_react.useState)(null);
	const [scanningSpEntities, setScanningSpEntities] = (0, import_react.useState)(false);
	const [hubTenant, setHubTenant] = (0, import_react.useState)(null);
	const [hubGuarantor, setHubGuarantor] = (0, import_react.useState)(null);
	const ownerEntity = (0, import_react.useMemo)(() => {
		return selectedHub?.ownerId ? owners.find((o) => o.id === selectedHub.ownerId) : null;
	}, [selectedHub, owners]);
	const tenantEntity = (0, import_react.useMemo)(() => {
		return selectedHub?.tenant ? tenants.find((t) => t.fullName === selectedHub.tenant) : null;
	}, [selectedHub, tenants]);
	const ownerDocs = (0, import_react.useMemo)(() => {
		if (!selectedHub) return [];
		const docs = documents.filter((d) => d.propertyId === selectedHub.id && d.category === "OWNER_DOCUMENT" || ownerEntity && d.entityCode === ownerEntity.code && d.category === "OWNER_DOCUMENT");
		return Array.from(new Set(docs.map((a) => a.id))).map((id) => docs.find((a) => a.id === id));
	}, [
		selectedHub,
		documents,
		ownerEntity
	]);
	const tenantDocs = (0, import_react.useMemo)(() => {
		if (!selectedHub) return [];
		const docs = documents.filter((d) => d.propertyId === selectedHub.id && d.category === "TENANT_DOCUMENT" || tenantEntity && d.entityCode === tenantEntity.code && d.category === "TENANT_DOCUMENT" || hubTenant && d.entityCode === hubTenant.id && d.category === "TENANT_DOCUMENT");
		return Array.from(new Set(docs.map((a) => a.id))).map((id) => docs.find((a) => a.id === id));
	}, [
		selectedHub,
		documents,
		tenantEntity,
		hubTenant
	]);
	const guarantorDocs = (0, import_react.useMemo)(() => {
		if (!selectedHub) return [];
		const docs = documents.filter((d) => d.propertyId === selectedHub.id && d.category === "GUARANTEE_DOCUMENT" || hubGuarantor && d.entityCode === hubGuarantor.id && d.category === "GUARANTEE_DOCUMENT");
		return Array.from(new Set(docs.map((a) => a.id))).map((id) => docs.find((a) => a.id === id));
	}, [
		selectedHub,
		documents,
		hubGuarantor
	]);
	(0, import_react.useEffect)(() => {
		if (selectedHub) {
			const fetchHubEntities = async () => {
				const tId = selectedHub.tenant_id;
				const gId = selectedHub.guarantor_id;
				if (tId) {
					const { data } = await supabase.from("pre_registrations").select("*").eq("id", tId).maybeSingle();
					setHubTenant(data);
				} else setHubTenant(null);
				if (gId) {
					const { data } = await supabase.from("pre_registrations").select("*").eq("id", gId).maybeSingle();
					setHubGuarantor(data);
				} else setHubGuarantor(null);
			};
			fetchHubEntities();
		}
	}, [selectedHub]);
	(0, import_react.useEffect)(() => {
		if (selectedHub) {
			setScanningSpEntities(true);
			const fetchAndSyncEntities = async () => {
				try {
					const [oDocs, tDocs] = await Promise.all([ownerEntity ? m365Service.getEntityDocuments("OWNER_DOCUMENT", ownerEntity.code) : Promise.resolve(null), tenantEntity ? m365Service.getEntityDocuments("TENANT_DOCUMENT", tenantEntity.code) : Promise.resolve(null)]);
					const syncMissing = async (spFiles, category, entity) => {
						if (!spFiles || !entity) return;
						for (const spFile of spFiles) if (!documentsStore.getState().documents.some((d) => d.name.toLowerCase() === spFile.name.toLowerCase() && d.category === category && d.entityCode === entity.code)) await documentsStore.addDocument({
							propertyId: selectedHub.id,
							name: spFile.name,
							category,
							entityCode: entity.code,
							entityName: entity.fullName,
							filePath: spFile.name
						});
					};
					if (oDocs) await syncMissing(oDocs, "OWNER_DOCUMENT", ownerEntity);
					if (tDocs) await syncMissing(tDocs, "TENANT_DOCUMENT", tenantEntity);
					setSpOwnerDocs(oDocs);
					setSpTenantDocs(tDocs);
					setScanningSpEntities(false);
				} catch (e) {
					console.error("Error fetching entity docs", e);
					setScanningSpEntities(false);
				}
			};
			fetchAndSyncEntities();
		} else {
			setSpOwnerDocs(null);
			setSpTenantDocs(null);
		}
	}, [
		selectedHub,
		ownerEntity,
		tenantEntity
	]);
	const finalOwnerDocs = (0, import_react.useMemo)(() => {
		if (spOwnerDocs === null) return ownerDocs;
		return ownerDocs.filter((d) => spOwnerDocs.some((sp) => sp.name.toLowerCase() === d.name.toLowerCase()));
	}, [ownerDocs, spOwnerDocs]);
	const finalTenantDocs = (0, import_react.useMemo)(() => {
		if (spTenantDocs === null) return tenantDocs;
		return tenantDocs.filter((d) => spTenantDocs.some((sp) => sp.name.toLowerCase() === d.name.toLowerCase()));
	}, [tenantDocs, spTenantDocs]);
	const uploadedContracts = selectedHub ? documents.filter((d) => d.propertyId === selectedHub.id && d.category.startsWith("CONTRACT_")) : [];
	const systemContracts = selectedHub ? contracts.filter((c) => c.propertyId === selectedHub.id && c.status !== "Rescindido") : [];
	const hasPendingNotes = (0, import_react.useMemo)(() => {
		if (!selectedHub) return false;
		const hasDocNotes = [
			...finalOwnerDocs,
			...finalTenantDocs,
			...guarantorDocs,
			...uploadedContracts
		].some((d) => d.reviewNotes && d.reviewNotes.trim() !== "");
		const hasContractNotes = systemContracts.some((c) => c.reviewNotes && c.reviewNotes.trim() !== "");
		return hasDocNotes || hasContractNotes;
	}, [
		finalOwnerDocs,
		finalTenantDocs,
		systemContracts,
		uploadedContracts,
		selectedHub
	]);
	(0, import_react.useEffect)(() => {
		if (selectedHub) {
			let isMounted = true;
			setScanningSp(true);
			m365Service.searchFilesByPropertyId(selectedHub.id).then((files) => {
				if (isMounted) {
					setSpFiles(files);
					setScanningSp(false);
				}
			}).catch(() => {
				if (isMounted) setScanningSp(false);
			});
			return () => {
				isMounted = false;
			};
		} else setSpFiles([]);
	}, [selectedHub]);
	const handleApprove = (id) => {
		mainStore.updateProperty(id, {
			status: "Vistoria",
			isResubmission: false
		});
		systemContracts.forEach((c) => {
			if (c.status === "Em Análise") contractsStore.updateStatus(c.id, "Aprovado para Ajuste");
		});
		mainStore.addAuditLog({
			propertyId: id,
			action: "Aprovação Gerencial (Hub)",
			user: user?.name || "Sistema",
			details: "Documentação validada no Hub SharePoint. Handoff para vistoria e contratos liberados."
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
			const allNotes = [];
			finalOwnerDocs.forEach((d) => {
				if (d.reviewNotes) allNotes.push(`- Proprietário (${d.name}): ${d.reviewNotes}`);
			});
			finalTenantDocs.forEach((d) => {
				if (d.reviewNotes) allNotes.push(`- Locatário (${d.name}): ${d.reviewNotes}`);
			});
			guarantorDocs.forEach((d) => {
				if (d.reviewNotes) allNotes.push(`- Fiador (${d.name}): ${d.reviewNotes}`);
			});
			systemContracts.forEach((c) => {
				if (c.reviewNotes) allNotes.push(`- Contrato (${c.documentName}): ${c.reviewNotes}`);
			});
			uploadedContracts.forEach((d) => {
				if (d.reviewNotes) allNotes.push(`- Contrato Importado (${d.name}): ${d.reviewNotes}`);
			});
			const notesText = allNotes.length > 0 ? `\n\nApontamentos nos Documentos:\n${allNotes.join("\n")}` : "";
			const finalReason = `${rejectReason}${notesText}`;
			mainStore.updateProperty(rejectId, {
				status: "Pendente/Rascunho",
				isResubmission: false
			});
			systemContracts.forEach((c) => {
				if (c.status === "Em Análise") contractsStore.updateStatus(c.id, "Rascunho");
			});
			mainStore.addAuditLog({
				propertyId: rejectId,
				action: "Documentação Rejeitada",
				user: user?.name || "Sistema",
				details: `Motivo Geral: ${rejectReason}${notesText ? " (Ver apontamentos nos documentos)" : ""}`
			});
			m365Service.syncToList("Audit Log", `Rejeição do Imóvel ID: ${rejectId} por ${user?.name}`);
			m365Service.sendEmail(`${store.settings.administrativeEmails}, ${store.settings.managementEmails}`, `Documentação Rejeitada - Imóvel ID: ${rejectId}`, `Motivo: ${finalReason}\n\nPor favor, corrija as informações e reenvie para análise.`);
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
		"data-uid": "src/pages/ManagerApproval.tsx:410:7",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:411:9",
				"data-prohibitions": "[editContent]",
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/ManagerApproval.tsx:412:11",
					"data-prohibitions": "[]",
					variant: "outline",
					size: "icon",
					onClick: () => setSelectedHub(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						"data-uid": "src/pages/ManagerApproval.tsx:413:13",
						"data-prohibitions": "[editContent]",
						className: "h-5 w-5"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/ManagerApproval.tsx:415:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/ManagerApproval.tsx:416:13",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Hub de Validação"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/ManagerApproval.tsx:417:13",
						"data-prohibitions": "[editContent]",
						className: "text-muted-foreground",
						children: [
							"Analisando dossiê do imóvel: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								"data-uid": "src/pages/ManagerApproval.tsx:418:44",
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
				"data-uid": "src/pages/ManagerApproval.tsx:424:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-4 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/ManagerApproval.tsx:425:11",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:426:13",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/30 pb-4 border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:427:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									"data-uid": "src/pages/ManagerApproval.tsx:428:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-primary"
								}), " Proprietário"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:430:15",
								"data-prohibitions": "[editContent]",
								children: [
									"Documentos vinculados (",
									ownerEntity?.fullName || "Não definido",
									")"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:434:13",
							"data-prohibitions": "[editContent]",
							className: "p-4 space-y-3",
							children: scanningSpEntities ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:436:17",
								"data-prohibitions": "[]",
								className: "flex justify-center p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/ManagerApproval.tsx:437:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 animate-spin text-muted-foreground"
								})
							}) : finalOwnerDocs.length > 0 ? finalOwnerDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:441:19",
								"data-prohibitions": "[editContent]",
								name: doc.name,
								hasNotes: !!doc.reviewNotes,
								onClick: () => setViewingItem({
									type: "document",
									id: doc.id
								})
							}, doc.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:449:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground italic text-center p-4",
								children: "Nenhum documento de proprietário localizado no GED."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/ManagerApproval.tsx:456:11",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:457:13",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/30 pb-4 border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:458:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									"data-uid": "src/pages/ManagerApproval.tsx:459:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-primary"
								}), " Locatário"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:461:15",
								"data-prohibitions": "[editContent]",
								children: hubTenant?.full_name || selectedHub.tenant || "Não informado"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:465:13",
							"data-prohibitions": "[editContent]",
							className: "p-4 space-y-3",
							children: scanningSpEntities ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:467:17",
								"data-prohibitions": "[]",
								className: "flex justify-center p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/ManagerApproval.tsx:468:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 animate-spin text-muted-foreground"
								})
							}) : finalTenantDocs.length > 0 ? finalTenantDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:472:19",
								"data-prohibitions": "[editContent]",
								name: doc.name,
								hasNotes: !!doc.reviewNotes,
								onClick: () => setViewingItem({
									type: "document",
									id: doc.id
								})
							}, doc.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:480:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground italic text-center p-4",
								children: "Nenhum documento de locatário localizado no GED."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/ManagerApproval.tsx:487:11",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:488:13",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/30 pb-4 border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:489:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {
									"data-uid": "src/pages/ManagerApproval.tsx:490:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-primary"
								}), " Fiador"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:492:15",
								"data-prohibitions": "[editContent]",
								children: hubGuarantor?.full_name || "Sem fiador vinculado"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:494:13",
							"data-prohibitions": "[editContent]",
							className: "p-4 space-y-3",
							children: guarantorDocs.length > 0 ? guarantorDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:497:19",
								"data-prohibitions": "[editContent]",
								name: doc.name,
								hasNotes: !!doc.reviewNotes,
								onClick: () => setViewingItem({
									type: "document",
									id: doc.id
								})
							}, doc.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:505:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground italic text-center p-4",
								children: "Nenhum documento de garantia localizado."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/ManagerApproval.tsx:512:11",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm border-blue-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:513:13",
							"data-prohibitions": "[]",
							className: "bg-blue-50/50 pb-4 border-b border-blue-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:514:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-lg text-blue-900",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, {
									"data-uid": "src/pages/ManagerApproval.tsx:515:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-blue-600"
								}), " Contrato (GED + Ciclo)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:517:15",
								"data-prohibitions": "[]",
								children: "Minuta gerada ou contrato importado"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:519:13",
							"data-prohibitions": "[editContent]",
							className: "p-4 space-y-3",
							children: systemContracts.length > 0 || uploadedContracts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [systemContracts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:523:21",
								"data-prohibitions": "[editContent]",
								name: c.documentName,
								badge: "Ciclo de Contratos",
								hasNotes: !!c.reviewNotes,
								onClick: () => setViewingItem({
									type: "contract",
									id: c.id
								})
							}, c.id)), uploadedContracts.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:532:21",
								"data-prohibitions": "[editContent]",
								name: doc.name,
								badge: "Contrato Importado",
								hasNotes: !!doc.reviewNotes,
								onClick: () => setViewingItem({
									type: "document",
									id: doc.id
								})
							}, doc.id))] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:542:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground italic text-center p-4",
								children: "Nenhum contrato vinculado a este imóvel."
							})
						})]
					})
				]
			}),
			scanningSp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:551:11",
				"data-prohibitions": "[]",
				className: "flex items-center justify-center p-8 text-muted-foreground text-sm border border-dashed rounded-lg bg-muted/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/pages/ManagerApproval.tsx:552:13",
					"data-prohibitions": "[editContent]",
					className: "w-5 h-5 animate-spin mr-3 text-primary"
				}), "Buscando arquivos físicos adicionais vinculados a este imóvel no SharePoint..."]
			}) : spFiles.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/ManagerApproval.tsx:556:11",
				"data-prohibitions": "[editContent]",
				className: "shadow-sm border-purple-200 mt-6 animate-fade-in-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/ManagerApproval.tsx:557:13",
					"data-prohibitions": "[]",
					className: "bg-purple-50/50 pb-4 border-b border-purple-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/pages/ManagerApproval.tsx:558:15",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2 text-lg text-purple-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderSearch, {
							"data-uid": "src/pages/ManagerApproval.tsx:559:17",
							"data-prohibitions": "[editContent]",
							className: "h-5 w-5 text-purple-600"
						}), " Arquivos Físicos no SharePoint"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/ManagerApproval.tsx:561:15",
						"data-prohibitions": "[]",
						children: "Resultado da pesquisa híbrida automática na pasta do imóvel e arredores"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/ManagerApproval.tsx:565:13",
					"data-prohibitions": "[editContent]",
					className: "p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3",
					children: [spFiles.map((file) => {
						const isDocStore = documents.some((d) => d.name === file.name);
						const isContractStore = contracts.some((c) => c.documentName === file.name);
						if (isDocStore || isContractStore) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
							"data-uid": "src/pages/ManagerApproval.tsx:572:19",
							"data-prohibitions": "[editContent]",
							name: file.name,
							badge: "SharePoint Online",
							onClick: () => window.open(file.webUrl, "_blank")
						}, file.id);
					}), spFiles.filter((f) => !documents.some((d) => d.name === f.name) && !contracts.some((c) => c.documentName === f.name)).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/ManagerApproval.tsx:585:17",
						"data-prohibitions": "[]",
						className: "col-span-full text-sm text-muted-foreground italic text-center p-2",
						children: "Todos os arquivos encontrados já estão listados nos cards acima."
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:593:9",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/ManagerApproval.tsx:594:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => setSelectedHub(null),
						children: "Voltar para Lista"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/ManagerApproval.tsx:597:11",
						"data-prohibitions": "[]",
						variant: "destructive",
						onClick: () => setRejectId(selectedHub.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							"data-uid": "src/pages/ManagerApproval.tsx:598:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 mr-2"
						}), " Rejeitar Documentação"]
					}),
					hasPendingNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
						"data-uid": "src/pages/ManagerApproval.tsx:602:13",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
							"data-uid": "src/pages/ManagerApproval.tsx:603:15",
							"data-prohibitions": "[]",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:604:17",
								"data-prohibitions": "[]",
								className: "inline-block cursor-not-allowed w-full sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/ManagerApproval.tsx:605:19",
									"data-prohibitions": "[]",
									className: "bg-emerald-600/50 text-white pointer-events-none w-full",
									tabIndex: -1,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										"data-uid": "src/pages/ManagerApproval.tsx:609:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 mr-2"
									}), " Aprovar e Enviar p/ Vistoria"]
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:613:15",
							"data-prohibitions": "[]",
							className: "bg-destructive text-destructive-foreground border-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:614:17",
								"data-prohibitions": "[]",
								className: "font-semibold text-sm mb-1",
								children: "Aprovação Bloqueada"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:615:17",
								"data-prohibitions": "[]",
								className: "text-xs",
								children: "Existem anotações pendentes nos documentos. Rejeite o dossiê para correções."
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/ManagerApproval.tsx:621:13",
						"data-prohibitions": "[]",
						className: "bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto",
						onClick: () => handleApprove(selectedHub.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							"data-uid": "src/pages/ManagerApproval.tsx:625:15",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 mr-2"
						}), " Aprovar e Enviar p/ Vistoria"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewer, {
				"data-uid": "src/pages/ManagerApproval.tsx:630:9",
				"data-prohibitions": "[editContent]",
				open: !!viewingItem,
				onClose: () => setViewingItem(null),
				viewItem: viewingItem
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/ManagerApproval.tsx:636:9",
				"data-prohibitions": "[]",
				open: !!rejectId,
				onOpenChange: (val) => !val && setRejectId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/ManagerApproval.tsx:637:11",
					"data-prohibitions": "[]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:638:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:639:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/pages/ManagerApproval.tsx:640:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-destructive"
								}), " Rejeitar Documentação"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:642:15",
								"data-prohibitions": "[]",
								children: "Informe o motivo da rejeição. As notas inseridas individualmente nos documentos serão enviadas aos gestores automaticamente."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/ManagerApproval.tsx:647:13",
							"data-prohibitions": "[]",
							className: "py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-uid": "src/pages/ManagerApproval.tsx:648:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: Faltou enviar o verso do RG ou o comprovante está ilegível...",
								value: rejectReason,
								onChange: (e) => setRejectReason(e.target.value),
								className: "min-h-[100px]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/ManagerApproval.tsx:655:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/ManagerApproval.tsx:656:15",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setRejectId(null),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/ManagerApproval.tsx:659:15",
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
		"data-uid": "src/pages/ManagerApproval.tsx:670:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:671:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/ManagerApproval.tsx:672:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight",
				children: "Análise do Gerente"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/ManagerApproval.tsx:673:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "Abra o Hub de Validação para conferir a documentação completa de proprietários e locatários antes da vistoria."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:679:7",
			"data-prohibitions": "[editContent]",
			className: "grid gap-4",
			children: [approvals.map((item) => {
				const breached = isSlaBreached(item.slaStart, store.settings.slaHours);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/ManagerApproval.tsx:683:13",
					"data-prohibitions": "[editContent]",
					className: `flex flex-col md:flex-row gap-4 p-5 items-center md:items-start ${breached ? "border-destructive bg-destructive/5" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/ManagerApproval.tsx:689:15",
						"data-prohibitions": "[editContent]",
						className: "flex-1 space-y-4 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/ManagerApproval.tsx:690:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:691:19",
								"data-prohibitions": "[editContent]",
								className: `p-3 rounded-xl shrink-0 ${breached ? "bg-destructive/20" : "bg-primary/10"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {
									"data-uid": "src/pages/ManagerApproval.tsx:696:21",
									"data-prohibitions": "[editContent]",
									className: `h-6 w-6 ${breached ? "text-destructive" : "text-primary"}`
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:700:19",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/ManagerApproval.tsx:701:21",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-lg",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/ManagerApproval.tsx:702:21",
										"data-prohibitions": "[editContent]",
										className: "text-sm text-muted-foreground mt-0.5 flex flex-wrap gap-x-2 gap-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/ManagerApproval.tsx:703:23",
												"data-prohibitions": "[editContent]",
												children: [
													"ID:",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/ManagerApproval.tsx:705:25",
														"data-prohibitions": "[editContent]",
														className: "font-mono bg-muted px-1 py-0.5 rounded",
														children: item.id
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/ManagerApproval.tsx:707:23",
												"data-prohibitions": "[editContent]",
												children: ["• Locatário: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													"data-uid": "src/pages/ManagerApproval.tsx:708:38",
													"data-prohibitions": "[editContent]",
													children: item.tenant || "Aguardando"
												})]
											}),
											item.guarantor_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/ManagerApproval.tsx:711:25",
												"data-prohibitions": "[]",
												children: [
													"•",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/ManagerApproval.tsx:713:27",
														"data-prohibitions": "[]",
														variant: "secondary",
														className: "text-xs h-5",
														children: "Com Fiador"
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/ManagerApproval.tsx:719:21",
										"data-prohibitions": "[editContent]",
										className: "flex gap-2 pt-3 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/ManagerApproval.tsx:720:23",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "border-amber-500 text-amber-600 bg-amber-50",
												children: "Análise Gerencial"
											}),
											item.isResubmission && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/pages/ManagerApproval.tsx:727:25",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "border-purple-500 text-purple-700 bg-purple-50 animate-in fade-in",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, {
													"data-uid": "src/pages/ManagerApproval.tsx:731:27",
													"data-prohibitions": "[editContent]",
													className: "w-3 h-3 mr-1"
												}), " Nova Análise (Retorno)"]
											}),
											breached && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/pages/ManagerApproval.tsx:735:25",
												"data-prohibitions": "[editContent]",
												variant: "destructive",
												className: "animate-pulse",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
														"data-uid": "src/pages/ManagerApproval.tsx:736:27",
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
												"data-uid": "src/pages/ManagerApproval.tsx:741:25",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground flex items-center mt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
													"data-uid": "src/pages/ManagerApproval.tsx:742:27",
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
						"data-uid": "src/pages/ManagerApproval.tsx:750:15",
						"data-prohibitions": "[]",
						className: "flex flex-col gap-2 w-full md:w-56 shrink-0 mt-4 md:mt-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/ManagerApproval.tsx:751:17",
							"data-prohibitions": "[]",
							size: "lg",
							className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm",
							onClick: () => setSelectedHub(item),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
								"data-uid": "src/pages/ManagerApproval.tsx:756:19",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 mr-2"
							}), " Analisar Dossiê"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/ManagerApproval.tsx:758:17",
							"data-prohibitions": "[]",
							className: "text-xs text-center text-muted-foreground px-2",
							children: "Acesse os documentos reais vinculados"
						})]
					})]
				}, item.id);
			}), approvals.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/ManagerApproval.tsx:767:11",
				"data-prohibitions": "[]",
				className: "p-12 text-center text-muted-foreground flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						"data-uid": "src/pages/ManagerApproval.tsx:768:13",
						"data-prohibitions": "[editContent]",
						className: "h-12 w-12 mb-4 text-emerald-500 opacity-50"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/ManagerApproval.tsx:769:13",
						"data-prohibitions": "[]",
						className: "text-lg font-medium text-foreground",
						children: "Todas as análises concluídas!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/ManagerApproval.tsx:770:13",
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

//# sourceMappingURL=ManagerApproval-DMjVcAsH.js.map