import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store/store';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<div className=''>
				<Component {...pageProps} />
			</div>
		</Provider>
	);
}

export default MyApp;
