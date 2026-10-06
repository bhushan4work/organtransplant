'use client';

import React from 'react';
import Link from 'next/link';

export function WorkspacePolicies() {
  return (
    <section className="animate-[fadeIn_0.25s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-[16px] mb-[20px] md:mb-[28px]">
        <div>
          <div className="text-[#8191a7] uppercase text-[10px] tracking-[1.2px] font-[800] mb-[7px]">Deterministic · version controlled</div>
          <h1 className="text-[28px] md:text-[34px] font-[800] tracking-[-1px] text-[#111827] m-0 leading-[1.1]">Policy rules</h1>
          <p className="text-[#64748b] text-[13px] md:text-[14px] mt-[9px] md:mt-[11px] max-w-[540px] leading-[1.6]">
            Every matching run references a fixed policy version so the rules behind a result can be reviewed later.
          </p>
        </div>
        <div className="flex gap-[10px]">
          <button className="h-[38px] md:h-[42px] px-[16px] md:px-[20px] border border-[#cbd5e1] rounded-[10px] md:rounded-[12px] bg-white text-[#475569] font-[750] text-[12px] md:text-[13px] hover:bg-[#f8fafc] flex items-center gap-[9px] cursor-pointer transition-all active:scale-[0.98]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M7 4v16M17 4v16M4 8h6m4 8h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg> 
            Compare versions
          </button>
        </div>
      </div>

      <div className="flex items-start md:items-center gap-[12px] p-[14px_16px] md:p-[14px_22px] mb-[24px] rounded-[13px] border border-[#d2dce8] bg-[#f8fafd] text-[#334155] text-[12px] md:text-[13px] leading-[1.5]">
        <svg className="flex-none text-[#5a718b] mt-[1px] md:mt-0" width="19" height="19" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M12 11v5M12 7.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p className="m-0 flex-1">
          <strong className="font-[750] text-[#1e293b]">Illustrative rule set.</strong> This prototype shows how rules and versions could be presented. It is not a clinical guideline and must not be used to determine real eligibility.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)] gap-[15px] mb-[24px]">
        <article className="min-w-0 p-[21px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)]">
          <div className="text-[#8191a7] uppercase text-[10px] tracking-[1.2px] font-[800] mb-[9px]">Current active version</div>
          <div className="flex items-center gap-[12px]">
            <h2 className="text-[24px] tracking-[-.8px] font-[800] text-[#172236] m-0">Allocation Standard 2026.4</h2>
            <span className="inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] bg-[#e9f7f2] text-[#287d6e] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">Active</span>
          </div>
          <p className="text-[#64748b] text-[13px] md:text-[14px] mt-[9px] leading-[1.6]">
            Published Oct 01, 2026 · Approved for demonstration · Immutable after publication
          </p>
          <div className="flex flex-col gap-[9px] pt-[13px] mt-[19px] border-t border-[#edf0f5]">
            <div className="flex items-center gap-[9px] text-[#53637a] text-[10px]">
              <svg className="text-[#298679] flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> 
              Compatibility and required marker checks 
              <strong className="ml-auto text-[#2d756b]">Enabled</strong>
            </div>
            <div className="flex items-center gap-[9px] text-[#53637a] text-[10px]">
              <svg className="text-[#298679] flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> 
              Versioned urgency and ranking criteria 
              <strong className="ml-auto text-[#2d756b]">Enabled</strong>
            </div>
            <div className="flex items-center gap-[9px] text-[#53637a] text-[10px]">
              <svg className="text-[#298679] flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> 
              Human-review checkpoint before action 
              <strong className="ml-auto text-[#2d756b]">Required</strong>
            </div>
            <div className="flex items-center gap-[9px] text-[#53637a] text-[10px]">
              <svg className="text-[#298679] flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> 
              Record policy hash with every run 
              <strong className="ml-auto text-[#2d756b]">Enabled</strong>
            </div>
          </div>
        </article>

        <article className="min-w-0 border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] flex flex-col">
          <div className="flex items-start gap-[12px] p-[16px_15px_13px] md:p-[19px_20px_15px]">
            <div>
              <div className="text-[13px] md:text-[14px] font-[800] tracking-[-.25px] text-[#172236]">Policy provenance</div>
              <div className="mt-[4px] text-[11px] text-[#62728a]">Evidence attached to the active version</div>
            </div>
          </div>
          <div className="p-[0_20px_19px]">
            <div className="text-[10px] text-[#8190a1] font-[750] mb-[6px]">POLICY HASH</div>
            <div className="flex gap-[7px] items-center">
              <span className="flex-1 overflow-hidden text-ellipsis p-[7px_8px] border border-[#e1e8ee] rounded-[5px] bg-[#fafbfd] text-[#596b7e] text-[9px] font-mono">
                sha256:7d92a4c1e8b6...fa31
              </span>
              <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] bg-white border border-[#cbd5e1] text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a] transition-colors cursor-pointer" aria-label="copy policy hash">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.7"/>
                  <path d="M16 8V5a1.5 1.5 0 0 0-1.5-1.5h-9A1.5 1.5 0 0 0 4 5v9a1.5 1.5 0 0 0 1.5 1.5H8" stroke="currentColor" strokeWidth="1.7"/>
                </svg>
              </button>
            </div>
            <div className="text-[10px] text-[#8190a1] font-[750] mt-[15px] mb-[6px]">CHANGE RECORD</div>
            <p className="text-[11px] text-[#52637a] leading-[1.65] m-0">
              Any future update receives a new version and hash. Historical runs retain the version used when they were executed.
            </p>
            <div className="mt-[16px]">
              <Link href="/workspace/audit" className="flex items-center justify-center w-full h-[38px] border border-[#cbd5e1] rounded-[10px] bg-white text-[#475569] font-[750] text-[12px] hover:bg-[#f8fafc] transition-colors no-underline">
                View linked audit records
              </Link>
            </div>
          </div>
        </article>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px]">
        <article className="min-w-0 p-[19px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] flex flex-col">
          <div className="flex items-start gap-[11px]">
            <div className="w-[39px] h-[39px] grid place-items-center flex-none rounded-[11px] text-[#97002f] bg-[#fff0f4]">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path d="M12 3 20 7.5 12 12 4 7.5 12 3Z M4 12l8 4.5 8-4.5M4 16.5 12 21l8-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="m-0 text-[#172236] text-[13px] font-[800]">Eligibility validation</h3>
              <div className="text-[#8190a1] text-[10px] mt-[3px]">Input and hard-constraint checks</div>
            </div>
            <span className="ml-auto text-[#64738a] bg-[#f1f4f8] rounded-[6px] p-[4px_7px] text-[9px] font-[800]">RULESET A</span>
          </div>
          <p className="text-[#62728a] text-[11px] leading-[1.65] m-[7px_0_15px]">
            Validates required demo fields and applies the configured compatibility constraints before ranking begins.
          </p>
          <div className="flex flex-col gap-[9px] pt-[13px] border-t border-[#edf0f5]">
            <div className="flex items-center gap-[9px] text-[#53637a] text-[10px]">
              <svg className="text-[#298679] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2"/>
              </svg> 
              Required field integrity 
              <strong className="ml-auto text-[#2d756b]">On</strong>
            </div>
            <div className="flex items-center gap-[9px] text-[#53637a] text-[10px]">
              <svg className="text-[#298679] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2"/>
              </svg> 
              Compatibility constraints 
              <strong className="ml-auto text-[#2d756b]">On</strong>
            </div>
          </div>
          <div className="flex items-center gap-[8px] mt-auto pt-[16px] text-[#8a97a7] text-[10px]">
            <span className="w-[7px] h-[7px] inline-block rounded-full bg-[#29a18b] shadow-[0_0_0_3px_rgba(41,161,139,.12)]"></span> 
            Last referenced in RUN-2026-104
          </div>
        </article>

        <article className="min-w-0 p-[19px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] flex flex-col">
          <div className="flex items-start gap-[11px]">
            <div className="w-[39px] h-[39px] grid place-items-center flex-none rounded-[11px] text-[#97002f] bg-[#fff0f4]">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path d="M4 19.5V4.5M4 19.5h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                <path d="m7 15 4-4 3 2 5-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="m-0 text-[#172236] text-[13px] font-[800]">Ranking and explanation</h3>
              <div className="text-[#8190a1] text-[10px] mt-[3px]">Transparent priority ordering</div>
            </div>
            <span className="ml-auto text-[#64738a] bg-[#f1f4f8] rounded-[6px] p-[4px_7px] text-[9px] font-[800]">RULESET B</span>
          </div>
          <p className="text-[#62728a] text-[11px] leading-[1.65] m-[7px_0_15px]">
            Applies versioned priority criteria to the eligible demo pool and produces a readable explanation for review.
          </p>
          <div className="flex flex-col gap-[9px] pt-[13px] border-t border-[#edf0f5]">
            <div className="flex items-center gap-[9px] text-[#53637a] text-[10px]">
              <svg className="text-[#298679] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2"/>
              </svg> 
              Ranked factors disclosed 
              <strong className="ml-auto text-[#2d756b]">On</strong>
            </div>
            <div className="flex items-center gap-[9px] text-[#53637a] text-[10px]">
              <svg className="text-[#298679] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2"/>
              </svg> 
              Human review required 
              <strong className="ml-auto text-[#2d756b]">On</strong>
            </div>
          </div>
          <div className="flex items-center gap-[8px] mt-auto pt-[16px] text-[#8a97a7] text-[10px]">
            <span className="w-[7px] h-[7px] inline-block rounded-full bg-[#29a18b] shadow-[0_0_0_3px_rgba(41,161,139,.12)]"></span> 
            Version-pinned per run
          </div>
        </article>
      </div>
    </section>
  );
}
