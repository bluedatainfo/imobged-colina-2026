import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as Download } from "./download-CniIqshG.js";
import { t as Button } from "./button-iQJzuPvV.js";
import { i as useMainStore } from "./main-hJg_QSvb.js";
import { $ as FileText } from "./index-BW3heAR8.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CaSkqyNZ.js";
var Share2 = createLucideIcon("share-2", [
	["circle", {
		cx: "18",
		cy: "5",
		r: "3",
		key: "gq8acd"
	}],
	["circle", {
		cx: "6",
		cy: "12",
		r: "3",
		key: "w7nqdw"
	}],
	["circle", {
		cx: "18",
		cy: "19",
		r: "3",
		key: "1xt0gg"
	}],
	["line", {
		x1: "8.59",
		x2: "15.42",
		y1: "13.51",
		y2: "17.49",
		key: "47mynk"
	}],
	["line", {
		x1: "15.41",
		x2: "8.59",
		y1: "6.51",
		y2: "10.49",
		key: "1n3mei"
	}]
]);
//#endregion
//#region src/components/DocumentViewer.tsx
var import_jsx_runtime = require_jsx_runtime();
function DocumentViewer({ open, onClose, docName, isTerm }) {
	const { agencyProfile } = useMainStore();
	if (!docName) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/DocumentViewer.tsx:25:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/DocumentViewer.tsx:26:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-5xl h-[85vh] flex flex-col p-0 overflow-hidden bg-muted/30",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/DocumentViewer.tsx:27:9",
				"data-prohibitions": "[editContent]",
				className: "p-4 border-b bg-background flex flex-row items-center justify-between shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:28:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/DocumentViewer.tsx:29:13",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/components/DocumentViewer.tsx:30:15",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-blue-600"
						}), docName]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/DocumentViewer.tsx:33:13",
						"data-prohibitions": "[]",
						children: "Visualização nativa via SharePoint Online (Modo Leitura)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:37:11",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2 mr-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/DocumentViewer.tsx:38:13",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "sm",
						className: "hidden sm:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
							"data-uid": "src/components/DocumentViewer.tsx:39:15",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Compartilhar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/DocumentViewer.tsx:41:13",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"data-uid": "src/components/DocumentViewer.tsx:42:15",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Baixar"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/DocumentViewer.tsx:46:9",
				"data-prohibitions": "[editContent]",
				className: "flex-1 overflow-y-auto p-4 md:p-8 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/DocumentViewer.tsx:47:11",
					"data-prohibitions": "[editContent]",
					className: "bg-background shadow-lg border p-10 md:p-16 w-full max-w-3xl min-h-full flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:48:13",
							"data-prohibitions": "[editContent]",
							className: "text-center mb-10 border-b pb-8",
							children: [
								agencyProfile.logo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									"data-uid": "src/components/DocumentViewer.tsx:50:17",
									"data-prohibitions": "[editContent]",
									src: agencyProfile.logo,
									alt: "Logo",
									className: "h-20 mx-auto mb-6 object-contain"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									"data-uid": "src/components/DocumentViewer.tsx:56:15",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold uppercase underline",
									children: isTerm ? "Termo de Responsabilidade" : "Contrato de Locação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:59:15",
									"data-prohibitions": "[editContent]",
									className: "text-muted-foreground mt-4 font-semibold",
									children: agencyProfile.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:60:15",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:64:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-6 text-sm text-foreground/90 text-justify leading-relaxed flex-1",
							children: [isTerm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/DocumentViewer.tsx:67:19",
								"data-prohibitions": "[]",
								children: "Declaro para os devidos fins que recebi/entreguei as chaves referentes ao imóvel situado no endereço supracitado, em plenas condições de acordo com o processo em vigência."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/components/DocumentViewer.tsx:72:19",
								"data-prohibitions": "[editContent]",
								children: [
									"O presente termo isenta ou responsabiliza a parte envolvida com base na vistoria anexada aos autos, em conformidade com as políticas internas da",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/DocumentViewer.tsx:75:21",
										"data-prohibitions": "[editContent]",
										children: agencyProfile.name
									}),
									"."
								]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:80:19",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/DocumentViewer.tsx:81:21",
										"data-prohibitions": "[]",
										children: "CLÁUSULA PRIMEIRA - DO OBJETO:"
									}), " O objeto do presente contrato é a locação do imóvel residencial situado no endereço qualificado nos anexos deste instrumento, em perfeitas condições de uso, conforme laudo de vistoria."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:85:19",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/DocumentViewer.tsx:86:21",
										"data-prohibitions": "[]",
										children: "CLÁUSULA SEGUNDA - DO PRAZO:"
									}), " O prazo da locação é de 30 (trinta) meses, iniciando-se na data da assinatura digital e encerrando-se na mesma data de vencimento no ano correspondente."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:90:19",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/DocumentViewer.tsx:91:21",
										"data-prohibitions": "[]",
										children: "CLÁUSULA TERCEIRA - DO VALOR DO ALUGUEL:"
									}), " O valor mensal da locação fica estabelecido no quadro resumo, reajustado anualmente pelo índice IGPM/FGV ou IPCA, de acordo com o que for mais favorável."]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/DocumentViewer.tsx:97:15",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground italic mt-8",
								children: "Este documento é uma representação de leitura renderizada diretamente da biblioteca do SharePoint. Para edições, utilize o botão \"Editar no Word Online\"."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/DocumentViewer.tsx:102:13",
							"data-prohibitions": "[editContent]",
							className: "mt-16 pt-8 flex justify-between px-8 opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:103:15",
								"data-prohibitions": "[editContent]",
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/DocumentViewer.tsx:104:17",
									"data-prohibitions": "[]",
									className: "w-48 border-b border-foreground/50 mb-2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:105:17",
									"data-prohibitions": "[editContent]",
									className: "text-xs",
									children: isTerm ? "Assinatura Responsável" : "Locador"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/DocumentViewer.tsx:107:15",
								"data-prohibitions": "[editContent]",
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/DocumentViewer.tsx:108:17",
									"data-prohibitions": "[]",
									className: "w-48 border-b border-foreground/50 mb-2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/DocumentViewer.tsx:109:17",
									"data-prohibitions": "[editContent]",
									className: "text-xs",
									children: isTerm ? "Assinatura Cliente" : "Locatário"
								})]
							})]
						})
					]
				})
			})]
		})
	});
}
//#endregion
export { DocumentViewer as t };

//# sourceMappingURL=DocumentViewer-gdi-gnky.js.map