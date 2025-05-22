import React from 'react';
import Navbar from '../../Components/Navbar';
import Banner from '../../Components/Banner';
import FeaturedRoommates from '../../Components/FeaturedRoommates';
import HowItWorks from '../../Components/HowItWorks';
import WhyChooseUs from '../../Components/WhyChooseUs';
import UserTestimonials from '../../Components/UserTestimonials';
import RecentBooked from '../../Components/RecentBooked';


const Home = () => {
    return (
        <div>
            
            <Banner/>
            <FeaturedRoommates/>
            <HowItWorks/>
            <WhyChooseUs/>
            <RecentBooked/>
            <UserTestimonials/>

        </div>
    );
};

export default Home;