import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Components/Loading";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user?.email) {
      fetch(`http://localhost:3000/my-requests?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setMyPosts(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching user posts:", err);
          setLoading(false);
        });
    }
  }, [authLoading, user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once it's gone, even Ctrl+Z can't help you!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/requests/${id}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              setMyPosts(myPosts.filter(post => post._id !== id));
              Swal.fire("Deleted!", "Your listing has been deleted.", "success");
            }
          });
      }
    });
  };

  if (authLoading || loading) return <Loading />;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 py-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        My Listings ({myPosts.length})
      </h2>

      {myPosts.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't added any listings yet.{" "}
          <Link to="/add-listing-to-find-roommate" className="text-primary underline">Add New one now!</Link>.
        </p>

      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-primary text-white text-left">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Rent</th>
                <th className="py-3 px-4">Room Type</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myPosts.map(post => (
                <tr key={post._id} className="border-b bg-gray-800 hover:bg-gray-900 duration-300">
                  <td className="py-3 px-4">{post.title}</td>
                  <td className="py-3 px-4">{post.location}</td>
                  <td className="py-3 px-4">৳{post.rent_Amount}</td>
                  <td className="py-3 px-4">{post.room_Type}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <div className="flex flex-col md:flex-row gap-4">
                      <Link
                        to={`/my-listing/update/${post._id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm">
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyListings;
