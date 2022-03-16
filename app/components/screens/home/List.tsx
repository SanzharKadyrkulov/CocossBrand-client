import { useEffect, useState } from 'react';
import { ADMINS } from '../../../helpers/consts';
import useActions from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AlertError from '../../shared/AlertError';
import LoadingPlaceholder from '../../shared/LoadingPlaceholder';
import ProductItem from './ProductItem';

export default function List() {
	// const { data, status } = useGetProductsQuery(6);
	const {
		product: { error, loading, products },
		user: { userInfo },
	} = useTypedSelector((state) => state);
	const [showToAdmin, setShowToAdmin] = useState(false);
	const { getProducts } = useActions();
	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className='bg-white'>
			{userInfo && ADMINS.includes(userInfo.email) && (
				<button
					onClick={() => setShowToAdmin((state) => !state)}
					className='block text-center bg-indigo-600 border border-transparent rounded-full py-3 px-3 font-medium text-white hover:bg-indigo-700 fixed bottom-5 z-10 right-5'
				>
					{showToAdmin ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
							/>
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='white'
							strokeWidth={2}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
							/>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
							/>
						</svg>
					)}
				</button>
			)}
			<div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
				<h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
					Наши товары
				</h2>

				<div className='mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
					{loading ? (
						<LoadingPlaceholder />
					) : error ? (
						<AlertError message={error} />
					) : (
						products.map((product: any) => (
							<ProductItem
								key={product.id}
								product={product}
								showToAdmin={showToAdmin}
							/>
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
