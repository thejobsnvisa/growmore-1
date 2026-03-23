import { useState, useEffect, useMemo } from "react";
import React from "react";
import { reviewsData } from "../data/reviewsData";

export default function GoogleStyleReviews() {
  const [current, setCurrent] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // ✅ 1. Silent Backend-style filtering & sorting
  // Filters out anything below 4 stars and sorts by relevance automatically
  const sortedReviews = useMemo(() => {
    return reviewsData
      .filter((review) => review.rating >= 4)
      .sort((a, b) => b.relevance - a.relevance);
  }, []);

  // ✅ 2. Handle Responsive Viewports
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  // ✅ 3. Auto Slider Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev + 1 > sortedReviews.length - itemsPerView ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [itemsPerView, sortedReviews.length]);

  return (
    <section className="py-16 sm:py-24 bg-gray-50/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Header: Centered & Clean (No Filter UI) */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Client Success Stories
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="text-2xl font-bold text-gray-800">4.9</span>
            <div className="flex text-yellow-400 text-xl">
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <span className="text-gray-500 text-sm font-medium">
              (Based on 120+ Google Reviews)
            </span>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * (100 / itemsPerView)}%)`,
            }}
          >
            {sortedReviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between group">
                  <div>
                    {/* Profile Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#28535b] text-white flex items-center justify-center text-base font-bold shadow-inner uppercase">
                          {review.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#28535b] transition-colors">
                            {review.name}
                          </h4>
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                            {review.time}
                          </p>
                        </div>
                      </div>
                      <img
                        src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png"
                        alt="google"
                        className="w-5 h-5  transition-all"
                      />
                    </div>

                    {/* Star Rating */}
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-gray-200"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 text-[15px] leading-relaxed italic">
                      "{review.text}"
                    </p>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}