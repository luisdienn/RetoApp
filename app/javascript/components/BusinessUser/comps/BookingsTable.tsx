import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import DeleteBookModal from "./DeleteBookModal";

export default function BookingsTable({ bookings = [] as any[] }) {
  const [selectedBooking, setSelectedBooking] = useState<any>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const rows = useMemo(() => {
    const fmtDay = (d: Date) =>
      d.toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    return (Array.isArray(bookings) ? bookings : [])
      .map((b: any) => {
        const starts = new Date(b?.[4]);
        const ends = new Date(b?.[5]);
        return {
          id: b?.[0],
          user: b?.[1],
          location: b?.[2],
          field: b?.[3],
          starts, // keep Date for sorting
          ends,   // keep Date for sorting
          day: fmtDay(starts), // precompute day label
        };
      })
      .sort((a, b) => b.starts.getTime() - a.starts.getTime());
  }, [bookings]);

  const handleDelete = useCallback((row: any) => {
    setSelectedBooking(row.original.id);
    setIsDeleteModalOpen(true);
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
    const fmtTime = (d: Date) =>
      d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

    return [
      { accessorKey: "user", header: "User" },
      { accessorKey: "location", header: "Location" },
      { accessorKey: "field", header: "Field" },
      { accessorKey: "day", header: "Day" },
      {
        accessorKey: "starts",
        header: "Start",
        sortingFn: "datetime",
        Cell: ({ cell }) => fmtTime(cell.getValue<Date>()),
      },
      {
        accessorKey: "ends",
        header: "End",
        sortingFn: "datetime",
        Cell: ({ cell }) => fmtTime(cell.getValue<Date>()),
      },
      {
        id: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-2 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-sm bg-[#ddc68b] text-black font-bold rounded-lg hover:brightness-110 hover:cursor-pointer transition"
              onClick={() => handleDelete(row)}
            >
              Delete
            </button>
          </div>
        ),
        enableSorting: false,
      },
    ];
  }, [handleDelete]);

  const table = useMaterialReactTable({
    columns,
    data: rows,
    getRowId: (row) => String(row.id ?? ""),
    autoResetPageIndex: false, // optional: prevents page jump on data changes
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 pb-4">All Bookings</h1>
      <div style={{ fontFamily: "PT Sans" }}>
        <MaterialReactTable table={table} />
      </div>

      <DeleteBookModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        book={selectedBooking}
      />
    </div>
  );
}
