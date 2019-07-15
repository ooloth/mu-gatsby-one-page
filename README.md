# [michaeluloth.com](https://www.michaeluloth.com)

This is the source code for my personal website.

## Project Structure

- Built in [React](https://reactjs.org) using [Gatsby](https://www.gatsbyjs.org). (If you're new to Gatsby, check it out! It's a game-changer.)
- Content stored in `YAML` files in `src/data` (for easy updating)
- Uses [GraphQL](https://graphql.org) to pull content from `YAML` into the relevant React components

## Deployment

- The site is hosted on [Netlify](https://www.netlify.com) (free tier)
- When this repo changes, Netlify automatically builds a new version of the site
- The build process reruns the GraphQL queries and generates optimized static assets (i.e. HTML files + JS files + images)
- The static files are deployed directly to [Netlify](https://www.netlify.com)'s global CDN (free tier)
- When a user visits the site, the static version loads first (for speed)
- After the static version loads, the site hydrates into a single-page React app