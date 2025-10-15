import React from 'react';
import { HomeIcon, TicketIcon, CalendarIcon, UserIcon } from './icons';

type ScreenName = 'home' | 'bookings' | 'events' | 'profile';

interface BottomNavProps {
    activeScreen: ScreenName;
    onNavigate: (screen: ScreenName) => void;
}

const NavItem: React.FC<{
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => {
    const activeClasses = 'text-cyan-400';
    const inactiveClasses = 'text-slate-400 hover:text-slate-200';

    return (
        <button onClick={onClick} className="flex flex-col items-center justify-center w-full transition-colors duration-200">
            <Icon className={`w-6 h-6 mb-1 ${isActive ? activeClasses : inactiveClasses}`} />
            <span className={`text-xs font-medium ${isActive ? activeClasses : inactiveClasses}`}>
                {label}
            </span>
        </button>
    );
};


const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
    const navItems: { screen: ScreenName; label: string; icon: React.ElementType; }[] = [
        { screen: 'home', label: 'Home', icon: HomeIcon },
        { screen: 'bookings', label: 'Bookings', icon: TicketIcon },
        { screen: 'events', label: 'Events', icon: CalendarIcon },
        { screen: 'profile', label: 'Profile', icon: UserIcon },
    ];
    
    return (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-slate-900/80 backdrop-blur-lg border-t border-slate-700 md:hidden">
            <div className="flex justify-around items-center h-full max-w-md mx-auto">
                {navItems.map(item => (
                    <NavItem
                        key={item.screen}
                        icon={item.icon}
                        label={item.label}
                        isActive={activeScreen === item.screen}
                        onClick={() => onNavigate(item.screen)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
