import React, { useContext, useState } from 'react';
import { UserContext } from '../providers/authProviders';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext)
    // console.log(user);
    if (loading) {
        return <progress className="progress w-56"></progress>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" replace={true} ></Navigate>;
};

export default PrivateRoute;