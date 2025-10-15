import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ToggleSwitch from './ToggleSwitch';
import { BellIcon, TagIcon, TrophyIcon } from './icons';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [bookingReminders, setBookingReminders] = useState(true);
  const [specialOffers, setSpecialOffers] = useState(true);
  const [tournamentUpdates, setTournamentUpdates] = useState(false);

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="animate-fadeIn max-w-2xl mx-auto">
      <div className="text-center mb-8">
          <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-cyan-500 shadow-lg"/>
          <h1 className="text-3xl font-bold font-orbitron text-slate-100">{user.fullName}</h1>
          <p className="text-slate-400">{user.email}</p>
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-yellow-400/50 rounded-xl p-6 shadow-lg shadow-yellow-500/10 mb-6">
          <div className="flex justify-between items-center">
              <div>
                  <p className="text-sm text-yellow-300 font-semibold">MEMBERSHIP TIER</p>
                  <h3 className="text-2xl font-bold font-orbitron text-white">Premium Gamer</h3>
              </div>
              <button className="text-sm font-semibold bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg hover:bg-yellow-300 transition">
                  Upgrade
              </button>
          </div>
      </div>
      
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold font-orbitron text-cyan-400 border-b border-slate-700 pb-3 mb-4">
            Notification Preferences
        </h2>
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <BellIcon className="w-6 h-6 text-cyan-400" />
                    <span className="text-slate-300">Booking Reminders</span>
                </div>
                <ToggleSwitch checked={bookingReminders} onChange={setBookingReminders} />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <TagIcon className="w-6 h-6 text-cyan-400" />
                    <span className="text-slate-300">Special Offers</span>
                </div>
                <ToggleSwitch checked={specialOffers} onChange={setSpecialOffers} />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <TrophyIcon className="w-6 h-6 text-cyan-400" />
                    <span className="text-slate-300">Tournament Updates</span>
                </div>
                <ToggleSwitch checked={tournamentUpdates} onChange={setTournamentUpdates} />
            </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={logout} 
          className="bg-red-600/50 border border-red-500 hover:bg-red-600/80 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default ProfileScreen;