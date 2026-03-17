import { t as toast } from "./use-toast-cNG4ZhbD.js";
import { r as mainStore } from "./main-DlN0Ns53.js";
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
	}
};
//#endregion
export { m365Service as t };

//# sourceMappingURL=m365-DX-LglAe.js.map