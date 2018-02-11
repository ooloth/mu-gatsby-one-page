const tailwind = require('tailwindcss')
const cssnext = require('postcss-cssnext')

module.exports = {
  plugins: [
    tailwind('./src/styles/tailwind.config.js'),
    cssnext()
    // any other postcss plugins you want...
  ]
}
