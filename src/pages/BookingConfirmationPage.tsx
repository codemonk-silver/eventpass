import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Download, Share2, ArrowRight, Calendar, Clock, MapPin, Home } from 'lucide-react';
import { useBookingStore } from '../stores/bookingStore';

export function BookingConfirmationPage() {
  const { bookingReference, selectedEventTitle, selectedEventDate, selectedEventTime, selectedEventVenue, selectedSeats } = useBookingStore();

  const ref = bookingReference || 'EVT-78432-XYZ';

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
      {/* Confetti Particles */}
      <div className="absolute inset-0 pointer-events-none z-bg-decorative">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-fall"
            style={{
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              backgroundColor: '#D6B46A',
              opacity: 0.1 + Math.random() * 0.3,
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 12}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-content max-w-lg mx-auto container-padding text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-20 h-20 rounded-full bg-emerald/15 border-[3px] border-emerald flex items-center justify-center mx-auto"
        >
          <Check className="w-10 h-10 text-emerald" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-h1 font-display font-bold text-ivory mt-6">
          Booking Confirmed!
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-ash text-body-lg mt-2">
          Your tickets have been reserved. Check your email for details.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-4 inline-block px-4 py-2 rounded-md bg-gold/10 border border-gold/20">
          <span className="text-gold font-semibold font-mono text-sm">Booking Ref: {ref}</span>
        </motion.div>

        {/* Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 rounded-2xl overflow-hidden border border-gold/30 shadow-card"
          style={{ background: 'rgba(17, 24, 39, 0.9)' }}
        >
          {/* Ticket Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-gold to-gold-light flex items-center justify-between">
            <span className="font-display font-bold text-obsidian">EventPass</span>
            <span className="text-label uppercase tracking-wider text-obsidian font-semibold">Admit One</span>
          </div>

          {/* Ticket Body */}
          <div className="p-6 text-left">
            <h3 className="text-h3 font-display font-semibold text-ivory">{selectedEventTitle || 'Event'}</h3>
            <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium text-white bg-gradient-to-r from-gold/80 to-gold">VIP</span>

            <div className="mt-5 space-y-3">
              {selectedEventDate && (
                <div className="flex items-center gap-3 text-ivory">
                  <Calendar className="w-4 h-4 text-gold shrink-0" />
                  <span>{new Date(selectedEventDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              )}
              {selectedEventTime && (
                <div className="flex items-center gap-3 text-ivory">
                  <Clock className="w-4 h-4 text-gold shrink-0" />
                  <span>{selectedEventTime}</span>
                </div>
              )}
              {selectedEventVenue && (
                <div className="flex items-center gap-3 text-ivory">
                  <MapPin className="w-4 h-4 text-gold shrink-0" />
                  <span>{selectedEventVenue}</span>
                </div>
              )}
              {selectedSeats.length > 0 && (
                <div className="flex items-center gap-3 text-gold">
                  <span className="w-4 h-4 rounded-full border border-gold flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>{selectedSeats.map(s => `Row ${s.row}, Seat ${s.number}`).join(', ')}</span>
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-dashed border-ash/20">
              <p className="text-ash/60 text-body-sm font-mono">Ticket ID: {ref}-01</p>
              {/* Barcode placeholder */}
              <div className="mt-3 h-12 flex items-end gap-0.5 justify-center">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="bg-ivory/60" style={{ width: '2px', height: `${40 + Math.random() * 60}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Perforation */}
          <div className="relative h-4">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-ash/20" />
            <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-obsidian -translate-x-1/2" />
            <div className="absolute right-0 top-0 w-4 h-4 rounded-full bg-obsidian translate-x-1/2" />
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-10 flex flex-col items-center gap-4">
          <button className="w-full max-w-xs px-6 py-3 border border-gold/50 text-gold rounded-button hover:bg-gold/10 transition-colors inline-flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Download Ticket (PDF)
          </button>
          <button className="w-full max-w-xs px-6 py-3 border border-ash/30 text-ash rounded-button hover:border-gold/30 hover:text-gold transition-colors inline-flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <Link to="/" className="gold-gradient-btn inline-flex items-center justify-center gap-2 w-full max-w-xs">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link to="/events" className="text-gold hover:text-gold-light transition-colors inline-flex items-center gap-2 mt-2">
            Browse more events <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
