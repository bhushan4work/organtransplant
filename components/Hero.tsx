import React from 'react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="bg-[#f8f7f7] min-h-[auto] md:min-h-[700px] lg:min-h-[792px] xl:min-h-[880px] flex items-center overflow-hidden" id="home">
      <div className="w-full max-w-[1380px] xl:max-w-[1648px] mx-auto px-4 sm:px-5 md:px-8 xl:px-8 grid grid-cols-1 md:grid-cols-[minmax(0,.97fr)_minmax(0,1.03fr)] gap-[52px] md:gap-[32px] lg:gap-[clamp(35px,5vw,80px)] xl:gap-[90px] items-center pt-[56px] sm:pt-[74px] md:pt-[4px] pb-[62px] sm:pb-[78px] md:pb-[20px]">
        
        {/* Left Copy */}
        <div className="max-w-[690px] md:max-w-[650px] pt-0 md:pt-[11px]">
          <div className="inline-flex items-center gap-[10px] bg-[#e9f3f2] border border-[#bfdfdc] text-[#397f7e] rounded-[30px] py-[7px] px-[10px] sm:px-[15px] uppercase text-[10px] sm:text-[13px] leading-none tracking-[0.3px] font-[770]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[15px] h-[15px]">
              <circle cx="12" cy="12" r="9" />
              <path d="m8 12 2.5 2.5L16 9" />
            </svg>
            Verifiable matching platform
          </div>
          
          <h1 className="mt-[28px] md:mt-[31px] mb-[27px] text-[clamp(42px,11.5vw,55px)] sm:text-[clamp(49px,8.4vw,72px)] md:text-[clamp(45px,5vw,62px)] lg:text-[clamp(48px,5.05vw,75px)] leading-[1.02] sm:leading-[0.99] tracking-[-2.6px] sm:tracking-[-2.8px] md:tracking-[-3.6px] font-[790]">
            Trust the Match.
            <span className="block sm:whitespace-normal md:whitespace-nowrap text-[#8b0028]">Verify the Math.</span>
          </h1>
          
          <p className="m-0 text-[#4c5d76] text-[17px] sm:text-[19px] md:text-[clamp(19px,1.62vw,24px)] leading-[1.58] sm:leading-[1.64] max-w-[610px] md:max-w-[635px] xl:max-w-[670px] tracking-[-0.2px]">
            An explainable, privacy-first organ transplant matching layer. We bring cryptographic certainty and policy transparency to the world&apos;s most critical allocation decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center flex-wrap gap-[13px] sm:gap-[19px] mt-[30px] sm:mt-[33px] md:mt-[48px]">
            <Link href="#get-started" className="min-h-[57px] sm:min-h-[61px] md:min-h-[77px] w-full sm:w-auto inline-flex items-center justify-center gap-[11px] px-[23px] md:px-[37px] rounded-[13px] md:rounded-[15px] bg-[#8b0028] text-white text-[16px] md:text-[18px] font-[690] shadow-[0_8px_17px_rgba(72,0,24,0.12)] hover:-translate-y-[2px] hover:bg-[#760020] hover:shadow-[0_11px_22px_rgba(72,0,24,0.19)] transition-all duration-180">
              Start Integration 
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <button type="button" className="min-h-[57px] sm:min-h-[61px] md:min-h-[77px] w-full sm:w-auto sm:min-w-[215px] md:min-w-[255px] inline-flex items-center justify-center gap-[11px] px-[23px] md:px-[37px] rounded-[13px] md:rounded-[15px] bg-white text-[#111a2e] border border-[#dfe7f0] text-[16px] md:text-[18px] font-[690] shadow-[0_1px_2px_rgba(13,27,48,0.025)] hover:-translate-y-[2px] hover:border-[#b8c5d5] transition-all duration-180 cursor-pointer">
              View Live Demo 
              <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2.3">
                <circle cx="12" cy="12" r="9.5" />
                <path d="m10 8 6 4-6 4V8Z" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </div>
          
          <div className="mt-[30px] sm:mt-[38px] md:mt-[63px] flex flex-wrap items-center gap-[17px] sm:gap-x-[27px] sm:gap-y-[19px] md:gap-x-[18px] lg:gap-[clamp(24px,3vw,45px)] text-[#858585] text-[11px] sm:text-[13px] md:text-[12px] lg:text-[15px] font-[730]" aria-label="Platform principles">
            <span className="inline-flex items-center gap-[6px] lg:gap-[9px] whitespace-nowrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px] sm:w-[23px] sm:h-[23px] lg:w-[27px] lg:h-[27px] text-[#858585] stroke-[1.7]">
                <path d="M3 21h18M5 21V8h9v13M14 12h5v9M8 11h3M8 14h3M8 17h3M17 15v3M15.5 16.5h3" />
                <path d="M8 8V4h3v4" />
              </svg> 
              HEALTHNET
            </span>
            <span className="inline-flex items-center gap-[6px] lg:gap-[9px] whitespace-nowrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px] sm:w-[23px] sm:h-[23px] lg:w-[27px] lg:h-[27px] text-[#858585] stroke-[1.7]">
                <path d="m12 2 9 5-9 5-9-5 9-5Z" />
                <path d="m3 7 9 5 9-5M3 7v10l9 5 9-5V7M12 12v10" />
              </svg> 
              BLOCKCHAIN OPS
            </span>
            <span className="inline-flex items-center gap-[6px] lg:gap-[9px] whitespace-nowrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px] sm:w-[23px] sm:h-[23px] lg:w-[27px] lg:h-[27px] text-[#858585] stroke-[1.7]">
                <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                <path d="m9 12 2 2 4-4" />
              </svg> 
              SECUREID
            </span>
          </div>
        </div>
        
        {/* Right Dashboard Illustration */}
        <div className="relative min-w-0 w-full max-w-[620px] md:max-w-none mx-auto md:mx-0 pt-[25px] pb-0 translate-y-[1px]" aria-label="Illustration of the OrganTrust matching dashboard">
          <div className="relative border border-[#d8e2ef] rounded-[17px] sm:rounded-[22px] bg-white shadow-[0_14px_30px_rgba(25,42,68,0.04)] p-[7px] sm:p-[11px] rotate-2">
            <div className="border border-[#e8edf4] rounded-[12px] sm:rounded-[16px] overflow-hidden bg-[#f7fafd] min-h-[270px] sm:min-h-[355px] md:min-h-[425px] xl:min-h-[490px]">
              <div className="h-[31px] sm:h-[40px] flex items-center gap-[8px] bg-white border-b border-[#dfe7f0] px-[12px] sm:px-[19px]">
                <span className="w-[8px] h-[8px] sm:w-[12px] sm:h-[12px] rounded-full bg-[#fee2e2]"></span>
                <span className="w-[8px] h-[8px] sm:w-[12px] sm:h-[12px] rounded-full bg-[#fdf0ca]"></span>
                <span className="w-[8px] h-[8px] sm:w-[12px] sm:h-[12px] rounded-full bg-[#d8f5e8]"></span>
              </div>
              <div className="p-[17px_12px] sm:p-[22px_19px] md:p-[28px_29px_24px] xl:pt-[34px]">
                <div className="h-[14px] sm:h-[21px] rounded-[5px] bg-[#e1e8f0] w-[105px] sm:w-[155px] mb-[11px]"></div>
                <div className="flex justify-between items-center gap-[20px] mb-[19px] sm:mb-[31px]">
                  <div className="w-[150px] sm:w-[236px] h-[27px] sm:h-[39px] bg-[#10192d] rounded-[5px]"></div>
                  <div className="w-[75px] sm:w-[117px] h-[34px] sm:h-[48px] rounded-[10px] bg-[#8b0028]"></div>
                </div>
                
                <div className="h-[55px] sm:h-[79px] xl:h-[86px] border border-[#edf1f6] bg-white rounded-[11px] sm:rounded-[16px] flex items-center gap-[10px] sm:gap-[19px] px-[10px] sm:px-[20px] mt-[10px] sm:mt-[17px]">
                  <div className="w-[32px] h-[32px] sm:w-[49px] sm:h-[49px] rounded-full bg-[#f0f4f8] shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-[10px] sm:h-[15px] rounded-[5px] bg-[#e1e8f0] w-[80px] sm:w-[118px] mb-[6px] sm:mb-[10px]"></div>
                    <div className="h-[8px] sm:h-[11px] rounded-[5px] bg-[#f0f4f8] w-[54px] sm:w-[80px] mb-0"></div>
                  </div>
                  <span className="p-[6px] sm:p-[8px_11px] text-[8px] sm:text-[11px] font-[790] text-[#35474a] bg-[#e4f2f0] rounded-[5px] whitespace-nowrap">MATCHED</span>
                </div>
                
                <div className="h-[55px] sm:h-[79px] xl:h-[86px] border border-[#edf1f6] bg-white rounded-[11px] sm:rounded-[16px] flex items-center gap-[10px] sm:gap-[19px] px-[10px] sm:px-[20px] mt-[10px] sm:mt-[17px]">
                  <div className="w-[32px] h-[32px] sm:w-[49px] sm:h-[49px] rounded-full bg-[#f0f4f8] shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-[10px] sm:h-[15px] rounded-[5px] bg-[#e1e8f0] w-[95px] sm:w-[146px] mb-[6px] sm:mb-[10px]"></div>
                    <div className="h-[8px] sm:h-[11px] rounded-[5px] bg-[#f0f4f8] w-[65px] sm:w-[95px] mb-0"></div>
                  </div>
                  <span className="bg-[#f0f4f8] text-[#e0e7ef] w-[45px] sm:w-[78px] h-[21px] sm:h-[29px] rounded-[5px] p-[6px] sm:p-[8px_11px] text-[8px] sm:text-[11px] font-[790] whitespace-nowrap"></span>
                </div>
                
                <div className="h-[55px] sm:h-[79px] xl:h-[86px] border border-[#edf1f6] bg-white rounded-[11px] sm:rounded-[16px] flex items-center gap-[10px] sm:gap-[19px] px-[10px] sm:px-[20px] mt-[10px] sm:mt-[17px]">
                  <div className="w-[32px] h-[32px] sm:w-[49px] sm:h-[49px] rounded-full bg-[#f0f4f8] shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-[10px] sm:h-[15px] rounded-[5px] bg-[#e1e8f0] w-[85px] sm:w-[128px] mb-[6px] sm:mb-[10px]"></div>
                    <div className="h-[8px] sm:h-[11px] rounded-[5px] bg-[#f0f4f8] w-[48px] sm:w-[72px] mb-0"></div>
                  </div>
                  <span className="bg-[#f0f4f8] text-[#e0e7ef] w-[45px] sm:w-[78px] h-[21px] sm:h-[29px] rounded-[5px] p-[6px] sm:p-[8px_11px] text-[8px] sm:text-[11px] font-[790] whitespace-nowrap"></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute left-[-9px] sm:left-[-20px] bottom-[-9px] sm:bottom-[7px] w-[181px] sm:w-[229px] p-[17px_16px_10px] sm:p-[28px_24px_15px] border border-[#dce5ef] rounded-[0_19px_0_19px] bg-white/98 shadow-[0_12px_23px_rgba(17,31,52,0.04)] -rotate-2 backdrop-blur-sm z-10">
            <div className="text-[#8a9bb5] text-[10px] sm:text-[13px] font-[760] uppercase whitespace-nowrap">Audit score</div>
            <div className="text-[27px] sm:text-[35px] tracking-[-1.2px] leading-[1.2] font-[780] m-[5px_0_10px] sm:m-[5px_0_17px]">100%</div>
            <div className="h-[5px] rounded-[5px] bg-[#edf2f7] overflow-hidden">
              <span className="block h-full w-full bg-[#e5edf6]"></span>
            </div>
            <div className="text-[#6c7e98] mt-[12px] text-[9px] sm:text-[11px] font-[650] whitespace-nowrap">All runs cryptographically verified</div>
          </div>
        </div>
      </div>
    </section>
  );
}
