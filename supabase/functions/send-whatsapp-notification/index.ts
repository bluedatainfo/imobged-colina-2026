import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { tenantName, propertyTitle } = await req.json()

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Buscar admins com telefone preenchido
    const { data: admins, error: dbError } = await supabase
      .from('app_users')
      .select('id, name, email, role, phone, callmebot_api_key')
      .ilike('role', '%admin%')
      .not('phone', 'is', null)

    if (dbError) {
      throw new Error(`Erro ao buscar administradores no banco: ${dbError.message}`)
    }

    const validAdmins = (admins || []).filter(
      (a: any) =>
        a.phone &&
        a.phone.trim().replace(/\D/g, '').length >= 8 &&
        a.callmebot_api_key &&
        a.callmebot_api_key.trim().length > 0,
    )

    if (validAdmins.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Nenhum administrador com telefone e API Key do CallMeBot válidos encontrado.',
          sentCount: 0,
        }),
        {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
          status: 200,
        },
      )
    }

    const messageText = `⚠️ Pendência 'Interessado/Locatário' ${tenantName || 'Não informado'}, 'Imóvel' ${propertyTitle || 'Não informado'}, foi resolvida e retornou para uma nova análise.`
    let sentCount = 0
    const results = []

    for (const admin of validAdmins) {
      let digits = admin.phone.replace(/\D/g, '')

      // Se começar com 0, remove
      if (digits.startsWith('0')) {
        digits = digits.substring(1)
      }

      // Se não tiver o DDI 55 (números brasileiros costumam ter 10 ou 11 dígitos com DDD)
      if (digits.length <= 11) {
        digits = `55${digits}`
      }

      const params = new URLSearchParams({
        phone: digits,
        text: messageText,
        apikey: admin.callmebot_api_key.trim(),
      })

      const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?${params.toString()}`

      try {
        const response = await fetch(callMeBotUrl)
        const responseText = await response.text()

        results.push({
          adminId: admin.id,
          phone: digits,
          status: response.status,
          response: responseText,
        })

        if (response.ok) {
          sentCount++
        }
      } catch (sendErr: any) {
        console.error(`Falha ao enviar mensagem para ${digits}:`, sendErr)
        results.push({
          adminId: admin.id,
          phone: digits,
          error: sendErr?.message || 'Unknown network error',
        })
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        sentCount,
        totalAdmins: validAdmins.length,
        results,
      }),
      {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: 200,
      },
    )
  } catch (error: any) {
    console.error('Error in send-whatsapp-notification:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 500,
    })
  }
})
