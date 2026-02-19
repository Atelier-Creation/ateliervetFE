import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Filter,Users } from "lucide-react";
import BranchAssignmentsTable from "./BranchAssignmentsTable";
import { useNavigate } from "react-router-dom";

const staffList = [
  {
    name: "Test Admin",
    code: "TA25UYLH",
    email: "admin@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Test Staff",
    code: "TS25UYK3",
    email: "vet@example.com",
    role: "Veterinarian",
    status: "Active",
  },
  {
    name: "Dr. Sarah Wilson",
    code: "SW26A9KD",
    email: "sarah@fusionedge.com",
    role: "Veterinarian",
    status: "Active",
  },
  {
    name: "Mark Johnson",
    code: "MJ26L8Q2",
    email: "mark.johnson@fusionedge.com",
    role: "Receptionist",
    status: "Active",
  },
  {
    name: "Anita Sharma",
    code: "AS26H2P1",
    email: "anita@fusionedge.com",
    role: "Assistant",
    status: "Active",
  },
];


const statusClass = (status) => {
  switch (status) {
    case "Active":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    default:
      return "bg-[var(--dashboard-secondary)] text-[var(--dashboard-text-light)]";
  }
};

const Staff = () => {
  const [activeTab, setActiveTab] = useState("Staff");
  const navigate = useNavigate();
const handleDelete = (index) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this branch assignment?"
  );

  if (!confirmDelete) return;

  console.log("Delete row:", index);

  // later you can remove from state or call API
};

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">

        {/* HEADER — EXACT SAME STYLE AS CLIENT */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--dashboard-text)]">
              Staff Management
            </h1>
            <p className="text-sm text-[var(--dashboard-text-light)]">
              Manage your hospital staff and their roles
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
            <Button
  onClick={() => navigate("/staff/create")}
  className="h-9 rounded-md bg-[var(--dashboard-primary)] px-4 text-sm text-white hover:bg-[var(--dashboard-primary-hover)]"
>
  <Plus size={16} />
  Create Staff Member
</Button>
<Button
  onClick={() => navigate("/staff/roles")}
  className="h-9 rounded-md bg-[var(--dashboard-primary)] px-4 text-sm text-white hover:bg-[var(--dashboard-primary-hover)]"
>
    <Users size={16} />
  Staff Roles
</Button>


          </div>
        </div>

        {/* TABS — SAME STYLE */}
        <div className="inline-flex h-9 items-center rounded-lg bg-[var(--dashboard-secondary)] p-1 border border-[var(--border-color)]">
          {["Staff", "Branch Assignments"].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-sm rounded-md transition-all shadow-none ${
                activeTab === tab
                  ? "bg-[var(--dashboard-primary)] text-white shadow"
                  : "text-[var(--dashboard-text-light)] hover:text-[var(--dashboard-text)] hover:bg-[var(--card-bg)]/50"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* TABLE — EXACT CLIENT STYLE */}
        {activeTab === "Staff" && (
        <div className="rounded-xl border border-[var(--border-color)] overflow-x-auto bg-[var(--card-bg)] shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--border-color)] bg-[var(--dashboard-secondary)]">
              <tr>
                {[
                  "Name",
                  "Code",
                  "Email",
                  "Role",
                  "Status",
                  "Assign Branch",
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
              {staffList.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-[var(--border-color)] hover:bg-[var(--dashboard-secondary)] transition-colors"
                >
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.code}</td>
                  <td className="p-4">{item.email}</td>

                  <td className="p-4">
                    <span className="inline-flex rounded-md px-2.5 py-1 text-xs font-bold border">
                      {item.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${statusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4">
            <Button
  onClick={() =>
    navigate("/staff/edit", {
      state: {
        staff: item,
        openTab: "BranchAssignment"
      }
    })
  }
  className="h-8 rounded-md border border-[var(--border-color)] px-4 text-sm bg-[var(--card-bg)] text-[var(--dashboard-text)] hover:bg-[var(--dashboard-primary)] hover:text-white"
>
  Assign Branch
</Button>

                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button className="h-8 rounded-md border border-[var(--border-color)] px-3 text-xs bg-[var(--card-bg)] hover:bg-[var(--dashboard-secondary)]">
                        Edit
                      </Button>
                      <Button
  onClick={() => handleDelete(i)}
  className="h-8 rounded-md border border-red-200 px-3 text-xs text-red-600 bg-red-50 hover:bg-red-100"
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
         
)}
{/* ===== PAGINATION FOOTER ===== */}
<div className="flex flex-col md:flex-row justify-between items-center px-4 py-3 text-sm text-[var(--dashboard-text-light)]">

  {/* LEFT TEXT */}
  <div>
    Showing 1 to {staffList.length} of {staffList.length} entries
  </div>

  {/* RIGHT BUTTONS */}
  <div className="flex items-center gap-3 mt-3 md:mt-0">

    <Button
      className="h-8 w-8 rounded-md border border-[var(--border-color)] bg-[var(--card-bg)]"
    >
      {"<"}
    </Button>

    <span className="text-sm">
      Page 1 of 1
    </span>

    <Button
      className="h-8 w-8 rounded-md border border-[var(--border-color)] bg-[var(--card-bg)]"
    >
      {">"}
    </Button>

  </div>
</div>

{activeTab === "Branch Assignments" && (
  <BranchAssignmentsTable />
)}

      </div>
    </div>
  );
};

export default Staff;
