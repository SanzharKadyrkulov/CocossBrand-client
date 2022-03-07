import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { Dispatch } from 'react';
import { orderRef } from '../../../firebase/fireConsts';
import { API } from '../../helpers/consts';
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
		// const { data } = await axios.get(`${API}/orders`);
		const data = await getDocs(q);
		dispatch(getOrdersSuccess(data.docs));
	} catch (e) {
		dispatch(getOrdersError(JSON.stringify(e)));
	}
};
export const addOrder = (order: IOrder) => async (dispatch: Dispatch<any>) => {
	try {
		// await axios.post(`${API}/orders`, order);
		const docRef = await addDoc(orderRef, order);
		console.log('Document written with ID: ', docRef.id);
		dispatch(getOrders());
	} catch (e) {
		dispatch(getOrdersError(JSON.stringify(e)));
	}
};
