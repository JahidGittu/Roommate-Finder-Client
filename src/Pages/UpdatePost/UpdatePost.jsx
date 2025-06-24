import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Components/Loading";
import { Helmet } from "react-helmet";

const UpdatePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        rent_Amount: "",
        room_Type: "",
        lifestyle: "",
        description: "",
        contact_Number: "",
        availability: true,
        user_name: user?.displayName || "",
        user_email: user?.email || "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            toast.error("You must be logged in to update a post.");
            navigate("/login");
            return;
        }

        fetch(`https://roommate-finder-server-ten.vercel.app/requests/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch post");
                return res.json();
            })
            .then((data) => {
                setFormData({
                    title: data.title || "",
                    location: data.location || "",
                    rent_Amount: data.rent_Amount || "",
                    room_Type: data.room_Type || "",
                    lifestyle: data.lifestyle || "",
                    description: data.description || "",
                    contact_Number: data.contact_Number || "",
                    availability: data.availability ?? true,
                    user_name: user.displayName || "",
                    user_email: user.email || "",
                });
                setLoading(false);
            })
            .catch(() => {
                toast.error("Error fetching post data");
            });
    }, [id, user, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await Swal.fire({
                title: "আপনি কি সত্যিই আপডেট করতে চান?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "হ্যাঁ, আপডেট করো",
                cancelButtonText: "না, বাতিল করো",
            });

            if (result.isConfirmed) {
                const res = await fetch(`https://roommate-finder-server-ten.vercel.app/requests/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                if (!res.ok) throw new Error("Update failed");

                const data = await res.json();

                if (data.modifiedCount > 0 || data.updated) {
                    Swal.fire({
                        title: "সফলভাবে আপডেট হয়েছে!",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    // setTimeout(() => {
                    //     navigate(-1); // Or navigate("/my-listings");
                    // }, 2100);
                }
                else {
                    await Swal.fire("তুমি তো কিছুই পরিবর্তন করোনি", "", "info");
                }
            }
        } catch (error) {
            Swal.fire("আপডেট ব্যর্থ হয়েছে", error.message || "", "error");
        }
    };

    if (loading) return <div className="flex justify-center py-10"><Loading /></div>;

    return (
        <section className="max-w-4xl mx-auto p-6 border border-gray-600 rounded shadow">
            <Helmet>
                <title>Update Post | Roommate Finder</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-6">Update Roommate Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block font-medium mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Rent Amount */}
                <div>
                    <label className="block font-medium mb-1">Rent Amount</label>
                    <input
                        type="number"
                        name="rent_Amount"
                        value={formData.rent_Amount}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Room Type */}
                <div>
                    <label className="block font-medium mb-1">Room Type</label>
                    <input
                        type="text"
                        name="room_Type"
                        value={formData.room_Type}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Lifestyle */}
                <div>
                    <label className="block font-medium mb-1">Lifestyle</label>
                    <input
                        type="text"
                        name="lifestyle"
                        value={formData.lifestyle}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Contact Number */}
                <div>
                    <label className="block font-medium mb-1">Contact Number</label>
                    <div className="flex items-center border rounded px-3 py-2">
                        <span className="mr-2 text-gray-500">+88</span>
                        <input
                            type="text"
                            name="contact_Number"
                            value={formData.contact_Number}
                            onChange={handleChange}
                            required
                            className="w-full outline-none"
                        />
                    </div>
                </div>

                {/* Availability */}
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="availability"
                            checked={formData.availability}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Available
                    </label>
                </div>

                {/* User Name */}
                <div>
                    <label className="block font-medium mb-1">User Name</label>
                    <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        readOnly
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* User Email */}
                <div>
                    <label className="block font-medium mb-1">User Email</label>
                    <input
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        readOnly
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn btn-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition"
                >
                    Update
                </button>
            </form>
        </section>
    );
};

export default UpdatePost;
