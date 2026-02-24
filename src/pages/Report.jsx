import { useState, useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
    ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import {
    FiDollarSign, FiShoppingBag, FiTruck, FiTrendingUp, FiDownload,
    FiHome, FiUsers, FiPackage, FiActivity, FiCalendar
} from 'react-icons/fi';
import { BsCurrencyRupee } from 'react-icons/bs';
import StatCard from '../components/ui/StatCard';
import { Skeleton } from '../components/ui/Skeleton';
import { utils, writeFile } from 'xlsx';
import { Select } from '@/components/ui/select';

const data = {
    monthlyStats: [
        {
            month: 'Jan',
            totalInvoices: 120,
            taxableAmount: 150000,
            cgst: 13500,
            sgst: 13500,
            igst: 0,
            totalGST: 27000,
            totalAmount: 177000,
            paidAmount: 165000,
            pendingAmount: 12000,
        },
        {
            month: 'Feb',
            totalInvoices: 95,
            taxableAmount: 130000,
            cgst: 11700,
            sgst: 11700,
            igst: 0,
            totalGST: 23400,
            totalAmount: 153400,
            paidAmount: 145000,
            pendingAmount: 8400,
        },
        {
            month: 'Mar',
            totalInvoices: 140,
            taxableAmount: 180000,
            cgst: 16200,
            sgst: 16200,
            igst: 0,
            totalGST: 32400,
            totalAmount: 212400,
            paidAmount: 200000,
            pendingAmount: 12400,
        },
        {
            month: 'Apr',
            totalInvoices: 110,
            taxableAmount: 160000,
            cgst: 14400,
            sgst: 14400,
            igst: 0,
            totalGST: 28800,
            totalAmount: 188800,
            paidAmount: 170000,
            pendingAmount: 18800,
        },
        {
            month: 'May',
            totalInvoices: 125,
            taxableAmount: 175000,
            cgst: 15750,
            sgst: 15750,
            igst: 0,
            totalGST: 31500,
            totalAmount: 206500,
            paidAmount: 195000,
            pendingAmount: 11500,
        },
        {
            month: 'Jun',
            totalInvoices: 100,
            taxableAmount: 145000,
            cgst: 13050,
            sgst: 13050,
            igst: 0,
            totalGST: 26100,
            totalAmount: 171100,
            paidAmount: 160000,
            pendingAmount: 11100,
        },
        {
            month: 'Jul',
            totalInvoices: 150,
            taxableAmount: 210000,
            cgst: 18900,
            sgst: 18900,
            igst: 0,
            totalGST: 37800,
            totalAmount: 247800,
            paidAmount: 230000,
            pendingAmount: 17800,
        },
        {
            month: 'Aug',
            totalInvoices: 135,
            taxableAmount: 195000,
            cgst: 17550,
            sgst: 17550,
            igst: 0,
            totalGST: 35100,
            totalAmount: 230100,
            paidAmount: 215000,
            pendingAmount: 15100,
        },
        {
            month: 'Sep',
            totalInvoices: 115,
            taxableAmount: 155000,
            cgst: 13950,
            sgst: 13950,
            igst: 0,
            totalGST: 27900,
            totalAmount: 182900,
            paidAmount: 170000,
            pendingAmount: 12900,
        },
        {
            month: 'Oct',
            totalInvoices: 160,
            taxableAmount: 220000,
            cgst: 19800,
            sgst: 19800,
            igst: 0,
            totalGST: 39600,
            totalAmount: 259600,
            paidAmount: 240000,
            pendingAmount: 19600,
        },
        {
            month: 'Nov',
            totalInvoices: 170,
            taxableAmount: 240000,
            cgst: 21600,
            sgst: 21600,
            igst: 0,
            totalGST: 43200,
            totalAmount: 283200,
            paidAmount: 265000,
            pendingAmount: 18200,
        },
        {
            month: 'Dec',
            totalInvoices: 180,
            taxableAmount: 260000,
            cgst: 23400,
            sgst: 23400,
            igst: 0,
            totalGST: 46800,
            totalAmount: 306800,
            paidAmount: 290000,
            pendingAmount: 16800,
        },
    ],

    yearlyStats: {
        totalInvoices: 1600,
        taxableAmount: 2220000,
        cgst: 199800,
        sgst: 199800,
        igst: 0,
        totalGST: 399600,
        totalAmount: 2619600,
        paidAmount: 2445000,
        pendingAmount: 174600,
    },

    petCategoryBreakdown: [
        { name: 'Dogs', value: 720 },
        { name: 'Cats', value: 410 },
        { name: 'Birds', value: 130 },
        { name: 'Others', value: 90 },
    ],

    serviceTypeBreakdown: [
        { name: 'Consultation', value: 850 },
        { name: 'Vaccination', value: 520 },
        { name: 'Surgery', value: 230 },
    ],

    topPetOwners: [
        { name: 'Rahul Sharma', phone: '9876543210', visits: 14, totalSpent: 52000 },
        { name: 'Priya Patel', phone: '9876543201', visits: 11, totalSpent: 46000 },
        { name: 'Arun Kumar', phone: '9876543202', visits: 9, totalSpent: 39000 },
        { name: 'Sneha Reddy', phone: '9876543203', visits: 12, totalSpent: 48000 },
        { name: 'Vikram Singh', phone: '9876543204', visits: 8, totalSpent: 36000 },
        { name: 'Meera Iyer', phone: '9876543205', visits: 10, totalSpent: 41000 },
        { name: 'Karthik Raj', phone: '9876543206', visits: 7, totalSpent: 33000 },
        { name: 'Anita Verma', phone: '9876543207', visits: 6, totalSpent: 29000 },
        { name: 'Rohit Nair', phone: '9876543208', visits: 13, totalSpent: 50000 },
        { name: 'Divya Shah', phone: '9876543209', visits: 5, totalSpent: 25000 },
    ]
};

const Report = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1); // 1-12
    const [period, setPeriod] = useState('year'); // 'year' or 'month'


    const handleExport = () => {
        if (!data) return;

        const { monthlyStats, yearlyStats, petCategoryBreakdown, serviceTypeBreakdown } = data;

        // Prepare data for Excel
        const ws1Data = monthlyStats.map(row => ({
            Month: row.month,
            Invoices: row.totalInvoices,
            TaxableValue: row.taxableAmount,
            CGST: row.cgst,
            SGST: row.sgst,
            IGST: row.igst,
            TotalGST: row.totalGST,
            TotalAmount: row.totalAmount,
            Paid: row.paidAmount,
            Pending: row.pendingAmount,
        }));

        // Add yearly summary
        ws1Data.push({
            Month: 'TOTAL',
            Invoices: yearlyStats.totalInvoices,
            TaxableValue: yearlyStats.taxableAmount,
            CGST: yearlyStats.cgst,
            SGST: yearlyStats.sgst,
            IGST: yearlyStats.igst,
            TotalGST: yearlyStats.totalGST,
            TotalAmount: yearlyStats.totalAmount,
            Paid: yearlyStats.paidAmount,
            Pending: yearlyStats.pendingAmount,
        });

        const ws1 = utils.json_to_sheet(ws1Data);

        // Device breakdown sheet
        const ws2Data = petCategoryBreakdown?.map(item => ({
            'Pet Category': item.name,
            'Count': item.value,
            'Percentage': `${((item.value / yearlyStats.totalInvoices) * 100).toFixed(1)}%`
        })) || [];
        const ws2 = utils.json_to_sheet(ws2Data);

        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws1, "Monthly Report");
        utils.book_append_sheet(wb, ws2, "Pet Category Breakdown");

        writeFile(wb, `Business_Report_${year}.xlsx`);
    };


    const {
        monthlyStats,
        yearlyStats,
        petCategoryBreakdown,
        serviceTypeBreakdown,
        topPetOwners
    } = data;

    const COLORS = ['#4361ee', '#3f37c9', '#4895ef', '#4cc9f0', '#f72585', '#b5179e'];

    const stats = [
        {
            title: 'Total Taxable Amount',
            value: `₹${yearlyStats.taxableAmount.toLocaleString()}`,
            label: 'Total taxable sales',
            icon: BsCurrencyRupee,
            color: 'bg-blue-100 text-blue-600',
        },
        {
            title: 'Total GST Collected',
            value: `₹${yearlyStats.totalGST.toLocaleString()}`,
            label: 'CGST + SGST + IGST',
            icon: FiTrendingUp,
            color: 'bg-emerald-100 text-emerald-600',
        },
        {
            title: 'Total Invoice Value',
            value: `₹${yearlyStats.totalAmount.toLocaleString()}`,
            label: 'Including GST',
            icon: FiDollarSign,
            color: 'bg-purple-100 text-purple-600',
        },
        {
            title: 'Paid Amount',
            value: `₹${yearlyStats.paidAmount.toLocaleString()}`,
            label: 'Received payments',
            icon: FiActivity,
            color: 'bg-green-100 text-green-600',
        },
        {
            title: 'Pending Amount',
            value: `₹${yearlyStats.pendingAmount.toLocaleString()}`,
            label: 'Outstanding invoices',
            icon: FiTruck,
            color: 'bg-red-100 text-red-600',
        },
    ];

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Business Reports & Analytics</h1>
                    <p className=" text-sm mt-1">
                        Comprehensive insights for {period === 'year' ? year : `${months[month - 1]} ${year}`}
                    </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Period Toggle */}
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setPeriod('year')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${period === 'year'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Yearly
                        </button>
                        <button
                            onClick={() => setPeriod('month')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${period === 'month'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Monthly
                        </button>
                    </div>

                    {/* Month Selector (if monthly) */}
                    {period === 'month' && (
                        <Select
                            value={month}
                            onChange={(val) => setMonth(val)}
                            options={months.map((m, i) => ({ value: i + 1, label: m }))}
                            className="w-40"
                        />
                    )}

                    {/* Year Selector */}
                    <Select
                        value={year}
                        onChange={(val) => setYear(val)}
                        options={[
                            { value: 2024, label: '2024' },
                            { value: 2025, label: '2025' },
                            { value: 2026, label: '2026' },
                        ]}
                        className="w-32"
                    />

                    {/* Export Button */}
                    <button
                        onClick={handleExport}
                        className="btn-primary flex items-center gap-2"
                    >
                        <FiDownload />
                        Export Excel
                    </button>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 min-[425px]:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} className="h-full" />
                ))}
            </div>

            {/* Charts Row 1: Financial + Volume */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue vs Cost */}
                <div className="card p-6 flex flex-col h-[400px] shadow rounded-2xl bg-[var(--card-bg)]">
                    <h3 className="font-bold text-lg mb-6">Financial Performance</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyStats}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <RechartsTooltip
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Legend />
                                <Bar name="Taxable Value" dataKey="taxableAmount" fill="#10b981" radius={[4, 4, 0, 0]} />
                                <Bar name="GST Collected" dataKey="totalGST" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                                <Bar name="Total Invoice Value" dataKey="totalAmount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders Trend */}
                <div className="card p-6 flex flex-col h-[400px] shadow rounded-2xl bg-[var(--card-bg)]">
                    <h3 className="font-bold  text-lg mb-6">Patient Visit Trend</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyStats} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <RechartsTooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    name="Taxable Value"
                                    dataKey="taxableAmount"
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorOrders)"
                                />
                                <Area
                                    type="monotone"
                                    name="GST Collected"
                                    dataKey="totalGST"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={0}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Charts Row 2: Device Breakdown + Service Type */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Device Category Breakdown */}
                <div className="card p-6 flex flex-col h-[400px] shadow rounded-2xl bg-[var(--card-bg)]">
                    <h3 className="font-bold  text-lg mb-6">Pet Category Distribution</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={petCategoryBreakdown || []}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={3}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {(petCategoryBreakdown || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Service Type Breakdown */}
                <div className="card p-6 flex flex-col h-[400px] shadow rounded-2xl bg-[var(--card-bg)]">
                    <h3 className="font-bold  text-lg mb-6">Service Type Analysis</h3>
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="space-y-4">
                            {serviceTypeBreakdown && serviceTypeBreakdown.map((item, index) => {
                                const total = serviceTypeBreakdown.reduce((sum, i) => sum + i.value, 0);
                                const percentage = total > 0 ? (item.value / total) * 100 : 0;
                                const color = index === 0 ? 'bg-blue-500' : 'bg-purple-500';

                                return (
                                    <div key={item.name} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {item.name === 'Consultation' && <FiUsers />}
                                                {item.name === 'Vaccination' && <FiActivity />}
                                                {item.name === 'Surgery' && <FiCalendar />}
                                                <span className="font-medium ">{item.name}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm ">{item.value} cases</span>
                                                <span className="font-bold  w-12 text-right">
                                                    {percentage.toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                            <div
                                                className={`h-full ${color} rounded-full transition-all duration-500`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Additional Stats */}
                        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <p className="text-sm  mb-1">Average Invoice Value</p>
                                <p className="text-2xl font-bold ">
                                    ₹{
                                        yearlyStats.totalInvoices > 0
                                            ? Math.round(yearlyStats.totalAmount / yearlyStats.totalInvoices).toLocaleString()
                                            : 0
                                    }
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm  mb-1">GST Percentage of Revenue</p>
                                <p className="text-2xl font-bold ">
                                    {
                                        yearlyStats.taxableAmount > 0
                                            ? ((yearlyStats.totalGST / yearlyStats.taxableAmount) * 100).toFixed(1)
                                            : 0
                                    }%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Monthly Breakdown Table */}
            <div className="card overflow-hidden  bg-[var(--card-bg)] shadow rounded-2xl">
                <div className="p-6 border-b border-[var(--border-color)]">
                    <h3 className="font-bold  text-lg">Detailed Monthly Breakdown</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm ">
                        <thead className=" bg-[var(--card-bg)]  uppercase font-semibold text-xs">
                            <tr>
                                <th className="px-6 py-4">Month</th>
                                <th className="px-6 py-4 text-right">Invoices</th>
                                <th className="px-6 py-4 text-right">Taxable Value</th>
                                <th className="px-6 py-4 text-right">CGST</th>
                                <th className="px-6 py-4 text-right">SGST</th>
                                <th className="px-6 py-4 text-right">IGST</th>
                                <th className="px-6 py-4 text-right">Total GST</th>
                                <th className="px-6 py-4 text-right">Total Amount</th>
                                <th className="px-6 py-4 text-right">Paid</th>
                                <th className="px-6 py-4 text-right">Pending</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)]">
                            {monthlyStats.map((row) => {
                                const completionRate = row.totalPatients > 0
                                    ? ((row.treatedPatients / row.totalPatients) * 100).toFixed(1)
                                    : 0;

                                return (
                                    <tr key={row.month} className="hover:bg-gray-50/10 transition-colors">
                                        <td className="px-6 py-4 font-medium ">{row.month}</td>
                                        <td className="px-6 py-4 text-right">{row.totalInvoices}</td>
                                        <td className="px-6 py-4 text-right">{row.taxableAmount.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right text-emerald-600 font-medium">
                                            {row.cgst.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">{row.sgst.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">{row.igst.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-medium">
                                            ₹{row.totalGST.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right text-rose-500">
                                            ₹{row.totalAmount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-blue-600">
                                            ₹{row.paidAmount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-blue-600">
                                            ₹{row.pendingAmount.toLocaleString()}
                                        </td>
                                        {/* <td className="px-6 py-4 text-right">
                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${completionRate >= 80
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : completionRate >= 60
                                                    ? 'bg-amber-100 text-amber-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {completionRate}%
                                            </span>
                                        </td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot className="font-bold">
                            <tr className="border-t-2 border-[var(--border-color)]">
                                <td className="px-6 py-4">TOTAL</td>
                                <td className="px-6 py-4 text-right">{yearlyStats.totalInvoices}</td>
                                <td className="px-6 py-4 text-right text-emerald-600">
                                    {yearlyStats.taxableAmount}
                                </td>
                                <td className="px-6 py-4 text-right">{yearlyStats.cgst || 0}</td>
                                <td className="px-6 py-4 text-right">{yearlyStats.sgst || 0}</td>
                                <td className="px-6 py-4 text-right">₹{yearlyStats.igst.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right text-rose-600">
                                    ₹{yearlyStats.totalGST.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right text-blue-600">
                                    ₹{yearlyStats.totalAmount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right text-blue-600">
                                    ₹{yearlyStats.paidAmount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right text-blue-600">
                                    ₹{yearlyStats.pendingAmount.toLocaleString()}
                                </td>
                                {/* <td className="px-6 py-4 text-right">
                                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                                        totalOrders
                                    </span>
                                </td> */}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Top Customers (if available) */}
            {topPetOwners && topPetOwners.length > 0 && (
                <div className="card overflow-hidden rounded-2xl shadow bg-[var(--card-bg)]">
                    <div className="p-6 border-b border-[var(--border-color)]">
                        <h3 className="font-bold text-lg">Top Customers</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className=" uppercase font-semibold text-xs">
                                <tr>
                                    <th className="px-6 py-4">Rank</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4 text-right">Orders</th>
                                    <th className="px-6 py-4 text-right">Total Spent</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {topPetOwners.map((customer, index) => (
                                    <tr key={index} className="hover:bg-gray-50/10">
                                        <td className="px-6 py-4">
                                            <span className="font-bold">#{index + 1}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium capitalize">{customer.name}</p>
                                                <p className="text-xs">{customer.phone}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">{customer.visits}</td>
                                        <td className="px-6 py-4 text-right font-bold text-emerald-600">
                                            ₹{customer.totalSpent.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Report;
