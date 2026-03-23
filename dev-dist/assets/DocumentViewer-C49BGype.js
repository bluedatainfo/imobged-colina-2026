import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon, t as cn } from "./utils-BNj1jY-i.js";
import { t as CircleAlert } from "./circle-alert-tq6C5WFm.js";
import { t as CircleCheck } from "./circle-check-wj6pmJkc.js";
import { t as Download } from "./download-DNswiS8o.js";
import { t as ExternalLink } from "./external-link-DaNlYeYS.js";
import { t as Save } from "./save-Dykknpcs.js";
import { t as Button } from "./button-DI75GKXN.js";
import { i as useMainStore } from "./main-DQzAZJLS.js";
import { i as contractsStore, o as useContractsStore } from "./keys-n330B-Df.js";
import { r as useEntitiesStore } from "./entities-Qco6HT1V.js";
import { A as Input, Y as LoaderCircle, g as documentsStore, h as useAuth, nt as FileText, v as useDocumentsStore, x as useTemplatesStore } from "./index-C_qAHuH0.js";
import { t as Label } from "./label-jqTESdUS.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CG0Rds0U.js";
import { n as m365Service } from "./m365-BAktBcPf.js";
import { t as Textarea } from "./textarea-BDB6degX.js";
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
	const [correctionTenant, setCorrectionTenant] = (0, import_react.useState)("");
	const [correctionFile, setCorrectionFile] = (0, import_react.useState)(null);
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
			setCorrectionTenant("");
			setCorrectionFile(null);
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
					setCorrectionTenant(contract.tenantName || "");
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
			else if (viewItem.type === "contract") await contractsStore.updateContract(viewItem.id, {
				documentName: correctionName || void 0,
				tenantName: correctionTenant || void 0,
				reviewNotes: ""
			});
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
		"data-uid": "src/components/DocumentViewer.tsx:271:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/DocumentViewer.tsx:272:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-[1200px] w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden bg-muted/30",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/DocumentViewer.tsx:273:9",
				"data-prohibitions": "[editContent]",
				className: "p-4 border-b bg-background flex flex-row items-center justify-between shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:274:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/DocumentViewer.tsx:275:13",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/components/DocumentViewer.tsx:276:15",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-blue-600"
						}), title]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/DocumentViewer.tsx:279:13",
						"data-prohibitions": "[editContent]",
						children: viewItem?.type === "document" || previewUrl ? "Visualização nativa via SharePoint Online (Modo Leitura)" : "Visualização de Minuta do Sistema (Dados preenchidos)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:285:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-2 mr-6",
					children: [previewUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/DocumentViewer.tsx:287:15",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "sm",
						onClick: handleOpenExternal,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							"data-uid": "src/components/DocumentViewer.tsx:288:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Abrir no SharePoint"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/DocumentViewer.tsx:291:13",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "sm",
						disabled: !previewUrl && !templateContent,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"data-uid": "src/components/DocumentViewer.tsx:292:15",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Baixar"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/DocumentViewer.tsx:297:9",
				"data-prohibitions": "[editContent]",
				className: "flex-1 flex flex-col md:flex-row overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:298:11",
					"data-prohibitions": "[editContent]",
					className: "flex-1 overflow-auto relative bg-muted/10 flex flex-col",
					children: [
						loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:300:15",
							"data-prohibitions": "[]",
							className: "absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/components/DocumentViewer.tsx:301:17",
									"data-prohibitions": "[editContent]",
									className: "h-10 w-10 animate-spin text-primary mb-4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:302:17",
									"data-prohibitions": "[]",
									className: "text-sm font-medium text-foreground",
									children: "Sincronizando com o Microsoft 365..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:305:17",
									"data-prohibitions": "[]",
									className: "text-xs text-muted-foreground mt-1",
									children: "Realizando busca híbrida por arquivos GED"
								})
							]
						}),
						error && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:312:15",
							"data-prohibitions": "[editContent]",
							className: "absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-background",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/DocumentViewer.tsx:313:17",
									"data-prohibitions": "[]",
									className: "bg-destructive/10 p-4 rounded-full mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
										"data-uid": "src/components/DocumentViewer.tsx:314:19",
										"data-prohibitions": "[editContent]",
										className: "h-10 w-10 text-destructive"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/components/DocumentViewer.tsx:316:17",
									"data-prohibitions": "[]",
									className: "text-xl font-semibold text-foreground mb-2",
									children: "Documento Indisponível"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:319:17",
									"data-prohibitions": "[editContent]",
									className: "text-muted-foreground max-w-md",
									children: error
								})
							]
						}),
						!loading && !error && previewUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							"data-uid": "src/components/DocumentViewer.tsx:324:15",
							"data-prohibitions": "[editContent]",
							src: previewUrl,
							className: "w-full flex-1 border-0",
							title,
							allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
						}),
						!loading && !error && !previewUrl && templateContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:333:15",
							"data-prohibitions": "[editContent]",
							className: "p-4 md:p-8 flex justify-center flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:334:17",
								"data-prohibitions": "[editContent]",
								className: "bg-background shadow-lg border p-10 md:p-16 w-full max-w-3xl flex flex-col h-fit",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:335:19",
										"data-prohibitions": "[editContent]",
										className: "text-center mb-10 border-b pb-8",
										children: [
											agencyProfile.logo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												"data-uid": "src/components/DocumentViewer.tsx:337:23",
												"data-prohibitions": "[editContent]",
												src: agencyProfile.logo,
												alt: "Logo",
												className: "h-20 mx-auto mb-6 object-contain"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
												"data-uid": "src/components/DocumentViewer.tsx:343:21",
												"data-prohibitions": "[]",
												className: "text-2xl font-bold uppercase underline",
												children: "Documento do Sistema"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/components/DocumentViewer.tsx:344:21",
												"data-prohibitions": "[editContent]",
												className: "text-muted-foreground mt-4 font-semibold",
												children: agencyProfile.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												"data-uid": "src/components/DocumentViewer.tsx:345:21",
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:349:19",
										"data-prohibitions": "[editContent]",
										className: "space-y-4 text-sm text-foreground/90 text-justify leading-relaxed flex-1 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>strong]:font-bold",
										dangerouslySetInnerHTML: { __html: templateContent }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:353:19",
										"data-prohibitions": "[]",
										className: "mt-16 pt-8 flex justify-between px-8 opacity-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/DocumentViewer.tsx:354:21",
											"data-prohibitions": "[]",
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/components/DocumentViewer.tsx:355:23",
												"data-prohibitions": "[]",
												className: "w-48 border-b border-foreground/50 mb-2"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/components/DocumentViewer.tsx:356:23",
												"data-prohibitions": "[]",
												className: "text-xs",
												children: "Locador"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/DocumentViewer.tsx:358:21",
											"data-prohibitions": "[]",
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/components/DocumentViewer.tsx:359:23",
												"data-prohibitions": "[]",
												className: "w-48 border-b border-foreground/50 mb-2"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/components/DocumentViewer.tsx:360:23",
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
							"data-uid": "src/components/DocumentViewer.tsx:368:15",
							"data-prohibitions": "[editContent]",
							className: "p-4 md:p-8 flex justify-center flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:369:17",
								"data-prohibitions": "[editContent]",
								className: "bg-background shadow-lg border p-10 md:p-16 w-full max-w-3xl flex flex-col h-fit",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/DocumentViewer.tsx:370:19",
									"data-prohibitions": "[editContent]",
									className: "text-center mb-10 border-b pb-8",
									children: [
										agencyProfile.logo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											"data-uid": "src/components/DocumentViewer.tsx:372:23",
											"data-prohibitions": "[editContent]",
											src: agencyProfile.logo,
											alt: "Logo",
											className: "h-20 mx-auto mb-6 object-contain"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											"data-uid": "src/components/DocumentViewer.tsx:378:21",
											"data-prohibitions": "[editContent]",
											className: "text-2xl font-bold uppercase underline",
											children: isTerm ? "Termo de Responsabilidade" : "Documento"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/DocumentViewer.tsx:381:21",
											"data-prohibitions": "[editContent]",
											className: "text-muted-foreground mt-4 font-semibold",
											children: agencyProfile.name
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/DocumentViewer.tsx:383:19",
									"data-prohibitions": "[editContent]",
									className: "space-y-6 text-sm text-foreground/90 text-justify leading-relaxed flex-1",
									children: isTerm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/DocumentViewer.tsx:386:25",
										"data-prohibitions": "[]",
										children: "Declaro para os devidos fins que recebi/entreguei as chaves referentes ao imóvel situado no endereço supracitado, em plenas condições de acordo com o processo em vigência."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/components/DocumentViewer.tsx:391:25",
										"data-prohibitions": "[editContent]",
										children: [
											"O presente termo isenta ou responsabiliza a parte envolvida com base na vistoria anexada aos autos, em conformidade com as políticas internas da",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/components/DocumentViewer.tsx:394:27",
												"data-prohibitions": "[editContent]",
												children: agencyProfile.name
											}),
											"."
										]
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/DocumentViewer.tsx:398:23",
										"data-prohibitions": "[]",
										children: "Conteúdo do documento não disponível via preview direto."
									})
								})]
							})
						})
					]
				}), viewItem && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:407:13",
					"data-prohibitions": "[editContent]",
					className: "w-full md:w-[340px] shrink-0 border-t md:border-t-0 md:border-l bg-background flex flex-col z-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/DocumentViewer.tsx:408:15",
						"data-prohibitions": "[]",
						className: "p-4 border-b font-medium flex items-center gap-2 bg-muted/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
							"data-uid": "src/components/DocumentViewer.tsx:409:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 text-primary"
						}), " Avaliação e Correções"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/DocumentViewer.tsx:411:15",
						"data-prohibitions": "[editContent]",
						className: "p-4 flex-1 overflow-auto flex flex-col gap-6",
						children: [
							savedNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:413:19",
								"data-prohibitions": "[editContent]",
								className: "p-3 bg-amber-50 border border-amber-200 rounded-md text-sm animate-in fade-in slide-in-from-top-2 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									"data-uid": "src/components/DocumentViewer.tsx:414:21",
									"data-prohibitions": "[]",
									className: "text-amber-900 flex items-center gap-1 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
										"data-uid": "src/components/DocumentViewer.tsx:415:23",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									}), " Nota Atual de Revisão:"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:417:21",
									"data-prohibitions": "[editContent]",
									className: "text-amber-800 whitespace-pre-wrap",
									children: savedNotes
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:421:17",
								"data-prohibitions": "[editContent]",
								className: "bg-card p-4 rounded-md border shadow-sm space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										"data-uid": "src/components/DocumentViewer.tsx:422:19",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-semibold flex items-center gap-2 border-b pb-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
												"data-uid": "src/components/DocumentViewer.tsx:423:21",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-primary"
											}),
											" ",
											savedNotes ? "Aplicar Correções e Resolver" : "Editar Metadados"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:427:19",
										"data-prohibitions": "[]",
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/DocumentViewer.tsx:428:21",
											"data-prohibitions": "[]",
											className: "text-xs",
											children: "Nome do Arquivo / Título"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/DocumentViewer.tsx:429:21",
											"data-prohibitions": "[editContent]",
											value: correctionName,
											onChange: (e) => setCorrectionName(e.target.value),
											className: "h-8 text-xs"
										})]
									}),
									viewItem.type === "contract" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:437:21",
										"data-prohibitions": "[]",
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/DocumentViewer.tsx:438:23",
											"data-prohibitions": "[]",
											className: "text-xs",
											children: "Nome do Locatário / Vinculado"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/DocumentViewer.tsx:439:23",
											"data-prohibitions": "[editContent]",
											value: correctionTenant,
											onChange: (e) => setCorrectionTenant(e.target.value),
											className: "h-8 text-xs"
										})]
									}),
									viewItem.type === "document" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:448:21",
										"data-prohibitions": "[]",
										className: "space-y-1.5 pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											"data-uid": "src/components/DocumentViewer.tsx:449:23",
											"data-prohibitions": "[]",
											className: "text-xs text-muted-foreground flex justify-between",
											children: ["Substituir Arquivo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/DocumentViewer.tsx:450:44",
												"data-prohibitions": "[]",
												className: "font-normal",
												children: "(Opcional)"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/DocumentViewer.tsx:452:23",
											"data-prohibitions": "[editContent]",
											type: "file",
											onChange: (e) => setCorrectionFile(e.target.files?.[0] || null),
											className: "h-8 text-xs cursor-pointer"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/components/DocumentViewer.tsx:460:19",
										"data-prohibitions": "[editContent]",
										onClick: handleResolveWithCorrections,
										disabled: savingNotes,
										size: "sm",
										className: cn("w-full mt-4", savedNotes ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""),
										children: [savingNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/DocumentViewer.tsx:470:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2 animate-spin"
										}) : savedNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											"data-uid": "src/components/DocumentViewer.tsx:472:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
											"data-uid": "src/components/DocumentViewer.tsx:474:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}), savedNotes ? "Salvar e Marcar Resolvido" : "Salvar Alterações"]
									})
								]
							}),
							isManager && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:481:19",
								"data-prohibitions": "[editContent]",
								className: "pt-4 border-t space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										"data-uid": "src/components/DocumentViewer.tsx:482:21",
										"data-prohibitions": "[]",
										className: "text-sm font-semibold flex items-center gap-2 text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
											"data-uid": "src/components/DocumentViewer.tsx:483:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										}), " Gestão da Nota de Revisão"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/DocumentViewer.tsx:485:21",
										"data-prohibitions": "[]",
										className: "text-xs text-muted-foreground",
										children: "Modifique ou insira um novo apontamento para este documento."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										"data-uid": "src/components/DocumentViewer.tsx:488:21",
										"data-prohibitions": "[editContent]",
										value: notes,
										onChange: (e) => setNotes(e.target.value),
										placeholder: "Ex: Assinatura ilegível, data incorreta, falta anexo...",
										className: "min-h-[100px] resize-none text-sm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/components/DocumentViewer.tsx:494:21",
										"data-prohibitions": "[editContent]",
										variant: "secondary",
										onClick: handleSaveNotes,
										disabled: savingNotes,
										size: "sm",
										className: "w-full",
										children: [savingNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/DocumentViewer.tsx:502:25",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2 animate-spin"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
											"data-uid": "src/components/DocumentViewer.tsx:504:25",
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
export { MessageSquare as n, DocumentViewer as t };

//# sourceMappingURL=DocumentViewer-C49BGype.js.map