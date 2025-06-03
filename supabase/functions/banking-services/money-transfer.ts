
import { TransferRequest } from './types.ts';

export async function handleMoneyTransfer(req: Request, supabase: any, userId: string) {
  const transferData: TransferRequest = await req.json();
  
  console.log('Processing money transfer:', transferData);

  // Validate transfer data
  if (!transferData.fromAccount || !transferData.toAccount || !transferData.amount) {
    throw new Error('بيانات التحويل غير مكتملة');
  }

  if (transferData.amount <= 0) {
    throw new Error('مبلغ التحويل يجب أن يكون أكبر من الصفر');
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
    .single();

  if (transactionError) {
    console.error('Transaction creation error:', transactionError);
    throw new Error('فشل في إنشاء معاملة التحويل');
  }

  return {
    success: true,
    message: 'تم التحويل بنجاح',
    transaction: transaction
  };
}
