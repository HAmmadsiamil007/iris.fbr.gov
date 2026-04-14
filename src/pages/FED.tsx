import { useState } from 'react';
import { FileText, Send, Info, CheckCircle, Calculator, ShieldCheck } from 'lucide-react';

export default function FED() {
  const [tab, setTab] = useState<'return' | 'rates' | 'learn'>('return');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-red-700 to-red-900 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <ShieldCheck size={32} />
          <div>
            <h1 className="text-2xl font-bold">Federal Excise Duty (FED)</h1>
            <p className="text-red-100 opacity-90">Federal Excise Act 2005 | Selective Consumption Tax</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl overflow-hidden shadow-sm">
        {[
          { id: 'return', label: 'Monthly FED Return', icon: <FileText size={16} /> },
          { id: 'rates', label: 'Excise Rates (1st Schedule)', icon: <Calculator size={16} /> },
          { id: 'learn', label: 'Key Concepts', icon: <Info size={16} /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'return' | 'rates' | 'learn')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
              tab === t.id 
                ? 'border-red-600 text-red-600 bg-red-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {tab === 'return' && (
          <div className="space-y-6">
            {!submitted ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-sm text-gray-800">Monthly Federal Excise Return</h3>
                  <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full uppercase">Monthly</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Tax Period</label>
                    <input type="month" defaultValue="2025-01" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Registration Number</label>
                    <input type="text" defaultValue="1234567-8" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead className="bg-red-50">
                      <tr>
                        {['Goods/Services Description', 'Taxable Value (PKR)', 'FED Rate', 'FED Payable (PKR)'].map(h => (
                          <th key={h} className="text-left px-4 py-3 border border-gray-200 font-semibold text-red-900">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Beverages / Aerated Waters', '', '20%', ''],
                        ['Cigarettes (Tobacco products)', '', 'Specific Rate', ''],
                        ['Cement (Specific rate per kg)', '', 'PKR 2.0/kg', ''],
                        ['Telecommunication Services', '', '19.5%', ''],
                        ['Banking Services', '', '16%', ''],
                      ].map(([desc, val, rate, tax]) => (
                        <tr key={desc} className="hover:bg-gray-50">
                          <td className="px-4 py-3 border border-gray-200 font-medium text-gray-700">{desc}</td>
                          <td className="px-4 py-3 border border-gray-200">
                            {val === '' ? <input type="number" placeholder="0" className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-red-400 outline-none" /> : val}
                          </td>
                          <td className="px-4 py-3 border border-gray-200 font-bold text-red-600">{rate}</td>
                          <td className="px-4 py-3 border border-gray-200 font-semibold text-gray-800">
                            {tax === '' ? <input type="number" placeholder="Auto" className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-red-400 outline-none" /> : tax}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={() => setSubmitted(true)}
                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-red-700 transition-colors shadow-md"
                  >
                    <Send size={16} />
                    Submit FED Return
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">FED Return Filed!</h3>
                <p className="text-sm text-gray-500">Your Federal Excise Duty return for Jan 2025 has been successfully submitted.</p>
                <button onClick={() => setSubmitted(false)} className="text-red-600 font-bold text-sm hover:underline mt-4 block mx-auto">File Another Return</button>
              </div>
            )}
          </div>
        )}

        {tab === 'rates' && (
          <div className="space-y-4">
             <h3 className="font-bold text-lg text-gray-800">First Schedule of Federal Excise Act</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 border rounded-lg">
                  <h4 className="text-sm font-bold text-red-900 mb-2">Excise on Goods</h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex justify-between border-b pb-1"><span>Edible Oils</span> <span className="font-bold">16%</span></li>
                    <li className="flex justify-between border-b pb-1"><span>Fruit Juices</span> <span className="font-bold">10%</span></li>
                    <li className="flex justify-between border-b pb-1"><span>Aerated Waters</span> <span className="font-bold">20%</span></li>
                    <li className="flex justify-between border-b pb-1"><span>Steel Products</span> <span className="font-bold">Specific</span></li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 border rounded-lg">
                  <h4 className="text-sm font-bold text-red-900 mb-2">Excise on Services</h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex justify-between border-b pb-1"><span>Telecom Services</span> <span className="font-bold">19.5%</span></li>
                    <li className="flex justify-between border-b pb-1"><span>Banking Services</span> <span className="font-bold">16%</span></li>
                    <li className="flex justify-between border-b pb-1"><span>Insurance (other than life)</span> <span className="font-bold">16%</span></li>
                    <li className="flex justify-between border-b pb-1"><span>Chartered Flights</span> <span className="font-bold">16%</span></li>
                  </ul>
                </div>
             </div>
          </div>
        )}

        {tab === 'learn' && (
          <div className="prose prose-sm max-w-none space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Understanding Federal Excise Duty</h3>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-bold text-red-800 mb-2">1. Ad Valorem vs Specific Duty</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ad Valorem duty is calculated as a percentage of the value of goods. Specific duty is calculated based on quantity, weight, or volume (e.g., per cigarette or per kg of cement).
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-bold text-red-800 mb-2">2. Zero-Rating</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Goods exported out of Pakistan are zero-rated for Federal Excise Duty, meaning the rate is 0% and any input duty paid is refundable.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
