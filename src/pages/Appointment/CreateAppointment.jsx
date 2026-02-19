import React, { useState } from "react"
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useLocation } from "react-router-dom"

const CreateAppointment = () => {
    const location = useLocation()
    const isUpdatePage = location.pathname.includes("update")
    const pageTitle = isUpdatePage ? "Update Appointment" : "Create Appointment"
    const [formData, setFormData] = useState({
        branch: "",
        status: "Confirmed",
        clientName: "",
        clientPhone: "",
        clientEmail: "",
        reason: "",
        notes: "",
    })
    const today = new Date()
    const currentDay = today.getDate()
    const [selectedBranch, setSelectedBranch] = useState("")
    const [selectedDate, setSelectedDate] = useState(currentDay)
    const [selectedTime, setSelectedTime] = useState("")

    const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1)
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    const timeSlots = [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
    ]
    return (
        <div className="mx-auto bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)] border p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-[var(--dashboard-text)] mb-6">
                {pageTitle}
            </h1>

            <form className="space-y-8">
                {/* Row 1 */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Branch *</Label>
                        <Select onValueChange={(value) => {
                            setSelectedBranch(value)
                            setSelectedDate(null)
                            setSelectedTime()
                        }}>
                            <SelectTrigger className="h-11 bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)]">
                                <SelectValue placeholder="Select branch" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="main">Main Branch</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select defaultValue="Confirmed">
                            <SelectTrigger className="h-11 bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Confirmed">Confirmed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Client (Optional)</Label>
                        <Input
                            className="h-11 bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)]"
                            placeholder="Search and select client"
                        />
                        <p className="text-xs text-[var(--dashboard-text)]">
                            Select a client or enter client details below.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Pet (Optional)</Label>
                        <Input
                            className="h-11 bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)]"
                            placeholder="Search and select pet"
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Select Date *</Label>

                        <Card className={`p-4 bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)]
                            ${!selectedBranch ? "opacity-50 pointer-events-none" : ""}`}>
                            <div className="flex justify-between items-center mb-4">
                                <Button variant="ghost" size="icon">
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>

                                <span className="font-semibold text-sm ">
                                    February 2026
                                </span>

                                <Button variant="ghost" size="icon">
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-7 text-center">
                                {weekDays.map((day) => (
                                    <span
                                        key={day}
                                        className="text-xs text-muted-foreground font-medium"
                                    >
                                        {day}
                                    </span>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1 items-center">
                                {daysInMonth.map((day) => {
                                    const isPast = day < currentDay
                                    const isSelected = selectedDate === day
                                    return (
                                        <Button
                                            key={day}
                                            type="button"
                                            variant="ghost"
                                            disabled={isPast}
                                            onClick={() => !isPast && setSelectedDate(day)}
                                            className={`
        h-8 p-0 text-sm transition-colors
        ${isSelected
                                                    ? "bg-[var(--dashboard-primary)]"
                                                    : "hover:bg-[var(--dashboard-primary)]"
                                                }
        ${isPast ? "opacity-40 cursor-not-allowed hover:bg-transparent " : ""}
      `}
                                        >
                                            {day}
                                        </Button>
                                    )
                                })}
                            </div>
                        </Card>

                        {!selectedBranch && (
                            <p className="text-sm text-destructive">
                                Please select a branch first
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Available Time Slots *</Label>

                        <Card className="h-[260px] flex flex-col items-start px-5 justify-start bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)]">
                            {!selectedBranch && (
                                <div className="flex flex-col items-center justify-center h-full opacity-50">
                                    <CalendarIcon className="h-10 w-10 mb-2" />
                                    <p>Please select a branch first</p>
                                </div>
                            )}

                            {selectedBranch && !selectedDate && (
                                <div className="flex flex-col items-center justify-center h-full opacity-50">
                                    <CalendarIcon className="h-10 w-10 mb-2" />
                                    <p>Please select a date</p>
                                </div>
                            )}

                            {selectedBranch && selectedDate && (
                                <div className="grid grid-cols-2 gap-2">
                                    {timeSlots.map((slot) => (
                                        <Button
                                            key={slot}
                                            type="button"
                                            variant={selectedTime === slot ? "default" : "outline"}
                                            onClick={() => setSelectedTime(slot)}
                                        >
                                            {slot}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>
                </div>

                {/* Row 4 */}
                <div className="grid gap-6 md:grid-cols-2 pt-4">
                    <div className="space-y-2">
                        <Label>Client Name *</Label>
                        <Input
                            className="h-11 bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)]"
                            placeholder="Enter client name"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Client Phone *</Label>
                        <div className="flex">
                            <div className="flex items-center px-3 border bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)] rounded-l-md bg-muted text-sm">
                                IND +91
                            </div>
                            <Input className="h-11 rounded-l-none bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)]" type="tel" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Client Email (Optional)</Label>
                    <Input
                        className="h-11 bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)]"
                        type="email"
                        placeholder="Enter client email"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Reason for Visit</Label>
                    <Textarea
                        rows={3}
                        placeholder="Enter reason for visit"
                        className="bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)]"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Additional Notes</Label>
                    <Textarea
                        rows={3}
                        placeholder="Enter additional notes"
                        className="bg-[var(--card-bg)] text-[var(--dashboard-text)] border-[var(--border-color)]"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-[var(--dashboard-primary)] text-white">
                        Create Appointment
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CreateAppointment