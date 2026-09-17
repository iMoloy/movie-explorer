# 🎬 MovieExplorer

> A modern, responsive web application to browse, search, and explore movies and TV shows from around the world with real-time data powered by the **TVMaze API**.

---

## 🚀 Live Demo & Links

- **Live Deployment:** [Deploy on Vercel / Netlify](https://vercel.com/) _(Add your deployed link here)_
- **GitHub Repository:** _(Public repository link)_

---

## ✨ Key Features

### 1. 🏠 Home Page (Landing Page)

- **Cinematic Navbar**: Brand identity (`🎬 MovieExplorer`), navigation links, active page highlight, responsive mobile hamburger drawer, and a prominent call-to-action button.
- **Hero Banner**: Eye-catching cinematic gradient background with floating badges, bold typography (`DISCOVER MOVIES`), engaging tagline, and a direct `🚀 Explore Now` CTA button matching assignment wireframes.
- **Top Picks Preview**: Curated preview of trending and top-rated shows from the live API with instant detail modal access.
- **Key Statistics & Highlights**: Quick overview metrics (1,000+ shows, instant search, 100% free API).
- **Responsive Footer**: Brand info, quick links, copyright notice (`© 2026 MovieExplorer`), and social/GitHub links.

### 2. 🍿 Movie Listing Page (`/movies`)

- **Prominent Search Bar**: Fast title search matching wireframe (`🔍 Search for a movie...`) with debounced auto-querying and manual search/clear controls.
- **Dynamic API Integration**:
  - Live search via `GET https://api.tvmaze.com/search/shows?q=:query`
  - Catalog browsing via `GET https://api.tvmaze.com/shows`
- **Smart Filtering & Sorting**:
  - Filter by dynamically extracted genres (Action, Drama, Comedy, Sci-Fi, Crime, etc.)
  - Sort by default order, rating (high to low), premiere date (newest first), or title (A-Z).
- **Responsive Grid**:
  - Mobile: Single-column touch-friendly cards.
  - Tablet/Desktop: Multi-column CSS Grid (2-4 columns) with smooth hover elevations.
- **Interactive Movie Cards**:
  - High-resolution poster with graceful fallback placeholder.
  - Title with clean truncation and tooltip.
  - Rating badge (`⭐ 8.5`) and premiere year (`📅 2024`).
  - Genre pill tags.
  - `See Details` action button.
- **UX States**:
  - Animated skeleton loading cards.
  - Friendly empty state with reset button.
  - Error state with retry trigger.

### 3. 🎞️ Movie Details Modal

- **Wireframe Alignment**:
  - Top `[ ✕ ]` close button.
  - Large backdrop/poster banner image with gradient overlay.
  - Title, rating (`⭐ Rating: 8.5`), and premiere date (`📅 Release: 2024`).
  - Cleaned synopsis overview (HTML tags stripped).
  - Extended metadata: Genres, Status, Language, Network/Channel, Runtime, and Official Website link.
  - Bottom `[ ❌ Close ]` button.
- **Interactive Accessibility**:
  - Close via top button, bottom button, clicking outside on the backdrop, or pressing the `Escape` key.
  - Background body scroll locking while modal is open.

---

## 🛠️ Technology Stack

| Technology          | Purpose                                    |
| :------------------ | :----------------------------------------- |
| **React 18**        | Component-driven UI architecture           |
| **Vite**            | Lightning-fast development & build tooling |
| **React Router v7** | Client-side routing (`/` and `/movies`)    |
| **Tailwind CSS v3** | Modern utility-first responsive styling    |
| **TVMaze API**      | Free, open TV & movie REST API             |
| **ESLint 9**        | Code quality & best practices              |

---

## 📐 API Endpoints Used

| Action           | Endpoint                                           | Description                          |
| :--------------- | :------------------------------------------------- | :----------------------------------- |
| **All Shows**    | `GET https://api.tvmaze.com/shows`                 | Fetches initial movie & show catalog |
| **Search Shows** | `GET https://api.tvmaze.com/search/shows?q=:query` | Searches titles by user query string |

---

## 📂 Project Structure

```text
movie-explorer/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Footer.jsx        # App footer with copyright and social links
│   │   ├── MovieCard.jsx     # Reusable responsive movie card component
│   │   ├── MovieModal.jsx    # Interactive movie details modal dialog
│   │   └── Navbar.jsx        # Sticky navigation with mobile drawer
│   ├── pages/
│   │   ├── HomePage.jsx      # Landing page with hero banner and top picks
│   │   └── MoviesPage.jsx    # Browse, search, filter, and modal page
│   ├── App.jsx               # Application routes
│   ├── index.css             # Tailwind CSS directives
│   └── main.jsx              # React DOM entry point
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry template with fonts and metadata
├── package.json              # Project scripts and dependencies
├── postcss.config.js         # PostCSS configuration for Tailwind
├── tailwind.config.js        # Tailwind styling configuration
└── vite.config.js            # Vite configuration
```

---

## 💻 Local Development Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd movie-explorer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open your browser at `http://localhost:5173` to explore the app.

### 4. Build for production

```bash
npm run build
```

### 5. Lint check

```bash
npm run lint
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `movie-explorer` repository.
4. Keep the default settings (Framework preset: `Vite`, Build command: `npm run build`, Output directory: `dist`).
5. Click **"Deploy"**.

---

## 📄 License & Attribution

- Application built for the **Movie Explorer** assignment.
- Data provided by [TVMaze](https://www.tvmaze.com/api).
- © 2026 MovieExplorer. All rights reserved.
