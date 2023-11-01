/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"black-russian": "#13151a"
			},
			borderWidth: {
				DEFAULT: '1px',
				'1': '1px',
				'6': '6px'
			}
		},

	},
	plugins: [
		require("tailwindcss-3d"),
	],
}
