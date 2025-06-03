
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CardRequest {
  cardType: 'debit' | 'credit';
  accountId: string;
  currency: string;
  dailyLimit?: number;
  monthlyLimit?: number;
}

interface CardAction {
  cardId: string;
  action: 'block' | 'unblock' | 'activate' | 'deactivate';
}

serve(async (req) => {
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

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      throw new Error('غير مصرح: يجب تسجيل الدخول أولاً')
    }

    const url = new URL(req.url)
    const action = url.pathname.split('/').pop()

    console.log(`Cards management action: ${action}`)

    switch (action) {
      case 'request-card':
        return await requestNewCard(req, supabaseClient, user.id)
      case 'manage-card':
        return await manageCard(req, supabaseClient, user.id)
      case 'get-cards':
        return await getUserCards(req, supabaseClient, user.id)
      case 'card-transactions':
        return await getCardTransactions(req, supabaseClient, user.id)
      default:
        return new Response(
          JSON.stringify({ error: 'إجراء غير موجود' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('Cards management error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function requestNewCard(req: Request, supabase: any, userId: string) {
  const cardData: CardRequest = await req.json()
  
  console.log('Processing card request:', cardData)

  // Generate card number (mock)
  const cardNumber = `4${Math.random().toString().substring(2, 16)}`
  const expiryDate = new Date()
  expiryDate.setFullYear(expiryDate.getFullYear() + 3)

  // Create card record
  const { data: card, error: cardError } = await supabase
    .from('cards')
    .insert({
      user_id: userId,
      card_number: cardNumber,
      card_type: cardData.cardType,
      account_id: cardData.accountId,
      currency: cardData.currency,
      status: 'pending',
      daily_limit: cardData.dailyLimit || 50000,
      monthly_limit: cardData.monthlyLimit || 1000000,
      expiry_date: expiryDate.toISOString().split('T')[0]
    })
    .select()
    .single()

  if (cardError) {
    console.error('Card creation error:', cardError)
    throw new Error('فشل في طلب البطاقة')
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'تم تقديم طلب البطاقة بنجاح',
      card: card
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function manageCard(req: Request, supabase: any, userId: string) {
  const actionData: CardAction = await req.json()
  
  console.log('Managing card:', actionData)

  const statusMap = {
    'block': 'blocked',
    'unblock': 'active',
    'activate': 'active',
    'deactivate': 'inactive'
  }

  const { data: card, error: updateError } = await supabase
    .from('cards')
    .update({ status: statusMap[actionData.action] })
    .eq('id', actionData.cardId)
    .eq('user_id', userId)
    .select()
    .single()

  if (updateError) {
    console.error('Card update error:', updateError)
    throw new Error('فشل في تحديث حالة البطاقة')
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: `تم ${actionData.action === 'block' ? 'حظر' : actionData.action === 'unblock' ? 'إلغاء حظر' : actionData.action === 'activate' ? 'تفعيل' : 'إلغاء تفعيل'} البطاقة بنجاح`,
      card: card
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function getUserCards(req: Request, supabase: any, userId: string) {
  const { data: cards, error } = await supabase
    .from('cards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Get cards error:', error)
    throw new Error('فشل في جلب البطاقات')
  }

  return new Response(
    JSON.stringify({
      success: true,
      cards: cards || []
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function getCardTransactions(req: Request, supabase: any, userId: string) {
  const url = new URL(req.url)
  const cardId = url.searchParams.get('cardId')
  const limit = parseInt(url.searchParams.get('limit') || '10')

  if (!cardId) {
    throw new Error('معرف البطاقة مطلوب')
  }

  // Mock card transactions
  const transactions = Array.from({ length: limit }, (_, i) => ({
    id: `tx_${i + 1}`,
    amount: Math.floor(Math.random() * 10000) + 100,
    currency: 'SYP',
    merchant: `متجر ${i + 1}`,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    type: Math.random() > 0.5 ? 'purchase' : 'withdrawal'
  }))

  return new Response(
    JSON.stringify({
      success: true,
      transactions: transactions
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}
