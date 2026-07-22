/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: '#2563eb',
                'brand-light': '#3b82f6',
                'brand-dark': '#1e40af',
                accent: '#a855f7',
                'accent-light': '#c084fc',
                foreground: '#f3f4f6',
                background: '#111827',
                card: '#1f2937',
                border: '#374151',
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
                neutral: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                },
            },
            fontFamily: {
                heading: ['Inter', 'system-ui', 'sans-serif'],
                body: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
