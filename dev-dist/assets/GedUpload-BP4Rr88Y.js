import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as composeRefs } from "./dist-CaOfgRRz.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import { t as useId } from "./dist-sgnhZ4Tf.js";
import { o as Check } from "./dist-BKqeEvXI.js";
import { n as createLucideIcon, t as cn } from "./utils-BNj1jY-i.js";
import { t as cva } from "./dist-DzQFrEIV.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BlEwA30F.js";
import { t as CircleAlert } from "./circle-alert-tq6C5WFm.js";
import { t as CloudUpload } from "./cloud-upload-Dec2qn3q.js";
import { t as Button } from "./button-CzUVRnDZ.js";
import { t as Primitive } from "./dist-D-5bSr4g2.js";
import { i as useMainStore, r as mainStore } from "./main-KMI_qsFQ.js";
import { n as useEntitiesStore } from "./entities-CnJZXM2l.js";
import { D as Portal, E as Overlay, O as Root, X as LoaderCircle, _ as documentsStore, g as useAuth, j as Input, q as Search, w as Content } from "./index-CqMQ4BKL.js";
import { t as Label } from "./label-DczgnaR7.js";
import { t as Switch } from "./switch-C9cJsYEQ.js";
import { n as m365Service } from "./m365-aOLdv8yk.js";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-fKNCFrfY.js";
var ChevronsUpDown = createLucideIcon("chevrons-up-down", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]);
//#endregion
//#region src/components/ui/alert.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var alertVariants = cva("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", {
	variants: { variant: {
		default: "bg-background text-foreground",
		destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
	} },
	defaultVariants: { variant: "default" }
});
var Alert = import_react.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert.tsx:27:3",
	"data-prohibitions": "[editContent]",
	ref,
	role: "alert",
	className: cn(alertVariants({ variant }), className),
	...props
}));
Alert.displayName = "Alert";
var AlertTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
	"data-uid": "src/components/ui/alert.tsx:33:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("mb-1 font-medium leading-none tracking-tight", className),
	...props
}));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert.tsx:46:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm [&_p]:leading-relaxed", className),
	...props
}));
AlertDescription.displayName = "AlertDescription";
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/cmdk@1.1.1_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@19.2.14_react-dom_774a6dff9510bebce6a2343405a1ca59/node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var U = 1, Y$1 = .9, H = .8, J = .17, p = .1, u = .999, $ = .9999;
var k$1 = .99, m = /[\\\/_+.#"@\[\(\{&]/, B$1 = /[\\\/_+.#"@\[\(\{&]/g, K$1 = /[\s-]/, X = /[\s-]/g;
function G(_, C, h, P, A, f, O) {
	if (f === C.length) return A === _.length ? U : k$1;
	var T = `${A},${f}`;
	if (O[T] !== void 0) return O[T];
	for (var L = P.charAt(f), c = h.indexOf(L, A), S = 0, E, N, R, M; c >= 0;) E = G(_, C, h, P, c + 1, f + 1, O), E > S && (c === A ? E *= U : m.test(_.charAt(c - 1)) ? (E *= H, R = _.slice(A, c - 1).match(B$1), R && A > 0 && (E *= Math.pow(u, R.length))) : K$1.test(_.charAt(c - 1)) ? (E *= Y$1, M = _.slice(A, c - 1).match(X), M && A > 0 && (E *= Math.pow(u, M.length))) : (E *= J, A > 0 && (E *= Math.pow(u, c - A))), _.charAt(c) !== C.charAt(f) && (E *= $)), (E < p && h.charAt(c - 1) === P.charAt(f + 1) || P.charAt(f + 1) === P.charAt(f) && h.charAt(c - 1) !== P.charAt(f)) && (N = G(_, C, h, P, c + 1, f + 2, O), N * p > E && (E = N * p)), E > S && (S = E), c = h.indexOf(L, c + 1);
	return O[T] = S, S;
}
function D(_) {
	return _.toLowerCase().replace(X, " ");
}
function W(_, C, h) {
	return _ = h && h.length > 0 ? `${_ + " " + h.join(" ")}` : _, G(_, C, D(_), D(C), 0, 0, {});
}
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/cmdk@1.1.1_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@19.2.14_react-dom_774a6dff9510bebce6a2343405a1ca59/node_modules/cmdk/dist/index.mjs
var N = "[cmdk-group=\"\"]", Y = "[cmdk-group-items=\"\"]", be = "[cmdk-group-heading=\"\"]", le = "[cmdk-item=\"\"]", ce = `${le}:not([aria-disabled="true"])`, Z = "cmdk-item-select", T = "data-value", Re = (r, o, n) => W(r, o, n), ue = import_react.createContext(void 0), K = () => import_react.useContext(ue), de = import_react.createContext(void 0), ee = () => import_react.useContext(de), fe = import_react.createContext(void 0), me = import_react.forwardRef((r, o) => {
	let n = L(() => {
		var e, a;
		return {
			search: "",
			value: (a = (e = r.value) != null ? e : r.defaultValue) != null ? a : "",
			selectedItemId: void 0,
			filtered: {
				count: 0,
				items: /* @__PURE__ */ new Map(),
				groups: /* @__PURE__ */ new Set()
			}
		};
	}), u = L(() => /* @__PURE__ */ new Set()), c = L(() => /* @__PURE__ */ new Map()), d = L(() => /* @__PURE__ */ new Map()), f = L(() => /* @__PURE__ */ new Set()), p = pe(r), { label: b, children: m, value: R, onValueChange: x, filter: C, shouldFilter: S, loop: A, disablePointerSelection: ge = !1, vimBindings: j = !0, ...O } = r, $ = useId(), q = useId(), _ = useId(), I = import_react.useRef(null), v = ke();
	k(() => {
		if (R !== void 0) {
			let e = R.trim();
			n.current.value = e, E.emit();
		}
	}, [R]), k(() => {
		v(6, ne);
	}, []);
	let E = import_react.useMemo(() => ({
		subscribe: (e) => (f.current.add(e), () => f.current.delete(e)),
		snapshot: () => n.current,
		setState: (e, a, s) => {
			var i, l, g, y;
			if (!Object.is(n.current[e], a)) {
				if (n.current[e] = a, e === "search") J(), z(), v(1, W);
				else if (e === "value") {
					if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
						let h = document.getElementById(_);
						h ? h.focus() : (i = document.getElementById($)) == null || i.focus();
					}
					if (v(7, () => {
						var h;
						n.current.selectedItemId = (h = M()) == null ? void 0 : h.id, E.emit();
					}), s || v(5, ne), ((l = p.current) == null ? void 0 : l.value) !== void 0) {
						let h = a != null ? a : "";
						(y = (g = p.current).onValueChange) == null || y.call(g, h);
						return;
					}
				}
				E.emit();
			}
		},
		emit: () => {
			f.current.forEach((e) => e());
		}
	}), []), U = import_react.useMemo(() => ({
		value: (e, a, s) => {
			var i;
			a !== ((i = d.current.get(e)) == null ? void 0 : i.value) && (d.current.set(e, {
				value: a,
				keywords: s
			}), n.current.filtered.items.set(e, te(a, s)), v(2, () => {
				z(), E.emit();
			}));
		},
		item: (e, a) => (u.current.add(e), a && (c.current.has(a) ? c.current.get(a).add(e) : c.current.set(a, new Set([e]))), v(3, () => {
			J(), z(), n.current.value || W(), E.emit();
		}), () => {
			d.current.delete(e), u.current.delete(e), n.current.filtered.items.delete(e);
			let s = M();
			v(4, () => {
				J(), (s == null ? void 0 : s.getAttribute("id")) === e && W(), E.emit();
			});
		}),
		group: (e) => (c.current.has(e) || c.current.set(e, /* @__PURE__ */ new Set()), () => {
			d.current.delete(e), c.current.delete(e);
		}),
		filter: () => p.current.shouldFilter,
		label: b || r["aria-label"],
		getDisablePointerSelection: () => p.current.disablePointerSelection,
		listId: $,
		inputId: _,
		labelId: q,
		listInnerRef: I
	}), []);
	function te(e, a) {
		var i, l;
		let s = (l = (i = p.current) == null ? void 0 : i.filter) != null ? l : Re;
		return e ? s(e, n.current.search, a) : 0;
	}
	function z() {
		if (!n.current.search || p.current.shouldFilter === !1) return;
		let e = n.current.filtered.items, a = [];
		n.current.filtered.groups.forEach((i) => {
			let l = c.current.get(i), g = 0;
			l.forEach((y) => {
				let h = e.get(y);
				g = Math.max(h, g);
			}), a.push([i, g]);
		});
		let s = I.current;
		V().sort((i, l) => {
			var h, F;
			let g = i.getAttribute("id"), y = l.getAttribute("id");
			return ((h = e.get(y)) != null ? h : 0) - ((F = e.get(g)) != null ? F : 0);
		}).forEach((i) => {
			let l = i.closest(Y);
			l ? l.appendChild(i.parentElement === l ? i : i.closest(`${Y} > *`)) : s.appendChild(i.parentElement === s ? i : i.closest(`${Y} > *`));
		}), a.sort((i, l) => l[1] - i[1]).forEach((i) => {
			var g;
			let l = (g = I.current) == null ? void 0 : g.querySelector(`${N}[${T}="${encodeURIComponent(i[0])}"]`);
			l?.parentElement.appendChild(l);
		});
	}
	function W() {
		let e = V().find((s) => s.getAttribute("aria-disabled") !== "true"), a = e == null ? void 0 : e.getAttribute(T);
		E.setState("value", a || void 0);
	}
	function J() {
		var a, s, i, l;
		if (!n.current.search || p.current.shouldFilter === !1) {
			n.current.filtered.count = u.current.size;
			return;
		}
		n.current.filtered.groups = /* @__PURE__ */ new Set();
		let e = 0;
		for (let g of u.current) {
			let F = te((s = (a = d.current.get(g)) == null ? void 0 : a.value) != null ? s : "", (l = (i = d.current.get(g)) == null ? void 0 : i.keywords) != null ? l : []);
			n.current.filtered.items.set(g, F), F > 0 && e++;
		}
		for (let [g, y] of c.current) for (let h of y) if (n.current.filtered.items.get(h) > 0) {
			n.current.filtered.groups.add(g);
			break;
		}
		n.current.filtered.count = e;
	}
	function ne() {
		var a, s, i;
		let e = M();
		e && (((a = e.parentElement) == null ? void 0 : a.firstChild) === e && ((i = (s = e.closest(N)) == null ? void 0 : s.querySelector(be)) == null || i.scrollIntoView({ block: "nearest" })), e.scrollIntoView({ block: "nearest" }));
	}
	function M() {
		var e;
		return (e = I.current) == null ? void 0 : e.querySelector(`${le}[aria-selected="true"]`);
	}
	function V() {
		var e;
		return Array.from(((e = I.current) == null ? void 0 : e.querySelectorAll(ce)) || []);
	}
	function X(e) {
		let s = V()[e];
		s && E.setState("value", s.getAttribute(T));
	}
	function Q(e) {
		var g;
		let a = M(), s = V(), i = s.findIndex((y) => y === a), l = s[i + e];
		(g = p.current) != null && g.loop && (l = i + e < 0 ? s[s.length - 1] : i + e === s.length ? s[0] : s[i + e]), l && E.setState("value", l.getAttribute(T));
	}
	function re(e) {
		let a = M(), s = a == null ? void 0 : a.closest(N), i;
		for (; s && !i;) s = e > 0 ? we(s, N) : De(s, N), i = s == null ? void 0 : s.querySelector(ce);
		i ? E.setState("value", i.getAttribute(T)) : Q(e);
	}
	let oe = () => X(V().length - 1), ie = (e) => {
		e.preventDefault(), e.metaKey ? oe() : e.altKey ? re(1) : Q(1);
	}, se = (e) => {
		e.preventDefault(), e.metaKey ? X(0) : e.altKey ? re(-1) : Q(-1);
	};
	return import_react.createElement(Primitive.div, {
		ref: o,
		tabIndex: -1,
		...O,
		"cmdk-root": "",
		onKeyDown: (e) => {
			var s;
			(s = O.onKeyDown) == null || s.call(O, e);
			let a = e.nativeEvent.isComposing || e.keyCode === 229;
			if (!(e.defaultPrevented || a)) switch (e.key) {
				case "n":
				case "j":
					j && e.ctrlKey && ie(e);
					break;
				case "ArrowDown":
					ie(e);
					break;
				case "p":
				case "k":
					j && e.ctrlKey && se(e);
					break;
				case "ArrowUp":
					se(e);
					break;
				case "Home":
					e.preventDefault(), X(0);
					break;
				case "End":
					e.preventDefault(), oe();
					break;
				case "Enter": {
					e.preventDefault();
					let i = M();
					if (i) {
						let l = new Event(Z);
						i.dispatchEvent(l);
					}
				}
			}
		}
	}, import_react.createElement("label", {
		"cmdk-label": "",
		htmlFor: U.inputId,
		id: U.labelId,
		style: Te
	}, b), B(r, (e) => import_react.createElement(de.Provider, { value: E }, import_react.createElement(ue.Provider, { value: U }, e))));
}), he = import_react.forwardRef((r, o) => {
	var _, I;
	let n = useId(), u = import_react.useRef(null), c = import_react.useContext(fe), d = K(), f = pe(r), p = (I = (_ = f.current) == null ? void 0 : _.forceMount) != null ? I : c == null ? void 0 : c.forceMount;
	k(() => {
		if (!p) return d.item(n, c == null ? void 0 : c.id);
	}, [p]);
	let b = ve(n, u, [
		r.value,
		r.children,
		u
	], r.keywords), m = ee(), R = P((v) => v.value && v.value === b.current), x = P((v) => p || d.filter() === !1 ? !0 : v.search ? v.filtered.items.get(n) > 0 : !0);
	import_react.useEffect(() => {
		let v = u.current;
		if (!(!v || r.disabled)) return v.addEventListener(Z, C), () => v.removeEventListener(Z, C);
	}, [
		x,
		r.onSelect,
		r.disabled
	]);
	function C() {
		var v, E;
		S(), (E = (v = f.current).onSelect) == null || E.call(v, b.current);
	}
	function S() {
		m.setState("value", b.current, !0);
	}
	if (!x) return null;
	let { disabled: A, value: ge, onSelect: j, forceMount: O, keywords: $, ...q } = r;
	return import_react.createElement(Primitive.div, {
		ref: composeRefs(u, o),
		...q,
		id: n,
		"cmdk-item": "",
		role: "option",
		"aria-disabled": !!A,
		"aria-selected": !!R,
		"data-disabled": !!A,
		"data-selected": !!R,
		onPointerMove: A || d.getDisablePointerSelection() ? void 0 : S,
		onClick: A ? void 0 : C
	}, r.children);
}), Ee = import_react.forwardRef((r, o) => {
	let { heading: n, children: u, forceMount: c, ...d } = r, f = useId(), p = import_react.useRef(null), b = import_react.useRef(null), m = useId(), R = K(), x = P((S) => c || R.filter() === !1 ? !0 : S.search ? S.filtered.groups.has(f) : !0);
	k(() => R.group(f), []), ve(f, p, [
		r.value,
		r.heading,
		b
	]);
	let C = import_react.useMemo(() => ({
		id: f,
		forceMount: c
	}), [c]);
	return import_react.createElement(Primitive.div, {
		ref: composeRefs(p, o),
		...d,
		"cmdk-group": "",
		role: "presentation",
		hidden: x ? void 0 : !0
	}, n && import_react.createElement("div", {
		ref: b,
		"cmdk-group-heading": "",
		"aria-hidden": !0,
		id: m
	}, n), B(r, (S) => import_react.createElement("div", {
		"cmdk-group-items": "",
		role: "group",
		"aria-labelledby": n ? m : void 0
	}, import_react.createElement(fe.Provider, { value: C }, S))));
}), ye = import_react.forwardRef((r, o) => {
	let { alwaysRender: n, ...u } = r, c = import_react.useRef(null), d = P((f) => !f.search);
	return !n && !d ? null : import_react.createElement(Primitive.div, {
		ref: composeRefs(c, o),
		...u,
		"cmdk-separator": "",
		role: "separator"
	});
}), Se = import_react.forwardRef((r, o) => {
	let { onValueChange: n, ...u } = r, c = r.value != null, d = ee(), f = P((m) => m.search), p = P((m) => m.selectedItemId), b = K();
	return import_react.useEffect(() => {
		r.value != null && d.setState("search", r.value);
	}, [r.value]), import_react.createElement(Primitive.input, {
		ref: o,
		...u,
		"cmdk-input": "",
		autoComplete: "off",
		autoCorrect: "off",
		spellCheck: !1,
		"aria-autocomplete": "list",
		role: "combobox",
		"aria-expanded": !0,
		"aria-controls": b.listId,
		"aria-labelledby": b.labelId,
		"aria-activedescendant": p,
		id: b.inputId,
		type: "text",
		value: c ? r.value : f,
		onChange: (m) => {
			c || d.setState("search", m.target.value), n?.(m.target.value);
		}
	});
}), Ce = import_react.forwardRef((r, o) => {
	let { children: n, label: u = "Suggestions", ...c } = r, d = import_react.useRef(null), f = import_react.useRef(null), p = P((m) => m.selectedItemId), b = K();
	return import_react.useEffect(() => {
		if (f.current && d.current) {
			let m = f.current, R = d.current, x, C = new ResizeObserver(() => {
				x = requestAnimationFrame(() => {
					let S = m.offsetHeight;
					R.style.setProperty("--cmdk-list-height", S.toFixed(1) + "px");
				});
			});
			return C.observe(m), () => {
				cancelAnimationFrame(x), C.unobserve(m);
			};
		}
	}, []), import_react.createElement(Primitive.div, {
		ref: composeRefs(d, o),
		...c,
		"cmdk-list": "",
		role: "listbox",
		tabIndex: -1,
		"aria-activedescendant": p,
		"aria-label": u,
		id: b.listId
	}, B(r, (m) => import_react.createElement("div", {
		ref: composeRefs(f, b.listInnerRef),
		"cmdk-list-sizer": ""
	}, m)));
}), xe = import_react.forwardRef((r, o) => {
	let { open: n, onOpenChange: u, overlayClassName: c, contentClassName: d, container: f, ...p } = r;
	return import_react.createElement(Root, {
		open: n,
		onOpenChange: u
	}, import_react.createElement(Portal, { container: f }, import_react.createElement(Overlay, {
		"cmdk-overlay": "",
		className: c
	}), import_react.createElement(Content, {
		"aria-label": r.label,
		"cmdk-dialog": "",
		className: d
	}, import_react.createElement(me, {
		ref: o,
		...p
	}))));
}), Ie = import_react.forwardRef((r, o) => P((u) => u.filtered.count === 0) ? import_react.createElement(Primitive.div, {
	ref: o,
	...r,
	"cmdk-empty": "",
	role: "presentation"
}) : null), Pe = import_react.forwardRef((r, o) => {
	let { progress: n, children: u, label: c = "Loading...", ...d } = r;
	return import_react.createElement(Primitive.div, {
		ref: o,
		...d,
		"cmdk-loading": "",
		role: "progressbar",
		"aria-valuenow": n,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": c
	}, B(r, (f) => import_react.createElement("div", { "aria-hidden": !0 }, f)));
}), _e = Object.assign(me, {
	List: Ce,
	Item: he,
	Input: Se,
	Group: Ee,
	Separator: ye,
	Dialog: xe,
	Empty: Ie,
	Loading: Pe
});
function we(r, o) {
	let n = r.nextElementSibling;
	for (; n;) {
		if (n.matches(o)) return n;
		n = n.nextElementSibling;
	}
}
function De(r, o) {
	let n = r.previousElementSibling;
	for (; n;) {
		if (n.matches(o)) return n;
		n = n.previousElementSibling;
	}
}
function pe(r) {
	let o = import_react.useRef(r);
	return k(() => {
		o.current = r;
	}), o;
}
var k = typeof window == "undefined" ? import_react.useEffect : import_react.useLayoutEffect;
function L(r) {
	let o = import_react.useRef();
	return o.current === void 0 && (o.current = r()), o;
}
function P(r) {
	let o = ee(), n = () => r(o.snapshot());
	return import_react.useSyncExternalStore(o.subscribe, n, n);
}
function ve(r, o, n, u = []) {
	let c = import_react.useRef(), d = K();
	return k(() => {
		var b;
		let f = (() => {
			var m;
			for (let R of n) {
				if (typeof R == "string") return R.trim();
				if (typeof R == "object" && "current" in R) return R.current ? (m = R.current.textContent) == null ? void 0 : m.trim() : c.current;
			}
		})(), p = u.map((m) => m.trim());
		d.value(r, f, p), (b = o.current) == null || b.setAttribute(T, f), c.current = f;
	}), c;
}
var ke = () => {
	let [r, o] = import_react.useState(), n = L(() => /* @__PURE__ */ new Map());
	return k(() => {
		n.current.forEach((u) => u()), n.current = /* @__PURE__ */ new Map();
	}, [r]), (u, c) => {
		n.current.set(u, c), o({});
	};
};
function Me(r) {
	let o = r.type;
	return typeof o == "function" ? o(r.props) : "render" in o ? o.render(r.props) : r;
}
function B({ asChild: r, children: o }, n) {
	return r && import_react.isValidElement(o) ? import_react.cloneElement(Me(o), { ref: o.ref }, n(o.props.children)) : n(o);
}
var Te = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0"
};
//#endregion
//#region src/components/ui/command.tsx
var Command = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e, {
	"data-uid": "src/components/ui/command.tsx:14:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className),
	...props
}));
Command.displayName = _e.displayName;
var CommandInput = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-uid": "src/components/ui/command.tsx:41:3",
	"data-prohibitions": "[editContent]",
	className: "flex items-center border-b px-3",
	"cmdk-input-wrapper": "",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
		"data-uid": "src/components/ui/command.tsx:42:5",
		"data-prohibitions": "[editContent]",
		className: "mr-2 h-4 w-4 shrink-0 opacity-50"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
		"data-uid": "src/components/ui/command.tsx:43:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	})]
}));
CommandInput.displayName = _e.Input.displayName;
var CommandList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
	"data-uid": "src/components/ui/command.tsx:60:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
	...props
}));
CommandList.displayName = _e.List.displayName;
var CommandEmpty = import_react.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
	"data-uid": "src/components/ui/command.tsx:73:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: "py-6 text-center text-sm",
	...props
}));
CommandEmpty.displayName = _e.Empty.displayName;
var CommandGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
	"data-uid": "src/components/ui/command.tsx:82:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className),
	...props
}));
CommandGroup.displayName = _e.Group.displayName;
var CommandSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Separator, {
	"data-uid": "src/components/ui/command.tsx:98:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("-mx-1 h-px bg-border", className),
	...props
}));
CommandSeparator.displayName = _e.Separator.displayName;
var CommandItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
	"data-uid": "src/components/ui/command.tsx:110:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className),
	...props
}));
CommandItem.displayName = _e.Item.displayName;
var CommandShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/command.tsx:124:5",
		"data-prohibitions": "[editContent]",
		className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
		...props
	});
};
CommandShortcut.displayName = "CommandShortcut";
//#endregion
//#region src/components/GedUpload.tsx
var DOCUMENT_TYPES = [
	{
		id: "OWNER_DOCUMENT",
		label: "Documento de Proprietário"
	},
	{
		id: "TENANT_DOCUMENT",
		label: "Documento de Locatário"
	},
	{
		id: "GUARANTEE_DOCUMENT",
		label: "Documentos de Garantia"
	},
	{
		id: "CONTRACT_ACTIVE",
		label: "Contrato Ativo (Importar Legado)"
	},
	{
		id: "CONTRACT_TERMINATED",
		label: "Contrato Encerrado"
	},
	{
		id: "INSPECTION_MOVE_IN",
		label: "Vistoria de Entrada"
	},
	{
		id: "INSPECTION_MOVE_OUT",
		label: "Vistoria de Saída"
	}
];
function GedUpload({ preselectedPropertyId, preselectedType, onSuccess }) {
	const { settings, properties: mainProperties } = useMainStore();
	const { owners, tenants, properties: localProperties } = useEntitiesStore();
	const { user } = useAuth();
	const { toast } = useToast();
	const [propertyId, setPropertyId] = (0, import_react.useState)(preselectedPropertyId || "");
	const [selectedProperty, setSelectedProperty] = (0, import_react.useState)(null);
	const [propertyOpen, setPropertyOpen] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [docType, setDocType] = (0, import_react.useState)(preselectedType || "");
	const [entityCode, setEntityCode] = (0, import_react.useState)("");
	const [file, setFile] = (0, import_react.useState)(null);
	const [ownerOpen, setOwnerOpen] = (0, import_react.useState)(false);
	const [ownerSearchQuery, setOwnerSearchQuery] = (0, import_react.useState)("");
	const [selectedOwner, setSelectedOwner] = (0, import_react.useState)(null);
	const [tenantOpen, setTenantOpen] = (0, import_react.useState)(false);
	const [tenantSearchQuery, setTenantSearchQuery] = (0, import_react.useState)("");
	const [selectedTenant, setSelectedTenant] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [sendToManager, setSendToManager] = (0, import_react.useState)(false);
	const [leaseNumber, setLeaseNumber] = (0, import_react.useState)("");
	const [folderNumber, setFolderNumber] = (0, import_react.useState)("");
	const hasSpAccess = (0, import_react.useMemo)(() => {
		if (!user) return false;
		return settings.spIntegrationRoles?.includes(user.role) ?? false;
	}, [user, settings.spIntegrationRoles]);
	const [serverProperties, setServerProperties] = (0, import_react.useState)([]);
	const [loadingProperties, setLoadingProperties] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const fetchProperties = async () => {
			setLoadingProperties(true);
			try {
				const url = searchQuery ? `http://192.168.10.225:9000/imoveis?q=${encodeURIComponent(searchQuery)}` : "http://192.168.10.225:9000/imoveis";
				const response = await fetch(url);
				if (response.ok) {
					const data = await response.json();
					setServerProperties(Array.isArray(data) ? data : []);
				} else setServerProperties([]);
			} catch (error) {
				console.error("Erro ao buscar imóveis do servidor local", error);
				setServerProperties([]);
			} finally {
				setLoadingProperties(false);
			}
		};
		const timer = setTimeout(() => {
			if (propertyOpen) fetchProperties();
		}, 300);
		return () => clearTimeout(timer);
	}, [searchQuery, propertyOpen]);
	const localServerProperties = (0, import_react.useMemo)(() => {
		const lowerQuery = searchQuery.toLowerCase();
		return serverProperties.filter((p) => !lowerQuery || p.code && String(p.code).toLowerCase().includes(lowerQuery) || p.id && String(p.id).toLowerCase().includes(lowerQuery) || p.title && String(p.title).toLowerCase().includes(lowerQuery) || p.address && String(p.address).toLowerCase().includes(lowerQuery)).slice(0, 50);
	}, [serverProperties, searchQuery]);
	const localServerOwners = (0, import_react.useMemo)(() => {
		if (!owners) return [];
		const lowerQuery = ownerSearchQuery.toLowerCase();
		return owners.filter((o) => !lowerQuery || o.code && o.code.toLowerCase().includes(lowerQuery) || o.fullName && o.fullName.toLowerCase().includes(lowerQuery) || o.name && o.name.toLowerCase().includes(lowerQuery)).slice(0, 50);
	}, [owners, ownerSearchQuery]);
	const localServerTenants = (0, import_react.useMemo)(() => {
		if (!tenants) return [];
		const lowerQuery = tenantSearchQuery.toLowerCase();
		return tenants.filter((t) => !lowerQuery || t.code && t.code.toLowerCase().includes(lowerQuery) || t.fullName && t.fullName.toLowerCase().includes(lowerQuery) || t.name && t.name.toLowerCase().includes(lowerQuery)).slice(0, 50);
	}, [tenants, tenantSearchQuery]);
	(0, import_react.useEffect)(() => {
		if (preselectedPropertyId && !selectedProperty) setSelectedProperty({
			id: preselectedPropertyId,
			title: "Imóvel Selecionado"
		});
	}, [preselectedPropertyId, selectedProperty]);
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
	};
	const handleUpload = async () => {
		if (!file || !propertyId || !docType || !hasSpAccess || !selectedProperty) return;
		setUploading(true);
		try {
			let finalEntityName = "";
			let finalEntityCode = entityCode;
			if (docType === "OWNER_DOCUMENT" && selectedOwner) {
				finalEntityName = selectedOwner.name || selectedOwner.fullName || selectedOwner.title || "";
				finalEntityCode = selectedOwner.code || selectedOwner.id || "";
			} else if (docType === "TENANT_DOCUMENT" && selectedTenant) {
				finalEntityName = selectedTenant.name || selectedTenant.fullName || selectedTenant.title || "";
				finalEntityCode = selectedTenant.code || selectedTenant.id || "";
			}
			const propId = selectedProperty.code || selectedProperty.id;
			const propTitle = selectedProperty.title || selectedProperty.address || "Imóvel";
			const result = await m365Service.uploadStructuredDocument(file, file.name, docType, propId, propTitle, user?.name || "Sistema", finalEntityCode, finalEntityName, leaseNumber, folderNumber);
			await documentsStore.addDocument({
				propertyId: propId,
				name: file.name,
				category: docType,
				entityCode: finalEntityCode || void 0,
				entityName: finalEntityName || void 0,
				filePath: result?.path || void 0
			});
			if (sendToManager) mainStore.updateProperty(propId, { status: "Análise Gerencial" });
			toast({
				title: "Upload Concluído",
				description: "Documento enviado e classificado com sucesso no SharePoint."
			});
			setFile(null);
			setEntityCode("");
			setSelectedOwner(null);
			setSelectedTenant(null);
			setLeaseNumber("");
			setFolderNumber("");
			const fileInput = document.getElementById("file-upload");
			if (fileInput) fileInput.value = "";
			if (onSuccess) onSuccess();
		} catch (e) {} finally {
			setUploading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/GedUpload.tsx:239:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-4 flex-1 flex flex-col",
		children: [
			!hasSpAccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				"data-uid": "src/components/GedUpload.tsx:241:9",
				"data-prohibitions": "[editContent]",
				variant: "destructive",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						"data-uid": "src/components/GedUpload.tsx:242:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
						"data-uid": "src/components/GedUpload.tsx:243:11",
						"data-prohibitions": "[]",
						children: "Acesso Negado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
						"data-uid": "src/components/GedUpload.tsx:244:11",
						"data-prohibitions": "[editContent]",
						children: [
							"Seu perfil (",
							user?.role,
							") não possui permissão para realizar uploads no SharePoint."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:250:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:251:9",
					"data-prohibitions": "[]",
					children: "Imóvel Relacionado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:252:9",
					"data-prohibitions": "[editContent]",
					open: propertyOpen,
					onOpenChange: setPropertyOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:253:11",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:254:13",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": propertyOpen,
							disabled: !!preselectedPropertyId || !hasSpAccess,
							className: "w-full justify-between font-normal",
							children: [selectedProperty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:262:17",
								"data-prohibitions": "[editContent]",
								className: "truncate",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/GedUpload.tsx:263:19",
										"data-prohibitions": "[editContent]",
										className: "mr-1",
										children: selectedProperty.code || selectedProperty.id
									}),
									" -",
									" ",
									selectedProperty.title || selectedProperty.address
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:267:17",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Selecione ou busque o imóvel no servidor..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:271:15",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:274:11",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:275:13",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:276:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar por ID ou título...",
								value: searchQuery,
								onValueChange: setSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:281:15",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:282:17",
									"data-prohibitions": "[editContent]",
									children: loadingProperties ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/GedUpload.tsx:284:21",
										"data-prohibitions": "[]",
										className: "flex items-center justify-center py-2 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/components/GedUpload.tsx:285:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4 animate-spin mr-2"
										}), "Buscando no servidor local..."]
									}) : "Nenhum imóvel encontrado no servidor local."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:292:17",
									"data-prohibitions": "[editContent]",
									children: localServerProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:294:21",
										"data-prohibitions": "[editContent]",
										value: p.code || p.id,
										onSelect: () => {
											setPropertyId(p.code || p.id);
											setSelectedProperty(p);
											setPropertyOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"data-uid": "src/components/GedUpload.tsx:303:23",
											"data-prohibitions": "[editContent]",
											className: cn("mr-2 h-4 w-4", propertyId === (p.code || p.id) ? "opacity-100" : "opacity-0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/GedUpload.tsx:309:23",
											"data-prohibitions": "[editContent]",
											className: "truncate",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													"data-uid": "src/components/GedUpload.tsx:310:25",
													"data-prohibitions": "[editContent]",
													className: "mr-1",
													children: p.code || p.id
												}),
												" - ",
												p.title || p.address
											]
										})]
									}, p.code || p.id))
								})]
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:321:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:322:9",
					"data-prohibitions": "[]",
					children: "Categoria do Documento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/GedUpload.tsx:323:9",
					"data-prohibitions": "[editContent]",
					value: docType,
					onValueChange: setDocType,
					disabled: !!preselectedType || !hasSpAccess,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/GedUpload.tsx:328:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/GedUpload.tsx:329:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Selecione a categoria..."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						"data-uid": "src/components/GedUpload.tsx:331:11",
						"data-prohibitions": "[editContent]",
						children: DOCUMENT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/GedUpload.tsx:333:15",
							"data-prohibitions": "[editContent]",
							value: t.id,
							children: t.label
						}, t.id))
					})]
				})]
			}),
			docType === "OWNER_DOCUMENT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:342:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:343:11",
					"data-prohibitions": "[]",
					children: "Proprietário (Servidor Local)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:344:11",
					"data-prohibitions": "[editContent]",
					open: ownerOpen,
					onOpenChange: setOwnerOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:345:13",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:346:15",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": ownerOpen,
							disabled: !hasSpAccess,
							className: "w-full justify-between font-normal",
							children: [selectedOwner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:354:19",
								"data-prohibitions": "[editContent]",
								className: "truncate",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/GedUpload.tsx:355:21",
										"data-prohibitions": "[editContent]",
										className: "mr-1",
										children: selectedOwner.code || selectedOwner.id
									}),
									" -",
									" ",
									selectedOwner.name || selectedOwner.fullName || selectedOwner.title
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:359:19",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Buscar proprietário no servidor..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:361:17",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:364:13",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:365:15",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:366:17",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar proprietário...",
								value: ownerSearchQuery,
								onValueChange: setOwnerSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:371:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:372:19",
									"data-prohibitions": "[]",
									children: "Nenhum proprietário encontrado no servidor local."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:373:19",
									"data-prohibitions": "[editContent]",
									children: localServerOwners.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:375:23",
										"data-prohibitions": "[editContent]",
										value: o.id || o.code,
										onSelect: () => {
											setSelectedOwner(o);
											setEntityCode(o.code || o.id);
											setOwnerOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"data-uid": "src/components/GedUpload.tsx:384:25",
											"data-prohibitions": "[editContent]",
											className: cn("mr-2 h-4 w-4", selectedOwner?.id === o.id || selectedOwner?.code === o.code ? "opacity-100" : "opacity-0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/GedUpload.tsx:392:25",
											"data-prohibitions": "[editContent]",
											className: "truncate",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													"data-uid": "src/components/GedUpload.tsx:393:27",
													"data-prohibitions": "[editContent]",
													className: "mr-1",
													children: o.code || o.id
												}),
												" -",
												" ",
												o.name || o.fullName || o.title
											]
										})]
									}, o.id || o.code))
								})]
							})]
						})
					})]
				})]
			}),
			docType === "TENANT_DOCUMENT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:407:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:408:11",
					"data-prohibitions": "[]",
					children: "Locatário (Servidor Local)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/GedUpload.tsx:409:11",
					"data-prohibitions": "[editContent]",
					open: tenantOpen,
					onOpenChange: setTenantOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/GedUpload.tsx:410:13",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/GedUpload.tsx:411:15",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							role: "combobox",
							"aria-expanded": tenantOpen,
							disabled: !hasSpAccess,
							className: "w-full justify-between font-normal",
							children: [selectedTenant ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/GedUpload.tsx:419:19",
								"data-prohibitions": "[editContent]",
								className: "truncate",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										"data-uid": "src/components/GedUpload.tsx:420:21",
										"data-prohibitions": "[editContent]",
										className: "mr-1",
										children: selectedTenant.code || selectedTenant.id
									}),
									" -",
									" ",
									selectedTenant.name || selectedTenant.fullName || selectedTenant.title
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/GedUpload.tsx:424:19",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "Buscar locatário no servidor..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/components/GedUpload.tsx:426:17",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/GedUpload.tsx:429:13",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/GedUpload.tsx:430:15",
							"data-prohibitions": "[editContent]",
							shouldFilter: false,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/GedUpload.tsx:431:17",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar locatário...",
								value: tenantSearchQuery,
								onValueChange: setTenantSearchQuery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/GedUpload.tsx:436:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/GedUpload.tsx:437:19",
									"data-prohibitions": "[]",
									children: "Nenhum locatário encontrado no servidor local."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/GedUpload.tsx:438:19",
									"data-prohibitions": "[editContent]",
									children: localServerTenants.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/GedUpload.tsx:440:23",
										"data-prohibitions": "[editContent]",
										value: t.id || t.code,
										onSelect: () => {
											setSelectedTenant(t);
											setEntityCode(t.code || t.id);
											setTenantOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"data-uid": "src/components/GedUpload.tsx:449:25",
											"data-prohibitions": "[editContent]",
											className: cn("mr-2 h-4 w-4", selectedTenant?.id === t.id || selectedTenant?.code === t.code ? "opacity-100" : "opacity-0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/GedUpload.tsx:457:25",
											"data-prohibitions": "[editContent]",
											className: "truncate",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													"data-uid": "src/components/GedUpload.tsx:458:27",
													"data-prohibitions": "[editContent]",
													className: "mr-1",
													children: t.code || t.id
												}),
												" -",
												" ",
												t.name || t.fullName || t.title
											]
										})]
									}, t.id || t.code))
								})]
							})]
						})
					})]
				})]
			}),
			["INSPECTION_MOVE_IN", "INSPECTION_MOVE_OUT"].includes(docType) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:472:9",
				"data-prohibitions": "[]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:473:11",
					"data-prohibitions": "[]",
					children: "Número da Locação"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:474:11",
					"data-prohibitions": "[editContent]",
					value: leaseNumber,
					onChange: (e) => setLeaseNumber(e.target.value),
					placeholder: "Ex: LOC-12345",
					disabled: !hasSpAccess
				})]
			}),
			["CONTRACT_ACTIVE", "CONTRACT_TERMINATED"].includes(docType) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:484:9",
				"data-prohibitions": "[]",
				className: "grid gap-2 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:485:11",
					"data-prohibitions": "[]",
					children: "Número da Pasta"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:486:11",
					"data-prohibitions": "[editContent]",
					value: folderNumber,
					onChange: (e) => setFolderNumber(e.target.value),
					placeholder: "Ex: 00123",
					disabled: !hasSpAccess
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:495:7",
				"data-prohibitions": "[]",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/components/GedUpload.tsx:496:9",
					"data-prohibitions": "[]",
					children: "Arquivo Selecionado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/GedUpload.tsx:497:9",
					"data-prohibitions": "[editContent]",
					id: "file-upload",
					type: "file",
					onChange: handleFileChange,
					disabled: !hasSpAccess
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/GedUpload.tsx:500:7",
				"data-prohibitions": "[]",
				className: "flex items-center justify-between rounded-lg border p-4 shadow-sm bg-muted/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/GedUpload.tsx:501:9",
					"data-prohibitions": "[]",
					className: "space-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-uid": "src/components/GedUpload.tsx:502:11",
						"data-prohibitions": "[]",
						className: "text-sm font-medium cursor-pointer",
						htmlFor: "manager-approval-switch",
						children: "Análise Gerencial"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/GedUpload.tsx:505:11",
						"data-prohibitions": "[]",
						className: "text-xs text-muted-foreground",
						children: "Mover imóvel para o Hub de Validação após concluir"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					"data-uid": "src/components/GedUpload.tsx:509:9",
					"data-prohibitions": "[editContent]",
					id: "manager-approval-switch",
					checked: sendToManager,
					onCheckedChange: setSendToManager,
					disabled: !hasSpAccess || !propertyId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/components/GedUpload.tsx:517:7",
				"data-prohibitions": "[editContent]",
				className: "w-full mt-auto gap-2",
				onClick: handleUpload,
				disabled: !file || !propertyId || !docType || uploading || !hasSpAccess || docType === "OWNER_DOCUMENT" && !selectedOwner || docType === "TENANT_DOCUMENT" && !selectedTenant || ["INSPECTION_MOVE_IN", "INSPECTION_MOVE_OUT"].includes(docType) && !leaseNumber || ["CONTRACT_ACTIVE", "CONTRACT_TERMINATED"].includes(docType) && !folderNumber,
				children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/components/GedUpload.tsx:533:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4 animate-spin"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
					"data-uid": "src/components/GedUpload.tsx:535:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4"
				}), "Processar e Enviar (GED)"]
			})
		]
	});
}
//#endregion
export { GedUpload as t };

//# sourceMappingURL=GedUpload-BP4Rr88Y.js.map