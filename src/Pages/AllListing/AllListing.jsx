import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

const AllListing = () => {
  // 1️⃣ State
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // 2️⃣ Fetch Data
  useEffect(() => {
    fetch("https://roommate-finder-server-ten.vercel.app/requests/all")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((e) => console.error("Error fetching listings:", e));
  }, []);

  // 3️⃣ Derived Data: filter, sort, paginate
  const filteredAndSorted = useMemo(() => {
    let data = [...posts];

    // 🔍 Search Filter
    if (searchText.trim()) {
      const txt = searchText.toLowerCase();
      data = data.filter((p) =>
        [p.title, p.location, p.room_Type, String(p.rent_Amount)]
          .some((f) => f?.toLowerCase().includes(txt))
      );
    }

    // 🔀 Sort
    if (sortOption === "highToLow") {
      data.sort((a, b) => b.rent_Amount - a.rent_Amount);
    } else if (sortOption === "lowToHigh") {
      data.sort((a, b) => a.rent_Amount - b.rent_Amount);
    } else if (sortOption === "newest") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "oldest") {
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return data;
  }, [posts, searchText, sortOption]);

  // 📊 Pagination calculations
  const totalItems = filteredAndSorted.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSorted.slice(start, start + itemsPerPage);
  }, [filteredAndSorted, currentPage, itemsPerPage]);

  // Handlers
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };
  const handleSort = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };
  const handleItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  const goToPage = (n) => setCurrentPage(n);

  return (
    <section className="max-w-7xl mx-auto p-4 space-y-6">
      {/* ── Controls Bar ──────────────────────────── */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        {/* Search */}
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search by title, location, rent..."
          className="flex-1 border rounded px-3 py-2 shadow-sm focus:ring focus:outline-none"
        />

        {/* Items-per-page */}
        <div>
          <label className="mr-2 text-sm">Show:</label>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPage}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 15].map((n) => (
              <option className="bg-base-200" key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="ml-auto">
          <label className="mr-2 text-sm">Sort by:</label>
          <select
            value={sortOption}
            onChange={handleSort}
            className="border rounded px-2 py-1"
          >
            <option className="bg-base-200" value="">Default</option>
            <option className="bg-base-200" value="highToLow">Rent: High → Low</option>
            <option className="bg-base-200" value="lowToHigh">Rent: Low → High</option>
            <option className="bg-base-200" value="newest">Date: Newest</option>
            <option className="bg-base-200" value="oldest">Date: Oldest</option>
          </select>
        </div>
      </div>

      {/* ── Listings Grid ──────────────────────────── */}
      {paginated.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginated.map((post) => (
            <div
              key={post._id}
              className="relative bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between"
            >
              {/* Availability Badge */}
              <div
                className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded ${
                  post.availability
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {post.availability ? "Available" : "Booked"}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-primary">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">📍 {post.location}</p>
                <p className="text-sm text-gray-500">💸 ৳{post.rent_Amount}</p>
                <p className="text-sm text-gray-500">
                  🛏 {post.room_Type || "Not specified"}
                </p>
              </div>
              <div className="p-4">
                <Link
                  to={`/details/${post._id}`}
                  className="block bg-primary text-white text-center rounded py-2 font-medium hover:bg-primary/90 transition"
                >
                  See More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Pagination Controls ────────────────────── */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => goToPage(n)}
              className={`px-3 py-1 rounded border ${
                n === currentPage
                  ? "bg-violet-600 text-white border-transparent"
                  : "hover:bg-base-200"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default AllListing;
