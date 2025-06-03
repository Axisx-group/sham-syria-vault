
export async function getTransactionHistory(req: Request, supabase: any, userId: string) {
  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const offset = parseInt(url.searchParams.get('offset') || '0');

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Transaction history error:', error);
    throw new Error('فشل في جلب تاريخ المعاملات');
  }

  return {
    success: true,
    transactions: transactions || []
  };
}
