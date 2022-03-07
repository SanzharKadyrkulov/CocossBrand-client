import { AnyAction } from '@reduxjs/toolkit';
import {
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { Dispatch, useEffect } from 'react';
import { auth } from '../../../firebase/firebase';
import { loginUserError, loginUserSuccess } from './user.slice';

const googleProvider = new GoogleAuthProvider();
export const loginWithGoogle = () => async (dispatch: Dispatch<AnyAction>) => {
	try {
		await signInWithPopup(auth, googleProvider);
	} catch (e) {
		dispatch(loginUserError(JSON.stringify(e)));
	}
};
export const logout = () => async (dispatch: Dispatch<AnyAction>) => {
	try {
		await signOut(auth);
	} catch (e) {
		dispatch(loginUserError(JSON.stringify(e)));
	}
};

export const listenAuth = () => async (dispatch: Dispatch<AnyAction>) => {
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			dispatch(loginUserSuccess(user));
		});
	}, []);
};
