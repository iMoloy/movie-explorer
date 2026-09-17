import { useState } from "react";

function MovieCard({ movie, onSeeDetails }) {
  const [imgError, setImgError] = useState(false);
  const show = movie.show || movie;

  const posterUrl = show.image?.medium || show.image?.original;
  const title = show.name || "Untitled Movie";
  const rating =
    show.rating?.average !== null && show.rating?.average !== undefined
      ? show.rating.average.toFixed(1)
      : "N/A";
  const releaseYear = show.premiered
    ? show.premiered.slice(0, 4)
    : show.status === "In Development"
      ? "TBA"
      : "N/A";
  const genres =
    show.genres && show.genres.length > 0 ? show.genres.slice(0, 2) : [];

  return (
    <article className="group bg-gray-900 border border-gray-800 hover:border-yellow-400/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Poster Container */}
      <div className="relative w-full aspect-[2/3] bg-gray-950 overflow-hidden">
        {posterUrl && !imgError ? (
          <img
            src={posterUrl}
            alt={title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-gray-500 p-4 text-center">
            <span className="text-5xl mb-2 select-none opacity-40">🎬</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              No Poster Available
            </span>
          </div>
        )}

        {/* Rating Badge Overlay */}
        <div className="absolute top-3 right-3 bg-gray-950/80 backdrop-blur-md border border-gray-700/80 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
          <span className="text-yellow-400 text-xs">⭐</span>
          <span className="text-white text-xs font-bold">{rating}</span>
        </div>

        {/* Year Badge Overlay */}
        {releaseYear !== "N/A" && (
          <div className="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-md border border-gray-700/80 px-2.5 py-1 rounded-full text-xs font-semibold text-gray-300 shadow-md">
            📅 {releaseYear}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-gray-900/90">
        <div>
          {/* Genre tags */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {genres.map((g) => (
                <span
                  key={g}
                  className="text-[11px] font-medium bg-gray-800 text-gray-300 px-2 py-0.5 rounded-md"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3
            title={title}
            className="text-white font-bold text-base sm:text-lg mb-2 line-clamp-1 group-hover:text-yellow-400 transition-colors"
          >
            {title}
          </h3>

          {/* Metadata info line matching wireframe: ⭐ Rating • 📅 Year */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-4">
            <span className="font-semibold text-yellow-400 flex items-center gap-1">
              ⭐ {rating}
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1">📅 {releaseYear}</span>
          </div>
        </div>

        {/* See Details Button */}
        <button
          onClick={() => onSeeDetails(show)}
          type="button"
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm hover:shadow-yellow-400/20 active:scale-[0.98]"
        >
          <span>See Details</span>
          <span className="text-base">&rarr;</span>
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
