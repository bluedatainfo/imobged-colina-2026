import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { t as toast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-BcW3sjWS.js";
import { n as createLucideIcon } from "./utils-BNj1jY-i.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-2PYY5iOA.js";
import { t as Button } from "./button-DZFv31v6.js";
import { t as supabase } from "./client-DbPPqM1c.js";
import "./main-PEgqdb3P.js";
import { X as LoaderCircle, rt as FileText } from "./index-CWbte8-3.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DZXI3GJ_.js";
import { t as Label } from "./label-CZKY3LJi.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CjjTCgCZ.js";
import { n as m365Service } from "./m365-1ewh7-SC.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BRTTHT2G.js";
var FileSpreadsheet = createLucideIcon("file-spreadsheet", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M8 13h2",
		key: "yr2amv"
	}],
	["path", {
		d: "M14 13h2",
		key: "un5t4a"
	}],
	["path", {
		d: "M8 17h2",
		key: "2yhykz"
	}],
	["path", {
		d: "M14 17h2",
		key: "10kma7"
	}]
]);
//#endregion
//#region src/pages/AdditionalDocuments.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AdditionalDocuments() {
	const [templates, setTemplates] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedTemplate, setSelectedTemplate] = (0, import_react.useState)(null);
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [contextType, setContextType] = (0, import_react.useState)("interested");
	const [selectedEntityId, setSelectedEntityId] = (0, import_react.useState)("");
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const [interestedList, setInterestedList] = (0, import_react.useState)([]);
	const [propertiesList, setPropertiesList] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				let spTemplates = await m365Service.listTemplates();
				if (!spTemplates || spTemplates.length === 0) spTemplates = [
					{
						id: "1",
						name: "CONTRATO PRESTAÇÃO SERVIÇO.docx",
						type: "word",
						webUrl: "#"
					},
					{
						id: "2",
						name: "CHECKLIST.xlsx",
						type: "excel",
						webUrl: "#"
					},
					{
						id: "3",
						name: "TERMO DE VISTORIA.docx",
						type: "word",
						webUrl: "#"
					}
				];
				setTemplates(spTemplates);
				const [interRes, propRes] = await Promise.all([supabase.from("pre_registrations").select("id, full_name, code").order("created_at", { ascending: false }).limit(50), supabase.from("properties").select("id, title, address").order("created_at", { ascending: false }).limit(50)]);
				if (interRes.data) setInterestedList(interRes.data);
				if (propRes.data) setPropertiesList(propRes.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	const handleOpenDialog = (template) => {
		setSelectedTemplate(template);
		setSelectedEntityId("");
		setDialogOpen(true);
	};
	const handleGenerate = async () => {
		if (!selectedEntityId) {
			toast({
				variant: "destructive",
				title: "Atenção",
				description: "Selecione um registro de destino."
			});
			return;
		}
		setProcessing(true);
		try {
			let entityName = "";
			if (contextType === "interested") entityName = interestedList.find((i) => i.id === selectedEntityId)?.full_name || "Interessado";
			else entityName = propertiesList.find((i) => i.id === selectedEntityId)?.title || "Imóvel";
			await m365Service.copyTemplateToEntity(selectedTemplate, contextType, selectedEntityId, entityName);
			setDialogOpen(false);
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro",
				description: e.message
			});
		} finally {
			setProcessing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/AdditionalDocuments.tsx:122:5",
		"data-prohibitions": "[editContent]",
		className: "flex-1 space-y-4 p-4 md:p-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/AdditionalDocuments.tsx:123:7",
				"data-prohibitions": "[]",
				className: "flex items-center justify-between space-y-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/AdditionalDocuments.tsx:124:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-primary",
					children: "Documentos Adicionais"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/AdditionalDocuments.tsx:127:7",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "Selecione um modelo do SharePoint para gerar e preencher documentos vinculados a um Interessado ou Imóvel."
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/AdditionalDocuments.tsx:133:9",
				"data-prohibitions": "[]",
				className: "flex items-center justify-center h-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/pages/AdditionalDocuments.tsx:134:11",
					"data-prohibitions": "[editContent]",
					className: "h-8 w-8 animate-spin text-primary"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/AdditionalDocuments.tsx:137:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4",
				children: templates.map((template) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/AdditionalDocuments.tsx:139:13",
					"data-prohibitions": "[editContent]",
					className: "cursor-pointer hover:border-primary transition-colors",
					onClick: () => handleOpenDialog(template),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/AdditionalDocuments.tsx:144:15",
						"data-prohibitions": "[editContent]",
						className: "flex flex-row items-center justify-between pb-2 space-y-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:145:17",
							"data-prohibitions": "[editContent]",
							className: "text-sm font-medium line-clamp-2",
							title: template.name,
							children: template.name
						}), template.name.toLowerCase().endsWith("xlsx") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:149:19",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 text-green-600 shrink-0"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:151:19",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 text-blue-600 shrink-0"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/AdditionalDocuments.tsx:154:15",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:155:17",
							"data-prohibitions": "[]",
							children: "Clique para gerar e preencher este documento."
						})
					})]
				}, template.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/AdditionalDocuments.tsx:162:7",
				"data-prohibitions": "[editContent]",
				open: dialogOpen,
				onOpenChange: setDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/AdditionalDocuments.tsx:163:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-[425px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:164:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/AdditionalDocuments.tsx:165:13",
								"data-prohibitions": "[]",
								children: "Gerar Documento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
								"data-uid": "src/pages/AdditionalDocuments.tsx:166:13",
								"data-prohibitions": "[editContent]",
								children: [
									"Modelo selecionado:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/AdditionalDocuments.tsx:168:15",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-primary",
										children: selectedTemplate?.name
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/AdditionalDocuments.tsx:172:11",
							"data-prohibitions": "[editContent]",
							className: "py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
								"data-uid": "src/pages/AdditionalDocuments.tsx:173:13",
								"data-prohibitions": "[editContent]",
								value: contextType,
								onValueChange: (v) => {
									setContextType(v);
									setSelectedEntityId("");
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
										"data-uid": "src/pages/AdditionalDocuments.tsx:180:15",
										"data-prohibitions": "[]",
										className: "grid w-full grid-cols-2 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											"data-uid": "src/pages/AdditionalDocuments.tsx:181:17",
											"data-prohibitions": "[]",
											value: "interested",
											children: "Interessado"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											"data-uid": "src/pages/AdditionalDocuments.tsx:182:17",
											"data-prohibitions": "[]",
											value: "property",
											children: "Imóvel / Contrato"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										"data-uid": "src/pages/AdditionalDocuments.tsx:185:15",
										"data-prohibitions": "[editContent]",
										value: "interested",
										className: "space-y-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/AdditionalDocuments.tsx:186:17",
											"data-prohibitions": "[editContent]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/AdditionalDocuments.tsx:187:19",
												"data-prohibitions": "[]",
												children: "Selecione o Interessado"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/AdditionalDocuments.tsx:188:19",
												"data-prohibitions": "[editContent]",
												value: selectedEntityId,
												onValueChange: setSelectedEntityId,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/AdditionalDocuments.tsx:189:21",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/AdditionalDocuments.tsx:190:23",
														"data-prohibitions": "[editContent]",
														placeholder: "Busque um interessado..."
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/AdditionalDocuments.tsx:192:21",
													"data-prohibitions": "[editContent]",
													children: [interestedList.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
														"data-uid": "src/pages/AdditionalDocuments.tsx:194:25",
														"data-prohibitions": "[editContent]",
														value: item.id,
														children: [
															item.code,
															" - ",
															item.full_name
														]
													}, item.id)), interestedList.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														"data-uid": "src/pages/AdditionalDocuments.tsx:199:25",
														"data-prohibitions": "[]",
														className: "p-2 text-sm text-muted-foreground text-center",
														children: "Nenhum interessado encontrado."
													})]
												})]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										"data-uid": "src/pages/AdditionalDocuments.tsx:208:15",
										"data-prohibitions": "[editContent]",
										value: "property",
										className: "space-y-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/AdditionalDocuments.tsx:209:17",
											"data-prohibitions": "[editContent]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/AdditionalDocuments.tsx:210:19",
												"data-prohibitions": "[]",
												children: "Selecione o Imóvel"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/AdditionalDocuments.tsx:211:19",
												"data-prohibitions": "[editContent]",
												value: selectedEntityId,
												onValueChange: setSelectedEntityId,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/AdditionalDocuments.tsx:212:21",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/AdditionalDocuments.tsx:213:23",
														"data-prohibitions": "[editContent]",
														placeholder: "Busque um imóvel..."
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/AdditionalDocuments.tsx:215:21",
													"data-prohibitions": "[editContent]",
													children: [propertiesList.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
														"data-uid": "src/pages/AdditionalDocuments.tsx:217:25",
														"data-prohibitions": "[editContent]",
														value: item.id,
														children: [
															item.title,
															" (",
															item.address,
															")"
														]
													}, item.id)), propertiesList.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														"data-uid": "src/pages/AdditionalDocuments.tsx:222:25",
														"data-prohibitions": "[]",
														className: "p-2 text-sm text-muted-foreground text-center",
														children: "Nenhum imóvel encontrado."
													})]
												})]
											})]
										})
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/AdditionalDocuments.tsx:233:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/AdditionalDocuments.tsx:234:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setDialogOpen(false),
								disabled: processing,
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/AdditionalDocuments.tsx:237:13",
								"data-prohibitions": "[editContent]",
								onClick: handleGenerate,
								disabled: processing || !selectedEntityId,
								children: [processing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/AdditionalDocuments.tsx:238:30",
									"data-prohibitions": "[editContent]",
									className: "mr-2 h-4 w-4 animate-spin"
								}), "Gerar e Preencher"]
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { AdditionalDocuments as default };

//# sourceMappingURL=AdditionalDocuments-DSc6zE8C.js.map