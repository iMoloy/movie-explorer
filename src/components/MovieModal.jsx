import { useEffect, useState } from "react";

function MovieModal({ movie, onClose }) {
  const [backdropError, setBackdropError] = useState(false);

  // Close with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock background body scroll
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!movie) return null;

  const backdropUrl = movie.image?.original || movie.image?.medium;
  const title = movie.name || "Untitled";
  const rating =
    movie.rating?.average !== null && movie.rating?.average !== undefined
      ? movie.rating.average.toFixed(1)
      : "N/A";
  const premiered = movie.premiered || "Unknown";
  const genres =
    movie.genres && movie.genres.length > 0
      ? movie.genres.join(", ")
      : "Not Specified";
  const status = movie.status || "Unknown";
  const language = movie.language || "English";
  const network =
    movie.network?.name || movie.webChannel?.name || "Independent / Various";
  const runtime = movie.runtime
    ? `${movie.runtime} mins`
    : movie.averageRuntime
      ? `${movie.averageRuntime} mins (avg)`
      : "N/A";
  const officialSite = movie.officialSite;

  // Clean HTML markup from summary safely
  const cleanSummary = movie.summary
    ? movie.summary.replace(/<[^>]+>/g, "").trim()
    : "No detailed overview available for this title.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-modal-title"
    >
      {/* Modal Container */}
      <div
        className="relative bg-gray-900 border border-gray-800 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-left my-auto transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button matching wireframe */}
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={onClose}
            type="button"
            className="w-10 h-10 rounded-full bg-gray-950/70 hover:bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center text-lg font-bold border border-gray-700/60 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Movie Backdrop / Poster Area matching wireframe */}
        <div className="relative w-full h-56 sm:h-72 bg-gray-950 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
          {backdropUrl && !backdropError ? (
            <img
              src={backdropUrl}
              alt={title}
              onError={() => setBackdropError(true)}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-500">
              <span className="text-6xl opacity-30 mb-2">🎬</span>
              <span className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                Movie Backdrop
              </span>
            </div>
          )}
          {/* Bottom Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7">
          {/* Title matching wireframe */}
          <h2
            id="movie-modal-title"
            className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight"
          >
            {title}
          </h2>

          {/* ⭐ Rating & 📅 Release Date matching wireframe */}
          <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-gray-300 mb-6 pb-4 border-b border-gray-800">
            <span className="font-bold text-yellow-400 flex items-center gap-1.5">
              ⭐ Rating: {rating}
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1.5 text-gray-300">
              📅 Release: {premiered}
            </span>
            {runtime !== "N/A" && (
              <>
                <span className="text-gray-600">|</span>
                <span className="text-gray-300">⏱️ {runtime}</span>
              </>
            )}
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-xs sm:text-sm">
            <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/50">
              <p className="text-gray-400 font-medium text-xs">Genre</p>
              <p
                className="text-white font-semibold truncate mt-0.5"
                title={genres}
              >
                {genres}
              </p>
            </div>
            <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/50">
              <p className="text-gray-400 font-medium text-xs">Status</p>
              <p className="text-white font-semibold truncate mt-0.5">
                {status}
              </p>
            </div>
            <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/50">
              <p className="text-gray-400 font-medium text-xs">Language</p>
              <p className="text-white font-semibold truncate mt-0.5">
                {language}
              </p>
            </div>
            <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/50">
              <p className="text-gray-400 font-medium text-xs">Network</p>
              <p
                className="text-white font-semibold truncate mt-0.5"
                title={network}
              >
                {network}
              </p>
            </div>
          </div>

          {/* Overview Section matching wireframe */}
          <div className="mb-6">
            <h3 className="text-yellow-400 font-bold text-base sm:text-lg mb-2 flex items-center gap-2">
              <span>📖 Overview</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {cleanSummary}
            </p>
          </div>

          {/* Official Site Link if present */}
          {officialSite && (
            <div className="mb-6">
              <a
                href={officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 font-medium underline underline-offset-4 transition-colors"
              >
                🔗 Visit Official Website &rarr;
              </a>
            </div>
          )}

          {/* Bottom Close Button matching wireframe */}
          <div className="pt-2">
            <button
              onClick={onClose}
              type="button"
              className="w-full bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-red-600/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>❌ Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
