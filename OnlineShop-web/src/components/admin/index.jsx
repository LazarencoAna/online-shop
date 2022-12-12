import React from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardLayout } from './dashboard';

export default function Admin() {
    return (
        <>
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </>
    );
}
