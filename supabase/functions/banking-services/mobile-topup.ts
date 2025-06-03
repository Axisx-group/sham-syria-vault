
import { MobileTopupRequest } from './types.ts';

export async function handleMobileTopup(req: Request, supabase: any, userId: string) {
  const topupData: MobileTopupRequest = await req.json();
  
  console.log('Processing mobile topup:', topupData);

  // Validate topup data
  if (!topupData.phoneNumber || !topupData.operator || !topupData.amount || !topupData.fromAccount) {
    throw new Error('بيانات شحن الهاتف غير مكتملة');
  }

  if (topupData.amount <= 0) {
    throw new Error('مبلغ الشحن يجب أن يكون أكبر من الصفر');
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
    .single();

  if (transactionError) {
    console.error('Mobile topup error:', transactionError);
    throw new Error('فشل في شحن الهاتف');
  }

  return {
    success: true,
    message: 'تم شحن الهاتف بنجاح',
    transaction: transaction
  };
}
