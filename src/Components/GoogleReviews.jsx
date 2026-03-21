import { useState, useEffect } from "react";
import React from "react";
import { reviewsData } from "../data/reviewsData";


export default function GoogleStyleReviews() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev + 1 >= reviewsData.length ? 0 : prev + 1
      );
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Google Reviews
        </h2>

        {/* Rating Summary */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="text-2xl font-semibold text-gray-800">
            4.9
          </span>

          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">
                ★
              </span>
            ))}
          </div>

          <span className="text-gray-500 text-sm">
            (120+ Reviews)
          </span>
        </div>
      </div>

      {/* Reviews Slider */}
      <div className="max-w-6xl mx-auto px-4 overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-700"
          style={{
            transform: `translateX(-${current * 33.33}%)`,
          }}
        >
          {reviewsData.map((review, index) => (
            <div
              key={index}
              className="min-w-[31%] bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#28535b] text-white flex items-center justify-center text-sm font-semibold">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {review.time}
                    </p>
                  </div>
                </div>

                {/* Google Icon */}
                <img
                  src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png"
                  alt="google"
                  className="w-5 h-5"
                />
              </div>

              {/* Stars */}
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < review.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}