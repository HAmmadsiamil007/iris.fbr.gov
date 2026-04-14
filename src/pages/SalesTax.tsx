import { useState } from 'react';
import { Building2, Info } from 'lucide-react';

export default function SalesTax() {
  const [tab, setTab] = useState<'return' | 'rates' | 'learn'>('return');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-5 space-y-5">
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl p-4 text-white">
        <div className="flex items-center gap-3">
          <Building2 size={24} />
          <div>
            <h2 className="font-bold text-base">Sales Tax / SRB (Sindh Revenue Board)</h2>
            <p className="text-blue-100 text-xs">Sales Tax Act 1990 | Federal & Provincial</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl">
        {([['return', 'Monthly Return'], ['rates', 'Tax Rates'], ['learn', 'Learn']] as const).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-semibold transition-colors border-b-2 ${tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'return' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          {!submitted ? (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-800 border-b pb-2">Monthly Sales Tax Return</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Registration Period</label>
                  <input type="month" defaultValue="2025-01" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">STRN (Sales Tax Reg. Number)</label>
                  <input type="text" defaultValue="12-34-5678-901-23" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead className="bg-blue-50">
                    <tr>
                      {['Description', 'Taxable Value (PKR)', 'Tax Rate', 'Tax Amount (PKR)'].map(h => (
                        <th key={h} className="text-left px-3 py-2.5 border border-gray-200 font-semibold text-blue-800">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Taxable Supplies (Standard Rate)', '', '18%', ''],
                      ['Zero-Rated Supplies (Exports)', '', '0%', '—'],
                      ['Exempt Supplies', '', 'Exempt', '—'],
                      ['Reduced Rate Supplies', '', '5% / 10%', ''],
                    ].map(([desc, val, rate, tax]) => (
                      <tr key={desc} className="even:bg-gray-50">
                        <td className="px-3 py-2 border border-gray-200">{desc}</td>
                        <td className="px-3 py-2 border border-gray-200">
                          {val === '' ? <input type="number" placeholder="0" className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" /> : val}
                        </td>
                        <td className="px-3 py-2 border border-gray-200 font-semibold text-blue-700">{rate}</td>
                        <td className="px-3 py-2 border border-gray-200">
                          {tax === '' ? <input type="number" placeholder="Auto" className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" /> : tax}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-blue-50 font-bold">
                      <td className="px-3 py-2 border border-gray-200">Total Output Tax</td>
                      <td className="px-3 py-2 border border-gray-200">—</td>
                      <td className="px-3 py-2 border border-gray-200">—</td>
                      <td className="px-3 py-2 border border-gray-200 text-blue-700">PKR —</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto mt-3">
                <p className="text-xs font-bold text-gray-700 mb-2">Input Tax Credit</p>
                <table className="w-full text-xs border-collapse">
                  <thead className="bg-green-50">
                    <tr>
                      {['Description', 'Invoice Value (PKR)', 'Input Tax (PKR)'].map(h => (
                        <th key={h} className="text-left px-3 py-2.5 border border-gray-200 font-semibold text-green-800">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {['Local Purchases (Registered Suppliers)', 'Import of Goods', 'Services (Eligible Input)'].map(desc => (
                      <tr key={desc} className="even:bg-gray-50">
                        <td className="px-3 py-2 border border-gray-200">{desc}</td>
                        <td className="px-3 py-2 border border-gray-200"><input type="number" placeholder="0" className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-green-400" /></td>
                        <td className="px-3 py-2 border border-gray-200"><input type="number" placeholder="0" className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-green-400" /></td>
                      </tr>
                    ))}
                    <tr className="bg-green-50 font-bold">
                      <td className="px-3 py-2 border border-gray-200">Total Input Tax Credit</td>
                      <td className="px-3 py-2 border border-gray-200">—</td>
                      <td className="px-3 py-2 border border-gray-200 text-green-700">PKR —</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-600 text-white rounded-xl p-4 flex justify-between items-center">
                <span className="font-bold">Net Sales Tax Payable (Output - Input)</span>
                <span className="font-black text-xl">PKR —</span>
              </div>

              <button onClick={() => setSubmitted(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors">
                Submit Monthly Return
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-1">Sales Tax Return Filed!</h3>
              <p className="text-gray-500 text-sm mb-3">Your monthly sales tax return has been submitted successfully.</p>
              <p className="text-xs text-gray-400">Acknowledgment: STR-{Date.now().toString().slice(-8)}</p>
              <button onClick={() => setSubmitted(false)} className="mt-4 text-blue-600 text-sm hover:underline">← File Another Return</button>
            </div>
          )}
        </div>
      )}

      {tab === 'rates' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-sm text-gray-800">Sales Tax Rates — Pakistan 2024-25</h3>
          {[
            {
              title: 'Federal Sales Tax (GST)',
              items: [
                ['Standard Rate', '18%', 'Most goods and services'],
                ['Reduced Rate', '10%', 'Selected items (textiles, etc.)'],
                ['Reduced Rate', '5%', 'Basic necessities, poultry feed, etc.'],
                ['Zero Rate', '0%', 'Exports, certain foods'],
                ['Exempt', 'Nil', 'Essential food items, medicines, books'],
              ]
            },
            {
              title: 'Special / Additional Rates',
              items: [
                ['Petroleum Products', 'Varying', 'Petrol, diesel, ATF'],
                ['Tobacco Products', '100%', 'Cigarettes — additional levy'],
                ['Sugar', '8%', 'Industrial sugar'],
                ['Cement', 'Fixed per bag', 'PKR 2 per kg'],
                ['Beverages (Aerated)', '25%', 'Carbonated drinks'],
              ]
            }
          ].map(section => (
            <div key={section.title}>
              <p className="text-xs font-bold text-gray-700 mb-2">{section.title}</p>
              <table className="w-full text-xs border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    {['Category', 'Rate', 'Applicable To'].map(h => (
                      <th key={h} className="text-left px-3 py-2 border border-gray-200 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.items.map(([cat, rate, desc]) => (
                    <tr key={cat + rate} className="even:bg-gray-50">
                      <td className="px-3 py-2 border border-gray-200">{cat}</td>
                      <td className="px-3 py-2 border border-gray-200 font-bold text-blue-700">{rate}</td>
                      <td className="px-3 py-2 border border-gray-200 text-gray-500">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {tab === 'learn' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-sm text-gray-800">Understanding Sales Tax in Pakistan</h3>
          {[
            { q: 'What is Sales Tax?', a: 'Sales Tax is an indirect tax levied on the sale of goods and services. In Pakistan, federal GST is governed by the Sales Tax Act 1990, while provincial services tax is governed by respective provincial acts (KPRA, PBRA, SRB, RARA).' },
            { q: 'Who must register for Sales Tax?', a: 'Any person engaged in taxable supply of goods/services with annual turnover exceeding PKR 10 million must register. Manufacturers, importers, and distributors are also required to register regardless of turnover.' },
            { q: 'What is Input Tax Credit?', a: 'A registered person can claim credit for sales tax paid on purchases (inputs) against the sales tax collected on sales (outputs). Only registered taxpayers can claim input tax credit.' },
            { q: 'What is a Zero-Rated supply?', a: 'Zero-rated supplies are taxable but at 0% rate. Exporters fall in this category. They can still claim input tax credit, making them different from exempt supplies.' },
            { q: 'What are Exempt Supplies?', a: 'Exempt supplies are not subject to sales tax (e.g., basic foodstuffs, medicines, books). No input tax credit is available for exempt supplies.' },
            { q: 'When is the Sales Tax Return due?', a: 'Monthly returns must be filed by the 15th of the following month. For example, January 2025 return is due by February 15, 2025.' },
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-blue-50 px-4 py-2.5 flex items-center gap-2">
                <Info size={14} className="text-blue-600" />
                <p className="text-sm font-semibold text-blue-800">{item.q}</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
