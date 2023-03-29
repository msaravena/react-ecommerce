import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        setFavorites: (state, action) => {
            return action.payload
        }
    }
})

export const getFavoritesThunk = () => dispatch => {
    dispatch(setIsLoading(true))

    axios
    .get("https://ecommerce-api-v6d7.onrender.com/carts", getConfig())
    .then(resp => {
        console.log(resp)
        dispatch(setFavorites(resp.data))
    
    })
    .catch(error => console.error(error))
    .finally( () => dispatch(setIsLoading(false)))
}

export const addFavoriteThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
        axios
        .post("https://ecommerce-api-v6d7.onrender.com/carts", product, getConfig())
        .then((resp) => dispatch(getFavoritesThunk()))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
