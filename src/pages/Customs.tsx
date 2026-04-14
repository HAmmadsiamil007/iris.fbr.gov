import { useState } from 'react';
import { FileText, Info, Calculator, Ship } from 'lucide-react';

export default function Customs() {
  const [tab, setTab] = useState<'calculator' | 'rates' | 'learn'>('calculator');
  const [calculated, setCalculated] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-cyan-700 to-cyan-900 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <Ship size={32} />
          <div>
            <h1 className="text-2xl font-bold">Customs Duties & WeBOC</h1>
            <p className="text-cyan-100 opacity-90">Customs Act 1969 | Import & Export Regulations</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl overflow-hidden shadow-sm">
        {[
          { id: 'calculator', label: 'Import Duty Calculator', icon: <Calculator size={16} /> },
          { id: 'rates', label: 'Tariff Schedule', icon: <FileText size={16} /> },
          { id: 'learn', label: 'Key Concepts', icon: <Info size={16} /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'calculator' | 'rates' | 'learn')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
              tab === t.id 
                ? 'border-cyan-600 text-cyan-600 bg-cyan-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {tab === 'calculator' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-gray-800 border-b pb-2 uppercase">Import Valuation (Dummy Data)</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">HS Code (Harmonized System)</label>
                    <input type="text" placeholder="e.g., 8471.3010" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-400 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">C&F Value (USD)</label>
                    <input type="number" placeholder="5000" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-400 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Exchange Rate (PKR/USD)</label>
                    <input type="number" defaultValue="280.50" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-400 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Insurance (1%)</label>
                    <input type="number" placeholder="50" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 outline-none" readOnly />
                  </div>
                  <button
                    onClick={() => setCalculated(true)}
                    className="w-full bg-cyan-600 text-white font-bold py-2.5 rounded-lg text-sm hover:bg-cyan-700 transition-colors shadow-md"
                  >
                    Calculate Duties
                  </button>
                </div>
              </div>

              <div className={`space-y-4 transition-opacity duration-500 ${calculated ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                <h3 className="font-bold text-sm text-gray-800 border-b pb-2 uppercase">Duty Structure & Taxes</h3>
                <div className="space-y-2">
                  {[
                    ['Customs Duty (CD) @ 11%', '154,275'],
                    ['Additional Customs Duty (ACD) @ 2%', '28,050'],
                    ['Regulatory Duty (RD) @ 0%', '0'],
                    ['Sales Tax (ST) @ 18%', '285,120'],
                    ['Income Tax (WHT) @ 6%', '95,040'],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between items-center text-xs p-2.5 bg-gray-50 rounded border border-gray-100">
                      <span className="text-gray-600">{label}</span>
                      <span className="font-bold text-cyan-800">PKR {val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-3 bg-cyan-50 rounded border-2 border-cyan-200 mt-4">
                    <span className="text-xs font-black text-cyan-900 uppercase">Total Duty & Taxes</span>
                    <span className="text-base font-black text-cyan-700">PKR 562,485</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'rates' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center border-b pb-4">
               <h3 className="text-lg font-bold text-gray-800">Customs Tariff Schedule (Sample)</h3>
               <span className="text-xs font-bold text-cyan-600">FY 2024-25</span>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-xs">
                 <thead className="bg-cyan-50">
                   <tr>
                     <th className="p-3 text-left border font-bold text-cyan-900">HS Code</th>
                     <th className="p-3 text-left border font-bold text-cyan-900">Description</th>
                     <th className="p-3 text-left border font-bold text-cyan-900">CD %</th>
                     <th className="p-3 text-left border font-bold text-cyan-900">ACD %</th>
                   </tr>
                 </thead>
                 <tbody>
                   {[
                     ['8471.3010', 'Laptop Computers', '0%', '0%'],
                     ['8517.1300', 'Smartphones', 'PKR 15,000/Unit', '3%'],
                     ['8703.2311', 'Motor Vehicles (1300cc)', '50%', '7%'],
                     ['2710.1210', 'Motor Spirit (Petrol)', '10%', '2%'],
                   ].map(([hs, desc, cd, acd]) => (
                     <tr key={hs} className="hover:bg-gray-50 border-b">
                       <td className="p-3 border font-mono font-bold text-cyan-700">{hs}</td>
                       <td className="p-3 border text-gray-700">{desc}</td>
                       <td className="p-3 border font-bold">{cd}</td>
                       <td className="p-3 border font-bold">{acd}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}

        {tab === 'learn' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Customs Concepts & Procedures</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 border rounded-lg">
                <h4 className="text-sm font-bold text-cyan-800 mb-2">1. WeBOC System</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Web Based One Customs (WeBOC) is the automated system for clearance of imports and exports. It connects importers, exporters, clearing agents, and terminal operators.
                </p>
              </div>
              <div className="p-4 bg-gray-50 border rounded-lg">
                <h4 className="text-sm font-bold text-cyan-800 mb-2">2. GD (Goods Declaration)</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The primary document filed by the importer/agent in WeBOC. It contains details of the consignment, valuation, and calculation of duties.
                </p>
              </div>
              <div className="p-4 bg-gray-50 border rounded-lg">
                <h4 className="text-sm font-bold text-cyan-800 mb-2">3. ITP (Import Trade Price)</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The value assessed by Customs for the purpose of levying duties. It can be based on the declared invoice or valuation rulings issued by the Director of Valuation.
                </p>
              </div>
              <div className="p-4 bg-gray-50 border rounded-lg">
                <h4 className="text-sm font-bold text-cyan-800 mb-2">4. SROs (Statutory Regulatory Orders)</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Government notifications that provide exemptions or concessions in customs duties for specific sectors or items.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
