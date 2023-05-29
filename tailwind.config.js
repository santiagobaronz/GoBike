/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: 'class',
	theme: {
		screens: {
			sm: '450px',
			md: '450px',
			lg: '450px',
			xl: '450px',
		},
		container: {
			center: true,
		},
		colors: {
			'bg-color': '#161618',
			'app-color': '#1E1E20',
			'text-color': '#D9D9D0',
			'purple-color': '#646cff',
			'purple-darker-color': '#454ce1',
			'white-color': '#FFFFFF',
			'daily': '#7F91E6',
			'monthly': '#438196',
			'yearly': '#38914F',
			'brown': '#705647',
			'orange': '#c25848',
			'red': '#b5485f'
		}
	},
	plugins: [],
}