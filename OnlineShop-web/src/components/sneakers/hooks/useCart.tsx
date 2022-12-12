import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IProduct, ICartItem } from '../../../api/store-api';
import { useProductsQuery } from '../../../api/use-store-api';
import {
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
} from '../../../store/cart/cartSlice';
import { useAuth } from '../../../common/auth.hook';
import {
    fetchCartAsync,
    addToCartAsync,
    removeFromCartAsync,
} from '../../../api/StoreApi';

export interface ICartProduct {
    productId: number;
    quantity: number;
    size: number;
    imagesUrl: string[];
    name: string;
    totalPrice: number;
}

export function CalculateCartPrice(cart: ICartItem[], products: IProduct[]) {
    let sum = 0;
    cart?.forEach((cartItem) => {
        let product = products.find(
            (product) => product.productId === cartItem.productId
        );
        if (product) {
            sum += product.price * cartItem.quantity;
        }
    });
    return sum;
}

export function useCart() {
    const dispatch = useDispatch();
    const auth = useAuth();

    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const [amount, setAmount] = useState(0);
    const productsQuery = useProductsQuery();
    const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
    useEffect(() => {
        if (auth?.user) {
            fetchCartAsync().then((cartItems) => {
                if (cartItems) {
                    dispatch(updateCart(cartItems));
                }
            });
        }
    }, [auth?.user]);

    useEffect(() => {
        if (cartItems && productsQuery.data) {
            var newCartProducts: ICartProduct[] = [];
            setAmount(CalculateCartPrice(cartItems, productsQuery.data));
            cartItems.forEach((cartItem) => {
                let cartItemPrice = 0;
                let product = productsQuery.data.find(
                    (product) => product.productId === cartItem.productId
                );
                if (product) {
                    cartItemPrice = product.price * cartItem.quantity;
                    newCartProducts.push({
                        imagesUrl: product.imagesUrl ?? [],
                        name: product.name,
                        productId: product.productId,
                        quantity: cartItem.quantity,
                        size: cartItem.size,
                        totalPrice: cartItemPrice,
                    });
                }
            });
            setCartProducts(newCartProducts);
        }
    }, [cartItems, productsQuery.data]);

    const addToCartHandler = useCallback(
        (cartItem: ICartItem) => {
            dispatch(addToCart(cartItem));
            if (auth?.user) {
                addToCartAsync(cartItem);
            }
        },
        [auth?.user]
    );

    const removeFromCartHandler = useCallback(
        (cartItem: ICartItem) => {
            dispatch(removeFromCart(cartItem));
            if (auth?.user) {
                removeFromCartAsync(cartItem).then(() => {});
            }
        },
        [auth?.user]
    );

    const updateCartHandler = useCallback(() => {
        if (auth?.user) {
            fetchCartAsync().then((cartItems) => {
                if (cartItems) {
                    dispatch(updateCart(cartItems));
                }
            });
        }
    }, [auth?.user]);

    const clearCartHandler = useCallback(() => {
        dispatch(clearCart());
    }, []);
    return {
        cartItems,
        amount,
        cartProducts,
        addToCartHandler,
        removeFromCartHandler,
        updateCartHandler,
        clearCartHandler
    };
}

export default useCart;
