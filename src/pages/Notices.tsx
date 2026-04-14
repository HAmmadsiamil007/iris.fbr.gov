import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, AlertTriangle, CheckCircle, Clock, MessageSquare, Download, Eye } from 'lucide-react';

export default function Notices() {
  const { notices } = useApp();
  const [selected, setSelected] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [responded, setResponded] = useState<string[]>([]);

  const selectedNotice = notices.find(n => n.id === selected);

  const sectionInfo: Record<string, string> = {
    '114(4)': 'Notice for failure to file income tax return. Requires immediate filing.',
    '177': 'Audit notice — taxpayer must submit accounts, documents, and records.',
    '137': 'Recovery notice for outstanding tax demands.',
    '111': 'Notice for unexplained income or assets.',
    '122(5A)': 'Amendment of assessment by Commissioner.',
    '176': 'Notice for production of accounts, documents, etc.',
  };

  return (
    <div className="p-5 space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-4 text-white">
        <div className="flex items-center gap-3">
          <Bell size={24} />
          <div>
            <h2 className="font-bold text-base">Notices & Hearings</h2>
            <p className="text-red-100 text-xs">FBR Inland Revenue — Official Communication</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Open', count: notices.filter(n => n.status === 'Open').length, color: 'bg-red-50 border-red-200 text-red-700', icon: <AlertTriangle size={16} /> },
          { label: 'Responded', count: notices.filter(n => n.status === 'Responded').length, color: 'bg-blue-50 border-blue-200 text-blue-700', icon: <MessageSquare size={16} /> },
          { label: 'Closed', count: notices.filter(n => n.status === 'Closed').length, color: 'bg-green-50 border-green-200 text-green-700', icon: <CheckCircle size={16} /> },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border p-4 ${s.color} flex items-center gap-3`}>
            {s.icon}
            <div>
              <p className="text-2xl font-bold">{s.count}</p>
              <p className="text-xs font-semibold">{s.label} Notices</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Notice List */}
        <div className="flex-1 space-y-3">
          {notices.map(notice => (
            <div
              key={notice.id}
              className={`bg-white rounded-xl border shadow-sm cursor-pointer transition-all hover:shadow-md ${selected === notice.id ? 'border-[#006400] shadow-md' : 'border-gray-200'}`}
              onClick={() => setSelected(notice.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${notice.priority === 'High' ? 'bg-red-100 text-red-700' : notice.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>
                        {notice.priority} Priority
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${notice.status === 'Open' ? 'bg-red-50 text-red-600 border border-red-200' : notice.status === 'Responded' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                        {notice.status}
                      </span>
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">
                        Sec. {notice.section}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{notice.subject}</p>
                    <div className="flex items-center gap-4 mt-1 text-[10px] text-gray-400">
                      <span>Notice ID: <strong>{notice.id}</strong></span>
                      <span>Issued: {notice.date}</span>
                      <span className={`flex items-center gap-1 ${notice.status === 'Open' ? 'text-red-500 font-semibold' : ''}`}>
                        <Clock size={10} /> Due: {notice.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="text-gray-400 hover:text-blue-600 p-1"><Eye size={14} /></button>
                    <button className="text-gray-400 hover:text-[#006400] p-1"><Download size={14} /></button>
                  </div>
                </div>
              </div>

              {/* Section Info */}
              {sectionInfo[notice.section] && (
                <div className="border-t border-gray-100 px-4 py-2 bg-gray-50 rounded-b-xl">
                  <p className="text-[10px] text-gray-500">
                    <strong>Legal Note:</strong> {sectionInfo[notice.section]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Response Panel */}
        {selectedNotice && (
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-4">
              <div className="bg-gradient-to-r from-[#006400] to-[#228B22] rounded-t-xl p-4 text-white">
                <p className="font-bold text-sm">Respond to Notice</p>
                <p className="text-green-200 text-xs">{selectedNotice.id}</p>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Notice Subject</p>
                  <p className="text-xs text-gray-700 bg-gray-50 rounded p-2">{selectedNotice.subject}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Due Date</p>
                  <p className="text-xs font-bold text-red-600">{selectedNotice.dueDate}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Applicable Section</p>
                  <p className="text-xs bg-purple-50 text-purple-700 rounded p-2 font-semibold">Section {selectedNotice.section} — Income Tax Ordinance 2001</p>
                </div>
                {responded.includes(selectedNotice.id) ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                    <CheckCircle size={20} className="text-green-500 mx-auto mb-1" />
                    <p className="text-xs text-green-700 font-semibold">Response Submitted Successfully</p>
                    <p className="text-[10px] text-green-500 mt-0.5">Acknowledgment sent to your email</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 block mb-1">Your Response *</label>
                      <textarea
                        value={response}
                        onChange={e => setResponse(e.target.value)}
                        rows={4}
                        placeholder="Type your response / explanation here. Mention relevant documents attached."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#006400]/40 resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 block mb-1">Attach Documents</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center text-xs text-gray-400 hover:border-[#006400] transition-colors cursor-pointer">
                        Click to upload (PDF, JPG, max 5MB)
                      </div>
                    </div>
                    <button
                      disabled={!response.trim()}
                      onClick={() => {
                        setResponded(prev => [...prev, selectedNotice.id]);
                        setResponse('');
                      }}
                      className="w-full bg-[#006400] hover:bg-[#004d00] text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
                    >
                      <MessageSquare size={13} /> Submit Response
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
