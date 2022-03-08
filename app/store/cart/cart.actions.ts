import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { calcSubPrice, calcTotalPrice } from '../../helpers/functions';
import { getCartSuccess } from './cart.slice';
import { ICart, ICartCount } from './cart.types';

export const getCart = () => (dispatch: Dispatch<AnyAction>) => {
	let cart = JSON.parse(localStorage.getItem('cart') as string);
	if (!cart) {
		localStorage.setItem(
			'cart',
			JSON.stringify({
				products: [],
				totalPrice: 0,
			})
		);
		cart = {
			product: [],
			totalPrice: 0,
		};
	}
	dispatch(getCartSuccess(cart));
};

export const addProductToCart =
	(product: ICart) => (dispatch: Dispatch<AnyAction>) => {
		let cart = JSON.parse(localStorage.getItem('cart') as string);
		if (!cart) {
			cart = {
				products: [],
				totalPrice: 0,
			};
		}
		let newProduct = {
			item: product,
			count: 1,
			subPrice: +product.price,
		};

		cart.products.push(newProduct);
		cart.totalPrice = calcTotalPrice(cart.products);
		localStorage.setItem('cart', JSON.stringify(cart));

		dispatch(getCartSuccess(cart));
	};

export const removeProductFromCart =
	(id: string) => (dispatch: Dispatch<AnyAction>) => {
		let cart = JSON.parse(localStorage.getItem('cart') as string);
		if (!cart) {
			cart = {
				products: [],
				totalPrice: 0,
			};
		}

		cart.products = cart.products.filter(
			(item: ICartCount) => item.item.id !== id
		);
		cart.totalPrice = calcTotalPrice(cart.products);
		localStorage.setItem('cart', JSON.stringify(cart));

		dispatch(getCartSuccess(cart));
	};

export const changeProductCount =
	(count: number, id: string) => (dispatch: Dispatch<AnyAction>) => {
		let cart = JSON.parse(localStorage.getItem('cart') as string);
		cart.products = cart.products.map((product: ICartCount) => {
			if (product.item.id === id) {
				product.count = count;
				product.subPrice = calcSubPrice(product);
			}
			return product;
		});
		cart.totalPrice = calcTotalPrice(cart.products);
		localStorage.setItem('cart', JSON.stringify(cart));
		dispatch(getCartSuccess(cart));
	};
