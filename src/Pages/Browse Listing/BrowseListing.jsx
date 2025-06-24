import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../../Components/Loading";
import { Helmet } from "react-helmet";

const BrowseListing = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://roommate-finder-server-ten.vercel.app/requests")
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

        if (text.trim() === "") {
            sortAndSet(posts, sortOption);
            return;
        }

        const filtered = posts.filter((post) =>
            [post.title, post.location, post.room_Type, String(post.rent_Amount)].some((field) =>
                field?.toLowerCase().includes(text.toLowerCase())
            )
        );

        sortAndSet(filtered, sortOption);
    };

    const handleSort = (e) => {
        const selected = e.target.value;
        setSortOption(selected);

        const currentFiltered = searchText.trim() === ""
            ? posts
            : posts.filter((post) =>
                [post.title, post.location, post.room_Type, String(post.rent_Amount)].some((field) =>
                    field?.toLowerCase().includes(searchText.toLowerCase())
                )
            );

        sortAndSet(currentFiltered, selected);
    };

    const sortAndSet = (data, option) => {
        let sorted = [...data];

        if (option === "highToLow") {
            sorted.sort((a, b) => b.rent_Amount - a.rent_Amount);
        } else if (option === "lowToHigh") {
            sorted.sort((a, b) => a.rent_Amount - b.rent_Amount);
        }

        setFilteredPosts(sorted);
    };

    if (loading) return <Loading />;

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-10">
            <Helmet>
                <title>Browse Listing | Roommate Finder</title>
            </Helmet>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
                {filteredPosts.length} listings found
            </h2>

            {/* Search & Sort Controls */}
            <div className="mb-6 flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Search by title, location, rent or room type"
                    className="w-full sm:max-w-sm px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <select
                    onChange={handleSort}
                    value={sortOption}
                    className="w-full sm:w-60 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="">Sort by</option>
                    <option value="highToLow">Rent: High to Low</option>
                    <option value="lowToHigh">Rent: Low to High</option>
                    <option value="popular">Popular</option>
                </select>
            </div>

            {/* Listings */}
            {filteredPosts.length === 0 ? (
                <p className="text-center text-gray-500">No listings found.</p>
            ) : (
                <>
                    {/* Mobile Card View */}
                    <div className="grid md:hidden gap-4">
                        {filteredPosts.map((post) => (
                            <div key={post._id} className="bg-gray-800 text-white p-4 rounded-xl shadow-md">
                                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                                <p><span className="font-medium">Location:</span> {post.location}</p>
                                <p><span className="font-medium">Rent:</span> ৳{post.rent_Amount}</p>
                                <p><span className="font-medium">Room Type:</span> {post.room_Type}</p>
                                <p><span className="font-medium">Availability:</span> {post.availability ? "Available" : "Not Available"}</p>
                                <Link
                                    to={`/details/${post._id}`}
                                    className="inline-block mt-3 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                                >
                                    See More
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block w-full overflow-x-auto">
                        <table className="min-w-[600px] w-full bg-white shadow-md rounded-xl text-sm md:text-base">
                            <thead className="bg-primary text-white text-left">
                                <tr>
                                    <th className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">Title</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">Location</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">Rent</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">Room Type</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">Availability</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.map((post) => (
                                    <tr
                                        key={post._id}
                                        className="border-b bg-gray-800 hover:bg-gray-900 text-white transition"
                                    >
                                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">{post.title}</td>
                                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">{post.location}</td>
                                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">৳{post.rent_Amount}</td>
                                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">{post.room_Type}</td>
                                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">
                                            {post.availability ? "Available" : "Not Available"}
                                        </td>
                                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap text-center">
                                            <Link
                                                to={`/details/${post._id}`}
                                                className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-md text-xs md:text-sm font-medium transition"
                                            >
                                                See More
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </section>
    );
};

export default BrowseListing;
