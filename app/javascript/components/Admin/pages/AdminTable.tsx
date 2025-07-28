import React, { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import EditUserModal from "../comps/EditUserModal";
import AdminSidebar from "../comps/AdminSideBar";
import AdminNavbarMobile from "../comps/AdminNavbarMobile";

type User = {
  name: string;
  email: string;
  role: string;
  active: boolean;
};

export default function AdminTable({  allusers, Favicon, RetoLogo }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleEdit = async (row: any) => {
    const user = row.original;
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "role", header: "Role" },
      {
        accessorKey: "active",
        header: "Active",
        Cell: ({ cell }) => {
          const isActive = cell.getValue();
          return (
            <div className="flex items-center space-x-2">
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span className="text-black ">
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "edit",
        header: "Edit",
        Cell: ({ row }) => (
          <button
            type="button"
            className="px-2 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-sm bg-[#ddc68b] text-black font-bold rounded-lg hover:brightness-110 hover:cursor-pointer transition"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
        ),
      },
    ],
    []
  );

  const transformedData = useMemo(() => {
    return Array.isArray(allusers)
      ? allusers
          .map((user: any) => ({
            ...user,
            name: user.name,
            email: user.email,
            role: user.role,
            active: user.active,
          }))
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      : [];
  }, [allusers]);

  const table = useMaterialReactTable({
    columns,
    data: transformedData,
  });

  return (
    <div className="flex overflow-hidden h-screen">
      {isMobile ? (
        <div className="">
          <AdminNavbarMobile Favicon={Favicon} RetoLogo={RetoLogo} />
        </div>
      ) : (
        <AdminSidebar
          Favicon={Favicon}
          RetoLogo={RetoLogo}
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-screen bg-gray-100 px-12 py-20">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 ">
              All Users
            </h1>

            {/* TABLE */}
          </div>{" "}
          <div style={{ fontFamily: "Cantarell" }}>
            <MaterialReactTable table={table} />
          </div>
          <EditUserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={selectedUser}
          />
        </div>
      </div>
    </div>
  );
}
