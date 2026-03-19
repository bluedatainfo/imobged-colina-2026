import "./react-CaAsmmmw.js";
import "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as ArrowLeft } from "./arrow-left-Dd8rqD3N.js";
import { t as ShieldAlert } from "./shield-alert-DyybQ1jE.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import "./client-CX_7U15l.js";
import "./main-B7dr_xNS.js";
import "./users-1CY0fc8C.js";
import "./contracts-DMcPMPzZ.js";
import "./keys-Bmg8vg07.js";
import { _ as useAuth, it as useNavigate } from "./index-DUtgM6U2.js";
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

//# sourceMappingURL=AccessDenied-C_eIXvuX.js.map