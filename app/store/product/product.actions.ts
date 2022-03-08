import { AnyAction } from '@reduxjs/toolkit';
import { addDoc, getDocs } from 'firebase/firestore';
import { Dispatch } from 'react';
import { dressRef } from '../../../firebase/fireConsts';
import {
	getProductsError,
	getProductsLoading,
	getProductsSuccess,
} from './product.slice';
import { IProduct } from './product.types';

export const getProducts = () => async (dispatch: Dispatch<AnyAction>) => {
	try {
		dispatch(getProductsLoading());
		const data = await getDocs(dressRef);
		let arr: any[] = [];
		data.forEach((item) => {
			arr.push({ id: item.id, ...item.data() });
		});
		dispatch(getProductsSuccess(arr));
	} catch (e) {
		dispatch(getProductsError(JSON.stringify(e)));
	}
};
export const addProduct =
	(product: IProduct) => async (dispatch: Dispatch<any>) => {
		try {
			await addDoc(dressRef, product);
			dispatch(getProducts());
		} catch (e) {
			dispatch(getProductsError(JSON.stringify(e)));
		}
	};
