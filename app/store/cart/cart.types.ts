export interface ICart {
	id: string;
	title: string;
	color: string;
	price: number;
	image: string;
	size: string;
}
export interface ICartState {
	products: ICartCount[];
	totalPrice: number;
}
export interface ICartCount {
	item: ICart;
	count: number;
	subPrice: number;
}
