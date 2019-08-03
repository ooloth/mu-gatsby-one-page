# [michaeluloth-v5.netlify.com](https://michaeluloth-v5.netlify.com)

This is the source code for the 5th version my personal website.

(Looking for the latest version? The repo is [here](https://github.com/ooloth/michaeluloth.com) and the live site is [here](https://www.michaeluloth.com).)

## Project Structure

- The site is built in [React](https://reactjs.org) using [Gatsby](https://www.gatsbyjs.org). (If you're new to Gatsby, check it out! It's a game-changer.)
- The `CSS` architecture uses a [utility-first](https://tailwindcss.com/docs/utility-first/) (a.k.a. atomic, functional) approach powered by [Tailwind CSS](https://tailwindcss.com) and [PostCSS](https://postcss.org)
- The content is stored in `YAML` files in `src/data` (for easy updating)
- The site uses [GraphQL](https://graphql.org) to pull content from the `YAML` files into the relevant React components
- The accordion animations (i.e. expanding/collapsing sections) are built with [Greensock (GSAP)](https://greensock.com)

## Deployment

- The site is hosted on [Netlify](https://www.netlify.com) (free tier)
- When this repo changes, Netlify automatically builds a new version of the site
- The build process runs the GraphQL queries and generates optimized static assets (i.e. `HTML` + `JS` + images)
- The static files are deployed to Netlify's global CDN
- When a user visits the site, the static version loads first (for speed)
- The site then hydrates into a single-page React app