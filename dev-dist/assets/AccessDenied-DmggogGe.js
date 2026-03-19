import "./react-CaAsmmmw.js";
import "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as Button } from "./button-D8gTpw3z.js";
import { t as ArrowLeft } from "./arrow-left-Dd8rqD3N.js";
import { t as ShieldAlert } from "./shield-alert-BIdA8WYI.js";
import "./client-BdUtiDva.js";
import "./main-D4LgIrDj.js";
import "./users-DnJ3TRB4.js";
import "./contracts-DccFOnz-.js";
import "./keys-DIaA8JNl.js";
import { et as useNavigate, h as useAuth } from "./index-C7717nDM.js";
//#region src/pages/AccessDenied.tsx
var import_jsx_runtime = require_jsx_runtime();
function AccessDenied() {
	const navigate = useNavigate();
	const { user } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/AccessDenied.tsx:11:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/AccessDenied.tsx:12:7",
				"data-prohibitions": "[]",
				className: "bg-destructive/10 p-6 rounded-full mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
					"data-uid": "src/pages/AccessDenied.tsx:13:9",
					"data-prohibitions": "[editContent]",
					className: "h-16 w-16 text-destructive"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/AccessDenied.tsx:15:7",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight mb-2",
				children: "Acesso Negado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-uid": "src/pages/AccessDenied.tsx:16:7",
				"data-prohibitions": "[editContent]",
				className: "text-muted-foreground max-w-md mb-8",
				children: [
					"Seu perfil atual (",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/pages/AccessDenied.tsx:17:27",
						"data-prohibitions": "[editContent]",
						className: "font-semibold text-foreground",
						children: user?.role
					}),
					") não possui permissões para acessar este módulo. Solicite liberação ao administrador."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/pages/AccessDenied.tsx:20:7",
				"data-prohibitions": "[]",
				onClick: () => navigate("/"),
				size: "lg",
				className: "gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"data-uid": "src/pages/AccessDenied.tsx:21:9",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4"
				}), " Voltar ao Painel"]
			})
		]
	});
}
//#endregion
export { AccessDenied as default };

//# sourceMappingURL=AccessDenied-DmggogGe.js.map