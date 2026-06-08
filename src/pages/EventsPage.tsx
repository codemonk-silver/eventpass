import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Grid3X3, List, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { events } from '../data/events';
import type { Event } from '../types';
import { AnimatePresence } from 'framer-motion';

const categories = ['all', 'movie', 'concert', 'football'] as const;
const locations = ['All Locations', 'New York', 'Los Angeles', 'London', 'Manchester', 'Madrid', 'Munich', 'Toronto'];
const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'date', label: 'Date (Soonest)' },
  { value: 'price-low', label: 'Price (Low to High)' },
  { value: 'price-high', label: 'Price (High to Low)' },
  { value: 'rating', label: 'Rating' },
];

export function EventsPage() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = useMemo(() => {
    let result = [...events];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'all') {
      result = result.filter(e => e.category === activeCategory);
    }

    if (selectedLocation !== 'All Locations') {
      result = result.filter(e => e.location.includes(selectedLocation));
    }

    result = result.filter(e => e.priceFrom <= priceRange);

    switch (sortBy) {
      case 'date':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'price-low':
        result.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case 'price-high':
        result.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchQuery, activeCategory, selectedLocation, priceRange, sortBy]);

  const categoryLabels: Record<string, string> = { all: 'All', movie: 'Movies', concert: 'Concerts', football: 'Football' };

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-20 min-h-[40vh] flex items-center" style={{ background: 'linear-gradient(135deg, #080A12 0%, #111827 45%, #5B2EFF 100%)' }}>
        <div className="max-w-container mx-auto container-padding py-16">
          <div className="flex items-center gap-2 text-body-sm text-ash mb-4">
            <Link to="/" className="text-gold hover:underline">Home</Link>
            <span>/</span>
            <span>Events</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-h1 font-display font-bold text-ivory">
            All Events
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-ash text-body-lg mt-2">
            Discover {events.length}+ upcoming events across movies, concerts, and football.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 max-w-lg">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="w-full pl-12 pr-4 py-3.5 bg-charcoal/70 backdrop-blur border border-gold/20 rounded-xl text-ivory placeholder:text-ash focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-container mx-auto container-padding">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-body-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gold/15 text-gold border border-gold/40'
                    : 'bg-charcoal/50 text-ash border border-ash/20 hover:text-ivory hover:border-ash/40'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-3">
              <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-charcoal/50 text-ash border border-ash/20">
                <Filter className="w-4 h-4" /> Filters
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 rounded-lg bg-charcoal/50 text-ash border border-ash/20 text-body-sm focus:outline-none focus:border-gold cursor-pointer"
                >
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash pointer-events-none" />
              </div>
              <div className="hidden md:flex items-center gap-1 bg-charcoal/50 rounded-lg border border-ash/20 p-0.5">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gold/20 text-gold' : 'text-ash'}`}>
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gold/20 text-gold' : 'text-ash'}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
                <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-charcoal/50 border border-ash/10">
                  <div className="relative">
                    <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="appearance-none px-4 py-2 pr-10 rounded-lg bg-obsidian text-ash border border-ash/20 text-body-sm focus:outline-none focus:border-gold cursor-pointer">
                      {locations.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash pointer-events-none" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-body-sm text-ash">Max Price:</span>
                    <input type="range" min={0} max={500} value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-32 accent-gold" />
                    <span className="text-gold text-body-sm font-medium">${priceRange}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Filters Row */}
          <div className="hidden lg:flex items-center gap-4 mb-8 p-4 rounded-xl bg-charcoal/30 border border-ash/10">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash" />
              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="appearance-none pl-9 pr-8 py-2 rounded-lg bg-obsidian text-ash border border-ash/20 text-body-sm focus:outline-none focus:border-gold cursor-pointer">
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-body-sm text-ash">Max Price: ${priceRange}</span>
              <input type="range" min={0} max={500} value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-40 accent-gold" />
            </div>
          </div>

          <p className="text-ash text-body mb-6">Showing {filteredEvents.length} events</p>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-ash/30 mx-auto mb-4" />
              <h3 className="text-h3 font-display font-semibold text-ivory mb-2">No events found</h3>
              <p className="text-ash mb-6">Try adjusting your filters or search for something else.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); setSelectedLocation('All Locations'); setPriceRange(500); }} className="px-6 py-2.5 border border-gold/50 text-gold rounded-button hover:bg-gold/10 transition-colors">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredEvents.map((event, i) => (
                <motion.div key={event.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                  {viewMode === 'grid' ? <EventCard event={event} /> : <EventListItem event={event} />}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

const categoryColors: Record<string, string> = {
  movie: 'from-red-600 to-red-700',
  concert: 'from-plum to-plum-light',
  football: 'from-emerald to-emerald-600',
};

function EventCard({ event }: { event: Event }) {
  const path = event.category === 'movie' ? 'movies' : event.category === 'concert' ? 'concerts' : 'football';
  return (
    <Link to={`/${path}/${event.id}`} className="group block">
      <div className="glass-card overflow-hidden transition-all duration-400 group-hover:-translate-y-2 group-hover:border-gold/40 group-hover:shadow-card">
        <div className="relative aspect-video overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 to-transparent" />
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-pill text-xs font-semibold text-white bg-gradient-to-r ${categoryColors[event.category]}`}>
            {event.category === 'movie' ? 'Movie' : event.category === 'concert' ? 'Concert' : 'Football'}
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
        </div>
      </div>
    </Link>
  );
}

function EventListItem({ event }: { event: Event }) {
  const path = event.category === 'movie' ? 'movies' : event.category === 'concert' ? 'concerts' : 'football';
  return (
    <Link to={`/${path}/${event.id}`} className="group flex gap-5 p-4 rounded-xl bg-charcoal/50 border border-ash/10 hover:border-gold/30 transition-all">
      <div className="w-48 shrink-0 rounded-lg overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover aspect-video" loading="lazy" />
      </div>
      <div className="flex-1 py-1">
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium text-white bg-gradient-to-r ${categoryColors[event.category]} mb-2`}>
          {event.category === 'movie' ? 'Movie' : event.category === 'concert' ? 'Concert' : 'Football'}
        </span>
        <h3 className="font-semibold text-ivory group-hover:text-gold transition-colors">{event.title}</h3>
        <div className="flex items-center gap-4 mt-2 text-ash text-body-sm">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.venue}</span>
        </div>
        <span className="inline-block mt-3 px-3 py-1 rounded-lg bg-gold/15 border border-gold/30 text-gold font-bold text-sm">
          From ${event.priceFrom}
        </span>
      </div>
    </Link>
  );
}
