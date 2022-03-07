import { createSlice } from '@reduxjs/toolkit';
interface IUserState {
	userInfo: null | any;
	error: null | string;
}
const initialState: IUserState = {
	userInfo: null,
	error: null,
};
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginUserSuccess: (state, action) => {
			state.error = null;
			state.userInfo = action.payload;
		},
		loginUserError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const userReducer = userSlice.reducer;
export const { loginUserSuccess, loginUserError } = userSlice.actions;
