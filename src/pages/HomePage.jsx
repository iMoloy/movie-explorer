import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

function HomePage() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch a sample of top-rated / popular shows for featured section
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data) => {
        // Take 4 high-rated shows for preview
        const topShows = [...data]
          .filter((show) => show.rating?.average && show.image?.medium)
          .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
          .slice(0, 4);
        setFeaturedMovies(topShows);
      })
      .catch(() => {
        // Fallback silently if offline or rate-limited
      })
      .finally(() => setLoadingFeatured(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white selection:bg-yellow-400 selection:text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow">
        <section
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20"
          style={{
            background:
              "radial-gradient(ellipse at top, #1e293b 0%, #0f172a 50%, #030712 100%)",
          }}
        >
          {/* Subtle Ambient Background Gradients & Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Decorative Floating Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <span className="absolute top-12 left-8 sm:left-24 text-6xl sm:text-7xl opacity-15 animate-pulse">
              🎬
            </span>
            <span className="absolute top-28 right-8 sm:right-28 text-5xl sm:text-6xl opacity-15">
              🍿
            </span>
            <span className="absolute bottom-16 left-12 sm:left-32 text-5xl opacity-10">
              🎥
            </span>
            <span className="absolute bottom-24 right-12 sm:right-36 text-6xl opacity-15 animate-bounce">
              ⭐
            </span>
          </div>

          {/* Hero Content Container */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/30 text-yellow-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-8 backdrop-blur-sm shadow-inner">
              <span>✨</span>
              <span>Your Ultimate Entertainment Companion</span>
            </div>

            {/* Wireframe Matched Main Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight uppercase">
              DISCOVER <span className="text-yellow-400">MOVIES</span>
            </h1>

            {/* Engaging Description */}
            <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Explore and discover your favorite movies from around the world.
              Search titles, check IMDb-style ratings, and view in-depth details
              in seconds.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/movies"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-extrabold text-lg sm:text-xl px-10 py-4 rounded-2xl shadow-xl shadow-yellow-400/25 hover:shadow-yellow-400/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>🚀</span>
                <span>Explore Now</span>
              </Link>
            </div>

            {/* Stats / Highlights */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto mt-16 pt-10 border-t border-gray-800/80">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-yellow-400">
                  1,000+
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Shows & Movies
                </p>
              </div>
              <div className="text-center border-x border-gray-800">
                <p className="text-2xl sm:text-3xl font-extrabold text-yellow-400">
                  Instant
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Live Search
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-yellow-400">
                  100%
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Free Access
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Movies Preview Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-yellow-400 text-sm font-semibold tracking-wider uppercase">
                Top Picks
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                🌟 Trending & Top Rated
              </h2>
            </div>
            <Link
              to="/movies"
              className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 flex items-center gap-1 transition-colors"
            >
              View all in catalog &rarr;
            </Link>
          </div>

          {loadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col"
                >
                  <div className="w-full aspect-[2/3] bg-gray-800" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-800 rounded w-3/4" />
                    <div className="h-4 bg-gray-800 rounded w-1/2" />
                    <div className="h-10 bg-gray-800 rounded-xl mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSeeDetails={(show) => setSelectedMovie(show)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Features Highlights Section */}
        <section className="py-16 bg-gray-900/50 border-t border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Why MovieExplorer?
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Built with React and modern web standards for a blazing fast,
                seamless movie discovery journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/60 hover:border-yellow-400/50 transition">
                <div className="w-12 h-12 bg-yellow-400/20 text-yellow-400 flex items-center justify-center text-2xl rounded-xl mb-4">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Instant Search
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Real-time query matching powered by the comprehensive TVMaze
                  API database.
                </p>
              </div>

              <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/60 hover:border-yellow-400/50 transition">
                <div className="w-12 h-12 bg-yellow-400/20 text-yellow-400 flex items-center justify-center text-2xl rounded-xl mb-4">
                  📑
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Rich Details Modal
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Access comprehensive overviews, ratings, premiered dates,
                  genres, and broadcast networks without leaving your place.
                </p>
              </div>

              <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/60 hover:border-yellow-400/50 transition">
                <div className="w-12 h-12 bg-yellow-400/20 text-yellow-400 flex items-center justify-center text-2xl rounded-xl mb-4">
                  📱
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Fully Responsive
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Crafted for all viewports from mobile smartphones to
                  ultra-wide desktop screens with touch-friendly controls.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal for featured movie details */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default HomePage;
