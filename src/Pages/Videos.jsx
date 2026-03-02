import React from "react";

const Videos = () => {
  return (
    <div className="w-full">
      {/* ================= HEADER ================= */}
      <section className="bg-[#28535B] py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-15">
          <h1 className="text-3xl md:text-5xl font-semibold text-white">
            YouTube Insights & Resources
          </h1>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-medium text-[#28535B] mb-6">
            Explore Our YouTube Insights & Resources
          </h2>

          <p className="text-gray-500 max-w-7xl mx-auto font-base text-base md:text-base leading-relaxed">
            Explore our YouTube channel for expert migration advice,
            step-by-step guides, and inspiring success stories. Stay informed
            with the latest updates and tips to simplify your Australian
            immigration journey. Empower your dreams with valuable insights and
            resources today! .
          </p>
          <p className="text-gray-600 max-w-6xl p-4  mx-auto text-base md:text-lg leading-relaxed mt-3 text-left">
            Could Not Fetch The Videos At The Moment, Please Try Again In Some
            Time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Videos;
