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
import { n as MessageSquare, t as DocumentViewer } from "./DocumentViewer-CabHwinW.js";
import { t as Button } from "./button-DZFv31v6.js";
import { t as supabase } from "./client-DbPPqM1c.js";
import { i as useMainStore, n as isSlaBreached, r as mainStore } from "./main-q-0oPKZw.js";
import "./users-DQmtGtfO.js";
import { i as contractsStore, o as useContractsStore } from "./keys-BxY60ceF.js";
import { n as useEntitiesStore } from "./entities-pTkigeh5.js";
import { B as Users, F as TooltipTrigger, H as User, L as X, N as Tooltip, P as TooltipContent, U as UserCheck, X as LoaderCircle, _ as documentsStore, at as FilePenLine, g as useAuth, nt as FolderOpen, ot as Clock, rt as FileText, t as Badge, y as useDocumentsStore } from "./index-ChWt8vwl.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DZXI3GJ_.js";
import "./label-CZKY3LJi.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BzIHTfqF.js";
import { n as m365Service } from "./m365-CBkwAIgl.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-qbe6mH6v.js";
import { t as Textarea } from "./textarea-IeL7Remy.js";
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
var formatDossierId = (propertyId, allProperties) => {
	if (propertyId.startsWith("MAN")) return propertyId;
	const index = [...allProperties].sort((a, b) => {
		return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
	}).findIndex((p) => p.id === propertyId);
	if (index === -1) return `MAN00000`;
	return `MAN${String(index + 1).padStart(5, "0")}`;
};
var isInteressado = (p, tenantsList) => {
	if (p.tenant_id || p.tenantId) return true;
	if (!p.tenant) return true;
	return !tenantsList.some((t) => t.fullName === p.tenant);
};
var FormCard = ({ title, entity }) => {
	if (!entity?.form_data) return null;
	const validEntries = Object.entries(entity.form_data).filter(([key, value]) => {
		if (key.startsWith("@") || key.startsWith("OData_") || key.toLowerCase().startsWith("odata.")) return false;
		if ([
			"id",
			"title",
			"created",
			"modified",
			"authorid",
			"editorid",
			"attachments",
			"guid",
			"complianceassetid",
			"filesystemobjecttype",
			"iteminternalid",
			"contenttypeid",
			"contenttype",
			"odata.type",
			"odata.id",
			"odata.etag",
			"odata.editlink",
			"serverredirectedembeduri",
			"serverredirectedembedurl"
		].includes(key.toLowerCase())) return false;
		if (value === null || value === "" || value === void 0) return false;
		if (typeof value === "object") return false;
		return true;
	});
	if (validEntries.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/ManagerApproval.tsx:96:5",
		"data-prohibitions": "[editContent]",
		className: "shadow-sm border-blue-200 bg-blue-50/20 mb-6 animate-in fade-in slide-in-from-bottom-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/pages/ManagerApproval.tsx:97:7",
			"data-prohibitions": "[editContent]",
			className: "pb-3 border-b border-blue-100 bg-white/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				"data-uid": "src/pages/ManagerApproval.tsx:98:9",
				"data-prohibitions": "[editContent]",
				className: "text-lg flex items-center gap-2 text-blue-900",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
						"data-uid": "src/pages/ManagerApproval.tsx:99:11",
						"data-prohibitions": "[editContent]",
						className: "h-5 w-5 text-blue-600"
					}),
					"Ficha Cadastral (",
					title,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
				"data-uid": "src/pages/ManagerApproval.tsx:102:9",
				"data-prohibitions": "[]",
				className: "text-blue-700/70",
				children: "Informações preenchidas no formulário de pré-cadastro original"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/pages/ManagerApproval.tsx:106:7",
			"data-prohibitions": "[editContent]",
			className: "p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:107:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
				children: validEntries.map(([key, value]) => {
					const formattedKey = key.replace(/_x0020_/g, " ").replace(/_x002d_/g, "-").replace(/([A-Z])/g, " $1").trim().replace(/^./, (str) => str.toUpperCase());
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/ManagerApproval.tsx:117:15",
						"data-prohibitions": "[editContent]",
						className: "space-y-1 bg-white p-3 rounded-md border border-blue-100 shadow-sm hover:border-blue-300 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/ManagerApproval.tsx:121:17",
							"data-prohibitions": "[editContent]",
							className: "text-[10px] font-semibold text-blue-800/70 uppercase tracking-wider block truncate",
							title: formattedKey,
							children: formattedKey
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/ManagerApproval.tsx:127:17",
							"data-prohibitions": "[editContent]",
							className: "text-sm font-medium text-slate-700 break-words",
							children: String(value)
						})]
					}, key);
				})
			})
		})]
	});
};
var DocItem = ({ name, badge, hasNotes, isFolder, onClick }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-uid": "src/pages/ManagerApproval.tsx:150:3",
	"data-prohibitions": "[editContent]",
	className: "flex items-center gap-3 p-3 border rounded-lg bg-background hover:bg-accent transition-colors group cursor-pointer shadow-sm relative overflow-hidden",
	onClick,
	children: [
		hasNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:154:18",
			"data-prohibitions": "[]",
			className: "absolute top-0 left-0 w-1 h-full bg-amber-500"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:155:5",
			"data-prohibitions": "[editContent]",
			className: `p-2 rounded-md ${hasNotes ? "bg-amber-100 text-amber-700" : isFolder ? "bg-purple-100 text-purple-700" : "bg-blue-100/50 text-blue-700"}`,
			children: hasNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
				"data-uid": "src/pages/ManagerApproval.tsx:165:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			}) : isFolder ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
				"data-uid": "src/pages/ManagerApproval.tsx:167:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
				"data-uid": "src/pages/ManagerApproval.tsx:169:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:172:5",
			"data-prohibitions": "[editContent]",
			className: "flex-1 flex flex-col min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/pages/ManagerApproval.tsx:173:7",
				"data-prohibitions": "[editContent]",
				className: "text-sm font-medium truncate",
				title: name,
				children: name
			}), badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/pages/ManagerApproval.tsx:177:9",
				"data-prohibitions": "[editContent]",
				className: "text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5",
				children: badge
			})]
		}),
		hasNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
			"data-uid": "src/pages/ManagerApproval.tsx:183:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
				"data-uid": "src/pages/ManagerApproval.tsx:184:9",
				"data-prohibitions": "[]",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					"data-uid": "src/pages/ManagerApproval.tsx:185:11",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 text-amber-500 mr-2 shrink-0"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
				"data-uid": "src/pages/ManagerApproval.tsx:187:9",
				"data-prohibitions": "[]",
				children: "Documento possui notas de revisão pendentes"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-uid": "src/pages/ManagerApproval.tsx:190:5",
			"data-prohibitions": "[editContent]",
			variant: "ghost",
			size: "icon",
			className: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
			children: isFolder ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
				"data-uid": "src/pages/ManagerApproval.tsx:196:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4 text-muted-foreground"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
				"data-uid": "src/pages/ManagerApproval.tsx:198:9",
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
	const approvals = (0, import_react.useMemo)(() => {
		return store.properties.filter((p) => p.status === "Análise Gerencial").sort((a, b) => {
			const dateA = new Date(a.createdAt || a.slaStart || a.updatedAt || 0).getTime();
			return new Date(b.createdAt || b.slaStart || b.updatedAt || 0).getTime() - dateA;
		});
	}, [store.properties]);
	const interessados = (0, import_react.useMemo)(() => approvals.filter((p) => isInteressado(p, tenants)), [approvals, tenants]);
	const locatarios = (0, import_react.useMemo)(() => approvals.filter((p) => !isInteressado(p, tenants)), [approvals, tenants]);
	const [selectedHub, setSelectedHub] = (0, import_react.useState)(null);
	const [viewingItem, setViewingItem] = (0, import_react.useState)(null);
	const [rejectId, setRejectId] = (0, import_react.useState)(null);
	const [rejectReason, setRejectReason] = (0, import_react.useState)("");
	const [spFiles, setSpFiles] = (0, import_react.useState)([]);
	const [rawSpFiles, setRawSpFiles] = (0, import_react.useState)([]);
	const [scanningSp, setScanningSp] = (0, import_react.useState)(false);
	const [activeFolderFiles, setActiveFolderFiles] = (0, import_react.useState)(null);
	const [folderHistory, setFolderHistory] = (0, import_react.useState)([]);
	const [loadingFolder, setLoadingFolder] = (0, import_react.useState)(null);
	const [spOwnerDocs, setSpOwnerDocs] = (0, import_react.useState)(null);
	const [spTenantDocs, setSpTenantDocs] = (0, import_react.useState)(null);
	const [scanningSpEntities, setScanningSpEntities] = (0, import_react.useState)(false);
	const [hubTenant, setHubTenant] = (0, import_react.useState)(null);
	const [hubGuarantor, setHubGuarantor] = (0, import_react.useState)(null);
	const [hubOwner, setHubOwner] = (0, import_react.useState)(null);
	const ownerEntity = (0, import_react.useMemo)(() => {
		const oId = selectedHub?.owner_id || selectedHub?.ownerId;
		return oId ? owners.find((o) => o.id === oId) : null;
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
		let isMounted = true;
		if (selectedHub) {
			setHubTenant(null);
			setHubGuarantor(null);
			setHubOwner(null);
			const fetchHubEntities = async () => {
				const { data: propData } = await supabase.from("properties").select("tenant_id, guarantor_id, owner_id").eq("id", selectedHub.id).maybeSingle();
				if (!isMounted) return;
				const tId = propData?.tenant_id || selectedHub.tenant_id || selectedHub.tenantId;
				const gId = propData?.guarantor_id || selectedHub.guarantor_id || selectedHub.guarantorId;
				const oId = propData?.owner_id || selectedHub.owner_id || selectedHub.ownerId;
				if (tId) {
					const { data } = await supabase.from("pre_registrations").select("*").eq("id", tId).maybeSingle();
					if (isMounted) setHubTenant(data);
				} else if (isMounted) setHubTenant(null);
				if (gId) {
					const { data } = await supabase.from("pre_registrations").select("*").eq("id", gId).maybeSingle();
					if (isMounted) setHubGuarantor(data);
				} else if (isMounted) setHubGuarantor(null);
				if (oId) {
					const { data } = await supabase.from("owners").select("*").eq("id", oId).maybeSingle();
					if (isMounted) setHubOwner(data);
				} else if (isMounted) setHubOwner(null);
			};
			fetchHubEntities();
		} else {
			setHubTenant(null);
			setHubGuarantor(null);
			setHubOwner(null);
		}
		return () => {
			isMounted = false;
		};
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
		let isMounted = true;
		if (selectedHub) {
			setScanningSp(true);
			m365Service.searchFilesByPropertyId(selectedHub.id).then((files) => {
				if (isMounted) {
					setRawSpFiles(files);
					setScanningSp(false);
				}
			}).catch(() => {
				if (isMounted) setScanningSp(false);
			});
		} else {
			setRawSpFiles([]);
			setScanningSp(false);
		}
		return () => {
			isMounted = false;
		};
	}, [selectedHub]);
	(0, import_react.useEffect)(() => {
		if (!selectedHub) {
			setSpFiles([]);
			setActiveFolderFiles(null);
			setFolderHistory([]);
			return;
		}
		const isShortNumeric = /^\d{1,6}$/.test(selectedHub.id);
		setSpFiles(rawSpFiles.filter((f) => {
			if (!isShortNumeric) return true;
			const pathStr = (f.parentReference?.path || f.webUrl || "").toLowerCase();
			const nameStr = (f.name || "").toLowerCase();
			const tenantName = (selectedHub.tenant || "").toLowerCase();
			const ownerName = (hubOwner?.full_name || ownerEntity?.fullName || "").toLowerCase();
			const exactFolderMatch = pathStr.endsWith(`/${selectedHub.id}`) || pathStr.includes(`/${selectedHub.id}/`);
			const hasTenant = tenantName && (pathStr.includes(tenantName) || nameStr.includes(tenantName));
			const hasOwner = ownerName && (pathStr.includes(ownerName) || nameStr.includes(ownerName));
			return exactFolderMatch || hasTenant || hasOwner;
		}));
		setActiveFolderFiles(null);
		setFolderHistory([]);
	}, [
		rawSpFiles,
		selectedHub,
		hubOwner,
		ownerEntity
	]);
	const handleFolderClick = async (folder) => {
		setLoadingFolder(folder.id);
		try {
			const children = await m365Service.getDriveItemChildren(folder.siteId, folder.driveId, folder.id);
			setFolderHistory((prev) => [...prev, {
				id: folder.id,
				name: folder.name,
				files: activeFolderFiles || spFiles
			}]);
			setActiveFolderFiles(children);
		} catch (e) {
			toast({
				title: "Erro",
				description: "Não foi possível abrir a pasta",
				variant: "destructive"
			});
		} finally {
			setLoadingFolder(null);
		}
	};
	const handleBackFolder = () => {
		setFolderHistory((prev) => {
			const newHistory = [...prev];
			const last = newHistory.pop();
			if (last) setActiveFolderFiles(newHistory.length === 0 ? null : last.files);
			return newHistory;
		});
		if (folderHistory.length === 1) setActiveFolderFiles(null);
	};
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
		const displayId = formatDossierId(id, store.properties);
		m365Service.syncToList("Audit Log", `Aprovação do Imóvel ID: ${displayId} por ${user?.name}`);
		m365Service.sendEmail(`${store.settings.administrativeEmails}, ${store.settings.operationalEmails}`, `Documentação Aprovada - Imóvel ID: ${displayId}`, "A gerência aprovou a documentação. Próximo passo: Vistoria.");
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
				const label = isInteressado(selectedHub, tenants) ? "Interessado" : "Locatário";
				if (d.reviewNotes) allNotes.push(`- ${label} (${d.name}): ${d.reviewNotes}`);
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
			const displayId = formatDossierId(rejectId, store.properties);
			m365Service.syncToList("Audit Log", `Rejeição do Imóvel ID: ${displayId} por ${user?.name}`);
			m365Service.sendEmail(`${store.settings.administrativeEmails}, ${store.settings.managementEmails}`, `Documentação Rejeitada - Imóvel ID: ${displayId}`, `Motivo: ${finalReason}\n\nPor favor, corrija as informações e reenvie para análise.`);
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
		"data-uid": "src/pages/ManagerApproval.tsx:658:7",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:659:9",
				"data-prohibitions": "[editContent]",
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/ManagerApproval.tsx:660:11",
					"data-prohibitions": "[]",
					variant: "outline",
					size: "icon",
					onClick: () => setSelectedHub(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						"data-uid": "src/pages/ManagerApproval.tsx:661:13",
						"data-prohibitions": "[editContent]",
						className: "h-5 w-5"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/ManagerApproval.tsx:663:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/ManagerApproval.tsx:664:13",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Hub de Validação"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/ManagerApproval.tsx:665:13",
						"data-prohibitions": "[editContent]",
						className: "text-muted-foreground",
						children: [
							"Analisando dossiê do imóvel: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								"data-uid": "src/pages/ManagerApproval.tsx:666:44",
								"data-prohibitions": "[editContent]",
								children: selectedHub.title
							}),
							" (ID:",
							" ",
							formatDossierId(selectedHub.id, store.properties),
							")"
						]
					})]
				})]
			}),
			hubTenant?.form_data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormCard, {
				"data-uid": "src/pages/ManagerApproval.tsx:673:11",
				"data-prohibitions": "[editContent]",
				title: isInteressado(selectedHub, tenants) ? "Interessado" : "Locatário",
				entity: hubTenant
			}),
			hubGuarantor?.form_data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormCard, {
				"data-uid": "src/pages/ManagerApproval.tsx:678:37",
				"data-prohibitions": "[editContent]",
				title: "Fiador",
				entity: hubGuarantor
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:680:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-4 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/ManagerApproval.tsx:681:11",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:682:13",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/30 pb-4 border-b",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									"data-uid": "src/pages/ManagerApproval.tsx:683:15",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2 text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
										"data-uid": "src/pages/ManagerApproval.tsx:684:17",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 text-primary"
									}), " Proprietário"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
									"data-uid": "src/pages/ManagerApproval.tsx:686:15",
									"data-prohibitions": "[editContent]",
									children: [
										"Documentos vinculados (",
										hubOwner?.full_name || ownerEntity?.fullName || ownerEntity?.full_name || "Não definido",
										")"
									]
								}),
								" "
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:695:13",
							"data-prohibitions": "[editContent]",
							className: "p-4 space-y-3",
							children: scanningSpEntities ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:697:17",
								"data-prohibitions": "[]",
								className: "flex justify-center p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/ManagerApproval.tsx:698:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 animate-spin text-muted-foreground"
								})
							}) : finalOwnerDocs.length > 0 ? finalOwnerDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:702:19",
								"data-prohibitions": "[editContent]",
								name: doc.name,
								hasNotes: !!doc.reviewNotes,
								onClick: () => setViewingItem({
									type: "document",
									id: doc.id
								})
							}, doc.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:710:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground italic text-center p-4",
								children: "Nenhum documento de proprietário localizado no GED."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/ManagerApproval.tsx:717:11",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:718:13",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/30 pb-4 border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:719:15",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-2 text-lg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
										"data-uid": "src/pages/ManagerApproval.tsx:720:17",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 text-primary"
									}),
									" ",
									isInteressado(selectedHub, tenants) ? "Interessado" : "Locatário"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:723:15",
								"data-prohibitions": "[editContent]",
								children: hubTenant?.full_name || selectedHub.tenant || "Não informado"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:727:13",
							"data-prohibitions": "[editContent]",
							className: "p-4 space-y-3",
							children: scanningSpEntities ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:729:17",
								"data-prohibitions": "[]",
								className: "flex justify-center p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/ManagerApproval.tsx:730:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 animate-spin text-muted-foreground"
								})
							}) : finalTenantDocs.length > 0 ? finalTenantDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:734:19",
								"data-prohibitions": "[editContent]",
								name: doc.name,
								hasNotes: !!doc.reviewNotes,
								onClick: () => setViewingItem({
									type: "document",
									id: doc.id
								})
							}, doc.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:742:17",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground italic text-center p-4",
								children: [
									"Nenhum documento de",
									" ",
									isInteressado(selectedHub, tenants) ? "interessado" : "locatário",
									" localizado no GED."
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/ManagerApproval.tsx:751:11",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:752:13",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/30 pb-4 border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:753:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {
									"data-uid": "src/pages/ManagerApproval.tsx:754:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-primary"
								}), " Fiador"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:756:15",
								"data-prohibitions": "[editContent]",
								children: hubGuarantor?.full_name || "Sem fiador vinculado"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:758:13",
							"data-prohibitions": "[editContent]",
							className: "p-4 space-y-3",
							children: guarantorDocs.length > 0 ? guarantorDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:761:19",
								"data-prohibitions": "[editContent]",
								name: doc.name,
								hasNotes: !!doc.reviewNotes,
								onClick: () => setViewingItem({
									type: "document",
									id: doc.id
								})
							}, doc.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:769:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground italic text-center p-4",
								children: "Nenhum documento de garantia localizado."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/ManagerApproval.tsx:776:11",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm border-blue-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:777:13",
							"data-prohibitions": "[]",
							className: "bg-blue-50/50 pb-4 border-b border-blue-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:778:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-lg text-blue-900",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, {
									"data-uid": "src/pages/ManagerApproval.tsx:779:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-blue-600"
								}), " Contrato (GED + Ciclo)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:781:15",
								"data-prohibitions": "[]",
								children: "Minuta gerada ou contrato importado"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:783:13",
							"data-prohibitions": "[editContent]",
							className: "p-4 space-y-3",
							children: systemContracts.length > 0 || uploadedContracts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [systemContracts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:787:21",
								"data-prohibitions": "[editContent]",
								name: c.documentName,
								badge: "Ciclo de Contratos",
								hasNotes: !!c.reviewNotes,
								onClick: () => setViewingItem({
									type: "contract",
									id: c.id
								})
							}, c.id)), uploadedContracts.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:796:21",
								"data-prohibitions": "[editContent]",
								name: doc.name,
								badge: "Contrato Importado",
								hasNotes: !!doc.reviewNotes,
								onClick: () => setViewingItem({
									type: "document",
									id: doc.id
								})
							}, doc.id))] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:806:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground italic text-center p-4",
								children: "Nenhum contrato vinculado a este imóvel."
							})
						})]
					})
				]
			}),
			scanningSp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:815:11",
				"data-prohibitions": "[]",
				className: "flex items-center justify-center p-8 text-muted-foreground text-sm border border-dashed rounded-lg bg-muted/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/pages/ManagerApproval.tsx:816:13",
					"data-prohibitions": "[editContent]",
					className: "w-5 h-5 animate-spin mr-3 text-primary"
				}), "Buscando arquivos físicos adicionais vinculados a este imóvel no SharePoint..."]
			}) : spFiles.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/ManagerApproval.tsx:820:11",
				"data-prohibitions": "[editContent]",
				className: "shadow-sm border-purple-200 mt-6 animate-fade-in-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/ManagerApproval.tsx:821:13",
					"data-prohibitions": "[]",
					className: "bg-purple-50/50 pb-4 border-b border-purple-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/pages/ManagerApproval.tsx:822:15",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2 text-lg text-purple-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderSearch, {
							"data-uid": "src/pages/ManagerApproval.tsx:823:17",
							"data-prohibitions": "[editContent]",
							className: "h-5 w-5 text-purple-600"
						}), " Arquivos Físicos no SharePoint"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/ManagerApproval.tsx:825:15",
						"data-prohibitions": "[]",
						children: "Resultado da pesquisa híbrida automática na pasta do imóvel e arredores"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/ManagerApproval.tsx:829:13",
					"data-prohibitions": "[editContent]",
					className: "p-4",
					children: [folderHistory.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/ManagerApproval.tsx:831:17",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-2 mb-4 text-sm text-muted-foreground bg-muted/30 p-2 rounded-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/ManagerApproval.tsx:832:19",
							"data-prohibitions": "[]",
							variant: "ghost",
							size: "sm",
							onClick: handleBackFolder,
							className: "h-8 px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								"data-uid": "src/pages/ManagerApproval.tsx:833:21",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-1"
							}), " Voltar"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/ManagerApproval.tsx:835:19",
							"data-prohibitions": "[editContent]",
							className: "flex items-center text-purple-900 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
								"data-uid": "src/pages/ManagerApproval.tsx:836:21",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), folderHistory[folderHistory.length - 1].name]
						})]
					}), loadingFolder ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/ManagerApproval.tsx:843:17",
						"data-prohibitions": "[]",
						className: "flex justify-center items-center p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"data-uid": "src/pages/ManagerApproval.tsx:844:19",
							"data-prohibitions": "[editContent]",
							className: "w-6 h-6 animate-spin text-purple-600 mr-2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/ManagerApproval.tsx:845:19",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground",
							children: "Carregando conteúdo da pasta..."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/ManagerApproval.tsx:850:17",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3",
						children: [(activeFolderFiles || spFiles).map((file) => {
							const isDocStore = documents.some((d) => d.name === file.name);
							const isContractStore = contracts.some((c) => c.documentName === file.name);
							if (isDocStore || isContractStore) return null;
							const isFolder = !!file.folder;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocItem, {
								"data-uid": "src/pages/ManagerApproval.tsx:859:23",
								"data-prohibitions": "[editContent]",
								name: file.name,
								badge: isFolder ? "Pasta SharePoint" : "SharePoint Online",
								isFolder,
								onClick: () => {
									if (isFolder) handleFolderClick(file);
									else setViewingItem({
										type: "sp_file",
										id: file.id,
										name: file.name,
										siteId: file.siteId,
										driveId: file.driveId,
										webUrl: file.webUrl
									});
								}
							}, file.id);
						}), (activeFolderFiles || spFiles).filter((f) => !documents.some((d) => d.name === f.name) && !contracts.some((c) => c.documentName === f.name)).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/ManagerApproval.tsx:886:21",
							"data-prohibitions": "[editContent]",
							className: "col-span-full text-sm text-muted-foreground italic text-center p-4 bg-muted/20 rounded-md",
							children: activeFolderFiles ? "Esta pasta está vazia." : "Todos os arquivos encontrados já estão listados nos cards acima."
						})]
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ManagerApproval.tsx:898:9",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/ManagerApproval.tsx:899:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => setSelectedHub(null),
						children: "Voltar para Lista"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/ManagerApproval.tsx:902:11",
						"data-prohibitions": "[]",
						variant: "destructive",
						onClick: () => setRejectId(selectedHub.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							"data-uid": "src/pages/ManagerApproval.tsx:903:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 mr-2"
						}), " Rejeitar Documentação"]
					}),
					hasPendingNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
						"data-uid": "src/pages/ManagerApproval.tsx:907:13",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
							"data-uid": "src/pages/ManagerApproval.tsx:908:15",
							"data-prohibitions": "[]",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:909:17",
								"data-prohibitions": "[]",
								className: "inline-block cursor-not-allowed w-full sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/ManagerApproval.tsx:910:19",
									"data-prohibitions": "[]",
									className: "bg-emerald-600/50 text-white pointer-events-none w-full",
									tabIndex: -1,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										"data-uid": "src/pages/ManagerApproval.tsx:914:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 mr-2"
									}), " Aprovar e Enviar p/ Vistoria"]
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent, {
							"data-uid": "src/pages/ManagerApproval.tsx:918:15",
							"data-prohibitions": "[]",
							className: "bg-destructive text-destructive-foreground border-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:919:17",
								"data-prohibitions": "[]",
								className: "font-semibold text-sm mb-1",
								children: "Aprovação Bloqueada"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ManagerApproval.tsx:920:17",
								"data-prohibitions": "[]",
								className: "text-xs",
								children: "Existem anotações pendentes nos documentos. Rejeite o dossiê para correções."
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/ManagerApproval.tsx:926:13",
						"data-prohibitions": "[]",
						className: "bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto",
						onClick: () => handleApprove(selectedHub.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							"data-uid": "src/pages/ManagerApproval.tsx:930:15",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 mr-2"
						}), " Aprovar e Enviar p/ Vistoria"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewer, {
				"data-uid": "src/pages/ManagerApproval.tsx:935:9",
				"data-prohibitions": "[editContent]",
				open: !!viewingItem,
				onClose: () => setViewingItem(null),
				viewItem: viewingItem
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/ManagerApproval.tsx:941:9",
				"data-prohibitions": "[]",
				open: !!rejectId,
				onOpenChange: (val) => !val && setRejectId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/ManagerApproval.tsx:942:11",
					"data-prohibitions": "[]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/ManagerApproval.tsx:943:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/ManagerApproval.tsx:944:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/pages/ManagerApproval.tsx:945:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-destructive"
								}), " Rejeitar Documentação"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/ManagerApproval.tsx:947:15",
								"data-prohibitions": "[]",
								children: "Informe o motivo da rejeição. As notas inseridas individualmente nos documentos serão enviadas aos gestores automaticamente."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/ManagerApproval.tsx:952:13",
							"data-prohibitions": "[]",
							className: "py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-uid": "src/pages/ManagerApproval.tsx:953:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: Faltou enviar o verso do RG ou o comprovante está ilegível...",
								value: rejectReason,
								onChange: (e) => setRejectReason(e.target.value),
								className: "min-h-[100px]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/ManagerApproval.tsx:960:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/ManagerApproval.tsx:961:15",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setRejectId(null),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/ManagerApproval.tsx:964:15",
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
	const renderList = (items, type) => {
		if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/ManagerApproval.tsx:977:9",
			"data-prohibitions": "[]",
			className: "p-12 text-center text-muted-foreground flex flex-col items-center shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					"data-uid": "src/pages/ManagerApproval.tsx:978:11",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-12 mb-4 text-emerald-500 opacity-50"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/ManagerApproval.tsx:979:11",
					"data-prohibitions": "[]",
					className: "text-lg font-medium text-foreground",
					children: "Todas as análises concluídas!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/ManagerApproval.tsx:980:11",
					"data-prohibitions": "[]",
					children: "Não há documentação pendente nesta categoria."
				})
			]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:986:7",
			"data-prohibitions": "[editContent]",
			className: "grid gap-4",
			children: items.map((item) => {
				const breached = isSlaBreached(item.slaStart, store.settings.slaHours);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/ManagerApproval.tsx:990:13",
					"data-prohibitions": "[editContent]",
					className: `flex flex-col md:flex-row gap-4 p-5 items-center md:items-start ${breached ? "border-destructive bg-destructive/5" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/ManagerApproval.tsx:996:15",
						"data-prohibitions": "[editContent]",
						className: "flex-1 space-y-4 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/ManagerApproval.tsx:997:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:998:19",
								"data-prohibitions": "[editContent]",
								className: `p-3 rounded-xl shrink-0 ${breached ? "bg-destructive/20" : "bg-primary/10"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {
									"data-uid": "src/pages/ManagerApproval.tsx:1003:21",
									"data-prohibitions": "[editContent]",
									className: `h-6 w-6 ${breached ? "text-destructive" : "text-primary"}`
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/ManagerApproval.tsx:1007:19",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/ManagerApproval.tsx:1008:21",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-lg",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/ManagerApproval.tsx:1009:21",
										"data-prohibitions": "[editContent]",
										className: "text-sm text-muted-foreground mt-0.5 flex flex-wrap gap-x-2 gap-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/ManagerApproval.tsx:1010:23",
												"data-prohibitions": "[editContent]",
												children: [
													"ID:",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/ManagerApproval.tsx:1012:25",
														"data-prohibitions": "[editContent]",
														className: "font-mono bg-muted px-1 py-0.5 rounded",
														title: item.id,
														children: formatDossierId(item.id, store.properties)
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/ManagerApproval.tsx:1016:23",
												"data-prohibitions": "[editContent]",
												children: [
													"• ",
													type === "interessado" ? "Interessado" : "Locatário",
													":",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														"data-uid": "src/pages/ManagerApproval.tsx:1018:25",
														"data-prohibitions": "[editContent]",
														children: item.tenant || "Aguardando"
													})
												]
											}),
											(item.guarantor_id || item.guarantorId) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/ManagerApproval.tsx:1021:25",
												"data-prohibitions": "[]",
												children: [
													"•",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/ManagerApproval.tsx:1023:27",
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
										"data-uid": "src/pages/ManagerApproval.tsx:1029:21",
										"data-prohibitions": "[editContent]",
										className: "flex gap-2 pt-3 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/ManagerApproval.tsx:1030:23",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "border-amber-500 text-amber-600 bg-amber-50",
												children: "Análise Gerencial"
											}),
											item.isResubmission && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/pages/ManagerApproval.tsx:1037:25",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "border-purple-500 text-purple-700 bg-purple-50 animate-in fade-in",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, {
													"data-uid": "src/pages/ManagerApproval.tsx:1041:27",
													"data-prohibitions": "[editContent]",
													className: "w-3 h-3 mr-1"
												}), " Nova Análise (Retorno)"]
											}),
											breached && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/pages/ManagerApproval.tsx:1045:25",
												"data-prohibitions": "[editContent]",
												variant: "destructive",
												className: "animate-pulse",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
														"data-uid": "src/pages/ManagerApproval.tsx:1046:27",
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
												"data-uid": "src/pages/ManagerApproval.tsx:1051:25",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground flex items-center mt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
													"data-uid": "src/pages/ManagerApproval.tsx:1052:27",
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
						"data-uid": "src/pages/ManagerApproval.tsx:1060:15",
						"data-prohibitions": "[]",
						className: "flex flex-col gap-2 w-full md:w-56 shrink-0 mt-4 md:mt-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/ManagerApproval.tsx:1061:17",
							"data-prohibitions": "[]",
							size: "lg",
							className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm",
							onClick: () => setSelectedHub(item),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
								"data-uid": "src/pages/ManagerApproval.tsx:1066:19",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 mr-2"
							}), " Analisar Dossiê"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/ManagerApproval.tsx:1068:17",
							"data-prohibitions": "[]",
							className: "text-xs text-center text-muted-foreground px-2",
							children: "Acesse os documentos reais vinculados"
						})]
					})]
				}, item.id);
			})
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/ManagerApproval.tsx:1080:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/ManagerApproval.tsx:1081:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/ManagerApproval.tsx:1082:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight",
				children: "Análise do Gerente"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/ManagerApproval.tsx:1083:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "Abra o Hub de Validação para conferir a documentação completa de proprietários, interessados e locatários antes da vistoria."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			"data-uid": "src/pages/ManagerApproval.tsx:1089:7",
			"data-prohibitions": "[editContent]",
			defaultValue: "interessados",
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					"data-uid": "src/pages/ManagerApproval.tsx:1090:9",
					"data-prohibitions": "[editContent]",
					className: "mb-4 grid w-full md:w-[400px] grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						"data-uid": "src/pages/ManagerApproval.tsx:1091:11",
						"data-prohibitions": "[editContent]",
						value: "interessados",
						children: [
							"Interessados (",
							interessados.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						"data-uid": "src/pages/ManagerApproval.tsx:1092:11",
						"data-prohibitions": "[editContent]",
						value: "locatarios",
						children: [
							"Locatários (",
							locatarios.length,
							")"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/ManagerApproval.tsx:1094:9",
					"data-prohibitions": "[editContent]",
					value: "interessados",
					className: "mt-0",
					children: renderList(interessados, "interessado")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/ManagerApproval.tsx:1097:9",
					"data-prohibitions": "[editContent]",
					value: "locatarios",
					className: "mt-0",
					children: renderList(locatarios, "locatario")
				})
			]
		})]
	});
};
//#endregion
export { ManagerApproval as default };

//# sourceMappingURL=ManagerApproval-DUfLefCn.js.map