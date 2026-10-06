'use client';

import React, { useState } from 'react';

const auditRecordsData = [
  {type:'Verification',title:'Audit chain integrity verified',desc:'All linked demo hashes validated successfully.',hash:'sha256:4a91…88c2',time:'11:18 AM',run:'SYS-VERIFY-346'},
  {type:'Matching run',title:'Matching run completed',desc:'RUN-2026-104 · Kidney · 8 eligible candidates.',hash:'sha256:8cf2…1d90',time:'11:06 AM',run:'RUN-2026-104'},
  {type:'Review',title:'Human review checkpoint recorded',desc:'Review status updated for a synthetic candidate set.',hash:'sha256:b615…c411',time:'10:58 AM',run:'REV-DEMO-021'},
  {type:'Policy',title:'Active policy version confirmed',desc:'Allocation Standard 2026.4 hash pinned to run metadata.',hash:'sha256:7d92…fa31',time:'10:44 AM',run:'POL-2026-4'},
  {type:'Matching run',title:'Matching run completed',desc:'RUN-2026-103 · Liver · 6 eligible candidates.',hash:'sha256:da10…ee72',time:'10:42 AM',run:'RUN-2026-103'},
  {type:'Verification',title:'Pseudonymization checks passed',desc:'Direct identifiers excluded from the demo result view.',hash:'sha256:920a…b314',time:'10:40 AM',run:'PRIV-CHECK-019'}
];

const getIcon = (type: string) => {
  if (type === 'Matching run') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M14 3.8V8h4M8 12h8M8 16h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === 'Policy') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 3.3 19 6v5c0 4.2-2.7 7.3-7 9.1C7.7 18.3 5 15.2 5 11V6l7-2.7Z" stroke="currentColor" strokeWidth="1.7"/>
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export function WorkspaceAudit() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredAudit = auditRecordsData.filter(a => {
    const matchesSearch = `${a.type} ${a.title} ${a.desc} ${a.hash} ${a.run}`.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || a.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <section className="animate-[fadeIn_0.25s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-[16px] mb-[20px] md:mb-[28px]">
        <div>
          <div className="text-[#8191a7] uppercase text-[10px] tracking-[1.2px] font-[800] mb-[7px]">Tamper-evident recordkeeping</div>
          <h1 className="text-[28px] md:text-[34px] font-[800] tracking-[-1px] text-[#111827] m-0 leading-[1.1]">Audit ledger</h1>
          <p className="text-[#64748b] text-[13px] md:text-[14px] mt-[9px] md:mt-[11px] max-w-[540px] leading-[1.6]">
            A chronological evidence trail for matching runs, policy versions, verification checks, and review events.
          </p>
        </div>
        <div className="flex gap-[10px]">
          <button className="h-[38px] md:h-[42px] px-[16px] md:px-[20px] border border-[#cbd5e1] rounded-[10px] md:rounded-[12px] bg-white text-[#475569] font-[750] text-[12px] md:text-[13px] hover:bg-[#f8fafc] flex items-center gap-[9px] cursor-pointer transition-all active:scale-[0.98]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> 
            Export evidence
          </button>
        </div>
      </div>

      <div className="flex items-start md:items-center gap-[12px] p-[14px_16px] md:p-[14px_22px] mb-[24px] rounded-[13px] border border-[#d2dce8] bg-[#f8fafd] text-[#334155] text-[12px] md:text-[13px] leading-[1.5]">
        <svg className="flex-none text-[#5a718b] mt-[1px] md:mt-0" width="19" height="19" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M12 11v5M12 7.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p className="m-0 flex-1">
          <strong className="font-[750] text-[#1e293b]">Prototype audit records.</strong> Hashes are illustrative UI values and are not cryptographic proof. Production verification would require server-side signing, durable storage, and independent validation.
        </p>
        <span className="hidden md:inline-block ml-auto text-[10px] font-[850] text-[#6b7b91] uppercase tracking-[1px] py-[3px] px-[7px] bg-[#eef1f6] rounded-[6px]">
          APPEND-ONLY CONCEPT
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[14px] mb-[18px]">
        <div className="p-[16px_18px] border border-[#e2e8f0] rounded-[14px] bg-white">
          <div className="text-[#8190a1] text-[10px] font-[650]">Events recorded</div>
          <div className="text-[#172236] text-[22px] tracking-[-.7px] font-[850] mt-[5px]">346</div>
          <div className="text-[#318274] text-[10px] mt-[4px]">Demo activity total</div>
        </div>
        <div className="p-[16px_18px] border border-[#e2e8f0] rounded-[14px] bg-white">
          <div className="text-[#8190a1] text-[10px] font-[650]">Chain integrity</div>
          <div className="text-[#172236] text-[22px] tracking-[-.7px] font-[850] mt-[5px]">Verified</div>
          <div className="text-[#318274] text-[10px] mt-[4px]">No inconsistencies detected</div>
        </div>
        <div className="p-[16px_18px] border border-[#e2e8f0] rounded-[14px] bg-white">
          <div className="text-[#8190a1] text-[10px] font-[650]">Last ledger check</div>
          <div className="text-[#172236] text-[20px] tracking-[-.7px] font-[850] mt-[5px]">11:18:42 AM</div>
          <div className="text-[#318274] text-[10px] mt-[4px]">Today · Oct 06, 2026</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-[10px] mb-[17px]">
        <input 
          className="h-[38px] min-w-[200px] max-w-full sm:max-w-[350px] w-full px-[12px] border border-[#cbd5e1] rounded-[9px] bg-white text-[#172236] text-[11px] placeholder:text-[#94a3b8] outline-none focus:border-[#97002f] focus:ring-1 focus:ring-[#97002f]" 
          type="search" 
          placeholder="Search event, hash, or run ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="h-[38px] px-[11px] pr-[32px] border border-[#cbd5e1] rounded-[9px] bg-white text-[#475569] text-[11px] outline-none focus:border-[#97002f] appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All event types</option>
          <option value="Matching run">Matching runs</option>
          <option value="Policy">Policy changes</option>
          <option value="Verification">Verification checks</option>
          <option value="Review">Human reviews</option>
        </select>
        <div className="flex-1 hidden sm:block"></div>
        <button className="h-[38px] px-[16px] border border-[#cbd5e1] rounded-[9px] bg-white text-[#475569] font-[700] text-[11px] hover:bg-[#f8fafc] cursor-pointer inline-flex items-center justify-center gap-[7px] transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 12a8 8 0 1 1-2.3-5.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
          </svg> 
          Verify chain
        </button>
      </div>

      <article className="min-w-0 border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] flex flex-col p-[20px]">
        <div className="flex items-start gap-[12px] pb-[11px] mb-[11px]">
          <div>
            <div className="text-[13px] md:text-[14px] font-[800] tracking-[-.25px] text-[#172236]">Recent evidence records</div>
            <div className="mt-[4px] text-[11px] text-[#62728a]">Entries below are fictional examples for the prototype.</div>
          </div>
          <div className="ml-auto">
            <span className="inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] bg-[#e9f7f2] text-[#287d6e] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">Chain consistent</span>
          </div>
        </div>

        <div className="flex flex-col">
          {filteredAudit.length > 0 ? (
            filteredAudit.map((a, i) => (
              <div key={i} className="grid grid-cols-[34px_minmax(130px,1fr)_1.4fr_90px] items-center gap-[14px] py-[14px] border-b border-[#edf0f5] last:border-b-0 overflow-x-auto">
                <div className="w-[29px] h-[29px] grid place-items-center rounded-[9px] bg-[#eaf7f5] text-[#287f7b] flex-none">
                  {getIcon(a.type)}
                </div>
                <div className="min-w-0">
                  <div className="text-[#172236] font-[750] text-[11px] truncate">{a.title}</div>
                  <div className="text-[#8190a1] text-[10px] mt-[3px] truncate">{a.run} · {a.time} · {a.type}</div>
                </div>
                <div className="min-w-0 flex flex-col items-start justify-center">
                  <div className="text-[#8190a1] text-[9px] mb-[4px] font-[750]">RECORD HASH</div>
                  <span className="inline-block max-w-[220px] w-full overflow-hidden text-ellipsis p-[2px_5px] border border-[#e1e8ee] rounded-[5px] bg-[#fafbfd] text-[#596b7e] text-[9px] font-mono whitespace-nowrap">
                    {a.hash}
                  </span>
                </div>
                <div className="text-[#287f7b] text-[10px] font-[800] flex items-center justify-end gap-[5px] ml-auto">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg> Verified
                </div>
              </div>
            ))
          ) : (
            <div className="p-[24px] text-center text-[#7e8b9d] text-[12px]">No matching audit records.</div>
          )}
        </div>

        <div className="flex justify-between items-center pt-[12px] mt-[12px] border-t border-[#edf0f5] text-[#8190a1] text-[10px]">
          <span>{filteredAudit.length} recent records displayed</span>
          <span>Latest record at top</span>
        </div>
      </article>
    </section>
  );
}
