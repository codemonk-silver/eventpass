import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Film, Music, Trophy, Calendar, Clock, MapPin, Star, MousePointerClick, PartyPopper } from 'lucide-react';
import { useState, useRef } from 'react';
import { events, featuredEvents, movieEvents, concertEvents, footballEvents } from '../data/events';
import { heroStagger, heroChild } from '../lib/animations';

function HeroSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 z-bg-decorative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full animate-drift"
          style={{ background: 'radial-gradient(circle, rgba(91,46,255,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full animate-drift-slow"
          style={{ background: 'radial-gradient(circle, rgba(214,180,106,0.06) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(214,180,106,1) 1px, transparent 1px), linear-gradient(90deg, rgba(214,180,106,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-content max-w-container mx-auto container-padding text-center pt-24 pb-16">
        <motion.div variants={heroStagger} initial="hidden" animate="visible">
          <motion.p variants={heroChild} className="text-label uppercase tracking-[0.15em] text-gold mb-6">
            Premium Entertainment Tickets
          </motion.p>
          <motion.h1 variants={heroChild} className="text-hero-display leading-20 font-display font-bold text-ivory max-w-[900px] mx-auto" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
            Discover Extraordinary Events
          </motion.h1>
          <motion.p variants={heroChild} className="text-body-lg text-ash mt-5 max-w-[560px] mx-auto">
            Book tickets for the hottest movies, electrifying concerts, and thrilling football matches — all in one place.
          </motion.p>

          <motion.form variants={heroChild} onSubmit={handleSearch} className="mt-10 max-w-[640px] mx-auto">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, artists, teams, venues..."
                className="w-full pl-14 pr-6 py-4 bg-charcoal/70 backdrop-blur-lg border border-gold/20 rounded-xl text-ivory placeholder:text-ash focus:outline-none focus:border-gold transition-colors text-body-lg"
              />
            </div>
          </motion.form>

          <motion.div variants={heroChild} className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link to="/events" className="gold-gradient-btn inline-flex items-center gap-2">
              Explore Events <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/movies" className="px-7 py-3 border border-gold/50 text-gold rounded-button font-semibold text-label uppercase tracking-wider hover:bg-gold/10 transition-colors inline-flex items-center gap-2">
              Browse Movies
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const categories = [
    { title: 'Movies', desc: 'Catch the latest blockbusters and indie gems at theaters near you.', icon: Film, color: 'from-red-600/20', borderColor: 'hover:border-red-500/40', to: '/movies', img: '/images/category-movies.jpg' },
    { title: 'Concerts', desc: 'Experience live music from world-class artists at iconic venues.', icon: Music, color: 'from-plum/20', borderColor: 'hover:border-plum/40', to: '/concerts', img: '/images/category-concerts.jpg' },
    { title: 'Football', desc: 'Cheer for your team at the biggest matches in legendary stadiums.', icon: Trophy, color: 'from-emerald/20', borderColor: 'hover:border-emerald/40', to: '/football', img: '/images/category-football.jpg' },
  ];

  return (
    <section className="section-padding">
      <div className="max-w-container mx-auto container-padding">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-label uppercase tracking-[0.1em] text-gold mb-3">Choose Your Experience</p>
          <h2 className="text-h2 font-display font-semibold text-ivory">What's Your Scene?</h2>
          <p className="text-ash text-body-lg mt-3 max-w-lg mx-auto">From blockbuster premieres to stadium roars — find tickets for every passion.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}>
              <Link to={cat.to} className={`group relative block overflow-hidden rounded-2xl border border-gold/10 ${cat.borderColor} transition-all duration-400 aspect-[3/4] md:aspect-[3/4]`}>
                <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className={`absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/40 ${cat.color} to-transparent`} />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <cat.icon className="w-8 h-8 text-gold mb-3" />
                  <h3 className="text-h2 font-display font-semibold text-ivory">{cat.title}</h3>
                  <p className="text-ash text-body mt-2">{cat.desc}</p>
                  <span className="inline-flex items-center gap-2 text-gold mt-4 group-hover:gap-3 transition-all">
                    Browse {cat.title} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedEventsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(featuredEvents.length / itemsPerPage);

  return (
    <section className="section-padding border-t border-gold/10">
      <div className="max-w-container mx-auto container-padding">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
          <p className="text-label uppercase tracking-[0.1em] text-gold mb-3">Featured</p>
          <h2 className="text-h2 font-display font-semibold text-ivory">This Week's Highlights</h2>
        </motion.div>

        <div className="relative">
          <div ref={carouselRef} className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4">
            {featuredEvents.map((event, i) => (
              <motion.div key={event.id} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="snap-start shrink-0 w-[300px] md:w-[380px]">
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${currentPage === i ? 'bg-gold w-6' : 'bg-ash/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: typeof events[0]; size?: 'default' | 'large' | 'small' }) {
  const categoryColors = {
    movie: 'bg-gradient-to-r from-red-600 to-red-700',
    concert: 'bg-gradient-to-r from-plum to-plum-light',
    football: 'bg-gradient-to-r from-emerald to-emerald-600',
  };

  const categoryLabels = { movie: 'Movie', concert: 'Concert', football: 'Football' };

  return (
    <Link to={`/${event.category === 'movie' ? 'movies' : event.category === 'concert' ? 'concerts' : 'football'}/${event.id}`} className="group block">
      <div className="glass-card overflow-hidden transition-all duration-400 group-hover:-translate-y-2 group-hover:border-gold/40 group-hover:shadow-card">
        <div className="relative aspect-video overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 to-transparent" />
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-pill text-xs font-semibold text-white ${categoryColors[event.category]}`}>
            {categoryLabels[event.category]}
          </span>
          <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-gold/15 border border-gold/30 text-gold font-bold text-sm">
            From ${event.priceFrom}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-ivory truncate group-hover:text-gold transition-colors">{event.title}</h3>
          <div className="flex items-center gap-3 mt-2 text-ash text-body-sm">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-ash/10">
            <span className="text-gold text-body-sm font-medium flex items-center gap-1">
              Get Tickets <ArrowRight className="w-3.5 h-3.5" />
            </span>
            {event.status === 'selling-fast' && (
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">Selling Fast</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function TrendingMoviesSection() {
  const movies = movieEvents.slice(0, 8);

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-container mx-auto container-padding">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center justify-between mb-8">
          <div>
            <p className="text-label uppercase tracking-[0.1em] text-gold mb-2">Now Showing</p>
            <h2 className="text-h2 font-display font-semibold text-ivory">Trending Movies</h2>
          </div>
          <Link to="/movies" className="hidden md:inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
          {movies.map((movie, i) => (
            <motion.div key={movie.id} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="snap-start shrink-0">
              <Link to={`/movies/${movie.id}`} className="group block w-[160px] md:w-[200px]">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-400 group-hover:scale-[1.03]">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-obsidian/80 text-gold text-xs font-medium">
                    <Star className="w-3 h-3 fill-gold" /> {movie.rating}
                  </div>
                </div>
                <h4 className="mt-3 font-semibold text-ivory text-sm truncate group-hover:text-gold transition-colors">{movie.title}</h4>
                <p className="text-ash text-body-sm">{movieEvents.find(m => m.id === movie.id)?.category || 'Movie'}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UpcomingConcertsSection() {
  const concerts = concertEvents.slice(0, 4);

  return (
    <section className="section-padding">
      <div className="max-w-content mx-auto container-padding">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-label uppercase tracking-[0.1em] text-gold mb-3">Live Music</p>
          <h2 className="text-h2 font-display font-semibold text-ivory">Upcoming Concerts</h2>
          <p className="text-ash text-body-lg mt-3 max-w-lg mx-auto">Get ready for unforgettable nights with the world's biggest artists.</p>
          <Link to="/concerts" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mt-4">
            View All Concerts <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {concerts.map((concert, i) => (
            <motion.div key={concert.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
              <EventCard event={concert} size="large" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FootballMatchesSection() {
  const matches = footballEvents.slice(0, 3);

  return (
    <section className="section-padding border-b border-emerald/10">
      <div className="max-w-container mx-auto container-padding">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
          <p className="text-label uppercase tracking-[0.1em] text-gold mb-3">Matchday</p>
          <h2 className="text-h2 font-display font-semibold text-ivory">Upcoming Big Matches</h2>
          <p className="text-ash text-body-lg mt-3">Don't miss the biggest clashes of the season.</p>
          <Link to="/football" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mt-4">
            View All Matches <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {matches.map((match, i) => (
            <motion.div key={match.id} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <MatchCard event={match} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MatchCard({ event }: { event: typeof events[0] }) {
  const teams = event.title.split(' vs ');
  return (
    <Link to={`/football/${event.id}`} className="group block">
      <div className="glass-card border-emerald/15 overflow-hidden transition-all duration-400 group-hover:-translate-y-1.5 group-hover:border-emerald/40 group-hover:shadow-lg">
        <div className="relative h-[120px] overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 to-obsidian/30" />
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-medium bg-emerald/15 text-emerald border border-emerald/30">Premier League</span>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="text-center flex-1">
              <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto text-gold font-bold text-sm">{teams[0]?.slice(0, 2).toUpperCase()}</div>
              <p className="text-body-sm text-ivory mt-2 font-medium truncate">{teams[0]}</p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-ruby/15 text-ruby text-label font-bold border border-ruby/20">VS</span>
            <div className="text-center flex-1">
              <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto text-gold font-bold text-sm">{teams[1]?.slice(0, 2).toUpperCase()}</div>
              <p className="text-body-sm text-ivory mt-2 font-medium truncate">{teams[1]}</p>
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            <p className="text-body-sm text-ash flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-gold" /> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            <p className="text-body-sm text-ash flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-gold" /> {event.time}</p>
            <p className="text-body-sm text-ash flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gold" /> {event.venue}</p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-ash/10">
            <span className="px-3 py-1 rounded-lg bg-gold/15 border border-gold/30 text-gold font-bold text-sm">From ${event.priceFrom}</span>
            <span className="text-gold text-body-sm font-medium flex items-center gap-1">Get Tickets <ArrowRight className="w-3.5 h-3.5" /></span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: '1', icon: Search, title: 'Discover Events', desc: 'Browse thousands of movies, concerts, and football matches. Filter by date, location, or price to find your perfect event.' },
    { num: '2', icon: MousePointerClick, title: 'Select Your Seats', desc: 'Choose your preferred seats from our interactive seat maps. Pick the perfect view for an unforgettable experience.' },
    { num: '3', icon: PartyPopper, title: 'Book & Enjoy', desc: 'Complete your booking in seconds and receive your tickets instantly. Show up and enjoy the show!' },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-bg-decorative">
        <div className="w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(214,180,106,0.04) 0%, transparent 60%)' }} />
      </div>
      <div className="max-w-container mx-auto container-padding relative z-content">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-label uppercase tracking-[0.1em] text-gold mb-3">How It Works</p>
          <h2 className="text-h2 font-display font-semibold text-ivory">Get Your Tickets in 3 Easy Steps</h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gold/20" />

          {steps.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2, ease: [0.34, 1.56, 0.64, 1] }} className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border-2 border-gold/30 mb-6">
                <span className="text-h3 font-display font-bold text-gold">{step.num}</span>
              </div>
              <step.icon className="w-8 h-8 text-gold mx-auto mb-4" />
              <h3 className="text-h3 font-display font-semibold text-ivory mb-3">{step.title}</h3>
              <p className="text-ash text-body max-w-[320px] mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="pb-16 lg:pb-24">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-content mx-auto container-padding">
        <div className="rounded-3xl p-10 md:p-16 lg:p-20 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #080A12 0%, #111827 45%, #5B2EFF 100%)' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-h1 font-display font-bold text-ivory">
            Never Miss an Event
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-ivory/70 text-body-lg mt-4 max-w-md mx-auto">
            Subscribe to get notified about upcoming events, early-bird tickets, and exclusive offers.
          </motion.p>

          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            {subscribed ? (
              <p className="text-emerald font-medium">Thanks for subscribing! Check your inbox.</p>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-lg text-ivory placeholder:text-ivory/50 focus:outline-none focus:border-gold"
                  required
                />
                <button type="submit" className="gold-gradient-btn whitespace-nowrap w-full sm:w-auto">
                  Subscribe
                </button>
              </>
            )}
          </motion.form>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="text-ivory/50 text-body-sm mt-4">
            Join 50,000+ event lovers. No spam, unsubscribe anytime.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedEventsSection />
      <TrendingMoviesSection />
      <UpcomingConcertsSection />
      <FootballMatchesSection />
      <HowItWorksSection />
      <NewsletterSection />
    </>
  );
}
