import React, { useRef } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import StockTable from './stock-table';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    ImageModel,
    ProductModel,
    StockModel,
} from '../../../models/product.d';
import ProductCategorySelector from './product-category-selector';
import ProductDeliverySelector from './product-delivery-selector';
import { IDeliveryMethod } from '../../../api/store-api';
import ProductImages from './product-images';

interface ProductFieldsProps {
    product?: ProductModel;
    onSubmitCallback?: (product: ProductModel) => void;
}
export default function ProductFields({
    product,
    onSubmitCallback = (product: ProductModel) => {},
    ...props
}: ProductFieldsProps) {
    const [stock, setStock] = React.useState<StockModel[]>([]);
    const [images, setImages] = React.useState<string[]>([]);
    const categoryId = useRef(0);
    const deliveryMethods = useRef<IDeliveryMethod[]>([]);

    const formik = useFormik<ProductModel>({
        initialValues: {
            ...product,
        },
        validationSchema: Yup.object({
            name: Yup.string().max(562).required('Product name is required'),
            // provider: Yup.string()
            //     .max(100)
            //     .required('Product provider is required'),
            descriptions: Yup.string()
                .max(1000)
                .required('Product descriptions is required'),
            metaKeywords: Yup.string()
                .max(1000)
                .required('Product meta keywords is required'),
            price: Yup.number().required('Product price is required'),
            discountAmount: Yup.number(),
            //discountPercent: Yup.number(),
            vatAmount: Yup.number(),
            barcode: Yup.string()
                .max(100)
                .required('Product category is required'),
        }),

        onSubmit: () => {
            const product: ProductModel = {
                ...formik.values,
                categoryId: categoryId.current,
                deliveryMethods: deliveryMethods.current,
                stock: stock,
                imagesUrl: images,
            };
            onSubmitCallback(product);
        },
    });
    return (
        <Box {...props} sx={{ mt: 3 }}>
            <Card>
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid
                            container
                            rowSpacing={2}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            <Grid item xs={6} md={4}>
                                <TextField
                                    required
                                    id="name-input"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.name &&
                                            formik.errors.name
                                    )}
                                    helperText={
                                        formik.touched.name &&
                                        formik.errors.name
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                display="flex"
                                spacing={4}
                            >
                                <ProductCategorySelector
                                    prSelectedCategoryId={product?.categoryId}
                                    onChangeCategoryId={(catId) => {
                                        categoryId.current = catId;
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    required
                                    id="description-input"
                                    label="Description"
                                    variant="outlined"
                                    name="descriptions"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.descriptions &&
                                            formik.errors.descriptions
                                    )}
                                    helperText={
                                        formik.touched.descriptions &&
                                        formik.errors.descriptions
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.descriptions}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    required
                                    id="meta-input"
                                    label="Meta Keywords"
                                    variant="outlined"
                                    name="metaKeywords"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.metaKeywords &&
                                            formik.errors.metaKeywords
                                    )}
                                    helperText={
                                        formik.touched.metaKeywords &&
                                        formik.errors.metaKeywords
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.metaKeywords}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Divider
                                    orientation="horizontal"
                                    variant="fullWidth"
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography sx={{ m: 1 }} variant="h5">
                                    Pricing
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    required
                                    id="price-input"
                                    label="Price"
                                    name="price"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.price &&
                                            formik.errors.price
                                    )}
                                    helperText={
                                        formik.touched.price &&
                                        formik.errors.price
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="number"
                                    value={formik.values.price}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    required
                                    id="discount-amount-input"
                                    label="Discount Amount"
                                    variant="outlined"
                                    name="discountAmount"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.discountAmount &&
                                            formik.errors.discountAmount
                                    )}
                                    helperText={
                                        formik.touched.discountAmount &&
                                        formik.errors.discountAmount
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="number"
                                    value={formik.values.discountAmount}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    required
                                    id="vat-amount-input"
                                    label="Vat Amount"
                                    variant="outlined"
                                    name="vatAmount"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.vatAmount &&
                                            formik.errors.vatAmount
                                    )}
                                    helperText={
                                        formik.touched.vatAmount &&
                                        formik.errors.vatAmount
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="number"
                                    value={formik.values.vatAmount}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    required
                                    id="barcode-input"
                                    label="Barcode"
                                    variant="outlined"
                                    name="barcode"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.barcode &&
                                            formik.errors.barcode
                                    )}
                                    helperText={
                                        formik.touched.barcode &&
                                        formik.errors.barcode
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.barcode}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <ProductDeliverySelector
                                    checkedDeliveryMethods={
                                        product?.deliveryMethods
                                    }
                                    onChangeDeliveryMethods={(deliveries) => {
                                        deliveryMethods.current = deliveries;
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Divider
                                    orientation="horizontal"
                                    variant="fullWidth"
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography sx={{ m: 1 }} variant="h5">
                                    Inventory
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <StockTable
                                    onChangeStock={(stock) => {
                                        setStock(stock);
                                    }}
                                    initStock={product?.stock}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography sx={{ m: 1 }} variant="h5">
                                    Images
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <ProductImages
                                    onChangeImages={(images) => {
                                        setImages(images);
                                    }}
                                    initImages={product?.imagesUrl}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Divider
                                    orientation="horizontal"
                                    variant="fullWidth"
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={12}
                                container
                                justifyContent="flex-end"
                            >
                                <Button color="error" variant="contained">
                                    Reset
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    Save product
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}
