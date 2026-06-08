import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-supabase-client-platform, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { candidateId, reason } = await req.json()

    if (!candidateId || !reason) {
      throw new Error('Candidate ID and reason are required')
    }

    // Fetch candidate
    const { data: candidate, error: candidateError } = await supabase
      .from('pre_registrations')
      .select('*')
      .eq('id', candidateId)
      .single()

    if (candidateError) throw candidateError

    // Fetch settings
    const { data: settings, error: settingsError } = await supabase
      .from('app_settings')
      .select('module_settings')
      .limit(1)
      .single()

    if (settingsError && settingsError.code !== 'PGRST116') throw settingsError

    const emails = settings?.module_settings?.notification_emails || []
    const validEmails = emails.filter((e: string) => e && e.trim().length > 0)

    // Construct email content (simulation)
    const emailSubject = `Atualização de Dossiê: ${candidate.full_name}`
    const emailBody = `
      Olá ${candidate.full_name},
      
      Informamos que seu dossiê foi analisado e no momento encontra-se com o status: Rejeitado - Pendente de Documentação.
      
      Motivo da Rejeição:
      ${reason}
      
      Por favor, providencie os ajustes necessários e entre em contato conosco.
      
      Atenciosamente,
      Equipe Imobiliária Digital
    `

    console.log('--- START REJECTION NOTIFICATION ---')
    console.log(`To: ${candidate.email || 'No email provided for candidate'}`)
    if (validEmails.length > 0) {
      console.log(`CC (Notification Accounts): ${validEmails.join(', ')}`)
    } else {
      console.log('CC: No notification accounts configured in settings.')
    }
    console.log(`Subject: ${emailSubject}`)
    console.log(`Body:\n${emailBody}`)
    console.log('--- END REJECTION NOTIFICATION ---')

    return new Response(
      JSON.stringify({ success: true, message: 'Notification triggered successfully' }),
      {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: 200,
      },
    )
  } catch (error: any) {
    console.error('Error in send-rejection-email:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 500,
    })
  }
})
