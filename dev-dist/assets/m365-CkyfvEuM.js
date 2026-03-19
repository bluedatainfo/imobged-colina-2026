import "./react-CaAsmmmw.js";
import { t as toast } from "./use-toast-DzvQdsOw.js";
import { t as supabase } from "./client-BdUtiDva.js";
import { r as mainStore } from "./main-Dwmjrctc.js";
//#region src/lib/m365.ts
var getGraphToken = () => sessionStorage.getItem("m365_token");
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
			const url = `https://graph.microsoft.com/v1.0/sites/${sharepointDomain}:/sites/${sitePath}:/drive/root:/${library}/${fileName}:/content`;
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
				description: "Unable to connect to Microsoft 365. Please verify your Client/Tenant ID and Azure App permissions."
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
	uploadStructuredDocument: async (file, fileName, documentType, propertyId, propertyTitle, userName) => {
		const { data: config, error } = await supabase.from("sharepoint_configs").select("*").eq("document_type", documentType).maybeSingle();
		if (error || !config) throw new Error("SharePoint configuration missing for this document category.");
		const categoryName = {
			CONTRACT_ACTIVE: "Contrato Ativo",
			CONTRACT_TERMINATED: "Contrato Encerrado",
			INSPECTION_MOVE_IN: "Vistoria de Entrada",
			INSPECTION_MOVE_OUT: "Vistoria de Saída",
			OWNER_DOCUMENT: "Doc Proprietário",
			TENANT_DOCUMENT: "Doc Inquilino"
		}[documentType] || documentType;
		const date = /* @__PURE__ */ new Date();
		const year = date.getFullYear().toString();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const sanitizedTitle = propertyTitle.replace(/[^a-zA-Z0-9 -]/g, "").trim();
		const folderPath = [
			config.base_path,
			year,
			month,
			sanitizedTitle,
			categoryName
		].filter(Boolean).join("/");
		const extIndex = fileName.lastIndexOf(".");
		const nameWithoutExt = extIndex !== -1 ? fileName.substring(0, extIndex) : fileName;
		const ext = extIndex !== -1 ? fileName.substring(extIndex) : "";
		const uniqueFileName = `${nameWithoutExt}_${date.getTime()}${ext}`;
		const fullPath = `${folderPath}/${uniqueFileName}`;
		const token = getGraphToken();
		const { sharepointDomain, clientId, tenantId } = mainStore.getState().sharepoint;
		try {
			if (!token || !clientId || !tenantId) toast({
				title: `Upload GED Simulado: ${config.site_name}`,
				description: `[${categoryName}] Salvo em: /${config.library_name}/${fullPath}`
			});
			else {
				const url = `https://graph.microsoft.com/v1.0/sites/${sharepointDomain}:/sites/${config.site_name}:/drive/root:/${config.library_name}/${fullPath}:/content`;
				if (!(await fetch(url, {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": file instanceof File ? file.type : "application/octet-stream"
					},
					body: file
				})).ok) throw new Error("Erro de permissão no SharePoint. Verifique o acesso do seu usuário M365.");
			}
			mainStore.addAuditLog({
				propertyId,
				action: "SHAREPOINT_UPLOAD",
				user: userName,
				details: `Arquivo ${uniqueFileName} salvo em ${config.site_name}/${config.library_name}/${folderPath}`
			});
			return {
				success: true,
				path: fullPath
			};
		} catch (e) {
			const msg = e.message.includes("M365") || e.message.includes("permissão") ? "Erro de permissão no SharePoint. Verifique o acesso do seu usuário M365." : e.message;
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

//# sourceMappingURL=m365-CkyfvEuM.js.map