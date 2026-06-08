import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lock, Check, CreditCard, AlertCircle } from 'lucide-react';
import { useBookingStore } from '../stores/bookingStore';

type PaymentMethod = 'card' | 'paypal' | 'apple-pay';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { selectedEventTitle, selectedEventImage, selectedTicketName, selectedSeats, contactName, contactEmail, contactPhone, paymentMethod, setContactDetails, setPaymentMethod, completeBooking, subtotal, total, serviceFee } = useBookingStore();

  const [name, setName] = useState(contactName);
  const [email, setEmail] = useState(contactEmail);
  const [phone, setPhone] = useState(contactPhone);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedCount = selectedSeats.length;
  const fee = serviceFee * selectedCount;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) newErrors.name = 'Full name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Valid email is required';
    if (!phone.trim() || phone.trim().length < 10) newErrors.phone = 'Valid phone number is required';
    if (!paymentMethod) newErrors.payment = 'Please select a payment method';
    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16) newErrors.card = 'Valid card number is required';
      if (!expiry.trim()) newErrors.expiry = 'Expiry date is required';
      if (!cvv.trim() || cvv.length < 3) newErrors.cvv = 'Valid CVV is required';
    }
    if (!agreed) newErrors.terms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = () => {
    if (!validate()) return;
    setContactDetails(name, email, phone);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      completeBooking();
      setTimeout(() => navigate('/confirmation'), 1000);
    }, 2000);
  };

  return (
    <>
      <section className="pt-20 pb-8">
        <div className="max-w-[1000px] mx-auto container-padding">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link to="/seat-selection" className="inline-flex items-center gap-2 text-ash hover:text-gold transition-colors text-body-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Seats
            </Link>
            <div className="flex items-center gap-2 text-body-sm text-ash">
              <Lock className="w-4 h-4 text-emerald" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-[1000px] mx-auto container-padding">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-h2 font-display font-semibold text-ivory mb-8">
            Complete Your Booking
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form */}
            <div className="flex-1 space-y-6">
              {/* Contact Details */}
              <div>
                <h3 className="text-h4 font-display font-semibold text-ivory mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-body-sm text-ash mb-1.5 block">Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" className={`w-full px-4 py-3 rounded-lg bg-charcoal/50 border text-ivory placeholder:text-ash/50 focus:outline-none focus:border-gold transition-colors ${errors.name ? 'border-ruby' : 'border-ash/20'}`} />
                    {errors.name && <p className="text-ruby text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-body-sm text-ash mb-1.5 block">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className={`w-full px-4 py-3 rounded-lg bg-charcoal/50 border text-ivory placeholder:text-ash/50 focus:outline-none focus:border-gold transition-colors ${errors.email ? 'border-ruby' : 'border-ash/20'}`} />
                    {errors.email && <p className="text-ruby text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-body-sm text-ash mb-1.5 block">Phone Number</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter your phone number" className={`w-full px-4 py-3 rounded-lg bg-charcoal/50 border text-ivory placeholder:text-ash/50 focus:outline-none focus:border-gold transition-colors ${errors.phone ? 'border-ruby' : 'border-ash/20'}`} />
                    {errors.phone && <p className="text-ruby text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="text-h4 font-display font-semibold text-ivory mb-2">Payment Method (Mock)</h3>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-body-sm mb-4">
                  This is a demo. No real payment will be processed.
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'card' as PaymentMethod, label: 'Credit / Debit Card', icon: CreditCard },
                    { id: 'paypal' as PaymentMethod, label: 'PayPal', icon: () => <span className="text-blue-400 font-bold text-sm">Pay</span> },
                    { id: 'apple-pay' as PaymentMethod, label: 'Apple Pay', icon: () => <span className="text-ivory font-medium text-sm">Apple Pay</span> },
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        paymentMethod === method.id ? 'border-gold bg-gold/5' : 'border-ash/20 hover:border-ash/40'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-gold' : 'border-ash/30'}`}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
                      </div>
                      <span className="text-ivory font-medium">{method.label}</span>
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {paymentMethod === 'card' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mt-4 p-5 rounded-xl bg-charcoal/30 border border-ash/10 space-y-3">
                        <div>
                          <label className="text-body-sm text-ash mb-1.5 block">Card Number</label>
                          <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '))} placeholder="1234 5678 9012 3456" maxLength={19} className={`w-full px-4 py-3 rounded-lg bg-charcoal/50 border text-ivory placeholder:text-ash/50 focus:outline-none focus:border-gold transition-colors ${errors.card ? 'border-ruby' : 'border-ash/20'}`} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-body-sm text-ash mb-1.5 block">Expiry</label>
                            <input type="text" value={expiry} onChange={e => setExpiry(e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2'))} placeholder="MM/YY" maxLength={5} className={`w-full px-4 py-3 rounded-lg bg-charcoal/50 border text-ivory placeholder:text-ash/50 focus:outline-none focus:border-gold transition-colors ${errors.expiry ? 'border-ruby' : 'border-ash/20'}`} />
                          </div>
                          <div>
                            <label className="text-body-sm text-ash mb-1.5 block">CVV</label>
                            <input type="password" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, ''))} placeholder="CVV" maxLength={4} className={`w-full px-4 py-3 rounded-lg bg-charcoal/50 border text-ivory placeholder:text-ash/50 focus:outline-none focus:border-gold transition-colors ${errors.cvv ? 'border-ruby' : 'border-ash/20'}`} />
                          </div>
                        </div>
                        <div>
                          <label className="text-body-sm text-ash mb-1.5 block">Name on Card</label>
                          <input type="text" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Name on card" className="w-full px-4 py-3 rounded-lg bg-charcoal/50 border border-ash/20 text-ivory placeholder:text-ash/50 focus:outline-none focus:border-gold transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {errors.payment && <p className="text-ruby text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.payment}</p>}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <button onClick={() => setAgreed(!agreed)} className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${agreed ? 'bg-gold border-gold' : 'border-ash/30'}`}>
                  {agreed && <Check className="w-3 h-3 text-obsidian" />}
                </button>
                <p className={`text-body-sm ${errors.terms ? 'text-ruby' : 'text-ash'}`}>
                  I agree to the <span className="text-gold cursor-pointer">Terms of Service</span> and <span className="text-gold cursor-pointer">Privacy Policy</span>
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="glass-card p-6 lg:sticky lg:top-24">
                <h3 className="text-h4 font-display font-semibold text-ivory mb-4">Order Summary</h3>
                <div className="flex items-center gap-4 mb-4">
                  {selectedEventImage && <img src={selectedEventImage} alt="" className="w-16 h-12 rounded-lg object-cover" />}
                  <div>
                    <p className="text-ivory font-medium text-sm">{selectedEventTitle}</p>
                    <p className="text-ash text-body-sm">{selectedTicketName}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-ash/10">
                  <div className="flex justify-between text-body-sm">
                    <span className="text-ash">Seats ({selectedCount})</span>
                    <span className="text-ivory">${subtotal()}</span>
                  </div>
                  <div className="flex justify-between text-body-sm">
                    <span className="text-ash">Service fee</span>
                    <span className="text-ivory">${fee}</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4 mt-4 border-t border-ash/20">
                  <span className="text-ivory font-semibold">Total</span>
                  <span className="text-gold font-bold text-xl">${total()}</span>
                </div>

                <button
                  onClick={handlePay}
                  disabled={loading || success}
                  className="gold-gradient-btn w-full mt-6 text-center justify-center disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : success ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" /> Booked!
                    </span>
                  ) : (
                    `Pay $${total()}`
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-ash/50 text-body-sm">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Your booking is secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
