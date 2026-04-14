import { useApp } from '../context/AppContext';
import { Bell, HelpCircle, Search, ChevronDown } from 'lucide-react';

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  'return-filing': 'Return Filing',
  'income-tax': 'Income Tax',
  'sales-tax': 'Sales Tax / SRB',
  withholding: 'Withholding Tax Statements',
  payment: 'Payment / CPR Verification',
  notices: 'Notices & Hearings',
  profile: 'My Profile & Registration',
  'ntn-registration': 'NTN Registration',
  'wealth-statement': 'Wealth Statement',
  'tax-calculator': 'Tax Calculator',
  pra: 'Punjab Revenue Authority (PRA)',
  secp: 'Corporate Compliance (SECP)',
  fed: 'Federal Excise Duty (FED)',
  customs: 'Customs & WeBOC',
  'financial-statements': 'Financial Statements',
  auditing: 'Auditing Standards',
  'costing-budgeting': 'Costing & Budgeting',
  registrations: 'Tax Registrations',
};

export default function TopBar() {
  const { currentPage, user, notices } = useApp();
  const openNotices = notices.filter(n => n.status === 'Open').length;

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between gap-4 shadow-sm">
      {/* Left: Page title */}
      <div>
        <h2 className="text-sm font-bold text-gray-800">{pageTitles[currentPage] || 'IRIS Portal'}</h2>
        <p className="text-[10px] text-gray-400">Tax Year: {user.taxYear} | NTN: {user.ntn}</p>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 max-w-sm">
        <div className="relative w-full">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search services, forms, sections..."
            className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]/30 bg-gray-50"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="relative text-gray-500 hover:text-[#006400] transition-colors">
          <Bell size={18} />
          {openNotices > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {openNotices}
            </span>
          )}
        </button>
        <button className="text-gray-500 hover:text-[#006400] transition-colors">
          <HelpCircle size={18} />
        </button>
        <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
          <div className="w-7 h-7 bg-[#006400] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-700 leading-tight">{user.name.split(' ')[0]}</p>
            <p className="text-[9px] text-gray-400">{user.cnic}</p>
          </div>
          <ChevronDown size={12} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}
