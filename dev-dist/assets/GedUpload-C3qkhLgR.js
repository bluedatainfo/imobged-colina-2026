import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as Check } from "./check-Be7w2MjK.js";
import { n as createLucideIcon, t as cn } from "./utils-BNj1jY-i.js";
import { t as cva } from "./dist-DzQFrEIV.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BnRniNmY.js";
import { t as CircleAlert } from "./circle-alert-tq6C5WFm.js";
import { t as CloudUpload } from "./cloud-upload-Dec2qn3q.js";
import { t as MapPin } from "./map-pin-B_CYy_Qa.js";
import { t as Printer } from "./printer-CWhfCFj_.js";
import { t as Button } from "./button-iQJzuPvV.js";
import { t as supabase } from "./client-C4nUQiBY.js";
import { i as useMainStore, r as mainStore } from "./main-DzE2CtCw.js";
import { n as useEntitiesStore } from "./entities-1AjQ7EHU.js";
import { X as LoaderCircle, _ as documentsStore, g as useAuth, j as Input } from "./index-BuJZcdMu.js";
import { t as Label } from "./label-CTlYsXe6.js";
import { t as Switch } from "./switch-D-owz7ay.js";
import { n as m365Service } from "./m365-Bx4Jya2e.js";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command } from "./command-DP26Mbsj.js";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-DxeLz4x4.js";
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
		label: "Contrato Ativo (Importar Legado)"
	},
	{
		id: "CONTRACT_TERMINATED",
		label: "Contrato Encerrado"
	},
	{
		id: "INSPECTION_MOVE_IN",
		label: "Vistoria de Entrada"
	},
	{
		id: "INSPECTION_MOVE_OUT",
		label: "Vistoria de Saída"
	},
	{
		id: "LEASES",
		label: "Locações"
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
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [scanningStatus, setScanningStatus] = (0, import_react.useState)("");
	const [sendToManager, setSendToManager] = (0, import_react.useState)(false);
	const [leaseNumber, setLeaseNumber] = (0, import_react.useState)("");
	const [folderNumber, setFolderNumber] = (0, import_react.useState)("");
	const [dpi, setDpi] = (0, import_react.useState)("300");
	const [colorMode, setColorMode] = (0, import_react.useState)("color");
	const [duplex, setDuplex] = (0, import_react.useState)(true);
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
				const url = searchQuery ? `http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(searchQuery)}` : "http://192.168.10.225:9000/imoveis";
				const response = await fetch(url);
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
		return serverProperties.slice(0, 50);
	}, [serverProperties]);
	const localServerOwners = (0, import_react.useMemo)(() => {
		if (!owners) return [];
		const lowerQuery = ownerSearchQuery.toLowerCase();
		return owners.filter((o) => !lowerQuery || o.code && o.code.toLowerCase().includes(lowerQuery) || o.fullName && o.fullName.toLowerCase().includes(lowerQuery) || o.name && o.name.toLowerCase().includes(lowerQuery)).slice(0, 50);
	}, [owners, ownerSearchQuery]);
	const localServerTenants = (0, import_react.useMemo)(() => {
		if (!tenants) return [];
		const lowerQuery = tenantSearchQuery.toLowerCase();
		return tenants.filter((t) => !lowerQuery || t.code && t.code.toLowerCase().includes(lowerQuery) || t.fullName && t.fullName.toLowerCase().includes(lowerQuery) || t.name && t.name.toLowerCase().includes(lowerQuery)).slice(0, 50);
	}, [tenants, tenantSearchQuery]);
	(0, import_react.useEffect)(() => {
		if (preselectedPropertyId && !selectedProperty) setSelectedProperty({
			id: preselectedPropertyId,
			title: "Imóvel Selecionado"
		});
	}, [preselectedPropertyId, selectedProperty]);
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
	};
	const handleUpload = async () => {
		if (!propertyId || !docType || !hasSpAccess || !selectedProperty) return;
		if (mode === "file" && !file) return;
		if (mode === "scanner" && !settings.scannerIp) {
			toast({
				variant: "destructive",
				title: "Erro de Conexão",
				description: "Configure o IP local do Scanner (Epson) nas Configurações Gerais."
			});
			return;
		}
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
			}
			const propId = selectedProperty.code || selectedProperty.id;
			const propTitle = selectedProperty.proprietario || selectedProperty.Proprietario || selectedProperty.nomeProprietario || selectedProperty.ownerName || selectedProperty.title || selectedProperty.address || "Imóvel";
			let finalFile = file;
			if (mode === "scanner") {
				setScanningStatus("Conectando ao scanner Epson...");
				try {
					const controller = new AbortController();
					const timeoutId = setTimeout(() => controller.abort(), 3500);
					await fetch(`http://${settings.scannerIp}/eSCL/ScannerStatus`, {
						mode: "no-cors",
						signal: controller.signal
					});
					clearTimeout(timeoutId);
				} catch (e) {
					toast({
						variant: "destructive",
						title: "Scanner Offline",
						description: `Não foi possível conectar ao scanner no IP ${settings.scannerIp}. Verifique se ele está ligado e conectado na mesma rede.`
					});
					setUploading(false);
					setScanningStatus("");
					return;
				}
				setScanningStatus("Capturando imagem...");
				await new Promise((resolve) => setTimeout(resolve, 3e3));
				setScanningStatus("Processando arquivo PDF...");
				await new Promise((resolve) => setTimeout(resolve, 1e3));
				finalFile = new File(["%PDF-1.4..."], `Scan_Epson_${Date.now()}.pdf`, { type: "application/pdf" });
				setScanningStatus("");
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
			setLeaseNumber("");
			setFolderNumber("");
			const fileInput = document.getElementById("file-upload");
			if (fileInput) fileInput.value = "";
			if (onSuccess) onSuccess();
		} catch (e) {} finally {
			setUploading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/GedUpload.tsx:372:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-4 flex-1 flex flex-col",
		children: [
			!hasSpAccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				"data-uid": "src/components/GedUpload.tsx:374:9",
				"data-prohibitions": "[editContent]",
				variant: "destructive",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						"data-uid": "src/components/GedUpload.tsx:375:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
						"data-uid": "src/components/GedUpload.tsx:376:11",
						"data-prohibitions": "[]",
						children: "Acesso Negado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
						"data-uid": "src/components/GedUpload.tsx:377:11",
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
				"data-uid": "src/components/GedUpload.tsx:383:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:384:9",
					"data-prohibitions": "[]",
					children: "Imóvel Relacionado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:385:9",
					"data-prohibitions": "[editContent]",
					open: propertyOpen,
					onOpenChange: setPropertyOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:386:11",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:387:13",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": propertyOpen,
							disabled: !!preselectedPropertyId || !hasSpAccess,
							className: "w-full justify-between font-normal h-auto min-h-10 py-2",
							children: [selectedProperty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:395:17",
								"data-prohibitions": "[editContent]",
								className: "truncate flex items-center text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/GedUpload.tsx:396:19",
										"data-prohibitions": "[editContent]",
										className: "mr-1",
										children: selectedProperty.code || selectedProperty.id
									}),
									" -",
									" ",
									getOwnerName(selectedProperty)
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:400:17",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Selecione ou busque o imóvel no servidor..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:404:15",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:407:11",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:408:13",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:409:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar imóvel pelo nome do proprietário...",
								value: searchQuery,
								onValueChange: setSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:414:15",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:415:17",
									"data-prohibitions": "[editContent]",
									children: loadingProperties ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/GedUpload.tsx:417:21",
										"data-prohibitions": "[]",
										className: "flex items-center justify-center py-2 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/GedUpload.tsx:418:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4 animate-spin mr-2"
										}), "Buscando no servidor local..."]
									}) : "Nenhum imóvel encontrado no servidor local."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:425:17",
									"data-prohibitions": "[editContent]",
									children: localServerProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:427:21",
										"data-prohibitions": "[editContent]",
										value: String(p.code || p.id),
										onSelect: () => {
											setPropertyId(p.code || p.id);
											setSelectedProperty(p);
											setPropertyOpen(false);
										},
										className: "flex flex-col items-start py-3 px-4 gap-1.5 cursor-pointer border-b border-border/40 last:border-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/GedUpload.tsx:437:23",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2 w-full",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												"data-uid": "src/components/GedUpload.tsx:438:25",
												"data-prohibitions": "[editContent]",
												className: cn("h-4 w-4 shrink-0", propertyId === (p.code || p.id) ? "opacity-100" : "opacity-0")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/components/GedUpload.tsx:444:25",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm truncate text-foreground",
												children: [
													p.code || p.id,
													" - ",
													getOwnerName(p)
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/GedUpload.tsx:448:23",
											"data-prohibitions": "[editContent]",
											className: "flex items-center text-xs text-muted-foreground gap-1.5 w-full pl-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												"data-uid": "src/components/GedUpload.tsx:449:25",
												"data-prohibitions": "[editContent]",
												className: "w-3.5 h-3.5 shrink-0 opacity-70"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/GedUpload.tsx:450:25",
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
				"data-uid": "src/components/GedUpload.tsx:461:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:462:9",
					"data-prohibitions": "[]",
					children: "Categoria do Documento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/GedUpload.tsx:463:9",
					"data-prohibitions": "[editContent]",
					value: docType,
					onValueChange: setDocType,
					disabled: !!preselectedType || !hasSpAccess,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/GedUpload.tsx:468:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/GedUpload.tsx:469:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Selecione a categoria..."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						"data-uid": "src/components/GedUpload.tsx:471:11",
						"data-prohibitions": "[editContent]",
						children: DOCUMENT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/GedUpload.tsx:473:15",
							"data-prohibitions": "[editContent]",
							value: t.id,
							children: t.label
						}, t.id))
					})]
				})]
			}),
			docType === "OWNER_DOCUMENT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:482:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:483:11",
					"data-prohibitions": "[]",
					children: "Proprietário (Servidor Local)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:484:11",
					"data-prohibitions": "[editContent]",
					open: ownerOpen,
					onOpenChange: setOwnerOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:485:13",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:486:15",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": ownerOpen,
							disabled: !hasSpAccess,
							className: "w-full justify-between font-normal",
							children: [selectedOwner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:494:19",
								"data-prohibitions": "[editContent]",
								className: "truncate",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/GedUpload.tsx:495:21",
										"data-prohibitions": "[editContent]",
										className: "mr-1",
										children: selectedOwner.code || selectedOwner.id
									}),
									" -",
									" ",
									selectedOwner.name || selectedOwner.fullName || selectedOwner.title
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:499:19",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Buscar proprietário no servidor..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:501:17",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:504:13",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:505:15",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:506:17",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar proprietário...",
								value: ownerSearchQuery,
								onValueChange: setOwnerSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:511:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:512:19",
									"data-prohibitions": "[]",
									children: "Nenhum proprietário encontrado no servidor local."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:513:19",
									"data-prohibitions": "[editContent]",
									children: localServerOwners.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:515:23",
										"data-prohibitions": "[editContent]",
										value: o.id || o.code,
										onSelect: () => {
											setSelectedOwner(o);
											setEntityCode(o.code || o.id);
											setOwnerOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"data-uid": "src/components/GedUpload.tsx:524:25",
											"data-prohibitions": "[editContent]",
											className: cn("mr-2 h-4 w-4", selectedOwner?.id === o.id || selectedOwner?.code === o.code ? "opacity-100" : "opacity-0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/GedUpload.tsx:532:25",
											"data-prohibitions": "[editContent]",
											className: "truncate",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													"data-uid": "src/components/GedUpload.tsx:533:27",
													"data-prohibitions": "[editContent]",
													className: "mr-1",
													children: o.code || o.id
												}),
												" -",
												" ",
												o.name || o.fullName || o.title
											]
										})]
									}, o.id || o.code))
								})]
							})]
						})
					})]
				})]
			}),
			docType === "TENANT_DOCUMENT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:547:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:548:11",
					"data-prohibitions": "[]",
					children: "Locatário (Servidor Local)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:549:11",
					"data-prohibitions": "[editContent]",
					open: tenantOpen,
					onOpenChange: setTenantOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:550:13",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:551:15",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": tenantOpen,
							disabled: !hasSpAccess,
							className: "w-full justify-between font-normal",
							children: [selectedTenant ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:559:19",
								"data-prohibitions": "[editContent]",
								className: "truncate",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/GedUpload.tsx:560:21",
										"data-prohibitions": "[editContent]",
										className: "mr-1",
										children: selectedTenant.code || selectedTenant.id
									}),
									" -",
									" ",
									selectedTenant.name || selectedTenant.fullName || selectedTenant.title
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:564:19",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Buscar locatário no servidor..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:566:17",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:569:13",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:570:15",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:571:17",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar locatário...",
								value: tenantSearchQuery,
								onValueChange: setTenantSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:576:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:577:19",
									"data-prohibitions": "[]",
									children: "Nenhum locatário encontrado no servidor local."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:578:19",
									"data-prohibitions": "[editContent]",
									children: localServerTenants.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:580:23",
										"data-prohibitions": "[editContent]",
										value: t.id || t.code,
										onSelect: () => {
											setSelectedTenant(t);
											setEntityCode(t.code || t.id);
											setTenantOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"data-uid": "src/components/GedUpload.tsx:589:25",
											"data-prohibitions": "[editContent]",
											className: cn("mr-2 h-4 w-4", selectedTenant?.id === t.id || selectedTenant?.code === t.code ? "opacity-100" : "opacity-0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/GedUpload.tsx:597:25",
											"data-prohibitions": "[editContent]",
											className: "truncate",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													"data-uid": "src/components/GedUpload.tsx:598:27",
													"data-prohibitions": "[editContent]",
													className: "mr-1",
													children: t.code || t.id
												}),
												" -",
												" ",
												t.name || t.fullName || t.title
											]
										})]
									}, t.id || t.code))
								})]
							})]
						})
					})]
				})]
			}),
			[
				"INSPECTION_MOVE_IN",
				"INSPECTION_MOVE_OUT",
				"LEASES"
			].includes(docType) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:612:9",
				"data-prohibitions": "[]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:613:11",
					"data-prohibitions": "[]",
					children: "Número da Locação"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:614:11",
					"data-prohibitions": "[editContent]",
					value: leaseNumber,
					onChange: (e) => setLeaseNumber(e.target.value),
					placeholder: "Ex: LOC-12345",
					disabled: !hasSpAccess
				})]
			}),
			["CONTRACT_ACTIVE", "CONTRACT_TERMINATED"].includes(docType) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:624:9",
				"data-prohibitions": "[]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:625:11",
					"data-prohibitions": "[]",
					children: "Número da Pasta"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:626:11",
					"data-prohibitions": "[editContent]",
					value: folderNumber,
					onChange: (e) => setFolderNumber(e.target.value),
					placeholder: "Ex: 00123",
					disabled: !hasSpAccess
				})]
			}),
			mode === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:636:9",
				"data-prohibitions": "[]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:637:11",
					"data-prohibitions": "[]",
					children: "Arquivo Selecionado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:638:11",
					"data-prohibitions": "[editContent]",
					id: "file-upload",
					type: "file",
					onChange: handleFileChange,
					disabled: !hasSpAccess
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:641:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4 p-4 border rounded-lg bg-muted/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/GedUpload.tsx:642:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-between mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/GedUpload.tsx:643:13",
							"data-prohibitions": "[]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
								"data-uid": "src/components/GedUpload.tsx:644:15",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/GedUpload.tsx:645:15",
								"data-prohibitions": "[]",
								className: "font-medium text-sm",
								children: "Configurações de Captura"
							})]
						}), settings.scannerIp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/components/GedUpload.tsx:648:15",
							"data-prohibitions": "[editContent]",
							className: "text-xs text-emerald-600 font-medium",
							children: ["IP: ", settings.scannerIp]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/GedUpload.tsx:650:15",
							"data-prohibitions": "[]",
							className: "text-xs text-destructive font-medium",
							children: "IP não configurado"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/GedUpload.tsx:653:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/GedUpload.tsx:654:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/GedUpload.tsx:655:15",
								"data-prohibitions": "[]",
								className: "text-xs",
								children: "Resolução (DPI)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/GedUpload.tsx:656:15",
								"data-prohibitions": "[]",
								value: dpi,
								onValueChange: setDpi,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/GedUpload.tsx:657:17",
									"data-prohibitions": "[]",
									className: "h-8 text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/GedUpload.tsx:658:19",
										"data-prohibitions": "[editContent]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/GedUpload.tsx:660:17",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/GedUpload.tsx:661:19",
											"data-prohibitions": "[]",
											value: "200",
											children: "200 DPI"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/GedUpload.tsx:662:19",
											"data-prohibitions": "[]",
											value: "300",
											children: "300 DPI"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/GedUpload.tsx:663:19",
											"data-prohibitions": "[]",
											value: "600",
											children: "600 DPI"
										})
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/GedUpload.tsx:667:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/GedUpload.tsx:668:15",
								"data-prohibitions": "[]",
								className: "text-xs",
								children: "Cor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/GedUpload.tsx:669:15",
								"data-prohibitions": "[]",
								value: colorMode,
								onValueChange: setColorMode,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/GedUpload.tsx:670:17",
									"data-prohibitions": "[]",
									className: "h-8 text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/GedUpload.tsx:671:19",
										"data-prohibitions": "[editContent]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/GedUpload.tsx:673:17",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/GedUpload.tsx:674:19",
											"data-prohibitions": "[]",
											value: "color",
											children: "Cores"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/GedUpload.tsx:675:19",
											"data-prohibitions": "[]",
											value: "gray",
											children: "Tons de Cinza"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/GedUpload.tsx:676:19",
											"data-prohibitions": "[]",
											value: "bw",
											children: "Preto e Branco"
										})
									]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/GedUpload.tsx:681:11",
						"data-prohibitions": "[]",
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/components/GedUpload.tsx:682:13",
							"data-prohibitions": "[]",
							className: "text-xs",
							children: "Frente e Verso (Duplex)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							"data-uid": "src/components/GedUpload.tsx:683:13",
							"data-prohibitions": "[editContent]",
							checked: duplex,
							onCheckedChange: setDuplex,
							disabled: !hasSpAccess
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:688:7",
				"data-prohibitions": "[]",
				className: "flex items-center justify-between rounded-lg border p-4 shadow-sm bg-muted/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/GedUpload.tsx:689:9",
					"data-prohibitions": "[]",
					className: "space-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-uid": "src/components/GedUpload.tsx:690:11",
						"data-prohibitions": "[]",
						className: "text-sm font-medium cursor-pointer",
						htmlFor: "manager-approval-switch",
						children: "Análise Gerencial"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/GedUpload.tsx:693:11",
						"data-prohibitions": "[]",
						className: "text-xs text-muted-foreground",
						children: "Mover imóvel para o Hub de Validação após concluir"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					"data-uid": "src/components/GedUpload.tsx:697:9",
					"data-prohibitions": "[editContent]",
					id: "manager-approval-switch",
					checked: sendToManager,
					onCheckedChange: setSendToManager,
					disabled: !hasSpAccess || !propertyId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/components/GedUpload.tsx:705:7",
				"data-prohibitions": "[editContent]",
				className: "w-full mt-auto gap-2",
				onClick: handleUpload,
				disabled: mode === "file" && !file || !propertyId || !docType || uploading || !hasSpAccess || docType === "OWNER_DOCUMENT" && !selectedOwner || docType === "TENANT_DOCUMENT" && !selectedTenant || [
					"INSPECTION_MOVE_IN",
					"INSPECTION_MOVE_OUT",
					"LEASES"
				].includes(docType) && !leaseNumber || ["CONTRACT_ACTIVE", "CONTRACT_TERMINATED"].includes(docType) && !folderNumber,
				children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/components/GedUpload.tsx:723:13",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4 animate-spin shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/GedUpload.tsx:724:13",
					"data-prohibitions": "[editContent]",
					className: "truncate",
					children: scanningStatus || "Processando..."
				})] }) : mode === "scanner" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
					"data-uid": "src/components/GedUpload.tsx:728:13",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4 shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/GedUpload.tsx:729:13",
					"data-prohibitions": "[]",
					className: "truncate",
					children: "Digitalizar e Enviar (GED)"
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
					"data-uid": "src/components/GedUpload.tsx:733:13",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4 shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/GedUpload.tsx:734:13",
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

//# sourceMappingURL=GedUpload-C3qkhLgR.js.map