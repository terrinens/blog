import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
        './node_modules/flowbite/**/*.js'
    ],
    plugins: [
        require('@tailwindcss/typography'),
        require('preline/plugin'),
        require('flowbite/plugin')({datatables: true,})
    ],
};
export default config;
