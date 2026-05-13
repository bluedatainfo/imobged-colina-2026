import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const payload = await req.json()

    const full_name =
      payload.full_name ||
      payload.nome ||
      payload.name ||
      payload.Nome ||
      payload.RazaoSocial ||
      payload.Title ||
      'Nome Não Informado'
    const cpf = payload.cpf || payload.documento || payload.CPF || null
    const cnpj = payload.cnpj || payload.CNPJ || null
    const email = payload.email || payload.contato_email || payload.Email || payload.EMail || null
    const phone =
      payload.phone ||
      payload.telefone ||
      payload.celular ||
      payload.Celular ||
      payload.Telefone ||
      null
    const documents_link =
      payload.documents_link || payload.link_documentos || payload.pasta_sharepoint || null
    const address =
      payload.address || payload.endereco || payload.Endereco || payload.Endereço || null

    let category = payload.category || payload.Categoria || null
    if (!category) {
      if (
        cnpj ||
        (payload.form_title &&
          typeof payload.form_title === 'string' &&
          payload.form_title.toLowerCase().includes('jurídica'))
      ) {
        category = 'PJ'
      } else if (
        payload.fiador ||
        payload.Fiador ||
        (payload.form_title &&
          typeof payload.form_title === 'string' &&
          payload.form_title.toLowerCase().includes('fiador'))
      ) {
        category = 'Fiador'
      } else {
        category = 'PF'
      }
    }

    const { data, error } = await supabase
      .from('pre_registrations')
      .insert({
        full_name,
        cpf,
        cnpj,
        email,
        phone,
        address,
        documents_link,
        category,
        form_data: payload,
        status: 'Novo',
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error processing pre-registration:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 500,
    })
  }
})
