import { FC, useEffect } from 'react';
import useActions from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useGetProductsQuery } from '../../../store/product/product.api';
import AlertError from '../../shared/AlertError';
import ProductItem from './ProductItem';

export default function List() {
	// const { data, status } = useGetProductsQuery(6);
	const { error, loading, products } = useTypedSelector(
		(state) => state.product
	);
	const { getProducts } = useActions();
	useEffect(() => {
		getProducts();
	}, []);
	return (
		<div className='bg-white'>
			<div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
				<h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
					Наши товары
				</h2>

				<div className='mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
					{loading ? (
						<h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
							Loading...
						</h2>
					) : error ? (
						<AlertError message={error} />
					) : (
						products.map((product: any) => (
							<ProductItem key={product.id} product={product} />
						))
					)}
				</div>
			</div>
		</div>
	);
}

// const List: FC = () => {
// 	const { data, status } = useGetProductsQuery(6);

// 	return (
// 		<div>
// 			<div className='flex justify-between items-center mb-10'>
// 				<h1 className='text-2xl text-green-900 font-medium'>
// 					Let&apos;s find your products!
// 				</h1>
// 				<CartDropdown />
// 			</div>
// 			{status === 'pending' ? (
// 				'Loading...'
// 			) : status === 'rejected' ? (
// 				<div className='text-red'>{'some error occurred'}</div>
// 			) : (
// 				<div className='flex flex-wrap justify-between'>
// 					{data?.map(product => (
// 						<ProductItem key={product.id} product={product} />
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default List;
