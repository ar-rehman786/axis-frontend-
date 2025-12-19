module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],

  safelist: [
    { pattern: /bg-\[var\(--.*\)\]/ },
    { pattern: /text-\[var\(--.*\)\]/ },
    { pattern: /border-\[var\(--.*\)\]/ },
  ],


  theme: {
    extend: {},
  },
  plugins: [],
};
