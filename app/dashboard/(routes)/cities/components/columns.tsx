"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

import { City } from '@/types/city';

export const columns: ColumnDef<City>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]
