import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loading from "./Loading";

const RoommateDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/requests/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                setLoading(false);
            });
    }, [id]);

    const handleLike = () => {
        setLiked(!liked);
    };

    if (loading) {
        return <Loading />
    }

    if (!post) {
        return <p className="text-center text-red-500 mt-10">Post not found</p>;
    }

    return (
        <section className="py-10 px-4 md:px-6 lg:px-10 max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                    <h2 className="text-3xl font-bold text-primary">{post.title}</h2>
                    <button onClick={handleLike} className="text-red-500 text-xl">
                        {liked ? <FaHeart className="animate-pulse" /> : <FaRegHeart />}
                    </button>
                </div>

                <div className="space-y-3 text-gray-700 text-sm md:text-base">
                    <p><span className="font-semibold">📍 Location:</span> {post.location}</p>
                    <p><span className="font-semibold">💸 Rent:</span> ৳{Number(post.rent_Amount).toLocaleString()}</p>
                    <p><span className="font-semibold">🛏 Room Type:</span> {post.room_Type}</p>
                    <p><span className="font-semibold">👤 Lifestyle:</span> {post.lifestyle}</p>
                    <p><span className="font-semibold">📝 Description:</span> {post.description}</p>
                    <p><span className="font-semibold">📅 Availability:</span> {post.availability ? "✅ Available" : "❌ Not Available"}</p>
                    <p><span className="font-semibold">📞 Contact:</span> {post.contact}</p>
                    <p><span className="font-semibold">👤 Posted By:</span> {post.user_name} ({post.user_email})</p>
                </div>
            </div>
            <div className=" flex items-center justify-center py-12">
                <Link to="/" className="btn btn-secondary w-fit">Back to Home Page</Link>
            </div>
        </section>
    );
};

export default RoommateDetails;
