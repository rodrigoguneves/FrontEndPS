// This file is intentionally blank if not used.
// However, to add custom utilities like shadow-top-md, it would look like this:

// If no tailwind.config.js exists, create one with this content.
// If it exists, merge the theme.extend part.

module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}", // Adjust according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        'sorvetao-primary': '#e73664',
        'sorvetao-secondary-bg': '#f0f7ff',
        'sorvetao-pink-light': '#fff0f3',
        'sorvetao-green-badge-bg': '#e6f7f0',
        'sorvetao-green-badge-text': '#00875a',
        'sorvetao-gray-badge-bg': '#f0f2f5',
        'sorvetao-gray-badge-text': '#595959',
        'sorvetao-gray-light': '#f7fafc',
        'sorvetao-gray-medium': '#e2e8f0',
        'sorvetao-text-primary': '#1f2937',
        'sorvetao-text-secondary': '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'top-md': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
