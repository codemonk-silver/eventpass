import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { concerts } from '../data/concerts';
import { useBookingStore } from '../stores/bookingStore';

const cities = ['All Cities', 'New York', 'London', 'Los Angeles', 'Toronto', 'Las Vegas'];

export function ConcertsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');

  const filteredConcerts = useMemo(() => {
    let result = [...concerts];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => c.artistName.toLowerCase().includes(q) || c.venue.toLowerCase().includes(q) || c.city.toLowerCase().includes(q));
    }
    if (selectedCity !== 'All Cities') {
      result = result.filter(c => c.city.includes(selectedCity));
    }
    return result;
  }, [searchQuery, selectedCity]);

  return (
    <>
      <section className="relative pt-20 min-h-[50vh] flex items-center">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #080A12 0%, rgba(8,10,18,0.9) 50%, rgba(91,46,255,0.12) 100%)' }} />
        <img src="/images/concerts-hero-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
        <div className="relative z-content max-w-container mx-auto container-padding py-16">
          <div className="flex items-center gap-2 text-body-sm text-ash mb-4">
            <Link to="/" className="text-gold hover:underline">Home</Link>
            <span>/</span>
            <span>Concerts</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-h1 font-display font-bold text-ivory">Concerts</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-ivory/70 text-body-lg mt-2">Live music from the world's biggest artists at iconic venues.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search artists, venues..." className="pl-11 pr-4 py-2.5 bg-charcoal/70 border border-gold/20 rounded-lg text-ivory placeholder:text-ash focus:outline-none focus:border-gold text-body-sm w-64" />
            </div>
            <div className="relative">
              <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="appearance-none pl-4 pr-10 py-2.5 bg-charcoal/70 border border-ash/20 rounded-lg text-ash text-body-sm focus:outline-none focus:border-gold cursor-pointer">
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-content mx-auto container-padding">
          <p className="text-ash text-body mb-8">{filteredConcerts.length} upcoming concerts</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredConcerts.map((concert, i) => (
              <motion.div key={concert.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, duration: 0.6 }}>
                <ConcertCard concert={concert} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ConcertCard({ concert }: { concert: typeof concerts[0] }) {
  const navigate = useNavigate();
  const setEvent = useBookingStore(s => s.setEvent);

  const handleGetTickets = () => {
    setEvent({
      id: concert.id,
      type: 'concert',
      title: `${concert.artistName} — ${concert.concertTitle}`,
      image: concert.image,
      date: concert.date,
      time: concert.time,
      venue: concert.venue,
      location: concert.city,
    });
    navigate('/seat-selection');
  };

  return (
    <div className="glass-card border-plum/15 overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:border-plum/40 hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <img src={concert.image} alt={concert.artistName} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 to-obsidian/20" />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-pill text-xs font-semibold text-white bg-gradient-to-r from-plum to-plum-light">Concert</span>
        {concert.vipAvailable && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-pill text-xs font-semibold text-obsidian bg-gradient-to-r from-gold to-gold-light">VIP Available</span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-h3 font-display font-semibold text-ivory">{concert.artistName}</h3>
        <p className="text-ash text-body mt-1">{concert.concertTitle}</p>
        <div className="mt-4 pt-4 border-t border-ash/10 space-y-2">
          <p className="text-ivory flex items-center gap-2"><Calendar className="w-4 h-4 text-gold" /> {new Date(concert.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p className="text-ash text-body-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> {concert.venue}, {concert.city}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {concert.ticketTiers.map(tier => (
            <span key={tier.id} className="px-3 py-1 rounded-md bg-plum/15 text-plum text-body-sm border border-plum/20">{tier.name}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-ash/10">
          <span className="px-4 py-2 rounded-lg bg-gold/15 border border-gold/30 text-gold font-bold">From ${concert.ticketTiers[0]?.price}</span>
          <div className="flex items-center gap-3">
            <button onClick={handleGetTickets} className="gold-gradient-btn text-sm py-2 px-5">Get Tickets</button>
            <Link to={`/concerts/${concert.id}`} className="text-gold hover:text-gold-light transition-colors text-body-sm">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
