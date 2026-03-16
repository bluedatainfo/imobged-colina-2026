import { a as __toESM, n as require_react } from "./jsx-runtime-CvuQPfAM.js";
import { a as supabase } from "./main-DCsFzFjp.js";
//#region src/stores/users.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var state = { users: [] };
var listeners = [];
var initUsersStore = async () => {
	const data = await supabase.get("app_users");
	if (Array.isArray(data) && data.length > 0) state = { users: data };
	else {
		const demoUsers = [
			{
				id: "usr-admin",
				name: "Administrador Demo",
				email: "admin@imobiliaria.local",
				role: "Admin",
				avatar: ""
			},
			{
				id: "usr-corretor",
				name: "João (Corretor)",
				email: "corretor@imobiliaria.local",
				role: "Corretor",
				avatar: ""
			},
			{
				id: "usr-gerente",
				name: "Maria (Gerente)",
				email: "gerente@imobiliaria.local",
				role: "Gerente",
				avatar: ""
			}
		];
		state = { users: demoUsers };
		for (const u of demoUsers) await supabase.upsert("app_users", u);
	}
	emit();
};
var emit = () => {
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
		supabase.patch("app_users", id, { role });
	},
	addUser: (user) => {
		const newUser = {
			...user,
			id: user.id || `usr-${Math.random().toString(36).substring(2, 9)}`,
			avatar: user.avatar || ""
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
			supabase.patch("app_users", updatedUsers[existingIndex].id, updatedUsers[existingIndex]);
			return updatedUsers[existingIndex];
		}
		state = {
			...state,
			users: [...state.users, newUser]
		};
		emit();
		supabase.upsert("app_users", newUser);
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
		supabase.patch("app_users", id, data);
	},
	removeUser: (id) => {
		state = {
			...state,
			users: state.users.filter((u) => u.id !== id)
		};
		emit();
		supabase.delete("app_users", id);
	},
	enforceDomain: (domain) => {
		if (!domain) {
			const toRemove = [...state.users];
			state = {
				...state,
				users: []
			};
			emit();
			toRemove.forEach((u) => supabase.delete("app_users", u.id));
		} else {
			const toKeep = state.users.filter((u) => u.email.toLowerCase().endsWith(`@${domain.toLowerCase()}`));
			const toRemove = state.users.filter((u) => !u.email.toLowerCase().endsWith(`@${domain.toLowerCase()}`));
			state = {
				...state,
				users: toKeep
			};
			emit();
			toRemove.forEach((u) => supabase.delete("app_users", u.id));
		}
	},
	syncUsers: (fetchedUsers) => {
		const currentUsersMap = new Map(state.users.map((u) => [u.email.toLowerCase(), u]));
		const mergedUsers = fetchedUsers.map((fu) => {
			const existing = currentUsersMap.get(fu.email.toLowerCase());
			if (existing) return {
				...fu,
				role: existing.role,
				avatar: existing.avatar || fu.avatar
			};
			return fu;
		});
		state = {
			...state,
			users: mergedUsers
		};
		emit();
		mergedUsers.forEach((u) => supabase.upsert("app_users", u));
	}
};
function useUsersStore() {
	return (0, import_react.useSyncExternalStore)(usersStore.subscribe, usersStore.getState);
}
//#endregion
export { useUsersStore as n, usersStore as r, initUsersStore as t };

//# sourceMappingURL=users-CkyIZfv8.js.map