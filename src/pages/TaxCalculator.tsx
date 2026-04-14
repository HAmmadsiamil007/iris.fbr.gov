import { useState } from 'react';
import { Calculator, Info, RefreshCw } from 'lucide-react';

type TaxpayerType = 'salaried' | 'business' | 'aop';

export default function TaxCalculator() {
  const [type, setType] = useState<TaxpayerType>('salaried');
  const [income, setIncome] = useState('');
  const [zakat, setZakat] = useState('');
  const [pension, setPension] = useState('');
  const [advanceTax, setAdvanceTax] = useState('');
  const [withheld, setWithheld] = useState('');
  const [calculated, setCalculated] = useState(false);

  const grossIncome = parseFloat(income) || 0;
  const zakatAmt = parseFloat(zakat) || 0;
  const pensionAmt = parseFloat(pension) || 0;
  const advanceTaxAmt = parseFloat(advanceTax) || 0;
  const withheldAmt = parseFloat(withheld) || 0;
  const taxableIncome = Math.max(0, grossIncome - zakatAmt - pensionAmt);

  const calculateSalariedTax = (inc: number) => {
    if (inc <= 600000) return 0;
    if (inc <= 1200000) return (inc - 600000) * 0.05;
    if (inc <= 2400000) return 30000 + (inc - 1200000) * 0.15;
    if (inc <= 3600000) return 210000 + (inc - 2400000) * 0.25;
    if (inc <= 6000000) return 510000 + (inc - 3600000) * 0.30;
    return 1230000 + (inc - 6000000) * 0.35;
  };

  const calculateBusinessTax = (inc: number) => {
    if (inc <= 600000) return 0;
    if (inc <= 1200000) return (inc - 600000) * 0.15;
    if (inc <= 1600000) return 90000 + (inc - 1200000) * 0.20;
    if (inc <= 3200000) return 170000 + (inc - 1600000) * 0.25;
    if (inc <= 5600000) return 570000 + (inc - 3200000) * 0.30;
    return 1290000 + (inc - 5600000) * 0.35;
  };

  const grossTax = type === 'salaried' ? calculateSalariedTax(taxableIncome) : calculateBusinessTax(taxableIncome);
  const netTax = Math.max(0, grossTax - advanceTaxAmt - withheldAmt);
  const effectiveRate = grossIncome > 0 ? ((grossTax / grossIncome) * 100).toFixed(2) : '0.00';

  const reset = () => {
    setIncome(''); setZakat(''); setPension(''); setAdvanceTax(''); setWithheld(''); setCalculated(false);
  };

  const slabsSalaried = [
    ['Up to 600,000', '0%', '—'],
    ['600,001 – 1,200,000', '5%', 'PKR 30,000 max'],
    ['1,200,001 – 2,400,000', '15%', 'PKR 30,000 + excess'],
    ['2,400,001 – 3,600,000', '25%', 'PKR 210,000 + excess'],
    ['3,600,001 – 6,000,000', '30%', 'PKR 510,000 + excess'],
    ['Above 6,000,000', '35%', 'PKR 1,230,000 + excess'],
  ];

  const slabsBusiness = [
    ['Up to 600,000', '0%', '—'],
    ['600,001 – 1,200,000', '15%', '—'],
    ['1,200,001 – 1,600,000', '20%', 'PKR 90,000 + excess'],
    ['1,600,001 – 3,200,000', '25%', 'PKR 170,000 + excess'],
    ['3,200,001 – 5,600,000', '30%', 'PKR 570,000 + excess'],
    ['Above 5,600,000', '35%', 'PKR 1,290,000 + excess'],
  ];

  return (
    <div className="p-5 space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
        <div className="flex items-center gap-3">
          <Calculator size={24} />
          <div>
            <h2 className="font-bold text-base">Income Tax Calculator</h2>
            <p className="text-orange-100 text-xs">Pakistan — Tax Year 2024-25 | Based on Finance Act 2024</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input Form */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-gray-800 text-sm">Enter Your Details</h3>

          {/* Taxpayer Type */}
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-2">Taxpayer Category</label>
            <div className="flex gap-2">
              {([
                ['salaried', '👔 Salaried'],
                ['business', '🏢 Business'],
                ['aop', '👥 AOP'],
              ] as [TaxpayerType, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setType(val)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${type === val ? 'bg-[#006400] text-white border-[#006400]' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Income */}
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">
              Annual {type === 'salaried' ? 'Salary' : 'Business'} Income (PKR) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 text-xs font-semibold">PKR</span>
              <input
                type="number"
                value={income}
                onChange={e => setIncome(e.target.value)}
                placeholder="e.g. 1200000"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Zakat Paid (PKR)</label>
              <input type="number" value={zakat} onChange={e => setZakat(e.target.value)} placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Pension Fund (PKR)</label>
              <input type="number" value={pension} onChange={e => setPension(e.target.value)} placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Advance Tax Paid (PKR)</label>
              <input type="number" value={advanceTax} onChange={e => setAdvanceTax(e.target.value)} placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Tax Withheld at Source</label>
              <input type="number" value={withheld} onChange={e => setWithheld(e.target.value)} placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40" />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCalculated(true)}
              disabled={!income}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Calculator size={15} /> Calculate Tax
            </button>
            <button onClick={reset} className="border border-gray-300 text-gray-500 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
              <RefreshCw size={15} />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {calculated && grossIncome > 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
              <h3 className="font-bold text-gray-800 text-sm">📊 Tax Computation Result</h3>
              {[
                { label: 'Gross Annual Income', value: `PKR ${grossIncome.toLocaleString()}`, cls: 'text-gray-700' },
                { label: 'Less: Deductions (Zakat + Pension)', value: `PKR ${(zakatAmt + pensionAmt).toLocaleString()}`, cls: 'text-red-600' },
                { label: 'Taxable Income', value: `PKR ${taxableIncome.toLocaleString()}`, cls: 'text-gray-800 font-bold' },
                { label: 'Gross Tax Payable', value: `PKR ${grossTax.toFixed(0)}`, cls: 'text-orange-600 font-bold' },
                { label: 'Less: Advance Tax Paid', value: `PKR ${advanceTaxAmt.toLocaleString()}`, cls: 'text-green-600' },
                { label: 'Less: Tax Withheld at Source', value: `PKR ${withheldAmt.toLocaleString()}`, cls: 'text-green-600' },
              ].map(r => (
                <div key={r.label} className="flex justify-between items-center py-1.5 border-b border-gray-100 text-sm">
                  <span className="text-gray-500">{r.label}</span>
                  <span className={r.cls}>{r.value}</span>
                </div>
              ))}
              <div className="bg-gradient-to-r from-[#006400] to-[#228B22] rounded-xl p-4 flex justify-between items-center text-white">
                <div>
                  <p className="text-green-200 text-xs">Net Tax Payable</p>
                  <p className="font-black text-2xl">PKR {netTax.toFixed(0)}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-200 text-xs">Effective Tax Rate</p>
                  <p className="font-bold text-xl">{effectiveRate}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-blue-500">Monthly Tax</p>
                  <p className="font-bold text-blue-700 text-sm">PKR {(grossTax / 12).toFixed(0)}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-purple-500">Tax / Income %</p>
                  <p className="font-bold text-purple-700 text-sm">{effectiveRate}%</p>
                </div>
              </div>
              {netTax === 0 && grossTax > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-700">
                  ✅ Your advance tax & withholding covers the entire tax liability. You may be eligible for a refund.
                </div>
              )}
              {grossIncome <= 600000 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-700">
                  ✅ Your income is below the taxable threshold (PKR 600,000). No tax is payable. However, filing a return is still recommended.
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
              <Calculator size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Enter your income details and click <strong>Calculate Tax</strong> to see the results.</p>
            </div>
          )}

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Info size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-blue-800 mb-1">Important Notes</p>
                <ul className="text-[11px] text-blue-700 space-y-1 list-disc list-inside">
                  <li>Tax slabs are based on Finance Act 2024</li>
                  <li>Super tax may apply for incomes above PKR 150M</li>
                  <li>Non-filers may face higher withholding rates</li>
                  <li>Consult a tax professional for accurate computation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Slabs Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-bold text-gray-800 text-sm mb-3">
          Tax Slabs — {type === 'salaried' ? 'Salaried Individual' : 'Business / AOP'} (FY 2024-25)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#006400] text-white">
                <th className="text-left px-3 py-2 rounded-tl-lg">Taxable Income (PKR)</th>
                <th className="text-left px-3 py-2">Tax Rate</th>
                <th className="text-left px-3 py-2 rounded-tr-lg">How it's Calculated</th>
              </tr>
            </thead>
            <tbody>
              {(type === 'salaried' ? slabsSalaried : slabsBusiness).map(([range, rate, note], i) => (
                <tr key={range} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-green-50 transition-colors`}>
                  <td className="px-3 py-2 border border-gray-200 font-medium">{range}</td>
                  <td className="px-3 py-2 border border-gray-200 font-bold text-[#006400]">{rate}</td>
                  <td className="px-3 py-2 border border-gray-200 text-gray-500">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
