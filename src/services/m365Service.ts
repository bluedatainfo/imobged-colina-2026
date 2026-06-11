export const m365Service = {
  isAuthenticated: () => {
    return localStorage.getItem('m365_auth') === 'true'
  },

  login: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('m365_auth', 'true')
        resolve(true)
      }, 800)
    })
  },

  fetchExcelRows: async (sourceDocId: string, worksheetName?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (sourceDocId === '{278D2721-FF92-4F2A-8B09-82F491B997B0}') {
      if (worksheetName === 'Fiador') {
        return [
          {
            Nome: 'Carlos Santos',
            Data: '2023-10-04',
            Status: 'Análise Completa',
            Renda: 'R$ 10.000,00',
            Imovel: 'Sim',
            Telefone: '(11) 98888-7777',
            Email: 'carlos.fiador@email.com',
          },
          {
            Nome: 'Ana Paula Ferreira',
            Data: '2023-10-05',
            Status: 'Pendente Doc.',
            Renda: 'R$ 8.500,00',
            Imovel: 'Não',
            Telefone: '(11) 97777-6666',
            Email: 'ana.paula@email.com',
          },
        ]
      } else {
        return [
          {
            Nome: 'João Roberto Silva',
            Data: '2023-10-01',
            Status: 'Aprovado',
            CPF: '111.222.333-44',
            Email: 'joao.roberto@example.com',
            'Data de Nascimento': '15/04/1985',
            Profissão: 'Engenheiro',
          },
          {
            Nome: 'Maria Clara Souza',
            Data: '2023-10-02',
            Status: 'Em Análise',
            CPF: '555.666.777-88',
            Email: 'maria.clara@example.com',
            'Data de Nascimento': '22/08/1990',
            Profissão: 'Médica',
          },
          {
            Nome: 'Pedro Almeida',
            Data: '2023-10-06',
            Status: 'Reprovado',
            CPF: '999.888.777-66',
            Email: 'pedro.almeida@example.com',
            'Data de Nascimento': '10/01/1995',
            Profissão: 'Autônomo',
          },
        ]
      }
    }

    if (sourceDocId === '{A049F513-89A2-4366-811C-21B26257CC7C}') {
      return [
        {
          Nome: 'Tech Solutions LTDA',
          Data: '2023-10-03',
          Status: 'Aprovado',
          CNPJ: '12.345.678/0001-90',
          Email: 'contato@techsolutions.com',
          'Razão Social': 'Tech Solutions Serviços de Informática LTDA',
          'Inscrição Estadual': 'Isento',
        },
        {
          Nome: 'Comercial Souza ME',
          Data: '2023-10-07',
          Status: 'Pendente Assinatura',
          CNPJ: '98.765.432/0001-10',
          Email: 'financeiro@comercialsouza.com.br',
          'Razão Social': 'Comercial Souza Materiais de Construção ME',
          'Inscrição Estadual': '123.456.789.000',
        },
      ]
    }

    return []
  },
}
