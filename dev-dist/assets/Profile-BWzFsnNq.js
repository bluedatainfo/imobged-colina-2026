import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as Trash2 } from "./trash-2-5ycRoo00.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import "./client-CX_7U15l.js";
import "./main-BTmGmLbt.js";
import { r as usersStore } from "./users-BeN6ShO_.js";
import "./keys-B9hgOber.js";
import "./entities-CnJZXM2l.js";
import { U as Upload, V as User, d as Avatar, f as AvatarFallback, g as useAuth, p as AvatarImage } from "./index-B9jMDvvQ.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CcQxuH73.js";
//#region src/pages/Profile.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Profile() {
	const { user } = useAuth();
	const { toast } = useToast();
	const [photo, setPhoto] = (0, import_react.useState)(user?.avatar || "");
	const fileInputRef = (0, import_react.useRef)(null);
	if (!user) return null;
	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.size > 2 * 1024 * 1024) {
				toast({
					variant: "destructive",
					title: "Erro de Upload",
					description: "A imagem deve ter no máximo 2MB."
				});
				return;
			}
			const reader = new FileReader();
			reader.onload = (event) => {
				const result = event.target?.result;
				setPhoto(result);
				usersStore.updateUser(user.id, { avatar: result });
				toast({
					title: "Foto Atualizada",
					description: "Sua foto de perfil foi salva com sucesso."
				});
			};
			reader.readAsDataURL(file);
		}
	};
	const handleRemovePhoto = () => {
		setPhoto("");
		usersStore.updateUser(user.id, { avatar: "" });
		toast({
			title: "Foto Removida",
			description: "Sua foto de perfil foi removida com sucesso e restaurada para o padrão."
		});
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Profile.tsx:57:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-2xl space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Profile.tsx:58:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/Profile.tsx:59:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-foreground",
					children: "Meu Perfil"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Profile.tsx:60:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Gerencie suas informações e configure sua foto de perfil."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Profile.tsx:65:7",
				"data-prohibitions": "[editContent]",
				className: "border-border/50 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/Profile.tsx:66:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/Profile.tsx:67:11",
						"data-prohibitions": "[]",
						children: "Foto de Perfil"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/Profile.tsx:68:11",
						"data-prohibitions": "[]",
						children: "Personalize sua conta com uma foto profissional. (Tamanho máximo: 2MB)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/Profile.tsx:72:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col sm:flex-row items-start sm:items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						"data-uid": "src/pages/Profile.tsx:73:11",
						"data-prohibitions": "[]",
						className: "h-24 w-24 border-4 border-background shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							"data-uid": "src/pages/Profile.tsx:74:13",
							"data-prohibitions": "[editContent]",
							src: photo,
							className: "object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							"data-uid": "src/pages/Profile.tsx:75:13",
							"data-prohibitions": "[]",
							className: "bg-muted text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
								"data-uid": "src/pages/Profile.tsx:76:15",
								"data-prohibitions": "[editContent]",
								className: "h-12 w-12"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Profile.tsx:79:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col gap-3 w-full sm:w-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"data-uid": "src/pages/Profile.tsx:80:13",
								"data-prohibitions": "[editContent]",
								type: "file",
								accept: "image/*",
								className: "hidden",
								ref: fileInputRef,
								onChange: handleFileChange
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Profile.tsx:87:13",
								"data-prohibitions": "[]",
								onClick: () => fileInputRef.current?.click(),
								className: "gap-2 w-full transition-all hover:shadow-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
									"data-uid": "src/pages/Profile.tsx:91:15",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4"
								}), " Enviar Nova Foto"]
							}),
							photo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Profile.tsx:94:15",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: handleRemovePhoto,
								className: "gap-2 text-destructive border-destructive/20 hover:bg-destructive hover:text-destructive-foreground w-full transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									"data-uid": "src/pages/Profile.tsx:99:17",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4"
								}), " Remover Foto"]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Profile.tsx:106:7",
				"data-prohibitions": "[editContent]",
				className: "border-border/50 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/Profile.tsx:107:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/Profile.tsx:108:11",
						"data-prohibitions": "[]",
						children: "Detalhes da Conta"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/Profile.tsx:109:11",
						"data-prohibitions": "[]",
						children: "Suas informações de acesso corporativo."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/Profile.tsx:111:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Profile.tsx:112:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Profile.tsx:113:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Nome de Exibição"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Profile.tsx:114:13",
								"data-prohibitions": "[editContent]",
								className: "font-semibold text-lg",
								children: user.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Profile.tsx:116:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Profile.tsx:117:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "E-mail Corporativo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Profile.tsx:118:13",
								"data-prohibitions": "[editContent]",
								className: "text-base",
								children: user.email
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Profile.tsx:120:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Profile.tsx:121:13",
									"data-prohibitions": "[]",
									className: "text-sm font-medium text-muted-foreground",
									children: "Nível de Acesso (Perfil)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Profile.tsx:124:13",
									"data-prohibitions": "[editContent]",
									className: "inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary",
									children: user.role
								}),
								user.role === "Corretor" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/Profile.tsx:128:15",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground mt-2",
									children: "Como Corretor, seu acesso é focado no painel principal e nos dossiês de propriedades. Outros módulos operacionais estão restritos."
								})
							]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Profile as default };

//# sourceMappingURL=Profile-BWzFsnNq.js.map