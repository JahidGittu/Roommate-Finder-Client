import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const WebInfo = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Main content area which expands */}
            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default WebInfo;