import { Button } from '@/components/ui/button'
import { Calendar1, ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const START_HOUR = 8
const END_HOUR = 19
const HOUR_HEIGHT = 60

const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()

const getTopFromTime = (date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return ((hours - START_HOUR) * HOUR_HEIGHT) + (minutes / 60) * HOUR_HEIGHT
}

function DayView({ appointments, selectedDate, setSelectedDate }) {

    const dayAppointments = appointments.filter(a =>
        isSameDay(new Date(a.appointmentDate), selectedDate)
    )

    return (
        <div className="mt-2">
            <div className="flex flex-col h-[700px] space-y-4">

                {/* Top Controls */}
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
                                    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))
                                }
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-9 px-2 border"
                                onClick={() =>
                                    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))
                                }
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        <span className="text-sm font-medium ml-2">
                            {selectedDate.toDateString()}
                        </span>
                    </div>

                    <Button size="sm" className="h-9 bg-[var(--dashboard-primary)] text-white px-2">
                        <Calendar1 className="h-4 w-4 mr-2" />
                        {selectedDate.toLocaleDateString()}
                    </Button>
                </div>

                {/* Calendar */}
                <div className="flex-1 rounded-lg border bg-white shadow-sm">
                    <div className="h-full flex">

                        {/* Time column */}
                        <div className="w-[70px] border-r bg-slate-50">
                            {Array.from({ length: END_HOUR - START_HOUR + 1 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-[60px] flex justify-end pr-2 pt-1 text-sm text-muted-foreground border-b"
                                >
                                    {START_HOUR + i}:00
                                </div>
                            ))}
                        </div>

                        {/* Day column */}
                        <div className="flex-1 relative">
                            {Array.from({ length: END_HOUR - START_HOUR + 1 }).map((_, i) => (
                                <div key={i} className="h-[60px] border-b" />
                            ))}

                            {/* Appointments */}
                            {dayAppointments.map(appt => {
                                const date = new Date(appt.appointmentDate)
                                return (
                                    <div
                                        key={appt.id}
                                        className="absolute h-full left-4 right-4 rounded-md p-2 text-base text-black shadow"
                                        style={{
                                            top: getTopFromTime(date),
                                            height: 60,
                                            backgroundColor: "#dbeafe"
                                        }}
                                    >
                                        <div className="font-semibold">
                                            {appt.client.name}
                                        </div>
                                        <div className="opacity-90">
                                            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DayView
