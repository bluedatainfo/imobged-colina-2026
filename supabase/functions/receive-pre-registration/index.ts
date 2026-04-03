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

    const full_name = payload.full_name || payload.nome || payload.name || 'Nome Não Informado'
    const cpf = payload.cpf || payload.documento || null
    const email = payload.email || payload.contato_email || null
    const phone = payload.phone || payload.telefone || payload.celular || null
    const documents_link =
      payload.documents_link || payload.link_documentos || payload.pasta_sharepoint || null

    const { data, error } = await supabase
      .from('pre_registrations')
      .insert({
        full_name,
        cpf,
        email,
        phone,
        documents_link,
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
