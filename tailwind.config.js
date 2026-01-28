/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class', '[data-theme="dark"]'],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--bg-primary)',
                    foreground: 'var(--text-primary)',
                },
                secondary: {
                    DEFAULT: 'var(--bg-secondary)',
                    foreground: 'var(--text-secondary)',
                },
                accent: {
                    DEFAULT: 'var(--accent-primary)',
                    foreground: '#ffffff',
                    hover: 'var(--accent-hover)',
                },
                card: {
                    DEFAULT: 'var(--bg-card)',
                    foreground: 'var(--text-primary)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'], // We'll stick to Inter for now but style it boldly
            },
            animation: {
                "meteor-effect": "meteor 5s linear infinite",
                "spotlight": "spotlight 2s ease .75s 1 forwards",
                "shimmer": "shimmer 2s linear infinite",
                "blob": "blob 7s infinite",
            },
            keyframes: {
                meteor: {
                    "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
                    "70%": { opacity: "1" },
                    "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" },
                },
                spotlight: {
                    "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
                    "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
                },
                shimmer: {
                    from: { backgroundPosition: "0 0" },
                    to: { backgroundPosition: "-200% 0" },
                },
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'grid-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
                'grid-pattern-light': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
            },
        },
    },
    plugins: [],
}
