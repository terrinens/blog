import type {Config} from "tailwindcss";
import flowbite from 'flowbite-react/tailwind';

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
        flowbite.content(),
        './node_modules/flowbite/**/*.js'
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('preline/plugin'),
        flowbite.plugin(),
        require('flowbite/plugin')({datatables: true,}),
    ],
};
export default config;
