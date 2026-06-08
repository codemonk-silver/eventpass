export const COLORS = {
  midnight: '#080A12',
  gold: '#D6B46A',
  plum: '#5B2EFF',
  charcoal: '#111827',
  ivory: '#F8F4EA',
  ash: '#9CA3AF',
  emerald: '#22C55E',
  ruby: '#EF4444',
} as const;

export const GRADIENTS = {
  hero: 'linear-gradient(135deg, #080A12 0%, #111827 45%, #5B2EFF 100%)',
  goldButton: 'linear-gradient(135deg, #D6B46A 0%, #F5D98B 100%)',
  cardOverlay: 'linear-gradient(to top, rgba(8,10,18,0.95), rgba(8,10,18,0.2))',
} as const;

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Movies', path: '/movies' },
  { label: 'Concerts', path: '/concerts' },
  { label: 'Football', path: '/football' },
  { label: 'Events', path: '/events' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
] as const;
