import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CvuQPfAM.js";
import "./react-dom-cDMCl7Pc.js";
import { n as useToast } from "./use-toast-cNG4ZhbD.js";
import { t as Button } from "./button-ChEhZCqG.js";
import { t as Trash2 } from "./trash-2-CAO729-f.js";
import "./main-DCsFzFjp.js";
import { r as usersStore } from "./users-paJUHImY.js";
import { I as Upload, P as User, d as Avatar, f as AvatarFallback, h as useAuth, p as AvatarImage } from "./index-60jD2nC6.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-D7FMgv39.js";
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
			description: "Sua foto de perfil foi removida com sucesso."
		});
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Profile.tsx:57:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-2xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Profile.tsx:58:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/Profile.tsx:59:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight",
				children: "Meu Perfil"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/Profile.tsx:60:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "Gerencie suas informações e foto de perfil."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/Profile.tsx:63:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				"data-uid": "src/pages/Profile.tsx:64:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					"data-uid": "src/pages/Profile.tsx:65:11",
					"data-prohibitions": "[]",
					children: "Foto de Perfil"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					"data-uid": "src/pages/Profile.tsx:66:11",
					"data-prohibitions": "[]",
					children: "Personalize sua conta com uma foto. (Tamanho máximo de 2MB)"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				"data-uid": "src/pages/Profile.tsx:70:9",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row items-start sm:items-center gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
					"data-uid": "src/pages/Profile.tsx:71:11",
					"data-prohibitions": "[]",
					className: "h-24 w-24 border-2 border-muted shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
						"data-uid": "src/pages/Profile.tsx:72:13",
						"data-prohibitions": "[editContent]",
						src: photo,
						className: "object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
						"data-uid": "src/pages/Profile.tsx:73:13",
						"data-prohibitions": "[]",
						className: "bg-muted/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
							"data-uid": "src/pages/Profile.tsx:74:15",
							"data-prohibitions": "[editContent]",
							className: "h-10 w-10 text-muted-foreground"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Profile.tsx:77:11",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col gap-3 w-full sm:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"data-uid": "src/pages/Profile.tsx:78:13",
							"data-prohibitions": "[editContent]",
							type: "file",
							accept: "image/*",
							className: "hidden",
							ref: fileInputRef,
							onChange: handleFileChange
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/Profile.tsx:85:13",
							"data-prohibitions": "[]",
							onClick: () => fileInputRef.current?.click(),
							className: "gap-2 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
								"data-uid": "src/pages/Profile.tsx:86:15",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4"
							}), " Enviar Nova Foto"]
						}),
						photo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/Profile.tsx:89:15",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: handleRemovePhoto,
							className: "gap-2 text-destructive hover:text-destructive w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
								"data-uid": "src/pages/Profile.tsx:94:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4"
							}), " Remover Foto"]
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
export { Profile as default };

//# sourceMappingURL=Profile-Dt0gDqlZ.js.map