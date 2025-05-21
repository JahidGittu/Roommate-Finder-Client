import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "./Loading";

const FeaturedRoommates = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/requests")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading/>
  }

  return (
    <section className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Featured Roommate Posts {posts.length}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Location:</span> {post.location}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Rent:</span> {post.rent_Amount}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Room Type:</span> {post.room_Type}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                <span className="font-medium">Availability:</span> {post.availability ? "Available" : "Not Available"}
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
    </section>
  );
};

export default FeaturedRoommates;
