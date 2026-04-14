export type Page =
  | 'login'
  | 'dashboard'
  | 'return-filing'
  | 'income-tax'
  | 'sales-tax'
  | 'withholding'
  | 'payment'
  | 'notices'
  | 'profile'
  | 'ntn-registration'
  | 'wealth-statement'
  | 'tax-calculator'
  | 'pra'
  | 'secp'
  | 'fed'
  | 'customs'
  | 'financial-statements'
  | 'auditing'
  | 'costing-budgeting'
  | 'registrations';

export interface User {
  name: string;
  ntn: string;
  cnic: string;
  email: string;
  phone: string;
  address: string;
  taxYear: string;
  status: 'Active Filer' | 'Non-Filer' | 'Inactive';
}

export interface TaxReturn {
  id: string;
  year: string;
  type: string;
  status: 'Filed' | 'Pending' | 'Draft' | 'Under Review';
  submittedDate: string;
  taxPayable: number;
  refundable: number;
}

export interface Notice {
  id: string;
  date: string;
  subject: string;
  section: string;
  dueDate: string;
  status: 'Open' | 'Responded' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
}

export interface Payment {
  id: string;
  date: string;
  type: string;
  amount: number;
  cpn: string;
  bank: string;
  status: 'Verified' | 'Pending' | 'Failed';
}
