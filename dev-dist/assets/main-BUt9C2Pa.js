import { a as __toESM, n as require_react } from "./jsx-runtime-CvuQPfAM.js";
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
var STORAGE_KEY = "@imobged/config_v1";
var loadState = () => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			return {
				...defaultState,
				...parsed
			};
		}
	} catch (e) {
		console.warn("Failed to load state from localStorage", e);
	}
	return defaultState;
};
var state = loadState();
var listeners = [];
var emit = () => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			agencyProfile: state.agencyProfile,
			settings: state.settings,
			sharepoint: state.sharepoint,
			security: state.security
		}));
	} catch (e) {
		console.warn("Failed to persist state", e);
	}
	listeners.forEach((l) => l());
};
var mainStore = {
	getState: () => state,
	subscribe: (l) => {
		listeners.push(l);
		return () => {
			listeners = listeners.filter((fn) => fn !== l);
		};
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
export { mainStore as n, useMainStore as r, isSlaBreached as t };

//# sourceMappingURL=main-BUt9C2Pa.js.map