import type { NextPage } from 'next';
import HeaderLayout from '../app/components/layouts/HeaderLayout';
import Hero from '../app/components/screens/home/Hero';
const HomePage: NextPage = () => {
	return (
		<HeaderLayout>
			<Hero />
		</HeaderLayout>
	);
};

export default HomePage;
