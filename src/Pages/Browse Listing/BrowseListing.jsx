import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../../Components/Loading";

const BrowseListing = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/requests")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setFilteredPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data", err);
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        const text = e.target.value;
        setSearchText(text);

        const filtered = posts.filter((post) =>
            [post.title, post.location, post.room_Type, post.rent_Amount.toString()].some((field) =>
                field.toLowerCase().includes(text.toLowerCase())
            )
        );

        sortAndSet(filtered, sortOption);
    };

    const handleSort = (e) => {
        const selected = e.target.value;
        setSortOption(selected);
        sortAndSet(filteredPosts, selected);
    };

    const sortAndSet = (data, option) => {
        let sorted = [...data];

        if (option === "highToLow") {
            sorted.sort((a, b) => b.rent_Amount - a.rent_Amount);
        } else if (option === "lowToHigh") {
            sorted.sort((a, b) => a.rent_Amount - b.rent_Amount);
        } else if (option === "popular") {
            // If popularity field exists in future, sort by that
            // sorted.sort((a, b) => b.popularity - a.popularity);
        }

        setFilteredPosts(sorted);
    };

    if (loading) return <Loading />;

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-10">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">
                Browse All Listings ({filteredPosts.length})
            </h2>

            <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="w-56">

                </div>
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Search by title, location, rent or room type"
                    className="w-full md:max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <select
                    onChange={handleSort}
                    value={sortOption}
                    className="w-full md:w-60 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option className="bg-gray-900" value="">Sort by</option>
                    <option className="bg-gray-900" value="highToLow">Rent: High to Low</option>
                    <option className="bg-gray-900" value="lowToHigh">Rent: Low to High</option>
                    <option className="bg-gray-900" value="popular">Popular</option>
                </select>
            </div>

            {filteredPosts.length === 0 ? (
                <p className="text-center text-gray-500">No listings found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                        <thead className="bg-primary text-white text-left">
                            <tr>
                                <th className="py-3 px-4">Title</th>
                                <th className="py-3 px-4">Location</th>
                                <th className="py-3 px-4">Rent</th>
                                <th className="py-3 px-4">Room Type</th>
                                <th className="py-3 px-4">Availability</th>
                                <th className="py-3 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.map((post) => (
                                <tr
                                    key={post._id}
                                    className="border-b bg-gray-800 hover:bg-gray-900 text-white duration-500"
                                >
                                    <td className="py-3 px-4">{post.title}</td>
                                    <td className="py-3 px-4">{post.location}</td>
                                    <td className="py-3 px-4">৳{post.rent_Amount}</td>
                                    <td className="py-3 px-4">{post.room_Type}</td>
                                    <td className="py-3 px-4">
                                        {post.availability ? "Available" : "Not Available"}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <Link
                                            to={`/details/${post._id}`}
                                            className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
                                        >
                                            See More
                                        </Link>
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

export default BrowseListing;
