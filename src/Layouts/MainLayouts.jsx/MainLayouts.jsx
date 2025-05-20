import React from 'react';
import Navbar from '../../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer';

const MainLayouts = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayouts;