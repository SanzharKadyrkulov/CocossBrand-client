module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./app/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
	],
};
