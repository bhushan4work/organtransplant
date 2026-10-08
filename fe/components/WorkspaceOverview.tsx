import React from 'react';

export function WorkspaceOverview() {
  const candidates = [
    { code: 'C-2048', organ: 'Kidney', blood: 'O+', hla: 'Passed', urgency: 'High', score: 96, status: 'Eligible', urgencyClass: 'bg-[#fff5e4] text-[#94620d]' },
    { code: 'C-1932', organ: 'Liver', blood: 'A+', hla: 'Passed', urgency: 'Critical', score: 92, status: 'Review required', urgencyClass: 'bg-[#fff0f0] text-[#aa4848]' },
    { code: 'C-2187', organ: 'Kidney', blood: 'B+', hla: 'Passed', urgency: 'Moderate', score: 88, status: 'Eligible', urgencyClass: 'bg-[#eef4ff] text-[#356eaa]' },
    { code: 'C-1881', organ: 'Heart', blood: 'O−', hla: 'Pending', urgency: 'High', score: 84, status: 'Pending verification', urgencyClass: 'bg-[#fff5e4] text-[#94620d]' }
  ];

  const getStatusClass = (s: string) => {
    if (s === 'Eligible' || s === 'Passed') return 'bg-[#e9f7f2] text-[#287d6e]';
    if (s === 'Review required') return 'bg-[#fff5e4] text-[#94620d]';
    if (s === 'Pending verification') return 'bg-[#eef4ff] text-[#356eaa]';
    return '';
  };

  const activity = [
    { type: 'Verification', title: 'Audit chain integrity verified', desc: 'All linked demo hashes validated successfully.', hash: 'sha256:4a91…88c2', time: '11:18 AM', iconClass: 'text-[#287f7b] bg-[#eaf7f5]' },
    { type: 'Matching run', title: 'Matching run completed', desc: 'RUN-2026-104 · Kidney · 8 eligible candidates.', hash: 'sha256:8cf2…1d90', time: '11:06 AM', iconClass: 'text-[#596b7e] bg-[#f0f4f8]' },
    { type: 'Review', title: 'Human review checkpoint recorded', desc: 'Review status updated for a synthetic candidate set.', hash: 'sha256:b615…c411', time: '10:58 AM', iconClass: 'text-[#94620d] bg-[#fff5e4]' }
  ];

  return (
    <section className="animate-[fadeIn_0.22s_ease]">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-start gap-[20px] mb-[25px]">
        <div>
          <div className="flex items-center gap-[7px] text-[#97002f] uppercase tracking-[1.05px] text-[10px] font-[850] mb-[8px]">
            <span className="w-[7px] h-[7px] inline-block rounded-full bg-[#29a18b] shadow-[0_0_0_3px_rgba(41,161,139,.12)]"></span>
            Clinical allocation workspace
          </div>
          <h1 className="m-0 tracking-[-1.1px] text-[25px] md:text-[29px] leading-[1.2] font-[800] text-[#172236]">
            Matching overview
          </h1>
          <p className="mt-[8px] mb-0 text-[#62728a] text-[12px] md:text-[13px] max-w-[700px]">
            A clear view of eligibility checks, allocation runs, and the evidence behind every matching decision.
          </p>
        </div>
        <div className="flex flex-wrap md:flex-nowrap items-center gap-[9px] md:ml-auto pt-[15px] md:pt-[11px]">
          <div className="hidden md:flex items-center gap-[8px] h-[39px] px-[12px] border border-[#e2e8f0] rounded-[10px] text-[#3f5068] bg-white text-[11px] font-[650]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <rect x="3.5" y="5" width="17" height="15.5" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M7.5 3.5v3M16.5 3.5v3M4 9.5h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg> 
            Oct 06, 2026 
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <button className="inline-flex items-center justify-center gap-[8px] min-h-[39px] px-[14px] rounded-[10px] border border-transparent font-[750] text-[12px] transition-all whitespace-nowrap text-white bg-[#97002f] shadow-[0_5px_13px_rgba(151,0,47,.12)] hover:-translate-y-[1px] hover:bg-[#760025] cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg> 
            Run demo match
          </button>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="flex items-start md:items-center gap-[12px] p-[12px] md:p-[12px_15px] mb-[19px] border border-[#f0d6df] rounded-[12px] bg-[#fff7fa] text-[#754154]">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" className="text-[#97002f] shrink-0 mt-[2px] md:mt-0">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M12 11v5M12 7.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p className="m-0 text-[11px] leading-[1.55]">
          <strong className="text-[#7e1738]">Prototype environment.</strong> All people, cases, scores, and records shown here are synthetic demo data. This workspace illustrates transparent policy verification; it does not make or authorize real clinical allocation decisions.
        </p>
        <span className="hidden md:inline ml-auto text-[10px] text-[#986d7c] whitespace-nowrap">DEMO DATA · v0.1</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[9px] md:gap-[15px] mb-[18px]">
        <article className="min-w-0 p-[14px_13px] md:p-[18px_19px_16px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)]">
          <div className="flex items-center justify-between gap-[9px]">
            <div className="text-[#62728a] text-[10px] md:text-[11px] font-[650]">Active matching cases</div>
            <div className="w-[30px] h-[30px] md:w-[34px] md:h-[34px] grid place-items-center rounded-[10px] text-[#97002f] bg-[#fff0f4]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.7"/>
                <path d="M2.8 20v-1.5a6.2 6.2 0 0 1 12.4 0V20M17 8h5M19.5 5.5v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-[8px] mt-[12px]">
            <span className="text-[#172236] text-[25px] md:text-[29px] font-[800] tracking-[-1.2px] leading-none">128</span>
            <span className="text-[11px] text-[#62728a]">cases in queue</span>
          </div>
          <div className="flex flex-wrap items-center gap-[5px] mt-[11px] text-[#62728a] text-[9px] md:text-[10px]">
            <span className="text-[#21816e] font-[750]">+8</span> since last review <span className="text-[#62728a]">·</span> across 3 organ types
          </div>
        </article>

        <article className="min-w-0 p-[14px_13px] md:p-[18px_19px_16px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)]">
          <div className="flex items-center justify-between gap-[9px]">
            <div className="text-[#62728a] text-[10px] md:text-[11px] font-[650]">Eligible candidates</div>
            <div className="w-[30px] h-[30px] md:w-[34px] md:h-[34px] grid place-items-center rounded-[10px] text-[#286ba9] bg-[#eef6ff]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="m5 12.5 4.2 4.2L19.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-[8px] mt-[12px]">
            <span className="text-[#172236] text-[25px] md:text-[29px] font-[800] tracking-[-1.2px] leading-none">24</span>
            <span className="text-[11px] text-[#62728a]">currently eligible</span>
          </div>
          <div className="flex flex-wrap items-center gap-[5px] mt-[11px] text-[#62728a] text-[9px] md:text-[10px]">
            <span className="rounded-[6px] p-[2px_6px] text-[#287f7b] bg-[#e8f7f3] text-[9px] font-[800]">18.8%</span> of the active queue
          </div>
        </article>

        <article className="min-w-0 p-[14px_13px] md:p-[18px_19px_16px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)]">
          <div className="flex items-center justify-between gap-[9px]">
            <div className="text-[#62728a] text-[10px] md:text-[11px] font-[650]">Awaiting verification</div>
            <div className="w-[30px] h-[30px] md:w-[34px] md:h-[34px] grid place-items-center rounded-[10px] text-[#976510] bg-[#fff5e2]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7"/>
                <path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-[8px] mt-[12px]">
            <span className="text-[#172236] text-[25px] md:text-[29px] font-[800] tracking-[-1.2px] leading-none">7</span>
            <span className="text-[11px] text-[#62728a]">need a review</span>
          </div>
          <div className="flex flex-wrap items-center gap-[5px] mt-[11px] text-[#62728a] text-[9px] md:text-[10px]">
            <span className="text-[#986414] font-[750]">Requires attention</span> <span className="text-[#62728a]">·</span> no automated approval
          </div>
        </article>

        <article className="min-w-0 p-[14px_13px] md:p-[18px_19px_16px] border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)]">
          <div className="flex items-center justify-between gap-[9px]">
            <div className="text-[#62728a] text-[10px] md:text-[11px] font-[650]">Audit integrity</div>
            <div className="w-[30px] h-[30px] md:w-[34px] md:h-[34px] grid place-items-center rounded-[10px] text-[#287f7b] bg-[#eaf7f5]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M12 3.3 19 6v5c0 4.2-2.7 7.3-7 9.1C7.7 18.3 5 15.2 5 11V6l7-2.7Z" stroke="currentColor" strokeWidth="1.7"/>
                <path d="m8.7 11.5 2.1 2.1 4.6-4.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-[8px] mt-[12px]">
            <span className="text-[#172236] text-[25px] md:text-[29px] font-[800] tracking-[-1.2px] leading-none">100%</span>
            <span className="text-[11px] text-[#62728a]">verified records</span>
          </div>
          <div className="flex flex-wrap items-center gap-[5px] mt-[11px] text-[#62728a] text-[9px] md:text-[10px]">
            <span className="text-[#21816e] font-[750] inline-flex items-center gap-[3px]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="translate-y-[-0.5px]">
                <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> 
              All checks passing
            </span>
          </div>
        </article>
      </div>

      {/* Grid Main */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,1fr)] gap-[12px] md:gap-[17px] mb-[18px]">
        {/* Pipeline Card */}
        <article className="min-w-0 border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] overflow-hidden">
          <div className="flex items-start gap-[12px] p-[16px_15px_13px] md:p-[19px_20px_15px]">
            <div>
              <div className="text-[13px] md:text-[14px] font-[800] tracking-[-.25px] text-[#172236]">The five-step trust chain</div>
              <div className="mt-[4px] text-[11px] text-[#62728a]">Every run follows a consistent, traceable verification workflow.</div>
            </div>
            <div className="ml-auto flex gap-[8px] items-center">
              <span className="inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] bg-[#e9f7f2] text-[#287d6e] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
                All systems operational
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-5 p-[6px_5px_16px] md:p-[8px_18px_18px]">
            {/* Step 1 */}
            <div className="text-center min-w-0 relative px-[2px] md:px-[4px] after:content-[''] after:absolute after:top-[17px] md:after:top-[20px] after:left-[calc(50%+17px)] md:after:left-[calc(50%+23px)] after:w-[calc(100%-34px)] md:after:w-[calc(100%-46px)] after:border-t-2 after:border-dashed after:border-[#bcdbd3]">
              <div className="relative z-10 w-[34px] h-[34px] md:w-[42px] md:h-[42px] grid place-items-center mx-auto mb-[8px] md:mb-[10px] border border-[#c7e5de] rounded-[10px] md:rounded-[13px] text-[#267d72] bg-[#f2fbf8]">
                <svg className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none">
                  <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M2.8 19v-1.5a5.2 5.2 0 0 1 10.4 0V19M17 8h5M19.5 5.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-[8px] md:text-[10px] font-[800] text-[#33445b] leading-[1.35]">Register &amp;<br/>validate</div>
              <div className="hidden md:block mt-[5px] text-[9px] leading-[1.4] text-[#7a8799]">Integrity checks</div>
              <div className="inline-flex items-center gap-[4px] mt-[6px] md:mt-[8px] text-[8px] md:text-[9px] font-[800] text-[#267d72]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> Verified
              </div>
            </div>
            {/* Step 2 */}
            <div className="text-center min-w-0 relative px-[2px] md:px-[4px] after:content-[''] after:absolute after:top-[17px] md:after:top-[20px] after:left-[calc(50%+17px)] md:after:left-[calc(50%+23px)] after:w-[calc(100%-34px)] md:after:w-[calc(100%-46px)] after:border-t-2 after:border-dashed after:border-[#bcdbd3]">
              <div className="relative z-10 w-[34px] h-[34px] md:w-[42px] md:h-[42px] grid place-items-center mx-auto mb-[8px] md:mb-[10px] border border-[#c7e5de] rounded-[10px] md:rounded-[13px] text-[#267d72] bg-[#f2fbf8]">
                <svg className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none">
                  <path d="M9 3h6M10 3v6.5L4.8 18a1.8 1.8 0 0 0 1.5 2.7h11.4a1.8 1.8 0 0 0 1.5-2.7L14 9.5V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 16h9" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </div>
              <div className="text-[8px] md:text-[10px] font-[800] text-[#33445b] leading-[1.35]">Check<br/>eligibility</div>
              <div className="hidden md:block mt-[5px] text-[9px] leading-[1.4] text-[#7a8799]">Deterministic rules</div>
              <div className="inline-flex items-center gap-[4px] mt-[6px] md:mt-[8px] text-[8px] md:text-[9px] font-[800] text-[#267d72]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> Verified
              </div>
            </div>
            {/* Step 3 */}
            <div className="text-center min-w-0 relative px-[2px] md:px-[4px] after:content-[''] after:absolute after:top-[17px] md:after:top-[20px] after:left-[calc(50%+17px)] md:after:left-[calc(50%+23px)] after:w-[calc(100%-34px)] md:after:w-[calc(100%-46px)] after:border-t-2 after:border-dashed after:border-[#dce4ed]">
              <div className="relative z-10 w-[34px] h-[34px] md:w-[42px] md:h-[42px] grid place-items-center mx-auto mb-[8px] md:mb-[10px] border border-[#efcad7] rounded-[10px] md:rounded-[13px] text-[#97002f] bg-[#fff0f4] shadow-[0_0_0_4px_#fff5f8]">
                <svg className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5h13M8 12h13M8 19h13M3 5h.01M3 12h.01M3 19h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                  <path d="m2.5 11.5.8.8 1.5-1.7" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="text-[8px] md:text-[10px] font-[800] text-[#33445b] leading-[1.35]">Rank<br/>recipients</div>
              <div className="hidden md:block mt-[5px] text-[9px] leading-[1.4] text-[#7a8799]">Versioned policies</div>
              <div className="inline-flex items-center gap-[4px] mt-[6px] md:mt-[8px] text-[8px] md:text-[9px] font-[800] text-[#97002f]">
                <span className="w-[7px] h-[7px] inline-block rounded-full bg-[#29a18b] shadow-[0_0_0_3px_rgba(41,161,139,.12)]"></span> Ready
              </div>
            </div>
            {/* Step 4 */}
            <div className="text-center min-w-0 relative px-[2px] md:px-[4px] after:content-[''] after:absolute after:top-[17px] md:after:top-[20px] after:left-[calc(50%+17px)] md:after:left-[calc(50%+23px)] after:w-[calc(100%-34px)] md:after:w-[calc(100%-46px)] after:border-t-2 after:border-dashed after:border-[#dce4ed]">
              <div className="relative z-10 w-[34px] h-[34px] md:w-[42px] md:h-[42px] grid place-items-center mx-auto mb-[8px] md:mb-[10px] border border-[#dce5ee] rounded-[10px] md:rounded-[13px] bg-white text-[#7e8ba0]">
                <svg className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none">
                  <path d="M4 5.5h16A1.5 1.5 0 0 1 21.5 7v9a1.5 1.5 0 0 1-1.5 1.5h-7l-4.5 3v-3H4A1.5 1.5 0 0 1 2.5 16V7A1.5 1.5 0 0 1 4 5.5Z" stroke="currentColor" strokeWidth="1.7"/>
                  <path d="M7 10h10M7 13.5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-[8px] md:text-[10px] font-[800] text-[#33445b] leading-[1.35]">Explain<br/>decisions</div>
              <div className="hidden md:block mt-[5px] text-[9px] leading-[1.4] text-[#7a8799]">Human-readable</div>
              <div className="inline-flex items-center gap-[4px] mt-[6px] md:mt-[8px] text-[8px] md:text-[9px] font-[800] text-[#8592a3]">Queued</div>
            </div>
            {/* Step 5 */}
            <div className="text-center min-w-0 relative px-[2px] md:px-[4px]">
              <div className="relative z-10 w-[34px] h-[34px] md:w-[42px] md:h-[42px] grid place-items-center mx-auto mb-[8px] md:mb-[10px] border border-[#dce5ee] rounded-[10px] md:rounded-[13px] bg-white text-[#7e8ba0]">
                <svg className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3.3 19 6v5c0 4.2-2.7 7.3-7 9.1C7.7 18.3 5 15.2 5 11V6l7-2.7Z" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="m8.5 11.5 2.2 2.2 4.8-4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-[8px] md:text-[10px] font-[800] text-[#33445b] leading-[1.35]">Verify<br/>records</div>
              <div className="hidden md:block mt-[5px] text-[9px] leading-[1.4] text-[#7a8799]">Hash-chain audit</div>
              <div className="inline-flex items-center gap-[4px] mt-[6px] md:mt-[8px] text-[8px] md:text-[9px] font-[800] text-[#8592a3]">Queued</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-[12px_19px] border-t border-[#edf0f5] text-[#8190a1] text-[10px]">
            <span>Current policy set: <strong className="text-[#45556b]">Allocation Standard 2026.4</strong></span>
            <button className="inline-flex items-center gap-[5px] border-0 bg-transparent text-[#97002f] font-[750] text-[11px] py-[4px] hover:text-[#760025] cursor-pointer">
              View policy details 
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </article>

        {/* Assurance Card */}
        <article className="min-w-0 border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] pb-[14px]">
          <div className="flex items-start gap-[12px] p-[16px_15px_13px] md:p-[19px_20px_15px]">
            <div>
              <div className="text-[13px] md:text-[14px] font-[800] tracking-[-.25px] text-[#172236]">Verification health</div>
              <div className="mt-[4px] text-[11px] text-[#62728a]">Live checks across the demo environment</div>
            </div>
            <div className="ml-auto flex gap-[8px] items-center">
              <span className="w-[7px] h-[7px] inline-block rounded-full bg-[#29a18b] shadow-[0_0_0_3px_rgba(41,161,139,.12)]" title="healthy"></span>
            </div>
          </div>
          
          <div className="flex items-center gap-[14px] md:gap-[18px] p-[4px_15px_15px] md:p-[5px_20px_18px]">
            <div className="w-[88px] h-[88px] md:w-[105px] md:h-[105px] flex-none relative grid place-items-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle className="fill-none stroke-[#e7eef2] stroke-[8]" cx="50" cy="50" r="44"/>
                <circle className="fill-none stroke-[#299287] stroke-[8] stroke-linecap-round stroke-dasharray-[276.5] stroke-dashoffset-[2.8]" cx="50" cy="50" r="44"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-[21px] md:text-[24px] leading-none font-[850] tracking-[-1px]">100%</div>
                <div className="mt-[5px] text-[#62728a] text-[9px] font-[750] tracking-[.4px] uppercase">Integrity</div>
              </div>
            </div>
            <div className="flex flex-col gap-[9px] md:gap-[11px] flex-1">
              <div className="flex items-center gap-[8px] text-[#4c5d72] text-[9px] md:text-[10px]">
                <span className="w-[16px] h-[16px] grid place-items-center rounded-full bg-[#e5f6f1] text-[#248777] flex-none">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Policy hash verification
                <strong className="ml-auto text-[#2c796e] text-[9px] md:text-[10px]">Pass</strong>
              </div>
              <div className="flex items-center gap-[8px] text-[#4c5d72] text-[9px] md:text-[10px]">
                <span className="w-[16px] h-[16px] grid place-items-center rounded-full bg-[#e5f6f1] text-[#248777] flex-none">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Ledger chain consistency
                <strong className="ml-auto text-[#2c796e] text-[9px] md:text-[10px]">Pass</strong>
              </div>
              <div className="flex items-center gap-[8px] text-[#4c5d72] text-[9px] md:text-[10px]">
                <span className="w-[16px] h-[16px] grid place-items-center rounded-full bg-[#e5f6f1] text-[#248777] flex-none">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                PII separation controls
                <strong className="ml-auto text-[#2c796e] text-[9px] md:text-[10px]">Pass</strong>
              </div>
            </div>
          </div>
          
          <div className="mx-[15px] md:mx-[20px] pt-[12px] flex items-center gap-[8px] border-t border-[#edf0f5] text-[#6f7e91] text-[9px] md:text-[10px]">
            <span className="w-[7px] h-[7px] inline-block rounded-full bg-[#29a18b] shadow-[0_0_0_3px_rgba(41,161,139,.12)] mr-[2px]"></span> 
            Last integrity check 
            <strong className="text-[#40546b] ml-auto">11:18:42 AM</strong>
          </div>
        </article>
      </div>

      {/* Lower Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,1fr)] gap-[12px] md:gap-[17px]">
        {/* Table Card */}
        <article className="min-w-0 border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] overflow-hidden">
          <div className="flex items-start gap-[12px] p-[16px_15px_13px] md:p-[19px_20px_15px]">
            <div>
              <div className="text-[13px] md:text-[14px] font-[800] tracking-[-.25px] text-[#172236]">Priority recipient queue</div>
              <div className="mt-[4px] text-[11px] text-[#62728a]">Pseudonymized candidates awaiting the next clinical review.</div>
            </div>
            <div className="ml-auto flex gap-[8px] items-center">
              <button className="inline-flex items-center gap-[5px] border-0 bg-transparent text-[#97002f] font-[750] text-[11px] py-[4px] hover:text-[#760025] cursor-pointer">
                View all 
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse whitespace-nowrap">
              <thead>
                <tr>
                  <th className="bg-[#fafbfd] text-[#8390a1] font-[800] text-[9px] tracking-[.55px] uppercase text-left p-[10px_12px] md:p-[11px_16px] border-y border-[#edf0f5]">Candidate</th>
                  <th className="bg-[#fafbfd] text-[#8390a1] font-[800] text-[9px] tracking-[.55px] uppercase text-left p-[10px_12px] md:p-[11px_16px] border-y border-[#edf0f5]">Organ / type</th>
                  <th className="bg-[#fafbfd] text-[#8390a1] font-[800] text-[9px] tracking-[.55px] uppercase text-left p-[10px_12px] md:p-[11px_16px] border-y border-[#edf0f5]">Compatibility</th>
                  <th className="bg-[#fafbfd] text-[#8390a1] font-[800] text-[9px] tracking-[.55px] uppercase text-left p-[10px_12px] md:p-[11px_16px] border-y border-[#edf0f5]">Urgency</th>
                  <th className="bg-[#fafbfd] text-[#8390a1] font-[800] text-[9px] tracking-[.55px] uppercase text-left p-[10px_12px] md:p-[11px_16px] border-y border-[#edf0f5]">Status</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c, i) => (
                  <tr key={i} className="hover:bg-[#fcfdff]">
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
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
                          <div className="mt-[2px] text-[#8995a6] text-[9px]">Synthetic ID</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      {c.organ} <span className="text-[#62728a]">· {c.blood}</span>
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
                      <span className={`inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current ${c.urgencyClass}`}>
                        {c.urgency}
                      </span>
                    </td>
                    <td className="p-[12px] md:p-[13px_16px] border-b border-[#eef1f5] text-[#45556b] text-[11px]">
                      <span className={`inline-flex items-center gap-[5px] p-[4px_7px] rounded-[6px] text-[9px] font-[800] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current ${getStatusClass(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center p-[12px_19px] border-t border-[#edf0f5] text-[#8190a1] text-[10px]">
            <span>Showing 4 of 24 eligible demo candidates</span>
            <span>Updated 11:18 AM</span>
          </div>
        </article>

        {/* Activity Card */}
        <article className="min-w-0 border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)]">
          <div className="flex items-start gap-[12px] p-[16px_15px_13px] md:p-[19px_20px_15px]">
            <div>
              <div className="text-[13px] md:text-[14px] font-[800] tracking-[-.25px] text-[#172236]">Recent audit activity</div>
              <div className="mt-[4px] text-[11px] text-[#62728a]">Actions recorded with a verifiable evidence trail.</div>
            </div>
            <div className="ml-auto flex gap-[8px] items-center">
              <button className="inline-flex items-center gap-[5px] border-0 bg-transparent text-[#97002f] font-[750] text-[11px] py-[4px] hover:text-[#760025] cursor-pointer">
                Full ledger 
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-[0_14px_6px] md:p-[0_19px_7px]">
            {activity.map((a, i) => (
              <div key={i} className="relative flex gap-[11px] p-[11px_0_13px] after:content-[''] after:absolute after:left-[13px] after:top-[37px] after:-bottom-[1px] after:w-[1px] after:bg-[#e5ebf1] last:after:hidden">
                <div className={`relative z-10 w-[27px] h-[27px] grid place-items-center flex-none rounded-[9px] ${a.iconClass}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {a.type === 'Verification' ? (
                      <path d="M12 3.3 19 6v5c0 4.2-2.7 7.3-7 9.1C7.7 18.3 5 15.2 5 11V6l7-2.7Z" stroke="currentColor" strokeWidth="1.7"/>
                    ) : a.type === 'Review' ? (
                      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    ) : (
                      <>
                        <path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7"/>
                        <path d="M14 3.8V8h4M8 12h8M8 16h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                      </>
                    )}
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-[#35465c] font-[750] leading-[1.45]">{a.title}</div>
                  <div className="text-[#7b889a] text-[10px] leading-[1.5] mt-[3px]">
                    {a.desc} <span className="inline-block max-w-[130px] overflow-hidden text-ellipsis align-bottom p-[2px_5px] border border-[#e1e8ee] rounded-[5px] bg-[#fafbfd] text-[#596b7e] text-[9px] font-mono">{a.hash}</span>
                  </div>
                </div>
                <div className="hidden md:block text-[#97a2b1] text-[9px] whitespace-nowrap mt-[1px]">{a.time}</div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center p-[12px_19px] border-t border-[#edf0f5] text-[#8190a1] text-[10px]">
            <span>Append-only audit trail</span>
            <span className="flex items-center gap-[5px] text-[#287f7b]">
              <span className="w-[7px] h-[7px] inline-block rounded-full bg-[#29a18b] shadow-[0_0_0_3px_rgba(41,161,139,.12)]"></span> 
              Chain verified
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
