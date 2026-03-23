import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { ct as useLocation } from "./index-352HD6yO.js";
//#region src/pages/NotFound.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var NotFound = () => {
	const location = useLocation();
	(0, import_react.useEffect)(() => {
		console.error("404 Error: User attempted to access non-existent route:", location.pathname);
	}, [location.pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/NotFound.tsx:13:5",
		"data-prohibitions": "[]",
		className: "min-h-screen flex items-center justify-center bg-gray-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/NotFound.tsx:14:7",
			"data-prohibitions": "[]",
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/NotFound.tsx:15:9",
					"data-prohibitions": "[]",
					className: "text-4xl font-bold mb-4",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/NotFound.tsx:16:9",
					"data-prohibitions": "[]",
					className: "text-xl text-gray-600 mb-4",
					children: "Oops! Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					"data-uid": "src/pages/NotFound.tsx:17:9",
					"data-prohibitions": "[]",
					href: "/",
					className: "text-blue-500 hover:text-blue-700 underline",
					children: "Return to Home"
				})
			]
		})
	});
};
//#endregion
export { NotFound as default };

//# sourceMappingURL=NotFound-BUZbjrpI.js.map