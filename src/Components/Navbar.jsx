import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import logo from '/Logo.png';
import { AuthContext } from '../Provider/AuthProvider';
import { FaSignOutAlt } from 'react-icons/fa';
import { AiFillSun, AiFillMoon } from 'react-icons/ai';
import useProfile from '../Provider/UserProfile';

const Navbar = () => {
    const { user, logout, loading } = useContext(AuthContext);
    const [showSetting, setShowSetting] = useState(false);
    const navigate = useNavigate();
    const { profileData } = useProfile();

    // থিম স্টেট (light/dark)
    const [theme, setTheme] = useState('light');

    // Dropdown-এর বাইরের ক্লিক detect করার জন্য ref ও event handler
    const dropdownRef = useRef(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            setTheme(savedTheme);
        } else {
            document.documentElement.setAttribute('data-theme', 'mytheme');
            setTheme('light');
        }
    }, []);


    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowSetting(false);
            }
        }
        if (showSetting) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSetting]);

    const toggleTheme = () => {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'mytheme');
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }
    };


    const links = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'text-violet-600 font-semibold' : undefined)}
            >
                Home
            </NavLink>
            <NavLink
                to="/add-listing-to-find-roommate"
                className={({ isActive }) => (isActive ? 'text-violet-600 font-semibold' : undefined)}
            >
                Add to Find Roommate
            </NavLink>
            <NavLink
                to="/browse-listing"
                className={({ isActive }) => (isActive ? 'text-violet-600 font-semibold' : undefined)}
            >
                Browse Listing
            </NavLink>
            <NavLink
                to="/my-listings"
                className={({ isActive }) => (isActive ? 'text-violet-600 font-semibold' : undefined)}
            >
                My Listings
            </NavLink>
        </>
    );

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
            {/* Navbar start */}
            <div className="navbar-start">
                {/* Mobile dropdown */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden p-0" aria-label="Open menu">
                        <img className="w-14 h-14 object-cover rounded-2xl" src={logo} alt="Logo" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>

                {/* Logo & Title */}
                <img
                    className="w-14 h-14 object-cover rounded-2xl hidden lg:block"
                    src={logo}
                    alt="Logo"
                />
                <div className="btn btn-ghost text-xl py-10 text-violet-500 hover:text-violet-700 duration-300 font-semibold flex flex-col items-center">
                    <span>Roommate</span>
                    <span className="text-blue-500">Finder</span>
                </div>
            </div>

            {/* Navbar center */}
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 text-lg flex gap-5">{links}</ul>
            </div>

            {/* Navbar end */}
            <div className="navbar-end space-x-2 relative min-h-[56px] flex items-center justify-center">

                {/* থিম টগল বাটন */}
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle Dark/Light Theme"
                    title="Toggle Dark/Light Theme"
                    className="text-3xl text-yellow-500 dark:text-gray-300 focus:outline-none transition-colors duration-300"
                >
                    {theme === 'light' ? <AiFillSun color='orange' /> : <AiFillMoon color='#2B4D58' />}
                </button>

                {loading ? (
                    <div className="flex justify-center items-center w-full">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                ) : user ? (
                    <div
                        className="flex items-center gap-1 cursor-pointer select-none"
                        ref={dropdownRef}
                    >
                        {user?.photoURL ? (
                            <img
                                onClick={() => setShowSetting((prev) => !prev)}
                                src={profileData.photo || user.photoURL}
                                alt="Profile"
                                className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-300"
                            />
                        ) : (
                            <div
                                onClick={() => setShowSetting((prev) => !prev)}
                                className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-400 text-white flex items-center justify-center border border-gray-300 font-bold"
                            >
                                U
                            </div>
                        )}

                        {showSetting && (
                            <div className="absolute right-0 top-16 bg-base-300 text-white shadow-md rounded p-4 z-50 w-56 border">
                                <p className="font-bold truncate">
                                    {profileData.fullName || user?.displayName || 'No Name'}
                                </p>
                                <p className="truncate text-gray-50">{user?.email}</p>

                                {/* Profile Button */}
                                <Link
                                    to="/my-profile"
                                    className="btn btn-sm btn-info mt-2 w-full flex items-center gap-2 justify-center"
                                >
                                    My Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="btn btn-warning btn-sm mt-3 w-full flex items-center gap-2 justify-center"
                                >
                                    Logout <FaSignOutAlt />
                                </button>
                            </div>
                        )}

                        <button onClick={handleLogout} className="btn btn-warning" aria-label="Logout">
                            Logout <FaSignOutAlt />
                        </button>
                    </div>
                ) : (
                    <>
                        <Link
                            className="btn btn-outline btn-accent"
                            to="/auth/login"
                            aria-label="Login"
                        >
                            Login
                        </Link>
                        <Link
                            className="btn btn-primary"
                            to="/auth/signup"
                            aria-label="Signup"
                        >
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
