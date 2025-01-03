import { tailwind } from '@repo/tailwind-config';

export default {
    ...tailwind,
    content: [
        './components/**/*.{js,ts,jsx,tsx}',
        './stories/**/*.{js,ts,jsx,tsx}',
        './.storybook/**/*.{js,ts,jsx,tsx}',
    ],
}; 