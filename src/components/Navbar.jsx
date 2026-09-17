import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight group"
          >
            <span className="text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              🎬
            </span>
            <span>
              Movie<span className="text-yellow-400">Explorer</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-semibold text-sm uppercase tracking-wider transition-colors duration-200 ${
                isActive("/")
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className={`font-semibold text-sm uppercase tracking-wider transition-colors duration-200 ${
                isActive("/movies")
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
            >
              Browse Movies
            </Link>

            {/* Prominent CTA Link */}
            <Link
              to="/movies"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold px-5 py-2.5 rounded-xl shadow-md shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-sm flex items-center gap-2"
            >
              <span>🍿 Explore Now</span>
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              isActive("/")
                ? "bg-gray-800 text-yellow-400 font-bold"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            🏠 Home
          </Link>
          <Link
            to="/movies"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              isActive("/movies")
                ? "bg-gray-800 text-yellow-400 font-bold"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            🎬 Browse Movies
          </Link>
          <Link
            to="/movies"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-center bg-yellow-400 text-gray-900 font-bold px-4 py-2.5 rounded-xl hover:bg-yellow-300 transition"
          >
            🍿 Explore Now
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
