import { NextPage } from 'next';
import React from 'react';
import List from '../app/components/screens/home/List';
import { onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProductsSuccess } from '../app/store/product/product.slice';
import { dressRef } from '../firebase/fireConsts';
import HeaderLayout from '../app/components/layouts/HeaderLayout';

const ProductList: NextPage = () => {
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
			<List />
		</HeaderLayout>
	);
};

export default ProductList;
