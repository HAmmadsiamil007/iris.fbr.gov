import { useApp } from '../context/AppContext';
import { Page } from '../types';
import {
  LayoutDashboard, FileText, Receipt, Building2, CreditCard,
  Bell, User, Calculator, ChevronLeft, ChevronRight, LogOut, FileCheck,
  ShieldCheck, Ship, BarChart3, Search, DollarSign, UserPlus
} from 'lucide-react';

interface NavItem {
  label: string;
  page: Page;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', page: 'dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Registrations', page: 'registrations', icon: <UserPlus size={18} /> },
  { label: 'Return Filing History', page: 'return-filing', icon: <FileText size={18} /> },
  { label: 'Income Tax', page: 'income-tax', icon: <FileCheck size={18} /> },
  { label: 'Sales Tax', page: 'sales-tax', icon: <Building2 size={18} /> },
  { label: 'Withholding Tax', page: 'withholding', icon: <Receipt size={18} /> },
  { label: 'PRA (Provincial)', page: 'pra', icon: <Building2 size={18} /> },
  { label: 'SECP (Corporate)', page: 'secp', icon: <Building2 size={18} /> },
  { label: 'FED (Excise)', page: 'fed', icon: <ShieldCheck size={18} /> },
  { label: 'Customs', page: 'customs', icon: <Ship size={18} /> },
  { label: 'Financial Statements', page: 'financial-statements', icon: <BarChart3 size={18} /> },
  { label: 'Auditing', page: 'auditing', icon: <Search size={18} /> },
  { label: 'Costing & Budgeting', page: 'costing-budgeting', icon: <DollarSign size={18} /> },
  { label: 'Wealth Statement', page: 'wealth-statement', icon: <FileText size={18} /> },
  { label: 'Tax Calculator', page: 'tax-calculator', icon: <Calculator size={18} /> },
  { label: 'Payment / CPR', page: 'payment', icon: <CreditCard size={18} /> },
  { label: 'Notices / Hearings', page: 'notices', icon: <Bell size={18} />, badge: 1 },
  { label: 'My Profile', page: 'profile', icon: <User size={18} /> },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, sidebarOpen, setSidebarOpen, user, setIsLoggedIn } = useApp();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  return (
    <aside
      className={`${sidebarOpen ? 'w-60' : 'w-16'} min-h-screen bg-gradient-to-b from-[#004d00] to-[#002600] flex flex-col transition-all duration-300 shadow-xl flex-shrink-0`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-2 px-3 py-4 border-b border-white/10 ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#006400] font-black text-sm">☪</span>
            </div>
            <div>
              <p className="text-white font-bold text-xs leading-tight">FBR IRIS</p>
              <p className="text-green-300 text-[10px]">Practice Portal</p>
            </div>
          </div>
        )}
        {!sidebarOpen && (
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#006400] font-black text-sm">☪</span>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white/60 hover:text-white transition-colors"
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* User Info */}
      {sidebarOpen && (
        <div className="px-3 py-3 border-b border-white/10">
          <div className="bg-white/10 rounded-lg p-2.5">
            <p className="text-white text-xs font-semibold truncate">{user.name}</p>
            <p className="text-green-300 text-[10px]">NTN: {user.ntn}</p>
            <span className="inline-block mt-1 bg-green-400 text-green-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              {user.status}
            </span>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map(item => {
          const active = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              title={!sidebarOpen ? item.label : ''}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all text-xs font-medium relative
                ${active
                  ? 'bg-white text-[#006400] shadow font-bold'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
                }
                ${!sidebarOpen ? 'justify-center' : ''}
              `}
            >
              <span className={`flex-shrink-0 ${active ? 'text-[#006400]' : ''}`}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && item.badge && (
                <span className="ml-auto bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {!sidebarOpen && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-colors text-xs font-medium ${!sidebarOpen ? 'justify-center' : ''}`}
          title={!sidebarOpen ? 'Logout' : ''}
        >
          <LogOut size={16} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
