import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  let retries = 0
  let delay = 1000

  while (retries < maxRetries) {
    const response = await fetch(url, options)

    if (response.ok) {
      return response
    }

    if (response.status === 429) {
      retries++
      if (retries === maxRetries) {
        throw new Error(`Rate limit exceeded after ${maxRetries} retries`)
      }
      console.log(`Rate limited (429). Retrying in ${delay}ms...`)
      await sleep(delay)
      delay *= 2 // Exponential backoff
    } else {
      const errorText = await response.text()
      throw new Error(
        `Failed to send notification: ${response.status} ${response.statusText} - ${errorText}`,
      )
    }
  }
  throw new Error('Max retries reached')
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      webhookUrl,
      title,
      message,
      severity = 'Info',
      system = 'Imobiliária Digital',
      url = '',
    } = await req.json()

    if (!webhookUrl) {
      throw new Error('Webhook URL is required')
    }

    const card = {
      type: 'message',
      attachments: [
        {
          contentType: 'application/vnd.microsoft.card.adaptive',
          content: {
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            type: 'AdaptiveCard',
            version: '1.4',
            body: [
              {
                type: 'TextBlock',
                size: 'Medium',
                weight: 'Bolder',
                text: title,
              },
              {
                type: 'FactSet',
                facts: [
                  { title: 'Severidade:', value: severity },
                  { title: 'Sistema afetado:', value: system },
                  { title: 'Data/hora:', value: new Date().toISOString() },
                ],
              },
              {
                type: 'TextBlock',
                text: message,
                wrap: true,
              },
            ],
            actions: url
              ? [
                  {
                    type: 'Action.OpenUrl',
                    title: 'Ver Detalhes',
                    url: url,
                  },
                ]
              : [],
          },
        },
      ],
    }

    const payloadString = JSON.stringify(card)

    // Check size limit (~28KB)
    if (new TextEncoder().encode(payloadString).length > 28000) {
      throw new Error('Payload exceeds Teams 28KB limit')
    }

    await fetchWithRetry(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payloadString,
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error sending to Teams:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 500,
    })
  }
})
