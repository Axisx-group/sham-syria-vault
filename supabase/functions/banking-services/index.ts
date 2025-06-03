import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: string;
  note?: string;
}

interface SwiftTransferRequest {
  fromAccount: string;
  beneficiaryName: string;
  beneficiaryAddress?: string;
  beneficiaryAccount: string;
  swiftCode: string;
  bankName?: string;
  bankAddress?: string;
  amount: number;
  currency: string;
  purpose: string;
  reference?: string;
}

interface BillPaymentRequest {
  billType: string;
  billNumber: string;
  amount: number;
  fromAccount: string;
  currency: string;
}

interface MobileTopupRequest {
  phoneNumber: string;
  operator: string;
  amount: number;
  fromAccount: string;
}

interface CurrencyExchangeRequest {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  fromAccount: string;
  toAccount: string;
}

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

    switch (service) {
      case 'transfer':
        return await handleMoneyTransfer(req, supabaseClient, user.id)
      case 'swift-transfer':
        return await handleSwiftTransfer(req, supabaseClient, user.id)
      case 'bill-payment':
        return await handleBillPayment(req, supabaseClient, user.id)
      case 'mobile-topup':
        return await handleMobileTopup(req, supabaseClient, user.id)
      case 'currency-exchange':
        return await handleCurrencyExchange(req, supabaseClient, user.id)
      case 'account-balance':
        return await getAccountBalance(req, supabaseClient, user.id)
      case 'transaction-history':
        return await getTransactionHistory(req, supabaseClient, user.id)
      default:
        return new Response(
          JSON.stringify({ error: 'خدمة غير موجودة' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('Banking service error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function handleMoneyTransfer(req: Request, supabase: any, userId: string) {
  const transferData: TransferRequest = await req.json()
  
  console.log('Processing money transfer:', transferData)

  // Validate transfer data
  if (!transferData.fromAccount || !transferData.toAccount || !transferData.amount) {
    throw new Error('بيانات التحويل غير مكتملة')
  }

  if (transferData.amount <= 0) {
    throw new Error('مبلغ التحويل يجب أن يكون أكبر من الصفر')
  }

  // Create transaction record
  const { data: transaction, error: transactionError } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      type: 'transfer',
      amount: transferData.amount,
      currency: transferData.currency || 'SYP',
      from_account: transferData.fromAccount,
      to_account: transferData.toAccount,
      description: transferData.note || 'تحويل أموال',
      status: 'completed'
    })
    .select()
    .single()

  if (transactionError) {
    console.error('Transaction creation error:', transactionError)
    throw new Error('فشل في إنشاء معاملة التحويل')
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'تم التحويل بنجاح',
      transaction: transaction
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function handleSwiftTransfer(req: Request, supabase: any, userId: string) {
  const swiftData: SwiftTransferRequest = await req.json()
  
  console.log('Processing SWIFT transfer:', swiftData)

  // Validate SWIFT transfer data
  if (!swiftData.fromAccount || !swiftData.beneficiaryName || !swiftData.beneficiaryAccount || 
      !swiftData.swiftCode || !swiftData.amount || !swiftData.purpose) {
    throw new Error('بيانات تحويل السويفت غير مكتملة')
  }

  if (swiftData.amount <= 0) {
    throw new Error('مبلغ التحويل يجب أن يكون أكبر من الصفر')
  }

  // Validate SWIFT code format (8 or 11 characters)
  if (!/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(swiftData.swiftCode)) {
    throw new Error('رمز السويفت غير صحيح')
  }

  // Calculate fees (base fee of 25 USD + percentage)
  const baseFee = 25;
  const percentageFee = swiftData.amount * 0.001; // 0.1%
  const totalFee = baseFee + percentageFee;

  // Create transaction record
  const { data: transaction, error: transactionError } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      type: 'swift_transfer',
      amount: swiftData.amount,
      currency: swiftData.currency,
      from_account: swiftData.fromAccount,
      to_account: swiftData.beneficiaryAccount,
      description: `تحويل سويفت إلى ${swiftData.beneficiaryName} - ${swiftData.purpose}`,
      status: 'pending',
      metadata: {
        beneficiaryName: swiftData.beneficiaryName,
        beneficiaryAddress: swiftData.beneficiaryAddress,
        swiftCode: swiftData.swiftCode,
        bankName: swiftData.bankName,
        bankAddress: swiftData.bankAddress,
        purpose: swiftData.purpose,
        reference: swiftData.reference,
        fees: totalFee,
        processingTime: '1-3 business days'
      }
    })
    .select()
    .single()

  if (transactionError) {
    console.error('SWIFT transfer error:', transactionError)
    throw new Error('فشل في إرسال تحويل السويفت')
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'تم إرسال تحويل السويفت بنجاح',
      transaction: transaction,
      fees: totalFee,
      processingTime: '1-3 business days'
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function handleBillPayment(req: Request, supabase: any, userId: string) {
  const billData: BillPaymentRequest = await req.json()
  
  console.log('Processing bill payment:', billData)

  // Validate bill payment data
  if (!billData.billType || !billData.billNumber || !billData.amount || !billData.fromAccount) {
    throw new Error('بيانات دفع الفاتورة غير مكتملة')
  }

  if (billData.amount <= 0) {
    throw new Error('مبلغ الفاتورة يجب أن يكون أكبر من الصفر')
  }

  // Create transaction record
  const { data: transaction, error: transactionError } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      type: 'bill_payment',
      amount: billData.amount,
      currency: billData.currency || 'SYP',
      from_account: billData.fromAccount,
      description: `دفع فاتورة ${billData.billType} - ${billData.billNumber}`,
      status: 'completed',
      metadata: {
        billType: billData.billType,
        billNumber: billData.billNumber
      }
    })
    .select()
    .single()

  if (transactionError) {
    console.error('Bill payment error:', transactionError)
    throw new Error('فشل في دفع الفاتورة')
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'تم دفع الفاتورة بنجاح',
      transaction: transaction
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function handleMobileTopup(req: Request, supabase: any, userId: string) {
  const topupData: MobileTopupRequest = await req.json()
  
  console.log('Processing mobile topup:', topupData)

  // Validate topup data
  if (!topupData.phoneNumber || !topupData.operator || !topupData.amount || !topupData.fromAccount) {
    throw new Error('بيانات شحن الهاتف غير مكتملة')
  }

  if (topupData.amount <= 0) {
    throw new Error('مبلغ الشحن يجب أن يكون أكبر من الصفر')
  }

  // Create transaction record
  const { data: transaction, error: transactionError } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      type: 'mobile_topup',
      amount: topupData.amount,
      currency: 'SYP',
      from_account: topupData.fromAccount,
      description: `شحن هاتف ${topupData.phoneNumber} - ${topupData.operator}`,
      status: 'completed',
      metadata: {
        phoneNumber: topupData.phoneNumber,
        operator: topupData.operator
      }
    })
    .select()
    .single()

  if (transactionError) {
    console.error('Mobile topup error:', transactionError)
    throw new Error('فشل في شحن الهاتف')
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'تم شحن الهاتف بنجاح',
      transaction: transaction
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function handleCurrencyExchange(req: Request, supabase: any, userId: string) {
  const exchangeData: CurrencyExchangeRequest = await req.json()
  
  console.log('Processing currency exchange:', exchangeData)

  // Mock exchange rates
  const exchangeRates: Record<string, Record<string, number>> = {
    'SYP': { 'USD': 0.0004, 'EUR': 0.00037 },
    'USD': { 'SYP': 2500, 'EUR': 0.92 },
    'EUR': { 'SYP': 2700, 'USD': 1.09 }
  }

  const rate = exchangeRates[exchangeData.fromCurrency]?.[exchangeData.toCurrency]
  if (!rate) {
    throw new Error('زوج العملات غير مدعوم')
  }

  const convertedAmount = exchangeData.amount * rate

  // Create transaction record
  const { data: transaction, error: transactionError } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      type: 'currency_exchange',
      amount: exchangeData.amount,
      currency: exchangeData.fromCurrency,
      from_account: exchangeData.fromAccount,
      to_account: exchangeData.toAccount,
      description: `صرف عملة ${exchangeData.amount} ${exchangeData.fromCurrency} إلى ${convertedAmount.toFixed(2)} ${exchangeData.toCurrency}`,
      status: 'completed',
      metadata: {
        fromCurrency: exchangeData.fromCurrency,
        toCurrency: exchangeData.toCurrency,
        exchangeRate: rate,
        convertedAmount: convertedAmount
      }
    })
    .select()
    .single()

  if (transactionError) {
    console.error('Currency exchange error:', transactionError)
    throw new Error('فشل في صرف العملة')
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'تم صرف العملة بنجاح',
      transaction: transaction,
      convertedAmount: convertedAmount,
      exchangeRate: rate
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function getAccountBalance(req: Request, supabase: any, userId: string) {
  // Mock account balances
  const balances = {
    'main-syp': { balance: 2450000, currency: 'SYP' },
    'savings-syp': { balance: 850000, currency: 'SYP' },
    'main-usd': { balance: 15000, currency: 'USD' },
    'main-eur': { balance: 12000, currency: 'EUR' },
    'savings-usd': { balance: 8500, currency: 'USD' }
  }

  return new Response(
    JSON.stringify({
      success: true,
      balances: balances
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function getTransactionHistory(req: Request, supabase: any, userId: string) {
  const url = new URL(req.url)
  const limit = parseInt(url.searchParams.get('limit') || '10')
  const offset = parseInt(url.searchParams.get('offset') || '0')

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Transaction history error:', error)
    throw new Error('فشل في جلب تاريخ المعاملات')
  }

  return new Response(
    JSON.stringify({
      success: true,
      transactions: transactions || []
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}
