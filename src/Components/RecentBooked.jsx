import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "./Loading";
import { FaHeart } from "react-icons/fa";

const RecentBooked = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://roommate-finder-server-ten.vercel.app/requests/all");
        const data = await res.json();
        const bookedPosts = data.filter(post => post.availability === false);
        setAllPosts(bookedPosts);
      } catch (error) {
        console.error("Error fetching booked posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedPosts();
  }, []);

  const handleViewMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, allPosts.length));
  };

  if (loading) return <Loading />;

  const visiblePosts = allPosts.slice(0, visibleCount);
  const allShown = visibleCount >= allPosts.length;

  return (
    <section className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Recently Booked Roommate Posts
      </h2>

      {visiblePosts.length === 0 ? (
        <p className="text-center text-gray-500">No booked roommates to show.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePosts.map((post) => (
              <div
                key={post._id}
                className="relative bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between"
              >
                {/* 🔴 Already Booked Badge */}
                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-3 py-1 rounded-bl-lg font-semibold z-10">
                  Already Booked
                </div>

                {/* ❤️ Like Count */}
                <div className="absolute top-6 right-3 rounded-full text-sm flex items-center gap-1 z-10">
                  {post.likes?.length > 0 && (
                    <>
                      <FaHeart className="text-red-500" />
                      <span className="text-gray-500">{post.likes.length}</span>
                    </>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Location:</span> {post.location}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Rent:</span> ৳{post.rent_Amount}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Room Type:</span>{" "}
                    {post.room_Type || "Not specified"}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    <span className="font-medium">Availability:</span> ❌ Not Available
                  </p>
                </div>

                <div className="px-6 pb-4">
                  <Link
                    to={`/details/${post._id}`}
                    className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {!allShown && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleViewMore}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
              >
                🔽 View More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default RecentBooked;
