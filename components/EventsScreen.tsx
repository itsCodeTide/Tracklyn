import React from 'react';
import { CalendarIcon } from './icons';

const EventsScreen: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-4xl font-bold font-orbitron text-slate-100 mb-2">Events</h1>
      <p className="text-slate-400 mb-8">Check out upcoming tournaments and community nights.</p>

      <div className="flex flex-col items-center justify-center text-center bg-slate-800/50 border border-slate-700 rounded-xl p-10 mt-8 h-96">
        <CalendarIcon className="w-20 h-20 text-slate-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-300">No Upcoming Events</h2>
        <p className="text-slate-400 mt-2">Stay tuned for exciting events. We're always planning something new!</p>
      </div>
    </div>
  );
};

export default EventsScreen;
