import React from 'react';
import type { Zone, Seat } from '../types';
import { CheckCircleIcon } from './icons';

interface BookingConfirmationProps {
    zone: Zone;
    selectedSeats: Seat[];
    onDone: () => void;
}

const QrCodePlaceholder: React.FC = () => (
    <div className="w-40 h-40 bg-white p-2 rounded-lg mx-auto">
        <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-px">
            {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`w-full h-full ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-white'}`}></div>
            ))}
        </div>
    </div>
);


const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ zone, selectedSeats, onDone }) => {
    return (
        <div className="animate-fadeIn max-w-lg mx-auto text-center">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
                <CheckCircleIcon className="w-20 h-20 text-green-400 mx-auto mb-4" />
                <h1 className="text-3xl font-bold font-orbitron text-slate-100 mb-2">Booking Confirmed!</h1>
                <p className="text-slate-400 mb-6">Your seat is reserved. Get ready for an epic session.</p>

                <div className="text-left bg-slate-900/50 rounded-lg p-6 mb-6 space-y-4 border border-slate-600">
                    <div>
                        <p className="text-sm text-cyan-400 font-semibold">ZONE</p>
                        <p className="text-lg font-bold text-slate-100">{zone.name}</p>
                    </div>
                     <div>
                        <p className="text-sm text-cyan-400 font-semibold">SEATS</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {selectedSeats.map(seat => (
                                <span key={seat.id} className="bg-slate-700 text-cyan-300 font-mono text-sm px-3 py-1 rounded-md">{seat.seatNumber}</span>
                            ))}
                        </div>
                    </div>
                     <div>
                        <p className="text-sm text-cyan-400 font-semibold">TIME</p>
                        <p className="text-lg font-bold text-slate-100">Today, 7:00 PM - 10:00 PM</p>
                    </div>
                </div>

                <QrCodePlaceholder />
                <p className="text-xs text-slate-500 mt-2">Scan this at the entrance</p>
                
                <button
                    onClick={onDone}
                    className="mt-8 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default BookingConfirmation;
