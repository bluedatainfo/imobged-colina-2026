import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-BcW3sjWS.js";
import { t as cn } from "./utils-BNj1jY-i.js";
import { t as MapPin } from "./map-pin-BuAm7Ujq.js";
import { t as Button } from "./button-DZFv31v6.js";
import { H as User, X as LoaderCircle, q as Search, t as Badge, ut as Building } from "./index-CaUkkOnw.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DZXI3GJ_.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-D_NqDEL3.js";
import "./dialog-UuMTMCvH.js";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command } from "./command-pL-5JlM5.js";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-CWfuY6fo.js";
import { t as useDebounce } from "./use-debounce-DfJEOpWH.js";
//#region src/components/ui/use-toast.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region src/pages/Properties.tsx
var import_jsx_runtime = require_jsx_runtime();
function Properties() {
	const [search, setSearch] = (0, import_react.useState)("");
	const debouncedSearch = useDebounce(search, 400);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [options, setOptions] = (0, import_react.useState)([]);
	const [selectedProperty, setSelectedProperty] = (0, import_react.useState)(null);
	const [results, setResults] = (0, import_react.useState)([]);
	const [hasSearched, setHasSearched] = (0, import_react.useState)(false);
	const { toast } = useToast();
	const getOwnerName = (property) => {
		if (!property) return "Não informado";
		if (property.proprietario) return property.proprietario;
		if (property.Proprietario) return property.Proprietario;
		if (property.nomeProprietario) return property.nomeProprietario;
		if (property.proprietario_nome) return property.proprietario_nome;
		if (property.cliente) return property.cliente;
		if (property.ownerName) return property.ownerName;
		if (property.title) return property.title;
		if (property.proprietarios && Array.isArray(property.proprietarios) && property.proprietarios.length > 0) return property.proprietarios[0].nome;
		return "Proprietário não informado";
	};
	const getAddress = (property) => {
		if (!property) return "Endereço não informado";
		const parts = [];
		if (property.endereco) parts.push(property.endereco);
		if (property.numero) parts.push(property.numero);
		if (property.bairro) parts.push(property.bairro);
		if (property.cidade) parts.push(property.cidade);
		if (property.uf) parts.push(property.uf);
		return parts.length > 0 ? parts.join(", ") : "Endereço não informado";
	};
	(0, import_react.useEffect)(() => {
		if (!debouncedSearch.trim()) {
			setOptions([]);
			return;
		}
		let isMounted = true;
		const fetchOptions = async () => {
			setLoading(true);
			try {
				const res = await fetch(`http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(debouncedSearch)}`);
				if (!res.ok) throw new Error("Erro na comunicação com o servidor local");
				const data = await res.json();
				if (isMounted) setOptions((Array.isArray(data) ? data : [data]).filter((item) => item && item.id));
			} catch (err) {
				console.error(err);
				if (isMounted) setOptions([]);
			} finally {
				if (isMounted) setLoading(false);
			}
		};
		fetchOptions();
		return () => {
			isMounted = false;
		};
	}, [debouncedSearch]);
	const handleManualSearch = async (e) => {
		if (e) e.preventDefault();
		if (!search.trim()) return;
		setLoading(true);
		setHasSearched(true);
		setOpen(false);
		try {
			const res = await fetch(`http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(search)}`);
			if (!res.ok) throw new Error("Erro na comunicação com o servidor local");
			const data = await res.json();
			setResults((Array.isArray(data) ? data : [data]).filter((item) => item && item.id));
		} catch (err) {
			console.error(err);
			toast({
				title: "Erro na busca",
				description: "Não foi possível buscar os imóveis. Verifique a conexão com o servidor local (192.168.10.225) e as políticas de CORS.",
				variant: "destructive"
			});
			setResults([]);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Properties.tsx:165:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:166:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/Properties.tsx:167:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight",
					children: "Imóveis"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Properties.tsx:168:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Consulta em tempo real de imóveis integrados ao servidor local."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Properties.tsx:173:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/Properties.tsx:174:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/Properties.tsx:175:11",
						"data-prohibitions": "[]",
						children: "Buscar Imóveis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/Properties.tsx:176:11",
						"data-prohibitions": "[]",
						children: "Pesquise pelo nome do proprietário para localizar e visualizar informações detalhadas do imóvel."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/Properties.tsx:181:9",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Properties.tsx:182:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full max-w-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
							"data-uid": "src/pages/Properties.tsx:183:13",
							"data-prohibitions": "[editContent]",
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								"data-uid": "src/pages/Properties.tsx:184:15",
								"data-prohibitions": "[editContent]",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/Properties.tsx:185:17",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									role: "combobox",
									"aria-expanded": open,
									className: "flex-1 justify-between h-12 text-base font-normal bg-background w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Properties.tsx:191:19",
										"data-prohibitions": "[editContent]",
										className: cn("truncate", !search && !selectedProperty && "text-muted-foreground"),
										children: selectedProperty ? `${selectedProperty.id} - ${getOwnerName(selectedProperty)}` : search || "Selecione ou busque o imóvel no servidor..."
									}), loading && !open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										"data-uid": "src/pages/Properties.tsx:202:21",
										"data-prohibitions": "[editContent]",
										className: "ml-2 h-4 w-4 shrink-0 animate-spin opacity-50"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										"data-uid": "src/pages/Properties.tsx:204:21",
										"data-prohibitions": "[editContent]",
										className: "ml-2 h-4 w-4 shrink-0 opacity-50"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								"data-uid": "src/pages/Properties.tsx:208:15",
								"data-prohibitions": "[editContent]",
								className: "w-[var(--radix-popover-trigger-width)] p-0",
								align: "start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
									"data-uid": "src/pages/Properties.tsx:209:17",
									"data-prohibitions": "[editContent]",
									shouldFilter: false,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
										"data-uid": "src/pages/Properties.tsx:210:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Digite o nome do proprietário (ex: MARAM)...",
										value: search,
										onValueChange: (val) => {
											setSearch(val);
											setSelectedProperty(null);
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
										"data-uid": "src/pages/Properties.tsx:218:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
											"data-uid": "src/pages/Properties.tsx:219:21",
											"data-prohibitions": "[editContent]",
											className: "py-6 text-center text-sm",
											children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Properties.tsx:221:25",
												"data-prohibitions": "[]",
												className: "flex items-center justify-center gap-2 text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
													"data-uid": "src/pages/Properties.tsx:222:27",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4 animate-spin"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Properties.tsx:223:27",
													"data-prohibitions": "[]",
													children: "Buscando no servidor local..."
												})]
											}) : debouncedSearch.trim().length > 0 ? "Nenhum imóvel encontrado." : "Digite para começar a buscar."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
											"data-uid": "src/pages/Properties.tsx:231:21",
											"data-prohibitions": "[editContent]",
											children: options.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
												"data-uid": "src/pages/Properties.tsx:233:25",
												"data-prohibitions": "[editContent]",
												value: String(property.id),
												onSelect: () => {
													setSearch(getOwnerName(property));
													setSelectedProperty(property);
													setResults([property]);
													setHasSearched(true);
													setOpen(false);
												},
												className: "flex flex-col items-start py-3 px-4 gap-1.5 cursor-pointer border-b border-border/40 last:border-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													"data-uid": "src/pages/Properties.tsx:245:27",
													"data-prohibitions": "[editContent]",
													className: "flex items-center gap-2 w-full",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														"data-uid": "src/pages/Properties.tsx:246:29",
														"data-prohibitions": "[editContent]",
														className: "font-medium text-sm truncate text-foreground",
														children: [
															property.id,
															" - ",
															getOwnerName(property)
														]
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/Properties.tsx:250:27",
													"data-prohibitions": "[editContent]",
													className: "flex items-center text-xs text-muted-foreground gap-1.5 w-full",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
														"data-uid": "src/pages/Properties.tsx:251:29",
														"data-prohibitions": "[editContent]",
														className: "w-3.5 h-3.5 shrink-0 opacity-70"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/Properties.tsx:252:29",
														"data-prohibitions": "[editContent]",
														className: "truncate",
														children: getAddress(property)
													})]
												})]
											}, property.id))
										})]
									})]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Properties.tsx:262:13",
							"data-prohibitions": "[editContent]",
							onClick: handleManualSearch,
							disabled: loading || !search.trim(),
							className: "h-12 px-6 w-full sm:w-auto",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/pages/Properties.tsx:267:26",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 animate-spin"
							}) : "Buscar"
						})]
					})
				})]
			}),
			hasSearched && !loading && results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:274:9",
				"data-prohibitions": "[]",
				className: "py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-border/60 rounded-xl bg-background/50 animate-in fade-in zoom-in duration-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
						"data-uid": "src/pages/Properties.tsx:275:11",
						"data-prohibitions": "[editContent]",
						className: "w-12 h-12 mb-4 text-muted-foreground/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/Properties.tsx:276:11",
						"data-prohibitions": "[]",
						className: "text-lg font-medium text-foreground",
						children: "Nenhum imóvel encontrado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Properties.tsx:277:11",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground mt-1 max-w-sm",
						children: "Não encontramos nenhum imóvel vinculado à pesquisa no servidor local."
					})
				]
			}),
			results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/Properties.tsx:284:9",
				"data-prohibitions": "[editContent]",
				className: "animate-in fade-in slide-in-from-bottom-4 duration-500",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Properties.tsx:285:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-md border border-border/50 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/Properties.tsx:286:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/Properties.tsx:287:15",
							"data-prohibitions": "[]",
							className: "bg-muted/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Properties.tsx:288:17",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Properties.tsx:289:19",
										"data-prohibitions": "[]",
										className: "w-[100px]",
										children: "ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Properties.tsx:290:19",
										"data-prohibitions": "[]",
										children: "Tipo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Properties.tsx:291:19",
										"data-prohibitions": "[]",
										children: "Endereço"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Properties.tsx:292:19",
										"data-prohibitions": "[]",
										children: "Bairro / Cidade"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Properties.tsx:293:19",
										"data-prohibitions": "[]",
										children: "Proprietário Principal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Properties.tsx:294:19",
										"data-prohibitions": "[]",
										children: "Serviços"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
							"data-uid": "src/pages/Properties.tsx:297:15",
							"data-prohibitions": "[editContent]",
							children: results.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Properties.tsx:299:19",
								"data-prohibitions": "[editContent]",
								className: "hover:bg-muted/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										"data-uid": "src/pages/Properties.tsx:300:21",
										"data-prohibitions": "[editContent]",
										className: "font-medium text-xs",
										children: ["#", property.id]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Properties.tsx:301:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/Properties.tsx:302:23",
											"data-prohibitions": "[editContent]",
											variant: "outline",
											className: "font-normal bg-background",
											children: property.tipo || "N/A"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Properties.tsx:306:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Properties.tsx:307:23",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Properties.tsx:308:25",
												"data-prohibitions": "[editContent]",
												className: "text-sm font-medium",
												children: [property.endereco || "Endereço não informado", property.numero ? `, ${property.numero}` : ""]
											}), property.complemento && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Properties.tsx:313:27",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground",
												children: property.complemento
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Properties.tsx:319:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Properties.tsx:320:23",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Properties.tsx:321:25",
												"data-prohibitions": "[editContent]",
												className: "text-sm",
												children: property.bairro || "-"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Properties.tsx:322:25",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground",
												children: [
													property.cidade || "-",
													" ",
													property.uf ? `/ ${property.uf}` : ""
												]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Properties.tsx:327:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Properties.tsx:328:23",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
												"data-uid": "src/pages/Properties.tsx:329:25",
												"data-prohibitions": "[editContent]",
												className: "w-3.5 h-3.5 text-muted-foreground shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Properties.tsx:330:25",
												"data-prohibitions": "[editContent]",
												className: "text-sm line-clamp-1 max-w-[200px] font-medium",
												title: getOwnerName(property),
												children: getOwnerName(property)
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Properties.tsx:338:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Properties.tsx:339:23",
											"data-prohibitions": "[editContent]",
											className: "flex flex-wrap gap-1",
											children: property.servicos && Array.isArray(property.servicos) && property.servicos.length > 0 ? property.servicos.map((serv, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Properties.tsx:344:29",
												"data-prohibitions": "[editContent]",
												variant: "secondary",
												className: "text-[10px] px-1.5 py-0 h-5",
												children: serv.descricao
											}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Properties.tsx:353:27",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground",
												children: "-"
											})
										})
									})
								]
							}, property.id))
						})]
					})
				})
			})
		]
	});
}
//#endregion
export { Properties as default };

//# sourceMappingURL=Properties-AG4IS-2d.js.map