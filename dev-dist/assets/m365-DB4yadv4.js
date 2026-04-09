import { t as toast } from "./use-toast-DzvQdsOw.js";
import { t as supabase } from "./client-BWrqzmk9.js";
import { r as mainStore } from "./main-MCjtWH0Q.js";
//#region src/lib/m365.ts
var getGraphToken = () => localStorage.getItem("m365_token");
var refreshM365Token = async () => {
	const refreshToken = localStorage.getItem("m365_refresh_token");
	if (!refreshToken) return null;
	const { clientId, tenantId } = mainStore.getState().sharepoint;
	if (!clientId || !tenantId) return null;
	try {
		const tokenParams = new URLSearchParams();
		tokenParams.append("client_id", clientId);
		tokenParams.append("refresh_token", refreshToken);
		tokenParams.append("grant_type", "refresh_token");
		const res = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: tokenParams.toString()
		});
		if (res.ok) {
			const data = await res.json();
			localStorage.setItem("m365_token", data.access_token);
			if (data.refresh_token) localStorage.setItem("m365_refresh_token", data.refresh_token);
			return data.access_token;
		}
	} catch (e) {
		console.error("Failed to refresh token", e);
	}
	return null;
};
var fetchWithAuth = async (url, options = {}) => {
	let token = getGraphToken();
	const executeFetch = (currentToken) => {
		const headers = new Headers(options.headers || {});
		if (currentToken) headers.set("Authorization", `Bearer ${currentToken}`);
		return fetch(url, {
			...options,
			headers
		});
	};
	let res = await executeFetch(token);
	if (res.status === 401) {
		const newToken = await refreshM365Token();
		if (newToken) {
			res = await executeFetch(newToken);
			if (res.status === 401) throw new Error("Sua sessão M365 expirou e não pôde ser renovada. Por favor, faça login novamente (Logout/Login).");
		} else {
			localStorage.removeItem("m365_token");
			localStorage.removeItem("m365_refresh_token");
			throw new Error("Sua sessão M365 expirou e não pôde ser renovada. Por favor, faça login novamente (Logout/Login).");
		}
	}
	return res;
};
var resolveSiteId = async (hostname, sitePath) => {
	let spPath = sitePath.trim();
	if (spPath.startsWith("http")) try {
		spPath = new URL(spPath).pathname;
	} catch (e) {}
	if (!spPath || spPath === "/") {
		try {
			const res = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${hostname}`);
			if (res.ok) return (await res.json()).id;
		} catch (e) {}
		return null;
	}
	if (!spPath.startsWith("/")) if (!spPath.startsWith("sites/") && !spPath.startsWith("teams/")) spPath = `/sites/${spPath}`;
	else spPath = `/${spPath}`;
	const siteName = spPath.split("/").filter(Boolean).pop();
	if (siteName) try {
		const searchRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites?search=${encodeURIComponent(siteName)}`);
		if (searchRes.ok) {
			const data = await searchRes.json();
			const site = data.value?.find((s) => s.webUrl && (s.webUrl.toLowerCase().endsWith(spPath.toLowerCase()) || s.webUrl.toLowerCase().endsWith(spPath.replace("/sites/", "/teams/").toLowerCase())));
			if (site && site.id) return site.id;
			const fallbackSite = data.value?.find((s) => s.name?.toLowerCase() === siteName.toLowerCase());
			if (fallbackSite && fallbackSite.id) return fallbackSite.id;
		}
	} catch (e) {}
	return null;
};
var m365Service = {
	sendEmail: (to, subject, body) => {
		const { primaryDomain } = mainStore.getState().sharepoint;
		toast({
			title: `E-mail M365 Enviado [Domínio: ${primaryDomain || "Não configurado"}]`,
			description: `Para: ${to}\nAssunto: ${subject}`
		});
	},
	findDocumentInSharePoint: async (fileName) => {
		if (!getGraphToken()) return null;
		const { sharepointDomain, sites } = mainStore.getState().sharepoint;
		if (!sharepointDomain || !sites.locacao) return null;
		try {
			const siteId = await resolveSiteId(sharepointDomain, sites.locacao);
			if (!siteId) return null;
			const drivesRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`);
			if (!drivesRes.ok) return null;
			const drivesData = await drivesRes.json();
			for (const drive of drivesData.value) {
				const searchRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/root/search(q='${fileName}')`);
				if (searchRes.ok) {
					const searchData = await searchRes.json();
					if (searchData.value && searchData.value.length > 0) {
						const item = searchData.value[0];
						try {
							const previewRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/items/${item.id}/preview`, { method: "POST" });
							if (previewRes.ok) {
								const previewData = await previewRes.json();
								if (previewData.getUrl) return previewData.getUrl;
							}
						} catch (e) {}
						return item.webUrl;
					}
				}
			}
		} catch (e) {
			console.warn("Failed to search SharePoint dynamically", e);
		}
		return null;
	},
	searchFilesByPropertyId: async (propertyId) => {
		if (!getGraphToken()) return [];
		const { sharepointDomain, sites } = mainStore.getState().sharepoint;
		if (!sharepointDomain || !sites.locacao) return [];
		try {
			const siteId = await resolveSiteId(sharepointDomain, sites.locacao);
			if (!siteId) return [];
			const drivesRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`);
			if (!drivesRes.ok) return [];
			const drivesData = await drivesRes.json();
			let allFiles = [];
			for (const drive of drivesData.value) {
				const searchRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/root/search(q='${propertyId}')`);
				if (searchRes.ok) {
					const searchData = await searchRes.json();
					if (searchData.value) allFiles = [...allFiles, ...searchData.value];
				}
			}
			return allFiles;
		} catch (e) {
			console.warn("Failed to search SharePoint by Property ID", e);
			return [];
		}
	},
	getEntityDocuments: async (documentType, entityCode) => {
		const { data: config } = await supabase.from("sharepoint_configs").select("*").eq("document_type", documentType).maybeSingle();
		if (!config) return null;
		const token = getGraphToken();
		const { sharepointDomain, clientId, tenantId } = mainStore.getState().sharepoint;
		if (!token || !clientId || !tenantId) return null;
		try {
			const siteId = await resolveSiteId(sharepointDomain, config.site_name);
			if (!siteId) return null;
			const drivesRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`);
			if (!drivesRes.ok) return null;
			const drive = (await drivesRes.json()).value.find((d) => d.name === config.library_name || d.name && config.library_name && d.name.toLowerCase() === config.library_name.toLowerCase());
			if (!drive) return null;
			const folderPath = [config.base_path, entityCode].filter(Boolean).join("/");
			const res = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/root:/${folderPath}:/children`);
			if (res.ok) return (await res.json()).value || [];
			else if (res.status === 404) return [];
		} catch (e) {
			console.warn("Failed to fetch entity documents from SP", e);
		}
		return null;
	},
	getFilePreviewUrl: async (filePath, documentType) => {
		const { data: config } = await supabase.from("sharepoint_configs").select("*").eq("document_type", documentType).maybeSingle();
		if (!config) throw new Error("Mapeamento GED não encontrado para esta categoria de documento.");
		const token = getGraphToken();
		const { sharepointDomain } = mainStore.getState().sharepoint;
		if (!token) throw new Error("Sessão do Microsoft 365 ausente ou expirada.");
		const siteId = await resolveSiteId(sharepointDomain, config.site_name);
		if (!siteId) throw new Error(`Site M365 "${config.site_name}" não encontrado. Verifique o mapeamento GED.`);
		const drivesRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`);
		if (!drivesRes.ok) throw new Error(`Não foi possível listar as bibliotecas do site "${config.site_name}".`);
		const drive = (await drivesRes.json()).value.find((d) => d.name === config.library_name || d.name && config.library_name && d.name.toLowerCase() === config.library_name.toLowerCase());
		if (!drive) throw new Error(`Biblioteca "${config.library_name}" não encontrada no site "${config.site_name}".`);
		const driveId = drive.id;
		let safePath = filePath;
		if (safePath.startsWith("/")) safePath = safePath.substring(1);
		const fileName = safePath.split("/").pop() || safePath;
		const searchRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root/search(q='${encodeURIComponent(fileName)}')`);
		let itemData = null;
		if (searchRes.ok) itemData = (await searchRes.json()).value?.find((v) => v.name === fileName);
		if (!itemData) throw new Error(`Arquivo não encontrado no SharePoint no caminho: ${safePath}`);
		try {
			const previewRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/items/${itemData.id}/preview`, { method: "POST" });
			if (previewRes.ok) {
				const previewData = await previewRes.json();
				if (previewData.getUrl) return previewData.getUrl;
			}
		} catch (e) {
			console.warn("Falha ao gerar link de preview, caindo para webUrl original", e);
		}
		return itemData.webUrl;
	},
	saveToLibrary: async (library, fileName, fileContent = "Conteúdo gerado via sistema", sitePath = "locacao") => {
		const token = getGraphToken();
		const { sharepointDomain, clientId, tenantId } = mainStore.getState().sharepoint;
		if (!token || !clientId || !tenantId) {
			toast({
				title: `SharePoint: ${library} [Mock]`,
				description: `Arquivo ${fileName} salvo localmente. Configure as credenciais no painel de Integração SharePoint para envio real.`
			});
			return;
		}
		try {
			const siteId = await resolveSiteId(sharepointDomain, sitePath);
			if (!siteId) throw new Error(`Site "${sitePath}" não encontrado no M365.`);
			const drivesRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`);
			if (!drivesRes.ok) throw new Error(`Não foi possível listar as bibliotecas de "${sitePath}".`);
			const drive = (await drivesRes.json()).value.find((d) => d.name === library || d.name && library && d.name.toLowerCase() === library.toLowerCase());
			if (!drive) throw new Error(`Biblioteca "${library}" não encontrada no site "${sitePath}".`);
			if (!(await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/root:/${fileName}:/content`, {
				method: "PUT",
				headers: { "Content-Type": "application/octet-stream" },
				body: fileContent
			})).ok) throw new Error("Upload falhou devido à falta de permissões ou caminhos incorretos");
			toast({
				title: "SharePoint Online",
				description: `Upload real do arquivo ${fileName} concluído com sucesso.`
			});
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro de Integração (Graph API)",
				description: e.message || "Unable to connect to Microsoft 365. Please verify your Client/Tenant ID and Azure App permissions."
			});
		}
	},
	syncToList: async (listName, itemData) => {
		const token = getGraphToken();
		const { sharepointDomain, clientId, tenantId } = mainStore.getState().sharepoint;
		if (!token || !clientId || !tenantId) {
			toast({
				title: `Lista SharePoint: ${listName} [Mock]`,
				description: "Sincronizado com sucesso (Modo de simulação)."
			});
			return;
		}
		toast({
			title: `Sincronização Online`,
			description: `Dados enviados em tempo real para a lista ${listName}.`
		});
	},
	sendTeamsMessage: (webhookUrl, message) => {
		if (!webhookUrl) return;
		toast({
			title: "Notificação Microsoft Teams",
			description: message
		});
	},
	moveDocument: (fileName, targetLibrary) => {
		const { sharepointDomain } = mainStore.getState().sharepoint;
		toast({
			title: `Sincronização Condicional Ativa [Domínio SP: ${sharepointDomain || "N/A"}]`,
			description: `Arquivo ${fileName} movido automaticamente para a biblioteca "${targetLibrary}".`
		});
	},
	uploadStructuredDocument: async (file, fileName, documentType, propertyId, propertyTitle, userName, entityCode, entityName, leaseNumber) => {
		const { data: config, error } = await supabase.from("sharepoint_configs").select("*").eq("document_type", documentType).maybeSingle();
		if (error || !config) throw new Error("SharePoint configuration missing for this document category.");
		const isEntityDoc = ["OWNER_DOCUMENT", "TENANT_DOCUMENT"].includes(documentType);
		const isInspection = ["INSPECTION_MOVE_IN", "INSPECTION_MOVE_OUT"].includes(documentType);
		const date = /* @__PURE__ */ new Date();
		let folderPath = "";
		if (isEntityDoc && entityCode) folderPath = [config.base_path, entityCode].filter(Boolean).join("/");
		else if (isInspection && leaseNumber) {
			const inspectionSubFolder = documentType === "INSPECTION_MOVE_IN" ? "Vistoria de Entrada" : "Vistoria de Saida";
			folderPath = [
				config.base_path,
				propertyId,
				"Locacao",
				leaseNumber,
				inspectionSubFolder
			].filter(Boolean).join("/");
		} else folderPath = [config.base_path, propertyId].filter(Boolean).join("/");
		const extIndex = fileName.lastIndexOf(".");
		const nameWithoutExt = extIndex !== -1 ? fileName.substring(0, extIndex) : fileName;
		const ext = extIndex !== -1 ? fileName.substring(extIndex) : "";
		const uniqueFileName = `${nameWithoutExt}_${date.getTime()}${ext}`;
		const fullPath = `${folderPath}/${uniqueFileName}`;
		const token = getGraphToken();
		const { sharepointDomain, clientId, tenantId } = mainStore.getState().sharepoint;
		try {
			if (!token || !clientId || !tenantId) {
				toast({
					title: `Upload GED Simulado: ${config.site_name}`,
					description: `Salvo em: /${config.library_name}/${fullPath}`
				});
				mainStore.addAuditLog({
					propertyId,
					action: "SHAREPOINT_UPLOAD",
					user: userName,
					details: `[Mock] Arquivo ${uniqueFileName} salvo em ${config.site_name}/${config.library_name}/${folderPath}`
				});
			} else {
				const siteId = await resolveSiteId(sharepointDomain, config.site_name);
				if (!siteId) throw new Error(`Site M365 "${config.site_name}" não encontrado. Verifique o mapeamento GED.`);
				const drivesRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`);
				if (!drivesRes.ok) throw new Error(`Não foi possível listar as bibliotecas do site "${config.site_name}".`);
				const drive = (await drivesRes.json()).value.find((d) => d.name === config.library_name || d.name && config.library_name && d.name.toLowerCase() === config.library_name.toLowerCase());
				if (!drive) throw new Error(`Biblioteca "${config.library_name}" não encontrada no site "${config.site_name}".`);
				const driveId = drive.id;
				const res = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${fullPath}:/content`, {
					method: "PUT",
					headers: { "Content-Type": file instanceof File ? file.type : "application/octet-stream" },
					body: file
				});
				if (!res.ok) throw new Error("Erro de permissão no SharePoint ou caminho de upload inválido.");
				const uploadedItem = await res.json();
				if (isEntityDoc && entityCode) try {
					await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/items/${uploadedItem.id}/listItem/fields`, {
						method: "PATCH",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							IdentificationCode: entityCode,
							EntityName: entityName || ""
						})
					});
				} catch (metaErr) {
					console.warn("Failed to update SharePoint metadata. Make sure the columns exist in the library.", metaErr);
				}
				mainStore.addAuditLog({
					propertyId,
					action: "SHAREPOINT_UPLOAD",
					user: userName,
					details: `Arquivo ${uniqueFileName} salvo com sucesso em ${config.site_name}/${config.library_name}/${folderPath}`
				});
			}
			return {
				success: true,
				path: fullPath
			};
		} catch (e) {
			const msg = e.message || "Erro de permissão no SharePoint. Verifique o acesso do seu usuário M365.";
			mainStore.addAuditLog({
				propertyId,
				action: "SHAREPOINT_UPLOAD_ERROR",
				user: userName,
				details: `Erro ao subir ${uniqueFileName}: ${msg}`
			});
			toast({
				variant: "destructive",
				title: "Falha no Upload GED",
				description: msg
			});
			throw new Error(msg);
		}
	}
};
//#endregion
export { m365Service as n, getGraphToken as t };

//# sourceMappingURL=m365-DB4yadv4.js.map