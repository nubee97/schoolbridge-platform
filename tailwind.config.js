/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial'],
      },
      colors: {
        bridge: {
          navy: '#152238',
          blue: '#2563eb',
          sky: '#e0f2fe',
          mint: '#ccfbf1',
          cream: '#fff7ed',
          coral: '#fb7185',
          ink: '#172033',
        },
      },
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
