import React, { useMemo, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { blogs } from "../data/blogsData";
import { Link } from "react-router-dom";

const BlogStep = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const categoryOptions = [
    "Bridging Visa",
    "Employer Sponsored Visas",
    "Employer Sponsored Visas & Skilled Migration Visas",
    "Family and partner visas",
    "Labour Agreements & DAMA",
    "National Innovation Visa",
    "Skilled Migration Visas",
    "Skills Assessment",
    "Studying and training visas",
    "Temporary Work Visas",
    "Visitor Visas",
    "Working Holiday Visas",
  ];

  const subcategoryMap = {
    "Bridging Visa": [
      "Bridging Visa",
      "Subclass 186",
      "Subclass 494",
    ],

    "Employer Sponsored Visas": [
      "DAMA",
      "Subclass 190",
      "Subclass 186",
      "Subclass 494",
      "Subclass 491",
      "Subclass 189",
      "Subclass 417",
      "Subclass 462",
      "Labour Agreement",
      "Other",
    ],

    "Employer Sponsored Visas & Skilled Migration Visas": [
      "Other",
    ],

    "Family and partner visas": [
      "Other",
    ],

    "Labour Agreements & DAMA": [
      "Other",
      "Partner Visa (Subclass 820/801)",
      "Subclass 417",
      "Skills Assessment",
      "Subclass 408",
      "Subclass 186",
      "Subclass 494",
      "Partner Visa (Subclass 309/100)",
    ],

    "National Innovation Visa": [
      "Skills Assessment",
    ],

    Other: [
      "Skills Assessment",
      "Subclass 482",
      "Subclass 462",
      "Subclass 186",
      "Subclass 190",
      "Subclass 189",
      "Subclass 491",
    ],

    "Skilled Migration Visas": [
      "Subclass 189",
      "Subclass 190",
      "Subclass 400",
      "Subclass 491",
      "Subclass 407",
      "Subclass 417",
      "Subclass 482",
    ],

    "Skills Assessment": [
      "Subclass 482",
      "Subclass 485",
      "Subclass 494",
      "Subclass 491",
      "Partner Visa (Subclass 309/100)",
      "Subclass 190",
      "Subclass 186",
      "Labour Agreement",
    ],

    "Studying and training visas": [
      "Subclass 500",
      "Subclass 600",
    ],

    "Temporary Work Visas": [
      "Subclass 600",
    ],

    "Visitor Visas": [
      "Subclass 804",
      "Subclass 190",
      "Subclass 858",
    ],

    "Working Holiday Visas": [
      "Subclass 866",
      "Subclass 491",
    ],
  };

  // Combine predefined categories with categories from blog data
  const categories = [
    ...new Set([
      ...categoryOptions,
      ...blogs.map((blog) => blog.category).filter(Boolean),
    ]),
  ];

  // Get subcategories based on selected category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory) {
      return [
        ...new Set([
          ...(subcategoryMap[selectedCategory] || []),

          ...blogs
            .filter((blog) => blog.category === selectedCategory)
            .map((blog) => blog.subcategory)
            .filter(Boolean),
        ]),
      ];
    }

    return [
      ...new Set([
        ...Object.values(subcategoryMap).flat(),
        ...blogs.map((blog) => blog.subcategory).filter(Boolean),
      ]),
    ];
  }, [selectedCategory]);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return blogs.filter((blog) => {
      const searchableText = `
        ${blog.title}
        ${blog.category || ""}
        ${blog.subcategory || ""}
      `.toLowerCase();

      const matchesQuery =
        !query || searchableText.includes(query);

      const matchesCategory =
        !selectedCategory ||
        blog.category === selectedCategory;

      const matchesSubcategory =
        !selectedSubcategory ||
        blog.subcategory === selectedSubcategory;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesSubcategory
      );
    });
  }, [
    searchTerm,
    selectedCategory,
    selectedSubcategory,
  ]);

  // Pagination
  const blogsPerPage = 10;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBlogs.length / blogsPerPage)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const indexOfLastBlog =
    safeCurrentPage * blogsPerPage;

  const indexOfFirstBlog =
    indexOfLastBlog - blogsPerPage;

  const currentBlogs = filteredBlogs.slice(
    indexOfFirstBlog,
    indexOfLastBlog
  );

  // Category change
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubcategory("");
    setCurrentPage(1);
  };

  // Subcategory change
  const handleSubcategoryChange = (value) => {
    setSelectedSubcategory(value);
    setCurrentPage(1);
  };

  // Search change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">

        {/* =========================
            RESPONSIVE FILTER SECTION
        ========================== */}
        <div className="mb-8 w-full">
          <div
            className="
              grid w-full grid-cols-1 gap-4
              sm:grid-cols-2
              lg:grid-cols-3
              xl:flex xl:flex-wrap xl:items-end
              xl:gap-4
            "
          >

            {/* Category */}
            <label
              className="
                flex w-full flex-col gap-2
                text-sm font-medium text-[#163c3d]
                xl:w-[425px]
                2xl:w-[475px]
              "
            >
              <span>Category</span>

              <select
                value={selectedCategory}
                onChange={(event) =>
                  handleCategoryChange(event.target.value)
                }
                className="
                  h-11 w-full
                  rounded-lg
                  border border-gray-300
                  bg-white
                  px-4
                  text-sm font-normal
                  text-gray-700
                  outline-none
                  transition-all
                  duration-200
                  focus:border-[#6dc7d1]
                  focus:ring-2
                  focus:ring-[#6dc7d1]/20
                "
              >
                <option value="">
                  All categories
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </label>

            {/* Subcategory */}
            {availableSubcategories.length > 0 && (
              <label
                className="
                  flex w-full flex-col gap-2
                  text-sm font-medium text-[#163c3d]
                  xl:w-[425px]
                  xl:ml-0.5
                  2xl:w-[475px]
                  2xl:ml-2.5  
                "
              >
                <span>Subcategory</span>

                <select
                  value={selectedSubcategory}
                  onChange={(event) =>
                    handleSubcategoryChange(
                      event.target.value
                    )
                  }
                  className="
                    h-11 w-full
                    rounded-lg
                    border border-gray-300
                    bg-white
                    px-4
                    text-sm font-normal
                    text-gray-700
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#6dc7d1]
                    focus:ring-2
                    focus:ring-[#6dc7d1]/20
                  "
                >
                  <option value="">
                    All subcategories
                  </option>

                  {availableSubcategories.map(
                    (subcategory) => (
                      <option
                        key={subcategory}
                        value={subcategory}
                      >
                        {subcategory}
                      </option>
                    )
                  )}
                </select>
              </label>
            )}

            {/* Search */}
            <label
              className="
                flex w-full flex-col gap-2
                text-sm font-medium text-[#163c3d]
                xl:ml-auto
                xl:w-[425px]
                2xl:w-[475px]
              "
            >
              <span>Search news</span>

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  handleSearchChange(
                    event.target.value
                  )
                }
                placeholder="Search by title..."
                className="
                  h-11 w-full
                  rounded-lg
                  border border-gray-300
                  bg-white
                  px-4
                  text-sm font-normal
                  text-gray-700
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-gray-400
                  focus:border-[#6dc7d1]
                  focus:ring-2
                  focus:ring-[#6dc7d1]/20
                "
              />
            </label>
          </div>
        </div>

        {/* =========================
            BLOG CARDS
        ========================== */}
        <div
          className="
            grid grid-cols-1 gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-8
          "
        >
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="
                group flex flex-col
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-md
                transition-all
                duration-500
                hover:shadow-2xl
              "
            >
              {/* Image */}
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="
                    h-52 w-full
                    rounded-3xl
                    object-cover
                    p-3
                    sm:h-56
                    lg:h-56
                  "
                />
              </div>

              {/* Content */}
              <div className="flex flex-grow flex-col p-5 sm:p-6">
                <h3
                  className="
                    mb-5
                    text-lg font-semibold
                    leading-snug
                    text-[#163c3d]
                    sm:text-xl
                  "
                >
                  {blog.title}
                </h3>

                {/* Date */}
                <p
                  className="
                    mb-6
                    flex items-center gap-2
                    text-sm text-gray-500
                  "
                >
                  <FaCalendar
                    className="h-4 w-4 text-[#7cc576]"
                  />

                  {blog.date}
                </p>

                {/* Read More */}
                <div className="mt-auto">
                  <Link
                    to={`/news/${blog.slug}/`}
                    className="block"
                  >
                    <button
                      type="button"
                      className="
                        group flex w-full
                        items-center justify-end
                        gap-2
                        font-semibold
                        text-[#6dc7d1]
                        transition-all
                        duration-300
                      "
                    >
                      <span className="relative">
                        READ MORE

                        <span
                          className="
                            absolute
                            bottom-[-4px]
                            left-0
                            h-[2px]
                            w-0
                            bg-[#6dc7d1]
                            transition-all
                            duration-300
                            group-hover:w-full
                          "
                        />
                      </span>

                      <span
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      >
                        →
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =========================
            NO RESULTS
        ========================== */}
        {currentBlogs.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-500 sm:text-base">
              No news articles match your filters.
            </p>
          </div>
        )}

        {/* =========================
            PAGINATION
        ========================== */}
        <div className="mt-10 flex items-center justify-center sm:mt-12">
          <button
            type="button"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(1, prev - 1)
              )
            }
            disabled={
              safeCurrentPage === 1 ||
              filteredBlogs.length === 0
            }
            className={`
              rounded-lg
              px-4 py-2
              text-sm
              transition-all
              duration-200
              sm:px-5
              sm:text-base
              ${
                safeCurrentPage === 1 ||
                filteredBlogs.length === 0
                  ? "cursor-not-allowed text-gray-400"
                  : "cursor-pointer text-black hover:text-green-500"
              }
            `}
          >
            Prev
          </button>

          {/* Page Number */}
          <span
            className="
              px-3
              text-sm
              font-medium
              text-[#163c3d]
              sm:px-5
              sm:text-base
            "
          >
            {safeCurrentPage} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(totalPages, prev + 1)
              )
            }
            disabled={
              safeCurrentPage === totalPages ||
              filteredBlogs.length === 0
            }
            className={`
              rounded-lg
              px-4 py-2
              text-sm
              transition-all
              duration-200
              sm:px-5
              sm:text-base
              ${
                safeCurrentPage === totalPages ||
                filteredBlogs.length === 0
                  ? "cursor-not-allowed text-gray-400"
                  : "cursor-pointer text-black hover:text-green-500"
              }
            `}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogStep;