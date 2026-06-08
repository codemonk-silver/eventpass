import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Ticket } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useIsMobile } from '../hooks/useMediaQuery';
import { NAV_LINKS } from '../lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;
  const location = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-navbar transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian/95 backdrop-blur-xl border-b border-gold/10 shadow-navbar'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-container mx-auto container-padding flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Ticket className="w-6 h-6 text-gold" />
            <span className="text-xl font-display font-bold">
              <span className="text-ivory">Event</span>
              <span className="text-gold">Pass</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <div className="flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-label uppercase tracking-wider transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-gold'
                      : 'text-ash hover:text-ivory'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                    />
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              to="/events"
              className="hidden md:flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 text-gold"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm z-mobile-menu"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-obsidian border-l border-gold/20 z-mobile-menu flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-gold/10">
                <span className="text-lg font-display font-bold">
                  <span className="text-ivory">Event</span>
                  <span className="text-gold">Pass</span>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-gold"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col p-5 gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'text-gold bg-gold/10'
                        : 'text-ash hover:text-ivory hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
