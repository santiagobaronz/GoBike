/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: 'class',
	theme: {
		screens: {
			sm: '550px',
			md: '750px',
			lg: '1024px',
			xl: '1220px',
		},
		container: {
			center: true,
		},
		colors: {
			'bg-color': '#161618',
			'app-color': '#161618',
		}
	},
	plugins: [],
}