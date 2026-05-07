import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as Check } from "./check-Be7w2MjK.js";
import { n as createLucideIcon, t as cn } from "./utils-BNj1jY-i.js";
import { t as cva } from "./dist-DzQFrEIV.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-2PYY5iOA.js";
import { t as CircleAlert } from "./circle-alert-tq6C5WFm.js";
import { t as CloudUpload } from "./cloud-upload-BcnZQn0H.js";
import { t as MapPin } from "./map-pin-BuAm7Ujq.js";
import { t as Printer } from "./printer-QyxaPkO_.js";
import { t as Button } from "./button-DZFv31v6.js";
import { t as supabase } from "./client-DbPPqM1c.js";
import { i as useMainStore, r as mainStore } from "./main-CkCZaoyd.js";
import { n as useEntitiesStore } from "./entities-pTkigeh5.js";
import { X as LoaderCircle, _ as documentsStore, g as useAuth, j as Input } from "./index-DRFCgWaI.js";
import { t as Label } from "./label-CZKY3LJi.js";
import { t as Switch } from "./switch-DqIG4dFb.js";
import { n as m365Service } from "./m365-BiZWgosI.js";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command } from "./command-DTQD3Jcz.js";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-CWfuY6fo.js";
var ChevronsUpDown = createLucideIcon("chevrons-up-down", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]);
//#endregion
//#region src/components/ui/alert.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var alertVariants = cva("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", {
	variants: { variant: {
		default: "bg-background text-foreground",
		destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
	} },
	defaultVariants: { variant: "default" }
});
var Alert = import_react.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert.tsx:27:3",
	"data-prohibitions": "[editContent]",
	ref,
	role: "alert",
	className: cn(alertVariants({ variant }), className),
	...props
}));
Alert.displayName = "Alert";
var AlertTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
	"data-uid": "src/components/ui/alert.tsx:33:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("mb-1 font-medium leading-none tracking-tight", className),
	...props
}));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert.tsx:46:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm [&_p]:leading-relaxed", className),
	...props
}));
AlertDescription.displayName = "AlertDescription";
//#endregion
//#region src/components/GedUpload.tsx
var DOCUMENT_TYPES = [
	{
		id: "OWNER_DOCUMENT",
		label: "Documento de Proprietário"
	},
	{
		id: "TENANT_DOCUMENT",
		label: "Documento de Locatário"
	},
	{
		id: "GUARANTEE_DOCUMENT",
		label: "Documentos de Garantia"
	},
	{
		id: "CONTRACT_ACTIVE",
		label: "Imovel - Documentação (Ativo)"
	},
	{
		id: "INSPECTION_MOVE_IN",
		label: "Imovel - Vistoria de Entrada (Ativo)"
	},
	{
		id: "INSPECTION_MOVE_OUT",
		label: "Imovel - Vistoria de Saida (Ativo)"
	},
	{
		id: "LEASES",
		label: "Imovel - Locações"
	},
	{
		id: "CONTRACT_TERMINATED",
		label: "Imovel - Documentação (Encerrado)"
	}
];
var getOwnerName = (property) => {
	if (!property) return "Não informado";
	if (property.proprietario) return property.proprietario;
	if (property.Proprietario) return property.Proprietario;
	if (property.nomeProprietario) return property.nomeProprietario;
	if (property.proprietario_nome) return property.proprietario_nome;
	if (property.cliente) return property.cliente;
	if (property.ownerName) return property.ownerName;
	if (property.title) return property.title;
	if (property.proprietarios && Array.isArray(property.proprietarios) && property.proprietarios.length > 0) return property.proprietarios[0].nome;
	return "Proprietário não informado";
};
var getAddress = (property) => {
	if (!property) return "Endereço não informado";
	const parts = [];
	if (property.endereco) parts.push(property.endereco);
	if (property.numero) parts.push(property.numero);
	if (property.bairro) parts.push(property.bairro);
	if (property.cidade) parts.push(property.cidade);
	if (property.uf) parts.push(property.uf);
	return parts.length > 0 ? parts.join(", ") : "Endereço não informado";
};
function GedUpload({ preselectedPropertyId, preselectedType, onSuccess, mode = "file" }) {
	const { settings, properties: mainProperties } = useMainStore();
	const { owners, tenants, properties: localProperties } = useEntitiesStore();
	const { user } = useAuth();
	const { toast } = useToast();
	const [propertyId, setPropertyId] = (0, import_react.useState)(preselectedPropertyId || "");
	const [selectedProperty, setSelectedProperty] = (0, import_react.useState)(null);
	const [propertyOpen, setPropertyOpen] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [docType, setDocType] = (0, import_react.useState)(preselectedType || "");
	const [entityCode, setEntityCode] = (0, import_react.useState)("");
	const [file, setFile] = (0, import_react.useState)(null);
	const [ownerOpen, setOwnerOpen] = (0, import_react.useState)(false);
	const [ownerSearchQuery, setOwnerSearchQuery] = (0, import_react.useState)("");
	const [selectedOwner, setSelectedOwner] = (0, import_react.useState)(null);
	const [tenantOpen, setTenantOpen] = (0, import_react.useState)(false);
	const [tenantSearchQuery, setTenantSearchQuery] = (0, import_react.useState)("");
	const [selectedTenant, setSelectedTenant] = (0, import_react.useState)(null);
	const [guarantorOpen, setGuarantorOpen] = (0, import_react.useState)(false);
	const [guarantorSearchQuery, setGuarantorSearchQuery] = (0, import_react.useState)("");
	const [selectedGuarantor, setSelectedGuarantor] = (0, import_react.useState)(null);
	const [dbCandidates, setDbCandidates] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		supabase.from("pre_registrations").select("id, full_name, category").then(({ data }) => setDbCandidates(data || []));
	}, []);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [scanningStatus, setScanningStatus] = (0, import_react.useState)("");
	const [sendToManager, setSendToManager] = (0, import_react.useState)(false);
	const [leaseNumber, setLeaseNumber] = (0, import_react.useState)("");
	const [folderNumber, setFolderNumber] = (0, import_react.useState)("");
	const [dpi, setDpi] = (0, import_react.useState)("300");
	const [colorMode, setColorMode] = (0, import_react.useState)("color");
	const [duplex, setDuplex] = (0, import_react.useState)(true);
	const [customFileName, setCustomFileName] = (0, import_react.useState)(`Scan${Math.floor(Math.random() * 1e3)}`);
	const hasSpAccess = (0, import_react.useMemo)(() => {
		if (!user) return false;
		return settings.spIntegrationRoles?.includes(user.role) ?? false;
	}, [user, settings.spIntegrationRoles]);
	const [serverProperties, setServerProperties] = (0, import_react.useState)([]);
	const [loadingProperties, setLoadingProperties] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const fetchProperties = async () => {
			setLoadingProperties(true);
			try {
				const isNumeric = /^\d+$/.test(searchQuery.trim());
				const url = searchQuery ? isNumeric ? `http://192.168.10.225:9000/imoveis?id=${encodeURIComponent(searchQuery.trim())}` : `http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(searchQuery.trim())}` : "http://192.168.10.225:9000/imoveis";
				let response = await fetch(url);
				if (isNumeric && response.ok) {
					const data = await response.clone().json();
					if (Array.isArray(data) && data.length === 0) {
						const fallbackUrl = `http://192.168.10.225:9000/imoveis?code=${encodeURIComponent(searchQuery.trim())}`;
						const fallbackResponse = await fetch(fallbackUrl);
						if (fallbackResponse.ok) response = fallbackResponse;
					}
				}
				if (response.ok) {
					const data = await response.json();
					setServerProperties(Array.isArray(data) ? data : []);
				} else setServerProperties([]);
			} catch (error) {
				console.error("Erro ao buscar imóveis do servidor local", error);
				setServerProperties([]);
			} finally {
				setLoadingProperties(false);
			}
		};
		const timer = setTimeout(() => {
			if (propertyOpen) fetchProperties();
		}, 300);
		return () => clearTimeout(timer);
	}, [searchQuery, propertyOpen]);
	const localServerProperties = (0, import_react.useMemo)(() => {
		if (!searchQuery) return serverProperties.slice(0, 50);
		const lowerQuery = searchQuery.toLowerCase();
		return serverProperties.filter((p) => {
			const idStr = String(p.code || p.id || "").toLowerCase();
			const nameStr = getOwnerName(p).toLowerCase();
			return idStr.includes(lowerQuery) || nameStr.includes(lowerQuery);
		}).slice(0, 50);
	}, [serverProperties, searchQuery]);
	const localServerOwners = (0, import_react.useMemo)(() => {
		if (!owners) return [];
		const lowerQuery = ownerSearchQuery.toLowerCase();
		return owners.filter((o) => !lowerQuery || o.code && o.code.toLowerCase().includes(lowerQuery) || o.fullName && o.fullName.toLowerCase().includes(lowerQuery) || o.name && o.name.toLowerCase().includes(lowerQuery)).slice(0, 50);
	}, [owners, ownerSearchQuery]);
	const localServerTenants = (0, import_react.useMemo)(() => {
		const candidates = dbCandidates.filter((c) => c.category === "PF" || c.category === "PJ").map((c) => ({
			id: c.id,
			code: c.id,
			fullName: c.full_name + " (Interessado)",
			title: c.full_name
		}));
		const combined = [...tenants || [], ...candidates];
		const lowerQuery = tenantSearchQuery.toLowerCase();
		return combined.filter((t) => !lowerQuery || t.code && t.code.toLowerCase().includes(lowerQuery) || t.fullName && t.fullName.toLowerCase().includes(lowerQuery) || t.name && t.name.toLowerCase().includes(lowerQuery)).slice(0, 50);
	}, [
		tenants,
		dbCandidates,
		tenantSearchQuery
	]);
	const localServerGuarantors = (0, import_react.useMemo)(() => {
		const g = dbCandidates.filter((c) => c.category === "Fiador").map((c) => ({
			id: c.id,
			code: c.id,
			fullName: c.full_name + " (Fiador SharePoint)",
			title: c.full_name
		}));
		const lowerQuery = guarantorSearchQuery.toLowerCase();
		return g.filter((x) => !lowerQuery || x.fullName.toLowerCase().includes(lowerQuery)).slice(0, 50);
	}, [dbCandidates, guarantorSearchQuery]);
	(0, import_react.useEffect)(() => {
		if (preselectedPropertyId && !selectedProperty) setSelectedProperty({
			id: preselectedPropertyId,
			title: "Imóvel Selecionado"
		});
	}, [preselectedPropertyId, selectedProperty]);
	(0, import_react.useEffect)(() => {
		const typeObj = DOCUMENT_TYPES.find((t) => t.id === docType);
		if (typeObj && typeObj.label.startsWith("Imovel - ") && selectedProperty) {
			const propId = selectedProperty.code || selectedProperty.id;
			if (propId) {
				if (["CONTRACT_ACTIVE", "CONTRACT_TERMINATED"].includes(docType)) setFolderNumber(String(propId));
				else if (["INSPECTION_MOVE_IN", "INSPECTION_MOVE_OUT"].includes(docType)) setLeaseNumber(String(propId));
				else if (docType === "LEASES") setLeaseNumber("");
			}
		}
	}, [docType, selectedProperty]);
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
	};
	const handleUpload = async () => {
		if (!propertyId || !docType || !hasSpAccess || !selectedProperty) return;
		if (mode === "file" && !file) return;
		setUploading(true);
		setScanningStatus("");
		try {
			let finalEntityName = "";
			let finalEntityCode = entityCode;
			if (docType === "OWNER_DOCUMENT" && selectedOwner) {
				finalEntityName = selectedOwner.name || selectedOwner.fullName || selectedOwner.title || "";
				finalEntityCode = selectedOwner.code || selectedOwner.id || "";
			} else if (docType === "TENANT_DOCUMENT" && selectedTenant) {
				finalEntityName = selectedTenant.name || selectedTenant.fullName || selectedTenant.title || "";
				finalEntityCode = selectedTenant.code || selectedTenant.id || "";
			} else if (docType === "GUARANTEE_DOCUMENT" && selectedGuarantor) {
				finalEntityName = selectedGuarantor.name || selectedGuarantor.fullName || selectedGuarantor.title || "";
				finalEntityCode = selectedGuarantor.code || selectedGuarantor.id || "";
			}
			const propId = selectedProperty.code || selectedProperty.id;
			const propTitle = selectedProperty.proprietario || selectedProperty.Proprietario || selectedProperty.nomeProprietario || selectedProperty.ownerName || selectedProperty.title || selectedProperty.address || "Imóvel";
			let finalFile = file;
			if (mode === "scanner") {
				setScanningStatus("Iniciando digitalização via Agente Local...");
				try {
					const scanRes = await fetch("http://localhost:5000/scan", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							dpi,
							colorMode,
							duplex
						})
					});
					if (!scanRes.ok) throw new Error(`Falha ao iniciar Scan: ${scanRes.status} ${scanRes.statusText}`);
					setScanningStatus("Capturando e transferindo documento...");
					const blob = await scanRes.blob();
					const safeName = customFileName.trim().substring(0, 10) || "Scan";
					finalFile = new File([blob], `${safeName}.pdf`, { type: "application/pdf" });
					setScanningStatus("Digitalização concluída.");
				} catch (e) {
					toast({
						variant: "destructive",
						title: "Erro de Comunicação",
						description: `Não foi possível comunicar com o Agente Local. Certifique-se de que o script está rodando no seu Windows (localhost:5000). Erro: ${e.message}`
					});
					setUploading(false);
					setScanningStatus("");
					return;
				}
			}
			if (!finalFile) {
				toast({
					variant: "destructive",
					title: "Nenhum arquivo",
					description: "Por favor, selecione um arquivo válido."
				});
				setUploading(false);
				return;
			}
			const result = await m365Service.uploadStructuredDocument(finalFile, finalFile.name, docType, propId, propTitle, user?.name || "Sistema", finalEntityCode, finalEntityName, leaseNumber, folderNumber);
			const { data: existingProp } = await supabase.from("properties").select("id").eq("id", propId).maybeSingle();
			if (!existingProp) await supabase.from("properties").insert({
				id: propId,
				title: propTitle,
				address: propTitle,
				type: "Importado",
				status: "Ativo"
			});
			const path = typeof result === "string" ? result : result?.path || result?.serverRelativeUrl || result?.webUrl || result?.url || `sharepoint:/${docType}/${file.name}`;
			await documentsStore.addDocument({
				propertyId: propId,
				name: finalFile.name,
				category: docType,
				entityCode: finalEntityCode || void 0,
				entityName: finalEntityName || void 0,
				filePath: path
			});
			if (sendToManager) mainStore.updateProperty(propId, { status: "Análise Gerencial" });
			toast({
				title: "Processo Concluído",
				description: mode === "scanner" ? "Documento digitalizado e salvo no SharePoint com sucesso." : "Documento enviado e classificado com sucesso no SharePoint."
			});
			setFile(null);
			setEntityCode("");
			setSelectedOwner(null);
			setSelectedTenant(null);
			setSelectedGuarantor(null);
			setLeaseNumber("");
			setFolderNumber("");
			const fileInput = document.getElementById("file-upload");
			if (fileInput) fileInput.value = "";
			if (onSuccess) onSuccess();
		} catch (e) {
			console.warn("Upload error:", e);
		} finally {
			setUploading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/GedUpload.tsx:448:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-4 flex-1 flex flex-col",
		translate: "no",
		children: [
			!hasSpAccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				"data-uid": "src/components/GedUpload.tsx:450:9",
				"data-prohibitions": "[editContent]",
				variant: "destructive",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						"data-uid": "src/components/GedUpload.tsx:451:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
						"data-uid": "src/components/GedUpload.tsx:452:11",
						"data-prohibitions": "[]",
						children: "Acesso Negado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
						"data-uid": "src/components/GedUpload.tsx:453:11",
						"data-prohibitions": "[editContent]",
						children: [
							"Seu perfil (",
							user?.role,
							") não possui permissão para realizar uploads no SharePoint."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:459:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:460:9",
					"data-prohibitions": "[]",
					children: "Imóvel Relacionado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:461:9",
					"data-prohibitions": "[editContent]",
					open: propertyOpen,
					onOpenChange: setPropertyOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:462:11",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:463:13",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": propertyOpen,
							disabled: !!preselectedPropertyId || !hasSpAccess,
							className: "w-full justify-between font-normal h-auto min-h-10 py-2",
							children: [selectedProperty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:471:17",
								"data-prohibitions": "[editContent]",
								className: "truncate flex items-center text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									"data-uid": "src/components/GedUpload.tsx:472:19",
									"data-prohibitions": "[editContent]",
									className: "mr-1",
									children: selectedProperty.code || selectedProperty.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/GedUpload.tsx:473:19",
									"data-prohibitions": "[editContent]",
									children: [" - ", getOwnerName(selectedProperty)]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:476:17",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Selecione ou busque o imóvel no servidor..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:480:15",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:483:11",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:484:13",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:485:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar imóvel por ID ou Nome...",
								value: searchQuery,
								onValueChange: setSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:490:15",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:491:17",
									"data-prohibitions": "[editContent]",
									children: loadingProperties ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/GedUpload.tsx:493:21",
										"data-prohibitions": "[]",
										className: "flex items-center justify-center py-2 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/GedUpload.tsx:494:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4 animate-spin mr-2"
										}), "Buscando no servidor local..."]
									}) : "Nenhum imóvel encontrado no servidor local."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:501:17",
									"data-prohibitions": "[editContent]",
									children: localServerProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:503:21",
										"data-prohibitions": "[editContent]",
										value: String(p.code || p.id),
										onSelect: () => {
											setPropertyId(p.code || p.id);
											setSelectedProperty(p);
											setPropertyOpen(false);
										},
										className: "flex flex-col items-start py-3 px-4 gap-1.5 cursor-pointer border-b border-border/40 last:border-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/GedUpload.tsx:513:23",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2 w-full",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												"data-uid": "src/components/GedUpload.tsx:514:25",
												"data-prohibitions": "[editContent]",
												className: cn("h-4 w-4 shrink-0", propertyId === (p.code || p.id) ? "opacity-100" : "opacity-0")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/GedUpload.tsx:520:25",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm truncate text-foreground",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/components/GedUpload.tsx:521:27",
													"data-prohibitions": "[editContent]",
													children: [
														p.code || p.id,
														" - ",
														getOwnerName(p)
													]
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/GedUpload.tsx:526:23",
											"data-prohibitions": "[editContent]",
											className: "flex items-center text-xs text-muted-foreground gap-1.5 w-full pl-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												"data-uid": "src/components/GedUpload.tsx:527:25",
												"data-prohibitions": "[editContent]",
												className: "w-3.5 h-3.5 shrink-0 opacity-70"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/GedUpload.tsx:528:25",
												"data-prohibitions": "[editContent]",
												className: "truncate",
												children: getAddress(p)
											})]
										})]
									}, p.code || p.id))
								})]
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:539:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:540:9",
					"data-prohibitions": "[]",
					children: "Categoria do Documento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/GedUpload.tsx:541:9",
					"data-prohibitions": "[editContent]",
					value: docType,
					onValueChange: setDocType,
					disabled: !!preselectedType || !hasSpAccess,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/GedUpload.tsx:546:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/GedUpload.tsx:547:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Selecione a categoria..."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						"data-uid": "src/components/GedUpload.tsx:549:11",
						"data-prohibitions": "[editContent]",
						children: DOCUMENT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/GedUpload.tsx:551:15",
							"data-prohibitions": "[editContent]",
							value: t.id,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:552:17",
								"data-prohibitions": "[editContent]",
								children: t.label
							})
						}, t.id))
					})]
				})]
			}),
			docType === "OWNER_DOCUMENT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:560:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:561:11",
					"data-prohibitions": "[]",
					children: "Proprietário (Servidor Local)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:562:11",
					"data-prohibitions": "[editContent]",
					open: ownerOpen,
					onOpenChange: setOwnerOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:563:13",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:564:15",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": ownerOpen,
							disabled: !hasSpAccess,
							className: "w-full justify-between font-normal",
							children: [selectedOwner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:572:19",
								"data-prohibitions": "[editContent]",
								className: "truncate",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									"data-uid": "src/components/GedUpload.tsx:573:21",
									"data-prohibitions": "[editContent]",
									className: "mr-1",
									children: selectedOwner.code || selectedOwner.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/GedUpload.tsx:574:21",
									"data-prohibitions": "[editContent]",
									children: [
										" ",
										"- ",
										selectedOwner.name || selectedOwner.fullName || selectedOwner.title
									]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:580:19",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Buscar proprietário no servidor..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:582:17",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:585:13",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:586:15",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:587:17",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar proprietário...",
								value: ownerSearchQuery,
								onValueChange: setOwnerSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:592:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:593:19",
									"data-prohibitions": "[]",
									children: "Nenhum proprietário encontrado no servidor local."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:594:19",
									"data-prohibitions": "[editContent]",
									children: localServerOwners.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:596:23",
										"data-prohibitions": "[editContent]",
										value: o.id || o.code,
										onSelect: () => {
											setSelectedOwner(o);
											setEntityCode(o.code || o.id);
											setOwnerOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"data-uid": "src/components/GedUpload.tsx:605:25",
											"data-prohibitions": "[editContent]",
											className: cn("mr-2 h-4 w-4", selectedOwner?.id === o.id || selectedOwner?.code === o.code ? "opacity-100" : "opacity-0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/GedUpload.tsx:613:25",
											"data-prohibitions": "[editContent]",
											className: "truncate",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/components/GedUpload.tsx:614:27",
												"data-prohibitions": "[editContent]",
												className: "mr-1",
												children: o.code || o.id
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/components/GedUpload.tsx:615:27",
												"data-prohibitions": "[editContent]",
												children: [" - ", o.name || o.fullName || o.title]
											})]
										})]
									}, o.id || o.code))
								})]
							})]
						})
					})]
				})]
			}, "owner-field"),
			docType === "TENANT_DOCUMENT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:628:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:629:11",
					"data-prohibitions": "[]",
					children: "Locatário / Interessado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:630:11",
					"data-prohibitions": "[editContent]",
					open: tenantOpen,
					onOpenChange: setTenantOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:631:13",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:632:15",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": tenantOpen,
							disabled: !hasSpAccess,
							className: "w-full justify-between font-normal",
							children: [selectedTenant ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:640:19",
								"data-prohibitions": "[editContent]",
								className: "truncate",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									"data-uid": "src/components/GedUpload.tsx:641:21",
									"data-prohibitions": "[editContent]",
									className: "mr-1",
									children: selectedTenant.code || selectedTenant.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/GedUpload.tsx:642:21",
									"data-prohibitions": "[editContent]",
									children: [
										" ",
										"- ",
										selectedTenant.name || selectedTenant.fullName || selectedTenant.title
									]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:648:19",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Buscar locatário no servidor..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:650:17",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:653:13",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:654:15",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:655:17",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar locatário ou interessado...",
								value: tenantSearchQuery,
								onValueChange: setTenantSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:660:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:661:19",
									"data-prohibitions": "[]",
									children: "Nenhum registro encontrado."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:662:19",
									"data-prohibitions": "[editContent]",
									children: localServerTenants.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:664:23",
										"data-prohibitions": "[editContent]",
										value: t.id || t.code,
										onSelect: () => {
											setSelectedTenant(t);
											setEntityCode(t.code || t.id);
											setTenantOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"data-uid": "src/components/GedUpload.tsx:673:25",
											"data-prohibitions": "[editContent]",
											className: cn("mr-2 h-4 w-4", selectedTenant?.id === t.id || selectedTenant?.code === t.code ? "opacity-100" : "opacity-0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/GedUpload.tsx:681:25",
											"data-prohibitions": "[editContent]",
											className: "truncate",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/components/GedUpload.tsx:682:27",
												"data-prohibitions": "[editContent]",
												className: "mr-1",
												children: t.code || t.id
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/components/GedUpload.tsx:683:27",
												"data-prohibitions": "[editContent]",
												children: [" - ", t.name || t.fullName || t.title]
											})]
										})]
									}, t.id || t.code))
								})]
							})]
						})
					})]
				})]
			}, "tenant-field"),
			docType === "GUARANTEE_DOCUMENT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:696:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:697:11",
					"data-prohibitions": "[]",
					children: "Fiador (Garantia)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:698:11",
					"data-prohibitions": "[editContent]",
					open: guarantorOpen,
					onOpenChange: setGuarantorOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:699:13",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:700:15",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": guarantorOpen,
							disabled: !hasSpAccess,
							className: "w-full justify-between font-normal",
							children: [selectedGuarantor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:708:19",
								"data-prohibitions": "[editContent]",
								className: "truncate",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									"data-uid": "src/components/GedUpload.tsx:709:21",
									"data-prohibitions": "[editContent]",
									className: "mr-1",
									children: selectedGuarantor.code || selectedGuarantor.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/GedUpload.tsx:712:21",
									"data-prohibitions": "[editContent]",
									children: [" - ", selectedGuarantor.fullName]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:715:19",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Buscar fiador no SharePoint..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:717:17",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:720:13",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:721:15",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:722:17",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar fiador...",
								value: guarantorSearchQuery,
								onValueChange: setGuarantorSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:727:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:728:19",
									"data-prohibitions": "[]",
									children: "Nenhum fiador encontrado."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:729:19",
									"data-prohibitions": "[editContent]",
									children: localServerGuarantors.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:731:23",
										"data-prohibitions": "[editContent]",
										value: g.id,
										onSelect: () => {
											setSelectedGuarantor(g);
											setEntityCode(g.id);
											setGuarantorOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"data-uid": "src/components/GedUpload.tsx:740:25",
											"data-prohibitions": "[editContent]",
											className: cn("mr-2 h-4 w-4", selectedGuarantor?.id === g.id ? "opacity-100" : "opacity-0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/GedUpload.tsx:746:25",
											"data-prohibitions": "[editContent]",
											className: "truncate",
											children: g.fullName
										})]
									}, g.id))
								})]
							})]
						})
					})]
				})]
			}, "guarantor-field"),
			[
				"INSPECTION_MOVE_IN",
				"INSPECTION_MOVE_OUT",
				"LEASES"
			].includes(docType) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:758:9",
				"data-prohibitions": "[]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:759:11",
					"data-prohibitions": "[]",
					children: "Número da Locação"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:760:11",
					"data-prohibitions": "[editContent]",
					value: leaseNumber,
					onChange: (e) => setLeaseNumber(e.target.value),
					placeholder: "Ex: LOC-12345",
					disabled: !hasSpAccess
				})]
			}, "lease-field"),
			["CONTRACT_ACTIVE", "CONTRACT_TERMINATED"].includes(docType) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:770:9",
				"data-prohibitions": "[]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:771:11",
					"data-prohibitions": "[]",
					children: "Número da Pasta"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:772:11",
					"data-prohibitions": "[editContent]",
					value: folderNumber,
					onChange: (e) => setFolderNumber(e.target.value),
					placeholder: "Ex: 00123",
					disabled: !hasSpAccess
				})]
			}, "folder-field"),
			mode === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:782:9",
				"data-prohibitions": "[]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:783:11",
					"data-prohibitions": "[]",
					children: "Arquivo Selecionado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:784:11",
					"data-prohibitions": "[editContent]",
					id: "file-upload",
					type: "file",
					onChange: handleFileChange,
					disabled: !hasSpAccess
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:787:9",
				"data-prohibitions": "[]",
				className: "space-y-4 p-4 border rounded-lg bg-muted/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/GedUpload.tsx:788:11",
						"data-prohibitions": "[]",
						className: "flex items-center justify-between mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/GedUpload.tsx:789:13",
							"data-prohibitions": "[]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
								"data-uid": "src/components/GedUpload.tsx:790:15",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/GedUpload.tsx:791:15",
								"data-prohibitions": "[]",
								className: "font-medium text-sm",
								children: "Configurações de Captura"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/GedUpload.tsx:793:13",
							"data-prohibitions": "[]",
							className: "text-xs text-emerald-600 font-medium",
							children: "Agente Local (localhost:5000)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/GedUpload.tsx:797:11",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/components/GedUpload.tsx:798:13",
							"data-prohibitions": "[]",
							className: "text-xs",
							children: "Nome do Arquivo (Máx 10 caracteres)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/GedUpload.tsx:799:13",
							"data-prohibitions": "[]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/GedUpload.tsx:800:15",
								"data-prohibitions": "[editContent]",
								value: customFileName,
								onChange: (e) => setCustomFileName(e.target.value),
								maxLength: 10,
								className: "h-8",
								placeholder: "Ex: DocScan",
								disabled: !hasSpAccess
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:808:15",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground font-medium",
								children: ".pdf"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/GedUpload.tsx:811:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/GedUpload.tsx:812:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/GedUpload.tsx:813:15",
								"data-prohibitions": "[]",
								className: "text-xs",
								children: "Resolução (DPI)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/GedUpload.tsx:814:15",
								"data-prohibitions": "[]",
								value: dpi,
								onValueChange: setDpi,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/GedUpload.tsx:815:17",
									"data-prohibitions": "[]",
									className: "h-8 text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/GedUpload.tsx:816:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione DPI"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/GedUpload.tsx:818:17",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/GedUpload.tsx:819:19",
											"data-prohibitions": "[]",
											value: "200",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/GedUpload.tsx:820:21",
												"data-prohibitions": "[]",
												children: "200 DPI"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/GedUpload.tsx:822:19",
											"data-prohibitions": "[]",
											value: "300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/GedUpload.tsx:823:21",
												"data-prohibitions": "[]",
												children: "300 DPI"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/GedUpload.tsx:825:19",
											"data-prohibitions": "[]",
											value: "600",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/GedUpload.tsx:826:21",
												"data-prohibitions": "[]",
												children: "600 DPI"
											})
										})
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/GedUpload.tsx:831:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/GedUpload.tsx:832:15",
								"data-prohibitions": "[]",
								className: "text-xs",
								children: "Cor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/GedUpload.tsx:833:15",
								"data-prohibitions": "[]",
								value: colorMode,
								onValueChange: setColorMode,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/GedUpload.tsx:834:17",
									"data-prohibitions": "[]",
									className: "h-8 text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/GedUpload.tsx:835:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione Cor"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/GedUpload.tsx:837:17",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/GedUpload.tsx:838:19",
											"data-prohibitions": "[]",
											value: "color",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/GedUpload.tsx:839:21",
												"data-prohibitions": "[]",
												children: "Cores"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/GedUpload.tsx:841:19",
											"data-prohibitions": "[]",
											value: "gray",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/GedUpload.tsx:842:21",
												"data-prohibitions": "[]",
												children: "Tons de Cinza"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/GedUpload.tsx:844:19",
											"data-prohibitions": "[]",
											value: "bw",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/GedUpload.tsx:845:21",
												"data-prohibitions": "[]",
												children: "Preto e Branco"
											})
										})
									]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/GedUpload.tsx:851:11",
						"data-prohibitions": "[]",
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/components/GedUpload.tsx:852:13",
							"data-prohibitions": "[]",
							className: "text-xs",
							children: "Frente e Verso (Duplex)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							"data-uid": "src/components/GedUpload.tsx:853:13",
							"data-prohibitions": "[editContent]",
							checked: duplex,
							onCheckedChange: setDuplex,
							disabled: !hasSpAccess
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:858:7",
				"data-prohibitions": "[]",
				className: "flex items-center justify-between rounded-lg border p-4 shadow-sm bg-muted/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/GedUpload.tsx:859:9",
					"data-prohibitions": "[]",
					className: "space-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-uid": "src/components/GedUpload.tsx:860:11",
						"data-prohibitions": "[]",
						className: "text-sm font-medium cursor-pointer",
						htmlFor: "manager-approval-switch",
						children: "Análise Gerencial"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/GedUpload.tsx:863:11",
						"data-prohibitions": "[]",
						className: "text-xs text-muted-foreground",
						children: "Mover imóvel para o Hub de Validação após concluir"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					"data-uid": "src/components/GedUpload.tsx:867:9",
					"data-prohibitions": "[editContent]",
					id: "manager-approval-switch",
					checked: sendToManager,
					onCheckedChange: setSendToManager,
					disabled: !hasSpAccess || !propertyId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/components/GedUpload.tsx:875:7",
				"data-prohibitions": "[editContent]",
				className: "w-full mt-auto gap-2",
				onClick: handleUpload,
				disabled: mode === "file" && !file || !propertyId || !docType || uploading || !hasSpAccess || docType === "OWNER_DOCUMENT" && !selectedOwner || docType === "TENANT_DOCUMENT" && !selectedTenant || docType === "GUARANTEE_DOCUMENT" && !selectedGuarantor || [
					"INSPECTION_MOVE_IN",
					"INSPECTION_MOVE_OUT",
					"LEASES"
				].includes(docType) && !leaseNumber || ["CONTRACT_ACTIVE", "CONTRACT_TERMINATED"].includes(docType) && !folderNumber,
				children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/components/GedUpload.tsx:894:13",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4 animate-spin shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/GedUpload.tsx:895:13",
					"data-prohibitions": "[editContent]",
					className: "truncate",
					children: scanningStatus || "Processando..."
				})] }) : mode === "scanner" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
					"data-uid": "src/components/GedUpload.tsx:899:13",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4 shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/GedUpload.tsx:900:13",
					"data-prohibitions": "[]",
					className: "truncate",
					children: "Digitalizar e Enviar (GED)"
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
					"data-uid": "src/components/GedUpload.tsx:904:13",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4 shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/GedUpload.tsx:905:13",
					"data-prohibitions": "[]",
					className: "truncate",
					children: "Processar e Enviar (GED)"
				})] })
			})
		]
	});
}
//#endregion
export { GedUpload as t };

//# sourceMappingURL=GedUpload-BK0hQb5i.js.map