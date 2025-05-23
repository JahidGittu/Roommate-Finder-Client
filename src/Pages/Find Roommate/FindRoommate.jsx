import React, { useContext, useEffect, useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';

const FindRoommate = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/profile?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setProfileData(data);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    useEffect(() => {
        if (!loading && profileData) {
            const isComplete = profileData.photo

            if (!isComplete) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Incomplete Profile!',
                    text: 'Please update your profile to post a roommate request.',
                    showCancelButton: true,
                    confirmButtonText: 'Update Profile',
                    cancelButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/my-profile');
                    }
                });
            }
        }
    }, [loading, profileData, navigate]);

    const toastTitle = (
        <div className='flex justify-start items-center gap-4'>
            <span>🦄</span>
            <span>Your roommate request has been added!</span>
        </div>
    );

    const handleAddRequest = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const requestData = Object.fromEntries(formData.entries());

        // Extra check before submit
        const isComplete = profileData.photo

        if (!isComplete) {
            Swal.fire({
                icon: 'error',
                title: 'Incomplete Profile',
                text: 'Please complete your profile before submitting.',
            });
            return;
        }

        requestData.availability = requestData.availability === "true";

        fetch('http://localhost:3000/requests', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast(toastTitle, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                form.reset();
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to post',
                    text: err.message,
                });
            });

    }

    return (
        <div>
            <ToastContainer />
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">📝 Post Your Roommate Request</h2>
                <form onSubmit={handleAddRequest}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Title</label>
                            <input name='title' type="text" required className="input w-full focus:outline-none focus:border-gray-600" placeholder="Looking for a roommate in NYC" />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Location</label>
                            <input name='location' type="text" required className="input w-full focus:outline-none focus:border-gray-600" placeholder="Location" />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Rent Amount</label>
                            <input name='rent_Amount' type="number" required className="input w-full focus:outline-none focus:border-gray-600" />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Room Type</label>
                            <input name='room_Type' type="text" required className="input w-full focus:outline-none focus:border-gray-600" placeholder="Single, Shared, etc." />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Lifestyle Preferences</label>
                            <textarea name="lifestyle" rows="5" required placeholder='Muttaki, Friendly, etc.' className='w-full border border-gray-500 focus:outline-none rounded-sm p-2'></textarea>
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Description</label>
                            <textarea name="description" rows="5" required placeholder='আমি একজন ছাত্র। ঢাকায় লেখা-পড়া করি, এখন রুমের খরচ কমানোর জন্য একজন রুমমেট প্রয়োজন।' className='w-full border border-gray-500 focus:outline-none rounded-sm p-2'></textarea>
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Contact Info</label>
                            <input name='contact' type="text" required className="input w-full focus:outline-none focus:border-gray-600" placeholder="+880 1234-567890" />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Availability</label>
                            <select name="availability" className="select w-full focus:outline-none focus:border-gray-600">
                                <option value="true">Available</option>
                                <option value="false">Not Available</option>
                            </select>
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">User Email</label>
                            <input name='user_email' type="text" readOnly className="input w-full bg-gray-600 focus:outline-none focus:border-gray-600" placeholder='User Email' value={user?.email || ''} />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">User Name</label>
                            <input name='user_name' type="text" readOnly className="input w-full bg-gray-600 focus:outline-none focus:border-gray-600" placeholder='User Name' value={user?.displayName || ''} />
                        </fieldset>
                    </div>
                    <input type="submit" className="btn btn-full w-full focus:outline-none focus:border-gray-600 my-6" value="Add your Requirements" />
                </form>
            </div>
        </div>
    );
};

export default FindRoommate;
