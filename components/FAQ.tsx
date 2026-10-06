import React from 'react';

export function FAQ() {
  return (
    <section className="bg-white py-[76px] md:py-[105px] pb-[83px] md:pb-[112px]" id="documentation">
      <div className="w-full max-w-[1380px] xl:max-w-[1648px] mx-auto px-4 sm:px-5 md:px-8 xl:px-8">
        
        <h2 className="text-center text-[30px] sm:text-[clamp(30px,2.5vw,37px)] tracking-[-1px] md:tracking-[-1.45px] leading-[1.2] m-0 font-[760]">
          Common Questions
        </h2>
        
        <div className="max-w-[960px] mx-auto mt-[41px] md:mt-[66px] grid gap-[17px] md:gap-[27px]">
          
          <article className="bg-[#f6f9fc] border border-[#f0f4f8] rounded-[16px] md:rounded-[20px] p-[22px_19px] sm:p-[25px_24px] md:p-[36px_37px]">
            <h3 className="m-0 mb-[13px] text-[16px] sm:text-[17px] md:text-[19px] leading-[1.35] tracking-[-0.35px] font-[750]">
              Does OrganTrust replace UNOS or other national systems?
            </h3>
            <p className="m-0 text-[#52637d] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.65]">
              No. OrganTrust is designed as a decision-support and verification layer. It acts as an independent auditor to prove that national policies were followed exactly as intended, providing transparency to clinicians and patients.
            </p>
          </article>

          <article className="bg-[#f6f9fc] border border-[#f0f4f8] rounded-[16px] md:rounded-[20px] p-[22px_19px] sm:p-[25px_24px] md:p-[36px_37px]">
            <h3 className="m-0 mb-[13px] text-[16px] sm:text-[17px] md:text-[19px] leading-[1.35] tracking-[-0.35px] font-[750]">
              How is data privacy managed for patients?
            </h3>
            <p className="m-0 text-[#52637d] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.65]">
              We use pseudonymization. Clinical data used for matching (Blood type, HLA markers, urgency score) is separated from identifying info (Name, DOB, Social Security). Only authorized clinicians with the proper keys can re-link the match to a specific individual.
            </p>
          </article>

          <article className="bg-[#f6f9fc] border border-[#f0f4f8] rounded-[16px] md:rounded-[20px] p-[22px_19px] sm:p-[25px_24px] md:p-[36px_37px]">
            <h3 className="m-0 mb-[13px] text-[16px] sm:text-[17px] md:text-[19px] leading-[1.35] tracking-[-0.35px] font-[750]">
              What happens if a matching rule changes?
            </h3>
            <p className="m-0 text-[#52637d] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.65]">
              All policies are version-controlled. When a match is run, it is linked to a specific policy hash. If policies change, the audit trail will clearly show which version of the logic was active at that exact timestamp.
            </p>
          </article>

        </div>
      </div>
    </section>
  );
}
