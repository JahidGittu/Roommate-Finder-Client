import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FaSignOutAlt, FaBell, FaMoon, FaCog } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="w-full bg-base-100 shadow-md px-4 py-3 flex justify-between items-center z-40">

      {/* Left Side */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-violet-600">Dashboard Panel</h2>


      </div>


      <div className='flex gap-5'>
        <NavLink className="btn btn-accent" to="/">Home</NavLink>

        <NavLink className="btn btn-secondery" to="/all-listing">All Listing</NavLink>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">


        {/* Notifications */}
        <div className="relative">
          <button className="btn btn-sm btn-ghost text-xl" title="Notifications">
            <FaBell />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">9</span>
        </div>

        {/* Theme Toggle */}
        <button className="btn btn-sm btn-ghost text-xl" title="Toggle Theme">
          <FaMoon />
        </button>


        {/* User Profile */}
        {user?.photoURL && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border">
                <img src={user.photoURL} alt="user" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <p className="font-semibold">{user.displayName}</p>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
