import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as toast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as ArrowLeft } from "./arrow-left-Dd8rqD3N.js";
import { t as ShieldAlert } from "./shield-alert-BfvrDpox.js";
import { t as Button } from "./button-DI75GKXN.js";
import "./client-CRWdr5I6.js";
import "./main-FN5EGQr7.js";
import "./users-DzmmIHhX.js";
import "./contracts-CIsxGoRY.js";
import "./keys-Ri3Jo95i.js";
import "./entities-B3mXxKW9.js";
import "./templates-BNPxUeZN.js";
import "./documents-BcP-RSQc.js";
import { h as useAuth, ot as useNavigate } from "./index-C2WAs_lD.js";
//#region src/pages/AccessDenied.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AccessDenied() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const shown = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!shown.current) {
			toast({
				variant: "destructive",
				title: "Acesso Negado",
				description: "Você não tem permissão para acessar esta área."
			});
			shown.current = true;
		}
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/AccessDenied.tsx:25:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/AccessDenied.tsx:26:7",
				"data-prohibitions": "[]",
				className: "bg-destructive/10 p-6 rounded-full mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
					"data-uid": "src/pages/AccessDenied.tsx:27:9",
					"data-prohibitions": "[editContent]",
					className: "h-16 w-16 text-destructive"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/AccessDenied.tsx:29:7",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight mb-2",
				children: "Acesso Negado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-uid": "src/pages/AccessDenied.tsx:30:7",
				"data-prohibitions": "[editContent]",
				className: "text-muted-foreground max-w-md mb-8",
				children: [
					"Seu perfil atual (",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/pages/AccessDenied.tsx:31:27",
						"data-prohibitions": "[editContent]",
						className: "font-semibold text-foreground",
						children: user?.role
					}),
					") não possui permissões para acessar este módulo. Solicite liberação ao administrador."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/pages/AccessDenied.tsx:34:7",
				"data-prohibitions": "[]",
				onClick: () => navigate("/"),
				size: "lg",
				className: "gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"data-uid": "src/pages/AccessDenied.tsx:35:9",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4"
				}), " Voltar ao Painel"]
			})
		]
	});
}
//#endregion
export { AccessDenied as default };

//# sourceMappingURL=AccessDenied-BduOL4YT.js.map