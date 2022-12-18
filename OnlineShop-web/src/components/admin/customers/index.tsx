import { Box, Container } from '@mui/material';
import React from 'react';
import UserListResults from './user-list-results';
import UserListToolbar from './user-list-toolbar';
export default function Customers() {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth={false}>
                <UserListToolbar />
                <Box sx={{ mt: 3 }}>
                    <UserListResults />
                </Box>
            </Container>
        </Box>
    );
}
