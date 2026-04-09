import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import { H as User, X as LoaderCircle, j as Input, q as Search, t as Badge, ut as Building } from "./index-DTZyCzJT.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CcQxuH73.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CV-6f29o.js";
//#region src/components/ui/use-toast.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region src/pages/Properties.tsx
var import_jsx_runtime = require_jsx_runtime();
function Properties() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [results, setResults] = (0, import_react.useState)([]);
	const [hasSearched, setHasSearched] = (0, import_react.useState)(false);
	const { toast } = useToast();
	const handleSearch = async (e) => {
		if (e) e.preventDefault();
		if (!search.trim()) return;
		setLoading(true);
		setHasSearched(true);
		try {
			const res = await fetch(`http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(search)}`);
			if (!res.ok) throw new Error("Erro na comunicação com o servidor local");
			const data = await res.json();
			setResults(Array.isArray(data) ? data : [data]);
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
		"data-uid": "src/pages/Properties.tsx:75:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:76:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/Properties.tsx:77:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight",
					children: "Imóveis"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Properties.tsx:78:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Consulta em tempo real de imóveis integrados ao servidor local."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Properties.tsx:83:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/Properties.tsx:84:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/Properties.tsx:85:11",
						"data-prohibitions": "[]",
						children: "Buscar Imóveis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/Properties.tsx:86:11",
						"data-prohibitions": "[]",
						children: "Pesquise pelo nome do proprietário para listar os imóveis vinculados a ele."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/Properties.tsx:90:9",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						"data-uid": "src/pages/Properties.tsx:91:11",
						"data-prohibitions": "[editContent]",
						onSubmit: handleSearch,
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Properties.tsx:92:13",
							"data-prohibitions": "[]",
							className: "relative flex-1 max-w-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"data-uid": "src/pages/Properties.tsx:93:15",
								"data-prohibitions": "[editContent]",
								className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/Properties.tsx:94:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: MARAM, ANTONIO SALOMAO...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "pl-9"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Properties.tsx:101:13",
							"data-prohibitions": "[editContent]",
							type: "submit",
							disabled: loading || !search.trim(),
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/pages/Properties.tsx:104:19",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2 animate-spin"
							}), "Buscando..."] }) : "Buscar"
						})]
					})
				})]
			}),
			hasSearched && !loading && results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:116:9",
				"data-prohibitions": "[editContent]",
				className: "py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-border/60 rounded-xl bg-background/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
						"data-uid": "src/pages/Properties.tsx:117:11",
						"data-prohibitions": "[editContent]",
						className: "w-12 h-12 mb-4 text-muted-foreground/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/Properties.tsx:118:11",
						"data-prohibitions": "[]",
						className: "text-lg font-medium text-foreground",
						children: "Nenhum imóvel encontrado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/Properties.tsx:119:11",
						"data-prohibitions": "[editContent]",
						className: "text-sm text-muted-foreground mt-1 max-w-sm",
						children: [
							"Não encontramos nenhum imóvel vinculado à pesquisa \"",
							search,
							"\" no servidor local."
						]
					})
				]
			}),
			results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/Properties.tsx:126:9",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Properties.tsx:127:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-md border border-border/50 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/Properties.tsx:128:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/Properties.tsx:129:15",
							"data-prohibitions": "[]",
							className: "bg-muted/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Properties.tsx:130:17",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Properties.tsx:131:19",
										"data-prohibitions": "[]",
										className: "w-[100px]",
										children: "ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Properties.tsx:132:19",
										"data-prohibitions": "[]",
										children: "Tipo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Properties.tsx:133:19",
										"data-prohibitions": "[]",
										children: "Endereço"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Properties.tsx:134:19",
										"data-prohibitions": "[]",
										children: "Bairro / Cidade"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Properties.tsx:135:19",
										"data-prohibitions": "[]",
										children: "Proprietário Principal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Properties.tsx:136:19",
										"data-prohibitions": "[]",
										children: "Serviços"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
							"data-uid": "src/pages/Properties.tsx:139:15",
							"data-prohibitions": "[editContent]",
							children: results.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Properties.tsx:141:19",
								"data-prohibitions": "[editContent]",
								className: "hover:bg-muted/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										"data-uid": "src/pages/Properties.tsx:142:21",
										"data-prohibitions": "[editContent]",
										className: "font-medium text-xs",
										children: ["#", property.id]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Properties.tsx:143:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/Properties.tsx:144:23",
											"data-prohibitions": "[editContent]",
											variant: "secondary",
											className: "font-normal",
											children: property.tipo
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Properties.tsx:148:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Properties.tsx:149:23",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Properties.tsx:150:25",
												"data-prohibitions": "[editContent]",
												className: "text-sm font-medium",
												children: [property.endereco, property.numero ? `, ${property.numero}` : ""]
											}), property.complemento && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Properties.tsx:155:27",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground",
												children: property.complemento
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Properties.tsx:161:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Properties.tsx:162:23",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Properties.tsx:163:25",
												"data-prohibitions": "[editContent]",
												className: "text-sm",
												children: property.bairro
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Properties.tsx:164:25",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground",
												children: [
													property.cidade,
													" / ",
													property.uf
												]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Properties.tsx:169:21",
										"data-prohibitions": "[editContent]",
										children: property.proprietarios && property.proprietarios.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Properties.tsx:171:25",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
												"data-uid": "src/pages/Properties.tsx:172:27",
												"data-prohibitions": "[editContent]",
												className: "w-3.5 h-3.5 text-muted-foreground shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Properties.tsx:173:27",
												"data-prohibitions": "[editContent]",
												className: "text-sm line-clamp-1 max-w-[200px]",
												title: property.proprietarios[0].nome,
												children: property.proprietarios[0].nome
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Properties.tsx:181:25",
											"data-prohibitions": "[]",
											className: "text-xs text-muted-foreground",
											children: "Não informado"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Properties.tsx:184:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Properties.tsx:185:23",
											"data-prohibitions": "[editContent]",
											className: "flex flex-wrap gap-1",
											children: property.servicos && property.servicos.length > 0 ? property.servicos.map((serv, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Properties.tsx:188:29",
												"data-prohibitions": "[editContent]",
												variant: "outline",
												className: "text-[10px] px-1.5 py-0 h-5",
												children: serv.descricao
											}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Properties.tsx:197:27",
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

//# sourceMappingURL=Properties-BG8cOzNQ.js.map