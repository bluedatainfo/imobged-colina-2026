import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  User,
  Building2,
  Shield,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react'

interface CandidateDetailViewProps {
  candidate: any
}

export const CandidateDetailView: React.FC<CandidateDetailViewProps> = ({ candidate }) => {
  const formData = candidate?.form_data || {}
  const category = (candidate?.category || 'PF').toUpperCase()

  const formatBool = (val: any) => {
    if (val === 'sim' || val === true) return 'Sim'
    if (val === 'nao' || val === false) return 'Não'
    return val || '-'
  }

  const renderField = (label: string, value: any) => (
    <div className="space-y-1">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
        {label}
      </span>
      <p className="text-sm font-medium text-slate-800 break-words">
        {value !== undefined && value !== null && value !== '' ? String(value) : '-'}
      </p>
    </div>
  )

  return (
    <div className="space-y-6 text-slate-800">
      {/* ======================================================== */}
      {/* 1. VISUALIZAÇÃO PESSOA FÍSICA (PF)                       */}
      {/* ======================================================== */}
      {category === 'PF' && (
        <>
          {/* Seção 1: Dados Pessoais Locatário */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <User className="w-4 h-4 text-primary" />
                1. DADOS PESSOAIS DO LOCATÁRIO
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Nome Completo', formData.nome || candidate.full_name)}
              </div>
              {renderField('Data de Nascimento', formData.dt_nasc)}
              {renderField('Local de Nascimento', formData.local_nasc)}
              {renderField('UF Nascimento', formData.uf_nasc)}

              {renderField('Estado Civil', formData.est_civil)}
              {renderField('RG', formData.rg)}
              {renderField('CPF', formData.cpf || candidate.cpf)}

              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Filiação (Pai)', formData.filiacao_pai)}
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Filiação (Mãe)', formData.filiacao_mae)}
              </div>

              <div className="sm:col-span-2">
                {renderField('Endereço Residencial Atual', formData.endereco || candidate.address)}
              </div>
              {renderField('CEP', formData.cep)}

              {renderField('Bairro', formData.bairro)}
              {renderField('Cidade', formData.cidade)}
              {renderField('UF', formData.uf)}

              {renderField('Telefone Residencial', formData.fone_res)}
              {renderField('Celular / WhatsApp', formData.celular || candidate.phone)}
              {renderField('E-mail', formData.email || candidate.email)}

              <div className="sm:col-span-2 md:col-span-3 pt-2 border-t">
                {renderField('Casa Alugada Atualmente?', formatBool(formData.casa_alugada))}
                {formData.casa_alugada === 'sim' &&
                  renderField('Qual Imobiliária Administra?', formData.imob_administra)}
              </div>
            </CardContent>
          </Card>

          {/* Seção 2: Empresa Onde Trabalha */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Briefcase className="w-4 h-4 text-primary" />
                2. EMPRESA ONDE TRABALHA
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Razão Social', formData.empresa_razao_social)}
              </div>
              <div className="sm:col-span-2">
                {renderField('Endereço da Empresa', formData.empresa_endereco)}
              </div>
              {renderField('Bairro', formData.empresa_bairro)}
              {renderField('Cidade', formData.empresa_cidade)}
              {renderField('UF', formData.empresa_uf)}
              {renderField('Ramal', formData.empresa_ramal)}
              <div className="sm:col-span-2">
                {renderField('Telefones', formData.empresa_fones)}
              </div>
              {renderField('Salário', formData.empresa_salario)}
              {renderField('Tempo de Firma', formData.empresa_tempo_firma)}
              {renderField('Profissão / Cargo', formData.empresa_profissao)}

              <div className="sm:col-span-2 md:col-span-3 pt-2 border-t">
                {renderField(
                  'Possui Outros Rendimentos?',
                  formatBool(formData.empresa_outros_rendimentos),
                )}
                {formData.empresa_outros_rendimentos === 'sim' &&
                  renderField('Quais outros rendimentos?', formData.empresa_quais_rendimentos)}
              </div>
            </CardContent>
          </Card>

          {/* Seção 3: Esposo(a) */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <HeartHandshake className="w-4 h-4 text-primary" />
                3. DADOS DO ESPOSO(A) / CÔNJUGE
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Nome Completo', formData.esposo_nome)}
              </div>
              {renderField('Data de Nascimento', formData.esposo_dt_nasc)}
              {renderField('Local de Nascimento', formData.esposo_local_nasc)}
              {renderField('UF Nascimento', formData.esposo_uf_nasc)}
              {renderField('Estado Civil', formData.esposo_est_civil)}
              {renderField('RG', formData.esposo_rg)}
              {renderField('CPF', formData.esposo_cpf)}
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Filiação (Pai)', formData.esposo_filiacao_pai)}
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Filiação (Mãe)', formData.esposo_filiacao_mae)}
              </div>
              <div className="sm:col-span-2">
                {renderField('Endereço', formData.esposo_endereco)}
              </div>
              {renderField('CEP', formData.esposo_cep)}
              {renderField('Bairro', formData.esposo_bairro)}
              {renderField('Cidade', formData.esposo_cidade)}
              {renderField('UF', formData.esposo_uf)}
              {renderField('Fone Residencial', formData.esposo_fone_res)}
              {renderField('Celular', formData.esposo_celular)}
              {renderField('E-mail', formData.esposo_email)}

              {/* Empresa Cônjuge */}
              <div className="sm:col-span-2 md:col-span-3 pt-3 border-t">
                <p className="text-xs font-bold text-slate-700 uppercase">Empresa do Cônjuge</p>
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Razão Social', formData.esposo_empresa_razao_social)}
              </div>
              <div className="sm:col-span-2">
                {renderField('Endereço', formData.esposo_empresa_endereco)}
              </div>
              {renderField('Bairro', formData.esposo_empresa_bairro)}
              {renderField('Cidade', formData.esposo_empresa_cidade)}
              {renderField('UF', formData.esposo_empresa_uf)}
              {renderField('Ramal', formData.esposo_empresa_ramal)}
              <div className="sm:col-span-2">
                {renderField('Telefones', formData.esposo_empresa_fones)}
              </div>
              {renderField('Salário', formData.esposo_empresa_salario)}
              {renderField('Tempo de Firma', formData.esposo_empresa_tempo_firma)}
              {renderField('Profissão', formData.esposo_empresa_profissao)}
            </CardContent>
          </Card>

          {/* Seção 4: Moradores e Animais */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <User className="w-4 h-4 text-primary" />
                4. COMPOSIÇÃO FAMILIAR E ANIMAIS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {renderField('Pessoas que residirão no imóvel (Nome e Idade)', formData.moradores)}
              <div className="pt-2 border-t grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderField('Possui Animais?', formatBool(formData.animais_possui))}
                {formData.animais_possui === 'sim' &&
                  renderField('Quais e Quantos?', formData.animais_detalhes)}
              </div>
            </CardContent>
          </Card>

          {/* Seção 5: Referências */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Phone className="w-4 h-4 text-primary" />
                5. REFERÊNCIAS (PARENTES OU CONHECIDOS)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderField('Nome Completo', formData.referencia_nome)}
              {renderField('Telefone', formData.referencia_fone)}
              <div className="sm:col-span-2">
                {renderField('Endereço', formData.referencia_endereco)}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* ======================================================== */}
      {/* 2. VISUALIZAÇÃO PESSOA JURÍDICA (PJ)                     */}
      {/* ======================================================== */}
      {category === 'PJ' && (
        <>
          {/* Seção 1: Empresa */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Building2 className="w-4 h-4 text-primary" />
                1. DADOS DA EMPRESA
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Razão Social', formData.razao_social || candidate.full_name)}
              </div>
              <div className="sm:col-span-2">
                {renderField('Nome Fantasia', formData.nome_fantasia)}
              </div>
              {renderField('CNPJ', formData.cnpj || candidate.cnpj)}
              {renderField('Inscrição Estadual', formData.inscr_estadual)}
              <div className="sm:col-span-2">
                {renderField('Endereço', formData.endereco || candidate.address)}
              </div>
              {renderField('CEP', formData.cep)}
              {renderField('Bairro', formData.bairro)}
              {renderField('Cidade', formData.cidade)}
              {renderField('UF', formData.uf)}
              {renderField('Telefones', formData.fones || candidate.phone)}
              <div className="sm:col-span-2">
                {renderField('E-mail Corporativo', formData.email || candidate.email)}
              </div>
              {renderField('Faturamento Mensal', formData.faturamento)}
              {renderField('Tempo de Empresa', formData.tempo_empresa)}
              {renderField('Ramo de Atividade', formData.ramo_atividade)}
            </CardContent>
          </Card>

          {/* Seção 2: 1º Representante */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <User className="w-4 h-4 text-primary" />
                2. 1º REPRESENTANTE LEGAL
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Nome Completo', formData.rep1_nome)}
              </div>
              {renderField('Data de Nascimento', formData.rep1_dt_nasc)}
              {renderField('Local Nascimento', formData.rep1_local_nasc)}
              {renderField('UF Nasc.', formData.rep1_uf_nasc)}
              {renderField('Estado Civil', formData.rep1_est_civil)}
              {renderField('RG', formData.rep1_rg)}
              {renderField('CPF', formData.rep1_cpf)}
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Filiação (Pai)', formData.rep1_filiacao_pai)}
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Filiação (Mãe)', formData.rep1_filiacao_mae)}
              </div>
              <div className="sm:col-span-2">{renderField('Endereço', formData.rep1_endereco)}</div>
              {renderField('CEP', formData.rep1_cep)}
              {renderField('Bairro', formData.rep1_bairro)}
              {renderField('Cidade', formData.rep1_cidade)}
              {renderField('UF', formData.rep1_uf)}
              {renderField('Fone Residencial', formData.rep1_fone_res)}
              {renderField('Celular', formData.rep1_celular)}
              {renderField('E-mail', formData.rep1_email)}
              {renderField('Salário / Pró-labore', formData.rep1_salario)}
              {renderField('Tempo de Firma', formData.rep1_tempo_firma)}
              {renderField('Profissão / Cargo', formData.rep1_profissao)}
              <div className="sm:col-span-2 md:col-span-3 pt-2 border-t">
                {renderField(
                  'Possui Outros Rendimentos?',
                  formatBool(formData.rep1_outros_rendimentos),
                )}
                {formData.rep1_outros_rendimentos === 'sim' &&
                  renderField('Quais?', formData.rep1_quais_rendimentos)}
              </div>
            </CardContent>
          </Card>

          {/* Seção 3: 2º Representante */}
          {formData.rep2_nome && (
            <Card className="border shadow-sm">
              <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                  <User className="w-4 h-4 text-primary" />
                  3. 2º REPRESENTANTE LEGAL
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="sm:col-span-2 md:col-span-3">
                  {renderField('Nome Completo', formData.rep2_nome)}
                </div>
                {renderField('Data de Nascimento', formData.rep2_dt_nasc)}
                {renderField('Local Nascimento', formData.rep2_local_nasc)}
                {renderField('UF Nasc.', formData.rep2_uf_nasc)}
                {renderField('Estado Civil', formData.rep2_est_civil)}
                {renderField('RG', formData.rep2_rg)}
                {renderField('CPF', formData.rep2_cpf)}
                <div className="sm:col-span-2 md:col-span-3">
                  {renderField('Filiação (Pai)', formData.rep2_filiacao_pai)}
                </div>
                <div className="sm:col-span-2 md:col-span-3">
                  {renderField('Filiação (Mãe)', formData.rep2_filiacao_mae)}
                </div>
                <div className="sm:col-span-2">
                  {renderField('Endereço', formData.rep2_endereco)}
                </div>
                {renderField('CEP', formData.rep2_cep)}
                {renderField('Bairro', formData.rep2_bairro)}
                {renderField('Cidade', formData.rep2_cidade)}
                {renderField('UF', formData.rep2_uf)}
                {renderField('Fone Residencial', formData.rep2_fone_res)}
                {renderField('Celular', formData.rep2_celular)}
                {renderField('E-mail', formData.rep2_email)}
                {renderField('Salário / Pró-labore', formData.rep2_salario)}
                {renderField('Tempo de Firma', formData.rep2_tempo_firma)}
                {renderField('Profissão / Cargo', formData.rep2_profissao)}
              </CardContent>
            </Card>
          )}

          {/* Seção 4: Finalidade da Locação */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Building2 className="w-4 h-4 text-primary" />
                4. FINALIDADE DA LOCAÇÃO E USO
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {renderField('Finalidade do Imóvel', formData.finalidade_tipo?.toUpperCase())}
              {formData.finalidade_tipo === 'comercial'
                ? renderField('Estabelecimento Comercial', formData.comercial_estabelecimento)
                : renderField('Moradores (Nome e Idade)', formData.residencial_moradores)}
              <div className="pt-2 border-t grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderField('Possui Animais?', formatBool(formData.animais_possui))}
                {formData.animais_possui === 'sim' &&
                  renderField('Quais e Quantos?', formData.animais_detalhes)}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* ======================================================== */}
      {/* 3. VISUALIZAÇÃO FIADOR                                   */}
      {/* ======================================================== */}
      {category === 'FIADOR' && (
        <>
          {/* Seção 1: Dados Pessoais do Fiador */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Shield className="w-4 h-4 text-primary" />
                1. DADOS PESSOAIS DO FIADOR(A)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Nome Completo', formData.nome || candidate.full_name)}
              </div>
              {renderField('Data de Nascimento', formData.dt_nasc)}
              {renderField('Local Nascimento', formData.local_nasc)}
              {renderField('UF Nasc.', formData.uf_nasc)}
              {renderField('Estado Civil', formData.est_civil)}
              {renderField('RG', formData.rg)}
              {renderField('CPF', formData.cpf || candidate.cpf)}
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Filiação (Pai)', formData.filiacao_pai)}
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Filiação (Mãe)', formData.filiacao_mae)}
              </div>
              <div className="sm:col-span-2">
                {renderField('Endereço', formData.endereco || candidate.address)}
              </div>
              {renderField('CEP', formData.cep)}
              {renderField('Bairro', formData.bairro)}
              {renderField('Cidade', formData.cidade)}
              {renderField('UF', formData.uf)}
              {renderField('Telefone Residencial', formData.fone_res)}
              {renderField('Celular / WhatsApp', formData.celular || candidate.phone)}
              {renderField('E-mail', formData.email || candidate.email)}
              <div className="sm:col-span-2 md:col-span-3 pt-2 border-t">
                {renderField('Casa Alugada Atualmente?', formatBool(formData.casa_alugada))}
                {formData.casa_alugada === 'sim' &&
                  renderField('Qual Imobiliária Administra?', formData.imob_administra)}
              </div>
            </CardContent>
          </Card>

          {/* Seção 2: Empresa Fiador */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Briefcase className="w-4 h-4 text-primary" />
                2. EMPRESA ONDE O FIADOR TRABALHA
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Razão Social', formData.empresa_razao_social)}
              </div>
              <div className="sm:col-span-2">
                {renderField('Endereço', formData.empresa_endereco)}
              </div>
              {renderField('Bairro', formData.empresa_bairro)}
              {renderField('Cidade', formData.empresa_cidade)}
              {renderField('UF', formData.empresa_uf)}
              {renderField('Ramal', formData.empresa_ramal)}
              <div className="sm:col-span-2">
                {renderField('Telefones', formData.empresa_fones)}
              </div>
              {renderField('Salário', formData.empresa_salario)}
              {renderField('Tempo de Firma', formData.empresa_tempo_firma)}
              {renderField('Profissão', formData.empresa_profissao)}
              <div className="sm:col-span-2 md:col-span-3 pt-2 border-t">
                {renderField(
                  'Possui Outros Rendimentos?',
                  formatBool(formData.empresa_outros_rendimentos),
                )}
                {formData.empresa_outros_rendimentos === 'sim' &&
                  renderField('Quais?', formData.empresa_quais_rendimentos)}
              </div>
            </CardContent>
          </Card>

          {/* Seção 3: Esposo(a) Fiador */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <HeartHandshake className="w-4 h-4 text-primary" />
                3. DADOS DO ESPOSO(A) DO FIADOR
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Nome Completo', formData.esposo_nome)}
              </div>
              {renderField('Data de Nascimento', formData.esposo_dt_nasc)}
              {renderField('Local Nascimento', formData.esposo_local_nasc)}
              {renderField('UF Nasc.', formData.esposo_uf_nasc)}
              {renderField('Estado Civil', formData.esposo_est_civil)}
              {renderField('RG', formData.esposo_rg)}
              {renderField('CPF', formData.esposo_cpf)}
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Filiação (Pai)', formData.esposo_filiacao_pai)}
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Filiação (Mãe)', formData.esposo_filiacao_mae)}
              </div>
              <div className="sm:col-span-2">
                {renderField('Endereço', formData.esposo_endereco)}
              </div>
              {renderField('CEP', formData.esposo_cep)}
              {renderField('Bairro', formData.esposo_bairro)}
              {renderField('Cidade', formData.esposo_cidade)}
              {renderField('UF', formData.esposo_uf)}
              {renderField('Fone Residencial', formData.esposo_fone_res)}
              {renderField('Celular', formData.esposo_celular)}
              {renderField('E-mail', formData.esposo_email)}

              {/* Empresa Cônjuge */}
              <div className="sm:col-span-2 md:col-span-3 pt-3 border-t">
                <p className="text-xs font-bold text-slate-700 uppercase">Empresa do Cônjuge</p>
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                {renderField('Razão Social', formData.esposo_empresa_razao_social)}
              </div>
              <div className="sm:col-span-2">
                {renderField('Endereço', formData.esposo_empresa_endereco)}
              </div>
              {renderField('Bairro', formData.esposo_empresa_bairro)}
              {renderField('Cidade', formData.esposo_empresa_cidade)}
              {renderField('UF', formData.esposo_empresa_uf)}
              {renderField('Ramal', formData.esposo_empresa_ramal)}
              <div className="sm:col-span-2">
                {renderField('Telefones', formData.esposo_empresa_fones)}
              </div>
              {renderField('Salário', formData.esposo_empresa_salario)}
              {renderField('Tempo de Firma', formData.esposo_empresa_tempo_firma)}
              {renderField('Profissão', formData.esposo_empresa_profissao)}
            </CardContent>
          </Card>

          {/* Seção 4: Referências Fiador */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Phone className="w-4 h-4 text-primary" />
                4. REFERÊNCIAS (PARENTES OU CONHECIDOS)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderField('Nome Completo', formData.referencia_nome)}
              {renderField('Telefone', formData.referencia_fone)}
              <div className="sm:col-span-2">
                {renderField('Endereço', formData.referencia_endereco)}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Declaração de Aceite */}
      <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        <div className="text-xs text-emerald-800">
          <span className="font-semibold">Termo de Veracidade:</span>{' '}
          {formData.declaracao_aceite
            ? 'Aceito e confirmado pelo declarante no envio da ficha cadastral.'
            : 'Confirmação registrada.'}
          {formData.data_envio && (
            <span className="block mt-0.5 text-emerald-700">
              Enviado em: {new Date(formData.data_envio).toLocaleString('pt-BR')}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
