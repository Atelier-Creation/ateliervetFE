import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const startHour = 8;   // calendar starts at 8 AM
const endHour = 20;    // calendar ends at 8 PM

const Weekview = ({ appointments, selectedDate, setSelectedDate }) => {
    /* ---------------- TIME SLOTS ---------------- */
    const timeSlots = Array.from(
        { length: endHour - startHour },
        (_, i) => `${String(i + startHour).padStart(2, "0")}:00`
    );

    /* ---------------- CURRENT WEEK ---------------- */
    const weekStart = useMemo(() => {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() - d.getDay());
        d.setHours(0, 0, 0, 0);
        return d;
    }, [selectedDate]);

    const weekDates = useMemo(
        () =>
            Array.from({ length: 7 }, (_, i) => {
                const d = new Date(weekStart);
                d.setDate(d.getDate() + i);
                return d;
            }),
        [weekStart]
    );

    /* ---------------- PARSE APPOINTMENTS ---------------- */
    const parsedAppointments = useMemo(
        () =>
            appointments.map((a) => {
                const date = new Date(a.appointmentDate);
                return {
                    ...a,
                    date,
                    day: date.getDay(),
                    hour: date.getHours(),
                };
            }),
        [appointments]
    );

    /* ---------------- CURRENT TIME RED LINE ---------------- */
    const now = new Date();
    const todayIndex = now.getDay();

    const minutesFromStart =
        (now.getHours() - startHour) * 60 + now.getMinutes();

    const totalMinutes = (endHour - startHour) * 60;

    const currentTimeTop =
        (minutesFromStart / totalMinutes) * 100;

    const showRedLine =
        weekDates[todayIndex]?.toDateString() === now.toDateString() &&
        now.getHours() >= startHour &&
        now.getHours() <= endHour;

    /* ---------------- RENDER ---------------- */
    return (
        <div className="flex flex-col w-full text-slate-900">
            {/* HEADER */}
            {/* TOP CONTROLS – WEEK VIEW */}
            <div className="flex items-center justify-between bg-background border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="h-9 px-4 border"
                        onClick={() => setSelectedDate(new Date())}
                    >
                        Today
                    </Button>

                    <div className="flex items-center space-x-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 px-2 border"
                            onClick={() =>
                                setSelectedDate(
                                    new Date(selectedDate.setDate(selectedDate.getDate() - 7))
                                )
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 px-2 border"
                            onClick={() =>
                                setSelectedDate(
                                    new Date(selectedDate.setDate(selectedDate.getDate() + 7))
                                )
                            }
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <span className="text-sm font-medium ml-2">
                        {weekDates[0].toDateString()} – {weekDates[6].toDateString()}
                    </span>
                </div>

                <Button
                    size="sm"
                    className="h-9 bg-[var(--dashboard-primary)] text-white px-3"
                >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {selectedDate.toDateString()}
                </Button>
            </div>


            {/* CALENDAR GRID */}
            <div className="flex-1 overflow-auto border mt-4 rounded-md relative">
                {/* 🔴 CURRENT TIME INDICATOR */}
                {/* {showRedLine && (
                    <div
                        className="absolute left-20 right-0 z-30 pointer-events-none"
                        style={{ top: `${currentTimeTop}%` }}
                    >
                        <div className="relative">
                            <div className="absolute left-0 right-0 border-t-2 border-red-500" />
                            <div className="absolute -left-2 top-[-4px] w-3 h-3 bg-red-500 rounded-full" />
                        </div>
                    </div>
                )} */}

                <table className="w-full table-fixed border-collapse">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="w-20 border-r" />
                            {days.map((day, i) => (
                                <th
                                    key={day}
                                    className="border-r py-3 text-sm font-semibold text-indigo-900"
                                >
                                    {day}
                                    <div className="text-xs text-muted-foreground">
                                        {weekDates[i].getDate()}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {timeSlots.map((time, rowIndex) => (
                            <tr key={time} className="h-20">
                                <td className="border-r border-b text-xs text-slate-500 text-center pt-2 font-medium">
                                    {time}
                                </td>

                                {days.map((_, colIndex) => {
                                    const slotHour = startHour + rowIndex;

                                    const events = parsedAppointments.filter(
                                        (a) =>
                                            a.day === colIndex &&
                                            a.hour === slotHour &&
                                            a.date >= weekStart &&
                                            a.date < new Date(weekStart.getTime() + 7 * 86400000)
                                    );

                                    return (
                                        <td
                                            key={`${colIndex}-${time}`}
                                            className="border-r border-b relative hover:bg-slate-50/30 transition-colors bg-white"
                                        >
                                            {events.map((evt) => (
                                                <div
                                                    key={evt.id}
                                                    className="absolute inset-x-1 top-1 bottom-1 bg-blue-100 rounded-md p-2 shadow-sm cursor-pointer"
                                                >
                                                    <p className="text-[10px] font-bold text-blue-800 uppercase">
                                                        {evt.client.name}
                                                    </p>
                                                    <p className="text-xs font-semibold text-blue-900 truncate">
                                                        {evt.pet.name} — {evt.reason}
                                                    </p>
                                                </div>
                                            ))}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Weekview;
