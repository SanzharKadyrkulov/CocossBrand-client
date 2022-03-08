import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	DocumentData,
	QueryDocumentSnapshot,
	QuerySnapshot,
} from 'firebase/firestore';
import { IProduct, IProductState } from './product.types';

const initialState: IProductState = {
	products: [],
	loading: false,
	error: null,
};
const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		getProductsLoading: (state) => {
			state.loading = true;
		},
		getProductsError: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		getProductsSuccess: (
			state,
			action: PayloadAction<QueryDocumentSnapshot<DocumentData>[] | IProduct[]>
		) => {
			state.loading = false;
			state.error = null;
			state.products = action.payload;
		},
	},
});

export const productReducer = productSlice.reducer;
export const { getProductsError, getProductsLoading, getProductsSuccess } =
	productSlice.actions;
