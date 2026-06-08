import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { MoviesPage } from './pages/MoviesPage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { ConcertsPage } from './pages/ConcertsPage';
import { ConcertDetailPage } from './pages/ConcertDetailPage';
import { FootballPage } from './pages/FootballPage';
import { FootballDetailPage } from './pages/FootballDetailPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/events" element={<PageWrapper><EventsPage /></PageWrapper>} />
        <Route path="/events/:id" element={<PageWrapper><EventDetailPage /></PageWrapper>} />
        <Route path="/movies" element={<PageWrapper><MoviesPage /></PageWrapper>} />
        <Route path="/movies/:id" element={<PageWrapper><MovieDetailPage /></PageWrapper>} />
        <Route path="/concerts" element={<PageWrapper><ConcertsPage /></PageWrapper>} />
        <Route path="/concerts/:id" element={<PageWrapper><ConcertDetailPage /></PageWrapper>} />
        <Route path="/football" element={<PageWrapper><FootballPage /></PageWrapper>} />
        <Route path="/football/:id" element={<PageWrapper><FootballDetailPage /></PageWrapper>} />
        <Route path="/seat-selection" element={<PageWrapper><SeatSelectionPage /></PageWrapper>} />
        <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
        <Route path="/confirmation" element={<PageWrapper><BookingConfirmationPage /></PageWrapper>} />
        <Route path="/faq" element={<PageWrapper><FAQPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-obsidian text-ivory">
        <ScrollToTop />
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
