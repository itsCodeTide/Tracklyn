
import React from 'react';
import type { Seat } from '../types';
import { SeatStatus } from '../types';
import { GamingPcIcon, ConsoleIcon } from './icons';

interface SeatMapProps {
  seats: Seat[];
  onSeatClick: (seatId: string) => void;
}

const SeatComponent: React.FC<{ seat: Seat; onClick: (id: string) => void }> = ({ seat, onClick }) => {
  const statusClasses = {
    [SeatStatus.Available]: 'fill-slate-700/50 stroke-cyan-400 hover:fill-cyan-900/50 cursor-pointer',
    [SeatStatus.Occupied]: 'fill-red-600 stroke-red-400 cursor-not-allowed',
    [SeatStatus.Selected]: 'fill-cyan-400 stroke-cyan-200 cursor-pointer shadow-lg shadow-cyan-500/50',
    [SeatStatus.Reserved]: 'fill-slate-600 stroke-slate-500 cursor-not-allowed',
  };

  const isClickable = seat.status === SeatStatus.Available || seat.status === SeatStatus.Selected;

  return (
    <g 
      transform={`translate(${seat.position.x}, ${seat.position.y})`} 
      onClick={() => isClickable && onClick(seat.id)}
      className="transition-all duration-200"
    >
      <rect 
        width="40" 
        height="40" 
        rx="8"
        className={`stroke-2 ${statusClasses[seat.status]}`}
      />
      {seat.type === 'pc' 
        ? <GamingPcIcon className="w-5 h-5 text-slate-400 translate-x-[10px] translate-y-[2px]" /> 
        : <ConsoleIcon className="w-5 h-5 text-slate-400 translate-x-[10px] translate-y-[2px]" />
      }
      <text 
        x="20" 
        y="32" 
        textAnchor="middle" 
        className="text-xs font-mono font-bold fill-slate-300 select-none pointer-events-none"
      >
        {seat.seatNumber}
      </text>
    </g>
  );
};


const SeatMap: React.FC<SeatMapProps> = ({ seats, onSeatClick }) => {
  const viewBoxWidth = Math.max(...seats.map(s => s.position.x)) + 100;
  const viewBoxHeight = Math.max(...seats.map(s => s.position.y)) + 100;

  return (
    <svg width="100%" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} className="min-w-[600px]">
      {seats.map(seat => (
        <SeatComponent key={seat.id} seat={seat} onClick={onSeatClick} />
      ))}
    </svg>
  );
};

export default SeatMap;
