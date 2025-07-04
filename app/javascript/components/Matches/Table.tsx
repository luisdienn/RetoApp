import React from "react";
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

type Match = {
  date: string;
  score: string;
  result: string;
  oponent: string;
  description: string;
};

const data: Match[] = [
  {
    date: '2023-10-01',
    score: '3 - 1',
    result: 'Win',
    oponent: 'Team B',
    description: 'Great performance, strong defense.',
  },
  {
    date: '2023-09-25',
    score: '1 - 2',
    result: 'Loss',
    oponent: 'Team C',
    description: 'Close match, unlucky finish.',
  },
  {
    date: '2023-09-18',
    score: '2 - 2',
    result: 'Draw',
    oponent: 'Team D',
    description: 'Evenly matched teams.',
  },
  {
    date: '2023-09-10',
    score: '4 - 0',
    result: 'Win',
    oponent: 'Team E',
    description: 'Dominant win, excellent attack.',
  },
  {
    date: '2023-09-03',
    score: '0 - 1',
    result: 'Loss',
    oponent: 'Team F',
    description: 'Tough loss, missed chances.',
  },
    {
    date: '2023-09-03',
    score: '0 - 1',
    result: 'Loss',
    oponent: 'Team F',
    description: 'Tough loss, missed chances.',
  },
];

export default function Table() {
  const columns = useMemo<MRT_ColumnDef<Match>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
        size: 120,
      },
      {
        accessorKey: 'oponent',
        header: 'Opponent',
        size: 150,
      },
      {
        accessorKey: 'score',
        header: 'Score',
        size: 100,
      },
      {
        accessorKey: 'result',
        header: 'Result',
        size: 100,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 250,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,

  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}