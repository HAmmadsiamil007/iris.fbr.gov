import { useState } from 'react';
import { Building2, FileText, Send, Info, CheckCircle, Calculator } from 'lucide-react';

export default function PRA() {
  const [tab, setTab] = useState<'return' | 'rates' | 'learn'>('return');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <Building2 size={32} />
          <div>
            <h1 className="text-2xl font-bold">Punjab Revenue Authority (PRA)</h1>
            <p className="text-orange-100 opacity-90">Punjab Sales Tax on Services Act 2012 | Provincial Tax Compliance</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl overflow-hidden shadow-sm">
        {[
          { id: 'return', label: 'Monthly Return (Form-P)', icon: <FileText size={16} /> },
          { id: 'rates', label: 'Service Tax Rates', icon: <Calculator size={16} /> },
          { id: 'learn', label: 'Key Concepts', icon: <Info size={16} /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'return' | 'rates' | 'learn')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
              tab === t.id 
                ? 'border-orange-600 text-orange-600 bg-orange-50' 
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
                  <h3 className="font-bold text-sm text-gray-800">Form-P: Sales Tax Return for Services</h3>
                  <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full uppercase">Monthly</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Registration Period</label>
                    <input type="month" defaultValue="2025-01" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">PNTN (Provincial NTN)</label>
                    <input type="text" defaultValue="P1234567-8" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse border rounded-lg overflow-hidden">
                    <thead className="bg-orange-50">
                      <tr>
                        {['Description', 'Value of Services (PKR)', 'Tax Rate (%)', 'Sales Tax (PKR)'].map(h => (
                          <th key={h} className="text-left px-4 py-3 border border-gray-200 font-semibold text-orange-900">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Services Rendered (Standard Rate)', '', '16%', ''],
                        ['Reduced Rate Services', '', '5%', ''],
                        ['Export of Services', '', '0%', '—'],
                        ['Exempt Services', '', 'Exempt', '—'],
                      ].map(([desc, val, rate, tax]) => (
                        <tr key={desc} className="hover:bg-gray-50">
                          <td className="px-4 py-3 border border-gray-200 font-medium text-gray-700">{desc}</td>
                          <td className="px-4 py-3 border border-gray-200">
                            {val === '' ? <input type="number" placeholder="0" className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-orange-400 outline-none" /> : val}
                          </td>
                          <td className="px-4 py-3 border border-gray-200 font-bold text-orange-600">{rate}</td>
                          <td className="px-4 py-3 border border-gray-200 font-semibold text-gray-800">
                            {tax === '' ? <input type="number" placeholder="Auto" className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-orange-400 outline-none" /> : tax}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-orange-50 font-bold text-sm">
                        <td className="px-4 py-3 border border-gray-200" colSpan={3}>Total Output Tax Payable</td>
                        <td className="px-4 py-3 border border-gray-200 text-orange-700">PKR 0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={() => setSubmitted(true)}
                    className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors shadow-md"
                  >
                    <Send size={16} />
                    Submit PRA Return
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">PRA Return Submitted!</h3>
                <p className="text-sm text-gray-500">The return for January 2025 has been successfully filed with PRA.</p>
                <div className="bg-gray-50 p-4 rounded-lg max-w-xs mx-auto text-left border border-gray-200">
                  <p className="text-xs"><strong>Acknowledgement ID:</strong> PRA-202501-98765</p>
                  <p className="text-xs"><strong>Submission Time:</strong> {new Date().toLocaleString()}</p>
                </div>
                <button onClick={() => setSubmitted(false)} className="text-orange-600 font-bold text-sm hover:underline mt-4 block mx-auto">File Another Return</button>
              </div>
            )}
          </div>
        )}

        {tab === 'rates' && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800">Punjab Sales Tax Rates (Services)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <p className="text-xs font-bold text-orange-800 uppercase mb-1">Standard Rate</p>
                <p className="text-2xl font-black text-orange-700">16%</p>
                <p className="text-[10px] text-orange-600 mt-2">Applies to most professional services, hotels, and restaurants.</p>
              </div>
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <p className="text-xs font-bold text-blue-800 uppercase mb-1">Reduced Rate</p>
                <p className="text-2xl font-black text-blue-700">5%</p>
                <p className="text-[10px] text-blue-600 mt-2">Applies to construction services and specific sectors (no input credit).</p>
              </div>
              <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-lg">
                <p className="text-xs font-bold text-emerald-800 uppercase mb-1">Telecom Services</p>
                <p className="text-2xl font-black text-emerald-700">19.5%</p>
                <p className="text-[10px] text-emerald-600 mt-2">Special rate for telecommunication services in Punjab.</p>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-xs font-bold text-gray-700 mb-3 uppercase">Common Services Categories</p>
              <div className="space-y-2">
                {[
                  ['Professional Services', 'Lawyers, Auditors, IT Consultants', '16%'],
                  ['Construction Services', 'Real Estate Development', '5%'],
                  ['Manpower Services', 'Recruitment, Security Services', '16%'],
                  ['Franchise Services', 'International & Local Brands', '16%'],
                ].map(([cat, ex, rate]) => (
                  <div key={cat} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
                    <div>
                      <p className="text-xs font-bold text-gray-800">{cat}</p>
                      <p className="text-[10px] text-gray-500">{ex}</p>
                    </div>
                    <span className="text-xs font-black text-orange-600">{rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'learn' && (
          <div className="prose prose-sm max-w-none space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Understanding PRA Compliance</h3>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-bold text-orange-800 mb-2">1. Scope of Tax</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Punjab Sales Tax on Services is a destination-based consumption tax. It is levied on services provided in the province of Punjab. PRA was established in 2012 to collect this tax.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-bold text-orange-800 mb-2">2. Reverse Charge Mechanism</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                If a service is provided from outside Pakistan to a person in Punjab, the recipient is liable to pay tax under the reverse charge mechanism.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-bold text-orange-800 mb-2">3. Filing Deadlines</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Monthly returns must be filed by the 15th of the following month. Payment must be made by the 18th of the following month.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
