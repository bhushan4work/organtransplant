import React from 'react';
import Link from 'next/link';

export function Capabilities() {
  return (
    <section className="bg-[#f6f9fc] py-[68px] md:py-[82px] pb-[76px] md:pb-[100px]" id="features">
      <div className="w-full max-w-[1380px] xl:max-w-[1648px] mx-auto px-4 sm:px-5 md:px-8 xl:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[18px] md:gap-[28px] mb-[39px] md:mb-[66px] items-start">
          <div>
            <p className="uppercase tracking-[1.15px] text-[#8b0028] text-[13px] font-[800] m-0 mb-[17px]">
              Core capabilities
            </p>
            <h2 className="text-[30px] sm:text-[clamp(32px,2.9vw,41px)] tracking-[-1px] md:tracking-[-1.45px] leading-[1.2] m-0 font-[760] max-w-[830px]">
              Engineered for Radical Transparency
            </h2>
          </div>
          <Link href="#security" className="inline-flex items-center gap-[11px] font-[730] text-[15px] whitespace-nowrap mb-[5px] text-[#4e5d74] hover:text-[#8b0028] transition-colors duration-180">
            Explore all features 
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[17px] md:gap-[34px_32px]">
          
          <article className="bg-white border border-[#dce5ef] rounded-[18px] min-h-[auto] sm:min-h-[275px] lg:min-h-[306px] xl:min-h-[315px] p-[25px] sm:p-[25px_22px] lg:p-[29px_26px] xl:p-[35px_35px_31px] shadow-[0_12px_30px_rgba(19,33,56,0.055)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#c7d5e5] hover:shadow-[0_16px_34px_rgba(19,33,56,0.08)]">
            <div className="w-[53px] h-[53px] grid place-items-center bg-[#f5f8fb] rounded-[15px] text-[#303a3e] mb-[21px] lg:mb-[28px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[26px] h-[26px] stroke-[2.15]">
                <path d="m8 7-4 5 4 5M16 7l4 5-4 5M14 4l-4 16" />
                <path d="M14 4h6v6" />
              </svg>
            </div>
            <h3 className="text-[18px] lg:text-[19px] xl:text-[21px] tracking-[-0.45px] leading-[1.3] m-0 mb-[18px] font-[760]">
              Deterministic Logic
            </h3>
            <p className="text-[14px] lg:text-[15px] xl:text-[16px] leading-[1.6] lg:leading-[1.65] color-[#4f6079] m-0 max-w-none sm:max-w-[390px]">
              Zero AI/ML black boxes. We use purely mathematical, versioned rulesets that yield the exact same result every single time.
            </p>
          </article>
          
          <article className="bg-white border border-[#dce5ef] rounded-[18px] min-h-[auto] sm:min-h-[275px] lg:min-h-[306px] xl:min-h-[315px] p-[25px] sm:p-[25px_22px] lg:p-[29px_26px] xl:p-[35px_35px_31px] shadow-[0_12px_30px_rgba(19,33,56,0.055)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#c7d5e5] hover:shadow-[0_16px_34px_rgba(19,33,56,0.08)]">
            <div className="w-[53px] h-[53px] grid place-items-center bg-[#f5f8fb] rounded-[15px] text-[#303a3e] mb-[21px] lg:mb-[28px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[26px] h-[26px] stroke-[2.15]">
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="text-[18px] lg:text-[19px] xl:text-[21px] tracking-[-0.45px] leading-[1.3] m-0 mb-[18px] font-[760]">
              Human Explainability
            </h3>
            <p className="text-[14px] lg:text-[15px] xl:text-[16px] leading-[1.6] lg:leading-[1.65] color-[#4f6079] m-0 max-w-none sm:max-w-[390px]">
              Every allocation decision comes with a clinical justification, explaining exactly why Candidate A ranked higher than Candidate B.
            </p>
          </article>

          <article className="bg-white border border-[#dce5ef] rounded-[18px] min-h-[auto] sm:min-h-[275px] lg:min-h-[306px] xl:min-h-[315px] p-[25px] sm:p-[25px_22px] lg:p-[29px_26px] xl:p-[35px_35px_31px] shadow-[0_12px_30px_rgba(19,33,56,0.055)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#c7d5e5] hover:shadow-[0_16px_34px_rgba(19,33,56,0.08)]">
            <div className="w-[53px] h-[53px] grid place-items-center bg-[#f5f8fb] rounded-[15px] text-[#303a3e] mb-[21px] lg:mb-[28px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[26px] h-[26px] stroke-[2.15]">
                <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                <path d="M8 12c0-2 1-4 4-4s4 2 4 4v3M10 15v-3a2 2 0 1 1 4 0v5M6 13c0-4 2-7 6-7s6 3 6 7" />
              </svg>
            </div>
            <h3 className="text-[18px] lg:text-[19px] xl:text-[21px] tracking-[-0.45px] leading-[1.3] m-0 mb-[18px] font-[760]">
              Pseudonymous Identity
            </h3>
            <p className="text-[14px] lg:text-[15px] xl:text-[16px] leading-[1.6] lg:leading-[1.65] color-[#4f6079] m-0 max-w-none sm:max-w-[390px]">
              Patient PII never enters the matching engine. We operate on secure cryptographic identifiers to preserve complete privacy.
            </p>
          </article>

          <article className="bg-white border border-[#dce5ef] rounded-[18px] min-h-[auto] sm:min-h-[275px] lg:min-h-[306px] xl:min-h-[315px] p-[25px] sm:p-[25px_22px] lg:p-[29px_26px] xl:p-[35px_35px_31px] shadow-[0_12px_30px_rgba(19,33,56,0.055)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#c7d5e5] hover:shadow-[0_16px_34px_rgba(19,33,56,0.08)]">
            <div className="w-[53px] h-[53px] grid place-items-center bg-[#f5f8fb] rounded-[15px] text-[#303a3e] mb-[21px] lg:mb-[28px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[26px] h-[26px] stroke-[2.15]">
                <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
              </svg>
            </div>
            <h3 className="text-[18px] lg:text-[19px] xl:text-[21px] tracking-[-0.45px] leading-[1.3] m-0 mb-[18px] font-[760]">
              Tamper-Evident Ledger
            </h3>
            <p className="text-[14px] lg:text-[15px] xl:text-[16px] leading-[1.6] lg:leading-[1.65] color-[#4f6079] m-0 max-w-none sm:max-w-[390px]">
              Matching results and policy versions are hash-chained in an immutable ledger, preventing retroactive alteration of data.
            </p>
          </article>

          <article className="bg-white border border-[#dce5ef] rounded-[18px] min-h-[auto] sm:min-h-[275px] lg:min-h-[306px] xl:min-h-[315px] p-[25px] sm:p-[25px_22px] lg:p-[29px_26px] xl:p-[35px_35px_31px] shadow-[0_12px_30px_rgba(19,33,56,0.055)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#c7d5e5] hover:shadow-[0_16px_34px_rgba(19,33,56,0.08)]">
            <div className="w-[53px] h-[53px] grid place-items-center bg-[#f5f8fb] rounded-[15px] text-[#303a3e] mb-[21px] lg:mb-[28px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[26px] h-[26px] stroke-[2.15]">
                <circle cx="6" cy="6" r="2" />
                <circle cx="18" cy="6" r="2" />
                <circle cx="6" cy="18" r="2" />
                <path d="M8 6h5a3 3 0 0 1 3 3v0M6 8v8M8 18h5a3 3 0 0 0 3-3v-3" />
                <path d="M16 12h3" />
              </svg>
            </div>
            <h3 className="text-[18px] lg:text-[19px] xl:text-[21px] tracking-[-0.45px] leading-[1.3] m-0 mb-[18px] font-[760]">
              Policy Versioning
            </h3>
            <p className="text-[14px] lg:text-[15px] xl:text-[16px] leading-[1.6] lg:leading-[1.65] color-[#4f6079] m-0 max-w-none sm:max-w-[390px]">
              Track every change to allocation criteria. Rerun historical matches against old policies to verify consistency.
            </p>
          </article>

          <article id="security" className="bg-white border border-[#dce5ef] rounded-[18px] min-h-[auto] sm:min-h-[275px] lg:min-h-[306px] xl:min-h-[315px] p-[25px] sm:p-[25px_22px] lg:p-[29px_26px] xl:p-[35px_35px_31px] shadow-[0_12px_30px_rgba(19,33,56,0.055)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#c7d5e5] hover:shadow-[0_16px_34px_rgba(19,33,56,0.08)]">
            <div className="w-[53px] h-[53px] grid place-items-center bg-[#f5f8fb] rounded-[15px] text-[#303a3e] mb-[21px] lg:mb-[28px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[26px] h-[26px] stroke-[2.15]">
                <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                <path d="m8.5 12 2.3 2.3 4.8-5" />
              </svg>
            </div>
            <h3 className="text-[18px] lg:text-[19px] xl:text-[21px] tracking-[-0.45px] leading-[1.3] m-0 mb-[18px] font-[760]">
              Independent Verification
            </h3>
            <p className="text-[14px] lg:text-[15px] xl:text-[16px] leading-[1.6] lg:leading-[1.65] color-[#4f6079] m-0 max-w-none sm:max-w-[390px]">
              Third-party auditors can cryptographically witness matching runs without ever seeing sensitive patient data.
            </p>
          </article>

        </div>
      </div>
    </section>
  );
}
