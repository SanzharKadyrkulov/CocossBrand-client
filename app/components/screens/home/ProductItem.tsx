/* eslint-disable @next/next/no-img-element */
import { FC, MouseEvent, useEffect } from 'react';
import useActions from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IProduct } from '../../../store/product/product.types';

import { Fragment, useState } from 'react';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import { ICart, ICartState } from '../../../store/cart/cart.types';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export default function ProductItem({ product }: { product: IProduct }) {
	const [open, setOpen] = useState(false);
	// const [selectedColor, setSelectedColor] = useState(product.colors[0]);
	const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
	const [newCart, setNewCart] = useState<ICartState | null>(null);

	const { getCart, addProductToCart, deleteProduct } = useActions();
	const {
		cart,
		user: { userInfo },
	} = useTypedSelector((state) => state);
	useEffect(() => {
		getCart();
	}, []);
	useEffect(() => {
		setNewCart(cart);
	}, [cart]);
	const checkItemInCart = (id: string) => {
		if (newCart && newCart.products) {
			const foundItem = newCart?.products.some(
				(product) => product.item.id === id
			);
			return foundItem;
		}
	};
	// const isExistsInCart = cart.products?.some(i => i.item.id === product.id);
	const handleAdd = (product: IProduct) => {
		const newCartItem: ICart = {
			id: product.id,
			title: product.title,
			price: product.price,
			image: product.image,
			size: selectedSize.name,
			color: product.color,
		};
		addProductToCart(newCartItem);
	};

	const handleDelete = (e: MouseEvent<SVGSVGElement>, item: IProduct) => {
		e.stopPropagation();
		if (!confirm(`Вы уверены что хотите удалить ${item.title} `)) return;
		deleteProduct(item);
	};

	return (
		<>
			<a
				key={product.id}
				onClick={() => setOpen(true)}
				className='group shadow-sm'
			>
				<div className='w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8'>
					<img
						src={product.image}
						alt={product.title}
						className='w-full h-full object-center object-cover group-hover:opacity-75'
					/>
				</div>
				<h3 className='mt-4 text-sm text-gray-700'>{product.title}</h3>
				<p className='mt-1 text-lg inline-block font-medium text-gray-900'>
					${product.price}
				</p>

				{userInfo && userInfo.email == 'kadyrkulov.980@gmail.com' ? (
					<>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-6 h-6 text-red-700 inline-block ml-4 cursor-pointer'
							onClick={(e) => handleDelete(e, product)}
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
							/>
						</svg>

						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-6 h-6 text-amber-700 inline-block ml-4 cursor-pointer'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
							/>
						</svg>
					</>
				) : null}
			</a>

			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as='div'
					className='fixed z-10 inset-0 overflow-y-auto'
					onClose={setOpen}
				>
					<div
						className='flex min-h-screen text-center md:block md:px-2 lg:px-4'
						style={{ fontSize: 0 }}
					>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<Dialog.Overlay className='hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block' />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className='hidden md:inline-block md:align-middle md:h-screen'
							aria-hidden='true'
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
							enterTo='opacity-100 translate-y-0 md:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 md:scale-100'
							leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
						>
							<div className='flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl'>
								<div className='w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
									<button
										type='button'
										className='absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8'
										onClick={() => setOpen(false)}
									>
										<span className='sr-only'>Close</span>
										<XIcon className='h-6 w-6' aria-hidden='true' />
									</button>

									<div className='w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8'>
										<div className='aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5'>
											<img
												src={product.image}
												alt={product.title}
												className='object-center object-cover'
											/>
										</div>
										<div className='sm:col-span-8 lg:col-span-7'>
											<h2 className='text-2xl font-extrabold text-gray-900 sm:pr-12'>
												{product.title}
											</h2>

											<section
												aria-labelledby='information-heading'
												className='mt-2'
											>
												<h3 id='information-heading' className='sr-only'>
													Product information
												</h3>

												<p className='text-2xl text-gray-900'>
													${product.price}
												</p>
												<p className='text-xl text-gray-900'>{product.color}</p>

												{/* Reviews */}
												<div className='mt-6'>
													<h4 className='sr-only'>Reviews</h4>
													<div className='flex items-center'>
														<div className='flex items-center'>
															{[0, 1, 2, 3, 4].map((rating) => (
																<StarIcon
																	key={rating}
																	className={classNames(
																		product.rating > rating
																			? 'text-gray-900'
																			: 'text-gray-200',
																		'h-5 w-5 flex-shrink-0'
																	)}
																	aria-hidden='true'
																/>
															))}
														</div>
														<p className='sr-only'>
															{product.rating} out of 5 stars
														</p>
														<a
															href='#'
															className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'
														>
															{product.reviewCount} reviews
														</a>
													</div>
												</div>
											</section>

											<section
												aria-labelledby='options-heading'
												className='mt-10'
											>
												<h3 id='options-heading' className='sr-only'>
													Product options
												</h3>

												<form
													onSubmit={(e) => {
														e.preventDefault();
														!checkItemInCart(product.id) && handleAdd(product);
														setOpen(false);
													}}
												>
													{/* Sizes */}
													<div className='mt-10'>
														<div className='flex items-center justify-between'>
															<h4 className='text-sm text-gray-900 font-medium'>
																Size
															</h4>
															<a
																href='#'
																className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
															>
																Size guide
															</a>
														</div>

														<RadioGroup
															value={selectedSize}
															onChange={setSelectedSize}
															className='mt-4'
														>
															<RadioGroup.Label className='sr-only'>
																Choose a size
															</RadioGroup.Label>
															<div className='grid grid-cols-4 gap-4'>
																{product.sizes.map((size) => (
																	<RadioGroup.Option
																		key={size.name}
																		value={size}
																		disabled={!size.inStock}
																		className={({ active }) =>
																			classNames(
																				size.inStock
																					? 'bg-white shadow-sm text-gray-900 cursor-pointer'
																					: 'bg-gray-50 text-gray-200 cursor-not-allowed',
																				active ? 'ring-2 ring-indigo-500' : '',
																				'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
																			)
																		}
																	>
																		{({ active, checked }) => (
																			<>
																				<RadioGroup.Label as='p'>
																					{size.name}
																				</RadioGroup.Label>
																				{size.inStock ? (
																					<div
																						className={classNames(
																							active ? 'border' : 'border-2',
																							checked
																								? 'border-indigo-500'
																								: 'border-transparent',
																							'absolute -inset-px rounded-md pointer-events-none'
																						)}
																						aria-hidden='true'
																					/>
																				) : (
																					<div
																						aria-hidden='true'
																						className='absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none'
																					>
																						<svg
																							className='absolute inset-0 w-full h-full text-gray-200 stroke-2'
																							viewBox='0 0 100 100'
																							preserveAspectRatio='none'
																							stroke='currentColor'
																						>
																							<line
																								x1={0}
																								y1={100}
																								x2={100}
																								y2={0}
																								vectorEffect='non-scaling-stroke'
																							/>
																						</svg>
																					</div>
																				)}
																			</>
																		)}
																	</RadioGroup.Option>
																))}
															</div>
														</RadioGroup>
													</div>

													<button
														type='submit'
														disabled={checkItemInCart(product.id)}
														className='disabled:bg-indigo-400 mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
													>
														{checkItemInCart(product.id)
															? 'Already in bag'
															: 'Add to bag'}
													</button>
												</form>
											</section>
										</div>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
}

{
	/* Colors */
}
{
	/* <div>
														<h4 className='text-sm text-gray-900 font-medium'>
															Color
														</h4>

														<RadioGroup
															value={selectedColor}
															onChange={setSelectedColor}
															className='mt-4'
														>
															<RadioGroup.Label className='sr-only'>
																Choose a color
															</RadioGroup.Label>
															<div className='flex items-center space-x-3'>
																{product.colors.map((color) => (
																	<RadioGroup.Option
																		key={color.name}
																		value={color}
																		className={({ active, checked }) =>
																			classNames(
																				color.selectedClass,
																				active && checked
																					? 'ring ring-offset-1'
																					: '',
																				!active && checked ? 'ring-2' : '',
																				'-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
																			)
																		}
																	>
																		<RadioGroup.Label
																			as='p'
																			className='sr-only'
																		>
																			{color.name}
																		</RadioGroup.Label>
																		<span
																			aria-hidden='true'
																			className={classNames(
																				color.class,
																				'h-8 w-8 border border-black border-opacity-10 rounded-full'
																			)}
																		/>
																	</RadioGroup.Option>
																))}
															</div>
														</RadioGroup>
													</div> */
}
