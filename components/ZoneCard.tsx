
import React from 'react';
import type { Zone } from '../types';

interface ZoneCardProps {
  zone: Zone;
  onBook: () => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({ zone, onBook }) => {
  const occupancy = (zone.occupiedSeats / zone.totalSeats) * 100;
  
  let status: { text: string; color: string; glow: string; };
  if (occupancy < 30) {
    status = { text: 'Available', color: 'bg-green-500', glow: 'shadow-green-500/50' };
  } else if (occupancy < 70) {
    status = { text: 'Filling Up', color: 'bg-yellow-500', glow: 'shadow-yellow-500/50' };
  } else if (occupancy < 90) {
    status = { text: 'Almost Full', color: 'bg-orange-500', glow: 'shadow-orange-500/50' };
  } else {
    status = { text: 'Full', color: 'bg-red-500', glow: 'shadow-red-500/50' };
  }

  const progressColor = 
    occupancy < 30 ? 'bg-green-500' :
    occupancy < 70 ? 'bg-yellow-500' :
    occupancy < 90 ? 'bg-orange-500' : 'bg-red-500';

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold font-orbitron text-slate-100 group-hover:text-cyan-400 transition-colors">{zone.name}</h3>
          <p className="text-sm text-slate-400">{zone.description}</p>
        </div>
        <div className={`flex items-center space-x-2 text-sm font-semibold px-3 py-1 rounded-full ${status.color} text-slate-900 shadow-lg ${status.glow}`}>
          <span className={`relative flex h-3 w-3`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status.color} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${status.color} border-2 border-slate-900`}></span>
          </span>
          <span>{status.text}</span>
        </div>
      </div>

      <div className="my-4">
        <div className="flex justify-between items-center text-slate-300 mb-1">
          <span className="text-sm font-medium">Occupancy</span>
          <span className="text-sm font-bold">{zone.occupiedSeats} / {zone.totalSeats} seats</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div 
            className={`${progressColor} h-2.5 rounded-full transition-all duration-500 ease-out`} 
            style={{ width: `${occupancy}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button 
          onClick={onBook} 
          disabled={occupancy >= 100}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
        >
          {occupancy >= 100 ? 'Waitlist' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default ZoneCard;
