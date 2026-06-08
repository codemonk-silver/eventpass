import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Share2, ArrowRight, Star } from 'lucide-react';
import { events } from '../data/events';
import { useBookingStore } from '../stores/bookingStore';

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);
  const setEvent = useBookingStore(s => s.setEvent);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-h2 text-ivory mb-4">Event Not Found</h2>
          <Link to="/events" className="text-gold hover:underline">Browse all events</Link>
        </div>
      </div>
    );
  }

  const path = event.category === 'movie' ? 'movies' : event.category === 'concert' ? 'concerts' : 'football';
  const categoryColors = { movie: 'from-red-600 to-red-700', concert: 'from-plum to-plum-light', football: 'from-emerald to-emerald-600' };
  const categoryLabels = { movie: 'Movie', concert: 'Concert', football: 'Football' };
  const relatedEvents = events.filter(e => e.category === event.category && e.id !== event.id).slice(0, 4);

  const handleGetTickets = () => {
    setEvent({
      id: event.id,
      type: event.category,
      title: event.title,
      image: event.image,
      date: event.date,
      time: event.time,
      venue: event.venue,
      location: event.location,
    });
    navigate(`/${path}/${event.id}`);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pt-20">
        <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/30" />
        <div className="relative z-content max-w-container mx-auto container-padding pb-12 w-full">
          <div className="flex items-center gap-2 text-body-sm text-ash mb-4">
            <Link to="/" className="text-gold hover:underline">Home</Link>
            <span>/</span>
            <Link to={`/${path}`} className="text-gold hover:underline capitalize">{path}</Link>
            <span>/</span>
            <span className="truncate max-w-[200px]">{event.title}</span>
          </div>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`inline-block px-3 py-1 rounded-pill text-xs font-semibold text-white bg-gradient-to-r ${categoryColors[event.category]} mb-4`}>
            {categoryLabels[event.category]}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-h1 font-display font-bold text-ivory" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            {event.title}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-6 mt-4">
            <span className="flex items-center gap-2 text-ivory"><Calendar className="w-4 h-4 text-gold" /> {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-2 text-ivory"><Clock className="w-4 h-4 text-gold" /> {event.time}</span>
            <span className="flex items-center gap-2 text-ivory"><MapPin className="w-4 h-4 text-gold" /> {event.venue}</span>
            <span className="flex items-center gap-2 text-ivory"><MapPin className="w-4 h-4 text-gold" /> {event.location}</span>
            {event.rating > 0 && <span className="flex items-center gap-1 text-gold"><Star className="w-4 h-4 fill-gold" /> {event.rating}</span>}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap items-center gap-4 mt-8">
            <span className="px-4 py-2 rounded-lg bg-gold/15 border border-gold/30 text-gold font-bold">From ${event.priceFrom}</span>
            <button onClick={handleGetTickets} className="gold-gradient-btn inline-flex items-center gap-2">
              Get Tickets <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-5 py-3 border border-gold/50 text-gold rounded-button hover:bg-gold/10 transition-colors inline-flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-content mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left */}
            <div className="lg:col-span-2">
              <h3 className="text-h3 font-display font-semibold text-ivory mb-4">About This Event</h3>
              <p className="text-ash text-body-lg leading-relaxed">{event.description}</p>

              <div className="mt-10">
                <h3 className="text-h3 font-display font-semibold text-ivory mb-4">Event Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Date', value: new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) },
                    { label: 'Time', value: event.time },
                    { label: 'Venue', value: event.venue },
                    { label: 'Location', value: event.location },
                    { label: 'Category', value: categoryLabels[event.category] },
                    { label: 'Status', value: event.status === 'selling-fast' ? 'Selling Fast' : 'Available' },
                  ].map(detail => (
                    <div key={detail.label} className="p-4 rounded-lg bg-charcoal/50 border border-ash/10">
                      <p className="text-body-sm text-ash uppercase tracking-wider mb-1">{detail.label}</p>
                      <p className="text-ivory font-medium">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Venue Info */}
              <div className="mt-10 p-6 rounded-xl bg-charcoal/50 border border-gold/10">
                <h4 className="text-h4 font-display font-semibold text-ivory mb-3">{event.venue}</h4>
                <p className="text-ash text-body mb-3">Located in the heart of {event.location}, {event.venue} offers an exceptional experience for all guests.</p>
                <span className="text-gold text-body-sm flex items-center gap-2 cursor-pointer hover:underline">
                  <MapPin className="w-4 h-4" /> Get Directions
                </span>
              </div>
            </div>

            {/* Right - Sticky ticket card */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="glass-card p-6">
                <h3 className="text-h3 font-display font-semibold text-ivory mb-4">Select Tickets</h3>
                <div className="space-y-3">
                  {['General Admission', 'Premium', 'VIP'].map((tier, i) => (
                    <div key={tier} className={`p-4 rounded-xl border cursor-pointer transition-all ${i === 0 ? 'border-gold bg-gold/10' : 'border-ash/20 hover:border-gold/40'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-ivory font-medium">{tier}</span>
                        <span className="text-gold font-bold">${event.priceFrom + i * 50}</span>
                      </div>
                      <p className="text-ash text-body-sm mt-1">
                        {i === 0 ? 'Standard entry access' : i === 1 ? 'Better seating + perks' : 'Best experience + meet & greet'}
                      </p>
                    </div>
                  ))}
                </div>
                <button onClick={handleGetTickets} className="gold-gradient-btn w-full mt-6 text-center justify-center">
                  Proceed to Seats
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="py-12 lg:py-16 border-t border-ash/10">
          <div className="max-w-container mx-auto container-padding">
            <h3 className="text-h3 font-display font-semibold text-ivory mb-8">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedEvents.map((rel, i) => (
                <motion.div key={rel.id} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Link to={`/${rel.category === 'movie' ? 'movies' : rel.category === 'concert' ? 'concerts' : 'football'}/${rel.id}`} className="group block">
                    <div className="rounded-xl overflow-hidden border border-ash/10 group-hover:border-gold/30 transition-all">
                      <div className="aspect-video overflow-hidden">
                        <img src={rel.image} alt={rel.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-ivory text-sm truncate group-hover:text-gold transition-colors">{rel.title}</h4>
                        <p className="text-ash text-body-sm mt-1">{new Date(rel.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {rel.location}</p>
                        <span className="text-gold text-sm font-medium mt-2 inline-block">From ${rel.priceFrom}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
