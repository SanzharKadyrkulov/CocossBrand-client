/* eslint-disable @next/next/no-img-element */
import React from 'react';

const Contacts = () => {
	return (
		<div
			className='p-5 flex flex-col h-screen content-end'
			style={{
				background:
					'url(https://codesandbox.io/api/v1/sandboxes/cq3f6/screenshot.png) no-repeat center',
				backgroundSize: 'cover',
			}}
		>
			{/* <img
				src='https://images.vexels.com/media/users/3/127457/isolated/preview/9c50c2d41655ef419382a860c2a79dde-coconut-circle-icon.png'
				alt='logo'
				width={150}
				className='m-auto'
			/> */}
			<a
				href='https://wa.me/message/SRIWAFPQACGOF1'
				target='_blank'
				rel='noreferrer'
			>
				<button className='w-full from-indigo-500 bg-gradient-to-t bg-indigo-700 py-3 rounded-xl text-emerald-50 mb-3 shadow-md'>
					Whatsapp
				</button>
			</a>
			<a
				href='https://www.instagram.com/cocoss.brand/'
				target='_blank'
				rel='noreferrer'
			>
				<button className='w-full from-indigo-500 bg-gradient-to-t bg-indigo-700 py-3 rounded-xl text-emerald-50 mb-3 shadow-md'>
					Instagram
				</button>
			</a>
		</div>
	);
};

export default Contacts;
