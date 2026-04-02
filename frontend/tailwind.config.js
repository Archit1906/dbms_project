/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'glass-bg': 'var(--glass-bg)',
        'glass-border': 'var(--glass-border)',
        'accent-gold': 'var(--accent-gold)',
        'accent-blue': 'var(--accent-blue)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        'success': 'var(--success)',
        'danger': 'var(--danger)',
      }
    },
  },
  plugins: [],
}
