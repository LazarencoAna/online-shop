import * as React from 'react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useEffect, useState } from 'react';
import { ICartItem, IProduct } from '../../../api/store-api';
import useCart from '../hooks/useCart';

export default function CardPopupInfo({closePopup, card }: { card: IProduct, closePopup: Function }) {
    const [size, setSize] = React.useState('');
    const cart = useCart();

    const [cartItem, setCartItem] = useState<ICartItem | any>(undefined);
    const [sizeStock, setSizeStock] = React.useState({
        stockSize: 0,
        stockCount: 0,
    });
    const [count, setCount] = useState('');
    const [sizes, setSizes] = useState<any>([]);
    useEffect(() => {
        if (count && size)
            setCartItem({
                productId: card.productId,
                quantity: parseInt(count),
                size: parseInt(size),
            });
        else {
            setCartItem(undefined);
        }
    }, [count, size]);

    useEffect(() => {
        const sizes2 = card.stocks?.map((stock: any) => {
            let stockSize = stock.size;
            let stockCount = stock.quantity;
            return { stockSize: stockSize, stockCount: stockCount };
        });
        setSizes(sizes2 ?? []);
        console.log(sizes2);
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setSize(event.target.value as string);
        let correctSize = sizes.find(
            (size: any) => size.stockSize == (event.target.value as string)
        );
        if (correctSize) setSizeStock(correctSize);
        setCount('');
    };

    const handleChangeCount = (event: SelectChangeEvent) => {
        setCount(event.target.value as string);
    };

    const cartHandler = () =>
    {
       cart.addToCartHandler({
            productId: card.productId,
            quantity: parseInt(count),
            size: parseInt(size),
        }); 
        closePopup();
    }
        

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Carousel>
                    {card.imagesUrl?.map((url: any) => (
                        <img src={url} className="card-button__images" />
                    ))}
                </Carousel>
            </Grid>
            <Grid item xs={6}>
                <Grid
                    xs={12}
                    container
                    spacing={{ xs: 2, md: 3 }}
                    direction="column"
                    justifyContent="space-between"
                    sx={{ height: 1 }}
                >
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <p>{card.name}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <hr className="divider" />
                            </Grid>
                            <Grid item xs={12}>
                                <p>{card.descriptions}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <hr className="divider" />
                            </Grid>

                            <Grid item xs={12} direction="row" display="flex">
                                <Box
                                    sx={{
                                        minWidth: 70,
                                        maxWidth: 120,
                                    }}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="size-select-label">
                                            Size
                                        </InputLabel>
                                        <Select
                                            labelId="size-select-label"
                                            id="size-select"
                                            value={size}
                                            label="Size"
                                            onChange={handleChange}
                                        >
                                            {sizes.map((size1: any) => (
                                                <MenuItem
                                                    value={size1.stockSize}
                                                >
                                                    {size1.stockSize}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box
                                    sx={{
                                        minWidth: 120,
                                        maxWidth: 220,
                                        paddingLeft: 3,
                                    }}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="count-select-label">
                                            Count
                                        </InputLabel>
                                        <Select
                                            labelId="count-select-label"
                                            id="count-select"
                                            value={count}
                                            label="Count"
                                            onChange={handleChangeCount}
                                        >
                                            {Array.from(
                                                {
                                                    length: sizeStock.stockCount,
                                                },
                                                (v, k) => k + 1
                                            ).map((quantity: any) => (
                                                <MenuItem value={quantity}>
                                                    {quantity}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid
                            item
                            xs={12}
                            direction="row"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Button variant="text">
                                {cartItem
                                    ? cartItem.quantity * card.price + ' ron'
                                    : '---'}
                            </Button>
                            <Button
                                onClick={cartHandler}
                                variant="outlined"
                                disabled={!cartItem}
                                startIcon={<AddShoppingCartIcon />}
                            >
                                Add to cart
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
