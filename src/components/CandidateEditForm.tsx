import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import {
  User,
  Building2,
  Shield,
  Briefcase,
  HeartHandshake,
  Phone,
  Save,
  X,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { maskDate, maskCurrency, maskCep, maskPhone } from '@/lib/masks'
import { PreRegistration } from '@/services/candidates'

interface CandidateEditFormProps {
  candidate: PreRegistration
  operatorName: string
  onSave: (updatedCandidate: PreRegistration) => void
  onCancel: () => void
  saving: boolean
}

export const CandidateEditForm: React.FC<CandidateEditFormProps> = ({
  candidate,
  operatorName,
  onSave,
  onCancel,
  saving,
}) => {
  const category = (candidate?.category || 'PF').toUpperCase()
  const rawData = candidate?.form_data || {}

  // Inicializa dados mantendo coerência com form_data e colunas do registro
  const [data, setData] = useState<Record<string, any>>(() => {
    return {
      ...rawData,
      // Fallbacks para campos básicos caso não existam no form_data
      nome: rawData.nome || rawData.Nome || candidate.full_name || '',
      cpf: rawData.cpf || rawData.CPF || candidate.cpf || '',
      email: rawData.email || rawData.Email || candidate.email || '',
      celular: rawData.celular || rawData.Celular || candidate.phone || '',
      endereco: rawData.endereco || rawData.Endereco || rawData.Endereço || candidate.address || '',
      razao_social: rawData.razao_social || rawData.RazaoSocial || candidate.full_name || '',
      cnpj: rawData.cnpj || rawData.CNPJ || candidate.cnpj || '',
    }
  })

  const updateField = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Constrói objeto atualizado de PreRegistration
    let fullName = candidate.full_name
    let cpf = candidate.cpf
    let cnpj = candidate.cnpj
    let email = candidate.email
    let phone = candidate.phone
    let address = candidate.address

    if (category === 'PF' || category === 'FIADOR') {
      if (data.nome?.trim()) fullName = data.nome.trim()
      if (data.cpf?.trim()) cpf = data.cpf.trim()
      if (data.email?.trim()) email = data.email.trim()
      if (data.celular?.trim()) phone = data.celular.trim()
      else if (data.fone_res?.trim()) phone = data.fone_res.trim()
      if (data.endereco?.trim()) address = data.endereco.trim()
    } else if (category === 'PJ') {
      if (data.razao_social?.trim()) fullName = data.razao_social.trim()
      if (data.cnpj?.trim()) cnpj = data.cnpj.trim()
      if (data.email?.trim()) email = data.email.trim()
      if (data.fones?.trim()) phone = data.fones.trim()
      if (data.endereco?.trim()) address = data.endereco.trim()
    }

    const nowIso = new Date().toISOString()
    const updatedCandidate: PreRegistration = {
      ...candidate,
      full_name: fullName,
      cpf,
      cnpj,
      email,
      phone,
      address,
      form_data: {
        ...data,
        edited_by: operatorName,
        edited_at: nowIso,
      },
      edited_by: operatorName,
      edited_at: nowIso,
      updated_at: nowIso,
    }

    onSave(updatedCandidate)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-slate-800">
      {/* Alerta de Modo de Edição */}
      <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 font-bold">
            ✎
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">Modo de Edição da Ficha</h4>
            <p className="text-xs text-emerald-800">
              Operador responsável:{' '}
              <span className="font-semibold text-emerald-900">{operatorName}</span>. As alterações
              serão gravadas com registro de auditoria.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={saving}
            className="border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4 mr-1.5" />
            Cancelar
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1.5" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. SEÇÕES DE EDIÇÃO PESSOA FÍSICA (PF)                   */}
      {/* ======================================================== */}
      {category === 'PF' && (
        <>
          {/* Seção 1: Dados Pessoais Locatário */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <User className="w-4 h-4 text-primary" />
                1. DADOS PESSOAIS DO LOCATÁRIO
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pf_edit_nome" className="text-xs font-semibold text-slate-700">
                  Nome Completo *
                </Label>
                <Input
                  id="pf_edit_nome"
                  value={data.nome || ''}
                  onChange={(e) => updateField('nome', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_dt_nasc" className="text-xs font-semibold text-slate-700">
                  Data de Nascimento
                </Label>
                <Input
                  id="pf_edit_dt_nasc"
                  value={data.dt_nasc || ''}
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  onChange={(e) => updateField('dt_nasc', maskDate(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_local_nasc"
                  className="text-xs font-semibold text-slate-700"
                >
                  Local de Nascimento
                </Label>
                <Input
                  id="pf_edit_local_nasc"
                  value={data.local_nasc || ''}
                  onChange={(e) => updateField('local_nasc', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_uf_nasc" className="text-xs font-semibold text-slate-700">
                  UF Nascimento
                </Label>
                <Input
                  id="pf_edit_uf_nasc"
                  maxLength={2}
                  value={data.uf_nasc || ''}
                  onChange={(e) => updateField('uf_nasc', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_est_civil" className="text-xs font-semibold text-slate-700">
                  Estado Civil
                </Label>
                <Input
                  id="pf_edit_est_civil"
                  value={data.est_civil || ''}
                  onChange={(e) => updateField('est_civil', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_rg" className="text-xs font-semibold text-slate-700">
                  RG
                </Label>
                <Input
                  id="pf_edit_rg"
                  value={data.rg || ''}
                  onChange={(e) => updateField('rg', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_cpf" className="text-xs font-semibold text-slate-700">
                  CPF *
                </Label>
                <Input
                  id="pf_edit_cpf"
                  value={data.cpf || ''}
                  onChange={(e) => updateField('cpf', e.target.value)}
                  required
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pf_edit_pai" className="text-xs font-semibold text-slate-700">
                  Filiação (Pai)
                </Label>
                <Input
                  id="pf_edit_pai"
                  value={data.filiacao_pai || ''}
                  onChange={(e) => updateField('filiacao_pai', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pf_edit_mae" className="text-xs font-semibold text-slate-700">
                  Filiação (Mãe)
                </Label>
                <Input
                  id="pf_edit_mae"
                  value={data.filiacao_mae || ''}
                  onChange={(e) => updateField('filiacao_mae', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="pf_edit_end" className="text-xs font-semibold text-slate-700">
                  Endereço Residencial Atual
                </Label>
                <Input
                  id="pf_edit_end"
                  value={data.endereco || ''}
                  onChange={(e) => updateField('endereco', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_cep" className="text-xs font-semibold text-slate-700">
                  CEP
                </Label>
                <Input
                  id="pf_edit_cep"
                  maxLength={10}
                  value={data.cep || ''}
                  onChange={(e) => updateField('cep', maskCep(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_bairro" className="text-xs font-semibold text-slate-700">
                  Bairro
                </Label>
                <Input
                  id="pf_edit_bairro"
                  value={data.bairro || ''}
                  onChange={(e) => updateField('bairro', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_cidade" className="text-xs font-semibold text-slate-700">
                  Cidade
                </Label>
                <Input
                  id="pf_edit_cidade"
                  value={data.cidade || ''}
                  onChange={(e) => updateField('cidade', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_uf" className="text-xs font-semibold text-slate-700">
                  UF
                </Label>
                <Input
                  id="pf_edit_uf"
                  maxLength={2}
                  value={data.uf || ''}
                  onChange={(e) => updateField('uf', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_fone_res" className="text-xs font-semibold text-slate-700">
                  Telefone Residencial
                </Label>
                <Input
                  id="pf_edit_fone_res"
                  value={data.fone_res || ''}
                  maxLength={15}
                  onChange={(e) => updateField('fone_res', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_celular" className="text-xs font-semibold text-slate-700">
                  Celular / WhatsApp *
                </Label>
                <Input
                  id="pf_edit_celular"
                  value={data.celular || ''}
                  maxLength={15}
                  onChange={(e) => updateField('celular', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_email" className="text-xs font-semibold text-slate-700">
                  E-mail *
                </Label>
                <Input
                  id="pf_edit_email"
                  type="email"
                  value={data.email || ''}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 pt-2 border-t space-y-2">
                <Label className="text-xs font-semibold text-slate-700">
                  Casa Alugada Atualmente?
                </Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <RadioGroup
                    value={
                      data.casa_alugada === 'sim' || data.casa_alugada === true ? 'sim' : 'nao'
                    }
                    onValueChange={(val) => updateField('casa_alugada', val)}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="pf_edit_casa_nao" />
                      <Label htmlFor="pf_edit_casa_nao" className="text-xs cursor-pointer">
                        Não
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="pf_edit_casa_sim" />
                      <Label htmlFor="pf_edit_casa_sim" className="text-xs cursor-pointer">
                        Sim
                      </Label>
                    </div>
                  </RadioGroup>
                  {(data.casa_alugada === 'sim' || data.casa_alugada === true) && (
                    <div className="flex-1 w-full">
                      <Input
                        placeholder="Qual Imobiliária Administra?"
                        value={data.imob_administra || ''}
                        onChange={(e) => updateField('imob_administra', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 2: Empresa Onde Trabalha */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Briefcase className="w-4 h-4 text-primary" />
                2. EMPRESA ONDE TRABALHA
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pf_edit_emp_razao" className="text-xs font-semibold text-slate-700">
                  Razão Social
                </Label>
                <Input
                  id="pf_edit_emp_razao"
                  value={data.empresa_razao_social || ''}
                  onChange={(e) => updateField('empresa_razao_social', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="pf_edit_emp_end" className="text-xs font-semibold text-slate-700">
                  Endereço da Empresa
                </Label>
                <Input
                  id="pf_edit_emp_end"
                  value={data.empresa_endereco || ''}
                  onChange={(e) => updateField('empresa_endereco', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_emp_bairro"
                  className="text-xs font-semibold text-slate-700"
                >
                  Bairro
                </Label>
                <Input
                  id="pf_edit_emp_bairro"
                  value={data.empresa_bairro || ''}
                  onChange={(e) => updateField('empresa_bairro', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_emp_cidade"
                  className="text-xs font-semibold text-slate-700"
                >
                  Cidade
                </Label>
                <Input
                  id="pf_edit_emp_cidade"
                  value={data.empresa_cidade || ''}
                  onChange={(e) => updateField('empresa_cidade', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_emp_uf" className="text-xs font-semibold text-slate-700">
                  UF
                </Label>
                <Input
                  id="pf_edit_emp_uf"
                  maxLength={2}
                  value={data.empresa_uf || ''}
                  onChange={(e) => updateField('empresa_uf', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_emp_ramal" className="text-xs font-semibold text-slate-700">
                  Ramal
                </Label>
                <Input
                  id="pf_edit_emp_ramal"
                  value={data.empresa_ramal || ''}
                  onChange={(e) => updateField('empresa_ramal', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="pf_edit_emp_fones" className="text-xs font-semibold text-slate-700">
                  Telefones da Empresa
                </Label>
                <Input
                  id="pf_edit_emp_fones"
                  value={data.empresa_fones || ''}
                  maxLength={15}
                  onChange={(e) => updateField('empresa_fones', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_emp_salario"
                  className="text-xs font-semibold text-slate-700"
                >
                  Salário (R$)
                </Label>
                <Input
                  id="pf_edit_emp_salario"
                  value={data.empresa_salario || ''}
                  onChange={(e) => updateField('empresa_salario', maskCurrency(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_emp_tempo" className="text-xs font-semibold text-slate-700">
                  Tempo de Firma
                </Label>
                <Input
                  id="pf_edit_emp_tempo"
                  value={data.empresa_tempo_firma || ''}
                  onChange={(e) => updateField('empresa_tempo_firma', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_emp_prof" className="text-xs font-semibold text-slate-700">
                  Profissão / Cargo
                </Label>
                <Input
                  id="pf_edit_emp_prof"
                  value={data.empresa_profissao || ''}
                  onChange={(e) => updateField('empresa_profissao', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 pt-2 border-t space-y-2">
                <Label className="text-xs font-semibold text-slate-700">
                  Possui Outros Rendimentos?
                </Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <RadioGroup
                    value={
                      data.empresa_outros_rendimentos === 'sim' ||
                      data.empresa_outros_rendimentos === true
                        ? 'sim'
                        : 'nao'
                    }
                    onValueChange={(val) => updateField('empresa_outros_rendimentos', val)}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="pf_edit_outros_nao" />
                      <Label htmlFor="pf_edit_outros_nao" className="text-xs cursor-pointer">
                        Não
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="pf_edit_outros_sim" />
                      <Label htmlFor="pf_edit_outros_sim" className="text-xs cursor-pointer">
                        Sim
                      </Label>
                    </div>
                  </RadioGroup>
                  {(data.empresa_outros_rendimentos === 'sim' ||
                    data.empresa_outros_rendimentos === true) && (
                    <div className="flex-1 w-full">
                      <Input
                        placeholder="Quais outros rendimentos e valores?"
                        value={data.empresa_quais_rendimentos || ''}
                        onChange={(e) => updateField('empresa_quais_rendimentos', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 3: Cônjuge */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <HeartHandshake className="w-4 h-4 text-primary" />
                3. DADOS DO ESPOSO(A) / CÔNJUGE (SE HOUVER)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pf_edit_esp_nome" className="text-xs font-semibold text-slate-700">
                  Nome Completo do Cônjuge
                </Label>
                <Input
                  id="pf_edit_esp_nome"
                  value={data.esposo_nome || ''}
                  onChange={(e) => updateField('esposo_nome', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_dt_nasc"
                  className="text-xs font-semibold text-slate-700"
                >
                  Data de Nascimento
                </Label>
                <Input
                  id="pf_edit_esp_dt_nasc"
                  value={data.esposo_dt_nasc || ''}
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  onChange={(e) => updateField('esposo_dt_nasc', maskDate(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_esp_local" className="text-xs font-semibold text-slate-700">
                  Local de Nascimento
                </Label>
                <Input
                  id="pf_edit_esp_local"
                  value={data.esposo_local_nasc || ''}
                  onChange={(e) => updateField('esposo_local_nasc', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_uf_nasc"
                  className="text-xs font-semibold text-slate-700"
                >
                  UF Nasc.
                </Label>
                <Input
                  id="pf_edit_esp_uf_nasc"
                  maxLength={2}
                  value={data.esposo_uf_nasc || ''}
                  onChange={(e) => updateField('esposo_uf_nasc', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_est_civil"
                  className="text-xs font-semibold text-slate-700"
                >
                  Estado Civil
                </Label>
                <Input
                  id="pf_edit_esp_est_civil"
                  value={data.esposo_est_civil || ''}
                  onChange={(e) => updateField('esposo_est_civil', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_esp_rg" className="text-xs font-semibold text-slate-700">
                  RG
                </Label>
                <Input
                  id="pf_edit_esp_rg"
                  value={data.esposo_rg || ''}
                  onChange={(e) => updateField('esposo_rg', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_esp_cpf" className="text-xs font-semibold text-slate-700">
                  CPF
                </Label>
                <Input
                  id="pf_edit_esp_cpf"
                  value={data.esposo_cpf || ''}
                  onChange={(e) => updateField('esposo_cpf', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pf_edit_esp_pai" className="text-xs font-semibold text-slate-700">
                  Filiação (Pai)
                </Label>
                <Input
                  id="pf_edit_esp_pai"
                  value={data.esposo_filiacao_pai || ''}
                  onChange={(e) => updateField('esposo_filiacao_pai', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pf_edit_esp_mae" className="text-xs font-semibold text-slate-700">
                  Filiação (Mãe)
                </Label>
                <Input
                  id="pf_edit_esp_mae"
                  value={data.esposo_filiacao_mae || ''}
                  onChange={(e) => updateField('esposo_filiacao_mae', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="pf_edit_esp_end" className="text-xs font-semibold text-slate-700">
                  Endereço
                </Label>
                <Input
                  id="pf_edit_esp_end"
                  value={data.esposo_endereco || ''}
                  onChange={(e) => updateField('esposo_endereco', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_esp_cep" className="text-xs font-semibold text-slate-700">
                  CEP
                </Label>
                <Input
                  id="pf_edit_esp_cep"
                  maxLength={10}
                  value={data.esposo_cep || ''}
                  onChange={(e) => updateField('esposo_cep', maskCep(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_bairro"
                  className="text-xs font-semibold text-slate-700"
                >
                  Bairro
                </Label>
                <Input
                  id="pf_edit_esp_bairro"
                  value={data.esposo_bairro || ''}
                  onChange={(e) => updateField('esposo_bairro', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_cidade"
                  className="text-xs font-semibold text-slate-700"
                >
                  Cidade
                </Label>
                <Input
                  id="pf_edit_esp_cidade"
                  value={data.esposo_cidade || ''}
                  onChange={(e) => updateField('esposo_cidade', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_esp_uf" className="text-xs font-semibold text-slate-700">
                  UF
                </Label>
                <Input
                  id="pf_edit_esp_uf"
                  maxLength={2}
                  value={data.esposo_uf || ''}
                  onChange={(e) => updateField('esposo_uf', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_esp_fone" className="text-xs font-semibold text-slate-700">
                  Fone Residencial
                </Label>
                <Input
                  id="pf_edit_esp_fone"
                  value={data.esposo_fone_res || ''}
                  maxLength={15}
                  onChange={(e) => updateField('esposo_fone_res', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_esp_cel" className="text-xs font-semibold text-slate-700">
                  Celular
                </Label>
                <Input
                  id="pf_edit_esp_cel"
                  value={data.esposo_celular || ''}
                  maxLength={15}
                  onChange={(e) => updateField('esposo_celular', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_esp_mail" className="text-xs font-semibold text-slate-700">
                  E-mail
                </Label>
                <Input
                  id="pf_edit_esp_mail"
                  type="email"
                  value={data.esposo_email || ''}
                  onChange={(e) => updateField('esposo_email', e.target.value)}
                />
              </div>

              {/* Empresa Cônjuge */}
              <div className="sm:col-span-2 md:col-span-3 pt-3 border-t">
                <p className="text-xs font-bold text-slate-700 uppercase">Empresa do Cônjuge</p>
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_emp_razao"
                  className="text-xs font-semibold text-slate-700"
                >
                  Razão Social
                </Label>
                <Input
                  id="pf_edit_esp_emp_razao"
                  value={data.esposo_empresa_razao_social || ''}
                  onChange={(e) => updateField('esposo_empresa_razao_social', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_emp_end"
                  className="text-xs font-semibold text-slate-700"
                >
                  Endereço da Empresa
                </Label>
                <Input
                  id="pf_edit_esp_emp_end"
                  value={data.esposo_empresa_endereco || ''}
                  onChange={(e) => updateField('esposo_empresa_endereco', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_emp_bairro"
                  className="text-xs font-semibold text-slate-700"
                >
                  Bairro
                </Label>
                <Input
                  id="pf_edit_esp_emp_bairro"
                  value={data.esposo_empresa_bairro || ''}
                  onChange={(e) => updateField('esposo_empresa_bairro', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_emp_cidade"
                  className="text-xs font-semibold text-slate-700"
                >
                  Cidade
                </Label>
                <Input
                  id="pf_edit_esp_emp_cidade"
                  value={data.esposo_empresa_cidade || ''}
                  onChange={(e) => updateField('esposo_empresa_cidade', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_emp_uf"
                  className="text-xs font-semibold text-slate-700"
                >
                  UF
                </Label>
                <Input
                  id="pf_edit_esp_emp_uf"
                  maxLength={2}
                  value={data.esposo_empresa_uf || ''}
                  onChange={(e) => updateField('esposo_empresa_uf', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_emp_ramal"
                  className="text-xs font-semibold text-slate-700"
                >
                  Ramal
                </Label>
                <Input
                  id="pf_edit_esp_emp_ramal"
                  value={data.esposo_empresa_ramal || ''}
                  onChange={(e) => updateField('esposo_empresa_ramal', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_emp_fones"
                  className="text-xs font-semibold text-slate-700"
                >
                  Telefones
                </Label>
                <Input
                  id="pf_edit_esp_emp_fones"
                  value={data.esposo_empresa_fones || ''}
                  maxLength={15}
                  onChange={(e) => updateField('esposo_empresa_fones', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_emp_salario"
                  className="text-xs font-semibold text-slate-700"
                >
                  Salário (R$)
                </Label>
                <Input
                  id="pf_edit_esp_emp_salario"
                  value={data.esposo_empresa_salario || ''}
                  onChange={(e) =>
                    updateField('esposo_empresa_salario', maskCurrency(e.target.value))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_emp_tempo"
                  className="text-xs font-semibold text-slate-700"
                >
                  Tempo de Firma
                </Label>
                <Input
                  id="pf_edit_esp_emp_tempo"
                  value={data.esposo_empresa_tempo_firma || ''}
                  onChange={(e) => updateField('esposo_empresa_tempo_firma', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pf_edit_esp_emp_prof"
                  className="text-xs font-semibold text-slate-700"
                >
                  Profissão
                </Label>
                <Input
                  id="pf_edit_esp_emp_prof"
                  value={data.esposo_empresa_profissao || ''}
                  onChange={(e) => updateField('esposo_empresa_profissao', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Seção 4: Composição Familiar e Animais */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <User className="w-4 h-4 text-primary" />
                4. COMPOSIÇÃO FAMILIAR E ANIMAIS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_moradores" className="text-xs font-semibold text-slate-700">
                  Pessoas que residirão no imóvel (Nome e Idade)
                </Label>
                <Textarea
                  id="pf_edit_moradores"
                  rows={3}
                  value={data.moradores || ''}
                  onChange={(e) => updateField('moradores', e.target.value)}
                />
              </div>

              <div className="pt-2 border-t space-y-2">
                <Label className="text-xs font-semibold text-slate-700">Possui Animais?</Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <RadioGroup
                    value={
                      data.animais_possui === 'sim' || data.animais_possui === true ? 'sim' : 'nao'
                    }
                    onValueChange={(val) => updateField('animais_possui', val)}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="pf_edit_animais_nao" />
                      <Label htmlFor="pf_edit_animais_nao" className="text-xs cursor-pointer">
                        Não
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="pf_edit_animais_sim" />
                      <Label htmlFor="pf_edit_animais_sim" className="text-xs cursor-pointer">
                        Sim
                      </Label>
                    </div>
                  </RadioGroup>
                  {(data.animais_possui === 'sim' || data.animais_possui === true) && (
                    <div className="flex-1 w-full">
                      <Input
                        placeholder="Quais e quantos?"
                        value={data.animais_detalhes || ''}
                        onChange={(e) => updateField('animais_detalhes', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 5: Referências */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Phone className="w-4 h-4 text-primary" />
                5. REFERÊNCIAS (PARENTES OU CONHECIDOS)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_ref_nome" className="text-xs font-semibold text-slate-700">
                  Nome Completo
                </Label>
                <Input
                  id="pf_edit_ref_nome"
                  value={data.referencia_nome || ''}
                  onChange={(e) => updateField('referencia_nome', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pf_edit_ref_fone" className="text-xs font-semibold text-slate-700">
                  Telefone
                </Label>
                <Input
                  id="pf_edit_ref_fone"
                  value={data.referencia_fone || ''}
                  maxLength={15}
                  onChange={(e) => updateField('referencia_fone', maskPhone(e.target.value))}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="pf_edit_ref_end" className="text-xs font-semibold text-slate-700">
                  Endereço
                </Label>
                <Input
                  id="pf_edit_ref_end"
                  value={data.referencia_endereco || ''}
                  onChange={(e) => updateField('referencia_endereco', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* ======================================================== */}
      {/* 2. SEÇÕES DE EDIÇÃO PESSOA JURÍDICA (PJ)                 */}
      {/* ======================================================== */}
      {category === 'PJ' && (
        <>
          {/* Seção 1: Dados da Empresa */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Building2 className="w-4 h-4 text-primary" />
                1. DADOS DA EMPRESA (PESSOA JURÍDICA)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pj_edit_razao" className="text-xs font-semibold text-slate-700">
                  Razão Social *
                </Label>
                <Input
                  id="pj_edit_razao"
                  value={data.razao_social || ''}
                  onChange={(e) => updateField('razao_social', e.target.value)}
                  required
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="pj_edit_fantasia" className="text-xs font-semibold text-slate-700">
                  Nome Fantasia
                </Label>
                <Input
                  id="pj_edit_fantasia"
                  value={data.nome_fantasia || ''}
                  onChange={(e) => updateField('nome_fantasia', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_cnpj" className="text-xs font-semibold text-slate-700">
                  CNPJ *
                </Label>
                <Input
                  id="pj_edit_cnpj"
                  value={data.cnpj || ''}
                  onChange={(e) => updateField('cnpj', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_ie" className="text-xs font-semibold text-slate-700">
                  Inscrição Estadual
                </Label>
                <Input
                  id="pj_edit_ie"
                  value={data.inscr_estadual || ''}
                  onChange={(e) => updateField('inscr_estadual', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="pj_edit_end" className="text-xs font-semibold text-slate-700">
                  Endereço Completo
                </Label>
                <Input
                  id="pj_edit_end"
                  value={data.endereco || ''}
                  onChange={(e) => updateField('endereco', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_cep" className="text-xs font-semibold text-slate-700">
                  CEP
                </Label>
                <Input
                  id="pj_edit_cep"
                  maxLength={10}
                  value={data.cep || ''}
                  onChange={(e) => updateField('cep', maskCep(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_bairro" className="text-xs font-semibold text-slate-700">
                  Bairro
                </Label>
                <Input
                  id="pj_edit_bairro"
                  value={data.bairro || ''}
                  onChange={(e) => updateField('bairro', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_cidade" className="text-xs font-semibold text-slate-700">
                  Cidade
                </Label>
                <Input
                  id="pj_edit_cidade"
                  value={data.cidade || ''}
                  onChange={(e) => updateField('cidade', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_uf" className="text-xs font-semibold text-slate-700">
                  UF
                </Label>
                <Input
                  id="pj_edit_uf"
                  maxLength={2}
                  value={data.uf || ''}
                  onChange={(e) => updateField('uf', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_fones" className="text-xs font-semibold text-slate-700">
                  Telefones *
                </Label>
                <Input
                  id="pj_edit_fones"
                  value={data.fones || ''}
                  maxLength={15}
                  onChange={(e) => updateField('fones', maskPhone(e.target.value))}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="pj_edit_email" className="text-xs font-semibold text-slate-700">
                  E-mail Corporativo *
                </Label>
                <Input
                  id="pj_edit_email"
                  type="email"
                  value={data.email || ''}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_faturamento"
                  className="text-xs font-semibold text-slate-700"
                >
                  Faturamento Mensal (R$)
                </Label>
                <Input
                  id="pj_edit_faturamento"
                  value={data.faturamento || ''}
                  onChange={(e) => updateField('faturamento', maskCurrency(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_tempo" className="text-xs font-semibold text-slate-700">
                  Tempo de Empresa
                </Label>
                <Input
                  id="pj_edit_tempo"
                  value={data.tempo_empresa || ''}
                  onChange={(e) => updateField('tempo_empresa', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_ramo" className="text-xs font-semibold text-slate-700">
                  Ramo de Atividade
                </Label>
                <Input
                  id="pj_edit_ramo"
                  value={data.ramo_atividade || ''}
                  onChange={(e) => updateField('ramo_atividade', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Seção 2: 1º Representante Legal */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <User className="w-4 h-4 text-primary" />
                2. 1º REPRESENTANTE LEGAL
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pj_edit_rep1_nome" className="text-xs font-semibold text-slate-700">
                  Nome Completo
                </Label>
                <Input
                  id="pj_edit_rep1_nome"
                  value={data.rep1_nome || ''}
                  onChange={(e) => updateField('rep1_nome', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep1_dt_nasc"
                  className="text-xs font-semibold text-slate-700"
                >
                  Data de Nascimento
                </Label>
                <Input
                  id="pj_edit_rep1_dt_nasc"
                  value={data.rep1_dt_nasc || ''}
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  onChange={(e) => updateField('rep1_dt_nasc', maskDate(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep1_local"
                  className="text-xs font-semibold text-slate-700"
                >
                  Local Nascimento
                </Label>
                <Input
                  id="pj_edit_rep1_local"
                  value={data.rep1_local_nasc || ''}
                  onChange={(e) => updateField('rep1_local_nasc', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep1_uf_nasc"
                  className="text-xs font-semibold text-slate-700"
                >
                  UF Nasc.
                </Label>
                <Input
                  id="pj_edit_rep1_uf_nasc"
                  maxLength={2}
                  value={data.rep1_uf_nasc || ''}
                  onChange={(e) => updateField('rep1_uf_nasc', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep1_est_civil"
                  className="text-xs font-semibold text-slate-700"
                >
                  Estado Civil
                </Label>
                <Input
                  id="pj_edit_rep1_est_civil"
                  value={data.rep1_est_civil || ''}
                  onChange={(e) => updateField('rep1_est_civil', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep1_rg" className="text-xs font-semibold text-slate-700">
                  RG
                </Label>
                <Input
                  id="pj_edit_rep1_rg"
                  value={data.rep1_rg || ''}
                  onChange={(e) => updateField('rep1_rg', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep1_cpf" className="text-xs font-semibold text-slate-700">
                  CPF
                </Label>
                <Input
                  id="pj_edit_rep1_cpf"
                  value={data.rep1_cpf || ''}
                  onChange={(e) => updateField('rep1_cpf', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pj_edit_rep1_pai" className="text-xs font-semibold text-slate-700">
                  Filiação (Pai)
                </Label>
                <Input
                  id="pj_edit_rep1_pai"
                  value={data.rep1_filiacao_pai || ''}
                  onChange={(e) => updateField('rep1_filiacao_pai', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pj_edit_rep1_mae" className="text-xs font-semibold text-slate-700">
                  Filiação (Mãe)
                </Label>
                <Input
                  id="pj_edit_rep1_mae"
                  value={data.rep1_filiacao_mae || ''}
                  onChange={(e) => updateField('rep1_filiacao_mae', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="pj_edit_rep1_end" className="text-xs font-semibold text-slate-700">
                  Endereço Residencial
                </Label>
                <Input
                  id="pj_edit_rep1_end"
                  value={data.rep1_endereco || ''}
                  onChange={(e) => updateField('rep1_endereco', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep1_cep" className="text-xs font-semibold text-slate-700">
                  CEP
                </Label>
                <Input
                  id="pj_edit_rep1_cep"
                  maxLength={10}
                  value={data.rep1_cep || ''}
                  onChange={(e) => updateField('rep1_cep', maskCep(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep1_bairro"
                  className="text-xs font-semibold text-slate-700"
                >
                  Bairro
                </Label>
                <Input
                  id="pj_edit_rep1_bairro"
                  value={data.rep1_bairro || ''}
                  onChange={(e) => updateField('rep1_bairro', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep1_cidade"
                  className="text-xs font-semibold text-slate-700"
                >
                  Cidade
                </Label>
                <Input
                  id="pj_edit_rep1_cidade"
                  value={data.rep1_cidade || ''}
                  onChange={(e) => updateField('rep1_cidade', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep1_uf" className="text-xs font-semibold text-slate-700">
                  UF
                </Label>
                <Input
                  id="pj_edit_rep1_uf"
                  maxLength={2}
                  value={data.rep1_uf || ''}
                  onChange={(e) => updateField('rep1_uf', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep1_fone" className="text-xs font-semibold text-slate-700">
                  Fone Residencial
                </Label>
                <Input
                  id="pj_edit_rep1_fone"
                  value={data.rep1_fone_res || ''}
                  maxLength={15}
                  onChange={(e) => updateField('rep1_fone_res', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep1_cel" className="text-xs font-semibold text-slate-700">
                  Celular
                </Label>
                <Input
                  id="pj_edit_rep1_cel"
                  value={data.rep1_celular || ''}
                  maxLength={15}
                  onChange={(e) => updateField('rep1_celular', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep1_mail" className="text-xs font-semibold text-slate-700">
                  E-mail
                </Label>
                <Input
                  id="pj_edit_rep1_mail"
                  type="email"
                  value={data.rep1_email || ''}
                  onChange={(e) => updateField('rep1_email', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep1_salario"
                  className="text-xs font-semibold text-slate-700"
                >
                  Salário / Pró-labore (R$)
                </Label>
                <Input
                  id="pj_edit_rep1_salario"
                  value={data.rep1_salario || ''}
                  onChange={(e) => updateField('rep1_salario', maskCurrency(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep1_tempo"
                  className="text-xs font-semibold text-slate-700"
                >
                  Tempo de Firma
                </Label>
                <Input
                  id="pj_edit_rep1_tempo"
                  value={data.rep1_tempo_firma || ''}
                  onChange={(e) => updateField('rep1_tempo_firma', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep1_prof" className="text-xs font-semibold text-slate-700">
                  Profissão / Cargo
                </Label>
                <Input
                  id="pj_edit_rep1_prof"
                  value={data.rep1_profissao || ''}
                  onChange={(e) => updateField('rep1_profissao', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 pt-2 border-t space-y-2">
                <Label className="text-xs font-semibold text-slate-700">
                  Possui Outros Rendimentos?
                </Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <RadioGroup
                    value={
                      data.rep1_outros_rendimentos === 'sim' ||
                      data.rep1_outros_rendimentos === true
                        ? 'sim'
                        : 'nao'
                    }
                    onValueChange={(val) => updateField('rep1_outros_rendimentos', val)}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="pj_edit_rep1_outros_nao" />
                      <Label htmlFor="pj_edit_rep1_outros_nao" className="text-xs cursor-pointer">
                        Não
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="pj_edit_rep1_outros_sim" />
                      <Label htmlFor="pj_edit_rep1_outros_sim" className="text-xs cursor-pointer">
                        Sim
                      </Label>
                    </div>
                  </RadioGroup>
                  {(data.rep1_outros_rendimentos === 'sim' ||
                    data.rep1_outros_rendimentos === true) && (
                    <div className="flex-1 w-full">
                      <Input
                        placeholder="Quais outros rendimentos?"
                        value={data.rep1_quais_rendimentos || ''}
                        onChange={(e) => updateField('rep1_quais_rendimentos', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 3: 2º Representante Legal */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <User className="w-4 h-4 text-primary" />
                3. 2º REPRESENTANTE LEGAL (SE HOUVER)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pj_edit_rep2_nome" className="text-xs font-semibold text-slate-700">
                  Nome Completo
                </Label>
                <Input
                  id="pj_edit_rep2_nome"
                  value={data.rep2_nome || ''}
                  onChange={(e) => updateField('rep2_nome', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep2_dt_nasc"
                  className="text-xs font-semibold text-slate-700"
                >
                  Data de Nascimento
                </Label>
                <Input
                  id="pj_edit_rep2_dt_nasc"
                  value={data.rep2_dt_nasc || ''}
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  onChange={(e) => updateField('rep2_dt_nasc', maskDate(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep2_local"
                  className="text-xs font-semibold text-slate-700"
                >
                  Local Nascimento
                </Label>
                <Input
                  id="pj_edit_rep2_local"
                  value={data.rep2_local_nasc || ''}
                  onChange={(e) => updateField('rep2_local_nasc', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep2_uf_nasc"
                  className="text-xs font-semibold text-slate-700"
                >
                  UF Nasc.
                </Label>
                <Input
                  id="pj_edit_rep2_uf_nasc"
                  maxLength={2}
                  value={data.rep2_uf_nasc || ''}
                  onChange={(e) => updateField('rep2_uf_nasc', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep2_est_civil"
                  className="text-xs font-semibold text-slate-700"
                >
                  Estado Civil
                </Label>
                <Input
                  id="pj_edit_rep2_est_civil"
                  value={data.rep2_est_civil || ''}
                  onChange={(e) => updateField('rep2_est_civil', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep2_rg" className="text-xs font-semibold text-slate-700">
                  RG
                </Label>
                <Input
                  id="pj_edit_rep2_rg"
                  value={data.rep2_rg || ''}
                  onChange={(e) => updateField('rep2_rg', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep2_cpf" className="text-xs font-semibold text-slate-700">
                  CPF
                </Label>
                <Input
                  id="pj_edit_rep2_cpf"
                  value={data.rep2_cpf || ''}
                  onChange={(e) => updateField('rep2_cpf', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pj_edit_rep2_pai" className="text-xs font-semibold text-slate-700">
                  Filiação (Pai)
                </Label>
                <Input
                  id="pj_edit_rep2_pai"
                  value={data.rep2_filiacao_pai || ''}
                  onChange={(e) => updateField('rep2_filiacao_pai', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="pj_edit_rep2_mae" className="text-xs font-semibold text-slate-700">
                  Filiação (Mãe)
                </Label>
                <Input
                  id="pj_edit_rep2_mae"
                  value={data.rep2_filiacao_mae || ''}
                  onChange={(e) => updateField('rep2_filiacao_mae', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="pj_edit_rep2_end" className="text-xs font-semibold text-slate-700">
                  Endereço Residencial
                </Label>
                <Input
                  id="pj_edit_rep2_end"
                  value={data.rep2_endereco || ''}
                  onChange={(e) => updateField('rep2_endereco', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep2_cep" className="text-xs font-semibold text-slate-700">
                  CEP
                </Label>
                <Input
                  id="pj_edit_rep2_cep"
                  maxLength={10}
                  value={data.rep2_cep || ''}
                  onChange={(e) => updateField('rep2_cep', maskCep(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep2_bairro"
                  className="text-xs font-semibold text-slate-700"
                >
                  Bairro
                </Label>
                <Input
                  id="pj_edit_rep2_bairro"
                  value={data.rep2_bairro || ''}
                  onChange={(e) => updateField('rep2_bairro', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep2_cidade"
                  className="text-xs font-semibold text-slate-700"
                >
                  Cidade
                </Label>
                <Input
                  id="pj_edit_rep2_cidade"
                  value={data.rep2_cidade || ''}
                  onChange={(e) => updateField('rep2_cidade', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep2_uf" className="text-xs font-semibold text-slate-700">
                  UF
                </Label>
                <Input
                  id="pj_edit_rep2_uf"
                  maxLength={2}
                  value={data.rep2_uf || ''}
                  onChange={(e) => updateField('rep2_uf', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep2_fone" className="text-xs font-semibold text-slate-700">
                  Fone Residencial
                </Label>
                <Input
                  id="pj_edit_rep2_fone"
                  value={data.rep2_fone_res || ''}
                  maxLength={15}
                  onChange={(e) => updateField('rep2_fone_res', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep2_cel" className="text-xs font-semibold text-slate-700">
                  Celular
                </Label>
                <Input
                  id="pj_edit_rep2_cel"
                  value={data.rep2_celular || ''}
                  maxLength={15}
                  onChange={(e) => updateField('rep2_celular', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep2_mail" className="text-xs font-semibold text-slate-700">
                  E-mail
                </Label>
                <Input
                  id="pj_edit_rep2_mail"
                  type="email"
                  value={data.rep2_email || ''}
                  onChange={(e) => updateField('rep2_email', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep2_salario"
                  className="text-xs font-semibold text-slate-700"
                >
                  Salário / Pró-labore (R$)
                </Label>
                <Input
                  id="pj_edit_rep2_salario"
                  value={data.rep2_salario || ''}
                  onChange={(e) => updateField('rep2_salario', maskCurrency(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pj_edit_rep2_tempo"
                  className="text-xs font-semibold text-slate-700"
                >
                  Tempo de Firma
                </Label>
                <Input
                  id="pj_edit_rep2_tempo"
                  value={data.rep2_tempo_firma || ''}
                  onChange={(e) => updateField('rep2_tempo_firma', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pj_edit_rep2_prof" className="text-xs font-semibold text-slate-700">
                  Profissão / Cargo
                </Label>
                <Input
                  id="pj_edit_rep2_prof"
                  value={data.rep2_profissao || ''}
                  onChange={(e) => updateField('rep2_profissao', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Seção 4: Finalidade da Locação */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Building2 className="w-4 h-4 text-primary" />
                4. FINALIDADE DA LOCAÇÃO E USO DO IMÓVEL
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-slate-700">
                  Finalidade do Imóvel:
                </Label>
                <RadioGroup
                  value={data.finalidade_tipo || 'comercial'}
                  onValueChange={(val) => updateField('finalidade_tipo', val)}
                  className="flex items-center gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comercial" id="pj_edit_fin_comercial" />
                    <Label
                      htmlFor="pj_edit_fin_comercial"
                      className="text-xs font-semibold cursor-pointer"
                    >
                      Uso Comercial
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="residencial" id="pj_edit_fin_residencial" />
                    <Label
                      htmlFor="pj_edit_fin_residencial"
                      className="text-xs font-semibold cursor-pointer"
                    >
                      Uso Residencial
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {data.finalidade_tipo === 'comercial' ? (
                <div className="space-y-1.5">
                  <Label
                    htmlFor="pj_edit_comercial_nome"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Nome do Estabelecimento Comercial:
                  </Label>
                  <Input
                    id="pj_edit_comercial_nome"
                    value={data.comercial_estabelecimento || ''}
                    onChange={(e) => updateField('comercial_estabelecimento', e.target.value)}
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <Label
                    htmlFor="pj_edit_res_moradores"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Citar nome e idade da(s) pessoa(s) que irá(ão) residir no imóvel:
                  </Label>
                  <Textarea
                    id="pj_edit_res_moradores"
                    rows={3}
                    value={data.residencial_moradores || ''}
                    onChange={(e) => updateField('residencial_moradores', e.target.value)}
                  />
                </div>
              )}

              <div className="pt-2 border-t space-y-2">
                <Label className="text-xs font-semibold text-slate-700">Possui Animais?</Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <RadioGroup
                    value={
                      data.animais_possui === 'sim' || data.animais_possui === true ? 'sim' : 'nao'
                    }
                    onValueChange={(val) => updateField('animais_possui', val)}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="pj_edit_animais_nao" />
                      <Label htmlFor="pj_edit_animais_nao" className="text-xs cursor-pointer">
                        Não
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="pj_edit_animais_sim" />
                      <Label htmlFor="pj_edit_animais_sim" className="text-xs cursor-pointer">
                        Sim
                      </Label>
                    </div>
                  </RadioGroup>
                  {(data.animais_possui === 'sim' || data.animais_possui === true) && (
                    <div className="flex-1 w-full">
                      <Input
                        placeholder="Quais e quantos?"
                        value={data.animais_detalhes || ''}
                        onChange={(e) => updateField('animais_detalhes', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* ======================================================== */}
      {/* 3. SEÇÕES DE EDIÇÃO FIADOR                               */}
      {/* ======================================================== */}
      {category === 'FIADOR' && (
        <>
          {/* Seção 1: Dados Pessoais do Fiador */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Shield className="w-4 h-4 text-primary" />
                1. DADOS PESSOAIS DO FIADOR(A)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="fia_edit_nome" className="text-xs font-semibold text-slate-700">
                  Nome Completo *
                </Label>
                <Input
                  id="fia_edit_nome"
                  value={data.nome || ''}
                  onChange={(e) => updateField('nome', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_dt_nasc" className="text-xs font-semibold text-slate-700">
                  Data de Nascimento
                </Label>
                <Input
                  id="fia_edit_dt_nasc"
                  value={data.dt_nasc || ''}
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  onChange={(e) => updateField('dt_nasc', maskDate(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_local_nasc"
                  className="text-xs font-semibold text-slate-700"
                >
                  Local Nascimento
                </Label>
                <Input
                  id="fia_edit_local_nasc"
                  value={data.local_nasc || ''}
                  onChange={(e) => updateField('local_nasc', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_uf_nasc" className="text-xs font-semibold text-slate-700">
                  UF Nasc.
                </Label>
                <Input
                  id="fia_edit_uf_nasc"
                  maxLength={2}
                  value={data.uf_nasc || ''}
                  onChange={(e) => updateField('uf_nasc', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_est_civil"
                  className="text-xs font-semibold text-slate-700"
                >
                  Estado Civil
                </Label>
                <Input
                  id="fia_edit_est_civil"
                  value={data.est_civil || ''}
                  onChange={(e) => updateField('est_civil', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_rg" className="text-xs font-semibold text-slate-700">
                  RG
                </Label>
                <Input
                  id="fia_edit_rg"
                  value={data.rg || ''}
                  onChange={(e) => updateField('rg', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_cpf" className="text-xs font-semibold text-slate-700">
                  CPF *
                </Label>
                <Input
                  id="fia_edit_cpf"
                  value={data.cpf || ''}
                  onChange={(e) => updateField('cpf', e.target.value)}
                  required
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="fia_edit_pai" className="text-xs font-semibold text-slate-700">
                  Filiação (Pai)
                </Label>
                <Input
                  id="fia_edit_pai"
                  value={data.filiacao_pai || ''}
                  onChange={(e) => updateField('filiacao_pai', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="fia_edit_mae" className="text-xs font-semibold text-slate-700">
                  Filiação (Mãe)
                </Label>
                <Input
                  id="fia_edit_mae"
                  value={data.filiacao_mae || ''}
                  onChange={(e) => updateField('filiacao_mae', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="fia_edit_end" className="text-xs font-semibold text-slate-700">
                  Endereço Residencial Atual
                </Label>
                <Input
                  id="fia_edit_end"
                  value={data.endereco || ''}
                  onChange={(e) => updateField('endereco', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_cep" className="text-xs font-semibold text-slate-700">
                  CEP
                </Label>
                <Input
                  id="fia_edit_cep"
                  maxLength={10}
                  value={data.cep || ''}
                  onChange={(e) => updateField('cep', maskCep(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_bairro" className="text-xs font-semibold text-slate-700">
                  Bairro
                </Label>
                <Input
                  id="fia_edit_bairro"
                  value={data.bairro || ''}
                  onChange={(e) => updateField('bairro', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_cidade" className="text-xs font-semibold text-slate-700">
                  Cidade
                </Label>
                <Input
                  id="fia_edit_cidade"
                  value={data.cidade || ''}
                  onChange={(e) => updateField('cidade', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_uf" className="text-xs font-semibold text-slate-700">
                  UF
                </Label>
                <Input
                  id="fia_edit_uf"
                  maxLength={2}
                  value={data.uf || ''}
                  onChange={(e) => updateField('uf', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_fone_res" className="text-xs font-semibold text-slate-700">
                  Telefone Residencial
                </Label>
                <Input
                  id="fia_edit_fone_res"
                  value={data.fone_res || ''}
                  maxLength={15}
                  onChange={(e) => updateField('fone_res', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_celular" className="text-xs font-semibold text-slate-700">
                  Celular / WhatsApp *
                </Label>
                <Input
                  id="fia_edit_celular"
                  value={data.celular || ''}
                  maxLength={15}
                  onChange={(e) => updateField('celular', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_email" className="text-xs font-semibold text-slate-700">
                  E-mail *
                </Label>
                <Input
                  id="fia_edit_email"
                  type="email"
                  value={data.email || ''}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 pt-2 border-t space-y-2">
                <Label className="text-xs font-semibold text-slate-700">
                  Casa Alugada Atualmente?
                </Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <RadioGroup
                    value={
                      data.casa_alugada === 'sim' || data.casa_alugada === true ? 'sim' : 'nao'
                    }
                    onValueChange={(val) => updateField('casa_alugada', val)}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="fia_edit_casa_nao" />
                      <Label htmlFor="fia_edit_casa_nao" className="text-xs cursor-pointer">
                        Não
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="fia_edit_casa_sim" />
                      <Label htmlFor="fia_edit_casa_sim" className="text-xs cursor-pointer">
                        Sim
                      </Label>
                    </div>
                  </RadioGroup>
                  {(data.casa_alugada === 'sim' || data.casa_alugada === true) && (
                    <div className="flex-1 w-full">
                      <Input
                        placeholder="Qual Imobiliária Administra?"
                        value={data.imob_administra || ''}
                        onChange={(e) => updateField('imob_administra', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 2: Empresa Onde Fiador Trabalha */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Briefcase className="w-4 h-4 text-primary" />
                2. EMPRESA ONDE O FIADOR TRABALHA
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label
                  htmlFor="fia_edit_emp_razao"
                  className="text-xs font-semibold text-slate-700"
                >
                  Razão Social
                </Label>
                <Input
                  id="fia_edit_emp_razao"
                  value={data.empresa_razao_social || ''}
                  onChange={(e) => updateField('empresa_razao_social', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="fia_edit_emp_end" className="text-xs font-semibold text-slate-700">
                  Endereço da Empresa
                </Label>
                <Input
                  id="fia_edit_emp_end"
                  value={data.empresa_endereco || ''}
                  onChange={(e) => updateField('empresa_endereco', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_emp_bairro"
                  className="text-xs font-semibold text-slate-700"
                >
                  Bairro
                </Label>
                <Input
                  id="fia_edit_emp_bairro"
                  value={data.empresa_bairro || ''}
                  onChange={(e) => updateField('empresa_bairro', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_emp_cidade"
                  className="text-xs font-semibold text-slate-700"
                >
                  Cidade
                </Label>
                <Input
                  id="fia_edit_emp_cidade"
                  value={data.empresa_cidade || ''}
                  onChange={(e) => updateField('empresa_cidade', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_emp_uf" className="text-xs font-semibold text-slate-700">
                  UF
                </Label>
                <Input
                  id="fia_edit_emp_uf"
                  maxLength={2}
                  value={data.empresa_uf || ''}
                  onChange={(e) => updateField('empresa_uf', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_emp_ramal"
                  className="text-xs font-semibold text-slate-700"
                >
                  Ramal
                </Label>
                <Input
                  id="fia_edit_emp_ramal"
                  value={data.empresa_ramal || ''}
                  onChange={(e) => updateField('empresa_ramal', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label
                  htmlFor="fia_edit_emp_fones"
                  className="text-xs font-semibold text-slate-700"
                >
                  Telefones da Empresa
                </Label>
                <Input
                  id="fia_edit_emp_fones"
                  value={data.empresa_fones || ''}
                  maxLength={15}
                  onChange={(e) => updateField('empresa_fones', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_emp_salario"
                  className="text-xs font-semibold text-slate-700"
                >
                  Salário (R$)
                </Label>
                <Input
                  id="fia_edit_emp_salario"
                  value={data.empresa_salario || ''}
                  onChange={(e) => updateField('empresa_salario', maskCurrency(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_emp_tempo"
                  className="text-xs font-semibold text-slate-700"
                >
                  Tempo de Firma
                </Label>
                <Input
                  id="fia_edit_emp_tempo"
                  value={data.empresa_tempo_firma || ''}
                  onChange={(e) => updateField('empresa_tempo_firma', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_emp_prof" className="text-xs font-semibold text-slate-700">
                  Profissão
                </Label>
                <Input
                  id="fia_edit_emp_prof"
                  value={data.empresa_profissao || ''}
                  onChange={(e) => updateField('empresa_profissao', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 pt-2 border-t space-y-2">
                <Label className="text-xs font-semibold text-slate-700">
                  Possui Outros Rendimentos?
                </Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <RadioGroup
                    value={
                      data.empresa_outros_rendimentos === 'sim' ||
                      data.empresa_outros_rendimentos === true
                        ? 'sim'
                        : 'nao'
                    }
                    onValueChange={(val) => updateField('empresa_outros_rendimentos', val)}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="fia_edit_outros_nao" />
                      <Label htmlFor="fia_edit_outros_nao" className="text-xs cursor-pointer">
                        Não
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="fia_edit_outros_sim" />
                      <Label htmlFor="fia_edit_outros_sim" className="text-xs cursor-pointer">
                        Sim
                      </Label>
                    </div>
                  </RadioGroup>
                  {(data.empresa_outros_rendimentos === 'sim' ||
                    data.empresa_outros_rendimentos === true) && (
                    <div className="flex-1 w-full">
                      <Input
                        placeholder="Quais outros rendimentos?"
                        value={data.empresa_quais_rendimentos || ''}
                        onChange={(e) => updateField('empresa_quais_rendimentos', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 3: Esposo(a) Fiador */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <HeartHandshake className="w-4 h-4 text-primary" />
                3. DADOS DO ESPOSO(A) DO FIADOR (SE HOUVER)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="fia_edit_esp_nome" className="text-xs font-semibold text-slate-700">
                  Nome Completo
                </Label>
                <Input
                  id="fia_edit_esp_nome"
                  value={data.esposo_nome || ''}
                  onChange={(e) => updateField('esposo_nome', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_dt_nasc"
                  className="text-xs font-semibold text-slate-700"
                >
                  Data de Nascimento
                </Label>
                <Input
                  id="fia_edit_esp_dt_nasc"
                  value={data.esposo_dt_nasc || ''}
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  onChange={(e) => updateField('esposo_dt_nasc', maskDate(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_local"
                  className="text-xs font-semibold text-slate-700"
                >
                  Local Nascimento
                </Label>
                <Input
                  id="fia_edit_esp_local"
                  value={data.esposo_local_nasc || ''}
                  onChange={(e) => updateField('esposo_local_nasc', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_uf_nasc"
                  className="text-xs font-semibold text-slate-700"
                >
                  UF Nasc.
                </Label>
                <Input
                  id="fia_edit_esp_uf_nasc"
                  maxLength={2}
                  value={data.esposo_uf_nasc || ''}
                  onChange={(e) => updateField('esposo_uf_nasc', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_est_civil"
                  className="text-xs font-semibold text-slate-700"
                >
                  Estado Civil
                </Label>
                <Input
                  id="fia_edit_esp_est_civil"
                  value={data.esposo_est_civil || ''}
                  onChange={(e) => updateField('esposo_est_civil', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_esp_rg" className="text-xs font-semibold text-slate-700">
                  RG
                </Label>
                <Input
                  id="fia_edit_esp_rg"
                  value={data.esposo_rg || ''}
                  onChange={(e) => updateField('esposo_rg', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_esp_cpf" className="text-xs font-semibold text-slate-700">
                  CPF
                </Label>
                <Input
                  id="fia_edit_esp_cpf"
                  value={data.esposo_cpf || ''}
                  onChange={(e) => updateField('esposo_cpf', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="fia_edit_esp_pai" className="text-xs font-semibold text-slate-700">
                  Filiação (Pai)
                </Label>
                <Input
                  id="fia_edit_esp_pai"
                  value={data.esposo_filiacao_pai || ''}
                  onChange={(e) => updateField('esposo_filiacao_pai', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label htmlFor="fia_edit_esp_mae" className="text-xs font-semibold text-slate-700">
                  Filiação (Mãe)
                </Label>
                <Input
                  id="fia_edit_esp_mae"
                  value={data.esposo_filiacao_mae || ''}
                  onChange={(e) => updateField('esposo_filiacao_mae', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="fia_edit_esp_end" className="text-xs font-semibold text-slate-700">
                  Endereço
                </Label>
                <Input
                  id="fia_edit_esp_end"
                  value={data.esposo_endereco || ''}
                  onChange={(e) => updateField('esposo_endereco', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_esp_cep" className="text-xs font-semibold text-slate-700">
                  CEP
                </Label>
                <Input
                  id="fia_edit_esp_cep"
                  maxLength={10}
                  value={data.esposo_cep || ''}
                  onChange={(e) => updateField('esposo_cep', maskCep(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_bairro"
                  className="text-xs font-semibold text-slate-700"
                >
                  Bairro
                </Label>
                <Input
                  id="fia_edit_esp_bairro"
                  value={data.esposo_bairro || ''}
                  onChange={(e) => updateField('esposo_bairro', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_cidade"
                  className="text-xs font-semibold text-slate-700"
                >
                  Cidade
                </Label>
                <Input
                  id="fia_edit_esp_cidade"
                  value={data.esposo_cidade || ''}
                  onChange={(e) => updateField('esposo_cidade', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_esp_uf" className="text-xs font-semibold text-slate-700">
                  UF
                </Label>
                <Input
                  id="fia_edit_esp_uf"
                  maxLength={2}
                  value={data.esposo_uf || ''}
                  onChange={(e) => updateField('esposo_uf', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_esp_fone" className="text-xs font-semibold text-slate-700">
                  Fone Residencial
                </Label>
                <Input
                  id="fia_edit_esp_fone"
                  value={data.esposo_fone_res || ''}
                  maxLength={15}
                  onChange={(e) => updateField('esposo_fone_res', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_esp_cel" className="text-xs font-semibold text-slate-700">
                  Celular
                </Label>
                <Input
                  id="fia_edit_esp_cel"
                  value={data.esposo_celular || ''}
                  maxLength={15}
                  onChange={(e) => updateField('esposo_celular', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_esp_mail" className="text-xs font-semibold text-slate-700">
                  E-mail
                </Label>
                <Input
                  id="fia_edit_esp_mail"
                  type="email"
                  value={data.esposo_email || ''}
                  onChange={(e) => updateField('esposo_email', e.target.value)}
                />
              </div>

              {/* Empresa Cônjuge */}
              <div className="sm:col-span-2 md:col-span-3 pt-3 border-t">
                <p className="text-xs font-bold text-slate-700 uppercase">Empresa do Cônjuge</p>
              </div>

              <div className="sm:col-span-2 md:col-span-3 space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_emp_razao"
                  className="text-xs font-semibold text-slate-700"
                >
                  Razão Social
                </Label>
                <Input
                  id="fia_edit_esp_emp_razao"
                  value={data.esposo_empresa_razao_social || ''}
                  onChange={(e) => updateField('esposo_empresa_razao_social', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_emp_end"
                  className="text-xs font-semibold text-slate-700"
                >
                  Endereço da Empresa
                </Label>
                <Input
                  id="fia_edit_esp_emp_end"
                  value={data.esposo_empresa_endereco || ''}
                  onChange={(e) => updateField('esposo_empresa_endereco', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_emp_bairro"
                  className="text-xs font-semibold text-slate-700"
                >
                  Bairro
                </Label>
                <Input
                  id="fia_edit_esp_emp_bairro"
                  value={data.esposo_empresa_bairro || ''}
                  onChange={(e) => updateField('esposo_empresa_bairro', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_emp_cidade"
                  className="text-xs font-semibold text-slate-700"
                >
                  Cidade
                </Label>
                <Input
                  id="fia_edit_esp_emp_cidade"
                  value={data.esposo_empresa_cidade || ''}
                  onChange={(e) => updateField('esposo_empresa_cidade', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_emp_uf"
                  className="text-xs font-semibold text-slate-700"
                >
                  UF
                </Label>
                <Input
                  id="fia_edit_esp_emp_uf"
                  maxLength={2}
                  value={data.esposo_empresa_uf || ''}
                  onChange={(e) => updateField('esposo_empresa_uf', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_emp_ramal"
                  className="text-xs font-semibold text-slate-700"
                >
                  Ramal
                </Label>
                <Input
                  id="fia_edit_esp_emp_ramal"
                  value={data.esposo_empresa_ramal || ''}
                  onChange={(e) => updateField('esposo_empresa_ramal', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_emp_fones"
                  className="text-xs font-semibold text-slate-700"
                >
                  Telefones
                </Label>
                <Input
                  id="fia_edit_esp_emp_fones"
                  value={data.esposo_empresa_fones || ''}
                  maxLength={15}
                  onChange={(e) => updateField('esposo_empresa_fones', maskPhone(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_emp_salario"
                  className="text-xs font-semibold text-slate-700"
                >
                  Salário (R$)
                </Label>
                <Input
                  id="fia_edit_esp_emp_salario"
                  value={data.esposo_empresa_salario || ''}
                  onChange={(e) =>
                    updateField('esposo_empresa_salario', maskCurrency(e.target.value))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_emp_tempo"
                  className="text-xs font-semibold text-slate-700"
                >
                  Tempo de Firma
                </Label>
                <Input
                  id="fia_edit_esp_emp_tempo"
                  value={data.esposo_empresa_tempo_firma || ''}
                  onChange={(e) => updateField('esposo_empresa_tempo_firma', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fia_edit_esp_emp_prof"
                  className="text-xs font-semibold text-slate-700"
                >
                  Profissão
                </Label>
                <Input
                  id="fia_edit_esp_emp_prof"
                  value={data.esposo_empresa_profissao || ''}
                  onChange={(e) => updateField('esposo_empresa_profissao', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Seção 4: Referências Fiador */}
          <Card className="border shadow-sm">
            <CardHeader className="bg-slate-50/80 border-b py-3 px-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                <Phone className="w-4 h-4 text-primary" />
                4. REFERÊNCIAS (PARENTES OU CONHECIDOS)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_ref_nome" className="text-xs font-semibold text-slate-700">
                  Nome Completo
                </Label>
                <Input
                  id="fia_edit_ref_nome"
                  value={data.referencia_nome || ''}
                  onChange={(e) => updateField('referencia_nome', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fia_edit_ref_fone" className="text-xs font-semibold text-slate-700">
                  Telefone
                </Label>
                <Input
                  id="fia_edit_ref_fone"
                  value={data.referencia_fone || ''}
                  maxLength={15}
                  onChange={(e) => updateField('referencia_fone', maskPhone(e.target.value))}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="fia_edit_ref_end" className="text-xs font-semibold text-slate-700">
                  Endereço
                </Label>
                <Input
                  id="fia_edit_ref_end"
                  value={data.referencia_endereco || ''}
                  onChange={(e) => updateField('referencia_endereco', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Botões Inferiores */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={saving}
          className="border-slate-300 text-slate-700 hover:bg-slate-100"
        >
          <X className="w-4 h-4 mr-1.5" />
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={saving}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 shadow-sm"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              Salvando Alterações...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-1.5" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
export default CandidateEditForm
