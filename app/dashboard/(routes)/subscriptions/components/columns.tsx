"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

import { Subscription } from '@/types/subscription';

export const columns: ColumnDef<Subscription>[] = [
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
