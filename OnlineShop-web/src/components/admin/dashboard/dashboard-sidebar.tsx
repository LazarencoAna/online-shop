import React from 'react';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../../../asset/inline/icons/chart-bar';
import { Cog as CogIcon } from '../../../asset/inline/icons/cog';
import { Lock as LockIcon } from '../../../asset/inline/icons/lock';
import { Selector as SelectorIcon } from '../../../asset/inline/icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../../../asset/inline/icons/shopping-bag';
import { User as UserIcon } from '../../../asset/inline/icons/user';
import { UserAdd as UserAddIcon } from '../../../asset/inline/icons/user-add';
import { Users as UsersIcon } from '../../../asset/inline/icons/users';
import { XCircle as XCircleIcon } from '../../../asset/inline/icons/x-circle';
import SidebarItem from './sidebar-item';

const items = [
    {
        href: '/',
        icon: <ChartBarIcon fontSize="small" />,
        title: 'Dashboard',
    },
    {
        href: '/customers',
        icon: <UsersIcon fontSize="small" />,
        title: 'Customers',
    },
    {
        href: '/products',
        icon: <ShoppingBagIcon fontSize="small" />,
        title: 'Products',
    },
    {
        href: '/account',
        icon: <UserIcon fontSize="small" />,
        title: 'Account',
    },
    {
        href: '/settings',
        icon: <CogIcon fontSize="small" />,
        title: 'Settings',
    },
    {
        href: '/login',
        icon: <LockIcon fontSize="small" />,
        title: 'Login',
    },
    {
        href: '/register',
        icon: <UserAddIcon fontSize="small" />,
        title: 'Register',
    },
    {
        href: '/404',
        icon: <XCircleIcon fontSize="small" />,
        title: 'Error',
    },
];

interface DashboardSidebarProps {
    onClose: Function;
    open: boolean;
}

export default function DashboardSidebar({
    open,
    onClose,
}: DashboardSidebarProps) {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false,
    });

    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <div>
                    <Box sx={{ px: 2 }}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                px: 3,
                                py: '11px',
                                borderRadius: 1,
                            }}
                        >
                            <div>
                                <Typography color="inherit" variant="subtitle1">
                                    Acme Inc
                                </Typography>
                                <Typography color="neutral.400" variant="body2">
                                    Your tier : Premium
                                </Typography>
                            </div>
                            <SelectorIcon
                                sx={{
                                    color: 'neutral.500',
                                    width: 14,
                                    height: 14,
                                }}
                            />
                        </Box>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3,
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <SidebarItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        />
                    ))}
                </Box>
                <Divider sx={{ borderColor: '#2D3748' }} />
            </Box>
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        color: '#FFFFFF',
                        width: 280,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={() => onClose()}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.900',
                    color: '#FFFFFF',
                    width: 280,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
}
