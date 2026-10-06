'use client';

import React, { useState } from 'react';

const runsData = [
  {id:'RUN-2026-104',organ:'Kidney',eligible:8,policy:'2026.4',reviewer:'Dr. Sarah Chen',time:'Today, 11:06 AM',status:'Verified'},
  {id:'RUN-2026-103',organ:'Liver',eligible:6,policy:'2026.4',reviewer:'Alex Morgan',time:'Today, 10:42 AM',status:'Verified'},
  {id:'RUN-2026-102',organ:'Heart',eligible:3,policy:'2026.4',reviewer:'Dr. Sarah Chen',time:'Today, 9:58 AM',status:'Review required'},
  {id:'RUN-2026-101',organ:'Kidney',eligible:9,policy:'2026.3',reviewer:'Demo service account',time:'Yesterday, 4:31 PM',status:'Verified'},
  {id:'RUN-2026-100',organ:'Liver',eligible:5,policy:'2026.3',reviewer:'Alex Morgan',time:'Yesterday, 2:14 PM',status:'Verified'},
  {id:'RUN-2026-099',organ:'Kidney',eligible:7,policy:'2026.3',reviewer:'Dr. Sarah Chen',time:'Oct 04, 3:40 PM',status:'Verified'},
  {id:'RUN-2026-098',organ:'Heart',eligible:4,policy:'2026.3',reviewer:'Alex Morgan',time:'Oct 04, 1:26 PM',status:'Verified'},
  {id:'RUN-2026-097',organ:'Kidney',eligible:8,policy:'2026.3',reviewer:'Dr. Sarah Chen',time:'Oct 03, 5:08 PM',status:'Verified'},
  {id:'RUN-2026-096',organ:'Liver',eligible:6,policy:'2026.2',reviewer:'Demo service account',time:'Oct 03, 1:15 PM',status:'Verified'},
  {id:'RUN-2026-095',organ:'Kidney',eligible:10,policy:'2026.2',reviewer:'Alex Morgan',time:'Oct 02, 4:47 PM',status:'Verified'},
  {id:'RUN-2026-094',organ:'Heart',eligible:2,policy:'2026.2',reviewer:'Dr. Sarah Chen',time:'Oct 02, 10:21 AM',status:'Verified'},
  {id:'RUN-2026-093',organ:'Kidney',eligible:7,policy:'2026.2',reviewer:'Alex Morgan',time:'Oct 01, 9:52 AM',status:'Verified'}
];

const getStatusClass = (status: string) => {
  if (status.includes('Verified')) return 'bg-[#e9f7f2] text-[#287d6e]';
  if (status.includes('Review')) return 'bg-[#fff5e4] text-[#94620d]';
  if (status.includes('Blocked')) return 'bg-[#fff0f0] text-[#aa4848]';
  return 'bg-[#eef4ff] text-[#356eaa]';
};

export function WorkspaceRuns() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRuns = runsData.filter(r => {
    const matchesSearch = `${r.id} ${r.organ} ${r.policy} ${r.reviewer} ${r.status}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="animate-[fadeIn_0.25s_ease-out]">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-[16px] mb-[20px] md:mb-[28px]">
        <div>
          <div className="text-[#8191a7] uppercase text-[10px] tracking-[1.2px] font-[800] mb-[7px]">Allocation history</div>
          <h1 className="text-[28px] md:text-[34px] font-[800] tracking-[-1px] text-[#111827] m-0 leading-[1.1]">Matching runs</h1>
          <p className="text-[#64748b] text-[13px] md:text-[14px] mt-[9px] md:mt-[11px] max-w-[540px] leading-[1.6]">
            Review simulated runs, compare policy versions, and inspect the evidence recorded for each result.
          </p>
        </div>
        <div className="flex gap-[10px]">
          <button className="h-[38px] md:h-[42px] px-[16px] md:px-[20px] border-0 rounded-[10px] md:rounded-[12px] bg-[#97002f] hover:bg-[#860029] text-white font-[750] text-[12px] md:text-[13px] shadow-[0_4px_12px_rgba(151,0,47,.25)] flex items-center gap-[9px] cursor-pointer transition-all active:scale-[0.98]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg> 
            Run demo match
          </button>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="flex items-start md:items-center gap-[12px] p-[14px_16px] md:p-[14px_22px] mb-[24px] rounded-[13px] border border-[#d2dce8] bg-[#f8fafd] text-[#334155] text-[12px] md:text-[13px] leading-[1.5]">
        <svg className="flex-none text-[#5a718b] mt-[1px] md:mt-0" width="19" height="19" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M12 11v5M12 7.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p className="m-0 flex-1">
          <strong className="font-[750] text-[#1e293b]">Synthetic run history.</strong> Results are illustrative only and are not recommendations or real transplant allocations.
        </p>
        <span className="hidden md:inline-block ml-auto text-[10px] font-[850] text-[#6b7b91] uppercase tracking-[1px] py-[3px] px-[7px] bg-[#eef1f6] rounded-[6px]">
          DEMO DATA
        </span>
      </div>

      {/* Audit Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[14px] mb-[18px]">
        <div className="p-[16px_18px] border border-[#e2e8f0] rounded-[14px] bg-white">
          <div className="text-[#8190a1] text-[10px] font-[650]">Runs in this workspace</div>
          <div className="text-[#172236] text-[22px] tracking-[-.7px] font-[850] mt-[5px]">12</div>
          <div className="text-[#318274] text-[10px] mt-[4px]">Versioned and traceable</div>
        </div>
        <div className="p-[16px_18px] border border-[#e2e8f0] rounded-[14px] bg-white">
          <div className="text-[#8190a1] text-[10px] font-[650]">Successfully verified</div>
          <div className="text-[#172236] text-[22px] tracking-[-.7px] font-[850] mt-[5px]">12 / 12</div>
          <div className="text-[#318274] text-[10px] mt-[4px]">All ledger entries consistent</div>
        </div>
        <div className="p-[16px_18px] border border-[#e2e8f0] rounded-[14px] bg-white">
          <div className="text-[#8190a1] text-[10px] font-[650]">Active policy version</div>
          <div className="text-[#172236] text-[20px] tracking-[-.7px] font-[850] mt-[5px]">2026.4</div>
          <div className="text-[#318274] text-[10px] mt-[4px]">Published Oct 01, 2026</div>
        </div>
      </div>

      {/* View Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-[10px] mb-[17px]">
        <input 
          className="h-[38px] min-w-[200px] max-w-full sm:max-w-[350px] w-full px-[12px] border border-[#cbd5e1] rounded-[9px] bg-white text-[#172236] text-[11px] placeholder:text-[#94a3b8] outline-none focus:border-[#97002f] focus:ring-1 focus:ring-[#97002f]" 
          type="search" 
          placeholder="Search run ID, organ, policy..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="h-[38px] px-[11px] pr-[32px] border border-[#cbd5e1] rounded-[9px] bg-white text-[#475569] text-[11px] outline-none focus:border-[#97002f] appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="Verified">Verified</option>
          <option value="Review required">Review required</option>
        </select>
        <div className="flex-1 hidden sm:block"></div>
        <button className="h-[38px] px-[16px] border border-[#cbd5e1] rounded-[9px] bg-white text-[#475569] font-[700] text-[11px] hover:bg-[#f8fafc] cursor-pointer inline-flex items-center justify-center gap-[7px] transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg> 
          Export CSV
        </button>
      </div>

      {/* Table Card */}
      <article className="min-w-0 border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] overflow-hidden">
        <div className="w-full overflow-x-auto overflow-y-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Run ID</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Organ</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Eligible candidates</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Policy version</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Initiated by</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Run time</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase tracking-[.5px] whitespace-nowrap">Status</th>
                <th className="p-[12px] md:p-[15px_16px] border-b border-[#edf0f5] bg-[#fafbfd]"></th>
              </tr>
            </thead>
            <tbody>
              {filteredRuns.length > 0 ? (
                filteredRuns.map((r) => (
                  <tr key={r.id} className="hover:bg-[#f8fafd] transition-colors group">
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5]">
                      <strong className="text-[#25364c] font-[800] text-[11px]">{r.id}</strong>
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      {r.organ}
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      {r.eligible}
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      <span className="inline-block max-w-[130px] overflow-hidden text-ellipsis align-bottom p-[2px_5px] border border-[#e1e8ee] rounded-[5px] bg-[#fafbfd] text-[#596b7e] text-[9px] font-mono">
                        v{r.policy}
                      </span>
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      {r.reviewer}
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      {r.time}
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      <span className={`inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current ${getStatusClass(r.status)}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-right">
                      <button className="border-0 bg-transparent text-[#97002f] font-[750] text-[11px] p-0 hover:text-[#760025] cursor-pointer invisible group-hover:visible">
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-[30px] text-center text-[#8190a1] text-[12px]">
                    No matching runs. Try a different filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center p-[12px_19px] border-t border-[#edf0f5] text-[#8190a1] text-[10px]">
          <span>{filteredRuns.length} runs</span>
          <span>All timestamps are local demo time</span>
        </div>
      </article>
    </section>
  );
}
