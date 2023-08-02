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
				run1st : "#FFAA00",
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
				mobile: '12rem',
				panel: '446px',
				userInfo: '260px',
				dropDown: '220px'
			},
			minHeight: {
				titleCard: '3.5rem'
			},
			maxHeight: {
				titleCard: '3.75rem',
				boxCardQuestion: '27rem'
			},
			maxWidth: {
				tagName: '33%',
				dropDown: '200px'
			},
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-2deg)' },
					'50%': { transform: 'rotate(2deg)' }
				},
				changeColorGreen: {
					'0%': { transform: 'scale(1)', backgroundColor: '#D8D9DA' },
					'50%': { transform: 'scale(1.1)', backgroundColor: '#0e9f6e' },
					'100%': { transform: 'scale(1)', backgroundColor: '#D8D9DA' }
				},
				changeColorRed: {
					'0%': { backgroundColor: '#D8D9DA' },
					'50%': { backgroundColor: '#f05252' },
					'100%': { backgroundColor: '#D8D9DA' }
				},
				sequenceA: {
					'0%, 75%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				sequenceB: {
					'0%, 25%': { opacity: '0' },
					'25%, 75%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				sequenceC: {
					'0%, 50%': { opacity: '0' },
					'50%, 75%': { opacity: '1' },
					'100%': { opacity: '0' }
				}
			},
			animation: {
				wiggle: 'wiggle 1s ease infinite',
				changeColorGreen: 'changeColorGreen 3s ease infinite',
				changeColorRed: 'changeColorRed 3s ease infinite',
				sequenceA: 'sequenceA 4s ease infinite ',
				sequenceB: 'sequenceB 4s ease infinite',
				sequenceC: 'sequenceC 4s ease infinite'
			},
			scale: {
				102: '1.02'
			}
		}
	},
	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};
