import React, { useContext } from 'react';

import Loading from '../Components/Loading';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthProvider';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const location = useLocation()
    // console.log(location);

    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        return children
    }

    return (
        <Navigate state={location.pathname} to="/auth/login"></Navigate>
    );
};

export default PrivateRoutes;