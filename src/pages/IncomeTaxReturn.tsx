import { useState } from 'react';
import { ChevronRight, Info, Save, Send, AlertCircle, CheckCircle } from 'lucide-react';

type Section = 'personal' | 'income' | 'deductions' | 'tax' | 'assets';

interface IncomeData {
  salary: string;
  business: string;
  property: string;
  capital_gains: string;
  agriculture: string;
  foreign_income: string;
  other: string;
}

interface DeductionData {
  zakat: string;
  pension: string;
  education: string;
  life_insurance: string;
  donations: string;
}

const initialIncome: IncomeData = {
  salary: '',
  business: '',
  property: '',
  capital_gains: '',
  agriculture: '',
  foreign_income: '',
  other: '',
};

const initialDeductions: DeductionData = {
  zakat: '',
  pension: '',
  education: '',
  life_insurance: '',
  donations: '',
};

export default function IncomeTaxReturn() {
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [income, setIncome] = useState<IncomeData>(initialIncome);
  const [deductions, setDeductions] = useState<DeductionData>(initialDeductions);
  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const taxYear = '2024-25';

  const totalIncome = Object.values(income).reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const totalDeductions = Object.values(deductions).reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);

  // Pakistan Income Tax Slabs FY 2024-25 (Salaried)
  const calculateTax = (income: number): number => {
    if (income <= 600000) return 0;
    if (income <= 1200000) return (income - 600000) * 0.05;
    if (income <= 2400000) return 30000 + (income - 1200000) * 0.15;
    if (income <= 3600000) return 210000 + (income - 2400000) * 0.25;
    if (income <= 6000000) return 510000 + (income - 3600000) * 0.30;
    return 1230000 + (income - 6000000) * 0.35;
  };

  const taxPayable = calculateTax(taxableIncome);

  const sections: { id: Section; label: string }[] = [
    { id: 'personal', label: '1. Personal Information' },
    { id: 'income', label: '2. Income Details' },
    { id: 'deductions', label: '3. Deductions & Exemptions' },
    { id: 'tax', label: '4. Tax Computation' },
    { id: 'assets', label: '5. Assets & Liabilities (Summary)' },
  ];

  const setIncomeField = (k: keyof IncomeData, v: string) => setIncome(prev => ({ ...prev, [k]: v }));
  const setDeductionField = (k: keyof DeductionData, v: string) => setDeductions(prev => ({ ...prev, [k]: v }));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const handleSubmit = () => { setSubmitted(true); };

  if (submitted) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={36} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Return Filed Successfully!</h2>
        <p className="text-gray-500 text-sm mb-4">Your Income Tax Return for <strong>{taxYear}</strong> has been submitted.</p>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left space-y-2 w-full max-w-md">
          <p className="text-sm"><strong>Acknowledgment No:</strong> ITR-{Date.now().toString().slice(-8)}</p>
          <p className="text-sm"><strong>Tax Year:</strong> {taxYear}</p>
          <p className="text-sm"><strong>Gross Income:</strong> PKR {totalIncome.toLocaleString()}</p>
          <p className="text-sm"><strong>Taxable Income:</strong> PKR {taxableIncome.toLocaleString()}</p>
          <p className="text-sm"><strong>Tax Payable:</strong> PKR {taxPayable.toLocaleString()}</p>
          <p className="text-sm"><strong>Filed On:</strong> {new Date().toLocaleDateString('en-PK')}</p>
        </div>
        <button onClick={() => setSubmitted(false)} className="mt-4 text-[#006400] text-sm hover:underline">← Back to Return</button>
      </div>
    );
  }

  return (
    <div className="p-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#006400] to-[#228B22] rounded-xl p-4 text-white mb-5 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-base">Income Tax Return — {taxYear}</h2>
          <p className="text-green-100 text-xs">Form IT-1 | Individual Taxpayer | Under Ordinance 2001</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
            <Save size={13} /> {saved ? 'Saved!' : 'Save Draft'}
          </button>
          <button onClick={handleSubmit} className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-yellow-300 transition-colors">
            <Send size={13} /> Submit Return
          </button>
        </div>
      </div>

      <div className="flex gap-5 flex-col lg:flex-row">
        {/* Sidebar Nav */}
        <div className="lg:w-52 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full text-left px-4 py-3 text-xs font-semibold border-b border-gray-100 flex items-center justify-between transition-colors ${activeSection === s.id ? 'bg-[#006400] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <span>{s.label}</span>
                <ChevronRight size={12} />
              </button>
            ))}
          </div>

          {/* Tax Summary Box */}
          <div className="bg-[#006400] text-white rounded-xl p-4 mt-4 space-y-2 text-xs">
            <p className="font-bold text-sm">Tax Summary</p>
            <div className="flex justify-between"><span>Gross Income</span><span className="font-semibold">PKR {totalIncome.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Deductions</span><span className="font-semibold">PKR {totalDeductions.toLocaleString()}</span></div>
            <div className="border-t border-white/30 pt-2 flex justify-between"><span>Taxable Income</span><span className="font-bold">PKR {taxableIncome.toLocaleString()}</span></div>
            <div className="bg-yellow-400 text-gray-900 rounded-lg p-2 flex justify-between font-bold">
              <span>Tax Payable</span><span>PKR {taxPayable.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {activeSection === 'personal' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
              <h3 className="font-bold text-gray-800 text-sm border-b pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ['Full Name', 'Muhammad Ali Khan', 'text'],
                  ['CNIC', '42101-1234567-1', 'text'],
                  ['NTN', '1234567-8', 'text'],
                  ['Date of Birth', '1985-06-15', 'date'],
                  ['Residential Address', 'House 12, Street 5, F-7/3, Islamabad', 'text'],
                  ['Email', 'ali.khan@example.com', 'email'],
                  ['Mobile', '+92-300-1234567', 'tel'],
                  ['Tax Year', '2024-25', 'text'],
                ].map(([label, placeholder, type]) => (
                  <div key={label}>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">{label} *</label>
                    <input type={type} defaultValue={placeholder} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006400]/40" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Nature of Income *</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006400]/40">
                  <option>Salaried Individual</option>
                  <option>Business Individual / AOP</option>
                  <option>Salaried + Business</option>
                  <option>Rental Income Only</option>
                </select>
              </div>
              <button onClick={() => setActiveSection('income')} className="bg-[#006400] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#004d00] transition-colors flex items-center gap-1">
                Next: Income Details <ChevronRight size={12} />
              </button>
            </div>
          )}

          {activeSection === 'income' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
              <h3 className="font-bold text-gray-800 text-sm border-b pb-2">Income Details (PKR)</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                <Info size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">Enter all income sources. Figures should match your salary slips, bank statements, and ledgers. All amounts in <strong>Pakistani Rupees (PKR)</strong>.</p>
              </div>
              <div className="space-y-3">
                {([
                  ['salary', 'Salary / Employment Income (Sec. 12)', 'From all employers during the year'],
                  ['business', 'Business / Profession Income (Sec. 18)', 'Net profit from business or profession'],
                  ['property', 'Property Income / Rent (Sec. 15)', 'Rental income from land or building'],
                  ['capital_gains', 'Capital Gains (Sec. 37 / 37A)', 'Profit on sale of shares, property, etc.'],
                  ['agriculture', 'Agriculture Income', 'Income from farming / crops'],
                  ['foreign_income', 'Foreign Source Income', 'Income received from abroad'],
                  ['other', 'Other Income Sources', 'Prizes, dividends, freelancing, etc.'],
                ] as [keyof IncomeData, string, string][]).map(([key, label, hint]) => (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold text-gray-700 block">{label}</label>
                      <p className="text-[10px] text-gray-400">{hint}</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400 text-xs">PKR</span>
                      <input
                        type="number"
                        value={income[key]}
                        onChange={e => setIncomeField(key, e.target.value)}
                        placeholder="0"
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006400]/40"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="text-sm font-bold text-gray-700">Total Gross Income</span>
                <span className="text-base font-bold text-[#006400]">PKR {totalIncome.toLocaleString()}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setActiveSection('personal')} className="border border-gray-300 text-gray-600 text-xs px-4 py-2 rounded-lg hover:bg-gray-50">← Back</button>
                <button onClick={() => setActiveSection('deductions')} className="bg-[#006400] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#004d00] flex items-center gap-1">
                  Next: Deductions <ChevronRight size={12} />
                </button>
              </div>
            </div>
          )}

          {activeSection === 'deductions' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
              <h3 className="font-bold text-gray-800 text-sm border-b pb-2">Deductions & Exemptions (PKR)</h3>
              <div className="space-y-3">
                {([
                  ['zakat', 'Zakat Paid (Sec. 60)', 'Deductible if paid to authorized institutions'],
                  ['pension', 'Contribution to Approved Pension Fund (Sec. 63)', 'Up to 20% of taxable income'],
                  ['education', 'Tuition Fee — Children (Sec. 60D)', 'Max PKR 60,000 per child (up to 3 children)'],
                  ['life_insurance', 'Life Insurance Premium (Sec. 62)', 'Premium paid for life insurance policies'],
                  ['donations', 'Charitable Donations (Sec. 61)', 'Donations to approved non-profit organizations'],
                ] as [keyof DeductionData, string, string][]).map(([key, label, hint]) => (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold text-gray-700 block">{label}</label>
                      <p className="text-[10px] text-gray-400">{hint}</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400 text-xs">PKR</span>
                      <input
                        type="number"
                        value={deductions[key]}
                        onChange={e => setDeductionField(key, e.target.value)}
                        placeholder="0"
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006400]/40"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="text-sm font-bold text-gray-700">Total Deductions</span>
                <span className="text-base font-bold text-purple-600">PKR {totalDeductions.toLocaleString()}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setActiveSection('income')} className="border border-gray-300 text-gray-600 text-xs px-4 py-2 rounded-lg hover:bg-gray-50">← Back</button>
                <button onClick={() => setActiveSection('tax')} className="bg-[#006400] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#004d00] flex items-center gap-1">
                  Next: Tax Computation <ChevronRight size={12} />
                </button>
              </div>
            </div>
          )}

          {activeSection === 'tax' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
              <h3 className="font-bold text-gray-800 text-sm border-b pb-2">Tax Computation — {taxYear}</h3>
              <div className="space-y-2">
                {[
                  ['Gross Total Income', totalIncome, 'text-gray-700'],
                  ['Less: Total Deductions', -totalDeductions, 'text-red-600'],
                  ['Taxable Income', taxableIncome, 'text-gray-800 font-bold border-t border-gray-200 pt-2'],
                  ['Gross Tax Payable', taxPayable, 'text-orange-600'],
                  ['Less: Tax Credits (Sec. 61-65)', 0, 'text-green-600'],
                  ['Less: Advance Tax Paid (Sec. 147)', 75000, 'text-green-600'],
                  ['Less: Tax Withheld at Source', 10000, 'text-green-600'],
                ].map(([label, value, cls]) => (
                  <div key={String(label)} className={`flex justify-between items-center py-2 px-3 rounded ${cls}`}>
                    <span className="text-sm">{label}</span>
                    <span className="text-sm font-semibold">PKR {Math.abs(Number(value)).toLocaleString()}</span>
                  </div>
                ))}
                <div className="bg-[#006400] text-white rounded-xl p-4 flex justify-between items-center">
                  <span className="font-bold">Net Tax Payable / (Refundable)</span>
                  <span className="font-bold text-xl">
                    PKR {Math.max(0, taxPayable - 75000 - 10000).toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Tax Slabs Reference */}
              <div>
                <p className="text-xs font-bold text-gray-600 mb-2">Income Tax Slabs — Salaried (FY 2024-25)</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left px-3 py-2 border border-gray-200">Taxable Income (PKR)</th>
                        <th className="text-left px-3 py-2 border border-gray-200">Tax Rate</th>
                        <th className="text-left px-3 py-2 border border-gray-200">Fixed Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Up to 600,000', '0%', 'Nil'],
                        ['600,001 – 1,200,000', '5%', 'On excess over 600,000'],
                        ['1,200,001 – 2,400,000', '15%', 'PKR 30,000 + on excess'],
                        ['2,400,001 – 3,600,000', '25%', 'PKR 210,000 + on excess'],
                        ['3,600,001 – 6,000,000', '30%', 'PKR 510,000 + on excess'],
                        ['Above 6,000,000', '35%', 'PKR 1,230,000 + on excess'],
                      ].map(([range, rate, note]) => (
                        <tr key={range} className="even:bg-gray-50">
                          <td className="px-3 py-2 border border-gray-200">{range}</td>
                          <td className="px-3 py-2 border border-gray-200 font-semibold text-[#006400]">{rate}</td>
                          <td className="px-3 py-2 border border-gray-200 text-gray-500">{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setActiveSection('deductions')} className="border border-gray-300 text-gray-600 text-xs px-4 py-2 rounded-lg hover:bg-gray-50">← Back</button>
                <button onClick={() => setActiveSection('assets')} className="bg-[#006400] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#004d00] flex items-center gap-1">
                  Next: Assets <ChevronRight size={12} />
                </button>
              </div>
            </div>
          )}

          {activeSection === 'assets' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
              <h3 className="font-bold text-gray-800 text-sm border-b pb-2">Assets & Liabilities Statement (Sec. 116)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs font-bold text-gray-700 mb-2 text-green-700">Assets (PKR)</p>
                  {[
                    'Immovable Property (Land/Building)',
                    'Motor Vehicle(s)',
                    'Cash in Hand / Bank',
                    'Investments (Shares, Bonds)',
                    'Business Capital / Partnership',
                    'Gold / Jewellery',
                    'Other Assets',
                  ].map(a => (
                    <div key={a} className="flex items-center justify-between mb-2">
                      <label className="text-xs text-gray-600">{a}</label>
                      <input type="number" placeholder="0" className="w-28 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#006400]" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-700 mb-2 text-red-600">Liabilities (PKR)</p>
                  {[
                    'Mortgage / Home Loan',
                    'Car Loan',
                    'Business Loan',
                    'Personal Loan / Credit Card',
                    'Other Liabilities',
                  ].map(l => (
                    <div key={l} className="flex items-center justify-between mb-2">
                      <label className="text-xs text-gray-600">{l}</label>
                      <input type="number" placeholder="0" className="w-28 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#006400]" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800 flex items-center gap-2">
                  <AlertCircle size={13} />
                  <span>Assets declared must reconcile with income sources. Undeclared assets may be taxed at 30% under Sec. 111.</span>
                </p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setActiveSection('tax')} className="border border-gray-300 text-gray-600 text-xs px-4 py-2 rounded-lg hover:bg-gray-50">← Back</button>
                <button onClick={handleSubmit} className="bg-yellow-500 text-white text-xs px-5 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-1 font-bold">
                  <Send size={13} /> File Return Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
