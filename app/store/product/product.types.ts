import {
	DocumentData,
	QueryDocumentSnapshot,
	QuerySnapshot,
} from 'firebase/firestore';

export interface IColor {
	name: string;
	class: string;
	selectedClass: string;
}

export interface ISize {
	name: string;
	inStock: boolean;
}
export interface IProduct {
	id: string;
	title: string;
	price: number;
	image: string;
	rating: number;
	// colors: IColor[];
	color: string;
	reviewCount: number;
	sizes: ISize[];
}

export interface IProductState {
	products: IProduct[] | QueryDocumentSnapshot<DocumentData>[];
	loading: boolean;
	error: null | string;
}
