import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, Sun, Moon, Settings, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const notifRef = useRef(null);
    const userRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
            if (userRef.current && !userRef.current.contains(event.target)) {
                setIsUserOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const notifications = [
        { id: 1, title: 'New appointment created: Fusionedge Test Hospital', time: 'Nov 19, 2025 19:18' },
        { id: 2, title: 'New appointment created: Fusionedge Test Hospital', time: 'Nov 18, 2025 23:40' },
        { id: 3, title: 'New appointment created: Fusionedge Test Hospital', time: 'Oct 28, 2025 17:25' },
        { id: 4, title: 'New appointment created: Fusionedge Test Hospital', time: 'Oct 6, 2025 23:07' },
        { id: 5, title: 'New appointment created: Fusionedge Test Hospital', time: 'Sep 29, 2025 05:38' },
    ];

    return (
        <header className="bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-color)] sticky top-0 z-40 px-8 py-4 flex items-center justify-between shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg lg:hidden text-[var(--dashboard-text)]">
                    <Menu className="w-6 h-6" />
                </button>
                <div className="relative hidden md:block">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-light)]" />
                    <input
                        type="text"
                        placeholder="Search patients, appointments..."
                        className="pl-10 pr-4 py-2 w-64 bg-[var(--dashboard-secondary)] border-none rounded-full text-[var(--dashboard-text)] focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 focus:bg-[var(--card-bg)] transition-all outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors text-[var(--dashboard-text-light)]"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Notification Dropdown */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                    >
                        <Bell className="w-6 h-6 text-[var(--dashboard-text-light)]" />
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                    </button>

                    {isNotifOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                            <div className="p-4 border-b border-[var(--border-color)] flex items-center gap-2">
                                <Bell className="w-4 h-4 text-[var(--dashboard-text)]" />
                                <h3 className="font-semibold text-[var(--dashboard-text)]">Notifications</h3>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                {notifications.map((notif) => (
                                    <div key={notif.id} className="p-4 border-b border-[var(--border-color)] hover:bg-[var(--dashboard-secondary)] transition-colors cursor-pointer">
                                        <p className="text-sm font-medium text-[var(--dashboard-text)] mb-1">{notif.title}</p>
                                        <p className="text-xs text-[var(--dashboard-text-light)]">{notif.time}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 bg-[var(--dashboard-secondary)] border-t border-[var(--border-color)] flex justify-between">
                                <button className="text-sm font-medium text-[var(--dashboard-primary)] hover:underline">View All</button>
                                <button className="text-sm font-medium text-[var(--dashboard-primary)] hover:underline">Mark All as Read</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Dropdown */}
                <div className="relative pl-6 border-l border-[var(--border-color)]" ref={userRef}>
                    <button
                        onClick={() => setIsUserOpen(!isUserOpen)}
                        className="flex items-center gap-3 group focus:outline-none"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-[var(--dashboard-text)]">Dr.Saranesh</p>
                            <p className="text-xs text-[var(--dashboard-text-light)]">Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--dashboard-primary)] to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg shadow-[var(--dashboard-primary)]/20 ring-2 ring-transparent group-hover:ring-[var(--dashboard-primary)]/20 transition-all">
                            DS
                        </div>
                    </button>

                    {isUserOpen && (
                        <div className="absolute right-0 mt-4 w-60 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                            <div className="p-4 border-b border-[var(--border-color)]">
                                <p className="font-semibold text-[var(--dashboard-text)]">Dr.Saranesh</p>
                                <p className="text-xs text-[var(--dashboard-text-light)]">admin@ateliervet.com</p>
                            </div>
                            <div className="p-2">
                                <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--dashboard-text)] hover:bg-[var(--dashboard-secondary)] rounded-lg transition-colors">
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </button>
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--dashboard-text)] hover:bg-[var(--dashboard-secondary)] rounded-lg transition-colors">
                                    <User className="w-4 h-4" />
                                    Profile
                                </button>
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--dashboard-text)] hover:bg-[var(--dashboard-secondary)] rounded-lg transition-colors">
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </button>
                                <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors mt-2">
                                    <LogOut className="w-4 h-4" />
                                    Log out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
