import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteState {
    favoriteItems: number[];
}

const initialState: FavoriteState = {
    favoriteItems: [],
};
//TODO
export const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        updateFavorite: (state,  action: PayloadAction<number[]>) => {
            state.favoriteItems = action.payload;
        },
        addToFavorite: (state, action: PayloadAction<number>) => {
            if (!state.favoriteItems.some((item) =>
                item === action.payload)) {
                state.favoriteItems.push(action.payload);
            }
            else {
                state.favoriteItems = state.favoriteItems.filter((item) =>
                    item !== action.payload
                );
            }
        },
        clearFavorite: (state) => {
            state.favoriteItems = [];
        },

    },
});

export const { addToFavorite, updateFavorite, clearFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
