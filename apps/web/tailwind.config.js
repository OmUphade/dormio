import baseConfig from '@dormio/config/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [baseConfig],
  content: ['./src/**/*.{js,jsx,mdx}', '../../packages/*/src/**/*.{js,jsx}'],
};
