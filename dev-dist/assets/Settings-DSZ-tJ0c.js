const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/GeneralSettings-BbXrKFGr.js","assets/jsx-runtime-CvuQPfAM.js","assets/index-STPRiFnW.js","assets/preload-helper-t9NyTnoX.js","assets/dist-DNtRJpA-.js","assets/dist-DoWbCSlZ.js","assets/dist-CaNjJkGJ.js","assets/dist-4TD8D2sP.js","assets/react-dom-cDMCl7Pc.js","assets/dist-sCamKOPo.js","assets/dist-bzAD93B32.js","assets/dist-DvPO34uh.js","assets/es2015-CZsrFLgL.js","assets/main-BrkNkJx4.js","assets/dist-A1GJe8PL.js","assets/dist-CS2ZcCJV.js","assets/button-ChEhZCqG.js","assets/utils-Di8JFY1h.js","assets/check-D787r897.js","assets/use-toast-cNG4ZhbD.js","assets/contracts-BH_czXI9.js","assets/keys-YFLQVpI3.js","assets/users-CCY6TCve.js","assets/index-D_KV1m-0.css","assets/label-UDC1Ii_9.js","assets/circle-alert-C8tsZoG_.js","assets/save-BWoO2H7u.js","assets/card-BwW9Ii_l.js","assets/SharePointSettings-DLDPEBad.js","assets/circle-check-Dw62k5Pj.js","assets/refresh-cw-CANleLd3.js","assets/server-BjCzg_iy.js","assets/shield-check-DqITVXmc.js","assets/AgencySettings-G83AvBp1.js","assets/building-2-iFJZP_7W.js","assets/external-link-Ce4nDXSI.js","assets/map-pin-CqrDtW31.js","assets/PermissionsSettings-BV02QHMx.js","assets/select-COmvRpXh.js","assets/dist-C0sIfywZ.js","assets/shield-B6XcFj_a.js","assets/trash-2-CAO729-f.js","assets/dialog-AcOoqpEB.js","assets/table-BoqU0w0f.js","assets/SecuritySettings-jk8kZC3T.js","assets/switch-shckS4LG.js"])))=>i.map(i=>d[i]);
import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CvuQPfAM.js";
import "./react-dom-cDMCl7Pc.js";
import { t as __vitePreload } from "./preload-helper-t9NyTnoX.js";
import { V as LoaderCircle } from "./index-STPRiFnW.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-B2jsR069.js";
//#region src/pages/Settings.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var GeneralSettings = (0, import_react.lazy)(() => __vitePreload(() => import("./GeneralSettings-BbXrKFGr.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27])));
var SharePointSettings = (0, import_react.lazy)(() => __vitePreload(() => import("./SharePointSettings-DLDPEBad.js"), __vite__mapDeps([28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,29,30,26,31,32,27])));
var AgencySettings = (0, import_react.lazy)(() => __vitePreload(() => import("./AgencySettings-G83AvBp1.js"), __vite__mapDeps([33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,34,35,36,26,27])));
var PermissionsSettings = (0, import_react.lazy)(() => __vitePreload(() => import("./PermissionsSettings-BV02QHMx.js"), __vite__mapDeps([37,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,38,39,24,25,29,30,40,41,27,42,43])));
var SecuritySettings = (0, import_react.lazy)(() => __vitePreload(() => import("./SecuritySettings-jk8kZC3T.js"), __vite__mapDeps([44,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,45,39,40,27,43])));
var SettingsFallback = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/pages/Settings.tsx:13:3",
	"data-prohibitions": "[]",
	className: "flex h-32 w-full items-center justify-center",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		"data-uid": "src/pages/Settings.tsx:14:5",
		"data-prohibitions": "[editContent]",
		className: "h-6 w-6 animate-spin text-primary"
	})
});
var Settings = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Settings.tsx:20:5",
		"data-prohibitions": "[]",
		className: "space-y-6 max-w-5xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Settings.tsx:21:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/Settings.tsx:22:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight",
				children: "Configurações do Sistema"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/Settings.tsx:23:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "Gerencie o perfil da imobiliária, acessos, integrações Microsoft 365 e segurança."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			"data-uid": "src/pages/Settings.tsx:28:7",
			"data-prohibitions": "[]",
			defaultValue: "permissions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				"data-uid": "src/pages/Settings.tsx:29:9",
				"data-prohibitions": "[]",
				className: "mb-4 bg-muted/50 border flex flex-wrap h-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/Settings.tsx:30:11",
						"data-prohibitions": "[]",
						value: "permissions",
						children: "Permissões de Acesso"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/Settings.tsx:31:11",
						"data-prohibitions": "[]",
						value: "security",
						children: "Segurança & Auditoria"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/Settings.tsx:32:11",
						"data-prohibitions": "[]",
						value: "sharepoint",
						children: "Integração SharePoint"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/Settings.tsx:33:11",
						"data-prohibitions": "[]",
						value: "agency",
						children: "Dados da Imobiliária"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/Settings.tsx:34:11",
						"data-prohibitions": "[]",
						value: "general",
						children: "Geral & SLA"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Suspense, {
				"data-uid": "src/pages/Settings.tsx:36:9",
				"data-prohibitions": "[]",
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsFallback, {
					"data-uid": "src/pages/Settings.tsx:36:29",
					"data-prohibitions": "[editContent]"
				}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/Settings.tsx:37:11",
						"data-prohibitions": "[]",
						value: "permissions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionsSettings, {
							"data-uid": "src/pages/Settings.tsx:38:13",
							"data-prohibitions": "[editContent]"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/Settings.tsx:40:11",
						"data-prohibitions": "[]",
						value: "security",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecuritySettings, {
							"data-uid": "src/pages/Settings.tsx:41:13",
							"data-prohibitions": "[editContent]"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/Settings.tsx:43:11",
						"data-prohibitions": "[]",
						value: "sharepoint",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharePointSettings, {
							"data-uid": "src/pages/Settings.tsx:44:13",
							"data-prohibitions": "[editContent]"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/Settings.tsx:46:11",
						"data-prohibitions": "[]",
						value: "agency",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgencySettings, {
							"data-uid": "src/pages/Settings.tsx:47:13",
							"data-prohibitions": "[editContent]"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/Settings.tsx:49:11",
						"data-prohibitions": "[]",
						value: "general",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GeneralSettings, {
							"data-uid": "src/pages/Settings.tsx:50:13",
							"data-prohibitions": "[editContent]"
						})
					})
				]
			})]
		})]
	});
};
//#endregion
export { Settings as default };

//# sourceMappingURL=Settings-DSZ-tJ0c.js.map