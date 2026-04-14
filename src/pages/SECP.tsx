import { useState } from 'react';
import { Building2, Send, Info, CheckCircle, UserPlus, FileCheck } from 'lucide-react';

export default function SECP() {
  const [tab, setTab] = useState<'filing' | 'formation' | 'compliance'>('filing');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <Building2 size={32} />
          <div>
            <h1 className="text-2xl font-bold">Securities & Exchange Commission of Pakistan (SECP)</h1>
            <p className="text-indigo-100 opacity-90">Companies Act 2017 | Corporate Governance & Regulation</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl overflow-hidden shadow-sm">
        {[
          { id: 'filing', label: 'Annual Returns (Form-A/B)', icon: <FileCheck size={16} /> },
          { id: 'formation', label: 'Company Formation', icon: <UserPlus size={16} /> },
          { id: 'compliance', label: 'Key Compliance', icon: <Info size={16} /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'filing' | 'formation' | 'compliance')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
              tab === t.id 
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {tab === 'filing' && (
          <div className="space-y-6">
            {!submitted ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-sm text-gray-800">Form-A: Annual Return of Company</h3>
                  <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full uppercase">Annual</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">CUIN (Company Universal Identification Number)</label>
                    <input type="text" defaultValue="0123456" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Company Name</label>
                    <input type="text" defaultValue="ABC SOLUTIONS (PVT) LTD" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="p-4 border rounded-lg bg-gray-50">
                     <p className="text-[10px] font-bold text-gray-500 uppercase">Registered Office</p>
                     <p className="text-xs text-gray-800 font-medium">123 Business Avenue, Gulberg, Lahore</p>
                   </div>
                   <div className="p-4 border rounded-lg bg-gray-50">
                     <p className="text-[10px] font-bold text-gray-500 uppercase">Paid-up Capital</p>
                     <p className="text-xs text-gray-800 font-medium">PKR 1,000,000</p>
                   </div>
                   <div className="p-4 border rounded-lg bg-gray-50">
                     <p className="text-[10px] font-bold text-gray-500 uppercase">Date of AGM</p>
                     <p className="text-xs text-gray-800 font-medium">Oct 25, 2024</p>
                   </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-700">Director's Information</p>
                  <table className="w-full text-xs border">
                    <thead className="bg-indigo-50">
                      <tr>
                        <th className="p-2 border text-left">Name</th>
                        <th className="p-2 border text-left">CNIC</th>
                        <th className="p-2 border text-left">Designation</th>
                        <th className="p-2 border text-left">Shares Held</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border">Muhammad Ali</td>
                        <td className="p-2 border">35201-1234567-1</td>
                        <td className="p-2 border text-indigo-700 font-bold">CEO / Director</td>
                        <td className="p-2 border">5,000</td>
                      </tr>
                      <tr>
                        <td className="p-2 border">Sarah Khan</td>
                        <td className="p-2 border">35201-7654321-2</td>
                        <td className="p-2 border text-indigo-700 font-bold">Director</td>
                        <td className="p-2 border">5,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={() => setSubmitted(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    <Send size={16} />
                    File Form-A with SECP
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">SECP Return Filed!</h3>
                <p className="text-sm text-gray-500">The Annual Return for ABC SOLUTIONS (PVT) LTD has been successfully filed.</p>
                <button onClick={() => setSubmitted(false)} className="text-indigo-600 font-bold text-sm hover:underline mt-4 block mx-auto">File Another Form</button>
              </div>
            )}
          </div>
        )}

        {tab === 'formation' && (
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-gray-800">Company Formation Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-indigo-600 bg-gray-50 rounded-r-lg">
                  <h4 className="text-sm font-bold text-indigo-900">Step 1: Name Reservation</h4>
                  <p className="text-xs text-gray-600 mt-1">Submit three proposed names via eServices. SECP confirms the availability and reserves the name for 60 days.</p>
                </div>
                <div className="p-4 border-l-4 border-indigo-600 bg-gray-50 rounded-r-lg">
                  <h4 className="text-sm font-bold text-indigo-900">Step 2: Drafting MOA & AOA</h4>
                  <p className="text-xs text-gray-600 mt-1">Memorandum of Association (MOA) defines the company's business activities. Articles of Association (AOA) defines internal rules.</p>
                </div>
                <div className="p-4 border-l-4 border-indigo-600 bg-gray-50 rounded-r-lg">
                  <h4 className="text-sm font-bold text-indigo-900">Step 3: Filing Incorporation</h4>
                  <p className="text-xs text-gray-600 mt-1">Submit Form-1, Form-21, Form-29 along with digital signatures of directors and payment of incorporation fees.</p>
                </div>
              </div>
              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h4 className="text-sm font-bold text-indigo-800 mb-4 uppercase">Registration Requirements</h4>
                <ul className="space-y-3">
                  {[
                    'Minimum 2 Directors for Private Ltd',
                    'Digital Signatures for all Directors',
                    'Scanned Copies of CNICs',
                    'Registered Office Address in Pakistan',
                    'Initial Paid-up Capital Proof',
                  ].map(req => (
                    <li key={req} className="flex items-start gap-2 text-xs text-indigo-700">
                      <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {tab === 'compliance' && (
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-gray-800">Mandatory Post-Incorporation Compliance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="text-sm font-bold text-gray-800 mb-2">Form-29 (Changes in Directors)</h4>
                <p className="text-xs text-gray-600">Must be filed within 15 days of any change in directors or CEO.</p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="text-sm font-bold text-gray-800 mb-2">Form-21 (Change in Office Address)</h4>
                <p className="text-xs text-gray-600">Must be filed within 15 days of shifting the registered office.</p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="text-sm font-bold text-gray-800 mb-2">Audited Financial Statements</h4>
                <p className="text-xs text-gray-600">Required annually for all companies. SMEs have simplified requirements.</p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="text-sm font-bold text-gray-800 mb-2">Annual General Meeting (AGM)</h4>
                <p className="text-xs text-gray-600">Must be held once every year within 4 months of the close of financial year.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
