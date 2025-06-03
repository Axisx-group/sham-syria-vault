
export async function getAccountBalance(req: Request, supabase: any, userId: string) {
  // Mock account balances
  const balances = {
    'main-syp': { balance: 2450000, currency: 'SYP' },
    'savings-syp': { balance: 850000, currency: 'SYP' },
    'main-usd': { balance: 15000, currency: 'USD' },
    'main-eur': { balance: 12000, currency: 'EUR' },
    'savings-usd': { balance: 8500, currency: 'USD' }
  };

  return {
    success: true,
    balances: balances
  };
}
