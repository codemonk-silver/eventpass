import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { footballMatches } from '../data/football';
import { useBookingStore } from '../stores/bookingStore';

const leagues = ['All Leagues', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'];

export function FootballPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('All Leagues');

  const filteredMatches = useMemo(() => {
    let result = [...footballMatches];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => m.homeTeam.toLowerCase().includes(q) || m.awayTeam.toLowerCase().includes(q) || m.stadium.toLowerCase().includes(q));
    }
    if (selectedLeague !== 'All Leagues') {
      result = result.filter(m => m.league === selectedLeague);
    }
    return result;
  }, [searchQuery, selectedLeague]);

  return (
    <>
      <section className="relative pt-20 min-h-[50vh] flex items-center">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #080A12 0%, rgba(8,10,18,0.9) 50%, rgba(34,197,94,0.08) 100%)' }} />
        <img src="/images/football-hero-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
        <div className="relative z-content max-w-container mx-auto container-padding py-16">
          <div className="flex items-center gap-2 text-body-sm text-ash mb-4">
            <Link to="/" className="text-gold hover:underline">Home</Link>
            <span>/</span>
            <span>Football</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-h1 font-display font-bold text-ivory">Football Matches</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-ivory/70 text-body-lg mt-2">The biggest clashes, derbies, and title deciders this season.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search teams, stadiums..." className="pl-11 pr-4 py-2.5 bg-charcoal/70 border border-gold/20 rounded-lg text-ivory placeholder:text-ash focus:outline-none focus:border-gold text-body-sm w-64" />
            </div>
            <div className="relative">
              <select value={selectedLeague} onChange={e => setSelectedLeague(e.target.value)} className="appearance-none pl-4 pr-10 py-2.5 bg-charcoal/70 border border-ash/20 rounded-lg text-ash text-body-sm focus:outline-none focus:border-gold cursor-pointer">
                {leagues.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-container mx-auto container-padding">
          <p className="text-ash text-body mb-8">{filteredMatches.length} upcoming matches</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMatches.map((match, i) => (
              <motion.div key={match.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <MatchCard match={match} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function MatchCard({ match }: { match: typeof footballMatches[0] }) {
  const navigate = useNavigate();
  const setEvent = useBookingStore(s => s.setEvent);

  const handleGetTickets = () => {
    setEvent({
      id: match.id,
      type: 'football',
      title: `${match.homeTeam} vs ${match.awayTeam}`,
      image: match.image,
      date: match.matchDate,
      time: match.matchTime,
      venue: match.stadium,
      location: match.city,
    });
    navigate('/seat-selection');
  };

  return (
    <div className="glass-card border-emerald/15 overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:border-emerald/40 hover:shadow-lg">
      <div className="relative h-40 overflow-hidden">
        <img src={match.image} alt={match.stadium} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 to-obsidian/30" />
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-medium bg-emerald/15 text-emerald border border-emerald/30">{match.league}</span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="text-center flex-1">
            <div className="w-14 h-14 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto text-gold font-bold">{match.homeTeam.slice(0, 2).toUpperCase()}</div>
            <p className="text-body-sm text-ivory mt-2 font-medium truncate">{match.homeTeam}</p>
          </div>
          <span className="px-4 py-1.5 rounded-lg bg-ruby/15 text-ruby text-label font-bold border border-ruby/20">VS</span>
          <div className="text-center flex-1">
            <div className="w-14 h-14 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto text-gold font-bold">{match.awayTeam.slice(0, 2).toUpperCase()}</div>
            <p className="text-body-sm text-ivory mt-2 font-medium truncate">{match.awayTeam}</p>
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <p className="text-ash text-body-sm flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-gold" /> {new Date(match.matchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {match.matchTime}</p>
          <p className="text-ash text-body-sm flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gold" /> {match.stadium}, {match.city}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {match.ticketZones.map(zone => (
            <span key={zone.id} className="px-2.5 py-1 rounded-md bg-emerald/15 text-emerald text-xs border border-emerald/20">{zone.name}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-ash/10">
          <span className="px-3 py-1.5 rounded-lg bg-gold/15 border border-gold/30 text-gold font-bold text-sm">From ${match.ticketZones[0]?.price}</span>
          <button onClick={handleGetTickets} className="gold-gradient-btn text-sm py-2 px-5">Get Tickets</button>
        </div>
      </div>
    </div>
  );
}
