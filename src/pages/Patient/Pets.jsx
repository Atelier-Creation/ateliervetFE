import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Upload } from "lucide-react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
const statusClass = (status) => {
    switch (status) {
        case "Active":
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
const Pets = ({ clientsWithPets }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const allPets = clientsWithPets.flatMap((client) =>
        client.pets.map((pet) => ({
            ...pet,
            clientName: client.name,
            clientEmail: client.email,
        }))
    );
    const [activeTab, setActiveTab] = useState("Client");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const totalItems = allPets.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentPets = allPets.slice(startIndex, endIndex);
    return (
        <div className="container mx-auto">
            <div className="space-y-4">
                {/* Table */}
                {activeTab === "Client" && (
                    <div>
                        <div className="rounded-xl border border-[var(--border-color)] overflow-x-auto bg-[var(--card-bg)] shadow-sm">
                            <table className="w-full text-sm">
                                <thead className="border-b border-[var(--border-color)] bg-[var(--dashboard-secondary)]">
                                    <tr>
                                        {[
                                            "Name",
                                            "Code",
                                            "Client",
                                            "Species",
                                            "Breed",
                                            "Age",
                                            "Status",
                                            "Created At",
                                            "Action",
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
                                    {currentPets.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-[var(--border-color)] hover:bg-[var(--dashboard-secondary)] transition-colors"
                                        >
                                            <td className="p-4 text-[var(--dashboard-text)]">{item.name}</td>
                                            <td className="p-4 text-[var(--dashboard-text)]">{item.code}</td>
                                            <td className="p-4 text-[var(--dashboard-text)]">{item.clientName}</td>
                                            <td className="p-4 text-[var(--dashboard-text)]">{item.species}</td>
                                            <td className="p-4 text-[var(--dashboard-text)]">{item.breed}</td>
                                            <td className="p-4 text-[var(--dashboard-text)]">{item.age}</td>
                                            <td className="p-4">
                                                <span
                                                    className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${statusClass(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-[var(--dashboard-text)]">{item.createdAt}</td>
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
            </div>
        </div>
    );
};

export default Pets;
