import { a as __toESM, n as require_react } from "./jsx-runtime-CvuQPfAM.js";
//#region src/stores/users.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var STORAGE_KEY = "@imobged/users_v1";
var loadState = () => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) return JSON.parse(stored);
	} catch (e) {
		console.warn("Failed to load users from localStorage", e);
	}
	return { users: [] };
};
var state = loadState();
var listeners = [];
var emit = () => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch (e) {
		console.warn("Failed to persist users state", e);
	}
	listeners.forEach((l) => l());
};
var usersStore = {
	getState: () => state,
	subscribe: (l) => {
		listeners.push(l);
		return () => {
			listeners = listeners.filter((fn) => fn !== l);
		};
	},
	updateUserRole: (id, role) => {
		state = {
			...state,
			users: state.users.map((u) => u.id === id ? {
				...u,
				role
			} : u)
		};
		emit();
	},
	addUser: (user) => {
		const newUser = {
			...user,
			id: user.id || `usr-${Math.random().toString(36).substring(2, 9)}`,
			avatar: user.avatar || `https://img.usecurling.com/ppl/thumbnail?seed=${Math.floor(Math.random() * 100)}`
		};
		const existingIndex = state.users.findIndex((u) => u.email.toLowerCase() === newUser.email.toLowerCase());
		if (existingIndex >= 0) {
			const updatedUsers = [...state.users];
			updatedUsers[existingIndex] = {
				...updatedUsers[existingIndex],
				...newUser,
				role: updatedUsers[existingIndex].role
			};
			state = {
				...state,
				users: updatedUsers
			};
			emit();
			return updatedUsers[existingIndex];
		}
		state = {
			...state,
			users: [...state.users, newUser]
		};
		emit();
		return newUser;
	},
	updateUser: (id, data) => {
		state = {
			...state,
			users: state.users.map((u) => u.id === id ? {
				...u,
				...data
			} : u)
		};
		emit();
	},
	removeUser: (id) => {
		state = {
			...state,
			users: state.users.filter((u) => u.id !== id)
		};
		emit();
	},
	enforceDomain: (domain) => {
		if (!domain) state = {
			...state,
			users: []
		};
		else state = {
			...state,
			users: state.users.filter((u) => u.email.toLowerCase().endsWith(`@${domain.toLowerCase()}`))
		};
		emit();
	},
	syncUsers: (fetchedUsers) => {
		const currentUsersMap = new Map(state.users.map((u) => [u.email.toLowerCase(), u]));
		const mergedUsers = fetchedUsers.map((fu) => {
			const existing = currentUsersMap.get(fu.email.toLowerCase());
			if (existing) return {
				...fu,
				role: existing.role
			};
			return fu;
		});
		state = {
			...state,
			users: mergedUsers
		};
		emit();
	}
};
function useUsersStore() {
	return (0, import_react.useSyncExternalStore)(usersStore.subscribe, usersStore.getState);
}
//#endregion
export { usersStore as n, useUsersStore as t };

//# sourceMappingURL=users-CbLRb6qo.js.map