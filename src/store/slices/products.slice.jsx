import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const ProductsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        }

    }
})

export const getProductsThunk = () => (dispatch) => {
    
        dispatch(setIsLoading(true))
            
        axios
        .get("https://ecommerce-api-v6d7.onrender.com/products")
        .then((resp) => {
            console.log(resp.data)
            dispatch(setProducts(resp.data))})
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterCategoriesThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
        .get(`https://ecommerce-api-v6d7.onrender.com/products/?category=${id}`)
        .then((resp) => dispatch(setProducts(resp.data)))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterByTermThunk = (term) => (dispatch) => {
    dispatch(setIsLoading(true));
    
    axios
    .get(`https://ecommerce-api-v6d7.onrender.com/products?query=${term}`)
    .then((resp) => dispatch(setProducts(resp.data)))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}

export const { setProducts } = ProductsSlice.actions;

export default ProductsSlice.reducer;
