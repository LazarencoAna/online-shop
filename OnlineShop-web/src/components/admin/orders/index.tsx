import { Box, Container } from '@mui/material';
import React from 'react';
import OrderListResults from './order-list-results';
import OrderListToolbar from './order-list-toolbar';
import {
    useAllOrdersQuery,
    useFetchUserOrdersQuery,
} from '../../../api/use-store-api';
import { useParams } from 'react-router-dom';
export default function Orders() {
    let { userId } = useParams();
    const ordersQuery = useAllOrdersQuery();
    const userOrders = useFetchUserOrdersQuery(userId);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth={false}>
                <OrderListToolbar />
                <Box sx={{ mt: 3 }}>
                    <OrderListResults
                        orders={
                            (userId ? userOrders.data : ordersQuery.data) ?? []
                        }
                    />
                </Box>
            </Container>
        </Box>
    );
}
