
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LoanApplication {
  loanType: 'personal' | 'business' | 'mortgage' | 'car';
  amount: number;
  currency: string;
  purpose: string;
  term: number; // in months
  monthlyIncome: number;
  employmentStatus: string;
  collateral?: string;
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

    console.log(`Loans management action: ${action}`)

    switch (action) {
      case 'apply':
        return await applyForLoan(req, supabaseClient, user.id)
      case 'eligibility':
        return await checkLoanEligibility(req, supabaseClient, user.id)
      case 'calculator':
        return await calculateLoan(req, supabaseClient)
      case 'applications':
        return await getUserLoanApplications(req, supabaseClient, user.id)
      default:
        return new Response(
          JSON.stringify({ error: 'إجراء غير موجود' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('Loans management error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function applyForLoan(req: Request, supabase: any, userId: string) {
  const loanData: LoanApplication = await req.json()
  
  console.log('Processing loan application:', loanData)

  // Calculate interest rate based on loan type and amount
  const interestRates = {
    'personal': 0.12,
    'business': 0.08,
    'mortgage': 0.05,
    'car': 0.07
  }

  const interestRate = interestRates[loanData.loanType]
  const monthlyPayment = calculateMonthlyPayment(loanData.amount, interestRate, loanData.term)

  // Create loan application record
  const { data: application, error: applicationError } = await supabase
    .from('loan_applications')
    .insert({
      user_id: userId,
      loan_type: loanData.loanType,
      amount: loanData.amount,
      currency: loanData.currency,
      purpose: loanData.purpose,
      term_months: loanData.term,
      interest_rate: interestRate,
      monthly_payment: monthlyPayment,
      monthly_income: loanData.monthlyIncome,
      employment_status: loanData.employmentStatus,
      collateral: loanData.collateral,
      status: 'pending'
    })
    .select()
    .single()

  if (applicationError) {
    console.error('Loan application error:', applicationError)
    throw new Error('فشل في تقديم طلب القرض')
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'تم تقديم طلب القرض بنجاح',
      application: application,
      monthlyPayment: monthlyPayment
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function checkLoanEligibility(req: Request, supabase: any, userId: string) {
  const { monthlyIncome, requestedAmount, existingDebts = 0 } = await req.json()
  
  console.log('Checking loan eligibility:', { monthlyIncome, requestedAmount, existingDebts })

  // Simple eligibility calculation
  const debtToIncomeRatio = (existingDebts + (requestedAmount * 0.1)) / monthlyIncome
  const maxLoanAmount = monthlyIncome * 40 // 40x monthly income
  
  const eligible = debtToIncomeRatio <= 0.4 && requestedAmount <= maxLoanAmount
  
  return new Response(
    JSON.stringify({
      success: true,
      eligible: eligible,
      maxLoanAmount: maxLoanAmount,
      debtToIncomeRatio: debtToIncomeRatio,
      message: eligible ? 'مؤهل للحصول على القرض' : 'غير مؤهل للحصول على القرض'
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function calculateLoan(req: Request, supabase: any) {
  const { amount, interestRate, termMonths } = await req.json()
  
  const monthlyPayment = calculateMonthlyPayment(amount, interestRate, termMonths)
  const totalPayment = monthlyPayment * termMonths
  const totalInterest = totalPayment - amount
  
  return new Response(
    JSON.stringify({
      success: true,
      monthlyPayment: monthlyPayment,
      totalPayment: totalPayment,
      totalInterest: totalInterest,
      effectiveRate: interestRate
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function getUserLoanApplications(req: Request, supabase: any, userId: string) {
  const { data: applications, error } = await supabase
    .from('loan_applications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Get loan applications error:', error)
    throw new Error('فشل في جلب طلبات القروض')
  }

  return new Response(
    JSON.stringify({
      success: true,
      applications: applications || []
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

function calculateMonthlyPayment(principal: number, annualRate: number, termMonths: number): number {
  const monthlyRate = annualRate / 12
  if (monthlyRate === 0) return principal / termMonths
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
         (Math.pow(1 + monthlyRate, termMonths) - 1)
}
