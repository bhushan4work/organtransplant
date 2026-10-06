import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#f6f9fc] pt-[62px] md:pt-[79px] pb-[35px]" id="partner-access">
      <div className="w-full max-w-[1380px] xl:max-w-[1648px] mx-auto px-4 sm:px-5 md:px-8 xl:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-[1.14fr_1fr_1fr_.9fr] gap-[35px_19px] sm:gap-[47px_35px] lg:gap-[35px] xl:gap-[65px] pb-[55px] md:pb-[95px]">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="#home" className="inline-flex items-center gap-[8px] md:gap-[11px] text-[23px] sm:text-[23px] md:text-[26px] font-[760] tracking-[-0.9px] whitespace-nowrap">
              <span className="w-[39px] h-[39px] md:w-[49px] md:h-[49px] rounded-[9px] md:rounded-[11px] bg-[#8b0028] flex items-center justify-center text-white shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px] md:w-[25px] md:h-[25px]">
                  <path d="M12 2.5 21 5v6.4c0 5.1-3.7 8.7-9 10.7-5.3-2-9-5.6-9-10.7V5l9-2.5Z" fill="currentColor" />
                  <path d="M12 7.3v8.1M7.95 11.35h8.1" stroke="#8b0028" strokeWidth="2.15" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-[#111a2e]">Organ<span className="text-[#8b0028]">Trust</span></span>
            </Link>
            
            <p className="max-w-[440px] md:max-w-[305px] text-[#6e7f99] text-[15px] md:text-[17px] leading-[1.6] m-[20px_0_25px] md:m-[34px_0_39px]">
              Leading the transition to verifiable, explainable healthcare operations.
            </p>
            
            <div className="flex items-center gap-[23px] text-[#93a3bb]">
              <Link href="#contact" aria-label="Twitter" className="grid place-items-center w-[25px] h-[25px] hover:text-[#8b0028] transition-colors duration-150">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[24px] h-[24px] stroke-[2]">
                  <path d="M22 5.9a8 8 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.3 8.3 0 0 1-2.7 1 4.2 4.2 0 0 0-7.2 3.8 11.9 11.9 0 0 1-8.6-4.4 4.2 4.2 0 0 0 1.3 5.6 4.1 4.1 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2.5 18.4a11.8 11.8 0 0 0 18.2-10 8.5 8.5 0 0 0 1.3-2.5Z" />
                </svg>
              </Link>
              <Link href="#contact" aria-label="LinkedIn" className="grid place-items-center w-[25px] h-[25px] hover:text-[#8b0028] transition-colors duration-150">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[24px] h-[24px] stroke-[2]">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M8 10v7M8 7.2h.01M12 17v-7h3v1.2a2.5 2.5 0 0 1 5 0V17" />
                </svg>
              </Link>
              <Link href="#contact" aria-label="GitHub" className="grid place-items-center w-[25px] h-[25px] hover:text-[#8b0028] transition-colors duration-150">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[24px] h-[24px] stroke-[2]">
                  <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.4a5.8 5.8 0 0 0-1.5-4 5.4 5.4 0 0 0-.1-4S17 0 13 3a13.7 13.7 0 0 0-7 0C2 0 .8 1 .8 1a5.4 5.4 0 0 0-.1 4A5.8 5.8 0 0 0-.8 9c0 5.8 3.5 7 6.8 7.4a3.4 3.4 0 0 0-1 2.7V22" transform="translate(3 0) scale(.85)" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="m-[3px_0_22px] md:m-[3px_0_39px] text-[16px] sm:text-[18px] md:text-[20px] tracking-[-0.3px] font-[760] text-[#111a2e]">
              Product
            </h3>
            <ul className="list-none p-0 m-0 grid gap-[17px] md:gap-[24px]">
              <li><Link href="#features" className="text-[#6e7f99] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.3] hover:text-[#8b0028] transition-colors duration-150">Matching Engine</Link></li>
              <li><Link href="#features" className="text-[#6e7f99] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.3] hover:text-[#8b0028] transition-colors duration-150">Explainability API</Link></li>
              <li><Link href="#security" className="text-[#6e7f99] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.3] hover:text-[#8b0028] transition-colors duration-150">Audit Ledger</Link></li>
              <li><Link href="#security" className="text-[#6e7f99] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.3] hover:text-[#8b0028] transition-colors duration-150">Verification Node</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="m-[3px_0_22px] md:m-[3px_0_39px] text-[16px] sm:text-[18px] md:text-[20px] tracking-[-0.3px] font-[760] text-[#111a2e]">
              Compliance
            </h3>
            <ul className="list-none p-0 m-0 grid gap-[17px] md:gap-[24px]">
              <li><Link href="#security" className="text-[#6e7f99] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.3] hover:text-[#8b0028] transition-colors duration-150">HIPAA Framework</Link></li>
              <li><Link href="#security" className="text-[#6e7f99] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.3] hover:text-[#8b0028] transition-colors duration-150">GDPR Compliance</Link></li>
              <li><Link href="#documentation" className="text-[#6e7f99] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.3] hover:text-[#8b0028] transition-colors duration-150">FHIR R4 Support</Link></li>
              <li><Link href="#documentation" className="text-[#6e7f99] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.3] hover:text-[#8b0028] transition-colors duration-150">Ethics Guidelines</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div id="contact">
            <h3 className="m-[3px_0_22px] md:m-[3px_0_39px] text-[16px] sm:text-[18px] md:text-[20px] tracking-[-0.3px] font-[760] text-[#111a2e]">
              Contact
            </h3>
            <ul className="list-none p-0 m-0 grid gap-[17px] md:gap-[24px]">
              <li><Link href="mailto:partnerships@organtrust.example" className="text-[#6e7f99] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.3] hover:text-[#8b0028] transition-colors duration-150">Partnerships</Link></li>
              <li><Link href="#security" className="text-[#6e7f99] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.3] hover:text-[#8b0028] transition-colors duration-150">System Status</Link></li>
              <li><Link href="mailto:support@organtrust.example" className="text-[#6e7f99] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.3] hover:text-[#8b0028] transition-colors duration-150">Contact Support</Link></li>
              <li><Link href="#security" className="text-[#6e7f99] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.3] hover:text-[#8b0028] transition-colors duration-150">Security Reports</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#dce5ef] pt-[35px] md:pt-[72px] flex flex-col md:flex-row gap-[25px] md:gap-[40px] justify-between items-start md:items-center">
          <div className="max-w-[790px]">
            <h4 className="m-0 mb-[17px] uppercase text-[#6e7f99] text-[13px] font-[800] tracking-[0.1px]">
              Decision support disclaimer
            </h4>
            <p className="m-0 text-[#9aabc2] text-[13px] sm:text-[14px] leading-[1.65]">
              OrganTrust is a decision-support layer intended to complement authorized transplant systems, not replace them. We provide technical verification and explainability for matching runs performed under official jurisdiction. This is a hackathon MVP demonstration using synthetic data.
            </p>
          </div>
          <div className="text-[#9aabc2] text-[14px] md:text-[17px] whitespace-normal md:whitespace-nowrap self-start md:self-center">
            © 2024 OrganTrust. All rights reserved.
          </div>
        </div>
        
      </div>
    </footer>
  );
}
