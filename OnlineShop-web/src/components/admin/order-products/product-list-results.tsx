import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Avatar,
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
import {
    useProductsQuery,
    useProductCategoriesQuery,
    useFetchUserOrdersQuery,
} from '../../../api/use-store-api';
import { useParams } from 'react-router-dom';
export default function ProductListResults() {
    const [limit, setLimit] = useState(10);

    const [products, setProducts] = useState<any>([]);
    const [page, setPage] = useState(0);
    let { userId, orderId } = useParams();
    const userOrders = useFetchUserOrdersQuery(userId);
    const productsQuery = useProductsQuery();
    const productCategories = useProductCategoriesQuery();

    useEffect(() => {
        if (
            productsQuery?.data &&
            productCategories.data &&
            userOrders.data &&
            orderId
        ) {
            let order = userOrders?.data.find(
                (order) => order.orderId == parseInt(orderId ?? '0')
            );
            if (order) {
                let orderProducts = order.productOrders;
                let prods = productsQuery?.data
                    .filter((prod) =>
                        orderProducts.some(
                            (op) => op.productId === prod.productId
                        )
                    )
                    .map((product) => {
                        let ordProd = orderProducts.find(
                            (op) => op.productId === product.productId
                        );
                        return { ...product, ...ordProd };
                    });
                setProducts(prods);
            }
        }
    }, [productsQuery?.data, productCategories.data, userOrders.data]);

    const handleLimitChange = (event: any) => {
        setLimit(event.target.value);
    };

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
                                <TableCell>Name</TableCell>
                                <TableCell>Code</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products
                                ?.slice(page * limit, page * limit + limit)
                                .map((product: any) => (
                                    <TableRow hover key={product.productId}>
                                        <TableCell>
                                            {product.productId}
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                }}
                                            >
                                                <Avatar
                                                    src={product.imagesUrl?.find(
                                                        (i: any) => i != null
                                                    )}
                                                    sx={{ mr: 2 }}
                                                >
                                                    {product.name}
                                                </Avatar>
                                                <Typography
                                                    color="textPrimary"
                                                    variant="body1"
                                                >
                                                    {product.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{product.barcode}</TableCell>
                                        <TableCell>
                                            {productCategories.data?.find(
                                                (pc) =>
                                                    pc.categoryId ==
                                                    product.categoryId
                                            )?.name ?? '....'}
                                        </TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>
                                            {product.size}
                                        </TableCell>
                                        <TableCell>
                                           {product.quantity}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={productsQuery.data?.length ?? 0}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
}
