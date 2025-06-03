
import { BillPaymentRequest } from './types.ts';

export async function handleBillPayment(req: Request, supabase: any, userId: string) {
  const billData: BillPaymentRequest = await req.json();
  
  console.log('Processing bill payment:', billData);

  // Validate bill payment data
  if (!billData.billType || !billData.billNumber || !billData.amount || !billData.fromAccount) {
    throw new Error('بيانات دفع الفاتورة غير مكتملة');
  }

  if (billData.amount <= 0) {
    throw new Error('مبلغ الفاتورة يجب أن يكون أكبر من الصفر');
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
    .single();

  if (transactionError) {
    console.error('Bill payment error:', transactionError);
    throw new Error('فشل في دفع الفاتورة');
  }

  return {
    success: true,
    message: 'تم دفع الفاتورة بنجاح',
    transaction: transaction
  };
}
