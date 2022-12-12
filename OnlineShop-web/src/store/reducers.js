import { combineReducers } from 'redux';
import counterReducer from './counter/counterSlice';
import cartReducer from './cart/cartSlice';
import favoriteReducer from './favorite/favoriteSlice';

export default combineReducers({
    counter: counterReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
});
