import React, { useContext, useEffect } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';
import useProfile from '../../Provider/UserProfile';
import { Helmet } from 'react-helmet';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { profileData, setProfileData } = useProfile();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://roommate-finder-server-ten.vercel.app/profile?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setProfileData(prev => ({
            ...prev,
            ...data,
            email: user.email,
            fullName: data.fullName || user.displayName || '',
            photo: data.photo || user.photoURL || '',
          }));
        });
    }
  }, [user?.email, setProfileData, user?.displayName, user?.photoURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData(prev => ({ ...prev, photo: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...profileData, email: user.email };

    fetch('https://roommate-finder-server-ten.vercel.app/profile', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        if (data?.acknowledged || data?.modifiedCount >= 0) {
          toast('🦄 Profile updated successfully!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
            transition: Bounce,
          });
        }
      });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Helmet>
        <title>My Profile | Roommate Finder</title>
      </Helmet>
      <ToastContainer />
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary">👤 My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-4 bg-base-200 p-6 rounded-xl shadow-md">
          <label className="text-lg font-semibold">Profile Picture</label>
          <div className="relative w-28 h-28">
            {profileData.photo ? (
              <img
                src={profileData.photo}
                alt="Profile"
                className="w-28 h-28 object-cover rounded-full border-4 border-violet-400 shadow-lg"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl border-4 border-gray-400 shadow-inner">
                N/A
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>

        {/* Grid Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-base-200 p-4 rounded-xl border border-base-300">
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              name="fullName"
              type="text"
              value={profileData.fullName || ''}
              onChange={handleChange}
              required
              className="input w-full"
            />
          </div>

          <div className="bg-base-200 p-4 rounded-xl border border-base-300">
            <label className="block mb-1 font-medium">Gender</label>
            <select
              name="gender"
              value={profileData.gender || ''}
              onChange={handleChange}
              required
              className="select w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="bg-base-200 p-4 rounded-xl border border-base-300 md:col-span-2">
            <label className="block mb-1 font-medium">Hobbies (comma-separated)</label>
            <input
              name="hobbies"
              type="text"
              value={profileData.hobbies || ''}
              onChange={handleChange}
              className="input w-full"
              placeholder="e.g., Reading, Travelling, Coding"
            />
          </div>

          <div className="bg-base-200 p-4 rounded-xl border border-base-300">
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              name="dob"
              type="date"
              value={profileData.dob || ''}
              onChange={handleChange}
              required
              className="input w-full"
            />
          </div>

          <div className="bg-base-200 p-4 rounded-xl border border-base-300">
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              name="phone"
              type="text"
              value={profileData.phone || ''}
              onChange={handleChange}
              required
              className="input w-full"
            />
          </div>

          <div className="bg-base-200 p-4 rounded-xl border border-base-300">
            <label className="block mb-1 font-medium">Email (Read Only)</label>
            <input
              name="email"
              type="email"
              value={user?.email || ''}
              readOnly
              className="input w-full bg-gray-800 text-white cursor-not-allowed"
            />
          </div>

          <div className="bg-base-200 p-4 rounded-xl border border-base-300 md:col-span-2">
            <label className="block mb-1 font-medium">Address</label>
            <textarea
              name="address"
              rows="3"
              value={profileData.address || ''}
              onChange={handleChange}
              required
              className="textarea w-full"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4 text-lg"
        >
          Save / Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
