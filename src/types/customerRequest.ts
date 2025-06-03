
export interface NewCustomerRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountType: string;
  requestDate: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  documents?: string[];
  notes?: string;
}
