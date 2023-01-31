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
        .get("https://e-commerce-api.academlo.tech/api/v1/products")
        .then((resp) => dispatch(setProducts(resp.data.data.products)))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterCategoriesThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
        .then((resp) => dispatch(setProducts(resp.data.data.products)))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setProducts } = ProductsSlice.actions;

export default ProductsSlice.reducer;
