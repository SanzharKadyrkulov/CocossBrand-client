import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { ICartCount } from '../cart/cart.types';

export interface IInfo {
	firstName: string;
	phoneNumber: string;
	country: string;
	address: string;
	city: string;
}
export interface IOrder {
	id: number;
	products: ICartCount[];
	totalPrice: number;
	date: string;
	userInfo: IInfo;
}
export interface IOrderState {
	orders: QueryDocumentSnapshot<DocumentData>[];
	loading: boolean;
	error: null | string;
}
