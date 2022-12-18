import { Box, Container, Typography } from '@mui/material';
import { ProductModel } from '../../../models/product';
import React from 'react';
import ProductFields from './product-fields';
import { IProduct, IStock } from '../../../api/store-api';
import { addProductAsync } from '../../../api/StoreApi';

export default function AddProduct(props: any) {
    const onSubmit = (product: ProductModel) => {
        const productToSubmit: IProduct = {
            productId: 0,
            name: product.name ?? '',
            descriptions: product.descriptions ?? '',
            metaKeywords: product.metaKeywords ?? '',
            price: product.price ?? 0,
            discountAmount: product.discountAmount ?? 0,
            vatAmount: product.vatAmount ?? 0,
            barcode: product.barcode ?? '',
            categoryId: product.categoryId ?? 0,
            deliveryTypes: product.deliveryMethods,
            imagesUrl: product.imagesUrl,
            stocks:
                product.stock?.map((stock) => {
                    var s: IStock = {
                        stockId: stock.id,
                        quantity: stock.quantity,
                        size: stock.size,
                        color: stock.color,
                    };
                    return s;
                }) ?? [],
        };

        console.log(productToSubmit);
        addProductAsync(productToSubmit);
    };
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth={false}>
                <Box {...props}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            m: -1,
                        }}
                    >
                        <Typography sx={{ m: 1 }} variant="h4">
                            Add new product
                        </Typography>
                    </Box>
                    <ProductFields onSubmitCallback={onSubmit} />
                </Box>
            </Container>
        </Box>
    );
}
