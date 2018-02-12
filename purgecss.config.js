module.exports = {
  content: [`public/index.html`, `src/**/*.js`],
  css: [`src/styles/builds/after-postcss/main.css`],
  whitelist: [`sm\:di`],
  whitelistPatterns: [/body/, /slick/]
}
