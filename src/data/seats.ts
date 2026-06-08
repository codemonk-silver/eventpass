import type { Seat } from '../types';

function generateSeatMap(rows: string[], seatsPerRow: number, basePrice: number): Seat[] {
  const seats: Seat[] = [];
  rows.forEach((row, rowIndex) => {
    const rowPrice = rowIndex < 3 ? basePrice - 3 : rowIndex < 7 ? basePrice : basePrice - 3;
    for (let i = 1; i <= seatsPerRow; i++) {
      const seatId = `${row}${i}`;
      // Make some seats unavailable (~30%)
      const rand = Math.random();
      let status: Seat['status'] = 'available';
      if (rand < 0.3) status = 'unavailable';
      // Wheelchair seats
      if (row === 'D' && (i === 1 || i === 2 || i === seatsPerRow - 1 || i === seatsPerRow)) {
        status = 'wheelchair';
      }
      seats.push({
        id: seatId,
        row,
        number: i,
        zone: rowIndex < 3 ? 'Front' : rowIndex < 7 ? 'Middle' : 'Back',
        price: rowPrice,
        status,
      });
    }
  });
  return seats;
}

// Use a seed-like approach for consistent seat maps
const seatMapCache: Record<string, Seat[]> = {};

export function getSeatMap(venueId: string, price: number = 18): Seat[] {
  const cacheKey = `${venueId}-${price}`;
  if (seatMapCache[cacheKey]) return seatMapCache[cacheKey];
  
  // Seeded random for consistency
  const originalRandom = Math.random;
  let seed = venueId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  Math.random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seats = generateSeatMap(rows, 12, price);
  
  Math.random = originalRandom;
  seatMapCache[cacheKey] = seats;
  return seats;
}

export function getFootballZones(_matchId: string) {
  // Zones are already in the football match data
  return null;
}
