import React from 'react';
import Navbar from '../../Components/Navbar';
import Banner from '../../Components/Banner';
import FeaturedRoommates from '../../Components/FeaturedRoommates';
import HowItWorks from '../../Components/HowItWorks';
import WhyChooseUs from '../../Components/WhyChooseUs';
import UserTestimonials from '../../Components/UserTestimonials';
import RecentBooked from '../../Components/RecentBooked';
import { Helmet } from 'react-helmet';


const Home = () => {
    return (
        <div>

            <Helmet>
                <title>Home | Roommate Finder</title>
            </Helmet>

            <Banner />
            <FeaturedRoommates />
            <HowItWorks />
            <WhyChooseUs />
            <RecentBooked />
            <UserTestimonials />

        </div>
    );
};

export default Home;