import { create } from 'zustand';
import type { Seat } from '../types';

interface BookingState {
  selectedEventId: string | null;
  selectedEventType: 'movie' | 'concert' | 'football' | null;
  selectedEventTitle: string | null;
  selectedEventImage: string | null;
  selectedEventDate: string | null;
  selectedEventTime: string | null;
  selectedEventVenue: string | null;
  selectedEventLocation: string | null;
  selectedTicketName: string | null;
  selectedTicketPrice: number;
  quantity: number;
  selectedSeats: Seat[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  paymentMethod: 'card' | 'paypal' | 'apple-pay' | null;
  bookingReference: string | null;
  serviceFee: number;

  setEvent: (event: {
    id: string;
    type: 'movie' | 'concert' | 'football';
    title: string;
    image: string;
    date: string;
    time: string;
    venue: string;
    location: string;
  }) => void;
  setTicket: (name: string, price: number) => void;
  setQuantity: (qty: number) => void;
  toggleSeat: (seat: Seat) => void;
  removeSeat: (seatId: string) => void;
  setContactDetails: (name: string, email: string, phone: string) => void;
  setPaymentMethod: (method: 'card' | 'paypal' | 'apple-pay') => void;
  completeBooking: () => string;
  reset: () => void;
  subtotal: () => number;
  total: () => number;
}

const initialState = {
  selectedEventId: null,
  selectedEventType: null,
  selectedEventTitle: null,
  selectedEventImage: null,
  selectedEventDate: null,
  selectedEventTime: null,
  selectedEventVenue: null,
  selectedEventLocation: null,
  selectedTicketName: null,
  selectedTicketPrice: 0,
  quantity: 1,
  selectedSeats: [],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  paymentMethod: null,
  bookingReference: null,
  serviceFee: 3,
};

export const useBookingStore = create<BookingState>((set, get) => ({
  ...initialState,

  setEvent: (event) =>
    set({
      selectedEventId: event.id,
      selectedEventType: event.type,
      selectedEventTitle: event.title,
      selectedEventImage: event.image,
      selectedEventDate: event.date,
      selectedEventTime: event.time,
      selectedEventVenue: event.venue,
      selectedEventLocation: event.location,
      selectedSeats: [],
    }),

  setTicket: (name, price) =>
    set({ selectedTicketName: name, selectedTicketPrice: price }),

  setQuantity: (qty) => set({ quantity: Math.max(1, Math.min(10, qty)) }),

  toggleSeat: (seat) =>
    set((state) => {
      const exists = state.selectedSeats.find((s) => s.id === seat.id);
      if (exists) {
        return { selectedSeats: state.selectedSeats.filter((s) => s.id !== seat.id) };
      }
      if (state.selectedSeats.length >= 10) return state;
      return { selectedSeats: [...state.selectedSeats, seat] };
    }),

  removeSeat: (seatId) =>
    set((state) => ({
      selectedSeats: state.selectedSeats.filter((s) => s.id !== seatId),
    })),

  setContactDetails: (name, email, phone) =>
    set({ contactName: name, contactEmail: email, contactPhone: phone }),

  setPaymentMethod: (method) => set({ paymentMethod: method }),

  completeBooking: () => {
    const ref = `EVT-${Math.floor(100000 + Math.random() * 900000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    set({ bookingReference: ref });
    return ref;
  },

  reset: () => set(initialState),

  subtotal: () => {
    const state = get();
    const seatTotal = state.selectedSeats.reduce((sum, s) => sum + s.price, 0);
    const ticketTotal = state.selectedTicketPrice * state.quantity;
    return seatTotal || ticketTotal;
  },

  total: () => {
    const state = get();
    return state.subtotal() + state.serviceFee * (state.selectedSeats.length || state.quantity);
  },
}));
