import React, { useState } from 'react';
import ZoneCard from './ZoneCard';
import BookingScreen from './BookingScreen';
import type { Zone, Seat } from '../types';
import { SeatStatus } from '../types';

const generateSeats = (rows: number, cols: number, type: 'pc' | 'console', prefix: string): Seat[] => {
  const seats: Seat[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seatNumber = `${prefix}${r + 1}-${c + 1}`;
      const occupied = Math.random() > 0.7; // 30% chance of being occupied
      seats.push({
        id: `seat-${prefix}-${r}-${c}`,
        seatNumber,
        status: occupied ? SeatStatus.Occupied : SeatStatus.Available,
        position: { x: c * 60 + 20, y: r * 60 + 20 },
        type,
      });
    }
  }
  return seats;
};


const mockZones: Zone[] = [
  {
    id: 'zone-1',
    name: 'Vanguard Arena',
    description: 'High-end PCs for competitive gaming.',
    seats: generateSeats(5, 10, 'pc', 'A'),
    get totalSeats() { return this.seats.length; },
    get occupiedSeats() { return this.seats.filter(s => s.status === SeatStatus.Occupied).length; },
  },
  {
    id: 'zone-2',
    name: 'Console Corner',
    description: 'Latest consoles for casual and party games.',
    seats: generateSeats(3, 5, 'console', 'C'),
    get totalSeats() { return this.seats.length; },
    get occupiedSeats() { return this.seats.filter(s => s.status === SeatStatus.Occupied).length; },
  },
  {
    id: 'zone-3',
    name: 'LAN Party Pit',
    description: 'Bring your own setup or rent one of ours.',
    seats: generateSeats(4, 8, 'pc', 'L'),
    get totalSeats() { return this.seats.length; },
    get occupiedSeats() { return this.seats.filter(s => s.status === SeatStatus.Occupied).length; },
  },
];


const HomeDashboard: React.FC = () => {
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

    if (selectedZone) {
        return <BookingScreen zone={selectedZone} onBack={() => setSelectedZone(null)} />;
    }

    return (
        <div className="animate-fadeIn">
            <h1 className="text-4xl font-bold font-orbitron text-slate-100 mb-2">Welcome, Gamer!</h1>
            <p className="text-slate-400 mb-8">Choose your battleground. Select a zone to book your seat.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockZones.map(zone => (
                    <ZoneCard key={zone.id} zone={zone} onBook={() => setSelectedZone(zone)} />
                ))}
            </div>
        </div>
    );
};

export default HomeDashboard;
