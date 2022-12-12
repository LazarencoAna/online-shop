import React, { useState } from 'react';
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
import ProductActions from './product-actions';
import {
    useProductsQuery,
    useProductCategoriesQuery,
} from '../../../api/use-store-api';
export default function ProductListResults() {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const productsQuery = useProductsQuery();
    const productCategories = useProductCategoriesQuery();

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
                                <TableCell>Stock</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productsQuery.data
                                ?.slice(page * limit, page * limit + limit)
                                .map((product) => (
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
                                                        (i) => i != null
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
                                            {product.stocks
                                                ?.map((s) => s.quantity)
                                                .reduce((a, b) => a + b, 0) ??
                                                0}
                                        </TableCell>
                                        <TableCell>
                                            <ProductActions
                                                productId={product.productId}
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
