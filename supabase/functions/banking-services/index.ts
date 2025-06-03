
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from './cors.ts'
import { handleMoneyTransfer } from './money-transfer.ts'
import { handleSwiftTransfer } from './swift-transfer.ts'
import { handleBillPayment } from './bill-payment.ts'
import { handleMobileTopup } from './mobile-topup.ts'
import { handleCurrencyExchange } from './currency-exchange.ts'
import { getAccountBalance } from './account-balance.ts'
import { getTransactionHistory } from './transaction-history.ts'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      throw new Error('غير مصرح: يجب تسجيل الدخول أولاً')
    }

    const url = new URL(req.url)
    const service = url.pathname.split('/').pop()

    console.log(`Banking service requested: ${service}`)

    let result;

    switch (service) {
      case 'transfer':
        result = await handleMoneyTransfer(req, supabaseClient, user.id)
        break
      case 'swift-transfer':
        result = await handleSwiftTransfer(req, supabaseClient, user.id)
        break
      case 'bill-payment':
        result = await handleBillPayment(req, supabaseClient, user.id)
        break
      case 'mobile-topup':
        result = await handleMobileTopup(req, supabaseClient, user.id)
        break
      case 'currency-exchange':
        result = await handleCurrencyExchange(req, supabaseClient, user.id)
        break
      case 'account-balance':
        result = await getAccountBalance(req, supabaseClient, user.id)
        break
      case 'transaction-history':
        result = await getTransactionHistory(req, supabaseClient, user.id)
        break
      default:
        return new Response(
          JSON.stringify({ error: 'خدمة غير موجودة' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Banking service error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
