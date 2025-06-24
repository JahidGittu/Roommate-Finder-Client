import React from 'react';
import { Helmet } from 'react-helmet';

const PressKit = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 text-center">
            <Helmet>
                <title>PressKit | Roommate Finder</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-4">Press Kit</h2>
            <p className="text-gray-600 mb-6">
                Download our official logos, screenshots, and brand guidelines to use in press coverage or partnerships.
            </p>
            <a href="/assets/roommate-finder-presskit.zip" download className="btn btn-outline btn-secondary">
                📦 Download Press Kit
            </a>
        </div>
    );
};

export default PressKit;