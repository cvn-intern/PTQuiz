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
				optionA: '#c57ce9',
				optionB: '#63e890',
				optionC: '#6c8ffc',
				optionD: '#febf71',
				redLight: '#FF6B6B',
				orangeLogo: '#f76800',
				yellowLogo: '#ffb411',
				blueLogo: '#00d6ca',
				run1st: '#FFAA00',
				run2st: '#179cd4',
				run3st: '#23d964',
				bgChat: '#fab73d',
				bgChat2: '#fab73d',
				yellowChat: '#E8B100',
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
				body: ['STIX Two Text'],
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
				userInfo: '250px',
				dropDown: '220px',
				screenHalf: '65vw'
			},
			minHeight: {
				titleCard: '3.5rem'
			},
			maxHeight: {
				titleCard: '3.75rem',
				boxCardQuestion: '27rem',
				halfScreen: '50vh',
				attempt: '40vh',
				sidebarCreateQuiz: '60vh'
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
			},
			zIndex: {
				60: '60',
				70: '70',
				80: '80',
				90: '90',
				100: '100'
			},
			height: {
				halfScreen: '50vh',
				heightImage: '15rem',
				heightImageMobile: '9.3rem'
			},
			backgroundImage: {
				user: "url('https://vapa.vn/wp-content/uploads/2022/12/we-bare-bears-hinh-nen-cute-001-1.jpg')",
				chat: "url('https://wallpapers.com/images/high/pixel-3-background-04zh8d2aw40nzy0h.webp')",
				room: "url('https://lh3.googleusercontent.com/fife/AKsag4Mlp7CeAomPddKWlfUdqplY8gYI7QRaB29JBGx4kn0AehQI08kZJxYhqttjWDc9z_SDlAkbYU0r_ObPS61KJ4x_ARJKl3YLKEipCTior05sNk4pgbyvh1Zz2ybLYbLAjeKvxlzUjCZsbHEV001_IbiErZfYJMgNMnQ5VXX0OkBs91TeXWXOBgmJbsCcPYb9CBTsIEu-x4uDWlDNlbY439AprHWeuJcPvcBl1MReTDpfX8f4lthUO_HsLWciM7tl2NWXx4LVLtwz8cw6pMh2lbRNuknTJk-VAAS08eWSry8_JyhVlNqunMTBUz0fFwUSq88z_yyN9jmlFclJ0OZFS_IXaHmTrHE3HIQMcHVghk6Lfu7ke1gcFdHH3HKyZqauSlnioIUnPLphsGxTLyeKPlMzE33OQnS2RA51H96_6xOg3Zcc2vCWoe483JK4sIpVSl1jCFCvdWqwRzKr-5icmLxupNF5QPGZGlMIL2Ko5TDb0cbg5j5flN4b6XEaebBcO3Ap9uRp1rl3R59rxXZT9GCpd9yKmYVo5BJhKz1VNlEAbbUA2BAUMy643mf-XK4EanhcmDCF1qYJDTVlcubOd7G-o3d-Xd5FZsbuqUZnO2Z6VjBWGGWNpE8Mqxvkot4srWw36F1-P9HTldQV4xrXuLnAc6VyckpsbxiXRD12r06W4JTb2zBwASkcUkRWreMLTmlPEDuwabbYsYKcxLbL0mdPb9QPNGylaN4MikIIYRZUOK1KYrCNJPqkNu-9bh_c23oFe5fPsUL0x7dKdeCy6dTG7my6Me5XYQrdt7zf4wW5kyMjn7w_wSF7j-df7PLrfX2ItaI_py6A1rBSZbtOcb5JyRnQkkYX0H2j5HHFI3TaV8rfYzkhqtREL51NavoWXSJZeD30j7s236BiZGqCtdg8S2mJWm3TRFnuyPPZSG8sO_ufPVcWv8Bp9sFgRTnnVEtl8YmSMMb7bCByQHGrracej8rZBGXd7sb7BQusJFIyE-LfhXPARvtlZ7MFkFdTZ1tNjREHT_eCnUlXq8LSmBQMs787fWMoegXbDGB-m4uM0h-sqMNF6szd0gJn-e6mVx4YxaMvldjFUVNvRvDkNWpCjzDSnGpPITErscO3o22l6UlowL5nK6M-2DO3dwxK42WTxcaHhM3To_3wgwRsExRwIh4p9cAo83WCVMGyy7r7lf1bQjSiyZiG1gRyfomKbT4iiMbU6vJuqKSL6otmwy9TKX0ly3m66aKkJFqE2asVTXImui1NgsGjjRu3t7X032HdRQ6t8q8UQq2XeSg8WgQvIXBH8rYkdv5LYygQRw1ofpBh2oa1cc11ZiKl7SVB9RooErYQ31qVWssMS4E_RBtj7nk2ogK4Y1DmMSF0K5abdhPNcu9SGj8Gt1dM18lGqa34OzflXD0NnhKKoHJBzd0fr9TnFuDWCyylYkMPjAubzkp4K7O4iHN5dV7GQydGnSEZUKg6kdS3_nz0mSlXtgMgF_FsuFElSaLEVW8q-Q1C7rlN6Af2OhMjEaCFi_w3I357JHmr=w1920-h969')",
				room2: "url('https://cdn3.vectorstock.com/i/1000x1000/13/87/tropical-leaves-frame-isolated-nature-background-vector-46891387.jpg')"
			},
			boxShadow: {
				shadowChat: 'rgba(149, 157, 165, 0.2) 0 8px 24px'
			}
		}
	},
	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};
