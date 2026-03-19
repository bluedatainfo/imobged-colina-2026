import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as cn } from "./utils-BNj1jY-i.js";
import { t as cva } from "./dist-DzQFrEIV.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-x2HId7Er.js";
import { t as CircleAlert } from "./circle-alert-_O5Lo3cp.js";
import { t as CloudUpload } from "./cloud-upload-BTeCl0_P.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import { i as useMainStore } from "./main-CDM8pvrG.js";
import { r as useEntitiesStore } from "./entities-Bn_N6hmM.js";
import { R as LoaderCircle, h as useAuth, w as Input } from "./index-CNoZBNSr.js";
import { t as Label } from "./label-BcCGeFuD.js";
import { m365Service } from "./m365-D0hXXs97.js";
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
		label: "Documento de Inquilino"
	},
	{
		id: "CONTRACT_ACTIVE",
		label: "Contrato Ativo"
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
	const { properties, settings } = useMainStore();
	const { owners, tenants } = useEntitiesStore();
	const { user } = useAuth();
	const { toast } = useToast();
	const [propertyId, setPropertyId] = (0, import_react.useState)(preselectedPropertyId || "");
	const [docType, setDocType] = (0, import_react.useState)(preselectedType || "");
	const [entityCode, setEntityCode] = (0, import_react.useState)("");
	const [file, setFile] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const hasSpAccess = (0, import_react.useMemo)(() => {
		if (!user) return false;
		return settings.spIntegrationRoles?.includes(user.role) ?? false;
	}, [user, settings.spIntegrationRoles]);
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
	};
	const handleUpload = async () => {
		if (!file || !propertyId || !docType || !hasSpAccess) return;
		const property = properties.find((p) => p.id === propertyId);
		if (!property) return;
		setUploading(true);
		try {
			let entityName = "";
			if (docType === "OWNER_DOCUMENT") entityName = owners.find((o) => o.code === entityCode)?.fullName || "";
			else if (docType === "TENANT_DOCUMENT") entityName = tenants.find((t) => t.code === entityCode)?.fullName || "";
			await m365Service.uploadStructuredDocument(file, file.name, docType, property.id, property.title, user?.name || "Sistema", entityCode, entityName);
			toast({
				title: "Upload Concluído",
				description: "Documento enviado e classificado com sucesso no SharePoint."
			});
			setFile(null);
			const fileInput = document.getElementById("file-upload");
			if (fileInput) fileInput.value = "";
			if (onSuccess) onSuccess();
		} catch (e) {} finally {
			setUploading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/GedUpload.tsx:100:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-4 flex-1 flex flex-col",
		children: [
			!hasSpAccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				"data-uid": "src/components/GedUpload.tsx:102:9",
				"data-prohibitions": "[editContent]",
				variant: "destructive",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						"data-uid": "src/components/GedUpload.tsx:103:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
						"data-uid": "src/components/GedUpload.tsx:104:11",
						"data-prohibitions": "[]",
						children: "Acesso Negado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
						"data-uid": "src/components/GedUpload.tsx:105:11",
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
				"data-uid": "src/components/GedUpload.tsx:111:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:112:9",
					"data-prohibitions": "[]",
					children: "Imóvel Relacionado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/GedUpload.tsx:113:9",
					"data-prohibitions": "[editContent]",
					value: propertyId,
					onValueChange: setPropertyId,
					disabled: !!preselectedPropertyId || !hasSpAccess,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/GedUpload.tsx:118:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/GedUpload.tsx:119:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Selecione o imóvel..."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						"data-uid": "src/components/GedUpload.tsx:121:11",
						"data-prohibitions": "[editContent]",
						children: properties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/GedUpload.tsx:123:15",
							"data-prohibitions": "[editContent]",
							value: p.id,
							children: p.title
						}, p.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:131:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:132:9",
					"data-prohibitions": "[]",
					children: "Categoria do Documento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/GedUpload.tsx:133:9",
					"data-prohibitions": "[editContent]",
					value: docType,
					onValueChange: setDocType,
					disabled: !!preselectedType || !hasSpAccess,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/GedUpload.tsx:138:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/GedUpload.tsx:139:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Selecione a categoria..."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						"data-uid": "src/components/GedUpload.tsx:141:11",
						"data-prohibitions": "[editContent]",
						children: DOCUMENT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/GedUpload.tsx:143:15",
							"data-prohibitions": "[editContent]",
							value: t.id,
							children: t.label
						}, t.id))
					})]
				})]
			}),
			docType === "OWNER_DOCUMENT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:152:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:153:11",
					"data-prohibitions": "[]",
					children: "Código do Proprietário"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/GedUpload.tsx:154:11",
					"data-prohibitions": "[editContent]",
					value: entityCode,
					onValueChange: setEntityCode,
					disabled: !hasSpAccess,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/GedUpload.tsx:155:13",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/GedUpload.tsx:156:15",
							"data-prohibitions": "[editContent]",
							placeholder: "Selecione o proprietário..."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						"data-uid": "src/components/GedUpload.tsx:158:13",
						"data-prohibitions": "[editContent]",
						children: owners.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							"data-uid": "src/components/GedUpload.tsx:160:17",
							"data-prohibitions": "[editContent]",
							value: o.code,
							children: [
								o.fullName,
								" (",
								o.code,
								")"
							]
						}, o.code))
					})]
				})]
			}),
			docType === "TENANT_DOCUMENT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:170:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:171:11",
					"data-prohibitions": "[]",
					children: "Código do Inquilino"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/GedUpload.tsx:172:11",
					"data-prohibitions": "[editContent]",
					value: entityCode,
					onValueChange: setEntityCode,
					disabled: !hasSpAccess,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/GedUpload.tsx:173:13",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/GedUpload.tsx:174:15",
							"data-prohibitions": "[editContent]",
							placeholder: "Selecione o inquilino..."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						"data-uid": "src/components/GedUpload.tsx:176:13",
						"data-prohibitions": "[editContent]",
						children: tenants.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							"data-uid": "src/components/GedUpload.tsx:178:17",
							"data-prohibitions": "[editContent]",
							value: t.code,
							children: [
								t.fullName,
								" (",
								t.code,
								")"
							]
						}, t.code))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:187:7",
				"data-prohibitions": "[]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:188:9",
					"data-prohibitions": "[]",
					children: "Arquivo Selecionado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:189:9",
					"data-prohibitions": "[editContent]",
					id: "file-upload",
					type: "file",
					onChange: handleFileChange,
					disabled: !hasSpAccess
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/components/GedUpload.tsx:192:7",
				"data-prohibitions": "[editContent]",
				className: "w-full mt-auto gap-2",
				onClick: handleUpload,
				disabled: !file || !propertyId || !docType || uploading || !hasSpAccess || docType === "OWNER_DOCUMENT" && !entityCode || docType === "TENANT_DOCUMENT" && !entityCode,
				children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/components/GedUpload.tsx:206:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4 animate-spin"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
					"data-uid": "src/components/GedUpload.tsx:208:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4"
				}), "Processar e Enviar (GED)"]
			})
		]
	});
}
//#endregion
export { GedUpload as t };

//# sourceMappingURL=GedUpload-DHk17_ZG.js.map