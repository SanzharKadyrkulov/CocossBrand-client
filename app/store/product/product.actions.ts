import { AnyAction } from '@reduxjs/toolkit';
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { Dispatch } from 'react';
import { db, storage } from '../../../firebase/firebase';
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

export const deleteProduct =
	(item: IProduct) => async (dispatch: Dispatch<any>) => {
		try {
			await deleteObject(ref(storage, item.image));
			await deleteDoc(doc(db, 'dress', item.id));

			dispatch(getProducts());
		} catch (e) {
			dispatch(getProductsError(JSON.stringify(e)));
		}
	};

export const editProduct =
	(item: any, id: string) => async (dispatch: Dispatch<any>) => {
		try {
			await updateDoc(doc(db, 'dress', id), item);
			dispatch(getProducts());
		} catch (e) {
			dispatch(getProductsError(JSON.stringify(e)));
		}
	};
