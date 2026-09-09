import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, Building, Send, Loader2, AlertCircle } from 'lucide-react'
import { maskDate, maskCurrency, maskCep, maskPhone } from '@/lib/masks'

type FormType = 'pf' | 'pj' | 'fiador'

export default function PublicApplication() {
  const { type } = useParams<{ type: string }>()
  const normalizedType: FormType =
    type?.toLowerCase() === 'pj' ? 'pj' : type?.toLowerCase() === 'fiador' ? 'fiador' : 'pf'

  const [logo, setLogo] = useState<string | null>(null)
  const [agencyName, setAgencyName] = useState<string>('Imobiliária')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Campos PF
  const [pf, setPf] = useState({
    nome: '',
    dt_nasc: '',
    local_nasc: '',
    uf_nasc: '',
    est_civil: '',
    rg: '',
    cpf: '',
    filiacao_pai: '',
    filiacao_mae: '',
    endereco: '',
    cep: '',
    bairro: '',
    cidade: '',
    uf: '',
    fone_res: '',
    celular: '',
    email: '',
    casa_alugada: 'nao',
    imob_administra: '',
    empresa_razao_social: '',
    empresa_endereco: '',
    empresa_bairro: '',
    empresa_cidade: '',
    empresa_uf: '',
    empresa_fones: '',
    empresa_ramal: '',
    empresa_salario: '',
    empresa_tempo_firma: '',
    empresa_profissao: '',
    empresa_outros_rendimentos: 'nao',
    empresa_quais_rendimentos: '',
    esposo_nome: '',
    esposo_dt_nasc: '',
    esposo_local_nasc: '',
    esposo_uf_nasc: '',
    esposo_est_civil: '',
    esposo_rg: '',
    esposo_cpf: '',
    esposo_filiacao_pai: '',
    esposo_filiacao_mae: '',
    esposo_endereco: '',
    esposo_cep: '',
    esposo_bairro: '',
    esposo_cidade: '',
    esposo_uf: '',
    esposo_fone_res: '',
    esposo_celular: '',
    esposo_email: '',
    esposo_casa_alugada: 'nao',
    esposo_imob_administra: '',
    esposo_empresa_razao_social: '',
    esposo_empresa_endereco: '',
    esposo_empresa_bairro: '',
    esposo_empresa_cidade: '',
    esposo_empresa_uf: '',
    esposo_empresa_fones: '',
    esposo_empresa_ramal: '',
    esposo_empresa_salario: '',
    esposo_empresa_tempo_firma: '',
    esposo_empresa_profissao: '',
    esposo_empresa_outros_rendimentos: 'nao',
    esposo_empresa_quais_rendimentos: '',
    moradores: '',
    animais_possui: 'nao',
    animais_detalhes: '',
    referencia_nome: '',
    referencia_fone: '',
    referencia_endereco: '',
    declaracao_aceite: false,
  })

  // Campos PJ
  const [pj, setPj] = useState({
    razao_social: '',
    nome_fantasia: '',
    cnpj: '',
    inscr_estadual: '',
    endereco: '',
    cep: '',
    bairro: '',
    cidade: '',
    uf: '',
    fones: '',
    email: '',
    faturamento: '',
    tempo_empresa: '',
    ramo_atividade: '',
    rep1_nome: '',
    rep1_dt_nasc: '',
    rep1_local_nasc: '',
    rep1_uf_nasc: '',
    rep1_est_civil: '',
    rep1_rg: '',
    rep1_cpf: '',
    rep1_filiacao_pai: '',
    rep1_filiacao_mae: '',
    rep1_endereco: '',
    rep1_cep: '',
    rep1_bairro: '',
    rep1_cidade: '',
    rep1_uf: '',
    rep1_fone_res: '',
    rep1_celular: '',
    rep1_email: '',
    rep1_salario: '',
    rep1_tempo_firma: '',
    rep1_profissao: '',
    rep1_outros_rendimentos: 'nao',
    rep1_quais_rendimentos: '',
    rep2_nome: '',
    rep2_dt_nasc: '',
    rep2_local_nasc: '',
    rep2_uf_nasc: '',
    rep2_est_civil: '',
    rep2_rg: '',
    rep2_cpf: '',
    rep2_filiacao_pai: '',
    rep2_filiacao_mae: '',
    rep2_endereco: '',
    rep2_cep: '',
    rep2_bairro: '',
    rep2_cidade: '',
    rep2_uf: '',
    rep2_fone_res: '',
    rep2_celular: '',
    rep2_email: '',
    rep2_salario: '',
    rep2_tempo_firma: '',
    rep2_profissao: '',
    rep2_outros_rendimentos: 'nao',
    rep2_quais_rendimentos: '',
    finalidade_tipo: 'comercial',
    comercial_estabelecimento: '',
    residencial_moradores: '',
    animais_possui: 'nao',
    animais_detalhes: '',
    declaracao_aceite: false,
  })

  // Campos Fiador
  const [fiador, setFiador] = useState({
    nome: '',
    dt_nasc: '',
    local_nasc: '',
    uf_nasc: '',
    est_civil: '',
    rg: '',
    cpf: '',
    filiacao_pai: '',
    filiacao_mae: '',
    endereco: '',
    cep: '',
    bairro: '',
    cidade: '',
    uf: '',
    fone_res: '',
    celular: '',
    email: '',
    casa_alugada: 'nao',
    imob_administra: '',
    empresa_razao_social: '',
    empresa_endereco: '',
    empresa_bairro: '',
    empresa_cidade: '',
    empresa_uf: '',
    empresa_fones: '',
    empresa_ramal: '',
    empresa_salario: '',
    empresa_tempo_firma: '',
    empresa_profissao: '',
    empresa_outros_rendimentos: 'nao',
    empresa_quais_rendimentos: '',
    esposo_nome: '',
    esposo_dt_nasc: '',
    esposo_local_nasc: '',
    esposo_uf_nasc: '',
    esposo_est_civil: '',
    esposo_rg: '',
    esposo_cpf: '',
    esposo_filiacao_pai: '',
    esposo_filiacao_mae: '',
    esposo_endereco: '',
    esposo_cep: '',
    esposo_bairro: '',
    esposo_cidade: '',
    esposo_uf: '',
    esposo_fone_res: '',
    esposo_celular: '',
    esposo_email: '',
    esposo_casa_alugada: 'nao',
    esposo_imob_administra: '',
    esposo_empresa_razao_social: '',
    esposo_empresa_endereco: '',
    esposo_empresa_bairro: '',
    esposo_empresa_cidade: '',
    esposo_empresa_uf: '',
    esposo_empresa_fones: '',
    esposo_empresa_ramal: '',
    esposo_empresa_salario: '',
    esposo_empresa_tempo_firma: '',
    esposo_empresa_profissao: '',
    esposo_empresa_outros_rendimentos: 'nao',
    esposo_empresa_quais_rendimentos: '',
    referencia_nome: '',
    referencia_fone: '',
    referencia_endereco: '',
    declaracao_aceite: false,
  })

  // Carrega logomarca e nome da imobiliária de app_settings
  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from('app_settings')
          .select('agency_profile')
          .limit(1)
          .maybeSingle()

        if (!error && data?.agency_profile) {
          const ap = (data.agency_profile as any)?.agencyProfile || data.agency_profile
          if (ap?.logo) setLogo(ap.logo)
          if (ap?.name) setAgencyName(ap.name)
        }
      } catch (e) {
        console.error('Falha ao carregar logo pública:', e)
      }
    }
    loadSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (normalizedType === 'pf') {
      if (!pf.nome.trim()) {
        setErrorMsg('Por favor, informe seu nome completo.')
        return
      }
      if (!pf.cpf.trim()) {
        setErrorMsg('Por favor, informe seu CPF.')
        return
      }
      if (!pf.declaracao_aceite) {
        setErrorMsg('É obrigatório aceitar o termo de veracidade das informações.')
        return
      }
    } else if (normalizedType === 'pj') {
      if (!pj.razao_social.trim()) {
        setErrorMsg('Por favor, informe a Razão Social da empresa.')
        return
      }
      if (!pj.cnpj.trim()) {
        setErrorMsg('Por favor, informe o CNPJ da empresa.')
        return
      }
      if (!pj.declaracao_aceite) {
        setErrorMsg('É obrigatório aceitar o termo de veracidade das informações.')
        return
      }
    } else if (normalizedType === 'fiador') {
      if (!fiador.nome.trim()) {
        setErrorMsg('Por favor, informe o nome completo do fiador.')
        return
      }
      if (!fiador.cpf.trim()) {
        setErrorMsg('Por favor, informe o CPF do fiador.')
        return
      }
      if (!fiador.declaracao_aceite) {
        setErrorMsg('É obrigatório aceitar o termo de veracidade das informações.')
        return
      }
    }

    setSubmitting(true)
    try {
      let payload: any = {}

      if (normalizedType === 'pf') {
        payload = {
          full_name: pf.nome.trim(),
          cpf: pf.cpf.trim(),
          email: pf.email.trim() || null,
          phone: pf.celular.trim() || pf.fone_res.trim() || null,
          address: pf.endereco.trim()
            ? `${pf.endereco.trim()}, ${pf.bairro.trim()} - ${pf.cidade.trim()}/${pf.uf.trim()} - CEP: ${pf.cep.trim()}`
            : null,
          category: 'PF',
          status: 'Novo',
          form_data: {
            ...pf,
            tipo_formulario: 'Ficha Cadastral Locatários (PF)',
            origem: 'formulario_publico_ged',
            data_envio: new Date().toISOString(),
          },
        }
      } else if (normalizedType === 'pj') {
        payload = {
          full_name: pj.razao_social.trim(),
          cnpj: pj.cnpj.trim(),
          email: pj.email.trim() || null,
          phone: pj.fones.trim() || null,
          address: pj.endereco.trim()
            ? `${pj.endereco.trim()}, ${pj.bairro.trim()} - ${pj.cidade.trim()}/${pj.uf.trim()} - CEP: ${pj.cep.trim()}`
            : null,
          category: 'PJ',
          status: 'Novo',
          form_data: {
            ...pj,
            tipo_formulario: 'Ficha Locatário - Jurídico (PJ)',
            origem: 'formulario_publico_ged',
            data_envio: new Date().toISOString(),
          },
        }
      } else {
        payload = {
          full_name: fiador.nome.trim(),
          cpf: fiador.cpf.trim(),
          email: fiador.email.trim() || null,
          phone: fiador.celular.trim() || fiador.fone_res.trim() || null,
          address: fiador.endereco.trim()
            ? `${fiador.endereco.trim()}, ${fiador.bairro.trim()} - ${fiador.cidade.trim()}/${fiador.uf.trim()} - CEP: ${fiador.cep.trim()}`
            : null,
          category: 'Fiador',
          status: 'Novo',
          form_data: {
            ...fiador,
            tipo_formulario: 'Ficha Fiador',
            origem: 'formulario_publico_ged',
            data_envio: new Date().toISOString(),
          },
        }
      }

      const { error } = await supabase.from('pre_registrations').insert(payload)
      if (error) throw error

      setSubmitted(true)
    } catch (err: any) {
      console.error('Erro ao enviar formulário:', err)
      setErrorMsg(err.message || 'Ocorreu um erro ao enviar sua ficha cadastral. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const titles = {
    pf: 'FICHA CADASTRAL LOCATÁRIOS (PESSOA FÍSICA)',
    pj: 'FICHA CADASTRAL LOCATÁRIOS (PESSOA JURÍDICA)',
    fiador: 'FICHA CADASTRAL DO FIADOR',
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-lg border-emerald-200">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl text-slate-800">Ficha Enviada com Sucesso!</CardTitle>
            <CardDescription className="text-base text-slate-600 mt-2">
              Seus dados foram recebidos pela equipe de locação da {agencyName}.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pt-4 space-y-4 text-sm text-slate-600">
            <p>
              Nossa equipe iniciará a análise cadastral e entrará em contato em breve caso seja
              necessário algum documento adicional.
            </p>
            <div className="p-3 bg-slate-100 rounded-md text-xs text-slate-500">
              Você já pode fechar esta página com segurança.
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Topo com Logo e Título */}
        <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center text-center gap-4">
          <div className="h-20 w-48 bg-white flex items-center justify-center p-2 rounded-md border border-slate-100">
            {logo ? (
              <img src={logo} alt={agencyName} className="max-h-full max-w-full object-contain" />
            ) : (
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <Building className="w-8 h-8" />
                <span>{agencyName}</span>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {titles[normalizedType]}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Preencha todos os campos abaixo com atenção. Os dados são confidenciais e protegidos.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <span className="text-sm font-medium">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ======================= FORMULÁRIO PF ======================= */}
          {normalizedType === 'pf' && (
            <>
              {/* Seção: Locatários (Dados Pessoais) */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">
                    1. Dados Pessoais do Locatário
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="pf_nome">Nome Completo *</Label>
                    <Input
                      id="pf_nome"
                      value={pf.nome}
                      onChange={(e) => setPf({ ...pf, nome: e.target.value })}
                      required
                      placeholder="Nome completo do pretendente"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pf_dt_nasc">Data de Nascimento</Label>
                    <Input
                      id="pf_dt_nasc"
                      type="text"
                      placeholder="DD/MM/AAAA"
                      maxLength={10}
                      value={pf.dt_nasc}
                      onChange={(e) => setPf({ ...pf, dt_nasc: maskDate(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_local_nasc">Local de Nascimento</Label>
                    <Input
                      id="pf_local_nasc"
                      value={pf.local_nasc}
                      onChange={(e) => setPf({ ...pf, local_nasc: e.target.value })}
                      placeholder="Cidade"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_uf_nasc">UF Nasc.</Label>
                    <Input
                      id="pf_uf_nasc"
                      maxLength={2}
                      value={pf.uf_nasc}
                      onChange={(e) => setPf({ ...pf, uf_nasc: e.target.value.toUpperCase() })}
                      placeholder="SP"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pf_est_civil">Estado Civil</Label>
                    <Input
                      id="pf_est_civil"
                      value={pf.est_civil}
                      onChange={(e) => setPf({ ...pf, est_civil: e.target.value })}
                      placeholder="Solteiro(a), Casado(a)..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_rg">RG</Label>
                    <Input
                      id="pf_rg"
                      value={pf.rg}
                      onChange={(e) => setPf({ ...pf, rg: e.target.value })}
                      placeholder="00.000.000-0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_cpf">CPF *</Label>
                    <Input
                      id="pf_cpf"
                      value={pf.cpf}
                      onChange={(e) => setPf({ ...pf, cpf: e.target.value })}
                      required
                      placeholder="000.000.000-00"
                    />
                  </div>

                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="pf_filiacao_pai">Filiação: Pai</Label>
                    <Input
                      id="pf_filiacao_pai"
                      value={pf.filiacao_pai}
                      onChange={(e) => setPf({ ...pf, filiacao_pai: e.target.value })}
                      placeholder="Nome completo do pai"
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="pf_filiacao_mae">Filiação: Mãe</Label>
                    <Input
                      id="pf_filiacao_mae"
                      value={pf.filiacao_mae}
                      onChange={(e) => setPf({ ...pf, filiacao_mae: e.target.value })}
                      placeholder="Nome completo da mãe"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="pf_endereco">Endereço Residencial Atual</Label>
                    <Input
                      id="pf_endereco"
                      value={pf.endereco}
                      onChange={(e) => setPf({ ...pf, endereco: e.target.value })}
                      placeholder="Rua, Av, Número, Complemento"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_cep">CEP</Label>
                    <Input
                      id="pf_cep"
                      value={pf.cep}
                      maxLength={10}
                      onChange={(e) => setPf({ ...pf, cep: maskCep(e.target.value) })}
                      placeholder="00.000-000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pf_bairro">Bairro</Label>
                    <Input
                      id="pf_bairro"
                      value={pf.bairro}
                      onChange={(e) => setPf({ ...pf, bairro: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_cidade">Cidade</Label>
                    <Input
                      id="pf_cidade"
                      value={pf.cidade}
                      onChange={(e) => setPf({ ...pf, cidade: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_uf">UF</Label>
                    <Input
                      id="pf_uf"
                      maxLength={2}
                      value={pf.uf}
                      onChange={(e) => setPf({ ...pf, uf: e.target.value.toUpperCase() })}
                      placeholder="SP"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pf_fone_res">Telefone Residencial</Label>
                    <Input
                      id="pf_fone_res"
                      value={pf.fone_res}
                      maxLength={15}
                      onChange={(e) => setPf({ ...pf, fone_res: maskPhone(e.target.value) })}
                      placeholder="(00) 0000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_celular">Celular / WhatsApp *</Label>
                    <Input
                      id="pf_celular"
                      value={pf.celular}
                      maxLength={15}
                      onChange={(e) => setPf({ ...pf, celular: maskPhone(e.target.value) })}
                      placeholder="(00) 90000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_email">E-mail *</Label>
                    <Input
                      id="pf_email"
                      type="email"
                      value={pf.email}
                      onChange={(e) => setPf({ ...pf, email: e.target.value })}
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="sm:col-span-2 md:col-span-3 pt-2 border-t">
                    <Label className="block mb-2 font-medium">Casa Alugada Atualmente?</Label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <RadioGroup
                        value={pf.casa_alugada}
                        onValueChange={(val) => setPf({ ...pf, casa_alugada: val })}
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="pf_casa_nao" />
                          <Label htmlFor="pf_casa_nao">Não</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="pf_casa_sim" />
                          <Label htmlFor="pf_casa_sim">Sim</Label>
                        </div>
                      </RadioGroup>
                      {pf.casa_alugada === 'sim' && (
                        <div className="flex-1 w-full">
                          <Input
                            placeholder="Qual Imobiliária Administra?"
                            value={pf.imob_administra}
                            onChange={(e) => setPf({ ...pf, imob_administra: e.target.value })}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seção: Empresa Onde Trabalha */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">2. Empresa Onde Trabalha</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="pf_emp_razao">Razão Social</Label>
                    <Input
                      id="pf_emp_razao"
                      value={pf.empresa_razao_social}
                      onChange={(e) => setPf({ ...pf, empresa_razao_social: e.target.value })}
                      placeholder="Nome da empresa empregadora"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="pf_emp_end">Endereço da Empresa</Label>
                    <Input
                      id="pf_emp_end"
                      value={pf.empresa_endereco}
                      onChange={(e) => setPf({ ...pf, empresa_endereco: e.target.value })}
                      placeholder="Rua, Av, Número"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_emp_bairro">Bairro</Label>
                    <Input
                      id="pf_emp_bairro"
                      value={pf.empresa_bairro}
                      onChange={(e) => setPf({ ...pf, empresa_bairro: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_emp_cidade">Cidade</Label>
                    <Input
                      id="pf_emp_cidade"
                      value={pf.empresa_cidade}
                      onChange={(e) => setPf({ ...pf, empresa_cidade: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_emp_uf">UF</Label>
                    <Input
                      id="pf_emp_uf"
                      maxLength={2}
                      value={pf.empresa_uf}
                      onChange={(e) => setPf({ ...pf, empresa_uf: e.target.value.toUpperCase() })}
                      placeholder="SP"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_emp_ramal">Ramal</Label>
                    <Input
                      id="pf_emp_ramal"
                      value={pf.empresa_ramal}
                      onChange={(e) => setPf({ ...pf, empresa_ramal: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="pf_emp_fones">Telefones da Empresa</Label>
                    <Input
                      id="pf_emp_fones"
                      value={pf.empresa_fones}
                      maxLength={15}
                      onChange={(e) => setPf({ ...pf, empresa_fones: maskPhone(e.target.value) })}
                      placeholder="(00) 0000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_emp_salario">Salário (R$)</Label>
                    <Input
                      id="pf_emp_salario"
                      value={pf.empresa_salario}
                      onChange={(e) =>
                        setPf({ ...pf, empresa_salario: maskCurrency(e.target.value) })
                      }
                      placeholder="R$ 0.000,00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_emp_tempo">Tempo de Firma</Label>
                    <Input
                      id="pf_emp_tempo"
                      value={pf.empresa_tempo_firma}
                      onChange={(e) => setPf({ ...pf, empresa_tempo_firma: e.target.value })}
                      placeholder="Ex: 2 anos e 3 meses"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_emp_prof">Profissão / Cargo</Label>
                    <Input
                      id="pf_emp_prof"
                      value={pf.empresa_profissao}
                      onChange={(e) => setPf({ ...pf, empresa_profissao: e.target.value })}
                    />
                  </div>

                  <div className="sm:col-span-2 md:col-span-3 pt-2 border-t">
                    <Label className="block mb-2 font-medium">Possui Outros Rendimentos?</Label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <RadioGroup
                        value={pf.empresa_outros_rendimentos}
                        onValueChange={(val) => setPf({ ...pf, empresa_outros_rendimentos: val })}
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="pf_outros_nao" />
                          <Label htmlFor="pf_outros_nao">Não</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="pf_outros_sim" />
                          <Label htmlFor="pf_outros_sim">Sim</Label>
                        </div>
                      </RadioGroup>
                      {pf.empresa_outros_rendimentos === 'sim' && (
                        <div className="flex-1 w-full">
                          <Input
                            placeholder="Quais outros rendimentos e valores?"
                            value={pf.empresa_quais_rendimentos}
                            onChange={(e) =>
                              setPf({ ...pf, empresa_quais_rendimentos: e.target.value })
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seção: Esposo(a) / Cônjuge */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">
                    3. Dados do Esposo(a) / Cônjuge (se houver)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="pf_esp_nome">Nome Completo do Cônjuge</Label>
                    <Input
                      id="pf_esp_nome"
                      value={pf.esposo_nome}
                      onChange={(e) => setPf({ ...pf, esposo_nome: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_dt_nasc">Data de Nascimento</Label>
                    <Input
                      id="pf_esp_dt_nasc"
                      type="text"
                      placeholder="DD/MM/AAAA"
                      maxLength={10}
                      value={pf.esposo_dt_nasc}
                      onChange={(e) => setPf({ ...pf, esposo_dt_nasc: maskDate(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_loc_nasc">Local de Nascimento</Label>
                    <Input
                      id="pf_esp_loc_nasc"
                      value={pf.esposo_local_nasc}
                      onChange={(e) => setPf({ ...pf, esposo_local_nasc: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_uf_nasc">UF Nasc.</Label>
                    <Input
                      id="pf_esp_uf_nasc"
                      maxLength={2}
                      value={pf.esposo_uf_nasc}
                      onChange={(e) =>
                        setPf({ ...pf, esposo_uf_nasc: e.target.value.toUpperCase() })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_est_civil">Estado Civil</Label>
                    <Input
                      id="pf_esp_est_civil"
                      value={pf.esposo_est_civil}
                      onChange={(e) => setPf({ ...pf, esposo_est_civil: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_rg">RG</Label>
                    <Input
                      id="pf_esp_rg"
                      value={pf.esposo_rg}
                      onChange={(e) => setPf({ ...pf, esposo_rg: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_cpf">CPF</Label>
                    <Input
                      id="pf_esp_cpf"
                      value={pf.esposo_cpf}
                      onChange={(e) => setPf({ ...pf, esposo_cpf: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="pf_esp_pai">Filiação: Pai</Label>
                    <Input
                      id="pf_esp_pai"
                      value={pf.esposo_filiacao_pai}
                      onChange={(e) => setPf({ ...pf, esposo_filiacao_pai: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="pf_esp_mae">Filiação: Mãe</Label>
                    <Input
                      id="pf_esp_mae"
                      value={pf.esposo_filiacao_mae}
                      onChange={(e) => setPf({ ...pf, esposo_filiacao_mae: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="pf_esp_end">Endereço Residencial</Label>
                    <Input
                      id="pf_esp_end"
                      value={pf.esposo_endereco}
                      onChange={(e) => setPf({ ...pf, esposo_endereco: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_cep">CEP</Label>
                    <Input
                      id="pf_esp_cep"
                      value={pf.esposo_cep}
                      maxLength={10}
                      placeholder="00.000-000"
                      onChange={(e) => setPf({ ...pf, esposo_cep: maskCep(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_bairro">Bairro</Label>
                    <Input
                      id="pf_esp_bairro"
                      value={pf.esposo_bairro}
                      onChange={(e) => setPf({ ...pf, esposo_bairro: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_cidade">Cidade</Label>
                    <Input
                      id="pf_esp_cidade"
                      value={pf.esposo_cidade}
                      onChange={(e) => setPf({ ...pf, esposo_cidade: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_uf">UF</Label>
                    <Input
                      id="pf_esp_uf"
                      maxLength={2}
                      value={pf.esposo_uf}
                      onChange={(e) => setPf({ ...pf, esposo_uf: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_fone">Fone Residencial</Label>
                    <Input
                      id="pf_esp_fone"
                      value={pf.esposo_fone_res}
                      maxLength={15}
                      placeholder="(00) 0000-0000"
                      onChange={(e) => setPf({ ...pf, esposo_fone_res: maskPhone(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_cel">Celular</Label>
                    <Input
                      id="pf_esp_cel"
                      value={pf.esposo_celular}
                      maxLength={15}
                      placeholder="(00) 90000-0000"
                      onChange={(e) => setPf({ ...pf, esposo_celular: maskPhone(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_mail">E-mail</Label>
                    <Input
                      id="pf_esp_mail"
                      type="email"
                      value={pf.esposo_email}
                      onChange={(e) => setPf({ ...pf, esposo_email: e.target.value })}
                    />
                  </div>

                  {/* Empresa Cônjuge */}
                  <div className="sm:col-span-2 md:col-span-3 pt-3 border-t">
                    <p className="text-sm font-semibold text-slate-700 mb-3">
                      Empresa Onde o Cônjuge Trabalha
                    </p>
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="pf_esp_emp_razao">Razão Social</Label>
                    <Input
                      id="pf_esp_emp_razao"
                      value={pf.esposo_empresa_razao_social}
                      onChange={(e) =>
                        setPf({ ...pf, esposo_empresa_razao_social: e.target.value })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="pf_esp_emp_end">Endereço da Empresa</Label>
                    <Input
                      id="pf_esp_emp_end"
                      value={pf.esposo_empresa_endereco}
                      onChange={(e) => setPf({ ...pf, esposo_empresa_endereco: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_emp_bairro">Bairro</Label>
                    <Input
                      id="pf_esp_emp_bairro"
                      value={pf.esposo_empresa_bairro}
                      onChange={(e) => setPf({ ...pf, esposo_empresa_bairro: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_emp_cidade">Cidade</Label>
                    <Input
                      id="pf_esp_emp_cidade"
                      value={pf.esposo_empresa_cidade}
                      onChange={(e) => setPf({ ...pf, esposo_empresa_cidade: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_emp_uf">UF</Label>
                    <Input
                      id="pf_esp_emp_uf"
                      maxLength={2}
                      value={pf.esposo_empresa_uf}
                      onChange={(e) =>
                        setPf({ ...pf, esposo_empresa_uf: e.target.value.toUpperCase() })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_emp_ramal">Ramal</Label>
                    <Input
                      id="pf_esp_emp_ramal"
                      value={pf.esposo_empresa_ramal}
                      onChange={(e) => setPf({ ...pf, esposo_empresa_ramal: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="pf_esp_emp_fones">Telefones</Label>
                    <Input
                      id="pf_esp_emp_fones"
                      value={pf.esposo_empresa_fones}
                      maxLength={15}
                      placeholder="(00) 0000-0000"
                      onChange={(e) =>
                        setPf({ ...pf, esposo_empresa_fones: maskPhone(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_emp_salario">Salário (R$)</Label>
                    <Input
                      id="pf_esp_emp_salario"
                      value={pf.esposo_empresa_salario}
                      placeholder="R$ 0,00"
                      onChange={(e) =>
                        setPf({ ...pf, esposo_empresa_salario: maskCurrency(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_emp_tempo">Tempo de Firma</Label>
                    <Input
                      id="pf_esp_emp_tempo"
                      value={pf.esposo_empresa_tempo_firma}
                      onChange={(e) => setPf({ ...pf, esposo_empresa_tempo_firma: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_esp_emp_prof">Profissão</Label>
                    <Input
                      id="pf_esp_emp_prof"
                      value={pf.esposo_empresa_profissao}
                      onChange={(e) => setPf({ ...pf, esposo_empresa_profissao: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Seção: Composição Familiar e Animais */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">
                    4. Moradores e Animais de Estimação
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label htmlFor="pf_moradores">
                      Citar nome e idade das pessoas que irão residir no imóvel:
                    </Label>
                    <Textarea
                      id="pf_moradores"
                      rows={3}
                      value={pf.moradores}
                      onChange={(e) => setPf({ ...pf, moradores: e.target.value })}
                      placeholder="Ex: João da Silva (42 anos), Maria da Silva (38 anos), Pedro da Silva (10 anos)..."
                    />
                  </div>

                  <div className="pt-2 border-t">
                    <Label className="block mb-2 font-medium">Possui Animais?</Label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <RadioGroup
                        value={pf.animais_possui}
                        onValueChange={(val) => setPf({ ...pf, animais_possui: val })}
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="pf_animais_nao" />
                          <Label htmlFor="pf_animais_nao">Não</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="pf_animais_sim" />
                          <Label htmlFor="pf_animais_sim">Sim</Label>
                        </div>
                      </RadioGroup>
                      {pf.animais_possui === 'sim' && (
                        <div className="flex-1 w-full">
                          <Input
                            placeholder="Quais e quantos? Ex: 1 cão pequeno porte, 2 gatos"
                            value={pf.animais_detalhes}
                            onChange={(e) => setPf({ ...pf, animais_detalhes: e.target.value })}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seção: Referências */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">
                    5. Referências (Parentes ou Conhecidos)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pf_ref_nome">Nome Completo</Label>
                    <Input
                      id="pf_ref_nome"
                      value={pf.referencia_nome}
                      onChange={(e) => setPf({ ...pf, referencia_nome: e.target.value })}
                      placeholder="Nome do parente ou conhecido"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pf_ref_fone">Telefone</Label>
                    <Input
                      id="pf_ref_fone"
                      value={pf.referencia_fone}
                      maxLength={15}
                      onChange={(e) => setPf({ ...pf, referencia_fone: maskPhone(e.target.value) })}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="pf_ref_end">Endereço</Label>
                    <Input
                      id="pf_ref_end"
                      value={pf.referencia_endereco}
                      onChange={(e) => setPf({ ...pf, referencia_endereco: e.target.value })}
                      placeholder="Rua, Bairro, Cidade/UF"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Declaração de Veracidade */}
              <Card className="border-primary/40 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-slate-900">
                    Declaração de Veracidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-700 leading-relaxed italic bg-white p-4 rounded border">
                    &ldquo;Declaro que as informações contidas neste cadastro, assim como os
                    documentos apresentados são verdadeiros e autênticos. Por ser expressão da
                    verdade, assumo inteira responsabilidade, sob as penas da Lei e assino a
                    presente para que reproduza os efeitos legais.&rdquo;
                  </p>
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                      id="pf_declaracao"
                      checked={pf.declaracao_aceite}
                      onCheckedChange={(c) => setPf({ ...pf, declaracao_aceite: Boolean(c) })}
                    />
                    <Label
                      htmlFor="pf_declaracao"
                      className="text-sm font-semibold cursor-pointer text-slate-800 leading-tight"
                    >
                      Li, concordo e confirmo que todas as informações acima são verdadeiras. *
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* ======================= FORMULÁRIO PJ ======================= */}
          {normalizedType === 'pj' && (
            <>
              {/* Seção: Empresa */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">
                    1. Dados da Empresa (Pessoa Jurídica)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="pj_razao">Razão Social *</Label>
                    <Input
                      id="pj_razao"
                      value={pj.razao_social}
                      onChange={(e) => setPj({ ...pj, razao_social: e.target.value })}
                      required
                      placeholder="Razão Social completa"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="pj_fantasia">Nome Fantasia</Label>
                    <Input
                      id="pj_fantasia"
                      value={pj.nome_fantasia}
                      onChange={(e) => setPj({ ...pj, nome_fantasia: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pj_cnpj">CNPJ *</Label>
                    <Input
                      id="pj_cnpj"
                      value={pj.cnpj}
                      onChange={(e) => setPj({ ...pj, cnpj: e.target.value })}
                      required
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pj_ie">Inscrição Estadual</Label>
                    <Input
                      id="pj_ie"
                      value={pj.inscr_estadual}
                      onChange={(e) => setPj({ ...pj, inscr_estadual: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="pj_end">Endereço Completo</Label>
                    <Input
                      id="pj_end"
                      value={pj.endereco}
                      onChange={(e) => setPj({ ...pj, endereco: e.target.value })}
                      placeholder="Rua, Av, Número, Sala"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pj_cep">CEP</Label>
                    <Input
                      id="pj_cep"
                      value={pj.cep}
                      maxLength={10}
                      onChange={(e) => setPj({ ...pj, cep: maskCep(e.target.value) })}
                      placeholder="00.000-000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pj_bairro">Bairro</Label>
                    <Input
                      id="pj_bairro"
                      value={pj.bairro}
                      onChange={(e) => setPj({ ...pj, bairro: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pj_cidade">Cidade</Label>
                    <Input
                      id="pj_cidade"
                      value={pj.cidade}
                      onChange={(e) => setPj({ ...pj, cidade: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pj_uf">UF</Label>
                    <Input
                      id="pj_uf"
                      maxLength={2}
                      value={pj.uf}
                      onChange={(e) => setPj({ ...pj, uf: e.target.value.toUpperCase() })}
                      placeholder="SP"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pj_fones">Telefones *</Label>
                    <Input
                      id="pj_fones"
                      value={pj.fones}
                      maxLength={15}
                      onChange={(e) => setPj({ ...pj, fones: maskPhone(e.target.value) })}
                      placeholder="(00) 0000-0000"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="pj_email">E-mail Corporativo *</Label>
                    <Input
                      id="pj_email"
                      type="email"
                      value={pj.email}
                      onChange={(e) => setPj({ ...pj, email: e.target.value })}
                      placeholder="contato@empresa.com.br"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pj_faturamento">Faturamento Mensal (R$)</Label>
                    <Input
                      id="pj_faturamento"
                      value={pj.faturamento}
                      onChange={(e) => setPj({ ...pj, faturamento: maskCurrency(e.target.value) })}
                      placeholder="R$ 0,00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pj_tempo_empresa">Tempo de Empresa</Label>
                    <Input
                      id="pj_tempo_empresa"
                      value={pj.tempo_empresa}
                      onChange={(e) => setPj({ ...pj, tempo_empresa: e.target.value })}
                      placeholder="Ex: 5 anos"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pj_ramo">Ramo de Atividade</Label>
                    <Input
                      id="pj_ramo"
                      value={pj.ramo_atividade}
                      onChange={(e) => setPj({ ...pj, ramo_atividade: e.target.value })}
                      placeholder="Ex: Comércio Varejista"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Seção: 1º Representante */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">
                    2. 1º Representante Legal
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="rep1_nome">Nome Completo</Label>
                    <Input
                      id="rep1_nome"
                      value={pj.rep1_nome}
                      onChange={(e) => setPj({ ...pj, rep1_nome: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_dt_nasc">Data Nascimento</Label>
                    <Input
                      id="rep1_dt_nasc"
                      type="text"
                      placeholder="DD/MM/AAAA"
                      maxLength={10}
                      value={pj.rep1_dt_nasc}
                      onChange={(e) => setPj({ ...pj, rep1_dt_nasc: maskDate(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_local">Local Nascimento</Label>
                    <Input
                      id="rep1_local"
                      value={pj.rep1_local_nasc}
                      onChange={(e) => setPj({ ...pj, rep1_local_nasc: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_uf_nasc">UF Nasc.</Label>
                    <Input
                      id="rep1_uf_nasc"
                      maxLength={2}
                      value={pj.rep1_uf_nasc}
                      onChange={(e) => setPj({ ...pj, rep1_uf_nasc: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_est_civil">Estado Civil</Label>
                    <Input
                      id="rep1_est_civil"
                      value={pj.rep1_est_civil}
                      onChange={(e) => setPj({ ...pj, rep1_est_civil: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_rg">RG</Label>
                    <Input
                      id="rep1_rg"
                      value={pj.rep1_rg}
                      onChange={(e) => setPj({ ...pj, rep1_rg: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_cpf">CPF</Label>
                    <Input
                      id="rep1_cpf"
                      value={pj.rep1_cpf}
                      onChange={(e) => setPj({ ...pj, rep1_cpf: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="rep1_pai">Filiação: Pai</Label>
                    <Input
                      id="rep1_pai"
                      value={pj.rep1_filiacao_pai}
                      onChange={(e) => setPj({ ...pj, rep1_filiacao_pai: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="rep1_mae">Filiação: Mãe</Label>
                    <Input
                      id="rep1_mae"
                      value={pj.rep1_filiacao_mae}
                      onChange={(e) => setPj({ ...pj, rep1_filiacao_mae: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="rep1_end">Endereço Residencial</Label>
                    <Input
                      id="rep1_end"
                      value={pj.rep1_endereco}
                      onChange={(e) => setPj({ ...pj, rep1_endereco: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_cep">CEP</Label>
                    <Input
                      id="rep1_cep"
                      value={pj.rep1_cep}
                      maxLength={10}
                      placeholder="00.000-000"
                      onChange={(e) => setPj({ ...pj, rep1_cep: maskCep(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_bairro">Bairro</Label>
                    <Input
                      id="rep1_bairro"
                      value={pj.rep1_bairro}
                      onChange={(e) => setPj({ ...pj, rep1_bairro: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_cidade">Cidade</Label>
                    <Input
                      id="rep1_cidade"
                      value={pj.rep1_cidade}
                      onChange={(e) => setPj({ ...pj, rep1_cidade: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_uf">UF</Label>
                    <Input
                      id="rep1_uf"
                      maxLength={2}
                      value={pj.rep1_uf}
                      onChange={(e) => setPj({ ...pj, rep1_uf: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_fone">Fone Residencial</Label>
                    <Input
                      id="rep1_fone"
                      value={pj.rep1_fone_res}
                      maxLength={15}
                      placeholder="(00) 0000-0000"
                      onChange={(e) => setPj({ ...pj, rep1_fone_res: maskPhone(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_cel">Celular</Label>
                    <Input
                      id="rep1_cel"
                      value={pj.rep1_celular}
                      maxLength={15}
                      placeholder="(00) 90000-0000"
                      onChange={(e) => setPj({ ...pj, rep1_celular: maskPhone(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_mail">E-mail</Label>
                    <Input
                      id="rep1_mail"
                      type="email"
                      value={pj.rep1_email}
                      onChange={(e) => setPj({ ...pj, rep1_email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_salario">Salário / Pró-labore (R$)</Label>
                    <Input
                      id="rep1_salario"
                      value={pj.rep1_salario}
                      placeholder="R$ 0,00"
                      onChange={(e) => setPj({ ...pj, rep1_salario: maskCurrency(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_tempo">Tempo de Firma</Label>
                    <Input
                      id="rep1_tempo"
                      value={pj.rep1_tempo_firma}
                      onChange={(e) => setPj({ ...pj, rep1_tempo_firma: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep1_prof">Profissão / Cargo</Label>
                    <Input
                      id="rep1_prof"
                      value={pj.rep1_profissao}
                      onChange={(e) => setPj({ ...pj, rep1_profissao: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3 pt-2 border-t">
                    <Label className="block mb-2 font-medium">Possui Outros Rendimentos?</Label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <RadioGroup
                        value={pj.rep1_outros_rendimentos}
                        onValueChange={(val) => setPj({ ...pj, rep1_outros_rendimentos: val })}
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="rep1_outros_nao" />
                          <Label htmlFor="rep1_outros_nao">Não</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="rep1_outros_sim" />
                          <Label htmlFor="rep1_outros_sim">Sim</Label>
                        </div>
                      </RadioGroup>
                      {pj.rep1_outros_rendimentos === 'sim' && (
                        <div className="flex-1 w-full">
                          <Input
                            placeholder="Quais outros rendimentos?"
                            value={pj.rep1_quais_rendimentos}
                            onChange={(e) =>
                              setPj({ ...pj, rep1_quais_rendimentos: e.target.value })
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seção: 2º Representante */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">
                    3. 2º Representante Legal (se houver)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="rep2_nome">Nome Completo</Label>
                    <Input
                      id="rep2_nome"
                      value={pj.rep2_nome}
                      onChange={(e) => setPj({ ...pj, rep2_nome: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_dt_nasc">Data Nascimento</Label>
                    <Input
                      id="rep2_dt_nasc"
                      type="text"
                      placeholder="DD/MM/AAAA"
                      maxLength={10}
                      value={pj.rep2_dt_nasc}
                      onChange={(e) => setPj({ ...pj, rep2_dt_nasc: maskDate(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_local">Local Nascimento</Label>
                    <Input
                      id="rep2_local"
                      value={pj.rep2_local_nasc}
                      onChange={(e) => setPj({ ...pj, rep2_local_nasc: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_uf_nasc">UF Nasc.</Label>
                    <Input
                      id="rep2_uf_nasc"
                      maxLength={2}
                      value={pj.rep2_uf_nasc}
                      onChange={(e) => setPj({ ...pj, rep2_uf_nasc: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_est_civil">Estado Civil</Label>
                    <Input
                      id="rep2_est_civil"
                      value={pj.rep2_est_civil}
                      onChange={(e) => setPj({ ...pj, rep2_est_civil: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_rg">RG</Label>
                    <Input
                      id="rep2_rg"
                      value={pj.rep2_rg}
                      onChange={(e) => setPj({ ...pj, rep2_rg: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_cpf">CPF</Label>
                    <Input
                      id="rep2_cpf"
                      value={pj.rep2_cpf}
                      onChange={(e) => setPj({ ...pj, rep2_cpf: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="rep2_pai">Filiação: Pai</Label>
                    <Input
                      id="rep2_pai"
                      value={pj.rep2_filiacao_pai}
                      onChange={(e) => setPj({ ...pj, rep2_filiacao_pai: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="rep2_mae">Filiação: Mãe</Label>
                    <Input
                      id="rep2_mae"
                      value={pj.rep2_filiacao_mae}
                      onChange={(e) => setPj({ ...pj, rep2_filiacao_mae: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="rep2_end">Endereço Residencial</Label>
                    <Input
                      id="rep2_end"
                      value={pj.rep2_endereco}
                      onChange={(e) => setPj({ ...pj, rep2_endereco: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_cep">CEP</Label>
                    <Input
                      id="rep2_cep"
                      value={pj.rep2_cep}
                      maxLength={10}
                      placeholder="00.000-000"
                      onChange={(e) => setPj({ ...pj, rep2_cep: maskCep(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_bairro">Bairro</Label>
                    <Input
                      id="rep2_bairro"
                      value={pj.rep2_bairro}
                      onChange={(e) => setPj({ ...pj, rep2_bairro: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_cidade">Cidade</Label>
                    <Input
                      id="rep2_cidade"
                      value={pj.rep2_cidade}
                      onChange={(e) => setPj({ ...pj, rep2_cidade: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_uf">UF</Label>
                    <Input
                      id="rep2_uf"
                      maxLength={2}
                      value={pj.rep2_uf}
                      onChange={(e) => setPj({ ...pj, rep2_uf: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_fone">Fone Residencial</Label>
                    <Input
                      id="rep2_fone"
                      value={pj.rep2_fone_res}
                      maxLength={15}
                      placeholder="(00) 0000-0000"
                      onChange={(e) => setPj({ ...pj, rep2_fone_res: maskPhone(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_cel">Celular</Label>
                    <Input
                      id="rep2_cel"
                      value={pj.rep2_celular}
                      maxLength={15}
                      placeholder="(00) 90000-0000"
                      onChange={(e) => setPj({ ...pj, rep2_celular: maskPhone(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_mail">E-mail</Label>
                    <Input
                      id="rep2_mail"
                      type="email"
                      value={pj.rep2_email}
                      onChange={(e) => setPj({ ...pj, rep2_email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_salario">Salário / Pró-labore (R$)</Label>
                    <Input
                      id="rep2_salario"
                      value={pj.rep2_salario}
                      placeholder="R$ 0,00"
                      onChange={(e) => setPj({ ...pj, rep2_salario: maskCurrency(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_tempo">Tempo de Firma</Label>
                    <Input
                      id="rep2_tempo"
                      value={pj.rep2_tempo_firma}
                      onChange={(e) => setPj({ ...pj, rep2_tempo_firma: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep2_prof">Profissão / Cargo</Label>
                    <Input
                      id="rep2_prof"
                      value={pj.rep2_profissao}
                      onChange={(e) => setPj({ ...pj, rep2_profissao: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Finalidade da Locação */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">
                    4. Finalidade da Locação e Uso do Imóvel
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label className="block mb-2 font-medium">Finalidade do Imóvel:</Label>
                    <RadioGroup
                      value={pj.finalidade_tipo}
                      onValueChange={(val) => setPj({ ...pj, finalidade_tipo: val })}
                      className="flex items-center gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comercial" id="fin_comercial" />
                        <Label htmlFor="fin_comercial" className="font-semibold cursor-pointer">
                          Uso Comercial
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="residencial" id="fin_residencial" />
                        <Label htmlFor="fin_residencial" className="font-semibold cursor-pointer">
                          Uso Residencial
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {pj.finalidade_tipo === 'comercial' ? (
                    <div>
                      <Label htmlFor="comercial_nome">Nome do Estabelecimento Comercial:</Label>
                      <Input
                        id="comercial_nome"
                        value={pj.comercial_estabelecimento}
                        onChange={(e) =>
                          setPj({ ...pj, comercial_estabelecimento: e.target.value })
                        }
                        placeholder="Nome que operará no local"
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="residencial_moradores">
                        Citar nome e idade da(s) pessoa(s) que irá(ão) residir no imóvel:
                      </Label>
                      <Textarea
                        id="residencial_moradores"
                        rows={3}
                        value={pj.residencial_moradores}
                        onChange={(e) => setPj({ ...pj, residencial_moradores: e.target.value })}
                        placeholder="Nome e idade de todos os moradores"
                      />
                    </div>
                  )}

                  <div className="pt-2 border-t">
                    <Label className="block mb-2 font-medium">Possui Animais?</Label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <RadioGroup
                        value={pj.animais_possui}
                        onValueChange={(val) => setPj({ ...pj, animais_possui: val })}
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="pj_animais_nao" />
                          <Label htmlFor="pj_animais_nao">Não</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="pj_animais_sim" />
                          <Label htmlFor="pj_animais_sim">Sim</Label>
                        </div>
                      </RadioGroup>
                      {pj.animais_possui === 'sim' && (
                        <div className="flex-1 w-full">
                          <Input
                            placeholder="Quais e quantos?"
                            value={pj.animais_detalhes}
                            onChange={(e) => setPj({ ...pj, animais_detalhes: e.target.value })}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Declaração de Veracidade */}
              <Card className="border-primary/40 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-slate-900">
                    Declaração de Veracidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-700 leading-relaxed italic bg-white p-4 rounded border">
                    &ldquo;Declaro que as informações contidas neste cadastro, assim como os
                    documentos apresentados são verdadeiros e autênticos. Por ser expressão da
                    verdade, assumo inteira responsabilidade, sob as penas da Lei e assino a
                    presente para que reproduza os efeitos legais.&rdquo;
                  </p>
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                      id="pj_declaracao"
                      checked={pj.declaracao_aceite}
                      onCheckedChange={(c) => setPj({ ...pj, declaracao_aceite: Boolean(c) })}
                    />
                    <Label
                      htmlFor="pj_declaracao"
                      className="text-sm font-semibold cursor-pointer text-slate-800 leading-tight"
                    >
                      Li, concordo e confirmo que todas as informações acima são verdadeiras. *
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* ======================= FORMULÁRIO FIADOR ======================= */}
          {normalizedType === 'fiador' && (
            <>
              {/* Seção: Fiador (Dados Pessoais) */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">
                    1. Dados Pessoais do Fiador(a)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="fia_nome">Nome Completo *</Label>
                    <Input
                      id="fia_nome"
                      value={fiador.nome}
                      onChange={(e) => setFiador({ ...fiador, nome: e.target.value })}
                      required
                      placeholder="Nome completo do fiador"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_dt_nasc">Data de Nascimento</Label>
                    <Input
                      id="fia_dt_nasc"
                      type="text"
                      placeholder="DD/MM/AAAA"
                      maxLength={10}
                      value={fiador.dt_nasc}
                      onChange={(e) => setFiador({ ...fiador, dt_nasc: maskDate(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_loc_nasc">Local de Nascimento</Label>
                    <Input
                      id="fia_loc_nasc"
                      value={fiador.local_nasc}
                      onChange={(e) => setFiador({ ...fiador, local_nasc: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_uf_nasc">UF Nasc.</Label>
                    <Input
                      id="fia_uf_nasc"
                      maxLength={2}
                      value={fiador.uf_nasc}
                      onChange={(e) =>
                        setFiador({ ...fiador, uf_nasc: e.target.value.toUpperCase() })
                      }
                      placeholder="SP"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_est_civil">Estado Civil</Label>
                    <Input
                      id="fia_est_civil"
                      value={fiador.est_civil}
                      onChange={(e) => setFiador({ ...fiador, est_civil: e.target.value })}
                      placeholder="Casado(a), Solteiro(a)..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_rg">RG</Label>
                    <Input
                      id="fia_rg"
                      value={fiador.rg}
                      onChange={(e) => setFiador({ ...fiador, rg: e.target.value })}
                      placeholder="00.000.000-0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_cpf">CPF *</Label>
                    <Input
                      id="fia_cpf"
                      value={fiador.cpf}
                      onChange={(e) => setFiador({ ...fiador, cpf: e.target.value })}
                      required
                      placeholder="000.000.000-00"
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="fia_pai">Filiação: Pai</Label>
                    <Input
                      id="fia_pai"
                      value={fiador.filiacao_pai}
                      onChange={(e) => setFiador({ ...fiador, filiacao_pai: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="fia_mae">Filiação: Mãe</Label>
                    <Input
                      id="fia_mae"
                      value={fiador.filiacao_mae}
                      onChange={(e) => setFiador({ ...fiador, filiacao_mae: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="fia_end">Endereço Residencial Atual</Label>
                    <Input
                      id="fia_end"
                      value={fiador.endereco}
                      onChange={(e) => setFiador({ ...fiador, endereco: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_cep">CEP</Label>
                    <Input
                      id="fia_cep"
                      value={fiador.cep}
                      maxLength={10}
                      placeholder="00.000-000"
                      onChange={(e) => setFiador({ ...fiador, cep: maskCep(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_bairro">Bairro</Label>
                    <Input
                      id="fia_bairro"
                      value={fiador.bairro}
                      onChange={(e) => setFiador({ ...fiador, bairro: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_cidade">Cidade</Label>
                    <Input
                      id="fia_cidade"
                      value={fiador.cidade}
                      onChange={(e) => setFiador({ ...fiador, cidade: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_uf">UF</Label>
                    <Input
                      id="fia_uf"
                      maxLength={2}
                      value={fiador.uf}
                      onChange={(e) => setFiador({ ...fiador, uf: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_fone">Fone Residencial</Label>
                    <Input
                      id="fia_fone"
                      value={fiador.fone_res}
                      maxLength={15}
                      placeholder="(00) 0000-0000"
                      onChange={(e) =>
                        setFiador({ ...fiador, fone_res: maskPhone(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_cel">Celular / WhatsApp *</Label>
                    <Input
                      id="fia_cel"
                      value={fiador.celular}
                      maxLength={15}
                      placeholder="(00) 90000-0000"
                      onChange={(e) => setFiador({ ...fiador, celular: maskPhone(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_mail">E-mail *</Label>
                    <Input
                      id="fia_mail"
                      type="email"
                      value={fiador.email}
                      onChange={(e) => setFiador({ ...fiador, email: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3 pt-2 border-t">
                    <Label className="block mb-2 font-medium">Casa Alugada Atualmente?</Label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <RadioGroup
                        value={fiador.casa_alugada}
                        onValueChange={(val) => setFiador({ ...fiador, casa_alugada: val })}
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="fia_casa_nao" />
                          <Label htmlFor="fia_casa_nao">Não</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="fia_casa_sim" />
                          <Label htmlFor="fia_casa_sim">Sim</Label>
                        </div>
                      </RadioGroup>
                      {fiador.casa_alugada === 'sim' && (
                        <div className="flex-1 w-full">
                          <Input
                            placeholder="Qual Imobiliária Administra?"
                            value={fiador.imob_administra}
                            onChange={(e) =>
                              setFiador({ ...fiador, imob_administra: e.target.value })
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seção: Empresa onde trabalha */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">2. Empresa Onde Trabalha</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="fia_emp_razao">Razão Social</Label>
                    <Input
                      id="fia_emp_razao"
                      value={fiador.empresa_razao_social}
                      onChange={(e) =>
                        setFiador({ ...fiador, empresa_razao_social: e.target.value })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="fia_emp_end">Endereço da Empresa</Label>
                    <Input
                      id="fia_emp_end"
                      value={fiador.empresa_endereco}
                      onChange={(e) => setFiador({ ...fiador, empresa_endereco: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_emp_bairro">Bairro</Label>
                    <Input
                      id="fia_emp_bairro"
                      value={fiador.empresa_bairro}
                      onChange={(e) => setFiador({ ...fiador, empresa_bairro: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_emp_cidade">Cidade</Label>
                    <Input
                      id="fia_emp_cidade"
                      value={fiador.empresa_cidade}
                      onChange={(e) => setFiador({ ...fiador, empresa_cidade: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_emp_uf">UF</Label>
                    <Input
                      id="fia_emp_uf"
                      maxLength={2}
                      value={fiador.empresa_uf}
                      onChange={(e) =>
                        setFiador({ ...fiador, empresa_uf: e.target.value.toUpperCase() })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_emp_ramal">Ramal</Label>
                    <Input
                      id="fia_emp_ramal"
                      value={fiador.empresa_ramal}
                      onChange={(e) => setFiador({ ...fiador, empresa_ramal: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="fia_emp_fones">Telefones da Empresa</Label>
                    <Input
                      id="fia_emp_fones"
                      value={fiador.empresa_fones}
                      maxLength={15}
                      placeholder="(00) 0000-0000"
                      onChange={(e) =>
                        setFiador({ ...fiador, empresa_fones: maskPhone(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_emp_salario">Salário (R$)</Label>
                    <Input
                      id="fia_emp_salario"
                      value={fiador.empresa_salario}
                      placeholder="R$ 0,00"
                      onChange={(e) =>
                        setFiador({ ...fiador, empresa_salario: maskCurrency(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_emp_tempo">Tempo de Firma</Label>
                    <Input
                      id="fia_emp_tempo"
                      value={fiador.empresa_tempo_firma}
                      onChange={(e) =>
                        setFiador({ ...fiador, empresa_tempo_firma: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_emp_prof">Profissão</Label>
                    <Input
                      id="fia_emp_prof"
                      value={fiador.empresa_profissao}
                      onChange={(e) => setFiador({ ...fiador, empresa_profissao: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3 pt-2 border-t">
                    <Label className="block mb-2 font-medium">Possui Outros Rendimentos?</Label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <RadioGroup
                        value={fiador.empresa_outros_rendimentos}
                        onValueChange={(val) =>
                          setFiador({ ...fiador, empresa_outros_rendimentos: val })
                        }
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="fia_outros_nao" />
                          <Label htmlFor="fia_outros_nao">Não</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="fia_outros_sim" />
                          <Label htmlFor="fia_outros_sim">Sim</Label>
                        </div>
                      </RadioGroup>
                      {fiador.empresa_outros_rendimentos === 'sim' && (
                        <div className="flex-1 w-full">
                          <Input
                            placeholder="Quais outros rendimentos?"
                            value={fiador.empresa_quais_rendimentos}
                            onChange={(e) =>
                              setFiador({ ...fiador, empresa_quais_rendimentos: e.target.value })
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seção: Esposo(a) */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">
                    3. Dados do Esposo(a) do Fiador
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="fia_esp_nome">Nome Completo</Label>
                    <Input
                      id="fia_esp_nome"
                      value={fiador.esposo_nome}
                      onChange={(e) => setFiador({ ...fiador, esposo_nome: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_dt_nasc">Data Nascimento</Label>
                    <Input
                      id="fia_esp_dt_nasc"
                      type="text"
                      placeholder="DD/MM/AAAA"
                      maxLength={10}
                      value={fiador.esposo_dt_nasc}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_dt_nasc: maskDate(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_loc_nasc">Local Nascimento</Label>
                    <Input
                      id="fia_esp_loc_nasc"
                      value={fiador.esposo_local_nasc}
                      onChange={(e) => setFiador({ ...fiador, esposo_local_nasc: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_uf_nasc">UF Nasc.</Label>
                    <Input
                      id="fia_esp_uf_nasc"
                      maxLength={2}
                      value={fiador.esposo_uf_nasc}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_uf_nasc: e.target.value.toUpperCase() })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_est_civil">Estado Civil</Label>
                    <Input
                      id="fia_esp_est_civil"
                      value={fiador.esposo_est_civil}
                      onChange={(e) => setFiador({ ...fiador, esposo_est_civil: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_rg">RG</Label>
                    <Input
                      id="fia_esp_rg"
                      value={fiador.esposo_rg}
                      onChange={(e) => setFiador({ ...fiador, esposo_rg: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_cpf">CPF</Label>
                    <Input
                      id="fia_esp_cpf"
                      value={fiador.esposo_cpf}
                      onChange={(e) => setFiador({ ...fiador, esposo_cpf: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="fia_esp_pai">Filiação: Pai</Label>
                    <Input
                      id="fia_esp_pai"
                      value={fiador.esposo_filiacao_pai}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_filiacao_pai: e.target.value })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="fia_esp_mae">Filiação: Mãe</Label>
                    <Input
                      id="fia_esp_mae"
                      value={fiador.esposo_filiacao_mae}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_filiacao_mae: e.target.value })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="fia_esp_end">Endereço</Label>
                    <Input
                      id="fia_esp_end"
                      value={fiador.esposo_endereco}
                      onChange={(e) => setFiador({ ...fiador, esposo_endereco: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_cep">CEP</Label>
                    <Input
                      id="fia_esp_cep"
                      value={fiador.esposo_cep}
                      maxLength={10}
                      placeholder="00.000-000"
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_cep: maskCep(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_bairro">Bairro</Label>
                    <Input
                      id="fia_esp_bairro"
                      value={fiador.esposo_bairro}
                      onChange={(e) => setFiador({ ...fiador, esposo_bairro: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_cidade">Cidade</Label>
                    <Input
                      id="fia_esp_cidade"
                      value={fiador.esposo_cidade}
                      onChange={(e) => setFiador({ ...fiador, esposo_cidade: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_uf">UF</Label>
                    <Input
                      id="fia_esp_uf"
                      maxLength={2}
                      value={fiador.esposo_uf}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_uf: e.target.value.toUpperCase() })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_fone">Fone Residencial</Label>
                    <Input
                      id="fia_esp_fone"
                      value={fiador.esposo_fone_res}
                      maxLength={15}
                      placeholder="(00) 0000-0000"
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_fone_res: maskPhone(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_cel">Celular</Label>
                    <Input
                      id="fia_esp_cel"
                      value={fiador.esposo_celular}
                      maxLength={15}
                      placeholder="(00) 90000-0000"
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_celular: maskPhone(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_mail">E-mail</Label>
                    <Input
                      id="fia_esp_mail"
                      type="email"
                      value={fiador.esposo_email}
                      onChange={(e) => setFiador({ ...fiador, esposo_email: e.target.value })}
                    />
                  </div>

                  {/* Empresa Cônjuge */}
                  <div className="sm:col-span-2 md:col-span-3 pt-3 border-t">
                    <p className="text-sm font-semibold text-slate-700 mb-3">
                      Empresa Onde o Cônjuge Trabalha
                    </p>
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <Label htmlFor="fia_esp_emp_razao">Razão Social</Label>
                    <Input
                      id="fia_esp_emp_razao"
                      value={fiador.esposo_empresa_razao_social}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_empresa_razao_social: e.target.value })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="fia_esp_emp_end">Endereço da Empresa</Label>
                    <Input
                      id="fia_esp_emp_end"
                      value={fiador.esposo_empresa_endereco}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_empresa_endereco: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_emp_bairro">Bairro</Label>
                    <Input
                      id="fia_esp_emp_bairro"
                      value={fiador.esposo_empresa_bairro}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_empresa_bairro: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_emp_cidade">Cidade</Label>
                    <Input
                      id="fia_esp_emp_cidade"
                      value={fiador.esposo_empresa_cidade}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_empresa_cidade: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_emp_uf">UF</Label>
                    <Input
                      id="fia_esp_emp_uf"
                      maxLength={2}
                      value={fiador.esposo_empresa_uf}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_empresa_uf: e.target.value.toUpperCase() })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_emp_ramal">Ramal</Label>
                    <Input
                      id="fia_esp_emp_ramal"
                      value={fiador.esposo_empresa_ramal}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_empresa_ramal: e.target.value })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="fia_esp_emp_fones">Telefones</Label>
                    <Input
                      id="fia_esp_emp_fones"
                      value={fiador.esposo_empresa_fones}
                      maxLength={15}
                      placeholder="(00) 0000-0000"
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_empresa_fones: maskPhone(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_emp_salario">Salário (R$)</Label>
                    <Input
                      id="fia_esp_emp_salario"
                      value={fiador.esposo_empresa_salario}
                      placeholder="R$ 0,00"
                      onChange={(e) =>
                        setFiador({
                          ...fiador,
                          esposo_empresa_salario: maskCurrency(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_emp_tempo">Tempo de Firma</Label>
                    <Input
                      id="fia_esp_emp_tempo"
                      value={fiador.esposo_empresa_tempo_firma}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_empresa_tempo_firma: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_esp_emp_prof">Profissão</Label>
                    <Input
                      id="fia_esp_emp_prof"
                      value={fiador.esposo_empresa_profissao}
                      onChange={(e) =>
                        setFiador({ ...fiador, esposo_empresa_profissao: e.target.value })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Seção: Referências */}
              <Card>
                <CardHeader className="bg-slate-50/80 border-b">
                  <CardTitle className="text-lg text-slate-800">
                    4. Referências (Parentes ou Conhecidos)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fia_ref_nome">Nome Completo</Label>
                    <Input
                      id="fia_ref_nome"
                      value={fiador.referencia_nome}
                      onChange={(e) => setFiador({ ...fiador, referencia_nome: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fia_ref_fone">Telefone</Label>
                    <Input
                      id="fia_ref_fone"
                      value={fiador.referencia_fone}
                      maxLength={15}
                      placeholder="(00) 00000-0000"
                      onChange={(e) =>
                        setFiador({ ...fiador, referencia_fone: maskPhone(e.target.value) })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="fia_ref_end">Endereço</Label>
                    <Input
                      id="fia_ref_end"
                      value={fiador.referencia_endereco}
                      onChange={(e) =>
                        setFiador({ ...fiador, referencia_endereco: e.target.value })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Declaração de Veracidade */}
              <Card className="border-primary/40 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-slate-900">
                    Declaração de Veracidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-700 leading-relaxed italic bg-white p-4 rounded border">
                    &ldquo;Declaro que as informações contidas neste cadastro, assim como os
                    documentos apresentados são verdadeiros e autênticos. Por ser expressão da
                    verdade, assumo inteira responsabilidade, sob as penas da Lei e assino a
                    presente para que reproduza os efeitos legais.&rdquo;
                  </p>
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                      id="fia_declaracao"
                      checked={fiador.declaracao_aceite}
                      onCheckedChange={(c) =>
                        setFiador({ ...fiador, declaracao_aceite: Boolean(c) })
                      }
                    />
                    <Label
                      htmlFor="fia_declaracao"
                      className="text-sm font-semibold cursor-pointer text-slate-800 leading-tight"
                    >
                      Li, concordo e confirmo que todas as informações acima são verdadeiras. *
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Botão de Envio */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Ao enviar, você autoriza o tratamento dos seus dados para fins de análise cadastral e
              locação.
            </p>
            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full sm:w-auto min-w-[220px] bg-primary hover:bg-primary/90 text-white font-semibold text-base py-6 shadow-md"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando Ficha...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Ficha Cadastral
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
