const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/GeneralSettings-BkAfvlEj.js","assets/jsx-runtime-CvuQPfAM.js","assets/index-Dvtqt9_G.js","assets/preload-helper-t9NyTnoX.js","assets/dist-CSD1vGvq.js","assets/dist-BGx1w-XJ.js","assets/dist-CaNjJkGJ.js","assets/react-dom-cDMCl7Pc.js","assets/dist-LrkfuM3C.js","assets/dist-OgQs0lPC.js","assets/dist-Co7_XHbW.js","assets/es2015-BRJ07l_H.js","assets/dist-DN1Vl0sN2.js","assets/button-VYS3F0Ax.js","assets/utils-BWe8iKtn.js","assets/check-B70RWu1J.js","assets/use-toast-cNG4ZhbD.js","assets/main-BUt9C2Pa.js","assets/users-CbLRb6qo.js","assets/index-DDfg0OFT.css","assets/label-DLT9cpef.js","assets/circle-alert-8goyGxEJ.js","assets/save-By7WBnK6.js","assets/card-DrsxtI78.js","assets/SharePointSettings-CMieogTD.js","assets/circle-check-NZt6FDU9.js","assets/refresh-cw-C_A3pSX6.js","assets/server-ChIzJ_DR.js","assets/shield-check-LZ2TnTTz.js","assets/AgencySettings-C77TebXO.js","assets/building-2-Bx0EOets.js","assets/external-link-BNOgDA-G.js","assets/map-pin-CKE3Iopz.js","assets/PermissionsSettings-hNDg61O0.js","assets/select-BEunvwAW.js","assets/dist-BHrhlX8d.js","assets/shield-CydNfuYl.js","assets/dialog-PgonBY07.js","assets/table-CTOg9zOn.js","assets/SecuritySettings-odF0qxpm.js","assets/switch-CP6TVbC5.js"])))=>i.map(i=>d[i]);
import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CvuQPfAM.js";
import "./react-dom-cDMCl7Pc.js";
import { t as __vitePreload } from "./preload-helper-t9NyTnoX.js";
import { z as LoaderCircle } from "./index-Dvtqt9_G.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CZ5QKhds.js";
//#region src/pages/Settings.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var GeneralSettings = (0, import_react.lazy)(() => __vitePreload(() => import("./GeneralSettings-BkAfvlEj.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23])));
var SharePointSettings = (0, import_react.lazy)(() => __vitePreload(() => import("./SharePointSettings-CMieogTD.js"), __vite__mapDeps([24,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,25,26,22,27,28,23])));
var AgencySettings = (0, import_react.lazy)(() => __vitePreload(() => import("./AgencySettings-C77TebXO.js"), __vite__mapDeps([29,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,30,31,32,22,23])));
var PermissionsSettings = (0, import_react.lazy)(() => __vitePreload(() => import("./PermissionsSettings-hNDg61O0.js"), __vite__mapDeps([33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,34,35,20,21,25,26,36,23,37,38])));
var SecuritySettings = (0, import_react.lazy)(() => __vitePreload(() => import("./SecuritySettings-odF0qxpm.js"), __vite__mapDeps([39,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,40,35,36,23,38])));
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

//# sourceMappingURL=Settings-Db-tHCku.js.map