/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'tailwindui.com',
			'images.unsplash.com',
			'fakestoreapi.com',
			'lh3.googleusercontent.com',
		],
	},
};

module.exports = nextConfig;
