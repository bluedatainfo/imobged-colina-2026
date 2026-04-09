import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-Chw5iMW0.js";
import { t as cn } from "./utils-BNj1jY-i.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BnRniNmY.js";
import { t as Download } from "./download-DNswiS8o.js";
import { t as ExternalLink } from "./external-link-DaNlYeYS.js";
import { t as RefreshCw } from "./refresh-cw-CMgxffgN.js";
import { t as Button } from "./button-iQJzuPvV.js";
import { t as supabase } from "./client-C4nUQiBY.js";
import "./main-DzE2CtCw.js";
import { A as Trigger, C as Close, D as Portal$1, E as Overlay$1, I as toast, O as Root$1, T as Description, X as LoaderCircle, k as Title, t as Badge, w as Content$1 } from "./index-BuJZcdMu.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DxxBVlIY.js";
import { n as m365Service } from "./m365-Bx4Jya2e.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BE_6e1V8.js";
import { n as format, t as ptBR } from "./pt-BR-Neog2fnq.js";
//#region src/services/candidates.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var candidatesService = {
	async getCandidates() {
		const { data, error } = await supabase.from("pre_registrations").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return data;
	},
	async updateStatus(id, status) {
		const { data, error } = await supabase.from("pre_registrations").update({ status }).eq("id", id).select().single();
		if (error) throw error;
		return data;
	},
	async syncFromSharePoint() {
		const lists = [
			{
				name: "Fichas Cadastrais  Locatrios",
				category: "PF"
			},
			{
				name: "Fichas Cadastrais Candidatos PJ",
				category: "PJ"
			},
			{
				name: "Fichas Cadastrais  Fiador",
				category: "Fiador"
			}
		];
		let syncedCount = 0;
		for (const list of lists) {
			const items = await m365Service.fetchListItems("locacoes", list.name);
			if (items && items.length > 0) for (const item of items) {
				const fields = item.fields || {};
				const sp_list_id = `${list.category}-${item.id}`;
				const payload = {
					full_name: fields.Nome || fields.RazaoSocial || fields.Title || "Sem Nome",
					email: fields.E_x002d_mail || fields.Email || fields.EMail || fields.eMail || fields.EmailCorporativo || null,
					phone: fields.Celular || fields.Telefone || fields.Contato || null,
					cpf: fields.CPF || null,
					cnpj: fields.CNPJ || null,
					address: fields.Endereco || fields.Endereço || null,
					category: list.category,
					sp_list_id,
					status: "Novo",
					form_data: fields
				};
				const { error } = await supabase.from("pre_registrations").insert(payload);
				if (!error) syncedCount++;
			}
		}
		return syncedCount;
	}
};
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/vaul@1.1.2_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@19.2.14_react-dom_724ef6c3f0fbc86fbf11d8898c60a0ec/node_modules/vaul/dist/index.mjs
function __insertCSS(code) {
	if (!code || typeof document == "undefined") return;
	let head = document.head || document.getElementsByTagName("head")[0];
	let style = document.createElement("style");
	style.type = "text/css";
	head.appendChild(style);
	style.styleSheet ? style.styleSheet.cssText = code : style.appendChild(document.createTextNode(code));
}
var DrawerContext = import_react.createContext({
	drawerRef: { current: null },
	overlayRef: { current: null },
	onPress: () => {},
	onRelease: () => {},
	onDrag: () => {},
	onNestedDrag: () => {},
	onNestedOpenChange: () => {},
	onNestedRelease: () => {},
	openProp: void 0,
	dismissible: false,
	isOpen: false,
	isDragging: false,
	keyboardIsOpen: { current: false },
	snapPointsOffset: null,
	snapPoints: null,
	handleOnly: false,
	modal: false,
	shouldFade: false,
	activeSnapPoint: null,
	onOpenChange: () => {},
	setActiveSnapPoint: () => {},
	closeDrawer: () => {},
	direction: "bottom",
	shouldAnimate: { current: true },
	shouldScaleBackground: false,
	setBackgroundColorOnScale: true,
	noBodyStyles: false,
	container: null,
	autoFocus: false
});
var useDrawerContext = () => {
	const context = import_react.useContext(DrawerContext);
	if (!context) throw new Error("useDrawerContext must be used within a Drawer.Root");
	return context;
};
__insertCSS("[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform,100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform,100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(\n[data-state=closed]\n){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,var(--initial-transform,100%),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform,100%),0)}}@keyframes slideFromTop{from{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}}@keyframes slideFromLeft{from{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}}@keyframes slideFromRight{from{transform:translate3d(var(--initial-transform,100%),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform,100%),0,0)}}");
function isMobileFirefox() {
	const userAgent = navigator.userAgent;
	return typeof window !== "undefined" && (/Firefox/.test(userAgent) && /Mobile/.test(userAgent) || /FxiOS/.test(userAgent));
}
function isMac() {
	return testPlatform(/^Mac/);
}
function isIPhone() {
	return testPlatform(/^iPhone/);
}
function isSafari() {
	return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function isIPad() {
	return testPlatform(/^iPad/) || isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
	return isIPhone() || isIPad();
}
function testPlatform(re) {
	return typeof window !== "undefined" && window.navigator != null ? re.test(window.navigator.platform) : void 0;
}
var KEYBOARD_BUFFER = 24;
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function chain$1(...callbacks) {
	return (...args) => {
		for (let callback of callbacks) if (typeof callback === "function") callback(...args);
	};
}
var visualViewport = typeof document !== "undefined" && window.visualViewport;
function isScrollable(node) {
	let style = window.getComputedStyle(node);
	return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
}
function getScrollParent(node) {
	if (isScrollable(node)) node = node.parentElement;
	while (node && !isScrollable(node)) node = node.parentElement;
	return node || document.scrollingElement || document.documentElement;
}
var nonTextInputTypes = new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]);
var preventScrollCount = 0;
var restore;
/**
* Prevents scrolling on the document body on mount, and
* restores it on unmount. Also ensures that content does not
* shift due to the scrollbars disappearing.
*/ function usePreventScroll(options = {}) {
	let { isDisabled } = options;
	useIsomorphicLayoutEffect(() => {
		if (isDisabled) return;
		preventScrollCount++;
		if (preventScrollCount === 1) {
			if (isIOS()) restore = preventScrollMobileSafari();
		}
		return () => {
			preventScrollCount--;
			if (preventScrollCount === 0) restore?.();
		};
	}, [isDisabled]);
}
function preventScrollMobileSafari() {
	let scrollable;
	let lastY = 0;
	let onTouchStart = (e) => {
		scrollable = getScrollParent(e.target);
		if (scrollable === document.documentElement && scrollable === document.body) return;
		lastY = e.changedTouches[0].pageY;
	};
	let onTouchMove = (e) => {
		if (!scrollable || scrollable === document.documentElement || scrollable === document.body) {
			e.preventDefault();
			return;
		}
		let y = e.changedTouches[0].pageY;
		let scrollTop = scrollable.scrollTop;
		let bottom = scrollable.scrollHeight - scrollable.clientHeight;
		if (bottom === 0) return;
		if (scrollTop <= 0 && y > lastY || scrollTop >= bottom && y < lastY) e.preventDefault();
		lastY = y;
	};
	let onTouchEnd = (e) => {
		let target = e.target;
		if (isInput(target) && target !== document.activeElement) {
			e.preventDefault();
			target.style.transform = "translateY(-2000px)";
			target.focus();
			requestAnimationFrame(() => {
				target.style.transform = "";
			});
		}
	};
	let onFocus = (e) => {
		let target = e.target;
		if (isInput(target)) {
			target.style.transform = "translateY(-2000px)";
			requestAnimationFrame(() => {
				target.style.transform = "";
				if (visualViewport) if (visualViewport.height < window.innerHeight) requestAnimationFrame(() => {
					scrollIntoView(target);
				});
				else visualViewport.addEventListener("resize", () => scrollIntoView(target), { once: true });
			});
		}
	};
	let onWindowScroll = () => {
		window.scrollTo(0, 0);
	};
	let scrollX = window.pageXOffset;
	let scrollY = window.pageYOffset;
	let restoreStyles = chain$1(setStyle(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`));
	window.scrollTo(0, 0);
	let removeEvents = chain$1(addEvent(document, "touchstart", onTouchStart, {
		passive: false,
		capture: true
	}), addEvent(document, "touchmove", onTouchMove, {
		passive: false,
		capture: true
	}), addEvent(document, "touchend", onTouchEnd, {
		passive: false,
		capture: true
	}), addEvent(document, "focus", onFocus, true), addEvent(window, "scroll", onWindowScroll));
	return () => {
		restoreStyles();
		removeEvents();
		window.scrollTo(scrollX, scrollY);
	};
}
function setStyle(element, style, value) {
	let cur = element.style[style];
	element.style[style] = value;
	return () => {
		element.style[style] = cur;
	};
}
function addEvent(target, event, handler, options) {
	target.addEventListener(event, handler, options);
	return () => {
		target.removeEventListener(event, handler, options);
	};
}
function scrollIntoView(target) {
	let root = document.scrollingElement || document.documentElement;
	while (target && target !== root) {
		let scrollable = getScrollParent(target);
		if (scrollable !== document.documentElement && scrollable !== document.body && scrollable !== target) {
			let scrollableTop = scrollable.getBoundingClientRect().top;
			let targetTop = target.getBoundingClientRect().top;
			if (target.getBoundingClientRect().bottom > scrollable.getBoundingClientRect().bottom + KEYBOARD_BUFFER) scrollable.scrollTop += targetTop - scrollableTop;
		}
		target = scrollable.parentElement;
	}
}
function isInput(target) {
	return target instanceof HTMLInputElement && !nonTextInputTypes.has(target.type) || target instanceof HTMLTextAreaElement || target instanceof HTMLElement && target.isContentEditable;
}
/**
* Set a given ref to a given value
* This utility takes care of different types of refs: callback refs and RefObject(s)
*/ function setRef(ref, value) {
	if (typeof ref === "function") ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
/**
* A utility to compose multiple refs together
* Accepts callback refs and RefObject(s)
*/ function composeRefs(...refs) {
	return (node) => refs.forEach((ref) => setRef(ref, node));
}
/**
* A custom hook that composes multiple refs
* Accepts callback refs and RefObject(s)
*/ function useComposedRefs(...refs) {
	return import_react.useCallback(composeRefs(...refs), refs);
}
var cache = /* @__PURE__ */ new WeakMap();
function set(el, styles, ignoreCache = false) {
	if (!el || !(el instanceof HTMLElement)) return;
	let originalStyles = {};
	Object.entries(styles).forEach(([key, value]) => {
		if (key.startsWith("--")) {
			el.style.setProperty(key, value);
			return;
		}
		originalStyles[key] = el.style[key];
		el.style[key] = value;
	});
	if (ignoreCache) return;
	cache.set(el, originalStyles);
}
function reset(el, prop) {
	if (!el || !(el instanceof HTMLElement)) return;
	let originalStyles = cache.get(el);
	if (!originalStyles) return;
	el.style[prop] = originalStyles[prop];
}
var isVertical = (direction) => {
	switch (direction) {
		case "top":
		case "bottom": return true;
		case "left":
		case "right": return false;
		default: return direction;
	}
};
function getTranslate(element, direction) {
	if (!element) return null;
	const style = window.getComputedStyle(element);
	const transform = style.transform || style.webkitTransform || style.mozTransform;
	let mat = transform.match(/^matrix3d\((.+)\)$/);
	if (mat) return parseFloat(mat[1].split(", ")[isVertical(direction) ? 13 : 12]);
	mat = transform.match(/^matrix\((.+)\)$/);
	return mat ? parseFloat(mat[1].split(", ")[isVertical(direction) ? 5 : 4]) : null;
}
function dampenValue(v) {
	return 8 * (Math.log(v + 1) - 2);
}
function assignStyle(element, style) {
	if (!element) return () => {};
	const prevStyle = element.style.cssText;
	Object.assign(element.style, style);
	return () => {
		element.style.cssText = prevStyle;
	};
}
/**
* Receives functions as arguments and returns a new function that calls all.
*/ function chain(...fns) {
	return (...args) => {
		for (const fn of fns) if (typeof fn === "function") fn(...args);
	};
}
var TRANSITIONS = {
	DURATION: .5,
	EASE: [
		.32,
		.72,
		0,
		1
	]
};
var VELOCITY_THRESHOLD = .4;
var CLOSE_THRESHOLD = .25;
var SCROLL_LOCK_TIMEOUT = 100;
var BORDER_RADIUS = 8;
var NESTED_DISPLACEMENT = 16;
var WINDOW_TOP_OFFSET = 26;
var DRAG_CLASS = "vaul-dragging";
function useCallbackRef(callback) {
	const callbackRef = import_react.useRef(callback);
	import_react.useEffect(() => {
		callbackRef.current = callback;
	});
	return import_react.useMemo(() => (...args) => callbackRef.current == null ? void 0 : callbackRef.current.call(callbackRef, ...args), []);
}
function useUncontrolledState({ defaultProp, onChange }) {
	const uncontrolledState = import_react.useState(defaultProp);
	const [value] = uncontrolledState;
	const prevValueRef = import_react.useRef(value);
	const handleChange = useCallbackRef(onChange);
	import_react.useEffect(() => {
		if (prevValueRef.current !== value) {
			handleChange(value);
			prevValueRef.current = value;
		}
	}, [
		value,
		prevValueRef,
		handleChange
	]);
	return uncontrolledState;
}
function useControllableState({ prop, defaultProp, onChange = () => {} }) {
	const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
		defaultProp,
		onChange
	});
	const isControlled = prop !== void 0;
	const value = isControlled ? prop : uncontrolledProp;
	const handleChange = useCallbackRef(onChange);
	return [value, import_react.useCallback((nextValue) => {
		if (isControlled) {
			const value = typeof nextValue === "function" ? nextValue(prop) : nextValue;
			if (value !== prop) handleChange(value);
		} else setUncontrolledProp(nextValue);
	}, [
		isControlled,
		prop,
		setUncontrolledProp,
		handleChange
	])];
}
function useSnapPoints({ activeSnapPointProp, setActiveSnapPointProp, snapPoints, drawerRef, overlayRef, fadeFromIndex, onSnapPointChange, direction = "bottom", container, snapToSequentialPoint }) {
	const [activeSnapPoint, setActiveSnapPoint] = useControllableState({
		prop: activeSnapPointProp,
		defaultProp: snapPoints == null ? void 0 : snapPoints[0],
		onChange: setActiveSnapPointProp
	});
	const [windowDimensions, setWindowDimensions] = import_react.useState(typeof window !== "undefined" ? {
		innerWidth: window.innerWidth,
		innerHeight: window.innerHeight
	} : void 0);
	import_react.useEffect(() => {
		function onResize() {
			setWindowDimensions({
				innerWidth: window.innerWidth,
				innerHeight: window.innerHeight
			});
		}
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);
	const isLastSnapPoint = import_react.useMemo(() => activeSnapPoint === (snapPoints == null ? void 0 : snapPoints[snapPoints.length - 1]) || null, [snapPoints, activeSnapPoint]);
	const activeSnapPointIndex = import_react.useMemo(() => {
		var _snapPoints_findIndex;
		return (_snapPoints_findIndex = snapPoints == null ? void 0 : snapPoints.findIndex((snapPoint) => snapPoint === activeSnapPoint)) != null ? _snapPoints_findIndex : null;
	}, [snapPoints, activeSnapPoint]);
	const shouldFade = snapPoints && snapPoints.length > 0 && (fadeFromIndex || fadeFromIndex === 0) && !Number.isNaN(fadeFromIndex) && snapPoints[fadeFromIndex] === activeSnapPoint || !snapPoints;
	const snapPointsOffset = import_react.useMemo(() => {
		const containerSize = container ? {
			width: container.getBoundingClientRect().width,
			height: container.getBoundingClientRect().height
		} : typeof window !== "undefined" ? {
			width: window.innerWidth,
			height: window.innerHeight
		} : {
			width: 0,
			height: 0
		};
		var _snapPoints_map;
		return (_snapPoints_map = snapPoints == null ? void 0 : snapPoints.map((snapPoint) => {
			const isPx = typeof snapPoint === "string";
			let snapPointAsNumber = 0;
			if (isPx) snapPointAsNumber = parseInt(snapPoint, 10);
			if (isVertical(direction)) {
				const height = isPx ? snapPointAsNumber : windowDimensions ? snapPoint * containerSize.height : 0;
				if (windowDimensions) return direction === "bottom" ? containerSize.height - height : -containerSize.height + height;
				return height;
			}
			const width = isPx ? snapPointAsNumber : windowDimensions ? snapPoint * containerSize.width : 0;
			if (windowDimensions) return direction === "right" ? containerSize.width - width : -containerSize.width + width;
			return width;
		})) != null ? _snapPoints_map : [];
	}, [
		snapPoints,
		windowDimensions,
		container
	]);
	const activeSnapPointOffset = import_react.useMemo(() => activeSnapPointIndex !== null ? snapPointsOffset == null ? void 0 : snapPointsOffset[activeSnapPointIndex] : null, [snapPointsOffset, activeSnapPointIndex]);
	const snapToPoint = import_react.useCallback((dimension) => {
		var _snapPointsOffset_findIndex;
		const newSnapPointIndex = (_snapPointsOffset_findIndex = snapPointsOffset == null ? void 0 : snapPointsOffset.findIndex((snapPointDim) => snapPointDim === dimension)) != null ? _snapPointsOffset_findIndex : null;
		onSnapPointChange(newSnapPointIndex);
		set(drawerRef.current, {
			transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
			transform: isVertical(direction) ? `translate3d(0, ${dimension}px, 0)` : `translate3d(${dimension}px, 0, 0)`
		});
		if (snapPointsOffset && newSnapPointIndex !== snapPointsOffset.length - 1 && fadeFromIndex !== void 0 && newSnapPointIndex !== fadeFromIndex && newSnapPointIndex < fadeFromIndex) set(overlayRef.current, {
			transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
			opacity: "0"
		});
		else set(overlayRef.current, {
			transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
			opacity: "1"
		});
		setActiveSnapPoint(snapPoints == null ? void 0 : snapPoints[Math.max(newSnapPointIndex, 0)]);
	}, [
		drawerRef.current,
		snapPoints,
		snapPointsOffset,
		fadeFromIndex,
		overlayRef,
		setActiveSnapPoint
	]);
	import_react.useEffect(() => {
		if (activeSnapPoint || activeSnapPointProp) {
			var _snapPoints_findIndex;
			const newIndex = (_snapPoints_findIndex = snapPoints == null ? void 0 : snapPoints.findIndex((snapPoint) => snapPoint === activeSnapPointProp || snapPoint === activeSnapPoint)) != null ? _snapPoints_findIndex : -1;
			if (snapPointsOffset && newIndex !== -1 && typeof snapPointsOffset[newIndex] === "number") snapToPoint(snapPointsOffset[newIndex]);
		}
	}, [
		activeSnapPoint,
		activeSnapPointProp,
		snapPoints,
		snapPointsOffset,
		snapToPoint
	]);
	function onRelease({ draggedDistance, closeDrawer, velocity, dismissible }) {
		if (fadeFromIndex === void 0) return;
		const currentPosition = direction === "bottom" || direction === "right" ? (activeSnapPointOffset != null ? activeSnapPointOffset : 0) - draggedDistance : (activeSnapPointOffset != null ? activeSnapPointOffset : 0) + draggedDistance;
		const isOverlaySnapPoint = activeSnapPointIndex === fadeFromIndex - 1;
		const isFirst = activeSnapPointIndex === 0;
		const hasDraggedUp = draggedDistance > 0;
		if (isOverlaySnapPoint) set(overlayRef.current, { transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})` });
		if (!snapToSequentialPoint && velocity > 2 && !hasDraggedUp) {
			if (dismissible) closeDrawer();
			else snapToPoint(snapPointsOffset[0]);
			return;
		}
		if (!snapToSequentialPoint && velocity > 2 && hasDraggedUp && snapPointsOffset && snapPoints) {
			snapToPoint(snapPointsOffset[snapPoints.length - 1]);
			return;
		}
		const closestSnapPoint = snapPointsOffset == null ? void 0 : snapPointsOffset.reduce((prev, curr) => {
			if (typeof prev !== "number" || typeof curr !== "number") return prev;
			return Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition) ? curr : prev;
		});
		const dim = isVertical(direction) ? window.innerHeight : window.innerWidth;
		if (velocity > VELOCITY_THRESHOLD && Math.abs(draggedDistance) < dim * .4) {
			const dragDirection = hasDraggedUp ? 1 : -1;
			if (dragDirection > 0 && isLastSnapPoint && snapPoints) {
				snapToPoint(snapPointsOffset[snapPoints.length - 1]);
				return;
			}
			if (isFirst && dragDirection < 0 && dismissible) closeDrawer();
			if (activeSnapPointIndex === null) return;
			snapToPoint(snapPointsOffset[activeSnapPointIndex + dragDirection]);
			return;
		}
		snapToPoint(closestSnapPoint);
	}
	function onDrag({ draggedDistance }) {
		if (activeSnapPointOffset === null) return;
		const newValue = direction === "bottom" || direction === "right" ? activeSnapPointOffset - draggedDistance : activeSnapPointOffset + draggedDistance;
		if ((direction === "bottom" || direction === "right") && newValue < snapPointsOffset[snapPointsOffset.length - 1]) return;
		if ((direction === "top" || direction === "left") && newValue > snapPointsOffset[snapPointsOffset.length - 1]) return;
		set(drawerRef.current, { transform: isVertical(direction) ? `translate3d(0, ${newValue}px, 0)` : `translate3d(${newValue}px, 0, 0)` });
	}
	function getPercentageDragged(absDraggedDistance, isDraggingDown) {
		if (!snapPoints || typeof activeSnapPointIndex !== "number" || !snapPointsOffset || fadeFromIndex === void 0) return null;
		const isOverlaySnapPoint = activeSnapPointIndex === fadeFromIndex - 1;
		if (activeSnapPointIndex >= fadeFromIndex && isDraggingDown) return 0;
		if (isOverlaySnapPoint && !isDraggingDown) return 1;
		if (!shouldFade && !isOverlaySnapPoint) return null;
		const targetSnapPointIndex = isOverlaySnapPoint ? activeSnapPointIndex + 1 : activeSnapPointIndex - 1;
		const snapPointDistance = isOverlaySnapPoint ? snapPointsOffset[targetSnapPointIndex] - snapPointsOffset[targetSnapPointIndex - 1] : snapPointsOffset[targetSnapPointIndex + 1] - snapPointsOffset[targetSnapPointIndex];
		const percentageDragged = absDraggedDistance / Math.abs(snapPointDistance);
		if (isOverlaySnapPoint) return 1 - percentageDragged;
		else return percentageDragged;
	}
	return {
		isLastSnapPoint,
		activeSnapPoint,
		shouldFade,
		getPercentageDragged,
		setActiveSnapPoint,
		activeSnapPointIndex,
		onRelease,
		onDrag,
		snapPointsOffset
	};
}
var noop = () => () => {};
function useScaleBackground() {
	const { direction, isOpen, shouldScaleBackground, setBackgroundColorOnScale, noBodyStyles } = useDrawerContext();
	const timeoutIdRef = import_react.useRef(null);
	const initialBackgroundColor = (0, import_react.useMemo)(() => document.body.style.backgroundColor, []);
	function getScale() {
		return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
	}
	import_react.useEffect(() => {
		if (isOpen && shouldScaleBackground) {
			if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
			const wrapper = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
			if (!wrapper) return;
			chain(setBackgroundColorOnScale && !noBodyStyles ? assignStyle(document.body, { background: "black" }) : noop, assignStyle(wrapper, {
				transformOrigin: isVertical(direction) ? "top" : "left",
				transitionProperty: "transform, border-radius",
				transitionDuration: `${TRANSITIONS.DURATION}s`,
				transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(",")})`
			}));
			const wrapperStylesCleanup = assignStyle(wrapper, {
				borderRadius: `${BORDER_RADIUS}px`,
				overflow: "hidden",
				...isVertical(direction) ? { transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)` } : { transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)` }
			});
			return () => {
				wrapperStylesCleanup();
				timeoutIdRef.current = window.setTimeout(() => {
					if (initialBackgroundColor) document.body.style.background = initialBackgroundColor;
					else document.body.style.removeProperty("background");
				}, TRANSITIONS.DURATION * 1e3);
			};
		}
	}, [
		isOpen,
		shouldScaleBackground,
		initialBackgroundColor
	]);
}
var previousBodyPosition = null;
/**
* This hook is necessary to prevent buggy behavior on iOS devices (need to test on Android).
* I won't get into too much detail about what bugs it solves, but so far I've found that setting the body to `position: fixed` is the most reliable way to prevent those bugs.
* Issues that this hook solves:
* https://github.com/emilkowalski/vaul/issues/435
* https://github.com/emilkowalski/vaul/issues/433
* And more that I discovered, but were just not reported.
*/ function usePositionFixed({ isOpen, modal, nested, hasBeenOpened, preventScrollRestoration, noBodyStyles }) {
	const [activeUrl, setActiveUrl] = import_react.useState(() => typeof window !== "undefined" ? window.location.href : "");
	const scrollPos = import_react.useRef(0);
	const setPositionFixed = import_react.useCallback(() => {
		if (!isSafari()) return;
		if (previousBodyPosition === null && isOpen && !noBodyStyles) {
			previousBodyPosition = {
				position: document.body.style.position,
				top: document.body.style.top,
				left: document.body.style.left,
				height: document.body.style.height,
				right: "unset"
			};
			const { scrollX, innerHeight } = window;
			document.body.style.setProperty("position", "fixed", "important");
			Object.assign(document.body.style, {
				top: `${-scrollPos.current}px`,
				left: `${-scrollX}px`,
				right: "0px",
				height: "auto"
			});
			window.setTimeout(() => window.requestAnimationFrame(() => {
				const bottomBarHeight = innerHeight - window.innerHeight;
				if (bottomBarHeight && scrollPos.current >= innerHeight) document.body.style.top = `${-(scrollPos.current + bottomBarHeight)}px`;
			}), 300);
		}
	}, [isOpen]);
	const restorePositionSetting = import_react.useCallback(() => {
		if (!isSafari()) return;
		if (previousBodyPosition !== null && !noBodyStyles) {
			const y = -parseInt(document.body.style.top, 10);
			const x = -parseInt(document.body.style.left, 10);
			Object.assign(document.body.style, previousBodyPosition);
			window.requestAnimationFrame(() => {
				if (preventScrollRestoration && activeUrl !== window.location.href) {
					setActiveUrl(window.location.href);
					return;
				}
				window.scrollTo(x, y);
			});
			previousBodyPosition = null;
		}
	}, [activeUrl]);
	import_react.useEffect(() => {
		function onScroll() {
			scrollPos.current = window.scrollY;
		}
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);
	import_react.useEffect(() => {
		if (!modal) return;
		return () => {
			if (typeof document === "undefined") return;
			if (!!document.querySelector("[data-vaul-drawer]")) return;
			restorePositionSetting();
		};
	}, [modal, restorePositionSetting]);
	import_react.useEffect(() => {
		if (nested || !hasBeenOpened) return;
		if (isOpen) {
			!window.matchMedia("(display-mode: standalone)").matches && setPositionFixed();
			if (!modal) window.setTimeout(() => {
				restorePositionSetting();
			}, 500);
		} else restorePositionSetting();
	}, [
		isOpen,
		hasBeenOpened,
		activeUrl,
		modal,
		nested,
		setPositionFixed,
		restorePositionSetting
	]);
	return { restorePositionSetting };
}
function Root({ open: openProp, onOpenChange, children, onDrag: onDragProp, onRelease: onReleaseProp, snapPoints, shouldScaleBackground = false, setBackgroundColorOnScale = true, closeThreshold = CLOSE_THRESHOLD, scrollLockTimeout = SCROLL_LOCK_TIMEOUT, dismissible = true, handleOnly = false, fadeFromIndex = snapPoints && snapPoints.length - 1, activeSnapPoint: activeSnapPointProp, setActiveSnapPoint: setActiveSnapPointProp, fixed, modal = true, onClose, nested, noBodyStyles = false, direction = "bottom", defaultOpen = false, disablePreventScroll = true, snapToSequentialPoint = false, preventScrollRestoration = false, repositionInputs = true, onAnimationEnd, container, autoFocus = false }) {
	var _drawerRef_current, _drawerRef_current1;
	const [isOpen = false, setIsOpen] = useControllableState({
		defaultProp: defaultOpen,
		prop: openProp,
		onChange: (o) => {
			onOpenChange?.(o);
			if (!o && !nested) restorePositionSetting();
			setTimeout(() => {
				onAnimationEnd?.(o);
			}, TRANSITIONS.DURATION * 1e3);
			if (o && !modal) {
				if (typeof window !== "undefined") window.requestAnimationFrame(() => {
					document.body.style.pointerEvents = "auto";
				});
			}
			if (!o) document.body.style.pointerEvents = "auto";
		}
	});
	const [hasBeenOpened, setHasBeenOpened] = import_react.useState(false);
	const [isDragging, setIsDragging] = import_react.useState(false);
	const [justReleased, setJustReleased] = import_react.useState(false);
	const overlayRef = import_react.useRef(null);
	const openTime = import_react.useRef(null);
	const dragStartTime = import_react.useRef(null);
	const dragEndTime = import_react.useRef(null);
	const lastTimeDragPrevented = import_react.useRef(null);
	const isAllowedToDrag = import_react.useRef(false);
	const nestedOpenChangeTimer = import_react.useRef(null);
	const pointerStart = import_react.useRef(0);
	const keyboardIsOpen = import_react.useRef(false);
	const shouldAnimate = import_react.useRef(!defaultOpen);
	const previousDiffFromInitial = import_react.useRef(0);
	const drawerRef = import_react.useRef(null);
	const drawerHeightRef = import_react.useRef(((_drawerRef_current = drawerRef.current) == null ? void 0 : _drawerRef_current.getBoundingClientRect().height) || 0);
	const drawerWidthRef = import_react.useRef(((_drawerRef_current1 = drawerRef.current) == null ? void 0 : _drawerRef_current1.getBoundingClientRect().width) || 0);
	const initialDrawerHeight = import_react.useRef(0);
	const { activeSnapPoint, activeSnapPointIndex, setActiveSnapPoint, onRelease: onReleaseSnapPoints, snapPointsOffset, onDrag: onDragSnapPoints, shouldFade, getPercentageDragged: getSnapPointsPercentageDragged } = useSnapPoints({
		snapPoints,
		activeSnapPointProp,
		setActiveSnapPointProp,
		drawerRef,
		fadeFromIndex,
		overlayRef,
		onSnapPointChange: import_react.useCallback((activeSnapPointIndex) => {
			if (snapPoints && activeSnapPointIndex === snapPointsOffset.length - 1) openTime.current = /* @__PURE__ */ new Date();
		}, []),
		direction,
		container,
		snapToSequentialPoint
	});
	usePreventScroll({ isDisabled: !isOpen || isDragging || !modal || justReleased || !hasBeenOpened || !repositionInputs || !disablePreventScroll });
	const { restorePositionSetting } = usePositionFixed({
		isOpen,
		modal,
		nested: nested != null ? nested : false,
		hasBeenOpened,
		preventScrollRestoration,
		noBodyStyles
	});
	function getScale() {
		return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
	}
	function onPress(event) {
		var _drawerRef_current, _drawerRef_current1;
		if (!dismissible && !snapPoints) return;
		if (drawerRef.current && !drawerRef.current.contains(event.target)) return;
		drawerHeightRef.current = ((_drawerRef_current = drawerRef.current) == null ? void 0 : _drawerRef_current.getBoundingClientRect().height) || 0;
		drawerWidthRef.current = ((_drawerRef_current1 = drawerRef.current) == null ? void 0 : _drawerRef_current1.getBoundingClientRect().width) || 0;
		setIsDragging(true);
		dragStartTime.current = /* @__PURE__ */ new Date();
		if (isIOS()) window.addEventListener("touchend", () => isAllowedToDrag.current = false, { once: true });
		event.target.setPointerCapture(event.pointerId);
		pointerStart.current = isVertical(direction) ? event.pageY : event.pageX;
	}
	function shouldDrag(el, isDraggingInDirection) {
		var _window_getSelection;
		let element = el;
		const highlightedText = (_window_getSelection = window.getSelection()) == null ? void 0 : _window_getSelection.toString();
		const swipeAmount = drawerRef.current ? getTranslate(drawerRef.current, direction) : null;
		const date = /* @__PURE__ */ new Date();
		if (element.tagName === "SELECT") return false;
		if (element.hasAttribute("data-vaul-no-drag") || element.closest("[data-vaul-no-drag]")) return false;
		if (direction === "right" || direction === "left") return true;
		if (openTime.current && date.getTime() - openTime.current.getTime() < 500) return false;
		if (swipeAmount !== null) {
			if (direction === "bottom" ? swipeAmount > 0 : swipeAmount < 0) return true;
		}
		if (highlightedText && highlightedText.length > 0) return false;
		if (lastTimeDragPrevented.current && date.getTime() - lastTimeDragPrevented.current.getTime() < scrollLockTimeout && swipeAmount === 0) {
			lastTimeDragPrevented.current = date;
			return false;
		}
		if (isDraggingInDirection) {
			lastTimeDragPrevented.current = date;
			return false;
		}
		while (element) {
			if (element.scrollHeight > element.clientHeight) {
				if (element.scrollTop !== 0) {
					lastTimeDragPrevented.current = /* @__PURE__ */ new Date();
					return false;
				}
				if (element.getAttribute("role") === "dialog") return true;
			}
			element = element.parentNode;
		}
		return true;
	}
	function onDrag(event) {
		if (!drawerRef.current) return;
		if (isDragging) {
			const directionMultiplier = direction === "bottom" || direction === "right" ? 1 : -1;
			const draggedDistance = (pointerStart.current - (isVertical(direction) ? event.pageY : event.pageX)) * directionMultiplier;
			const isDraggingInDirection = draggedDistance > 0;
			const noCloseSnapPointsPreCondition = snapPoints && !dismissible && !isDraggingInDirection;
			if (noCloseSnapPointsPreCondition && activeSnapPointIndex === 0) return;
			const absDraggedDistance = Math.abs(draggedDistance);
			const wrapper = document.querySelector("[data-vaul-drawer-wrapper]");
			let percentageDragged = absDraggedDistance / (direction === "bottom" || direction === "top" ? drawerHeightRef.current : drawerWidthRef.current);
			const snapPointPercentageDragged = getSnapPointsPercentageDragged(absDraggedDistance, isDraggingInDirection);
			if (snapPointPercentageDragged !== null) percentageDragged = snapPointPercentageDragged;
			if (noCloseSnapPointsPreCondition && percentageDragged >= 1) return;
			if (!isAllowedToDrag.current && !shouldDrag(event.target, isDraggingInDirection)) return;
			drawerRef.current.classList.add(DRAG_CLASS);
			isAllowedToDrag.current = true;
			set(drawerRef.current, { transition: "none" });
			set(overlayRef.current, { transition: "none" });
			if (snapPoints) onDragSnapPoints({ draggedDistance });
			if (isDraggingInDirection && !snapPoints) {
				const dampenedDraggedDistance = dampenValue(draggedDistance);
				const translateValue = Math.min(dampenedDraggedDistance * -1, 0) * directionMultiplier;
				set(drawerRef.current, { transform: isVertical(direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)` });
				return;
			}
			const opacityValue = 1 - percentageDragged;
			if (shouldFade || fadeFromIndex && activeSnapPointIndex === fadeFromIndex - 1) {
				onDragProp?.(event, percentageDragged);
				set(overlayRef.current, {
					opacity: `${opacityValue}`,
					transition: "none"
				}, true);
			}
			if (wrapper && overlayRef.current && shouldScaleBackground) {
				const scaleValue = Math.min(getScale() + percentageDragged * (1 - getScale()), 1);
				const borderRadiusValue = 8 - percentageDragged * 8;
				const translateValue = Math.max(0, 14 - percentageDragged * 14);
				set(wrapper, {
					borderRadius: `${borderRadiusValue}px`,
					transform: isVertical(direction) ? `scale(${scaleValue}) translate3d(0, ${translateValue}px, 0)` : `scale(${scaleValue}) translate3d(${translateValue}px, 0, 0)`,
					transition: "none"
				}, true);
			}
			if (!snapPoints) {
				const translateValue = absDraggedDistance * directionMultiplier;
				set(drawerRef.current, { transform: isVertical(direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)` });
			}
		}
	}
	import_react.useEffect(() => {
		window.requestAnimationFrame(() => {
			shouldAnimate.current = true;
		});
	}, []);
	import_react.useEffect(() => {
		var _window_visualViewport;
		function onVisualViewportChange() {
			if (!drawerRef.current || !repositionInputs) return;
			const focusedElement = document.activeElement;
			if (isInput(focusedElement) || keyboardIsOpen.current) {
				var _window_visualViewport;
				const visualViewportHeight = ((_window_visualViewport = window.visualViewport) == null ? void 0 : _window_visualViewport.height) || 0;
				const totalHeight = window.innerHeight;
				let diffFromInitial = totalHeight - visualViewportHeight;
				const drawerHeight = drawerRef.current.getBoundingClientRect().height || 0;
				const isTallEnough = drawerHeight > totalHeight * .8;
				if (!initialDrawerHeight.current) initialDrawerHeight.current = drawerHeight;
				const offsetFromTop = drawerRef.current.getBoundingClientRect().top;
				if (Math.abs(previousDiffFromInitial.current - diffFromInitial) > 60) keyboardIsOpen.current = !keyboardIsOpen.current;
				if (snapPoints && snapPoints.length > 0 && snapPointsOffset && activeSnapPointIndex) {
					const activeSnapPointHeight = snapPointsOffset[activeSnapPointIndex] || 0;
					diffFromInitial += activeSnapPointHeight;
				}
				previousDiffFromInitial.current = diffFromInitial;
				if (drawerHeight > visualViewportHeight || keyboardIsOpen.current) {
					const height = drawerRef.current.getBoundingClientRect().height;
					let newDrawerHeight = height;
					if (height > visualViewportHeight) newDrawerHeight = visualViewportHeight - (isTallEnough ? offsetFromTop : WINDOW_TOP_OFFSET);
					if (fixed) drawerRef.current.style.height = `${height - Math.max(diffFromInitial, 0)}px`;
					else drawerRef.current.style.height = `${Math.max(newDrawerHeight, visualViewportHeight - offsetFromTop)}px`;
				} else if (!isMobileFirefox()) drawerRef.current.style.height = `${initialDrawerHeight.current}px`;
				if (snapPoints && snapPoints.length > 0 && !keyboardIsOpen.current) drawerRef.current.style.bottom = `0px`;
				else drawerRef.current.style.bottom = `${Math.max(diffFromInitial, 0)}px`;
			}
		}
		(_window_visualViewport = window.visualViewport) == null || _window_visualViewport.addEventListener("resize", onVisualViewportChange);
		return () => {
			var _window_visualViewport;
			return (_window_visualViewport = window.visualViewport) == null ? void 0 : _window_visualViewport.removeEventListener("resize", onVisualViewportChange);
		};
	}, [
		activeSnapPointIndex,
		snapPoints,
		snapPointsOffset
	]);
	function closeDrawer(fromWithin) {
		cancelDrag();
		onClose?.();
		if (!fromWithin) setIsOpen(false);
		setTimeout(() => {
			if (snapPoints) setActiveSnapPoint(snapPoints[0]);
		}, TRANSITIONS.DURATION * 1e3);
	}
	function resetDrawer() {
		if (!drawerRef.current) return;
		const wrapper = document.querySelector("[data-vaul-drawer-wrapper]");
		const currentSwipeAmount = getTranslate(drawerRef.current, direction);
		set(drawerRef.current, {
			transform: "translate3d(0, 0, 0)",
			transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`
		});
		set(overlayRef.current, {
			transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
			opacity: "1"
		});
		if (shouldScaleBackground && currentSwipeAmount && currentSwipeAmount > 0 && isOpen) set(wrapper, {
			borderRadius: `${BORDER_RADIUS}px`,
			overflow: "hidden",
			...isVertical(direction) ? {
				transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
				transformOrigin: "top"
			} : {
				transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
				transformOrigin: "left"
			},
			transitionProperty: "transform, border-radius",
			transitionDuration: `${TRANSITIONS.DURATION}s`,
			transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(",")})`
		}, true);
	}
	function cancelDrag() {
		if (!isDragging || !drawerRef.current) return;
		drawerRef.current.classList.remove(DRAG_CLASS);
		isAllowedToDrag.current = false;
		setIsDragging(false);
		dragEndTime.current = /* @__PURE__ */ new Date();
	}
	function onRelease(event) {
		if (!isDragging || !drawerRef.current) return;
		drawerRef.current.classList.remove(DRAG_CLASS);
		isAllowedToDrag.current = false;
		setIsDragging(false);
		dragEndTime.current = /* @__PURE__ */ new Date();
		const swipeAmount = getTranslate(drawerRef.current, direction);
		if (!event || !shouldDrag(event.target, false) || !swipeAmount || Number.isNaN(swipeAmount)) return;
		if (dragStartTime.current === null) return;
		const timeTaken = dragEndTime.current.getTime() - dragStartTime.current.getTime();
		const distMoved = pointerStart.current - (isVertical(direction) ? event.pageY : event.pageX);
		const velocity = Math.abs(distMoved) / timeTaken;
		if (velocity > .05) {
			setJustReleased(true);
			setTimeout(() => {
				setJustReleased(false);
			}, 200);
		}
		if (snapPoints) {
			onReleaseSnapPoints({
				draggedDistance: distMoved * (direction === "bottom" || direction === "right" ? 1 : -1),
				closeDrawer,
				velocity,
				dismissible
			});
			onReleaseProp?.(event, true);
			return;
		}
		if (direction === "bottom" || direction === "right" ? distMoved > 0 : distMoved < 0) {
			resetDrawer();
			onReleaseProp?.(event, true);
			return;
		}
		if (velocity > VELOCITY_THRESHOLD) {
			closeDrawer();
			onReleaseProp?.(event, false);
			return;
		}
		var _drawerRef_current_getBoundingClientRect_height;
		const visibleDrawerHeight = Math.min((_drawerRef_current_getBoundingClientRect_height = drawerRef.current.getBoundingClientRect().height) != null ? _drawerRef_current_getBoundingClientRect_height : 0, window.innerHeight);
		var _drawerRef_current_getBoundingClientRect_width;
		const visibleDrawerWidth = Math.min((_drawerRef_current_getBoundingClientRect_width = drawerRef.current.getBoundingClientRect().width) != null ? _drawerRef_current_getBoundingClientRect_width : 0, window.innerWidth);
		const isHorizontalSwipe = direction === "left" || direction === "right";
		if (Math.abs(swipeAmount) >= (isHorizontalSwipe ? visibleDrawerWidth : visibleDrawerHeight) * closeThreshold) {
			closeDrawer();
			onReleaseProp?.(event, false);
			return;
		}
		onReleaseProp?.(event, true);
		resetDrawer();
	}
	import_react.useEffect(() => {
		if (isOpen) {
			set(document.documentElement, { scrollBehavior: "auto" });
			openTime.current = /* @__PURE__ */ new Date();
		}
		return () => {
			reset(document.documentElement, "scrollBehavior");
		};
	}, [isOpen]);
	function onNestedOpenChange(o) {
		const scale = o ? (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth : 1;
		const initialTranslate = o ? -NESTED_DISPLACEMENT : 0;
		if (nestedOpenChangeTimer.current) window.clearTimeout(nestedOpenChangeTimer.current);
		set(drawerRef.current, {
			transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
			transform: isVertical(direction) ? `scale(${scale}) translate3d(0, ${initialTranslate}px, 0)` : `scale(${scale}) translate3d(${initialTranslate}px, 0, 0)`
		});
		if (!o && drawerRef.current) nestedOpenChangeTimer.current = setTimeout(() => {
			const translateValue = getTranslate(drawerRef.current, direction);
			set(drawerRef.current, {
				transition: "none",
				transform: isVertical(direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
			});
		}, 500);
	}
	function onNestedDrag(_event, percentageDragged) {
		if (percentageDragged < 0) return;
		const initialScale = (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth;
		const newScale = initialScale + percentageDragged * (1 - initialScale);
		const newTranslate = -NESTED_DISPLACEMENT + percentageDragged * NESTED_DISPLACEMENT;
		set(drawerRef.current, {
			transform: isVertical(direction) ? `scale(${newScale}) translate3d(0, ${newTranslate}px, 0)` : `scale(${newScale}) translate3d(${newTranslate}px, 0, 0)`,
			transition: "none"
		});
	}
	function onNestedRelease(_event, o) {
		const dim = isVertical(direction) ? window.innerHeight : window.innerWidth;
		const scale = o ? (dim - NESTED_DISPLACEMENT) / dim : 1;
		const translate = o ? -NESTED_DISPLACEMENT : 0;
		if (o) set(drawerRef.current, {
			transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
			transform: isVertical(direction) ? `scale(${scale}) translate3d(0, ${translate}px, 0)` : `scale(${scale}) translate3d(${translate}px, 0, 0)`
		});
	}
	import_react.useEffect(() => {
		if (!modal) window.requestAnimationFrame(() => {
			document.body.style.pointerEvents = "auto";
		});
	}, [modal]);
	return /* @__PURE__ */ import_react.createElement(Root$1, {
		defaultOpen,
		onOpenChange: (open) => {
			if (!dismissible && !open) return;
			if (open) setHasBeenOpened(true);
			else closeDrawer(true);
			setIsOpen(open);
		},
		open: isOpen
	}, /* @__PURE__ */ import_react.createElement(DrawerContext.Provider, { value: {
		activeSnapPoint,
		snapPoints,
		setActiveSnapPoint,
		drawerRef,
		overlayRef,
		onOpenChange,
		onPress,
		onRelease,
		onDrag,
		dismissible,
		shouldAnimate,
		handleOnly,
		isOpen,
		isDragging,
		shouldFade,
		closeDrawer,
		onNestedDrag,
		onNestedOpenChange,
		onNestedRelease,
		keyboardIsOpen,
		modal,
		snapPointsOffset,
		activeSnapPointIndex,
		direction,
		shouldScaleBackground,
		setBackgroundColorOnScale,
		noBodyStyles,
		container,
		autoFocus
	} }, children));
}
var Overlay = /* @__PURE__ */ import_react.forwardRef(function({ ...rest }, ref) {
	const { overlayRef, snapPoints, onRelease, shouldFade, isOpen, modal, shouldAnimate } = useDrawerContext();
	const composedRef = useComposedRefs(ref, overlayRef);
	const hasSnapPoints = snapPoints && snapPoints.length > 0;
	if (!modal) return null;
	const onMouseUp = import_react.useCallback((event) => onRelease(event), [onRelease]);
	return /* @__PURE__ */ import_react.createElement(Overlay$1, {
		onMouseUp,
		ref: composedRef,
		"data-vaul-overlay": "",
		"data-vaul-snap-points": isOpen && hasSnapPoints ? "true" : "false",
		"data-vaul-snap-points-overlay": isOpen && shouldFade ? "true" : "false",
		"data-vaul-animate": (shouldAnimate == null ? void 0 : shouldAnimate.current) ? "true" : "false",
		...rest
	});
});
Overlay.displayName = "Drawer.Overlay";
var Content = /* @__PURE__ */ import_react.forwardRef(function({ onPointerDownOutside, style, onOpenAutoFocus, ...rest }, ref) {
	const { drawerRef, onPress, onRelease, onDrag, keyboardIsOpen, snapPointsOffset, activeSnapPointIndex, modal, isOpen, direction, snapPoints, container, handleOnly, shouldAnimate, autoFocus } = useDrawerContext();
	const [delayedSnapPoints, setDelayedSnapPoints] = import_react.useState(false);
	const composedRef = useComposedRefs(ref, drawerRef);
	const pointerStartRef = import_react.useRef(null);
	const lastKnownPointerEventRef = import_react.useRef(null);
	const wasBeyondThePointRef = import_react.useRef(false);
	const hasSnapPoints = snapPoints && snapPoints.length > 0;
	useScaleBackground();
	const isDeltaInDirection = (delta, direction, threshold = 0) => {
		if (wasBeyondThePointRef.current) return true;
		const deltaY = Math.abs(delta.y);
		const deltaX = Math.abs(delta.x);
		const isDeltaX = deltaX > deltaY;
		const dFactor = ["bottom", "right"].includes(direction) ? 1 : -1;
		if (direction === "left" || direction === "right") {
			if (!(delta.x * dFactor < 0) && deltaX >= 0 && deltaX <= threshold) return isDeltaX;
		} else if (!(delta.y * dFactor < 0) && deltaY >= 0 && deltaY <= threshold) return !isDeltaX;
		wasBeyondThePointRef.current = true;
		return true;
	};
	import_react.useEffect(() => {
		if (hasSnapPoints) window.requestAnimationFrame(() => {
			setDelayedSnapPoints(true);
		});
	}, []);
	function handleOnPointerUp(event) {
		pointerStartRef.current = null;
		wasBeyondThePointRef.current = false;
		onRelease(event);
	}
	return /* @__PURE__ */ import_react.createElement(Content$1, {
		"data-vaul-drawer-direction": direction,
		"data-vaul-drawer": "",
		"data-vaul-delayed-snap-points": delayedSnapPoints ? "true" : "false",
		"data-vaul-snap-points": isOpen && hasSnapPoints ? "true" : "false",
		"data-vaul-custom-container": container ? "true" : "false",
		"data-vaul-animate": (shouldAnimate == null ? void 0 : shouldAnimate.current) ? "true" : "false",
		...rest,
		ref: composedRef,
		style: snapPointsOffset && snapPointsOffset.length > 0 ? {
			"--snap-point-height": `${snapPointsOffset[activeSnapPointIndex != null ? activeSnapPointIndex : 0]}px`,
			...style
		} : style,
		onPointerDown: (event) => {
			if (handleOnly) return;
			rest.onPointerDown == null || rest.onPointerDown.call(rest, event);
			pointerStartRef.current = {
				x: event.pageX,
				y: event.pageY
			};
			onPress(event);
		},
		onOpenAutoFocus: (e) => {
			onOpenAutoFocus?.(e);
			if (!autoFocus) e.preventDefault();
		},
		onPointerDownOutside: (e) => {
			onPointerDownOutside?.(e);
			if (!modal || e.defaultPrevented) {
				e.preventDefault();
				return;
			}
			if (keyboardIsOpen.current) keyboardIsOpen.current = false;
		},
		onFocusOutside: (e) => {
			if (!modal) {
				e.preventDefault();
				return;
			}
		},
		onPointerMove: (event) => {
			lastKnownPointerEventRef.current = event;
			if (handleOnly) return;
			rest.onPointerMove == null || rest.onPointerMove.call(rest, event);
			if (!pointerStartRef.current) return;
			const yPosition = event.pageY - pointerStartRef.current.y;
			const xPosition = event.pageX - pointerStartRef.current.x;
			const swipeStartThreshold = event.pointerType === "touch" ? 10 : 2;
			if (isDeltaInDirection({
				x: xPosition,
				y: yPosition
			}, direction, swipeStartThreshold)) onDrag(event);
			else if (Math.abs(xPosition) > swipeStartThreshold || Math.abs(yPosition) > swipeStartThreshold) pointerStartRef.current = null;
		},
		onPointerUp: (event) => {
			rest.onPointerUp == null || rest.onPointerUp.call(rest, event);
			pointerStartRef.current = null;
			wasBeyondThePointRef.current = false;
			onRelease(event);
		},
		onPointerOut: (event) => {
			rest.onPointerOut == null || rest.onPointerOut.call(rest, event);
			handleOnPointerUp(lastKnownPointerEventRef.current);
		},
		onContextMenu: (event) => {
			rest.onContextMenu == null || rest.onContextMenu.call(rest, event);
			if (lastKnownPointerEventRef.current) handleOnPointerUp(lastKnownPointerEventRef.current);
		}
	});
});
Content.displayName = "Drawer.Content";
var LONG_HANDLE_PRESS_TIMEOUT = 250;
var DOUBLE_TAP_TIMEOUT = 120;
var Handle = /* @__PURE__ */ import_react.forwardRef(function({ preventCycle = false, children, ...rest }, ref) {
	const { closeDrawer, isDragging, snapPoints, activeSnapPoint, setActiveSnapPoint, dismissible, handleOnly, isOpen, onPress, onDrag } = useDrawerContext();
	const closeTimeoutIdRef = import_react.useRef(null);
	const shouldCancelInteractionRef = import_react.useRef(false);
	function handleStartCycle() {
		if (shouldCancelInteractionRef.current) {
			handleCancelInteraction();
			return;
		}
		window.setTimeout(() => {
			handleCycleSnapPoints();
		}, DOUBLE_TAP_TIMEOUT);
	}
	function handleCycleSnapPoints() {
		if (isDragging || preventCycle || shouldCancelInteractionRef.current) {
			handleCancelInteraction();
			return;
		}
		handleCancelInteraction();
		if (!snapPoints || snapPoints.length === 0) {
			if (!dismissible) closeDrawer();
			return;
		}
		if (activeSnapPoint === snapPoints[snapPoints.length - 1] && dismissible) {
			closeDrawer();
			return;
		}
		const currentSnapIndex = snapPoints.findIndex((point) => point === activeSnapPoint);
		if (currentSnapIndex === -1) return;
		const nextSnapPoint = snapPoints[currentSnapIndex + 1];
		setActiveSnapPoint(nextSnapPoint);
	}
	function handleStartInteraction() {
		closeTimeoutIdRef.current = window.setTimeout(() => {
			shouldCancelInteractionRef.current = true;
		}, LONG_HANDLE_PRESS_TIMEOUT);
	}
	function handleCancelInteraction() {
		if (closeTimeoutIdRef.current) window.clearTimeout(closeTimeoutIdRef.current);
		shouldCancelInteractionRef.current = false;
	}
	return /* @__PURE__ */ import_react.createElement("div", {
		onClick: handleStartCycle,
		onPointerCancel: handleCancelInteraction,
		onPointerDown: (e) => {
			if (handleOnly) onPress(e);
			handleStartInteraction();
		},
		onPointerMove: (e) => {
			if (handleOnly) onDrag(e);
		},
		ref,
		"data-vaul-drawer-visible": isOpen ? "true" : "false",
		"data-vaul-handle": "",
		"aria-hidden": "true",
		...rest
	}, /* @__PURE__ */ import_react.createElement("span", {
		"data-vaul-handle-hitarea": "",
		"aria-hidden": "true"
	}, children));
});
Handle.displayName = "Drawer.Handle";
function NestedRoot({ onDrag, onOpenChange, open: nestedIsOpen, ...rest }) {
	const { onNestedDrag, onNestedOpenChange, onNestedRelease } = useDrawerContext();
	if (!onNestedDrag) throw new Error("Drawer.NestedRoot must be placed in another drawer");
	return /* @__PURE__ */ import_react.createElement(Root, {
		nested: true,
		open: nestedIsOpen,
		onClose: () => {
			onNestedOpenChange(false);
		},
		onDrag: (e, p) => {
			onNestedDrag(e, p);
			onDrag?.(e, p);
		},
		onOpenChange: (o) => {
			if (o) onNestedOpenChange(o);
			onOpenChange?.(o);
		},
		onRelease: onNestedRelease,
		...rest
	});
}
function Portal(props) {
	const context = useDrawerContext();
	const { container = context.container, ...portalProps } = props;
	return /* @__PURE__ */ import_react.createElement(Portal$1, {
		container,
		...portalProps
	});
}
var Drawer$1 = {
	Root,
	NestedRoot,
	Content,
	Overlay,
	Trigger,
	Portal,
	Handle,
	Close,
	Title,
	Description
};
//#endregion
//#region src/components/ui/drawer.tsx
var import_jsx_runtime = require_jsx_runtime();
var Drawer = ({ shouldScaleBackground = true, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1.Root, {
	"data-uid": "src/components/ui/drawer.tsx:11:3",
	"data-prohibitions": "[editContent]",
	shouldScaleBackground,
	...props
});
Drawer.displayName = "Drawer";
Drawer$1.Trigger;
var DrawerPortal = Drawer$1.Portal;
var DrawerClose = Drawer$1.Close;
var DrawerOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1.Overlay, {
	"data-uid": "src/components/ui/drawer.tsx:25:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80", className),
	...props
}));
DrawerOverlay.displayName = Drawer$1.Overlay.displayName;
var DrawerContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerPortal, {
	"data-uid": "src/components/ui/drawer.tsx:37:3",
	"data-prohibitions": "[editContent]",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerOverlay, {
		"data-uid": "src/components/ui/drawer.tsx:38:5",
		"data-prohibitions": "[editContent]"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer$1.Content, {
		"data-uid": "src/components/ui/drawer.tsx:39:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/ui/drawer.tsx:47:7",
			"data-prohibitions": "[editContent]",
			className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"
		}), children]
	})]
}));
DrawerContent.displayName = "DrawerContent";
var DrawerHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/drawer.tsx:55:3",
	"data-prohibitions": "[editContent]",
	className: cn("grid gap-1.5 p-4 text-center sm:text-left", className),
	...props
});
DrawerHeader.displayName = "DrawerHeader";
var DrawerFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/drawer.tsx:60:3",
	"data-prohibitions": "[editContent]",
	className: cn("mt-auto flex flex-col gap-2 p-4", className),
	...props
});
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1.Title, {
	"data-uid": "src/components/ui/drawer.tsx:68:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DrawerTitle.displayName = Drawer$1.Title.displayName;
var DrawerDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1.Description, {
	"data-uid": "src/components/ui/drawer.tsx:80:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DrawerDescription.displayName = Drawer$1.Description.displayName;
//#endregion
//#region src/pages/Candidates.tsx
var STATUS_COLORS = {
	Novo: "bg-blue-100 text-blue-800 hover:bg-blue-100",
	"Documentação Pendente": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
	"Em Análise da Gerência": "bg-purple-100 text-purple-800 hover:bg-purple-100",
	"Aguardando Vistoria": "bg-orange-100 text-orange-800 hover:bg-orange-100",
	Aprovado: "bg-green-100 text-green-800 hover:bg-green-100",
	Reprovado: "bg-red-100 text-red-800 hover:bg-red-100"
};
var STATUS_OPTIONS = [
	"Novo",
	"Documentação Pendente",
	"Em Análise da Gerência",
	"Aguardando Vistoria",
	"Aprovado",
	"Reprovado"
];
function Candidates() {
	const [candidates, setCandidates] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	const [selectedCandidate, setSelectedCandidate] = (0, import_react.useState)(null);
	const [isDrawerOpen, setIsDrawerOpen] = (0, import_react.useState)(false);
	const [updating, setUpdating] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("PF");
	const fetchCandidates = async () => {
		try {
			setLoading(true);
			setCandidates(await candidatesService.getCandidates());
		} catch (error) {
			console.error(error);
			toast.error("Erro ao carregar interessados");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchCandidates();
	}, []);
	const handleSync = async () => {
		try {
			setSyncing(true);
			const count = await candidatesService.syncFromSharePoint();
			if (count > 0) toast.success(`${count} novos interessados sincronizados com sucesso!`);
			else toast.info("Nenhum novo registro encontrado no SharePoint.");
			await fetchCandidates();
		} catch (error) {
			console.error(error);
			toast.error("Erro ao sincronizar com o SharePoint.");
		} finally {
			setSyncing(false);
		}
	};
	const handleStatusChange = async (id, newStatus) => {
		try {
			setUpdating(true);
			const updated = await candidatesService.updateStatus(id, newStatus);
			setCandidates(candidates.map((c) => c.id === id ? updated : c));
			if (selectedCandidate?.id === id) setSelectedCandidate(updated);
			toast.success("Status atualizado com sucesso");
		} catch (error) {
			console.error(error);
			toast.error("Erro ao atualizar status");
		} finally {
			setUpdating(false);
		}
	};
	const handleExportJSON = (candidate) => {
		const exportData = {
			id: candidate.id,
			nome: candidate.full_name,
			cpf: candidate.cpf,
			cnpj: candidate.cnpj,
			endereco: candidate.address,
			email: candidate.email,
			telefone: candidate.phone,
			categoria: candidate.category,
			status: candidate.status,
			dados_adicionais: candidate.form_data,
			data_cadastro: candidate.created_at,
			data_aprovacao: (/* @__PURE__ */ new Date()).toISOString()
		};
		const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `interessado_${candidate.cpf?.replace(/\D/g, "") || candidate.cnpj?.replace(/\D/g, "") || candidate.id}.json`;
		a.click();
		URL.revokeObjectURL(url);
		toast.success("Arquivo JSON gerado com sucesso");
	};
	const openCandidateDetails = (candidate) => {
		setSelectedCandidate(candidate);
		setIsDrawerOpen(true);
	};
	const filteredCandidates = candidates.filter((c) => (c.category || "PF") === activeTab);
	if (loading && candidates.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/Candidates.tsx:153:7",
		"data-prohibitions": "[]",
		className: "flex h-full w-full items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			"data-uid": "src/pages/Candidates.tsx:154:9",
			"data-prohibitions": "[editContent]",
			className: "h-8 w-8 animate-spin text-primary"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Candidates.tsx:160:5",
		"data-prohibitions": "[editContent]",
		className: "flex-1 space-y-4 p-4 md:p-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Candidates.tsx:161:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/Candidates.tsx:162:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-slate-800",
					children: "Gestão de Interessados"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Candidates.tsx:163:9",
					"data-prohibitions": "[editContent]",
					onClick: handleSync,
					disabled: syncing || loading,
					className: "w-full sm:w-auto",
					children: [syncing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						"data-uid": "src/pages/Candidates.tsx:165:13",
						"data-prohibitions": "[editContent]",
						className: "mr-2 h-4 w-4 animate-spin"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						"data-uid": "src/pages/Candidates.tsx:167:13",
						"data-prohibitions": "[editContent]",
						className: "mr-2 h-4 w-4"
					}), "Sincronizar SharePoint"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/Candidates.tsx:173:7",
				"data-prohibitions": "[editContent]",
				value: activeTab,
				onValueChange: (v) => setActiveTab(v),
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					"data-uid": "src/pages/Candidates.tsx:178:9",
					"data-prohibitions": "[]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/Candidates.tsx:179:11",
							"data-prohibitions": "[]",
							value: "PF",
							children: "Pessoa Física"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/Candidates.tsx:180:11",
							"data-prohibitions": "[]",
							value: "PJ",
							children: "Pessoa Jurídica"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/Candidates.tsx:181:11",
							"data-prohibitions": "[]",
							value: "Fiador",
							children: "Fiador"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Candidates.tsx:184:9",
					"data-prohibitions": "[editContent]",
					value: activeTab,
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/Candidates.tsx:185:11",
						"data-prohibitions": "[editContent]",
						className: "rounded-md border bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
							"data-uid": "src/pages/Candidates.tsx:186:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
								"data-uid": "src/pages/Candidates.tsx:187:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									"data-uid": "src/pages/Candidates.tsx:188:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/Candidates.tsx:189:19",
											"data-prohibitions": "[]",
											children: "Data de Entrada"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/Candidates.tsx:190:19",
											"data-prohibitions": "[editContent]",
											children: activeTab === "PJ" ? "Razão Social" : "Nome"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/Candidates.tsx:191:19",
											"data-prohibitions": "[editContent]",
											children: activeTab === "PJ" ? "CNPJ" : "CPF"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/Candidates.tsx:192:19",
											"data-prohibitions": "[editContent]",
											children: activeTab === "PJ" ? "Endereço" : "Contato"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/Candidates.tsx:193:19",
											"data-prohibitions": "[]",
											children: "Status"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
								"data-uid": "src/pages/Candidates.tsx:196:15",
								"data-prohibitions": "[editContent]",
								children: filteredCandidates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
									"data-uid": "src/pages/Candidates.tsx:198:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Candidates.tsx:199:21",
										"data-prohibitions": "[]",
										colSpan: 5,
										className: "text-center py-8 text-muted-foreground",
										children: "Nenhum registro encontrado nesta categoria."
									})
								}) : filteredCandidates.map((candidate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									"data-uid": "src/pages/Candidates.tsx:205:21",
									"data-prohibitions": "[editContent]",
									className: "cursor-pointer hover:bg-muted/50 transition-colors",
									onClick: () => openCandidateDetails(candidate),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Candidates.tsx:210:23",
											"data-prohibitions": "[editContent]",
											className: "whitespace-nowrap",
											children: format(new Date(candidate.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Candidates.tsx:215:23",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: candidate.full_name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Candidates.tsx:216:23",
											"data-prohibitions": "[editContent]",
											children: activeTab === "PJ" ? candidate.cnpj || "-" : candidate.cpf || "-"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Candidates.tsx:219:23",
											"data-prohibitions": "[editContent]",
											children: activeTab === "PJ" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Candidates.tsx:221:27",
												"data-prohibitions": "[editContent]",
												className: "text-sm truncate max-w-[200px] block",
												children: candidate.address || "-"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Candidates.tsx:225:27",
												"data-prohibitions": "[editContent]",
												className: "flex flex-col text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Candidates.tsx:226:29",
													"data-prohibitions": "[editContent]",
													children: candidate.email || "-"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Candidates.tsx:227:29",
													"data-prohibitions": "[editContent]",
													className: "text-muted-foreground",
													children: candidate.phone || "-"
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Candidates.tsx:231:23",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Candidates.tsx:232:25",
												"data-prohibitions": "[editContent]",
												className: STATUS_COLORS[candidate.status],
												children: candidate.status
											})
										})
									]
								}, candidate.id))
							})]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
				"data-uid": "src/pages/Candidates.tsx:245:7",
				"data-prohibitions": "[editContent]",
				open: isDrawerOpen,
				onOpenChange: setIsDrawerOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerContent, {
					"data-uid": "src/pages/Candidates.tsx:246:9",
					"data-prohibitions": "[editContent]",
					className: "max-h-[95vh]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Candidates.tsx:247:11",
						"data-prohibitions": "[editContent]",
						className: "mx-auto w-full max-w-4xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, {
								"data-uid": "src/pages/Candidates.tsx:248:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, {
									"data-uid": "src/pages/Candidates.tsx:249:15",
									"data-prohibitions": "[editContent]",
									className: "text-2xl",
									children: selectedCandidate?.full_name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerDescription, {
									"data-uid": "src/pages/Candidates.tsx:250:15",
									"data-prohibitions": "[editContent]",
									children: [
										"Ficha detalhada do registro importado (Categoria: ",
										selectedCandidate?.category,
										")"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Candidates.tsx:254:13",
								"data-prohibitions": "[editContent]",
								className: "p-4 space-y-6 overflow-y-auto max-h-[65vh]",
								children: selectedCandidate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/Candidates.tsx:257:19",
										"data-prohibitions": "[editContent]",
										className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-muted/20 p-4 rounded-lg border",
										children: selectedCandidate.category === "PJ" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Candidates.tsx:260:25",
												"data-prohibitions": "[editContent]",
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:261:27",
													"data-prohibitions": "[]",
													className: "text-sm font-medium text-muted-foreground",
													children: "CNPJ"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:262:27",
													"data-prohibitions": "[editContent]",
													className: "font-medium",
													children: selectedCandidate.cnpj || "Não informado"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Candidates.tsx:264:25",
												"data-prohibitions": "[editContent]",
												className: "space-y-1 md:col-span-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:265:27",
													"data-prohibitions": "[]",
													className: "text-sm font-medium text-muted-foreground",
													children: "Endereço"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:266:27",
													"data-prohibitions": "[editContent]",
													className: "font-medium",
													children: selectedCandidate.address || "Não informado"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Candidates.tsx:270:25",
												"data-prohibitions": "[editContent]",
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:271:27",
													"data-prohibitions": "[]",
													className: "text-sm font-medium text-muted-foreground",
													children: "E-mail"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:272:27",
													"data-prohibitions": "[editContent]",
													className: "font-medium",
													children: selectedCandidate.email || "Não informado"
												})]
											})
										] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Candidates.tsx:279:25",
												"data-prohibitions": "[editContent]",
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:280:27",
													"data-prohibitions": "[]",
													className: "text-sm font-medium text-muted-foreground",
													children: "CPF"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:281:27",
													"data-prohibitions": "[editContent]",
													className: "font-medium",
													children: selectedCandidate.cpf || "Não informado"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Candidates.tsx:283:25",
												"data-prohibitions": "[editContent]",
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:284:27",
													"data-prohibitions": "[]",
													className: "text-sm font-medium text-muted-foreground",
													children: "E-mail"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:285:27",
													"data-prohibitions": "[editContent]",
													className: "font-medium",
													children: selectedCandidate.email || "Não informado"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Candidates.tsx:289:25",
												"data-prohibitions": "[editContent]",
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:290:27",
													"data-prohibitions": "[]",
													className: "text-sm font-medium text-muted-foreground",
													children: "Telefone"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:291:27",
													"data-prohibitions": "[editContent]",
													className: "font-medium",
													children: selectedCandidate.phone || "Não informado"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Candidates.tsx:295:25",
												"data-prohibitions": "[editContent]",
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:296:27",
													"data-prohibitions": "[]",
													className: "text-sm font-medium text-muted-foreground",
													children: "Data do Cadastro"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/Candidates.tsx:299:27",
													"data-prohibitions": "[editContent]",
													className: "font-medium",
													children: format(new Date(selectedCandidate.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
												})]
											})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Candidates.tsx:313:19",
										"data-prohibitions": "[editContent]",
										className: "space-y-4 bg-white p-5 rounded-lg border shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											"data-uid": "src/pages/Candidates.tsx:314:21",
											"data-prohibitions": "[]",
											className: "font-semibold text-lg flex items-center justify-between text-slate-800",
											children: "Controle e Andamento"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Candidates.tsx:317:21",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col sm:flex-row items-start sm:items-center gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/Candidates.tsx:318:23",
												"data-prohibitions": "[editContent]",
												className: "flex-1 w-full max-w-xs",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													"data-uid": "src/pages/Candidates.tsx:319:25",
													"data-prohibitions": "[editContent]",
													disabled: updating,
													value: selectedCandidate.status,
													onValueChange: (val) => handleStatusChange(selectedCandidate.id, val),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/Candidates.tsx:326:27",
														"data-prohibitions": "[]",
														className: "w-full",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/Candidates.tsx:327:29",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione um status"
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
														"data-uid": "src/pages/Candidates.tsx:329:27",
														"data-prohibitions": "[editContent]",
														children: STATUS_OPTIONS.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/Candidates.tsx:331:31",
															"data-prohibitions": "[editContent]",
															value: status,
															children: status
														}, status))
													})]
												})
											}), selectedCandidate.status === "Aprovado" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												"data-uid": "src/pages/Candidates.tsx:340:25",
												"data-prohibitions": "[]",
												onClick: () => handleExportJSON(selectedCandidate),
												className: "bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
													"data-uid": "src/pages/Candidates.tsx:344:27",
													"data-prohibitions": "[editContent]",
													className: "mr-2 h-4 w-4"
												}), "Gerar JSON"]
											})]
										})]
									}),
									selectedCandidate.documents_link && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Candidates.tsx:352:21",
										"data-prohibitions": "[]",
										className: "space-y-2 p-5 bg-blue-50/50 rounded-lg border border-blue-100",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Candidates.tsx:353:23",
												"data-prohibitions": "[]",
												className: "text-sm font-semibold text-blue-900",
												children: "Análise Documental"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Candidates.tsx:354:23",
												"data-prohibitions": "[]",
												className: "text-sm text-blue-700 mb-3",
												children: "Acesse os arquivos enviados diretamente na nuvem."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/pages/Candidates.tsx:357:23",
												"data-prohibitions": "[]",
												variant: "outline",
												asChild: true,
												className: "w-full sm:w-auto border-blue-200 hover:bg-blue-50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													"data-uid": "src/pages/Candidates.tsx:362:25",
													"data-prohibitions": "[]",
													href: selectedCandidate.documents_link,
													target: "_blank",
													rel: "noopener noreferrer",
													className: "text-blue-700",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
														"data-uid": "src/pages/Candidates.tsx:368:27",
														"data-prohibitions": "[editContent]",
														className: "mr-2 h-4 w-4"
													}), "Abrir Pasta no SharePoint / OneDrive"]
												})
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Candidates.tsx:375:19",
										"data-prohibitions": "[editContent]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Candidates.tsx:376:21",
											"data-prohibitions": "[]",
											className: "text-sm font-semibold text-slate-800",
											children: "Dados Adicionais do Formulário"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
											"data-uid": "src/pages/Candidates.tsx:379:21",
											"data-prohibitions": "[editContent]",
											className: "bg-slate-900 text-slate-50 p-4 rounded-md text-xs overflow-x-auto whitespace-pre-wrap",
											children: JSON.stringify(selectedCandidate.form_data, null, 2)
										})]
									})
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, {
								"data-uid": "src/pages/Candidates.tsx:386:13",
								"data-prohibitions": "[]",
								className: "pt-2 border-t mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerClose, {
									"data-uid": "src/pages/Candidates.tsx:387:15",
									"data-prohibitions": "[]",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/Candidates.tsx:388:17",
										"data-prohibitions": "[]",
										variant: "outline",
										children: "Fechar Visualização"
									})
								})
							})
						]
					})
				})
			})
		]
	});
}
//#endregion
export { Candidates as default };

//# sourceMappingURL=Candidates-CNx-fKov.js.map