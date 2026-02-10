import React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const MonthView = ({ appointments, selectedDate, setSelectedDate }) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Get first day of the month and number of days
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();

    // Generate array of days for the month
    const days = Array.from({ length: numDays }, (_, i) => i + 1);

    const monthName = selectedDate.toLocaleString("default", { month: "long", year: "numeric" });

    // Filter appointments for this month
    const appointmentsThisMonth = appointments.filter((a) => {
        const apptDate = new Date(a.appointmentDate);
        return apptDate.getFullYear() === year && apptDate.getMonth() === month;
    });

    return (
        <div className="w-full mx-auto">
            {/* Header */}
            {/* TOP CONTROLS – MONTH VIEW */}
            <div className="flex items-center justify-between bg-background border rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                    {/* Today Button */}
                    <Button
                        variant="outline"
                        className="h-9 px-4 border"
                        onClick={() => setSelectedDate(new Date())}
                    >
                        Today
                    </Button>

                    {/* Prev / Next Month Buttons */}
                    <div className="flex items-center space-x-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 px-2 border"
                            onClick={() =>
                                setSelectedDate(new Date(year, month - 1, 1))
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 px-2 border"
                            onClick={() =>
                                setSelectedDate(new Date(year, month + 1, 1))
                            }
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Month Name */}
                    <span className="text-sm font-medium ml-2">{monthName}</span>
                </div>

                {/* Calendar Button */}
                <Button
                    size="sm"
                    className="h-9 bg-[var(--dashboard-primary)] text-white px-3"
                >
                    <CalendarIcon className="h-4 w-4 mr-2 text-white" />
                    {selectedDate.toLocaleDateString("default", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </Button>
            </div>


            {/* Calendar Grid */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
                {/* Day Headers */}
                <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
                    {daysOfWeek.map((day) => (
                        <div
                            key={day}
                            className="py-3 text-center text-sm font-bold text-slate-600"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-7">
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="border-r border-b border-slate-100 min-h-[120px] p-2" />
                    ))}

                    {days.map((day) => {
                        const today = new Date();
                        const isToday =
                            today.getDate() === day &&
                            today.getMonth() === month &&
                            today.getFullYear() === year;

                        // Appointments on this day
                        const events = appointmentsThisMonth.filter(
                            (a) => new Date(a.appointmentDate).getDate() === day
                        );

                        return (
                            <div
                                key={day}
                                className={`min-h-[120px] p-2 bg-white border-r border-b border-slate-100 relative transition-colors hover:bg-slate-50/50 ${isToday ? "bg-slate-50/30" : ""
                                    }`}
                            >
                                <span
                                    className={`block text-center mb-2 text-sm ${isToday ? "font-bold text-black" : "text-slate-500"
                                        }`}
                                >
                                    {day < 10 ? `0${day}` : day}
                                </span>

                                {/* Events */}
                                {events.map((e) => (
                                    <div
                                        key={e.id}
                                        className="mt-1 px-2 py-1 bg-blue-100 border-l-4 border-blue-500 rounded text-xs font-medium text-blue-800 truncate"
                                        title={`${e.client.name} - ${e.pet.name} (${new Date(
                                            e.appointmentDate
                                        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`}
                                    >
                                        {e.client.name} - {e.pet.name}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MonthView;
