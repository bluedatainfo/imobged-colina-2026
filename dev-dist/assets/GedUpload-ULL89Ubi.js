import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as Button } from "./button-D8gTpw3z.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-9g4emgHT.js";
import { t as CloudUpload } from "./cloud-upload-BTeCl0_P.js";
import { i as useMainStore } from "./main-DqoiWUic.js";
import { L as LoaderCircle, h as useAuth, w as Input } from "./index-CDWOEzki.js";
import { t as Label } from "./label-9QiXbVt_.js";
import { m365Service } from "./m365-CofzPbRt.js";
//#region src/components/GedUpload.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var DOCUMENT_TYPES = [
	{
		id: "owner_doc",
		label: "Documento de Proprietário"
	},
	{
		id: "tenant_doc",
		label: "Documento de Inquilino"
	},
	{
		id: "active_contract",
		label: "Contrato Ativo"
	},
	{
		id: "closed_contract",
		label: "Contrato Encerrado"
	},
	{
		id: "entry_inspection",
		label: "Vistoria de Entrada"
	},
	{
		id: "exit_inspection",
		label: "Vistoria de Saída"
	}
];
function GedUpload({ preselectedPropertyId, preselectedType, onSuccess }) {
	const { properties } = useMainStore();
	const { user } = useAuth();
	const { toast } = useToast();
	const [propertyId, setPropertyId] = (0, import_react.useState)(preselectedPropertyId || "");
	const [docType, setDocType] = (0, import_react.useState)(preselectedType || "");
	const [file, setFile] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
	};
	const handleUpload = async () => {
		if (!file || !propertyId || !docType) return;
		const property = properties.find((p) => p.id === propertyId);
		if (!property) return;
		setUploading(true);
		try {
			await m365Service.uploadStructuredDocument(file, file.name, docType, property.id, property.title, user?.name || "Sistema");
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
		"data-uid": "src/components/GedUpload.tsx:82:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-4 flex-1 flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:83:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:84:9",
					"data-prohibitions": "[]",
					children: "Imóvel Relacionado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/GedUpload.tsx:85:9",
					"data-prohibitions": "[editContent]",
					value: propertyId,
					onValueChange: setPropertyId,
					disabled: !!preselectedPropertyId,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/GedUpload.tsx:86:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/GedUpload.tsx:87:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Selecione o imóvel..."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						"data-uid": "src/components/GedUpload.tsx:89:11",
						"data-prohibitions": "[editContent]",
						children: properties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/GedUpload.tsx:91:15",
							"data-prohibitions": "[editContent]",
							value: p.id,
							children: p.title
						}, p.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:99:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:100:9",
					"data-prohibitions": "[]",
					children: "Categoria do Documento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/GedUpload.tsx:101:9",
					"data-prohibitions": "[editContent]",
					value: docType,
					onValueChange: setDocType,
					disabled: !!preselectedType,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/GedUpload.tsx:102:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/GedUpload.tsx:103:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Selecione a categoria..."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						"data-uid": "src/components/GedUpload.tsx:105:11",
						"data-prohibitions": "[editContent]",
						children: DOCUMENT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/GedUpload.tsx:107:15",
							"data-prohibitions": "[editContent]",
							value: t.id,
							children: t.label
						}, t.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:115:7",
				"data-prohibitions": "[]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:116:9",
					"data-prohibitions": "[]",
					children: "Arquivo Selecionado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:117:9",
					"data-prohibitions": "[editContent]",
					id: "file-upload",
					type: "file",
					onChange: handleFileChange
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/components/GedUpload.tsx:120:7",
				"data-prohibitions": "[editContent]",
				className: "w-full mt-auto gap-2",
				onClick: handleUpload,
				disabled: !file || !propertyId || !docType || uploading,
				children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/components/GedUpload.tsx:126:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4 animate-spin"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
					"data-uid": "src/components/GedUpload.tsx:128:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4"
				}), "Processar e Enviar (GED)"]
			})
		]
	});
}
//#endregion
export { GedUpload as t };

//# sourceMappingURL=GedUpload-ULL89Ubi.js.map