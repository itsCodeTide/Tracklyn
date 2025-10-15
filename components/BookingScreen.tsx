import React, { useState } from 'react';
import type { Zone, Seat } from '../types';
import { SeatStatus } from '../types';
import SeatMap from './SeatMap';
import { ArrowLeftIcon } from './icons';
import BookingConfirmation from './BookingConfirmation';

interface BookingScreenProps {
  zone: Zone;
  onBack: () => void;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ zone, onBack }) => {
  const [seats, setSeats] = useState<Seat[]>(zone.seats);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const selectedSeats = seats.filter(s => s.status === SeatStatus.Selected);

  const handleSeatClick = (seatId: string) => {
    setSeats(prevSeats =>
      prevSeats.map(seat => {
        if (seat.id === seatId) {
          if (seat.status === SeatStatus.Available) {
            return { ...seat, status: SeatStatus.Selected };
          }
          if (seat.status === SeatStatus.Selected) {
            return { ...seat, status: SeatStatus.Available };
          }
        }
        return seat;
      })
    );
  };
  
  const handleConfirmBooking = () => {
    // In a real app, you would send this to a backend.
    // For now, we'll just move to the confirmation screen.
    setIsConfirmed(true);
  }

  if (isConfirmed) {
    return <BookingConfirmation zone={zone} selectedSeats={selectedSeats} onDone={onBack} />
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-slate-700/50 transition-colors">
            <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <div>
            <h1 className="text-3xl font-bold font-orbitron text-slate-100">{zone.name}</h1>
            <p className="text-slate-400">Select your seats</p>
        </div>
      </div>
      
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-6 overflow-x-auto">
        <SeatMap seats={seats} onSeatClick={handleSeatClick} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-lg border-t border-slate-700 md:relative md:bg-transparent md:border-none md:backdrop-blur-none md:mt-8">
        <div className="container mx-auto px-4 py-4 md:p-0 flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm">Selected Seats ({selectedSeats.length})</p>
            <p className="font-bold text-lg text-white">
              {selectedSeats.length > 0 ? selectedSeats.map(s => s.seatNumber).join(', ') : 'None'}
            </p>
          </div>
          <button
            onClick={handleConfirmBooking}
            disabled={selectedSeats.length === 0}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingScreen;
