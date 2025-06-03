
import { CurrencyExchangeRequest } from './types.ts';

export async function handleCurrencyExchange(req: Request, supabase: any, userId: string) {
  const exchangeData: CurrencyExchangeRequest = await req.json();
  
  console.log('Processing currency exchange:', exchangeData);

  // Mock exchange rates
  const exchangeRates: Record<string, Record<string, number>> = {
    'SYP': { 'USD': 0.0004, 'EUR': 0.00037 },
    'USD': { 'SYP': 2500, 'EUR': 0.92 },
    'EUR': { 'SYP': 2700, 'USD': 1.09 }
  };

  const rate = exchangeRates[exchangeData.fromCurrency]?.[exchangeData.toCurrency];
  if (!rate) {
    throw new Error('زوج العملات غير مدعوم');
  }

  const convertedAmount = exchangeData.amount * rate;

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
    .single();

  if (transactionError) {
    console.error('Currency exchange error:', transactionError);
    throw new Error('فشل في صرف العملة');
  }

  return {
    success: true,
    message: 'تم صرف العملة بنجاح',
    transaction: transaction,
    convertedAmount: convertedAmount,
    exchangeRate: rate
  };
}
