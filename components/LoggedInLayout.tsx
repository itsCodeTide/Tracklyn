import React, { useState } from 'react';
import HomeDashboard from './HomeDashboard';
import BookingsScreen from './BookingsScreen';
import EventsScreen from './EventsScreen';
import ProfileScreen from './ProfileScreen';
import BottomNav from './BottomNav';
import { useAuth } from '../context/AuthContext';
import { HomeIcon, TicketIcon, CalendarIcon, UserIcon, ArrowLeftOnRectangleIcon } from './icons';

type ScreenName = 'home' | 'bookings' | 'events' | 'profile';

const NavItem: React.FC<{
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => {
    const baseClasses = "flex items-center space-x-3 rounded-lg px-3 py-2 text-slate-200 transition-all duration-300";
    const activeClasses = "bg-slate-700 text-cyan-400";
    const inactiveClasses = "hover:bg-slate-700/50 hover:text-white";

    return (
        <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                <Icon className="h-6 w-6" />
                <span className="font-semibold">{label}</span>
            </a>
        </li>
    );
};

const LoggedInLayout: React.FC = () => {
    const [activeScreen, setActiveScreen] = useState<ScreenName>('home');
    const { user, logout } = useAuth();
    
    const renderScreen = () => {
        switch (activeScreen) {
            case 'home':
                return <HomeDashboard />;
            case 'bookings':
                return <BookingsScreen />;
            case 'events':
                return <EventsScreen />;
            case 'profile':
                return <ProfileScreen />;
            default:
                return <HomeDashboard />;
        }
    };

    const navItems: { screen: ScreenName; label: string; icon: React.ElementType; }[] = [
        { screen: 'home', label: 'Home', icon: HomeIcon },
        { screen: 'bookings', label: 'My Bookings', icon: TicketIcon },
        { screen: 'events', label: 'Events', icon: CalendarIcon },
        { screen: 'profile', label: 'Profile', icon: UserIcon },
    ];

    if (!user) return null;

    return (
        <div className="md:flex">
            {/* Sidebar for md and up */}
            <aside className="hidden md:flex md:flex-shrink-0">
                <div className="flex w-64 flex-col">
                    <div className="flex min-h-screen flex-grow flex-col overflow-y-auto border-r border-slate-700 bg-slate-800/50 p-4">
                        <div className="flex flex-shrink-0 items-center px-4 my-4">
                           <h1 className="text-2xl font-bold font-orbitron text-cyan-400 tracking-widest">
                               TRACKLYN
                           </h1>
                        </div>
                         <div className="flex flex-shrink-0 items-center space-x-3 border-y border-slate-700 px-4 py-4 mb-4">
                            <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                            <div className="truncate">
                                <div className="text-base font-semibold text-slate-100">{user.fullName}</div>
                                <div className="text-sm text-slate-400">{user.email}</div>
                            </div>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                      {navItems.map(item => (
                                          <NavItem
                                              key={item.screen}
                                              icon={item.icon}
                                              label={item.label}
                                              isActive={activeScreen === item.screen}
                                              onClick={() => setActiveScreen(item.screen)}
                                          />
                                      ))}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="flex items-center space-x-3 rounded-lg px-3 py-2 text-slate-400 transition-all duration-300 hover:bg-slate-700/50 hover:text-red-400">
                                        <ArrowLeftOnRectangleIcon className="h-6 w-6"/>
                                        <span className="font-semibold">Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </aside>
            
            {/* Main content */}
            <main className="flex-1 pb-20 md:pb-0">
                <div className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                       {renderScreen()}
                    </div>
                </div>
            </main>

            {/* Bottom Nav for mobile */}
            <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
        </div>
    );
};

export default LoggedInLayout;
