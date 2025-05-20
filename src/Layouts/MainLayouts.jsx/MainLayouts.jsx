import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import Banner from '../../Components/Banner';
import Home from '../../Pages/Home/Home';

const MainLayouts = () => {
    return (
        <div>
            <Navbar/>
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayouts;