import React, { useState, useMemo } from 'react';
import type { Booking } from '../types';
import { BookingStatus } from '../types';
import BookingCard from './BookingCard';
import { TicketIcon } from './icons';

// Mock data
const now = new Date();
const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    zoneName: 'Vanguard Arena',
    seatNumbers: ['A5', 'A6'],
    startTime: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
    endTime: new Date(now.getTime() + 4 * 60 * 60 * 1000),   // 4 hours from now
    status: BookingStatus.Confirmed,
    qrCodeValue: 'tracklyn-booking-1',
  },
  {
    id: 'booking-2',
    zoneName: 'Console Corner',
    seatNumbers: ['C1'],
    startTime: new Date(now.getTime() + 24 * 60 * 60 * 1000), // tomorrow
    endTime: new Date(now.getTime() + 26 * 60 * 60 * 1000),
    status: BookingStatus.Confirmed,
    qrCodeValue: 'tracklyn-booking-2',
  },
  {
    id: 'booking-3',
    zoneName: 'LAN Party Pit',
    seatNumbers: ['L10', 'L11', 'L12', 'L13'],
    startTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    endTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    status: BookingStatus.Completed,
    qrCodeValue: 'tracklyn-booking-3',
  },
   {
    id: 'booking-4',
    zoneName: 'Vanguard Arena',
    seatNumbers: ['A12'],
    startTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    endTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
    status: BookingStatus.Cancelled,
    qrCodeValue: 'tracklyn-booking-4',
  },
];


type BookingTab = 'Upcoming' | 'Past' | 'Cancelled';

const BookingsScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<BookingTab>('Upcoming');

    const filteredBookings = useMemo(() => {
        const now = new Date();
        switch(activeTab) {
            case 'Upcoming':
                return mockBookings.filter(b => b.status === BookingStatus.Confirmed && b.startTime > now)
                                   .sort((a,b) => a.startTime.getTime() - b.startTime.getTime());
            case 'Past':
                 return mockBookings.filter(b => b.status === BookingStatus.Completed || b.startTime <= now && b.status !== BookingStatus.Cancelled)
                                   .sort((a,b) => b.startTime.getTime() - a.startTime.getTime());
            case 'Cancelled':
                return mockBookings.filter(b => b.status === BookingStatus.Cancelled)
                                   .sort((a,b) => b.startTime.getTime() - a.startTime.getTime());
            default:
                return [];
        }
    }, [activeTab]);

  return (
    <div className="animate-fadeIn">
      <h1 className="text-4xl font-bold font-orbitron text-slate-100 mb-2">My Bookings</h1>
      <p className="text-slate-400 mb-8">View your upcoming and past gaming sessions.</p>
      
      <div className="mb-6 border-b border-slate-700">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {(['Upcoming', 'Past', 'Cancelled'] as BookingTab[]).map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                activeTab === tab
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
                {tab}
            </button>
            ))}
        </nav>
      </div>

      <div className="space-y-6">
        {filteredBookings.length > 0 ? (
            filteredBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
            ))
        ) : (
            <div className="flex flex-col items-center justify-center text-center bg-slate-800/50 border border-slate-700 rounded-xl p-10 mt-8 h-96">
                <TicketIcon className="w-20 h-20 text-slate-500 mb-4" />
                <h2 className="text-2xl font-bold text-slate-300">No {activeTab} Bookings</h2>
                <p className="text-slate-400 mt-2">
                    {activeTab === 'Upcoming' && 'Time to get in the game! Your future sessions will appear here.'}
                    {activeTab === 'Past' && 'Your completed gaming sessions will be recorded here.'}
                    {activeTab === 'Cancelled' && 'Any cancelled bookings will be listed in this section.'}
                </p>
                {activeTab === 'Upcoming' && (
                    <button className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20">
                        Book a Seat
                    </button>
                )}
            </div>
        )}
      </div>

    </div>
  );
};

export default BookingsScreen;
