'use client';

import React from 'react';

export function WorkspaceSettings() {
  return (
    <section className="animate-[fadeIn_0.25s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-[16px] mb-[20px] md:mb-[28px]">
        <div>
          <div className="text-[#8191a7] uppercase text-[10px] tracking-[1.2px] font-[800] mb-[7px]">Workspace configuration</div>
          <h1 className="text-[28px] md:text-[34px] font-[800] tracking-[-1px] text-[#111827] m-0 leading-[1.1]">Settings</h1>
          <p className="text-[#64748b] text-[13px] md:text-[14px] mt-[9px] md:mt-[11px] max-w-[540px] leading-[1.6]">
            Prototype settings for role-aware access, privacy safeguards, and workspace preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)] gap-[15px]">
        <article className="min-w-0 p-[21px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] flex flex-col">
          <div className="text-[#172236] text-[13px] font-[800] tracking-[-.25px]">Privacy and access controls</div>
          <div className="text-[#8190a1] text-[11px] mt-[4px]">Demonstration states only; these controls are not connected to an authorization service.</div>
          <div className="flex flex-col gap-[9px] mt-[17px]">
            <div className="flex items-center gap-[9px] text-[#53637a] text-[10px]">
              <svg className="text-[#298679] flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Direct identifiers excluded from matching view</span>
              <span className="ml-auto inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] bg-[#e9f7f2] text-[#287d6e] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">Enabled</span>
            </div>
            <div className="flex items-center gap-[9px] text-[#53637a] text-[10px]">
              <svg className="text-[#298679] flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Human review before allocation action</span>
              <span className="ml-auto inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] bg-[#e9f7f2] text-[#287d6e] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">Required</span>
            </div>
            <div className="flex items-center gap-[9px] text-[#53637a] text-[10px]">
              <svg className="text-[#298679] flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Versioned policy on each run</span>
              <span className="ml-auto inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] bg-[#e9f7f2] text-[#287d6e] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">Enabled</span>
            </div>
          </div>
        </article>

        <article className="min-w-0 p-[21px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] flex flex-col">
          <div className="text-[#172236] text-[13px] font-[800] tracking-[-.25px]">Workspace details</div>
          <div className="text-[#8190a1] text-[11px] mt-[4px]">Current prototype context</div>
          <div className="grid grid-cols-[110px_1fr] gap-[12px] text-[11px] mt-[18px]">
            <span className="text-[#8190a1]">Organization</span>
            <strong className="text-[#172236]">Northstar Transplant Center</strong>
            <span className="text-[#8190a1]">Workspace ID</span>
            <strong className="text-[#172236]">ORG-DEMO-042</strong>
            <span className="text-[#8190a1]">Environment</span>
            <strong className="text-[#172236]">
              <span className="inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] bg-[#eef4ff] text-[#356eaa] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">Synthetic demo</span>
            </strong>
            <span className="text-[#8190a1]">Active policy</span>
            <strong className="text-[#172236]">Allocation Standard 2026.4</strong>
            <span className="text-[#8190a1]">Build</span>
            <strong className="text-[#172236]">OrganTrust prototype v0.1</strong>
          </div>
          <button className="h-[38px] w-full mt-[20px] px-[16px] border border-[#cbd5e1] rounded-[10px] bg-white text-[#475569] font-[750] text-[12px] hover:bg-[#f8fafc] cursor-pointer transition-colors active:scale-[0.98]">
            Reset demo state
          </button>
        </article>
      </div>
    </section>
  );
}
