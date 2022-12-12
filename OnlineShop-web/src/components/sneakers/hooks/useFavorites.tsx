import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IProduct } from '../../../api/store-api';
import { useFavoriteQuery, useProductsQuery } from '../../../api/use-store-api';
import {
    addToFavorite,
    updateFavorite,
} from '../../../store/favorite/favoriteSlice';
import { useAuth } from '../../../common/auth.hook';
import {
    getFavoriteAsync,
    addToFavoriteAsync,
    removeFromFavoriteAsync,
} from '../../../api/StoreApi';

export function useFavorite() {
    const dispatch = useDispatch();
    const auth = useAuth();
    const favoriteItems = useSelector(
        (state: RootState) => state.favorite.favoriteItems
    );
    const productsQuery = useProductsQuery();
    const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>([]);
    const favoriteQuery = useFavoriteQuery(auth?.user);

    useEffect(() => {
        if (favoriteQuery?.data) {
                    dispatch(updateFavorite(favoriteQuery.data));
        }
    }, [favoriteQuery?.data]);

    useEffect(() => {
        if (favoriteItems && productsQuery.data) {
            var newFavoriteProducts: IProduct[] = [];

            favoriteItems.forEach((productId) => {
                let product = productsQuery.data.find(
                    (product) => product.productId === productId
                );
                if (product) newFavoriteProducts.push(product);
            });

            setFavoriteProducts(newFavoriteProducts);
        }
    }, [favoriteItems, productsQuery.data]);

    const addToFavoriteHandler = useCallback(
        (productId: number) => {
            dispatch(addToFavorite(productId));
            if (auth?.user) {
                addToFavoriteAsync(productId);
            }
        },
        [auth?.user]
    );

    return {
        favoriteProducts,
        addToFavoriteHandler,
        favoriteItems
    };
}

export default useFavorite;
