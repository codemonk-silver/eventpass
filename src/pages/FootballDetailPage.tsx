import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { footballMatches } from '../data/football';
import { useBookingStore } from '../stores/bookingStore';
import { useState } from 'react';

export function FootballDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const match = footballMatches.find(m => m.id === id);
  const setEvent = useBookingStore(s => s.setEvent);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-h2 text-ivory mb-4">Match Not Found</h2>
          <Link to="/football" className="text-gold hover:underline">Browse all matches</Link>
        </div>
      </div>
    );
  }

  const handleContinue = () => {
    const zone = match.ticketZones.find(z => z.id === selectedZone);
    if (!zone) return;
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

  const formColors: Record<string, string> = {
    W: 'bg-emerald/20 text-emerald',
    D: 'bg-amber-500/20 text-amber-400',
    L: 'bg-ruby/20 text-ruby',
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20">
        <img src={match.image} alt={match.stadium} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-emerald/5" />
        <div className="relative z-content max-w-content mx-auto container-padding text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-3 py-1 rounded-md bg-emerald/15 text-emerald text-body-sm border border-emerald/30 mb-6">{match.league}</motion.span>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center justify-center gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gold/10 border-[3px] border-gold/40 flex items-center justify-center mx-auto text-gold font-bold text-xl">{match.homeTeam.slice(0, 2).toUpperCase()}</div>
              <h2 className="text-h3 font-display font-semibold text-ivory mt-3">{match.homeTeam}</h2>
            </div>
            <span className="px-5 py-2 rounded-xl bg-ruby/15 text-ruby text-label font-bold border border-ruby/20 text-lg">VS</span>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gold/10 border-[3px] border-gold/40 flex items-center justify-center mx-auto text-gold font-bold text-xl">{match.awayTeam.slice(0, 2).toUpperCase()}</div>
              <h2 className="text-h3 font-display font-semibold text-ivory mt-3">{match.awayTeam}</h2>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-8">
            <p className="text-h4 text-ivory flex items-center justify-center gap-2"><Calendar className="w-5 h-5 text-gold" /> {new Date(match.matchDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <p className="text-ash text-body flex items-center justify-center gap-2 mt-2"><Clock className="w-4 h-4 text-gold" /> {match.matchTime}</p>
            <p className="text-ash text-body flex items-center justify-center gap-2 mt-1"><MapPin className="w-4 h-4 text-gold" /> {match.stadium}, {match.city}</p>
            <button onClick={() => document.getElementById('zones')?.scrollIntoView({ behavior: 'smooth' })} className="gold-gradient-btn mt-6 inline-flex items-center gap-2">
              Get Tickets <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stadium Zones */}
      <section id="zones" className="py-12 lg:py-16">
        <div className="max-w-content mx-auto container-padding">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-h2 font-display font-semibold text-ivory">Select Your Zone</h2>
            <p className="text-ash text-body-lg mt-2">Choose the perfect view of the action.</p>
          </motion.div>

          {/* Stadium Diagram */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-[500px] mx-auto mb-12">
            <div className="relative aspect-[2/1] bg-charcoal/50 rounded-3xl border border-ash/10 overflow-hidden p-8">
              {/* Pitch */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] aspect-[2/1] bg-emerald/80 rounded-[50%] border-2 border-emerald-400/40 flex items-center justify-center">
                <span className="text-ivory/60 text-label font-bold">PITCH</span>
              </div>
              {/* Stands */}
              <div className="absolute top-2 left-[15%] right-[15%] h-10 rounded-t-lg bg-gold/15 border border-gold/20 cursor-pointer hover:bg-gold/25 transition-colors flex items-center justify-center">
                <span className="text-gold/70 text-xs">Premium</span>
              </div>
              <div className="absolute bottom-2 left-[15%] right-[15%] h-10 rounded-b-lg bg-emerald/15 border border-emerald/20 cursor-pointer hover:bg-emerald/25 transition-colors flex items-center justify-center">
                <span className="text-emerald/70 text-xs">Standard</span>
              </div>
              <div className="absolute top-[20%] left-2 bottom-[20%] w-8 rounded-l-lg bg-plum/15 border border-plum/20 cursor-pointer hover:bg-plum/25 transition-colors flex items-center justify-center">
                <span className="text-plum/70 text-xs rotate-[-90deg] whitespace-nowrap">VIP Box</span>
              </div>
              <div className="absolute top-[20%] right-2 bottom-[20%] w-8 rounded-r-lg bg-plum/15 border border-plum/20 cursor-pointer hover:bg-plum/25 transition-colors flex items-center justify-center">
                <span className="text-plum/70 text-xs rotate-90 whitespace-nowrap">VIP Box</span>
              </div>
            </div>
          </motion.div>

          {/* Zone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {match.ticketZones.map((zone, i) => {
              const isSelected = selectedZone === zone.id;
              return (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  onClick={() => setSelectedZone(zone.id)}
                  className={`rounded-2xl border p-6 cursor-pointer transition-all ${
                    isSelected
                      ? zone.id === 'standard' ? 'border-emerald/60 bg-emerald/5' : zone.id === 'premium' ? 'border-gold/60 bg-gold/5' : 'border-plum/60 bg-plum/5'
                      : 'border-ash/20 bg-charcoal/50 hover:border-ash/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }} />
                    <span className="text-ivory font-medium">{zone.name}</span>
                  </div>
                  <p className="text-h3 font-bold text-ivory">${zone.price}</p>
                  <p className="text-ash text-body-sm mt-2">{zone.description}</p>
                  <p className={`text-body-sm mt-3 flex items-center gap-1 ${zone.availability < 20 ? 'text-amber-400' : 'text-emerald'}`}>
                    {zone.availability < 20 ? 'Limited' : ''} {zone.availability}+ seats available
                  </p>
                  <button className={`w-full mt-5 py-2.5 rounded-button font-semibold text-sm transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-gold to-gold-light text-obsidian'
                      : 'border border-ash/30 text-ash hover:border-gold/50 hover:text-gold'
                  }`}>
                    {isSelected ? 'Selected' : 'Select Zone'}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {selectedZone && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
              <button onClick={handleContinue} className="gold-gradient-btn inline-flex items-center gap-2">
                Continue to Seat Selection <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Match Info */}
      <section className="py-12 lg:py-16 border-t border-ash/10">
        <div className="max-w-content mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-h3 font-display font-semibold text-ivory mb-4">Head to Head</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 rounded-xl bg-charcoal/50 border border-ash/10">
                  <p className="text-h3 font-bold text-ivory">{match.headToHead.wins}</p>
                  <p className="text-body-sm text-ash mt-1">{match.homeTeam} Wins</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-charcoal/50 border border-ash/10">
                  <p className="text-h3 font-bold text-ash">{match.headToHead.draws}</p>
                  <p className="text-body-sm text-ash mt-1">Draws</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-charcoal/50 border border-ash/10">
                  <p className="text-h3 font-bold text-ivory">{match.headToHead.losses}</p>
                  <p className="text-body-sm text-ash mt-1">{match.awayTeam} Wins</p>
                </div>
              </div>

              <h3 className="text-h3 font-display font-semibold text-ivory mb-4 mt-8">Recent Form</h3>
              <div className="flex items-center gap-2">
                {match.recentForm.map((result, i) => (
                  <span key={i} className={`w-9 h-9 rounded-md flex items-center justify-center font-bold text-sm ${formColors[result]}`}>
                    {result}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-h3 font-display font-semibold text-ivory mb-4">Stadium Information</h3>
              <div className="aspect-video rounded-xl bg-charcoal/50 border border-ash/10 flex items-center justify-center overflow-hidden">
                <img src={match.image} alt={match.stadium} className="w-full h-full object-cover opacity-50" />
              </div>
              <h4 className="text-h4 font-display font-semibold text-ivory mt-4">{match.stadium}</h4>
              <div className="space-y-2 mt-3">
                <p className="text-ash text-body">Capacity: 74,140</p>
                <p className="text-ash text-body">Surface: Grass</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
