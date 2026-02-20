import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useEffect } from "react";

const CreateStaff = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [photo, setPhoto] = useState(null);

  const fileRef = useRef();
const handleCreate = () => {
  const newStaff = {
    name: "New Staff",
    code: "NEW123",
    email: "new@email.com",
    role: admin ? "Admin" : "Staff",
    status: active ? "Active" : "Inactive",
  };

  const old = JSON.parse(localStorage.getItem("staffList")) || [];
  localStorage.setItem("staffList", JSON.stringify([...old, newStaff]));

  navigate("/staff");
};
const [staffList, setStaffList] = useState([]);

useEffect(()=>{
  const saved = JSON.parse(localStorage.getItem("staffList")) || [];
  setStaffList(saved);
},[]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h1 className="text-2xl font-semibold text-[var(--dashboard-text)]">
          Add New Staff Member
        </h1>
        <p className="text-sm text-[var(--dashboard-text-light)]">
          Create a new staff member
        </p>
      </div>
<div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 text-center space-y-3">

  <input
    type="file"
    ref={fileRef}
    className="hidden"
    accept="image/*"
    onChange={(e)=> setPhoto(e.target.files[0])}
  />

  <div className="w-28 h-28 md:w-40 md:h-40 mx-auto rounded-full bg-[var(--dashboard-secondary)] flex items-center justify-center overflow-hidden">
    {photo ? (
      <img
        src={URL.createObjectURL(photo)}
        className="w-full h-full object-cover"
      />
    ) : (
      "👤"
    )}
  </div>

  <Button
    onClick={()=> fileRef.current.click()}
    className="border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--dashboard-text)] hover:bg-[var(--dashboard-primary)] hover:text-white"
  >
    Change Photo
  </Button>

  <p className="text-sm text-[var(--dashboard-text-light)]">
    Recommended: Square image, max 5MB
  </p>
</div>


      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="text-sm font-medium">First Name *</label>
          <Input placeholder="John" />
        </div>

        <div>
          <label className="text-sm font-medium">Last Name</label>
          <Input placeholder="Doe" />
        </div>

        <div>
          <label className="text-sm font-medium">Email *</label>
          <Input placeholder="john.doe@example.com" />
        </div>

        <div>
          <label className="text-sm font-medium">Phone (Optional)</label>
          <Input placeholder="+1" />
        </div>

        {/* PASSWORD WITH ICON */}
        <div>
          <label className="text-sm font-medium">Initial Password *</label>

          <div className="relative">
            <Input placeholder="Create initial password" />
            <Eye className="absolute right-3 top-2.5 w-4 h-4 text-[var(--dashboard-text-light)] cursor-pointer" />
          </div>
        </div>

        {/* STAFF ROLE */}
        <div>
          <label className="text-sm font-medium">Staff Role</label>
          <Input placeholder="Select a role" />

          <p className="text-xs mt-1 text-[var(--dashboard-text-light)]">
            Defines this staff member's permissions. Can't be combined with admin access.
          </p>
        </div>

      </div>

      {/* ACTIVE + ADMIN CARDS */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">

  {/* ACTIVE CARD */}
  <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 flex justify-between items-center">
    <div>
      <h3 className="font-semibold text-[var(--dashboard-text)]">Active</h3>
      <p className="text-sm text-[var(--dashboard-text-light)]">
        Inactive staff can't log in or be assigned to branches
      </p>
    </div>

    <button
      onClick={()=> setActive(!active)}
      className={`w-12 h-6 rounded-full relative transition ${
        active ? "bg-pink-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
          active ? "left-7" : "left-1"
        }`}
      />
    </button>
  </div>

  {/* ADMIN CARD */}
  <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 flex justify-between items-center">
    <div>
      <h3 className="font-semibold text-[var(--dashboard-text)]">Administrator</h3>
      <p className="text-sm text-[var(--dashboard-text-light)]">
        Gives full access, overrides any staff role
      </p>
    </div>

    <button
      onClick={()=> setAdmin(!admin)}
      className={`w-12 h-6 rounded-full relative transition ${
        admin ? "bg-pink-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
          admin ? "left-7" : "left-1"
        }`}
      />
    </button>
  </div>

</div>

      {/* FOOTER BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
        <Button onClick={()=> navigate("/staff")}>
  Cancel
</Button>

       <Button
  onClick={handleCreate}
  className="bg-[var(--dashboard-primary)] text-white hover:bg-[var(--dashboard-primary-hover)]"
>
  Create Staff
</Button>

      </div>

    </div>
  );
};

export default CreateStaff;
