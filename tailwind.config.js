// tailwind.config.js
module.exports = {
  // Enable dark mode via class or data-theme attribute
  darkMode: ['class', '[data-theme="dark"]'],

  // Paths to all of your template files
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        surface: 'var(--color-surface-light)',
        'surface-dark': 'var(--color-surface-dark)',
        border: 'var(--color-border)',
      },
    },
  },

  plugins: [],
};
