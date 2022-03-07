import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cart/cart.slice';
import { orderReducer } from './order/order.slice';
import { productReducer } from './product/product.slice';
import { userReducer } from './user/user.slice';

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		// [productApi.reducerPath]: productApi.reducer
		product: productReducer,
		order: orderReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)

export type TypeRootState = ReturnType<typeof store.getState>;
