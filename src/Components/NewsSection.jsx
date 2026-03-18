import React from "react";
import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";

const blogs = [
    {
    id: 1,
    slug:"tra-temporarily-pauses-osap-tss-registrations",
    title: "TRA Temporarily Pauses OSAP & TSS Registrations",
    date: "March 17, 2026",
    image: "/assets/n1.jpg",
  },
  {
    id: 2,
    slug:"omara-ai-migration-assistance",
    title: "AI in Migration: Key Legal Rules Every RMA Must Follow",
    date: "March 17, 2026",
    image: "/assets/n2.jpg",
  },
  {
    id: 3,
    slug:"vic-invitation-round-17-mar-2026",
    title: "VIC Invitation Round 17 Mar 2026: Who Got Invited This Time?",
    date: "March 17, 2026",
    image: "/assets/bg3.jpg",
  },
  {
    id: 4,
    slug:"tasmania-state-nomination-program-final-quarter",
    title: "Tasmania State Nomination Program Enters Its Final Quarter",
    date: "March 13, 2026",
    image: "/assets/bg1.jpg",
  },
   {
    id: 5,
    slug:"vetassess-to-pause-applications-and-remove-two-occupations-under-tra-changes",
    title: "VETASSESS to Pause Applications and Remove Two Occupations Under TRA Changes",
    date: "March 12, 2026",
    image: "/assets/bg4.jpg",
  },
  {
    id: 6,
    slug: "tasmania-12-march-invitation-round-fewer-candidates-invited",
    title:"Tasmania 12 March Invitation Round: Fewer Candidates Invited",
    date: "March 12, 2026",
    image: "/assets/bg2.png",
  },
  {
    id: 7,
    slug:"australia-proposes-temporary-visa-restrictions",
    title: "Australia Proposes Temporary Visa Restrictions Due to Middle East Conflict",
    date: "March 12, 2026",
    image: "/assets/n3.jpg",
  },
    {
    id: 8,
    slug:"new-rule-407-training-visa-applications-allowed-only-after-nomination-approval",
    title: "New Rule: 407 Training Visa Applications Allowed Only After Nomination Approval",
    date: "March 10, 2026",
    image: "/assets/n4.jpg",
  },
   {
    id: 9,
    slug:"salary-thresholds-rise-for-employer-sponsored-visas-from-1-july-2026",
    title: "Salary Thresholds Rise for Employer-Sponsored Visas from 1 July 2026 ",
    date: "March 9, 2026",
    image: "/assets/n5.png",
  }, {
    id: 10,
    slug:"tasmania-issues-latest-invitations-for-state-nomination-on-5-march-2026",
    title: "Tasmania Issues Latest Invitations for State Nomination on 5 March 2026",
    date: "March 5, 2026",
    image: "/assets/n6.png",
  }, 
 
];

const NewsSection = () => {
  return (
   <section className="bg-white py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
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
                  className="w-full h-56 object-cover p-4 rounded-4xl"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-[#163c3d] mb-6">
                  {blog.title}
                </h3>

                <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                  <FaCalendar className="h-4 w-4 text-[#7cc576] font-medium" /> {blog.date}
                </p>

                <div className="mt-auto">
                  {/* 2. Wrap the button in a Link using the slug or ID */}
                  <Link to={`/${blog.slug}/`}>
                    <button className="group text-[#6dc7d1] font-semibold flex items-center gap-2 justify-end w-full transition-all duration-300">
                      <span className="relative">
                        READ MORE
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#6dc7d1] transition-all duration-300 group-hover:w-full"></span>
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </Link>
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