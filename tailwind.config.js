/** @type {import('tailwindcss').Config} */
module.exports = {
  // The 'content' array is MANDATORY. It tells Tailwind which files
  // (all .js, .jsx, .ts, .tsx files inside the 'src' directory)
  // to scan for class names so it can generate the corresponding CSS.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
