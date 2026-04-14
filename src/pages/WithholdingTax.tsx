import { useState } from 'react';
import { Receipt } from 'lucide-react';

export default function WithholdingTax() {
  const [submitted, setSubmitted] = useState(false);

  const rates = [
    { section: '149', description: 'Salary', rate: 'As per slab (0–35%)', type: 'Deduction' },
    { section: '150', description: 'Dividend', rate: '15%', type: 'Deduction' },
    { section: '151', description: 'Profit on Debt (Bank Interest)', rate: '15%', type: 'Deduction' },
    { section: '152', description: 'Payment to Non-Residents', rate: '20% (varies)', type: 'Deduction' },
    { section: '153(1)(a)', description: 'Sale of Goods (by Company)', rate: '4%', type: 'Deduction' },
    { section: '153(1)(a)', description: 'Sale of Goods (by Individual)', rate: '4.5%', type: 'Deduction' },
    { section: '153(1)(b)', description: 'Transport Services', rate: '2%', type: 'Deduction' },
    { section: '153(1)(c)', description: 'Other Services (Company)', rate: '8%', type: 'Deduction' },
    { section: '153(1)(c)', description: 'Other Services (Individual)', rate: '10%', type: 'Deduction' },
    { section: '155', description: 'Rent of Immovable Property', rate: '15% (>PKR 2M/year)', type: 'Deduction' },
    { section: '156', description: 'Prize & Winnings', rate: '20%', type: 'Deduction' },
    { section: '231B', description: 'Cash Withdrawal from Bank', rate: '0.6% (Non-Filer)', type: 'Collection' },
    { section: '236A', description: 'Advance tax on auction / sale', rate: '10%', type: 'Collection' },
    { section: '236C', description: 'Sale of Immovable Property', rate: '3% (Filer) / 6% (Non-Filer)', type: 'Collection' },
    { section: '236K', description: 'Purchase of Immovable Property', rate: '3% (Filer) / 6% (Non-Filer)', type: 'Collection' },
  ];

  return (
    <div className="p-5 space-y-5">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-4 text-white">
        <div className="flex items-center gap-3">
          <Receipt size={24} />
          <div>
            <h2 className="font-bold text-base">Withholding Tax Statement (Section 165)</h2>
            <p className="text-teal-100 text-xs">Bi-Annual Statement — Income Tax Ordinance 2001</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Filing Form */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          {!submitted ? (
            <>
              <h3 className="font-bold text-sm text-gray-800 border-b pb-2">File Withholding Statement</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Period</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                    <option>July–December 2024</option>
                    <option>January–June 2024</option>
                    <option>July–December 2023</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Withholding Agent NTN</label>
                  <input type="text" defaultValue="1234567-8" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-700 mb-2">Deductions / Collections Summary</p>
                <div className="space-y-2">
                  {[
                    { section: '149 — Salary', placeholder: 'No. of employees' },
                    { section: '153 — Goods/Services', placeholder: 'No. of transactions' },
                    { section: '155 — Rent', placeholder: 'No. of payments' },
                    { section: '151 — Profit on Debt', placeholder: 'No. of payees' },
                  ].map(row => (
                    <div key={row.section} className="grid grid-cols-3 gap-2 items-center">
                      <span className="text-xs text-gray-600 col-span-1">{row.section}</span>
                      <input type="number" placeholder={row.placeholder} className="col-span-1 border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400" />
                      <div className="relative col-span-1">
                        <span className="absolute left-2 top-1.5 text-gray-400 text-[10px]">PKR</span>
                        <input type="number" placeholder="Tax amount" className="w-full border border-gray-300 rounded pl-8 pr-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Total Deductions Made</label>
                  <input type="number" placeholder="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Total Deposited (PKR)</label>
                  <input type="number" placeholder="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
              </div>

              <button onClick={() => setSubmitted(true)} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors">
                Submit Withholding Statement
              </button>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-lg text-gray-800 mb-1">Statement Submitted!</h3>
              <p className="text-xs text-gray-400">Ref: WH-{Date.now().toString().slice(-8)}</p>
              <button onClick={() => setSubmitted(false)} className="mt-4 text-teal-600 text-sm hover:underline">← Submit Another</button>
            </div>
          )}
        </div>

        {/* Rates Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-bold text-sm text-gray-800 mb-3">Withholding Tax Rates (FY 2024-25)</h3>
          <div className="overflow-y-auto max-h-96">
            <table className="w-full text-xs border-collapse">
              <thead className="bg-teal-50 sticky top-0">
                <tr>
                  {['Section', 'Description', 'Rate', 'Type'].map(h => (
                    <th key={h} className="text-left px-2 py-2 border border-gray-200 font-semibold text-teal-800">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rates.map((r, i) => (
                  <tr key={i} className="even:bg-gray-50 hover:bg-teal-50 transition-colors">
                    <td className="px-2 py-2 border border-gray-200 font-mono text-blue-600 font-semibold whitespace-nowrap">{r.section}</td>
                    <td className="px-2 py-2 border border-gray-200 text-gray-700">{r.description}</td>
                    <td className="px-2 py-2 border border-gray-200 font-bold text-teal-700 whitespace-nowrap">{r.rate}</td>
                    <td className="px-2 py-2 border border-gray-200">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${r.type === 'Deduction' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {r.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">* Rates may vary for filers vs non-filers. Source: Finance Act 2024 (Practice only)</p>
        </div>
      </div>
    </div>
  );
}
