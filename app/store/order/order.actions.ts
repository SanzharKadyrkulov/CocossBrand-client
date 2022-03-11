import { AnyAction } from '@reduxjs/toolkit';
import { addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { Dispatch } from 'react';
import { orderRef } from '../../../firebase/fireConsts';
import {
	getOrdersError,
	getOrdersLoading,
	getOrdersSuccess,
} from './order.slice';
import { IOrder } from './order.types';

export const getOrders = () => async (dispatch: Dispatch<AnyAction>) => {
	try {
		const q = query(orderRef, orderBy('date'));
		dispatch(getOrdersLoading());
		const data = await getDocs(q);
		dispatch(getOrdersSuccess(data.docs.reverse()));
	} catch (e) {
		dispatch(getOrdersError(JSON.stringify(e)));
	}
};
export const addOrder = (order: IOrder) => async (dispatch: Dispatch<any>) => {
	try {
		await addDoc(orderRef, order);
		dispatch(getOrders());
	} catch (e) {
		dispatch(getOrdersError(JSON.stringify(e)));
	}
};
