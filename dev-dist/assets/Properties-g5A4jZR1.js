import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CvuQPfAM.js";
import "./react-dom-cDMCl7Pc.js";
import { n as useToast } from "./use-toast-cNG4ZhbD.js";
import { c as composeEventHandlers, n as Primitive, s as createContextScope } from "./dist-DoWbCSlZ.js";
import { n as useComposedRefs } from "./dist-CaNjJkGJ.js";
import { t as useDirection } from "./dist-DvPO34uh.js";
import { t as useCallbackRef } from "./dist-sCamKOPo.js";
import "./es2015-TBGmAnyn.js";
import { t as useLayoutEffect2 } from "./dist-4TD8D2sP.js";
import { n as Presence } from "./dist-A1GJe8PL.js";
import { n as createLucideIcon, t as cn } from "./utils-Di8JFY1h.js";
import { t as Button } from "./button-ChEhZCqG.js";
import { t as Building2 } from "./building-2-iFJZP_7W.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, o as clamp, r as SelectItem, t as Select } from "./select-Ri7J9_pf.js";
import { t as CircleAlert } from "./circle-alert-C8tsZoG_.js";
import { t as FolderArchive } from "./folder-archive-DR0JwSl8.js";
import { t as MapPin } from "./map-pin-CqrDtW31.js";
import { i as useMainStore, r as mainStore } from "./main-DCsFzFjp.js";
import "./users-paJUHImY.js";
import { K as FolderOpen, V as LoaderCircle, W as House, X as Clock, Y as FilePenLine, _ as SheetContent, b as SheetTitle, g as Sheet, h as useAuth, k as Input, q as FileText, rt as useNavigate, t as Badge, v as SheetDescription, y as SheetHeader, z as Plus } from "./index-60jD2nC6.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, t as Card } from "./card-D7FMgv39.js";
import { t as Label } from "./label-DWr-owgv.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BzhU6x3i.js";
var DollarSign = createLucideIcon("dollar-sign", [["line", {
	x1: "12",
	x2: "12",
	y1: "2",
	y2: "22",
	key: "7eqyqh"
}], ["path", {
	d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
	key: "1b0p4s"
}]]);
var History = createLucideIcon("history", [
	["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}],
	["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}],
	["path", {
		d: "M12 7v5l4 2",
		key: "1fdv2h"
	}]
]);
var Sparkles = createLucideIcon("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]);
var SquareCheckBig = createLucideIcon("square-check-big", [["path", {
	d: "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",
	key: "2acyp4"
}], ["path", {
	d: "m9 11 3 3L22 4",
	key: "1pflzl"
}]]);
var Tag = createLucideIcon("tag", [["path", {
	d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
	key: "vktsd0"
}], ["circle", {
	cx: "7.5",
	cy: "7.5",
	r: ".5",
	fill: "currentColor",
	key: "kqv944"
}]]);
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/@radix-ui+react-scroll-area@1.2.10_@types+react-dom@19.2.3_@types+react@19.2.14__@types_155614c2fe5222bb9b221068b09efefc/node_modules/@radix-ui/react-scroll-area/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function useStateMachine(initialState, machine) {
	return import_react.useReducer((state, event) => {
		return machine[state][event] ?? state;
	}, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext, createScrollAreaScope] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeScrollArea, type = "hover", dir, scrollHideDelay = 600, ...scrollAreaProps } = props;
	const [scrollArea, setScrollArea] = import_react.useState(null);
	const [viewport, setViewport] = import_react.useState(null);
	const [content, setContent] = import_react.useState(null);
	const [scrollbarX, setScrollbarX] = import_react.useState(null);
	const [scrollbarY, setScrollbarY] = import_react.useState(null);
	const [cornerWidth, setCornerWidth] = import_react.useState(0);
	const [cornerHeight, setCornerHeight] = import_react.useState(0);
	const [scrollbarXEnabled, setScrollbarXEnabled] = import_react.useState(false);
	const [scrollbarYEnabled, setScrollbarYEnabled] = import_react.useState(false);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
	const direction = useDirection(dir);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaProvider, {
		scope: __scopeScrollArea,
		type,
		dir: direction,
		scrollHideDelay,
		scrollArea,
		viewport,
		onViewportChange: setViewport,
		content,
		onContentChange: setContent,
		scrollbarX,
		onScrollbarXChange: setScrollbarX,
		scrollbarXEnabled,
		onScrollbarXEnabledChange: setScrollbarXEnabled,
		scrollbarY,
		onScrollbarYChange: setScrollbarY,
		scrollbarYEnabled,
		onScrollbarYEnabledChange: setScrollbarYEnabled,
		onCornerWidthChange: setCornerWidth,
		onCornerHeightChange: setCornerHeight,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			dir: direction,
			...scrollAreaProps,
			ref: composedRefs,
			style: {
				position: "relative",
				["--radix-scroll-area-corner-width"]: cornerWidth + "px",
				["--radix-scroll-area-corner-height"]: cornerHeight + "px",
				...props.style
			}
		})
	});
});
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
	const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
	const composedRefs = useComposedRefs(forwardedRef, import_react.useRef(null), context.onViewportChange);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
		dangerouslySetInnerHTML: { __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}` },
		nonce
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-radix-scroll-area-viewport": "",
		...viewportProps,
		ref: composedRefs,
		style: {
			overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
			overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
			...props.style
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: context.onContentChange,
			style: {
				minWidth: "100%",
				display: "table"
			},
			children
		})
	})] });
});
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
	const isHorizontal = props.orientation === "horizontal";
	import_react.useEffect(() => {
		isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
		return () => {
			isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
		};
	}, [
		isHorizontal,
		onScrollbarXEnabledChange,
		onScrollbarYEnabledChange
	]);
	return context.type === "hover" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarHover, {
		...scrollbarProps,
		ref: forwardedRef,
		forceMount
	}) : context.type === "scroll" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarScroll, {
		...scrollbarProps,
		ref: forwardedRef,
		forceMount
	}) : context.type === "auto" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarAuto, {
		...scrollbarProps,
		ref: forwardedRef,
		forceMount
	}) : context.type === "always" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarVisible, {
		...scrollbarProps,
		ref: forwardedRef
	}) : null;
});
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const [visible, setVisible] = import_react.useState(false);
	import_react.useEffect(() => {
		const scrollArea = context.scrollArea;
		let hideTimer = 0;
		if (scrollArea) {
			const handlePointerEnter = () => {
				window.clearTimeout(hideTimer);
				setVisible(true);
			};
			const handlePointerLeave = () => {
				hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
			};
			scrollArea.addEventListener("pointerenter", handlePointerEnter);
			scrollArea.addEventListener("pointerleave", handlePointerLeave);
			return () => {
				window.clearTimeout(hideTimer);
				scrollArea.removeEventListener("pointerenter", handlePointerEnter);
				scrollArea.removeEventListener("pointerleave", handlePointerLeave);
			};
		}
	}, [context.scrollArea, context.scrollHideDelay]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || visible,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarAuto, {
			"data-state": visible ? "visible" : "hidden",
			...scrollbarProps,
			ref: forwardedRef
		})
	});
});
var ScrollAreaScrollbarScroll = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const isHorizontal = props.orientation === "horizontal";
	const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
	const [state, send] = useStateMachine("hidden", {
		hidden: { SCROLL: "scrolling" },
		scrolling: {
			SCROLL_END: "idle",
			POINTER_ENTER: "interacting"
		},
		interacting: {
			SCROLL: "interacting",
			POINTER_LEAVE: "idle"
		},
		idle: {
			HIDE: "hidden",
			SCROLL: "scrolling",
			POINTER_ENTER: "interacting"
		}
	});
	import_react.useEffect(() => {
		if (state === "idle") {
			const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
			return () => window.clearTimeout(hideTimer);
		}
	}, [
		state,
		context.scrollHideDelay,
		send
	]);
	import_react.useEffect(() => {
		const viewport = context.viewport;
		const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
		if (viewport) {
			let prevScrollPos = viewport[scrollDirection];
			const handleScroll = () => {
				const scrollPos = viewport[scrollDirection];
				if (prevScrollPos !== scrollPos) {
					send("SCROLL");
					debounceScrollEnd();
				}
				prevScrollPos = scrollPos;
			};
			viewport.addEventListener("scroll", handleScroll);
			return () => viewport.removeEventListener("scroll", handleScroll);
		}
	}, [
		context.viewport,
		isHorizontal,
		send,
		debounceScrollEnd
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || state !== "hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarVisible, {
			"data-state": state === "hidden" ? "hidden" : "visible",
			...scrollbarProps,
			ref: forwardedRef,
			onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
			onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
		})
	});
});
var ScrollAreaScrollbarAuto = import_react.forwardRef((props, forwardedRef) => {
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const { forceMount, ...scrollbarProps } = props;
	const [visible, setVisible] = import_react.useState(false);
	const isHorizontal = props.orientation === "horizontal";
	const handleResize = useDebounceCallback(() => {
		if (context.viewport) {
			const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
			const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
			setVisible(isHorizontal ? isOverflowX : isOverflowY);
		}
	}, 10);
	useResizeObserver(context.viewport, handleResize);
	useResizeObserver(context.content, handleResize);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || visible,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarVisible, {
			"data-state": visible ? "visible" : "hidden",
			...scrollbarProps,
			ref: forwardedRef
		})
	});
});
var ScrollAreaScrollbarVisible = import_react.forwardRef((props, forwardedRef) => {
	const { orientation = "vertical", ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const thumbRef = import_react.useRef(null);
	const pointerOffsetRef = import_react.useRef(0);
	const [sizes, setSizes] = import_react.useState({
		content: 0,
		viewport: 0,
		scrollbar: {
			size: 0,
			paddingStart: 0,
			paddingEnd: 0
		}
	});
	const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
	const commonProps = {
		...scrollbarProps,
		sizes,
		onSizesChange: setSizes,
		hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
		onThumbChange: (thumb) => thumbRef.current = thumb,
		onThumbPointerUp: () => pointerOffsetRef.current = 0,
		onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
	};
	function getScrollPosition(pointerPos, dir) {
		return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
	}
	if (orientation === "horizontal") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarX, {
		...commonProps,
		ref: forwardedRef,
		onThumbPositionChange: () => {
			if (context.viewport && thumbRef.current) {
				const scrollPos = context.viewport.scrollLeft;
				const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
				thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
			}
		},
		onWheelScroll: (scrollPos) => {
			if (context.viewport) context.viewport.scrollLeft = scrollPos;
		},
		onDragScroll: (pointerPos) => {
			if (context.viewport) context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
		}
	});
	if (orientation === "vertical") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarY, {
		...commonProps,
		ref: forwardedRef,
		onThumbPositionChange: () => {
			if (context.viewport && thumbRef.current) {
				const scrollPos = context.viewport.scrollTop;
				const offset = getThumbOffsetFromScroll(scrollPos, sizes);
				thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
			}
		},
		onWheelScroll: (scrollPos) => {
			if (context.viewport) context.viewport.scrollTop = scrollPos;
		},
		onDragScroll: (pointerPos) => {
			if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
		}
	});
	return null;
});
var ScrollAreaScrollbarX = import_react.forwardRef((props, forwardedRef) => {
	const { sizes, onSizesChange, ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const [computedStyle, setComputedStyle] = import_react.useState();
	const ref = import_react.useRef(null);
	const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
	import_react.useEffect(() => {
		if (ref.current) setComputedStyle(getComputedStyle(ref.current));
	}, [ref]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarImpl, {
		"data-orientation": "horizontal",
		...scrollbarProps,
		ref: composeRefs,
		sizes,
		style: {
			bottom: 0,
			left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
			right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
			["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
			...props.style
		},
		onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
		onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
		onWheelScroll: (event, maxScrollPos) => {
			if (context.viewport) {
				const scrollPos = context.viewport.scrollLeft + event.deltaX;
				props.onWheelScroll(scrollPos);
				if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) event.preventDefault();
			}
		},
		onResize: () => {
			if (ref.current && context.viewport && computedStyle) onSizesChange({
				content: context.viewport.scrollWidth,
				viewport: context.viewport.offsetWidth,
				scrollbar: {
					size: ref.current.clientWidth,
					paddingStart: toInt(computedStyle.paddingLeft),
					paddingEnd: toInt(computedStyle.paddingRight)
				}
			});
		}
	});
});
var ScrollAreaScrollbarY = import_react.forwardRef((props, forwardedRef) => {
	const { sizes, onSizesChange, ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const [computedStyle, setComputedStyle] = import_react.useState();
	const ref = import_react.useRef(null);
	const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
	import_react.useEffect(() => {
		if (ref.current) setComputedStyle(getComputedStyle(ref.current));
	}, [ref]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarImpl, {
		"data-orientation": "vertical",
		...scrollbarProps,
		ref: composeRefs,
		sizes,
		style: {
			top: 0,
			right: context.dir === "ltr" ? 0 : void 0,
			left: context.dir === "rtl" ? 0 : void 0,
			bottom: "var(--radix-scroll-area-corner-height)",
			["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
			...props.style
		},
		onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
		onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
		onWheelScroll: (event, maxScrollPos) => {
			if (context.viewport) {
				const scrollPos = context.viewport.scrollTop + event.deltaY;
				props.onWheelScroll(scrollPos);
				if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) event.preventDefault();
			}
		},
		onResize: () => {
			if (ref.current && context.viewport && computedStyle) onSizesChange({
				content: context.viewport.scrollHeight,
				viewport: context.viewport.offsetHeight,
				scrollbar: {
					size: ref.current.clientHeight,
					paddingStart: toInt(computedStyle.paddingTop),
					paddingEnd: toInt(computedStyle.paddingBottom)
				}
			});
		}
	});
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeScrollArea, sizes, hasThumb, onThumbChange, onThumbPointerUp, onThumbPointerDown, onThumbPositionChange, onDragScroll, onWheelScroll, onResize, ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
	const [scrollbar, setScrollbar] = import_react.useState(null);
	const composeRefs = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
	const rectRef = import_react.useRef(null);
	const prevWebkitUserSelectRef = import_react.useRef("");
	const viewport = context.viewport;
	const maxScrollPos = sizes.content - sizes.viewport;
	const handleWheelScroll = useCallbackRef(onWheelScroll);
	const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
	const handleResize = useDebounceCallback(onResize, 10);
	function handleDragScroll(event) {
		if (rectRef.current) onDragScroll({
			x: event.clientX - rectRef.current.left,
			y: event.clientY - rectRef.current.top
		});
	}
	import_react.useEffect(() => {
		const handleWheel = (event) => {
			const element = event.target;
			if (scrollbar?.contains(element)) handleWheelScroll(event, maxScrollPos);
		};
		document.addEventListener("wheel", handleWheel, { passive: false });
		return () => document.removeEventListener("wheel", handleWheel, { passive: false });
	}, [
		viewport,
		scrollbar,
		maxScrollPos,
		handleWheelScroll
	]);
	import_react.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
	useResizeObserver(scrollbar, handleResize);
	useResizeObserver(context.content, handleResize);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollbarProvider, {
		scope: __scopeScrollArea,
		scrollbar,
		hasThumb,
		onThumbChange: useCallbackRef(onThumbChange),
		onThumbPointerUp: useCallbackRef(onThumbPointerUp),
		onThumbPositionChange: handleThumbPositionChange,
		onThumbPointerDown: useCallbackRef(onThumbPointerDown),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			...scrollbarProps,
			ref: composeRefs,
			style: {
				position: "absolute",
				...scrollbarProps.style
			},
			onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
				if (event.button === 0) {
					event.target.setPointerCapture(event.pointerId);
					rectRef.current = scrollbar.getBoundingClientRect();
					prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
					document.body.style.webkitUserSelect = "none";
					if (context.viewport) context.viewport.style.scrollBehavior = "auto";
					handleDragScroll(event);
				}
			}),
			onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
			onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
				const element = event.target;
				if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
				document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
				if (context.viewport) context.viewport.style.scrollBehavior = "";
				rectRef.current = null;
			})
		})
	});
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...thumbProps } = props;
	const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || scrollbarContext.hasThumb,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumbImpl, {
			ref: forwardedRef,
			...thumbProps
		})
	});
});
var ScrollAreaThumbImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeScrollArea, style, ...thumbProps } = props;
	const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
	const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
	const { onThumbPositionChange } = scrollbarContext;
	const composedRef = useComposedRefs(forwardedRef, (node) => scrollbarContext.onThumbChange(node));
	const removeUnlinkedScrollListenerRef = import_react.useRef(void 0);
	const debounceScrollEnd = useDebounceCallback(() => {
		if (removeUnlinkedScrollListenerRef.current) {
			removeUnlinkedScrollListenerRef.current();
			removeUnlinkedScrollListenerRef.current = void 0;
		}
	}, 100);
	import_react.useEffect(() => {
		const viewport = scrollAreaContext.viewport;
		if (viewport) {
			const handleScroll = () => {
				debounceScrollEnd();
				if (!removeUnlinkedScrollListenerRef.current) {
					removeUnlinkedScrollListenerRef.current = addUnlinkedScrollListener(viewport, onThumbPositionChange);
					onThumbPositionChange();
				}
			};
			onThumbPositionChange();
			viewport.addEventListener("scroll", handleScroll);
			return () => viewport.removeEventListener("scroll", handleScroll);
		}
	}, [
		scrollAreaContext.viewport,
		debounceScrollEnd,
		onThumbPositionChange
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
		...thumbProps,
		ref: composedRef,
		style: {
			width: "var(--radix-scroll-area-thumb-width)",
			height: "var(--radix-scroll-area-thumb-height)",
			...style
		},
		onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
			const thumbRect = event.target.getBoundingClientRect();
			const x = event.clientX - thumbRect.left;
			const y = event.clientY - thumbRect.top;
			scrollbarContext.onThumbPointerDown({
				x,
				y
			});
		}),
		onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
	});
});
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = import_react.forwardRef((props, forwardedRef) => {
	const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
	const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
	return context.type !== "scroll" && hasBothScrollbarsVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaCornerImpl, {
		...props,
		ref: forwardedRef
	}) : null;
});
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeScrollArea, ...cornerProps } = props;
	const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
	const [width, setWidth] = import_react.useState(0);
	const [height, setHeight] = import_react.useState(0);
	const hasSize = Boolean(width && height);
	useResizeObserver(context.scrollbarX, () => {
		const height2 = context.scrollbarX?.offsetHeight || 0;
		context.onCornerHeightChange(height2);
		setHeight(height2);
	});
	useResizeObserver(context.scrollbarY, () => {
		const width2 = context.scrollbarY?.offsetWidth || 0;
		context.onCornerWidthChange(width2);
		setWidth(width2);
	});
	return hasSize ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		...cornerProps,
		ref: forwardedRef,
		style: {
			width,
			height,
			position: "absolute",
			right: context.dir === "ltr" ? 0 : void 0,
			left: context.dir === "rtl" ? 0 : void 0,
			bottom: 0,
			...props.style
		}
	}) : null;
});
function toInt(value) {
	return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
	const ratio = viewportSize / contentSize;
	return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
	const ratio = getThumbRatio(sizes.viewport, sizes.content);
	const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
	const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
	return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
	const thumbSizePx = getThumbSize(sizes);
	const thumbCenter = thumbSizePx / 2;
	const offset = pointerOffset || thumbCenter;
	const thumbOffsetFromEnd = thumbSizePx - offset;
	const minPointerPos = sizes.scrollbar.paddingStart + offset;
	const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
	const maxScrollPos = sizes.content - sizes.viewport;
	const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
	return linearScale([minPointerPos, maxPointerPos], scrollRange)(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
	const thumbSizePx = getThumbSize(sizes);
	const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
	const scrollbar = sizes.scrollbar.size - scrollbarPadding;
	const maxScrollPos = sizes.content - sizes.viewport;
	const maxThumbPos = scrollbar - thumbSizePx;
	const scrollWithoutMomentum = clamp(scrollPos, dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0]);
	return linearScale([0, maxScrollPos], [0, maxThumbPos])(scrollWithoutMomentum);
}
function linearScale(input, output) {
	return (value) => {
		if (input[0] === input[1] || output[0] === output[1]) return output[0];
		const ratio = (output[1] - output[0]) / (input[1] - input[0]);
		return output[0] + ratio * (value - input[0]);
	};
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
	return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {}) => {
	let prevPosition = {
		left: node.scrollLeft,
		top: node.scrollTop
	};
	let rAF = 0;
	(function loop() {
		const position = {
			left: node.scrollLeft,
			top: node.scrollTop
		};
		const isHorizontalScroll = prevPosition.left !== position.left;
		const isVerticalScroll = prevPosition.top !== position.top;
		if (isHorizontalScroll || isVerticalScroll) handler();
		prevPosition = position;
		rAF = window.requestAnimationFrame(loop);
	})();
	return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
	const handleCallback = useCallbackRef(callback);
	const debounceTimerRef = import_react.useRef(0);
	import_react.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
	return import_react.useCallback(() => {
		window.clearTimeout(debounceTimerRef.current);
		debounceTimerRef.current = window.setTimeout(handleCallback, delay);
	}, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
	const handleResize = useCallbackRef(onResize);
	useLayoutEffect2(() => {
		let rAF = 0;
		if (element) {
			const resizeObserver = new ResizeObserver(() => {
				cancelAnimationFrame(rAF);
				rAF = window.requestAnimationFrame(handleResize);
			});
			resizeObserver.observe(element);
			return () => {
				window.cancelAnimationFrame(rAF);
				resizeObserver.unobserve(element);
			};
		}
	}, [element, handleResize]);
}
var Root = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
//#endregion
//#region src/components/ui/scroll-area.tsx
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	"data-uid": "src/components/ui/scroll-area.tsx:11:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			"data-uid": "src/components/ui/scroll-area.tsx:16:5",
			"data-prohibitions": "[editContent]",
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
			"data-uid": "src/components/ui/scroll-area.tsx:19:5",
			"data-prohibitions": "[editContent]"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {
			"data-uid": "src/components/ui/scroll-area.tsx:20:5",
			"data-prohibitions": "[editContent]"
		})
	]
}));
ScrollArea.displayName = Root.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	"data-uid": "src/components/ui/scroll-area.tsx:29:3",
	"data-prohibitions": "[editContent]",
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, {
		"data-uid": "src/components/ui/scroll-area.tsx:40:5",
		"data-prohibitions": "[editContent]",
		className: "relative flex-1 rounded-full bg-border"
	})
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
//#endregion
//#region src/components/PropertyDetailSheet.tsx
function PropertyDetailSheet({ property, onClose }) {
	const store = useMainStore();
	const { user } = useAuth();
	const { toast } = useToast();
	if (!property) return null;
	const auditLogs = store.auditLogs.filter((l) => l.propertyId === property.id).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
	const inspectionData = store.inspectionsData[property.id];
	const handleGenerateContract = () => {
		mainStore.updatePropertyStatus(property.id, "Assinatura");
		mainStore.addAuditLog({
			propertyId: property.id,
			action: "Minuta Gerada / Enviado p/ Assinatura",
			user: user?.name || "Sistema",
			details: "Dados de vistoria e OCR integrados no contrato."
		});
		toast({
			title: "Contrato Gerado",
			description: "Minuta pronta e disparada para assinatura digital."
		});
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		"data-uid": "src/components/PropertyDetailSheet.tsx:49:5",
		"data-prohibitions": "[editContent]",
		open: !!property,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			"data-uid": "src/components/PropertyDetailSheet.tsx:50:7",
			"data-prohibitions": "[editContent]",
			className: "w-full sm:max-w-xl flex flex-col p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/PropertyDetailSheet.tsx:51:9",
				"data-prohibitions": "[editContent]",
				className: "p-6 border-b bg-muted/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					"data-uid": "src/components/PropertyDetailSheet.tsx:52:11",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/PropertyDetailSheet.tsx:53:13",
						"data-prohibitions": "[editContent]",
						className: "flex justify-between items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PropertyDetailSheet.tsx:54:15",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
								"data-uid": "src/components/PropertyDetailSheet.tsx:55:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl",
								children: property.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
								"data-uid": "src/components/PropertyDetailSheet.tsx:56:17",
								"data-prohibitions": "[editContent]",
								className: "mt-1",
								children: property.address
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							"data-uid": "src/components/PropertyDetailSheet.tsx:58:15",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							className: "text-sm py-1 bg-background",
							children: property.status
						})]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				"data-uid": "src/components/PropertyDetailSheet.tsx:65:9",
				"data-prohibitions": "[editContent]",
				className: "flex-1 p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/PropertyDetailSheet.tsx:66:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-8",
					children: [
						property.status === "Confecção de Contrato" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PropertyDetailSheet.tsx:69:15",
							"data-prohibitions": "[editContent]",
							className: "bg-primary/5 border border-primary/20 p-5 rounded-lg space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/PropertyDetailSheet.tsx:70:17",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2 font-semibold text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, {
										"data-uid": "src/components/PropertyDetailSheet.tsx:71:19",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5"
									}), " Integração Inteligente de Vistoria"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/PropertyDetailSheet.tsx:73:17",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground",
									children: "Os dados da etapa anterior foram mapeados para auxiliar a geração da minuta final do contrato."
								}),
								inspectionData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/PropertyDetailSheet.tsx:78:19",
									"data-prohibitions": "[editContent]",
									className: "grid grid-cols-1 gap-4 text-sm bg-background p-4 rounded-md border shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/PropertyDetailSheet.tsx:79:21",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/PropertyDetailSheet.tsx:80:23",
											"data-prohibitions": "[]",
											className: "text-muted-foreground mb-1",
											children: "Condição das Paredes / Pintura"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/PropertyDetailSheet.tsx:81:23",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: inspectionData.wallCondition || "N/A"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/PropertyDetailSheet.tsx:83:21",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/PropertyDetailSheet.tsx:84:23",
											"data-prohibitions": "[]",
											className: "text-muted-foreground mb-1",
											children: "Móveis e Observações"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/PropertyDetailSheet.tsx:85:23",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: inspectionData.furnitureNotes || "N/A"
										})]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/PropertyDetailSheet.tsx:89:19",
									"data-prohibitions": "[]",
									className: "text-sm text-amber-600 bg-amber-50 p-3 rounded border border-amber-200",
									children: "Aviso: Vistoria estruturada não preenchida para este imóvel."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/components/PropertyDetailSheet.tsx:93:17",
									"data-prohibitions": "[]",
									className: "w-full gap-2",
									onClick: handleGenerateContract,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
										"data-uid": "src/components/PropertyDetailSheet.tsx:94:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									}), " Gerar Documento Final (Minuta)"]
								})
							]
						}),
						property.status === "Assinatura" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PropertyDetailSheet.tsx:101:15",
							"data-prohibitions": "[]",
							className: "bg-emerald-50 border border-emerald-200 p-5 rounded-lg flex flex-col items-center justify-center text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, {
									"data-uid": "src/components/PropertyDetailSheet.tsx:102:17",
									"data-prohibitions": "[editContent]",
									className: "w-10 h-10 text-emerald-600 mb-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									"data-uid": "src/components/PropertyDetailSheet.tsx:103:17",
									"data-prohibitions": "[]",
									className: "font-semibold text-emerald-800",
									children: "Aguardando Assinaturas Digitais"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/PropertyDetailSheet.tsx:104:17",
									"data-prohibitions": "[]",
									className: "text-sm text-emerald-700 mt-1",
									children: "O contrato foi gerado e as partes foram notificadas."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PropertyDetailSheet.tsx:111:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								"data-uid": "src/components/PropertyDetailSheet.tsx:112:15",
								"data-prohibitions": "[]",
								className: "text-lg font-semibold flex items-center gap-2 border-b pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
									"data-uid": "src/components/PropertyDetailSheet.tsx:113:17",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5"
								}), " Trilha de Auditoria (Audit Log)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/PropertyDetailSheet.tsx:115:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent",
								children: [auditLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/PropertyDetailSheet.tsx:117:19",
									"data-prohibitions": "[editContent]",
									className: "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/PropertyDetailSheet.tsx:121:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center justify-center w-5 h-5 rounded-full border-2 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -ml-2.5 md:ml-0 z-10"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/PropertyDetailSheet.tsx:122:21",
										"data-prohibitions": "[editContent]",
										className: "w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-8 md:ml-0 p-3 rounded border bg-card shadow-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/components/PropertyDetailSheet.tsx:123:23",
												"data-prohibitions": "[editContent]",
												className: "flex justify-between items-start mb-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/components/PropertyDetailSheet.tsx:124:25",
													"data-prohibitions": "[editContent]",
													className: "font-medium text-sm text-primary",
													children: log.action
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
													"data-uid": "src/components/PropertyDetailSheet.tsx:125:25",
													"data-prohibitions": "[editContent]",
													className: "text-xs text-muted-foreground",
													children: new Date(log.timestamp).toLocaleTimeString([], {
														hour: "2-digit",
														minute: "2-digit"
													})
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/components/PropertyDetailSheet.tsx:132:23",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground mb-1",
												children: ["Por: ", log.user]
											}),
											log.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/components/PropertyDetailSheet.tsx:134:25",
												"data-prohibitions": "[editContent]",
												className: "text-xs bg-muted/50 p-1.5 rounded mt-1",
												children: log.details
											})
										]
									})]
								}, log.id)), auditLogs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/PropertyDetailSheet.tsx:140:19",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground text-center py-4",
									children: "Nenhum registro encontrado para este imóvel."
								})]
							})]
						})
					]
				})
			})]
		})
	});
}
//#endregion
//#region src/components/NewPropertyDialog.tsx
function NewPropertyDialog({ open, onClose }) {
	const { toast } = useToast();
	const [title, setTitle] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("Residencial");
	const [rentValue, setRentValue] = (0, import_react.useState)("");
	const [aiLoading, setAiLoading] = (0, import_react.useState)(false);
	const [aiJustification, setAiJustification] = (0, import_react.useState)("");
	const handleAISuggestion = () => {
		if (!address || !type) {
			toast({
				variant: "destructive",
				title: "Dados Insuficientes",
				description: "Preencha o endereço e o tipo do imóvel para a IA sugerir um valor."
			});
			return;
		}
		setAiLoading(true);
		setAiJustification("");
		setTimeout(() => {
			setAiLoading(false);
			setRentValue(type === "Comercial" ? "4500" : "2800");
			setAiJustification(`Valor calculado cruzando dados dos Sites "Vendas" e "Locação". Média de ${type === "Comercial" ? "12" : "24"} imóveis recentes na região do endereço informado.`);
			toast({
				title: "Sugestão de Preço Concluída",
				description: "A IA do SharePoint analisou o histórico de contratos."
			});
		}, 2e3);
	};
	const handleSave = () => {
		if (!title || !address || !rentValue) return;
		mainStore.addProperty({
			title,
			address,
			type,
			rentValue: Number(rentValue)
		});
		mainStore.addAuditLog({
			propertyId: "NOVO",
			action: "Nova Captação Registrada",
			user: "Equipe de Captação",
			details: "Imóvel criado no estágio Pendente/Rascunho."
		});
		toast({
			title: "Captação Registrada",
			description: "O imóvel foi adicionado com sucesso à fila."
		});
		setTitle("");
		setAddress("");
		setType("Residencial");
		setRentValue("");
		setAiJustification("");
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/NewPropertyDialog.tsx:94:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/NewPropertyDialog.tsx:95:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[500px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/NewPropertyDialog.tsx:96:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/NewPropertyDialog.tsx:97:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
							"data-uid": "src/components/NewPropertyDialog.tsx:98:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-primary"
						}), " Nova Captação"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/NewPropertyDialog.tsx:100:11",
						"data-prohibitions": "[]",
						children: "Insira os dados do novo imóvel. Use a Inteligência Artificial para estimar o valor ideal do aluguel."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/NewPropertyDialog.tsx:106:9",
					"data-prohibitions": "[editContent]",
					className: "grid gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:107:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/NewPropertyDialog.tsx:108:13",
								"data-prohibitions": "[]",
								children: "Título / Referência"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/NewPropertyDialog.tsx:109:13",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: Apartamento Vista Mar",
								value: title,
								onChange: (e) => setTitle(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:116:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/NewPropertyDialog.tsx:117:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									"data-uid": "src/components/NewPropertyDialog.tsx:118:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Endereço Completo"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/NewPropertyDialog.tsx:120:13",
								"data-prohibitions": "[editContent]",
								placeholder: "Ex: Av. Atlântica, 1000 - Apto 502",
								value: address,
								onChange: (e) => setAddress(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:127:11",
							"data-prohibitions": "[]",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/components/NewPropertyDialog.tsx:128:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
									"data-uid": "src/components/NewPropertyDialog.tsx:129:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								}), " Tipo do Imóvel"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/NewPropertyDialog.tsx:131:13",
								"data-prohibitions": "[]",
								value: type,
								onValueChange: setType,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/NewPropertyDialog.tsx:132:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/NewPropertyDialog.tsx:133:17",
										"data-prohibitions": "[editContent]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/NewPropertyDialog.tsx:135:15",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:136:17",
											"data-prohibitions": "[]",
											value: "Residencial",
											children: "Residencial"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:137:17",
											"data-prohibitions": "[]",
											value: "Comercial",
											children: "Comercial"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/NewPropertyDialog.tsx:138:17",
											"data-prohibitions": "[]",
											value: "Industrial",
											children: "Industrial"
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NewPropertyDialog.tsx:143:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-2 p-4 bg-muted/30 rounded-lg border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/components/NewPropertyDialog.tsx:144:13",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
										"data-uid": "src/components/NewPropertyDialog.tsx:145:15",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 text-primary"
									}), " Valor do Aluguel (R$)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/NewPropertyDialog.tsx:147:13",
									"data-prohibitions": "[editContent]",
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/NewPropertyDialog.tsx:148:15",
										"data-prohibitions": "[editContent]",
										type: "number",
										placeholder: "Ex: 3500",
										value: rentValue,
										onChange: (e) => setRentValue(e.target.value),
										className: "flex-1 font-mono text-lg"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/components/NewPropertyDialog.tsx:155:15",
										"data-prohibitions": "[editContent]",
										variant: "secondary",
										onClick: handleAISuggestion,
										disabled: aiLoading,
										className: "shrink-0 gap-2 font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 border border-purple-200",
										children: [aiLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/NewPropertyDialog.tsx:162:19",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 animate-spin"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
											"data-uid": "src/components/NewPropertyDialog.tsx:164:19",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										}), "Sugerir via IA"]
									})]
								}),
								aiJustification && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/NewPropertyDialog.tsx:170:15",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-purple-800 bg-purple-50 p-2 rounded mt-2 animate-fade-in",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/components/NewPropertyDialog.tsx:171:17",
											"data-prohibitions": "[]",
											children: "Justificativa IA:"
										}),
										" ",
										aiJustification
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/NewPropertyDialog.tsx:177:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/NewPropertyDialog.tsx:178:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: onClose,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/NewPropertyDialog.tsx:181:11",
						"data-prohibitions": "[]",
						onClick: handleSave,
						disabled: !title || !address || !rentValue,
						children: "Salvar Imóvel"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/pages/Properties.tsx
var getStatusColor = (status) => {
	switch (status) {
		case "Análise Gerencial": return "bg-amber-100 text-amber-800 border-amber-200";
		case "Vistoria": return "bg-blue-100 text-blue-800 border-blue-200";
		case "Confecção de Contrato": return "bg-purple-100 text-purple-800 border-purple-200";
		case "Assinatura": return "bg-emerald-100 text-emerald-800 border-emerald-200";
		case "Pendente/Rascunho": return "bg-gray-100 text-gray-800 border-gray-200";
		default: return "bg-secondary text-secondary-foreground";
	}
};
var Properties = () => {
	const navigate = useNavigate();
	const store = useMainStore();
	const { user } = useAuth();
	const [selectedProperty, setSelectedProperty] = (0, import_react.useState)(null);
	const [newPropertyOpen, setNewPropertyOpen] = (0, import_react.useState)(false);
	const pendingAnalyses = store.properties.filter((p) => p.status === "Análise Gerencial").length;
	const pendingInspections = store.properties.filter((p) => p.status === "Vistoria").length;
	const canViewDossier = ["Admin", "Diretor"].includes(user?.role || "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Properties.tsx:49:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:50:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Properties.tsx:51:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Properties.tsx:52:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Gestão de Imóveis e Captação"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Properties.tsx:53:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Acompanhe as captações, workflow de locação e acesse a trilha de auditoria completa no SharePoint."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Properties.tsx:58:9",
					"data-prohibitions": "[]",
					onClick: () => setNewPropertyOpen(true),
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/Properties.tsx:59:11",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), " Nova Captação"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Properties.tsx:63:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-3 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Properties.tsx:64:9",
					"data-prohibitions": "[editContent]",
					className: "bg-amber-50/50 border-amber-100 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Properties.tsx:65:11",
						"data-prohibitions": "[editContent]",
						className: "p-5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Properties.tsx:66:13",
							"data-prohibitions": "[]",
							className: "bg-amber-100 p-3 rounded-full shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								"data-uid": "src/pages/Properties.tsx:67:15",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-6 text-amber-600"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Properties.tsx:69:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Properties.tsx:70:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-amber-800",
								children: "Aguardando Gerente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Properties.tsx:71:15",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-amber-900 mt-1",
								children: [pendingAnalyses, " Análises"]
							})]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Properties.tsx:75:9",
					"data-prohibitions": "[editContent]",
					className: "bg-blue-50/50 border-blue-100 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Properties.tsx:76:11",
						"data-prohibitions": "[editContent]",
						className: "p-5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Properties.tsx:77:13",
							"data-prohibitions": "[]",
							className: "bg-blue-100 p-3 rounded-full shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								"data-uid": "src/pages/Properties.tsx:78:15",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-6 text-blue-600"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Properties.tsx:80:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Properties.tsx:81:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-blue-800",
								children: "Vistorias Pendentes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Properties.tsx:82:15",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-blue-900 mt-1",
								children: [pendingInspections, " Imóvel"]
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Properties.tsx:88:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: store.properties.map((property) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/Properties.tsx:90:11",
					"data-prohibitions": "[editContent]",
					className: "overflow-hidden flex flex-col transition-all hover:shadow-md group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Properties.tsx:94:13",
							"data-prohibitions": "[editContent]",
							className: "aspect-video w-full overflow-hidden relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									"data-uid": "src/pages/Properties.tsx:95:15",
									"data-prohibitions": "[editContent]",
									src: property.image,
									alt: property.title,
									className: "w-full h-full object-cover transition-transform group-hover:scale-105"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/Properties.tsx:100:15",
									"data-prohibitions": "[editContent]",
									className: "absolute top-2 right-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-uid": "src/pages/Properties.tsx:101:17",
										"data-prohibitions": "[editContent]",
										className: `shadow-sm border ${getStatusColor(property.status)}`,
										children: property.status
									})
								}),
								property.rentValue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Properties.tsx:106:17",
									"data-prohibitions": "[editContent]",
									className: "absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm",
									children: ["R$ ", property.rentValue.toLocaleString("pt-BR")]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Properties.tsx:111:13",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Properties.tsx:112:15",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-2 text-sm text-muted-foreground mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
									"data-uid": "src/pages/Properties.tsx:113:17",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/Properties.tsx:114:17",
									"data-prohibitions": "[editContent]",
									children: [
										"ID: ",
										property.id,
										" • ",
										property.type
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Properties.tsx:118:15",
								"data-prohibitions": "[editContent]",
								className: "text-xl line-clamp-1",
								children: property.title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Properties.tsx:120:13",
							"data-prohibitions": "[editContent]",
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Properties.tsx:121:15",
								"data-prohibitions": "[editContent]",
								className: "flex items-start gap-2 text-muted-foreground text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									"data-uid": "src/pages/Properties.tsx:122:17",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4 mt-0.5 shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Properties.tsx:123:17",
									"data-prohibitions": "[editContent]",
									className: "line-clamp-2",
									children: property.address
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardFooter, {
							"data-uid": "src/pages/Properties.tsx:126:13",
							"data-prohibitions": "[editContent]",
							className: "pt-4 border-t bg-muted/10 flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Properties.tsx:127:15",
								"data-prohibitions": "[]",
								variant: "ghost",
								className: "w-full justify-between",
								onClick: () => setSelectedProperty(property),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/Properties.tsx:132:17",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
										"data-uid": "src/pages/Properties.tsx:133:19",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 text-primary"
									}), " SharePoint Site / Auditoria"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Properties.tsx:135:17",
									"data-prohibitions": "[]",
									className: "text-muted-foreground group-hover:translate-x-1 transition-transform",
									children: "→"
								})]
							}), canViewDossier && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Properties.tsx:141:17",
								"data-prohibitions": "[]",
								variant: "secondary",
								className: "w-full justify-between bg-primary/5 hover:bg-primary/10 border border-primary/20",
								onClick: () => navigate(`/properties/${property.id}/dossier`),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/Properties.tsx:146:19",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2 text-primary font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderArchive, {
										"data-uid": "src/pages/Properties.tsx:147:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4"
									}), " Dossiê Digital do Imóvel"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Properties.tsx:149:19",
									"data-prohibitions": "[]",
									className: "text-primary group-hover:translate-x-1 transition-transform",
									children: "→"
								})]
							})]
						})
					]
				}, property.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyDetailSheet, {
				"data-uid": "src/pages/Properties.tsx:159:7",
				"data-prohibitions": "[editContent]",
				property: selectedProperty,
				onClose: () => setSelectedProperty(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewPropertyDialog, {
				"data-uid": "src/pages/Properties.tsx:160:7",
				"data-prohibitions": "[editContent]",
				open: newPropertyOpen,
				onClose: () => setNewPropertyOpen(false)
			})
		]
	});
};
//#endregion
export { Properties as default };

//# sourceMappingURL=Properties-g5A4jZR1.js.map