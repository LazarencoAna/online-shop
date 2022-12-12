import {
    iProductToProductModel,
    ProductModel,
    productModelToIProduct,
} from '../../../models/product.d';
import React from 'react';
import { Box, Container } from '@mui/system';
import { Typography } from '@mui/material';
import ProductFields from './product-fields';
import { useParams } from 'react-router-dom';
import { useFetchProductQuery } from '../../../api/use-store-api';
import { editProductAsync } from '../../../api/StoreApi';

export default function EditProduct() {
    let { productId } = useParams();
    const { data } = useFetchProductQuery(parseInt(productId ?? '0'));
    const onSubmit = (product: ProductModel) => {
        const productToSubmit = productModelToIProduct(product);
        productToSubmit.productId = parseInt(productId ?? '0');
        console.log(productToSubmit);
        editProductAsync(productToSubmit);
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
                <Box>
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
                            Edit product
                        </Typography>
                    </Box>
                    {data && (
                        <ProductFields
                            product={iProductToProductModel(data)}
                            onSubmitCallback={onSubmit}
                        />
                    )}
                </Box>
            </Container>
        </Box>
    );
}
