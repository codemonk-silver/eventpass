import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, Play, ArrowRight, Check } from 'lucide-react';
import { movies } from '../data/movies';
import { cinemas } from '../data/movies';
import { useBookingStore } from '../stores/bookingStore';
import { useState } from 'react';

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === id);
  const setEvent = useBookingStore(s => s.setEvent);
  const [selectedCinema, setSelectedCinema] = useState(cinemas[0].id);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-h2 text-ivory mb-4">Movie Not Found</h2>
          <Link to="/movies" className="text-gold hover:underline">Browse all movies</Link>
        </div>
      </div>
    );
  }

  const cinemaShowtimes = movie.showtimes.filter(s => s.cinemaId === selectedCinema);

  const handleBook = () => {
    const st = movie.showtimes.find(s => s.id === selectedShowtime);
    if (!st) return;
    setEvent({
      id: movie.id,
      type: 'movie',
      title: movie.title,
      image: movie.posterImage,
      date: '',
      time: st.time,
      venue: st.cinemaName,
      location: '',
    });
    navigate('/seat-selection');
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img src={movie.posterImage} alt="" className="w-full h-full object-cover blur-[40px] brightness-[0.3]" />
        </div>
        <div className="relative z-content max-w-content mx-auto container-padding">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="shrink-0">
              <img src={movie.posterImage} alt={movie.title} className="w-[200px] md:w-[280px] rounded-2xl shadow-2xl" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(214,180,106,0.1)' }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 text-body-sm text-ash mb-4 justify-center md:justify-start">
                <Link to="/" className="text-gold hover:underline">Home</Link>
                <span>/</span>
                <Link to="/movies" className="text-gold hover:underline">Movies</Link>
                <span>/</span>
                <span className="truncate max-w-[150px]">{movie.title}</span>
              </div>
              <h1 className="text-h1 font-display font-bold text-ivory">{movie.title}</h1>
              <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-md bg-red-500/15 text-red-400 text-body-sm border border-red-500/20">{movie.genre}</span>
                <span className="flex items-center gap-1 text-ash"><Clock className="w-4 h-4" /> {movie.duration}</span>
                <span className="flex items-center gap-1 text-gold"><Star className="w-4 h-4 fill-gold" /> {movie.rating}/5</span>
              </div>
              <div className="mt-6">
                <h4 className="text-h4 font-display font-semibold text-ivory mb-2">Synopsis</h4>
                <p className="text-ash text-body-lg leading-relaxed max-w-xl">{movie.synopsis}</p>
              </div>
              <div className="mt-4 text-ash text-body-sm space-y-1">
                <p><span className="text-ivory/70">Director:</span> {movie.director}</p>
                <p><span className="text-ivory/70">Cast:</span> {movie.cast}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-8 justify-center md:justify-start">
                <button className="px-6 py-3 border border-gold/50 text-gold rounded-button hover:bg-gold/10 transition-colors inline-flex items-center gap-2">
                  <Play className="w-4 h-4" /> Watch Trailer
                </button>
                <Link to={`/movies/${movie.id}`} className="gold-gradient-btn inline-flex items-center gap-2">
                  Book Tickets <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Showtimes */}
      <section className="py-12 lg:py-16 border-t border-ash/10">
        <div className="max-w-content mx-auto container-padding">
          <h2 className="text-h2 font-display font-semibold text-ivory mb-2">Showtimes</h2>
          <p className="text-ash text-body mb-8">Select a cinema and showtime to book your seats.</p>

          {/* Cinema Tabs */}
          <div className="flex gap-1 overflow-x-auto hide-scrollbar mb-8 border-b border-ash/10 pb-px">
            {cinemas.map(cinema => (
              <button
                key={cinema.id}
                onClick={() => { setSelectedCinema(cinema.id); setSelectedShowtime(null); }}
                className={`px-5 py-3 text-body font-medium whitespace-nowrap border-b-2 transition-all ${
                  selectedCinema === cinema.id ? 'text-ivory border-gold' : 'text-ash border-transparent hover:text-ivory'
                }`}
              >
                {cinema.name}
              </button>
            ))}
          </div>

          {/* Showtime Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {cinemaShowtimes.map(st => (
              <button
                key={st.id}
                onClick={() => setSelectedShowtime(st.id)}
                className={`p-4 rounded-xl text-center border transition-all ${
                  selectedShowtime === st.id
                    ? 'border-gold bg-gold/15'
                    : 'border-ash/20 bg-charcoal/50 hover:border-gold/40'
                }`}
              >
                <p className="text-h4 font-semibold text-ivory">{st.time}</p>
                <p className="text-body-sm text-ash mt-1">{st.format}</p>
                <p className="text-body-sm text-gold mt-1">${st.price}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {st.availability === 'available' ? (
                    <><Check className="w-3 h-3 text-emerald" /> <span className="text-xs text-emerald">Available</span></>
                  ) : (
                    <span className="text-xs text-amber-400">Selling Fast</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedShowtime ? 1 : 0.5 }}
            disabled={!selectedShowtime}
            onClick={handleBook}
            className="gold-gradient-btn mt-8 max-w-sm mx-auto block text-center w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Select Seats
          </motion.button>
        </div>
      </section>
    </>
  );
}
