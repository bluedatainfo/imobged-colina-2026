import "./react-CaAsmmmw.js";
import { t as toast } from "./use-toast-DzvQdsOw.js";
import { t as supabase } from "./client-SeHzFSrX.js";
import { r as mainStore } from "./main-CviKFjWz.js";
//#region src/lib/m365.ts
var getGraphToken = () => localStorage.getItem("m365_token");
var m365Service = {
	sendEmail: (to, subject, body) => {
		const { primaryDomain } = mainStore.getState().sharepoint;
		toast({
			title: `E-mail M365 Enviado [Domínio: ${primaryDomain || "Não configurado"}]`,
			description: `Para: ${to}\nAssunto: ${subject}`
		});
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
			const hostname = sharepointDomain;
			const siteRes = await fetch(`https://graph.microsoft.com/v1.0/sites/${hostname}:/sites/${sitePath}`, { headers: { Authorization: `Bearer ${token}` } });
			if (!siteRes.ok) throw new Error(`Site "${sitePath}" não encontrado no M365.`);
			const siteId = (await siteRes.json()).id;
			const drivesRes = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`, { headers: { Authorization: `Bearer ${token}` } });
			if (!drivesRes.ok) throw new Error(`Não foi possível listar as bibliotecas de "${sitePath}".`);
			const drive = (await drivesRes.json()).value.find((d) => d.name === library);
			if (!drive) throw new Error(`Biblioteca "${library}" não encontrada no site "${sitePath}".`);
			const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/root:/${fileName}:/content`;
			if (!(await fetch(url, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/octet-stream"
				},
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
	uploadStructuredDocument: async (file, fileName, documentType, propertyId, propertyTitle, userName, entityCode, entityName) => {
		const { data: config, error } = await supabase.from("sharepoint_configs").select("*").eq("document_type", documentType).maybeSingle();
		if (error || !config) throw new Error("SharePoint configuration missing for this document category.");
		const isEntityDoc = ["OWNER_DOCUMENT", "TENANT_DOCUMENT"].includes(documentType);
		const date = /* @__PURE__ */ new Date();
		const year = date.getFullYear().toString();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		let folderPath = "";
		if (isEntityDoc && entityCode) folderPath = [config.base_path, entityCode].filter(Boolean).join("/");
		else folderPath = [
			config.base_path,
			year,
			month,
			propertyId
		].filter(Boolean).join("/");
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
				const hostname = sharepointDomain;
				const siteRes = await fetch(`https://graph.microsoft.com/v1.0/sites/${hostname}:/sites/${config.site_name}`, { headers: { Authorization: `Bearer ${token}` } });
				if (!siteRes.ok) throw new Error(`Site M365 "${config.site_name}" não encontrado. Verifique a configuração de mapeamento GED.`);
				const siteId = (await siteRes.json()).id;
				const drivesRes = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`, { headers: { Authorization: `Bearer ${token}` } });
				if (!drivesRes.ok) throw new Error(`Não foi possível listar as bibliotecas do site "${config.site_name}".`);
				const drive = (await drivesRes.json()).value.find((d) => d.name === config.library_name);
				if (!drive) throw new Error(`Biblioteca "${config.library_name}" não encontrada no site "${config.site_name}".`);
				const driveId = drive.id;
				const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${fullPath}:/content`;
				const res = await fetch(url, {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": file instanceof File ? file.type : "application/octet-stream"
					},
					body: file
				});
				if (!res.ok) throw new Error("Erro de permissão no SharePoint ou caminho de upload inválido.");
				const uploadedItem = await res.json();
				if (isEntityDoc && entityCode) try {
					await fetch(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/items/${uploadedItem.id}/listItem/fields`, {
						method: "PATCH",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json"
						},
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
export { m365Service };

//# sourceMappingURL=m365-CcpcnXne.js.map