import { useState } from 'react';
import { UserPlus, Building2, Info, CheckCircle, User } from 'lucide-react';

export default function Registrations() {
  const [tab, setTab] = useState<'ntn' | 'strn' | 'process'>('ntn');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <UserPlus size={32} />
          <div>
            <h1 className="text-2xl font-bold">Tax Registrations (NTN & STRN)</h1>
            <p className="text-teal-100 opacity-90">FBR IRIS Registration | Individual, AOP & Company</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl overflow-hidden shadow-sm">
        {[
          { id: 'ntn', label: 'NTN Registration', icon: <User size={16} /> },
          { id: 'strn', label: 'Sales Tax (STRN)', icon: <Building2 size={16} /> },
          { id: 'process', label: 'Requirements', icon: <Info size={16} /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'ntn' | 'strn' | 'process')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
              tab === t.id 
                ? 'border-teal-600 text-teal-600 bg-teal-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {tab === 'ntn' && (
          <div className="space-y-6">
             {!submitted ? (
               <div className="space-y-4">
                 <h3 className="font-bold text-sm text-gray-800 border-b pb-2 uppercase">New NTN Registration Form (Individual)</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="text-xs font-semibold text-gray-600 block mb-1">CNIC Number</label>
                     <input type="text" placeholder="35201-XXXXXXX-X" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-400 outline-none" />
                   </div>
                   <div>
                     <label className="text-xs font-semibold text-gray-600 block mb-1">Full Name (as per CNIC)</label>
                     <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-400 outline-none" />
                   </div>
                   <div>
                     <label className="text-xs font-semibold text-gray-600 block mb-1">Mobile Number (Registered with CNIC)</label>
                     <input type="tel" placeholder="03XXXXXXXXX" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-400 outline-none" />
                   </div>
                   <div>
                     <label className="text-xs font-semibold text-gray-600 block mb-1">Email Address</label>
                     <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-400 outline-none" />
                   </div>
                 </div>

                 <div className="p-4 bg-teal-50 border border-teal-100 rounded-lg">
                   <h4 className="text-[10px] font-bold text-teal-800 uppercase mb-2">Business Details (Optional for Salaried)</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Business Name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-teal-400 outline-none" />
                      <input type="text" placeholder="Business Address" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-teal-400 outline-none" />
                   </div>
                 </div>

                 <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={() => setSubmitted(true)}
                    className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-teal-700 transition-colors shadow-md"
                  >
                    <UserPlus size={16} />
                    Register for NTN
                  </button>
                </div>
               </div>
             ) : (
               <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Registration Request Sent!</h3>
                <p className="text-sm text-gray-500">Your registration request for NTN has been successfully submitted for processing.</p>
                <button onClick={() => setSubmitted(false)} className="text-teal-600 font-bold text-sm hover:underline mt-4 block mx-auto">Start Another Registration</button>
              </div>
             )}
          </div>
        )}

        {tab === 'strn' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center border-b pb-4">
               <h3 className="text-lg font-bold text-gray-800 uppercase">Sales Tax Registration (STRN)</h3>
               <span className="text-xs font-bold text-teal-600">FBR IRIS Form 14(1)</span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h4 className="text-sm font-bold text-teal-900 mb-2">Compulsory Registration</h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Manufacturers (unless cottage industry)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Retailers (with annual turnover {'>'} PKR 5M)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Importers & Exporters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Wholesalers & Distributors</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h4 className="text-sm font-bold text-teal-900 mb-2">Documents Required</h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Utility Bill (last 3 months)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Rent Agreement / Ownership Proof</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Bank Account Certificate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>GPS Tagged Photographs of Premises</span>
                    </li>
                  </ul>
                </div>
             </div>
             <button className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg text-sm hover:bg-teal-700 transition-colors shadow-md">
               Apply for STRN (Sales Tax Registration)
             </button>
          </div>
        )}

        {tab === 'process' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Registration Process Flow</h3>
            <div className="flex flex-col space-y-4">
              {[
                { stage: '1. Online Application', desc: 'Submission of Form 181 (Modification/Registration) on IRIS portal.' },
                { stage: '2. Verification', desc: 'FBR verifies the mobile number and email address via OTP (One-Time Passcode).' },
                { stage: '3. Processing', desc: 'The relevant Regional Tax Office (RTO) reviews the application and documents.' },
                { stage: '4. Issuance', desc: 'NTN/STRN is issued and the taxpayer is added to the Active Taxpayers List (ATL) after filing return.' },
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs">{i+1}</div>
                    {i < 3 && <div className="w-0.5 h-full bg-teal-200"></div>}
                  </div>
                  <div className="pb-6">
                    <h4 className="text-sm font-bold text-teal-900 uppercase">{step.stage}</h4>
                    <p className="text-xs text-gray-600 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
