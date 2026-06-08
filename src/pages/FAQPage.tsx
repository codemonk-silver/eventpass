import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { faqItems, faqCategories } from '../data/faq';

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    let result = [...faqItems];
    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <>
      <section className="relative pt-20 min-h-[35vh] flex items-center" style={{ background: 'linear-gradient(135deg, #080A12 0%, #111827 100%)' }}>
        <div className="max-w-container mx-auto container-padding py-16">
          <div className="flex items-center gap-2 text-body-sm text-ash mb-4">
            <Link to="/" className="text-gold hover:underline">Home</Link>
            <span>/</span>
            <span>FAQ</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-h1 font-display font-bold text-ivory">
            Frequently Asked Questions
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-ash text-body-lg mt-2 max-w-lg">
            Find answers to common questions about tickets, bookings, and policies.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-12 pr-4 py-3.5 bg-charcoal/70 border border-gold/20 rounded-xl text-ivory placeholder:text-ash focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-narrow mx-auto container-padding">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {faqCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenItem(null); }}
                className={`px-5 py-2.5 rounded-lg text-body-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gold/15 text-gold'
                    : 'bg-transparent text-ash hover:bg-ash/10 hover:text-ivory'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-xl bg-charcoal/50 border border-ash/10 overflow-hidden hover:bg-charcoal/70 hover:border-gold/20 transition-all"
              >
                <button
                  onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-ivory font-medium text-body pr-4">{item.question}</span>
                  {openItem === item.id ? (
                    <ChevronUp className="w-5 h-5 text-gold shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-ash shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-ash/10 pt-4">
                        <p className="text-ash text-body leading-relaxed">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-ash/30 mx-auto mb-4" />
              <h3 className="text-ivory font-semibold mb-2">No questions found</h3>
              <p className="text-ash">Try a different search term or category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
