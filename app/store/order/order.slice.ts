import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { IOrder, IOrderState } from './order.types';

const initialState: IOrderState = {
	orders: [],
	loading: false,
	error: null,
};
const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		getOrdersLoading: (state) => {
			state.loading = true;
		},
		getOrdersError: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		getOrdersSuccess: (
			state,
			action: PayloadAction<QueryDocumentSnapshot<DocumentData>[]>
		) => {
			state.loading = false;
			state.error = null;
			state.orders = action.payload;
		},
		// addOrderSuccess: (state, action: PayloadAction<IOrder>) => {
		// 	state.orders.push(action.payload);
		// },
	},
});

export const orderReducer = orderSlice.reducer;
export const { getOrdersError, getOrdersLoading, getOrdersSuccess } =
	orderSlice.actions;
