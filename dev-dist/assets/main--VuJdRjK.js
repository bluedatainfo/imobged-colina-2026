import { a as __toESM, n as require_react } from "./jsx-runtime-CvuQPfAM.js";
//#region src/lib/supabase.ts
var SUPABASE_URL = "";
var SUPABASE_ANON_KEY = "";
function getLocal(table) {
	const data = localStorage.getItem(`@sb_${table}`);
	return data ? JSON.parse(data) : [];
}
function setLocal(table, data) {
	localStorage.setItem(`@sb_${table}`, JSON.stringify(data));
}
var supabase = {
	async get(table) {
		return getLocal(table);
	},
	async post(table, data) {
		{
			const items = getLocal(table);
			items.push(data);
			setLocal(table, items);
			return data;
		}
		try {
			const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
				method: "POST",
				headers: {
					apikey: SUPABASE_ANON_KEY,
					Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
					"Content-Type": "application/json",
					Prefer: "return=representation"
				},
				body: JSON.stringify(data)
			});
			if (res.ok) {
				const json = await res.json();
				return Array.isArray(json) ? json[0] : json;
			}
		} catch (e) {
			console.error(`Supabase POST Error (${table}):`, e);
		}
		return data;
	},
	async patch(table, id, data, idField = "id") {
		{
			const items = getLocal(table);
			const idx = items.findIndex((i) => i[idField] === id);
			if (idx >= 0) {
				items[idx] = {
					...items[idx],
					...data
				};
				setLocal(table, items);
				return items[idx];
			}
			return data;
		}
		try {
			const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${idField}=eq.${id}`, {
				method: "PATCH",
				headers: {
					apikey: SUPABASE_ANON_KEY,
					Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
					"Content-Type": "application/json",
					Prefer: "return=representation"
				},
				body: JSON.stringify(data)
			});
			if (res.ok) {
				const json = await res.json();
				return Array.isArray(json) ? json[0] : json;
			}
		} catch (e) {
			console.error(`Supabase PATCH Error (${table}):`, e);
		}
		return data;
	},
	async delete(table, id, idField = "id") {
		setLocal(table, getLocal(table).filter((i) => i[idField] !== id));
	},
	async upsert(table, data, idField = "id") {
		{
			const items = getLocal(table);
			const dynamicIdField = data.id ? "id" : data.propertyId ? "propertyId" : idField;
			const idx = items.findIndex((i) => i[dynamicIdField] === data[dynamicIdField]);
			if (idx >= 0) items[idx] = {
				...items[idx],
				...data
			};
			else items.push(data);
			setLocal(table, items);
			return data;
		}
		try {
			const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
				method: "POST",
				headers: {
					apikey: SUPABASE_ANON_KEY,
					Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
					"Content-Type": "application/json",
					Prefer: "resolution=merge-duplicates,return=representation"
				},
				body: JSON.stringify(data)
			});
			if (res.ok) {
				const json = await res.json();
				return Array.isArray(json) ? json[0] : json;
			}
		} catch (e) {
			console.error(`Supabase UPSERT Error (${table}):`, e);
		}
		return data;
	}
};
//#endregion
//#region src/stores/main.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var defaultState = {
	agencyProfile: {
		name: "Imobiliária Prime",
		address: "Av. Paulista, 1000 - São Paulo, SP",
		website: "https://imobiliariaprime.com.br",
		logo: "https://img.usecurling.com/i?q=building&shape=lineal-color&color=blue",
		primaryColor: "#0f172a"
	},
	settings: {
		managementEmails: "gerencia@ismailabdo.onmicrosoft.com",
		administrativeEmails: "admin@ismailabdo.onmicrosoft.com",
		operationalEmails: "operacao@ismailabdo.onmicrosoft.com",
		slaHours: 24
	},
	sharepoint: {
		primaryDomain: "ismailabdo.onmicrosoft.com",
		sharepointDomain: "ismailabdo.sharepoint.com",
		tenantName: "Ismail Abdo Corp",
		teamsWebhookUrl: "https://ismailabdo.onmicrosoft.com.webhook.office.com/teams/alertas-gerais",
		clientId: "",
		tenantId: "",
		sites: {
			locacao: "https://ismailabdo.sharepoint.com/sites/locacao",
			captacao: "https://ismailabdo.sharepoint.com/sites/captacao",
			vendas: "https://ismailabdo.sharepoint.com/sites/vendas",
			juridico: "https://ismailabdo.sharepoint.com/sites/juridico",
			financeiro: "https://ismailabdo.sharepoint.com/sites/financeiro"
		},
		libraries: {
			contracts: "Contratos",
			ownerDocs: "Doc Proprietários",
			tenantDocs: "Doc Inquilinos",
			archive: "Arquivo Permanente",
			templates: "Modelos de Contrato"
		},
		lists: {
			processControl: "Dados Contratuais",
			auditLog: "Audit Log"
		}
	},
	security: {
		restrictDomain: true,
		allowedIps: "",
		requireManagedDevice: false
	},
	properties: [
		{
			id: "101",
			title: "Apto Centro",
			address: "Rua Flores, 123",
			type: "Residencial",
			status: "Análise Gerencial",
			image: "https://img.usecurling.com/p/400/300?q=apartment",
			tenant: "João Pedro",
			rentValue: 2500,
			location: {
				x: 30,
				y: 40
			}
		},
		{
			id: "102",
			title: "Casa Vila Nova",
			address: "Rua das Margaridas, 88",
			type: "Residencial",
			status: "Vistoria",
			image: "https://img.usecurling.com/p/400/300?q=house",
			tenant: "Carlos Silva",
			location: {
				x: 55,
				y: 65
			},
			slaStart: (/* @__PURE__ */ new Date(Date.now() - 2880 * 60 * 1e3)).toISOString()
		},
		{
			id: "103",
			title: "Casa Jardim",
			address: "Rua dos Ipês, 45",
			type: "Residencial",
			status: "Confecção de Contrato",
			image: "https://img.usecurling.com/p/400/300?q=house+modern",
			tenant: "Maria Souza",
			rentValue: 3200,
			location: {
				x: 75,
				y: 25
			}
		}
	],
	auditLogs: [{
		id: "log1",
		propertyId: "101",
		action: "Upload SP (Contrato_Locacao.pdf)",
		user: "Admin Sistema",
		userEmail: "admin@ismailabdo.onmicrosoft.com",
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		ipAddress: "192.168.0.10"
	}],
	inspectionsData: {},
	maintenanceTickets: []
};
var state = { ...defaultState };
var listeners = [];
var initMainStore = async () => {
	const configs = await supabase.get("app_config");
	let configData = Array.isArray(configs) ? configs.find((c) => c.id === "default") : null;
	const coreConfigs = await supabase.get("system_core_config");
	const coreData = Array.isArray(coreConfigs) ? coreConfigs.find((c) => c.id === "core") : null;
	if (!configData) {
		configData = {
			id: "default",
			agencyProfile: defaultState.agencyProfile,
			settings: defaultState.settings,
			sharepoint: defaultState.sharepoint,
			security: defaultState.security
		};
		await supabase.upsert("app_config", configData);
	}
	if (coreData) {
		const baseSharepoint = configData.sharepoint || defaultState.sharepoint;
		configData.sharepoint = {
			...baseSharepoint,
			primaryDomain: coreData.primaryDomain || baseSharepoint.primaryDomain,
			clientId: coreData.clientId || baseSharepoint.clientId,
			tenantId: coreData.tenantId || baseSharepoint.tenantId
		};
	}
	const properties = await supabase.get("app_properties");
	const auditLogs = await supabase.get("app_audit_logs");
	const inspections = await supabase.get("app_inspections");
	const maintenanceTickets = await supabase.get("app_maintenance");
	const inspectionsData = Array.isArray(inspections) ? inspections.reduce((acc, val) => {
		acc[val.propertyId] = val;
		return acc;
	}, {}) : {};
	state = {
		...state,
		agencyProfile: configData.agencyProfile || defaultState.agencyProfile,
		settings: configData.settings || defaultState.settings,
		sharepoint: configData.sharepoint || defaultState.sharepoint,
		security: configData.security || defaultState.security,
		properties: Array.isArray(properties) && properties.length ? properties : defaultState.properties,
		auditLogs: Array.isArray(auditLogs) && auditLogs.length ? auditLogs : defaultState.auditLogs,
		inspectionsData: Object.keys(inspectionsData).length ? inspectionsData : defaultState.inspectionsData,
		maintenanceTickets: Array.isArray(maintenanceTickets) && maintenanceTickets.length ? maintenanceTickets : defaultState.maintenanceTickets
	};
	if (!Array.isArray(properties) || !properties.length) for (const p of defaultState.properties) await supabase.upsert("app_properties", p);
	if (!Array.isArray(auditLogs) || !auditLogs.length) for (const a of defaultState.auditLogs) await supabase.upsert("app_audit_logs", a);
	emit();
};
var emit = () => {
	listeners.forEach((l) => l());
};
var syncConfig = () => {
	supabase.upsert("app_config", {
		id: "default",
		agencyProfile: state.agencyProfile,
		settings: state.settings,
		sharepoint: state.sharepoint,
		security: state.security
	});
	supabase.upsert("system_core_config", {
		id: "core",
		primaryDomain: state.sharepoint.primaryDomain,
		clientId: state.sharepoint.clientId,
		tenantId: state.sharepoint.tenantId
	});
};
var mainStore = {
	getState: () => state,
	subscribe: (l) => {
		listeners.push(l);
		return () => {
			listeners = listeners.filter((fn) => fn !== l);
		};
	},
	reloadCoreConfig: async () => {
		try {
			const coreConfigs = await supabase.get("system_core_config");
			const coreData = Array.isArray(coreConfigs) ? coreConfigs.find((c) => c.id === "core") : null;
			if (coreData && (coreData.primaryDomain || coreData.clientId || coreData.tenantId)) {
				state = {
					...state,
					sharepoint: {
						...state.sharepoint,
						primaryDomain: coreData.primaryDomain || state.sharepoint.primaryDomain,
						clientId: coreData.clientId || state.sharepoint.clientId,
						tenantId: coreData.tenantId || state.sharepoint.tenantId
					}
				};
				emit();
			}
		} catch (e) {
			console.error("Failed to reload core config", e);
		}
	},
	updateAgencyProfile: (s) => {
		state = {
			...state,
			agencyProfile: {
				...state.agencyProfile,
				...s
			}
		};
		emit();
		syncConfig();
	},
	updateSettings: (s) => {
		state = {
			...state,
			settings: {
				...state.settings,
				...s
			}
		};
		emit();
		syncConfig();
	},
	updateSharePointSettings: (s) => {
		state = {
			...state,
			sharepoint: {
				...state.sharepoint,
				...s
			}
		};
		emit();
		syncConfig();
	},
	updateSecuritySettings: (s) => {
		state = {
			...state,
			security: {
				...state.security,
				...s
			}
		};
		emit();
		syncConfig();
	},
	addAuditLog: (log) => {
		const newLog = {
			...log,
			id: Math.random().toString(36).substring(2, 9),
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		};
		state = {
			...state,
			auditLogs: [newLog, ...state.auditLogs]
		};
		emit();
		supabase.upsert("app_audit_logs", newLog);
	},
	updatePropertyStatus: (id, status) => {
		state = {
			...state,
			properties: state.properties.map((p) => p.id === id ? {
				...p,
				status
			} : p)
		};
		emit();
		supabase.patch("app_properties", id, { status });
	},
	saveInspection: (data) => {
		state = {
			...state,
			inspectionsData: {
				...state.inspectionsData,
				[data.propertyId]: data
			}
		};
		emit();
		supabase.upsert("app_inspections", data, "propertyId");
	},
	updateMaintenanceStatus: (id, status) => {
		state = {
			...state,
			maintenanceTickets: state.maintenanceTickets.map((t) => t.id === id ? {
				...t,
				status
			} : t)
		};
		emit();
		supabase.patch("app_maintenance", id, { status });
	}
};
function useMainStore() {
	return (0, import_react.useSyncExternalStore)(mainStore.subscribe, mainStore.getState);
}
var isSlaBreached = (slaStart, slaHours) => {
	if (!slaStart) return false;
	return (Date.now() - new Date(slaStart).getTime()) / (1e3 * 60 * 60) > slaHours;
};
//#endregion
export { supabase as a, useMainStore as i, isSlaBreached as n, mainStore as r, initMainStore as t };

//# sourceMappingURL=main--VuJdRjK.js.map