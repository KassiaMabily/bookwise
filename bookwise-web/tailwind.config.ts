import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            green: {
                100: "#50B2C0",
                200: "#255D6A",
                300: "#0A313C"
            },
            purple: {
                100: "#8381D9",
                200: "#2A2879"
            },
            gray: {
                100: "#F8F9FC",
                200: "#E6E8F2",
                300: "#D1D6E4",
                400: "#8D95AF",
                500: "#303F73",
                600: "#252D4A",
                700: "#181C2A",
                800: "#0E1116",
            }
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)'],
            },
            backgroundImage: {
                "gradient-horizontal": "linear-gradient(to right, #7FD1CC, #9694F5)",
                "gradient-vertical": "linear-gradient(to bottom, #7FD1CC, #9694F5)",
            },

        },
    },
    plugins: [],
};
export default config;
