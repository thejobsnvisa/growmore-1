import React from "react";
import { Link } from "lucide-react";

const News9 = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#28535B] py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
            Employer-Sponsored Visa Salary Thresholds 2026
          </h2>
        </div>
      </section>

      {/* Main Content Section - Constrained width for centering */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <img
            src="/assets/n5.jpg"
            alt="Tasmania Background"
            className="w-full h-auto rounded-xl my-6 shadow-sm"
          />{" "}
          <div className="space-y-10 text-[#727272]">
            {/* Header Section */}
            <div>
              <h2 className="text-[24px] font-bold text-[#333333] mb-6">
                Salary Thresholds Rise for Employer-Sponsored Visas from 1 July
                2026
              </h2>
              <div className="space-y-4 text-justify  text-[18px] text-[#042325] leading-relaxed">
                <p>
                  If you are an employer sponsoring skilled workers or a
                  professional planning to apply for an Australian visa, the
                  upcoming salary threshold changes will affect you directly.
                </p>
                <p>
                  Australia is set to increase the minimum salary requirements
                  for employer-sponsored visas. These changes are confirmed and
                  taken based on the November 2025 AWOTE figures released by the
                  Australian Bureau of Statistics and will take effect from 1
                  July 2026.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-[24px] font-semibold text-[#333333] mb-4">
What’s Changing?
              </h3>
               <p className="mb-4 text-justify text-[16px] text-[#042325] font-bold">
               The updated salary thresholds for employer-sponsored visas from 1 July 2026 are:

              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-left text-[16px] text-[#042325]">
                <li>
                 Core Skills Income Threshold (CSIT): $79,499 (up from $76,515)
                </li>
                <li>
                  Specialist Skills Income Threshold (SSIT): $146,717 (up from $141,210)
                </li>{" "}
              </ul>
                <p className="mb-4 text-justify text-[16px] text-[#042325] font-bold">
              These thresholds will mainly apply to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-left text-[16px] text-[#042325]">
                <li>
                 <strong>Subclass 482 –</strong> Core & Specialist streams
                </li>
                <li>
                 <strong>Subclass 186 –</strong> Temporary Residence Transition (TRT) & Direct Entry
                </li>{" "}
                <li>
                 <strong>Labour Agreement streams</strong> under Subclass 482 and 186 (unless specified otherwise)
                </li>{" "}
              </ul>
               <p className="mb-4 text-justify text-[18px] text-[#042325]">
              However, note that Subclass 494 and Subclass 187 TRT visas are not automatically updated because they are tied to TSMIT and require separate legislative changes.
              </p>
            </div>

            {/* Subclass 190 & Green Pass Section */}
            <div>
              <h3 className="text-[24px] font-semibold text-[#333333] mb-4">
                How to Stay Ahead
              </h3>
              <p className="text-[17px] font-semibold text-[#333333] mb-4">
                If you are planning to apply for OSAP or TSS:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-left text-[16px] text-[#042325] mt-4">
                <li>Ensure all your documents are ready</li>
                <li>Check your application for accuracy</li>
                <li>Make any pending payments before 29 March 2026</li>
              </ul>
              <p className="mb-4 text-justify text-[16px] text-[#042325]">
                This temporary pause is a short-term delay, and applicants can
                expect a smoother process once the updates are complete.
              </p>
            </div>
            <div>
              <h3 className="text-[24px] font-semibold text-[#333333] mb-4">
                Plan Ahead with Growmore Immigration
              </h3>
              <p className="mb-4 text-justify text-[16px] text-[#042325]">
                So, if you are planning to apply for OSAP or TSS, note that TRA
                currently has registrations on hold. If you wish to make a
                payment for an existing application, ensure it is completed
                before 29 March 2026, and for any further guidance on Australian
                immigration, you can contact us.
              </p>
              <div className="w-full bg-[#2ED09B]  rounded-lg p-5 shadow-sm my-8">
                <div className="flex flex-col md:flex-row justify-start items-center gap-2 md:gap-4  pl-3 text-black font-semibold text-center text-[15px] sm:text-[17px]">
                  <div className="flex items-center">
                    <span>Email: </span>
                    <a
                      href="mailto:info@growmore.one"
                      className="ml-1 text-blue-500 transition-colors"
                    >
                      info@growmore.one
                    </a>
                  </div>

                  <span className="hidden md:inline text-black">|</span>

                  <div className="flex items-center">
                    <span>WhatsApp: </span>
                    <a
                      href="https://wa.me/61434202021"
                      className="ml-1 text-blue-500 "
                    >
                      +61 434 202 021
                    </a>
                  </div>

                  <span className="hidden md:inline text-black">|</span>

                  <div className="flex items-center">
                    <span>Phone: </span>
                    <a href="tel:+61387643334" className="ml-1 text-black ">
                      +61 3 8764 3334
                    </a>
                  </div>
                </div>
              </div>
              <p className="mb-8 text-[16px] text-[#042325]">
                Source:
                <span className="text-blue-500">
                  Temporary Pause for OSAP and TSS Registrations
                </span>
              </p>

              <Link to="/book-consultation">
                <button className="bg-[#5dc2d3] text-white rounded-full hover:bg-black transition px-12 py-4 text-sm font-bold shadow-lg">
                  Book Consultation →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News9;
