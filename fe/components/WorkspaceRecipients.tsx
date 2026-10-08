'use client';

import React, { useState } from 'react';

const candidates = [
  { id: 'PT-2048', code: 'C-2048', organ: 'Kidney', blood: 'O+', hla: 'Passed', urgency: 'High', score: 96, status: 'Eligible', urgencyClass: 'text-[#94620d] bg-[#fff5e4]' },
  { id: 'PT-1932', code: 'C-1932', organ: 'Liver', blood: 'A+', hla: 'Passed', urgency: 'Critical', score: 92, status: 'Review required', urgencyClass: 'text-[#aa4848] bg-[#fff0f0]' },
  { id: 'PT-2187', code: 'C-2187', organ: 'Kidney', blood: 'B+', hla: 'Passed', urgency: 'Moderate', score: 88, status: 'Eligible', urgencyClass: 'text-[#356eaa] bg-[#eef4ff]' },
  { id: 'PT-1881', code: 'C-1881', organ: 'Heart', blood: 'O−', hla: 'Pending', urgency: 'High', score: 84, status: 'Pending verification', urgencyClass: 'text-[#94620d] bg-[#fff5e4]' },
  { id: 'PT-2093', code: 'C-2093', organ: 'Liver', blood: 'AB+', hla: 'Passed', urgency: 'High', score: 81, status: 'Eligible', urgencyClass: 'text-[#94620d] bg-[#fff5e4]' },
  { id: 'PT-2210', code: 'C-2210', organ: 'Kidney', blood: 'A−', hla: 'Review', urgency: 'Moderate', score: 77, status: 'Review required', urgencyClass: 'text-[#356eaa] bg-[#eef4ff]' },
  { id: 'PT-1774', code: 'C-1774', organ: 'Heart', blood: 'B−', hla: 'Passed', urgency: 'High', score: 73, status: 'Eligible', urgencyClass: 'text-[#94620d] bg-[#fff5e4]' },
  { id: 'PT-2256', code: 'C-2256', organ: 'Kidney', blood: 'O+', hla: 'Pending', urgency: 'Low', score: 69, status: 'Pending verification', urgencyClass: 'text-[#356eaa] bg-[#eef4ff]' }
];

const getStatusClass = (status: string) => {
  if (status.includes('Eligible') || status.includes('Passed')) return 'bg-[#e9f7f2] text-[#287d6e]';
  if (status.includes('Review')) return 'bg-[#fff5e4] text-[#94620d]';
  if (status.includes('Blocked')) return 'bg-[#fff0f0] text-[#aa4848]';
  return 'bg-[#eef4ff] text-[#356eaa]';
};

export function WorkspaceRecipients() {
  const [search, setSearch] = useState('');
  const [organFilter, setOrganFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = `${c.code} ${c.organ} ${c.blood} ${c.urgency}`.toLowerCase().includes(search.toLowerCase());
    const matchesOrgan = organFilter === 'all' || c.organ === organFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesOrgan && matchesStatus;
  });

  return (
    <section className="animate-[fadeIn_0.25s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-[16px] mb-[20px] md:mb-[28px]">
        <div>
          <div className="text-[#8191a7] uppercase text-[10px] tracking-[1.2px] font-[800] mb-[7px]">Pseudonymized candidate pool</div>
          <h1 className="text-[28px] md:text-[34px] font-[800] tracking-[-1px] text-[#111827] m-0 leading-[1.1]">Recipient queue</h1>
          <p className="text-[#64748b] text-[13px] md:text-[14px] mt-[9px] md:mt-[11px] max-w-[540px] leading-[1.6]">
            Inspect demo eligibility metadata and verification state without exposing personally identifying information.
          </p>
        </div>
        <div className="flex gap-[10px]">
          <button className="h-[38px] md:h-[42px] px-[16px] md:px-[20px] border border-[#cbd5e1] rounded-[10px] md:rounded-[12px] bg-white text-[#475569] font-[750] text-[12px] md:text-[13px] hover:bg-[#f8fafc] flex items-center gap-[9px] cursor-pointer transition-all active:scale-[0.98]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> 
            Export queue
          </button>
        </div>
      </div>

      <div className="flex items-start md:items-center gap-[12px] p-[14px_16px] md:p-[14px_22px] mb-[24px] rounded-[13px] border border-[#d2dce8] bg-[#f8fafd] text-[#334155] text-[12px] md:text-[13px] leading-[1.5]">
        <svg className="flex-none text-[#5a718b] mt-[1px] md:mt-0" width="19" height="19" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M12 11v5M12 7.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p className="m-0 flex-1">
          <strong className="font-[750] text-[#1e293b]">Privacy by design.</strong> Names and direct identifiers are intentionally excluded. Any medical attributes here are synthetic and do not represent real people.
        </p>
        <span className="hidden md:inline-block ml-auto text-[10px] font-[850] text-[#6b7b91] uppercase tracking-[1px] py-[3px] px-[7px] bg-[#eef1f6] rounded-[6px]">
          PSEUDONYMIZED
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-[10px] mb-[17px]">
        <input 
          className="h-[38px] min-w-[200px] max-w-full sm:max-w-[350px] w-full px-[12px] border border-[#cbd5e1] rounded-[9px] bg-white text-[#172236] text-[11px] placeholder:text-[#94a3b8] outline-none focus:border-[#97002f] focus:ring-1 focus:ring-[#97002f]" 
          type="search" 
          placeholder="Search candidate ID or organ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="h-[38px] px-[11px] pr-[32px] border border-[#cbd5e1] rounded-[9px] bg-white text-[#475569] text-[11px] outline-none focus:border-[#97002f] appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          value={organFilter}
          onChange={(e) => setOrganFilter(e.target.value)}
        >
          <option value="all">All organs</option>
          <option value="Kidney">Kidney</option>
          <option value="Liver">Liver</option>
          <option value="Heart">Heart</option>
        </select>
        <select 
          className="h-[38px] px-[11px] pr-[32px] border border-[#cbd5e1] rounded-[9px] bg-white text-[#475569] text-[11px] outline-none focus:border-[#97002f] appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="Eligible">Eligible</option>
          <option value="Review required">Review required</option>
          <option value="Pending verification">Pending verification</option>
        </select>
        <div className="flex-1 hidden sm:block"></div>
        <span className="inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] bg-[#eef4ff] text-[#356eaa] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          Demo data only
        </span>
      </div>

      <article className="min-w-0 border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] overflow-hidden">
        <div className="w-full overflow-x-auto overflow-y-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Candidate ID</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Requested organ</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Blood group</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">HLA check</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Urgency band</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Compatibility</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Eligibility</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd]"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((c) => (
                  <tr key={c.id} className="hover:bg-[#f8fafd] transition-colors group">
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5]">
                      <div className="flex items-center gap-[9px]">
                        <span className="w-[31px] h-[31px] grid place-items-center rounded-[9px] text-[#97002f] bg-[#fff0f4] flex-none">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            {c.organ === 'Kidney' ? (
                              <>
                                <path d="M9.2 4.3C6.4 3.7 4 6.2 4 9.8c0 3.5 2.2 6.6 5.2 6.6 2 0 3.2-1.6 3.2-3.6V8.3c0-2-1.1-3.5-3.2-4Z" stroke="currentColor" strokeWidth="1.7"/>
                                <path d="M14.8 4.3c2.8-.6 5.2 1.9 5.2 5.5 0 3.5-2.2 6.6-5.2 6.6-2 0-3.2-1.6-3.2-3.6V8.3c0-2 1.1-3.5 3.2-4Z" stroke="currentColor" strokeWidth="1.7"/>
                                <path d="M12 13v7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                              </>
                            ) : c.organ === 'Liver' ? (
                              <>
                                <path d="M3.5 8.5c2.7-3.4 7.2-4.2 12-3.1 2.4.6 4.3 1.9 5 4.1.6 2-.4 4.7-2.3 6.5-1.9 1.8-4.6 2.1-7.7 1.9-3.4-.2-5.5-.7-6.7-2.5-1.3-1.8-1.4-4.8-.3-6.9Z" stroke="currentColor" strokeWidth="1.7"/>
                                <path d="M12 6c.5 3.4-.8 6.1-4 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                              </>
                            ) : (
                              <>
                                <path d="M20.5 8.8c0 5.1-8.5 10-8.5 10s-8.5-4.9-8.5-10A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.5 2.4Z" stroke="currentColor" strokeWidth="1.7"/>
                                <path d="M3.8 12h4l2-3.5 3.1 7 2.2-3.5h5.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </>
                            )}
                          </svg>
                        </span>
                        <div>
                          <div className="text-[#172236] font-[800] text-[11px]">{c.code}</div>
                          <div className="mt-[2px] text-[#8995a6] text-[9px]">Synthetic candidate</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      {c.organ}
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      <strong className="text-[#34465d]">{c.blood}</strong>
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      <span className={`inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current ${getStatusClass(c.hla)}`}>
                        {c.hla}
                      </span>
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      {c.urgency}
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      <div className="flex items-center gap-[7px]">
                        <span className="w-[46px] h-[5px] rounded-[10px] overflow-hidden bg-[#e9edf3]">
                          <span className="block h-full rounded-[10px] bg-[#33988c]" style={{width: `${c.score}%`}}></span>
                        </span>
                        <span className="text-[#246f65] font-[800] text-[11px]">{c.score}%</span>
                      </div>
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      <span className={`inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current ${getStatusClass(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-right">
                      <button className="border-0 bg-transparent text-[#97002f] font-[750] text-[11px] p-0 hover:text-[#760025] cursor-pointer invisible group-hover:visible">
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-[30px] text-center text-[#8190a1] text-[12px]">
                    No matching demo candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center p-[12px_19px] border-t border-[#edf0f5] text-[#8190a1] text-[10px]">
          <span>{filteredCandidates.length} demo candidates shown</span>
          <span>Scores demonstrate UI only</span>
        </div>
      </article>
    </section>
  );
}
