import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const { setIsLoggedIn, setCurrentPage } = useApp();
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'login' | 'register'>('login');

  const formatCnic = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 13);
    if (digits.length <= 5) return digits;
    if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const rawCnic = cnic.replace(/\D/g, '');
    if (rawCnic.length !== 13) {
      setError('Please enter a valid 13-digit CNIC number.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#006400] via-[#004d00] to-[#002600] flex flex-col">
      {/* Top Government Bar */}
      <div className="bg-white/10 border-b border-white/20 py-1.5 px-4 text-center">
        <p className="text-white/80 text-xs">
          🇵🇰 This is a <strong className="text-yellow-300">PRACTICE / DUMMY</strong> portal for taxation learning purposes only. Not affiliated with FBR Pakistan.
        </p>
      </div>

      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#006400] to-[#004d00] flex items-center justify-center shadow">
              <span className="text-white text-2xl font-bold">☪</span>
            </div>
            <div>
              <h1 className="text-[#006400] font-black text-xl leading-tight">FBR — Federal Board of Revenue</h1>
              <p className="text-gray-500 text-xs">Inland Revenue Information System (IRIS) — Practice Portal</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle size={14} className="text-green-600" />
            <span>Secure Connection</span>
          </div>
        </div>
        {/* Green Nav Bar */}
        <div className="bg-[#006400] text-white text-xs flex gap-6 px-6 py-1.5">
          {['Home', 'About FBR', 'Tax Laws', 'Downloads', 'Help Desk', 'Contact'].map(item => (
            <span key={item} className="hover:text-yellow-300 cursor-pointer transition-colors">{item}</span>
          ))}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#006400] to-[#228B22] px-6 py-5 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield size={22} className="text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Taxpayer Login</h2>
                  <p className="text-green-100 text-xs">IRIS — Income Tax Return System</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {(['login', 'register'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors ${tab === t ? 'text-[#006400] border-b-2 border-[#006400]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {t === 'login' ? 'Login' : 'New Registration'}
                </button>
              ))}
            </div>

            <div className="p-6">
              {tab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">CNIC / NTN Number *</label>
                    <input
                      type="text"
                      value={cnic}
                      onChange={e => setCnic(formatCnic(e.target.value))}
                      placeholder="XXXXX-XXXXXXX-X"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006400] focus:border-transparent"
                    />
                    <p className="text-xs text-gray-400 mt-1">Enter your 13-digit CNIC (e.g. 42101-1234567-1)</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Password *</label>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006400] pr-10"
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2.5 text-gray-400">
                        {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-600">
                      <AlertCircle size={14} />
                      {error}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" className="accent-[#006400]" />
                      Remember me
                    </label>
                    <span className="text-[#006400] hover:underline cursor-pointer">Forgot Password?</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#006400] hover:bg-[#004d00] text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60 text-sm flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                          <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Authenticating...
                      </>
                    ) : 'Login to IRIS'}
                  </button>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                    <strong>📌 Demo Hint:</strong> Enter any CNIC (13 digits) and any password (4+ chars) to login.
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Register as a new taxpayer to obtain your NTN and access IRIS services.</p>
                  {[
                    ['Full Name (as per CNIC)', 'text', 'e.g. Muhammad Ali Khan'],
                    ['CNIC Number', 'text', 'XXXXX-XXXXXXX-X'],
                    ['Email Address', 'email', 'your@email.com'],
                    ['Mobile Number', 'tel', '+92-3XX-XXXXXXX'],
                    ['Create Password', 'password', '••••••••'],
                  ].map(([label, type, placeholder]) => (
                    <div key={label}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{label} *</label>
                      <input type={type} placeholder={placeholder} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006400]" />
                    </div>
                  ))}
                  <button
                    onClick={() => { setTab('login'); setError('ℹ️ Registration submitted! (Demo mode — please login directly)'); }}
                    className="w-full bg-[#006400] hover:bg-[#004d00] text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                  >
                    Submit Registration
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom links */}
          <div className="mt-4 text-center text-xs text-white/60 space-y-1">
            <p>Need help? Call <strong className="text-white">051-111-772-772</strong> (FBR Helpline — Demo)</p>
            <p>© 2025 Federal Board of Revenue, Government of Pakistan (Practice Portal)</p>
          </div>
        </div>
      </main>
    </div>
  );
}
