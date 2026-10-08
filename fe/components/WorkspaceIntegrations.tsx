'use client';

import React from 'react';

export function WorkspaceIntegrations() {
  return (
    <section className="animate-[fadeIn_0.25s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-[16px] mb-[20px] md:mb-[28px]">
        <div>
          <div className="text-[#8191a7] uppercase text-[10px] tracking-[1.2px] font-[800] mb-[7px]">Interoperability layer</div>
          <h1 className="text-[28px] md:text-[34px] font-[800] tracking-[-1px] text-[#111827] m-0 leading-[1.1]">Integrations</h1>
          <p className="text-[#64748b] text-[13px] md:text-[14px] mt-[9px] md:mt-[11px] max-w-[540px] leading-[1.6]">
            Connect the validation layer to the systems already used by clinical teams, without replacing their workflows.
          </p>
        </div>
        <div className="flex gap-[10px]">
          <button className="h-[38px] md:h-[42px] px-[16px] md:px-[20px] border-0 rounded-[10px] md:rounded-[12px] bg-[#97002f] hover:bg-[#860029] text-white font-[750] text-[12px] md:text-[13px] shadow-[0_4px_12px_rgba(151,0,47,.25)] flex items-center gap-[9px] cursor-pointer transition-all active:scale-[0.98]">
            Request integration
          </button>
        </div>
      </div>

      <div className="flex items-start md:items-center gap-[12px] p-[14px_16px] md:p-[14px_22px] mb-[24px] rounded-[13px] border border-[#d2dce8] bg-[#f8fafd] text-[#334155] text-[12px] md:text-[13px] leading-[1.5]">
        <svg className="flex-none text-[#5a718b] mt-[1px] md:mt-0" width="19" height="19" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M12 11v5M12 7.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p className="m-0 flex-1">
          <strong className="font-[750] text-[#1e293b]">Illustrative connection states.</strong> No hospital records or external services are connected in this standalone HTML prototype.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px]">
        <article className="min-w-0 p-[20px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] flex flex-col">
          <div className="flex items-center gap-[12px]">
            <div className="w-[43px] h-[43px] border border-[#e2e8f0] rounded-[12px] grid place-items-center bg-[#fafbfd] text-[#35465c] font-[850] text-[12px] flex-none">HIS</div>
            <div>
              <h3 className="m-0 text-[#172236] text-[13px] font-[800]">Hospital information system</h3>
              <div className="text-[#8190a1] text-[10px] mt-[3px]">Case metadata · eligibility inputs</div>
            </div>
            <span className="ml-auto inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] bg-[#eef4ff] text-[#356eaa] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">Demo only</span>
          </div>
          <p className="text-[#62728a] text-[11px] leading-[1.6] m-[16px_0]">
            Represents a controlled import path for pseudonymized case data, required fields, and data integrity checks.
          </p>
          <div className="flex items-center justify-between gap-[8px] pt-[13px] mt-auto border-t border-[#edf0f5] text-[#8390a1] text-[10px]">
            <span>Last sync: simulated at 11:10 AM</span>
            <button className="border-0 bg-transparent text-[#97002f] font-[750] text-[11px] p-0 hover:text-[#760025] cursor-pointer">View details</button>
          </div>
        </article>

        <article className="min-w-0 p-[20px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] flex flex-col">
          <div className="flex items-center gap-[12px]">
            <div className="w-[43px] h-[43px] border border-[#e2e8f0] rounded-[12px] grid place-items-center bg-[#fafbfd] text-[#35465c] font-[850] text-[12px] flex-none">API</div>
            <div>
              <h3 className="m-0 text-[#172236] text-[13px] font-[800]">Allocation policy API</h3>
              <div className="text-[#8190a1] text-[10px] mt-[3px]">Versioned policy definitions</div>
            </div>
            <span className="ml-auto inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] bg-[#e9f7f2] text-[#287d6e] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">Mock ready</span>
          </div>
          <p className="text-[#62728a] text-[11px] leading-[1.6] m-[16px_0]">
            Represents retrieval of a signed, versioned policy package that can be pinned to each matching run.
          </p>
          <div className="flex items-center justify-between gap-[8px] pt-[13px] mt-auto border-t border-[#edf0f5] text-[#8390a1] text-[10px]">
            <span>Policy set: 2026.4</span>
            <button className="border-0 bg-transparent text-[#97002f] font-[750] text-[11px] p-0 hover:text-[#760025] cursor-pointer">View details</button>
          </div>
        </article>

        <article className="min-w-0 p-[20px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] flex flex-col">
          <div className="flex items-center gap-[12px]">
            <div className="w-[43px] h-[43px] border border-[#e2e8f0] rounded-[12px] grid place-items-center bg-[#fafbfd] text-[#35465c] font-[850] text-[12px] flex-none">LOG</div>
            <div>
              <h3 className="m-0 text-[#172236] text-[13px] font-[800]">Audit storage</h3>
              <div className="text-[#8190a1] text-[10px] mt-[3px]">Append-only evidence records</div>
            </div>
            <span className="ml-auto inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] bg-[#eef4ff] text-[#356eaa] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">Local mock</span>
          </div>
          <p className="text-[#62728a] text-[11px] leading-[1.6] m-[16px_0]">
            Represents storage for run metadata, policy hashes, verification outcomes, and event-to-event links.
          </p>
          <div className="flex items-center justify-between gap-[8px] pt-[13px] mt-auto border-t border-[#edf0f5] text-[#8390a1] text-[10px]">
            <span>Records: illustrative only</span>
            <button className="border-0 bg-transparent text-[#97002f] font-[750] text-[11px] p-0 hover:text-[#760025] cursor-pointer">View details</button>
          </div>
        </article>

        <article className="min-w-0 p-[20px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] flex flex-col">
          <div className="flex items-center gap-[12px]">
            <div className="w-[43px] h-[43px] border border-[#e2e8f0] rounded-[12px] grid place-items-center bg-[#fafbfd] text-[#35465c] font-[850] text-[12px] flex-none">3RD</div>
            <div>
              <h3 className="m-0 text-[#172236] text-[13px] font-[800]">Independent verification</h3>
              <div className="text-[#8190a1] text-[10px] mt-[3px]">External review access</div>
            </div>
            <span className="ml-auto inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] bg-[#fff5e4] text-[#94620d] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">Not connected</span>
          </div>
          <p className="text-[#62728a] text-[11px] leading-[1.6] m-[16px_0]">
            Represents a read-only workflow for authorized auditors to validate evidence without viewing identifying patient data.
          </p>
          <div className="flex items-center justify-between gap-[8px] pt-[13px] mt-auto border-t border-[#edf0f5] text-[#8390a1] text-[10px]">
            <span>No external auditor configured</span>
            <button className="border-0 bg-transparent text-[#97002f] font-[750] text-[11px] p-0 hover:text-[#760025] cursor-pointer">View details</button>
          </div>
        </article>
      </div>
    </section>
  );
}
