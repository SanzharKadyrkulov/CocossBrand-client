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
		active: false,
	},
	{
		name: 'XS',
		inStock: false,
		active: false,
	},
	{
		name: 'S',
		inStock: false,
		active: true,
	},
	{
		name: 'M',
		inStock: false,
		active: false,
	},
	{
		name: 'L',
		inStock: false,
		active: false,
	},
	{
		name: 'XL',
		inStock: false,
		active: false,
	},
	{
		name: 'XXL',
		inStock: false,
		active: false,
	},
	{
		name: 'XXXL',
		inStock: false,
		active: false,
	},
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const AddDressForm = () => {
	const [chosenImage, setChooseImage] = useState<File | null>(null);
	const [sizesState, setSizesState] = useState(sizes);
	const [selectedSize, setSelectedSize] = useState(sizes[2]);
	const changeSizeStatus = (name: string) => {
		setSizesState((state) => {
			const newSizes = state.map((item) =>
				item.name === name ? { ...item, active: !item.active } : item
			);
			return newSizes;
		});
	};
	const { getCart, addProduct } = useActions();
	const infoRef = useRef<IInfo>({} as IInfo);
	const router = useRouter();

	useEffect(() => {
		console.log(chosenImage);
	}, [chosenImage]);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newObj = {
			...infoRef.current,
			[e.target.name]: e.target.value,
		};
		infoRef.current = newObj;
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let imageUrl;
		if (chosenImage) {
			const imageRef = ref(storage, chosenImage.name);
			await uploadBytes(imageRef, chosenImage);
			imageUrl = await getDownloadURL(imageRef);
		}
		const finalSizes = sizesState.map((item) =>
			item.active ? { ...item, inStock: true } : item
		);
		const newDress: any = {
			...infoRef.current,
			image: imageUrl,
			sizes: finalSizes,
		};
		addProduct(newDress);
		localStorage.removeItem('cart');
		getCart();
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

										<div className='col-span-6 sm:col-span-6 lg:col-span-3'>
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
												value={selectedSize}
												onChange={(e) => changeSizeStatus(e.name)}
												className='mt-4'
											>
												<div className='grid grid-cols-4 gap-4'>
													{sizesState.map((size) => (
														<RadioGroup.Option
															key={size.name}
															value={size}
															className={classNames(
																'bg-white shadow-sm text-gray-900 cursor-pointer',
																size.active ? 'ring-2 ring-indigo-500' : '',
																'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
															)}
														>
															<>
																<RadioGroup.Label as='p'>
																	{size.name}
																</RadioGroup.Label>
																<div
																	className={classNames(
																		size.active ? 'border' : 'border-2',
																		size.active
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
										className='inline-flex justify-center py-2 px-4 w-full border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										Добавить
									</button>
									<button
										onClick={() => router.back()}
										type='button'
										className='inline-flex justify-center py-2 px-4 w-full border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 mt-1'
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
