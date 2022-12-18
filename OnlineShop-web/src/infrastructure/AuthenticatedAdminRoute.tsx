import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../common/auth.hook';
import { CustomState } from '../common/route.types';

export default function AuthenticatedAdminRoute() {
    const auth = useAuth();
    const location = useLocation();

    const { from } = (location?.state ?? { from: null }) as CustomState;
    if (from?.pathname) {
        return <Navigate to={from?.pathname} state={{}} />;
    }

    if (!auth?.user && !auth?.userProfile) {
        return (
            <Navigate
                to="/login"
                state={{ from: { pathname: location.pathname } }}
            />
        );
    }

    return auth?.userProfile?.role === 'operator' ? (
        <Outlet />
    ) : (
        <Navigate
            to="/sneakers"
            state={{ from: { pathname: location.pathname } }}
        />
    );
}
