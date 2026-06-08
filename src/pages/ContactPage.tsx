import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from 'lucide-react';
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim() || formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <>
      <section className="relative pt-20 min-h-[35vh] flex items-center" style={{ background: 'linear-gradient(135deg, #080A12 0%, #111827 100%)' }}>
        <div className="max-w-container mx-auto container-padding py-16">
          <div className="flex items-center gap-2 text-body-sm text-ash mb-4">
            <Link to="/" className="text-gold hover:underline">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-h1 font-display font-bold text-ivory">
            Get in Touch
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-ash text-body-lg mt-2 max-w-lg">
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-content mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="p-6 lg:p-10 rounded-2xl bg-charcoal/50 border border-gold/10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald/15 border-2 border-emerald flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 text-emerald" />
                      </div>
                      <h3 className="text-h3 font-display font-semibold text-ivory mt-6">Message Sent!</h3>
                      <p className="text-ash text-body mt-2">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 text-gold hover:text-gold-light transition-colors"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <h3 className="text-h3 font-display font-semibold text-ivory mb-2">Send us a Message</h3>
                      <div>
                        <label className="text-body-sm text-ash mb-1.5 block">Your Name</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your name" className={`w-full px-4 py-3 rounded-lg bg-charcoal/50 border text-ivory placeholder:text-ash/50 focus:outline-none focus:border-gold transition-colors ${errors.name ? 'border-ruby' : 'border-ash/20'}`} />
                        {errors.name && <p className="text-ruby text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-body-sm text-ash mb-1.5 block">Email Address</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Enter your email" className={`w-full px-4 py-3 rounded-lg bg-charcoal/50 border text-ivory placeholder:text-ash/50 focus:outline-none focus:border-gold transition-colors ${errors.email ? 'border-ruby' : 'border-ash/20'}`} />
                        {errors.email && <p className="text-ruby text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                      </div>
                      <div>
                        <label className="text-body-sm text-ash mb-1.5 block">Subject</label>
                        <input type="text" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} placeholder="What is this about?" className={`w-full px-4 py-3 rounded-lg bg-charcoal/50 border text-ivory placeholder:text-ash/50 focus:outline-none focus:border-gold transition-colors ${errors.subject ? 'border-ruby' : 'border-ash/20'}`} />
                        {errors.subject && <p className="text-ruby text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.subject}</p>}
                      </div>
                      <div>
                        <label className="text-body-sm text-ash mb-1.5 block">Message</label>
                        <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us more..." rows={5} className={`w-full px-4 py-3 rounded-lg bg-charcoal/50 border text-ivory placeholder:text-ash/50 focus:outline-none focus:border-gold transition-colors resize-vertical ${errors.message ? 'border-ruby' : 'border-ash/20'}`} />
                        {errors.message && <p className="text-ruby text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="gold-gradient-btn w-full inline-flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <><Send className="w-4 h-4" /> Send Message</>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-6 h-6 text-gold" />
                  <h4 className="text-h4 font-display font-semibold text-ivory">Email Us</h4>
                </div>
                <p className="text-ivory text-body">hello@eventpass.com</p>
                <p className="text-ash text-body-sm mt-1">We typically respond within 24 hours.</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-6 h-6 text-gold" />
                  <h4 className="text-h4 font-display font-semibold text-ivory">Call Us</h4>
                </div>
                <p className="text-ivory text-body">+1 (555) 123-4567</p>
                <p className="text-ash text-body-sm mt-1">Mon-Fri, 9 AM - 6 PM EST</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-gold" />
                  <h4 className="text-h4 font-display font-semibold text-ivory">Visit Us</h4>
                </div>
                <p className="text-ivory text-body">123 Entertainment Ave, Suite 500</p>
                <p className="text-ash text-body-sm mt-1">New York, NY 10001</p>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-h4 font-display font-semibold text-ivory mb-4">Follow Us</h4>
                <div className="flex items-center gap-3">
                  {[
                    { icon: FaInstagram, href: 'https://instagram.com' },
                    { icon: FaXTwitter, href: 'https://twitter.com' },
                    { icon: FaFacebook, href: 'https://facebook.com' },
                    { icon: FaYoutube, href: 'https://youtube.com' },
                  ].map(({ icon: Icon, href }, i) => (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-ash/20 flex items-center justify-center text-ash hover:text-gold hover:border-gold/40 transition-all">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video rounded-xl bg-charcoal/50 border border-ash/10 flex flex-col items-center justify-center">
                <MapPin className="w-8 h-8 text-ash/30 mb-2" />
                <p className="text-ash">Map view coming soon</p>
                <p className="text-ash/50 text-body-sm mt-1">123 Entertainment Ave, New York, NY 10001</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
