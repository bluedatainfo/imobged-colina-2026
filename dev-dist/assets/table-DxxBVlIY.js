import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as cn } from "./utils-BNj1jY-i.js";
//#region src/components/ui/table.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/table.tsx:8:5",
	"data-prohibitions": "[editContent]",
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		"data-uid": "src/components/ui/table.tsx:9:7",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	"data-uid": "src/components/ui/table.tsx:19:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	"data-uid": "src/components/ui/table.tsx:27:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	"data-uid": "src/components/ui/table.tsx:35:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	"data-uid": "src/components/ui/table.tsx:45:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	"data-uid": "src/components/ui/table.tsx:61:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	"data-uid": "src/components/ui/table.tsx:76:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	"data-uid": "src/components/ui/table.tsx:88:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
//#endregion
export { TableHeader as a, TableHead as i, TableBody as n, TableRow as o, TableCell as r, Table as t };

//# sourceMappingURL=table-DxxBVlIY.js.map