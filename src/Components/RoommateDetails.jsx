import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loading from "./Loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const RoommateDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetch(`http://localhost:3000/requests/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      });
  }, [id]);

  const handleLike = () => setLiked(!liked);

  const handleConfirmBooking = async () => {
    if (!post.availability) {
      return MySwal.fire("❌ ইতোমধ্যে বুকড", "এই রুমটি অন্য কেউ বুক করে ফেলেছে", "warning");
    }

    const prompt = await MySwal.fire({
      title: "আপনি কি রিভিউ দিতে আগ্রহী?",
      showDenyButton: true,
      confirmButtonText: "জি হ্যাঁ",
      denyButtonText: "না, ধন্যবাদ",
      icon: "question",
      customClass: {
        confirmButton: "bg-blue-600 text-white px-4 py-2 rounded",
        denyButton: "bg-gray-300 text-black px-4 py-2 rounded",
      },
    });

    let review = "";
    if (prompt.isConfirmed) {
      const { value } = await MySwal.fire({
        title: "✍️ রিভিউ দিন",
        input: "textarea",
        inputLabel: "আপনার অভিজ্ঞতা লিখুন",
        inputPlaceholder: "এখানে লিখুন...",
        inputAttributes: {
          "aria-label": "Type your review here"
        },
        showCancelButton: true,
        confirmButtonText: "সাবমিট রিভিউ",
        cancelButtonText: "বাতিল",
      });

      if (!value) return;
      review = value;
    }

    const bookingData = {
      requestId: post._id,
      title: post.title,
      user_email: post.user_email,
      user_name: post.user_name,
      contact: post.contact,
      location: post.location,
      rent_Amount: post.rent_Amount,
      availability: post.availability,
      review: review,
      bookingTime: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      });

      if (res.ok) {
        await MySwal.fire("🎉 বুকিং সফলভাবে কনফার্ম হয়েছে!", "", "success");
      } else {
        throw new Error("বুকিং এ সমস্যা হয়েছে");
      }
    } catch (error) {
      console.error(error);
      MySwal.fire("❌ বুকিং ব্যর্থ হয়েছে", error.message, "error");
    }
  };

  if (loading) return <Loading />;
  if (!post) return <p className="text-center text-red-500 mt-10">Post not found</p>;

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

        <div className="mt-6 flex justify-end">
          <button
            className={`px-6 py-2 rounded-lg transition-all font-semibold ${
              post.availability
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
            onClick={handleConfirmBooking}
            disabled={!post.availability}
          >
            {post.availability ? "✅ Confirm Booking" : "❌ Already Booked"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center py-12">
        <Link to="/" className="btn btn-secondary w-fit">Back to Home Page</Link>
      </div>
    </section>
  );
};

export default RoommateDetails;
