import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
