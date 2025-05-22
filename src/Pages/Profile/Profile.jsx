import React, { useContext, useEffect } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';
import useProfile from '../../Provider/UserProfile';

const Profile = () => {
  const { user } = useContext(AuthContext);

  const { profileData, setProfileData } = useProfile();

  useEffect(() => {
    // Load existing profile if exists
    if (user?.email) {
      fetch(`http://localhost:3000/profile?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setProfileData(prev => ({
              ...prev,
              ...data,
            }));
          }
        });
    }
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData({ ...profileData, photo: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/profile', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(profileData),
    })
      .then(res => res.json())
      .then(data => {
        if (data?.acknowledged || data?.modifiedCount >= 0) {
          toast('🦄 Profile updated successfully!!', {
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
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center">👤 My Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <fieldset className="col-span-2 flex flex-col items-center justify-center bg-base-200 border-base-300 rounded-box border p-6 shadow-md">
            <label className="label text-lg font-semibold mb-2">Profile Picture</label>
            <div className="relative w-28 h-28 mb-4">
              {profileData.photo ? (
                <img
                  src={profileData.photo || user?.photoURL || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-28 h-28 object-cover rounded-full border-4 border-violet-400 shadow-lg"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl border-4 border-gray-400 shadow-inner">
                  N/A
                </div>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full max-w-xs" />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label">Full Name</label>
            <input
              name="fullName"
              type="text"
              value={profileData.fullName || user?.displayName || ''}
              onChange={handleChange}
              required
              className="input w-full"
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label">Gender</label>
            <select
              name="gender"
              value={profileData.gender}
              onChange={handleChange}
              required
              className="select w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 md:col-span-2">
            <label className="label">Hobbies (comma-separated)</label>
            <input
              name="hobbies"
              type="text"
              value={profileData.hobbies}
              onChange={handleChange}
              className="input w-full"
              placeholder="e.g., Reading, Travelling, Coding"
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label">Date of Birth</label>
            <input name="dob" type="date" value={profileData.dob} onChange={handleChange} required className="input w-full" />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label">Phone Number</label>
            <input name="phone" type="text" value={profileData.phone} onChange={handleChange} required className="input w-full" />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label">Email (Read Only)</label>
            <input name="email" type="email" value={profileData.email} readOnly className="input w-full bg-gray-800 cursor-not-allowed" />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 md:col-span-2">
            <label className="label">Address</label>
            <textarea name="address" rows="3" value={profileData.address} onChange={handleChange} required className="textarea w-full"></textarea>
          </fieldset>
        </div>

        <input type="submit" className="btn btn-primary w-full mt-6" value="Save / Update Profile" />
      </form>
    </div>
  );
};

export default Profile;
