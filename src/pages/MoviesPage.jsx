import { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("ALL");
  const [sortBy, setSortBy] = useState("DEFAULT");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch all initial shows
  const fetchAllShows = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://api.tvmaze.com/shows");
      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }
      const data = await response.json();
      // Normalize to list of show objects
      setMovies(data);
    } catch (err) {
      setError(
        err.message || "Failed to load movies. Please check your connection.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Search shows via TVMaze API: GET https://api.tvmaze.com/search/shows?q=:query
  const performSearch = useCallback(
    async (query) => {
      const trimmed = query.trim();
      if (!trimmed) {
        fetchAllShows();
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(trimmed)}`,
        );
        if (!response.ok) {
          throw new Error(`Search failed with status ${response.status}`);
        }
        const data = await response.json();
        // TVMaze search returns [{ score, show: { ... } }] -> normalize to show objects
        const normalized = data.map((item) => item.show).filter(Boolean);
        setMovies(normalized);
      } catch (err) {
        setError(err.message || "Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [fetchAllShows],
  );

  // Initial load
  useEffect(() => {
    fetchAllShows();
  }, [fetchAllShows]);

  // Debounced search when user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  // Form submit (instant search)
  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  // Reset or clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    fetchAllShows();
  };

  // Extract available genres from current movies for filtering
  const availableGenres = useMemo(() => {
    const genreSet = new Set();
    movies.forEach((m) => {
      const show = m.show || m;
      if (Array.isArray(show.genres)) {
        show.genres.forEach((g) => genreSet.add(g));
      }
    });
    return ["ALL", ...Array.from(genreSet).sort()];
  }, [movies]);

  // Filter & Sort movies client-side
  const filteredAndSortedMovies = useMemo(() => {
    let list = [...movies];

    // Filter by genre
    if (selectedGenre !== "ALL") {
      list = list.filter((m) => {
        const show = m.show || m;
        return (
          Array.isArray(show.genres) && show.genres.includes(selectedGenre)
        );
      });
    }

    // Sort
    if (sortBy === "RATING_DESC") {
      list.sort((a, b) => {
        const showA = a.show || a;
        const showB = b.show || b;
        return (showB.rating?.average || 0) - (showA.rating?.average || 0);
      });
    } else if (sortBy === "YEAR_DESC") {
      list.sort((a, b) => {
        const showA = a.show || a;
        const showB = b.show || b;
        return (showB.premiered || "").localeCompare(showA.premiered || "");
      });
    } else if (sortBy === "TITLE_ASC") {
      list.sort((a, b) => {
        const showA = a.show || a;
        const showB = b.show || b;
        return (showA.name || "").localeCompare(showB.name || "");
      });
    }

    return list;
  }, [movies, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white selection:bg-yellow-400 selection:text-gray-900">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <span>🎬 Live TVMaze Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Browse & Search <span className="text-yellow-400">Movies</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Search titles, filter by genre, check ratings, and explore detailed
            synopses in real-time.
          </p>
        </div>

        {/* Search Bar matching UI Wireframe */}
        <div className="max-w-3xl mx-auto mb-8">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center bg-gray-900 border-2 border-gray-800 focus-within:border-yellow-400 rounded-2xl shadow-xl transition-all duration-200 overflow-hidden"
          >
            <span className="pl-5 text-gray-400 text-xl select-none">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (val === "") {
                  fetchAllShows();
                }
              }}
              placeholder="Search for a movie..."
              className="w-full bg-transparent text-white px-4 py-4 text-base sm:text-lg placeholder-gray-500 focus:outline-none"
              aria-label="Search for a movie"
            />

            {/* Clear Button */}
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-3 text-gray-400 hover:text-white text-lg font-bold transition"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}

            {/* Search Submit Button */}
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-950 font-bold px-6 py-4 transition duration-200 text-sm sm:text-base shrink-0 flex items-center gap-1.5"
            >
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Filter & Sort Controls Bar */}
        <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Result Counter Feedback */}
          <div className="text-sm text-gray-300">
            Showing{" "}
            <span className="font-bold text-yellow-400">
              {filteredAndSortedMovies.length}
            </span>{" "}
            {filteredAndSortedMovies.length === 1 ? "movie" : "movies"}
            {searchQuery.trim() && (
              <span>
                {" "}
                for &ldquo;
                <span className="text-white font-medium">{searchQuery}</span>
                &rdquo;
              </span>
            )}
            {selectedGenre !== "ALL" && (
              <span>
                {" "}
                in <span className="text-yellow-400">[{selectedGenre}]</span>
              </span>
            )}
          </div>

          {/* Controls: Genre filter & Sort dropdown */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            {/* Genre Filter */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <label
                htmlFor="genre-select"
                className="text-gray-400 whitespace-nowrap"
              >
                Genre:
              </label>
              <select
                id="genre-select"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-yellow-400 transition"
              >
                {availableGenres.map((g) => (
                  <option key={g} value={g}>
                    {g === "ALL" ? "All Genres" : g}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <label
                htmlFor="sort-select"
                className="text-gray-400 whitespace-nowrap"
              >
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-yellow-400 transition"
              >
                <option value="DEFAULT">Default Order</option>
                <option value="RATING_DESC">⭐ Rating: High to Low</option>
                <option value="YEAR_DESC">📅 Release: Newest First</option>
                <option value="TITLE_ASC">🔤 Title: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {Array.from({ length: 8 }).map((_, idx) => (
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
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-red-950/20 border border-red-900/50 rounded-3xl my-8">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-red-400 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-300 text-sm mb-6">{error}</p>
            <button
              onClick={fetchAllShows}
              type="button"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold px-6 py-2.5 rounded-xl transition"
            >
              🔄 Retry Again
            </button>
          </div>
        )}

        {/* Empty State / No Results */}
        {!loading && !error && filteredAndSortedMovies.length === 0 && (
          <div className="max-w-md mx-auto text-center py-20 px-6 bg-gray-900/50 border border-gray-800 rounded-3xl my-8">
            <div className="text-6xl mb-4 opacity-70">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              No movies found
            </h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              We couldn&apos;t find any results
              {searchQuery ? ` matching "${searchQuery}"` : ""}. Try adjusting
              your search keywords or genre filter.
            </p>
            <button
              onClick={() => {
                setSelectedGenre("ALL");
                handleClearSearch();
              }}
              type="button"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-yellow-400/20"
            >
              Show All Movies
            </button>
          </div>
        )}

        {/* Responsive Movie Grid: 1 col on mobile, 2 on sm, 3 on md, 4 on lg */}
        {!loading && !error && filteredAndSortedMovies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedMovies.map((movie, index) => (
              <MovieCard
                key={movie.id || movie.show?.id || index}
                movie={movie}
                onSeeDetails={(show) => setSelectedMovie(show)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default MoviesPage;
