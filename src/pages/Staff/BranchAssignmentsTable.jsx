import { Button } from "../../components/ui/button";

const branchAssignments = [
  {
    staff: "Test Staff",
    branch: "Fusionedge Test Hospital - Main Branch",
    startDate: "Not set",
    endDate: "Ongoing",
    status: "Active",
  },
  {
    staff: "Dr. Sarah Wilson",
    branch: "Fusionedge Animal Care - East Wing",
    startDate: "Jan 10, 2026",
    endDate: "Ongoing",
    status: "Active",
  },
  {
    staff: "Mark Johnson",
    branch: "Fusionedge Pet Clinic - West Branch",
    startDate: "Dec 02, 2025",
    endDate: "Mar 01, 2026",
    status: "Active",
  },
  {
    staff: "Anita Sharma",
    branch: "Fusionedge Veterinary Hospital - North Branch",
    startDate: "Nov 15, 2025",
    endDate: "Ongoing",
    status: "Active",
  },
  {
    staff: "Kevin Blake",
    branch: "Fusionedge Emergency Care - Central",
    startDate: "Feb 01, 2026",
    endDate: "Ongoing",
    status: "Active",
  },
];


const statusClass = (status) => {
  switch (status) {
    case "Active":
      return "bg-emerald-500/10 text-emerald-600";
    default:
      return "bg-[var(--dashboard-secondary)] text-[var(--dashboard-text-light)]";
  }
};

const BranchAssignmentsTable = () => {
  const handleDelete = (index) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this branch assignment?"
  );

  if (!confirmDelete) return;

  console.log("Delete row:", index);

  // later you can remove from state or call API
};

  return (
    <>
    <div className="rounded-xl border border-[var(--border-color)] overflow-x-auto bg-[var(--card-bg)] shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b border-[var(--border-color)] bg-[var(--dashboard-secondary)]">
          <tr>
            {[
              "Staff Member",
              "Branch",
              "Start Date",
              "End Date",
              "Status",
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
          {branchAssignments.map((item, i) => (
            <tr
              key={i}
              className="border-b border-[var(--border-color)] hover:bg-[var(--dashboard-secondary)] transition-colors"
            >
              <td className="p-4">{item.staff}</td>
              <td className="p-4">{item.branch}</td>
              <td className="p-4">{item.startDate}</td>
              <td className="p-4">{item.endDate}</td>

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
  onClick={() => handleDelete(i)}
  className="h-8 rounded-md border border-red-200 px-3 text-xs text-red-600 bg-red-50 hover:bg-red-100"
>
  Delete
</Button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* ===== PAGINATION FOOTER ===== */}
<div className="flex flex-col md:flex-row justify-between items-center px-4 py-3 text-sm text-[var(--dashboard-text-light)]">

  {/* LEFT TEXT */}
  <div>
    Showing 1 to {branchAssignments.length} of {branchAssignments.length} entries
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

    </>
  );
  
};


export default BranchAssignmentsTable;
