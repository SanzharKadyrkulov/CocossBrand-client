import { E164Number } from 'libphonenumber-js/types';
import { useRouter } from 'next/router';
import React, { FC, useRef, useState } from 'react';
import Input from 'react-phone-number-input/input';
import ru from 'react-phone-number-input/locale/ru.json';
import 'react-phone-number-input/style.css';
import useActions from '../../../hooks/useActions';
import { IInfo } from '../../../store/order/order.types';

const OrderForm: FC = () => {
	const { getCart, addOrder } = useActions();
	const [phoneNumber, setPhoneNumber] = useState<E164Number>();
	const infoRef = useRef<IInfo>({} as IInfo);
	const router = useRouter();

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newObj = {
			...infoRef.current,
			[e.target.name]: e.target.value,
		};
		infoRef.current = newObj;
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const cart = JSON.parse(localStorage.getItem('cart') as string);
		const newOrder = {
			...cart,
			userInfo: { ...infoRef.current, phoneNumber },
			// date: new Date().toString().split(' ').slice(0, 5).join(' '),
			// date: new Date(Date.now()).toDateString(),
			date: Date.now(),
		};
		addOrder(newOrder);
		localStorage.removeItem('cart');
		getCart();
		router.push('checkout');
	};

	return (
		<div className='mt-10 sm:mt-0'>
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
											htmlFor='first-name'
											className='block text-sm font-medium text-gray-700'
										>
											??????
										</label>
										<input
											onChange={(e) => handleChangeInput(e)}
											type='text'
											name='firstName'
											id='first-name'
											placeholder='????????????'
											required
											autoComplete='given-name'
											className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300'
										/>
									</div>

									{/* <div className='col-span-6 sm:col-span-4'>
										<label
											htmlFor='phone-number'
											className='block text-sm font-medium text-gray-700'
										>
											?????????? ????????????????
										</label>
										<PhoneInputWithCountrySelect
											countrySelectProps={{ unicodeFlags: true }}
											international
											countryCallingCodeEditable={false}
											defaultCountry='KG'
											value={phoneNumber}
											onChange={setPhoneNumber}
											type='text'
											required
											labels={ru}
											placeholder='?????? ??????????????'
											// name='phoneNumber'
											// id='phone-number'
											className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
										/>
									</div> */}

									<div className='col-span-6 sm:col-span-6 lg:col-span-2'>
										<label
											htmlFor='city'
											className='block text-sm font-medium text-gray-700'
										>
											??????????
										</label>
										<input
											onChange={(e) => handleChangeInput(e)}
											type='text'
											name='city'
											id='city'
											required
											placeholder='????????????'
											autoComplete='address-level2'
											className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300'
										/>
									</div>

									<div className='col-span-6'>
										<label
											htmlFor='street-address'
											className='block text-sm font-medium text-gray-700'
										>
											??????????
										</label>
										<input
											onChange={(e) => handleChangeInput(e)}
											type='text'
											name='address'
											required
											placeholder='???????????????? ??????, 92'
											id='street-address'
											autoComplete='street-address'
											className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300'
										/>
									</div>

									<div className='col-span-6 sm:col-span-4'>
										<label
											htmlFor='phone-number'
											className='block text-sm font-medium text-gray-700 mb-1'
										>
											?????????? ????????????????
										</label>
										<div className='rounded-md overflow-hidden'>
											<Input
												country='KG'
												international
												withCountryCallingCode
												value={phoneNumber}
												onChange={setPhoneNumber}
												required
												labels={ru}
												placeholder='?????? ??????????????'
											/>
										</div>
									</div>
								</div>
							</div>
							<div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
								<button
									type='submit'
									className='inline-flex justify-center py-2 px-4 w-full border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
									????????????????
								</button>
								<button
									onClick={() => router.back()}
									type='button'
									className='inline-flex justify-center py-2 px-4 w-full border border-transparent shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 mt-1'
								>
									????????????????
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default OrderForm;
