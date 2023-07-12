/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				primary: '#f8fff0',
				secondary: '#8daf74',
				background: '#f5f5f5',
				darkGreen: '#1E3F20',
				buttonHover: '#1e3f20',
				primaryColor: {
					50: '#FFF5F2',
					100: '#FFF1EE',
					200: '#FFE4DE',
					300: '#FFD5CC',
					400: '#FFBCAD',
					500: '#FE795D',
					600: '#EF562F',
					700: '#EB4F27',
					800: '#CC4522',
					900: '#A5371B'
				}
			},
			fontFamily: {
				body: ['Sora'],
				title: ['Jost']
			},
			loginWidth: {
				panel: '446px'
			}
		}
	},
	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};
