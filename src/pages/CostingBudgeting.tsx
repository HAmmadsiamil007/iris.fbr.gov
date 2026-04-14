import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, PieChart } from 'lucide-react';

export default function CostingBudgeting() {
  const [tab, setTab] = useState<'costing' | 'budgeting' | 'leasing'>('costing');

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-fuchsia-700 to-fuchsia-900 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <DollarSign size={32} />
          <div>
            <h1 className="text-2xl font-bold">Costing, Budgeting & Leasing</h1>
            <p className="text-fuchsia-100 opacity-90">Management Accounting | Financial Planning & Control</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl overflow-hidden shadow-sm">
        {[
          { id: 'costing', label: 'Cost Accounting', icon: <PieChart size={16} /> },
          { id: 'budgeting', label: 'Budgeting & Control', icon: <TrendingUp size={16} /> },
          { id: 'leasing', label: 'Lease Finance', icon: <Calculator size={16} /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'costing' | 'budgeting' | 'leasing')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
              tab === t.id 
                ? 'border-fuchsia-600 text-fuchsia-600 bg-fuchsia-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {tab === 'costing' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Cost Accounting Concepts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-4 bg-gray-50 border rounded-lg">
                  <h4 className="text-sm font-bold text-fuchsia-900 mb-2 uppercase">Classification of Costs</h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex justify-between border-b pb-1"><span>Fixed Costs</span> <span className="font-bold">Constant</span></li>
                    <li className="flex justify-between border-b pb-1"><span>Variable Costs</span> <span className="font-bold">Change with Volume</span></li>
                    <li className="flex justify-between border-b pb-1"><span>Direct Costs</span> <span className="font-bold">Traceable</span></li>
                    <li className="flex justify-between border-b pb-1"><span>Indirect Costs (Overheads)</span> <span className="font-bold">Allocated</span></li>
                  </ul>
               </div>
               <div className="p-4 bg-gray-50 border rounded-lg">
                  <h4 className="text-sm font-bold text-fuchsia-900 mb-2 uppercase">CVP Analysis (Break-even)</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border">
                      <p className="text-[10px] text-gray-500 uppercase">Contribution Margin</p>
                      <p className="text-xs font-bold text-fuchsia-700">Selling Price - Variable Cost</p>
                    </div>
                    <div className="p-2 bg-white rounded border">
                      <p className="text-[10px] text-gray-500 uppercase">Break-even Point (Units)</p>
                      <p className="text-xs font-bold text-fuchsia-700">Fixed Costs / Contribution Margin per unit</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="space-y-3">
               <h4 className="text-sm font-bold text-gray-800 uppercase">Practical Example: Cost Sheet</h4>
               <div className="overflow-x-auto border rounded-lg">
                 <table className="w-full text-xs">
                   <thead className="bg-fuchsia-50">
                     <tr>
                       <th className="p-3 text-left border">Particulars</th>
                       <th className="p-3 text-right border">Amount (PKR)</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr><td className="p-2 border">Direct Materials</td><td className="p-2 border text-right">500,000</td></tr>
                     <tr><td className="p-2 border">Direct Labor</td><td className="p-2 border text-right">300,000</td></tr>
                     <tr><td className="p-2 border">Direct Expenses</td><td className="p-2 border text-right">50,000</td></tr>
                     <tr className="bg-gray-50 font-bold"><td className="p-2 border">Prime Cost</td><td className="p-2 border text-right">850,000</td></tr>
                     <tr><td className="p-2 border">Factory Overheads (FOH)</td><td className="p-2 border text-right">150,000</td></tr>
                     <tr className="bg-fuchsia-50 font-bold"><td className="p-2 border">Total Factory Cost</td><td className="p-2 border text-right">1,000,000</td></tr>
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {tab === 'budgeting' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Budgeting & Variance Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Master Budget', desc: 'The comprehensive set of all departmental budgets for the year.' },
                { title: 'Flexible Budget', desc: 'Adjusted for actual activity levels to allow fair comparison.' },
                { title: 'Zero-Based Budget', desc: 'Starts from zero every period, justifying every expense.' },
              ].map(b => (
                <div key={b.title} className="p-4 border-l-4 border-fuchsia-600 bg-gray-50 rounded-r-lg">
                  <h4 className="text-xs font-bold text-fuchsia-900 uppercase">{b.title}</h4>
                  <p className="text-[10px] text-gray-600 mt-1">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mt-6">
               <h4 className="text-sm font-bold text-gray-800 uppercase">Budgetary Control (Variance Analysis)</h4>
               <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase">Actual Cost</p>
                      <p className="text-sm font-bold text-red-600">PKR 1,100,000</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase">Budgeted Cost</p>
                      <p className="text-sm font-bold text-gray-700">PKR 1,000,000</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase">Variance</p>
                      <p className="text-sm font-bold text-red-700">100,000 (Adverse)</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-4 text-center">Variance = Budgeted - Actual. Adverse if Actual {'>'} Budgeted for expenses.</p>
               </div>
            </div>
          </div>
        )}

        {tab === 'leasing' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Leasing Concepts (IFRS 16)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-indigo-50">
                <h4 className="text-sm font-bold text-indigo-900 mb-2">Finance Lease</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Transfers substantially all risks and rewards incidental to ownership. The lessee records a Right-of-Use (ROU) asset and a lease liability on the balance sheet.
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-emerald-50">
                <h4 className="text-sm font-bold text-emerald-900 mb-2">Operating Lease</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Usually shorter term. Under IFRS 16, most leases are now brought onto the balance sheet, but exemptions exist for low-value or short-term (under 12 months) leases.
                </p>
              </div>
            </div>

            <div className="space-y-3">
               <h4 className="text-sm font-bold text-gray-800 uppercase">Lease Payment Calculation (Sample)</h4>
               <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div className="p-2 bg-white rounded border"><span>Asset Value</span><p className="font-bold">PKR 2,000,000</p></div>
                    <div className="p-2 bg-white rounded border"><span>Rate (IRR)</span><p className="font-bold">12% p.a.</p></div>
                    <div className="p-2 bg-white rounded border"><span>Tenure</span><p className="font-bold">3 Years</p></div>
                    <div className="p-2 bg-white rounded border"><span>Monthly PMT</span><p className="font-bold">PKR 66,428</p></div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 italic">Note: Monthly payment includes principal repayment and interest component.</p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
