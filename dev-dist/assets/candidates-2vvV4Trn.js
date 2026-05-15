import { t as supabase } from "./client-DbPPqM1c.js";
import { n as m365Service } from "./m365-CBkwAIgl.js";
//#region src/services/candidates.ts
var candidatesService = {
	async getCandidates() {
		const { data, error } = await supabase.from("pre_registrations").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return data;
	},
	async updateStatus(id, status) {
		const { data, error } = await supabase.from("pre_registrations").update({ status }).eq("id", id).select().single();
		if (error) throw error;
		return data;
	},
	async syncFromSharePoint() {
		const lists = [
			{
				name: "Fichas Cadastrais  Locatrios",
				category: "PF"
			},
			{
				name: "Fichas Cadastrais Candidatos PJ",
				category: "PJ"
			},
			{
				name: "Fichas Cadastrais  Fiador",
				category: "Fiador"
			}
		];
		let syncedCount = 0;
		for (const list of lists) {
			const items = await m365Service.fetchListItems("locacoes", list.name);
			if (items && items.length > 0) for (const item of items) {
				const fields = item.fields || {};
				const sp_list_id = `${list.category}-${item.id}`;
				const payload = {
					full_name: fields.Nome || fields.RazaoSocial || fields.Title || "Sem Nome",
					email: fields.E_x002d_mail || fields.Email || fields.EMail || fields.eMail || fields.EmailCorporativo || null,
					phone: fields.Celular || fields.Telefone || fields.Contato || null,
					cpf: fields.CPF || null,
					cnpj: fields.CNPJ || null,
					address: fields.Endereco || fields.Endereço || null,
					category: list.category,
					sp_list_id,
					status: "Novo",
					form_data: fields
				};
				const { error } = await supabase.from("pre_registrations").insert(payload);
				if (!error) syncedCount++;
			}
		}
		return syncedCount;
	}
};
//#endregion
export { candidatesService as t };

//# sourceMappingURL=candidates-2vvV4Trn.js.map