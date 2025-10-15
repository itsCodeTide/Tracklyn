import React from 'react';
import { Booking, BookingStatus } from '../types';
import { MapPinIcon, PencilSquareIcon, XCircleIcon, ArrowDownTrayIcon } from './icons';

interface BookingCardProps {
    booking: Booking;
}

const statusStyles: { [key in BookingStatus]: { badge: string; text: string; } } = {
    [BookingStatus.Confirmed]: { badge: 'bg-green-500/20 border-green-500 text-green-300', text: 'Confirmed' },
    [BookingStatus.Completed]: { badge: 'bg-slate-600/30 border-slate-500 text-slate-300', text: 'Completed' },
    [BookingStatus.Cancelled]: { badge: 'bg-red-500/20 border-red-500 text-red-300', text: 'Cancelled' },
    [BookingStatus.Pending]: { badge: 'bg-yellow-500/20 border-yellow-500 text-yellow-300', text: 'Pending' },
};

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

// A simple component to render a QR-like code visually
const QrCodePlaceholder: React.FC = () => (
    <div className="w-24 h-24 bg-white p-1 rounded-md">
        <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-px">
            {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`w-full h-full ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-white'}`}></div>
            ))}
        </div>
    </div>
);


const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
    const { badge, text } = statusStyles[booking.status];
    
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className={`px-6 py-2 border-b border-slate-700 ${badge} flex justify-between items-center`}>
                <span className="font-bold text-sm">{text}</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold font-orbitron text-slate-100">{booking.zoneName}</h3>
                    <p className="text-slate-400 font-semibold">{formatDate(booking.startTime)}</p>
                    <p className="text-cyan-300 font-bold text-lg">{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</p>

                    <div className="mt-4 pt-4 border-t border-slate-700">
                        <p className="text-sm text-slate-400 mb-1">Seats:</p>
                        <div className="flex flex-wrap gap-2">
                            {booking.seatNumbers.map(seat => (
                                <span key={seat} className="bg-slate-700 text-cyan-300 font-mono text-sm px-3 py-1 rounded-md">{seat}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center md:justify-end">
                    <QrCodePlaceholder />
                </div>
            </div>
             {booking.status === BookingStatus.Confirmed && (
                <div className="bg-slate-900/50 px-6 py-3 border-t border-slate-700 flex flex-wrap gap-3 justify-start">
                    <button className="flex items-center space-x-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors"><MapPinIcon className="w-4 h-4" /><span>Directions</span></button>
                    <button className="flex items-center space-x-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors"><PencilSquareIcon className="w-4 h-4" /><span>Modify</span></button>
                    <button className="flex items-center space-x-2 text-sm text-slate-300 hover:text-red-400 transition-colors"><XCircleIcon className="w-4 h-4" /><span>Cancel</span></button>
                    <button className="flex items-center space-x-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors ml-auto"><ArrowDownTrayIcon className="w-4 h-4" /><span>Download Ticket</span></button>
                </div>
            )}
        </div>
    );
};

export default BookingCard;
