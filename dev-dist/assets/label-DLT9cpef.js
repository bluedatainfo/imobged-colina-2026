import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CvuQPfAM.js";
import { t as cn } from "./utils-BWe8iKtn.js";
import { i as cva } from "./button-VYS3F0Ax.js";
import { t as Primitive } from "./dist-DN1Vl0sN2.js";
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/@radix-ui+react-label@2.1.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@_55fa612a976b7bdfbf4dcdd93d861aab/node_modules/@radix-ui/react-label/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var NAME = "Label";
var Label$1 = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.label, {
		...props,
		ref: forwardedRef,
		onMouseDown: (event) => {
			if (event.target.closest("button, input, select, textarea")) return;
			props.onMouseDown?.(event);
			if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
		}
	});
});
Label$1.displayName = NAME;
var Root = Label$1;
//#endregion
//#region src/components/ui/label.tsx
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	"data-uid": "src/components/ui/label.tsx:16:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
//#endregion
export { Label as t };

//# sourceMappingURL=label-DLT9cpef.js.map