
import { SwiftTransferRequest } from './types.ts';

export async function handleSwiftTransfer(req: Request, supabase: any, userId: string) {
  const swiftData: SwiftTransferRequest = await req.json();
  
  console.log('Processing SWIFT transfer:', swiftData);

  // Validate SWIFT transfer data
  if (!swiftData.fromAccount || !swiftData.beneficiaryName || !swiftData.beneficiaryAccount || 
      !swiftData.swiftCode || !swiftData.amount || !swiftData.purpose) {
    throw new Error('بيانات تحويل السويفت غير مكتملة');
  }

  if (swiftData.amount <= 0) {
    throw new Error('مبلغ التحويل يجب أن يكون أكبر من الصفر');
  }

  // Validate SWIFT code format (8 or 11 characters)
  if (!/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(swiftData.swiftCode)) {
    throw new Error('رمز السويفت غير صحيح');
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
    .single();

  if (transactionError) {
    console.error('SWIFT transfer error:', transactionError);
    throw new Error('فشل في إرسال تحويل السويفت');
  }

  return {
    success: true,
    message: 'تم إرسال تحويل السويفت بنجاح',
    transaction: transaction,
    fees: totalFee,
    processingTime: '1-3 business days'
  };
}
