import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../../api/store-api';

export interface CartState {
    cartItems: ICartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCart: (state, action: PayloadAction<ICartItem[]>) => {
            state.cartItems = [...action.payload];
        },
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            let cartItem = state.cartItems.find(
                (item) =>
                    item.productId === action.payload.productId &&
                    item.size === action.payload.size
            );
            if (cartItem) {
                let cartItemIndex = state.cartItems.indexOf(cartItem, 0);
                state.cartItems[cartItemIndex].quantity =
                    action.payload.quantity;
            } else {
                state.cartItems.push({
                    ...action.payload,
                });
            }
        },
        removeFromCart: (state, action: PayloadAction<ICartItem>) => {
            let cartItem = state.cartItems.find(
                (item) =>
                    item.productId === action.payload.productId &&
                    item.size === action.payload.size
            );
            if (cartItem) {
                let cartItemIndex = state.cartItems.indexOf(cartItem, 0);
                state.cartItems.splice(cartItemIndex, 1);
            }

        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
