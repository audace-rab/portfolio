/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        chalk: '#F9F9FB',
        paper: '#FFFFFF',
        graphite: '#111827',
        muted: '#4B5563',
        subtle: '#6B7280',
        hairline: '#E5E7EB',
        cobalt: {
          DEFAULT: '#1E40AF',
          hover: '#1E3A8A',
        },
      },
    },
  },
  plugins: [],
}
