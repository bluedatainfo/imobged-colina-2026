import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { t as Building2 } from "./building-2-BtLCLCIM.js";
import { t as ExternalLink } from "./external-link-BNMSOXbU.js";
import { t as MapPin } from "./map-pin-BuAm7Ujq.js";
import { t as Save } from "./save-Cp-1wfwi.js";
import { t as Button } from "./button-DZFv31v6.js";
import "./client-DbPPqM1c.js";
import { i as useMainStore, r as mainStore } from "./main-FhYiC5OQ.js";
import { j as Input, mt as Link$1 } from "./index-BCUUWpkN.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DZXI3GJ_.js";
import { t as Label } from "./label-CZKY3LJi.js";
var Link = createLucideIcon("link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]);
var Palette = createLucideIcon("palette", [
	["path", {
		d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
		key: "e79jfc"
	}],
	["circle", {
		cx: "13.5",
		cy: "6.5",
		r: ".5",
		fill: "currentColor",
		key: "1okk4w"
	}],
	["circle", {
		cx: "17.5",
		cy: "10.5",
		r: ".5",
		fill: "currentColor",
		key: "f64h9f"
	}],
	["circle", {
		cx: "6.5",
		cy: "12.5",
		r: ".5",
		fill: "currentColor",
		key: "qy21gx"
	}],
	["circle", {
		cx: "8.5",
		cy: "7.5",
		r: ".5",
		fill: "currentColor",
		key: "fotxhn"
	}]
]);
//#endregion
//#region src/components/settings/AgencySettings.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AgencySettings() {
	const { toast } = useToast();
	const [formData, setFormData] = (0, import_react.useState)(useMainStore().agencyProfile);
	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}));
	};
	const handleSave = () => {
		mainStore.updateAgencyProfile(formData);
		toast({
			title: "Perfil Salvo",
			description: "Os dados da imobiliária foram atualizados com sucesso."
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/settings/AgencySettings.tsx:36:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/components/settings/AgencySettings.tsx:37:7",
			"data-prohibitions": "[editContent]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/components/settings/AgencySettings.tsx:38:9",
					"data-prohibitions": "[]",
					className: "flex flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/settings/AgencySettings.tsx:39:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							"data-uid": "src/components/settings/AgencySettings.tsx:40:13",
							"data-prohibitions": "[]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
								"data-uid": "src/components/settings/AgencySettings.tsx:41:15",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-primary"
							}), " Identidade Visual e Dados"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							"data-uid": "src/components/settings/AgencySettings.tsx:43:13",
							"data-prohibitions": "[]",
							children: "Configure a marca e as informações oficiais da imobiliária para o Portal White-Label e documentos."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/settings/AgencySettings.tsx:48:11",
						"data-prohibitions": "[]",
						variant: "outline",
						asChild: true,
						className: "gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							"data-uid": "src/components/settings/AgencySettings.tsx:49:13",
							"data-prohibitions": "[]",
							target: "_blank",
							to: "/portal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								"data-uid": "src/components/settings/AgencySettings.tsx:50:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), " Ver Portal do Cliente"]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/components/settings/AgencySettings.tsx:54:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/settings/AgencySettings.tsx:55:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col sm:flex-row items-start gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/settings/AgencySettings.tsx:56:13",
							"data-prohibitions": "[editContent]",
							className: "w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50 overflow-hidden shrink-0 relative",
							style: { backgroundColor: `${formData.primaryColor}10` },
							children: formData.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								"data-uid": "src/components/settings/AgencySettings.tsx:61:17",
								"data-prohibitions": "[editContent]",
								src: formData.logo,
								alt: "Logo Preview",
								className: "w-full h-full object-contain p-2"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/settings/AgencySettings.tsx:67:17",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground text-center p-2",
								children: "Sem Logo"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/settings/AgencySettings.tsx:70:13",
							"data-prohibitions": "[]",
							className: "flex-1 space-y-4 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/AgencySettings.tsx:71:15",
								"data-prohibitions": "[]",
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/settings/AgencySettings.tsx:72:17",
									"data-prohibitions": "[]",
									children: "URL da Logomarca"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/components/settings/AgencySettings.tsx:73:17",
									"data-prohibitions": "[editContent]",
									placeholder: "https://exemplo.com/logo.png",
									value: formData.logo,
									onChange: (e) => handleChange("logo", e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/AgencySettings.tsx:79:15",
								"data-prohibitions": "[]",
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/settings/AgencySettings.tsx:80:17",
									"data-prohibitions": "[]",
									children: "Razão Social / Nome Fantasia"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/components/settings/AgencySettings.tsx:81:17",
									"data-prohibitions": "[editContent]",
									value: formData.name,
									onChange: (e) => handleChange("name", e.target.value)
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/settings/AgencySettings.tsx:89:11",
						"data-prohibitions": "[]",
						className: "grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/AgencySettings.tsx:90:13",
								"data-prohibitions": "[]",
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/settings/AgencySettings.tsx:91:15",
									"data-prohibitions": "[]",
									children: "Endereço Completo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/settings/AgencySettings.tsx:92:15",
									"data-prohibitions": "[]",
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
										"data-uid": "src/components/settings/AgencySettings.tsx:93:17",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5 text-muted-foreground mt-2 shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/AgencySettings.tsx:94:17",
										"data-prohibitions": "[editContent]",
										value: formData.address,
										onChange: (e) => handleChange("address", e.target.value)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/AgencySettings.tsx:100:13",
								"data-prohibitions": "[]",
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/settings/AgencySettings.tsx:101:15",
									"data-prohibitions": "[]",
									children: "Website Oficial"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/settings/AgencySettings.tsx:102:15",
									"data-prohibitions": "[]",
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										"data-uid": "src/components/settings/AgencySettings.tsx:103:17",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5 text-muted-foreground mt-2 shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/settings/AgencySettings.tsx:104:17",
										"data-prohibitions": "[editContent]",
										value: formData.website,
										onChange: (e) => handleChange("website", e.target.value)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/settings/AgencySettings.tsx:110:13",
								"data-prohibitions": "[]",
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/settings/AgencySettings.tsx:111:15",
									"data-prohibitions": "[]",
									children: "Cor Primária (Portal White-Label)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/settings/AgencySettings.tsx:112:15",
									"data-prohibitions": "[]",
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, {
										"data-uid": "src/components/settings/AgencySettings.tsx:113:17",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5 text-muted-foreground mt-2 shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/settings/AgencySettings.tsx:114:17",
										"data-prohibitions": "[]",
										className: "flex w-full gap-2 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/settings/AgencySettings.tsx:115:19",
											"data-prohibitions": "[editContent]",
											type: "color",
											value: formData.primaryColor,
											onChange: (e) => handleChange("primaryColor", e.target.value),
											className: "w-14 h-10 p-1 cursor-pointer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/settings/AgencySettings.tsx:121:19",
											"data-prohibitions": "[editContent]",
											value: formData.primaryColor,
											onChange: (e) => handleChange("primaryColor", e.target.value),
											className: "flex-1 font-mono uppercase"
										})]
									})]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
					"data-uid": "src/components/settings/AgencySettings.tsx:131:9",
					"data-prohibitions": "[]",
					className: "bg-muted/50 py-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/settings/AgencySettings.tsx:132:11",
						"data-prohibitions": "[]",
						onClick: handleSave,
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
							"data-uid": "src/components/settings/AgencySettings.tsx:133:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						}), " Salvar Perfil"]
					})
				})
			]
		})
	});
}
//#endregion
export { AgencySettings as default };

//# sourceMappingURL=AgencySettings-fG-bhjNu.js.map