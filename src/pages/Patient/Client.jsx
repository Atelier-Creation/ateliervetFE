import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Upload, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Pets from "./Pets";
import ImportClientsModal from "./ImportClientsModal";
import FilterPanel from "../../components/common/FilterPanel";

const clientsWithPets = [
  {
    name: "Maricar Navales",
    phone: "No phone",
    email: "navalesmari26@gmail.com",
    city: "Unknown",
    status: "Active",
    createdAt: "Feb 10, 2026",
    pets: [
      {
        name: "Moana",
        code: "M26PXN6D",
        species: "Cat",
        breed: "Orange Cat",
        age: "6 years 7 months 23 days",
        status: "Active",
        createdAt: "Feb 10, 2026"
      }
    ]
  },
  {
    name: "Prasanth S",
    phone: "919500361249",
    email: "prasanthoyasco@gmail.com",
    city: "Coimbatore",
    status: "Active",
    createdAt: "Feb 10, 2026",
    pets: [
      {
        name: "Rose",
        code: "R26P9FJV",
        species: "Dog",
        breed: "Golden Retriever",
        age: "4 years 3 months",
        status: "Active",
        createdAt: "Feb 10, 2026"
      }
    ]
  },
  {
    name: "Test",
    phone: "No phone",
    email: "test@gmail.com",
    city: "Test",
    status: "Active",
    createdAt: "Nov 26, 2025",
    pets: [
      {
        name: "Saqer",
        code: "S25PGKL6",
        species: "Cat",
        breed: "Mixed",
        age: "3 months",
        status: "Active",
        createdAt: "Nov 26, 2025"
      }
    ]
  },
  {
    name: "Phos Yung",
    phone: "No phone",
    email: "yungphoslol@gmail.com",
    city: "Phnom Penh",
    status: "Active",
    createdAt: "Nov 7, 2025",
    pets: [
      {
        name: "Bella",
        code: "B25PLFJZ",
        species: "Dog",
        breed: "German Shepherd",
        age: "1 year 10 months",
        status: "Active",
        createdAt: "Nov 7, 2025"
      }
    ]
  },
  {
    name: "Isadora Gould",
    phone: "12046676793",
    email: "fusionedgeorg@gmail.com",
    city: "Tulsa",
    status: "Active",
    createdAt: "Sep 28, 2025",
    pets: [
      {
        name: "Harper",
        code: "H25PDQQ7",
        species: "Dog",
        breed: "Labrador",
        age: "8 years 8 months",
        status: "Active",
        createdAt: "Sep 28, 2025"
      }
    ]
  },
  {
    name: "Mark Johnson",
    phone: "12134346846",
    email: "markjohnson@gmail.com",
    city: "Unknown",
    status: "Active",
    createdAt: "Sep 2, 2025",
    pets: [
      {
        name: "Umi",
        code: "U25PVN7F",
        species: "Cat",
        breed: "Scottish Fold",
        age: "1 year 5 months",
        status: "Active",
        createdAt: "Sep 2, 2025"
      },
      {
        name: "Max",
        code: "M25PLK89",
        species: "Dog",
        breed: "Beagle",
        age: "2 years 2 months",
        status: "Active",
        createdAt: "Oct 12, 2025"
      }
    ]
  },
  {
    name: "Russel Bling",
    phone: "233240608256",
    email: "russelboakye@gmail.com",
    city: "Kumasi",
    status: "Active",
    createdAt: "Aug 31, 2025",
    pets: [
      {
        name: "Duke",
        code: "D25P36JG",
        species: "Dog",
        breed: "Golden Retriever",
        age: "10 months",
        status: "Active",
        createdAt: "Sep 5, 2025"
      }
    ]
  },
  {
    name: "Mariam Byrd",
    phone: "4021234567",
    email: "mariambyrd@gmail.com",
    city: "Dallas",
    status: "Active",
    createdAt: "Sep 28, 2025",
    pets: [
      {
        name: "Chaney",
        code: "C25PZGPF",
        species: "Rabbit",
        breed: "Mini Lop",
        age: "2 years 10 months",
        status: "Active",
        createdAt: "Sep 28, 2025"
      }
    ]
  },
  {
    name: "Hyer",
    phone: "132523252",
    email: "admin@gmail.com",
    city: "Nyv",
    status: "Active",
    createdAt: "Sep 27, 2025",
    pets: [
      {
        name: "Leo",
        code: "L25PKJ98",
        species: "Cat",
        breed: "Persian",
        age: "5 years 1 month",
        status: "Active",
        createdAt: "Oct 1, 2025"
      }
    ]
  },
  {
    name: "Anita Sharma",
    phone: "9876543210",
    email: "anita.sharma@gmail.com",
    city: "Mumbai",
    status: "Active",
    createdAt: "Jan 15, 2026",
    pets: [
      {
        name: "Simba",
        code: "S26PHJ45",
        species: "Dog",
        breed: "Indie",
        age: "3 years",
        status: "Active",
        createdAt: "Jan 15, 2026"
      }
    ]
  }
];



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

const Client = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Client");
  // const [selectedDate, setSelectedDate] = useState(new Date());

  // Modal states
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Filter states
  const [selectedFilter, setSelectedFilter] = useState("All Status");
  const [appliedFilter, setAppliedFilter] = useState("All Status");

  // Filter options
  const filterOptions = [
    { label: "All Status", value: "All Status" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" }
  ];

  // Handler functions
  const handleImport = (file) => {
    console.log("Importing file:", file);
    // Add API call to import file
  };

  const handleApplyFilter = () => {
    setAppliedFilter(selectedFilter);
    setIsFilterPanelOpen(false);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setSelectedFilter("All Status");
    setAppliedFilter("All Status");
    setCurrentPage(1);
  };

  // Filter clients based on applied filter
  const filteredClients = appliedFilter === "All Status"
    ? clientsWithPets
    : clientsWithPets.filter(client => client.status === appliedFilter);

  const totalItems = filteredClients.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentAppointments = filteredClients.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--dashboard-text)]">
              Patients Management
            </h1>
            <p className="text-sm text-[var(--dashboard-text-light)]">
              Manage your clients and their pets in one place
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              className="h-9 w-full sm:w-[300px] rounded-md border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--dashboard-text)] px-3 text-sm focus:border-[var(--dashboard-primary)]"
              placeholder="Search..."
            />
            <Button
              onClick={() => setIsFilterPanelOpen(true)}
              className="h-9 rounded-md border border-[var(--border-color)] px-4 text-sm bg-[var(--card-bg)] text-[var(--dashboard-text)] hover:bg-[var(--dashboard-primary)] hover:text-white"
            >
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
            <Button
              onClick={() => navigate('/patients/add-client')}
              className="h-9 rounded-md bg-[var(--dashboard-primary)] px-4 text-sm text-white hover:bg-[var(--dashboard-primary-hover)]"
            >
              <Plus size={20} />
              Create Client
            </Button>
            <Button
              onClick={() => setIsImportModalOpen(true)}
              className="h-9 rounded-md bg-[var(--dashboard-primary)] px-4 text-sm text-white hover:bg-[var(--dashboard-primary-hover)]"
            >
              <Upload size={18} className="me-2" />
              Import
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="inline-flex h-9 items-center rounded-lg bg-[var(--dashboard-secondary)] px-1 py-5 border border-[var(--border-color)]">
          {["Client", "Pets"].map((tab) => (
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
        {activeTab === "Client" && (
          <div>
            <div className="rounded-xl border border-[var(--border-color)] overflow-x-auto bg-[var(--card-bg)] shadow-sm">
              <table className="w-full text-sm">
                <thead className="border-b border-[var(--border-color)] bg-[var(--dashboard-secondary)]">
                  <tr>
                    {[
                      "Name",
                      "Phone",
                      "Email",
                      "City",
                      "Status",
                      "created At",
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
                      <td className="p-4 text-[var(--dashboard-text)]">{item.name}</td>
                      <td className="p-4 text-[var(--dashboard-text)]">{item.phone}</td>
                      <td className="p-4 text-[var(--dashboard-text)]">{item.email}</td>
                      <td className="p-4 text-[var(--dashboard-text)]">{item.city}</td>
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
                          <Button
                            onClick={() => navigate("/patients/update")}
                            className="h-8 rounded-md border border-[var(--border-color)] px-3 text-xs text-[var(--dashboard-text)] bg-[var(--card-bg)] hover:bg-[var(--dashboard-secondary)]"
                          >
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
        {activeTab === "Pets" && <Pets
          clientsWithPets={clientsWithPets}
        />}

        <ImportClientsModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImport={handleImport}
        />

        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          title="Filter Clients"
          filterOptions={filterOptions}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          onApply={handleApplyFilter}
          onReset={handleResetFilter}
        />
      </div>
    </div>
  );
};

export default Client;
