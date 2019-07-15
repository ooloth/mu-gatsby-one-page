# [michaeluloth.com](https://www.michaeluloth.com)

This is the source code for my personal website.

## Project Structure

- Built in [React](https://reactjs.org) using [Gatsby](https://www.gatsbyjs.org). (If you're new to Gatsby, check it out! It's a game-changer.)
- Content stored in `YAML` files in `src/data` (for easy updating)
- Uses [GraphQL](https://graphql.org) to pull content from `YAML` into the relevant React components

## Deployment

- At build time, Gatsby runs the GraphQL queries and generates optimized static assets (i.e. HTML files + JS files + optimized images)
- The static files are deployed directly to [Netlify](https://www.netlify.com)'s global CDN (free tier)
- When a user visits the site, the static version loads first (for speed), and then hydrates into a single-page React app