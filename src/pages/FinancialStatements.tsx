import { useState } from 'react';
import { BarChart3, Calculator, FileText, PieChart, TrendingUp, Info } from 'lucide-react';

export default function FinancialStatements() {
  const [activeTab, setActiveTab] = useState<'income' | 'balance' | 'equity' | 'cashflow' | 'concepts'>('concepts');

  const formulas = [
    { name: 'Gross Profit', formula: 'Revenue - Cost of Goods Sold (COGS)' },
    { name: 'Operating Profit', formula: 'Gross Profit - Operating Expenses' },
    { name: 'Net Income', formula: 'Total Revenue - Total Expenses' },
    { name: 'Basic Accounting Equation', formula: 'Assets = Liabilities + Equity' },
    { name: 'Working Capital', formula: 'Current Assets - Current Liabilities' },
    { name: 'Current Ratio', formula: 'Current Assets / Current Liabilities' },
  ];

  const dummyData = {
    revenue: 1500000,
    cogs: 900000,
    operatingExpenses: 300000,
    interest: 20000,
    tax: 50000,
    assets: {
      current: 500000,
      nonCurrent: 1200000,
    },
    liabilities: {
      current: 300000,
      longTerm: 600000,
    },
    equity: 800000,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <BarChart3 size={32} />
          <div>
            <h1 className="text-2xl font-bold">Financial Statements & Accounting</h1>
            <p className="text-emerald-100 opacity-90">Comprehensive guide to financial reporting, concepts, and practice</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        {[
          { id: 'concepts', label: 'Key Concepts & Formulas', icon: <Calculator size={16} /> },
          { id: 'income', label: 'Income Statement', icon: <TrendingUp size={16} /> },
          { id: 'balance', label: 'Balance Sheet', icon: <PieChart size={16} /> },
          { id: 'equity', label: 'Statement of Equity', icon: <FileText size={16} /> },
          { id: 'cashflow', label: 'Cash Flow Statement', icon: <TrendingUp size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'income' | 'balance' | 'equity' | 'cashflow' | 'concepts')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-emerald-600 text-emerald-600 bg-emerald-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {activeTab === 'concepts' && (
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Info size={20} className="text-emerald-600" />
                Fundamental Accounting Concepts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-emerald-800 text-sm mb-2">Accrual Basis</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Transactions are recorded when they occur, regardless of when cash is exchanged. This provides a more accurate picture of a company's financial position.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-emerald-800 text-sm mb-2">Going Concern</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    The assumption that a business will continue to operate indefinitely and will not be liquidated in the foreseeable future.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-emerald-800 text-sm mb-2">Matching Principle</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Expenses should be matched with the revenues they helped generate in the same accounting period.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-emerald-800 text-sm mb-2">Materiality</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Financial information is material if its omission or misstatement could influence the economic decisions of users.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calculator size={20} className="text-emerald-600" />
                Essential Formulas
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-emerald-50">
                    <tr>
                      <th className="text-left p-3 border-b font-bold text-emerald-900">Metric</th>
                      <th className="text-left p-3 border-b font-bold text-emerald-900">Formula</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formulas.map((f, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-3 border-b font-semibold text-gray-700">{f.name}</td>
                        <td className="p-3 border-b text-emerald-700 font-mono text-xs">{f.formula}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'income' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold text-gray-800">Income Statement (Profit & Loss)</h3>
              <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase">For the Year Ended 2024</span>
            </div>
            
            <div className="max-w-2xl mx-auto border rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="bg-gray-50 font-bold">
                    <td className="p-3">Revenue (Sales)</td>
                    <td className="p-3 text-right">PKR {dummyData.revenue.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 pl-6 text-gray-600">Cost of Goods Sold (COGS)</td>
                    <td className="p-3 text-right text-red-600">({dummyData.cogs.toLocaleString()})</td>
                  </tr>
                  <tr className="border-t-2 border-double border-gray-300 font-bold bg-emerald-50">
                    <td className="p-3">Gross Profit</td>
                    <td className="p-3 text-right text-emerald-700">PKR {(dummyData.revenue - dummyData.cogs).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 pl-6 text-gray-600">Operating Expenses</td>
                    <td className="p-3 text-right text-red-600">({dummyData.operatingExpenses.toLocaleString()})</td>
                  </tr>
                  <tr className="border-t font-bold">
                    <td className="p-3">Operating Profit (EBIT)</td>
                    <td className="p-3 text-right">PKR {(dummyData.revenue - dummyData.cogs - dummyData.operatingExpenses).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 pl-6 text-gray-600">Interest Expense</td>
                    <td className="p-3 text-right text-red-600">({dummyData.interest.toLocaleString()})</td>
                  </tr>
                  <tr className="border-t font-bold">
                    <td className="p-3">Profit Before Tax</td>
                    <td className="p-3 text-right">PKR {(dummyData.revenue - dummyData.cogs - dummyData.operatingExpenses - dummyData.interest).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 pl-6 text-gray-600">Income Tax Expense</td>
                    <td className="p-3 text-right text-red-600">({dummyData.tax.toLocaleString()})</td>
                  </tr>
                  <tr className="border-t-4 border-double border-emerald-600 font-bold bg-emerald-50">
                    <td className="p-3">Net Income</td>
                    <td className="p-3 text-right text-emerald-700 text-lg">PKR {(dummyData.revenue - dummyData.cogs - dummyData.operatingExpenses - dummyData.interest - dummyData.tax).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-bold text-blue-800 mb-2">Practical Insight:</h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                In Pakistan, companies follow the Fourth or Fifth Schedule of the Companies Act 2017 for formatting financial statements. Small and Medium Enterprises (SMEs) have different reporting requirements compared to listed companies.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'balance' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold text-gray-800">Balance Sheet (Statement of Financial Position)</h3>
              <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase">As of June 30, 2024</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-emerald-600 text-white p-2 text-center font-bold text-sm">ASSETS</div>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="bg-gray-50 font-semibold"><td className="p-2" colSpan={2}>Current Assets</td></tr>
                    <tr><td className="p-2 pl-6">Cash & Equivalents</td><td className="p-2 text-right">200,000</td></tr>
                    <tr><td className="p-2 pl-6">Accounts Receivable</td><td className="p-2 text-right">150,000</td></tr>
                    <tr><td className="p-2 pl-6">Inventory</td><td className="p-2 text-right">150,000</td></tr>
                    <tr className="font-bold border-t"><td className="p-2">Total Current Assets</td><td className="p-2 text-right">PKR {dummyData.assets.current.toLocaleString()}</td></tr>
                    
                    <tr className="bg-gray-50 font-semibold"><td className="p-2" colSpan={2}>Non-Current Assets</td></tr>
                    <tr><td className="p-2 pl-6">Property, Plant & Equipment</td><td className="p-2 text-right">1,000,000</td></tr>
                    <tr><td className="p-2 pl-6">Intangible Assets</td><td className="p-2 text-right">200,000</td></tr>
                    <tr className="font-bold border-t"><td className="p-2">Total Non-Current Assets</td><td className="p-2 text-right">PKR {dummyData.assets.nonCurrent.toLocaleString()}</td></tr>
                    
                    <tr className="bg-emerald-50 font-bold border-t-2 border-emerald-600">
                      <td className="p-2 text-lg">TOTAL ASSETS</td>
                      <td className="p-2 text-right text-lg text-emerald-700">PKR {(dummyData.assets.current + dummyData.assets.nonCurrent).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-blue-600 text-white p-2 text-center font-bold text-sm">LIABILITIES & EQUITY</div>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="bg-gray-50 font-semibold"><td className="p-2" colSpan={2}>Current Liabilities</td></tr>
                    <tr><td className="p-2 pl-6">Accounts Payable</td><td className="p-2 text-right">180,000</td></tr>
                    <tr><td className="p-2 pl-6">Short-term Debt</td><td className="p-2 text-right">120,000</td></tr>
                    <tr className="font-bold border-t"><td className="p-2">Total Current Liabilities</td><td className="p-2 text-right">PKR {dummyData.liabilities.current.toLocaleString()}</td></tr>
                    
                    <tr className="bg-gray-50 font-semibold"><td className="p-2" colSpan={2}>Non-Current Liabilities</td></tr>
                    <tr><td className="p-2 pl-6">Long-term Debt</td><td className="p-2 text-right">600,000</td></tr>
                    <tr className="font-bold border-t"><td className="p-2">Total Non-Current Liabilities</td><td className="p-2 text-right">PKR {dummyData.liabilities.longTerm.toLocaleString()}</td></tr>
                    
                    <tr className="bg-gray-50 font-semibold"><td className="p-2" colSpan={2}>Equity</td></tr>
                    <tr><td className="p-2 pl-6">Share Capital</td><td className="p-2 text-right">500,000</td></tr>
                    <tr><td className="p-2 pl-6">Retained Earnings</td><td className="p-2 text-right">300,000</td></tr>
                    <tr className="font-bold border-t"><td className="p-2">Total Equity</td><td className="p-2 text-right">PKR {dummyData.equity.toLocaleString()}</td></tr>

                    <tr className="bg-blue-50 font-bold border-t-2 border-blue-600">
                      <td className="p-2 text-lg uppercase">Total Liab. & Equity</td>
                      <td className="p-2 text-right text-lg text-blue-700">PKR {(dummyData.liabilities.current + dummyData.liabilities.longTerm + dummyData.equity).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-emerald-800 font-bold text-sm">
                Check: Assets (1,700,000) = Liabilities (900,000) + Equity (800,000) ✅ Balanced
              </p>
            </div>
          </div>
        )}

        {activeTab === 'equity' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold text-gray-800">Statement of Changes in Equity</h3>
              <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase">For the Year Ended June 30, 2024</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="p-3 text-left border">Particulars</th>
                    <th className="p-3 text-right border">Share Capital</th>
                    <th className="p-3 text-right border">Retained Earnings</th>
                    <th className="p-3 text-right border font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">Balance as of July 01, 2023</td>
                    <td className="p-3 border text-right">500,000</td>
                    <td className="p-3 border text-right">200,000</td>
                    <td className="p-3 border text-right font-bold">700,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Net Profit for the Year</td>
                    <td className="p-3 border text-right">—</td>
                    <td className="p-3 border text-right text-emerald-600">150,000</td>
                    <td className="p-3 border text-right font-bold text-emerald-600">150,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Dividends Paid</td>
                    <td className="p-3 border text-right">—</td>
                    <td className="p-3 border text-right text-red-600">(50,000)</td>
                    <td className="p-3 border text-right font-bold text-red-600">(50,000)</td>
                  </tr>
                  <tr className="bg-emerald-50 font-bold border-t-2">
                    <td className="p-3 border text-lg">Balance as of June 30, 2024</td>
                    <td className="p-3 border text-right text-lg">500,000</td>
                    <td className="p-3 border text-right text-lg">300,000</td>
                    <td className="p-3 border text-right text-lg text-emerald-700">800,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <h4 className="text-sm font-bold text-emerald-800 mb-2">Concept: Retained Earnings</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Retained earnings are the cumulative net profits of a company that have been kept in the business and not distributed as dividends to shareholders. It is a vital internal source of financing for growth.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'cashflow' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold text-gray-800">Cash Flow Statement (Indirect Method)</h3>
              <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase">For the Year Ended June 30, 2024</span>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-emerald-600 text-white p-2 text-sm font-bold">OPERATING ACTIVITIES</div>
                <table className="w-full text-sm">
                  <tbody>
                    <tr><td className="p-2">Net Profit Before Tax</td><td className="p-2 text-right">180,000</td></tr>
                    <tr><td className="p-2 pl-6 text-gray-500 italic">Adjustments for: Depreciation & Interest</td><td className="p-2 text-right">40,000</td></tr>
                    <tr className="bg-gray-50 font-semibold"><td className="p-2">Cash Flow before Working Capital changes</td><td className="p-2 text-right">220,000</td></tr>
                    <tr><td className="p-2 pl-6">(Increase)/Decrease in Inventory & Receivables</td><td className="p-2 text-right text-red-600">(30,000)</td></tr>
                    <tr><td className="p-2 pl-6">Increase/(Decrease) in Payables</td><td className="p-2 text-right text-emerald-600">20,000</td></tr>
                    <tr className="border-t font-bold bg-emerald-50"><td className="p-2">Net Cash from Operating Activities</td><td className="p-2 text-right">210,000</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-blue-600 text-white p-2 text-sm font-bold">INVESTING ACTIVITIES</div>
                <table className="w-full text-sm">
                  <tbody>
                    <tr><td className="p-2">Purchase of Property, Plant & Equipment</td><td className="p-2 text-right text-red-600">(150,000)</td></tr>
                    <tr><td className="p-2">Sale of Assets</td><td className="p-2 text-right text-emerald-600">20,000</td></tr>
                    <tr className="border-t font-bold bg-blue-50"><td className="p-2">Net Cash used in Investing Activities</td><td className="p-2 text-right text-red-700">(130,000)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-purple-600 text-white p-2 text-sm font-bold">FINANCING ACTIVITIES</div>
                <table className="w-full text-sm">
                  <tbody>
                    <tr><td className="p-2">Dividends Paid</td><td className="p-2 text-right text-red-600">(50,000)</td></tr>
                    <tr><td className="p-2">Repayment of Long-term Debt</td><td className="p-2 text-right text-red-600">(20,000)</td></tr>
                    <tr className="border-t font-bold bg-purple-50"><td className="p-2">Net Cash used in Financing Activities</td><td className="p-2 text-right text-red-700">(70,000)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-emerald-700 text-white rounded-lg p-4 flex justify-between items-center font-bold">
                <span className="uppercase tracking-wider">Net Increase in Cash & Equivalents</span>
                <span>PKR 10,000</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
