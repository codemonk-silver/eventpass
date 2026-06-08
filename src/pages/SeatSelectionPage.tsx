import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { useBookingStore } from '../stores/bookingStore';
import { getSeatMap } from '../data/seats';

export function SeatSelectionPage() {
  const navigate = useNavigate();
  const {
    selectedEventTitle, selectedEventDate, selectedEventTime, selectedEventVenue,
    selectedTicketPrice, selectedSeats, toggleSeat, removeSeat, serviceFee
  } = useBookingStore();

  const [eventId] = useState(() => useBookingStore.getState().selectedEventId || 'default');
  const seats = getSeatMap(eventId, selectedTicketPrice || 18);

  const handleCheckout = () => {
    if (selectedSeats.length === 0) return;
    navigate('/checkout');
  };

  const selectedCount = selectedSeats.length;
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const fee = serviceFee * selectedCount;

  return (
    <>
      {/* Header */}
      <section className="pt-20 border-b border-gold/10">
        <div className="max-w-content mx-auto container-padding py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <Link to="/events" className="inline-flex items-center gap-2 text-ash hover:text-gold transition-colors text-body-sm mb-2">
                <ArrowLeft className="w-4 h-4" /> Back to Event
              </Link>
              <h1 className="text-h3 font-display font-semibold text-ivory">{selectedEventTitle || 'Select Your Seats'}</h1>
              <div className="flex flex-wrap gap-4 mt-1 text-ash text-body-sm">
                {selectedEventDate && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold" /> {new Date(selectedEventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
                {selectedEventTime && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold" /> {selectedEventTime}</span>}
                {selectedEventVenue && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gold" /> {selectedEventVenue}</span>}
              </div>
            </div>
            {/* Progress Steps */}
            <div className="flex items-center gap-2">
              {[
                { num: 1, label: 'Select Seats', active: true },
                { num: 2, label: 'Checkout', active: false },
                { num: 3, label: 'Confirm', active: false },
              ].map((step, i) => (
                <div key={step.num} className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    step.active ? 'bg-gold/15 text-gold border border-gold/30' : 'bg-ash/10 text-ash border border-ash/20'
                  }`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step.active ? 'bg-gold text-obsidian' : 'bg-ash/20 text-ash'
                    }`}>{step.num}</span>
                    <span className="hidden sm:inline">{step.label}</span>
                  </div>
                  {i < 2 && <div className={`w-8 h-px ${step.active ? 'bg-gold/40' : 'bg-ash/20'}`} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 lg:py-12">
        <div className="max-w-content mx-auto container-padding">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Seat Map */}
            <div className="flex-1">
              {/* Screen */}
              <div className="text-center mb-10">
                <div className="mx-auto w-[60%] h-1 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #D6B46A, transparent)' }} />
                <p className="text-label text-ash mt-2 uppercase tracking-[0.2em]">Screen</p>
              </div>

              {/* Seats Grid */}
              <div className="flex flex-col items-center gap-2">
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(row => (
                  <div key={row} className="flex items-center gap-1.5">
                    <span className="w-5 text-right text-body-sm text-ash font-mono">{row}</span>
                    <div className="flex gap-1.5">
                      {seats.filter(s => s.row === row).map(seat => (
                        <SeatButton
                          key={seat.id}
                          seat={seat}
                          isSelected={selectedSeats.some(s => s.id === seat.id)}
                          onClick={() => {
                            if (seat.status !== 'unavailable') toggleSeat(seat);
                          }}
                        />
                      ))}
                    </div>
                    <span className="w-5 text-body-sm text-ash font-mono">{row}</span>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
                {[
                  { label: 'Available', color: 'bg-emerald/15 border-emerald/30', dot: 'bg-emerald' },
                  { label: 'Selected', color: 'bg-gold/20 border-gold/50', dot: 'bg-gold' },
                  { label: 'Unavailable', color: 'bg-ash/5 border-ash/10', dot: 'bg-ash/20' },
                  { label: 'Accessible', color: 'bg-blue-500/15 border-blue-500/30', dot: 'bg-blue-500' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded border ${item.color} flex items-center justify-center`}>
                      <div className={`w-2 h-2 rounded-sm ${item.dot}`} />
                    </div>
                    <span className="text-body-sm text-ash">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="glass-card p-6 lg:sticky lg:top-24">
                <h3 className="text-h4 font-display font-semibold text-ivory mb-4">Your Selection</h3>
                <p className="text-ash text-body-sm mb-4">{selectedEventTitle}</p>

                {selectedCount === 0 ? (
                  <div className="py-8 text-center">
                    <Ticket className="w-10 h-10 text-ash/30 mx-auto mb-3" />
                    <p className="text-ash text-body italic">No seats selected</p>
                    <p className="text-ash/60 text-body-sm mt-1">Click on available seats to select</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <AnimatePresence>
                      {selectedSeats.map(seat => (
                        <motion.div
                          key={seat.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center justify-between py-2 px-3 rounded-lg bg-charcoal/50 border border-ash/10"
                        >
                          <span className="text-ivory text-body-sm">Row {seat.row}, Seat {seat.number}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gold font-medium text-sm">${seat.price}</span>
                            <button onClick={() => removeSeat(seat.id)} className="text-ash hover:text-ruby transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                <div className="mt-5 pt-5 border-t border-ash/10 space-y-2">
                  <div className="flex justify-between text-body-sm">
                    <span className="text-ash">Subtotal</span>
                    <span className="text-ivory">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-body-sm">
                    <span className="text-ash">Service fee ({selectedCount}x ${serviceFee})</span>
                    <span className="text-ivory">${fee}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-ash/10">
                    <span className="text-ivory font-semibold">Total</span>
                    <span className="text-gold font-bold text-lg">${subtotal + fee}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={selectedCount === 0}
                  className="gold-gradient-btn w-full mt-6 text-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SeatButton({ seat, isSelected, onClick }: { seat: { id: string; row: string; number: number; status: string; price: number }; isSelected: boolean; onClick: () => void }) {
  const getClasses = () => {
    const base = 'w-7 h-8 sm:w-8 sm:h-9 rounded-md border text-[10px] font-medium transition-all duration-200 flex items-center justify-center';
    if (seat.status === 'unavailable') return `${base} bg-ash/5 border-ash/10 text-ash/20 cursor-not-allowed`;
    if (seat.status === 'wheelchair') {
      if (isSelected) return `${base} bg-gold/20 border-gold/50 text-gold cursor-pointer scale-105`;
      return `${base} bg-blue-500/15 border-blue-500/30 text-blue-400 cursor-pointer hover:scale-110 hover:bg-blue-500/25`;
    }
    if (isSelected) return `${base} bg-gold/20 border-gold/50 text-gold cursor-pointer scale-105 shadow-[0_0_12px_rgba(214,180,106,0.3)]`;
    return `${base} bg-emerald/15 border-emerald/30 text-emerald/70 cursor-pointer hover:scale-110 hover:bg-emerald/25 hover:shadow-[0_0_12px_rgba(34,197,94,0.2)]`;
  };

  return (
    <button onClick={onClick} className={getClasses()} title={`Row ${seat.row}, Seat ${seat.number} - $${seat.price}`}>
      {isSelected ? <Check className="w-3.5 h-3.5" /> : seat.number}
    </button>
  );
}
