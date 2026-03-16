import { a as __toESM, n as require_react } from "./jsx-runtime-CvuQPfAM.js";
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useCallbackRef(callback) {
	const callbackRef = import_react.useRef(callback);
	import_react.useEffect(() => {
		callbackRef.current = callback;
	});
	return import_react.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
//#endregion
export { useCallbackRef as t };

//# sourceMappingURL=dist-sCamKOPo.js.map