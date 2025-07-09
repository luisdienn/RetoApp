import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

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
  const columns = useMemo<MRT_ColumnDef<Match>[]>(
    () => [
      { accessorKey: "date", header: "Date" },
      { accessorKey: "oponent", header: "Opponent" },
      { accessorKey: "score", header: "Score" },
      { accessorKey: "result", header: "Result" },
      { accessorKey: "description", header: "Description" },
    ],
    []
  );

const transformedData = useMemo(() => {
  return Array.isArray(matches)
    ? matches
        .map((match: any) => ({
          date: match.date,
          score: match.score,
          result: match.result,
          oponent: match.opponent,
          description: match.details,
        }))
        .sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
    : [];
}, [matches]);


  const table = useMaterialReactTable({
    columns,
    data: transformedData,
  });

  return <MaterialReactTable table={table} />;
}
