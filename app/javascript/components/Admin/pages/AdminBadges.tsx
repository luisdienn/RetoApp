import React, { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import EditBadgeModal from "../comps/EditBadgeModal";
import DeleteBadgeModal from "../comps/DeleteBadgeModal";
import AddBadgeModal from "../comps/AddBadgeModal";
import AddBadgeButton from "../comps/AddBadgeButton";
import AdminSidebar from "../AdminSideBar";
import AdminNavbarMobile from "../AdminNavbarMobile";

type Badge = {
  name: string;
  description: string;
  image: string;
};

export default function AdminBadges({ badges, Favicon, RetoLogo }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleEdit = async (row: any) => {
    const badge = row.original;
    setSelectedBadge(badge);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (row: any) => {
    const badge = row.original;
    setSelectedBadge(badge);
    setIsDeleteModalOpen(true);
  };

  const columns = useMemo<MRT_ColumnDef<Badge>[]>(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "edit",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-2 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-sm bg-[#ddc68b] text-black font-bold rounded-lg hover:brightness-110 hover:cursor-pointer transition"
              onClick={() => handleEdit(row)}
            >
              Edit
            </button>

            <button
              type="button"
              className="px-2 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-sm bg-[#ddc68b] text-black font-bold rounded-lg hover:brightness-110 hover:cursor-pointer transition"
              onClick={() => handleDelete(row)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const transformedData = useMemo(() => {
    return Array.isArray(badges)
      ? badges
          .map((badge: any) => ({
            ...badge,
            name: badge.name,
            description: badge.description,
          }))
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      : [];
  }, [badges]);

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
          <div className="flex items-center justify-between mb-2 pb-10">
            <h1 className="text-4xl font-bold text-gray-800">All Badges</h1>
            <AddBadgeButton onClick={() => setIsAddModalOpen(true)} />
          </div>
          <div style={{ fontFamily: "Cantarell" }}>
            <MaterialReactTable table={table} />
          </div>
          <EditBadgeModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            badge={selectedBadge}
          />

        <DeleteBadgeModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            badge={selectedBadge}
          />

          <AddBadgeModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
