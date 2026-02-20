import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import DayView from "./DayView";
import Weekview from "./Weekview";
import MonthView from "./MonthView";

const appointments = [
    {
        id: 1,
        appointmentDate: "Feb 11, 2026, 8:00 AM",
        createdDate: "Feb 10, 2026, 12:53 PM",
        status: "Confirmed",
        reason: "Vaccination",
        client: {
            name: "Prasanth S",
            phone: "919500361249",
        },
        pet: {
            name: "Rose",
            code: "R26P9FJV",
            type: "dog",
        },
    },
    {
        id: 2,
        appointmentDate: "Nov 20, 2025, 6:00 PM",
        createdDate: "Nov 19, 2025, 7:18 PM",
        status: "Pending",
        reason: "Routine checkup",
        client: {
            name: "Russel Bling",
            phone: "233240608256",
        },
        pet: {
            name: "Bruno",
            code: "B25PNTQC",
            type: "dog",
        },
    },
    {
        id: 3,
        appointmentDate: "Oct 30, 2025, 8:00 PM",
        createdDate: "Oct 28, 2025, 5:25 PM",
        status: "Confirmed",
        reason: "No reason provided",
        client: {
            name: "Isadora Gould",
            phone: "12046676793",
        },
        pet: {
            name: "Harper",
            code: "H25PDQQ7",
            type: "dog",
        },
    },

    // 🔽 Additional data
    {
        id: 4,
        appointmentDate: "Mar 02, 2026, 10:30 AM",
        createdDate: "Feb 28, 2026, 4:12 PM",
        status: "Cancelled",
        reason: "Pet not feeling well",
        client: {
            name: "Ananya Sharma",
            phone: "918888224455",
        },
        pet: {
            name: "Milo",
            code: "M26CAT91",
            type: "cat",
        },
    },
    {
        id: 5,
        appointmentDate: "Jan 15, 2026, 1:00 PM",
        createdDate: "Jan 14, 2026, 9:45 AM",
        status: "Completed",
        reason: "Deworming",
        client: {
            name: "Karthik R",
            phone: "919677889900",
        },
        pet: {
            name: "Snowy",
            code: "S26DOG88",
            type: "dog",
        },
    },
    {
        id: 6,
        appointmentDate: "Dec 05, 2025, 5:30 PM",
        createdDate: "Dec 04, 2025, 6:02 PM",
        status: "Confirmed",
        reason: "Skin allergy treatment",
        client: {
            name: "Meera Patel",
            phone: "919812345670",
        },
        pet: {
            name: "Coco",
            code: "C25DOG44",
            type: "dog",
        },
    },
    {
        id: 7,
        appointmentDate: "Feb 20, 2026, 11:00 AM",
        createdDate: "Feb 18, 2026, 3:40 PM",
        status: "Pending",
        reason: "Follow-up consultation",
        client: {
            name: "Arjun Menon",
            phone: "919700112233",
        },
        pet: {
            name: "Leo",
            code: "L26CAT12",
            type: "cat",
        },
    },
    {
        id: 8,
        appointmentDate: "Jan 28, 2026, 4:15 PM",
        createdDate: "Jan 27, 2026, 8:30 PM",
        status: "Completed",
        reason: "Annual health check",
        client: {
            name: "Sneha Iyer",
            phone: "919566778899",
        },
        pet: {
            name: "Buddy",
            code: "B26DOG55",
            type: "dog",
        },
    },
    {
        id: 9,
        appointmentDate: "Mar 10, 2026, 7:00 PM",
        createdDate: "Mar 09, 2026, 1:10 PM",
        status: "Confirmed",
        reason: "Injury assessment",
        client: {
            name: "Rohit Verma",
            phone: "919899001122",
        },
        pet: {
            name: "Tiger",
            code: "T26DOG77",
            type: "dog",
        },
    },
    {
        id: 10,
        appointmentDate: "Feb 05, 2026, 9:00 AM",
        createdDate: "Feb 04, 2026, 10:55 PM",
        status: "No Show",
        reason: "Dental checkup",
        client: {
            name: "Neha Kapoor",
            phone: "919822334455",
        },
        pet: {
            name: "Luna",
            code: "L26CAT66",
            type: "cat",
        },
    },
];


const statusClass = (status) => {
    switch (status) {
        case "Confirmed":
            return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
        case "Pending":
            return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
        case "Cancelled":
            return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
        default:
            return "bg-[var(--dashboard-secondary)] text-[var(--dashboard-text-light)]";
    }
};

const ITEMS_PER_PAGE = 10;
const Appointment = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState("List");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const totalItems = appointments.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentAppointments = appointments.slice(startIndex, endIndex);
    return (
        <div className="container mx-auto p-4">
            <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold tracking-tight text-[var(--dashboard-text)]">
                            Appointments
                        </h1>
                        <p className="text-sm text-[var(--dashboard-text-light)]">
                            Schedule and manage appointments with multiple calendar views
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                            className="h-9 w-full sm:w-[300px] rounded-md border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--dashboard-text)] px-3 text-sm focus:border-[var(--dashboard-primary)]"
                            placeholder="Search..."
                        />
                        <Button className="h-9 rounded-md border border-[var(--border-color)] px-4 text-sm bg-[var(--card-bg)] text-[var(--dashboard-text)] hover:bg-[var(--dashboard-primary)] hover:text-white">
                            Filters
                        </Button>
                        <Button className="h-9 rounded-md bg-[var(--dashboard-primary)] px-4 text-sm text-white hover:bg-[var(--dashboard-primary-hover)]">
                            <Plus size={20} />
                            Create New
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="inline-flex h-9 items-center rounded-lg bg-[var(--dashboard-secondary)] px-1 py-5 border border-[var(--border-color)]">
                    {["List", "Day", "Week", "Month"].map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1 text-sm rounded-md transition-all shadow-none ${activeTab === tab
                                ? "bg-[var(--dashboard-primary)] text-white shadow"
                                : "text-[var(--dashboard-text-light)] hover:text-[var(--dashboard-text)] hover:bg-[var(--card-bg)]/50"
                                }`}
                        >
                            {tab}
                        </Button>
                    ))}
                </div>


                {/* Table */}
                {activeTab === "List" && (
                    <div>
                        <div className="rounded-xl border border-[var(--border-color)] overflow-x-auto bg-[var(--card-bg)] shadow-sm">
                            <table className="w-full text-sm">
                                <thead className="border-b border-[var(--border-color)] bg-[var(--dashboard-secondary)]">
                                    <tr>
                                        {[
                                            "Appointment Date",
                                            "Created Date",
                                            "Status",
                                            "Reason",
                                            "Client",
                                            "Pet",
                                            "Actions",
                                        ].map((h) => (
                                            <th
                                                key={h}
                                                className="h-10 px-4 text-left font-semibold text-[var(--dashboard-text)]"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentAppointments.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-[var(--border-color)] hover:bg-[var(--dashboard-secondary)] transition-colors"
                                        >
                                            <td className="p-4 text-[var(--dashboard-text)]">{item.appointmentDate}</td>
                                            <td className="p-4 text-[var(--dashboard-text-light)]">{item.createdDate}</td>
                                            <td className="p-4">
                                                <span
                                                    className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${statusClass(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-[var(--dashboard-text)]">{item.reason}</td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-[var(--dashboard-text)]">
                                                        {item.client.name}
                                                    </span>
                                                    <span className="text-xs text-[var(--dashboard-text-light)]">
                                                        {item.client.phone}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-[var(--dashboard-text)]">
                                                        {item.pet.name}
                                                    </span>
                                                    <span className="text-xs text-[var(--dashboard-text-light)]">
                                                        {item.pet.code} – {item.pet.type}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <Button className="h-8 rounded-md border border-[var(--border-color)] px-3 text-xs text-[var(--dashboard-text)] bg-[var(--card-bg)] hover:bg-[var(--dashboard-secondary)]">
                                                        Edit
                                                    </Button>
                                                    <Button className="h-8 rounded-md border border-red-200 dark:border-red-900/30 px-3 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20">
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between gap-4 flex-wrap pt-4">
                            <div className="text-sm text-[var(--dashboard-text-light)]">
                                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 px-3 border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--dashboard-text)] hover:bg-[var(--dashboard-secondary)]"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <span className="text-sm text-[var(--dashboard-text-light)]">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 px-3 border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--dashboard-text)] hover:bg-[var(--dashboard-secondary)]"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "Day" && <DayView
                    appointments={appointments}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />}
                {activeTab === "Week" && <Weekview
                    appointments={appointments}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />}
                {activeTab === "Month" && <MonthView
                    appointments={appointments}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />}
            </div>
        </div>
    );
};

export default Appointment;
