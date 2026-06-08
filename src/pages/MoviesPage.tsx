import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, Clock, ChevronDown } from 'lucide-react';
import { movies, cinemas } from '../data/movies';

const genres = ['All Genres', 'Sci-Fi', 'Action', 'Drama', 'Musical', 'Animation'];

export function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedCinema, setSelectedCinema] = useState('All Cinemas');

  const filteredMovies = useMemo(() => {
    let result = [...movies];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q));
    }
    if (selectedGenre !== 'All Genres') {
      result = result.filter(m => m.genre === selectedGenre);
    }
    if (selectedCinema !== 'All Cinemas') {
      result = result.filter(m => m.showtimes.some(s => s.cinemaName === selectedCinema));
    }
    return result;
  }, [searchQuery, selectedGenre, selectedCinema]);

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-20 min-h-[50vh] flex items-center">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #080A12 0%, rgba(8,10,18,0.9) 50%, rgba(239,68,68,0.08) 100%)' }} />
        <img src="/images/category-movies.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
        <div className="relative z-content max-w-container mx-auto container-padding py-16">
          <div className="flex items-center gap-2 text-body-sm text-ash mb-4">
            <Link to="/" className="text-gold hover:underline">Home</Link>
            <span>/</span>
            <span>Movies</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-h1 font-display font-bold text-ivory">Movies</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-ivory/70 text-body-lg mt-2">Now showing and coming soon to theaters near you.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search movies..." className="pl-11 pr-4 py-2.5 bg-charcoal/70 border border-gold/20 rounded-lg text-ivory placeholder:text-ash focus:outline-none focus:border-gold text-body-sm w-60" />
            </div>
            <div className="relative">
              <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)} className="appearance-none pl-4 pr-10 py-2.5 bg-charcoal/70 border border-ash/20 rounded-lg text-ash text-body-sm focus:outline-none focus:border-gold cursor-pointer">
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash pointer-events-none" />
            </div>
            <div className="relative">
              <select value={selectedCinema} onChange={e => setSelectedCinema(e.target.value)} className="appearance-none pl-4 pr-10 py-2.5 bg-charcoal/70 border border-ash/20 rounded-lg text-ash text-body-sm focus:outline-none focus:border-gold cursor-pointer">
                <option>All Cinemas</option>
                {cinemas.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Movie Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-container mx-auto container-padding">
          <p className="text-ash text-body mb-6">{filteredMovies.length} movies showing</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie, i) => (
              <motion.div key={movie.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.5 }}>
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function MovieCard({ movie }: { movie: typeof movies[0] }) {
  const showtimesToday = movie.showtimes.slice(0, 3);

  return (
    <Link to={`/movies/${movie.id}`} className="group block">
      <div className="glass-card overflow-hidden transition-all duration-400 group-hover:-translate-y-1.5 group-hover:border-gold/30">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img src={movie.posterImage} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-obsidian/80 text-gold text-xs font-medium">
            <Star className="w-3 h-3 fill-gold" /> {movie.rating}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-ivory text-sm truncate group-hover:text-gold transition-colors">{movie.title}</h3>
          <div className="flex items-center gap-2 mt-1.5 text-ash text-body-sm">
            <span>{movie.genre}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {movie.duration}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-ash/10">
            <p className="text-body-sm text-ash mb-2">Today:</p>
            <div className="flex flex-wrap gap-1.5">
              {showtimesToday.map(st => (
                <span key={st.id} className="px-2 py-0.5 rounded bg-emerald/15 text-emerald text-xs font-medium border border-emerald/20">{st.time}</span>
              ))}
            </div>
          </div>
          <p className="text-gold text-body-sm font-medium mt-3">From ${movie.ticketPrice}</p>
        </div>
      </div>
    </Link>
  );
}
