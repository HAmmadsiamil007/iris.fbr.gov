import { createContext, useContext, useState, ReactNode } from 'react';
import { Page, User, TaxReturn, Notice, Payment } from '../types';

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  user: User;
  taxReturns: TaxReturn[];
  notices: Notice[];
  payments: Payment[];
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

const defaultUser: User = {
  name: 'Muhammad Ali Khan',
  ntn: '1234567-8',
  cnic: '42101-1234567-1',
  email: 'ali.khan@example.com',
  phone: '+92-300-1234567',
  address: 'House # 12, Street 5, F-7/3, Islamabad',
  taxYear: '2024-25',
  status: 'Active Filer',
};

const defaultReturns: TaxReturn[] = [
  { id: 'ITR-2024-001', year: '2023-24', type: 'Income Tax Return', status: 'Filed', submittedDate: '30-Sep-2024', taxPayable: 85000, refundable: 0 },
  { id: 'ITR-2023-001', year: '2022-23', type: 'Income Tax Return', status: 'Filed', submittedDate: '28-Sep-2023', taxPayable: 72000, refundable: 5000 },
  { id: 'ITR-2022-001', year: '2021-22', type: 'Income Tax Return', status: 'Filed', submittedDate: '30-Sep-2022', taxPayable: 55000, refundable: 0 },
  { id: 'ITR-2025-001', year: '2024-25', type: 'Income Tax Return', status: 'Draft', submittedDate: '-', taxPayable: 0, refundable: 0 },
];

const defaultNotices: Notice[] = [
  { id: 'NOT-001', date: '15-Jan-2025', subject: 'Notice under Section 114(4) - Return Filing', section: '114(4)', dueDate: '15-Feb-2025', status: 'Open', priority: 'High' },
  { id: 'NOT-002', date: '10-Dec-2024', subject: 'Audit Notice under Section 177', section: '177', dueDate: '10-Jan-2025', status: 'Responded', priority: 'Medium' },
  { id: 'NOT-003', date: '05-Nov-2024', subject: 'Tax Recovery Notice Section 137', section: '137', dueDate: '20-Nov-2024', status: 'Closed', priority: 'Low' },
];

const defaultPayments: Payment[] = [
  { id: 'PAY-001', date: '28-Sep-2024', type: 'Income Tax (Self-Assessment)', amount: 85000, cpn: 'CPN-2024-98765', bank: 'HBL', status: 'Verified' },
  { id: 'PAY-002', date: '15-Sep-2024', type: 'Advance Tax (Qtr-4)', amount: 25000, cpn: 'CPN-2024-87654', bank: 'MCB', status: 'Verified' },
  { id: 'PAY-003', date: '15-Jun-2024', type: 'Advance Tax (Qtr-3)', amount: 25000, cpn: 'CPN-2024-76543', bank: 'UBL', status: 'Verified' },
  { id: 'PAY-004', date: '20-Jan-2025', type: 'Penalty under 182', amount: 5000, cpn: 'CPN-2025-11111', bank: 'Allied Bank', status: 'Pending' },
];

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isLoggedIn,
        setIsLoggedIn,
        user: defaultUser,
        taxReturns: defaultReturns,
        notices: defaultNotices,
        payments: defaultPayments,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
