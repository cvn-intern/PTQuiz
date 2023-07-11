/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				primary: '#f8fff0',
				secondary: '#8daf74',
				background: '#f5f5f5',
				darkGreen: '#1E3F20',
				buttonHover: '#1e3f20'
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
	plugins: []
};
