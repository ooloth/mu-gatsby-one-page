module.exports = {
  plugins: [
    require('tailwindcss')('./src/styles/tailwind.config.js'),
    require('postcss-cssnext')(),
    require('postcss-reporter')({ clearMessages: true })
  ]
}
