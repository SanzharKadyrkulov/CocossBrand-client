/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import React, { useEffect, useLayoutEffect, useRef } from 'react';

import HeaderLayout from '../app/components/layouts/HeaderLayout';
import useActions from '../app/hooks/useActions';
import { useTypedSelector } from '../app/hooks/useTypedSelector';
import { useRouter } from 'next/router';
import { ADMINS } from '../app/helpers/consts';

const Admin: NextPage = () => {
	const {
		order: { orders },
		user: { userInfo },
	} = useTypedSelector((state) => state);
	const { getOrders } = useActions();
	const router = useRouter();
	useEffect(() => {
		if (!userInfo || !ADMINS.includes(userInfo.email)) {
			router.push('/list	');
		}
	}, [userInfo]);
	useEffect(() => {
		getOrders();
	}, []);
	return (
		<HeaderLayout>
			<button
				onClick={() => router.push('/addDress')}
				className='block text-center bg-indigo-600 border border-transparent rounded-full py-3 px-3 font-medium text-white hover:bg-indigo-700 fixed bottom-5 z-10 right-5'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					viewBox='0 0 20 20'
					fill='white'
				>
					<path
						fillRule='evenodd'
						d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
						clipRule='evenodd'
					/>
				</svg>
			</button>
			{orders.length ? (
				orders.map((item) => (
					<div
						key={item.id}
						className='bg-white shadow overflow-hidden sm:rounded-lg'
					>
						<div className='px-4 py-5 sm:px-6 flex justify-between items-center'>
							<h3 className='text-lg leading-6 font-medium text-gray-900'>
								Информация о заказе
							</h3>
							<h6 className='text-sm font-medium text-gray-700'>
								{new Date(item.data().date).toDateString()}
							</h6>
						</div>
						<div className='border-t border-gray-200'>
							<dl>
								<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500'>
										Full name
									</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
										{item.data().userInfo.firstName}
									</dd>
								</div>
								<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500'>
										Номер телефона
									</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
										{item.data().userInfo.phoneNumber}
									</dd>
								</div>
								<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500'>Адрес</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
										{item.data().userInfo.city}, {item.data().userInfo.address}
									</dd>
								</div>
								<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500'>Цена</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
										{item.data().totalPrice}сом
									</dd>
								</div>
								<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500'>Платья</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
										<ul
											role='list'
											className='border border-gray-200 rounded-md divide-y divide-gray-200'
										>
											{item.data().products.map((product: any) => (
												<li
													key={product.item.id}
													className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
												>
													<div className='w-0 flex-1 flex items-center'>
														<img
															width={40}
															src={product.item.image}
															alt='платье'
														/>
														<span className='ml-2 flex-1 w-fit  '>
															{product.item.title}
														</span>
														<span className='ml-5 flex-1 w-0 truncate'>
															{product.item.size}
														</span>
														<span className='ml-2 flex-1 w-0 truncate'>
															{product.item.color}
														</span>{' '}
														<span className='ml-2 flex-1 w-0 truncate'>
															{product.count}
														</span>{' '}
														<span className='ml-2 flex-1 w-0 truncate'>
															{product.subPrice}
														</span>
													</div>
												</li>
											))}
										</ul>
									</dd>
								</div>
							</dl>
						</div>
					</div>
				))
			) : (
				<></>
			)}
		</HeaderLayout>
	);
};
export default Admin;
