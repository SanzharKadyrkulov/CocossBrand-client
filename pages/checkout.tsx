import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Checkout: NextPage = () => {
	const router = useRouter();
	setTimeout(() => {
		router.push('/list');
	}, 3500);
	return (
		<>
			<div className='p-8 flex items-center justify-center flex-col'>
				<h1 className='text-3xl'>Ваш заказ оформлен!</h1>
				<h2 className='text-2xl mt-14 text-stone-800 text-center'>
					Скоро мы с вами свяжемся
				</h2>
				<Link href='/list'>
					<a className='text-indigo-600  hover:text-indigo-700'>
						Back to catalog
					</a>
				</Link>
			</div>
		</>
	);
};

export default Checkout;
