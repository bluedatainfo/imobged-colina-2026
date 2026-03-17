import { a as __toESM, n as require_react } from "./jsx-runtime-CvuQPfAM.js";
import { a as supabase } from "./main-B11b3mDy.js";
//#region src/stores/users.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var state = { users: [] };
var listeners = [];
var initUsersStore = async () => {
	const { data } = await supabase.from("app_users").select("*");
	if (data && data.length > 0) state.users = data.map((u) => ({
		id: u.id,
		name: u.name || "",
		email: u.email || "",
		role: u.role || "Vistoriador",
		avatar: u.avatar || ""
	}));
	else if (sessionStorage.getItem("app_user_id")) {
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
		state.users = demoUsers;
		for (const u of demoUsers) await supabase.from("app_users").upsert({
			id: u.id,
			name: u.name,
			email: u.email,
			role: u.role,
			avatar: u.avatar
		});
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
	syncUsers: async (fetchedUsers) => {
		const updatedUsers = [...state.users];
		const dbPayload = [];
		for (const user of fetchedUsers) {
			const existingIndex = updatedUsers.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
			if (existingIndex >= 0) {
				updatedUsers[existingIndex] = {
					...updatedUsers[existingIndex],
					name: user.name,
					avatar: user.avatar || updatedUsers[existingIndex].avatar
				};
				dbPayload.push({
					id: updatedUsers[existingIndex].id,
					name: updatedUsers[existingIndex].name,
					email: updatedUsers[existingIndex].email,
					role: updatedUsers[existingIndex].role,
					avatar: updatedUsers[existingIndex].avatar
				});
			} else {
				updatedUsers.push(user);
				dbPayload.push({
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					avatar: user.avatar
				});
			}
		}
		state = {
			...state,
			users: updatedUsers
		};
		emit();
		if (dbPayload.length > 0) await supabase.from("app_users").upsert(dbPayload);
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
		supabase.from("app_users").update({ role }).eq("id", id).then();
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
			supabase.from("app_users").update({
				name: updatedUsers[existingIndex].name,
				avatar: updatedUsers[existingIndex].avatar
			}).eq("id", updatedUsers[existingIndex].id).then();
			return updatedUsers[existingIndex];
		}
		state = {
			...state,
			users: [...state.users, newUser]
		};
		emit();
		supabase.from("app_users").insert({
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			role: newUser.role,
			avatar: newUser.avatar
		}).then();
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
		supabase.from("app_users").update(data).eq("id", id).then();
	},
	removeUser: (id) => {
		state = {
			...state,
			users: state.users.filter((u) => u.id !== id)
		};
		emit();
		supabase.from("app_users").delete().eq("id", id).then();
	},
	enforceDomain: (domain) => {
		if (!domain) {
			const toRemove = [...state.users];
			state = {
				...state,
				users: []
			};
			emit();
			toRemove.forEach((u) => supabase.from("app_users").delete().eq("id", u.id).then());
		} else {
			const toKeep = state.users.filter((u) => u.email.toLowerCase().endsWith(`@${domain.toLowerCase()}`));
			const toRemove = state.users.filter((u) => !u.email.toLowerCase().endsWith(`@${domain.toLowerCase()}`));
			state = {
				...state,
				users: toKeep
			};
			emit();
			toRemove.forEach((u) => supabase.from("app_users").delete().eq("id", u.id).then());
		}
	}
};
function useUsersStore() {
	return (0, import_react.useSyncExternalStore)(usersStore.subscribe, usersStore.getState);
}
//#endregion
export { useUsersStore as n, usersStore as r, initUsersStore as t };

//# sourceMappingURL=users-dEgyMFv5.js.map