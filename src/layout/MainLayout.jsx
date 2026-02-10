import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = () => {
    return (
        <div className="flex min-h-screen bg-[var(--dashboard-secondary)] font-sans transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 px-5 py-3">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
