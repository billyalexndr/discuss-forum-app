/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{jsx, js}",
    'node_modules/flowbite/lib/esm/**/*.{js, jsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}