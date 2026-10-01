import { useMemo, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { VscRefresh } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { blogs } from "../data/newsData";

const NewsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const categoryOptions = [
    "Skilled Migration Visas",
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
    "Working Holiday Visas"
  ];

  const subcategoryMap = useMemo(() => ({
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
      "Other"
    ],
    "Employer Sponsored Visas & Skilled Migration Visas": [
      "Other",
    ],
    "Family and partner visas": [
      "Other"
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
    "National Innovation Visa" : [
      "Skills Assessment"
    ],
    "Other" : [
      "Skills Assessment",
      "Subclass 482",
      "Subclass 462",
      "Subclass 186",
      "Subclass 190",
      "Subclass 189",
      "Subclass 491"
    ],
    "Skilled Migration Visas" : [
      "Subclass 189",
      "Subclass 190",
      "Subclass 400",
      "Subclass 491",
      "Subclass 407",
      "Subclass 417",
      "Subclass 482"
    ],
    "Skills Assessment" : [
      "Subclass 482",
      "Subclass 485",
      "Subclass 494",
      "Subclass 491",
      "Partner Visa (Subclass 309/100)",
      "Subclass 190",
      "Subclass 186",
      "Labour Agreement"
    ],
    "Studying and training visas":[
      "Subclass 500",
      "Subclass 600"
    ],
    "Temporary Work Visas":[
      "Subclass 600"
    ],
    "Visitor Visas" : [
     "Subclass 804",
     "Subclass 190",
     "Subclass 858"
    ],
    "Working Holiday Visas" : [
      "Subclass 866",
      "Subclass 491"
    ]
  }), []);

  const categories = [...new Set([
    ...categoryOptions,
    ...blogs.map((blog) => blog.category).filter(Boolean),
  ])];

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

    return [...new Set([
      ...Object.values(subcategoryMap).flat(),
      ...blogs.map((blog) => blog.subcategory).filter(Boolean),
    ])];
  }, [selectedCategory, subcategoryMap]);

  const filteredBlogs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return blogs.filter((blog) => {
      const searchableText = `${blog.title} ${blog.category || ""} ${blog.subcategory || ""}`.toLowerCase();
      const matchesQuery = !query || searchableText.includes(query);
      const matchesCategory = !selectedCategory || blog.category === selectedCategory;
      const matchesSubcategory = !selectedSubcategory || blog.subcategory === selectedSubcategory;

      return matchesQuery && matchesCategory && matchesSubcategory;
    });
  }, [searchTerm, selectedCategory, selectedSubcategory]);

  const blogsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / blogsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const indexOfLastBlog = safeCurrentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubcategory("");
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (value) => {
    setSelectedSubcategory(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setCurrentPage(1);
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-8 flex w-full flex-col items-center gap-3">
                  <div className="flex w-full max-w-[900px] flex-col gap-3">
        
                    {/* Search */}
                    <label
                      className="flex w-full flex-col gap-2 text-sm font-medium text-[#163c3d]"
                    >
                      <span className="sr-only">Search</span>
        
                      <div className="relative w-full">
                        <CiSearch
                          aria-hidden="true"
                          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="search"
                          value={searchTerm}
                          onChange={(event) =>
                            handleSearchChange(event.target.value)
                          }
                          placeholder="Search"
                          className="
                            h-11 w-full rounded-lg border border-gray-300
                            bg-white pl-11 pr-4 text-sm font-normal text-gray-700
                            outline-none transition-all duration-200
                            placeholder:text-gray-400 focus:border-[#6dc7d1]
                            focus:ring-2 focus:ring-[#6dc7d1]/20
                          "
                        />
                      </div>
                    </label>
        
                     <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
                        {/* Category */}
                    <select
                      aria-label="Category"
                      className="
                        h-11 w-full min-w-0
                        sm:w-auto sm:flex-1
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
                        value={selectedCategory}
                        onChange={(event) =>
                          handleCategoryChange(event.target.value)
                        }
                      >
                        <option value="">
                          Category
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
        
                    {/* Subcategory */}
                    {availableSubcategories.length > 0 && (
                      <select
                        aria-label="Subcategory"
                        className="
                          h-11 w-full min-w-0
                          sm:w-auto sm:flex-1
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
                          value={selectedSubcategory}
                          onChange={(event) =>
                            handleSubcategoryChange(
                              event.target.value
                            )
                          }
                        >
                          <option value="">
                            Subcategory
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
                    )}
        
        
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#e8eef5] px-4 text-sm font-medium text-[#163c3d] transition-colors hover:bg-[#dce6ef] sm:w-auto"
                  >
                    <VscRefresh className="h-4 w-4" />
                    <span>Reset filters</span>
                  </button>
                     </div>
                   </div>
                </div>
        

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover p-4 rounded-4xl"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-[#163c3d] mb-6">
                  {blog.title}
                </h3>

                <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                  <FaCalendar className="h-4 w-4 text-[#7cc576]" />
                  {blog.date}
                </p>

                <div className="mt-auto">
                  <Link to={`/news/${blog.slug}/`}>
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

        {currentBlogs.length === 0 && (
          <p className="mt-8 text-center text-gray-500">No news articles match your filters.</p>
        )}

        <div className="flex justify-center items-center mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={safeCurrentPage === 1 || filteredBlogs.length === 0}
            className={`px-5 py-2 rounded-lg transition ${
              safeCurrentPage === 1 || filteredBlogs.length === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-black hover:text-green-500 cursor-pointer"
            }`}
          >
            Prev
          </button>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={safeCurrentPage === totalPages || filteredBlogs.length === 0}
            className={`px-5 py-2 rounded-lg transition ${
              safeCurrentPage === totalPages || filteredBlogs.length === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-black hover:text-green-500 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;