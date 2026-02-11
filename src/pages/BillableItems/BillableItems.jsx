import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Upload,
    Settings as SettingsIcon,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { TableSkeleton } from '../../components/ui/TableSkeleton';
import ImportBillableItemsModal from './ImportBillableItemsModal';

const ITEMS_PER_PAGE = 10;

const mockItems = [
    { id: 1, name: "Blood Test - CBC", sku: "FTH-S-0017", type: "Service", price: 800.00, initialStock: "N/A", currentStock: "N/A", status: "Active" },
    { id: 2, name: "Blood Test - Chemistry", sku: "FTH-S-0018", type: "Service", price: 1500.00, initialStock: "N/A", currentStock: "N/A", status: "Active" },
    { id: 3, name: "Consultation - General", sku: "FTH-S-0001", type: "Service", price: 500.00, initialStock: "N/A", currentStock: "N/A", status: "Active" },
    { id: 4, name: "Cremation - Large Pet", sku: "FTH-S-0023", type: "Service", price: 5000.00, initialStock: "N/A", currentStock: "N/A", status: "Active" },
    { id: 5, name: "Cremation - Small Pet", sku: "FTH-S-0022", type: "Service", price: 3000.00, initialStock: "N/A", currentStock: "N/A", status: "Active" },
    { id: 6, name: "Dental Cleaning", sku: "FTH-S-0014", type: "Service", price: 3000.00, initialStock: "N/A", currentStock: "N/A", status: "Active" },
    { id: 7, name: "Deworming - Adult Dog", sku: "FTH-M-0010", type: "Medication", price: 200.00, initialStock: "200", currentStock: "199", status: "Active" },
    { id: 8, name: "Deworming - Puppy", sku: "FTH-M-0009", type: "Medication", price: 150.00, initialStock: "200", currentStock: "199", status: "Active" },
    { id: 9, name: "Ear Cleaning", sku: "FTH-S-0026", type: "Service", price: 500.00, initialStock: "N/A", currentStock: "N/A", status: "Active" },
    { id: 10, name: "Emergency Consultation", sku: "FTH-S-0002", type: "Service", price: 1200.00, initialStock: "N/A", currentStock: "N/A", status: "Active" },
];

const statusClass = (status) => {
    switch (status) {
        case "Active":
            return "bg-pink-500/10 text-pink-600 dark:text-pink-400"; // Matches screenshot pink/red theme
        case "Inactive":
            return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
        default:
            return "bg-[var(--dashboard-secondary)] text-[var(--dashboard-text-light)]";
    }
};

const BillableItems = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const totalItems = mockItems.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = mockItems.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto p-4 space-y-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--dashboard-text)]">Billable Items</h1>
                    <p className="text-sm text-[var(--dashboard-text-light)]">Manage your products, services, and other billable items</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--dashboard-text-light)]" />
                        <Input
                            placeholder="Search..."
                            className="pl-9 w-[250px] bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--dashboard-text)]"
                        />
                    </div>

                    <Button variant="outline" className="border-[var(--border-color)] text-[var(--dashboard-text)] bg-[var(--card-bg)] hover:bg-[var(--dashboard-primary)] hover:text-white">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>

                    <Button
                        onClick={() => navigate('/billable-items/create')}
                        className="bg-[var(--dashboard-primary)] text-white hover:bg-[var(--dashboard-primary-hover)] shadow-md hover:shadow-lg transition-all"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create New
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => setIsImportModalOpen(true)}
                        className="border-[var(--border-color)] text-[var(--dashboard-text)] bg-[var(--card-bg)] hover:bg-[var(--dashboard-secondary)]"
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        Import
                    </Button>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex justify-end">
                <Button
                    variant="outline"
                    onClick={() => navigate('/billable-items/settings')}
                    className="border-[var(--border-color)] text-[var(--dashboard-text)] bg-[var(--card-bg)] hover:bg-[var(--dashboard-secondary)]"
                >
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Item Settings
                </Button>
            </div>

            {/* Table Section */}
            <div className="rounded-xl border border-[var(--border-color)] overflow-hidden bg-[var(--card-bg)] shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[var(--dashboard-secondary)] border-b border-[var(--border-color)]">
                            <tr>
                                {["Name", "SKU", "Type", "Price", "Initial Stock", "Current Stock", "Status", "Actions"].map((header) => (
                                    <th key={header} className="h-12 px-4 text-left font-medium text-[var(--dashboard-text-light)] uppercase text-xs tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)]">
                            {isLoading ? (
                                <TableSkeleton rowCount={8} columnCount={8} />
                            ) : (
                                currentItems.map((item) => (
                                    <tr key={item.id} className="group hover:bg-[var(--dashboard-secondary)] transition-colors">
                                        <td className="p-4 font-medium text-[var(--dashboard-text)]">{item.name}</td>
                                        <td className="p-4 text-[var(--dashboard-text-light)]">{item.sku}</td>
                                        <td className="p-4 text-[var(--dashboard-text-light)]">{item.type}</td>
                                        <td className="p-4 text-[var(--dashboard-text)] font-medium">${item.price.toFixed(2)}</td>
                                        <td className="p-4 text-[var(--dashboard-text-light)]">{item.initialStock}</td>
                                        <td className="p-4 text-[var(--dashboard-text-light)]">{item.currentStock}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => navigate(`/billable-items/edit/${item.id}`)}
                                                    className="h-8 px-2 text-[var(--dashboard-text-light)] hover:text-[var(--dashboard-text)] hover:bg-[var(--card-bg)] border border-[var(--border-color)]"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10 border border-red-200 dark:border-red-800"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-[var(--border-color)] bg-[var(--card-bg)]">
                    <div className="text-sm text-[var(--dashboard-text-light)]">
                        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 border-[var(--border-color)] hover:bg-[var(--dashboard-secondary)]"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-[var(--dashboard-text)] font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 border-[var(--border-color)] hover:bg-[var(--dashboard-secondary)]"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <ImportBillableItemsModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
            />
        </div>
    );
};

export default BillableItems;
