# [michaeluloth.com](https://www.michaeluloth.com)

This is the source code for my personal website.

## Project Structure

- The site is built in [React](https://reactjs.org) using [Gatsby](https://www.gatsbyjs.org). (If you're new to Gatsby, check it out! It's a game-changer.)
- The content is stored in `YAML` files in `src/data` (to make future updates easy)
- The site uses [GraphQL](https://graphql.org) to pull the content from the `YAML` files into the relevant React components

## Deployment

- At build time, Gatsby runs all GraphQL queries and generates optimized static assets (i.e. HTML files + JS files + optimized images)
- The static files are deployed directly to [Netlify](https://www.netlify.com)'s global CDN (free tier)
- After the static version of the site finishes loading, it then hydrates into a single-page React app