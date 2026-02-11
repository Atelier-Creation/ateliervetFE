import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { TableSkeleton } from '../../../components/ui/TableSkeleton';
import DiscountModal from './DiscountModal';

const mockDiscounts = [
    { id: 1, name: "Loyalty Discount", type: "percentage", value: "5%", description: "For 5+ visits", status: "Active" },
    { id: 2, name: "Multiple Pet Discount", type: "percentage", value: "15%", description: "For 2+ pets", status: "Active" },
    { id: 3, name: "New Client Discount", type: "amount", value: "50", description: "One-time new client discount", status: "Active" },
    { id: 4, name: "Senior Pet Discount", type: "percentage", value: "10%", description: "For pets 7+ years", status: "Active" },
];

const DiscountTypesTab = ({ isAddModalOpen, onCloseAddModal }) => {
    const [discounts, setDiscounts] = useState(mockDiscounts);
    const [editData, setEditData] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEdit = (discount) => {
        setEditData(discount);
        setIsEditModalOpen(true);
    };

    const handleSave = (data) => {
        console.log("Saving Discount:", data);
        // Implement save logic
    };

    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-[var(--border-color)] overflow-hidden bg-[var(--card-bg)] shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[var(--dashboard-secondary)] border-b border-[var(--border-color)]">
                            <tr>
                                {["Name", "Type", "Value", "Description", "Status", "Actions"].map((header) => (
                                    <th key={header} className="h-12 px-4 text-left font-medium text-[var(--dashboard-text-light)] uppercase text-xs tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)]">
                            {discounts.map((item) => (
                                <tr key={item.id} className="group hover:bg-[var(--dashboard-secondary)] transition-colors">
                                    <td className="p-4 font-medium text-[var(--dashboard-text)]">{item.name}</td>
                                    <td className="p-4 text-[var(--dashboard-text-light)]">{item.type}</td>
                                    <td className="p-4 text-[var(--dashboard-text-light)]">{item.value}</td>
                                    <td className="p-4 text-[var(--dashboard-text-light)]">{item.description}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Active'
                                                ? "bg-pink-500/10 text-pink-600 dark:text-pink-400"
                                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEdit(item)}
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            <DiscountModal
                isOpen={isAddModalOpen}
                onClose={onCloseAddModal}
                onSave={handleSave}
                initialData={null}
            />

            {/* Edit Modal */}
            <DiscountModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSave}
                initialData={editData}
            />

        </div>
    );
};

export default DiscountTypesTab;
