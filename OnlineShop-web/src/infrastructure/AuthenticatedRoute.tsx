import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../common/auth.hook';
import { CustomState } from '../common/route.types';

export default function AuthenticatedRoute() {
    const auth = useAuth();
    const location = useLocation();

    const { from } = (location?.state ?? { from: null }) as CustomState;
    if (from?.pathname) {
        return <Navigate to={from?.pathname} state={{}} />;
    }

    return auth?.user ? (
        <Outlet />
    ) : (
        <Navigate
            to="/login"
            state={{ from: { pathname: location.pathname } }}
        />
    );
}
