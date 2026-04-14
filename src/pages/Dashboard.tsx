import { useApp } from '../context/AppContext';
import {
  FileText, CreditCard, Bell, TrendingUp, AlertTriangle,
  CheckCircle, ArrowRight, Download, Info, UserPlus, Building2, BarChart3, Calculator
} from 'lucide-react';

export default function Dashboard() {
  const { user, taxReturns, notices, payments, setCurrentPage } = useApp();

  const totalPaid = payments.filter(p => p.status === 'Verified').reduce((s, p) => s + p.amount, 0);
  const openNotices = notices.filter(n => n.status === 'Open').length;
  const filedReturns = taxReturns.filter(r => r.status === 'Filed').length;

  const stats = [
    { label: 'Filing Status', value: user.status, sub: `Tax Year ${user.taxYear}`, icon: <CheckCircle size={20} />, color: 'bg-green-500', textColor: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Returns Filed', value: String(filedReturns), sub: 'Total submissions', icon: <FileText size={20} />, color: 'bg-blue-500', textColor: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Tax Paid (FY24)', value: `PKR ${(totalPaid).toLocaleString()}`, sub: 'Verified payments', icon: <CreditCard size={20} />, color: 'bg-purple-500', textColor: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Open Notices', value: String(openNotices), sub: 'Requires attention', icon: <Bell size={20} />, color: 'bg-red-500', textColor: 'text-red-600', bg: 'bg-red-50' },
  ];

  const quickActions = [
    { label: 'NTN/STRN Reg.', page: 'registrations' as const, icon: <UserPlus size={16} />, color: 'bg-teal-600 text-white' },
    { label: 'File Income Tax', page: 'income-tax' as const, icon: <FileText size={16} />, color: 'bg-[#006400] text-white' },
    { label: 'PRA Services', page: 'pra' as const, icon: <Building2 size={16} />, color: 'bg-orange-600 text-white' },
    { label: 'SECP Compliance', page: 'secp' as const, icon: <Building2 size={16} />, color: 'bg-indigo-600 text-white' },
    { label: 'Financial Stmts', page: 'financial-statements' as const, icon: <BarChart3 size={16} />, color: 'bg-emerald-600 text-white' },
    { label: 'Tax Calculator', page: 'tax-calculator' as const, icon: <Calculator size={16} />, color: 'bg-orange-500 text-white' },
  ];

  return (
    <div className="p-5 space-y-5">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#006400] to-[#228B22] rounded-xl p-5 text-white flex items-center justify-between">
        <div>
          <p className="text-green-200 text-sm">Welcome back,</p>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-green-100 text-xs mt-0.5">NTN: {user.ntn} | CNIC: {user.cnic}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-semibold">{user.status}</span>
            <span className="text-green-200 text-xs">Last Login: Today, 10:42 AM</span>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end gap-2">
          <div className="bg-white/15 rounded-lg px-4 py-2 text-right">
            <p className="text-green-200 text-xs">Current Tax Year</p>
            <p className="text-white font-bold text-lg">{user.taxYear}</p>
            <p className="text-yellow-300 text-xs">Due: 30-Sep-2025</p>
          </div>
          <button
            onClick={() => setCurrentPage('income-tax')}
            className="bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-yellow-300 transition-colors flex items-center gap-1"
          >
            File Now <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Notice Alert */}
      {openNotices > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle size={20} className="text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-700 text-sm font-semibold">You have {openNotices} open notice(s) requiring your response</p>
            <p className="text-red-500 text-xs">Please respond before the due date to avoid penalties under Section 182.</p>
          </div>
          <button onClick={() => setCurrentPage('notices')} className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors font-semibold">
            View
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-white shadow-sm`}>
            <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center text-white mb-3`}>
              {s.icon}
            </div>
            <p className={`text-lg font-bold ${s.textColor}`}>{s.value}</p>
            <p className="text-gray-600 text-xs font-medium">{s.label}</p>
            <p className="text-gray-400 text-[10px]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map(a => (
            <button
              key={a.label}
              onClick={() => setCurrentPage(a.page)}
              className={`${a.color} rounded-xl p-3 text-center hover:opacity-90 transition-all shadow-sm hover:shadow-md flex flex-col items-center gap-2`}
            >
              {a.icon}
              <span className="text-[11px] font-semibold leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lower Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Returns */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-700">Recent Tax Returns</h3>
            <button onClick={() => setCurrentPage('return-filing')} className="text-[#006400] text-xs hover:underline flex items-center gap-1">
              View All <ArrowRight size={11} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {taxReturns.slice(0, 4).map(r => (
              <div key={r.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-xs font-semibold text-gray-700">{r.type} — {r.year}</p>
                  <p className="text-[10px] text-gray-400">ID: {r.id} | {r.submittedDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  {r.taxPayable > 0 && <span className="text-xs text-gray-600 font-semibold">PKR {r.taxPayable.toLocaleString()}</span>}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    r.status === 'Filed' ? 'bg-green-100 text-green-700' :
                    r.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                    r.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-700">Notices & Hearings</h3>
            <button onClick={() => setCurrentPage('notices')} className="text-[#006400] text-xs hover:underline flex items-center gap-1">
              View All <ArrowRight size={11} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {notices.map(n => (
              <div key={n.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-700 leading-tight">{n.subject}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Sec. {n.section} | Due: {n.dueDate}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      n.priority === 'High' ? 'bg-red-100 text-red-700' :
                      n.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{n.priority}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                      n.status === 'Open' ? 'bg-red-50 text-red-600' :
                      n.status === 'Responded' ? 'bg-blue-50 text-blue-600' :
                      'bg-green-50 text-green-600'
                    }`}>{n.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FBR Info Bar */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
        <Info size={18} className="text-blue-500 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-blue-800 text-xs font-semibold">Important Dates — Tax Year 2024-25</p>
          <div className="flex flex-wrap gap-4 mt-1">
            {[
              ['ITR Filing Deadline', '30-Sep-2025'],
              ['Advance Tax (Q1)', '15-Sep-2024'],
              ['Advance Tax (Q2)', '15-Dec-2024'],
              ['Advance Tax (Q3)', '15-Mar-2025'],
              ['Advance Tax (Q4)', '15-Jun-2025'],
            ].map(([label, date]) => (
              <span key={label} className="text-blue-600 text-[10px]">
                <strong>{label}:</strong> {date}
              </span>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-1 text-blue-600 text-xs hover:underline">
          <Download size={12} /> Tax Calendar
        </button>
      </div>
    </div>
  );
}
