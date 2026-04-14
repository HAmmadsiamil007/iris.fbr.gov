import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Save, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { user } = useApp();
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<'profile' | 'ntn' | 'password'>('profile');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-5 space-y-5">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-4 text-white">
        <div className="flex items-center gap-3">
          <User size={24} />
          <div>
            <h2 className="font-bold text-base">My Profile & Registration</h2>
            <p className="text-gray-300 text-xs">Manage your taxpayer information and registration details</p>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-5">
        <div className="w-16 h-16 bg-[#006400] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-2xl font-black">{user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{user.name}</h3>
          <p className="text-gray-500 text-xs">NTN: <strong>{user.ntn}</strong> | CNIC: <strong>{user.cnic}</strong></p>
          <div className="flex gap-2 mt-2">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">{user.status}</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">Salaried Individual</span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">Tax Year {user.taxYear}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl">
        {([['profile', 'Personal Details'], ['ntn', 'NTN / Registration'], ['password', 'Change Password']] as const).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-semibold transition-colors border-b-2 ${tab === t ? 'border-[#006400] text-[#006400]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-bold text-sm text-gray-800 border-b pb-2 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['Full Name', user.name, 'text'],
              ['Father\'s / Husband\'s Name', 'Abdul Rehman Khan', 'text'],
              ['Date of Birth', '1985-06-15', 'date'],
              ['Gender', 'Male', 'select'],
              ['CNIC Number', user.cnic, 'text'],
              ['NTN Number', user.ntn, 'text'],
              ['Email Address', user.email, 'email'],
              ['Mobile Number', user.phone, 'tel'],
              ['Residential Address', user.address, 'text'],
              ['City', 'Islamabad', 'text'],
              ['Province', 'ICT', 'select'],
              ['Postal Code', '44000', 'text'],
            ].map(([label, value, type]) => (
              <div key={label} className={label === 'Residential Address' ? 'md:col-span-2' : ''}>
                <label className="text-xs font-semibold text-gray-600 block mb-1">{label}</label>
                {type === 'select' ? (
                  <select defaultValue={value} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006400]/40">
                    {label === 'Gender' ? <><option>Male</option><option>Female</option><option>Prefer not to say</option></> :
                     label === 'Province' ? <><option>ICT</option><option>Punjab</option><option>Sindh</option><option>KPK</option><option>Balochistan</option><option>AJK</option><option>GB</option></> : null}
                  </select>
                ) : (
                  <input type={type} defaultValue={value}
                    readOnly={label === 'CNIC Number' || label === 'NTN Number'}
                    className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006400]/40 ${label === 'CNIC Number' || label === 'NTN Number' ? 'bg-gray-50 text-gray-500' : ''}`}
                  />
                )}
              </div>
            ))}
          </div>
          {saved ? (
            <div className="mt-4 flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle size={16} /> Profile updated successfully!
            </div>
          ) : (
            <button onClick={handleSave} className="mt-4 bg-[#006400] hover:bg-[#004d00] text-white font-bold py-2.5 px-6 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <Save size={14} /> Update Profile
            </button>
          )}
        </div>
      )}

      {tab === 'ntn' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-sm text-gray-800 border-b pb-2">NTN Registration Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['NTN Number', user.ntn],
              ['Registration Date', '15-March-2010'],
              ['Registration Type', 'Individual'],
              ['Business Name', 'N/A (Salaried)'],
              ['Business NTN', 'N/A'],
              ['Jurisdiction', 'RTO Islamabad'],
              ['Commissioner IR', 'Company Unit-III'],
              ['Filing Zone', 'Zone-A'],
            ].map(([label, value]) => (
              <div key={label} className="bg-gray-50 rounded-lg p-3">
                <p className="text-[10px] text-gray-400 font-semibold uppercase">{label}</p>
                <p className="text-sm font-bold text-gray-700 mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <p className="text-xs font-bold text-gray-700 mb-3">Employer / Business Information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                ['Employer Name', 'Pakistan Engineering Corp Ltd'],
                ['Employer NTN', '0987654-3'],
                ['Designation', 'Senior Engineer'],
                ['Annual Salary (Declared)', 'PKR 1,800,000'],
              ].map(([label, value]) => (
                <div key={label}>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">{label}</label>
                  <input type="text" defaultValue={value} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006400]/40" />
                </div>
              ))}
            </div>
            <button onClick={handleSave} className="mt-3 bg-[#006400] hover:bg-[#004d00] text-white font-bold py-2 px-5 rounded-lg text-xs flex items-center gap-2 transition-colors">
              <Save size={12} /> Update Employment Info
            </button>
          </div>
        </div>
      )}

      {tab === 'password' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4 max-w-md">
          <h3 className="font-bold text-sm text-gray-800 border-b pb-2">Change Password</h3>
          {[
            ['Current Password', 'Enter current password'],
            ['New Password', 'Minimum 8 characters'],
            ['Confirm New Password', 'Repeat new password'],
          ].map(([label, placeholder]) => (
            <div key={label}>
              <label className="text-xs font-semibold text-gray-600 block mb-1">{label} *</label>
              <input type="password" placeholder={placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006400]/40" />
            </div>
          ))}
          <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="font-semibold">Password Requirements:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Minimum 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one number</li>
              <li>At least one special character (!@#$)</li>
            </ul>
          </div>
          <button onClick={handleSave} className="bg-[#006400] hover:bg-[#004d00] text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors">
            {saved ? '✅ Password Changed!' : 'Change Password'}
          </button>
        </div>
      )}
    </div>
  );
}
