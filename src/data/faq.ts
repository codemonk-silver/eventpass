import type { FAQItem } from '../types';

export const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'How do I book movie tickets on EventPass?',
    answer: 'Simply browse to the Movies section, select your preferred movie, choose a cinema and showtime, select your seats, and complete the checkout process. Your tickets will be ready for instant download.',
    category: 'movie',
  },
  {
    id: '2',
    question: 'Can I cancel or reschedule my movie ticket?',
    answer: 'Movie tickets can be cancelled up to 2 hours before the showtime for a full refund. Rescheduling is allowed within 24 hours of the original booking, subject to seat availability.',
    category: 'movie',
  },
  {
    id: '3',
    question: 'Are there any booking fees for movie tickets?',
    answer: 'A small service fee of $2 per ticket is applied to cover processing costs. This is clearly shown during checkout before you complete your payment.',
    category: 'movie',
  },
  {
    id: '4',
    question: 'Do you offer group discounts for movie bookings?',
    answer: 'Yes! Groups of 10 or more receive a 15% discount on the total ticket price. Contact our support team for bulk booking assistance.',
    category: 'movie',
  },
  {
    id: '5',
    question: 'What is included in a VIP concert package?',
    answer: 'VIP packages typically include premium seating or standing area access, exclusive merchandise, priority entrance, and sometimes meet & greet opportunities. Specific inclusions vary by event and are listed on the event detail page.',
    category: 'concert',
  },
  {
    id: '6',
    question: 'Can I get a refund if a concert is cancelled?',
    answer: 'If an event is cancelled by the organizer, you will receive a full refund automatically within 5-7 business days. If the event is postponed, your tickets remain valid for the new date.',
    category: 'concert',
  },
  {
    id: '7',
    question: 'Is there an age limit for concerts?',
    answer: 'Age restrictions vary by event and venue. This information is clearly listed on each concert\'s detail page. Under-16s typically need to be accompanied by an adult.',
    category: 'concert',
  },
  {
    id: '8',
    question: 'How are football stadium seats categorized?',
    answer: 'Stadium seats are typically divided into Standard (behind the goals), Premium (main stand with best views), and VIP Box (private boxes with catering). Each category is color-coded on our seat map.',
    category: 'football',
  },
  {
    id: '9',
    question: 'Can I buy tickets for away fans?',
    answer: 'Away section tickets are available for most matches when applicable. Look for the "Away Supporters" option in the zone selection. You must sit in your designated section per stadium regulations.',
    category: 'football',
  },
  {
    id: '10',
    question: 'What happens if a match is postponed?',
    answer: 'If a match is postponed, your tickets are automatically valid for the rescheduled date. If you cannot attend the new date, you can request a refund within 14 days of the postponement announcement.',
    category: 'football',
  },
  {
    id: '11',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards, PayPal, Apple Pay, and Google Pay. All transactions are encrypted and secure.',
    category: 'payment',
  },
  {
    id: '12',
    question: 'How long do refunds take to process?',
    answer: 'Refunds are processed within 5-7 business days. The actual time for the funds to appear in your account depends on your payment provider and can take an additional 2-5 business days.',
    category: 'payment',
  },
  {
    id: '13',
    question: 'Is my payment information secure?',
    answer: 'Absolutely. We use industry-standard SSL encryption and never store your full card details on our servers. All payments are processed through PCI-compliant payment gateways.',
    category: 'payment',
  },
  {
    id: '14',
    question: 'How do I contact customer support?',
    answer: 'You can reach our support team through the Contact page, by email at hello@eventpass.com, or by phone at +1 (555) 123-4567. We\'re available Monday-Friday, 9 AM-6 PM.',
    category: 'general',
  },
  {
    id: '15',
    question: 'Can I create an account to manage my bookings?',
    answer: 'Yes! Creating an account allows you to view your booking history, download tickets, save favorite events, and receive personalized recommendations. Sign up is free and takes less than a minute.',
    category: 'general',
  },
  {
    id: '16',
    question: 'Do you offer gift cards or vouchers?',
    answer: 'Gift cards are available in denominations from $25 to $500. They can be purchased on our website and redeemed for any event. Gift cards do not expire.',
    category: 'general',
  },
];

export const faqCategories = [
  { id: 'all', label: 'All' },
  { id: 'movie', label: 'Movie Tickets' },
  { id: 'concert', label: 'Concert Tickets' },
  { id: 'football', label: 'Football Tickets' },
  { id: 'payment', label: 'Payment & Refunds' },
  { id: 'general', label: 'General' },
] as const;
