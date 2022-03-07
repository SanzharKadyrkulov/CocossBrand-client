import { ICartCount } from '../store/cart/cart.types';

export const calcSubPrice = (product: ICartCount) =>
	product.count * product.item.price;

export const calcTotalPrice = (products: ICartCount[]) => {
	return products.reduce((ac, cur) => {
		return (ac += cur.subPrice);
	}, 0);
};
