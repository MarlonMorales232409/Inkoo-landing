/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'inkoo-black': '#000000',
                'inkoo-cyan': '#2d9cdb',
                'inkoo-magenta': '#d6186e',
                'inkoo-yellow': '#f2c94c',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
            },
            spacing: {
                'touch': '44px', // Minimum touch target size
            },
            fontSize: {
                'base': '16px', // Prevent iOS zoom on input focus
            },
        },
    },
    plugins: [],
}
