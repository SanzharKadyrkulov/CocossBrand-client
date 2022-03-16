/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import { Fragment } from 'react';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

import { IProduct } from '../../../store/product/product.types';
import { storage } from '../../../../firebase/firebase';
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from 'firebase/storage';
import useActions from '../../../hooks/useActions';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

interface IEdit {
	title: string;
	price: number;
	color: string;
}

function EditDressForm({
	product,
	open,
	setOpen,
	setUpdateLoad,
}: {
	product: IProduct;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	setUpdateLoad: Dispatch<SetStateAction<boolean>>;
}) {
	const [sizesState, setSizesState] = useState(product.sizes);
	const [chosenImage, setChooseImage] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState(product.image);
	const [imgLoad, setImgLoad] = useState(false);

	const { editProduct } = useActions();

	const changeSizeStatus = (name: string) => {
		setSizesState((state) => {
			return state.map((item) =>
				item.name === name ? { ...item, inStock: !item.inStock } : item
			);
		});
	};

	const initialRef: IEdit = {
		title: product.title,
		price: product.price,
		color: product.color,
	};

	const infoRef = useRef<IEdit>(initialRef);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newObj = {
			...infoRef.current,
			[e.target.name]: e.target.value,
		};
		infoRef.current = newObj;
	};

	const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setImgLoad(true);
		if (chosenImage) deleteObject(ref(storage, chosenImage?.name));
		setChooseImage(e.target.files ? e.target.files[0] : null);
		if (!!e.target.files) {
			const imageRef = ref(storage, e.target.files[0].name);
			await uploadBytes(imageRef, e.target.files[0]);
			const link = await getDownloadURL(imageRef);
			setImageUrl(link);
		}
		setImgLoad(false);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setUpdateLoad(true);
		if (imageUrl !== product.image) deleteObject(ref(storage, product.image));
		const newDress: any = {
			...infoRef.current,
			image: imageUrl,
			sizes: sizesState,
		};
		await editProduct(newDress, product.id);
	};

	return (
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
									onClick={() => {
										setOpen(false);
										setImageUrl(product.image);
										chosenImage &&
											deleteObject(ref(storage, chosenImage?.name));
									}}
								>
									<span className='sr-only'>Close</span>
									<XIcon className='h-6 w-6' aria-hidden='true' />
								</button>

								<div className='w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8'>
									<div className='aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5'>
										<img
											src={imageUrl}
											alt={product.title}
											className={classNames(
												'object-center object-cover',
												imgLoad ? 'opacity-50' : ''
											)}
										/>
									</div>
									<input
										onChange={(e) => handleChangeImage(e)}
										type='file'
										required
										placeholder='Image'
										name='image'
										id='image'
										className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
									/>
									<div className='sm:col-span-8 lg:col-span-7'>
										<h2 className='text-2xl font-extrabold text-gray-900 sm:pr-12'>
											{product.title}
										</h2>
										<input
											type='text'
											placeholder='Название'
											name='title'
											defaultValue={infoRef.current.title}
											onChange={(e) => handleChangeInput(e)}
										/>

										<section
											aria-labelledby='information-heading'
											className='mt-2'
										>
											<h3 id='information-heading' className='sr-only'>
												Product information
											</h3>

											<p className='text-2xl text-gray-900'>${product.price}</p>
											<input
												type='text'
												placeholder='Цена'
												name='price'
												defaultValue={infoRef.current.price}
												onChange={(e) => handleChangeInput(e)}
											/>
											<p className='text-xl text-gray-900'>{product.color}</p>
											<input
												type='text'
												placeholder='Цвет'
												name='color'
												defaultValue={infoRef.current.color}
												onChange={(e) => handleChangeInput(e)}
											/>

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
													// !checkItemInCart(product.id) && handleAdd(product);
													setOpen(false);
													handleSubmit(e);
												}}
											>
												{/* Sizes */}
												<div className='mt-10 col-span-6 sm:col-span-3'>
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
														value={{
															name: 'XXXL',
															inStock: false,
														}}
														onChange={(e) => e && changeSizeStatus(e.name)}
														className='mt-4'
													>
														<div className='grid grid-cols-4 gap-4'>
															{sizesState.map((size) => (
																<RadioGroup.Option
																	key={size.name}
																	value={size}
																	className={classNames(
																		'bg-white shadow-sm text-gray-900 cursor-pointer',
																		size.inStock
																			? 'ring-2 ring-indigo-500'
																			: '',
																		'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
																	)}
																>
																	<>
																		<RadioGroup.Label as='p'>
																			{size.name}
																		</RadioGroup.Label>
																		<div
																			className={classNames(
																				size.inStock ? 'border' : 'border-2',
																				size.inStock
																					? 'border-indigo-500'
																					: 'border-transparent',
																				'absolute -inset-px rounded-md pointer-events-none'
																			)}
																			aria-hidden='true'
																		/>
																	</>
																</RadioGroup.Option>
															))}
														</div>
													</RadioGroup>
												</div>

												<button
													type='submit'
													// disabled={checkItemInCart(product.id)}
													className='disabled:bg-indigo-400 mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
												>
													{/* {checkItemInCart(product.id)
														? 'Already in bag'
														: 'Add to bag'} */}
													Save changes
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
	);
}

export default EditDressForm;
