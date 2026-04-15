import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import "./react-dom-CLL8A-oN.js";
import { n as useToast } from "./use-toast-DzvQdsOw.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CGg98A7s.js";
import "./es2015-Chw5iMW0.js";
import { n as createLucideIcon, r as clsx } from "./utils-BNj1jY-i.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BnRniNmY.js";
import { t as CircleCheckBig } from "./circle-check-big-ZvHRawjc.js";
import { t as Download } from "./download-DNswiS8o.js";
import { t as TriangleAlert } from "./triangle-alert-FpfWcQ-A.js";
import { t as Button } from "./button-iQJzuPvV.js";
import "./client-C4nUQiBY.js";
import { i as useMainStore, r as mainStore } from "./main-7B_Nvovk.js";
import "./users-Bbju60At.js";
import "./keys-D7Gl_VCN.js";
import "./entities-1AjQ7EHU.js";
import { R as Wrench, g as useAuth, i as DropdownMenuItem, n as DropdownMenu, ot as Clock, pt as Activity, r as DropdownMenuContent, rt as FileText, s as DropdownMenuTrigger, t as Badge } from "./index-o8Xr9ZGe.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-BhS_F8IN.js";
import { n as m365Service } from "./m365-C6nMyI-x.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Dsi8AA7E.js";
import { A as mathSign, C as Global, D as adaptEventsOfChild, E as filterProps, M as require_isFunction, O as shallowEqual, S as Cell, T as Layer, _ as Label, a as generateCategoricalChart, b as Text, c as useChartWidth, d as useYAxisOrThrow, f as useYAxisWithFiniteDomainOrRandom, g as Pie, h as Bar, i as PieChart, j as require_get, k as isNumber, l as useOffset, m as getAngledRectangleWidth, n as ChartTooltip, o as useArbitraryXAxis, p as formatAxisMap, r as ChartTooltipContent, s as useChartHeight, t as ChartContainer, u as useXAxisOrThrow, v as getCoordinatesOfGrid, w as warn, x as getStringSize, y as getTicksOfAxis } from "./chart-BaIB2RcZ.js";
var Table = createLucideIcon("table", [
	["path", {
		d: "M12 3v18",
		key: "108xh3"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M3 9h18",
		key: "1pudct"
	}],
	["path", {
		d: "M3 15h18",
		key: "5xshup"
	}]
]);
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/util/getEveryNthWithCondition.js
/**
* Given an array and a number N, return a new array which contains every nTh
* element of the input array. For n below 1, an empty array is returned.
* If isValid is provided, all candidates must suffice the condition, else undefined is returned.
* @param {T[]} array An input array.
* @param {integer} n A number
* @param {Function} isValid A function to evaluate a candidate form the array
* @returns {T[]} The result array of the same type as the input array.
*/
function getEveryNthWithCondition(array, n, isValid) {
	if (n < 1) return [];
	if (n === 1 && isValid === void 0) return array;
	var result = [];
	for (var i = 0; i < array.length; i += n) if (isValid === void 0 || isValid(array[i]) === true) result.push(array[i]);
	else return;
	return result;
}
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/util/TickUtils.js
function getAngledTickWidth(contentSize, unitSize, angle) {
	return getAngledRectangleWidth({
		width: contentSize.width + unitSize.width,
		height: contentSize.height + unitSize.height
	}, angle);
}
function getTickBoundaries(viewBox, sign, sizeKey) {
	var isWidth = sizeKey === "width";
	var x = viewBox.x, y = viewBox.y, width = viewBox.width, height = viewBox.height;
	if (sign === 1) return {
		start: isWidth ? x : y,
		end: isWidth ? x + width : y + height
	};
	return {
		start: isWidth ? x + width : y + height,
		end: isWidth ? x : y
	};
}
function isVisible(sign, tickPosition, getSize, start, end) {
	if (sign * tickPosition < sign * start || sign * tickPosition > sign * end) return false;
	var size = getSize();
	return sign * (tickPosition - sign * size / 2 - start) >= 0 && sign * (tickPosition + sign * size / 2 - end) <= 0;
}
function getNumberIntervalTicks(ticks, interval) {
	return getEveryNthWithCondition(ticks, interval + 1);
}
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/cartesian/getEquidistantTicks.js
function getEquidistantTicks(sign, boundaries, getTickSize, ticks, minTickGap) {
	var result = (ticks || []).slice();
	var initialStart = boundaries.start, end = boundaries.end;
	var index = 0;
	var stepsize = 1;
	var start = initialStart;
	var _loop = function _loop() {
		var entry = ticks === null || ticks === void 0 ? void 0 : ticks[index];
		if (entry === void 0) return { v: getEveryNthWithCondition(ticks, stepsize) };
		var i = index;
		var size;
		var getSize = function getSize() {
			if (size === void 0) size = getTickSize(entry, i);
			return size;
		};
		var tickCoord = entry.coordinate;
		var isShow = index === 0 || isVisible(sign, tickCoord, getSize, start, end);
		if (!isShow) {
			index = 0;
			start = initialStart;
			stepsize += 1;
		}
		if (isShow) {
			start = tickCoord + sign * (getSize() / 2 + minTickGap);
			index += stepsize;
		}
	}, _ret;
	while (stepsize <= result.length) {
		_ret = _loop();
		if (_ret) return _ret.v;
	}
	return [];
}
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/cartesian/getTicks.js
var import_isFunction = /* @__PURE__ */ __toESM(require_isFunction());
function _typeof$4(o) {
	"@babel/helpers - typeof";
	return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$4(o);
}
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
			_defineProperty$4(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$4(obj, key, value) {
	key = _toPropertyKey$4(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$4(t) {
	var i = _toPrimitive$4(t, "string");
	return "symbol" == _typeof$4(i) ? i : i + "";
}
function _toPrimitive$4(t, r) {
	if ("object" != _typeof$4(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$4(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap) {
	var result = (ticks || []).slice();
	var len = result.length;
	var start = boundaries.start;
	var end = boundaries.end;
	var _loop = function _loop(i) {
		var entry = result[i];
		var size;
		var getSize = function getSize() {
			if (size === void 0) size = getTickSize(entry, i);
			return size;
		};
		if (i === len - 1) {
			var gap = sign * (entry.coordinate + sign * getSize() / 2 - end);
			result[i] = entry = _objectSpread$2(_objectSpread$2({}, entry), {}, { tickCoord: gap > 0 ? entry.coordinate - gap * sign : entry.coordinate });
		} else result[i] = entry = _objectSpread$2(_objectSpread$2({}, entry), {}, { tickCoord: entry.coordinate });
		if (isVisible(sign, entry.tickCoord, getSize, start, end)) {
			end = entry.tickCoord - sign * (getSize() / 2 + minTickGap);
			result[i] = _objectSpread$2(_objectSpread$2({}, entry), {}, { isShow: true });
		}
	};
	for (var i = len - 1; i >= 0; i--) _loop(i);
	return result;
}
function getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, preserveEnd) {
	var result = (ticks || []).slice();
	var len = result.length;
	var start = boundaries.start, end = boundaries.end;
	if (preserveEnd) {
		var tail = ticks[len - 1];
		var tailSize = getTickSize(tail, len - 1);
		var tailGap = sign * (tail.coordinate + sign * tailSize / 2 - end);
		result[len - 1] = tail = _objectSpread$2(_objectSpread$2({}, tail), {}, { tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign : tail.coordinate });
		if (isVisible(sign, tail.tickCoord, function() {
			return tailSize;
		}, start, end)) {
			end = tail.tickCoord - sign * (tailSize / 2 + minTickGap);
			result[len - 1] = _objectSpread$2(_objectSpread$2({}, tail), {}, { isShow: true });
		}
	}
	var count = preserveEnd ? len - 1 : len;
	var _loop2 = function _loop2(i) {
		var entry = result[i];
		var size;
		var getSize = function getSize() {
			if (size === void 0) size = getTickSize(entry, i);
			return size;
		};
		if (i === 0) {
			var gap = sign * (entry.coordinate - sign * getSize() / 2 - start);
			result[i] = entry = _objectSpread$2(_objectSpread$2({}, entry), {}, { tickCoord: gap < 0 ? entry.coordinate - gap * sign : entry.coordinate });
		} else result[i] = entry = _objectSpread$2(_objectSpread$2({}, entry), {}, { tickCoord: entry.coordinate });
		if (isVisible(sign, entry.tickCoord, getSize, start, end)) {
			start = entry.tickCoord + sign * (getSize() / 2 + minTickGap);
			result[i] = _objectSpread$2(_objectSpread$2({}, entry), {}, { isShow: true });
		}
	};
	for (var i = 0; i < count; i++) _loop2(i);
	return result;
}
function getTicks(props, fontSize, letterSpacing) {
	var tick = props.tick, ticks = props.ticks, viewBox = props.viewBox, minTickGap = props.minTickGap, orientation = props.orientation, interval = props.interval, tickFormatter = props.tickFormatter, unit = props.unit, angle = props.angle;
	if (!ticks || !ticks.length || !tick) return [];
	if (isNumber(interval) || Global.isSsr) return getNumberIntervalTicks(ticks, typeof interval === "number" && isNumber(interval) ? interval : 0);
	var candidates = [];
	var sizeKey = orientation === "top" || orientation === "bottom" ? "width" : "height";
	var unitSize = unit && sizeKey === "width" ? getStringSize(unit, {
		fontSize,
		letterSpacing
	}) : {
		width: 0,
		height: 0
	};
	var getTickSize = function getTickSize(content, index) {
		var value = (0, import_isFunction.default)(tickFormatter) ? tickFormatter(content.value, index) : content.value;
		return sizeKey === "width" ? getAngledTickWidth(getStringSize(value, {
			fontSize,
			letterSpacing
		}), unitSize, angle) : getStringSize(value, {
			fontSize,
			letterSpacing
		})[sizeKey];
	};
	var sign = ticks.length >= 2 ? mathSign(ticks[1].coordinate - ticks[0].coordinate) : 1;
	var boundaries = getTickBoundaries(viewBox, sign, sizeKey);
	if (interval === "equidistantPreserveStart") return getEquidistantTicks(sign, boundaries, getTickSize, ticks, minTickGap);
	if (interval === "preserveStart" || interval === "preserveStartEnd") candidates = getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, interval === "preserveStartEnd");
	else candidates = getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap);
	return candidates.filter(function(entry) {
		return entry.isShow;
	});
}
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/cartesian/CartesianAxis.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_get = /* @__PURE__ */ __toESM(require_get());
var _excluded$1 = ["viewBox"], _excluded2$1 = ["viewBox"], _excluded3 = ["ticks"];
function _typeof$3(o) {
	"@babel/helpers - typeof";
	return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$3(o);
}
function _extends$3() {
	_extends$3 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$3.apply(this, arguments);
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r) {
			_defineProperty$3(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _objectWithoutProperties$1(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$1(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _classCallCheck$2(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$2(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$3(descriptor.key), descriptor);
	}
}
function _createClass$2(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$2(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$2(t, o, e) {
	return o = _getPrototypeOf$2(o), _possibleConstructorReturn$2(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf$2(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$2(self, call) {
	if (call && (_typeof$3(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$2(self);
}
function _assertThisInitialized$2(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$2() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$2(o) {
	_getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$2(o);
}
function _inherits$2(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$2(subClass, superClass);
}
function _setPrototypeOf$2(o, p) {
	_setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$2(o, p);
}
function _defineProperty$3(obj, key, value) {
	key = _toPropertyKey$3(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$3(t) {
	var i = _toPrimitive$3(t, "string");
	return "symbol" == _typeof$3(i) ? i : i + "";
}
function _toPrimitive$3(t, r) {
	if ("object" != _typeof$3(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$3(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/** The orientation of the axis in correspondence to the chart */
/** A unit to be appended to a value */
/** The formatter function of tick */
var CartesianAxis = /* @__PURE__ */ function(_Component) {
	function CartesianAxis(props) {
		var _this;
		_classCallCheck$2(this, CartesianAxis);
		_this = _callSuper$2(this, CartesianAxis, [props]);
		_this.state = {
			fontSize: "",
			letterSpacing: ""
		};
		return _this;
	}
	_inherits$2(CartesianAxis, _Component);
	return _createClass$2(CartesianAxis, [
		{
			key: "shouldComponentUpdate",
			value: function shouldComponentUpdate(_ref, nextState) {
				var viewBox = _ref.viewBox, restProps = _objectWithoutProperties$1(_ref, _excluded$1);
				var _this$props = this.props, viewBoxOld = _this$props.viewBox, restPropsOld = _objectWithoutProperties$1(_this$props, _excluded2$1);
				return !shallowEqual(viewBox, viewBoxOld) || !shallowEqual(restProps, restPropsOld) || !shallowEqual(nextState, this.state);
			}
		},
		{
			key: "componentDidMount",
			value: function componentDidMount() {
				var htmlLayer = this.layerReference;
				if (!htmlLayer) return;
				var tick = htmlLayer.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
				if (tick) this.setState({
					fontSize: window.getComputedStyle(tick).fontSize,
					letterSpacing: window.getComputedStyle(tick).letterSpacing
				});
			}
		},
		{
			key: "getTickLineCoord",
			value: function getTickLineCoord(data) {
				var _this$props2 = this.props, x = _this$props2.x, y = _this$props2.y, width = _this$props2.width, height = _this$props2.height, orientation = _this$props2.orientation, tickSize = _this$props2.tickSize, mirror = _this$props2.mirror, tickMargin = _this$props2.tickMargin;
				var x1, x2, y1, y2, tx, ty;
				var sign = mirror ? -1 : 1;
				var finalTickSize = data.tickSize || tickSize;
				var tickCoord = isNumber(data.tickCoord) ? data.tickCoord : data.coordinate;
				switch (orientation) {
					case "top":
						x1 = x2 = data.coordinate;
						y2 = y + +!mirror * height;
						y1 = y2 - sign * finalTickSize;
						ty = y1 - sign * tickMargin;
						tx = tickCoord;
						break;
					case "left":
						y1 = y2 = data.coordinate;
						x2 = x + +!mirror * width;
						x1 = x2 - sign * finalTickSize;
						tx = x1 - sign * tickMargin;
						ty = tickCoord;
						break;
					case "right":
						y1 = y2 = data.coordinate;
						x2 = x + +mirror * width;
						x1 = x2 + sign * finalTickSize;
						tx = x1 + sign * tickMargin;
						ty = tickCoord;
						break;
					default:
						x1 = x2 = data.coordinate;
						y2 = y + +mirror * height;
						y1 = y2 + sign * finalTickSize;
						ty = y1 + sign * tickMargin;
						tx = tickCoord;
						break;
				}
				return {
					line: {
						x1,
						y1,
						x2,
						y2
					},
					tick: {
						x: tx,
						y: ty
					}
				};
			}
		},
		{
			key: "getTickTextAnchor",
			value: function getTickTextAnchor() {
				var _this$props3 = this.props, orientation = _this$props3.orientation, mirror = _this$props3.mirror;
				var textAnchor;
				switch (orientation) {
					case "left":
						textAnchor = mirror ? "start" : "end";
						break;
					case "right":
						textAnchor = mirror ? "end" : "start";
						break;
					default:
						textAnchor = "middle";
						break;
				}
				return textAnchor;
			}
		},
		{
			key: "getTickVerticalAnchor",
			value: function getTickVerticalAnchor() {
				var _this$props4 = this.props, orientation = _this$props4.orientation, mirror = _this$props4.mirror;
				var verticalAnchor = "end";
				switch (orientation) {
					case "left":
					case "right":
						verticalAnchor = "middle";
						break;
					case "top":
						verticalAnchor = mirror ? "start" : "end";
						break;
					default:
						verticalAnchor = mirror ? "end" : "start";
						break;
				}
				return verticalAnchor;
			}
		},
		{
			key: "renderAxisLine",
			value: function renderAxisLine() {
				var _this$props5 = this.props, x = _this$props5.x, y = _this$props5.y, width = _this$props5.width, height = _this$props5.height, orientation = _this$props5.orientation, mirror = _this$props5.mirror, axisLine = _this$props5.axisLine;
				var props = _objectSpread$1(_objectSpread$1(_objectSpread$1({}, filterProps(this.props, false)), filterProps(axisLine, false)), {}, { fill: "none" });
				if (orientation === "top" || orientation === "bottom") {
					var needHeight = +(orientation === "top" && !mirror || orientation === "bottom" && mirror);
					props = _objectSpread$1(_objectSpread$1({}, props), {}, {
						x1: x,
						y1: y + needHeight * height,
						x2: x + width,
						y2: y + needHeight * height
					});
				} else {
					var needWidth = +(orientation === "left" && !mirror || orientation === "right" && mirror);
					props = _objectSpread$1(_objectSpread$1({}, props), {}, {
						x1: x + needWidth * width,
						y1: y,
						x2: x + needWidth * width,
						y2: y + height
					});
				}
				return /* @__PURE__ */ import_react.createElement("line", _extends$3({}, props, { className: clsx("recharts-cartesian-axis-line", (0, import_get.default)(axisLine, "className")) }));
			}
		},
		{
			key: "renderTicks",
			value: function renderTicks(ticks, fontSize, letterSpacing) {
				var _this2 = this;
				var _this$props6 = this.props, tickLine = _this$props6.tickLine, stroke = _this$props6.stroke, tick = _this$props6.tick, tickFormatter = _this$props6.tickFormatter, unit = _this$props6.unit;
				var finalTicks = getTicks(_objectSpread$1(_objectSpread$1({}, this.props), {}, { ticks }), fontSize, letterSpacing);
				var textAnchor = this.getTickTextAnchor();
				var verticalAnchor = this.getTickVerticalAnchor();
				var axisProps = filterProps(this.props, false);
				var customTickProps = filterProps(tick, false);
				var tickLineProps = _objectSpread$1(_objectSpread$1({}, axisProps), {}, { fill: "none" }, filterProps(tickLine, false));
				var items = finalTicks.map(function(entry, i) {
					var _this2$getTickLineCoo = _this2.getTickLineCoord(entry), lineCoord = _this2$getTickLineCoo.line, tickCoord = _this2$getTickLineCoo.tick;
					var tickProps = _objectSpread$1(_objectSpread$1(_objectSpread$1(_objectSpread$1({
						textAnchor,
						verticalAnchor
					}, axisProps), {}, {
						stroke: "none",
						fill: stroke
					}, customTickProps), tickCoord), {}, {
						index: i,
						payload: entry,
						visibleTicksCount: finalTicks.length,
						tickFormatter
					});
					return /* @__PURE__ */ import_react.createElement(Layer, _extends$3({
						className: "recharts-cartesian-axis-tick",
						key: "tick-".concat(entry.value, "-").concat(entry.coordinate, "-").concat(entry.tickCoord)
					}, adaptEventsOfChild(_this2.props, entry, i)), tickLine && /* @__PURE__ */ import_react.createElement("line", _extends$3({}, tickLineProps, lineCoord, { className: clsx("recharts-cartesian-axis-tick-line", (0, import_get.default)(tickLine, "className")) })), tick && CartesianAxis.renderTickItem(tick, tickProps, "".concat((0, import_isFunction.default)(tickFormatter) ? tickFormatter(entry.value, i) : entry.value).concat(unit || "")));
				});
				return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-axis-ticks" }, items);
			}
		},
		{
			key: "render",
			value: function render() {
				var _this3 = this;
				var _this$props7 = this.props, axisLine = _this$props7.axisLine, width = _this$props7.width, height = _this$props7.height, ticksGenerator = _this$props7.ticksGenerator, className = _this$props7.className;
				if (_this$props7.hide) return null;
				var _this$props8 = this.props, ticks = _this$props8.ticks, noTicksProps = _objectWithoutProperties$1(_this$props8, _excluded3);
				var finalTicks = ticks;
				if ((0, import_isFunction.default)(ticksGenerator)) finalTicks = ticks && ticks.length > 0 ? ticksGenerator(this.props) : ticksGenerator(noTicksProps);
				if (width <= 0 || height <= 0 || !finalTicks || !finalTicks.length) return null;
				return /* @__PURE__ */ import_react.createElement(Layer, {
					className: clsx("recharts-cartesian-axis", className),
					ref: function ref(_ref2) {
						_this3.layerReference = _ref2;
					}
				}, axisLine && this.renderAxisLine(), this.renderTicks(finalTicks, this.state.fontSize, this.state.letterSpacing), Label.renderCallByParent(this.props));
			}
		}
	], [{
		key: "renderTickItem",
		value: function renderTickItem(option, props, value) {
			var tickItem;
			var combinedClassName = clsx(props.className, "recharts-cartesian-axis-tick-value");
			if (/* @__PURE__ */ import_react.isValidElement(option)) tickItem = /* @__PURE__ */ import_react.cloneElement(option, _objectSpread$1(_objectSpread$1({}, props), {}, { className: combinedClassName }));
			else if ((0, import_isFunction.default)(option)) tickItem = option(_objectSpread$1(_objectSpread$1({}, props), {}, { className: combinedClassName }));
			else tickItem = /* @__PURE__ */ import_react.createElement(Text, _extends$3({}, props, { className: "recharts-cartesian-axis-tick-value" }), value);
			return tickItem;
		}
	}]);
}(import_react.Component);
_defineProperty$3(CartesianAxis, "displayName", "CartesianAxis");
_defineProperty$3(CartesianAxis, "defaultProps", {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	viewBox: {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	},
	orientation: "bottom",
	ticks: [],
	stroke: "#666",
	tickLine: true,
	axisLine: true,
	tick: true,
	mirror: false,
	minTickGap: 5,
	tickSize: 6,
	tickMargin: 2,
	interval: "preserveEnd"
});
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/cartesian/CartesianGrid.js
/**
* @fileOverview Cartesian Grid
*/
var _excluded = [
	"x1",
	"y1",
	"x2",
	"y2",
	"key"
], _excluded2 = ["offset"];
function _typeof$2(o) {
	"@babel/helpers - typeof";
	return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$2(o);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty$2(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$2(obj, key, value) {
	key = _toPropertyKey$2(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
	if ("object" != _typeof$2(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$2(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$2() {
	_extends$2 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$2.apply(this, arguments);
}
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
/**
* The <CartesianGrid horizontal
*/
var Background = function Background(props) {
	var fill = props.fill;
	if (!fill || fill === "none") return null;
	var fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, ry = props.ry;
	return /* @__PURE__ */ import_react.createElement("rect", {
		x,
		y,
		ry,
		width,
		height,
		stroke: "none",
		fill,
		fillOpacity,
		className: "recharts-cartesian-grid-bg"
	});
};
function renderLineItem(option, props) {
	var lineItem;
	if (/* @__PURE__ */ import_react.isValidElement(option)) lineItem = /* @__PURE__ */ import_react.cloneElement(option, props);
	else if ((0, import_isFunction.default)(option)) lineItem = option(props);
	else {
		var x1 = props.x1, y1 = props.y1, x2 = props.x2, y2 = props.y2, key = props.key, _filterProps = filterProps(_objectWithoutProperties(props, _excluded), false);
		_filterProps.offset;
		var restOfFilteredProps = _objectWithoutProperties(_filterProps, _excluded2);
		lineItem = /* @__PURE__ */ import_react.createElement("line", _extends$2({}, restOfFilteredProps, {
			x1,
			y1,
			x2,
			y2,
			fill: "none",
			key
		}));
	}
	return lineItem;
}
function HorizontalGridLines(props) {
	var x = props.x, width = props.width, _props$horizontal = props.horizontal, horizontal = _props$horizontal === void 0 ? true : _props$horizontal, horizontalPoints = props.horizontalPoints;
	if (!horizontal || !horizontalPoints || !horizontalPoints.length) return null;
	var items = horizontalPoints.map(function(entry, i) {
		return renderLineItem(horizontal, _objectSpread(_objectSpread({}, props), {}, {
			x1: x,
			y1: entry,
			x2: x + width,
			y2: entry,
			key: "line-".concat(i),
			index: i
		}));
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-grid-horizontal" }, items);
}
function VerticalGridLines(props) {
	var y = props.y, height = props.height, _props$vertical = props.vertical, vertical = _props$vertical === void 0 ? true : _props$vertical, verticalPoints = props.verticalPoints;
	if (!vertical || !verticalPoints || !verticalPoints.length) return null;
	var items = verticalPoints.map(function(entry, i) {
		return renderLineItem(vertical, _objectSpread(_objectSpread({}, props), {}, {
			x1: entry,
			y1: y,
			x2: entry,
			y2: y + height,
			key: "line-".concat(i),
			index: i
		}));
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-grid-vertical" }, items);
}
function HorizontalStripes(props) {
	var horizontalFill = props.horizontalFill, fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, horizontalPoints = props.horizontalPoints, _props$horizontal2 = props.horizontal;
	if (!(_props$horizontal2 === void 0 ? true : _props$horizontal2) || !horizontalFill || !horizontalFill.length) return null;
	var roundedSortedHorizontalPoints = horizontalPoints.map(function(e) {
		return Math.round(e + y - y);
	}).sort(function(a, b) {
		return a - b;
	});
	if (y !== roundedSortedHorizontalPoints[0]) roundedSortedHorizontalPoints.unshift(0);
	var items = roundedSortedHorizontalPoints.map(function(entry, i) {
		var lineHeight = !roundedSortedHorizontalPoints[i + 1] ? y + height - entry : roundedSortedHorizontalPoints[i + 1] - entry;
		if (lineHeight <= 0) return null;
		var colorIndex = i % horizontalFill.length;
		return /* @__PURE__ */ import_react.createElement("rect", {
			key: "react-".concat(i),
			y: entry,
			x,
			height: lineHeight,
			width,
			stroke: "none",
			fill: horizontalFill[colorIndex],
			fillOpacity,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-gridstripes-horizontal" }, items);
}
function VerticalStripes(props) {
	var _props$vertical2 = props.vertical, vertical = _props$vertical2 === void 0 ? true : _props$vertical2, verticalFill = props.verticalFill, fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, verticalPoints = props.verticalPoints;
	if (!vertical || !verticalFill || !verticalFill.length) return null;
	var roundedSortedVerticalPoints = verticalPoints.map(function(e) {
		return Math.round(e + x - x);
	}).sort(function(a, b) {
		return a - b;
	});
	if (x !== roundedSortedVerticalPoints[0]) roundedSortedVerticalPoints.unshift(0);
	var items = roundedSortedVerticalPoints.map(function(entry, i) {
		var lineWidth = !roundedSortedVerticalPoints[i + 1] ? x + width - entry : roundedSortedVerticalPoints[i + 1] - entry;
		if (lineWidth <= 0) return null;
		var colorIndex = i % verticalFill.length;
		return /* @__PURE__ */ import_react.createElement("rect", {
			key: "react-".concat(i),
			x: entry,
			y,
			width: lineWidth,
			height,
			stroke: "none",
			fill: verticalFill[colorIndex],
			fillOpacity,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-gridstripes-vertical" }, items);
}
var defaultVerticalCoordinatesGenerator = function defaultVerticalCoordinatesGenerator(_ref, syncWithTicks) {
	var xAxis = _ref.xAxis, width = _ref.width, height = _ref.height, offset = _ref.offset;
	return getCoordinatesOfGrid(getTicks(_objectSpread(_objectSpread(_objectSpread({}, CartesianAxis.defaultProps), xAxis), {}, {
		ticks: getTicksOfAxis(xAxis, true),
		viewBox: {
			x: 0,
			y: 0,
			width,
			height
		}
	})), offset.left, offset.left + offset.width, syncWithTicks);
};
var defaultHorizontalCoordinatesGenerator = function defaultHorizontalCoordinatesGenerator(_ref2, syncWithTicks) {
	var yAxis = _ref2.yAxis, width = _ref2.width, height = _ref2.height, offset = _ref2.offset;
	return getCoordinatesOfGrid(getTicks(_objectSpread(_objectSpread(_objectSpread({}, CartesianAxis.defaultProps), yAxis), {}, {
		ticks: getTicksOfAxis(yAxis, true),
		viewBox: {
			x: 0,
			y: 0,
			width,
			height
		}
	})), offset.top, offset.top + offset.height, syncWithTicks);
};
var defaultProps = {
	horizontal: true,
	vertical: true,
	horizontalPoints: [],
	verticalPoints: [],
	stroke: "#ccc",
	fill: "none",
	verticalFill: [],
	horizontalFill: []
};
function CartesianGrid(props) {
	var _props$stroke, _props$fill, _props$horizontal3, _props$horizontalFill, _props$vertical3, _props$verticalFill;
	var chartWidth = useChartWidth();
	var chartHeight = useChartHeight();
	var offset = useOffset();
	var propsIncludingDefaults = _objectSpread(_objectSpread({}, props), {}, {
		stroke: (_props$stroke = props.stroke) !== null && _props$stroke !== void 0 ? _props$stroke : defaultProps.stroke,
		fill: (_props$fill = props.fill) !== null && _props$fill !== void 0 ? _props$fill : defaultProps.fill,
		horizontal: (_props$horizontal3 = props.horizontal) !== null && _props$horizontal3 !== void 0 ? _props$horizontal3 : defaultProps.horizontal,
		horizontalFill: (_props$horizontalFill = props.horizontalFill) !== null && _props$horizontalFill !== void 0 ? _props$horizontalFill : defaultProps.horizontalFill,
		vertical: (_props$vertical3 = props.vertical) !== null && _props$vertical3 !== void 0 ? _props$vertical3 : defaultProps.vertical,
		verticalFill: (_props$verticalFill = props.verticalFill) !== null && _props$verticalFill !== void 0 ? _props$verticalFill : defaultProps.verticalFill,
		x: isNumber(props.x) ? props.x : offset.left,
		y: isNumber(props.y) ? props.y : offset.top,
		width: isNumber(props.width) ? props.width : offset.width,
		height: isNumber(props.height) ? props.height : offset.height
	});
	var x = propsIncludingDefaults.x, y = propsIncludingDefaults.y, width = propsIncludingDefaults.width, height = propsIncludingDefaults.height, syncWithTicks = propsIncludingDefaults.syncWithTicks, horizontalValues = propsIncludingDefaults.horizontalValues, verticalValues = propsIncludingDefaults.verticalValues;
	var xAxis = useArbitraryXAxis();
	var yAxis = useYAxisWithFiniteDomainOrRandom();
	if (!isNumber(width) || width <= 0 || !isNumber(height) || height <= 0 || !isNumber(x) || x !== +x || !isNumber(y) || y !== +y) return null;
	var verticalCoordinatesGenerator = propsIncludingDefaults.verticalCoordinatesGenerator || defaultVerticalCoordinatesGenerator;
	var horizontalCoordinatesGenerator = propsIncludingDefaults.horizontalCoordinatesGenerator || defaultHorizontalCoordinatesGenerator;
	var horizontalPoints = propsIncludingDefaults.horizontalPoints, verticalPoints = propsIncludingDefaults.verticalPoints;
	if ((!horizontalPoints || !horizontalPoints.length) && (0, import_isFunction.default)(horizontalCoordinatesGenerator)) {
		var isHorizontalValues = horizontalValues && horizontalValues.length;
		var generatorResult = horizontalCoordinatesGenerator({
			yAxis: yAxis ? _objectSpread(_objectSpread({}, yAxis), {}, { ticks: isHorizontalValues ? horizontalValues : yAxis.ticks }) : void 0,
			width: chartWidth,
			height: chartHeight,
			offset
		}, isHorizontalValues ? true : syncWithTicks);
		warn(Array.isArray(generatorResult), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(_typeof$2(generatorResult), "]"));
		if (Array.isArray(generatorResult)) horizontalPoints = generatorResult;
	}
	if ((!verticalPoints || !verticalPoints.length) && (0, import_isFunction.default)(verticalCoordinatesGenerator)) {
		var isVerticalValues = verticalValues && verticalValues.length;
		var _generatorResult = verticalCoordinatesGenerator({
			xAxis: xAxis ? _objectSpread(_objectSpread({}, xAxis), {}, { ticks: isVerticalValues ? verticalValues : xAxis.ticks }) : void 0,
			width: chartWidth,
			height: chartHeight,
			offset
		}, isVerticalValues ? true : syncWithTicks);
		warn(Array.isArray(_generatorResult), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(_typeof$2(_generatorResult), "]"));
		if (Array.isArray(_generatorResult)) verticalPoints = _generatorResult;
	}
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-grid" }, /* @__PURE__ */ import_react.createElement(Background, {
		fill: propsIncludingDefaults.fill,
		fillOpacity: propsIncludingDefaults.fillOpacity,
		x: propsIncludingDefaults.x,
		y: propsIncludingDefaults.y,
		width: propsIncludingDefaults.width,
		height: propsIncludingDefaults.height,
		ry: propsIncludingDefaults.ry
	}), /* @__PURE__ */ import_react.createElement(HorizontalGridLines, _extends$2({}, propsIncludingDefaults, {
		offset,
		horizontalPoints,
		xAxis,
		yAxis
	})), /* @__PURE__ */ import_react.createElement(VerticalGridLines, _extends$2({}, propsIncludingDefaults, {
		offset,
		verticalPoints,
		xAxis,
		yAxis
	})), /* @__PURE__ */ import_react.createElement(HorizontalStripes, _extends$2({}, propsIncludingDefaults, { horizontalPoints })), /* @__PURE__ */ import_react.createElement(VerticalStripes, _extends$2({}, propsIncludingDefaults, { verticalPoints })));
}
CartesianGrid.displayName = "CartesianGrid";
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/cartesian/XAxis.js
/**
* @fileOverview X Axis
*/
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$1(o);
}
function _classCallCheck$1(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$1(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
	}
}
function _createClass$1(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$1(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$1(t, o, e) {
	return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf$1(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$1(self, call) {
	if (call && (_typeof$1(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$1() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$1(o) {
	_getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$1(o);
}
function _inherits$1(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o, p) {
	_setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$1(o, p);
}
function _defineProperty$1(obj, key, value) {
	key = _toPropertyKey$1(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
	if ("object" != _typeof$1(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$1(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$1() {
	_extends$1 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$1.apply(this, arguments);
}
/** Define of XAxis props */
function XAxisImpl(_ref) {
	var xAxisId = _ref.xAxisId;
	var width = useChartWidth();
	var height = useChartHeight();
	var axisOptions = useXAxisOrThrow(xAxisId);
	if (axisOptions == null) return null;
	return /* @__PURE__ */ import_react.createElement(CartesianAxis, _extends$1({}, axisOptions, {
		className: clsx("recharts-".concat(axisOptions.axisType, " ").concat(axisOptions.axisType), axisOptions.className),
		viewBox: {
			x: 0,
			y: 0,
			width,
			height
		},
		ticksGenerator: function ticksGenerator(axis) {
			return getTicksOfAxis(axis, true);
		}
	}));
}
var XAxis = /* @__PURE__ */ function(_React$Component) {
	function XAxis() {
		_classCallCheck$1(this, XAxis);
		return _callSuper$1(this, XAxis, arguments);
	}
	_inherits$1(XAxis, _React$Component);
	return _createClass$1(XAxis, [{
		key: "render",
		value: function render() {
			return /* @__PURE__ */ import_react.createElement(XAxisImpl, this.props);
		}
	}]);
}(import_react.Component);
_defineProperty$1(XAxis, "displayName", "XAxis");
_defineProperty$1(XAxis, "defaultProps", {
	allowDecimals: true,
	hide: false,
	orientation: "bottom",
	width: 0,
	height: 30,
	mirror: false,
	xAxisId: 0,
	tickCount: 5,
	type: "category",
	padding: {
		left: 0,
		right: 0
	},
	allowDataOverflow: false,
	scale: "auto",
	reversed: false,
	allowDuplicatedCategory: true
});
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/cartesian/YAxis.js
/**
* @fileOverview Y Axis
*/
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	}
}
function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
	if (call && (_typeof(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
	_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
	key = _toPropertyKey(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
var YAxisImpl = function YAxisImpl(_ref) {
	var yAxisId = _ref.yAxisId;
	var width = useChartWidth();
	var height = useChartHeight();
	var axisOptions = useYAxisOrThrow(yAxisId);
	if (axisOptions == null) return null;
	return /* @__PURE__ */ import_react.createElement(CartesianAxis, _extends({}, axisOptions, {
		className: clsx("recharts-".concat(axisOptions.axisType, " ").concat(axisOptions.axisType), axisOptions.className),
		viewBox: {
			x: 0,
			y: 0,
			width,
			height
		},
		ticksGenerator: function ticksGenerator(axis) {
			return getTicksOfAxis(axis, true);
		}
	}));
};
var YAxis = /* @__PURE__ */ function(_React$Component) {
	function YAxis() {
		_classCallCheck(this, YAxis);
		return _callSuper(this, YAxis, arguments);
	}
	_inherits(YAxis, _React$Component);
	return _createClass(YAxis, [{
		key: "render",
		value: function render() {
			return /* @__PURE__ */ import_react.createElement(YAxisImpl, this.props);
		}
	}]);
}(import_react.Component);
_defineProperty(YAxis, "displayName", "YAxis");
_defineProperty(YAxis, "defaultProps", {
	allowDuplicatedCategory: true,
	allowDecimals: true,
	hide: false,
	orientation: "left",
	width: 60,
	height: 0,
	mirror: false,
	yAxisId: 0,
	tickCount: 5,
	type: "number",
	padding: {
		top: 0,
		bottom: 0
	},
	allowDataOverflow: false,
	scale: "auto",
	reversed: false
});
//#endregion
//#region ../../cache/modules/imobiliaria-digital-5a674/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/chart/BarChart.js
/**
* @fileOverview Bar Chart
*/
var BarChart = generateCategoricalChart({
	chartName: "BarChart",
	GraphicalChild: Bar,
	defaultTooltipEventType: "axis",
	validateTooltipEventTypes: ["axis", "item"],
	axisComponents: [{
		axisType: "xAxis",
		AxisComp: XAxis
	}, {
		axisType: "yAxis",
		AxisComp: YAxis
	}],
	formatAxisMap
});
//#endregion
//#region src/components/MaintenanceAnalytics.tsx
var import_jsx_runtime = require_jsx_runtime();
function MaintenanceAnalytics() {
	const { maintenanceTickets, properties } = useMainStore();
	const { user } = useAuth();
	const canExport = user?.role === "Admin" || user?.role === "Gerente";
	const [dateRange, setDateRange] = (0, import_react.useState)("all");
	const [regionFilter, setRegionFilter] = (0, import_react.useState)("all");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const getRegion = (address) => address?.match(/(?:Rua|Av\.|Rodovia)\s+([^,]+)/)?.[1].split(" ")[0] || "Outros";
	const regions = (0, import_react.useMemo)(() => Array.from(new Set(properties.map((p) => getRegion(p.address)))), [properties]);
	const filtered = (0, import_react.useMemo)(() => maintenanceTickets.filter((t) => {
		if (dateRange !== "all" && new Date(t.createdAt) < /* @__PURE__ */ new Date(Date.now() - parseInt(dateRange) * 864e5)) return false;
		if (statusFilter !== "all" && t.status !== statusFilter) return false;
		if (regionFilter !== "all" && getRegion(properties.find((p) => p.id === t.propertyId)?.address) !== regionFilter) return false;
		return true;
	}), [
		maintenanceTickets,
		properties,
		dateRange,
		statusFilter,
		regionFilter
	]);
	const { active, mostCommon, avg, byItem, byType, byRegion } = (0, import_react.useMemo)(() => {
		const active = filtered.filter((t) => t.status !== "Concluído").length;
		const itemCounts = filtered.reduce((acc, t) => ({
			...acc,
			[t.item]: (acc[t.item] || 0) + 1
		}), {});
		const mostCommon = Object.keys(itemCounts).sort((a, b) => itemCounts[b] - itemCounts[a])[0] || "N/A";
		const types = {};
		const regs = {};
		filtered.forEach((t) => {
			const p = properties.find((x) => x.id === t.propertyId);
			if (p) {
				types[p.type] = (types[p.type] || 0) + 1;
				const r = getRegion(p.address);
				regs[r] = (regs[r] || 0) + 1;
			}
		});
		return {
			active,
			mostCommon,
			avg: Math.max(1, Math.round(filtered.filter((t) => t.status === "Concluído").length / 3)),
			byItem: Object.entries(itemCounts).map(([name, value], i) => ({
				name,
				value,
				fill: `hsl(var(--chart-${i % 5 + 1}))`
			})),
			byType: Object.entries(types).map(([name, value], i) => ({
				name,
				value,
				fill: `hsl(var(--chart-${i === 0 ? 2 : 4}))`
			})),
			byRegion: Object.entries(regs).map(([name, value], i) => ({
				name,
				value,
				fill: `hsl(var(--chart-${i % 3 + 1}))`
			}))
		};
	}, [filtered, properties]);
	const exportCSV = () => {
		const headers = [
			"Call ID",
			"Property Name",
			"Region",
			"Damage Category",
			"Status",
			"Creation Date"
		];
		const rows = filtered.map((t) => {
			const p = properties.find((x) => x.id === t.propertyId);
			return [
				t.id,
				`"${p?.title || "N/A"}"`,
				`"${getRegion(p?.address)}"`,
				`"${t.item}"`,
				`"${t.status}"`,
				new Date(t.createdAt).toLocaleDateString("pt-BR")
			].join(",");
		});
		const blob = new Blob(["﻿" + [headers.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = `manutencao_export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
		link.click();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/MaintenanceAnalytics.tsx:137:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
				"data-uid": "src/components/MaintenanceAnalytics.tsx:138:7",
				"data-prohibitions": "[editContent]",
				children: `@media print { body * { visibility: hidden; } #print-area, #print-area * { visibility: visible; } #print-area { position: absolute; left: 0; top: 0; width: 100%; } .no-print { display: none !important; } }`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/MaintenanceAnalytics.tsx:140:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-between gap-4 bg-muted/30 p-4 rounded-lg border no-print",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/MaintenanceAnalytics.tsx:141:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/components/MaintenanceAnalytics.tsx:142:11",
							"data-prohibitions": "[]",
							value: dateRange,
							onValueChange: setDateRange,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:143:13",
								"data-prohibitions": "[]",
								className: "w-[140px] bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:144:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Período"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:146:13",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:147:15",
										"data-prohibitions": "[]",
										value: "all",
										children: "Todo o Período"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:148:15",
										"data-prohibitions": "[]",
										value: "30",
										children: "Últimos 30 Dias"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:149:15",
										"data-prohibitions": "[]",
										value: "60",
										children: "Últimos 60 Dias"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/components/MaintenanceAnalytics.tsx:152:11",
							"data-prohibitions": "[]",
							value: statusFilter,
							onValueChange: setStatusFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:153:13",
								"data-prohibitions": "[]",
								className: "w-[140px] bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:154:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Status"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:156:13",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:157:15",
										"data-prohibitions": "[]",
										value: "all",
										children: "Todos os Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:158:15",
										"data-prohibitions": "[]",
										value: "Pendente",
										children: "Pendente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:159:15",
										"data-prohibitions": "[]",
										value: "Em Andamento",
										children: "Em Andamento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:160:15",
										"data-prohibitions": "[]",
										value: "Concluído",
										children: "Concluído"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/components/MaintenanceAnalytics.tsx:163:11",
							"data-prohibitions": "[editContent]",
							value: regionFilter,
							onValueChange: setRegionFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:164:13",
								"data-prohibitions": "[]",
								className: "w-[140px] bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:165:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Região"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:167:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:168:15",
									"data-prohibitions": "[]",
									value: "all",
									children: "Todas Regiões"
								}), regions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:170:17",
									"data-prohibitions": "[editContent]",
									value: r,
									children: r
								}, r))]
							})]
						})
					]
				}), canExport && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
					"data-uid": "src/components/MaintenanceAnalytics.tsx:178:11",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						"data-uid": "src/components/MaintenanceAnalytics.tsx:179:13",
						"data-prohibitions": "[]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/MaintenanceAnalytics.tsx:180:15",
							"data-prohibitions": "[]",
							variant: "outline",
							className: "bg-background",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:181:17",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4"
							}), " Exportar"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						"data-uid": "src/components/MaintenanceAnalytics.tsx:184:13",
						"data-prohibitions": "[]",
						align: "end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-uid": "src/components/MaintenanceAnalytics.tsx:185:15",
							"data-prohibitions": "[]",
							onClick: () => window.print(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:186:17",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4"
							}), " Relatório PDF"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-uid": "src/components/MaintenanceAnalytics.tsx:188:15",
							"data-prohibitions": "[]",
							onClick: exportCSV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:189:17",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4"
							}), " Planilha (CSV)"]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/MaintenanceAnalytics.tsx:196:7",
				"data-prohibitions": "[editContent]",
				id: "print-area",
				className: "space-y-6 bg-background",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/MaintenanceAnalytics.tsx:197:9",
						"data-prohibitions": "[editContent]",
						className: "hidden print:block mb-6 pb-4 border-b",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:198:11",
								"data-prohibitions": "[]",
								className: "text-3xl font-bold tracking-tight",
								children: "ImobGED"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:199:11",
								"data-prohibitions": "[]",
								className: "text-xl text-muted-foreground mt-1",
								children: "Relatório de BI de Manutenção"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:200:11",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground mt-4",
								children: [
									"Gerado em: ",
									(/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR"),
									" | Filtros:",
									" ",
									dateRange === "all" ? "Todo período" : `${dateRange} dias`,
									" - ",
									statusFilter,
									" -",
									" ",
									regionFilter
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/MaintenanceAnalytics.tsx:207:9",
						"data-prohibitions": "[editContent]",
						className: "grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:208:11",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:209:13",
									"data-prohibitions": "[editContent]",
									className: "p-6 flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:210:15",
										"data-prohibitions": "[]",
										className: "bg-amber-100 p-3 rounded-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:211:17",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-6 text-amber-600"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:213:15",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:214:17",
											"data-prohibitions": "[]",
											className: "text-sm font-medium text-muted-foreground",
											children: "Chamados Ativos"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:215:17",
											"data-prohibitions": "[editContent]",
											className: "text-3xl font-bold",
											children: active
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:219:11",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:220:13",
									"data-prohibitions": "[editContent]",
									className: "p-6 flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:221:15",
										"data-prohibitions": "[]",
										className: "bg-destructive/10 p-3 rounded-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:222:17",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-6 text-destructive"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:224:15",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:225:17",
											"data-prohibitions": "[]",
											className: "text-sm font-medium text-muted-foreground",
											children: "Danos mais Comuns"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:226:17",
											"data-prohibitions": "[editContent]",
											className: "text-2xl font-bold",
											children: mostCommon
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:230:11",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:231:13",
									"data-prohibitions": "[editContent]",
									className: "p-6 flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:232:15",
										"data-prohibitions": "[]",
										className: "bg-primary/10 p-3 rounded-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:233:17",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-6 text-primary"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:235:15",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:236:17",
											"data-prohibitions": "[]",
											className: "text-sm font-medium text-muted-foreground",
											children: "Média Mensal"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:237:17",
											"data-prohibitions": "[editContent]",
											className: "text-3xl font-bold",
											children: avg
										})]
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/MaintenanceAnalytics.tsx:243:9",
						"data-prohibitions": "[editContent]",
						className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:244:11",
								"data-prohibitions": "[]",
								className: "lg:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:245:13",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:246:15",
										"data-prohibitions": "[]",
										children: "Danos Frequentes"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:248:13",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:249:15",
										"data-prohibitions": "[]",
										config: {},
										className: "h-[250px] w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:250:17",
											"data-prohibitions": "[]",
											data: byItem,
											margin: {
												top: 20,
												right: 0,
												left: -20,
												bottom: 0
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:251:19",
													"data-prohibitions": "[editContent]",
													vertical: false,
													strokeDasharray: "3 3"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:252:19",
													"data-prohibitions": "[editContent]",
													dataKey: "name",
													tickLine: false,
													axisLine: false,
													tickMargin: 10
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:253:19",
													"data-prohibitions": "[editContent]",
													tickLine: false,
													axisLine: false,
													tickMargin: 10
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:254:19",
													"data-prohibitions": "[editContent]",
													cursor: false,
													content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
														"data-uid": "src/components/MaintenanceAnalytics.tsx:254:57",
														"data-prohibitions": "[editContent]",
														hideLabel: true
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:255:19",
													"data-prohibitions": "[editContent]",
													dataKey: "value",
													radius: [
														4,
														4,
														0,
														0
													]
												})
											]
										})
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:260:11",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:261:13",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:262:15",
										"data-prohibitions": "[]",
										children: "Por Tipo"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:264:13",
									"data-prohibitions": "[editContent]",
									className: "flex justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:265:15",
										"data-prohibitions": "[editContent]",
										config: {},
										className: "aspect-square h-[250px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:266:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
												"data-uid": "src/components/MaintenanceAnalytics.tsx:267:19",
												"data-prohibitions": "[editContent]",
												cursor: false,
												content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:267:57",
													"data-prohibitions": "[editContent]",
													hideLabel: true
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
												"data-uid": "src/components/MaintenanceAnalytics.tsx:268:19",
												"data-prohibitions": "[editContent]",
												data: byType,
												dataKey: "value",
												nameKey: "name",
												innerRadius: 60,
												outerRadius: 80,
												strokeWidth: 2,
												stroke: "hsl(var(--background))",
												children: byType.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:278:23",
													"data-prohibitions": "[editContent]",
													fill: e.fill
												}, i))
											})]
										})
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/components/MaintenanceAnalytics.tsx:285:11",
								"data-prohibitions": "[]",
								className: "lg:col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:286:13",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:287:15",
										"data-prohibitions": "[]",
										children: "Por Região"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/components/MaintenanceAnalytics.tsx:289:13",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
										"data-uid": "src/components/MaintenanceAnalytics.tsx:290:15",
										"data-prohibitions": "[]",
										config: {},
										className: "h-[200px] w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
											"data-uid": "src/components/MaintenanceAnalytics.tsx:291:17",
											"data-prohibitions": "[]",
											data: byRegion,
											layout: "vertical",
											margin: {
												top: 0,
												right: 0,
												left: 20,
												bottom: 0
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:296:19",
													"data-prohibitions": "[editContent]",
													horizontal: false,
													strokeDasharray: "3 3"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:297:19",
													"data-prohibitions": "[editContent]",
													type: "number",
													tickLine: false,
													axisLine: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:298:19",
													"data-prohibitions": "[editContent]",
													type: "category",
													dataKey: "name",
													tickLine: false,
													axisLine: false,
													tickMargin: 10
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:305:19",
													"data-prohibitions": "[editContent]",
													cursor: false,
													content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
														"data-uid": "src/components/MaintenanceAnalytics.tsx:305:57",
														"data-prohibitions": "[editContent]",
														hideLabel: true
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
													"data-uid": "src/components/MaintenanceAnalytics.tsx:306:19",
													"data-prohibitions": "[editContent]",
													dataKey: "value",
													radius: [
														0,
														4,
														4,
														0
													],
													barSize: 32
												})
											]
										})
									})
								})]
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/Maintenance.tsx
function Maintenance() {
	const { maintenanceTickets } = useMainStore();
	const { user } = useAuth();
	const { toast } = useToast();
	const canViewAnalytics = user?.role === "Admin" || user?.role === "Gerente";
	const handleStatusChange = (id, newStatus) => {
		mainStore.updateMaintenanceStatus(id, newStatus);
		toast({
			title: "Status Atualizado",
			description: `O ticket foi movido para "${newStatus}".`
		});
		m365Service.syncToList("Tickets de Manutenção", `Ticket ${id} atualizado para ${newStatus}`);
	};
	const TicketView = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/Maintenance.tsx:29:5",
		"data-prohibitions": "[editContent]",
		className: "grid gap-4 md:grid-cols-3",
		children: [
			"Pendente",
			"Em Andamento",
			"Concluído"
		].map((status) => {
			const tickets = maintenanceTickets.filter((t) => t.status === status);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Maintenance.tsx:33:11",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					"data-uid": "src/pages/Maintenance.tsx:34:13",
					"data-prohibitions": "[editContent]",
					className: "font-semibold flex items-center gap-2",
					children: [
						status === "Pendente" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
							"data-uid": "src/pages/Maintenance.tsx:35:41",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-red-500"
						}),
						status === "Em Andamento" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							"data-uid": "src/pages/Maintenance.tsx:36:45",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-amber-500"
						}),
						status === "Concluído" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
							"data-uid": "src/pages/Maintenance.tsx:37:42",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-emerald-500"
						}),
						status,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							"data-uid": "src/pages/Maintenance.tsx:38:24",
							"data-prohibitions": "[editContent]",
							variant: "secondary",
							children: tickets.length
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Maintenance.tsx:41:13",
					"data-prohibitions": "[editContent]",
					className: "space-y-3",
					children: [tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Maintenance.tsx:43:17",
						"data-prohibitions": "[editContent]",
						className: "shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Maintenance.tsx:44:19",
							"data-prohibitions": "[editContent]",
							className: "p-4 pb-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Maintenance.tsx:45:21",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-uid": "src/pages/Maintenance.tsx:46:23",
										"data-prohibitions": "[editContent]",
										variant: "outline",
										className: "text-xs font-mono",
										children: t.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Maintenance.tsx:49:23",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground",
										children: new Date(t.createdAt).toLocaleDateString("pt-BR")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									"data-uid": "src/pages/Maintenance.tsx:53:21",
									"data-prohibitions": "[editContent]",
									className: "text-base mt-2",
									children: t.item
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									"data-uid": "src/pages/Maintenance.tsx:54:21",
									"data-prohibitions": "[editContent]",
									className: "line-clamp-1",
									children: t.address
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/Maintenance.tsx:56:19",
							"data-prohibitions": "[editContent]",
							className: "p-4 pt-0 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Maintenance.tsx:57:21",
									"data-prohibitions": "[editContent]",
									className: "text-sm bg-muted/50 p-3 rounded border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/Maintenance.tsx:58:23",
										"data-prohibitions": "[]",
										className: "font-medium text-xs text-muted-foreground mb-1",
										children: "Observações do Vistoriador:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/Maintenance.tsx:61:23",
										"data-prohibitions": "[editContent]",
										children: t.notes
									})]
								}),
								t.photo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Maintenance.tsx:65:23",
									"data-prohibitions": "[]",
									className: "w-full h-32 rounded-md overflow-hidden bg-muted relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										"data-uid": "src/pages/Maintenance.tsx:66:25",
										"data-prohibitions": "[editContent]",
										src: t.photo,
										alt: "Evidência",
										className: "w-full h-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/Maintenance.tsx:67:25",
										"data-prohibitions": "[]",
										className: "absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded",
										children: "Foto da Vistoria"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Maintenance.tsx:73:21",
									"data-prohibitions": "[editContent]",
									className: "flex gap-2 pt-2",
									children: [status === "Pendente" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/Maintenance.tsx:75:25",
										"data-prohibitions": "[]",
										size: "sm",
										className: "w-full",
										onClick: () => handleStatusChange(t.id, "Em Andamento"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {
											"data-uid": "src/pages/Maintenance.tsx:80:27",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}), " Iniciar Reparo"]
									}), status === "Em Andamento" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/Maintenance.tsx:84:25",
										"data-prohibitions": "[]",
										size: "sm",
										variant: "default",
										className: "w-full bg-emerald-600 hover:bg-emerald-700",
										onClick: () => handleStatusChange(t.id, "Concluído"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
											"data-uid": "src/pages/Maintenance.tsx:90:27",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}), " Concluir Reparo"]
									})]
								})
							]
						})]
					}, t.id)), tickets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Maintenance.tsx:98:17",
						"data-prohibitions": "[editContent]",
						className: "p-6 border-2 border-dashed rounded-lg text-center text-muted-foreground text-sm",
						children: [
							"Nenhum ticket ",
							status.toLowerCase(),
							"."
						]
					})]
				})]
			}, status);
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Maintenance.tsx:110:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Maintenance.tsx:111:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/Maintenance.tsx:112:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight",
				children: "Dashboard de Manutenção"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/Maintenance.tsx:113:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "Gerencie alertas de reparos gerados automaticamente pelas vistorias de campo e analise os indicadores."
			})]
		}), canViewAnalytics ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			"data-uid": "src/pages/Maintenance.tsx:120:9",
			"data-prohibitions": "[]",
			defaultValue: "tickets",
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					"data-uid": "src/pages/Maintenance.tsx:121:11",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/Maintenance.tsx:122:13",
						"data-prohibitions": "[]",
						value: "tickets",
						children: "Gestão de Chamados"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/Maintenance.tsx:123:13",
						"data-prohibitions": "[]",
						value: "analytics",
						children: "BI & Analytics"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Maintenance.tsx:125:11",
					"data-prohibitions": "[]",
					value: "tickets",
					className: "mt-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketView, {
						"data-uid": "src/pages/Maintenance.tsx:126:13",
						"data-prohibitions": "[editContent]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Maintenance.tsx:128:11",
					"data-prohibitions": "[]",
					value: "analytics",
					className: "mt-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaintenanceAnalytics, {
						"data-uid": "src/pages/Maintenance.tsx:129:13",
						"data-prohibitions": "[editContent]"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketView, {
			"data-uid": "src/pages/Maintenance.tsx:133:9",
			"data-prohibitions": "[editContent]"
		})]
	});
}
//#endregion
export { Maintenance as default };

//# sourceMappingURL=Maintenance-BHmj_1yG.js.map