import React from 'react';
import { Helmet } from 'react-helmet';

const Jobs = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <Helmet>
                <title>Carreer | Roommate Finder</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-4 text-center">Jobs</h2>
            <p className="text-gray-600 mb-6 text-center">
                We're always looking for passionate people to join our team. Check out the positions below and apply if you're a good fit!
            </p>
            <div className="space-y-4">
                <div className="p-4 border rounded-lg shadow">
                    <h3 className="text-xl font-semibold">Frontend Developer</h3>
                    <p className="text-sm text-gray-500">Remote • Full Time</p>
                </div>
                <div className="p-4 border rounded-lg shadow">
                    <h3 className="text-xl font-semibold">Community Manager</h3>
                    <p className="text-sm text-gray-500">Dhaka Office • Contract</p>
                </div>
            </div>
        </div>
    );
};

export default Jobs;