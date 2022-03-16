import { Fragment, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import CartDropdown from '../screens/home/cart-dropdown/CartDropdown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import useActions from '../../hooks/useActions';
import { ADMINS } from '../../helpers/consts';

const navigation = [
	{ name: 'Главная', href: '/', current: false },
	{ name: 'Каталог', href: '/list', current: false },
	{ name: 'Связаться с нами', href: '/contacts', current: false },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export default function Header() {
	const { error, userInfo } = useTypedSelector((state) => state.user);
	const { loginWithGoogle, logout, listenAuth } = useActions();
	listenAuth();
	const router = useRouter();

	return (
		<Disclosure as='nav' className='bg-gray-800 sticky top-0 z-10'>
			{({ open }) => (
				<>
					<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
						<div className='relative flex items-center justify-between h-16'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XIcon className='block h-6 w-6' aria-hidden='true' />
									) : (
										<MenuIcon className='block h-6 w-6' aria-hidden='true' />
									)}
								</Disclosure.Button>
							</div>
							<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex-shrink-0 flex items-center'>
									<Image
										onClick={() => router.push('/')}
										className='block lg:hidden h-8 w-auto cursor-pointer'
										width='100%'
										height={32}
										src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
										alt='Workflow'
									/>
								</div>
								<div className='hidden sm:block sm:ml-6'>
									<div className='flex space-x-4'>
										{navigation.map((item) => (
											<span
												onClick={() => router.push(item.href)}
												key={item.name}
												className={classNames(
													'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer',
													'px-3 py-2 rounded-md text-sm font-medium'
												)}
												aria-current={undefined}
											>
												{item.name}
											</span>
										))}
										{userInfo && ADMINS.includes(userInfo.email) ? (
											<span
												onClick={() => router.push('/admin')}
												key={'Admin'}
												className={
													'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
												}
												aria-current={'page'}
											>
												{'Admin'}
											</span>
										) : null}
									</div>
								</div>
							</div>
							<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								<CartDropdown />
								{userInfo ? (
									<Menu as='div' className='ml-3 relative'>
										<div>
											<Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
												<span className='sr-only'>Open user menu</span>
												<Image
													className='h-8 w-8 rounded-full'
													width={32}
													height={32}
													src={userInfo.photoURL}
													alt=''
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter='transition ease-out duration-100'
											enterFrom='transform opacity-0 scale-95'
											enterTo='transform opacity-100 scale-100'
											leave='transition ease-in duration-75'
											leaveFrom='transform opacity-100 scale-100'
											leaveTo='transform opacity-0 scale-95'
										>
											<Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
												<Menu.Item>
													{({ active }) => (
														<a
															onClick={() => logout()}
															className={classNames(
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm text-gray-700'
															)}
														>
															Sign out
														</a>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								) : (
									<button
										className='text-white bg-gray-800 text-sm rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
										onClick={() => loginWithGoogle()}
									>
										Login
									</button>
								)}
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1'>
							{userInfo && ADMINS.includes(userInfo.email) ? (
								<Link key={'Admin'} href={'/admin'}>
									<button
										aria-hidden='true'
										className={classNames(
											'bg-gray-900 text-white',
											'block px-3 py-2 rounded-md text-base font-medium w-full text-left'
										)}
										aria-current={'page'}
									>
										{'Admin'}
									</button>
								</Link>
							) : null}
							{navigation.map((item) => (
								<Link key={item.name} href={item.href}>
									<button
										aria-hidden='true'
										className={classNames(
											item.current
												? 'bg-gray-900 text-white'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'block px-3 py-2 rounded-md text-base font-medium w-full text-left'
										)}
										aria-current={item.current ? 'page' : undefined}
									>
										{item.name}
									</button>
								</Link>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
