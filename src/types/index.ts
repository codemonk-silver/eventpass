export interface Event {
  id: string;
  title: string;
  category: 'movie' | 'concert' | 'football';
  image: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  priceFrom: number;
  featured: boolean;
  status: 'available' | 'selling-fast' | 'sold-out';
  rating: number;
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  director: string;
  cast: string;
  synopsis: string;
  posterImage: string;
  ticketPrice: number;
  showtimes: Showtime[];
}

export interface Showtime {
  id: string;
  cinemaId: string;
  cinemaName: string;
  time: string;
  format: string;
  price: number;
  availability: 'available' | 'selling-fast';
}

export interface Concert {
  id: string;
  artistName: string;
  concertTitle: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  image: string;
  vipAvailable: boolean;
  ticketTiers: TicketTier[];
  description: string;
  ageRestriction: string;
  supportAct?: string;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  notIncluded: string[];
}

export interface FootballMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  stadium: string;
  city: string;
  matchDate: string;
  matchTime: string;
  image: string;
  ticketZones: StadiumZone[];
  headToHead: { wins: number; draws: number; losses: number };
  recentForm: ('W' | 'D' | 'L')[];
}

export interface StadiumZone {
  id: string;
  name: string;
  price: number;
  description: string;
  availability: number;
  color: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  zone: string;
  price: number;
  status: 'available' | 'selected' | 'unavailable' | 'wheelchair' | 'couple';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'movie' | 'concert' | 'football' | 'payment' | 'general';
}

export type Category = 'movie' | 'concert' | 'football';
