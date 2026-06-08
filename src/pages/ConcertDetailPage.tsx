import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, Check, X, Share2, Users } from 'lucide-react';
import { concerts } from '../data/concerts';
import { useBookingStore } from '../stores/bookingStore';
import { useState } from 'react';

export function ConcertDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const concert = concerts.find(c => c.id === id);
  const setEvent = useBookingStore(s => s.setEvent);
  const setTicket = useBookingStore(s => s.setTicket);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  if (!concert) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-h2 text-ivory mb-4">Concert Not Found</h2>
          <Link to="/concerts" className="text-gold hover:underline">Browse all concerts</Link>
        </div>
      </div>
    );
  }

  const handleContinue = () => {
    const tier = concert.ticketTiers.find(t => t.id === selectedTier);
    if (!tier) return;
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
    setTicket(tier.name, tier.price);
    navigate('/seat-selection');
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pt-20">
        <img src={concert.image} alt={concert.artistName} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-plum/10" />
        <div className="relative z-content max-w-container mx-auto container-padding pb-12 w-full">
          <div className="flex items-center gap-2 text-body-sm text-ash mb-4">
            <Link to="/" className="text-gold hover:underline">Home</Link>
            <span>/</span>
            <Link to="/concerts" className="text-gold hover:underline">Concerts</Link>
            <span>/</span>
            <span>{concert.artistName}</span>
          </div>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-3 py-1 rounded-pill text-xs font-semibold text-white bg-gradient-to-r from-plum to-plum-light mb-4">Concert</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-h1 font-display font-bold text-ivory">{concert.artistName}</motion.h1>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-h2 font-display text-gold mt-2">{concert.concertTitle}</motion.h2>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6 mt-4 text-ivory">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold" /> {new Date(concert.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold" /> {concert.time}</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> {concert.venue}, {concert.city}</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex items-center gap-4 mt-8">
            <span className="px-4 py-2 rounded-lg bg-gold/15 border border-gold/30 text-gold font-bold">From ${concert.ticketTiers[0]?.price}</span>
            <button className="px-5 py-3 border border-gold/50 text-gold rounded-button hover:bg-gold/10 transition-colors inline-flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </motion.div>
        </div>
      </section>

      {/* Ticket Packages */}
      <section className="py-12 lg:py-16">
        <div className="max-w-content mx-auto container-padding">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-h2 font-display font-semibold text-ivory">Choose Your Experience</h2>
            <p className="text-ash text-body-lg mt-2">From general admission to VIP — pick the perfect package.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {concert.ticketTiers.map((tier, i) => {
              const isSelected = selectedTier === tier.id;
              const isVIP = tier.id === 'vip';
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`relative rounded-2xl border p-6 cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? isVIP ? 'border-gold/60 bg-gold/5 shadow-lg shadow-gold/10' : 'border-plum/60 bg-plum/5'
                      : 'border-ash/20 bg-charcoal/50 hover:border-ash/40'
                  }`}
                >
                  {isVIP && (
                    <div className="absolute -top-px left-0 right-0 px-4 py-1.5 text-center rounded-t-2xl bg-gradient-to-r from-gold to-gold-light text-obsidian text-label uppercase font-bold tracking-wider text-xs">
                      Recommended
                    </div>
                  )}
                  <div className={`${isVIP ? 'mt-6' : ''}`}>
                    <h3 className="text-h3 font-display font-semibold text-ivory">{tier.name}</h3>
                    <p className="text-gold text-h3 font-bold mt-2">${tier.price}</p>
                    <p className="text-ash text-body-sm">per person</p>
                  </div>
                  <div className="mt-5 pt-5 border-t border-ash/10 space-y-2.5">
                    {tier.benefits.map(b => (
                      <p key={b} className={`flex items-start gap-2 text-body-sm ${isVIP ? 'text-gold' : 'text-ash'}`}>
                        <Check className="w-4 h-4 text-emerald shrink-0 mt-0.5" /> {b}
                      </p>
                    ))}
                    {tier.notIncluded.map(n => (
                      <p key={n} className="flex items-start gap-2 text-body-sm text-ash/50">
                        <X className="w-4 h-4 text-ruby shrink-0 mt-0.5" /> {n}
                      </p>
                    ))}
                  </div>
                  <button className={`w-full mt-6 py-3 rounded-button font-semibold text-label uppercase tracking-wider transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-gold to-gold-light text-obsidian'
                      : 'border border-ash/30 text-ash hover:border-gold/50 hover:text-gold'
                  }`}>
                    {isSelected ? 'Selected' : `Select ${tier.name.split(' ')[0]}`}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {selectedTier && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
              <button onClick={handleContinue} className="gold-gradient-btn inline-flex items-center gap-2">
                Continue to Seats <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Venue & Info */}
      <section className="py-12 lg:py-16 border-t border-ash/10">
        <div className="max-w-content mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-h3 font-display font-semibold text-ivory mb-4">Venue Information</h3>
              <div className="aspect-video rounded-xl bg-charcoal/50 border border-ash/10 flex items-center justify-center overflow-hidden">
                <img src={concert.image} alt={concert.venue} className="w-full h-full object-cover opacity-50" />
              </div>
              <h4 className="text-h4 font-display font-semibold text-ivory mt-4">{concert.venue}</h4>
              <p className="text-ash text-body flex items-center gap-2 mt-2"><MapPin className="w-4 h-4 text-gold" /> {concert.city}</p>
              <p className="text-ash text-body flex items-center gap-2 mt-1"><Users className="w-4 h-4 text-gold" /> 20,000 capacity</p>
            </div>
            <div>
              <h3 className="text-h3 font-display font-semibold text-ivory mb-4">Event Details</h3>
              <div className="space-y-3">
                <p className="text-body"><span className="text-ash">Doors Open:</span> <span className="text-ivory">{concert.time ? String(Number(concert.time.split(':')[0]) - 2) + ':00 PM' : '6:00 PM'}</span></p>
                <p className="text-body"><span className="text-ash">Show Starts:</span> <span className="text-ivory">{concert.time}</span></p>
                <p className="text-body"><span className="text-ash">Expected Duration:</span> <span className="text-ivory">3 hours</span></p>
                <p className="text-body"><span className="text-ash">Age Restriction:</span> <span className="text-ivory">{concert.ageRestriction}</span></p>
                {concert.supportAct && <p className="text-body"><span className="text-ash">Support Act:</span> <span className="text-ivory">{concert.supportAct}</span></p>}
              </div>
              <div className="mt-6 pt-6 border-t border-ash/10">
                <h4 className="text-h4 font-display font-semibold text-ivory mb-3">What to Expect</h4>
                <p className="text-ash text-body leading-relaxed">{concert.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
