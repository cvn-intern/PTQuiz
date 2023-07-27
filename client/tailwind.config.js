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
				buttonAnswer: '#6f49c3',
				greenLight: '#DFF5E8',
				optionA: '#fd696e',
				optionB: '#63e890',
				optionC: '#6c8ffc',
				optionD: '#febf71',
				redLight: '#FF6B6B',
				orangeLogo: '#f76800',
				yellowLogo: '#ffb411',
				blueLogo: '#00d6ca',
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
			},
			width: {
				desktop: '20rem',
				ipad: '17rem',
				mobile: '12rem'
			},
			minHeight: {
				titleCard: '3.5rem'
			},
			maxHeight: {
				titleCard: '3.75rem',
				boxCardQuestion: '27rem'
			},
			maxWidth: {
				tagName: '33%'
			},
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-2deg)' },
					'50%': { transform: 'rotate(2deg)' }
				}
			},
			animation: {
				wiggle: 'wiggle 1s ease infinite'
			},
			scale: {
				102: '1.02'
			}
		}
	},
	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};
