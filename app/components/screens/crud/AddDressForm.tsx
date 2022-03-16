import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useActions from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IInfo } from '../../../store/order/order.types';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../firebase/firebase';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';

// const colors = [
// 	{
// 		name: 'White',
// 		class: 'bg-white',
// 		selectedClass: 'ring-gray-400',
// 	},
// 	{
// 		name: 'Gray',
// 		class: 'bg-gray-200',
// 		selectedClass: 'ring-gray-400',
// 	},
// 	{
// 		name: 'Black',
// 		class: 'bg-gray-900',
// 		selectedClass: 'ring-gray-900',
// 	},
// ];
const sizes = [
	{
		name: 'XXS',
		inStock: false,
	},
	{
		name: 'XS',
		inStock: false,
	},
	{
		name: 'S',
		inStock: false,
	},
	{
		name: 'M',
		inStock: false,
	},
	{
		name: 'L',
		inStock: false,
	},
	{
		name: 'XL',
		inStock: false,
	},
	{
		name: 'XXL',
		inStock: false,
	},
	{
		name: 'XXXL',
		inStock: false,
	},
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const AddDressForm = () => {
	const [chosenImage, setChooseImage] = useState<File | null>(null);
	const [sizesState, setSizesState] = useState(sizes);
	const [loading, setLoading] = useState(false);

	const changeSizeStatus = (name: string) => {
		setSizesState((state) => {
			return state.map((item) =>
				item.name === name ? { ...item, inStock: !item.inStock } : item
			);
		});
	};
	const { getCart, addProduct } = useActions();
	const router = useRouter();
	const infoRef = useRef<IInfo>({} as IInfo);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newObj = {
			...infoRef.current,
			[e.target.name]: e.target.value,
		};
		infoRef.current = newObj;
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		let imageUrl;
		if (chosenImage) {
			const imageRef = ref(storage, chosenImage.name);
			await uploadBytes(imageRef, chosenImage);
			imageUrl = await getDownloadURL(imageRef);
		}
		const newDress: any = {
			...infoRef.current,
			image: imageUrl,
			sizes: sizesState,
		};
		addProduct(newDress);
		localStorage.removeItem('cart');
		getCart();
		setLoading(false);
		router.back();
	};

	return (
		<>
			<div className='mt-10 sm:mt-0 max-w-'>
				<div className='md:grid md:grid-cols-3 md:gap-6'>
					<div className='md:col-span-1'>
						<div className='px-4 sm:px-0'>
							<h3 className='text-lg font-medium leading-6 text-gray-900'>
								Personal Information
							</h3>
						</div>
					</div>
					<div className='mt-5 md:mt-0 md:col-span-2'>
						<form onSubmit={(e) => handleSubmit(e)} method='POST'>
							<div className='shadow overflow-hidden sm:rounded-md'>
								<div className='px-4 py-5 bg-white sm:p-6'>
									<div className='grid grid-cols-6 gap-6'>
										<div className='col-span-6 sm:col-span-3'>
											<label
												htmlFor='title'
												className='block text-sm font-medium text-gray-700'
											>
												Title
											</label>
											<input
												onChange={(e) => handleChangeInput(e)}
												type='text'
												name='title'
												id='title'
												placeholder='Title'
												required
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
											/>
										</div>

										<div className='col-span-6'>
											<label
												htmlFor='price'
												className='block text-sm font-medium text-gray-700'
											>
												Price
											</label>
											<input
												onChange={(e) => handleChangeInput(e)}
												type='text'
												name='price'
												id='price'
												required
												placeholder='Price'
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
											/>
										</div>

										<div className='col-span-6'>
											<label
												htmlFor='color'
												className='block text-sm font-medium text-gray-700'
											>
												Color
											</label>
											<input
												onChange={(e) => handleChangeInput(e)}
												type='text'
												name='color'
												id='color'
												required
												placeholder='Color'
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
											/>
										</div>

										<div className='col-span-6'>
											<label
												htmlFor='rating'
												className='block text-sm font-medium text-gray-700'
											>
												Rating
											</label>
											<input
												onChange={(e) => handleChangeInput(e)}
												type='text'
												name='rating'
												required
												placeholder='Rating'
												id='rating'
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
											/>
										</div>
										<div className='col-span-6'>
											<label
												htmlFor='reviewCount'
												className='block text-sm font-medium text-gray-700'
											>
												ReviewCount
											</label>
											<input
												onChange={(e) => handleChangeInput(e)}
												type='text'
												name='reviewCount'
												required
												placeholder='ReviewCount'
												id='reviewCount'
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
											/>
										</div>
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
																size.inStock ? 'ring-2 ring-indigo-500' : '',
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

										<div className='col-span-6 sm:col-span-4'>
											<label
												htmlFor='image'
												className='block text-sm font-medium text-gray-700'
											>
												Image
											</label>
											<input
												onChange={(e) =>
													setChooseImage(
														e.target.files ? e.target.files[0] : null
													)
												}
												type='file'
												required
												placeholder='Image'
												name='image'
												id='image'
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
											/>
										</div>
									</div>
								</div>
								<div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
									<button
										type='submit'
										className='inline-flex justify-center py-2 px-4 w-full border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '
									>
										{loading ? (
											<>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='animate-bounce h-5 w-5 mr-3'
													viewBox='0 0 20 20'
													fill='currentColor'
												>
													<path
														fillRule='evenodd'
														d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z'
														clipRule='evenodd'
													/>
												</svg>
												Загружаю
												<span className='ml-1 animate-bounce text-white font-semibold text-sm'>
													.
												</span>
												<span className='animation-delay-75 animate-bounce text-white font-semibold text-sm'>
													.
												</span>
												<span className='animation-delay-225 delay-100 animate-bounce text-white font-semibold text-sm'>
													.
												</span>
											</>
										) : (
											'Добавить'
										)}
									</button>
									<button
										onClick={() => router.back()}
										type='button'
										className='inline-flex justify-center py-2 px-4 w-full border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 mt-1'
									>
										Отменить
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddDressForm;
