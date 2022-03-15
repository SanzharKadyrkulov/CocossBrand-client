/* eslint-disable @next/next/no-img-element */
import { FC, useEffect } from 'react';
import useActions from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import Empty from './empty.png';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function CartDropdown() {
	const [open, setOpen] = useState(false);
	const { cart } = useTypedSelector((state) => state);
	const router = useRouter();

	const { changeProductCount, getCart, removeProductFromCart } = useActions();
	const handleCountChange = (count: number, id: string) => {
		if (count < 1) {
			count = 1;
		}
		changeProductCount(count, id);
	};
	useEffect(() => {
		getCart();
	}, []);

	return (
		<>
			{cart?.products?.length ? (
				<span className='relative inline-block'>
					<button
						className='bg-transparent rounded-full text-white p-2 block  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-2'
						onClick={() => setOpen(true)}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='rgb(156 163 175)'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
							/>
						</svg>
					</button>
					<span className='absolute top-2 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full'>
						{cart.products.length}
					</span>
				</span>
			) : (
				<button
					className='bg-transparent rounded-full text-white p-2 block  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-2'
					onClick={() => setOpen(true)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='rgb(156 163 175)'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
						/>
					</svg>
				</button>
			)}

			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as='div'
					className='fixed z-10 inset-0 overflow-hidden'
					onClose={() => setOpen(false)}
				>
					<div className='absolute inset-0 overflow-hidden'>
						<Transition.Child
							as={Fragment}
							enter='ease-in-out duration-500'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in-out duration-500'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<Dialog.Overlay className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
						</Transition.Child>

						<div className='fixed inset-y-0 right-0 pl-10 max-w-full flex'>
							<Transition.Child
								as={Fragment}
								enter='transform transition ease-in-out duration-500 sm:duration-700'
								enterFrom='translate-x-full'
								enterTo='translate-x-0'
								leave='transform transition ease-in-out duration-500 sm:duration-700'
								leaveFrom='translate-x-0'
								leaveTo='translate-x-full'
							>
								<div className='w-screen max-w-md'>
									<div className='h-full flex flex-col bg-white shadow-xl overflow-y-scroll'>
										<div className='flex-1 py-6 overflow-y-auto px-4 sm:px-6'>
											<div className='flex items-start justify-between'>
												<Dialog.Title className='text-lg font-medium text-gray-900'>
													Shopping cart
												</Dialog.Title>
												<div className='ml-3 h-7 flex items-center'>
													<button
														type='button'
														className='-m-2 p-2 text-gray-400 hover:text-gray-500'
														onClick={() => setOpen(false)}
													>
														<span className='sr-only'>Close panel</span>
														<XIcon className='h-6 w-6' aria-hidden='true' />
													</button>
												</div>
											</div>

											<div className='mt-8'>
												<div className='flow-root'>
													<ul
														role='list'
														className='-my-6 divide-y divide-gray-200'
													>
														{cart?.products?.length ? (
															cart.products.map((product) => (
																<li key={product.item.id} className='py-6 flex'>
																	<div className='flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden'>
																		<img
																			src={product.item.image}
																			alt={product.item.title}
																			className='w-full h-full object-center object-cover'
																		/>
																	</div>

																	<div className='ml-4 flex-1 flex flex-col'>
																		<div>
																			<div className='flex justify-between text-base font-medium text-gray-900'>
																				<h3>
																					<a href={'#'}>{product.item.title}</a>
																				</h3>
																				<p className='ml-4'>
																					${product.subPrice}
																				</p>
																			</div>
																			<p className='mt-1 text-sm text-gray-500'>
																				{product.item.color}
																			</p>
																			<p className='mt-1 text-sm text-gray-500'>
																				{product.item.size}
																			</p>
																		</div>
																		<div className='flex-1 flex items-center justify-between text-sm'>
																			<button
																				disabled={
																					product.count === 1 ? true : false
																				}
																				className='disabled:bg-gray-400 px-3 py-0 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center'
																				onClick={() =>
																					handleCountChange(
																						product.count - 1,
																						product.item.id
																					)
																				}
																			>
																				-
																			</button>
																			<p className='text-base text-gray-900'>
																				{product.count}
																			</p>
																			<button
																				className='disabled:bg-indigo-400 px-3 py-0 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700'
																				onClick={() =>
																					handleCountChange(
																						product.count + 1,
																						product.item.id
																					)
																				}
																			>
																				+
																			</button>
																			<div className='flex'>
																				<button
																					onClick={() =>
																						removeProductFromCart(
																							product.item.id
																						)
																					}
																					type='button'
																					className='font-medium text-indigo-600 hover:text-indigo-500'
																				>
																					Remove
																				</button>
																			</div>
																		</div>
																	</div>
																</li>
															))
														) : (
															<>
																<p className='mt-1 text-sm text-gray-500 mb-12'>
																	Ваша корзина пуста, добавьте товары чтобы
																	оформить заказ
																</p>
																<Image
																	layout='responsive'
																	src={Empty}
																	alt='Cart is empty'
																/>
															</>
														)}
													</ul>
												</div>
											</div>
										</div>

										<div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
											<div className='flex justify-between text-base font-medium text-gray-900'>
												<p>Total</p>
												<p>${cart.totalPrice}</p>
											</div>
											<p className='mt-0.5 text-sm text-gray-500'>
												Shipping and taxes calculated at checkout.
											</p>
											<div className='mt-6'>
												<button
													onClick={() => router.push('/orderForm')}
													disabled={cart?.products?.length ? false : true}
													className='disabled:bg-indigo-400 w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
												>
													Оформить заказ
												</button>
											</div>
											<div className='mt-6 flex justify-center text-sm text-center text-gray-500'>
												<p>
													or{' '}
													<button
														type='button'
														className='text-indigo-600 font-medium hover:text-indigo-500'
														onClick={() => setOpen(false)}
													>
														Continue Shopping
														<span aria-hidden='true'> &rarr;</span>
													</button>
												</p>
											</div>
										</div>
									</div>
								</div>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
}
