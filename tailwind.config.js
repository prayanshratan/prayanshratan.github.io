/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class', '[data-theme="dark"]'],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                // Semantic Layout Colors
                background: "var(--bg-primary)",
                foreground: "var(--text-primary)", // Default text color

                muted: {
                    DEFAULT: "var(--bg-secondary)", // Secondary background
                    foreground: "var(--text-secondary)", // Muted text
                },

                card: {
                    DEFAULT: "var(--bg-card)",
                    foreground: "var(--text-primary)",
                },

                // Brand Colors
                brand: {
                    DEFAULT: "var(--accent-primary)",
                    foreground: "#ffffff",
                    hover: "var(--accent-hover)",
                },

                // Keep direct access if needed, but discouraged
                border: "var(--border-light)",
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                "meteor-effect": "meteor 5s linear infinite",
                "blob": "blob 7s infinite",
                "shimmer": "shimmer 2s linear infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                meteor: {
                    "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
                    "70%": { opacity: "1" },
                    "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" },
                },
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
                shimmer: {
                    from: { backgroundPosition: "0 0" },
                    to: { backgroundPosition: "-200% 0" },
                },
            },
            backgroundImage: {
                'grid-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
                'grid-pattern-light': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
            },
        },
    },
    plugins: [],
}
