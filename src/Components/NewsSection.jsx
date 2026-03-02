import React from "react";
import { FaCalendar } from "react-icons/fa";


const blogs = [
  {
    id: 1,
    title: "Tasmania 190 & 491 State Nomination – 26 February 2026 Invitation Round Update",
    date: "February 26, 2026",
    image: "/assets/blog4.jpg",
  },
  {
    id: 2,
    title: "Australia Confirms 4-Tier Occupation Ceilings for 189 & 491 Visas",
    date: "February 25, 2026",
    image: "/assets/blog5.jpg",
  },
    {
    id: 3,
    title: "Western Australia’s Feb State Nomination Invites Released",
    date: "February 24, 2026",
    image: "/assets/blog1.png",
  },
  {
    id: 4,
    title: "Canberra Matrix Tentative Invitation Dates Changed: See New Dates",
    date: "February 23, 2026",
    image: "/assets/blog2.png",
  },
  {
    id: 5,
    title: "Is Your EOI Ready? NSW 190 Invitations Coming in March",
    date: "February 23, 2026",
    image: "/assets/blog3.png",
  },
    {
    id: 6,
    title: "2025–26 State Migration Update: 190 & 491 State Nominations Issued Till 31 January",
    date: "February 18, 2026",
    image: "/assets/blog10.png",
  },
  {
    id: 7,
    title: "Skilled Refugee Labour Agreement Pilot: Free Webinar for Employers",
    date: "February 14, 2026",
    image: "/assets/blog6.png",
  },
  {
    id: 8,
    title: "English Test Retake Update: OSR & SSR Explained",
    date: "February 13, 2026",
    image: "/assets/blog7.png",
  },
    {
    id: 9,
    title: "Tasmania’s Latest Invitation Round Results – 12 Feb 2026",
    date: "February 12, 2026",
    image: "/assets/blog8.png",
  },{
    id: 10,
    title: "Canberra Matrix Invitation Round Summary 29 January 2026",
    date: "February 6, 2026",
    image: "/assets/blog9.png",
  },
];

const NewsSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover p-4 rounded-4xl"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-[#163c3d] mb-4 leading-snug">
                  {blog.title}
                </h3>

                <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                  <FaCalendar className="h-4 w-4 text-[#7cc576]" /> {blog.date}
                </p>

                {/* Push button to bottom */}
                <div className="mt-auto">
                  <button className="group text-[#6dc7d1] font-semibold flex items-center gap-2 justify-end w-full transition-all duration-300">
                    
                    <span className="relative">
                      READ MORE
                      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#6dc7d1] transition-all duration-300 group-hover:w-full"></span>
                    </span>

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>

                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewsSection;