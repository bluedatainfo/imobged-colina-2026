import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as Check } from "./check-Be7w2MjK.js";
import { n as createLucideIcon, t as cn } from "./utils-BNj1jY-i.js";
import { t as cva } from "./dist-DzQFrEIV.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DnMFfPiL.js";
import { t as CircleAlert } from "./circle-alert-tq6C5WFm.js";
import { t as CloudUpload } from "./cloud-upload-Dec2qn3q.js";
import { t as Button } from "./button-DI75GKXN.js";
import { i as useMainStore, r as mainStore } from "./main-buh-Al_F.js";
import { n as useEntitiesStore } from "./entities-Df_ukVF8.js";
import { X as LoaderCircle, _ as documentsStore, g as useAuth, j as Input } from "./index-ByEb7COM.js";
import { t as Label } from "./label-p96YWrk6.js";
import { t as Switch } from "./switch-ayijCfdi.js";
import { n as m365Service } from "./m365-BW416V_E.js";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command } from "./command-BGKT1Dqg.js";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-D-sFJXum.js";
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
	}
];
function GedUpload({ preselectedPropertyId, preselectedType, onSuccess }) {
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
	const [sendToManager, setSendToManager] = (0, import_react.useState)(false);
	const [leaseNumber, setLeaseNumber] = (0, import_react.useState)("");
	const [folderNumber, setFolderNumber] = (0, import_react.useState)("");
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
		if (!file || !propertyId || !docType || !hasSpAccess || !selectedProperty) return;
		setUploading(true);
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
			const result = await m365Service.uploadStructuredDocument(file, file.name, docType, propId, propTitle, user?.name || "Sistema", finalEntityCode, finalEntityName, leaseNumber, folderNumber);
			await documentsStore.addDocument({
				propertyId: propId,
				name: file.name,
				category: docType,
				entityCode: finalEntityCode || void 0,
				entityName: finalEntityName || void 0,
				filePath: result?.path || void 0
			});
			if (sendToManager) mainStore.updateProperty(propId, { status: "Análise Gerencial" });
			toast({
				title: "Upload Concluído",
				description: "Documento enviado e classificado com sucesso no SharePoint."
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
		"data-uid": "src/components/GedUpload.tsx:236:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-4 flex-1 flex flex-col",
		children: [
			!hasSpAccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				"data-uid": "src/components/GedUpload.tsx:238:9",
				"data-prohibitions": "[editContent]",
				variant: "destructive",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						"data-uid": "src/components/GedUpload.tsx:239:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
						"data-uid": "src/components/GedUpload.tsx:240:11",
						"data-prohibitions": "[]",
						children: "Acesso Negado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
						"data-uid": "src/components/GedUpload.tsx:241:11",
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
				"data-uid": "src/components/GedUpload.tsx:247:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:248:9",
					"data-prohibitions": "[]",
					children: "Imóvel Relacionado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:249:9",
					"data-prohibitions": "[editContent]",
					open: propertyOpen,
					onOpenChange: setPropertyOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:250:11",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:251:13",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": propertyOpen,
							disabled: !!preselectedPropertyId || !hasSpAccess,
							className: "w-full justify-between font-normal",
							children: [selectedProperty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:259:17",
								"data-prohibitions": "[editContent]",
								className: "truncate",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/GedUpload.tsx:260:19",
										"data-prohibitions": "[editContent]",
										className: "mr-1",
										children: selectedProperty.code || selectedProperty.id
									}),
									" -",
									" ",
									selectedProperty.proprietario || selectedProperty.Proprietario || selectedProperty.nomeProprietario || selectedProperty.ownerName || selectedProperty.title || selectedProperty.address
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:269:17",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Selecione ou busque o imóvel no servidor..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:273:15",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:276:11",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:277:13",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:278:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar imóvel pelo nome do proprietário...",
								value: searchQuery,
								onValueChange: setSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:283:15",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:284:17",
									"data-prohibitions": "[editContent]",
									children: loadingProperties ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/GedUpload.tsx:286:21",
										"data-prohibitions": "[]",
										className: "flex items-center justify-center py-2 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/GedUpload.tsx:287:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4 animate-spin mr-2"
										}), "Buscando no servidor local..."]
									}) : "Nenhum imóvel encontrado no servidor local."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:294:17",
									"data-prohibitions": "[editContent]",
									children: localServerProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:296:21",
										"data-prohibitions": "[editContent]",
										value: p.code || p.id,
										onSelect: () => {
											setPropertyId(p.code || p.id);
											setSelectedProperty(p);
											setPropertyOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"data-uid": "src/components/GedUpload.tsx:305:23",
											"data-prohibitions": "[editContent]",
											className: cn("mr-2 h-4 w-4", propertyId === (p.code || p.id) ? "opacity-100" : "opacity-0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/GedUpload.tsx:311:23",
											"data-prohibitions": "[editContent]",
											className: "truncate",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													"data-uid": "src/components/GedUpload.tsx:312:25",
													"data-prohibitions": "[editContent]",
													className: "mr-1",
													children: p.code || p.id
												}),
												" -",
												" ",
												p.proprietario || p.Proprietario || p.nomeProprietario || p.ownerName || p.title || p.address
											]
										})]
									}, p.code || p.id))
								})]
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:329:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:330:9",
					"data-prohibitions": "[]",
					children: "Categoria do Documento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/GedUpload.tsx:331:9",
					"data-prohibitions": "[editContent]",
					value: docType,
					onValueChange: setDocType,
					disabled: !!preselectedType || !hasSpAccess,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/GedUpload.tsx:336:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/GedUpload.tsx:337:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Selecione a categoria..."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						"data-uid": "src/components/GedUpload.tsx:339:11",
						"data-prohibitions": "[editContent]",
						children: DOCUMENT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/GedUpload.tsx:341:15",
							"data-prohibitions": "[editContent]",
							value: t.id,
							children: t.label
						}, t.id))
					})]
				})]
			}),
			docType === "OWNER_DOCUMENT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:350:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:351:11",
					"data-prohibitions": "[]",
					children: "Proprietário (Servidor Local)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:352:11",
					"data-prohibitions": "[editContent]",
					open: ownerOpen,
					onOpenChange: setOwnerOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:353:13",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:354:15",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": ownerOpen,
							disabled: !hasSpAccess,
							className: "w-full justify-between font-normal",
							children: [selectedOwner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:362:19",
								"data-prohibitions": "[editContent]",
								className: "truncate",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/GedUpload.tsx:363:21",
										"data-prohibitions": "[editContent]",
										className: "mr-1",
										children: selectedOwner.code || selectedOwner.id
									}),
									" -",
									" ",
									selectedOwner.name || selectedOwner.fullName || selectedOwner.title
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:367:19",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Buscar proprietário no servidor..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:369:17",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:372:13",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:373:15",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:374:17",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar proprietário...",
								value: ownerSearchQuery,
								onValueChange: setOwnerSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:379:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:380:19",
									"data-prohibitions": "[]",
									children: "Nenhum proprietário encontrado no servidor local."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:381:19",
									"data-prohibitions": "[editContent]",
									children: localServerOwners.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:383:23",
										"data-prohibitions": "[editContent]",
										value: o.id || o.code,
										onSelect: () => {
											setSelectedOwner(o);
											setEntityCode(o.code || o.id);
											setOwnerOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"data-uid": "src/components/GedUpload.tsx:392:25",
											"data-prohibitions": "[editContent]",
											className: cn("mr-2 h-4 w-4", selectedOwner?.id === o.id || selectedOwner?.code === o.code ? "opacity-100" : "opacity-0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/GedUpload.tsx:400:25",
											"data-prohibitions": "[editContent]",
											className: "truncate",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													"data-uid": "src/components/GedUpload.tsx:401:27",
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
				"data-uid": "src/components/GedUpload.tsx:415:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:416:11",
					"data-prohibitions": "[]",
					children: "Locatário (Servidor Local)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:417:11",
					"data-prohibitions": "[editContent]",
					open: tenantOpen,
					onOpenChange: setTenantOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:418:13",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:419:15",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": tenantOpen,
							disabled: !hasSpAccess,
							className: "w-full justify-between font-normal",
							children: [selectedTenant ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:427:19",
								"data-prohibitions": "[editContent]",
								className: "truncate",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/GedUpload.tsx:428:21",
										"data-prohibitions": "[editContent]",
										className: "mr-1",
										children: selectedTenant.code || selectedTenant.id
									}),
									" -",
									" ",
									selectedTenant.name || selectedTenant.fullName || selectedTenant.title
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:432:19",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Buscar locatário no servidor..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:434:17",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:437:13",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:438:15",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:439:17",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar locatário...",
								value: tenantSearchQuery,
								onValueChange: setTenantSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:444:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:445:19",
									"data-prohibitions": "[]",
									children: "Nenhum locatário encontrado no servidor local."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:446:19",
									"data-prohibitions": "[editContent]",
									children: localServerTenants.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:448:23",
										"data-prohibitions": "[editContent]",
										value: t.id || t.code,
										onSelect: () => {
											setSelectedTenant(t);
											setEntityCode(t.code || t.id);
											setTenantOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"data-uid": "src/components/GedUpload.tsx:457:25",
											"data-prohibitions": "[editContent]",
											className: cn("mr-2 h-4 w-4", selectedTenant?.id === t.id || selectedTenant?.code === t.code ? "opacity-100" : "opacity-0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/GedUpload.tsx:465:25",
											"data-prohibitions": "[editContent]",
											className: "truncate",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													"data-uid": "src/components/GedUpload.tsx:466:27",
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
			["INSPECTION_MOVE_IN", "INSPECTION_MOVE_OUT"].includes(docType) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:480:9",
				"data-prohibitions": "[]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:481:11",
					"data-prohibitions": "[]",
					children: "Número da Locação"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:482:11",
					"data-prohibitions": "[editContent]",
					value: leaseNumber,
					onChange: (e) => setLeaseNumber(e.target.value),
					placeholder: "Ex: LOC-12345",
					disabled: !hasSpAccess
				})]
			}),
			["CONTRACT_ACTIVE", "CONTRACT_TERMINATED"].includes(docType) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:492:9",
				"data-prohibitions": "[]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:493:11",
					"data-prohibitions": "[]",
					children: "Número da Pasta"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:494:11",
					"data-prohibitions": "[editContent]",
					value: folderNumber,
					onChange: (e) => setFolderNumber(e.target.value),
					placeholder: "Ex: 00123",
					disabled: !hasSpAccess
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:503:7",
				"data-prohibitions": "[]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:504:9",
					"data-prohibitions": "[]",
					children: "Arquivo Selecionado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:505:9",
					"data-prohibitions": "[editContent]",
					id: "file-upload",
					type: "file",
					onChange: handleFileChange,
					disabled: !hasSpAccess
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:508:7",
				"data-prohibitions": "[]",
				className: "flex items-center justify-between rounded-lg border p-4 shadow-sm bg-muted/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/GedUpload.tsx:509:9",
					"data-prohibitions": "[]",
					className: "space-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-uid": "src/components/GedUpload.tsx:510:11",
						"data-prohibitions": "[]",
						className: "text-sm font-medium cursor-pointer",
						htmlFor: "manager-approval-switch",
						children: "Análise Gerencial"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/GedUpload.tsx:513:11",
						"data-prohibitions": "[]",
						className: "text-xs text-muted-foreground",
						children: "Mover imóvel para o Hub de Validação após concluir"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					"data-uid": "src/components/GedUpload.tsx:517:9",
					"data-prohibitions": "[editContent]",
					id: "manager-approval-switch",
					checked: sendToManager,
					onCheckedChange: setSendToManager,
					disabled: !hasSpAccess || !propertyId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/components/GedUpload.tsx:525:7",
				"data-prohibitions": "[editContent]",
				className: "w-full mt-auto gap-2",
				onClick: handleUpload,
				disabled: !file || !propertyId || !docType || uploading || !hasSpAccess || docType === "OWNER_DOCUMENT" && !selectedOwner || docType === "TENANT_DOCUMENT" && !selectedTenant || ["INSPECTION_MOVE_IN", "INSPECTION_MOVE_OUT"].includes(docType) && !leaseNumber || ["CONTRACT_ACTIVE", "CONTRACT_TERMINATED"].includes(docType) && !folderNumber,
				children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/components/GedUpload.tsx:541:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4 animate-spin"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
					"data-uid": "src/components/GedUpload.tsx:543:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4"
				}), "Processar e Enviar (GED)"]
			})
		]
	});
}
//#endregion
export { GedUpload as t };

//# sourceMappingURL=GedUpload-hGeY9Iq1.js.map