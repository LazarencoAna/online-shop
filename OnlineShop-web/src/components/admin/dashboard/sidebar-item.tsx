import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, ListItem } from '@mui/material';

interface SidebarItemProps {
    icon: JSX.Element;
    href: string;
    title: string;
}

export default function SidebarItem({ icon, href, title }: SidebarItemProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const active =
        location.pathname === href || title == 'Dashboard' ? true : false;

    return (
        <ListItem
            disableGutters
            sx={{
                display: 'flex',
                mb: 0.5,
                py: 0,
                px: 2,
            }}
        >
            <Button
                onClick={() => {
                    navigate(href);
                }}
                component="a"
                startIcon={icon}
                disableRipple
                sx={{
                    backgroundColor: active ? 'rgba(255,255,255, 0.08)' : '',
                    borderRadius: 1,
                    color: active ? 'secondary.main' : 'neutral.300',
                    fontWeight: active ? 'bold' : '',
                    justifyContent: 'flex-start',
                    px: 3,
                    textAlign: 'left',
                    textTransform: 'none',
                    width: '100%',
                    '& .MuiButton-startIcon': {
                        color: active ? 'secondary.main' : 'neutral.400',
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255, 0.08)',
                    },
                    textDecoration: 'none',
                }}
            >
                <Box sx={{ flexGrow: 1 }}>{title}</Box>
            </Button>
        </ListItem>
    );
}
