# Movie-Explore
# Movie Search App

A dark-theme React movie search application powered by the OMDB API. Search for movies in real time, browse responsive movie cards, open details in a modal, and toggle between light and dark mode.

## Features

- Search movies by title with 500ms debounce
- Responsive movie grid layout with hover animation
- Movie detail modal with poster, plot, director, cast, runtime, and rating
- Dark / light theme toggle
- Loading skeletons and spinner while fetching
- Graceful error handling
- Favorites persistence in `localStorage`
- Sort by rating and genre filter

## Tech Stack

- React 18
- Vite
- CSS Modules
- Functional components with hooks

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd movie-search-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an environment file at the project root:

   ```bash
   copy nul .env
   ```

4. Add your OMDB API key to `.env`:

   ```env
   VITE_OMDB_API_KEY=your_api_key_here
   ```

   > After updating `.env`, stop and restart the Vite dev server so `import.meta.env` picks up the value.

5. Start the development server:

   ```bash
   npm run dev
   ```

## API Key Setup

This app uses the [OMDB API](https://www.omdbapi.com/). Get a free API key by registering at the site, then add it to `.env` as shown above.

## Project Structure

- `src/components/` — UI components
- `src/hooks/` — custom hooks
- `src/utils/` — API helpers and constants
- `src/App.jsx` — main application logic

## Deployment

### Example `.env`

Create a `.env.example` file for local setup docs:

```env
VITE_OMDB_API_KEY=your_api_key_here
```


This app can be deployed to Vercel, Netlify, or any static host that supports Vite.

### Build locally

```bash
npm run build
```

### Deploy to Vercel

1. Sign in at https://vercel.com/
2. Create a new project and connect your GitHub repository
3. Set the build command to `npm run build`
4. Set the output directory to `dist`
5. Add a project environment variable:

   ```bash
   VITE_OMDB_API_KEY=your_api_key_here
   ```

6. Deploy the site and copy the generated live URL.

### Deploy to Netlify

1. Sign in at https://app.netlify.com/
2. Create a new site from Git
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`
5. Add an environment variable in site settings:

   - `VITE_OMDB_API_KEY`
   - `your_api_key_here`

6. Deploy and use the provided URL for the demo.

## Live Demo

Add your Vercel/Netlify demo link here once deployed.

## Screenshots

_Add screenshots of the app here when available._
