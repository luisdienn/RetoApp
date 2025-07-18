import React, { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import EditMatchModal from "./EditMatchModal";

type Match = {
  date: string;
  score: string;
  result: string;
  oponent: string;
  description: string;
};

type TableProps = {
  matches: any;
};

export default function Table({ matches }: TableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState([]);

    const handleEdit = async (row: any) => {
      const match = row.original;
      setSelectedMatch(match);
      setIsModalOpen(true);

    };



  const columns = useMemo<MRT_ColumnDef<Match>[]>(
    () => [
      { accessorKey: "date", header: "Date" },
      { accessorKey: "oponent", header: "Opponent" },
      { accessorKey: "score", header: "Score" },
      { accessorKey: "result", header: "Result" },
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "edit",
        header: "Edit",
        Cell: ({ row }) => (
          <button
            type="button"
            className=" sm:px-4 sm:py-2 text-xs sm:text-sm bg-[#ddc68b] text-black font-bold rounded-lg hover:brightness-110 hover:cursor-pointer transition"
            onClick={() => handleEdit(row)}
          >
            Editar
          </button>
        ),
      },
    ],
    []
  );

  const transformedData = useMemo(() => {
    return Array.isArray(matches)
      ? matches
          .map((match: any) => ({
            ...match,
            date: match.date,
            score: match.score,
            result: match.result,
            oponent: match.opponent,
            description: match.details,
          }))
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      : [];
  }, [matches]);

  const table = useMaterialReactTable({
    columns,
    data: transformedData,
  });

  return (
    <>
      {" "}
      <div style={{ fontFamily: "Cantarell" }}>
        <MaterialReactTable table={table} />
      </div>


      <EditMatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        match={selectedMatch}
      /> 
    </>
  );
}
