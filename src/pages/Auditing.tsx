import { useState } from 'react';
import { FileCheck, Info, FileText, Search } from 'lucide-react';

export default function Auditing() {
  const [tab, setTab] = useState<'concepts' | 'standards' | 'process'>('concepts');

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <Search size={32} />
          <div>
            <h1 className="text-2xl font-bold">Auditing Concepts & Standards</h1>
            <p className="text-slate-100 opacity-90">International Standards on Auditing (ISA) | Assurance & Compliance</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl overflow-hidden shadow-sm">
        {[
          { id: 'concepts', label: 'Core Concepts', icon: <Info size={16} /> },
          { id: 'standards', label: 'ISA Standards', icon: <FileCheck size={16} /> },
          { id: 'process', label: 'Audit Process', icon: <FileText size={16} /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'concepts' | 'standards' | 'process')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
              tab === t.id 
                ? 'border-slate-600 text-slate-600 bg-slate-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {tab === 'concepts' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Fundamental Auditing Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 border rounded-lg hover:bg-white hover:shadow-md transition-all">
                <h4 className="text-sm font-bold text-slate-800 mb-2 uppercase">Independence</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The auditor must be free from any interest in or relationship with the client that could influence their judgment. This is the cornerstone of the auditing profession.
                </p>
              </div>
              <div className="p-4 bg-gray-50 border rounded-lg hover:bg-white hover:shadow-md transition-all">
                <h4 className="text-sm font-bold text-slate-800 mb-2 uppercase">Professional Skepticism</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  An attitude that includes a questioning mind and a critical assessment of audit evidence. It means the auditor does not take information at face value.
                </p>
              </div>
              <div className="p-4 bg-gray-50 border rounded-lg hover:bg-white hover:shadow-md transition-all">
                <h4 className="text-sm font-bold text-slate-800 mb-2 uppercase">Materiality</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Errors or omissions are material if they could influence the economic decisions of users. Auditors focus their work on areas where material misstatements are most likely.
                </p>
              </div>
              <div className="p-4 bg-gray-50 border rounded-lg hover:bg-white hover:shadow-md transition-all">
                <h4 className="text-sm font-bold text-slate-800 mb-2 uppercase">Audit Risk</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The risk that the auditor expresses an inappropriate opinion when the financial statements are materially misstated. (Inherent Risk x Control Risk x Detection Risk).
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === 'standards' && (
          <div className="space-y-6">
             <h3 className="text-lg font-bold text-gray-800">International Standards on Auditing (ISA)</h3>
             <div className="space-y-3">
               {[
                 ['ISA 200', 'Overall Objectives of the Independent Auditor', 'Sets the scope and objectives for an audit.'],
                 ['ISA 315', 'Identifying and Assessing the Risks of Material Misstatement', 'Requires understanding the entity and its environment.'],
                 ['ISA 500', 'Audit Evidence', 'Explains what constitutes sufficient and appropriate evidence.'],
                 ['ISA 700', 'Forming an Opinion and Reporting on Financial Statements', 'Defines the standard audit report structure.'],
                 ['ISA 701', 'Communicating Key Audit Matters (KAM)', 'Requires reporting significant areas in the audit of listed entities.'],
               ].map(([std, title, desc]) => (
                 <div key={std} className="flex gap-4 p-4 border-b last:border-0 hover:bg-gray-50">
                    <div className="font-black text-slate-600 text-sm w-20">{std}</div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 uppercase">{title}</h4>
                      <p className="text-[11px] text-gray-500 mt-1">{desc}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {tab === 'process' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">The 4-Stage Audit Process</h3>
            <div className="flex flex-col space-y-4">
              {[
                { stage: '1. Planning', items: ['Engagement letter', 'Understanding business', 'Materiality setting', 'Risk assessment'] },
                { stage: '2. Fieldwork', items: ['Tests of controls', 'Substantive testing', 'Vouching & Verification', 'Physical inspection'] },
                { stage: '3. Review', items: ['Going concern review', 'Subsequent events', 'Management representation', 'Analytical procedures'] },
                { stage: '4. Reporting', items: ['Audit opinion (Unmodified, Qualified, Adverse, Disclaimer)', 'Management letter', 'KAM reporting'] },
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">{i+1}</div>
                    {i < 3 && <div className="w-0.5 h-full bg-slate-200"></div>}
                  </div>
                  <div className="pb-6">
                    <h4 className="text-sm font-bold text-slate-900 uppercase">{step.stage}</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {step.items.map(item => (
                        <span key={item} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{item}</span>
                      ))}
                    </div>
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
