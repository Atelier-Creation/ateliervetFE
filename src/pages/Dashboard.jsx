import React, { useState } from 'react';
import {
    Users,
    Calendar,
    DollarSign,
    Activity,
    IndianRupee,
    Plus,
    RotateCw,
    X,
    LayoutDashboard,
    Stethoscope,
    BriefcaseMedical,
    Wallet,
    Package,
    UserCog,
    AlertCircle,
    FileText,
    PawPrint
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Data for the Pie Chart
const data = [
    { name: 'Dog', value: 63, color: '#4f46e5' }, // Blue
    { name: 'Cat', value: 25, color: '#0ea5e9' }, // Light Blue
    { name: 'Rabbit', value: 13, color: '#10b981' }, // Green
];

const COLORS = ['#4f46e5', '#0ea5e9', '#10b981'];

const StatCard = ({ title, value, subtext, icon: Icon, colorTheme }) => {
    const themes = {
        primary: { bg: 'bg-[var(--dashboard-primary)]/10', text: 'text-[var(--dashboard-primary)]', sub: 'text-[var(--dashboard-primary)]/80' },
        rose: { bg: 'bg-rose-50', text: 'text-rose-600', sub: 'text-rose-500' },
        emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', sub: 'text-emerald-500' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', sub: 'text-blue-500' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600', sub: 'text-purple-500' },
    };

    const theme = themes[colorTheme] || themes.primary;

    return (
        <div className={`p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all ${theme.bg}`}>
            <div className="flex items-center gap-3 mb-4">
                <Icon className={`w-5 h-5 ${theme.text}`} />
                <h3 className={`font-semibold ${theme.text}`}>{title}</h3>
            </div>
            <div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
                <p className="text-sm text-gray-500">{subtext}</p>
            </div>
        </div>
    );
};

const FinanceCard = ({ title, value, colorClass }) => (
    <div className={`p-4 rounded-xl ${colorClass} bg-opacity-10 border border-opacity-20`}>
        <p className={`text-sm font-medium mb-1 opacity-80 ${colorClass.replace('bg-', 'text-')}`}>{title}</p>
        <p className={`text-2xl font-bold ${colorClass.replace('bg-', 'text-')}`}>{value}</p>
    </div>
);

const TabButton = ({ active, icon: Icon, label, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all relative cursor-pointer
      ${active
                ? 'bg-[var(--dashboard-secondary)] text-[var(--dashboard-primary)] rounded-xl shadow-sm z-10'
                : 'text-white/70 hover:text-white hover:bg-white/10 hover:rounded-xl'
            }`}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
);

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-[var(--dashboard-text)]">Dashboard</h1>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-white bg-[var(--dashboard-primary)] border border-[var(--dashboard-primary)] rounded-lg hover:opacity-90 transition-colors shadow-lg shadow-[var(--dashboard-primary)]/20">
                        <Plus className="w-4 h-4" />
                        <span className="font-medium">New Appointment</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-[var(--dashboard-text-light)] bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <PawPrint className="w-4 h-4" />
                        <span className="font-medium">New Patient</span>
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <select className="px-4 py-2 border border-slate-200 rounded-lg text-[var(--dashboard-text)] bg-white outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20">
                        <option>Today</option>
                        <option>Yesterday</option>
                        <option>Last 7 Days</option>
                    </select>
                    <select className="px-4 py-2 border border-slate-200 rounded-lg text-[var(--dashboard-text)] bg-white outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20">
                        <option>All Branches</option>
                        <option>Main Clinic</option>
                    </select>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <span className="text-sm text-[var(--dashboard-text-light)] hidden md:inline">Data showing Today for all branches</span>
                    <button className="flex items-center gap-2 px-3 py-2 text-[var(--dashboard-text-light)] hover:text-[var(--dashboard-text)] transition-colors">
                        <X className="w-4 h-4" />
                        <span className="text-sm">Clear Filters</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--dashboard-primary)] text-white rounded-lg hover:opacity-90 transition-colors shadow-sm shadow-[var(--dashboard-primary)]/20">
                        <RotateCw className="w-4 h-4" />
                        <span className="text-sm font-medium">Refresh</span>
                    </button>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-[var(--dashboard-primary)] p-1 rounded-xl flex items-center justify-between gap-1 overflow-x-auto shadow-md shadow-[var(--dashboard-primary)]/10">
                <TabButton active={activeTab === 'Overview'} icon={LayoutDashboard} label="Overview" onClick={() => setActiveTab('Overview')} />
                <TabButton active={activeTab === 'Appointments'} icon={Calendar} label="Appointments" onClick={() => setActiveTab('Appointments')} />
                <TabButton active={activeTab === 'Finance'} icon={Wallet} label="Finance" onClick={() => setActiveTab('Finance')} />
                <TabButton active={activeTab === 'Inventory'} icon={Package} label="Inventory" onClick={() => setActiveTab('Inventory')} />
                <TabButton active={activeTab === 'Staff'} icon={UserCog} label="Staff" onClick={() => setActiveTab('Staff')} />
            </div>

            {/* Main Content Area */}
            {activeTab === 'Overview' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Today's Appointments"
                            value="0"
                            subtext="0 confirmed, 0 pending"
                            icon={Calendar}
                            colorTheme="primary"
                        />
                        <StatCard
                            title="Active Patients"
                            value="8"
                            subtext="0 new this period"
                            icon={Users}
                            colorTheme="emerald"
                        />
                        <StatCard
                            title="Period Revenue"
                            value="₹0.00"
                            subtext="today"
                            icon={IndianRupee}
                            colorTheme="blue"
                        />
                        <StatCard
                            title="Active Staff"
                            value="2"
                            subtext="of 2 total staff"
                            icon={UserCog}
                            colorTheme="primary"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Today's Appointments List */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[400px]">
                            <div className="mb-6">
                                <h3 className="font-bold text-slate-800 text-lg">Today's Appointments</h3>
                                <p className="text-slate-500 text-sm">0 scheduled for today</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                                <Calendar className="w-16 h-16 mb-4 text-slate-200" />
                                <p>No appointments scheduled for today</p>
                            </div>
                        </div>

                        {/* Patient Distribution Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px]">
                            <div className="mb-2">
                                <h3 className="font-bold text-slate-800 text-lg">Patient Distribution</h3>
                                <p className="text-slate-500 text-sm">By species</p>
                            </div>
                            <div className="h-[300px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend
                                            verticalAlign="middle"
                                            align="right"
                                            layout="vertical"
                                            iconType="circle"
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Center Text */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                                    {/* Could put total here */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Financial Summary */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="mb-6">
                                <h3 className="font-bold text-slate-800 text-lg">Financial Summary</h3>
                                <p className="text-slate-500 text-sm">For the selected period</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                    <p className="text-blue-600 font-medium text-sm">Total Billed</p>
                                    <p className="text-blue-700 text-2xl font-bold mt-1">₹ 0.00</p>
                                </div>
                                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                    <p className="text-emerald-600 font-medium text-sm">Total Paid</p>
                                    <p className="text-emerald-700 text-2xl font-bold mt-1">₹ 0.00</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                                    <p className="text-yellow-600 font-medium text-sm">Outstanding</p>
                                    <p className="text-yellow-700 text-2xl font-bold mt-1">₹ 0.00</p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                    <p className="text-purple-600 font-medium text-sm">Payment Rate</p>
                                    <p className="text-purple-700 text-2xl font-bold mt-1">0%</p>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center gap-6 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                    <span className="text-slate-600">Paid</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                    <span className="text-slate-600">Outstanding</span>
                                </div>
                            </div>
                        </div>

                        {/* Alerts */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="mb-6">
                                <h3 className="font-bold text-slate-800 text-lg">Alerts</h3>
                                <p className="text-slate-500 text-sm">Items needing attention</p>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-center gap-3 text-yellow-700">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="font-medium">0 pending appointments</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== 'Overview' && (
                <div className="h-96 flex items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400">
                    <div className="text-center">
                        <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p>Content for {activeTab} tab</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
