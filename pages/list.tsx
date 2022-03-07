import { NextPage } from 'next';
import React from 'react';
import HeaderLayout from '../app/components/layouts/HeaderLayout';
import List from '../app/components/screens/home/List';
const ProductList: NextPage = () => {
	return (
		<HeaderLayout>
			<List />
		</HeaderLayout>
	);
};

export default ProductList;
