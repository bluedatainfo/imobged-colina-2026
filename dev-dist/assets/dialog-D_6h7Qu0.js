import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as cn } from "./utils-BNj1jY-i.js";
import { C as Close, D as Portal, E as Overlay, L as X, O as Root, T as Description, k as Title, w as Content } from "./index-BVhX-cV-.js";
//#region src/components/ui/dialog.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Root;
var DialogPortal = Portal;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	"data-uid": "src/components/ui/dialog.tsx:20:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = Overlay.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, {
	"data-uid": "src/components/ui/dialog.tsx:35:3",
	"data-prohibitions": "[editContent]",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		"data-uid": "src/components/ui/dialog.tsx:36:5",
		"data-prohibitions": "[editContent]"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
		"data-uid": "src/components/ui/dialog.tsx:37:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg overflow-y-auto max-h-screen", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
			"data-uid": "src/components/ui/dialog.tsx:46:7",
			"data-prohibitions": "[]",
			className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
				"data-uid": "src/components/ui/dialog.tsx:47:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/components/ui/dialog.tsx:48:9",
				"data-prohibitions": "[]",
				className: "sr-only",
				children: "Close"
			})]
		})]
	})]
}));
DialogContent.displayName = Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/dialog.tsx:56:3",
	"data-prohibitions": "[editContent]",
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/dialog.tsx:61:3",
	"data-prohibitions": "[editContent]",
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	"data-uid": "src/components/ui/dialog.tsx:72:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = Title.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	"data-uid": "src/components/ui/dialog.tsx:84:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = Description.displayName;
//#endregion
export { DialogHeader as a, DialogFooter as i, DialogContent as n, DialogTitle as o, DialogDescription as r, Dialog as t };

//# sourceMappingURL=dialog-D_6h7Qu0.js.map