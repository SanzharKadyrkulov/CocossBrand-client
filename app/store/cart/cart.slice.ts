import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart, ICartCount, ICartState } from './cart.types';
const initialState: ICartState = {
	products: [],
	totalPrice: 0,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// 	addItem: (state, action: PayloadAction<ICart>) => {
		// 		state.products.push(action.payload);
		// 	},

		// removeItem: (state, action: PayloadAction<number>) => {
		// 	state.products = state.products.filter(
		// 		item => item.id !== action.payload
		// 	);
		// },
		getCartSuccess: (state, action: PayloadAction<ICartState>) => {
			return action.payload;
		},
	},
});

export const cartReducer = cartSlice.reducer;
export const { getCartSuccess } = cartSlice.actions;
