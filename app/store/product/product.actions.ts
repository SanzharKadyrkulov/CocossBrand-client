import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { Dispatch } from 'react';
import { db } from '../../../firebase/firebase';
import { dressRef } from '../../../firebase/fireConsts';
import { API } from '../../helpers/consts';
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
		console.log(data);
		// const { data } = await axios.get(`${API}/dress`);
		dispatch(getProductsSuccess(data.docs));
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
