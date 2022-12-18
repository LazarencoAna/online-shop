import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import OrderActions from './order-actions';
import { IOrder } from '../../../api/store-api';
import { productDeliveryMethodsQuery } from '../../../api/use-store-api';
export default function OrderListResults({ orders }: { orders: IOrder[] }) {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event: any) => {
        setLimit(event.target.value);
    };
    const productDeliveryMethods = productDeliveryMethodsQuery();

    const handlePageChange = (event: any, newPage: number) => {
        setPage(newPage);
    };

    return (
        <Card>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>User email</TableCell>
                                <TableCell>User account id</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Number of products</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Delivery type</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders
                                ?.slice(page * limit, page * limit + limit)
                                .map((order) => (
                                    <TableRow hover key={order.orderId}>
                                        <TableCell>{order.orderId}</TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                }}
                                            >
                                                <Typography
                                                    color="textPrimary"
                                                    variant="body1"
                                                >
                                                    {order.email}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {order.userAccountId}
                                        </TableCell>
                                        <TableCell>{order?.created}</TableCell>

                                        <TableCell>
                                            {order?.productOrders?.length}
                                        </TableCell>
                                        <TableCell>{order?.address}</TableCell>
                                        <TableCell>
                                            {productDeliveryMethods?.data?.find(
                                                (type) =>
                                                    type.deliveryTypeId ===
                                                    order?.delType
                                            )?.deliveryName ?? ''}
                                        </TableCell>
                                        <TableCell>
                                            <OrderActions
                                                orderId={order.orderId}
                                                userId={order.userAccountId}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={orders?.length ?? 0}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
}
