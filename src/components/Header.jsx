import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-8 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-slate-100 rounded-lg lg:hidden">
                    <Menu className="w-6 h-6 text-slate-600" />
                </button>
                <div className="relative hidden md:block">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-light)]" />
                    <input
                        type="text"
                        placeholder="Search patients, appointments..."
                        className="pl-10 pr-4 py-2 w-64 bg-[var(--dashboard-secondary)] border-none rounded-full text-[var(--dashboard-text)] focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 focus:bg-white transition-all outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell className="w-6 h-6 text-slate-600" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-[var(--dashboard-text)]">Dr. Sarah Wilson</p>
                        <p className="text-xs text-[var(--dashboard-text-light)]">Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--dashboard-primary)] to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg shadow-[var(--dashboard-primary)]/20">
                        SW
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
