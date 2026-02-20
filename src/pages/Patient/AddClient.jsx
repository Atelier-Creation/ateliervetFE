import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import PhoneInput from '../../components/common/PhoneInput';

const AddClient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        alternatePhone: '',
        email: '',
        city: '',
        address: '',
        purposeOfVisit: '',
        notes: '',
        active: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log("Saving client:", formData);
        // Add API call to save client
        navigate('/patients');
    };

    const handleSaveAndAddPet = () => {
        console.log("Saving client and navigating to add pet:", formData);
        // Add API call to save client
        // Navigate to add pet page with client info
        navigate('/patients/add-pet', { state: { clientName: formData.name } });
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/patients')}
                        className="h-10 w-10 text-[var(--dashboard-text)] hover:bg-[var(--dashboard-secondary)]"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-semibold tracking-tight text-[var(--dashboard-text)]">
                            Add New Client
                        </h1>
                        <p className="text-sm text-[var(--dashboard-text-light)]">
                            Create a new client record for your veterinary practice
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm">
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--dashboard-text)]">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    name="name"
                                    placeholder="Enter client name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-[var(--card-bg)] !h-10 border-[var(--border-color)] text-[var(--dashboard-text)]"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--dashboard-text)]">Phone</label>
                                <PhoneInput
                                    value={formData.phone}
                                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                                    placeholder="Phone number"
                                    defaultCountry="91"
                                />
                            </div>

                            {/* Alternate Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--dashboard-text)]">Alternate Phone</label>
                                <PhoneInput
                                    value={formData.alternatePhone}
                                    onChange={(value) => setFormData(prev => ({ ...prev, alternatePhone: value }))}
                                    placeholder="Alternate phone number"
                                    defaultCountry="91"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--dashboard-text)]">Email</label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-[var(--card-bg)] !h-10 border-[var(--border-color)] text-[var(--dashboard-text)]"
                                />
                            </div>

                            {/* City */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--dashboard-text)]">City</label>
                                <Input
                                    name="city"
                                    placeholder="Enter city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="bg-[var(--card-bg)] !h-10 border-[var(--border-color)] text-[var(--dashboard-text)]"
                                />
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--dashboard-text)]">Address</label>
                                <Input
                                    name="address"
                                    placeholder="Enter address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="bg-[var(--card-bg)] !h-10 border-[var(--border-color)] text-[var(--dashboard-text)]"
                                />
                            </div>

                            {/* Purpose of Visit */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--dashboard-text)]">Purpose of Visit</label>
                                <Input
                                    name="purposeOfVisit"
                                    placeholder="Enter purpose of visit"
                                    value={formData.purposeOfVisit}
                                    onChange={handleChange}
                                    className="bg-[var(--card-bg)] !h-10 border-[var(--border-color)] text-[var(--dashboard-text)]"
                                />
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--dashboard-text)]">Notes</label>
                                <Input
                                    name="notes"
                                    placeholder="Enter notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="bg-[var(--card-bg)] !h-10 border-[var(--border-color)] text-[var(--dashboard-text)]"
                                />
                            </div>
                        </div>

                        {/* Active Toggle */}
                        <div className="flex items-center justify-between p-4 rounded-lg border border-[var(--border-color)] bg-[var(--dashboard-secondary)]/30">
                            <div>
                                <div className="font-medium text-[var(--dashboard-text)]">Active Status</div>
                                <div className="text-sm text-[var(--dashboard-text-light)]">Set whether this client is currently active</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.active}
                                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-pink-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-500"></div>
                            </label>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3 p-6 border-t border-[var(--border-color)] bg-[var(--dashboard-secondary)]/30">
                        <Button
                            variant="outline"
                            onClick={() => navigate('/patients')}
                            className="border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--dashboard-text)] hover:bg-[var(--dashboard-secondary)]"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveAndAddPet}
                            className="bg-pink-500 text-white hover:bg-pink-600"
                        >
                            Save & Add Pet
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-[var(--dashboard-primary)] text-white hover:bg-[var(--dashboard-primary-hover)]"
                        >
                            Create Client
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddClient;
