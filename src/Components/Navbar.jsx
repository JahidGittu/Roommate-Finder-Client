import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '/Logo.png'
import './Navbar.css'

const Navbar = () => {
    const links = <>

        <NavLink to="/">Home</NavLink>
        <NavLink to="/find-roomate">Add to Find Roommate</NavLink>
        <NavLink to="/browse-listing">Browse Listing</NavLink>
        <NavLink to="/my-listing">My Listings</NavLink>

    </>


    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <img className='w-16 h-16 object-cover rounded-2xl' src={logo} alt="" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <img className='w-16 h-16 object-cover rounded-2xl hidden lg:block' src={logo} alt="" />
                <div className="btn btn-ghost text-xl py-10 text-violet-500 hover:*:text-white duration-1000 font-semibold flex flex-col items-center">
                    <span className=''>Roommate</span>
                    <span className='text-blue-500'>Finder</span>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg flex gap-5">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end space-x-5">
                <Link className='btn btn-outline btn-accent' to="/login">Login</Link>
                <Link className='btn btn-primary' to="/signup">Signup</Link>
            </div>
        </div>
    );
};

export default Navbar;