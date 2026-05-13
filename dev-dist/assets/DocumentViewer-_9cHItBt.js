import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon, t as cn } from "./utils-BNj1jY-i.js";
import { t as ArrowLeft } from "./arrow-left-Dd8rqD3N.js";
import { t as CircleAlert } from "./circle-alert-tq6C5WFm.js";
import { t as CircleCheck } from "./circle-check-wj6pmJkc.js";
import { t as Download } from "./download-CniIqshG.js";
import { t as ExternalLink } from "./external-link-BNMSOXbU.js";
import { t as Save } from "./save-Cp-1wfwi.js";
import { t as Button } from "./button-DZFv31v6.js";
import { i as useMainStore } from "./main-33glPbE7.js";
import { i as contractsStore, o as useContractsStore } from "./keys-C5FmyYrr.js";
import { n as useEntitiesStore } from "./entities-pTkigeh5.js";
import { S as useTemplatesStore, X as LoaderCircle, _ as documentsStore, g as useAuth, j as Input, nt as FolderOpen, rt as FileText, y as useDocumentsStore } from "./index-CFf6Cbl2.js";
import { t as Label } from "./label-CZKY3LJi.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-Cywuhj29.js";
import { n as m365Service } from "./m365-us8Kly3F.js";
import { t as Textarea } from "./textarea-D3lWDJFw.js";
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
var MessageSquare = createLucideIcon("message-square", [["path", {
	d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	key: "18887p"
}]]);
//#endregion
//#region src/components/DocumentViewer.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function DocumentViewer({ open, onClose, viewItem, docName, isTerm }) {
	const { agencyProfile, properties } = useMainStore();
	const { documents } = useDocumentsStore();
	const { contracts } = useContractsStore();
	const { templates } = useTemplatesStore();
	const { owners } = useEntitiesStore();
	const { toast } = useToast();
	const { user } = useAuth();
	const contentRef = (0, import_react.useRef)(null);
	const isManager = [
		"Admin",
		"Gerente",
		"Diretor"
	].includes(user?.role || "");
	const [previewUrl, setPreviewUrl] = (0, import_react.useState)(null);
	const [templateContent, setTemplateContent] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [savedNotes, setSavedNotes] = (0, import_react.useState)("");
	const [savingNotes, setSavingNotes] = (0, import_react.useState)(false);
	const [correctionName, setCorrectionName] = (0, import_react.useState)("");
	const [correctionFile, setCorrectionFile] = (0, import_react.useState)(null);
	const [folderItems, setFolderItems] = (0, import_react.useState)([]);
	const [selectedFolderItem, setSelectedFolderItem] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		if (!viewItem) {
			setTitle(docName || "Documento");
			setPreviewUrl(null);
			setTemplateContent(null);
			setError(null);
			setNotes("");
			setSavedNotes("");
			setCorrectionName("");
			setCorrectionFile(null);
			setFolderItems([]);
			setSelectedFolderItem(null);
			return;
		}
		const loadPreview = async () => {
			setLoading(true);
			setError(null);
			setPreviewUrl(null);
			setTemplateContent(null);
			setNotes("");
			setSavedNotes("");
			setCorrectionFile(null);
			setFolderItems([]);
			setSelectedFolderItem(null);
			try {
				if (viewItem.type === "document") {
					const doc = documents.find((d) => d.id === viewItem.id);
					if (!doc) throw new Error("Documento não encontrado na base de dados.");
					setTitle(doc.name);
					setNotes(doc.reviewNotes || "");
					setSavedNotes(doc.reviewNotes || "");
					setCorrectionName(doc.name);
					if (!doc.filePath || !doc.category) throw new Error("Arquivo não possui caminho (path) ou categoria configurada no GED. Ele pode ter sido cadastrado offline.");
					setPreviewUrl(await m365Service.getFilePreviewUrl(doc.filePath, doc.category));
				} else if (viewItem.type === "contract") {
					const contract = contracts.find((c) => c.id === viewItem.id);
					if (!contract) throw new Error("Contrato não encontrado.");
					setTitle(contract.documentName);
					setNotes(contract.reviewNotes || "");
					setSavedNotes(contract.reviewNotes || "");
					setCorrectionName(contract.documentName);
					const uploadedDoc = documents.find((d) => d.propertyId === contract.propertyId && d.name === contract.documentName);
					if (uploadedDoc && uploadedDoc.filePath && uploadedDoc.category) {
						setPreviewUrl(await m365Service.getFilePreviewUrl(uploadedDoc.filePath, uploadedDoc.category));
						setLoading(false);
						return;
					}
					try {
						const spUrl = await m365Service.findDocumentInSharePoint(contract.documentName);
						if (spUrl) {
							setPreviewUrl(spUrl);
							setLoading(false);
							return;
						}
					} catch (e) {
						console.warn("Busca híbrida de contrato no SP falhou, caindo para template local.", e);
					}
					if (contract.content) setTemplateContent(contract.content);
					else {
						const template = templates.find((t) => t.name === contract.template);
						if (!template) throw new Error(`O modelo de contrato "${contract.template}" não foi encontrado.`);
						if (template.content) {
							const property = properties.find((p) => p.id === contract.propertyId);
							const owner = owners.find((o) => o.id === property?.ownerId);
							let finalContent = template.content;
							finalContent = finalContent.replace(/\{\{tenantName\}\}/gi, contract.tenantName || "Inquilino a Definir");
							finalContent = finalContent.replace(/\{\{propertyAddress\}\}/gi, property?.address || "Endereço Indisponível");
							finalContent = finalContent.replace(/\{\{ownerName\}\}/gi, owner?.fullName || "Proprietário Não Vinculado");
							finalContent = finalContent.replace(/\{\{rentValue\}\}/gi, property?.rentValue ? `R$ ${property.rentValue}` : "Valor a Definir");
							setTemplateContent(finalContent);
						} else throw new Error("O modelo selecionado está vazio e não possui conteúdo para exibição.");
					}
				} else if (viewItem.type === "sp_file") {
					setTitle(viewItem.name || "Arquivo SharePoint");
					setNotes("");
					setSavedNotes("");
					setCorrectionName(viewItem.name || "");
					if (viewItem.siteId && viewItem.driveId && viewItem.id) {
						const itemDetails = await m365Service.getDriveItemDetails(viewItem.siteId, viewItem.driveId, viewItem.id);
						if (itemDetails && itemDetails.folder) {
							setFolderItems(await m365Service.getDriveItemChildrenRecursive(viewItem.siteId, viewItem.driveId, viewItem.id));
							setPreviewUrl(null);
						} else {
							const url = await m365Service.getDriveItemPreviewUrl(viewItem.siteId, viewItem.driveId, viewItem.id);
							if (url) setPreviewUrl(url);
							else toast({
								title: "Visualização Nativa Indisponível",
								description: "Preview direto não suportado para este formato. Utilize \"Abrir no SharePoint\"."
							});
						}
					} else toast({
						title: "Visualização Nativa Indisponível",
						description: "Este arquivo requer visualização externa. Utilize \"Abrir no SharePoint\"."
					});
				}
			} catch (err) {
				setError(err.message || "Ocorreu um erro ao tentar carregar o documento do SharePoint.");
			} finally {
				setLoading(false);
			}
		};
		loadPreview();
	}, [
		open,
		viewItem,
		docName,
		documents,
		contracts,
		templates,
		properties,
		owners
	]);
	const handleOpenExternal = () => {
		if (previewUrl) window.open(previewUrl, "_blank");
		else if (viewItem?.webUrl) window.open(viewItem.webUrl, "_blank");
	};
	const handleSaveNotes = async () => {
		if (!viewItem) return;
		setSavingNotes(true);
		try {
			if (viewItem.type === "document") await documentsStore.updateReviewNotes(viewItem.id, notes);
			else if (viewItem.type === "contract") await contractsStore.updateReviewNotes(viewItem.id, notes);
			setSavedNotes(notes);
			toast({
				title: "Anotações salvas",
				description: "As notas de revisão foram atualizadas com sucesso."
			});
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro",
				description: "Falha ao salvar as anotações."
			});
		} finally {
			setSavingNotes(false);
		}
	};
	const handleSelectFolderItem = async (item) => {
		setLoading(true);
		try {
			const url = await m365Service.getDriveItemPreviewUrl(item.siteId, item.driveId, item.id);
			if (url) {
				setPreviewUrl(url);
				setSelectedFolderItem(item);
				setTitle(item.name);
			} else {
				toast({
					title: "Aviso",
					description: "Não foi possível gerar preview deste arquivo. Ele pode ser baixado ou aberto externamente."
				});
				if (item.webUrl) window.open(item.webUrl, "_blank");
			}
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro",
				description: "Falha ao carregar arquivo."
			});
		} finally {
			setLoading(false);
		}
	};
	const handleResolveWithCorrections = async () => {
		if (!viewItem) return;
		setSavingNotes(true);
		try {
			let newPath = void 0;
			if (correctionFile && viewItem.type === "document") {
				const d = documents.find((x) => x.id === viewItem.id);
				if (d) {
					const p = properties.find((x) => x.id === d.propertyId);
					const res = await m365Service.uploadStructuredDocument(correctionFile, correctionFile.name, d.category, d.propertyId, p?.title || "", user?.name || "Sistema");
					if (res?.success) newPath = res.path;
				}
			}
			if (viewItem.type === "document") await documentsStore.updateDocument(viewItem.id, {
				name: correctionName || void 0,
				filePath: newPath,
				reviewNotes: ""
			});
			else if (viewItem.type === "contract") {
				const updatedContent = contentRef.current?.innerHTML || templateContent || "";
				await contractsStore.updateContract(viewItem.id, {
					content: updatedContent,
					reviewNotes: ""
				});
			}
			setSavedNotes("");
			setNotes("");
			toast({
				title: "Pendência resolvida",
				description: "As correções foram aplicadas e a pendência foi removida com sucesso."
			});
			onClose();
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro de Atualização",
				description: e.message || "Falha ao aplicar as correções no documento."
			});
		} finally {
			setSavingNotes(false);
		}
	};
	if (!open && !docName && !viewItem) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/DocumentViewer.tsx:361:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/DocumentViewer.tsx:362:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-[1200px] w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden bg-muted/30",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/DocumentViewer.tsx:363:9",
				"data-prohibitions": "[editContent]",
				className: "p-4 border-b bg-background flex flex-row items-center justify-between shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:364:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-1 flex items-center",
					children: [selectedFolderItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/DocumentViewer.tsx:366:15",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "icon",
						onClick: () => {
							setPreviewUrl(null);
							setSelectedFolderItem(null);
							setTitle(viewItem?.name || "Pasta");
						},
						className: "mr-3 h-8 w-8 shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							"data-uid": "src/components/DocumentViewer.tsx:376:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/DocumentViewer.tsx:379:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							"data-uid": "src/components/DocumentViewer.tsx:380:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2",
							children: [folderItems.length > 0 && !selectedFolderItem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
								"data-uid": "src/components/DocumentViewer.tsx:382:19",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-blue-600"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								"data-uid": "src/components/DocumentViewer.tsx:384:19",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-blue-600"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/DocumentViewer.tsx:386:17",
								"data-prohibitions": "[editContent]",
								className: "truncate max-w-[400px] block",
								title,
								children: title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							"data-uid": "src/components/DocumentViewer.tsx:390:15",
							"data-prohibitions": "[editContent]",
							children: viewItem?.type === "sp_file" || viewItem?.type === "document" || previewUrl ? "Visualização nativa via SharePoint Online (Modo Leitura)" : "Visualização de Minuta do Sistema (Dados preenchidos)"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:397:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-2 mr-6 shrink-0",
					children: [(previewUrl || viewItem?.webUrl) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/DocumentViewer.tsx:399:15",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "sm",
						onClick: handleOpenExternal,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							"data-uid": "src/components/DocumentViewer.tsx:400:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Abrir no SharePoint"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/DocumentViewer.tsx:403:13",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "sm",
						disabled: !previewUrl && !templateContent,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"data-uid": "src/components/DocumentViewer.tsx:404:15",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Baixar"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/DocumentViewer.tsx:409:9",
				"data-prohibitions": "[editContent]",
				className: "flex-1 flex flex-col md:flex-row overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:410:11",
					"data-prohibitions": "[editContent]",
					className: "flex-1 overflow-auto relative bg-muted/10 flex flex-col",
					children: [
						loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:412:15",
							"data-prohibitions": "[]",
							className: "absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/components/DocumentViewer.tsx:413:17",
									"data-prohibitions": "[editContent]",
									className: "h-10 w-10 animate-spin text-primary mb-4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:414:17",
									"data-prohibitions": "[]",
									className: "text-sm font-medium text-foreground",
									children: "Sincronizando com o Microsoft 365..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:417:17",
									"data-prohibitions": "[]",
									className: "text-xs text-muted-foreground mt-1",
									children: "Realizando busca híbrida por arquivos GED"
								})
							]
						}),
						error && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:424:15",
							"data-prohibitions": "[editContent]",
							className: "absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-background",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/DocumentViewer.tsx:425:17",
									"data-prohibitions": "[]",
									className: "bg-destructive/10 p-4 rounded-full mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
										"data-uid": "src/components/DocumentViewer.tsx:426:19",
										"data-prohibitions": "[editContent]",
										className: "h-10 w-10 text-destructive"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/components/DocumentViewer.tsx:428:17",
									"data-prohibitions": "[]",
									className: "text-xl font-semibold text-foreground mb-2",
									children: "Documento Indisponível"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:431:17",
									"data-prohibitions": "[editContent]",
									className: "text-muted-foreground max-w-md",
									children: error
								})
							]
						}),
						!loading && !error && previewUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							"data-uid": "src/components/DocumentViewer.tsx:436:15",
							"data-prohibitions": "[editContent]",
							src: previewUrl,
							className: "w-full flex-1 border-0 bg-white",
							title,
							allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
						}),
						!loading && !error && folderItems.length > 0 && !previewUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:445:15",
							"data-prohibitions": "[editContent]",
							className: "p-4 md:p-8 flex-1 overflow-auto bg-background",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								"data-uid": "src/components/DocumentViewer.tsx:446:17",
								"data-prohibitions": "[editContent]",
								className: "text-lg font-semibold mb-6 border-b pb-2",
								children: ["Conteúdo da Pasta: ", title]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:449:17",
								"data-prohibitions": "[editContent]",
								className: "grid gap-3",
								children: [folderItems.filter((item) => !item.isFolder).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									"data-uid": "src/components/DocumentViewer.tsx:453:23",
									"data-prohibitions": "[editContent]",
									onClick: () => handleSelectFolderItem(item),
									className: "flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 hover:border-primary/50 text-left transition-all group shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:458:25",
										"data-prohibitions": "[]",
										className: "bg-blue-50 p-2 rounded-md group-hover:bg-blue-100 transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
											"data-uid": "src/components/DocumentViewer.tsx:459:27",
											"data-prohibitions": "[editContent]",
											className: "w-6 h-6 text-blue-600 shrink-0"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:461:25",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/DocumentViewer.tsx:462:27",
											"data-prohibitions": "[editContent]",
											className: "font-medium text-foreground truncate",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/DocumentViewer.tsx:463:27",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground truncate",
											children: item.displayPath
										})]
									})]
								}, item.id)), folderItems.filter((item) => !item.isFolder).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/DocumentViewer.tsx:470:21",
									"data-prohibitions": "[]",
									className: "text-center py-12 border-2 border-dashed rounded-lg bg-muted/20",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
											"data-uid": "src/components/DocumentViewer.tsx:471:23",
											"data-prohibitions": "[editContent]",
											className: "w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/DocumentViewer.tsx:472:23",
											"data-prohibitions": "[]",
											className: "text-muted-foreground font-medium",
											children: "Nenhum arquivo encontrado."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/DocumentViewer.tsx:475:23",
											"data-prohibitions": "[]",
											className: "text-xs text-muted-foreground mt-1",
											children: "Esta pasta e suas subpastas não possuem arquivos compatíveis."
										})
									]
								})]
							})]
						}),
						!loading && !error && !previewUrl && templateContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:485:15",
							"data-prohibitions": "[editContent]",
							className: "p-4 md:p-8 flex justify-center flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:486:17",
								"data-prohibitions": "[editContent]",
								className: "bg-background shadow-lg border p-10 md:p-16 w-full max-w-3xl flex flex-col h-fit",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:487:19",
										"data-prohibitions": "[editContent]",
										className: "text-center mb-10 border-b pb-8",
										children: [
											agencyProfile.logo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												"data-uid": "src/components/DocumentViewer.tsx:489:23",
												"data-prohibitions": "[editContent]",
												src: agencyProfile.logo,
												alt: "Logo",
												className: "h-20 mx-auto mb-6 object-contain"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
												"data-uid": "src/components/DocumentViewer.tsx:495:21",
												"data-prohibitions": "[editContent]",
												className: "text-2xl font-bold uppercase underline",
												children: viewItem?.type === "contract" ? title : "Documento do Sistema"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/components/DocumentViewer.tsx:498:21",
												"data-prohibitions": "[editContent]",
												className: "text-muted-foreground mt-4 font-semibold",
												children: agencyProfile.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												"data-uid": "src/components/DocumentViewer.tsx:499:21",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-muted-foreground mt-1",
												children: [
													agencyProfile.address,
													" | ",
													agencyProfile.website
												]
											})
										]
									}),
									viewItem?.type === "contract" && !!savedNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:505:21",
										"data-prohibitions": "[]",
										className: "bg-blue-50 text-blue-800 p-3 mb-6 rounded text-sm flex items-center gap-2 border border-blue-100 shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, {
											"data-uid": "src/components/DocumentViewer.tsx:506:23",
											"data-prohibitions": "[editContent]",
											className: "w-5 h-5 shrink-0"
										}), "Modo de edição ativo: Clique diretamente no texto do contrato abaixo para realizar as alterações necessárias."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:512:19",
										"data-prohibitions": "[editContent]",
										ref: contentRef,
										contentEditable: viewItem?.type === "contract" && !!savedNotes,
										suppressContentEditableWarning: true,
										className: cn("space-y-4 text-sm text-foreground/90 text-justify leading-relaxed flex-1 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>strong]:font-bold outline-none transition-all", viewItem?.type === "contract" && !!savedNotes ? "focus:ring-2 focus:ring-primary/50 p-4 -mx-4 rounded-md hover:bg-muted/30 cursor-text min-h-[300px]" : ""),
										dangerouslySetInnerHTML: { __html: templateContent }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:524:19",
										"data-prohibitions": "[]",
										className: "mt-16 pt-8 flex justify-between px-8 opacity-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/DocumentViewer.tsx:525:21",
											"data-prohibitions": "[]",
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/components/DocumentViewer.tsx:526:23",
												"data-prohibitions": "[]",
												className: "w-48 border-b border-foreground/50 mb-2"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/components/DocumentViewer.tsx:527:23",
												"data-prohibitions": "[]",
												className: "text-xs",
												children: "Locador"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/DocumentViewer.tsx:529:21",
											"data-prohibitions": "[]",
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/components/DocumentViewer.tsx:530:23",
												"data-prohibitions": "[]",
												className: "w-48 border-b border-foreground/50 mb-2"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/components/DocumentViewer.tsx:531:23",
												"data-prohibitions": "[]",
												className: "text-xs",
												children: "Locatário"
											})]
										})]
									})
								]
							})
						}),
						!loading && !error && !viewItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:539:15",
							"data-prohibitions": "[editContent]",
							className: "p-4 md:p-8 flex justify-center flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:540:17",
								"data-prohibitions": "[editContent]",
								className: "bg-background shadow-lg border p-10 md:p-16 w-full max-w-3xl flex flex-col h-fit",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/DocumentViewer.tsx:541:19",
									"data-prohibitions": "[editContent]",
									className: "text-center mb-10 border-b pb-8",
									children: [
										agencyProfile.logo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											"data-uid": "src/components/DocumentViewer.tsx:543:23",
											"data-prohibitions": "[editContent]",
											src: agencyProfile.logo,
											alt: "Logo",
											className: "h-20 mx-auto mb-6 object-contain"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											"data-uid": "src/components/DocumentViewer.tsx:549:21",
											"data-prohibitions": "[editContent]",
											className: "text-2xl font-bold uppercase underline",
											children: isTerm ? "Termo de Responsabilidade" : "Documento"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/DocumentViewer.tsx:552:21",
											"data-prohibitions": "[editContent]",
											className: "text-muted-foreground mt-4 font-semibold",
											children: agencyProfile.name
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/DocumentViewer.tsx:554:19",
									"data-prohibitions": "[editContent]",
									className: "space-y-6 text-sm text-foreground/90 text-justify leading-relaxed flex-1",
									children: isTerm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/DocumentViewer.tsx:557:25",
										"data-prohibitions": "[]",
										children: "Declaro para os devidos fins que recebi/entreguei as chaves referentes ao imóvel situado no endereço supracitado, em plenas condições de acordo com o processo em vigência."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/components/DocumentViewer.tsx:562:25",
										"data-prohibitions": "[editContent]",
										children: [
											"O presente termo isenta ou responsabiliza a parte envolvida com base na vistoria anexada aos autos, em conformidade com as políticas internas da",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/components/DocumentViewer.tsx:565:27",
												"data-prohibitions": "[editContent]",
												children: agencyProfile.name
											}),
											"."
										]
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/DocumentViewer.tsx:569:23",
										"data-prohibitions": "[]",
										children: "Conteúdo do documento não disponível via preview direto."
									})
								})]
							})
						})
					]
				}), viewItem && viewItem.type !== "sp_file" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:578:13",
					"data-prohibitions": "[editContent]",
					className: "w-full md:w-[340px] shrink-0 border-t md:border-t-0 md:border-l bg-background flex flex-col z-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/DocumentViewer.tsx:579:15",
						"data-prohibitions": "[]",
						className: "p-4 border-b font-medium flex items-center gap-2 bg-muted/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
							"data-uid": "src/components/DocumentViewer.tsx:580:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 text-primary"
						}), " Avaliação e Correções"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/DocumentViewer.tsx:582:15",
						"data-prohibitions": "[editContent]",
						className: "p-4 flex-1 overflow-auto flex flex-col gap-6",
						children: [
							savedNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:584:19",
								"data-prohibitions": "[editContent]",
								className: "p-3 bg-amber-50 border border-amber-200 rounded-md text-sm animate-in fade-in slide-in-from-top-2 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									"data-uid": "src/components/DocumentViewer.tsx:585:21",
									"data-prohibitions": "[]",
									className: "text-amber-900 flex items-center gap-1 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
										"data-uid": "src/components/DocumentViewer.tsx:586:23",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									}), " Nota Atual de Revisão:"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:588:21",
									"data-prohibitions": "[editContent]",
									className: "text-amber-800 whitespace-pre-wrap",
									children: savedNotes
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:592:17",
								"data-prohibitions": "[editContent]",
								className: "bg-card p-4 rounded-md border shadow-sm space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										"data-uid": "src/components/DocumentViewer.tsx:593:19",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-semibold flex items-center gap-2 border-b pb-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
												"data-uid": "src/components/DocumentViewer.tsx:594:21",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-primary"
											}),
											" ",
											savedNotes ? "Aplicar Correções e Resolver" : "Editar Metadados"
										]
									}),
									viewItem.type === "document" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:600:23",
										"data-prohibitions": "[]",
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/DocumentViewer.tsx:601:25",
											"data-prohibitions": "[]",
											className: "text-xs",
											children: "Nome do Arquivo / Título"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/DocumentViewer.tsx:602:25",
											"data-prohibitions": "[editContent]",
											value: correctionName,
											onChange: (e) => setCorrectionName(e.target.value),
											className: "h-8 text-xs"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:608:23",
										"data-prohibitions": "[]",
										className: "space-y-1.5 pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											"data-uid": "src/components/DocumentViewer.tsx:609:25",
											"data-prohibitions": "[]",
											className: "text-xs text-muted-foreground flex justify-between",
											children: ["Substituir Arquivo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/DocumentViewer.tsx:610:46",
												"data-prohibitions": "[]",
												className: "font-normal",
												children: "(Opcional)"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/DocumentViewer.tsx:612:25",
											"data-prohibitions": "[editContent]",
											type: "file",
											onChange: (e) => setCorrectionFile(e.target.files?.[0] || null),
											className: "h-8 text-xs cursor-pointer"
										})]
									})] }),
									viewItem.type === "contract" && savedNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:622:21",
										"data-prohibitions": "[editContent]",
										className: "text-sm text-muted-foreground mb-4",
										children: previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/DocumentViewer.tsx:624:25",
											"data-prohibitions": "[]",
											children: "Este contrato está armazenado no SharePoint. Edite-o diretamente utilizando o botão \"Abrir no SharePoint\" e depois clique em Salvar para resolver a pendência."
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/DocumentViewer.tsx:630:25",
											"data-prohibitions": "[]",
											children: "As alterações feitas no painel à esquerda serão salvas e a pendência será marcada como resolvida para reanálise."
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/components/DocumentViewer.tsx:638:19",
										"data-prohibitions": "[editContent]",
										onClick: handleResolveWithCorrections,
										disabled: savingNotes,
										size: "sm",
										className: cn("w-full mt-4", savedNotes ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""),
										children: [savingNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/DocumentViewer.tsx:648:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2 animate-spin"
										}) : savedNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											"data-uid": "src/components/DocumentViewer.tsx:650:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
											"data-uid": "src/components/DocumentViewer.tsx:652:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}), savedNotes ? "Salvar e Marcar Resolvido" : "Salvar Alterações"]
									})
								]
							}),
							isManager && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:659:19",
								"data-prohibitions": "[editContent]",
								className: "pt-4 border-t space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										"data-uid": "src/components/DocumentViewer.tsx:660:21",
										"data-prohibitions": "[]",
										className: "text-sm font-semibold flex items-center gap-2 text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
											"data-uid": "src/components/DocumentViewer.tsx:661:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										}), " Gestão da Nota de Revisão"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/DocumentViewer.tsx:663:21",
										"data-prohibitions": "[]",
										className: "text-xs text-muted-foreground",
										children: "Modifique ou insira um novo apontamento para este documento."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										"data-uid": "src/components/DocumentViewer.tsx:666:21",
										"data-prohibitions": "[editContent]",
										value: notes,
										onChange: (e) => setNotes(e.target.value),
										placeholder: "Ex: Assinatura ilegível, data incorreta, falta anexo...",
										className: "min-h-[100px] resize-none text-sm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/components/DocumentViewer.tsx:672:21",
										"data-prohibitions": "[editContent]",
										variant: "secondary",
										onClick: handleSaveNotes,
										disabled: savingNotes,
										size: "sm",
										className: "w-full",
										children: [savingNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/DocumentViewer.tsx:680:25",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2 animate-spin"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
											"data-uid": "src/components/DocumentViewer.tsx:682:25",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}), "Atualizar Nota"]
									})
								]
							})
						]
					})]
				})]
			})]
		})
	});
}
//#endregion
export { MessageSquare as n, FilePen as r, DocumentViewer as t };

//# sourceMappingURL=DocumentViewer-_9cHItBt.js.map