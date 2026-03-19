const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/m365-D0hXXs97.js","assets/react-CaAsmmmw.js","assets/client-CX_7U15l.js","assets/use-toast-DzvQdsOw.js"])))=>i.map(i=>d[i]);
import { i as __toESM, t as require_react } from "./react-CaAsmmmw.js";
import { t as __vitePreload } from "./preload-helper-t9NyTnoX.js";
import { t as supabase } from "./client-CX_7U15l.js";
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
		slaHours: 24,
		spIntegrationRoles: [
			"Admin",
			"Diretor",
			"Gerente",
			"Vistoriador",
			"Jurídico",
			"Financeiro",
			"Gestor de Contrato",
			"Corretor"
		],
		rbac: {
			Admin: ["all"],
			Diretor: ["all"],
			Gerente: [
				"/",
				"/entities",
				"/documents",
				"/document-alerts",
				"/sync-monitor",
				"/manager-approval",
				"/inspections",
				"/keys",
				"/contracts",
				"/properties",
				"/maintenance",
				"/renewals",
				"/legal",
				"/profile"
			],
			Vistoriador: [
				"/",
				"/properties",
				"/inspections",
				"/keys",
				"/profile"
			],
			Jurídico: [
				"/",
				"/documents",
				"/document-alerts",
				"/contracts",
				"/properties",
				"/legal",
				"/profile"
			],
			Financeiro: [
				"/",
				"/entities",
				"/documents",
				"/document-alerts",
				"/properties",
				"/renewals",
				"/maintenance",
				"/profile"
			],
			"Gestor de Contrato": [
				"/",
				"/manager-approval",
				"/contracts",
				"/documents",
				"/document-alerts",
				"/properties",
				"/inspections",
				"/renewals",
				"/keys",
				"/entities",
				"/profile"
			],
			Corretor: [
				"/",
				"/properties",
				"/profile"
			]
		}
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
	properties: [],
	auditLogs: [],
	inspectionsData: {},
	maintenanceTickets: []
};
var state = { ...defaultState };
var listeners = [];
var settingsId = null;
var initMainStore = async () => {
	const { data: settingsData } = await supabase.from("app_settings").select("*").order("updated_at", { ascending: false }).limit(1).maybeSingle();
	if (settingsData) {
		settingsId = settingsData.id;
		const ap = settingsData.agency_profile || {};
		state.sharepoint = {
			primaryDomain: settingsData.default_domain || "",
			sharepointDomain: ap.sharepointDomain || "",
			tenantName: ap.tenantName || "",
			teamsWebhookUrl: ap.teamsWebhookUrl || "",
			clientId: settingsData.client_id || "",
			tenantId: settingsData.tenant_id || "",
			sites: ap.sites || defaultState.sharepoint.sites,
			libraries: ap.libraries || defaultState.sharepoint.libraries,
			lists: ap.lists || defaultState.sharepoint.lists
		};
		state.agencyProfile = ap.agencyProfile || defaultState.agencyProfile;
		state.settings = {
			...defaultState.settings,
			...settingsData.role_settings,
			rbac: settingsData.role_settings?.rbac || defaultState.settings.rbac
		};
		state.security = settingsData.security_settings || defaultState.security;
	} else {
		const { data: sessionData } = await supabase.auth.getSession();
		if (sessionData?.session?.user) {
			const payload = {
				default_domain: state.sharepoint.primaryDomain,
				client_id: state.sharepoint.clientId,
				tenant_id: state.sharepoint.tenantId,
				agency_profile: {
					agencyProfile: state.agencyProfile,
					sharepointDomain: state.sharepoint.sharepointDomain,
					tenantName: state.sharepoint.tenantName,
					teamsWebhookUrl: state.sharepoint.teamsWebhookUrl,
					sites: state.sharepoint.sites,
					libraries: state.sharepoint.libraries,
					lists: state.sharepoint.lists
				},
				role_settings: state.settings,
				security_settings: state.security
			};
			const { data } = await supabase.from("app_settings").insert(payload).select("id").single();
			if (data) settingsId = data.id;
		}
	}
	const { data: properties } = await supabase.from("properties").select("*");
	if (properties && properties.length > 0) state.properties = properties.map((p) => ({
		id: p.id,
		title: p.title,
		address: p.address,
		type: p.type,
		status: p.status,
		image: p.image || "",
		slaStart: p.sla_start || void 0,
		tenant: p.tenant || void 0,
		rentValue: p.rent_value ? Number(p.rent_value) : void 0,
		location: p.location_x && p.location_y ? {
			x: Number(p.location_x),
			y: Number(p.location_y)
		} : void 0
	}));
	const { data: auditLogs } = await supabase.from("app_audit_logs").select("*").order("timestamp", { ascending: false });
	if (auditLogs && auditLogs.length > 0) state.auditLogs = auditLogs.map((a) => ({
		id: a.id,
		propertyId: a.property_id || void 0,
		action: a.action || "",
		user: a.user_name || "",
		userEmail: a.user_email || void 0,
		timestamp: a.timestamp || (/* @__PURE__ */ new Date()).toISOString(),
		details: a.details || void 0,
		ipAddress: a.ip_address || void 0
	}));
	const { data: inspections } = await supabase.from("inspections").select("*");
	if (inspections && inspections.length > 0) state.inspectionsData = inspections.reduce((acc, val) => {
		acc[val.property_id] = {
			propertyId: val.property_id,
			wallCondition: val.wall_condition || "",
			furnitureNotes: val.furniture_notes || "",
			generalNotes: val.general_notes || ""
		};
		return acc;
	}, {});
	const { data: maintenance } = await supabase.from("maintenance").select("*");
	if (maintenance && maintenance.length > 0) state.maintenanceTickets = maintenance.map((m) => ({
		id: m.id,
		propertyId: m.property_id || "",
		address: m.address || "",
		item: m.item || "",
		notes: m.notes || "",
		photo: m.photo,
		status: m.status,
		createdAt: m.created_at || (/* @__PURE__ */ new Date()).toISOString()
	}));
	emit();
};
var emit = () => {
	listeners.forEach((l) => l());
};
var syncConfig = async () => {
	const { data: sessionData } = await supabase.auth.getSession();
	if (!sessionData?.session?.user) return;
	const payload = {
		default_domain: state.sharepoint.primaryDomain,
		client_id: state.sharepoint.clientId,
		tenant_id: state.sharepoint.tenantId,
		agency_profile: {
			agencyProfile: state.agencyProfile,
			sharepointDomain: state.sharepoint.sharepointDomain,
			tenantName: state.sharepoint.tenantName,
			teamsWebhookUrl: state.sharepoint.teamsWebhookUrl,
			sites: state.sharepoint.sites,
			libraries: state.sharepoint.libraries,
			lists: state.sharepoint.lists
		},
		role_settings: state.settings,
		security_settings: state.security,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	if (settingsId) await supabase.from("app_settings").update(payload).eq("id", settingsId);
	else {
		const { data: existing } = await supabase.from("app_settings").select("id").order("updated_at", { ascending: false }).limit(1).maybeSingle();
		if (existing) {
			settingsId = existing.id;
			await supabase.from("app_settings").update(payload).eq("id", settingsId);
		} else {
			const { data } = await supabase.from("app_settings").insert(payload).select("id").single();
			if (data) settingsId = data.id;
		}
	}
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
			const { data: coreData } = await supabase.from("app_settings").select("*").order("updated_at", { ascending: false }).limit(1).maybeSingle();
			if (coreData && (coreData.default_domain || coreData.client_id || coreData.tenant_id)) {
				state = {
					...state,
					sharepoint: {
						...state.sharepoint,
						primaryDomain: coreData.default_domain || state.sharepoint.primaryDomain,
						clientId: coreData.client_id || state.sharepoint.clientId,
						tenantId: coreData.tenant_id || state.sharepoint.tenantId
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
	hydrateSharePointSettings: (s) => {
		state = {
			...state,
			sharepoint: {
				...state.sharepoint,
				...s
			}
		};
		emit();
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
	addProperty: (p) => {
		const newProperty = {
			...p,
			id: `PROP-${Math.floor(Math.random() * 1e3).toString().padStart(3, "0")}`,
			status: "Pendente/Rascunho",
			image: "https://img.usecurling.com/p/400/300?q=house"
		};
		state = {
			...state,
			properties: [newProperty, ...state.properties]
		};
		emit();
		supabase.from("properties").insert({
			id: newProperty.id,
			title: newProperty.title,
			address: newProperty.address,
			type: newProperty.type,
			status: newProperty.status,
			image: newProperty.image,
			rent_value: newProperty.rentValue,
			location_x: newProperty.location?.x,
			location_y: newProperty.location?.y,
			tenant: newProperty.tenant,
			sla_start: newProperty.slaStart
		}).then();
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
		supabase.from("properties").update({ status }).eq("id", id).then();
	},
	addAuditLog: (log) => {
		const newLog = {
			...log,
			id: `LOG-${Math.random().toString(36).substring(2, 9)}`,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		};
		state = {
			...state,
			auditLogs: [newLog, ...state.auditLogs]
		};
		emit();
		supabase.from("app_audit_logs").insert({
			id: newLog.id,
			property_id: newLog.propertyId,
			action: newLog.action,
			user_name: newLog.user,
			user_email: newLog.userEmail,
			timestamp: newLog.timestamp,
			details: newLog.details,
			ip_address: newLog.ipAddress
		}).then();
	},
	saveInspection: (data) => {
		const isNew = !state.inspectionsData[data.propertyId];
		state = {
			...state,
			inspectionsData: {
				...state.inspectionsData,
				[data.propertyId]: data
			}
		};
		emit();
		supabase.from("inspections").upsert({
			property_id: data.propertyId,
			wall_condition: data.wallCondition,
			furniture_notes: data.furnitureNotes,
			general_notes: data.generalNotes,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).then();
		const prop = state.properties.find((p) => p.id === data.propertyId);
		__vitePreload(async () => {
			const { m365Service } = await import("./m365-D0hXXs97.js");
			return { m365Service };
		}, __vite__mapDeps([0,1,2,3])).then(({ m365Service }) => {
			m365Service.sendTeamsMessage(state.sharepoint.teamsWebhookUrl, `Vistoria ${isNew ? "Registrada" : "Concluída"} para o imóvel: ${prop?.title || data.propertyId}. Verifique no sistema: /properties/${data.propertyId}/dossier`);
		});
	},
	addMaintenanceTicket: (ticket) => {
		const newTicket = {
			...ticket,
			id: `TKT-${Math.floor(Math.random() * 1e3).toString().padStart(3, "0")}`,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		state = {
			...state,
			maintenanceTickets: [newTicket, ...state.maintenanceTickets]
		};
		emit();
		supabase.from("maintenance").insert({
			id: newTicket.id,
			property_id: newTicket.propertyId,
			address: newTicket.address,
			item: newTicket.item,
			notes: newTicket.notes,
			photo: newTicket.photo,
			status: newTicket.status,
			created_at: newTicket.createdAt
		}).then();
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
		supabase.from("maintenance").update({ status }).eq("id", id).then();
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
export { useMainStore as i, isSlaBreached as n, mainStore as r, initMainStore as t };

//# sourceMappingURL=main-CDM8pvrG.js.map