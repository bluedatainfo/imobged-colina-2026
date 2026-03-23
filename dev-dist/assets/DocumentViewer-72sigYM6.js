import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as CircleAlert } from "./circle-alert-tq6C5WFm.js";
import { t as CircleCheck } from "./circle-check-wj6pmJkc.js";
import { t as Download } from "./download-DNswiS8o.js";
import { t as ExternalLink } from "./external-link-DaNlYeYS.js";
import { t as Save } from "./save-Dykknpcs.js";
import { t as Button } from "./button-DI75GKXN.js";
import { i as useMainStore } from "./main-DQzAZJLS.js";
import { i as contractsStore, o as useContractsStore } from "./keys-n330B-Df.js";
import { r as useEntitiesStore } from "./entities-Qco6HT1V.js";
import { A as Input, Y as LoaderCircle, g as documentsStore, h as useAuth, nt as FileText, v as useDocumentsStore, x as useTemplatesStore } from "./index-CjyVUJJC.js";
import { t as Label } from "./label-jqTESdUS.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CBNKTNLz.js";
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
		"data-uid": "src/components/DocumentViewer.tsx:270:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/DocumentViewer.tsx:271:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-[1200px] w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden bg-muted/30",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/DocumentViewer.tsx:272:9",
				"data-prohibitions": "[editContent]",
				className: "p-4 border-b bg-background flex flex-row items-center justify-between shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:273:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/DocumentViewer.tsx:274:13",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/components/DocumentViewer.tsx:275:15",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-blue-600"
						}), title]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/DocumentViewer.tsx:278:13",
						"data-prohibitions": "[editContent]",
						children: viewItem?.type === "document" || previewUrl ? "Visualização nativa via SharePoint Online (Modo Leitura)" : "Visualização de Minuta do Sistema (Dados preenchidos)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:284:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-2 mr-6",
					children: [previewUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/DocumentViewer.tsx:286:15",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "sm",
						onClick: handleOpenExternal,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							"data-uid": "src/components/DocumentViewer.tsx:287:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Abrir no SharePoint"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/DocumentViewer.tsx:290:13",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "sm",
						disabled: !previewUrl && !templateContent,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"data-uid": "src/components/DocumentViewer.tsx:291:15",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Baixar"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/DocumentViewer.tsx:296:9",
				"data-prohibitions": "[editContent]",
				className: "flex-1 flex flex-col md:flex-row overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:297:11",
					"data-prohibitions": "[editContent]",
					className: "flex-1 overflow-auto relative bg-muted/10 flex flex-col",
					children: [
						loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:299:15",
							"data-prohibitions": "[]",
							className: "absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/components/DocumentViewer.tsx:300:17",
									"data-prohibitions": "[editContent]",
									className: "h-10 w-10 animate-spin text-primary mb-4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:301:17",
									"data-prohibitions": "[]",
									className: "text-sm font-medium text-foreground",
									children: "Sincronizando com o Microsoft 365..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:304:17",
									"data-prohibitions": "[]",
									className: "text-xs text-muted-foreground mt-1",
									children: "Realizando busca híbrida por arquivos GED"
								})
							]
						}),
						error && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:311:15",
							"data-prohibitions": "[editContent]",
							className: "absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-background",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/DocumentViewer.tsx:312:17",
									"data-prohibitions": "[]",
									className: "bg-destructive/10 p-4 rounded-full mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
										"data-uid": "src/components/DocumentViewer.tsx:313:19",
										"data-prohibitions": "[editContent]",
										className: "h-10 w-10 text-destructive"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/components/DocumentViewer.tsx:315:17",
									"data-prohibitions": "[]",
									className: "text-xl font-semibold text-foreground mb-2",
									children: "Documento Indisponível"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:318:17",
									"data-prohibitions": "[editContent]",
									className: "text-muted-foreground max-w-md",
									children: error
								})
							]
						}),
						!loading && !error && previewUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							"data-uid": "src/components/DocumentViewer.tsx:323:15",
							"data-prohibitions": "[editContent]",
							src: previewUrl,
							className: "w-full flex-1 border-0",
							title,
							allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
						}),
						!loading && !error && !previewUrl && templateContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:332:15",
							"data-prohibitions": "[editContent]",
							className: "p-4 md:p-8 flex justify-center flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:333:17",
								"data-prohibitions": "[editContent]",
								className: "bg-background shadow-lg border p-10 md:p-16 w-full max-w-3xl flex flex-col h-fit",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:334:19",
										"data-prohibitions": "[editContent]",
										className: "text-center mb-10 border-b pb-8",
										children: [
											agencyProfile.logo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												"data-uid": "src/components/DocumentViewer.tsx:336:23",
												"data-prohibitions": "[editContent]",
												src: agencyProfile.logo,
												alt: "Logo",
												className: "h-20 mx-auto mb-6 object-contain"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
												"data-uid": "src/components/DocumentViewer.tsx:342:21",
												"data-prohibitions": "[]",
												className: "text-2xl font-bold uppercase underline",
												children: "Documento do Sistema"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/components/DocumentViewer.tsx:343:21",
												"data-prohibitions": "[editContent]",
												className: "text-muted-foreground mt-4 font-semibold",
												children: agencyProfile.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												"data-uid": "src/components/DocumentViewer.tsx:344:21",
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
										"data-uid": "src/components/DocumentViewer.tsx:348:19",
										"data-prohibitions": "[editContent]",
										className: "space-y-4 text-sm text-foreground/90 text-justify leading-relaxed flex-1 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>strong]:font-bold",
										dangerouslySetInnerHTML: { __html: templateContent }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:352:19",
										"data-prohibitions": "[]",
										className: "mt-16 pt-8 flex justify-between px-8 opacity-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/DocumentViewer.tsx:353:21",
											"data-prohibitions": "[]",
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/components/DocumentViewer.tsx:354:23",
												"data-prohibitions": "[]",
												className: "w-48 border-b border-foreground/50 mb-2"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/components/DocumentViewer.tsx:355:23",
												"data-prohibitions": "[]",
												className: "text-xs",
												children: "Locador"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/DocumentViewer.tsx:357:21",
											"data-prohibitions": "[]",
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/components/DocumentViewer.tsx:358:23",
												"data-prohibitions": "[]",
												className: "w-48 border-b border-foreground/50 mb-2"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/components/DocumentViewer.tsx:359:23",
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
							"data-uid": "src/components/DocumentViewer.tsx:367:15",
							"data-prohibitions": "[editContent]",
							className: "p-4 md:p-8 flex justify-center flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:368:17",
								"data-prohibitions": "[editContent]",
								className: "bg-background shadow-lg border p-10 md:p-16 w-full max-w-3xl flex flex-col h-fit",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/DocumentViewer.tsx:369:19",
									"data-prohibitions": "[editContent]",
									className: "text-center mb-10 border-b pb-8",
									children: [
										agencyProfile.logo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											"data-uid": "src/components/DocumentViewer.tsx:371:23",
											"data-prohibitions": "[editContent]",
											src: agencyProfile.logo,
											alt: "Logo",
											className: "h-20 mx-auto mb-6 object-contain"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											"data-uid": "src/components/DocumentViewer.tsx:377:21",
											"data-prohibitions": "[editContent]",
											className: "text-2xl font-bold uppercase underline",
											children: isTerm ? "Termo de Responsabilidade" : "Documento"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/DocumentViewer.tsx:380:21",
											"data-prohibitions": "[editContent]",
											className: "text-muted-foreground mt-4 font-semibold",
											children: agencyProfile.name
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/DocumentViewer.tsx:382:19",
									"data-prohibitions": "[editContent]",
									className: "space-y-6 text-sm text-foreground/90 text-justify leading-relaxed flex-1",
									children: isTerm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/DocumentViewer.tsx:385:25",
										"data-prohibitions": "[]",
										children: "Declaro para os devidos fins que recebi/entreguei as chaves referentes ao imóvel situado no endereço supracitado, em plenas condições de acordo com o processo em vigência."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/components/DocumentViewer.tsx:390:25",
										"data-prohibitions": "[editContent]",
										children: [
											"O presente termo isenta ou responsabiliza a parte envolvida com base na vistoria anexada aos autos, em conformidade com as políticas internas da",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/components/DocumentViewer.tsx:393:27",
												"data-prohibitions": "[editContent]",
												children: agencyProfile.name
											}),
											"."
										]
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/DocumentViewer.tsx:397:23",
										"data-prohibitions": "[]",
										children: "Conteúdo do documento não disponível via preview direto."
									})
								})]
							})
						})
					]
				}), viewItem && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:406:13",
					"data-prohibitions": "[editContent]",
					className: "w-full md:w-[340px] shrink-0 border-t md:border-t-0 md:border-l bg-background flex flex-col z-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/DocumentViewer.tsx:407:15",
						"data-prohibitions": "[]",
						className: "p-4 border-b font-medium flex items-center gap-2 bg-muted/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
							"data-uid": "src/components/DocumentViewer.tsx:408:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 text-primary"
						}), " Avaliação e Correções"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/DocumentViewer.tsx:410:15",
						"data-prohibitions": "[editContent]",
						className: "p-4 flex-1 overflow-auto flex flex-col gap-4",
						children: isManager ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/DocumentViewer.tsx:413:21",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Insira apontamentos ou correções necessárias para este documento."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-uid": "src/components/DocumentViewer.tsx:416:21",
								"data-prohibitions": "[editContent]",
								value: notes,
								onChange: (e) => setNotes(e.target.value),
								placeholder: "Ex: Assinatura ilegível, data incorreta, falta anexo...",
								className: "min-h-[150px] resize-none text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/components/DocumentViewer.tsx:422:21",
								"data-prohibitions": "[editContent]",
								onClick: handleSaveNotes,
								disabled: savingNotes,
								size: "sm",
								children: [savingNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/components/DocumentViewer.tsx:424:25",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
									"data-uid": "src/components/DocumentViewer.tsx:426:25",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), "Salvar Anotações"]
							}),
							savedNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:432:23",
								"data-prohibitions": "[editContent]",
								className: "mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm animate-in fade-in slide-in-from-top-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									"data-uid": "src/components/DocumentViewer.tsx:433:25",
									"data-prohibitions": "[]",
									className: "text-amber-900 flex items-center gap-1 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
										"data-uid": "src/components/DocumentViewer.tsx:434:27",
										"data-prohibitions": "[editContent]",
										className: "w-3 h-3"
									}), " Nota Atual:"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/DocumentViewer.tsx:436:25",
									"data-prohibitions": "[editContent]",
									className: "text-amber-800 whitespace-pre-wrap",
									children: savedNotes
								})]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: savedNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:443:23",
							"data-prohibitions": "[editContent]",
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:444:25",
								"data-prohibitions": "[editContent]",
								className: "p-3 bg-amber-50 border border-amber-200 rounded-md text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									"data-uid": "src/components/DocumentViewer.tsx:445:27",
									"data-prohibitions": "[]",
									className: "text-amber-900 flex items-center gap-1 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
										"data-uid": "src/components/DocumentViewer.tsx:446:29",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									}), " Pendência de Correção:"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:448:27",
									"data-prohibitions": "[editContent]",
									className: "text-amber-800 whitespace-pre-wrap mt-2",
									children: savedNotes
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:451:25",
								"data-prohibitions": "[editContent]",
								className: "bg-white p-4 rounded-md border shadow-sm space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										"data-uid": "src/components/DocumentViewer.tsx:452:27",
										"data-prohibitions": "[]",
										className: "text-sm font-semibold flex items-center gap-2 border-b pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
											"data-uid": "src/components/DocumentViewer.tsx:453:29",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										}), " Efetuar Correções"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:456:27",
										"data-prohibitions": "[]",
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/DocumentViewer.tsx:457:29",
											"data-prohibitions": "[]",
											className: "text-xs",
											children: "Nome do Arquivo / Título"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/DocumentViewer.tsx:458:29",
											"data-prohibitions": "[editContent]",
											value: correctionName,
											onChange: (e) => setCorrectionName(e.target.value),
											className: "h-8 text-xs"
										})]
									}),
									viewItem.type === "contract" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:466:29",
										"data-prohibitions": "[]",
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/DocumentViewer.tsx:467:31",
											"data-prohibitions": "[]",
											className: "text-xs",
											children: "Nome do Locatário"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/DocumentViewer.tsx:468:31",
											"data-prohibitions": "[editContent]",
											value: correctionTenant,
											onChange: (e) => setCorrectionTenant(e.target.value),
											className: "h-8 text-xs"
										})]
									}),
									viewItem.type === "document" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/DocumentViewer.tsx:477:29",
										"data-prohibitions": "[]",
										className: "space-y-1.5 pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											"data-uid": "src/components/DocumentViewer.tsx:478:31",
											"data-prohibitions": "[]",
											className: "text-xs text-muted-foreground flex justify-between",
											children: ["Substituir Arquivo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/DocumentViewer.tsx:479:52",
												"data-prohibitions": "[]",
												className: "font-normal",
												children: "(Opcional)"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/DocumentViewer.tsx:481:31",
											"data-prohibitions": "[editContent]",
											type: "file",
											onChange: (e) => setCorrectionFile(e.target.files?.[0] || null),
											className: "h-8 text-xs cursor-pointer"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/components/DocumentViewer.tsx:489:27",
										"data-prohibitions": "[editContent]",
										onClick: handleResolveWithCorrections,
										disabled: savingNotes,
										size: "sm",
										className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-4",
										children: [savingNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/DocumentViewer.tsx:496:31",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2 animate-spin"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											"data-uid": "src/components/DocumentViewer.tsx:498:31",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}), "Salvar e Marcar Resolvido"]
									})
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:505:23",
							"data-prohibitions": "[]",
							className: "text-center p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"data-uid": "src/components/DocumentViewer.tsx:506:25",
								"data-prohibitions": "[editContent]",
								className: "w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-50"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/DocumentViewer.tsx:507:25",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Nenhuma pendência registrada para este documento."
							})]
						}) })
					})]
				})]
			})]
		})
	});
}
//#endregion
export { MessageSquare as n, DocumentViewer as t };

//# sourceMappingURL=DocumentViewer-72sigYM6.js.map