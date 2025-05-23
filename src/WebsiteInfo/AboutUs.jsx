import React from 'react';
import { Helmet } from 'react-helmet';

const AboutUs = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 text-center">
            <Helmet>
                <title>AboutUs | Roommate Finder</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600">
                Roommate Finder is a platform dedicated to helping individuals find compatible roommates based on location, budget, lifestyle preferences, and shared interests.
                Our goal is to make shared living safe, easy, and enjoyable.
            </p>
        </div>
    );
};

export default AboutUs;