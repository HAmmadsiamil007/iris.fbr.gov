import { useApp } from '../context/AppContext';
import { FileText, ArrowRight, Download, Eye } from 'lucide-react';

export default function ReturnFiling() {
  const { taxReturns, setCurrentPage } = useApp();

  return (
    <div className="p-5 space-y-5">
      <div className="bg-gradient-to-r from-[#006400] to-[#228B22] rounded-xl p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText size={24} />
          <div>
            <h2 className="font-bold text-base">Return Filing History</h2>
            <p className="text-green-100 text-xs">View, download, and manage all filed returns</p>
          </div>
        </div>
        <button onClick={() => setCurrentPage('income-tax')} className="bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 flex items-center gap-1">
          File New Return <ArrowRight size={12} />
        </button>
      </div>

      {/* Return Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Income Tax Return', subtitle: 'Form IT-1 / IT-2 (Individuals & Companies)', section: 'Section 114', icon: '🧾', color: 'bg-green-50 border-green-200', page: 'income-tax' as const },
          { title: 'Sales Tax Return', subtitle: 'Monthly / Quarterly Filing', section: 'Sales Tax Act 1990', icon: '🏭', color: 'bg-blue-50 border-blue-200', page: 'sales-tax' as const },
          { title: 'Withholding Statement', subtitle: 'Statement of Tax Deducted / Collected', section: 'Section 165', icon: '📋', color: 'bg-purple-50 border-purple-200', page: 'withholding' as const },
        ].map(rt => (
          <div key={rt.title} className={`rounded-xl border p-4 ${rt.color} cursor-pointer hover:shadow-md transition-all`} onClick={() => setCurrentPage(rt.page)}>
            <div className="text-2xl mb-2">{rt.icon}</div>
            <p className="font-bold text-gray-800 text-sm">{rt.title}</p>
            <p className="text-gray-500 text-xs">{rt.subtitle}</p>
            <p className="text-[10px] text-gray-400 mt-1">{rt.section}</p>
            <button className="mt-3 text-xs text-[#006400] font-semibold flex items-center gap-1 hover:underline">
              File Now <ArrowRight size={11} />
            </button>
          </div>
        ))}
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-sm">Filing History</h3>
          <span className="text-xs text-gray-400">{taxReturns.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                {['Return ID', 'Tax Year', 'Type', 'Status', 'Filed Date', 'Tax Payable', 'Refund', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {taxReturns.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-blue-600 font-semibold">{r.id}</td>
                  <td className="px-4 py-3 font-semibold">{r.year}</td>
                  <td className="px-4 py-3 text-gray-600">{r.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                      r.status === 'Filed' ? 'bg-green-100 text-green-700' :
                      r.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                      r.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.submittedDate}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {r.taxPayable > 0 ? `PKR ${r.taxPayable.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    {r.refundable > 0 ? `PKR ${r.refundable.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {r.status === 'Filed' ? (
                        <>
                          <button className="text-blue-600 hover:underline flex items-center gap-0.5"><Eye size={11} /> View</button>
                          <button className="text-[#006400] hover:underline flex items-center gap-0.5"><Download size={11} /> PDF</button>
                        </>
                      ) : r.status === 'Draft' ? (
                        <button onClick={() => setCurrentPage('income-tax')} className="text-orange-600 hover:underline flex items-center gap-0.5">
                          <ArrowRight size={11} /> Continue
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deadlines */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-bold text-gray-700 text-sm mb-3">Filing Deadlines & Penalties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <p className="font-bold text-gray-600">Key Deadlines:</p>
            {[
              ['Income Tax Return (Individuals)', '30 September'],
              ['Income Tax Return (Companies)', '31 December'],
              ['Sales Tax Return (Monthly)', '15th of following month'],
              ['Withholding Statement (Bi-Annual)', '31 January & 31 July'],
              ['Advance Tax (Quarterly)', '15 Sep, 15 Dec, 15 Mar, 15 Jun'],
            ].map(([label, date]) => (
              <div key={label} className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-gray-600">{label}</span>
                <span className="font-semibold text-[#006400]">{date}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <p className="font-bold text-gray-600">Late Filing Penalties (Sec. 182):</p>
            {[
              ['Failure to file return', 'PKR 1,000 per day (min PKR 10,000)'],
              ['Failure to pay tax', '1% of tax per month (Default Surcharge)'],
              ['Concealment of income', '25% to 200% of tax'],
              ['Failure to maintain records', 'PKR 10,000 to PKR 50,000'],
              ['Non-compliance with notice', 'PKR 25,000 to PKR 100,000'],
            ].map(([label, penalty]) => (
              <div key={label} className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-gray-600">{label}</span>
                <span className="font-semibold text-red-600 text-right">{penalty}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
