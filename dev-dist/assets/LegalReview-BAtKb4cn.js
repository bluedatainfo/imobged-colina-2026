import "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as ExternalLink } from "./external-link-DaNlYeYS.js";
import { t as Button } from "./button-iQJzuPvV.js";
import { t as Badge } from "./index-DX3ovfar.js";
import { t as Card } from "./card-BhS_F8IN.js";
var Gavel = createLucideIcon("gavel", [
	["path", {
		d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381",
		key: "pgg06f"
	}],
	["path", {
		d: "m16 16 6-6",
		key: "vzrcl6"
	}],
	["path", {
		d: "m21.5 10.5-8-8",
		key: "a17d9x"
	}],
	["path", {
		d: "m8 8 6-6",
		key: "18bi4p"
	}],
	["path", {
		d: "m8.5 7.5 8 8",
		key: "1oyaui"
	}]
]);
//#endregion
//#region src/lib/data.ts
var mockLegalCases = [
	{
		id: "LEG-001",
		tenant: "Maria Souza",
		property: "Casa Jardim (ID: 103)",
		issue: "Inadimplência > 60 dias (Ação de Despejo)",
		status: "Notificação Enviada",
		priority: "Alta"
	},
	{
		id: "LEG-002",
		tenant: "Comercial Silva",
		property: "Loja Térreo (ID: 042)",
		issue: "Disputa de Danos Estruturais pós-vistoria",
		status: "Em Acordo",
		priority: "Média"
	},
	{
		id: "LEG-003",
		tenant: "Carlos Eduardo",
		property: "Apt 101 Bloco B (ID: 211)",
		issue: "Reclamação de Vizinhança / Quebra de Regras Condomínio",
		status: "Análise Inicial",
		priority: "Baixa"
	}
];
//#endregion
//#region src/pages/LegalReview.tsx
var import_jsx_runtime = require_jsx_runtime();
var LegalReview = () => {
	const { toast } = useToast();
	const handleAction = (id) => {
		toast({
			title: "Pasta Jurídica Acessada",
			description: `Redirecionando para a Lista de Casos no SharePoint Online (Caso: ${id}).`
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/LegalReview.tsx:19:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/LegalReview.tsx:20:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/LegalReview.tsx:21:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight",
				children: "Assuntos Jurídicos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/LegalReview.tsx:22:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "Gestão de disputas, ações de despejo e problemas legais com inquilinos."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/LegalReview.tsx:27:7",
			"data-prohibitions": "[editContent]",
			className: "grid gap-4",
			children: [mockLegalCases.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/LegalReview.tsx:29:11",
				"data-prohibitions": "[editContent]",
				className: "p-5 flex flex-col md:flex-row gap-6 items-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/LegalReview.tsx:30:13",
						"data-prohibitions": "[]",
						className: "bg-destructive/10 p-3 rounded-full shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, {
							"data-uid": "src/pages/LegalReview.tsx:31:15",
							"data-prohibitions": "[editContent]",
							className: "h-6 w-6 text-destructive"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/LegalReview.tsx:34:13",
						"data-prohibitions": "[editContent]",
						className: "flex-1 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/LegalReview.tsx:35:15",
							"data-prohibitions": "[editContent]",
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/LegalReview.tsx:36:17",
								"data-prohibitions": "[editContent]",
								className: "font-semibold text-xl",
								children: item.issue
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								"data-uid": "src/pages/LegalReview.tsx:37:17",
								"data-prohibitions": "[editContent]",
								variant: item.priority === "Alta" ? "destructive" : "secondary",
								className: "shrink-0",
								children: ["Prioridade: ", item.priority]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/LegalReview.tsx:45:15",
							"data-prohibitions": "[editContent]",
							className: "grid sm:grid-cols-2 gap-4 text-sm pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/LegalReview.tsx:46:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/LegalReview.tsx:47:19",
										"data-prohibitions": "[]",
										className: "text-muted-foreground mb-1",
										children: "Inquilino / Parte"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/LegalReview.tsx:48:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: item.tenant
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/LegalReview.tsx:50:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/LegalReview.tsx:51:19",
										"data-prohibitions": "[]",
										className: "text-muted-foreground mb-1",
										children: "Imóvel Referência"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/LegalReview.tsx:52:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: item.property
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/LegalReview.tsx:54:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/LegalReview.tsx:55:19",
										"data-prohibitions": "[]",
										className: "text-muted-foreground mb-1",
										children: "Status do Processo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-uid": "src/pages/LegalReview.tsx:56:19",
										"data-prohibitions": "[editContent]",
										variant: "outline",
										className: "border-primary/50 text-primary bg-primary/5",
										children: item.status
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/LegalReview.tsx:60:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/LegalReview.tsx:61:19",
										"data-prohibitions": "[]",
										className: "text-muted-foreground mb-1",
										children: "ID do Caso"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/LegalReview.tsx:62:19",
										"data-prohibitions": "[editContent]",
										className: "font-mono text-muted-foreground",
										children: item.id
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/LegalReview.tsx:67:13",
						"data-prohibitions": "[]",
						className: "w-full md:w-auto md:border-l md:pl-6 flex flex-col justify-center shrink-0 h-full gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/LegalReview.tsx:68:15",
							"data-prohibitions": "[]",
							onClick: () => handleAction(item.id),
							className: "w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								"data-uid": "src/pages/LegalReview.tsx:69:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 mr-2"
							}), "Acessar Autos"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/LegalReview.tsx:72:15",
							"data-prohibitions": "[]",
							variant: "outline",
							className: "w-full",
							children: "Atualizar Status"
						})]
					})
				]
			}, item.id)), mockLegalCases.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/LegalReview.tsx:80:11",
				"data-prohibitions": "[]",
				className: "p-12 text-center text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, {
					"data-uid": "src/pages/LegalReview.tsx:81:13",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/LegalReview.tsx:82:13",
					"data-prohibitions": "[]",
					children: "Nenhuma pendência jurídica registrada. Ótimo trabalho!"
				})]
			})]
		})]
	});
};
//#endregion
export { LegalReview as default };

//# sourceMappingURL=LegalReview-BAtKb4cn.js.map