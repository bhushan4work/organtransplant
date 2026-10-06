'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function WorkspaceNavbar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex flex-col w-[248px] xl:w-[248px] lg:w-[224px] max-lg:-translate-x-full lg:translate-x-0 p-[23px_15px_17px] bg-white border-r border-[#e2e8f0] transition-transform duration-200 ease-in-out">
      
      <Link href="/workspace" className="flex items-center gap-[10px] px-[9px] pb-[27px]" aria-label="OrganTrust workspace home">
        <span className="w-[37px] h-[37px] grid place-items-center rounded-[11px] text-white bg-[#97002f] shadow-[0_6px_14px_rgba(151,0,47,.15)]">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2.8 20 6v5.7c0 4.7-3.2 7.9-8 9.5-4.8-1.6-8-4.8-8-9.5V6l8-3.2Z" stroke="currentColor" strokeWidth="1.7"/>
            <path d="M12 7.2v7.4M8.3 10.9h7.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
        <span className="text-[19px] font-[800] tracking-[-0.7px] text-[#172236]">
          Organ<span className="text-[#97002f]">Trust</span>
        </span>
      </Link>
      
      <div className="px-[11px] mb-[9px] uppercase text-[10px] tracking-[1.05px] text-[#8b98aa] font-[800]">
        Workspace
      </div>
      
      <nav className="flex flex-col gap-[4px]">
        <Link href="/workspace" className={`flex items-center gap-[12px] w-full p-[11px_12px] rounded-[11px] text-left font-[650] text-[13px] transition-colors duration-150 cursor-pointer ${pathname === '/workspace' ? 'text-[#97002f] bg-[#fff0f4]' : 'text-[#526178] hover:bg-[#f8f9fc] hover:text-[#172236] bg-transparent group'}`}>
          <svg className={`flex-none ${pathname === '/workspace' ? 'text-[#97002f]' : 'text-[#7b899b] group-hover:text-[#526178]'}`} width="17" height="17" viewBox="0 0 24 24" fill="none">
            <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
            <rect x="13.5" y="3.5" width="7" height="4" rx="1.3" stroke="currentColor" strokeWidth="1.7"/>
            <rect x="13.5" y="10.5" width="7" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
            <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
          </svg> 
          Overview
        </Link>
        
        <Link href="/workspace/runs" className={`flex items-center gap-[12px] w-full p-[11px_12px] rounded-[11px] text-left font-[650] text-[13px] transition-colors duration-150 cursor-pointer ${pathname === '/workspace/runs' ? 'text-[#97002f] bg-[#fff0f4]' : 'text-[#526178] hover:bg-[#f8f9fc] hover:text-[#172236] bg-transparent group'}`}>
          <svg className={`flex-none ${pathname === '/workspace/runs' ? 'text-[#97002f]' : 'text-[#7b899b] group-hover:text-[#526178]'}`} width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18V6A1.5 1.5 0 0 1 5 4.5Z" stroke="currentColor" strokeWidth="1.7"/>
            <path d="M7.5 9h9M7.5 12.5h6M7.5 16h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
          </svg> 
          Matching runs 
          <span className={`ml-auto rounded-[7px] p-[2px_7px] text-[10px] font-[800] ${pathname === '/workspace/runs' ? 'text-[#8e002c] bg-[#ffe0e9]' : 'text-[#8e002c] bg-[#ffe0e9]'}`}>12</span>
        </Link>

        <button className="flex items-center gap-[12px] w-full p-[11px_12px] rounded-[11px] text-[#526178] hover:bg-[#f8f9fc] hover:text-[#172236] bg-transparent text-left font-[650] text-[13px] transition-colors duration-150 group cursor-pointer">
          <svg className="flex-none text-[#7b899b] group-hover:text-[#526178]" width="17" height="17" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.7"/>
            <path d="M2.8 20v-1.5a6.2 6.2 0 0 1 12.4 0V20M17 8h5M19.5 5.5v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
          </svg> 
          Recipient queue 
          <span className="ml-auto rounded-[7px] p-[2px_7px] text-[#8e002c] bg-[#ffe0e9] text-[10px] font-[800]">24</span>
        </button>

        <button className="flex items-center gap-[12px] w-full p-[11px_12px] rounded-[11px] text-[#526178] hover:bg-[#f8f9fc] hover:text-[#172236] bg-transparent text-left font-[650] text-[13px] transition-colors duration-150 group cursor-pointer">
          <svg className="flex-none text-[#7b899b] group-hover:text-[#526178]" width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M12 3.3 19 6v5c0 4.2-2.7 7.3-7 9.1C7.7 18.3 5 15.2 5 11V6l7-2.7Z" stroke="currentColor" strokeWidth="1.7"/>
            <path d="m8.8 11.5 2.1 2.1 4.5-4.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg> 
          Policy rules
        </button>

        <button className="flex items-center gap-[12px] w-full p-[11px_12px] rounded-[11px] text-[#526178] hover:bg-[#f8f9fc] hover:text-[#172236] bg-transparent text-left font-[650] text-[13px] transition-colors duration-150 group cursor-pointer">
          <svg className="flex-none text-[#7b899b] group-hover:text-[#526178]" width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M8 4.5H5.5A1.5 1.5 0 0 0 4 6v13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19V6a1.5 1.5 0 0 0-1.5-1.5H16" stroke="currentColor" strokeWidth="1.7"/>
            <rect x="8" y="2.8" width="8" height="4" rx="1.2" stroke="currentColor" strokeWidth="1.7"/>
            <path d="m7.5 12 2 2 3.5-3.7M7.5 17h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
          </svg> 
          Audit ledger
        </button>
      </nav>
      
      <div className="px-[11px] mt-[24px] mb-[9px] uppercase text-[10px] tracking-[1.05px] text-[#8b98aa] font-[800]">
        Administration
      </div>
      
      <nav className="flex flex-col gap-[4px]">
        <button className="flex items-center gap-[12px] w-full p-[11px_12px] rounded-[11px] text-[#526178] hover:bg-[#f8f9fc] hover:text-[#172236] bg-transparent text-left font-[650] text-[13px] transition-colors duration-150 group cursor-pointer">
          <svg className="flex-none text-[#7b899b] group-hover:text-[#526178]" width="17" height="17" viewBox="0 0 24 24" fill="none">
            <rect x="3.5" y="4" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
            <rect x="14" y="13.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
            <path d="M10 7.3h2.5a2 2 0 0 1 2 2v4.2M7 10.5v4a2 2 0 0 0 2 2h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
          </svg> 
          Integrations
        </button>
        
        <button className="flex items-center gap-[12px] w-full p-[11px_12px] rounded-[11px] text-[#526178] hover:bg-[#f8f9fc] hover:text-[#172236] bg-transparent text-left font-[650] text-[13px] transition-colors duration-150 group cursor-pointer">
          <svg className="flex-none text-[#7b899b] group-hover:text-[#526178]" width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" stroke="currentColor" strokeWidth="1.7"/>
            <path d="m19.4 13.9 1.1.8-1.7 3-1.3-.5a7.8 7.8 0 0 1-1.6.9l-.2 1.4h-3.4l-.2-1.4a7.8 7.8 0 0 1-1.6-.9l-1.3.5-1.7-3 1.1-.8a7 7 0 0 1 0-1.8l-1.1-.8 1.7-3 1.3.5a7.8 7.8 0 0 1 1.6-.9l.2-1.4h3.4l.2 1.4a7.8 7.8 0 0 1 1.6.9l1.3-.5 1.7 3-1.1.8a7 7 0 0 1 0 1.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" transform="translate(-1.6 -1.5)"/>
          </svg> 
          Settings
        </button>
      </nav>

      <div className="flex-1"></div>

      <div className="m-[14px_4px_17px] p-[14px_13px] border border-[#dfeae9] rounded-[13px] bg-[#f8fcfb]">
        <div className="flex items-center gap-[7px] text-[12px] font-[750] text-[#1f6764]">
          <span className="w-[7px] h-[7px] inline-block rounded-full bg-[#29a18b] shadow-[0_0_0_3px_rgba(41,161,139,.12)]"></span> 
          Verification services healthy
        </div>
        <p className="m-[7px_0_9px] text-[#627b7b] text-[11px] leading-[1.55]">
          Policy engine, audit ledger, and privacy controls are operating normally.
        </p>
        <button className="inline-flex items-center gap-[5px] border-0 bg-transparent text-[#97002f] font-[750] text-[11px] p-[4px_0] hover:text-[#760025] cursor-pointer">
          View system checks 
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-[10px] p-[14px_7px_0] border-t border-[#e2e8f0]">
        <div className="w-[34px] h-[34px] flex-none grid place-items-center rounded-full bg-[#f6dce5] text-[#8d163c] text-[11px] font-[800]">
          SC
        </div>
        <div>
          <div className="font-[750] text-[12px] text-[#172236]">Dr. Sarah Chen</div>
          <div className="text-[#62728a] text-[10px] mt-[1px]">Clinical coordinator</div>
        </div>
        <div className="ml-auto text-[#8b98aa]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.5"/>
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="19" cy="12" r="1.5"/>
          </svg>
        </div>
      </div>

    </aside>
  );
}
