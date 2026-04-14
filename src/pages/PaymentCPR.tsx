import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, CheckCircle, Download, Search } from 'lucide-react';

export default function PaymentCPR() {
  const { payments } = useApp();
  const [tab, setTab] = useState<'create' | 'verify' | 'history'>('create');
  const [submitted, setSubmitted] = useState(false);
  const [cpnSearch, setCpnSearch] = useState('');
  const [verified, setVerified] = useState<null | 'found' | 'not-found'>(null);

  const paymentTypes = [
    'Income Tax (Self-Assessment) — Section 137',
    'Advance Tax (Quarterly) — Section 147',
    'Withholding Tax — Section 153',
    'Capital Value Tax — Section 7E',
    'Penalty — Section 182',
    'Sales Tax',
    'Federal Excise Duty',
    'Default Surcharge — Section 205',
    'Tax on Prize Bonds',
  ];

  const banks = [
    'Habib Bank Limited (HBL)',
    'United Bank Limited (UBL)',
    'MCB Bank',
    'Allied Bank Limited (ABL)',
    'National Bank of Pakistan (NBP)',
    'Bank Alfalah',
    'Meezan Bank',
    'Standard Chartered',
    'Faysal Bank',
    'Bank Al-Habib',
  ];

  const [form, setForm] = useState({
    taxYear: '2024-25',
    paymentType: '',
    bank: '',
    amount: '',
    accountType: 'Current',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleVerify = () => {
    if (cpnSearch.length < 5) return;
    const found = payments.some(p => p.cpn.toLowerCase().includes(cpnSearch.toLowerCase()));
    setVerified(found ? 'found' : 'not-found');
  };

  const fakeCPR = `CPN-${Date.now().toString().slice(-8)}`;

  return (
    <div className="p-5 space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-white">
        <div className="flex items-center gap-3">
          <CreditCard size={24} />
          <div>
            <h2 className="font-bold text-base">Payment / CPR (Computerized Payment Receipt)</h2>
            <p className="text-blue-100 text-xs">Create payment challan, verify CPR, and view payment history</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl">
        {([['create', 'Create Payment (CPR)'], ['verify', 'Verify CPR'], ['history', 'Payment History']] as const).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-semibold transition-colors border-b-2 ${tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Create CPR */}
      {tab === 'create' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          {!submitted ? (
            <form onSubmit={handleCreate} className="space-y-4">
              <h3 className="font-bold text-gray-800 text-sm border-b pb-2">Generate Payment Challan (PSID/CPR)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Tax Year *</label>
                  <select value={form.taxYear} onChange={e => setForm({ ...form, taxYear: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                    {['2024-25', '2023-24', '2022-23', '2021-22'].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Payment Type *</label>
                  <select value={form.paymentType} onChange={e => setForm({ ...form, paymentType: e.target.value })} required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">— Select Payment Type —</option>
                    {paymentTypes.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Payment Amount (PKR) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400 text-xs font-semibold">PKR</span>
                    <input
                      type="number"
                      value={form.amount}
                      onChange={e => setForm({ ...form, amount: e.target.value })}
                      required
                      placeholder="Enter amount"
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Select Bank *</label>
                  <select value={form.bank} onChange={e => setForm({ ...form, bank: e.target.value })} required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">— Select Bank —</option>
                    {banks.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Account Type</label>
                  <select value={form.accountType} onChange={e => setForm({ ...form, accountType: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Current</option>
                    <option>Savings</option>
                    <option>Cash Deposit</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Period</label>
                  <input type="month" defaultValue="2025-01"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Remarks / Description</label>
                <textarea rows={2} placeholder="Optional description"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <CreditCard size={15} /> Generate CPR
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={30} className="text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">CPR Generated Successfully!</h3>
              <div className="bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-300 rounded-xl p-5 text-left max-w-md mx-auto space-y-2 text-sm">
                <div className="text-center border-b pb-2 mb-3">
                  <p className="font-black text-[#006400] text-lg">COMPUTERIZED PAYMENT RECEIPT</p>
                  <p className="text-xs text-gray-500">Federal Board of Revenue — Practice Portal</p>
                </div>
                <div className="flex justify-between"><span className="text-gray-500">CPR/CPN No:</span><span className="font-bold text-blue-700">{fakeCPR}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Payment Type:</span><span className="font-semibold">{form.paymentType.split('—')[0].trim()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tax Year:</span><span className="font-semibold">{form.taxYear}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Bank:</span><span className="font-semibold">{form.bank.split('(')[0].trim()}</span></div>
                <div className="flex justify-between border-t pt-2 mt-2"><span className="text-gray-700 font-bold">Amount (PKR):</span><span className="font-black text-green-700 text-lg">PKR {parseFloat(form.amount || '0').toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Date:</span><span>{new Date().toLocaleDateString('en-PK')}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className="text-yellow-600 font-semibold">Pending Bank Confirmation</span></div>
              </div>
              <div className="flex gap-3 justify-center">
                <button className="bg-[#006400] text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#004d00]">
                  <Download size={14} /> Download CPR
                </button>
                <button onClick={() => setSubmitted(false)} className="border border-gray-300 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50">
                  Create New
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Verify CPR */}
      {tab === 'verify' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-gray-800 text-sm">Verify CPR / CPN Number</h3>
          <p className="text-xs text-gray-500">Enter your CPR/CPN number to verify payment status with FBR.</p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                value={cpnSearch}
                onChange={e => setCpnSearch(e.target.value)}
                placeholder="Enter CPR/CPN Number (e.g. CPN-2024-98765)"
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button onClick={handleVerify} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
              Verify
            </button>
          </div>
          {verified === 'found' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
                <CheckCircle size={16} /> Payment Verified Successfully
              </div>
              {payments.filter(p => p.cpn.toLowerCase().includes(cpnSearch.toLowerCase())).map(p => (
                <div key={p.id} className="grid grid-cols-2 gap-2 text-xs text-gray-600 border-t pt-2">
                  <span><strong>CPR/CPN:</strong> {p.cpn}</span>
                  <span><strong>Amount:</strong> PKR {p.amount.toLocaleString()}</span>
                  <span><strong>Date:</strong> {p.date}</span>
                  <span><strong>Bank:</strong> {p.bank}</span>
                  <span><strong>Type:</strong> {p.type}</span>
                  <span><strong>Status:</strong> <span className="text-green-600 font-semibold">{p.status}</span></span>
                </div>
              ))}
            </div>
          )}
          {verified === 'not-found' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              ❌ No payment found with this CPR/CPN number. Please check and try again.
            </div>
          )}
        </div>
      )}

      {/* Payment History */}
      {tab === 'history' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm">Payment History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  {['Date', 'CPR/CPN', 'Payment Type', 'Bank', 'Amount (PKR)', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-gray-500 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">{p.date}</td>
                    <td className="px-4 py-3 font-mono text-blue-600">{p.cpn}</td>
                    <td className="px-4 py-3 text-gray-700">{p.type}</td>
                    <td className="px-4 py-3">{p.bank}</td>
                    <td className="px-4 py-3 font-bold text-gray-800">{p.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${p.status === 'Verified' ? 'bg-green-100 text-green-700' : p.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:underline flex items-center gap-1">
                        <Download size={11} /> CPR
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
