import React from 'react';

export function TrustChain() {
  return (
    <section className="py-[60px] md:py-[75px] lg:py-[99px] xl:py-[112px] pb-[60px] md:pb-[80px] lg:pb-[105px] xl:pb-[110px] bg-white text-center" id="how-it-works">
      <div className="w-full max-w-[1380px] xl:max-w-[1648px] mx-auto px-4 sm:px-5 md:px-8 xl:px-8">
        
        <h2 className="text-[30px] md:text-[clamp(31px,2.8vw,42px)] tracking-[-1px] md:tracking-[-1.45px] leading-[1.2] m-0 font-[760]">
          A Five-Step Trust Chain
        </h2>
        
        <p className="max-w-[900px] mx-auto mt-[23px] md:mt-[31px] text-[#53627a] text-[16px] md:text-[18px] lg:text-[clamp(17px,1.58vw,24px)] leading-[1.68]">
          We don&apos;t replace existing clinical systems. We act as a verifiable validation layer that ensures every match is fair, legal, and explainable.
        </p>
        
        <div className="relative grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-[34px_14px] md:gap-[43px_22px] lg:gap-[18px] xl:gap-[30px] mt-[59px] lg:mt-[106px] xl:mt-[112px] 
          before:content-[''] before:hidden lg:before:block before:absolute before:left-[3.3%] before:right-[3.3%] before:top-[34px] before:border-t-[3px] before:border-dashed before:border-[#e0e8f1]">
          
          {/* Step 1 */}
          <article className="relative z-10 flex flex-col items-center">
            <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] border-[1.5px] border-[#dfe6ef] rounded-[18px] md:rounded-[22px] bg-white grid place-items-center text-[#8b0028]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[27px] h-[27px] md:w-[32px] md:h-[32px] stroke-[2.2]">
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="10" cy="7" r="4" />
                <path d="M19 8v6M16 11h6" />
              </svg>
            </div>
            <h3 className="mt-[17px] md:mt-[20px] lg:mt-[35px] mb-[9px] md:mb-[15px] text-[16px] md:text-[18px] lg:text-[17px] xl:text-[20px] leading-[1.25] tracking-[-0.45px] font-[750]">
              Register &amp; Validate
            </h3>
            <p className="m-0 max-w-[270px] lg:max-w-[250px] text-[#6b7c97] text-[13px] md:text-[15px] lg:text-[14px] xl:text-[16px] leading-[1.65]">
              Securely ingest donor and recipient data with automated integrity checks.
            </p>
          </article>
          
          {/* Step 2 */}
          <article className="relative z-10 flex flex-col items-center">
            <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] border-[1.5px] border-[#dfe6ef] rounded-[18px] md:rounded-[22px] bg-white grid place-items-center text-[#8b0028]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[27px] h-[27px] md:w-[32px] md:h-[32px] stroke-[2.2]">
                <path d="M9 3h6M10 3v6l-5.7 9.1A1.9 1.9 0 0 0 5.9 21h12.2a1.9 1.9 0 0 0 1.6-2.9L14 9V3M8 15h8M9.5 12h5" />
              </svg>
            </div>
            <h3 className="mt-[17px] md:mt-[20px] lg:mt-[35px] mb-[9px] md:mb-[15px] text-[16px] md:text-[18px] lg:text-[17px] xl:text-[20px] leading-[1.25] tracking-[-0.45px] font-[750]">
              Check Eligibility
            </h3>
            <p className="m-0 max-w-[270px] lg:max-w-[250px] text-[#6b7c97] text-[13px] md:text-[15px] lg:text-[14px] xl:text-[16px] leading-[1.65]">
              Apply deterministic biological rules to filter candidates by compatibility.
            </p>
          </article>
          
          {/* Step 3 */}
          <article className="relative z-10 flex flex-col items-center">
            <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] border-[1.5px] border-[#dfe6ef] rounded-[18px] md:rounded-[22px] bg-white grid place-items-center text-[#8b0028]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[27px] h-[27px] md:w-[32px] md:h-[32px] stroke-[2.2]">
                <path d="M9 6h11M9 12h11M9 18h11" />
                <path d="M4 5h1v3M3 8h3M4 11l2 1.5L4 15M3 17h3l-3 3h3" />
              </svg>
            </div>
            <h3 className="mt-[17px] md:mt-[20px] lg:mt-[35px] mb-[9px] md:mb-[15px] text-[16px] md:text-[18px] lg:text-[17px] xl:text-[20px] leading-[1.25] tracking-[-0.45px] font-[750]">
              Rank Recipients
            </h3>
            <p className="m-0 max-w-[270px] lg:max-w-[250px] text-[#6b7c97] text-[13px] md:text-[15px] lg:text-[14px] xl:text-[16px] leading-[1.65]">
              Prioritize the pool using public, versioned allocation policies.
            </p>
          </article>
          
          {/* Step 4 */}
          <article className="relative z-10 flex flex-col items-center">
            <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] border-[1.5px] border-[#dfe6ef] rounded-[18px] md:rounded-[22px] bg-white grid place-items-center text-[#8b0028]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[27px] h-[27px] md:w-[32px] md:h-[32px] stroke-[2.2]">
                <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5l-3 3-3-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="3" />
              </svg>
            </div>
            <h3 className="mt-[17px] md:mt-[20px] lg:mt-[35px] mb-[9px] md:mb-[15px] text-[16px] md:text-[18px] lg:text-[17px] xl:text-[20px] leading-[1.25] tracking-[-0.45px] font-[750]">
              Explain Decisions
            </h3>
            <p className="m-0 max-w-[270px] lg:max-w-[250px] text-[#6b7c97] text-[13px] md:text-[15px] lg:text-[14px] xl:text-[16px] leading-[1.65]">
              Generate natural language justifications for every candidate&apos;s rank.
            </p>
          </article>
          
          {/* Step 5 */}
          <article className="relative z-10 flex flex-col items-center col-span-2 lg:col-span-1">
            <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] border-[1.5px] border-[#dfe6ef] rounded-[18px] md:rounded-[22px] bg-white grid place-items-center text-[#8b0028]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[27px] h-[27px] md:w-[32px] md:h-[32px] stroke-[2.2]">
                <path d="M12 2.5 20 6v5.1c0 4.8-3.3 8.2-8 10.4-4.7-2.2-8-5.6-8-10.4V6l8-3.5Z" />
                <path d="m8.5 12 2.3 2.3 4.8-5" />
              </svg>
            </div>
            <h3 className="mt-[17px] md:mt-[20px] lg:mt-[35px] mb-[9px] md:mb-[15px] text-[16px] md:text-[18px] lg:text-[17px] xl:text-[20px] leading-[1.25] tracking-[-0.45px] font-[750]">
              Verify Records
            </h3>
            <p className="m-0 max-w-[270px] lg:max-w-[250px] text-[#6b7c97] text-[13px] md:text-[15px] lg:text-[14px] xl:text-[16px] leading-[1.65]">
              Store hash-chained logs in a tamper-evident audit ledger.
            </p>
          </article>
          
        </div>
      </div>
    </section>
  );
}
