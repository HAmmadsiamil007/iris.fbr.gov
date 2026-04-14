import { useState } from 'react';
import { TrendingUp, Info } from 'lucide-react';

export default function WealthStatement() {
  const [submitted, setSubmitted] = useState(false);

  const assets = [
    { category: 'Immovable Property', items: ['Residential House / Flat', 'Commercial Property', 'Agricultural Land', 'Plot / Open Land'] },
    { category: 'Movable Property', items: ['Motor Vehicle(s)', 'Gold / Jewellery / Precious Metals', 'Paintings / Antiques / Art', 'Household Furniture & Fixtures'] },
    { category: 'Financial Assets', items: ['Cash in Hand', 'Bank Balances (Current / Savings)', 'Term Deposits / RDAs', 'Shares / Stocks (Listed)', 'Mutual Fund Units', 'Prize Bonds', 'NIT / NSS / SSCs'] },
    { category: 'Business Assets', items: ['Capital in Business / Partnership', 'Loans Given to Others', 'Stock in Trade', 'Other Business Assets'] },
  ];

  const liabilities = [
    'Home Loan / Mortgage',
    'Car Financing',
    'Business Loan',
    'Personal Loan',
    'Credit Card Balance',
    'Tax Arrears',
    'Other Liabilities',
  ];

  return (
    <div className="p-5 space-y-5">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-white">
        <div className="flex items-center gap-3">
          <TrendingUp size={24} />
          <div>
            <h2 className="font-bold text-base">Wealth Statement (Section 116)</h2>
            <p className="text-purple-100 text-xs">Mandatory for taxable income exceeding PKR 1 Million — Tax Year 2024-25</p>
          </div>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
        <Info size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-yellow-800">Section 116 — Wealth Statement Requirement</p>
          <p className="text-xs text-yellow-700 mt-0.5">Every taxpayer whose taxable income exceeds PKR 1,000,000 in a tax year must file a wealth statement. Failure is penalized under Section 182. Assets not reconciled with income may be taxed under Section 111 at 30%.</p>
        </div>
      </div>

      {!submitted ? (
        <div className="space-y-5">
          {/* Assets */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="font-bold text-sm text-gray-800 border-b pb-2 mb-4 text-green-700">Assets — Opening Balance (01-Jul-2024)</h3>
            <div className="space-y-5">
              {assets.map(cat => (
                <div key={cat.category}>
                  <p className="text-xs font-bold text-gray-700 mb-2 bg-green-50 px-3 py-1.5 rounded-lg">{cat.category}</p>
                  <div className="space-y-2 pl-2">
                    {cat.items.map(item => (
                      <div key={item} className="flex items-center justify-between gap-3">
                        <label className="text-xs text-gray-600 flex-1">{item}</label>
                        <div className="flex gap-2">
                          <div className="relative">
                            <span className="absolute left-2 top-1.5 text-gray-400 text-[10px]">PKR</span>
                            <input type="number" placeholder="Opening" className="w-28 border border-gray-300 rounded pl-7 pr-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-400" />
                          </div>
                          <div className="relative">
                            <span className="absolute left-2 top-1.5 text-gray-400 text-[10px]">PKR</span>
                            <input type="number" placeholder="Closing" className="w-28 border border-gray-300 rounded pl-7 pr-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="font-bold text-sm text-red-700 border-b pb-2 mb-4">Liabilities — Closing Balance (30-Jun-2025)</h3>
            <div className="space-y-2">
              {liabilities.map(item => (
                <div key={item} className="flex items-center justify-between gap-3">
                  <label className="text-xs text-gray-600 flex-1">{item}</label>
                  <div className="relative">
                    <span className="absolute left-2 top-1.5 text-gray-400 text-[10px]">PKR</span>
                    <input type="number" placeholder="Amount" className="w-32 border border-gray-300 rounded pl-7 pr-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reconciliation */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="font-bold text-sm text-gray-800 border-b pb-2 mb-4">Income & Expenditure Reconciliation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ['Total Income (from Return)', 'Pre-filled from ITR'],
                ['Net Increase in Assets', 'Closing - Opening'],
                ['Personal Expenditure', 'Household expenses'],
                ['Taxes Paid', 'Income tax, property tax'],
                ['Zakat / Charity Paid', 'Donations, Zakat'],
                ['Other Outflows', 'Describe below'],
              ].map(([label, hint]) => (
                <div key={label}>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">{label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-400 text-xs">PKR</span>
                    <input type="number" placeholder={hint} className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors"
          >
            Submit Wealth Statement
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">Wealth Statement Filed!</h3>
          <p className="text-gray-500 text-sm mb-2">Your wealth statement for Tax Year 2024-25 has been submitted.</p>
          <p className="text-xs text-gray-400">Acknowledgment: WS-{Date.now().toString().slice(-8)}</p>
          <button onClick={() => setSubmitted(false)} className="mt-4 text-purple-600 text-sm hover:underline">← Go Back</button>
        </div>
      )}
    </div>
  );
}
