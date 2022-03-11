import { onSnapshot } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeaderLayout from '../app/components/layouts/HeaderLayout';
import Hero from '../app/components/screens/home/Hero';
import { getProductsSuccess } from '../app/store/product/product.slice';
import { dressRef } from '../firebase/fireConsts';
const HomePage: NextPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const unSub = onSnapshot(dressRef, (data) => {
			let arr: any[] = [];
			data.forEach((item) => {
				arr.push({ id: item.id, ...item.data() });
			});
			dispatch(getProductsSuccess(arr));
		});
		return () => {
			unSub();
		};
	});
	return (
		<HeaderLayout>
			<Hero />
		</HeaderLayout>
	);
};

export default HomePage;
